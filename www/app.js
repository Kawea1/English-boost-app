// ==================== 全局变量 ====================
var currentModule = null;

// ==================== 版本控制与自动更新 ====================
(function() {
    'use strict';
    
    // 立即应用液态玻璃模式（防止闪烁）
    try {
        const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
        if (settings.liquidGlassMode === true) {
            document.body.classList.add('liquid-glass-mode');
        }
    } catch (e) {
        console.error('Error applying liquid glass mode:', e);
    }
    
    const APP_VERSION = '3.4.0';
    const APP_VERSION_CODE = 340;
    const VERSION_KEY = 'app_version';
    const UPDATE_CHECK_KEY = 'last_update_check';
    const UPDATE_SKIP_KEY = 'skip_version';
    const UPDATE_REMIND_KEY = 'update_remind_time';
    const CHECK_INTERVAL = 60 * 60 * 1000; // 1小时检查一次
    const REMIND_LATER_INTERVAL = 30 * 60 * 1000; // 30分钟后提醒
    
    // 远程版本检查地址（多个备用）
    const VERSION_URLS = [
        'https://raw.githubusercontent.com/Kawea1/English-boost-app/main/version.json',
        'https://kawea1.github.io/English-boost-app/version.json',
        './version.json'
    ];
    
    // 获取当前平台
    function getPlatform() {
        const userAgent = navigator.userAgent.toLowerCase();
        if (window.electron || userAgent.includes('electron')) {
            if (navigator.platform.includes('Mac')) return 'mac';
            if (navigator.platform.includes('Win')) return 'win';
            return 'linux';
        }
        if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
        if (/android/.test(userAgent)) return 'android';
        return 'web';
    }
    
    // 比较版本号
    function compareVersion(v1, v2) {
        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);
        for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            const p1 = parts1[i] || 0;
            const p2 = parts2[i] || 0;
            if (p1 > p2) return 1;
            if (p1 < p2) return -1;
        }
        return 0;
    }
    
    // 静默检查更新（用户无感知）- v6改进：增加稍后提醒时间控制
    async function silentCheckUpdate(forceCheck = false) {
        const lastCheck = localStorage.getItem(UPDATE_CHECK_KEY);
        const remindTime = localStorage.getItem(UPDATE_REMIND_KEY);
        const now = Date.now();
        
        // 检查稍后提醒时间
        if (remindTime && now < parseInt(remindTime)) {
            console.log('[Update] User requested remind later, waiting...');
            return;
        }
        
        // 检查是否需要检查（间隔控制）
        if (!forceCheck && lastCheck && (now - parseInt(lastCheck)) < CHECK_INTERVAL) {
            console.log('[Update] Skip check, last check was recent');
            return;
        }
        
        console.log('[Update] Silent checking for updates...');
        localStorage.setItem(UPDATE_CHECK_KEY, now.toString());
        
        for (const url of VERSION_URLS) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 10000); // 10秒超时
                
                const response = await fetch(url + '?t=' + now, {
                    cache: 'no-store',
                    headers: { 'Cache-Control': 'no-cache' },
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) continue;
                
                const data = await response.json();
                processUpdateInfo(data);
                return;
            } catch (e) {
                console.log('[Update] Failed to fetch from:', url, e.message);
            }
        }
        console.log('[Update] All version check URLs failed');
    }
    
    // 处理更新信息
    function processUpdateInfo(data) {
        const remoteVersion = data.version;
        const skipVersion = localStorage.getItem(UPDATE_SKIP_KEY);
        
        // 检查是否有新版本
        if (compareVersion(remoteVersion, APP_VERSION) > 0) {
            // 检查是否已跳过此版本
            if (skipVersion === remoteVersion && !data.forceUpdate) {
                console.log('[Update] User skipped this version:', remoteVersion);
                return;
            }
            
            console.log('[Update] New version available:', remoteVersion);
            showUpdateDialog(data);
        } else {
            console.log('[Update] Current version is up to date:', APP_VERSION);
        }
    }
    
    // 显示更新弹窗 - v6-v8: 终极高级版
    function showUpdateDialog(data) {
        // 移除已存在的弹窗
        const existing = document.getElementById('updateDialog');
        if (existing) existing.remove();
        
        const platform = getPlatform();
        const downloadUrl = data.downloadUrls?.[platform] || data.downloadUrls?.web;
        const isForce = data.forceUpdate;
        const changelog = data.changelog || [];
        const updateSize = data.updateSize || '';
        const importance = data.importance || 'normal'; // normal, important, critical
        
        const dialog = document.createElement('div');
        dialog.id = 'updateDialog';
        dialog.className = 'update-dialog-overlay' + (isForce ? ' force-update' : '') + ` importance-${importance}`;
        
        // v6: 计算更新大小显示
        const sizeDisplay = updateSize ? `<span class="update-size">${updateSize}</span>` : '';
        
        // v7: 重要性标签
        const importanceLabels = {
            normal: '',
            important: '<span class="importance-badge important">重要更新</span>',
            critical: '<span class="importance-badge critical">紧急修复</span>'
        };
        const importanceBadge = importanceLabels[importance] || '';
        
        // v8: 更新进度显示（用于下载进度）
        const progressBar = platform === 'web' ? `
            <div class="update-progress-container" id="updateProgressContainer" style="display:none;">
                <div class="update-progress-bar">
                    <div class="update-progress-fill" id="updateProgressFill"></div>
                </div>
                <span class="update-progress-text" id="updateProgressText">准备更新...</span>
            </div>
        ` : '';
        
        dialog.innerHTML = `
            <div class="update-dialog">
                <!-- v6: 关闭按钮（非强制更新时显示） -->
                ${!isForce ? `
                <button class="update-close-btn" onclick="window.appUpdate.close()" aria-label="关闭">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
                ` : ''}
                
                <!-- 头部装饰 -->
                <div class="update-header">
                    <div class="update-header-bg">
                        <div class="update-particles">
                            ${Array(12).fill('<span></span>').join('')}
                        </div>
                        <div class="update-glow"></div>
                    </div>
                    <div class="update-icon-wrapper">
                        <div class="update-icon-ring"></div>
                        <div class="update-icon">
                            <svg viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#starGrad)" stroke="url(#starGrad)" stroke-width="1"/>
                                <defs>
                                    <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stop-color="#fbbf24"/>
                                        <stop offset="100%" stop-color="#f59e0b"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </div>
                    <div class="update-badge">NEW</div>
                </div>
                
                <!-- 内容区 -->
                <div class="update-content">
                    <h2 class="update-title">发现新版本 ${importanceBadge}</h2>
                    <div class="update-version-info">
                        <span class="version-current">v${APP_VERSION}</span>
                        <svg class="version-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <span class="version-new">v${data.version}</span>
                        ${sizeDisplay}
                    </div>
                    
                    ${changelog.length > 0 ? `
                    <div class="update-changelog">
                        <h3>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                                <line x1="16" y1="13" x2="8" y2="13"/>
                                <line x1="16" y1="17" x2="8" y2="17"/>
                                <polyline points="10 9 9 9 8 9"/>
                            </svg>
                            更新内容
                        </h3>
                        <ul>
                            ${changelog.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="update-meta">
                        <span class="update-date">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                                <line x1="16" y1="2" x2="16" y2="6"/>
                                <line x1="8" y1="2" x2="8" y2="6"/>
                                <line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            ${data.releaseDate || '最新发布'}
                        </span>
                        <span class="update-platform">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                                <line x1="8" y1="21" x2="16" y2="21"/>
                                <line x1="12" y1="17" x2="12" y2="21"/>
                            </svg>
                            ${platform === 'web' ? 'Web版' : platform === 'ios' ? 'iOS' : platform === 'android' ? 'Android' : platform === 'mac' ? 'macOS' : platform === 'win' ? 'Windows' : 'Linux'}
                        </span>
                    </div>
                    
                    ${progressBar}
                </div>
                
                <!-- 按钮区 -->
                <div class="update-actions">
                    <button class="update-btn primary" id="updatePrimaryBtn" onclick="window.appUpdate.doUpdate('${downloadUrl}')">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="7 10 12 15 17 10"/>
                            <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                        <span>立即更新</span>
                    </button>
                    ${!isForce ? `
                    <div class="update-secondary-actions">
                        <button class="update-btn secondary" onclick="window.appUpdate.skipVersion('${data.version}')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                            </svg>
                            跳过此版本
                        </button>
                        <button class="update-btn tertiary" onclick="window.appUpdate.remindLater()">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12 6 12 12 16 14"/>
                            </svg>
                            稍后提醒
                        </button>
                    </div>
                    ` : `
                    <p class="force-update-tip">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="8" x2="12" y2="12"/>
                            <line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        此版本为重要更新，需要立即更新才能继续使用
                    </p>
                    `}
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // v7: 入场动画 + 触觉反馈
        requestAnimationFrame(() => {
            dialog.classList.add('show');
            // 尝试触觉反馈（移动端）
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
        
        // v8: 点击背景关闭（非强制更新）
        if (!isForce) {
            dialog.addEventListener('click', (e) => {
                if (e.target === dialog) {
                    closeUpdateDialog();
                }
            });
        }
    }
    
    // v6改进: 执行更新 - 添加进度显示
    function doUpdate(url) {
        const platform = getPlatform();
        const btn = document.getElementById('updatePrimaryBtn');
        
        // 禁用按钮，显示加载状态
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `
                <svg class="update-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                </svg>
                <span>正在更新...</span>
            `;
        }
        
        if (platform === 'web') {
            // v8: Web版：显示进度条
            const progressContainer = document.getElementById('updateProgressContainer');
            const progressFill = document.getElementById('updateProgressFill');
            const progressText = document.getElementById('updateProgressText');
            
            if (progressContainer) {
                progressContainer.style.display = 'block';
                let progress = 0;
                const progressInterval = setInterval(() => {
                    progress += Math.random() * 15;
                    if (progress > 90) progress = 90;
                    if (progressFill) progressFill.style.width = progress + '%';
                    if (progressText) progressText.textContent = `更新中... ${Math.floor(progress)}%`;
                }, 200);
                
                // 清理缓存
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage('CLEAR_CACHE');
                }
                
                // 完成并刷新
                setTimeout(() => {
                    clearInterval(progressInterval);
                    if (progressFill) progressFill.style.width = '100%';
                    if (progressText) progressText.textContent = '更新完成，正在刷新...';
                    setTimeout(() => window.location.reload(true), 500);
                }, 1500);
            } else {
                // 无进度条时直接刷新
                if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
                    navigator.serviceWorker.controller.postMessage('CLEAR_CACHE');
                }
                setTimeout(() => window.location.reload(true), 500);
            }
        } else if (platform === 'ios' || platform === 'android') {
            // 移动端：跳转到应用商店
            showToast('正在跳转到应用商店...');
            setTimeout(() => {
                window.open(url, '_blank');
                closeUpdateDialog();
            }, 500);
        } else {
            // 桌面端：打开下载页面
            showToast('正在打开下载页面...');
            setTimeout(() => {
                if (window.electron?.shell) {
                    window.electron.shell.openExternal(url);
                } else {
                    window.open(url, '_blank');
                }
                closeUpdateDialog();
            }, 500);
        }
    }
    
    // 跳过此版本
    function skipVersion(version) {
        localStorage.setItem(UPDATE_SKIP_KEY, version);
        localStorage.removeItem(UPDATE_REMIND_KEY);
        closeUpdateDialog();
        showToast('已跳过此版本，下个版本时会再次提醒', 'info');
    }
    
    // v6改进: 稍后提醒 - 使用独立的提醒时间
    function remindLater() {
        const remindTime = Date.now() + REMIND_LATER_INTERVAL;
        localStorage.setItem(UPDATE_REMIND_KEY, remindTime.toString());
        closeUpdateDialog();
        showToast('好的，30分钟后再提醒您', 'info');
    }
    
    // 关闭更新弹窗
    function closeUpdateDialog() {
        const dialog = document.getElementById('updateDialog');
        if (dialog) {
            dialog.classList.remove('show');
            setTimeout(() => dialog.remove(), 300);
        }
    }
    
    // v7改进: Toast提示 - 支持不同类型
    function showToast(message, type = 'success') {
        // 移除已存在的 toast
        const existing = document.querySelector('.update-toast');
        if (existing) existing.remove();
        
        const icons = {
            success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
            info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
            warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
            error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>'
        };
        
        const toast = document.createElement('div');
        toast.className = `update-toast toast-${type}`;
        toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span>`;
        document.body.appendChild(toast);
        
        requestAnimationFrame(() => toast.classList.add('show'));
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2500);
    }
    
    // v8: 手动检查更新（设置页面调用）
    function manualCheckUpdate() {
        showToast('正在检查更新...', 'info');
        silentCheckUpdate(true).then(() => {
            // 如果没有弹窗显示，说明已是最新
            setTimeout(() => {
                if (!document.getElementById('updateDialog')) {
                    showToast('当前已是最新版本 v' + APP_VERSION, 'success');
                }
            }, 1000);
        });
    }
    
    // 暴露更新 API
    window.appUpdate = {
        check: silentCheckUpdate,
        manualCheck: manualCheckUpdate,
        doUpdate,
        skipVersion,
        remindLater,
        close: closeUpdateDialog,
        showToast,
        version: APP_VERSION,
        versionCode: APP_VERSION_CODE
    };
    
    // 检查版本更新
    function checkVersion() {
        const savedVersion = localStorage.getItem(VERSION_KEY);
        if (savedVersion !== APP_VERSION) {
            console.log('[App] New version detected:', APP_VERSION);
            localStorage.setItem(VERSION_KEY, APP_VERSION);
            
            // 如果是更新（不是首次安装），清理缓存
            if (savedVersion) {
                clearAppCache();
            }
        }
    }
    
    // 清理应用缓存（保留用户数据）
    function clearAppCache() {
        // 保留的用户数据键名
        const preserveKeys = [
            'activatedMachines',
            'activationKey', 
            'deviceId',
            'machineId',
            'wordStats',
            'learnedWords',
            'favoriteWords',
            'vocabProgress',
            'listeningProgress',
            'readingProgress',
            'userSettings',
            'userAvatar',
            'app_version',
            'last_update_check',
            'skip_version',
            'theme',
            'fontSize'
        ];
        
        // 备份用户数据
        const backup = {};
        preserveKeys.forEach(key => {
            const value = localStorage.getItem(key);
            if (value !== null) {
                backup[key] = value;
            }
        });
        
        // 清理 Service Worker 缓存
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage('CLEAR_CACHE');
        }
        
        // 清理 localStorage（但保留用户数据）
        const allKeys = Object.keys(localStorage);
        allKeys.forEach(key => {
            if (!preserveKeys.some(pk => key.startsWith(pk) || key === pk)) {
                localStorage.removeItem(key);
            }
        });
        
        // 恢复用户数据
        Object.keys(backup).forEach(key => {
            localStorage.setItem(key, backup[key]);
        });
        
        console.log('[App] Cache cleared, user data preserved');
    }
    
    // 监听 Service Worker 更新消息
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', event => {
            if (event.data && event.data.type === 'SW_UPDATED') {
                console.log('[App] Service Worker updated, refreshing...');
                // 自动刷新页面获取最新版本
                window.location.reload();
            }
            if (event.data && event.data.type === 'CACHE_CLEARED') {
                console.log('[App] Cache cleared successfully');
            }
        });
        
        // 注册/更新 Service Worker
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('[App] Service Worker registered');
            
            // 立即检查更新
            registration.update();
            
            // 每次页面显示时检查更新
            document.addEventListener('visibilitychange', () => {
                if (document.visibilityState === 'visible') {
                    registration.update();
                }
            });
        }).catch(err => {
            console.log('[App] Service Worker registration failed:', err);
        });
    }
    
    // 页面加载时检查版本
    checkVersion();
    
    // 应用启动后静默检查远程更新（延迟3秒，不影响首屏加载）
    setTimeout(() => {
        silentCheckUpdate();
    }, 3000);
    
    // 页面每次可见时检查更新
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            silentCheckUpdate();
        }
    });
    
    // 暴露清理函数供手动调用
    window.clearAppCache = clearAppCache;
})();

// ==================== 浏览器兼容性检测 ====================
(function() {
    'use strict';
    
    // 检测浏览器特性
    window.browserSupport = {
        speechSynthesis: 'speechSynthesis' in window,
        speechRecognition: 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window,
        localStorage: (function() {
            try {
                localStorage.setItem('test', 'test');
                localStorage.removeItem('test');
                return true;
            } catch(e) {
                return false;
            }
        })(),
        serviceWorker: 'serviceWorker' in navigator,
        touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        standalone: window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone
    };
    
    // 添加浏览器类名到body
    document.addEventListener('DOMContentLoaded', function() {
        var html = document.documentElement;
        
        // iOS 检测
        if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
            html.classList.add('ios');
        }
        
        // Android 检测
        if (/Android/.test(navigator.userAgent)) {
            html.classList.add('android');
        }
        
        // 触摸设备
        if (window.browserSupport.touch) {
            html.classList.add('touch-device');
        }
        
        // PWA 模式
        if (window.browserSupport.standalone) {
            html.classList.add('pwa-mode');
        }
        
        // 修复iOS 100vh问题
        function setVH() {
            var vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', vh + 'px');
        }
        setVH();
        window.addEventListener('resize', setVH);
        window.addEventListener('orientationchange', function() {
            setTimeout(setVH, 100);
        });
    });
})();

// ==================== 模块控制 ====================
function openModule(moduleName) {
    console.log('openModule called with:', moduleName);
    currentModule = moduleName;
    var modalId = moduleName + 'Modal';
    var modal = document.getElementById(modalId);
    
    console.log('Looking for modal:', modalId, 'Found:', !!modal);
    
    if (modal) {
        console.log('Adding active class to modal');
        modal.classList.add('active');
        
        // 隐藏底部导航栏
        var bottomNav = document.getElementById('bottomNav');
        if (bottomNav) bottomNav.classList.add('hidden');
        
        // 初始化各模块
        switch(moduleName) {
            case 'vocabulary':
                console.log('Initializing vocabulary module');
                if (typeof initVocabulary === 'function') initVocabulary();
                else console.error('initVocabulary not found');
                break;
            case 'listening':
                console.log('Initializing listening module');
                if (typeof initListeningModule === 'function') initListeningModule();
                else console.error('initListeningModule not found');
                break;
            case 'speaking':
                console.log('Initializing speaking module');
                if (typeof initSpeakingModule === 'function') initSpeakingModule();
                else console.error('initSpeakingModule not found');
                break;
            case 'reading':
                console.log('Initializing reading module');
                if (typeof initReadingModule === 'function') initReadingModule();
                else console.error('initReadingModule not found');
                break;
            case 'review':
                console.log('Initializing review module');
                if (typeof updateReviewStats === 'function') updateReviewStats();
                else console.error('updateReviewStats not found');
                break;
            case 'resources':
                console.log('Initializing resources module');
                if (typeof initResourcesModule === 'function') initResourcesModule();
                else console.error('initResourcesModule not found');
                break;
        }
        console.log('Module initialization complete');
    } else {
        console.error('Modal not found for:', modalId);
    }
}

function closeModule() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    currentModule = null;
    
    // 显示底部导航栏
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.classList.remove('hidden');
    
    // 清理设置底部栏
    cleanupSettingsBottomBar();
    
    // 停止任何正在播放的音频
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
    }
}

// ==================== 底部导航 ====================
function switchTab(tab) {
    document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
    var target = document.querySelector('.nav-item[data-tab="' + tab + '"]');
    if (target) target.classList.add('active');
    
    if (tab === 'home') {
        closeModule();
        document.querySelector('.main-content').style.display = 'block';
    } else if (tab === 'stats') {
        showStats();
    } else if (tab === 'settings') {
        showSettings();
    }
}

function showStats() {
    var modal = document.getElementById('statsModal');
    if (!modal) { alert('统计界面未找到'); return; }
    
    // 基础统计
    var listens = parseInt(localStorage.getItem('stat_listen') || '0');
    var speaking = parseInt(localStorage.getItem('stat_speaking') || '0');
    var reading = parseInt(localStorage.getItem('stat_reading') || '0');
    var words = parseInt(localStorage.getItem('learnedCount') || '0');
    
    // 更新分项统计
    const listenEl = document.getElementById('stat_listen');
    const speakingEl = document.getElementById('stat_speaking');
    const readingEl = document.getElementById('stat_reading');
    const wordsEl = document.getElementById('stat_words');
    
    if (listenEl) listenEl.textContent = listens;
    if (speakingEl) speakingEl.textContent = speaking;
    if (readingEl) readingEl.textContent = reading;
    if (wordsEl) wordsEl.textContent = words;
    
    // 总览统计
    var totalDays = parseInt(localStorage.getItem('total_learning_days') || '0');
    // learningStreak 可能是 JSON 对象，需要正确解析
    var streakData = localStorage.getItem('learningStreak');
    var streakDays = 0;
    try {
        var parsed = JSON.parse(streakData || '{"count":0}');
        streakDays = parseInt(parsed.count) || 0;
    } catch (e) {
        streakDays = parseInt(streakData) || 0;
    }
    var totalMins = parseInt(localStorage.getItem('total_learning_mins') || '0');
    
    const totalDaysEl = document.getElementById('stat_total_days');
    const streakDaysEl = document.getElementById('stat_streak_days');
    const totalMinsEl = document.getElementById('stat_total_mins');
    
    if (totalDaysEl) totalDaysEl.textContent = totalDays;
    if (streakDaysEl) streakDaysEl.textContent = streakDays;
    if (totalMinsEl) totalMinsEl.textContent = totalMins;
    
    // 复习统计
    var mastered = parseInt(localStorage.getItem('masteredCount') || '0');
    var reviewing = words - mastered;
    var pending = parseInt(localStorage.getItem('pendingReview') || '0');
    
    const masteredEl = document.getElementById('stat_mastered');
    const reviewingEl = document.getElementById('stat_reviewing');
    const pendingEl = document.getElementById('stat_pending');
    const progressFill = document.getElementById('reviewProgressFill');
    const progressPercent = document.getElementById('reviewProgressPercent');
    
    if (masteredEl) masteredEl.textContent = mastered;
    if (reviewingEl) reviewingEl.textContent = Math.max(0, reviewing);
    if (pendingEl) pendingEl.textContent = pending;
    
    // 计算掌握进度
    var total = words || 1;
    var percent = Math.round((mastered / total) * 100);
    if (progressFill) progressFill.style.width = percent + '%';
    if (progressPercent) progressPercent.textContent = percent + '%';
    
    modal.classList.add('active');
    
    // 隐藏底部导航栏
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.classList.add('hidden');
}

function showSettings() {
    var modal = document.getElementById('settingsModal');
    if (!modal) { alert('设置界面未找到'); return; }
    if (typeof loadAppSettings === 'function') loadAppSettings();
    modal.classList.add('active');
    
    // 隐藏底部导航栏
    var bottomNav = document.getElementById('bottomNav');
    if (bottomNav) bottomNav.classList.add('hidden');
    
    // 初始化设置底部栏滚动行为
    initSettingsBottomBar();
    
    // 更新今日词汇计数
    updateTodayWordsCount();
    
    // 恢复全盘复习模式开关状态
    restoreComprehensiveReviewToggle();
}

// 更新设置页面的今日词汇计数
function updateTodayWordsCount() {
    var countEl = document.getElementById('todayWordsCount');
    if (!countEl) return;
    
    if (typeof getTodayLearnedWords === 'function') {
        var todayWords = getTodayLearnedWords();
        countEl.textContent = todayWords.length;
    } else {
        // 回退方案
        var today = new Date().toDateString();
        var wordProgress = {};
        try {
            wordProgress = JSON.parse(localStorage.getItem('wordLearningProgress') || '{}');
        } catch(e) {}
        
        var learnedWords = [];
        try {
            learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
        } catch(e) {}
        
        var count = 0;
        learnedWords.forEach(function(word) {
            var progress = wordProgress[word];
            if (progress && progress.lastReview) {
                var reviewDate = new Date(progress.lastReview).toDateString();
                if (reviewDate === today) count++;
            }
        });
        countEl.textContent = count;
    }
}

// 恢复全盘复习模式开关状态
function restoreComprehensiveReviewToggle() {
    var toggle = document.getElementById('comprehensiveReviewToggle');
    if (!toggle) return;
    
    try {
        var settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
        toggle.checked = settings.comprehensiveReviewMode === true;
    } catch(e) {
        toggle.checked = false;
    }
}

function confirmResetStats() {
    if (confirm('确定要重置所有统计数据吗？此操作不可撤销。')) {
        localStorage.setItem('stat_listen', '0');
        localStorage.setItem('stat_speaking', '0');
        localStorage.setItem('stat_reading', '0');
        localStorage.setItem('total_learning_days', '0');
        localStorage.setItem('total_learning_mins', '0');
        showStats(); // 刷新显示
        if (typeof showToast === 'function') {
            showToast('📊 统计数据已重置');
        }
    }
}

function exportStats() {
    var data = {
        exportTime: new Date().toISOString(),
        statistics: {
            listens: parseInt(localStorage.getItem('stat_listen') || '0'),
            speaking: parseInt(localStorage.getItem('stat_speaking') || '0'),
            reading: parseInt(localStorage.getItem('stat_reading') || '0'),
            words: parseInt(localStorage.getItem('learnedCount') || '0'),
            mastered: parseInt(localStorage.getItem('masteredCount') || '0'),
            totalDays: parseInt(localStorage.getItem('total_learning_days') || '0'),
            streak: parseInt(localStorage.getItem('learningStreak') || '0'),
            totalMins: parseInt(localStorage.getItem('total_learning_mins') || '0')
        }
    };
    var blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; 
    a.download = 'english-boost-stats-' + new Date().toISOString().slice(0, 10) + '.json'; 
    document.body.appendChild(a); 
    a.click(); 
    a.remove(); 
    URL.revokeObjectURL(url);
    
    if (typeof showToast === 'function') {
        showToast('📤 统计数据已导出');
    }
}

// ==================== 底部导航滚动隐藏 ====================
let lastScrollTop = 0;
let scrollThreshold = 50;

function initNavScrollBehavior() {
    const bottomNav = document.getElementById('bottomNav');
    const mainContent = document.querySelector('.main-content');
    
    if (!bottomNav || !mainContent) return;
    
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        // 如果有模态框打开，不处理滚动
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) return;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleNavScroll(bottomNav);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // 触摸结束时检查位置
    window.addEventListener('touchend', function() {
        // 如果有模态框打开，不处理
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) return;
        
        setTimeout(function() {
            handleNavScroll(bottomNav);
        }, 100);
    }, { passive: true });
}

function handleNavScroll(bottomNav) {
    // 再次检查是否有模态框打开
    const activeModal = document.querySelector('.modal.active');
    if (activeModal) return;
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    
    // 在页面顶部附近时始终显示导航
    if (scrollTop < 100) {
        bottomNav.classList.remove('hidden');
    }
    // 滚动到底部85%以上时显示导航（方便切换标签）
    else if (scrollPercent > 0.85) {
        bottomNav.classList.remove('hidden');
    } 
    // 向上滑（手指向下拉，scrollTop变小）时显示导航
    else if (scrollTop < lastScrollTop - 10) {
        bottomNav.classList.remove('hidden');
    } 
    // 向下滑（手指向上推，scrollTop变大）时隐藏导航
    else if (scrollTop > lastScrollTop + 10) {
        bottomNav.classList.add('hidden');
    }
    
    lastScrollTop = scrollTop;
}

// ==================== 设置底部栏滚动显示/隐藏 ====================
let settingsLastScrollTop = 0;
let settingsScrollHandler = null;

function initSettingsBottomBar() {
    const settingsModal = document.getElementById('settingsModal');
    const bottomBar = document.querySelector('.settings-bottom-bar');
    
    if (!settingsModal || !bottomBar) return;
    
    // 找到设置模态框的滚动容器 - 使用 .settings-content
    const scrollContainer = settingsModal.querySelector('.settings-content');
    
    if (!scrollContainer) return;
    
    // 移除旧的监听器
    if (settingsScrollHandler) {
        scrollContainer.removeEventListener('scroll', settingsScrollHandler);
    }
    
    // 重置状态 - 默认显示底部栏
    settingsLastScrollTop = 0;
    bottomBar.classList.remove('hiding');
    bottomBar.classList.add('visible');
    
    let ticking = false;
    
    settingsScrollHandler = function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                handleSettingsScroll(scrollContainer, bottomBar);
                ticking = false;
            });
            ticking = true;
        }
    };
    
    scrollContainer.addEventListener('scroll', settingsScrollHandler, { passive: true });
}

function handleSettingsScroll(container, bottomBar) {
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;
    
    // 向下滑动（scrollTop 增加）- 隐藏底部栏
    if (scrollTop > settingsLastScrollTop + 10) {
        bottomBar.classList.add('hiding');
        bottomBar.classList.remove('visible');
    } 
    // 向上滑动（scrollTop 减少）- 显示底部栏
    else if (scrollTop < settingsLastScrollTop - 10) {
        bottomBar.classList.remove('hiding');
        bottomBar.classList.add('visible');
    }
    
    // 在页面顶部时显示
    if (scrollTop < 30) {
        bottomBar.classList.remove('hiding');
        bottomBar.classList.add('visible');
    }
    
    // 滚动到接近底部时显示
    if (scrollTop + clientHeight >= scrollHeight - 50) {
        bottomBar.classList.remove('hiding');
        bottomBar.classList.add('visible');
    }
    
    settingsLastScrollTop = scrollTop;
}

// 关闭设置时清理
function cleanupSettingsBottomBar() {
    const bottomBar = document.querySelector('.settings-bottom-bar');
    if (bottomBar) {
        bottomBar.classList.remove('visible', 'hiding');
    }
}

// ==================== 应用初始化 ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== English Boost App Initializing ===');
    
    // 版本10：首次使用时显示适龄提示（《未成年人保护法》合规）
    if (typeof checkAgeDisclaimer === 'function') {
        checkAgeDisclaimer();
    }
    
    console.log('1. 检查所有必需函数...');
    console.log('  - openModule:', typeof openModule);
    console.log('  - closeModule:', typeof closeModule);
    console.log('  - login:', typeof login);
    console.log('  - initVocabulary:', typeof initVocabulary);
    console.log('  - initListeningModule:', typeof initListeningModule);
    console.log('  - initSpeakingModule:', typeof initSpeakingModule);
    console.log('  - initReadingModule:', typeof initReadingModule);
    console.log('  - initResourcesModule:', typeof initResourcesModule);
    
    console.log('2. 检查DOM元素...');
    console.log('  - loginPage:', !!document.getElementById('loginPage'));
    console.log('  - mainApp:', !!document.getElementById('mainApp'));
    console.log('  - vocabularyModal:', !!document.getElementById('vocabularyModal'));
    
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    console.log('3. 登录状态:', isLoggedIn);
    
    if (isLoggedIn) {
        const authUser = JSON.parse(localStorage.getItem('authUser') || '{}');
        const savedDeviceId = localStorage.getItem('deviceId');
        
        if (typeof getDeviceFingerprint === 'function') {
            const currentDeviceId = getDeviceFingerprint();
            
            if (authUser.permanent && savedDeviceId && savedDeviceId !== currentDeviceId) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('activationKey');
                localStorage.removeItem('authUser');
                alert('检测到设备变更，请重新登录');
                location.reload();
                return;
            }
        }
        
        const loginPage = document.getElementById('loginPage');
        const mainApp = document.getElementById('mainApp');
        
        if (loginPage) loginPage.classList.add('hidden');
        if (mainApp) mainApp.classList.remove('hidden');
        
        // 初始化今日目标
        initDailyGoals();
        
        // 初始化导航滚动行为
        initNavScrollBehavior();
        
        // 初始化头像
        initAvatar();
        
        // 初始化订阅状态徽章
        if (typeof renderSubscriptionBadge === 'function') {
            renderSubscriptionBadge();
        }
        
        // 检查订阅状态（试用期提醒等）
        if (typeof checkAndShowExpiredWarning === 'function') {
            setTimeout(() => {
                checkAndShowExpiredWarning();
            }, 1500);
        }
    } else {
        const loginPage = document.getElementById('loginPage');
        const mainApp = document.getElementById('mainApp');
        
        if (loginPage) loginPage.classList.remove('hidden');
        if (mainApp) mainApp.classList.add('hidden');
    }
    
    // 从 appSettings 加载主题和液态玻璃
    const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    const theme = settings.theme || 'default';
    if (typeof applyTheme === 'function') {
        applyTheme(theme);
    }
    
    // 应用液态玻璃模式
    if (settings.liquidGlassMode === true) {
        document.body.classList.add('liquid-glass-mode');
        console.log('液态玻璃模式已启用');
    } else {
        document.body.classList.remove('liquid-glass-mode');
    }
    
    // 启用复习提醒（如果已设置）
    if (settings.reviewReminder === true && typeof setupReviewReminder === 'function') {
        setTimeout(() => {
            setupReviewReminder();
        }, 3000); // 延迟3秒启动，避免影响页面加载
    }
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(function(err) {
            console.log('Service Worker注册失败:', err);
        });
    }
    
    console.log('App initialized successfully');
});

// 导出新函数到全局
window.confirmResetStats = confirmResetStats;
window.initNavScrollBehavior = initNavScrollBehavior;

// ==================== 今日目标功能 ====================
var dailyGoals = {
    vocabulary: 50,
    listening: 5,
    speaking: 10,
    reading: 2,
    review: 20
};

var todayProgress = {
    vocabulary: 0,
    listening: 0,
    speaking: 0,
    reading: 0,
    review: 0
};

// 初始化今日目标
function initDailyGoals() {
    // 加载保存的目标
    var savedGoals = localStorage.getItem('dailyGoals');
    if (savedGoals) {
        dailyGoals = JSON.parse(savedGoals);
    }
    
    // 检查是否是新的一天，如果是则重置进度
    var lastDate = localStorage.getItem('lastProgressDate');
    var today = new Date().toDateString();
    
    if (lastDate !== today) {
        // 新的一天，重置进度
        todayProgress = {
            vocabulary: 0,
            listening: 0,
            speaking: 0,
            reading: 0,
            review: 0
        };
        localStorage.setItem('todayProgress', JSON.stringify(todayProgress));
        localStorage.setItem('lastProgressDate', today);
    } else {
        // 加载今日进度
        var savedProgress = localStorage.getItem('todayProgress');
        if (savedProgress) {
            todayProgress = JSON.parse(savedProgress);
        }
    }
    
    // 从各模块的统计数据同步进度
    syncProgressFromStats();
    
    // 渲染目标进度
    renderGoalsProgress();
}

// 从统计数据同步进度
function syncProgressFromStats() {
    var today = new Date().toDateString();
    
    // 词汇进度 - 使用今日学习的单词数
    var learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    var vocabDate = localStorage.getItem('todayVocabularyDate');
    todayProgress.vocabulary = (vocabDate === today) ? parseInt(localStorage.getItem('todayVocabularyCount') || '0') : 0;
    
    // 听力进度
    var listenDate = localStorage.getItem('todayListeningDate');
    todayProgress.listening = (listenDate === today) ? parseInt(localStorage.getItem('todayListeningCount') || '0') : 0;
    
    // 口语进度
    var speakDate = localStorage.getItem('todaySpeakingDate');
    todayProgress.speaking = (speakDate === today) ? parseInt(localStorage.getItem('todaySpeakingCount') || '0') : 0;
    
    // 阅读进度 - 从今日阅读文章数获取
    var todayReadData = JSON.parse(localStorage.getItem('todayReadArticles') || '{"date":"","articles":[]}');
    todayProgress.reading = (todayReadData.date === today) ? todayReadData.articles.length : 0;
    
    // 复习进度
    var reviewDate = localStorage.getItem('todayReviewDate');
    todayProgress.review = (reviewDate === today) ? parseInt(localStorage.getItem('todayReviewCount') || '0') : 0;
}

// 渲染目标进度
function renderGoalsProgress() {
    var container = document.getElementById('goalsProgressContainer');
    if (!container) return;
    
    var modules = [
        { key: 'vocabulary', name: '单词学习', iconClass: 'vocab', unit: '个', 
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' },
        { key: 'listening', name: '听力练习', iconClass: 'listen', unit: '篇',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z"/></svg>' },
        { key: 'speaking', name: '口语跟读', iconClass: 'speak', unit: '句',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/></svg>' },
        { key: 'reading', name: '阅读理解', iconClass: 'read', unit: '篇',
          icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' }
    ];
    
    var html = '';
    var completedCount = 0;
    var totalGoals = 0;
    var totalProgressPercent = 0;
    
    modules.forEach(function(mod) {
        var goal = dailyGoals[mod.key] || 0;
        var progress = todayProgress[mod.key] || 0;
        
        // 如果目标为0，跳过这个项目
        if (goal === 0) return;
        
        totalGoals++;
        var percent = Math.min(100, Math.round((progress / goal) * 100));
        totalProgressPercent += percent;
        
        if (percent >= 100) completedCount++;
        
        html += '<div class="goal-progress-item">' +
            '<div class="goal-progress-icon ' + mod.iconClass + '">' + mod.icon + '</div>' +
            '<div class="goal-progress-info">' +
            '<div class="goal-progress-label">' +
            '<span class="goal-progress-name">' + mod.name + '</span>' +
            '<span class="goal-progress-count">' + progress + '/' + goal + ' ' + mod.unit + '</span>' +
            '</div>' +
            '<div class="goal-progress-bar">' +
            '<div class="goal-progress-fill ' + mod.key + '" style="width:' + percent + '%"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
    });
    
    if (totalGoals === 0) {
        html = '<div style="text-align:center;padding:30px;color:#6b7280;">' +
            '<div style="margin-bottom:12px;"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2" fill="#9ca3af"/></svg></div>' +
            '<div style="font-size:15px;font-weight:600;color:#374151;margin-bottom:6px;">还没有设置目标</div>' +
            '<div style="font-size:13px;">点击右上角设置按钮开始设置今日目标</div>' +
            '</div>';
    }
    
    container.innerHTML = html;
    
    // 计算平均进度
    var avgPercent = totalGoals > 0 ? Math.round(totalProgressPercent / totalGoals) : 0;
    
    // 更新进度环
    var progressRing = document.getElementById('progressRingFill');
    if (progressRing) {
        var circumference = 213.6; // 2 * π * 34
        var offset = circumference - (avgPercent / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;
    }
    
    // 更新统计文本
    var completedText = document.getElementById('goalsCompletedText');
    var progressNumEl = document.getElementById('goalsTotalProgressNum');
    var progressOverlay = document.getElementById('progressTextOverlay');
    var encourageText = document.getElementById('encourageText');
    
    if (completedText) {
        completedText.textContent = '已完成 ' + completedCount + '/' + totalGoals + ' 项';
    }
    
    // 版本1-3改进：更新横向百分比显示
    if (progressNumEl) {
        progressNumEl.textContent = avgPercent;
        
        // 版本2: 根据位数调整字体大小
        progressNumEl.classList.remove('two-digits', 'three-digits');
        if (avgPercent >= 100) {
            progressNumEl.classList.add('three-digits');
        } else if (avgPercent >= 10) {
            progressNumEl.classList.add('two-digits');
        }
    }
    
    // 版本3: 100%完成时添加特殊样式
    if (progressOverlay) {
        if (avgPercent >= 100) {
            progressOverlay.classList.add('completed');
        } else {
            progressOverlay.classList.remove('completed');
        }
    }
    if (encourageText) {
        if (avgPercent === 0) {
            encourageText.textContent = '开始今天的学习吧！';
        } else if (avgPercent < 50) {
            encourageText.textContent = '继续加油，你可以的！';
        } else if (avgPercent < 100) {
            encourageText.textContent = '太棒了，马上就完成了！';
        } else {
            encourageText.textContent = '🎉 今日目标已全部完成！';
        }
    }
    
    // 更新问候语
    updateGreeting();
    
    // 更新名言（如果函数存在）
    if (typeof updateQuoteDisplay === 'function') {
        updateQuoteDisplay();
    }
}

// 打开目标设置
function openGoalSettings() {
    var modal = document.getElementById('goalSettingsModal');
    if (modal) {
        modal.classList.add('active');
        
        // 填充当前目标值（安全检查元素是否存在）
        var vocabEl = document.getElementById('goalVocabulary');
        var listenEl = document.getElementById('goalListening');
        var speakEl = document.getElementById('goalSpeaking');
        var readEl = document.getElementById('goalReading');
        var reviewEl = document.getElementById('goalReview');
        
        if (vocabEl) vocabEl.value = dailyGoals.vocabulary || 0;
        if (listenEl) listenEl.value = dailyGoals.listening || 0;
        if (speakEl) speakEl.value = dailyGoals.speaking || 0;
        if (readEl) readEl.value = dailyGoals.reading || 0;
        if (reviewEl) reviewEl.value = dailyGoals.review || 0;
    }
}

// 关闭目标设置
function closeGoalSettings() {
    var modal = document.getElementById('goalSettingsModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// 保存目标设置
function saveGoalSettings() {
    var vocabEl = document.getElementById('goalVocabulary');
    var listenEl = document.getElementById('goalListening');
    var speakEl = document.getElementById('goalSpeaking');
    var readEl = document.getElementById('goalReading');
    var reviewEl = document.getElementById('goalReview');
    
    if (vocabEl) dailyGoals.vocabulary = parseInt(vocabEl.value) || 0;
    if (listenEl) dailyGoals.listening = parseInt(listenEl.value) || 0;
    if (speakEl) dailyGoals.speaking = parseInt(speakEl.value) || 0;
    if (readEl) dailyGoals.reading = parseInt(readEl.value) || 0;
    if (reviewEl) dailyGoals.review = parseInt(reviewEl.value) || 0;
    
    localStorage.setItem('dailyGoals', JSON.stringify(dailyGoals));
    
    renderGoalsProgress();
    closeGoalSettings();
    
    // 显示成功提示
    showToast('✅ 目标已保存');
}

// 重置目标设置
function resetGoalSettings() {
    var vocabEl = document.getElementById('goalVocabulary');
    var listenEl = document.getElementById('goalListening');
    var speakEl = document.getElementById('goalSpeaking');
    var readEl = document.getElementById('goalReading');
    var reviewEl = document.getElementById('goalReview');
    
    if (vocabEl) vocabEl.value = 50;
    if (listenEl) listenEl.value = 5;
    if (speakEl) speakEl.value = 10;
    if (readEl) readEl.value = 2;
    if (reviewEl) reviewEl.value = 20;
}

// 更新进度（供各模块调用）
function updateDailyProgress(module, increment) {
    if (!todayProgress[module]) todayProgress[module] = 0;
    todayProgress[module] += increment;
    
    // 保存今日进度
    localStorage.setItem('todayProgress', JSON.stringify(todayProgress));
    localStorage.setItem('today' + module.charAt(0).toUpperCase() + module.slice(1) + 'Count', todayProgress[module]);
    
    // 更新显示
    renderGoalsProgress();
}

// 更新问候语和日期
function updateGreeting() {
    var greetingEl = document.getElementById('greetingText');
    var dateEl = document.getElementById('dateText');
    var streakEl = document.getElementById('streakCount');
    
    // 获取北京时间 (UTC+8)
    var now = new Date();
    var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    var beijingTime = new Date(utc + (8 * 3600000));
    var hour = beijingTime.getHours();
    
    // 确定时间段
    var timePeriod = 'morning';
    var greeting = '你好';
    
    if (hour >= 5 && hour < 8) {
        timePeriod = 'dawn';
        greeting = '早安 🌅';
    } else if (hour >= 8 && hour < 12) {
        timePeriod = 'morning';
        greeting = '早上好 ☀️';
    } else if (hour >= 12 && hour < 14) {
        timePeriod = 'noon';
        greeting = '中午好 🌤️';
    } else if (hour >= 14 && hour < 18) {
        timePeriod = 'afternoon';
        greeting = '下午好 ⛅';
    } else if (hour >= 18 && hour < 20) {
        timePeriod = 'sunset';
        greeting = '傍晚好 🌇';
    } else if (hour >= 20 && hour < 22) {
        timePeriod = 'evening';
        greeting = '晚上好 🌙';
    } else {
        timePeriod = 'night';
        greeting = '夜深了 ✨';
    }
    
    if (greetingEl) {
        greetingEl.textContent = greeting;
    }
    
    // 更新场景
    updateTimeScene(timePeriod);
    
    if (dateEl) {
        var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var month = beijingTime.getMonth() + 1;
        var date = beijingTime.getDate();
        var weekday = weekdays[beijingTime.getDay()];
        dateEl.textContent = month + '月' + date + '日 ' + weekday;
    }
    
    // 计算连续学习天数
    if (streakEl) {
        var streak = calculateStreak();
        streakEl.textContent = streak;
    }
}

// 更新时段场景
function updateTimeScene(timePeriod) {
    var header = document.getElementById('homeHeader');
    var sceneIcon = document.getElementById('sceneIcon');
    var skyDecorations = document.getElementById('skyDecorations');
    
    if (header) {
        header.setAttribute('data-time-period', timePeriod);
    }
    
    // 设置场景图标
    if (sceneIcon) {
        sceneIcon.innerHTML = getSceneIcon(timePeriod);
    }
    
    // 设置天空装饰（云朵或星星）
    if (skyDecorations) {
        skyDecorations.innerHTML = getSkyDecorations(timePeriod);
    }
}

// 获取场景图标
function getSceneIcon(timePeriod) {
    var icons = {
        dawn: '<svg viewBox="0 0 32 32" width="32" height="32"><defs><linearGradient id="sunriseGrad" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stop-color="#ff8a50"/><stop offset="100%" stop-color="#ffc107"/></linearGradient></defs><path d="M16 22c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" fill="url(#sunriseGrad)"/><path d="M16 6v2M16 24v2M6 16H4M28 16h-2M8.9 8.9l1.4 1.4M21.7 21.7l1.4 1.4M8.9 23.1l1.4-1.4M21.7 10.3l1.4-1.4" stroke="#ffc107" stroke-width="2" stroke-linecap="round"/><path d="M4 26h24" stroke="rgba(255,255,255,0.6)" stroke-width="2" stroke-linecap="round"/></svg>',
        morning: '<svg viewBox="0 0 32 32" width="32" height="32"><defs><linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fff176"/><stop offset="100%" stop-color="#ffb300"/></linearGradient></defs><circle cx="16" cy="16" r="7" fill="url(#sunGrad)"/><g stroke="#ffb300" stroke-width="2" stroke-linecap="round"><line x1="16" y1="3" x2="16" y2="6"/><line x1="16" y1="26" x2="16" y2="29"/><line x1="3" y1="16" x2="6" y2="16"/><line x1="26" y1="16" x2="29" y2="16"/><line x1="7.1" y1="7.1" x2="9.2" y2="9.2"/><line x1="22.8" y1="22.8" x2="24.9" y2="24.9"/><line x1="7.1" y1="24.9" x2="9.2" y2="22.8"/><line x1="22.8" y1="9.2" x2="24.9" y2="7.1"/></g></svg>',
        noon: '<svg viewBox="0 0 32 32" width="32" height="32"><defs><linearGradient id="noonGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fff9c4"/><stop offset="100%" stop-color="#ffd54f"/></linearGradient><filter id="glow"><feGaussianBlur stdDeviation="1" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><circle cx="16" cy="14" r="8" fill="url(#noonGrad)" filter="url(#glow)"/><g stroke="#ffd54f" stroke-width="2.5" stroke-linecap="round"><line x1="16" y1="1" x2="16" y2="4"/><line x1="16" y1="24" x2="16" y2="27"/><line x1="3" y1="14" x2="6" y2="14"/><line x1="26" y1="14" x2="29" y2="14"/><line x1="6.5" y1="4.5" x2="8.6" y2="6.6"/><line x1="23.4" y1="21.4" x2="25.5" y2="23.5"/><line x1="6.5" y1="23.5" x2="8.6" y2="21.4"/><line x1="23.4" y1="6.6" x2="25.5" y2="4.5"/></g></svg>',
        afternoon: '<svg viewBox="0 0 32 32" width="32" height="32"><defs><linearGradient id="pmSunGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fff59d"/><stop offset="100%" stop-color="#ffb74d"/></linearGradient></defs><circle cx="18" cy="12" r="6" fill="url(#pmSunGrad)"/><g stroke="#ffb74d" stroke-width="2" stroke-linecap="round"><line x1="18" y1="2" x2="18" y2="4"/><line x1="18" y1="20" x2="18" y2="22"/><line x1="8" y1="12" x2="10" y2="12"/><line x1="26" y1="12" x2="28" y2="12"/></g><path d="M4 24c0-3 2.5-5 5-5 1 0 1.8.3 2.5.8.8-2.3 3-4 5.5-4 3.3 0 6 2.5 6 5.7 0 .2 0 .3 0 .5h1c2.2 0 4 1.8 4 4H4c0-1.1-.5-2-1.5-2z" fill="rgba(255,255,255,0.9)"/></svg>',
        sunset: '<svg viewBox="0 0 32 32" width="32" height="32"><defs><linearGradient id="setGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ff7043"/><stop offset="100%" stop-color="#ff5722"/></linearGradient></defs><circle cx="16" cy="20" r="8" fill="url(#setGrad)"/><rect x="0" y="22" width="32" height="10" fill="#37474f"/><g stroke="#ff8a65" stroke-width="2" stroke-linecap="round" opacity="0.8"><line x1="16" y1="8" x2="16" y2="10"/><line x1="7" y1="13" x2="9" y2="14"/><line x1="23" y1="14" x2="25" y2="13"/></g></svg>',
        evening: '<svg viewBox="0 0 32 32" width="32" height="32"><defs><linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fff"/><stop offset="100%" stop-color="#e0e0e0"/></linearGradient></defs><circle cx="16" cy="14" r="8" fill="url(#moonGrad)"/><circle cx="19" cy="11" r="9" fill="#1a237e" opacity="0.9"/><circle cx="12" cy="10" r="1.5" fill="#bdbdbd" opacity="0.5"/><circle cx="15" cy="16" r="1" fill="#bdbdbd" opacity="0.4"/><circle cx="10" cy="14" r="0.8" fill="#bdbdbd" opacity="0.3"/><g fill="#fff" opacity="0.7"><circle cx="6" cy="8" r="1"/><circle cx="26" cy="6" r="0.8"/><circle cx="28" cy="20" r="1"/><circle cx="4" cy="22" r="0.6"/></g></svg>',
        night: '<svg viewBox="0 0 32 32" width="32" height="32"><defs><linearGradient id="nightMoonGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fafafa"/><stop offset="100%" stop-color="#e8e8e8"/></linearGradient></defs><circle cx="14" cy="14" r="9" fill="url(#nightMoonGrad)"/><circle cx="18" cy="10" r="10" fill="#0d1b2a"/><circle cx="10" cy="11" r="1.5" fill="#bdbdbd" opacity="0.4"/><circle cx="13" cy="17" r="1" fill="#bdbdbd" opacity="0.3"/><g fill="#fff"><circle cx="26" cy="8" r="1.2"><animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/></circle><circle cx="6" cy="6" r="0.8"><animate attributeName="opacity" values="0.6;1;0.6" dur="1.5s" repeatCount="indefinite"/></circle><circle cx="28" cy="18" r="1"><animate attributeName="opacity" values="0.5;1;0.5" dur="2.5s" repeatCount="indefinite"/></circle><circle cx="4" cy="20" r="0.7"><animate attributeName="opacity" values="0.3;0.9;0.3" dur="1.8s" repeatCount="indefinite"/></circle><circle cx="24" cy="26" r="0.9"><animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite"/></circle><circle cx="8" cy="26" r="0.6"><animate attributeName="opacity" values="0.5;1;0.5" dur="1.7s" repeatCount="indefinite"/></circle></g></svg>'
    };
    return icons[timePeriod] || icons.morning;
}

// 获取天空装饰
function getSkyDecorations(timePeriod) {
    if (['evening', 'night'].includes(timePeriod)) {
        // 星星
        return '<div class="star star-1"></div><div class="star star-2"></div><div class="star star-3"></div><div class="star star-4"></div><div class="star star-5"></div><div class="star star-6"></div><div class="star star-7"></div><div class="star star-8"></div><div class="star star-9"></div><div class="star star-10"></div>';
    } else {
        // 云朵
        return '<div class="cloud cloud-1"></div><div class="cloud cloud-2"></div><div class="cloud cloud-3"></div>';
    }
}

// ==================== 时区时间显示系统 ====================
var timezones = [
    { id: 'beijing', name: '北京时间', offset: 8 },
    { id: 'local', name: '本地时间', offset: null },
    { id: 'newyork', name: '纽约时间', offset: -5 },
    { id: 'london', name: '伦敦时间', offset: 0 },
    { id: 'tokyo', name: '东京时间', offset: 9 },
    { id: 'sydney', name: '悉尼时间', offset: 11 },
    { id: 'paris', name: '巴黎时间', offset: 1 },
    { id: 'dubai', name: '迪拜时间', offset: 4 }
];

var currentTimezoneIndex = parseInt(localStorage.getItem('selectedTimezone') || '0');
var timeUpdateInterval = null;

// 切换时区
function toggleTimezone() {
    currentTimezoneIndex = (currentTimezoneIndex + 1) % timezones.length;
    localStorage.setItem('selectedTimezone', currentTimezoneIndex.toString());
    updateTimeDisplay();
    
    // 显示切换提示
    var tz = timezones[currentTimezoneIndex];
    showToast('已切换到 ' + tz.name);
}

// 更新时间显示
function updateTimeDisplay() {
    var timeMainEl = document.getElementById('timeMain');
    var timeZoneEl = document.getElementById('timeZone');
    
    if (!timeMainEl || !timeZoneEl) return;
    
    var tz = timezones[currentTimezoneIndex];
    var now = new Date();
    var targetTime;
    
    if (tz.offset === null) {
        // 本地时间
        targetTime = now;
    } else {
        // 根据UTC偏移计算时间
        var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        targetTime = new Date(utc + (tz.offset * 3600000));
    }
    
    var hours = targetTime.getHours().toString().padStart(2, '0');
    var minutes = targetTime.getMinutes().toString().padStart(2, '0');
    var seconds = targetTime.getSeconds().toString().padStart(2, '0');
    
    timeMainEl.textContent = hours + ':' + minutes + ':' + seconds;
    timeZoneEl.textContent = tz.name;
}

// 启动时间更新
function startTimeUpdate() {
    updateTimeDisplay();
    // 每秒更新一次
    if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval);
    }
    timeUpdateInterval = setInterval(updateTimeDisplay, 1000);
}

// 初始化时间显示
function initTimeDisplay() {
    currentTimezoneIndex = parseInt(localStorage.getItem('selectedTimezone') || '0');
    startTimeUpdate();
}

// 在页面加载时初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTimeDisplay);
} else {
    initTimeDisplay();
}

// 计算连续学习天数
function calculateStreak() {
    var streakData = JSON.parse(localStorage.getItem('learningStreak') || '{"count":0,"lastDate":""}');
    var today = new Date().toDateString();
    var yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (streakData.lastDate === today) {
        // 今天已经记录过
        return streakData.count;
    } else if (streakData.lastDate === yesterday) {
        // 昨天学习过，今天继续
        streakData.count++;
        streakData.lastDate = today;
        localStorage.setItem('learningStreak', JSON.stringify(streakData));
        return streakData.count;
    } else if (streakData.lastDate !== today) {
        // 断了，重新开始
        streakData.count = 1;
        streakData.lastDate = today;
        localStorage.setItem('learningStreak', JSON.stringify(streakData));
        return streakData.count;
    }
    
    return streakData.count || 1;
}

// 显示Toast提示
function showToast(message) {
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:100px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);color:white;padding:14px 28px;border-radius:30px;font-size:15px;font-weight:600;z-index:100000;animation:fadeIn 0.3s ease;box-shadow:0 10px 40px rgba(0,0,0,0.3);';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s ease';
        setTimeout(function() {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// ==================== 头像选择功能 ====================
var currentAvatarType = 'emoji'; // 'emoji' 或 'image'
var currentAvatarValue = '🌟';
var tempAvatarImage = null;
var avatarCropData = { scale: 1, x: 0, y: 0 };

function openAvatarPicker() {
    var modal = document.getElementById('avatarPickerModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        highlightCurrentAvatar();
    }
}

function closeAvatarPicker() {
    var modal = document.getElementById('avatarPickerModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function highlightCurrentAvatar() {
    // 获取当前保存的头像
    var savedType = localStorage.getItem('avatarType') || 'scene';
    var savedValue = localStorage.getItem('avatarValue') || '';
    
    // 清除所有选中状态
    var allOptions = document.querySelectorAll('.avatar-option');
    allOptions.forEach(function(opt) {
        opt.classList.remove('selected');
    });
    
    // 高亮当前选中项
    if (savedType === 'scene') {
        var sceneOption = document.querySelector('.avatar-option[data-type="scene"]');
        if (sceneOption) sceneOption.classList.add('selected');
    } else if (savedType === 'emoji') {
        allOptions.forEach(function(opt) {
            if (opt.textContent.trim() === savedValue) {
                opt.classList.add('selected');
            }
        });
    }
}

function selectAvatarOption(value) {
    // 清除所有选中状态
    var allOptions = document.querySelectorAll('.avatar-option');
    allOptions.forEach(function(opt) {
        opt.classList.remove('selected');
    });
    
    var sceneIcon = document.getElementById('sceneIcon');
    
    if (value === 'scene') {
        // 选择场景图标（动态随时间变化）
        localStorage.setItem('avatarType', 'scene');
        localStorage.setItem('avatarValue', '');
        
        // 高亮场景选项
        var sceneOption = document.querySelector('.avatar-option[data-type="scene"]');
        if (sceneOption) sceneOption.classList.add('selected');
        
        // 恢复动态场景图标
        if (sceneIcon) {
            sceneIcon.innerHTML = getSceneIcon();
        }
    } else {
        // 选择emoji
        localStorage.setItem('avatarType', 'emoji');
        localStorage.setItem('avatarValue', value);
        
        // 高亮选中的emoji
        allOptions.forEach(function(opt) {
            if (opt.textContent.trim() === value) {
                opt.classList.add('selected');
            }
        });
        
        // 更新图标显示emoji
        if (sceneIcon) {
            sceneIcon.innerHTML = '<span class="custom-avatar">' + value + '</span>';
        }
    }
    
    // 关闭弹窗
    closeAvatarPicker();
    
    // 显示提示
    showToast('头像已更新');
}

function selectAvatarEmoji(emoji) {
    currentAvatarType = 'emoji';
    currentAvatarValue = emoji;
    
    // 更新选中状态
    var emojiOptions = document.querySelectorAll('.avatar-emoji-option');
    emojiOptions.forEach(function(opt) {
        opt.classList.remove('selected');
        if (opt.textContent.trim() === emoji) {
            opt.classList.add('selected');
        }
    });
    
    // 隐藏裁剪区域
    var cropSection = document.getElementById('avatarCropSection');
    if (cropSection) cropSection.classList.add('hidden');
    
    updateAvatarPreviews();
}

function handleAvatarUpload(event) {
    var file = event.target.files[0];
    if (!file) return;
    
    // 检查文件类型
    if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        showToast('请选择图片文件');
        return;
    }
    
    // 检查文件大小（限制5MB）
    if (file.size > 5 * 1024 * 1024) {
        showToast('图片大小不能超过5MB');
        return;
    }
    
    var reader = new FileReader();
    reader.onload = function(e) {
        tempAvatarImage = e.target.result;
        showAvatarCrop(tempAvatarImage);
    };
    reader.readAsDataURL(file);
    
    // 清空input以便重复选择同一文件
    event.target.value = '';
}

function showAvatarCrop(imageSrc) {
    var cropSection = document.getElementById('avatarCropSection');
    var cropImage = document.getElementById('avatarCropImage');
    var zoomSlider = document.getElementById('avatarZoomSlider');
    
    if (cropSection && cropImage) {
        cropImage.src = imageSrc;
        cropSection.classList.remove('hidden');
        
        // 重置缩放
        avatarCropData = { scale: 1, x: 0, y: 0 };
        if (zoomSlider) zoomSlider.value = 1;
        
        // 添加拖拽功能
        initCropDrag();
    }
}

function initCropDrag() {
    var cropImage = document.getElementById('avatarCropImage');
    var cropWrapper = document.getElementById('avatarCropWrapper');
    if (!cropImage || !cropWrapper) return;
    
    var isDragging = false;
    var startX, startY;
    
    cropImage.onload = function() {
        // 初始居中
        avatarCropData.x = 0;
        avatarCropData.y = 0;
        updateCropTransform();
    };
    
    function startDrag(e) {
        isDragging = true;
        var pos = getEventPos(e);
        startX = pos.x - avatarCropData.x;
        startY = pos.y - avatarCropData.y;
        e.preventDefault();
    }
    
    function doDrag(e) {
        if (!isDragging) return;
        var pos = getEventPos(e);
        avatarCropData.x = pos.x - startX;
        avatarCropData.y = pos.y - startY;
        updateCropTransform();
    }
    
    function endDrag() {
        isDragging = false;
    }
    
    function getEventPos(e) {
        if (e.touches && e.touches.length > 0) {
            return { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
        return { x: e.clientX, y: e.clientY };
    }
    
    cropImage.addEventListener('mousedown', startDrag);
    cropImage.addEventListener('touchstart', startDrag, { passive: false });
    document.addEventListener('mousemove', doDrag);
    document.addEventListener('touchmove', doDrag, { passive: false });
    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
}

function updateCropTransform() {
    var cropImage = document.getElementById('avatarCropImage');
    if (cropImage) {
        cropImage.style.transform = 'translate(calc(-50% + ' + avatarCropData.x + 'px), calc(-50% + ' + avatarCropData.y + 'px)) scale(' + avatarCropData.scale + ')';
    }
}

function setAvatarZoom(value) {
    avatarCropData.scale = parseFloat(value);
    updateCropTransform();
}

function zoomAvatarCrop(delta) {
    var slider = document.getElementById('avatarZoomSlider');
    var newValue = Math.max(1, Math.min(3, avatarCropData.scale + delta));
    avatarCropData.scale = newValue;
    if (slider) slider.value = newValue;
    updateCropTransform();
}

function cancelAvatarCrop() {
    var cropSection = document.getElementById('avatarCropSection');
    if (cropSection) cropSection.classList.add('hidden');
    tempAvatarImage = null;
}

function confirmAvatarCrop() {
    // 创建canvas进行裁剪
    var cropImage = document.getElementById('avatarCropImage');
    var cropWrapper = document.getElementById('avatarCropWrapper');
    
    if (!cropImage || !cropWrapper) return;
    
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var size = 200; // 输出尺寸
    canvas.width = size;
    canvas.height = size;
    
    // 创建临时图片以获取实际尺寸
    var img = new Image();
    img.onload = function() {
        // 计算裁剪参数
        var wrapperSize = 200;
        var scale = avatarCropData.scale;
        var imgWidth = img.width;
        var imgHeight = img.height;
        
        // 计算图片在wrapper中的显示尺寸
        var displayRatio = Math.max(wrapperSize / imgWidth, wrapperSize / imgHeight);
        var displayWidth = imgWidth * displayRatio * scale;
        var displayHeight = imgHeight * displayRatio * scale;
        
        // 计算裁剪区域
        var offsetX = (displayWidth - wrapperSize) / 2 - avatarCropData.x;
        var offsetY = (displayHeight - wrapperSize) / 2 - avatarCropData.y;
        
        // 转换回原图坐标
        var sourceX = offsetX / (displayRatio * scale);
        var sourceY = offsetY / (displayRatio * scale);
        var sourceSize = wrapperSize / (displayRatio * scale);
        
        // 绘制圆形裁剪
        ctx.beginPath();
        ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(img, sourceX, sourceY, sourceSize, sourceSize, 0, 0, size, size);
        
        // 获取裁剪后的图片
        var croppedImage = canvas.toDataURL('image/png', 0.9);
        
        currentAvatarType = 'image';
        currentAvatarValue = croppedImage;
        updateAvatarPreviews();
        
        // 隐藏裁剪区域
        var cropSection = document.getElementById('avatarCropSection');
        if (cropSection) cropSection.classList.add('hidden');
    };
    img.src = tempAvatarImage;
}

function saveAvatar() {
    localStorage.setItem('avatarType', currentAvatarType);
    localStorage.setItem('avatarValue', currentAvatarValue);
    
    // 更新首页头像
    updateHomeAvatar();
    
    closeAvatarPicker();
    showToast('✨ 头像已保存');
}

function updateHomeAvatar() {
    var sceneIconRing = document.getElementById('sceneIconRing');
    var sceneIcon = document.getElementById('sceneIcon');
    
    if (!sceneIconRing || !sceneIcon) return;
    
    var avatarType = localStorage.getItem('avatarType') || 'emoji';
    var avatarValue = localStorage.getItem('avatarValue') || '🌟';
    
    // 添加头像样式类
    sceneIconRing.classList.add('custom-avatar');
    
    if (avatarType === 'emoji') {
        sceneIcon.innerHTML = '<span class="avatar-emoji-display">' + avatarValue + '</span>';
    } else if (avatarType === 'image') {
        sceneIcon.innerHTML = '<img src="' + avatarValue + '" alt="头像" class="avatar-image-display">';
    }
}

// 页面加载时初始化头像
function initAvatar() {
    var avatarType = localStorage.getItem('avatarType') || 'scene';
    var avatarValue = localStorage.getItem('avatarValue') || '';
    var sceneIcon = document.getElementById('sceneIcon');
    
    if (!sceneIcon) return;
    
    if (avatarType === 'emoji' && avatarValue) {
        // 显示用户选择的emoji
        sceneIcon.innerHTML = '<span class="custom-avatar">' + avatarValue + '</span>';
    } else {
        // 默认或选择场景时，显示动态图标
        sceneIcon.innerHTML = getSceneIcon();
    }
}

// 导出全局函数
window.openGoalSettings = openGoalSettings;
window.closeGoalSettings = closeGoalSettings;
window.saveGoalSettings = saveGoalSettings;
window.resetGoalSettings = resetGoalSettings;
window.updateDailyProgress = updateDailyProgress;
window.renderGoalsProgress = renderGoalsProgress;
window.showToast = showToast;
window.updateGreeting = updateGreeting;
window.updateTimeScene = updateTimeScene;
window.getSceneIcon = getSceneIcon;
window.getSkyDecorations = getSkyDecorations;
window.toggleTimezone = toggleTimezone;
window.updateTimeDisplay = updateTimeDisplay;
window.initTimeDisplay = initTimeDisplay;
window.openAvatarPicker = openAvatarPicker;
window.closeAvatarPicker = closeAvatarPicker;
window.selectAvatarOption = selectAvatarOption;
window.highlightCurrentAvatar = highlightCurrentAvatar;
window.initAvatar = initAvatar;
window.initSettingsBottomBar = initSettingsBottomBar;
window.cleanupSettingsBottomBar = cleanupSettingsBottomBar;