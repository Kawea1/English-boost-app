// 认证系统 - 管理员: huangjiawei
// 管理员密钥: ADMIN-Huangjiawei-2025

// 永久激活密钥 SHAO1 - SHAO100
const SHAO_KEYS = {};
for (let i = 1; i <= 100; i++) {
    SHAO_KEYS['SHAO' + i] = { user: 'SHAO' + i, role: 'user', expires: null, permanent: true };
}

const VALID_KEYS = {
    'ADMIN-HUANGJIAWEI-2025': { user: 'huangjiawei', role: 'admin', expires: null, permanent: true },
    'BOOST-USER-001': { user: 'user1', role: 'user', expires: '2025-12-31' },
    'BOOST-USER-002': { user: 'user2', role: 'user', expires: '2025-12-31' },
    'BOOST-USER-003': { user: 'user3', role: 'user', expires: '2025-12-31' },
    ...SHAO_KEYS
};

// 已激活设备列表（设备指纹 -> 激活信息）
// 这个会存储在 localStorage 中，key: 'activatedDevices'
function getActivatedDevices() {
    try {
        return JSON.parse(localStorage.getItem('activatedDevices') || '{}');
    } catch (e) {
        return {};
    }
}

function saveActivatedDevices(devices) {
    localStorage.setItem('activatedDevices', JSON.stringify(devices));
}

// 生成设备指纹 - 更稳定的版本
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

// 检查当前设备是否已激活
function isDeviceActivated() {
    const deviceId = getDeviceFingerprint();
    const activatedDevices = getActivatedDevices();
    
    if (activatedDevices[deviceId]) {
        // 设备已激活，恢复登录状态
        const deviceInfo = activatedDevices[deviceId];
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('activationKey', deviceInfo.key);
        localStorage.setItem('authUser', JSON.stringify(deviceInfo.userData));
        localStorage.setItem('deviceId', deviceId);
        return true;
    }
    return false;
}

// 激活设备
function activateDevice(key, keyData) {
    const deviceId = getDeviceFingerprint();
    const activatedDevices = getActivatedDevices();
    
    // 保存设备激活信息
    activatedDevices[deviceId] = {
        key: key,
        userData: keyData,
        activatedAt: new Date().toISOString()
    };
    
    saveActivatedDevices(activatedDevices);
    
    // 同时保存到常规存储
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('activationKey', key);
    localStorage.setItem('authUser', JSON.stringify(keyData));
    localStorage.setItem('deviceId', deviceId);
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
        // 激活当前设备（永久保存）
        activateDevice(key, keyData);
        
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
    // 只清除登录状态，不清除设备激活信息
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activationKey');
    localStorage.removeItem('authUser');
    location.reload();
}

// 完全注销（清除设备激活）
function fullLogout() {
    const deviceId = getDeviceFingerprint();
    const activatedDevices = getActivatedDevices();
    delete activatedDevices[deviceId];
    saveActivatedDevices(activatedDevices);
    
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('activationKey');
    localStorage.removeItem('authUser');
    localStorage.removeItem('deviceId');
    location.reload();
}

function checkAuth() {
    // 首先检查常规登录状态
    if (localStorage.getItem('isLoggedIn') === 'true') {
        return true;
    }
    
    // 如果未登录，检查设备是否已激活
    if (isDeviceActivated()) {
        return true;
    }
    
    return false;
}

// 导出全局函数
window.login = login;
window.logout = logout;
window.fullLogout = fullLogout;
window.checkAuth = checkAuth;
window.isDeviceActivated = isDeviceActivated;
window.showActivationResult = showActivationResult;
window.closeActivationResult = closeActivationResult;
window.enterApp = enterApp;
