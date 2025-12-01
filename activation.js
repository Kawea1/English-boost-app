/**
 * 学术英语精进 - 激活码认证系统
 * v4.0 - 防分享增强版
 * 
 * 功能特性：
 * 1. 激活码绑定用户
 * 2. 多设备支持（限制同时在线数）
 * 3. 设备指纹识别（增强版）
 * 4. 防分享滥用检测
 * 5. 心跳保活机制
 * 
 * v2.0 新增：
 * - IP地理位置异常检测
 * - 设备信任等级系统
 * - 短信/邮箱二次验证
 * - 设备命名与管理
 * 
 * v3.0 新增：
 * - 行为分析防分享
 * - 使用时段分析
 * - 设备切换频率监控
 * - 可疑活动自动锁定
 * 
 * v4.0 新增：
 * - 试用期支持
 * - VIP等级系统
 * - 家庭共享模式
 * - 设备迁移功能
 */

const ActivationSystem = {
    // 配置
    config: {
        maxDevices: 3,              // 最大同时在线设备数
        heartbeatInterval: 5 * 60 * 1000,  // 心跳间隔 5分钟
        deviceTimeout: 15 * 60 * 1000,     // 设备超时 15分钟
        maxNewDevicesPerDay: 5,     // 每天最多新增设备数
        apiBaseUrl: '',             // 后端API地址（需要配置）
        storageKey: 'eb_activation',
        deviceKey: 'eb_device_id',
        
        // v2.0 新增配置
        enableGeoCheck: true,       // 启用地理位置检测
        maxCitiesSimultaneous: 2,   // 同时允许的最大城市数
        trustScoreThreshold: 60,    // 信任分数阈值
        requireVerification: false,  // 是否需要二次验证
        
        // v3.0 新增配置
        enableBehaviorAnalysis: true,  // 启用行为分析
        maxSwitchesPerHour: 10,        // 每小时最大设备切换次数
        suspiciousLockDuration: 24 * 60 * 60 * 1000, // 可疑锁定时长 24小时
        
        // v4.0 新增配置
        trialDays: 30,              // 试用期天数（30天）
        enableFamilySharing: false, // 是否启用家庭共享
        familyMaxMembers: 5,        // 家庭最多成员数
        vipLevels: {                // VIP等级配置
            free: { maxDevices: 1, features: ['basic'] },
            basic: { maxDevices: 3, features: ['basic', 'sync'] },
            premium: { maxDevices: 5, features: ['basic', 'sync', 'offline', 'priority'] },
            family: { maxDevices: 10, features: ['basic', 'sync', 'offline', 'priority', 'family'] }
        }
    },

    // 状态
    state: {
        isActivated: false,
        activationCode: null,
        userId: null,
        deviceId: null,
        deviceFingerprint: null,
        lastHeartbeat: null,
        heartbeatTimer: null,
        
        // v2.0 新增状态
        deviceName: null,           // 设备名称
        trustScore: 100,            // 信任分数 (0-100)
        lastLocation: null,         // 上次位置
        isVerified: false,          // 是否已二次验证
        
        // v3.0 新增状态
        behaviorProfile: null,      // 行为特征
        switchHistory: [],          // 设备切换历史
        isSuspicious: false,        // 是否可疑
        lockUntil: null,            // 锁定截止时间
        
        // v4.0 新增状态
        vipLevel: 'free',           // VIP等级
        trialStartDate: null,       // 试用开始日期
        familyId: null,             // 家庭组ID
        deviceMigrationToken: null  // 设备迁移令牌
    },

    /**
     * 初始化激活系统
     */
    async init() {
        console.log('🔐 初始化激活系统...');
        
        // 生成/获取设备ID
        this.state.deviceId = await this.getOrCreateDeviceId();
        
        // 生成设备指纹
        this.state.deviceFingerprint = await this.generateDeviceFingerprint();
        
        // 检查本地激活状态
        const savedState = this.loadActivationState();
        if (savedState && savedState.activationCode) {
            // 验证激活状态
            const isValid = await this.verifyActivation(savedState.activationCode);
            if (isValid) {
                this.state.isActivated = true;
                this.state.activationCode = savedState.activationCode;
                this.state.userId = savedState.userId;
                this.startHeartbeat();
                console.log('✅ 激活状态有效');
                return true;
            } else {
                // 激活失效，清除本地状态
                this.clearActivationState();
                console.log('❌ 激活状态已失效');
            }
        }
        
        return false;
    },

    /**
     * 生成或获取设备ID
     */
    async getOrCreateDeviceId() {
        let deviceId = localStorage.getItem(this.config.deviceKey);
        
        if (!deviceId) {
            // 生成新的设备ID
            deviceId = this.generateUUID();
            localStorage.setItem(this.config.deviceKey, deviceId);
        }
        
        return deviceId;
    },

    /**
     * 生成UUID
     */
    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    /**
     * 生成设备指纹
     * 收集多个特征生成唯一指纹，用于识别设备
     */
    async generateDeviceFingerprint() {
        const components = [];
        
        // 1. 用户代理
        components.push(navigator.userAgent);
        
        // 2. 屏幕信息
        components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);
        
        // 3. 时区
        components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
        
        // 4. 语言
        components.push(navigator.language);
        
        // 5. 平台
        components.push(navigator.platform);
        
        // 6. 硬件并发数
        components.push(navigator.hardwareConcurrency || 'unknown');
        
        // 7. 设备内存 (如果可用)
        components.push(navigator.deviceMemory || 'unknown');
        
        // 8. Canvas 指纹
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('English Boost App 🎓', 2, 2);
            components.push(canvas.toDataURL().slice(-50));
        } catch (e) {
            components.push('canvas-error');
        }
        
        // 9. WebGL 渲染器 (如果可用)
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                if (debugInfo) {
                    components.push(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL));
                }
            }
        } catch (e) {
            components.push('webgl-error');
        }
        
        // 生成哈希
        const fingerprintString = components.join('|||');
        const fingerprint = await this.hashString(fingerprintString);
        
        return fingerprint;
    },

    /**
     * 字符串哈希
     */
    async hashString(str) {
        const encoder = new TextEncoder();
        const data = encoder.encode(str);
        
        try {
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            // 降级方案：简单哈希
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash).toString(16);
        }
    },

    /**
     * 使用激活码激活
     * @param {string} code - 激活码
     * @returns {Promise<{success: boolean, message: string}>}
     */
    async activate(code) {
        if (!code || code.trim().length === 0) {
            return { success: false, message: '请输入激活码' };
        }
        
        code = code.trim().toUpperCase();
        
        // 验证激活码格式
        if (!this.validateCodeFormat(code)) {
            return { success: false, message: '激活码格式不正确' };
        }
        
        try {
            // 调用后端API验证激活码
            const result = await this.callActivationAPI('activate', {
                code: code,
                deviceId: this.state.deviceId,
                fingerprint: this.state.deviceFingerprint,
                deviceInfo: this.getDeviceInfo()
            });
            
            if (result.success) {
                // 保存激活状态
                this.state.isActivated = true;
                this.state.activationCode = code;
                this.state.userId = result.userId;
                this.saveActivationState();
                
                // 启动心跳
                this.startHeartbeat();
                
                return { 
                    success: true, 
                    message: '激活成功！',
                    remainingDevices: result.remainingDevices
                };
            } else {
                return { 
                    success: false, 
                    message: result.message || '激活失败'
                };
            }
        } catch (error) {
            console.error('激活请求失败:', error);
            
            // 离线模式：本地验证（仅用于测试）
            if (this.isOfflineMode()) {
                return this.offlineActivate(code);
            }
            
            return { success: false, message: '网络错误，请稍后重试' };
        }
    },

    /**
     * 验证激活码格式
     * 格式: XXXX-XXXX-XXXX-XXXX (16位字母数字)
     */
    validateCodeFormat(code) {
        const pattern = /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
        return pattern.test(code);
    },

    /**
     * 获取设备信息
     */
    getDeviceInfo() {
        return {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            language: navigator.language,
            screenSize: `${screen.width}x${screen.height}`,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: Date.now()
        };
    },

    /**
     * 验证当前激活状态
     */
    async verifyActivation(code) {
        try {
            const result = await this.callActivationAPI('verify', {
                code: code,
                deviceId: this.state.deviceId,
                fingerprint: this.state.deviceFingerprint
            });
            
            return result.valid;
        } catch (error) {
            console.error('验证请求失败:', error);
            
            // 网络错误时，给予宽限期（24小时内有效）
            const savedState = this.loadActivationState();
            if (savedState && savedState.lastVerified) {
                const hoursSinceLastVerify = (Date.now() - savedState.lastVerified) / (1000 * 60 * 60);
                return hoursSinceLastVerify < 24;
            }
            
            return false;
        }
    },

    /**
     * 心跳保活
     */
    startHeartbeat() {
        // 清除已有的心跳定时器
        if (this.state.heartbeatTimer) {
            clearInterval(this.state.heartbeatTimer);
        }
        
        // 立即发送一次心跳
        this.sendHeartbeat();
        
        // 定期发送心跳
        this.state.heartbeatTimer = setInterval(() => {
            this.sendHeartbeat();
        }, this.config.heartbeatInterval);
    },

    /**
     * 发送心跳
     */
    async sendHeartbeat() {
        try {
            const result = await this.callActivationAPI('heartbeat', {
                code: this.state.activationCode,
                deviceId: this.state.deviceId,
                fingerprint: this.state.deviceFingerprint
            });
            
            if (result.success) {
                this.state.lastHeartbeat = Date.now();
                
                // 检查是否被踢下线
                if (result.kicked) {
                    this.handleKicked(result.reason);
                }
            } else if (result.invalid) {
                // 激活已失效
                this.handleDeactivated();
            }
        } catch (error) {
            console.warn('心跳发送失败:', error);
        }
    },

    /**
     * 停止心跳
     */
    stopHeartbeat() {
        if (this.state.heartbeatTimer) {
            clearInterval(this.state.heartbeatTimer);
            this.state.heartbeatTimer = null;
        }
    },

    /**
     * 处理被踢下线
     */
    handleKicked(reason) {
        this.stopHeartbeat();
        this.state.isActivated = false;
        
        // 显示提示
        const messages = {
            'too_many_devices': '您的账号在其他设备登录，当前设备已下线',
            'suspicious_activity': '检测到异常活动，请重新激活',
            'code_expired': '激活码已过期',
            'code_revoked': '激活码已被撤销'
        };
        
        const message = messages[reason] || '您已被下线，请重新激活';
        
        // 触发事件
        window.dispatchEvent(new CustomEvent('activationKicked', { 
            detail: { reason, message } 
        }));
        
        this.showAlert(message);
    },

    /**
     * 处理激活失效
     */
    handleDeactivated() {
        this.stopHeartbeat();
        this.state.isActivated = false;
        this.clearActivationState();
        
        window.dispatchEvent(new CustomEvent('activationExpired'));
        
        this.showAlert('激活已失效，请重新激活');
    },

    /**
     * 注销当前设备
     */
    async deactivateDevice() {
        try {
            await this.callActivationAPI('deactivate', {
                code: this.state.activationCode,
                deviceId: this.state.deviceId
            });
        } catch (error) {
            console.error('注销失败:', error);
        }
        
        this.stopHeartbeat();
        this.state.isActivated = false;
        this.clearActivationState();
    },

    /**
     * 调用激活API
     */
    async callActivationAPI(action, data) {
        // 如果没有配置API地址，使用离线模式
        if (!this.config.apiBaseUrl) {
            console.warn('未配置API地址，使用离线模式');
            return this.handleOfflineAPI(action, data);
        }
        
        const response = await fetch(`${this.config.apiBaseUrl}/activation/${action}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        return await response.json();
    },

    /**
     * 离线模式API处理（用于测试和无后端场景）
     */
    handleOfflineAPI(action, data) {
        // 从本地存储获取离线激活码数据
        const offlineCodes = this.getOfflineCodes();
        
        switch (action) {
            case 'activate': {
                const codeData = offlineCodes[data.code];
                if (!codeData) {
                    return { success: false, message: '激活码无效' };
                }
                
                if (codeData.expired && new Date(codeData.expired) < new Date()) {
                    return { success: false, message: '激活码已过期' };
                }
                
                // 检查设备数量
                if (!codeData.devices) codeData.devices = [];
                
                const existingDevice = codeData.devices.find(d => d.id === data.deviceId);
                if (!existingDevice) {
                    if (codeData.devices.length >= this.config.maxDevices) {
                        return { 
                            success: false, 
                            message: `设备数量已达上限（最多${this.config.maxDevices}台）`
                        };
                    }
                    codeData.devices.push({
                        id: data.deviceId,
                        fingerprint: data.fingerprint,
                        info: data.deviceInfo,
                        addedAt: Date.now()
                    });
                }
                
                // 保存
                this.saveOfflineCodes(offlineCodes);
                
                return { 
                    success: true, 
                    userId: codeData.userId || data.code,
                    remainingDevices: this.config.maxDevices - codeData.devices.length
                };
            }
            
            case 'verify': {
                const codeData = offlineCodes[data.code];
                if (!codeData) return { valid: false };
                
                const device = codeData.devices?.find(d => d.id === data.deviceId);
                return { valid: !!device };
            }
            
            case 'heartbeat': {
                return { success: true, kicked: false };
            }
            
            case 'deactivate': {
                const codeData = offlineCodes[data.code];
                if (codeData && codeData.devices) {
                    codeData.devices = codeData.devices.filter(d => d.id !== data.deviceId);
                    this.saveOfflineCodes(offlineCodes);
                }
                return { success: true };
            }
            
            default:
                return { success: false, message: '未知操作' };
        }
    },

    /**
     * 离线激活（测试用）
     */
    offlineActivate(code) {
        // 测试激活码（仅用于开发测试）
        const testCodes = ['TEST-1234-5678-ABCD', 'DEMO-AAAA-BBBB-CCCC'];
        
        if (testCodes.includes(code)) {
            this.state.isActivated = true;
            this.state.activationCode = code;
            this.state.userId = 'test_user';
            this.saveActivationState();
            
            return { success: true, message: '激活成功（离线模式）' };
        }
        
        return { success: false, message: '激活码无效' };
    },

    /**
     * 检查是否离线模式
     */
    isOfflineMode() {
        return !navigator.onLine || !this.config.apiBaseUrl;
    },

    /**
     * 获取离线激活码数据
     */
    getOfflineCodes() {
        try {
            return JSON.parse(localStorage.getItem('eb_offline_codes') || '{}');
        } catch {
            return {};
        }
    },

    /**
     * 保存离线激活码数据
     */
    saveOfflineCodes(codes) {
        localStorage.setItem('eb_offline_codes', JSON.stringify(codes));
    },

    /**
     * 保存激活状态
     */
    saveActivationState() {
        const state = {
            activationCode: this.state.activationCode,
            userId: this.state.userId,
            deviceId: this.state.deviceId,
            deviceName: this.state.deviceName,
            trustScore: this.state.trustScore,
            vipLevel: this.state.vipLevel,
            trialStartDate: this.state.trialStartDate,
            familyId: this.state.familyId,
            lastVerified: Date.now()
        };
        localStorage.setItem(this.config.storageKey, JSON.stringify(state));
    },

    /**
     * 加载激活状态
     */
    loadActivationState() {
        try {
            return JSON.parse(localStorage.getItem(this.config.storageKey));
        } catch {
            return null;
        }
    },

    /**
     * 清除激活状态
     */
    clearActivationState() {
        localStorage.removeItem(this.config.storageKey);
        this.state.activationCode = null;
        this.state.userId = null;
        this.state.isActivated = false;
        this.state.vipLevel = 'free';
        this.state.trustScore = 100;
    },

    /**
     * 显示提示
     */
    showAlert(message) {
        if (typeof showToast === 'function') {
            showToast(message, 'warning');
        } else {
            alert(message);
        }
    },

    /**
     * 检查是否已激活
     */
    isActivated() {
        return this.state.isActivated;
    },

    /**
     * 获取激活信息
     */
    getActivationInfo() {
        return {
            isActivated: this.state.isActivated,
            userId: this.state.userId,
            deviceId: this.state.deviceId,
            deviceName: this.state.deviceName,
            vipLevel: this.state.vipLevel,
            trustScore: this.state.trustScore
        };
    },

    // ==================== v2.0 新增功能 ====================

    /**
     * 获取当前IP地理位置
     */
    async getGeoLocation() {
        try {
            // 使用免费IP定位API
            const response = await fetch('https://ipapi.co/json/', { 
                timeout: 5000 
            });
            const data = await response.json();
            return {
                ip: data.ip,
                city: data.city,
                region: data.region,
                country: data.country_name,
                latitude: data.latitude,
                longitude: data.longitude,
                timezone: data.timezone
            };
        } catch (error) {
            console.warn('获取地理位置失败:', error);
            return null;
        }
    },

    /**
     * 检测地理位置异常
     */
    async checkGeoAnomaly() {
        if (!this.config.enableGeoCheck) return { suspicious: false };
        
        const currentLocation = await this.getGeoLocation();
        if (!currentLocation) return { suspicious: false };
        
        const lastLocation = this.state.lastLocation;
        this.state.lastLocation = currentLocation;
        
        if (!lastLocation) return { suspicious: false };
        
        // 计算两地距离
        const distance = this.calculateDistance(
            lastLocation.latitude, lastLocation.longitude,
            currentLocation.latitude, currentLocation.longitude
        );
        
        // 计算时间差（小时）
        const timeDiff = (Date.now() - (this.state.lastHeartbeat || Date.now())) / (1000 * 60 * 60);
        
        // 如果距离超过500km且时间少于2小时，可疑
        if (distance > 500 && timeDiff < 2) {
            return {
                suspicious: true,
                reason: 'impossible_travel',
                details: `${timeDiff.toFixed(1)}小时内从${lastLocation.city}移动到${currentLocation.city}（${distance.toFixed(0)}km）`
            };
        }
        
        return { suspicious: false };
    },

    /**
     * 计算两点间距离（km）
     */
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // 地球半径(km)
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    },

    /**
     * 设置设备名称
     */
    async setDeviceName(name) {
        this.state.deviceName = name;
        this.saveActivationState();
        
        // 同步到服务器
        try {
            await this.callActivationAPI('updateDevice', {
                code: this.state.activationCode,
                deviceId: this.state.deviceId,
                deviceName: name
            });
        } catch (error) {
            console.warn('同步设备名称失败:', error);
        }
    },

    /**
     * 获取自动设备名称
     */
    getAutoDeviceName() {
        const platform = navigator.platform;
        const ua = navigator.userAgent;
        
        // 检测设备类型
        if (/iPhone/.test(ua)) return 'iPhone';
        if (/iPad/.test(ua)) return 'iPad';
        if (/Android/.test(ua)) {
            const match = ua.match(/\(([^)]+)\)/);
            if (match) {
                const parts = match[1].split(';');
                const model = parts[parts.length - 1]?.trim();
                if (model && model !== 'wv') return model;
            }
            return 'Android设备';
        }
        if (/Mac/.test(platform)) return 'Mac电脑';
        if (/Win/.test(platform)) return 'Windows电脑';
        if (/Linux/.test(platform)) return 'Linux电脑';
        
        return '未知设备';
    },

    /**
     * 更新信任分数
     */
    updateTrustScore(delta, reason) {
        const oldScore = this.state.trustScore;
        this.state.trustScore = Math.max(0, Math.min(100, this.state.trustScore + delta));
        
        console.log(`信任分数: ${oldScore} → ${this.state.trustScore} (${reason})`);
        
        // 信任分数过低，触发二次验证
        if (this.state.trustScore < this.config.trustScoreThreshold && !this.state.isVerified) {
            this.requireVerification();
        }
        
        this.saveActivationState();
    },

    /**
     * 要求二次验证
     */
    requireVerification() {
        window.dispatchEvent(new CustomEvent('activationRequireVerification', {
            detail: { trustScore: this.state.trustScore }
        }));
    },

    /**
     * 完成二次验证
     */
    completeVerification(code) {
        // 验证码逻辑（需要后端支持）
        this.state.isVerified = true;
        this.updateTrustScore(30, '完成二次验证');
    },

    // ==================== v3.0 新增功能 ====================

    /**
     * 记录设备切换
     */
    recordDeviceSwitch() {
        const now = Date.now();
        this.state.switchHistory.push(now);
        
        // 只保留最近1小时的记录
        const oneHourAgo = now - 60 * 60 * 1000;
        this.state.switchHistory = this.state.switchHistory.filter(t => t > oneHourAgo);
        
        // 检查切换频率
        if (this.state.switchHistory.length > this.config.maxSwitchesPerHour) {
            this.flagSuspicious('excessive_switching', 
                `1小时内切换设备${this.state.switchHistory.length}次`);
        }
    },

    /**
     * 标记为可疑
     */
    flagSuspicious(reason, details) {
        this.state.isSuspicious = true;
        this.state.lockUntil = Date.now() + this.config.suspiciousLockDuration;
        this.updateTrustScore(-30, `可疑活动: ${reason}`);
        
        window.dispatchEvent(new CustomEvent('activationSuspicious', {
            detail: { reason, details, lockUntil: this.state.lockUntil }
        }));
        
        // 通知服务器
        this.callActivationAPI('reportSuspicious', {
            code: this.state.activationCode,
            deviceId: this.state.deviceId,
            reason,
            details
        }).catch(() => {});
    },

    /**
     * 分析使用行为
     */
    analyzeBehavior() {
        const now = new Date();
        const hour = now.getHours();
        const dayOfWeek = now.getDay();
        
        // 获取历史行为特征
        let profile = this.state.behaviorProfile || {
            activeHours: {},      // 活跃时段分布
            activeDays: {},       // 活跃日期分布
            sessionDurations: [], // 会话时长
            lastAnalysis: null
        };
        
        // 更新活跃时段
        profile.activeHours[hour] = (profile.activeHours[hour] || 0) + 1;
        profile.activeDays[dayOfWeek] = (profile.activeDays[dayOfWeek] || 0) + 1;
        profile.lastAnalysis = Date.now();
        
        this.state.behaviorProfile = profile;
        
        // 保存到本地
        localStorage.setItem('eb_behavior_profile', JSON.stringify(profile));
        
        return profile;
    },

    /**
     * 检测异常行为模式
     */
    detectAnomalousBehavior() {
        const profile = this.state.behaviorProfile;
        if (!profile || !profile.lastAnalysis) return false;
        
        const now = new Date();
        const hour = now.getHours();
        
        // 计算总活跃次数
        const totalActivity = Object.values(profile.activeHours).reduce((a, b) => a + b, 0);
        if (totalActivity < 10) return false; // 数据不足
        
        // 检查当前时段是否异常
        const currentHourActivity = profile.activeHours[hour] || 0;
        const avgActivity = totalActivity / 24;
        
        // 如果当前时段活跃度远低于平均值的10%，可能是异常
        if (currentHourActivity < avgActivity * 0.1 && avgActivity > 1) {
            return {
                anomaly: true,
                reason: 'unusual_time',
                details: `通常不在${hour}点使用`
            };
        }
        
        return { anomaly: false };
    },

    /**
     * 检查是否被锁定
     */
    isLocked() {
        if (!this.state.lockUntil) return false;
        if (Date.now() > this.state.lockUntil) {
            this.state.lockUntil = null;
            this.state.isSuspicious = false;
            return false;
        }
        return true;
    },

    /**
     * 获取剩余锁定时间
     */
    getRemainingLockTime() {
        if (!this.state.lockUntil) return 0;
        return Math.max(0, this.state.lockUntil - Date.now());
    },

    // ==================== v4.0 新增功能 ====================

    /**
     * 开始试用
     */
    startTrial() {
        if (this.state.trialStartDate) {
            return { success: false, message: '已使用过试用' };
        }
        
        this.state.trialStartDate = Date.now();
        this.state.isActivated = true;
        this.state.vipLevel = 'basic'; // 试用期享受基础VIP
        this.saveActivationState();
        
        return { 
            success: true, 
            message: `试用已开始，${this.config.trialDays}天内免费使用`,
            expiresAt: this.state.trialStartDate + this.config.trialDays * 24 * 60 * 60 * 1000
        };
    },

    /**
     * 检查试用状态
     */
    checkTrialStatus() {
        if (!this.state.trialStartDate) {
            return { inTrial: false, canStartTrial: true };
        }
        
        const trialEnd = this.state.trialStartDate + this.config.trialDays * 24 * 60 * 60 * 1000;
        const now = Date.now();
        
        if (now < trialEnd) {
            const remainingDays = Math.ceil((trialEnd - now) / (24 * 60 * 60 * 1000));
            return { 
                inTrial: true, 
                remainingDays,
                expiresAt: trialEnd
            };
        }
        
        return { inTrial: false, expired: true, canStartTrial: false };
    },

    /**
     * 获取VIP等级配置
     */
    getVipConfig() {
        return this.config.vipLevels[this.state.vipLevel] || this.config.vipLevels.free;
    },

    /**
     * 检查功能权限
     */
    hasFeature(feature) {
        const config = this.getVipConfig();
        return config.features.includes(feature);
    },

    /**
     * 获取当前最大设备数
     */
    getCurrentMaxDevices() {
        const config = this.getVipConfig();
        return config.maxDevices;
    },

    /**
     * 创建家庭组
     */
    async createFamily(familyName) {
        if (!this.config.enableFamilySharing) {
            return { success: false, message: '未启用家庭共享功能' };
        }
        
        if (!this.hasFeature('family')) {
            return { success: false, message: '请升级到家庭版以使用此功能' };
        }
        
        try {
            const result = await this.callActivationAPI('createFamily', {
                code: this.state.activationCode,
                familyName,
                ownerId: this.state.userId
            });
            
            if (result.success) {
                this.state.familyId = result.familyId;
                this.saveActivationState();
            }
            
            return result;
        } catch (error) {
            return { success: false, message: '创建家庭组失败' };
        }
    },

    /**
     * 邀请家庭成员
     */
    async inviteFamilyMember(email) {
        if (!this.state.familyId) {
            return { success: false, message: '请先创建家庭组' };
        }
        
        try {
            return await this.callActivationAPI('inviteFamily', {
                familyId: this.state.familyId,
                email,
                inviterId: this.state.userId
            });
        } catch (error) {
            return { success: false, message: '邀请失败' };
        }
    },

    /**
     * 生成设备迁移令牌
     */
    async generateMigrationToken() {
        const token = this.generateUUID().substring(0, 8).toUpperCase();
        const expires = Date.now() + 10 * 60 * 1000; // 10分钟有效
        
        this.state.deviceMigrationToken = {
            token,
            expires,
            fromDevice: this.state.deviceId
        };
        
        // 保存到服务器
        try {
            await this.callActivationAPI('createMigration', {
                code: this.state.activationCode,
                token,
                fromDeviceId: this.state.deviceId,
                expires
            });
        } catch (error) {
            console.warn('保存迁移令牌失败:', error);
        }
        
        return { token, expires };
    },

    /**
     * 使用迁移令牌
     */
    async useMigrationToken(token) {
        try {
            const result = await this.callActivationAPI('useMigration', {
                token: token.toUpperCase(),
                newDeviceId: this.state.deviceId,
                newFingerprint: this.state.deviceFingerprint,
                newDeviceInfo: this.getDeviceInfo()
            });
            
            if (result.success) {
                this.state.isActivated = true;
                this.state.activationCode = result.code;
                this.state.userId = result.userId;
                this.state.vipLevel = result.vipLevel;
                this.saveActivationState();
                this.startHeartbeat();
            }
            
            return result;
        } catch (error) {
            return { success: false, message: '迁移令牌无效或已过期' };
        }
    },

    /**
     * 获取我的设备列表
     */
    async getMyDevices() {
        try {
            const result = await this.callActivationAPI('devices', {
                code: this.state.activationCode
            });
            return result.devices || [];
        } catch (error) {
            return [];
        }
    },

    /**
     * 远程登出设备
     */
    async logoutDevice(deviceId) {
        try {
            const result = await this.callActivationAPI('kick', {
                code: this.state.activationCode,
                deviceIdToKick: deviceId
            });
            return result;
        } catch (error) {
            return { success: false, message: '操作失败' };
        }
    },

    /**
     * 获取激活状态摘要
     */
    getStatusSummary() {
        const trialStatus = this.checkTrialStatus();
        const vipConfig = this.getVipConfig();
        
        return {
            isActivated: this.state.isActivated,
            vipLevel: this.state.vipLevel,
            vipLevelName: {
                free: '免费版',
                basic: '基础版',
                premium: '高级版',
                family: '家庭版'
            }[this.state.vipLevel] || '免费版',
            maxDevices: vipConfig.maxDevices,
            features: vipConfig.features,
            inTrial: trialStatus.inTrial,
            trialRemainingDays: trialStatus.remainingDays,
            trustScore: this.state.trustScore,
            isLocked: this.isLocked(),
            lockRemainingTime: this.getRemainingLockTime(),
            deviceName: this.state.deviceName || this.getAutoDeviceName(),
            familyId: this.state.familyId
        };
    }
};

/**
 * 激活码UI组件
 * v10.0 - 试用功能高级UI设计 (10版迭代)
 * 
 * v1: 毛玻璃+流体渐变背景+星空粒子
 * v2: 3D卡片+全息光效边框
 * v3: 试用倒计时圆环动画
 * v4: 功能预览卡片轮播
 * v5: 霓虹呼吸按钮+波纹效果
 * v6: 试用成功烟花+礼盒开启动画
 * v7: 功能解锁逐项展示动画
 * v8: 进度条+倒计时组合效果
 * v9: 社交证明+用户评价滚动
 * v10: 深色模式+液态玻璃完美适配
 */
const ActivationUI = {
    /**
     * 显示激活对话框（试用优先版）
     */
    showActivationDialog() {
        // 检查是否已存在对话框
        if (document.getElementById('activation-dialog')) {
            return;
        }
        
        // 检查试用状态
        const trialStatus = ActivationSystem.checkTrialStatus();
        const canTrial = trialStatus.canStartTrial;
        const trialDays = ActivationSystem.config.trialDays;
        
        const dialog = document.createElement('div');
        dialog.id = 'activation-dialog';
        dialog.className = 'activation-overlay';
        dialog.innerHTML = `
            <!-- v1: 星空粒子背景 -->
            <div class="activation-bg-gradient"></div>
            <div class="activation-bg-stars" id="stars-container"></div>
            <div class="activation-bg-particles" id="particles-container"></div>
            
            <div class="activation-dialog trial-mode">
                <!-- v2: 全息光效边框 -->
                <div class="holographic-border"></div>
                <div class="activation-shine"></div>
                
                ${canTrial ? `
                <!-- ==================== 试用优先展示区 ==================== -->
                <div class="trial-hero-section">
                    <!-- v3: 试用倒计时圆环 -->
                    <div class="trial-countdown-ring">
                        <svg viewBox="0 0 200 200" class="countdown-svg">
                            <defs>
                                <linearGradient id="trialGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#f093fb"/>
                                    <stop offset="50%" style="stop-color:#f5576c"/>
                                    <stop offset="100%" style="stop-color:#4facfe"/>
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                    <feMerge>
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>
                            <circle class="ring-bg" cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8"/>
                            <circle class="ring-progress" cx="100" cy="100" r="85" fill="none" stroke="url(#trialGradient)" stroke-width="8" stroke-linecap="round" filter="url(#glow)" stroke-dasharray="534" stroke-dashoffset="0"/>
                        </svg>
                        <div class="countdown-content">
                            <div class="countdown-gift">
                                <div class="gift-box">
                                    <div class="gift-lid"></div>
                                    <div class="gift-body">🎁</div>
                                </div>
                            </div>
                            <div class="countdown-days">
                                <span class="days-number">${trialDays}</span>
                                <span class="days-text">天</span>
                            </div>
                            <div class="countdown-label">免费体验</div>
                        </div>
                    </div>
                    
                    <!-- v1: 标题区域 -->
                    <h2 class="trial-hero-title">
                        <span class="title-highlight">限时福利</span>
                        <span class="title-main">免费畅享 ${trialDays} 天</span>
                    </h2>
                    <p class="trial-hero-subtitle">无需付费，无需激活码，立即解锁全部高级功能</p>
                    
                    <!-- v4: 功能预览卡片 -->
                    <div class="feature-preview-cards">
                        <div class="feature-card" style="--delay: 0s">
                            <div class="feature-card-icon">📚</div>
                            <div class="feature-card-name">核心词汇</div>
                            <div class="feature-card-desc">5000+学术词汇</div>
                        </div>
                        <div class="feature-card" style="--delay: 0.1s">
                            <div class="feature-card-icon">🎧</div>
                            <div class="feature-card-name">精听训练</div>
                            <div class="feature-card-desc">地道发音练习</div>
                        </div>
                        <div class="feature-card" style="--delay: 0.2s">
                            <div class="feature-card-icon">💬</div>
                            <div class="feature-card-name">口语对话</div>
                            <div class="feature-card-desc">AI智能对练</div>
                        </div>
                        <div class="feature-card" style="--delay: 0.3s">
                            <div class="feature-card-icon">📖</div>
                            <div class="feature-card-name">阅读理解</div>
                            <div class="feature-card-desc">学术文章精选</div>
                        </div>
                    </div>
                    
                    <!-- v5: 霓虹呼吸试用按钮 -->
                    <button id="start-trial-btn" class="trial-hero-btn">
                        <span class="btn-glow"></span>
                        <span class="btn-shine"></span>
                        <span class="btn-content">
                            <span class="btn-icon">🚀</span>
                            <span class="btn-text">立即开始免费体验</span>
                        </span>
                        <span class="btn-ripple"></span>
                    </button>
                    
                    <!-- v9: 社交证明 -->
                    <div class="social-proof">
                        <div class="user-avatars">
                            <div class="avatar" style="--i:1">👨‍🎓</div>
                            <div class="avatar" style="--i:2">👩‍💻</div>
                            <div class="avatar" style="--i:3">👨‍🔬</div>
                            <div class="avatar" style="--i:4">👩‍🏫</div>
                            <div class="avatar" style="--i:5">+</div>
                        </div>
                        <div class="proof-text">
                            <span class="proof-count">10,000+</span> 用户正在使用
                        </div>
                    </div>
                </div>
                
                <!-- 分割线 -->
                <div class="section-divider">
                    <span class="divider-line"></span>
                    <span class="divider-text">已有激活码？</span>
                    <span class="divider-line"></span>
                </div>
                ` : ''}
                
                <!-- ==================== 激活码输入区（折叠式） ==================== -->
                <div class="activation-section ${canTrial ? 'collapsed' : 'expanded'}" id="activation-section">
                    ${canTrial ? `
                    <button class="expand-activation-btn" id="expand-activation">
                        <span>使用激活码激活</span>
                        <svg class="expand-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
                        </svg>
                    </button>
                    ` : `
                    <div class="activation-header-compact">
                        <div class="activation-icon-small">🔐</div>
                        <div class="activation-header-text">
                            <h2>激活应用</h2>
                            <p>输入激活码解锁全部功能</p>
                        </div>
                    </div>
                    `}
                    
                    <div class="activation-form-area" id="activation-form-area">
                        <div class="activation-input-container">
                            <label class="input-label">激活码</label>
                            <div class="activation-input-group">
                                <div class="input-icon-left">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
                                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                                    </svg>
                                </div>
                                <input type="text" 
                                       id="activation-code-input" 
                                       placeholder="XXXX-XXXX-XXXX-XXXX"
                                       maxlength="19"
                                       autocomplete="off"
                                       spellcheck="false">
                                <button id="paste-code-btn" class="paste-btn" title="从剪贴板粘贴">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 2h-4.18C14.4.84 13.3 0 12 0c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 18H5V4h2v3h10V4h2v16z"/>
                                    </svg>
                                </button>
                                <div class="input-glow"></div>
                            </div>
                        </div>
                        
                        <div id="activation-error" class="activation-error">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                            </svg>
                            <span id="error-text"></span>
                        </div>
                        
                        <button id="activate-btn" class="activation-btn">
                            <span class="btn-bg"></span>
                            <span class="btn-content">
                                <span class="btn-text">立即激活</span>
                                <svg class="btn-arrow" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                                </svg>
                            </span>
                            <span class="btn-loading" style="display:none;">
                                <svg class="loading-spinner" width="24" height="24" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="32" stroke-linecap="round"/>
                                </svg>
                                验证中...
                            </span>
                        </button>
                    </div>
                </div>
                
                <!-- 底部信息 -->
                <div class="activation-footer">
                    <div class="footer-links">
                        <a href="#" id="get-code-link" class="footer-link primary">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            获取激活码
                        </a>
                        <span class="footer-divider">•</span>
                        <a href="#" id="migration-btn" class="footer-link">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
                            </svg>
                            设备迁移
                        </a>
                    </div>
                    <p class="footer-tip">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        激活码支持 ${ActivationSystem.config.maxDevices} 台设备同时使用
                    </p>
                </div>
                
                <!-- 关闭按钮 -->
                <button class="activation-close-btn" id="activation-close">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // 添加样式
        this.injectStyles();
        
        // 绑定事件
        this.bindDialogEvents();
        
        // 聚焦输入框
        setTimeout(() => {
            document.getElementById('activation-code-input')?.focus();
        }, 100);
    },

    /**
     * 关闭激活对话框
     */
    closeActivationDialog() {
        const dialog = document.getElementById('activation-dialog');
        if (dialog) {
            dialog.classList.add('closing');
            setTimeout(() => dialog.remove(), 300);
        }
    },

    /**
     * 绑定对话框事件
     * v5: 增强版事件绑定
     */
    bindDialogEvents() {
        const input = document.getElementById('activation-code-input');
        const activateBtn = document.getElementById('activate-btn');
        const pasteBtn = document.getElementById('paste-code-btn');
        const getCodeLink = document.getElementById('get-code-link');
        const closeBtn = document.getElementById('activation-close');
        
        // v5: 初始化粒子动画
        this.initParticles();
        
        // v5: 输入框聚焦效果
        input?.addEventListener('focus', () => {
            input.parentElement?.classList.add('focused');
        });
        
        input?.addEventListener('blur', () => {
            input.parentElement?.classList.remove('focused');
        });
        
        // 输入格式化
        input?.addEventListener('input', (e) => {
            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            
            // 自动添加连字符
            if (value.length > 4) {
                value = value.match(/.{1,4}/g).join('-');
            }
            
            e.target.value = value.substring(0, 19);
            
            // 清除错误
            const errorEl = document.getElementById('activation-error');
            errorEl?.classList.remove('show');
            
            // v4: 输入进度指示
            this.updateInputProgress(value);
        });
        
        // 回车激活
        input?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                activateBtn?.click();
            }
        });
        
        // 粘贴按钮
        pasteBtn?.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                if (input) {
                    input.value = text.toUpperCase().replace(/[^A-Z0-9-]/g, '');
                    input.dispatchEvent(new Event('input'));
                    // v4: 粘贴成功反馈
                    pasteBtn.classList.add('paste-success');
                    setTimeout(() => pasteBtn.classList.remove('paste-success'), 500);
                }
            } catch (err) {
                console.warn('无法读取剪贴板:', err);
            }
        });
        
        // 激活按钮
        activateBtn?.addEventListener('click', async () => {
            const code = input?.value;
            const errorEl = document.getElementById('activation-error');
            const errorText = document.getElementById('error-text');
            const btnContent = activateBtn.querySelector('.btn-content');
            const btnLoading = activateBtn.querySelector('.btn-loading');
            
            if (!code || code.length < 19) {
                if (errorText) errorText.textContent = '请输入完整的激活码';
                errorEl?.classList.add('show', 'shake');
                setTimeout(() => errorEl?.classList.remove('shake'), 500);
                return;
            }
            
            // 显示加载状态
            if (btnContent) btnContent.style.display = 'none';
            if (btnLoading) btnLoading.style.display = 'flex';
            activateBtn.disabled = true;
            activateBtn.classList.add('loading');
            
            try {
                const result = await ActivationSystem.activate(code);
                
                if (result.success) {
                    // v5: 激活成功 - 显示高级成功动画
                    this.showSuccessAnimation();
                    setTimeout(() => {
                        this.closeActivationDialog();
                        window.dispatchEvent(new CustomEvent('activationSuccess'));
                    }, 3000);
                } else {
                    // 激活失败
                    if (errorText) errorText.textContent = result.message;
                    errorEl?.classList.add('show', 'shake');
                    setTimeout(() => errorEl?.classList.remove('shake'), 500);
                    
                    if (btnContent) btnContent.style.display = 'flex';
                    if (btnLoading) btnLoading.style.display = 'none';
                    activateBtn.disabled = false;
                    activateBtn.classList.remove('loading');
                }
            } catch (err) {
                if (errorText) errorText.textContent = '激活失败，请稍后重试';
                errorEl?.classList.add('show');
                
                if (btnContent) btnContent.style.display = 'flex';
                if (btnLoading) btnLoading.style.display = 'none';
                activateBtn.disabled = false;
                activateBtn.classList.remove('loading');
            }
        });
        
        // 获取激活码链接
        getCodeLink?.addEventListener('click', (e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('showPurchaseOptions'));
        });
        
        // 关闭按钮
        closeBtn?.addEventListener('click', () => {
            this.closeActivationDialog();
        });
        
        // v10: 展开/折叠激活码区域
        const expandBtn = document.getElementById('expand-activation');
        const activationSection = document.getElementById('activation-section');
        const activationFormArea = document.getElementById('activation-form-area');
        
        expandBtn?.addEventListener('click', () => {
            const isCollapsed = activationSection?.classList.contains('collapsed');
            if (isCollapsed) {
                activationSection.classList.remove('collapsed');
                activationSection.classList.add('expanded');
                expandBtn.classList.add('expanded');
            } else {
                activationSection.classList.add('collapsed');
                activationSection.classList.remove('expanded');
                expandBtn.classList.remove('expanded');
            }
        });
        
        // v10: 试用按钮（高级版）
        const trialBtn = document.getElementById('start-trial-btn');
        trialBtn?.addEventListener('click', () => {
            // 添加按钮点击动画
            trialBtn.classList.add('clicked');
            
            const result = ActivationSystem.startTrial();
            if (result.success) {
                // v6-v8: 显示试用成功的高级动画
                this.showTrialSuccessAnimation();
                setTimeout(() => {
                    this.closeActivationDialog();
                    window.dispatchEvent(new CustomEvent('trialStarted'));
                }, 4500);
            } else {
                trialBtn.classList.remove('clicked');
                const errorEl = document.getElementById('activation-error');
                const errorText = document.getElementById('error-text');
                if (errorText) errorText.textContent = result.message;
                errorEl?.classList.add('show');
            }
        });
        
        // 设备迁移按钮
        const migrationBtn = document.getElementById('migration-btn');
        migrationBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showMigrationDialog();
        });
    },

    /**
     * v10: 初始化星空背景
     */
    initStars() {
        const container = document.getElementById('stars-container');
        if (!container) return;
        
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                width: ${1 + Math.random() * 2}px;
                height: ${1 + Math.random() * 2}px;
                animation-delay: ${Math.random() * 3}s;
                animation-duration: ${2 + Math.random() * 3}s;
            `;
            container.appendChild(star);
        }
    },

    /**
     * v5: 初始化粒子动画
     */
    initParticles() {
        const container = document.getElementById('particles-container');
        if (!container) return;
        
        // 先初始化星空
        this.initStars();
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 5}s;
                animation-duration: ${3 + Math.random() * 4}s;
            `;
            container.appendChild(particle);
        }
    },

    /**
     * v4: 更新输入进度
     */
    updateInputProgress(value) {
        const cleanValue = value.replace(/-/g, '');
        const progress = Math.min(cleanValue.length / 16 * 100, 100);
        const inputGroup = document.querySelector('.activation-input-group');
        if (inputGroup) {
            inputGroup.style.setProperty('--input-progress', `${progress}%`);
        }
    },

    /**
     * v6-v8: 显示试用成功的高级动画
     */
    showTrialSuccessAnimation() {
        const dialog = document.querySelector('.activation-dialog');
        const trialDays = ActivationSystem.config.trialDays;
        
        if (dialog) {
            dialog.classList.add('success-mode', 'trial-success');
            dialog.innerHTML = `
                <!-- v6: 烟花爆炸效果 -->
                <div class="fireworks-container" id="fireworks"></div>
                <div class="confetti-container" id="confetti"></div>
                
                <div class="trial-success-content">
                    <!-- v6: 礼盒开启动画 -->
                    <div class="gift-open-animation">
                        <div class="gift-box-wrapper">
                            <div class="gift-lid-open">
                                <div class="lid-top"></div>
                                <div class="lid-ribbon"></div>
                            </div>
                            <div class="gift-box-open">
                                <div class="box-front"></div>
                                <div class="box-ribbon"></div>
                            </div>
                            <div class="gift-glow"></div>
                            <div class="gift-rays">
                                ${Array(12).fill(0).map((_, i) => `<div class="ray" style="--i:${i}"></div>`).join('')}
                            </div>
                        </div>
                    </div>
                    
                    <!-- v7: 成功文字动画 -->
                    <div class="success-text-area">
                        <h2 class="trial-success-title">
                            <span class="title-line line-1">🎉 恭喜！</span>
                            <span class="title-line line-2">试用已激活</span>
                        </h2>
                        
                        <!-- v8: 倒计时显示 -->
                        <div class="trial-countdown-display">
                            <div class="countdown-circle">
                                <svg viewBox="0 0 100 100">
                                    <circle class="countdown-bg" cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
                                    <circle class="countdown-progress" cx="50" cy="50" r="45" fill="none" stroke="url(#successGradient2)" stroke-width="4" stroke-linecap="round" stroke-dasharray="283" stroke-dashoffset="0"/>
                                </svg>
                                <div class="countdown-inner">
                                    <span class="countdown-number">${trialDays}</span>
                                    <span class="countdown-unit">天</span>
                                </div>
                            </div>
                            <div class="countdown-label">免费使用剩余</div>
                        </div>
                    </div>
                    
                    <!-- v7: 功能解锁逐项展示 -->
                    <div class="features-unlock-list">
                        <div class="unlock-title">已为您解锁以下功能</div>
                        <div class="unlock-items">
                            <div class="unlock-item" style="--delay: 0.8s">
                                <div class="unlock-check">
                                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
                                </div>
                                <span class="unlock-icon">📚</span>
                                <span class="unlock-name">核心词汇学习</span>
                            </div>
                            <div class="unlock-item" style="--delay: 1.0s">
                                <div class="unlock-check">
                                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
                                </div>
                                <span class="unlock-icon">🎧</span>
                                <span class="unlock-name">精听训练模块</span>
                            </div>
                            <div class="unlock-item" style="--delay: 1.2s">
                                <div class="unlock-check">
                                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
                                </div>
                                <span class="unlock-icon">💬</span>
                                <span class="unlock-name">口语对话练习</span>
                            </div>
                            <div class="unlock-item" style="--delay: 1.4s">
                                <div class="unlock-check">
                                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
                                </div>
                                <span class="unlock-icon">📖</span>
                                <span class="unlock-name">阅读理解训练</span>
                            </div>
                            <div class="unlock-item" style="--delay: 1.6s">
                                <div class="unlock-check">
                                    <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill="currentColor"/></svg>
                                </div>
                                <span class="unlock-icon">📊</span>
                                <span class="unlock-name">学习进度统计</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- v8: 进度条 -->
                    <div class="auto-enter-section">
                        <div class="auto-enter-text">正在进入应用...</div>
                        <div class="auto-enter-bar">
                            <div class="bar-progress"></div>
                        </div>
                    </div>
                </div>
            `;
            
            // v6: 启动烟花效果
            this.startFireworks();
            this.startConfetti();
        }
    },

    /**
     * v6: 烟花效果
     */
    startFireworks() {
        const container = document.getElementById('fireworks');
        if (!container) return;
        
        const colors = ['#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#ffecd2', '#667eea', '#764ba2'];
        
        const createFirework = () => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = `${20 + Math.random() * 60}%`;
            firework.style.top = `${20 + Math.random() * 40}%`;
            
            // 创建爆炸粒子
            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('div');
                particle.className = 'fw-particle';
                const angle = (i / 20) * Math.PI * 2;
                const velocity = 50 + Math.random() * 50;
                particle.style.setProperty('--x', `${Math.cos(angle) * velocity}px`);
                particle.style.setProperty('--y', `${Math.sin(angle) * velocity}px`);
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                firework.appendChild(particle);
            }
            
            container.appendChild(firework);
            setTimeout(() => firework.remove(), 1500);
        };
        
        // 创建多个烟花
        for (let i = 0; i < 5; i++) {
            setTimeout(createFirework, i * 400);
        }
    },

    /**
     * v5: 显示高级成功动画（激活码激活）
     */
    showSuccessAnimation(title = '激活成功！', subtitle = '欢迎使用学术英语精进', type = 'activation') {
        const dialog = document.querySelector('.activation-dialog');
        if (dialog) {
            dialog.classList.add('success-mode');
            dialog.innerHTML = `
                <!-- v5: 烟花/五彩纸屑动画 -->
                <div class="confetti-container" id="confetti"></div>
                
                <div class="activation-success">
                    <!-- v5: 成功勋章 -->
                    <div class="success-badge">
                        <div class="badge-ring"></div>
                        <div class="badge-ring delay-1"></div>
                        <div class="badge-ring delay-2"></div>
                        <div class="badge-icon ${type}">
                            ${type === 'trial' ? `
                                <svg viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#successGradient)" stroke-width="4"/>
                                    <text x="50" y="60" text-anchor="middle" font-size="40">🎁</text>
                                </svg>
                            ` : `
                                <svg viewBox="0 0 100 100">
                                    <defs>
                                        <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style="stop-color:#10b981"/>
                                            <stop offset="100%" style="stop-color:#059669"/>
                                        </linearGradient>
                                    </defs>
                                    <circle cx="50" cy="50" r="40" fill="url(#successGradient)"/>
                                    <path class="checkmark" d="M30 50 L45 65 L70 35" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            `}
                        </div>
                    </div>
                    
                    <!-- v5: 成功文字动画 -->
                    <h2 class="success-title">${title}</h2>
                    <p class="success-subtitle">${subtitle}</p>
                    
                    <!-- v5: 解锁功能展示 -->
                    <div class="unlocked-features">
                        <div class="feature-item" style="--delay: 0.2s">
                            <span class="feature-icon">📚</span>
                            <span>核心词汇库</span>
                        </div>
                        <div class="feature-item" style="--delay: 0.4s">
                            <span class="feature-icon">🎧</span>
                            <span>精听训练</span>
                        </div>
                        <div class="feature-item" style="--delay: 0.6s">
                            <span class="feature-icon">💬</span>
                            <span>口语练习</span>
                        </div>
                        <div class="feature-item" style="--delay: 0.8s">
                            <span class="feature-icon">📖</span>
                            <span>阅读理解</span>
                        </div>
                    </div>
                    
                    <div class="success-countdown">
                        <span class="countdown-text">即将进入应用...</span>
                        <div class="countdown-bar"></div>
                    </div>
                </div>
            `;
            
            // v5: 启动五彩纸屑动画
            this.startConfetti();
        }
    },

    /**
     * v5: 五彩纸屑动画
     */
    startConfetti() {
        const container = document.getElementById('confetti');
        if (!container) return;
        
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe', '#43e97b', '#38f9d7', '#ffecd2', '#fcb69f'];
        const shapes = ['square', 'circle', 'triangle'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = `confetti ${shapes[Math.floor(Math.random() * shapes.length)]}`;
                confetti.style.cssText = `
                    left: ${Math.random() * 100}%;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    animation-duration: ${1 + Math.random() * 2}s;
                    animation-delay: ${Math.random() * 0.5}s;
                `;
                container.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 30);
        }
    },

    // ==================== v2.0 新增UI ====================

    /**
     * 显示设备管理界面
     */
    async showDeviceManager() {
        const overlay = document.createElement('div');
        overlay.id = 'device-manager-overlay';
        overlay.className = 'activation-overlay';
        
        const devices = await ActivationSystem.getMyDevices();
        const currentDeviceId = ActivationSystem.state.deviceId;
        const maxDevices = ActivationSystem.getCurrentMaxDevices();
        
        overlay.innerHTML = `
            <div class="device-manager-dialog">
                <div class="dm-header">
                    <h2>📱 设备管理</h2>
                    <button class="dm-close-btn" id="dm-close">✕</button>
                </div>
                
                <div class="dm-info">
                    <div class="dm-stat">
                        <span class="dm-stat-value">${devices.length}</span>
                        <span class="dm-stat-label">/ ${maxDevices} 台设备</span>
                    </div>
                    <div class="dm-trust-score">
                        <span>信任分数</span>
                        <div class="dm-trust-bar">
                            <div class="dm-trust-fill" style="width: ${ActivationSystem.state.trustScore}%"></div>
                        </div>
                        <span class="dm-trust-value">${ActivationSystem.state.trustScore}</span>
                    </div>
                </div>
                
                <div class="dm-devices-list">
                    ${devices.map(device => `
                        <div class="dm-device-item ${device.deviceId === currentDeviceId ? 'current' : ''} ${device.isActive ? 'active' : 'inactive'}">
                            <div class="dm-device-icon">${this.getDeviceIcon(device.info)}</div>
                            <div class="dm-device-info">
                                <div class="dm-device-name">${device.info?.deviceName || this.getDeviceNameFromInfo(device.info)}</div>
                                <div class="dm-device-detail">
                                    ${device.deviceId === currentDeviceId ? '当前设备 · ' : ''}
                                    ${device.isActive ? '🟢 在线' : '⚪ 离线'}
                                    ${device.lastActive ? ' · ' + this.formatTime(device.lastActive) : ''}
                                </div>
                            </div>
                            ${device.deviceId !== currentDeviceId ? `
                                <button class="dm-kick-btn" data-device-id="${device.deviceId}">
                                    登出
                                </button>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
                
                <div class="dm-actions">
                    <button class="dm-action-btn" id="dm-rename-btn">
                        ✏️ 修改设备名称
                    </button>
                    <button class="dm-action-btn" id="dm-migration-btn">
                        🔄 迁移到新设备
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.injectDeviceManagerStyles();
        
        // 绑定事件
        document.getElementById('dm-close')?.addEventListener('click', () => {
            overlay.remove();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
        
        // 登出按钮
        overlay.querySelectorAll('.dm-kick-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                const deviceId = e.target.dataset.deviceId;
                if (confirm('确定要登出此设备吗？')) {
                    const result = await ActivationSystem.logoutDevice(deviceId);
                    if (result.success) {
                        e.target.closest('.dm-device-item').remove();
                    }
                }
            });
        });
        
        // 修改设备名称
        document.getElementById('dm-rename-btn')?.addEventListener('click', () => {
            this.showRenameDialog();
        });
        
        // 设备迁移
        document.getElementById('dm-migration-btn')?.addEventListener('click', () => {
            this.showMigrationDialog();
        });
    },

    /**
     * 获取设备图标
     */
    getDeviceIcon(info) {
        if (!info) return '📱';
        const platform = info.platform || '';
        const ua = info.userAgent || '';
        
        if (/iPhone/.test(ua)) return '📱';
        if (/iPad/.test(ua)) return '📱';
        if (/Android/.test(ua)) return '📱';
        if (/Mac/.test(platform)) return '💻';
        if (/Win/.test(platform)) return '🖥️';
        if (/Linux/.test(platform)) return '🐧';
        return '📱';
    },

    /**
     * 从设备信息获取名称
     */
    getDeviceNameFromInfo(info) {
        if (!info) return '未知设备';
        return ActivationSystem.getAutoDeviceName();
    },

    /**
     * 格式化时间
     */
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return '刚刚';
        if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`;
        return `${Math.floor(diff / 86400000)}天前`;
    },

    /**
     * 显示重命名对话框
     */
    showRenameDialog() {
        const currentName = ActivationSystem.state.deviceName || ActivationSystem.getAutoDeviceName();
        const newName = prompt('请输入设备名称：', currentName);
        if (newName && newName !== currentName) {
            ActivationSystem.setDeviceName(newName);
            if (typeof showToast === 'function') {
                showToast('设备名称已更新', 'success');
            }
        }
    },

    // ==================== v3.0 新增UI ====================

    /**
     * 显示可疑活动警告
     */
    showSuspiciousWarning(reason, details, lockUntil) {
        const overlay = document.createElement('div');
        overlay.id = 'suspicious-warning';
        overlay.className = 'activation-overlay';
        
        const remainingTime = lockUntil ? Math.ceil((lockUntil - Date.now()) / (60 * 60 * 1000)) : 0;
        
        overlay.innerHTML = `
            <div class="suspicious-dialog">
                <div class="suspicious-icon">⚠️</div>
                <h2>检测到异常活动</h2>
                <p class="suspicious-reason">${details}</p>
                <p class="suspicious-lock">账号已被临时锁定 ${remainingTime} 小时</p>
                <div class="suspicious-actions">
                    <button class="suspicious-btn" id="suspicious-verify">验证身份解锁</button>
                    <button class="suspicious-btn secondary" id="suspicious-contact">联系客服</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        document.getElementById('suspicious-verify')?.addEventListener('click', () => {
            this.showVerificationDialog();
            overlay.remove();
        });
        
        document.getElementById('suspicious-contact')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('contactSupport'));
        });
    },

    /**
     * 显示二次验证对话框
     */
    showVerificationDialog() {
        const overlay = document.createElement('div');
        overlay.id = 'verification-dialog';
        overlay.className = 'activation-overlay';
        
        overlay.innerHTML = `
            <div class="verification-dialog">
                <h2>🔒 身份验证</h2>
                <p>为保护您的账号安全，请完成验证</p>
                
                <div class="verification-methods">
                    <button class="verify-method-btn" id="verify-email">
                        📧 邮箱验证码
                    </button>
                    <button class="verify-method-btn" id="verify-sms">
                        📱 短信验证码
                    </button>
                </div>
                
                <div class="verification-input" style="display:none;">
                    <input type="text" id="verify-code-input" placeholder="请输入验证码" maxlength="6">
                    <button class="verify-submit-btn" id="verify-submit">验证</button>
                </div>
                
                <button class="verify-cancel-btn" id="verify-cancel">取消</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        
        const inputSection = overlay.querySelector('.verification-input');
        
        document.getElementById('verify-email')?.addEventListener('click', () => {
            inputSection.style.display = 'block';
            // TODO: 发送邮箱验证码
        });
        
        document.getElementById('verify-sms')?.addEventListener('click', () => {
            inputSection.style.display = 'block';
            // TODO: 发送短信验证码
        });
        
        document.getElementById('verify-submit')?.addEventListener('click', () => {
            const code = document.getElementById('verify-code-input')?.value;
            if (code?.length === 6) {
                ActivationSystem.completeVerification(code);
                overlay.remove();
                if (typeof showToast === 'function') {
                    showToast('验证成功', 'success');
                }
            }
        });
        
        document.getElementById('verify-cancel')?.addEventListener('click', () => {
            overlay.remove();
        });
    },

    // ==================== v4.0 新增UI ====================

    /**
     * 显示VIP状态面板
     */
    showVipStatusPanel() {
        const status = ActivationSystem.getStatusSummary();
        
        const overlay = document.createElement('div');
        overlay.id = 'vip-status-panel';
        overlay.className = 'activation-overlay';
        
        const trialInfo = status.inTrial ? `
            <div class="vip-trial-badge">试用中</div>
            <p class="vip-trial-remaining">剩余 ${status.trialRemainingDays} 天</p>
        ` : '';
        
        overlay.innerHTML = `
            <div class="vip-panel">
                <button class="vip-close-btn" id="vip-close">✕</button>
                
                <div class="vip-header">
                    <div class="vip-avatar">👤</div>
                    <h2>${status.deviceName}</h2>
                    <div class="vip-level vip-level-${status.vipLevel}">
                        ${this.getVipBadge(status.vipLevel)}
                        ${status.vipLevelName}
                    </div>
                    ${trialInfo}
                </div>
                
                <div class="vip-stats">
                    <div class="vip-stat">
                        <div class="vip-stat-icon">📱</div>
                        <div class="vip-stat-value">${status.maxDevices}</div>
                        <div class="vip-stat-label">设备上限</div>
                    </div>
                    <div class="vip-stat">
                        <div class="vip-stat-icon">⭐</div>
                        <div class="vip-stat-value">${status.trustScore}</div>
                        <div class="vip-stat-label">信任分数</div>
                    </div>
                    <div class="vip-stat">
                        <div class="vip-stat-icon">🎯</div>
                        <div class="vip-stat-value">${status.features.length}</div>
                        <div class="vip-stat-label">可用功能</div>
                    </div>
                </div>
                
                <div class="vip-features">
                    <h3>可用功能</h3>
                    <div class="vip-features-list">
                        ${this.renderFeatures(status.features)}
                    </div>
                </div>
                
                ${status.vipLevel !== 'family' ? `
                    <button class="vip-upgrade-btn" id="vip-upgrade">
                        🚀 升级会员
                    </button>
                ` : ''}
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.injectVipPanelStyles();
        
        document.getElementById('vip-close')?.addEventListener('click', () => {
            overlay.remove();
        });
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.remove();
        });
        
        document.getElementById('vip-upgrade')?.addEventListener('click', () => {
            window.dispatchEvent(new CustomEvent('showPurchaseOptions'));
        });
    },

    /**
     * 获取VIP徽章
     */
    getVipBadge(level) {
        const badges = {
            free: '🆓',
            basic: '🔹',
            premium: '💎',
            family: '👨‍👩‍👧‍👦'
        };
        return badges[level] || '🆓';
    },

    /**
     * 渲染功能列表
     */
    renderFeatures(features) {
        const featureNames = {
            basic: '基础学习',
            sync: '云同步',
            offline: '离线使用',
            priority: '优先客服',
            family: '家庭共享'
        };
        
        return features.map(f => `
            <div class="vip-feature-item">
                <span class="vip-feature-check">✓</span>
                <span>${featureNames[f] || f}</span>
            </div>
        `).join('');
    },

    /**
     * 显示设备迁移对话框
     */
    async showMigrationDialog() {
        const overlay = document.createElement('div');
        overlay.id = 'migration-dialog';
        overlay.className = 'activation-overlay';
        
        overlay.innerHTML = `
            <div class="migration-dialog">
                <h2>🔄 设备迁移</h2>
                
                <div class="migration-tabs">
                    <button class="migration-tab active" data-tab="generate">生成迁移码</button>
                    <button class="migration-tab" data-tab="use">使用迁移码</button>
                </div>
                
                <div class="migration-content">
                    <div class="migration-panel" id="panel-generate">
                        <p>在新设备上输入此迁移码，即可将激活状态迁移到新设备</p>
                        <button class="migration-generate-btn" id="migration-generate">
                            生成迁移码
                        </button>
                        <div class="migration-code-display" id="migration-code-display" style="display:none;">
                            <div class="migration-code" id="migration-code"></div>
                            <div class="migration-expires">10分钟内有效</div>
                        </div>
                    </div>
                    
                    <div class="migration-panel" id="panel-use" style="display:none;">
                        <p>请输入旧设备上生成的迁移码</p>
                        <input type="text" id="migration-input" placeholder="请输入迁移码" maxlength="8">
                        <button class="migration-use-btn" id="migration-use">
                            迁移到此设备
                        </button>
                    </div>
                </div>
                
                <button class="migration-close-btn" id="migration-close">关闭</button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        this.injectMigrationStyles();
        
        // Tab切换
        overlay.querySelectorAll('.migration-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                overlay.querySelectorAll('.migration-tab').forEach(t => t.classList.remove('active'));
                overlay.querySelectorAll('.migration-panel').forEach(p => p.style.display = 'none');
                tab.classList.add('active');
                document.getElementById(`panel-${tab.dataset.tab}`).style.display = 'block';
            });
        });
        
        // 生成迁移码
        document.getElementById('migration-generate')?.addEventListener('click', async () => {
            const result = await ActivationSystem.generateMigrationToken();
            document.getElementById('migration-code').textContent = result.token;
            document.getElementById('migration-code-display').style.display = 'block';
        });
        
        // 使用迁移码
        document.getElementById('migration-use')?.addEventListener('click', async () => {
            const code = document.getElementById('migration-input')?.value;
            if (code) {
                const result = await ActivationSystem.useMigrationToken(code);
                if (result.success) {
                    overlay.remove();
                    if (typeof showToast === 'function') {
                        showToast('迁移成功！', 'success');
                    }
                    window.dispatchEvent(new CustomEvent('activationSuccess'));
                } else {
                    alert(result.message);
                }
            }
        });
        
        document.getElementById('migration-close')?.addEventListener('click', () => {
            overlay.remove();
        });
    },

    /**
     * 注入样式
     * v10: 试用功能高级UI样式 (10版迭代)
     */
    injectStyles() {
        if (document.getElementById('activation-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'activation-styles';
        styles.textContent = `
            /* ==================== v1: 星空流体渐变背景 ==================== */
            .activation-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                overflow: hidden;
            }
            
            .activation-bg-gradient {
                position: absolute;
                inset: 0;
                background: 
                    radial-gradient(ellipse at 20% 20%, rgba(240, 147, 251, 0.3) 0%, transparent 50%),
                    radial-gradient(ellipse at 80% 80%, rgba(79, 172, 254, 0.3) 0%, transparent 50%),
                    radial-gradient(ellipse at 50% 50%, rgba(245, 87, 108, 0.2) 0%, transparent 40%);
                animation: gradientShift 15s ease infinite;
            }
            
            @keyframes gradientShift {
                0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
                50% { transform: scale(1.2) rotate(10deg); opacity: 1; }
            }
            
            /* v1: 星空背景 */
            .activation-bg-stars {
                position: absolute;
                inset: 0;
                overflow: hidden;
                pointer-events: none;
            }
            
            .star {
                position: absolute;
                background: #fff;
                border-radius: 50%;
                animation: starTwinkle ease-in-out infinite;
            }
            
            @keyframes starTwinkle {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            
            /* v2: 粒子动画 */
            .activation-bg-particles {
                position: absolute;
                inset: 0;
                overflow: hidden;
                pointer-events: none;
            }
            
            .particle {
                position: absolute;
                width: 6px;
                height: 6px;
                background: linear-gradient(135deg, #f093fb, #f5576c);
                border-radius: 50%;
                animation: particleFloat linear infinite;
                box-shadow: 0 0 10px rgba(240, 147, 251, 0.5);
            }
            
            @keyframes particleFloat {
                0% { transform: translateY(100vh) scale(0) rotate(0deg); opacity: 0; }
                10% { opacity: 0.8; }
                90% { opacity: 0.8; }
                100% { transform: translateY(-100vh) scale(1) rotate(360deg); opacity: 0; }
            }
            
            .activation-overlay.closing {
                animation: fadeOut 0.3s ease forwards;
            }
            
            /* ==================== v2: 3D卡片+全息边框 ==================== */
            .activation-dialog {
                position: relative;
                background: linear-gradient(180deg, 
                    rgba(255, 255, 255, 0.98) 0%, 
                    rgba(248, 250, 252, 0.95) 100%);
                border-radius: 28px;
                padding: 0;
                max-width: 440px;
                width: 94%;
                max-height: 90vh;
                overflow-y: auto;
                box-shadow: 
                    0 30px 60px -15px rgba(0, 0, 0, 0.5),
                    0 0 0 1px rgba(255, 255, 255, 0.2),
                    inset 0 1px 0 rgba(255, 255, 255, 0.9);
                animation: dialogEnter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                transform-style: preserve-3d;
            }
            
            .activation-dialog.trial-mode {
                max-width: 480px;
            }
            
            @keyframes dialogEnter {
                from { 
                    opacity: 0;
                    transform: translateY(50px) scale(0.9) rotateX(15deg);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0) scale(1) rotateX(0);
                }
            }
            
            /* v2: 全息光效边框 */
            .holographic-border {
                position: absolute;
                inset: -3px;
                background: linear-gradient(135deg, 
                    #f093fb, #f5576c, #4facfe, #00f2fe, #43e97b, #f093fb);
                background-size: 300% 300%;
                border-radius: 31px;
                z-index: -1;
                animation: holographicShift 4s ease infinite;
                opacity: 0.9;
            }
            
            @keyframes holographicShift {
                0%, 100% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
            }
            
            /* v2: 闪光效果 */
            .activation-shine {
                position: absolute;
                top: 0;
                left: -100%;
                width: 50%;
                height: 100%;
                background: linear-gradient(
                    90deg, 
                    transparent, 
                    rgba(255, 255, 255, 0.3), 
                    transparent
                );
                transform: skewX(-25deg);
                animation: shine 4s ease-in-out infinite;
                pointer-events: none;
                z-index: 10;
            }
            
            @keyframes shine {
                0%, 100% { left: -100%; }
                50% { left: 150%; }
            }
            
            /* ==================== v3: 试用英雄区域 ==================== */
            .trial-hero-section {
                text-align: center;
                padding: 35px 25px 25px;
                background: linear-gradient(180deg, 
                    rgba(240, 147, 251, 0.1) 0%, 
                    rgba(79, 172, 254, 0.05) 50%,
                    transparent 100%);
            }
            
            /* v3: 倒计时圆环 */
            .trial-countdown-ring {
                position: relative;
                width: 160px;
                height: 160px;
                margin: 0 auto 25px;
            }
            
            .countdown-svg {
                width: 100%;
                height: 100%;
                transform: rotate(-90deg);
            }
            
            .ring-progress {
                animation: ringFill 2s ease-out forwards, ringGlow 2s ease-in-out infinite 2s;
            }
            
            @keyframes ringFill {
                from { stroke-dashoffset: 534; }
                to { stroke-dashoffset: 0; }
            }
            
            @keyframes ringGlow {
                0%, 100% { filter: url(#glow) drop-shadow(0 0 5px rgba(240, 147, 251, 0.5)); }
                50% { filter: url(#glow) drop-shadow(0 0 15px rgba(240, 147, 251, 0.8)); }
            }
            
            .countdown-content {
                position: absolute;
                inset: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            /* v3: 礼盒动画 */
            .countdown-gift {
                margin-bottom: 5px;
            }
            
            .gift-box {
                position: relative;
                animation: giftBounce 2s ease-in-out infinite;
            }
            
            .gift-body {
                font-size: 36px;
                line-height: 1;
            }
            
            @keyframes giftBounce {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-5px) scale(1.1); }
            }
            
            .countdown-days {
                display: flex;
                align-items: baseline;
                gap: 2px;
            }
            
            .days-number {
                font-size: 42px;
                font-weight: 800;
                background: linear-gradient(135deg, #f093fb, #f5576c);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                line-height: 1;
            }
            
            .days-text {
                font-size: 18px;
                font-weight: 600;
                color: #64748b;
            }
            
            .countdown-label {
                font-size: 14px;
                color: #94a3b8;
                margin-top: 2px;
            }
            
            /* v1: 标题区域 */
            .trial-hero-title {
                margin: 0 0 10px;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .title-highlight {
                display: inline-block;
                padding: 4px 12px;
                background: linear-gradient(135deg, #f093fb, #f5576c);
                color: white;
                font-size: 12px;
                font-weight: 600;
                border-radius: 20px;
                text-transform: uppercase;
                letter-spacing: 1px;
                animation: highlightPulse 2s ease-in-out infinite;
            }
            
            @keyframes highlightPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(240, 147, 251, 0.4); }
                50% { box-shadow: 0 0 0 10px rgba(240, 147, 251, 0); }
            }
            
            .title-main {
                font-size: 28px;
                font-weight: 800;
                color: #1e293b;
                margin-top: 8px;
            }
            
            .trial-hero-subtitle {
                margin: 0;
                font-size: 15px;
                color: #64748b;
                line-height: 1.5;
            }
            
            /* ==================== v4: 功能预览卡片 ==================== */
            .feature-preview-cards {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 10px;
                margin: 25px 0;
            }
            
            .feature-card {
                background: rgba(255, 255, 255, 0.8);
                border: 1px solid rgba(0, 0, 0, 0.05);
                border-radius: 16px;
                padding: 15px 8px;
                text-align: center;
                animation: cardSlideUp 0.5s ease both;
                animation-delay: var(--delay);
                transition: all 0.3s ease;
            }
            
            .feature-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }
            
            @keyframes cardSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .feature-card-icon {
                font-size: 28px;
                margin-bottom: 8px;
            }
            
            .feature-card-name {
                display: block;
                font-size: 12px;
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 3px;
            }
            
            .feature-card-desc {
                display: block;
                font-size: 10px;
                color: #94a3b8;
            }
            
            /* ==================== v5: 霓虹呼吸试用按钮 ==================== */
            .trial-hero-btn {
                position: relative;
                width: 100%;
                padding: 18px 30px;
                background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                color: white;
                border: none;
                border-radius: 16px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                overflow: hidden;
                transition: all 0.3s ease;
            }
            
            .trial-hero-btn .btn-glow {
                position: absolute;
                inset: -4px;
                background: linear-gradient(135deg, #f093fb, #f5576c, #4facfe, #f093fb);
                background-size: 300% 300%;
                border-radius: 20px;
                z-index: -1;
                animation: btnGlowPulse 3s ease infinite;
                filter: blur(15px);
                opacity: 0.6;
            }
            
            @keyframes btnGlowPulse {
                0%, 100% { background-position: 0% 50%; opacity: 0.4; }
                50% { background-position: 100% 50%; opacity: 0.8; }
            }
            
            .trial-hero-btn .btn-shine {
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                animation: btnShine 3s ease infinite;
            }
            
            @keyframes btnShine {
                0%, 100% { left: -100%; }
                50% { left: 100%; }
            }
            
            .trial-hero-btn .btn-content {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                z-index: 1;
            }
            
            .trial-hero-btn .btn-icon {
                font-size: 22px;
                animation: rocketBounce 1s ease-in-out infinite;
            }
            
            @keyframes rocketBounce {
                0%, 100% { transform: translateY(0) rotate(-15deg); }
                50% { transform: translateY(-3px) rotate(-15deg); }
            }
            
            .trial-hero-btn .btn-ripple {
                position: absolute;
                inset: 0;
                border-radius: 16px;
                animation: btnRipple 2s ease-out infinite;
                pointer-events: none;
            }
            
            @keyframes btnRipple {
                0% { box-shadow: 0 0 0 0 rgba(240, 147, 251, 0.4); }
                100% { box-shadow: 0 0 0 20px rgba(240, 147, 251, 0); }
            }
            
            .trial-hero-btn:hover {
                transform: translateY(-3px) scale(1.02);
                box-shadow: 0 20px 40px rgba(240, 147, 251, 0.4);
            }
            
            .trial-hero-btn:active {
                transform: translateY(0) scale(0.98);
            }
            
            .trial-hero-btn.clicked {
                animation: btnClick 0.5s ease;
            }
            
            @keyframes btnClick {
                0% { transform: scale(1); }
                50% { transform: scale(0.95); }
                100% { transform: scale(1); }
            }
            
            /* ==================== v9: 社交证明 ==================== */
            .social-proof {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 12px;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .user-avatars {
                display: flex;
                align-items: center;
            }
            
            .avatar {
                width: 32px;
                height: 32px;
                background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
                border: 2px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                margin-left: calc(var(--i) * -8px);
                animation: avatarPop 0.5s ease both;
                animation-delay: calc(var(--i) * 0.1s);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }
            
            .avatar:first-child {
                margin-left: 0;
            }
            
            .avatar:last-child {
                background: linear-gradient(135deg, #f093fb, #f5576c);
                color: white;
                font-size: 12px;
                font-weight: 600;
            }
            
            @keyframes avatarPop {
                from { opacity: 0; transform: scale(0); }
                to { opacity: 1; transform: scale(1); }
            }
            
            .proof-text {
                font-size: 13px;
                color: #64748b;
            }
            
            .proof-count {
                font-weight: 700;
                color: #1e293b;
            }
            
            /* ==================== 分割线 ==================== */
            .section-divider {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 0 25px;
                margin: 5px 0;
            }
            
            .section-divider .divider-line {
                flex: 1;
                height: 1px;
                background: linear-gradient(90deg, transparent, #e2e8f0, transparent);
            }
            
            .section-divider .divider-text {
                font-size: 13px;
                color: #94a3b8;
                white-space: nowrap;
            }
            
            /* ==================== 激活码区域（可折叠） ==================== */
            .activation-section {
                padding: 0 25px 20px;
            }
            
            .activation-section.collapsed .activation-form-area {
                display: none;
            }
            
            .activation-section.expanded .activation-form-area {
                display: block;
                animation: expandIn 0.3s ease;
            }
            
            @keyframes expandIn {
                from { opacity: 0; max-height: 0; }
                to { opacity: 1; max-height: 300px; }
            }
            
            .expand-activation-btn {
                width: 100%;
                padding: 14px 20px;
                background: rgba(99, 102, 241, 0.08);
                border: 1px dashed rgba(99, 102, 241, 0.3);
                border-radius: 12px;
                color: #667eea;
                font-size: 14px;
                font-weight: 500;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: all 0.3s;
                margin-bottom: 15px;
            }
            
            .expand-activation-btn:hover {
                background: rgba(99, 102, 241, 0.12);
                border-color: rgba(99, 102, 241, 0.5);
            }
            
            .expand-activation-btn .expand-arrow {
                transition: transform 0.3s;
            }
            
            .expand-activation-btn.expanded .expand-arrow {
                transform: rotate(180deg);
            }
            
            /* 紧凑头部（无试用时） */
            .activation-header-compact {
                display: flex;
                align-items: center;
                gap: 15px;
                padding: 30px 25px 20px;
            }
            
            .activation-icon-small {
                font-size: 40px;
            }
            
            .activation-header-text h2 {
                margin: 0;
                font-size: 22px;
                font-weight: 700;
                color: #1e293b;
            }
            
            .activation-header-text p {
                margin: 5px 0 0;
                font-size: 14px;
                color: #64748b;
            }
            
            /* ==================== 输入框样式 ==================== */
            .activation-input-container {
                margin-bottom: 15px;
            }
            
            .input-label {
                display: block;
                font-size: 12px;
                font-weight: 600;
                color: #475569;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .activation-input-group {
                position: relative;
                display: flex;
                align-items: center;
                background: #f8fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                transition: all 0.3s;
                overflow: hidden;
            }
            
            .activation-input-group::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: var(--input-progress, 0%);
                height: 2px;
                background: linear-gradient(90deg, #667eea, #764ba2);
                transition: width 0.3s;
            }
            
            .activation-input-group.focused {
                border-color: #667eea;
                box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15);
                background: #fff;
            }
            
            .input-icon-left {
                padding: 0 0 0 14px;
                color: #94a3b8;
            }
            
            #activation-code-input {
                flex: 1;
                padding: 14px 12px;
                font-size: 16px;
                font-family: 'SF Mono', 'Menlo', monospace;
                letter-spacing: 2px;
                border: none;
                background: transparent;
                color: #1e293b;
                text-transform: uppercase;
            }
            
            #activation-code-input::placeholder {
                color: #cbd5e1;
                letter-spacing: 1px;
            }
            
            #activation-code-input:focus {
                outline: none;
            }
            
            .paste-btn {
                padding: 10px 14px;
                background: transparent;
                border: none;
                color: #64748b;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .paste-btn:hover {
                color: #667eea;
                transform: scale(1.1);
            }
            
            .paste-btn.paste-success {
                color: #10b981;
                animation: pasteSuccess 0.5s ease;
            }
            
            @keyframes pasteSuccess {
                50% { transform: scale(1.3); }
            }
            
            /* 错误提示 */
            .activation-error {
                display: none;
                align-items: center;
                justify-content: center;
                gap: 6px;
                padding: 10px;
                background: #fef2f2;
                border-radius: 8px;
                color: #dc2626;
                font-size: 13px;
                margin-bottom: 12px;
            }
            
            .activation-error.show {
                display: flex;
            }
            
            .activation-error.shake {
                animation: shake 0.5s ease;
            }
            
            /* 激活按钮 */
            .activation-btn {
                position: relative;
                width: 100%;
                padding: 16px 24px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                overflow: hidden;
                transition: all 0.3s;
            }
            
            .activation-btn .btn-bg {
                position: absolute;
                inset: 0;
                background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .activation-btn:hover .btn-bg {
                opacity: 1;
            }
            
            .activation-btn .btn-content {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                z-index: 1;
            }
            
            .activation-btn .btn-arrow {
                transition: transform 0.3s;
            }
            
            .activation-btn:hover .btn-arrow {
                transform: translateX(4px);
            }
            
            .activation-btn .btn-loading {
                position: relative;
                display: none;
                align-items: center;
                justify-content: center;
                gap: 10px;
                z-index: 1;
            }
            
            .loading-spinner {
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .activation-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4);
            }
            
            .activation-btn:disabled {
                cursor: not-allowed;
                opacity: 0.7;
            }
            
            /* ==================== 底部区域 ==================== */
            .activation-footer {
                padding: 15px 25px 25px;
                background: linear-gradient(180deg, transparent, rgba(99, 102, 241, 0.03));
                border-top: 1px solid rgba(0, 0, 0, 0.05);
            }
            
            .footer-links {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 12px;
                margin-bottom: 10px;
            }
            
            .footer-link {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                color: #64748b;
                text-decoration: none;
                font-size: 13px;
                transition: color 0.2s;
            }
            
            .footer-link:hover {
                color: #667eea;
            }
            
            .footer-link.primary {
                color: #667eea;
                font-weight: 500;
            }
            
            .footer-divider {
                color: #cbd5e1;
            }
            
            .footer-tip {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                margin: 0;
                font-size: 12px;
                color: #94a3b8;
            }
            
            /* 关闭按钮 */
            .activation-close-btn {
                position: absolute;
                top: 12px;
                right: 12px;
                width: 32px;
                height: 32px;
                background: rgba(0, 0, 0, 0.05);
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #64748b;
                transition: all 0.2s;
                z-index: 20;
            }
            
            .activation-close-btn:hover {
                background: rgba(0, 0, 0, 0.1);
                color: #1e293b;
                transform: rotate(90deg);
            }
            
            /* ==================== v6-v8: 试用成功页面 ==================== */
            .activation-dialog.trial-success {
                background: linear-gradient(180deg, 
                    rgba(255, 255, 255, 0.98) 0%, 
                    rgba(240, 253, 244, 0.95) 100%);
            }
            
            .fireworks-container {
                position: absolute;
                inset: 0;
                overflow: hidden;
                pointer-events: none;
                z-index: 5;
            }
            
            .firework {
                position: absolute;
            }
            
            .fw-particle {
                position: absolute;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                animation: fwExplode 1.5s ease-out forwards;
            }
            
            @keyframes fwExplode {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { transform: translate(var(--x), var(--y)) scale(0); opacity: 0; }
            }
            
            .confetti-container {
                position: absolute;
                inset: 0;
                overflow: hidden;
                pointer-events: none;
            }
            
            .confetti {
                position: absolute;
                top: -10px;
                width: 10px;
                height: 10px;
                animation: confettiFall linear forwards;
            }
            
            .confetti.square { border-radius: 2px; }
            .confetti.circle { border-radius: 50%; }
            .confetti.triangle {
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 10px solid currentColor;
                background: none !important;
            }
            
            @keyframes confettiFall {
                0% { transform: translateY(0) rotate(0deg) scale(1); opacity: 1; }
                100% { transform: translateY(100vh) rotate(720deg) scale(0.5); opacity: 0; }
            }
            
            .trial-success-content {
                text-align: center;
                padding: 40px 25px;
                position: relative;
                z-index: 10;
            }
            
            /* v6: 礼盒开启动画 */
            .gift-open-animation {
                margin-bottom: 25px;
            }
            
            .gift-box-wrapper {
                position: relative;
                width: 100px;
                height: 100px;
                margin: 0 auto;
            }
            
            .gift-lid-open {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                animation: lidOpen 0.8s ease-out forwards;
            }
            
            @keyframes lidOpen {
                0% { transform: translateX(-50%) translateY(0) rotate(0deg); }
                50% { transform: translateX(-50%) translateY(-40px) rotate(-15deg); }
                100% { transform: translateX(-50%) translateY(-30px) rotate(-10deg); }
            }
            
            .lid-top {
                width: 60px;
                height: 20px;
                background: linear-gradient(135deg, #f093fb, #f5576c);
                border-radius: 8px 8px 0 0;
            }
            
            .lid-ribbon {
                position: absolute;
                top: 5px;
                left: 50%;
                transform: translateX(-50%);
                width: 12px;
                height: 12px;
                background: #fbbf24;
                border-radius: 50%;
            }
            
            .gift-box-open {
                position: absolute;
                bottom: 10px;
                left: 50%;
                transform: translateX(-50%);
            }
            
            .box-front {
                width: 50px;
                height: 40px;
                background: linear-gradient(135deg, #f5576c, #f093fb);
                border-radius: 0 0 8px 8px;
            }
            
            .box-ribbon {
                position: absolute;
                top: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 10px;
                height: 100%;
                background: #fbbf24;
            }
            
            .gift-glow {
                position: absolute;
                inset: -20px;
                background: radial-gradient(circle, rgba(240, 147, 251, 0.3) 0%, transparent 70%);
                animation: giftGlow 2s ease-in-out infinite;
            }
            
            @keyframes giftGlow {
                0%, 100% { transform: scale(1); opacity: 0.5; }
                50% { transform: scale(1.2); opacity: 1; }
            }
            
            .gift-rays {
                position: absolute;
                inset: -30px;
                animation: raysRotate 10s linear infinite;
            }
            
            @keyframes raysRotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .ray {
                position: absolute;
                top: 50%;
                left: 50%;
                width: 60px;
                height: 3px;
                background: linear-gradient(90deg, rgba(240, 147, 251, 0.8), transparent);
                transform-origin: left center;
                transform: rotate(calc(var(--i) * 30deg));
                animation: rayPulse 2s ease-in-out infinite;
                animation-delay: calc(var(--i) * 0.1s);
            }
            
            @keyframes rayPulse {
                0%, 100% { opacity: 0.3; width: 40px; }
                50% { opacity: 1; width: 60px; }
            }
            
            /* v7: 成功文字 */
            .success-text-area {
                margin-bottom: 25px;
            }
            
            .trial-success-title {
                margin: 0 0 20px;
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .title-line {
                display: block;
                animation: titleReveal 0.6s ease both;
            }
            
            .title-line.line-1 {
                font-size: 32px;
                animation-delay: 0.3s;
            }
            
            .title-line.line-2 {
                font-size: 26px;
                font-weight: 800;
                background: linear-gradient(135deg, #10b981, #059669);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation-delay: 0.5s;
            }
            
            @keyframes titleReveal {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            /* v8: 倒计时显示 */
            .trial-countdown-display {
                margin: 20px 0;
            }
            
            .countdown-circle {
                position: relative;
                width: 100px;
                height: 100px;
                margin: 0 auto 10px;
            }
            
            .countdown-circle svg {
                width: 100%;
                height: 100%;
                transform: rotate(-90deg);
            }
            
            .countdown-progress {
                animation: countdownFill 1.5s ease-out forwards;
            }
            
            @keyframes countdownFill {
                from { stroke-dashoffset: 283; }
                to { stroke-dashoffset: 0; }
            }
            
            .countdown-inner {
                position: absolute;
                inset: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            
            .countdown-number {
                font-size: 36px;
                font-weight: 800;
                color: #10b981;
                line-height: 1;
            }
            
            .countdown-unit {
                font-size: 14px;
                color: #64748b;
            }
            
            .countdown-label {
                font-size: 14px;
                color: #64748b;
            }
            
            /* v7: 功能解锁列表 */
            .features-unlock-list {
                background: rgba(16, 185, 129, 0.05);
                border-radius: 16px;
                padding: 20px;
                margin-bottom: 25px;
            }
            
            .unlock-title {
                font-size: 14px;
                font-weight: 600;
                color: #475569;
                margin-bottom: 15px;
            }
            
            .unlock-items {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .unlock-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px 15px;
                background: white;
                border-radius: 10px;
                animation: unlockSlide 0.5s ease both;
                animation-delay: var(--delay);
            }
            
            @keyframes unlockSlide {
                from { opacity: 0; transform: translateX(-20px); }
                to { opacity: 1; transform: translateX(0); }
            }
            
            .unlock-check {
                width: 24px;
                height: 24px;
                background: linear-gradient(135deg, #10b981, #059669);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                animation: checkPop 0.3s ease both;
                animation-delay: calc(var(--delay) + 0.3s);
            }
            
            .unlock-check svg {
                width: 14px;
                height: 14px;
            }
            
            @keyframes checkPop {
                from { transform: scale(0); }
                to { transform: scale(1); }
            }
            
            .unlock-icon {
                font-size: 20px;
            }
            
            .unlock-name {
                flex: 1;
                font-size: 14px;
                font-weight: 500;
                color: #1e293b;
                text-align: left;
            }
            
            /* v8: 自动进入进度条 */
            .auto-enter-section {
                animation: fadeIn 0.5s ease 2s both;
            }
            
            .auto-enter-text {
                font-size: 14px;
                color: #94a3b8;
                margin-bottom: 10px;
            }
            
            .auto-enter-bar {
                height: 4px;
                background: #e2e8f0;
                border-radius: 2px;
                overflow: hidden;
            }
            
            .bar-progress {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #059669);
                border-radius: 2px;
                animation: progressFill 4s linear forwards;
            }
            
            @keyframes progressFill {
                from { width: 0%; }
                to { width: 100%; }
            }
            
            /* ==================== 动画关键帧 ==================== */
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-8px); }
                40%, 80% { transform: translateX(8px); }
            }
            
            /* ==================== v10: 深色模式 ==================== */
            @media (prefers-color-scheme: dark) {
                .activation-dialog {
                    background: linear-gradient(180deg, 
                        rgba(30, 41, 59, 0.98) 0%, 
                        rgba(15, 23, 42, 0.95) 100%);
                }
                
                .trial-hero-section {
                    background: linear-gradient(180deg, 
                        rgba(240, 147, 251, 0.15) 0%, 
                        rgba(79, 172, 254, 0.08) 50%,
                        transparent 100%);
                }
                
                .title-main,
                .activation-header-text h2 {
                    color: #f1f5f9;
                }
                
                .trial-hero-subtitle,
                .activation-header-text p,
                .days-text,
                .countdown-label {
                    color: #94a3b8;
                }
                
                .feature-card {
                    background: rgba(30, 41, 59, 0.8);
                    border-color: rgba(255, 255, 255, 0.1);
                }
                
                .feature-card-name {
                    color: #f1f5f9;
                }
                
                .social-proof {
                    border-color: rgba(255, 255, 255, 0.1);
                }
                
                .proof-count {
                    color: #f1f5f9;
                }
                
                .section-divider .divider-line {
                    background: linear-gradient(90deg, transparent, #475569, transparent);
                }
                
                .expand-activation-btn {
                    background: rgba(99, 102, 241, 0.15);
                    border-color: rgba(99, 102, 241, 0.4);
                }
                
                .input-label {
                    color: #cbd5e1;
                }
                
                .activation-input-group {
                    background: rgba(30, 41, 59, 0.8);
                    border-color: #475569;
                }
                
                .activation-input-group.focused {
                    background: rgba(30, 41, 59, 1);
                    border-color: #818cf8;
                }
                
                #activation-code-input {
                    color: #f1f5f9;
                }
                
                #activation-code-input::placeholder {
                    color: #64748b;
                }
                
                .activation-error {
                    background: rgba(220, 38, 38, 0.15);
                    color: #fca5a5;
                }
                
                .footer-link {
                    color: #94a3b8;
                }
                
                .footer-link:hover,
                .footer-link.primary {
                    color: #a5b4fc;
                }
                
                .activation-close-btn {
                    background: rgba(255, 255, 255, 0.1);
                    color: #94a3b8;
                }
                
                .activation-close-btn:hover {
                    background: rgba(255, 255, 255, 0.15);
                    color: #f1f5f9;
                }
                
                .activation-dialog.trial-success {
                    background: linear-gradient(180deg, 
                        rgba(30, 41, 59, 0.98) 0%, 
                        rgba(6, 78, 59, 0.3) 100%);
                }
                
                .features-unlock-list {
                    background: rgba(16, 185, 129, 0.1);
                }
                
                .unlock-item {
                    background: rgba(30, 41, 59, 0.8);
                }
                
                .unlock-name {
                    color: #f1f5f9;
                }
            }
        `;
        
        document.head.appendChild(styles);
    },

    /**
     * 注入设备管理样式
     */
    injectDeviceManagerStyles() {
        if (document.getElementById('device-manager-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'device-manager-styles';
        styles.textContent = `
            .device-manager-dialog {
                background: #fff;
                border-radius: 20px;
                padding: 24px;
                max-width: 450px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                animation: slideUp 0.3s ease;
            }
            
            .dm-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
            }
            
            .dm-header h2 {
                margin: 0;
                font-size: 20px;
            }
            
            .dm-close-btn {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                opacity: 0.5;
            }
            
            .dm-close-btn:hover { opacity: 1; }
            
            .dm-info {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background: #f7fafc;
                border-radius: 12px;
                margin-bottom: 20px;
            }
            
            .dm-stat-value {
                font-size: 24px;
                font-weight: bold;
                color: #667eea;
            }
            
            .dm-stat-label {
                color: #718096;
            }
            
            .dm-trust-score {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #718096;
            }
            
            .dm-trust-bar {
                width: 60px;
                height: 6px;
                background: #e2e8f0;
                border-radius: 3px;
                overflow: hidden;
            }
            
            .dm-trust-fill {
                height: 100%;
                background: linear-gradient(90deg, #48bb78, #38a169);
                border-radius: 3px;
                transition: width 0.3s;
            }
            
            .dm-device-item {
                display: flex;
                align-items: center;
                padding: 15px;
                border-radius: 12px;
                margin-bottom: 10px;
                background: #f7fafc;
                transition: all 0.2s;
            }
            
            .dm-device-item.current {
                background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
                border: 2px solid #667eea;
            }
            
            .dm-device-item.inactive {
                opacity: 0.6;
            }
            
            .dm-device-icon {
                font-size: 28px;
                margin-right: 12px;
            }
            
            .dm-device-info {
                flex: 1;
            }
            
            .dm-device-name {
                font-weight: 600;
                margin-bottom: 4px;
            }
            
            .dm-device-detail {
                font-size: 12px;
                color: #718096;
            }
            
            .dm-kick-btn {
                padding: 6px 12px;
                background: #fed7d7;
                color: #c53030;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
            }
            
            .dm-kick-btn:hover {
                background: #fc8181;
                color: white;
            }
            
            .dm-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .dm-action-btn {
                flex: 1;
                padding: 12px;
                background: #f7fafc;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                cursor: pointer;
                font-size: 13px;
                transition: all 0.2s;
            }
            
            .dm-action-btn:hover {
                border-color: #667eea;
                background: rgba(102, 126, 234, 0.05);
            }
            
            @media (prefers-color-scheme: dark) {
                .device-manager-dialog {
                    background: #2d3748;
                    color: #f7fafc;
                }
                
                .dm-info, .dm-device-item, .dm-action-btn {
                    background: #4a5568;
                }
            }
        `;
        
        document.head.appendChild(styles);
    },

    /**
     * 注入VIP面板样式
     */
    injectVipPanelStyles() {
        if (document.getElementById('vip-panel-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'vip-panel-styles';
        styles.textContent = `
            .vip-panel {
                background: linear-gradient(145deg, #667eea, #764ba2);
                border-radius: 24px;
                padding: 30px;
                max-width: 380px;
                width: 90%;
                color: white;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            
            .vip-close-btn {
                position: absolute;
                top: 15px;
                right: 15px;
                background: rgba(255,255,255,0.2);
                border: none;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                color: white;
                font-size: 18px;
                cursor: pointer;
            }
            
            .vip-header {
                text-align: center;
                margin-bottom: 25px;
            }
            
            .vip-avatar {
                width: 80px;
                height: 80px;
                background: rgba(255,255,255,0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 40px;
                margin: 0 auto 15px;
            }
            
            .vip-header h2 {
                margin: 0 0 10px;
                font-size: 20px;
            }
            
            .vip-level {
                display: inline-block;
                padding: 6px 16px;
                background: rgba(255,255,255,0.2);
                border-radius: 20px;
                font-size: 14px;
            }
            
            .vip-level-premium {
                background: linear-gradient(90deg, #f6e05e, #d69e2e);
                color: #744210;
            }
            
            .vip-level-family {
                background: linear-gradient(90deg, #68d391, #38a169);
            }
            
            .vip-trial-badge {
                display: inline-block;
                padding: 4px 12px;
                background: #f6e05e;
                color: #744210;
                border-radius: 12px;
                font-size: 12px;
                margin-top: 10px;
            }
            
            .vip-trial-remaining {
                font-size: 13px;
                opacity: 0.8;
                margin-top: 5px;
            }
            
            .vip-stats {
                display: flex;
                justify-content: space-around;
                padding: 20px 0;
                border-top: 1px solid rgba(255,255,255,0.2);
                border-bottom: 1px solid rgba(255,255,255,0.2);
                margin-bottom: 20px;
            }
            
            .vip-stat {
                text-align: center;
            }
            
            .vip-stat-icon {
                font-size: 24px;
                margin-bottom: 5px;
            }
            
            .vip-stat-value {
                font-size: 24px;
                font-weight: bold;
            }
            
            .vip-stat-label {
                font-size: 12px;
                opacity: 0.8;
            }
            
            .vip-features h3 {
                font-size: 14px;
                margin: 0 0 10px;
                opacity: 0.8;
            }
            
            .vip-features-list {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            
            .vip-feature-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 13px;
            }
            
            .vip-feature-check {
                color: #68d391;
            }
            
            .vip-upgrade-btn {
                width: 100%;
                padding: 14px;
                background: white;
                color: #667eea;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                margin-top: 20px;
                transition: all 0.3s;
            }
            
            .vip-upgrade-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            }
        `;
        
        document.head.appendChild(styles);
    },

    /**
     * 注入迁移对话框样式
     */
    injectMigrationStyles() {
        if (document.getElementById('migration-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'migration-styles';
        styles.textContent = `
            .migration-dialog {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 380px;
                width: 90%;
                animation: slideUp 0.3s ease;
            }
            
            .migration-dialog h2 {
                margin: 0 0 20px;
                text-align: center;
            }
            
            .migration-tabs {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
            }
            
            .migration-tab {
                flex: 1;
                padding: 10px;
                background: #f7fafc;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                cursor: pointer;
                font-size: 14px;
                transition: all 0.2s;
            }
            
            .migration-tab.active {
                background: #667eea;
                border-color: #667eea;
                color: white;
            }
            
            .migration-panel {
                text-align: center;
            }
            
            .migration-panel p {
                color: #718096;
                font-size: 14px;
                margin-bottom: 20px;
            }
            
            .migration-generate-btn, .migration-use-btn {
                padding: 12px 24px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 16px;
                cursor: pointer;
            }
            
            .migration-code-display {
                margin-top: 20px;
                padding: 20px;
                background: #f7fafc;
                border-radius: 12px;
            }
            
            .migration-code {
                font-size: 32px;
                font-family: 'Courier New', monospace;
                letter-spacing: 4px;
                color: #667eea;
                font-weight: bold;
            }
            
            .migration-expires {
                font-size: 12px;
                color: #718096;
                margin-top: 10px;
            }
            
            #migration-input {
                width: 100%;
                padding: 15px;
                font-size: 20px;
                text-align: center;
                border: 2px solid #e2e8f0;
                border-radius: 10px;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 3px;
            }
            
            .migration-close-btn {
                width: 100%;
                padding: 12px;
                background: #f7fafc;
                border: none;
                border-radius: 10px;
                cursor: pointer;
                margin-top: 20px;
                color: #718096;
            }
            
            @media (prefers-color-scheme: dark) {
                .migration-dialog {
                    background: #2d3748;
                    color: #f7fafc;
                }
                
                .migration-tab {
                    background: #4a5568;
                    border-color: #4a5568;
                }
                
                .migration-code-display {
                    background: #4a5568;
                }
                
                #migration-input {
                    background: #4a5568;
                    border-color: #4a5568;
                    color: #f7fafc;
                }
            }
        `;
        
        document.head.appendChild(styles);
    }
};

// 导出
window.ActivationSystem = ActivationSystem;
window.ActivationUI = ActivationUI;

// 自动初始化
document.addEventListener('DOMContentLoaded', () => {
    ActivationSystem.init().then(isActivated => {
        if (!isActivated) {
            // 未激活，显示激活对话框
            // ActivationUI.showActivationDialog();
        }
    });
});
