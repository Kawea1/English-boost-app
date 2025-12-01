// ==================== 订阅系统 ====================
// 免费试用30天，一次付费终身使用

(function() {
    'use strict';
    
    // ==================== 配置 ====================
    const SUBSCRIPTION_CONFIG = {
        TRIAL_DAYS: 30,                    // 免费试用天数
        PRICE: 68,                         // 终身会员价格（元）
        ORIGINAL_PRICE: 198,               // 原价
        CURRENCY: 'CNY',
        PRODUCT_NAME: '学术英语精进 - 终身会员',
        CONTACT_WECHAT: 'huangjiawei_boost', // 微信号
        CONTACT_EMAIL: 'support@english-boost.app',
        // 功能访问控制
        FREE_FEATURES: ['vocabulary_basic', 'listening_basic', 'reading_basic'],
        PREMIUM_FEATURES: ['vocabulary_full', 'review_system', 'speaking', 'reading_advanced', 'offline_mode', 'export_data'],
        // 试用期功能限制
        TRIAL_LIMITS: {
            daily_words: 20,              // 试用期每日学习单词上限
            review_sessions: 3,           // 试用期每日复习次数
            listening_minutes: 30,        // 试用期每日听力时长
            reading_articles: 2           // 试用期每日阅读文章数
        },
        // 限时优惠
        PROMO_END_DATE: null              // 如果设置日期，显示倒计时
    };
    
    // 激活码前缀（用于一次性激活码）
    const LIFETIME_KEY_PREFIX = 'LIFETIME-';
    
    // ==================== 订阅状态管理 ====================
    
    // 获取订阅状态
    function getSubscriptionStatus() {
        const status = JSON.parse(localStorage.getItem('subscriptionStatus') || 'null');
        
        if (!status) {
            // 首次使用，初始化试用状态
            return initTrialStatus();
        }
        
        return status;
    }
    
    // 初始化试用状态
    function initTrialStatus() {
        const now = new Date();
        const trialEndDate = new Date(now);
        trialEndDate.setDate(trialEndDate.getDate() + SUBSCRIPTION_CONFIG.TRIAL_DAYS);
        
        const status = {
            type: 'trial',                         // trial | lifetime | expired
            startDate: now.toISOString(),
            trialEndDate: trialEndDate.toISOString(),
            purchaseDate: null,
            activationKey: null,
            deviceId: getDeviceFingerprint(),
            lastCheckDate: now.toISOString()
        };
        
        saveSubscriptionStatus(status);
        return status;
    }
    
    // 保存订阅状态
    function saveSubscriptionStatus(status) {
        status.lastCheckDate = new Date().toISOString();
        localStorage.setItem('subscriptionStatus', JSON.stringify(status));
    }
    
    // 检查订阅是否有效
    function isSubscriptionValid() {
        const status = getSubscriptionStatus();
        
        // 终身会员永久有效
        if (status.type === 'lifetime') {
            return true;
        }
        
        // 试用期检查
        if (status.type === 'trial') {
            const trialEnd = new Date(status.trialEndDate);
            const now = new Date();
            
            if (now <= trialEnd) {
                return true;
            } else {
                // 试用期已过期，更新状态
                status.type = 'expired';
                saveSubscriptionStatus(status);
                return false;
            }
        }
        
        return false;
    }
    
    // 获取剩余试用天数
    function getTrialDaysRemaining() {
        const status = getSubscriptionStatus();
        
        if (status.type === 'lifetime') {
            return -1; // -1 表示终身会员
        }
        
        if (status.type === 'trial') {
            const trialEnd = new Date(status.trialEndDate);
            const now = new Date();
            const diffTime = trialEnd - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return Math.max(0, diffDays);
        }
        
        return 0;
    }
    
    // ==================== 功能访问控制 ====================
    
    // 检查是否可以使用某功能
    function canAccessFeature(featureName) {
        const status = getSubscriptionStatus();
        
        // 终身会员可以访问所有功能
        if (status.type === 'lifetime') {
            return { allowed: true, reason: 'lifetime' };
        }
        
        // 过期用户只能访问基础功能
        if (status.type === 'expired') {
            if (SUBSCRIPTION_CONFIG.FREE_FEATURES.includes(featureName)) {
                return { allowed: true, reason: 'free' };
            }
            return { 
                allowed: false, 
                reason: 'expired',
                message: '试用期已结束，升级会员解锁此功能'
            };
        }
        
        // 试用期用户可以访问所有功能，但有使用限制
        return { allowed: true, reason: 'trial' };
    }
    
    // 获取今日使用统计
    function getDailyUsageStats() {
        const today = new Date().toDateString();
        const statsKey = 'dailyUsageStats_' + today;
        return JSON.parse(localStorage.getItem(statsKey) || JSON.stringify({
            date: today,
            wordsLearned: 0,
            reviewSessions: 0,
            listeningMinutes: 0,
            readingArticles: 0
        }));
    }
    
    // 保存今日使用统计
    function saveDailyUsageStats(stats) {
        const today = new Date().toDateString();
        const statsKey = 'dailyUsageStats_' + today;
        localStorage.setItem(statsKey, JSON.stringify(stats));
    }
    
    // 检查是否超出试用期限制
    function checkTrialLimit(limitType) {
        const status = getSubscriptionStatus();
        
        // 终身会员无限制
        if (status.type === 'lifetime') {
            return { exceeded: false, remaining: Infinity };
        }
        
        // 过期用户不能使用高级功能
        if (status.type === 'expired') {
            return { exceeded: true, remaining: 0, reason: 'expired' };
        }
        
        // 试用期检查限制
        const stats = getDailyUsageStats();
        const limits = SUBSCRIPTION_CONFIG.TRIAL_LIMITS;
        
        let used = 0;
        let limit = 0;
        
        switch (limitType) {
            case 'words':
                used = stats.wordsLearned;
                limit = limits.daily_words;
                break;
            case 'review':
                used = stats.reviewSessions;
                limit = limits.review_sessions;
                break;
            case 'listening':
                used = stats.listeningMinutes;
                limit = limits.listening_minutes;
                break;
            case 'reading':
                used = stats.readingArticles;
                limit = limits.reading_articles;
                break;
            default:
                return { exceeded: false, remaining: Infinity };
        }
        
        return {
            exceeded: used >= limit,
            remaining: Math.max(0, limit - used),
            used: used,
            limit: limit
        };
    }
    
    // 增加使用统计
    function incrementUsage(type, amount = 1) {
        const stats = getDailyUsageStats();
        
        switch (type) {
            case 'words':
                stats.wordsLearned += amount;
                break;
            case 'review':
                stats.reviewSessions += amount;
                break;
            case 'listening':
                stats.listeningMinutes += amount;
                break;
            case 'reading':
                stats.readingArticles += amount;
                break;
        }
        
        saveDailyUsageStats(stats);
    }
    
    // 显示升级提示弹窗
    function showUpgradePrompt(reason, limitType) {
        let title = '';
        let message = '';
        
        if (reason === 'expired') {
            title = '试用期已结束';
            message = '升级终身会员，解锁全部功能，无限制使用';
        } else if (reason === 'limit') {
            const limits = SUBSCRIPTION_CONFIG.TRIAL_LIMITS;
            const limitNames = {
                words: `每日学习 ${limits.daily_words} 个单词`,
                review: `每日复习 ${limits.review_sessions} 次`,
                listening: `每日听力 ${limits.listening_minutes} 分钟`,
                reading: `每日阅读 ${limits.reading_articles} 篇文章`
            };
            title = '已达到今日限制';
            message = `试用版${limitNames[limitType] || ''}上限，升级会员享受无限制使用`;
        }
        
        const promptHtml = `
            <div class="upgrade-prompt-overlay" id="upgradePromptOverlay">
                <div class="upgrade-prompt-modal">
                    <div class="upgrade-prompt-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                            <defs>
                                <linearGradient id="lockGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#f59e0b"/>
                                    <stop offset="100%" stop-color="#f97316"/>
                                </linearGradient>
                            </defs>
                            <rect x="3" y="11" width="18" height="11" rx="2" stroke="url(#lockGrad)" stroke-width="2" fill="none"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="url(#lockGrad)" stroke-width="2" fill="none"/>
                        </svg>
                    </div>
                    <h3>${title}</h3>
                    <p>${message}</p>
                    <div class="upgrade-prompt-buttons">
                        <button class="upgrade-btn-primary" onclick="closeUpgradePrompt();showPaymentModal();">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                            升级会员
                        </button>
                        <button class="upgrade-btn-secondary" onclick="closeUpgradePrompt();">稍后再说</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', promptHtml);
        addUpgradePromptStyles();
    }
    
    // 关闭升级提示
    function closeUpgradePrompt() {
        const overlay = document.getElementById('upgradePromptOverlay');
        if (overlay) {
            overlay.classList.add('closing');
            setTimeout(() => overlay.remove(), 300);
        }
    }
    
    // 添加升级提示样式
    function addUpgradePromptStyles() {
        if (document.getElementById('upgradePromptStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'upgradePromptStyles';
        style.textContent = `
            .upgrade-prompt-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10001;
                animation: fadeIn 0.3s ease;
            }
            
            .upgrade-prompt-overlay.closing {
                animation: fadeOut 0.3s ease forwards;
            }
            
            .upgrade-prompt-modal {
                background: white;
                border-radius: 20px;
                padding: 32px 24px;
                text-align: center;
                max-width: 320px;
                width: 90%;
                animation: slideUp 0.3s ease;
            }
            
            .upgrade-prompt-icon {
                margin-bottom: 16px;
            }
            
            .upgrade-prompt-modal h3 {
                font-size: 20px;
                font-weight: 700;
                color: #1e1b4b;
                margin: 0 0 8px 0;
            }
            
            .upgrade-prompt-modal p {
                font-size: 14px;
                color: #6b7280;
                margin: 0 0 24px 0;
                line-height: 1.5;
            }
            
            .upgrade-prompt-buttons {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .upgrade-btn-primary {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 14px 24px;
                background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .upgrade-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
            }
            
            .upgrade-btn-secondary {
                padding: 12px 24px;
                background: transparent;
                color: #6b7280;
                border: none;
                font-size: 14px;
                cursor: pointer;
            }
            
            .upgrade-btn-secondary:hover {
                color: #374151;
            }
        `;
        document.head.appendChild(style);
    }

    // 激活终身会员
    function activateLifetime(activationKey) {
        // 验证激活码格式
        const key = activationKey.trim().toUpperCase();
        
        // 检查是否是有效的终身激活码
        if (!isValidLifetimeKey(key)) {
            return {
                success: false,
                message: '无效的激活码，请检查后重试'
            };
        }
        
        // 检查激活码是否已被使用
        if (isKeyUsed(key)) {
            return {
                success: false,
                message: '该激活码已被使用'
            };
        }
        
        // 激活成功
        const status = getSubscriptionStatus();
        status.type = 'lifetime';
        status.purchaseDate = new Date().toISOString();
        status.activationKey = key;
        saveSubscriptionStatus(status);
        
        // 记录已使用的激活码
        markKeyAsUsed(key);
        
        return {
            success: true,
            message: '🎉 恭喜！您已成功激活终身会员'
        };
    }
    
    // 验证终身激活码格式
    function isValidLifetimeKey(key) {
        // 格式: LIFETIME-XXXX-XXXX-XXXX 或管理员密钥
        if (key === 'ADMIN-HUANGJIAWEI-2025') {
            return true;
        }
        
        // 检查 SHAO 密钥
        if (/^SHAO\d+$/.test(key)) {
            return true;
        }
        
        // 检查 LIFETIME 格式
        if (/^LIFETIME-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(key)) {
            return true;
        }
        
        // 检查旧版 BOOST-USER 密钥
        if (/^BOOST-USER-\d{3}$/.test(key)) {
            return true;
        }
        
        return false;
    }
    
    // 检查激活码是否已使用
    function isKeyUsed(key) {
        const usedKeys = JSON.parse(localStorage.getItem('usedActivationKeys') || '[]');
        return usedKeys.includes(key);
    }
    
    // 标记激活码已使用
    function markKeyAsUsed(key) {
        const usedKeys = JSON.parse(localStorage.getItem('usedActivationKeys') || '[]');
        if (!usedKeys.includes(key)) {
            usedKeys.push(key);
            localStorage.setItem('usedActivationKeys', JSON.stringify(usedKeys));
        }
    }
    
    // 生成设备指纹
    function getDeviceFingerprint() {
        if (typeof window.getDeviceFingerprint === 'function') {
            return window.getDeviceFingerprint();
        }
        
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
    
    // ==================== UI 相关 ====================
    
    // 显示订阅状态徽章
    function renderSubscriptionBadge() {
        const status = getSubscriptionStatus();
        const container = document.getElementById('subscriptionBadge');
        if (!container) return;
        
        let badgeHtml = '';
        
        if (status.type === 'lifetime') {
            badgeHtml = `
                <div class="sub-badge lifetime">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    <span>终身会员</span>
                </div>
            `;
        } else if (status.type === 'trial') {
            const daysLeft = getTrialDaysRemaining();
            const urgentClass = daysLeft <= 7 ? 'urgent' : '';
            badgeHtml = `
                <div class="sub-badge trial ${urgentClass}" onclick="showPaymentModal()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <span>试用${daysLeft}天</span>
                </div>
            `;
        } else {
            badgeHtml = `
                <div class="sub-badge expired" onclick="showPaymentModal()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    <span>已过期</span>
                </div>
            `;
        }
        
        container.innerHTML = badgeHtml;
    }
    
    // 显示付费弹窗
    function showPaymentModal() {
        const status = getSubscriptionStatus();
        const daysLeft = getTrialDaysRemaining();
        
        let headerText = '';
        let subText = '';
        
        if (status.type === 'expired') {
            headerText = '试用期已结束';
            subText = '升级终身会员，解锁全部功能';
        } else if (status.type === 'trial') {
            headerText = `试用期还剩 ${daysLeft} 天`;
            subText = '现在升级享受终身服务';
        } else {
            return; // 已是终身会员
        }
        
        const modalHtml = `
            <div class="payment-modal-overlay" id="paymentModalOverlay" onclick="closePaymentModal(event)">
                <div class="payment-modal" onclick="event.stopPropagation()">
                    <button class="payment-close-btn" onclick="closePaymentModal()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                    
                    <div class="payment-header">
                        <div class="payment-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                                <defs>
                                    <linearGradient id="crownGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#f59e0b"/>
                                        <stop offset="100%" stop-color="#f97316"/>
                                    </linearGradient>
                                </defs>
                                <path d="M2 17l3-11 5 4 4-6 4 6 5-4 3 11H2z" fill="url(#crownGrad)"/>
                                <circle cx="12" cy="6" r="1" fill="#fbbf24"/>
                                <circle cx="6" cy="8" r="1" fill="#fbbf24"/>
                                <circle cx="18" cy="8" r="1" fill="#fbbf24"/>
                            </svg>
                        </div>
                        <h2>${headerText}</h2>
                        <p class="payment-subtitle">${subText}</p>
                    </div>
                    
                    <div class="payment-price" id="paymentPriceSection">
                        <div class="price-original">原价 ¥${SUBSCRIPTION_CONFIG.ORIGINAL_PRICE}</div>
                        <div class="price-current">
                            <span class="price-symbol">¥</span>
                            <span class="price-amount" id="displayPrice">${SUBSCRIPTION_CONFIG.PRICE}</span>
                            <span class="price-unit">/终身</span>
                        </div>
                        <div class="price-tag">限时特惠 · 买断制</div>
                    </div>
                    
                    <!-- 优惠码输入 -->
                    <div class="promo-code-section">
                        <div class="promo-input-wrap" id="promoInputWrap">
                            <input type="text" id="promoCodeInput" placeholder="输入优惠码（可选）">
                            <button onclick="applyPromoCodeUI()">使用</button>
                        </div>
                        <div class="promo-applied hidden" id="promoApplied">
                            <span class="promo-tag">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#10b981"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                <span id="promoDescription">优惠码已应用</span>
                            </span>
                            <button class="promo-remove" onclick="removePromoCode()">移除</button>
                        </div>
                    </div>
                    
                    <div class="payment-features">
                        <div class="feature-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>10000+ GRE/托福核心词汇</span>
                        </div>
                        <div class="feature-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>艾宾浩斯科学复习系统</span>
                        </div>
                        <div class="feature-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>精听训练 + 口语跟读</span>
                        </div>
                        <div class="feature-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>阅读精进 + 学习资源</span>
                        </div>
                        <div class="feature-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#10b981"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                            <span>永久免费更新</span>
                        </div>
                    </div>
                    
                    <div class="payment-methods">
                        <div class="method-title">选择支付方式</div>
                        <div class="method-options">
                            <div class="method-option active" data-method="wechat">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#07c160">
                                    <path d="M8.5 11c-.83 0-1.5-.67-1.5-1.5S7.67 8 8.5 8s1.5.67 1.5 1.5S9.33 11 8.5 11zm7 0c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM12 2C6.48 2 2 5.58 2 10c0 2.03 1.02 3.87 2.67 5.27l-.67 2.73 3.1-1.55c1.22.38 2.55.55 3.9.55 5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
                                </svg>
                                <span>微信支付</span>
                            </div>
                            <div class="method-option" data-method="alipay">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1677ff">
                                    <path d="M21 12V6c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c.56 0 1.07-.23 1.43-.61l-7.43-3.18c-1.31.68-2.82 1.12-4.47 1.17-1.07-.27-2.03-.78-2.76-1.5C4.65 14.78 4 13.29 4 11.68c0-2.89 2.39-5.43 5.97-6.03 3.29-.35 5.93 1.54 6.58 4.31.29-.16.58-.31.88-.44 1.69-.73 3.31-1.11 4.69-1.25.34 1.05.55 2.12.55 3.26 0 .98-.13 1.93-.38 2.84l1.72.73V12z"/>
                                </svg>
                                <span>支付宝</span>
                            </div>
                            <div class="method-option" data-method="key">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="#6366f1">
                                    <path d="M12.65 10A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                                </svg>
                                <span>激活码</span>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 微信/支付宝支付区域 -->
                    <div class="payment-qr-section" id="paymentQrSection">
                        <div class="qr-placeholder">
                            <svg width="160" height="160" viewBox="0 0 160 160">
                                <rect width="160" height="160" fill="#f3f4f6" rx="8"/>
                                <text x="80" y="75" text-anchor="middle" fill="#9ca3af" font-size="12">扫码支付</text>
                                <text x="80" y="95" text-anchor="middle" fill="#9ca3af" font-size="12" id="qrPriceText">¥${SUBSCRIPTION_CONFIG.PRICE}</text>
                            </svg>
                            <p class="qr-hint">请联系客服获取付款码</p>
                        </div>
                        <div class="contact-info">
                            <p>微信: <strong>${SUBSCRIPTION_CONFIG.CONTACT_WECHAT}</strong></p>
                            <p class="contact-note">付款后发送截图获取激活码</p>
                        </div>
                    </div>
                    
                    <!-- 激活码输入区域 -->
                    <div class="payment-key-section hidden" id="paymentKeySection">
                        <div class="key-input-wrap">
                            <input type="text" id="lifetimeKeyInput" class="key-input" placeholder="请输入终身激活码">
                            <button class="key-submit-btn" onclick="submitLifetimeKey()">激活</button>
                        </div>
                        <p class="key-hint">激活码格式: LIFETIME-XXXX-XXXX-XXXX</p>
                    </div>
                    
                    <!-- 邀请好友入口 -->
                    <div class="invite-entry" onclick="closePaymentModal();showInviteModal();">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                        <span>邀请好友，双方各获赠试用天数</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                    </div>
                    
                    <div class="payment-guarantee">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#10b981"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                        <span>安全支付 · 即时激活 · 终身有效</span>
                    </div>
                </div>
            </div>
        `;
        
        // 移除旧弹窗
        const oldModal = document.getElementById('paymentModalOverlay');
        if (oldModal) oldModal.remove();
        
        // 添加新弹窗
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // 绑定支付方式切换
        setTimeout(() => {
            document.querySelectorAll('.method-option').forEach(option => {
                option.addEventListener('click', function() {
                    document.querySelectorAll('.method-option').forEach(o => o.classList.remove('active'));
                    this.classList.add('active');
                    
                    const method = this.dataset.method;
                    const qrSection = document.getElementById('paymentQrSection');
                    const keySection = document.getElementById('paymentKeySection');
                    
                    if (method === 'key') {
                        qrSection.classList.add('hidden');
                        keySection.classList.remove('hidden');
                    } else {
                        qrSection.classList.remove('hidden');
                        keySection.classList.add('hidden');
                    }
                });
            });
        }, 100);
        
        // 添加样式
        addPaymentStyles();
    }
    
    // 应用优惠码UI
    function applyPromoCodeUI() {
        const input = document.getElementById('promoCodeInput');
        if (!input || !input.value.trim()) {
            showToast('请输入优惠码');
            return;
        }
        
        const result = validatePromoCode(input.value);
        
        if (result.valid) {
            // 显示应用成功
            document.getElementById('promoInputWrap').classList.add('hidden');
            document.getElementById('promoApplied').classList.remove('hidden');
            document.getElementById('promoDescription').textContent = `${result.description}，省¥${result.saved}`;
            
            // 更新价格显示
            document.getElementById('displayPrice').textContent = result.finalPrice;
            document.getElementById('qrPriceText').textContent = `¥${result.finalPrice}`;
            
            // 保存当前优惠码
            localStorage.setItem('currentPromoCode', JSON.stringify(result));
            
            showToast(`✅ ${result.description}，省¥${result.saved}`);
        } else {
            showToast(result.message);
        }
    }
    
    // 移除优惠码
    function removePromoCode() {
        document.getElementById('promoInputWrap').classList.remove('hidden');
        document.getElementById('promoApplied').classList.add('hidden');
        document.getElementById('promoCodeInput').value = '';
        
        // 恢复原价
        document.getElementById('displayPrice').textContent = SUBSCRIPTION_CONFIG.PRICE;
        document.getElementById('qrPriceText').textContent = `¥${SUBSCRIPTION_CONFIG.PRICE}`;
        
        // 清除保存的优惠码
        localStorage.removeItem('currentPromoCode');
        
        showToast('优惠码已移除');
    }
    
    // 关闭付费弹窗
    function closePaymentModal(event) {
        if (event && event.target.id !== 'paymentModalOverlay') return;
        
        const status = getSubscriptionStatus();
        
        // 如果已过期且不是点击关闭按钮，阻止关闭
        if (status.type === 'expired' && event && event.target.id === 'paymentModalOverlay') {
            showToast('请先完成付费激活');
            return;
        }
        
        const modal = document.getElementById('paymentModalOverlay');
        if (modal) {
            modal.classList.add('closing');
            setTimeout(() => modal.remove(), 300);
        }
    }
    
    // 提交终身激活码
    function submitLifetimeKey() {
        const input = document.getElementById('lifetimeKeyInput');
        if (!input || !input.value.trim()) {
            showToast('请输入激活码');
            return;
        }
        
        const result = activateLifetime(input.value);
        
        if (result.success) {
            showToast(result.message);
            closePaymentModal();
            renderSubscriptionBadge();
            
            // 刷新页面状态
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else {
            showToast(result.message);
        }
    }
    
    // 检查并显示过期提醒
    function checkAndShowExpiredWarning() {
        const status = getSubscriptionStatus();
        
        if (status.type === 'expired') {
            // 显示付费弹窗，不可关闭
            showPaymentModal();
            return false;
        }
        
        // 试用期最后7天提醒
        if (status.type === 'trial') {
            const daysLeft = getTrialDaysRemaining();
            if (daysLeft <= 7 && daysLeft > 0) {
                // 每天只提醒一次
                const lastReminder = localStorage.getItem('lastTrialReminder');
                const today = new Date().toDateString();
                if (lastReminder !== today) {
                    localStorage.setItem('lastTrialReminder', today);
                    setTimeout(() => {
                        showTrialEndingReminder(daysLeft);
                    }, 2000);
                }
            }
        }
        
        return true;
    }
    
    // 显示试用即将结束提醒
    function showTrialEndingReminder(daysLeft) {
        const reminderHtml = `
            <div class="trial-reminder-toast" id="trialReminderToast">
                <div class="reminder-content">
                    <div class="reminder-icon">⏰</div>
                    <div class="reminder-text">
                        <strong>试用期还剩 ${daysLeft} 天</strong>
                        <p>升级终身会员，享受完整功能</p>
                    </div>
                    <button class="reminder-btn" onclick="showPaymentModal();closeTrialReminder();">立即升级</button>
                    <button class="reminder-close" onclick="closeTrialReminder()">×</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', reminderHtml);
        
        // 10秒后自动关闭
        setTimeout(closeTrialReminder, 10000);
    }
    
    // 关闭试用提醒
    function closeTrialReminder() {
        const reminder = document.getElementById('trialReminderToast');
        if (reminder) {
            reminder.classList.add('hiding');
            setTimeout(() => reminder.remove(), 300);
        }
    }
    
    // 显示Toast
    function showToast(message) {
        if (typeof window.showToast === 'function') {
            window.showToast(message);
        } else {
            alert(message);
        }
    }
    
    // 添加付费弹窗样式
    function addPaymentStyles() {
        if (document.getElementById('paymentStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'paymentStyles';
        style.textContent = `
            /* 订阅徽章 */
            .sub-badge {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                padding: 4px 10px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .sub-badge.lifetime {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                color: #92400e;
            }
            
            .sub-badge.trial {
                background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
                color: #3730a3;
            }
            
            .sub-badge.trial.urgent {
                background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                color: #991b1b;
                animation: pulse-urgent 2s infinite;
            }
            
            .sub-badge.expired {
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                color: #dc2626;
            }
            
            @keyframes pulse-urgent {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            /* 付费弹窗 */
            .payment-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
                padding: 20px;
            }
            
            .payment-modal-overlay.closing {
                animation: fadeOut 0.3s ease forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            .payment-modal {
                background: white;
                border-radius: 24px;
                width: 100%;
                max-width: 400px;
                max-height: 90vh;
                overflow-y: auto;
                padding: 24px;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            
            @keyframes slideUp {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            .payment-close-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 32px;
                height: 32px;
                border: none;
                background: #f3f4f6;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6b7280;
                transition: all 0.2s;
            }
            
            .payment-close-btn:hover {
                background: #e5e7eb;
                color: #374151;
            }
            
            .payment-header {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .payment-icon {
                margin-bottom: 12px;
            }
            
            .payment-header h2 {
                font-size: 22px;
                font-weight: 800;
                color: #1e1b4b;
                margin-bottom: 8px;
            }
            
            .payment-subtitle {
                font-size: 14px;
                color: #6b7280;
            }
            
            .payment-price {
                text-align: center;
                padding: 20px;
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border-radius: 16px;
                margin-bottom: 20px;
            }
            
            .price-original {
                font-size: 14px;
                color: #9ca3af;
                text-decoration: line-through;
                margin-bottom: 4px;
            }
            
            .price-current {
                display: flex;
                align-items: baseline;
                justify-content: center;
                gap: 2px;
            }
            
            .price-symbol {
                font-size: 20px;
                font-weight: 700;
                color: #dc2626;
            }
            
            .price-amount {
                font-size: 48px;
                font-weight: 800;
                color: #dc2626;
                line-height: 1;
            }
            
            .price-unit {
                font-size: 16px;
                font-weight: 600;
                color: #92400e;
            }
            
            .price-tag {
                display: inline-block;
                margin-top: 8px;
                padding: 4px 12px;
                background: #dc2626;
                color: white;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }
            
            .payment-features {
                margin-bottom: 20px;
            }
            
            .feature-row {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 10px 0;
                border-bottom: 1px solid #f3f4f6;
                font-size: 14px;
                color: #374151;
            }
            
            .feature-row:last-child {
                border-bottom: none;
            }
            
            .payment-methods {
                margin-bottom: 20px;
            }
            
            .method-title {
                font-size: 14px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 12px;
            }
            
            .method-options {
                display: flex;
                gap: 10px;
            }
            
            .method-option {
                flex: 1;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                padding: 12px 8px;
                border: 2px solid #e5e7eb;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 12px;
                color: #6b7280;
            }
            
            .method-option:hover {
                border-color: #d1d5db;
            }
            
            .method-option.active {
                border-color: #6366f1;
                background: #eef2ff;
                color: #4f46e5;
            }
            
            .payment-qr-section,
            .payment-key-section {
                text-align: center;
                padding: 20px;
                background: #f9fafb;
                border-radius: 12px;
                margin-bottom: 16px;
            }
            
            .qr-placeholder {
                margin-bottom: 16px;
            }
            
            .qr-hint {
                font-size: 13px;
                color: #9ca3af;
                margin-top: 8px;
            }
            
            .contact-info {
                font-size: 14px;
                color: #374151;
            }
            
            .contact-info strong {
                color: #6366f1;
            }
            
            .contact-note {
                font-size: 12px;
                color: #9ca3af;
                margin-top: 4px;
            }
            
            .key-input-wrap {
                display: flex;
                gap: 10px;
                margin-bottom: 12px;
            }
            
            .key-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 10px;
                font-size: 14px;
                text-align: center;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .key-input:focus {
                outline: none;
                border-color: #6366f1;
            }
            
            .key-submit-btn {
                padding: 12px 20px;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .key-submit-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
            }
            
            .key-hint {
                font-size: 12px;
                color: #9ca3af;
            }
            
            .payment-guarantee {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 6px;
                font-size: 12px;
                color: #6b7280;
            }
            
            /* 优惠码区域 */
            .promo-code-section {
                margin-bottom: 16px;
            }
            
            .promo-input-wrap {
                display: flex;
                gap: 8px;
            }
            
            .promo-input-wrap input {
                flex: 1;
                padding: 10px 14px;
                border: 2px solid #e5e7eb;
                border-radius: 8px;
                font-size: 13px;
                text-transform: uppercase;
            }
            
            .promo-input-wrap input:focus {
                outline: none;
                border-color: #6366f1;
            }
            
            .promo-input-wrap button {
                padding: 10px 16px;
                background: #6366f1;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
            }
            
            .promo-applied {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 14px;
                background: #d1fae5;
                border-radius: 8px;
            }
            
            .promo-tag {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 13px;
                font-weight: 600;
                color: #065f46;
            }
            
            .promo-remove {
                background: none;
                border: none;
                color: #6b7280;
                font-size: 12px;
                cursor: pointer;
            }
            
            /* 邀请入口 */
            .invite-entry {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 14px 16px;
                background: #f9fafb;
                border-radius: 12px;
                margin-bottom: 16px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .invite-entry:hover {
                background: #f3f4f6;
            }
            
            .invite-entry span {
                flex: 1;
                font-size: 13px;
                color: #374151;
            }

            /* 试用提醒Toast */
            .trial-reminder-toast {
                position: fixed;
                bottom: 100px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9999;
                animation: slideUpToast 0.3s ease;
            }
            
            .trial-reminder-toast.hiding {
                animation: slideDownToast 0.3s ease forwards;
            }
            
            @keyframes slideUpToast {
                from { transform: translateX(-50%) translateY(20px); opacity: 0; }
                to { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
            
            @keyframes slideDownToast {
                from { transform: translateX(-50%) translateY(0); opacity: 1; }
                to { transform: translateX(-50%) translateY(20px); opacity: 0; }
            }
            
            .reminder-content {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 20px;
                background: white;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            }
            
            .reminder-icon {
                font-size: 28px;
            }
            
            .reminder-text strong {
                display: block;
                font-size: 14px;
                color: #1e1b4b;
            }
            
            .reminder-text p {
                font-size: 12px;
                color: #6b7280;
                margin: 0;
            }
            
            .reminder-btn {
                padding: 8px 16px;
                background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                white-space: nowrap;
            }
            
            .reminder-close {
                width: 24px;
                height: 24px;
                border: none;
                background: #f3f4f6;
                border-radius: 50%;
                font-size: 16px;
                color: #9ca3af;
                cursor: pointer;
            }
            
            .hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==================== 邀请系统 ====================
    
    // 生成邀请码
    function generateInviteCode() {
        const deviceId = getDeviceFingerprint();
        const code = 'INV-' + deviceId.slice(-6).toUpperCase() + '-' + Date.now().toString(36).toUpperCase().slice(-4);
        
        // 保存邀请码
        localStorage.setItem('myInviteCode', code);
        return code;
    }
    
    // 获取我的邀请码
    function getMyInviteCode() {
        let code = localStorage.getItem('myInviteCode');
        if (!code) {
            code = generateInviteCode();
        }
        return code;
    }
    
    // 使用邀请码
    function useInviteCode(code) {
        if (!code || !code.startsWith('INV-')) {
            return { success: false, message: '无效的邀请码格式' };
        }
        
        // 检查是否已使用过邀请码
        if (localStorage.getItem('usedInviteCode')) {
            return { success: false, message: '您已使用过邀请码' };
        }
        
        // 检查是否是自己的邀请码
        if (code === getMyInviteCode()) {
            return { success: false, message: '不能使用自己的邀请码' };
        }
        
        // 使用成功，增加7天试用期
        const status = getSubscriptionStatus();
        if (status.type === 'trial') {
            const currentEnd = new Date(status.trialEndDate);
            currentEnd.setDate(currentEnd.getDate() + 7);
            status.trialEndDate = currentEnd.toISOString();
            saveSubscriptionStatus(status);
            
            localStorage.setItem('usedInviteCode', code);
            
            return { 
                success: true, 
                message: '🎉 邀请码使用成功！您的试用期增加了7天',
                bonusDays: 7
            };
        }
        
        return { success: false, message: '当前状态无法使用邀请码' };
    }
    
    // 获取邀请统计
    function getInviteStats() {
        const invited = JSON.parse(localStorage.getItem('invitedUsers') || '[]');
        return {
            inviteCode: getMyInviteCode(),
            invitedCount: invited.length,
            bonusDays: invited.length * 3 // 每邀请一人获得3天
        };
    }
    
    // ==================== 优惠码系统 ====================
    
    // 有效的优惠码
    const PROMO_CODES = {
        'WELCOME10': { discount: 10, type: 'amount', description: '新用户优惠', minPrice: 50 },
        'STUDENT20': { discount: 20, type: 'percent', description: '学生优惠', minPrice: 0 },
        'EARLY50': { discount: 50, type: 'percent', description: '早鸟优惠', minPrice: 0, expires: '2025-03-01' },
        'VIP30': { discount: 30, type: 'amount', description: 'VIP专属优惠', minPrice: 50 }
    };
    
    // 验证优惠码
    function validatePromoCode(code) {
        const upperCode = code.trim().toUpperCase();
        const promo = PROMO_CODES[upperCode];
        
        if (!promo) {
            return { valid: false, message: '优惠码不存在' };
        }
        
        // 检查是否过期
        if (promo.expires && new Date(promo.expires) < new Date()) {
            return { valid: false, message: '优惠码已过期' };
        }
        
        // 检查是否已使用
        const usedCodes = JSON.parse(localStorage.getItem('usedPromoCodes') || '[]');
        if (usedCodes.includes(upperCode)) {
            return { valid: false, message: '优惠码已使用' };
        }
        
        // 计算折后价格
        let finalPrice = SUBSCRIPTION_CONFIG.PRICE;
        if (promo.type === 'amount') {
            finalPrice = Math.max(0, finalPrice - promo.discount);
        } else if (promo.type === 'percent') {
            finalPrice = Math.round(finalPrice * (100 - promo.discount) / 100);
        }
        
        return {
            valid: true,
            code: upperCode,
            description: promo.description,
            originalPrice: SUBSCRIPTION_CONFIG.PRICE,
            finalPrice: finalPrice,
            saved: SUBSCRIPTION_CONFIG.PRICE - finalPrice
        };
    }
    
    // 应用优惠码（购买时调用）
    function applyPromoCode(code) {
        const result = validatePromoCode(code);
        if (!result.valid) {
            return result;
        }
        
        // 标记为已使用
        const usedCodes = JSON.parse(localStorage.getItem('usedPromoCodes') || '[]');
        usedCodes.push(result.code);
        localStorage.setItem('usedPromoCodes', JSON.stringify(usedCodes));
        
        // 保存当前应用的优惠码
        localStorage.setItem('currentPromoCode', JSON.stringify(result));
        
        return result;
    }
    
    // 获取当前应用的优惠码
    function getCurrentPromoCode() {
        return JSON.parse(localStorage.getItem('currentPromoCode') || 'null');
    }
    
    // 清除当前优惠码
    function clearCurrentPromoCode() {
        localStorage.removeItem('currentPromoCode');
    }
    
    // 显示邀请好友弹窗
    function showInviteModal() {
        const inviteCode = getMyInviteCode();
        const stats = getInviteStats();
        
        const modalHtml = `
            <div class="invite-modal-overlay" id="inviteModalOverlay" onclick="closeInviteModal(event)">
                <div class="invite-modal" onclick="event.stopPropagation()">
                    <button class="invite-close-btn" onclick="closeInviteModal()">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                    
                    <div class="invite-header">
                        <div class="invite-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="1.5">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <h2>邀请好友</h2>
                        <p>邀请好友一起学习，双方都能获得奖励</p>
                    </div>
                    
                    <div class="invite-rewards">
                        <div class="reward-item">
                            <div class="reward-icon">🎁</div>
                            <div class="reward-text">
                                <strong>邀请人奖励</strong>
                                <span>每成功邀请1人，获得3天试用期</span>
                            </div>
                        </div>
                        <div class="reward-item">
                            <div class="reward-icon">🎉</div>
                            <div class="reward-text">
                                <strong>被邀请人奖励</strong>
                                <span>使用邀请码，获得7天试用期</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="invite-code-section">
                        <label>我的邀请码</label>
                        <div class="invite-code-display">
                            <span id="myInviteCodeDisplay">${inviteCode}</span>
                            <button class="copy-btn" onclick="copyInviteCode()">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="9" y="9" width="13" height="13" rx="2"/>
                                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                </svg>
                                复制
                            </button>
                        </div>
                    </div>
                    
                    <div class="invite-stats">
                        <div class="stat-item">
                            <span class="stat-value">${stats.invitedCount}</span>
                            <span class="stat-label">已邀请</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">+${stats.bonusDays}</span>
                            <span class="stat-label">获得天数</span>
                        </div>
                    </div>
                    
                    <div class="invite-input-section">
                        <label>使用邀请码</label>
                        <div class="invite-input-wrap">
                            <input type="text" id="inviteCodeInput" placeholder="输入好友的邀请码">
                            <button onclick="submitInviteCode()">使用</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        addInviteModalStyles();
    }
    
    // 关闭邀请弹窗
    function closeInviteModal(event) {
        if (event && event.target.id !== 'inviteModalOverlay') return;
        const modal = document.getElementById('inviteModalOverlay');
        if (modal) {
            modal.classList.add('closing');
            setTimeout(() => modal.remove(), 300);
        }
    }
    
    // 复制邀请码
    function copyInviteCode() {
        const code = getMyInviteCode();
        navigator.clipboard.writeText(code).then(() => {
            showToast('✅ 邀请码已复制');
        }).catch(() => {
            showToast('复制失败，请手动复制');
        });
    }
    
    // 提交邀请码
    function submitInviteCode() {
        const input = document.getElementById('inviteCodeInput');
        if (!input || !input.value.trim()) {
            showToast('请输入邀请码');
            return;
        }
        
        const result = useInviteCode(input.value.trim());
        showToast(result.message);
        
        if (result.success) {
            closeInviteModal();
            renderSubscriptionBadge();
        }
    }
    
    // 添加邀请弹窗样式
    function addInviteModalStyles() {
        if (document.getElementById('inviteModalStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'inviteModalStyles';
        style.textContent = `
            .invite-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.6);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: fadeIn 0.3s ease;
                padding: 20px;
            }
            
            .invite-modal-overlay.closing {
                animation: fadeOut 0.3s ease forwards;
            }
            
            .invite-modal {
                background: white;
                border-radius: 24px;
                width: 100%;
                max-width: 400px;
                padding: 24px;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            
            .invite-close-btn {
                position: absolute;
                top: 16px;
                right: 16px;
                width: 32px;
                height: 32px;
                border: none;
                background: #f3f4f6;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #6b7280;
            }
            
            .invite-header {
                text-align: center;
                margin-bottom: 20px;
            }
            
            .invite-icon {
                margin-bottom: 12px;
            }
            
            .invite-header h2 {
                font-size: 22px;
                font-weight: 800;
                color: #1e1b4b;
                margin-bottom: 8px;
            }
            
            .invite-header p {
                font-size: 14px;
                color: #6b7280;
            }
            
            .invite-rewards {
                background: #f9fafb;
                border-radius: 12px;
                padding: 16px;
                margin-bottom: 20px;
            }
            
            .reward-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 8px 0;
            }
            
            .reward-item:not(:last-child) {
                border-bottom: 1px solid #e5e7eb;
            }
            
            .reward-icon {
                font-size: 24px;
            }
            
            .reward-text strong {
                display: block;
                font-size: 14px;
                color: #1e1b4b;
            }
            
            .reward-text span {
                font-size: 12px;
                color: #6b7280;
            }
            
            .invite-code-section {
                margin-bottom: 16px;
            }
            
            .invite-code-section label,
            .invite-input-section label {
                display: block;
                font-size: 13px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 8px;
            }
            
            .invite-code-display {
                display: flex;
                align-items: center;
                gap: 10px;
                background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
                padding: 12px 16px;
                border-radius: 10px;
            }
            
            .invite-code-display span {
                flex: 1;
                font-size: 18px;
                font-weight: 700;
                color: #4f46e5;
                font-family: monospace;
                letter-spacing: 2px;
            }
            
            .copy-btn {
                display: flex;
                align-items: center;
                gap: 4px;
                padding: 8px 12px;
                background: #6366f1;
                color: white;
                border: none;
                border-radius: 8px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
            }
            
            .invite-stats {
                display: flex;
                gap: 20px;
                justify-content: center;
                margin-bottom: 20px;
            }
            
            .stat-item {
                text-align: center;
            }
            
            .stat-value {
                display: block;
                font-size: 24px;
                font-weight: 700;
                color: #6366f1;
            }
            
            .stat-label {
                font-size: 12px;
                color: #6b7280;
            }
            
            .invite-input-wrap {
                display: flex;
                gap: 10px;
            }
            
            .invite-input-wrap input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #e5e7eb;
                border-radius: 10px;
                font-size: 14px;
                text-transform: uppercase;
            }
            
            .invite-input-wrap input:focus {
                outline: none;
                border-color: #6366f1;
            }
            
            .invite-input-wrap button {
                padding: 12px 20px;
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                color: white;
                border: none;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                cursor: pointer;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==================== 导出全局函数 ====================
    window.getSubscriptionStatus = getSubscriptionStatus;
    window.isSubscriptionValid = isSubscriptionValid;
    window.getTrialDaysRemaining = getTrialDaysRemaining;
    window.activateLifetime = activateLifetime;
    window.showPaymentModal = showPaymentModal;
    window.closePaymentModal = closePaymentModal;
    window.submitLifetimeKey = submitLifetimeKey;
    window.renderSubscriptionBadge = renderSubscriptionBadge;
    window.checkAndShowExpiredWarning = checkAndShowExpiredWarning;
    window.closeTrialReminder = closeTrialReminder;
    window.renderSubscriptionSettings = renderSubscriptionSettings;
    window.canAccessFeature = canAccessFeature;
    window.checkTrialLimit = checkTrialLimit;
    window.incrementUsage = incrementUsage;
    window.showUpgradePrompt = showUpgradePrompt;
    window.closeUpgradePrompt = closeUpgradePrompt;
    window.getDailyUsageStats = getDailyUsageStats;
    // 邀请系统
    window.showInviteModal = showInviteModal;
    window.closeInviteModal = closeInviteModal;
    window.copyInviteCode = copyInviteCode;
    window.submitInviteCode = submitInviteCode;
    window.getMyInviteCode = getMyInviteCode;
    window.useInviteCode = useInviteCode;
    window.getInviteStats = getInviteStats;
    // 优惠码系统
    window.validatePromoCode = validatePromoCode;
    window.applyPromoCode = applyPromoCode;
    window.applyPromoCodeUI = applyPromoCodeUI;
    window.removePromoCode = removePromoCode;
    window.getCurrentPromoCode = getCurrentPromoCode;
    window.clearCurrentPromoCode = clearCurrentPromoCode;
    window.SUBSCRIPTION_CONFIG = SUBSCRIPTION_CONFIG;
    
    // 渲染设置页面的订阅状态
    function renderSubscriptionSettings() {
        const container = document.getElementById('subscriptionStatusContent');
        if (!container) return;
        
        const status = getSubscriptionStatus();
        const daysLeft = getTrialDaysRemaining();
        const inviteStats = getInviteStats();
        const usageStats = getDailyUsageStats();
        
        let html = '';
        
        if (status.type === 'lifetime') {
            html = `
                <div class="sub-status-display lifetime">
                    <div class="sub-status-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <defs>
                                <linearGradient id="crownGradSettings" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="#f59e0b"/>
                                    <stop offset="100%" stop-color="#f97316"/>
                                </linearGradient>
                            </defs>
                            <path d="M2 17l3-11 5 4 4-6 4 6 5-4 3 11H2z" fill="url(#crownGradSettings)"/>
                            <circle cx="12" cy="6" r="1" fill="#fbbf24"/>
                        </svg>
                    </div>
                    <div class="sub-status-info">
                        <h5>终身会员</h5>
                        <p>感谢您的支持！您已解锁全部功能</p>
                        <span class="sub-activated-date">激活于: ${new Date(status.purchaseDate).toLocaleDateString('zh-CN')}</span>
                    </div>
                </div>
                <div class="sub-benefits">
                    <div class="benefit-item"><span class="benefit-check">✓</span> 全部词汇学习功能</div>
                    <div class="benefit-item"><span class="benefit-check">✓</span> 艾宾浩斯复习系统</div>
                    <div class="benefit-item"><span class="benefit-check">✓</span> 精听训练与口语练习</div>
                    <div class="benefit-item"><span class="benefit-check">✓</span> 学术阅读精讲</div>
                    <div class="benefit-item"><span class="benefit-check">✓</span> 永久免费更新</div>
                </div>
                
                <!-- 邀请好友入口 -->
                <div class="settings-invite-entry" onclick="showInviteModal()">
                    <div class="invite-entry-icon">👥</div>
                    <div class="invite-entry-info">
                        <strong>邀请好友</strong>
                        <span>已邀请 ${inviteStats.invitedCount} 人</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                </div>
            `;
        } else if (status.type === 'trial') {
            const urgentClass = daysLeft <= 7 ? 'urgent' : '';
            const progressPercent = Math.max(0, ((SUBSCRIPTION_CONFIG.TRIAL_DAYS - daysLeft) / SUBSCRIPTION_CONFIG.TRIAL_DAYS) * 100);
            const limits = SUBSCRIPTION_CONFIG.TRIAL_LIMITS;
            
            html = `
                <div class="sub-status-display trial ${urgentClass}">
                    <div class="sub-status-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12 6 12 12 16 14"/>
                        </svg>
                    </div>
                    <div class="sub-status-info">
                        <h5>免费试用中</h5>
                        <p>还剩 <strong>${daysLeft}</strong> 天试用期</p>
                        <div class="trial-progress-bar">
                            <div class="trial-progress-fill" style="width: ${progressPercent}%"></div>
                        </div>
                    </div>
                </div>
                
                <!-- 今日使用情况 -->
                <div class="usage-stats-card">
                    <div class="usage-title">今日使用情况</div>
                    <div class="usage-items">
                        <div class="usage-item">
                            <span class="usage-label">单词学习</span>
                            <span class="usage-value">${usageStats.wordsLearned}/${limits.daily_words}</span>
                        </div>
                        <div class="usage-item">
                            <span class="usage-label">复习次数</span>
                            <span class="usage-value">${usageStats.reviewSessions}/${limits.review_sessions}</span>
                        </div>
                        <div class="usage-item">
                            <span class="usage-label">听力时长</span>
                            <span class="usage-value">${usageStats.listeningMinutes}/${limits.listening_minutes}分钟</span>
                        </div>
                    </div>
                </div>
                
                <!-- 权益对比 -->
                <div class="benefits-compare">
                    <div class="compare-header">
                        <span></span>
                        <span class="trial-label">试用版</span>
                        <span class="vip-label">终身会员</span>
                    </div>
                    <div class="compare-row">
                        <span>每日单词</span>
                        <span class="limit">${limits.daily_words}个</span>
                        <span class="unlimited">无限制</span>
                    </div>
                    <div class="compare-row">
                        <span>复习次数</span>
                        <span class="limit">${limits.review_sessions}次</span>
                        <span class="unlimited">无限制</span>
                    </div>
                    <div class="compare-row">
                        <span>听力训练</span>
                        <span class="limit">${limits.listening_minutes}分钟/天</span>
                        <span class="unlimited">无限制</span>
                    </div>
                    <div class="compare-row">
                        <span>阅读文章</span>
                        <span class="limit">${limits.reading_articles}篇/天</span>
                        <span class="unlimited">无限制</span>
                    </div>
                    <div class="compare-row">
                        <span>口语练习</span>
                        <span class="check">✓</span>
                        <span class="check">✓</span>
                    </div>
                    <div class="compare-row">
                        <span>永久更新</span>
                        <span class="cross">✗</span>
                        <span class="check">✓</span>
                    </div>
                </div>
                
                <button class="upgrade-btn-settings" onclick="showPaymentModal()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>升级终身会员 ¥${SUBSCRIPTION_CONFIG.PRICE}</span>
                </button>
                <p class="upgrade-hint">一次付费，永久使用，终身免费更新</p>
                
                <!-- 邀请好友入口 -->
                <div class="settings-invite-entry" onclick="showInviteModal()">
                    <div class="invite-entry-icon">👥</div>
                    <div class="invite-entry-info">
                        <strong>邀请好友延长试用</strong>
                        <span>邀请1人可获得3天，被邀请可获7天</span>
                    </div>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
                </div>
            `;
        } else {
            html = `
                <div class="sub-status-display expired">
                    <div class="sub-status-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="15" y1="9" x2="9" y2="15"/>
                            <line x1="9" y1="9" x2="15" y2="15"/>
                        </svg>
                    </div>
                    <div class="sub-status-info">
                        <h5>试用已过期</h5>
                        <p>升级会员以继续使用全部功能</p>
                    </div>
                </div>
                
                <!-- 权益对比 -->
                <div class="benefits-compare expired">
                    <div class="compare-header">
                        <span></span>
                        <span class="expired-label">当前状态</span>
                        <span class="vip-label">终身会员</span>
                    </div>
                    <div class="compare-row">
                        <span>词汇学习</span>
                        <span class="cross">受限</span>
                        <span class="unlimited">无限制</span>
                    </div>
                    <div class="compare-row">
                        <span>复习系统</span>
                        <span class="cross">✗</span>
                        <span class="check">✓</span>
                    </div>
                    <div class="compare-row">
                        <span>听力训练</span>
                        <span class="cross">✗</span>
                        <span class="check">✓</span>
                    </div>
                    <div class="compare-row">
                        <span>口语练习</span>
                        <span class="cross">✗</span>
                        <span class="check">✓</span>
                    </div>
                </div>
                
                <button class="upgrade-btn-settings urgent" onclick="showPaymentModal()">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <span>立即升级 ¥${SUBSCRIPTION_CONFIG.PRICE}</span>
                </button>
                <p class="upgrade-hint expired">限时特惠，买断制终身使用</p>
            `;
        }
        
        container.innerHTML = html;
        
        // 添加设置页面订阅卡片样式
        addSubscriptionSettingsStyles();
    }
    
    // 添加设置页面订阅样式
    function addSubscriptionSettingsStyles() {
        if (document.getElementById('subscriptionSettingsStyles')) return;
        
        const style = document.createElement('style');
        style.id = 'subscriptionSettingsStyles';
        style.textContent = `
            .subscription-card .settings-card-icon-new.subscription {
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                color: #92400e;
            }
            
            .subscription-status-card {
                padding: 16px 0;
            }
            
            .sub-status-display {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 16px;
                background: var(--gray-50);
                border-radius: 12px;
                margin-bottom: 16px;
            }
            
            .sub-status-display.lifetime {
                background: linear-gradient(135deg, #fef3c7 0%, #fef9c3 100%);
            }
            
            .sub-status-display.trial {
                background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
            }
            
            .sub-status-display.trial.urgent {
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            }
            
            .sub-status-display.expired {
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            }
            
            .sub-status-info h5 {
                font-size: 18px;
                font-weight: 700;
                color: #1e1b4b;
                margin: 0 0 4px 0;
            }
            
            .sub-status-info p {
                font-size: 14px;
                color: #6b7280;
                margin: 0;
            }
            
            .sub-status-info p strong {
                color: #6366f1;
                font-size: 20px;
            }
            
            .sub-activated-date {
                font-size: 12px;
                color: #92400e;
                margin-top: 4px;
                display: block;
            }
            
            .trial-progress-bar {
                width: 100%;
                height: 6px;
                background: rgba(99, 102, 241, 0.2);
                border-radius: 3px;
                margin-top: 8px;
                overflow: hidden;
            }
            
            .trial-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #6366f1 0%, #a855f7 100%);
                border-radius: 3px;
                transition: width 0.3s ease;
            }
            
            .sub-benefits {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
                margin-top: 12px;
            }
            
            .benefit-item {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #374151;
            }
            
            .benefit-check {
                color: #10b981;
                font-weight: 600;
            }
            
            .upgrade-btn-settings {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                padding: 14px 20px;
                background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
                color: white;
                border: none;
                border-radius: 12px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .upgrade-btn-settings:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
            }
            
            .upgrade-btn-settings.urgent {
                background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
                animation: pulse-button 2s infinite;
            }
            
            @keyframes pulse-button {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            .upgrade-hint {
                text-align: center;
                font-size: 12px;
                color: #9ca3af;
                margin-top: 10px;
            }
            
            .upgrade-hint.expired {
                color: #dc2626;
            }
            
            .subscription-badge-container {
                margin-right: 8px;
            }
            
            /* 使用统计卡片 */
            .usage-stats-card {
                background: #f9fafb;
                border-radius: 12px;
                padding: 14px;
                margin-bottom: 16px;
            }
            
            .usage-title {
                font-size: 13px;
                font-weight: 600;
                color: #374151;
                margin-bottom: 10px;
            }
            
            .usage-items {
                display: flex;
                gap: 12px;
            }
            
            .usage-item {
                flex: 1;
                text-align: center;
            }
            
            .usage-label {
                display: block;
                font-size: 11px;
                color: #9ca3af;
                margin-bottom: 4px;
            }
            
            .usage-value {
                font-size: 14px;
                font-weight: 600;
                color: #374151;
            }
            
            /* 权益对比表 */
            .benefits-compare {
                background: #f9fafb;
                border-radius: 12px;
                padding: 14px;
                margin-bottom: 16px;
            }
            
            .compare-header {
                display: grid;
                grid-template-columns: 1fr 70px 70px;
                gap: 8px;
                padding-bottom: 10px;
                border-bottom: 1px solid #e5e7eb;
                margin-bottom: 8px;
            }
            
            .compare-header span {
                font-size: 11px;
                font-weight: 600;
                text-align: center;
            }
            
            .trial-label {
                color: #6b7280;
            }
            
            .vip-label {
                color: #f59e0b;
            }
            
            .expired-label {
                color: #dc2626;
            }
            
            .compare-row {
                display: grid;
                grid-template-columns: 1fr 70px 70px;
                gap: 8px;
                padding: 8px 0;
                font-size: 12px;
                color: #374151;
            }
            
            .compare-row span {
                text-align: center;
            }
            
            .compare-row span:first-child {
                text-align: left;
            }
            
            .compare-row .limit {
                color: #9ca3af;
                font-size: 11px;
            }
            
            .compare-row .unlimited {
                color: #10b981;
                font-weight: 600;
            }
            
            .compare-row .check {
                color: #10b981;
            }
            
            .compare-row .cross {
                color: #dc2626;
            }
            
            /* 设置页面邀请入口 */
            .settings-invite-entry {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 14px 16px;
                background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%);
                border-radius: 12px;
                margin-top: 16px;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .settings-invite-entry:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(99, 102, 241, 0.15);
            }
            
            .invite-entry-icon {
                font-size: 24px;
            }
            
            .invite-entry-info {
                flex: 1;
            }
            
            .invite-entry-info strong {
                display: block;
                font-size: 14px;
                color: #1e1b4b;
            }
            
            .invite-entry-info span {
                font-size: 12px;
                color: #6b7280;
            }
        `;
        document.head.appendChild(style);
    }
    
    // 在设置页面打开时渲染订阅状态
    const originalOpenModule = window.openModule;
    window.openModule = function(moduleName) {
        if (originalOpenModule) {
            originalOpenModule(moduleName);
        }
        if (moduleName === 'settings') {
            setTimeout(renderSubscriptionSettings, 100);
        }
    };

})();
