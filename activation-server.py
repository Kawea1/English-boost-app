"""
学术英语精进 - 激活码后端服务
v1.0

这是一个示例后端实现，可以部署到：
- Vercel (Python/Node.js)
- AWS Lambda
- 自己的服务器

数据库建议：
- PostgreSQL / MySQL (生产环境)
- SQLite (开发测试)
- Redis (缓存心跳状态)
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime, timedelta
import hashlib
import secrets
import sqlite3
import json
import os

app = Flask(__name__)
CORS(app)

# 配置
CONFIG = {
    'max_devices': 3,                    # 最大同时在线设备数
    'device_timeout_minutes': 15,        # 设备超时时间
    'max_new_devices_per_day': 5,        # 每天最多新增设备数
    'suspicious_city_threshold': 2,      # 同时在线不同城市阈值
}

# 数据库初始化
def init_db():
    conn = sqlite3.connect('activation.db')
    c = conn.cursor()
    
    # 激活码表
    c.execute('''
        CREATE TABLE IF NOT EXISTS activation_codes (
            code TEXT PRIMARY KEY,
            user_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            expires_at TIMESTAMP,
            is_active BOOLEAN DEFAULT 1,
            max_devices INTEGER DEFAULT 3,
            note TEXT
        )
    ''')
    
    # 设备表
    c.execute('''
        CREATE TABLE IF NOT EXISTS devices (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT,
            device_id TEXT,
            fingerprint TEXT,
            device_info TEXT,
            first_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            last_heartbeat TIMESTAMP,
            is_active BOOLEAN DEFAULT 1,
            UNIQUE(code, device_id)
        )
    ''')
    
    # 活动日志表
    c.execute('''
        CREATE TABLE IF NOT EXISTS activity_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            code TEXT,
            device_id TEXT,
            action TEXT,
            ip_address TEXT,
            user_agent TEXT,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

init_db()

def get_db():
    conn = sqlite3.connect('activation.db')
    conn.row_factory = sqlite3.Row
    return conn

# ==================== API 端点 ====================

@app.route('/activation/activate', methods=['POST'])
def activate():
    """激活设备"""
    data = request.json
    code = data.get('code', '').upper()
    device_id = data.get('deviceId')
    fingerprint = data.get('fingerprint')
    device_info = data.get('deviceInfo', {})
    
    if not code or not device_id:
        return jsonify({'success': False, 'message': '参数不完整'})
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        # 1. 验证激活码
        c.execute('SELECT * FROM activation_codes WHERE code = ? AND is_active = 1', (code,))
        code_row = c.fetchone()
        
        if not code_row:
            return jsonify({'success': False, 'message': '激活码无效'})
        
        # 2. 检查是否过期
        if code_row['expires_at']:
            expires_at = datetime.fromisoformat(code_row['expires_at'])
            if expires_at < datetime.now():
                return jsonify({'success': False, 'message': '激活码已过期'})
        
        max_devices = code_row['max_devices'] or CONFIG['max_devices']
        
        # 3. 检查设备是否已注册
        c.execute('SELECT * FROM devices WHERE code = ? AND device_id = ?', (code, device_id))
        existing_device = c.fetchone()
        
        if existing_device:
            # 设备已注册，更新心跳
            c.execute('''
                UPDATE devices SET last_heartbeat = ?, is_active = 1 
                WHERE code = ? AND device_id = ?
            ''', (datetime.now().isoformat(), code, device_id))
        else:
            # 新设备，检查数量限制
            c.execute('''
                SELECT COUNT(*) as count FROM devices 
                WHERE code = ? AND is_active = 1
            ''', (code,))
            active_count = c.fetchone()['count']
            
            if active_count >= max_devices:
                # 检查是否有超时设备可以踢掉
                timeout = datetime.now() - timedelta(minutes=CONFIG['device_timeout_minutes'])
                c.execute('''
                    UPDATE devices SET is_active = 0 
                    WHERE code = ? AND last_heartbeat < ?
                ''', (code, timeout.isoformat()))
                
                # 重新检查
                c.execute('''
                    SELECT COUNT(*) as count FROM devices 
                    WHERE code = ? AND is_active = 1
                ''', (code,))
                active_count = c.fetchone()['count']
                
                if active_count >= max_devices:
                    return jsonify({
                        'success': False, 
                        'message': f'设备数量已达上限（最多{max_devices}台），请先在其他设备退出'
                    })
            
            # 检查今日新增设备数
            today = datetime.now().date().isoformat()
            c.execute('''
                SELECT COUNT(*) as count FROM devices 
                WHERE code = ? AND DATE(first_seen) = ?
            ''', (code, today))
            today_count = c.fetchone()['count']
            
            if today_count >= CONFIG['max_new_devices_per_day']:
                return jsonify({
                    'success': False, 
                    'message': '今日新增设备次数过多，请明天再试',
                    'suspicious': True
                })
            
            # 注册新设备
            c.execute('''
                INSERT INTO devices (code, device_id, fingerprint, device_info, last_heartbeat)
                VALUES (?, ?, ?, ?, ?)
            ''', (code, device_id, fingerprint, json.dumps(device_info), datetime.now().isoformat()))
        
        # 记录活动日志
        log_activity(c, code, device_id, 'activate', request)
        
        conn.commit()
        
        # 计算剩余设备数
        c.execute('SELECT COUNT(*) as count FROM devices WHERE code = ? AND is_active = 1', (code,))
        current_count = c.fetchone()['count']
        
        return jsonify({
            'success': True,
            'userId': code_row['user_id'] or code,
            'remainingDevices': max_devices - current_count
        })
        
    except Exception as e:
        print(f"激活错误: {e}")
        return jsonify({'success': False, 'message': '服务器错误'})
    finally:
        conn.close()


@app.route('/activation/verify', methods=['POST'])
def verify():
    """验证激活状态"""
    data = request.json
    code = data.get('code', '').upper()
    device_id = data.get('deviceId')
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        # 检查激活码是否有效
        c.execute('SELECT * FROM activation_codes WHERE code = ? AND is_active = 1', (code,))
        code_row = c.fetchone()
        
        if not code_row:
            return jsonify({'valid': False, 'reason': 'code_invalid'})
        
        # 检查设备是否注册
        c.execute('SELECT * FROM devices WHERE code = ? AND device_id = ? AND is_active = 1', 
                  (code, device_id))
        device = c.fetchone()
        
        if not device:
            return jsonify({'valid': False, 'reason': 'device_not_found'})
        
        return jsonify({'valid': True})
        
    finally:
        conn.close()


@app.route('/activation/heartbeat', methods=['POST'])
def heartbeat():
    """心跳保活"""
    data = request.json
    code = data.get('code', '').upper()
    device_id = data.get('deviceId')
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        # 更新心跳时间
        c.execute('''
            UPDATE devices SET last_heartbeat = ? 
            WHERE code = ? AND device_id = ?
        ''', (datetime.now().isoformat(), code, device_id))
        
        if c.rowcount == 0:
            return jsonify({'success': False, 'invalid': True})
        
        # 检查是否被踢
        c.execute('SELECT is_active FROM devices WHERE code = ? AND device_id = ?', 
                  (code, device_id))
        device = c.fetchone()
        
        if device and not device['is_active']:
            return jsonify({'success': True, 'kicked': True, 'reason': 'too_many_devices'})
        
        conn.commit()
        return jsonify({'success': True, 'kicked': False})
        
    finally:
        conn.close()


@app.route('/activation/deactivate', methods=['POST'])
def deactivate():
    """注销设备"""
    data = request.json
    code = data.get('code', '').upper()
    device_id = data.get('deviceId')
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        c.execute('''
            UPDATE devices SET is_active = 0 
            WHERE code = ? AND device_id = ?
        ''', (code, device_id))
        
        log_activity(c, code, device_id, 'deactivate', request)
        
        conn.commit()
        return jsonify({'success': True})
        
    finally:
        conn.close()


@app.route('/activation/devices', methods=['POST'])
def get_devices():
    """获取激活码绑定的设备列表"""
    data = request.json
    code = data.get('code', '').upper()
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        c.execute('''
            SELECT device_id, device_info, first_seen, last_heartbeat, is_active 
            FROM devices WHERE code = ?
            ORDER BY last_heartbeat DESC
        ''', (code,))
        
        devices = []
        for row in c.fetchall():
            devices.append({
                'deviceId': row['device_id'][:8] + '...',  # 脱敏
                'info': json.loads(row['device_info'] or '{}'),
                'firstSeen': row['first_seen'],
                'lastActive': row['last_heartbeat'],
                'isActive': bool(row['is_active'])
            })
        
        return jsonify({'success': True, 'devices': devices})
        
    finally:
        conn.close()


@app.route('/activation/kick', methods=['POST'])
def kick_device():
    """踢出指定设备"""
    data = request.json
    code = data.get('code', '').upper()
    device_id = data.get('deviceIdToKick')
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        c.execute('''
            UPDATE devices SET is_active = 0 
            WHERE code = ? AND device_id = ?
        ''', (code, device_id))
        
        conn.commit()
        return jsonify({'success': True})
        
    finally:
        conn.close()


# ==================== 管理接口 ====================

@app.route('/admin/generate-code', methods=['POST'])
def generate_code():
    """生成新激活码 (需要管理员权限)"""
    # 简单的 API Key 验证
    api_key = request.headers.get('X-Admin-Key')
    if api_key != os.environ.get('ADMIN_API_KEY', 'your-secret-key'):
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    user_id = data.get('userId')
    expires_days = data.get('expiresDays', 365)  # 默认一年
    max_devices = data.get('maxDevices', CONFIG['max_devices'])
    note = data.get('note', '')
    
    # 生成激活码
    code = generate_activation_code()
    expires_at = (datetime.now() + timedelta(days=expires_days)).isoformat()
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        c.execute('''
            INSERT INTO activation_codes (code, user_id, expires_at, max_devices, note)
            VALUES (?, ?, ?, ?, ?)
        ''', (code, user_id, expires_at, max_devices, note))
        
        conn.commit()
        
        return jsonify({
            'success': True,
            'code': code,
            'expiresAt': expires_at,
            'maxDevices': max_devices
        })
        
    finally:
        conn.close()


@app.route('/admin/revoke-code', methods=['POST'])
def revoke_code():
    """撤销激活码"""
    api_key = request.headers.get('X-Admin-Key')
    if api_key != os.environ.get('ADMIN_API_KEY', 'your-secret-key'):
        return jsonify({'error': 'Unauthorized'}), 401
    
    data = request.json
    code = data.get('code', '').upper()
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        c.execute('UPDATE activation_codes SET is_active = 0 WHERE code = ?', (code,))
        c.execute('UPDATE devices SET is_active = 0 WHERE code = ?', (code,))
        conn.commit()
        
        return jsonify({'success': True})
        
    finally:
        conn.close()


@app.route('/admin/stats', methods=['GET'])
def get_stats():
    """获取统计信息"""
    api_key = request.headers.get('X-Admin-Key')
    if api_key != os.environ.get('ADMIN_API_KEY', 'your-secret-key'):
        return jsonify({'error': 'Unauthorized'}), 401
    
    conn = get_db()
    c = conn.cursor()
    
    try:
        # 总激活码数
        c.execute('SELECT COUNT(*) as count FROM activation_codes WHERE is_active = 1')
        total_codes = c.fetchone()['count']
        
        # 活跃设备数
        c.execute('SELECT COUNT(*) as count FROM devices WHERE is_active = 1')
        active_devices = c.fetchone()['count']
        
        # 今日新增设备
        today = datetime.now().date().isoformat()
        c.execute('SELECT COUNT(*) as count FROM devices WHERE DATE(first_seen) = ?', (today,))
        today_devices = c.fetchone()['count']
        
        return jsonify({
            'totalCodes': total_codes,
            'activeDevices': active_devices,
            'todayNewDevices': today_devices
        })
        
    finally:
        conn.close()


# ==================== 辅助函数 ====================

def generate_activation_code():
    """生成激活码 (XXXX-XXXX-XXXX-XXXX)"""
    chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'  # 排除容易混淆的字符
    code_parts = []
    for _ in range(4):
        part = ''.join(secrets.choice(chars) for _ in range(4))
        code_parts.append(part)
    return '-'.join(code_parts)


def log_activity(cursor, code, device_id, action, request):
    """记录活动日志"""
    cursor.execute('''
        INSERT INTO activity_logs (code, device_id, action, ip_address, user_agent)
        VALUES (?, ?, ?, ?, ?)
    ''', (
        code, 
        device_id, 
        action, 
        request.remote_addr,
        request.user_agent.string[:200]
    ))


# ==================== 启动 ====================

if __name__ == '__main__':
    # 开发模式
    app.run(debug=True, port=5000)
