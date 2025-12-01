# 学术英语精进 - 激活码认证系统

## 系统概述

这是一个完整的激活码认证系统，实现了：
- ✅ 一码多设备（限制数量）
- ✅ 防止分享滥用
- ✅ 设备管理
- ✅ 心跳保活
- ✅ 异常检测

---

## 核心设计

### 1. 认证流程

```
用户输入激活码
      ↓
验证激活码有效性
      ↓
生成设备指纹
      ↓
检查设备数量限制
      ↓
注册设备 + 启动心跳
      ↓
定期验证状态
```

### 2. 防滥用策略

| 策略 | 说明 | 参数 |
|------|------|------|
| 设备数限制 | 最多同时在线设备数 | 默认 3 台 |
| 设备指纹 | 识别唯一设备，防止虚拟设备 | Canvas + WebGL + 硬件信息 |
| 心跳检测 | 定期验证，超时自动下线 | 5分钟心跳，15分钟超时 |
| 新设备限制 | 每天新增设备数上限 | 默认 5 台/天 |
| 异常检测 | 短时间大量新设备触发警告 | 可配置 |

### 3. 设备指纹组成

```javascript
- 用户代理 (User Agent)
- 屏幕分辨率 + 色深
- 时区
- 语言
- 平台
- CPU 核心数
- 设备内存
- Canvas 渲染特征
- WebGL 渲染器信息
```

---

## 文件结构

```
activation.js          # 前端激活系统（设备指纹、UI、API调用）
activation-server.py   # 后端服务（Flask示例，可替换为其他语言）
```

---

## 前端集成

### 1. 引入脚本

```html
<script src="activation.js"></script>
```

### 2. 初始化

```javascript
// 应用启动时检查激活状态
const isActivated = await ActivationSystem.init();

if (!isActivated) {
    // 显示激活对话框
    ActivationUI.showActivationDialog();
}
```

### 3. 手动激活

```javascript
const result = await ActivationSystem.activate('XXXX-XXXX-XXXX-XXXX');
if (result.success) {
    console.log('激活成功');
} else {
    console.log('激活失败:', result.message);
}
```

### 4. 监听事件

```javascript
// 激活成功
window.addEventListener('activationSuccess', () => {
    console.log('激活成功，解锁全部功能');
});

// 被踢下线
window.addEventListener('activationKicked', (e) => {
    console.log('被踢下线:', e.detail.message);
});

// 激活过期
window.addEventListener('activationExpired', () => {
    console.log('激活已过期');
});
```

### 5. 检查激活状态

```javascript
if (ActivationSystem.isActivated()) {
    // 显示高级功能
} else {
    // 显示免费功能或激活提示
}
```

---

## 后端部署

### 方案 1: Flask 本地运行

```bash
# 安装依赖
pip install flask flask-cors

# 运行服务
python activation-server.py
```

### 方案 2: Vercel 部署

1. 创建 `api/activation.py`:

```python
from activation_server import app

def handler(request):
    return app(request)
```

2. 配置 `vercel.json`:

```json
{
    "functions": {
        "api/activation.py": {
            "runtime": "python3.9"
        }
    }
}
```

### 方案 3: 云函数部署

支持部署到：
- AWS Lambda
- 阿里云函数计算
- 腾讯云云函数

---

## API 接口

### 激活设备

```
POST /activation/activate
{
    "code": "XXXX-XXXX-XXXX-XXXX",
    "deviceId": "uuid",
    "fingerprint": "hash",
    "deviceInfo": {...}
}

Response:
{
    "success": true,
    "userId": "user123",
    "remainingDevices": 2
}
```

### 验证状态

```
POST /activation/verify
{
    "code": "XXXX-XXXX-XXXX-XXXX",
    "deviceId": "uuid"
}

Response:
{
    "valid": true
}
```

### 心跳保活

```
POST /activation/heartbeat
{
    "code": "XXXX-XXXX-XXXX-XXXX",
    "deviceId": "uuid"
}

Response:
{
    "success": true,
    "kicked": false
}
```

### 注销设备

```
POST /activation/deactivate
{
    "code": "XXXX-XXXX-XXXX-XXXX",
    "deviceId": "uuid"
}
```

### 获取设备列表

