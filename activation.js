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
        trialDays: 7,               // 试用期天数
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
 * v5.0 - 高级UI设计 (5版迭代)
 * 
 * v1: 毛玻璃+流体渐变背景
 * v2: 3D卡片+粒子动画
 * v3: 霓虹光效+打字机效果
 * v4: 高级输入框+脉冲按钮
 * v5: 成功页面烟花+勋章系统
 */
const ActivationUI = {
    /**
     * 显示激活对话框
     */
    showActivationDialog() {
        // 检查是否已存在对话框
        if (document.getElementById('activation-dialog')) {
            return;
        }
        
        // 检查试用状态
        const trialStatus = ActivationSystem.checkTrialStatus();
        const canTrial = trialStatus.canStartTrial;
        
        const dialog = document.createElement('div');
        dialog.id = 'activation-dialog';
        dialog.className = 'activation-overlay';
        dialog.innerHTML = `
            <!-- v1: 流体渐变背景层 -->
            <div class="activation-bg-gradient"></div>
            <div class="activation-bg-particles" id="particles-container"></div>
            
            <div class="activation-dialog">
                <!-- v2: 3D光效边框 -->
                <div class="activation-glow-border"></div>
                <div class="activation-shine"></div>
                
                <div class="activation-header">
                    <!-- v1: 动态图标容器 -->
                    <div class="activation-icon-wrapper">
                        <div class="activation-icon-ring"></div>
                        <div class="activation-icon-ring delay-1"></div>
                        <div class="activation-icon-ring delay-2"></div>
                        <div class="activation-icon">
                            <svg viewBox="0 0 100 100" class="lock-svg">
                                <defs>
                                    <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style="stop-color:#667eea"/>
                                        <stop offset="100%" style="stop-color:#764ba2"/>
                                    </linearGradient>
                                </defs>
                                <path class="lock-body" d="M25,45 L25,85 Q25,95 35,95 L65,95 Q75,95 75,85 L75,45 Q75,35 65,35 L35,35 Q25,35 25,45" fill="url(#lockGradient)"/>
                                <path class="lock-shackle" d="M35,35 L35,25 Q35,10 50,10 Q65,10 65,25 L65,35" fill="none" stroke="url(#lockGradient)" stroke-width="8" stroke-linecap="round"/>
                                <circle class="lock-keyhole" cx="50" cy="62" r="8" fill="#fff"/>
                                <rect class="lock-keyhole-slot" x="47" y="62" width="6" height="15" rx="2" fill="#fff"/>
                            </svg>
                        </div>
                    </div>
                    
                    <!-- v3: 打字机标题效果 -->
                    <h2 class="activation-title">
                        <span class="title-text" data-text="解锁全部功能">解锁全部功能</span>
                        <span class="title-cursor">|</span>
                    </h2>
                    <p class="activation-subtitle">输入激活码，开启您的学习之旅</p>
                    
                    <!-- v2: 特性徽章 -->
                    <div class="activation-badges">
                        <span class="badge badge-secure">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                            </svg>
                            安全加密
                        </span>
                        <span class="badge badge-devices">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 6h18V4H4c-1.1 0-2 .9-2 2v11H0v3h14v-3H4V6zm19 2h-6c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z"/>
                            </svg>
                            ${ActivationSystem.config.maxDevices}台设备
                        </span>
                        <span class="badge badge-lifetime">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"/>
                            </svg>
                            永久有效
                        </span>
                    </div>
                </div>
                
                <div class="activation-body">
                    <!-- v4: 高级输入框设计 -->
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
                        <div class="input-hint">格式: XXXX-XXXX-XXXX-XXXX</div>
                    </div>
                    
                    <div id="activation-error" class="activation-error">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <span id="error-text"></span>
                    </div>
                    
                    <!-- v4: 脉冲动画按钮 -->
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
                        <span class="btn-pulse"></span>
                    </button>
                    
                    ${canTrial ? `
                        <!-- v3: 试用按钮带光效 -->
                        <div class="trial-section">
                            <div class="trial-divider">
                                <span class="divider-line"></span>
                                <span class="divider-text">或者</span>
                                <span class="divider-line"></span>
                            </div>
                            <button id="start-trial-btn" class="trial-btn">
                                <span class="trial-icon">🎁</span>
                                <span class="trial-content">
                                    <span class="trial-title">免费体验 ${ActivationSystem.config.trialDays} 天</span>
                                    <span class="trial-desc">无需激活码，立即开始</span>
                                </span>
                                <svg class="trial-arrow" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                                </svg>
                            </button>
                        </div>
                    ` : ''}
                </div>
                
                <!-- v5: 增强底部设计 -->
                <div class="activation-footer">
                    <div class="footer-links">
                        <a href="#" id="get-code-link" class="footer-link primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                            </svg>
                            获取激活码
                        </a>
                        <span class="footer-divider">•</span>
                        <a href="#" id="migration-btn" class="footer-link">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"/>
                            </svg>
                            设备迁移
                        </a>
                    </div>
                    <p class="footer-tip">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                        </svg>
                        一个激活码最多支持 ${ActivationSystem.config.maxDevices} 台设备同时使用
                    </p>
                </div>
                
                <!-- 关闭按钮 -->
                <button class="activation-close-btn" id="activation-close">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
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
     */
    bindDialogEvents() {
        const input = document.getElementById('activation-code-input');
        const activateBtn = document.getElementById('activate-btn');
        const pasteBtn = document.getElementById('paste-code-btn');
        const getCodeLink = document.getElementById('get-code-link');
        
        // 输入格式化
        input?.addEventListener('input', (e) => {
            let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            
            // 自动添加连字符
            if (value.length > 4) {
                value = value.match(/.{1,4}/g).join('-');
            }
            
            e.target.value = value.substring(0, 19);
            
            // 清除错误
            document.getElementById('activation-error').textContent = '';
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
                }
            } catch (err) {
                console.warn('无法读取剪贴板:', err);
            }
        });
        
        // 激活按钮
        activateBtn?.addEventListener('click', async () => {
            const code = input?.value;
            const errorEl = document.getElementById('activation-error');
            const btnText = activateBtn.querySelector('.btn-text');
            const btnLoading = activateBtn.querySelector('.btn-loading');
            
            // 显示加载状态
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            activateBtn.disabled = true;
            
            try {
                const result = await ActivationSystem.activate(code);
                
                if (result.success) {
                    // 激活成功
                    this.showSuccessAnimation();
                    setTimeout(() => {
                        this.closeActivationDialog();
                        window.dispatchEvent(new CustomEvent('activationSuccess'));
                    }, 1500);
                } else {
                    // 激活失败
                    errorEl.textContent = result.message;
                    errorEl.classList.add('shake');
                    setTimeout(() => errorEl.classList.remove('shake'), 500);
                }
            } catch (err) {
                errorEl.textContent = '激活失败，请稍后重试';
            } finally {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                activateBtn.disabled = false;
            }
        });
        
        // 获取激活码链接
        getCodeLink?.addEventListener('click', (e) => {
            e.preventDefault();
            // 跳转到购买页面或显示联系方式
            window.dispatchEvent(new CustomEvent('showPurchaseOptions'));
        });
        
        // v4.0: 试用按钮
        const trialBtn = document.getElementById('start-trial-btn');
        trialBtn?.addEventListener('click', () => {
            const result = ActivationSystem.startTrial();
            if (result.success) {
                this.showSuccessAnimation('试用已开始！', `${ActivationSystem.config.trialDays}天内免费使用全部功能`);
                setTimeout(() => {
                    this.closeActivationDialog();
                    window.dispatchEvent(new CustomEvent('trialStarted'));
                }, 1500);
            } else {
                document.getElementById('activation-error').textContent = result.message;
            }
        });
        
        // v4.0: 设备迁移按钮
        const migrationBtn = document.getElementById('migration-btn');
        migrationBtn?.addEventListener('click', () => {
            this.showMigrationDialog();
        });
    },

    /**
     * 显示成功动画
     */
    showSuccessAnimation(title = '激活成功！', subtitle = '欢迎使用学术英语精进') {
        const dialog = document.querySelector('.activation-dialog');
        if (dialog) {
            dialog.innerHTML = `
                <div class="activation-success">
                    <div class="success-icon">✅</div>
                    <h2>${title}</h2>
                    <p>${subtitle}</p>
                </div>
            `;
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
     */
    injectStyles() {
        if (document.getElementById('activation-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'activation-styles';
        styles.textContent = `
            .activation-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
            }
            
            .activation-overlay.closing {
                animation: fadeOut 0.3s ease forwards;
            }
            
            .activation-dialog {
                background: linear-gradient(145deg, #ffffff, #f0f0f0);
                border-radius: 20px;
                padding: 40px;
                max-width: 400px;
                width: 90%;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                animation: slideUp 0.3s ease;
            }
            
            .activation-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .activation-icon {
                font-size: 48px;
                margin-bottom: 15px;
            }
            
            .activation-header h2 {
                margin: 0 0 10px;
                color: #1a202c;
                font-size: 24px;
            }
            
            .activation-header p {
                margin: 0;
                color: #718096;
                font-size: 14px;
            }
            
            .activation-input-group {
                display: flex;
                gap: 10px;
                margin-bottom: 15px;
            }
            
            #activation-code-input {
                flex: 1;
                padding: 15px 20px;
                font-size: 18px;
                font-family: 'Courier New', monospace;
                letter-spacing: 2px;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                text-align: center;
                transition: all 0.3s;
            }
            
            #activation-code-input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
            }
            
            .paste-btn {
                padding: 15px;
                background: #f7fafc;
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                cursor: pointer;
                font-size: 18px;
                transition: all 0.3s;
            }
            
            .paste-btn:hover {
                background: #edf2f7;
                border-color: #cbd5e0;
            }
            
            .activation-error {
                color: #e53e3e;
                font-size: 14px;
                min-height: 20px;
                text-align: center;
                margin-bottom: 15px;
            }
            
            .activation-error.shake {
                animation: shake 0.5s ease;
            }
            
            .activation-btn {
                width: 100%;
                padding: 15px;
                background: linear-gradient(135deg, #667eea, #764ba2);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 18px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .activation-btn:hover:not(:disabled) {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
            }
            
            .activation-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
            
            .activation-footer {
                margin-top: 25px;
                text-align: center;
                color: #718096;
                font-size: 13px;
            }
            
            .activation-footer a {
                color: #667eea;
                text-decoration: none;
            }
            
            .activation-footer a:hover {
                text-decoration: underline;
            }
            
            .activation-hint {
                margin-top: 10px;
                opacity: 0.7;
            }
            
            .activation-success {
                text-align: center;
                padding: 20px;
            }
            
            .success-icon {
                font-size: 64px;
                animation: bounceIn 0.5s ease;
            }
            
            .activation-success h2 {
                color: #48bb78;
                margin: 20px 0 10px;
            }
            
            /* 试用按钮 */
            .trial-btn {
                width: 100%;
                padding: 12px;
                background: transparent;
                color: #667eea;
                border: 2px solid #667eea;
                border-radius: 12px;
                font-size: 16px;
                cursor: pointer;
                margin-top: 10px;
                transition: all 0.3s;
            }
            
            .trial-btn:hover {
                background: rgba(102, 126, 234, 0.1);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(30px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20%, 60% { transform: translateX(-10px); }
                40%, 80% { transform: translateX(10px); }
            }
            
            @keyframes bounceIn {
                0% { transform: scale(0); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            /* 深色模式 */
            @media (prefers-color-scheme: dark) {
                .activation-dialog {
                    background: linear-gradient(145deg, #2d3748, #1a202c);
                }
                
                .activation-header h2 {
                    color: #f7fafc;
                }
                
                #activation-code-input {
                    background: #2d3748;
                    border-color: #4a5568;
                    color: #f7fafc;
                }
                
                .paste-btn {
                    background: #2d3748;
                    border-color: #4a5568;
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
