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
    console.log('🔍 V1-V10: 检查设备激活状态...');
    
    const deviceId = getDeviceFingerprint();
    const activatedDevices = getActivatedDevices();
    
    // V1: 检查设备指纹匹配
    if (activatedDevices[deviceId]) {
        const deviceInfo = activatedDevices[deviceId];
        console.log('V1: 找到设备激活信息:', deviceInfo.type || 'normal');
        
        // V2: 如果是试用类型，检查是否过期
        if (deviceInfo.type === 'trial' && deviceInfo.userData && deviceInfo.userData.trialStartDate) {
            const trialDays = deviceInfo.userData.trialDays || 30;
            const trialEnd = deviceInfo.userData.trialStartDate + trialDays * 24 * 60 * 60 * 1000;
            if (Date.now() > trialEnd) {
                console.log('V2: 试用已过期');
                return false;
            }
            console.log('V2: 试用有效');
        }
        
        // V3: 恢复登录状态
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('activationKey', deviceInfo.key);
        localStorage.setItem('authUser', JSON.stringify(deviceInfo.userData));
        localStorage.setItem('deviceId', deviceId);
        console.log('V3: 登录状态已恢复');
        return true;
    }
    
    // V4: 尝试检查其他可能的设备ID
    const alternativeIds = [
        localStorage.getItem('eb_device_id'),
        localStorage.getItem('deviceId'),
        'trial-device'
    ].filter(Boolean);
    
    for (const altId of alternativeIds) {
        if (activatedDevices[altId]) {
            console.log('V4: 通过备用ID找到激活:', altId);
            const deviceInfo = activatedDevices[altId];
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('activationKey', deviceInfo.key);
            localStorage.setItem('authUser', JSON.stringify(deviceInfo.userData));
            localStorage.setItem('deviceId', deviceId);
            return true;
        }
    }
    
    console.log('V4: 未找到设备激活信息');
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
    
    // 版本3优化：检查用户是否同意协议（《个人信息保护法》要求）
    const agreementCheckbox = document.getElementById('agreementCheckbox');
    if (agreementCheckbox && !agreementCheckbox.checked) {
        showActivationResult(false, '请先同意协议', '请阅读并勾选同意《用户协议》和《隐私政策》后再继续');
        return;
    }
    
    const key = input.value.trim().toUpperCase();
    if (!key) {
        showActivationResult(false, '输入为空', '请输入激活密钥');
        return;
    }
    
    const keyData = validateKey(key);
    
    if (keyData) {
        // 记录用户同意协议的时间（合规留痕）
        localStorage.setItem('agreementAcceptedAt', new Date().toISOString());
        localStorage.setItem('agreementVersion', '2025.01.01');
        
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
    console.log('🔐 V1-V10: 开始认证检查...');
    
    // V1: 首先检查常规登录状态
    if (localStorage.getItem('isLoggedIn') === 'true') {
        console.log('V1: isLoggedIn=true，已登录');
        return true;
    }
    
    // V2: 检查设备是否已激活（包括试用激活）
    if (isDeviceActivated()) {
        console.log('V2: 设备已激活');
        return true;
    }
    
    // V3: 检查activation.js的试用状态
    if (checkTrialActivation()) {
        console.log('V3: 检测到有效试用');
        return true;
    }
    
    // V4: 直接检查eb_activation_state（最后防线）
    try {
        const activationState = JSON.parse(localStorage.getItem('eb_activation_state') || 'null');
        if (activationState && activationState.isActivated) {
            console.log('V4: 通过eb_activation_state检测到激活状态');
            
            // 尝试恢复登录状态
            if (activationState.trialStartDate) {
                const trialDays = 30;
                const trialEnd = activationState.trialStartDate + trialDays * 24 * 60 * 60 * 1000;
                if (Date.now() < trialEnd) {
                    localStorage.setItem('isLoggedIn', 'true');
                    console.log('V4: 恢复试用登录状态');
                    return true;
                }
            } else {
                // 非试用激活
                localStorage.setItem('isLoggedIn', 'true');
                return true;
            }
        }
    } catch (e) {
        console.warn('V4: 检查eb_activation_state失败', e);
    }
    
    console.log('🔐 认证检查完成: 未登录');
    return false;
}

// V8-V10: 检查试用激活状态（与activation.js互通）
function checkTrialActivation() {
    console.log('🧪 V8-V10: 检查试用激活状态...');
    
    try {
        // V8: 读取activation.js保存的状态
        const activationState = JSON.parse(localStorage.getItem('eb_activation_state') || 'null');
        
        if (!activationState) {
            console.log('V8: 未找到eb_activation_state');
            return false;
        }
        
        // V9: 检查是否有试用开始日期
        if (activationState.trialStartDate) {
            const trialDays = activationState.trialDays || 30;
            const trialEnd = activationState.trialStartDate + trialDays * 24 * 60 * 60 * 1000;
            const now = Date.now();
            
            if (now < trialEnd) {
                // V10: 试用有效，同步登录状态
                console.log('V9: 试用有效，剩余天数:', Math.ceil((trialEnd - now) / (24 * 60 * 60 * 1000)));
                
                localStorage.setItem('isLoggedIn', 'true');
                
                // 创建试用用户信息（如果不存在）
                if (!localStorage.getItem('authUser') || localStorage.getItem('authUser') === '{}') {
                    const trialUser = {
                        user: 'trial_user',
                        role: 'trial',
                        isTrial: true,
                        trialStartDate: activationState.trialStartDate,
                        trialDays: trialDays
                    };
                    localStorage.setItem('authUser', JSON.stringify(trialUser));
                    localStorage.setItem('activationKey', 'TRIAL-AUTO');
                }
                
                console.log('✅ V10: 试用状态有效，已自动登录');
                return true;
            } else {
                console.log('⚠️ V9: 试用期已过期');
                return false;
            }
        }
        
        // V10: 检查isActivated标志（非试用激活）
        if (activationState.isActivated && activationState.activationCode) {
            console.log('V10: 检测到正式激活');
            localStorage.setItem('isLoggedIn', 'true');
            return true;
        }
        
    } catch (e) {
        console.warn('V8-V10: 检查试用状态失败:', e);
    }
    return false;
}

// 导出全局函数
window.login = login;
window.logout = logout;
window.fullLogout = fullLogout;
window.checkAuth = checkAuth;
window.isDeviceActivated = isDeviceActivated;
window.checkTrialActivation = checkTrialActivation; // V8: 导出试用检查函数
window.showActivationResult = showActivationResult;
window.closeActivationResult = closeActivationResult;
window.enterApp = enterApp;