```
POST /activation/devices
{
    "code": "XXXX-XXXX-XXXX-XXXX"
}

Response:
{
    "success": true,
    "devices": [
        {
            "deviceId": "a1b2c3d4...",
            "info": {"platform": "MacIntel", ...},
            "lastActive": "2024-01-01T12:00:00",
            "isActive": true
        }
    ]
}
```

---

## 管理接口

### 生成激活码

```
POST /admin/generate-code
Headers: X-Admin-Key: your-secret-key
{
    "userId": "user123",
    "expiresDays": 365,
    "maxDevices": 3,
    "note": "VIP用户"
}

Response:
{
    "success": true,
    "code": "ABCD-1234-EFGH-5678",
    "expiresAt": "2025-01-01T00:00:00",
    "maxDevices": 3
}
```

### 撤销激活码

```
POST /admin/revoke-code
Headers: X-Admin-Key: your-secret-key
{
    "code": "XXXX-XXXX-XXXX-XXXX"
}
```

### 获取统计

```
GET /admin/stats
Headers: X-Admin-Key: your-secret-key

Response:
{
    "totalCodes": 100,
    "activeDevices": 250,
    "todayNewDevices": 15
}
```

---

## 测试激活码

开发测试时可以使用以下激活码（仅离线模式有效）：

- `TEST-1234-5678-ABCD`
- `DEMO-AAAA-BBBB-CCCC`

---

## 安全建议

### 1. 后端安全

- 使用 HTTPS
- 设置管理接口的强密钥
- 启用请求频率限制
- 记录所有激活日志

### 2. 前端安全

- 设备指纹在前端生成，不要信任客户端数据
- 配合后端做多重验证
- 定期更换心跳密钥

### 3. 激活码安全

- 使用随机生成，排除易混淆字符
- 不要在日志中记录完整激活码
- 支持撤销功能

---

## 数据库结构

### activation_codes 表

| 字段 | 类型 | 说明 |
|------|------|------|
| code | TEXT | 激活码（主键）|
| user_id | TEXT | 用户ID |
| created_at | TIMESTAMP | 创建时间 |
| expires_at | TIMESTAMP | 过期时间 |
| is_active | BOOLEAN | 是否有效 |
| max_devices | INTEGER | 最大设备数 |
| note | TEXT | 备注 |

### devices 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 自增ID |
| code | TEXT | 关联的激活码 |
| device_id | TEXT | 设备唯一ID |
| fingerprint | TEXT | 设备指纹 |
| device_info | TEXT | 设备信息JSON |
| first_seen | TIMESTAMP | 首次注册时间 |
| last_heartbeat | TIMESTAMP | 最后心跳时间 |
| is_active | BOOLEAN | 是否在线 |

### activity_logs 表

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INTEGER | 自增ID |
| code | TEXT | 激活码 |
| device_id | TEXT | 设备ID |
| action | TEXT | 操作类型 |
| ip_address | TEXT | IP地址 |
| user_agent | TEXT | UA |
| timestamp | TIMESTAMP | 时间 |

---

## 扩展功能

### 1. 用户自助管理设备

让用户可以查看和管理自己的设备：

```javascript
// 获取设备列表
const devices = await ActivationSystem.getMyDevices();

// 踢出指定设备
await ActivationSystem.kickDevice(deviceId);
```

### 2. 地理位置检测

```javascript
// 如果同一时间检测到不同城市的设备
if (detectSuspiciousLocation()) {
    // 要求二次验证
    showVerificationDialog();
}
```

### 3. 试用期

```javascript
// 7天试用期
if (!isActivated && getTrialDaysRemaining() > 0) {
    // 显示试用功能
} else {
    // 要求激活
}
```

---

## FAQ

**Q: 用户换手机了怎么办？**
A: 新设备激活时，如果达到上限，可以先在旧设备注销，或在设备管理页面踢出旧设备。

**Q: 设备指纹变化了怎么办？**
A: 设备指纹仅作为辅助识别，主要依赖 deviceId。指纹变化不影响已注册设备。

**Q: 网络不好时怎么办？**
A: 有 24 小时宽限期，即使网络断开，本地验证通过的激活仍然有效。

**Q: 如何防止刷设备？**
A: 每天新增设备数有上限（默认5台），超过会触发限制。

---

## 更新日志

### v1.0 (2024-01)
- 初始版本
- 基本激活流程
- 设备指纹识别
- 心跳保活机制
- 管理接口
