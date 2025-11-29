// 认证系统 - 管理员: huangjiawei
// 管理员密钥: ADMIN-Huangjiawei-2025

// 永久激活密钥 SHAO1 - SHAO100
const SHAO_KEYS = {};
for (let i = 1; i <= 100; i++) {
    SHAO_KEYS['SHAO' + i] = { user: 'SHAO' + i, role: 'user', expires: null, permanent: true };
}

const VALID_KEYS = {
    'ADMIN-HUANGJIAWEI-2025': { user: 'huangjiawei', role: 'admin', expires: null },
    'BOOST-USER-001': { user: 'user1', role: 'user', expires: '2025-12-31' },
    'BOOST-USER-002': { user: 'user2', role: 'user', expires: '2025-12-31' },
    'BOOST-USER-003': { user: 'user3', role: 'user', expires: '2025-12-31' },
    ...SHAO_KEYS
};

// 生成设备指纹
function getDeviceFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('device-fingerprint', 2, 2);
    const canvasHash = canvas.toDataURL().slice(-50);
    
    const nav = [
        navigator.userAgent,
        navigator.language,
        screen.width + 'x' + screen.height,
        screen.colorDepth,
        new Date().getTimezoneOffset()
    ].join('|');
    
    let hash = 0;
    const str = nav + canvasHash;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return 'DEV' + Math.abs(hash).toString(36).toUpperCase();
}

function validateKey(key) {
    const normalizedKey = key.trim().toUpperCase();
    const keyData = VALID_KEYS[normalizedKey];
    if (!keyData) return null;
    if (keyData.expires && new Date(keyData.expires) < new Date()) return null;
    return keyData;
}

// 登录函数 - 从输入框获取密钥
function login() {
    const input = document.getElementById('activationKey');
    if (!input) {
        showActivationResult(false, '系统错误', '无法找到输入框');
        return;
    }
    
    const key = input.value.trim().toUpperCase();
    if (!key) {
        showActivationResult(false, '输入为空', '请输入激活密钥');
        return;
    }
    
    const keyData = validateKey(key);
    
    if (keyData) {
        // 对于永久密钥（SHAO系列），检查设备绑定
        if (keyData.permanent) {
            const bindings = JSON.parse(localStorage.getItem('keyBindings') || '{}');
            const deviceId = getDeviceFingerprint();
            
            // 检查是否已被其他设备绑定
            if (bindings[key] && bindings[key] !== deviceId) {
                showActivationResult(false, '设备冲突', '此密钥已在其他设备激活，请联系管理员');
                return;
            }
            
            // 绑定到当前设备
            bindings[key] = deviceId;
            localStorage.setItem('keyBindings', JSON.stringify(bindings));
        }
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('activationKey', key);
        localStorage.setItem('authUser', JSON.stringify(keyData));
        localStorage.setItem('deviceId', getDeviceFingerprint());
        
        // 显示成功弹窗
        showActivationResult(true);
    } else {
        showActivationResult(false, '激活失败', '密钥无效或已过期');
    }
}

// 显示激活结果弹窗
function showActivationResult(success, title, message) {
    const modal = document.getElementById('activationResultModal');
    const successDiv = document.getElementById('activationSuccess');
    const failureDiv = document.getElementById('activationFailure');
    const failureTitle = document.getElementById('failureTitle');
    const failureMessage = document.getElementById('failureMessage');
    
    if (!modal) return;
    
    // 重置显示状态
    successDiv.classList.remove('show');
    failureDiv.classList.remove('show');
    
    if (success) {
        successDiv.classList.add('show');
    } else {
        failureDiv.classList.add('show');
        if (failureTitle) failureTitle.textContent = title || '激活失败';
        if (failureMessage) failureMessage.textContent = message || '密钥无效或已过期';
    }
    
    modal.classList.add('active');
}

// 关闭激活结果弹窗
function closeActivationResult() {
    const modal = document.getElementById('activationResultModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 进入应用（激活成功后）
function enterApp() {
    // 隐藏结果弹窗
    closeActivationResult();
    
    // 显示主界面
    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('mainApp').classList.remove('hidden');
    
    // 初始化应用
    if (typeof initDailyGoals === 'function') initDailyGoals();
    if (typeof initNavScrollBehavior === 'function') initNavScrollBehavior();
    if (typeof initAvatar === 'function') initAvatar();
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activationKey');
    localStorage.removeItem('authUser');
    location.reload();
}

function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// 导出全局函数
window.login = login;
window.logout = logout;
window.checkAuth = checkAuth;
window.showActivationResult = showActivationResult;
window.closeActivationResult = closeActivationResult;
window.enterApp = enterApp;
