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
    
    // ==================== 版本与更新配置 ====================
    const APP_VERSION = '3.9.0';
    const APP_VERSION_CODE = 390;
    const APP_BUILD_TIME = '20251202';
    const VERSION_KEY = 'app_version';
    const UPDATE_CHECK_KEY = 'last_update_check';
    const UPDATE_SKIP_KEY = 'skip_version';
    const UPDATE_REMIND_KEY = 'update_remind_time';
    const UPDATE_RETRY_KEY = 'update_retry_count';
    const UPDATE_INTEGRITY_KEY = 'update_integrity_check';
    const CHECK_INTERVAL = 30 * 60 * 1000; // 30分钟检查一次（更频繁）
    const REMIND_LATER_INTERVAL = 30 * 60 * 1000; // 30分钟后提醒
    const MAX_RETRY_COUNT = 3; // 最大重试次数
    const FETCH_TIMEOUT = 15000; // 请求超时时间
    
    // 远程版本检查地址（多个备用源 - 优先级从高到低）
    const VERSION_URLS = [
        // 主源：GitHub Pages（CDN加速）
        'https://kawea1.github.io/English-boost-app/version.json',
        // 备用源1：GitHub Raw（直接访问）
        'https://raw.githubusercontent.com/Kawea1/English-boost-app/main/version.json',
        // 备用源2：jsDelivr CDN（中国友好）
        'https://cdn.jsdelivr.net/gh/Kawea1/English-boost-app@main/version.json',
        // 备用源3：Statically CDN
        'https://cdn.statically.io/gh/Kawea1/English-boost-app/main/version.json',
        // 本地源：离线备份
        './version.json'
    ];
    
    // 资源更新源（用于验证更新完整性）
    const RESOURCE_URLS = {
        primary: 'https://kawea1.github.io/English-boost-app/',
        cdn: 'https://cdn.jsdelivr.net/gh/Kawea1/English-boost-app@main/',
        raw: 'https://raw.githubusercontent.com/Kawea1/English-boost-app/main/'
    };
    
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
    
    // ==================== V3: 增强版本检测 ====================
    // 带超时的fetch
    async function fetchWithTimeout(url, options = {}, timeout = FETCH_TIMEOUT) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
        } catch (error) {
            clearTimeout(timeoutId);
            throw error;
        }
    }
    
    // 验证版本数据有效性
    function validateVersionData(data) {
        if (!data || typeof data !== 'object') return false;
        if (!data.version || typeof data.version !== 'string') return false;
        if (!/^\d+\.\d+\.\d+$/.test(data.version)) return false;
        if (data.versionCode && typeof data.versionCode !== 'number') return false;
        return true;
    }
    
    // 静默检查更新（用户无感知）- V2-V5增强版
    async function silentCheckUpdate(forceCheck = false) {
        const lastCheck = localStorage.getItem(UPDATE_CHECK_KEY);
        const remindTime = localStorage.getItem(UPDATE_REMIND_KEY);
        const retryCount = parseInt(localStorage.getItem(UPDATE_RETRY_KEY) || '0');
        const now = Date.now();
        
        // 检查稍后提醒时间
        if (remindTime && now < parseInt(remindTime) && !forceCheck) {
            console.log('[Update] User requested remind later, waiting...');
            return;
        }
        
        // 检查是否需要检查（间隔控制）- 失败重试时缩短间隔
        const effectiveInterval = retryCount > 0 ? CHECK_INTERVAL / 4 : CHECK_INTERVAL;
        if (!forceCheck && lastCheck && (now - parseInt(lastCheck)) < effectiveInterval) {
            console.log('[Update] Skip check, last check was recent');
            return;
        }
        
        console.log(`[Update] Checking for updates... (retry: ${retryCount})`);
        localStorage.setItem(UPDATE_CHECK_KEY, now.toString());
        
        // V4: 多源并发检测（取最快响应）
        let versionData = null;
        let successSource = null;
        
        // 尝试并发请求所有源
        const fetchPromises = VERSION_URLS.map(async (url, index) => {
            try {
                const response = await fetchWithTimeout(
                    url + '?t=' + now + '&r=' + Math.random(),
                    {
                        cache: 'no-store',
                        headers: { 
                            'Cache-Control': 'no-cache, no-store, must-revalidate',
                            'Pragma': 'no-cache'
                        }
                    },
                    FETCH_TIMEOUT
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                
                const data = await response.json();
                
                // 验证数据有效性
                if (!validateVersionData(data)) {
                    throw new Error('Invalid version data');
                }
                
                return { data, url, index };
            } catch (e) {
                console.log(`[Update] Source ${index + 1} failed:`, url, e.message);
                return null;
            }
        });
        
        // 使用 Promise.any 获取第一个成功的结果
        try {
            const results = await Promise.allSettled(fetchPromises);
            const successResults = results
                .filter(r => r.status === 'fulfilled' && r.value)
                .map(r => r.value)
                .sort((a, b) => a.index - b.index); // 按优先级排序
            
            if (successResults.length > 0) {
                versionData = successResults[0].data;
                successSource = successResults[0].url;
                console.log(`[Update] Got version from: ${successSource}`);
                
                // V5: 交叉验证（如果有多个成功源，验证版本一致性）
                if (successResults.length > 1) {
                    const versions = successResults.map(r => r.data.version);
                    const allSame = versions.every(v => v === versions[0]);
                    if (!allSame) {
                        console.warn('[Update] Version mismatch across sources:', versions);
                        // 使用最高版本（安全起见）
                        versionData = successResults.reduce((max, curr) => 
                            compareVersion(curr.data.version, max.data.version) > 0 ? curr : max
                        ).data;
                    }
                }
                
                // 重置重试计数
                localStorage.setItem(UPDATE_RETRY_KEY, '0');
            }
        } catch (e) {
            console.error('[Update] All sources failed');
        }
        
        // 处理结果
        if (versionData) {
            processUpdateInfo(versionData, successSource);
        } else {
            // V4: 失败重试机制
            const newRetryCount = retryCount + 1;
            if (newRetryCount <= MAX_RETRY_COUNT) {
                console.log(`[Update] Will retry later (${newRetryCount}/${MAX_RETRY_COUNT})`);
                localStorage.setItem(UPDATE_RETRY_KEY, newRetryCount.toString());
            } else {
                console.log('[Update] Max retries reached, giving up for now');
                localStorage.setItem(UPDATE_RETRY_KEY, '0');
            }
        }
    }
    
    // 处理更新信息 - V3增强
    function processUpdateInfo(data, source = '') {
        const remoteVersion = data.version;
        const skipVersion = localStorage.getItem(UPDATE_SKIP_KEY);
        const minVersion = data.minVersion;
        
        // V3: 最低版本检查（强制更新旧版本）
        if (minVersion && compareVersion(APP_VERSION, minVersion) < 0) {
            console.log('[Update] Current version below minimum, forcing update');
            data.forceUpdate = true;
        }
        
        // 检查是否有新版本
        if (compareVersion(remoteVersion, APP_VERSION) > 0) {
            // 检查是否已跳过此版本（强制更新时忽略）
            if (skipVersion === remoteVersion && !data.forceUpdate) {
                console.log('[Update] User skipped this version:', remoteVersion);
                return;
            }
            
            console.log('[Update] New version available:', remoteVersion, 'from', source);
            
            // V5: 记录更新源，用于下载时优先使用
            data._updateSource = source;
            
            showUpdateDialog(data);
        } else {
            console.log('[Update] Current version is up to date:', APP_VERSION);
            
            // V5: 版本一致时验证本地资源完整性
            verifyLocalResources();
        }
    }
    
    // V5: 验证本地资源完整性
    async function verifyLocalResources() {
        const lastIntegrityCheck = localStorage.getItem(UPDATE_INTEGRITY_KEY);
        const now = Date.now();
        
        // 每天检查一次
        if (lastIntegrityCheck && (now - parseInt(lastIntegrityCheck)) < 24 * 60 * 60 * 1000) {
            return;
        }
        
        console.log('[Update] Verifying local resources integrity...');
        localStorage.setItem(UPDATE_INTEGRITY_KEY, now.toString());
        
        try {
            // 检查 Service Worker 是否正常
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration && registration.active) {
                    // 请求 SW 检查更新
                    registration.active.postMessage({ type: 'CHECK_UPDATE' });
                }
            }
        } catch (e) {
            console.log('[Update] Integrity check error:', e);
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
    
    // ==================== V5: 增强版更新执行 ====================
    // 执行更新 - 添加确认、进度和回滚保护
    async function doUpdate(url) {
        const platform = getPlatform();
        const btn = document.getElementById('updatePrimaryBtn');
        
        // 禁用按钮，显示加载状态
        if (btn) {
            btn.disabled = true;
            btn.innerHTML = `
                <svg class="update-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
                </svg>
                <span>正在准备更新...</span>
            `;
        }
        
        if (platform === 'web') {
            // V5: Web版增强更新流程
            await performWebUpdate(btn);
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
    
    // V5: Web版增强更新流程
    async function performWebUpdate(btn) {
        const progressContainer = document.getElementById('updateProgressContainer');
        const progressFill = document.getElementById('updateProgressFill');
        const progressText = document.getElementById('updateProgressText');
        
        // 显示进度容器
        if (progressContainer) {
            progressContainer.style.display = 'block';
        }
        
        const updateProgress = (percent, text) => {
            if (progressFill) progressFill.style.width = percent + '%';
            if (progressText) progressText.textContent = text;
            if (btn) btn.querySelector('span').textContent = text;
        };
        
        try {
            // 阶段1: 备份当前版本信息（用于回滚检测）
            updateProgress(10, '备份当前状态...');
            const backupData = {
                version: APP_VERSION,
                timestamp: Date.now(),
                url: window.location.href
            };
            localStorage.setItem('update_backup', JSON.stringify(backupData));
            await sleep(300);
            
            // 阶段2: 注销旧 Service Worker
            updateProgress(25, '清理旧版本...');
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const reg of registrations) {
                    // 发送强制更新消息
                    if (reg.active) {
                        reg.active.postMessage({ type: 'FORCE_UPDATE' });
                    }
                    await reg.unregister();
                    console.log('[Update] Unregistered SW:', reg.scope);
                }
            }
            await sleep(500);
            
            // 阶段3: 清理所有缓存
            updateProgress(45, '清理缓存...');
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                for (const name of cacheNames) {
                    await caches.delete(name);
                    console.log('[Update] Deleted cache:', name);
                }
            }
            await sleep(300);
            
            // 阶段4: 预获取新版本关键资源
            updateProgress(60, '获取新版本...');
            const criticalResources = ['app.js', 'styles.css', 'index.html'];
            const fetchResults = await Promise.allSettled(
                criticalResources.map(res => 
                    fetchWithTimeout(res + '?v=' + Date.now(), { cache: 'no-store' }, 10000)
                )
            );
            
            const allFetched = fetchResults.every(r => r.status === 'fulfilled' && r.value?.ok);
            if (!allFetched) {
                console.warn('[Update] Some resources failed to prefetch');
            }
            await sleep(300);
            
            // 阶段5: 重新注册 Service Worker
            updateProgress(80, '安装新版本...');
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.register('/sw.js', {
                        updateViaCache: 'none'
                    });
                    console.log('[Update] New SW registered:', registration.scope);
                    
                    // 等待新 SW 激活
                    if (registration.installing || registration.waiting) {
                        await new Promise(resolve => {
                            const sw = registration.installing || registration.waiting;
                            sw.addEventListener('statechange', () => {
                                if (sw.state === 'activated') resolve();
                            });
                            // 超时保护
                            setTimeout(resolve, 3000);
                        });
                    }
                } catch (e) {
                    console.log('[Update] SW registration failed:', e);
                }
            }
            await sleep(500);
            
            // 阶段6: 完成并刷新
            updateProgress(100, '更新完成，正在刷新...');
            
            // 记录更新成功
            localStorage.setItem('update_success', JSON.stringify({
                fromVersion: APP_VERSION,
                timestamp: Date.now()
            }));
            localStorage.removeItem('update_backup');
            
            // 延迟刷新，让用户看到完成状态
            await sleep(800);
            
            // 强制刷新（清除缓存）
            window.location.href = window.location.pathname + '?updated=' + Date.now();
            
        } catch (error) {
            console.error('[Update] Update failed:', error);
            updateProgress(0, '更新失败');
            
            // 恢复按钮
            if (btn) {
                btn.disabled = false;
                btn.innerHTML = `
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    <span>重试更新</span>
                `;
            }
            
            showToast('更新失败，请检查网络后重试', 'error');
        }
    }
    
    // 辅助函数：延迟
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // V5: 检查更新后的版本验证
    function checkUpdateSuccess() {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('updated')) {
            const updateSuccess = localStorage.getItem('update_success');
            if (updateSuccess) {
                const data = JSON.parse(updateSuccess);
                if (compareVersion(APP_VERSION, data.fromVersion) > 0) {
                    console.log('[Update] Successfully updated from', data.fromVersion, 'to', APP_VERSION);
                    showToast(`已更新到 v${APP_VERSION}`, 'success');
                } else if (APP_VERSION === data.fromVersion) {
                    console.warn('[Update] Version unchanged, update may have failed');
                    showToast('更新可能未生效，请手动刷新', 'warning');
                }
                localStorage.removeItem('update_success');
            }
            
            // 清理 URL 参数
            const cleanUrl = window.location.pathname + window.location.hash;
            window.history.replaceState({}, '', cleanUrl);
        }
        
        // 检查是否有失败的更新需要回滚
        const backup = localStorage.getItem('update_backup');
        if (backup) {
            const data = JSON.parse(backup);
            // 如果备份存在超过5分钟，说明更新失败了
            if (Date.now() - data.timestamp > 5 * 60 * 1000) {
                console.warn('[Update] Found stale backup, previous update may have failed');
                localStorage.removeItem('update_backup');
            }
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
    
    // V5: 启动时检查更新结果
    checkUpdateSuccess();
    
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
    
    // V4: 监听 Service Worker 更新消息
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', (event) => {
            const { type, version } = event.data || {};
            
            if (type === 'SW_UPDATED') {
                console.log('[Update] SW updated to version:', version);
                // 如果 SW 版本比 App 版本新，提示用户刷新
                if (version && compareVersion(version, APP_VERSION) > 0) {
                    showToast('检测到新版本，点击刷新', 'info', 5000, () => {
                        window.location.reload(true);
                    });
                }
            } else if (type === 'CACHE_CLEARED') {
                console.log('[Update] Cache cleared by SW');
            }
        });
        
        // V5: 定期检查 SW 更新
        setInterval(async () => {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                registration.update().catch(console.log);
            }
        }, 30 * 60 * 1000); // 每30分钟检查一次
    }
    
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
            case 'writing':
                console.log('✍️ V1: 打开写作模块');
                // V2: 写作模块使用module-page全屏显示
                var writingModule = document.getElementById('writing-module');
                if (writingModule) {
                    // V3: 隐藏底部导航栏
                    var bottomNav = document.getElementById('bottomNav');
                    if (bottomNav) bottomNav.classList.add('hidden');
                    
                    // V4: 显示写作模块
                    writingModule.classList.remove('hidden');
                    
                    // V5: 滚动到顶部
                    writingModule.scrollTop = 0;
                    
                    // 初始化写作模块
                    if (typeof WritingModule !== 'undefined') {
                        if (WritingModule.showHistory) WritingModule.showHistory();
                    }
                    console.log('✅ V5: 写作模块已打开');
                } else {
                    console.error('❌ 写作模块元素不存在');
                }
                break;
        }
        console.log('Module initialization complete');
    } else {
        // 检查是否是module-page类型的模块
        if (moduleName === 'writing') {
            console.log('✍️ openModule: 打开写作模块 (备用路径)');
            var writingModule = document.getElementById('writing-module');
            if (writingModule) {
                // 隐藏底部导航
                var bottomNav = document.getElementById('bottomNav');
                if (bottomNav) bottomNav.classList.add('hidden');
                
                // 显示模块
                writingModule.classList.remove('hidden');
                writingModule.scrollTop = 0;
                
                // 初始化
                if (typeof WritingModule !== 'undefined' && WritingModule.showHistory) {
                    WritingModule.showHistory();
                }
                console.log('✅ 写作模块已通过备用路径打开');
            } else {
                console.error('❌ 写作模块元素不存在');
            }
        } else {
            console.error('Modal not found for:', modalId);
        }
    }
}

function closeModule() {
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    
    // 关闭module-page类型的模块
    document.querySelectorAll('.module-page').forEach(m => m.classList.add('hidden'));
    
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
    console.log('📅 时间:', new Date().toISOString());
    
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
    
    // ==================== V11-V15: 用户友好的登录检查 ====================
    // 以用户为中心：试用期内直接进入应用，不打扰用户
    console.log('3. V11-V15: 用户友好的登录检查...');
    
    let finalLoginStatus = false;
    let skipLoginPage = false;
    
    // V11: 首先检查试用状态（最重要）
    try {
        const activationState = JSON.parse(localStorage.getItem('eb_activation_state') || 'null');
        if (activationState && activationState.isActivated) {
            // V12: 检查试用期
            if (activationState.trialStartDate) {
                const trialDays = activationState.trialDays || 30;
                const trialEnd = activationState.trialStartDate + trialDays * 24 * 60 * 60 * 1000;
                const remainingDays = Math.ceil((trialEnd - Date.now()) / (24 * 60 * 60 * 1000));
                
                if (Date.now() < trialEnd) {
                    // 试用期内，直接进入！
                    console.log('✅ V12: 试用有效，剩余', remainingDays, '天，直接进入应用');
                    localStorage.setItem('isLoggedIn', 'true');
                    finalLoginStatus = true;
                    skipLoginPage = true;
                } else {
                    console.log('⚠️ V12: 试用已过期');
                }
            } else if (activationState.activationCode) {
                // V13: 正式激活用户
                console.log('✅ V13: 正式激活用户，直接进入');
                localStorage.setItem('isLoggedIn', 'true');
                finalLoginStatus = true;
                skipLoginPage = true;
            }
        }
    } catch (e) {
        console.warn('V11-V13: 检查激活状态失败', e);
    }
    
    // V14: 备用检查（如果上面没通过）
    if (!finalLoginStatus) {
        // 检查 isLoggedIn
        if (localStorage.getItem('isLoggedIn') === 'true') {
            finalLoginStatus = true;
        }
        // 检查 checkAuth
        if (!finalLoginStatus && typeof checkAuth === 'function') {
            finalLoginStatus = checkAuth();
        }
        // 检查设备激活
        if (!finalLoginStatus && typeof isDeviceActivated === 'function') {
            finalLoginStatus = isDeviceActivated();
        }
    }
    
    // V15: 确保登录状态一致
    if (finalLoginStatus) {
        localStorage.setItem('isLoggedIn', 'true');
    }
    
    console.log('📊 最终登录状态:', finalLoginStatus, skipLoginPage ? '(跳过登录页)' : '');
    
    if (finalLoginStatus) {
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
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Service Worker注册成功');
            
            // ========== 后台自动检查更新 ==========
            // 延迟2秒后静默检查更新，不打扰用户
            setTimeout(() => {
                silentUpdateCheck(registration);
            }, 2000);
            
        }).catch(function(err) {
            console.log('Service Worker注册失败:', err);
        });
    }
    
    console.log('App initialized successfully');
});

// ========== 静默更新检查系统 ==========
// 进入应用后自动后台检查更新，发现新版本时提示用户
function silentUpdateCheck(registration) {
    console.log('🔄 后台检查更新...');
    
    registration.update().then(() => {
        // 监听新的 Service Worker 安装
        registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            console.log('📦 发现新版本，正在下载...');
            
            newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    // 新版本已下载完成，提示用户更新
                    showUpdateNotification();
                }
            });
        });
        
        // 如果已经有等待中的 worker，直接提示
        if (registration.waiting) {
            showUpdateNotification();
        }
    }).catch(err => {
        console.log('更新检查失败:', err);
    });
}

// 显示更新提示通知
function showUpdateNotification() {
    // 避免重复显示
    if (document.getElementById('updateNotification')) return;
    
    const notification = document.createElement('div');
    notification.id = 'updateNotification';
    notification.className = 'update-notification';
    notification.innerHTML = `
        <div class="update-notification-content">
            <div class="update-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </div>
            <div class="update-text">
                <strong>发现新版本</strong>
                <span>点击立即更新，获得最新功能</span>
            </div>
            <button class="update-btn" onclick="applyUpdate()">立即更新</button>
            <button class="update-close" onclick="dismissUpdate()">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 添加入场动画
    setTimeout(() => notification.classList.add('show'), 100);
}

// 应用更新
function applyUpdate() {
    const notification = document.getElementById('updateNotification');
    if (notification) {
        notification.innerHTML = `
            <div class="update-notification-content updating">
                <div class="update-spinner"></div>
                <span>正在更新...</span>
            </div>
        `;
    }
    
    // 通知 Service Worker 跳过等待并激活
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then(registration => {
            if (registration.waiting) {
                registration.waiting.postMessage({ type: 'SKIP_WAITING' });
            }
        });
    }
    
    // 监听控制器变化，然后刷新页面
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        window.location.reload();
    });
    
    // 备用：2秒后强制刷新
    setTimeout(() => {
        window.location.reload(true);
    }, 2000);
}

// 关闭更新提示
function dismissUpdate() {
    const notification = document.getElementById('updateNotification');
    if (notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }
}

// 导出更新相关函数
window.silentUpdateCheck = silentUpdateCheck;
window.showUpdateNotification = showUpdateNotification;
window.applyUpdate = applyUpdate;
window.dismissUpdate = dismissUpdate;

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
    
    // 版本9-11改进：更新横向百分比显示
    if (progressNumEl) {
        progressNumEl.textContent = avgPercent;
        
        // v11: 根据位数调整字体大小类名
        progressNumEl.classList.remove('single-digit', 'two-digits', 'three-digits');
        if (avgPercent >= 100) {
            progressNumEl.classList.add('three-digits');
        } else if (avgPercent >= 10) {
            progressNumEl.classList.add('two-digits');
        } else {
            // v11新增: 单位数字添加single-digit类
            progressNumEl.classList.add('single-digit');
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

// ==================== 智能问候系统 V10 ====================
// V1: 修正时间段划分逻辑（凌晨不再说早上好）
// V2: 丰富问候语多样性（每个时段5-8种）
// V3: 太阳/月亮根据实时位置移动
// V4: 添加天气氛围效果
// V5: 个性化问候语（基于学习状态）
// V6: 特殊日期问候（节日、周末等）
// V7: 学习状态感知问候
// V8: 动态背景渐变
// V9: 星星/云朵装饰增强
// V10: 智能建议系统

// 问候语库 - 每个时段多种表达
var greetingLibrary = {
    // 凌晨 00:00-04:59 - 深夜/熬夜
    lateNight: [
        { text: '夜深了，注意休息', emoji: '🌙', subtitle: '熬夜伤身哦' },
        { text: '深夜学习，记得早睡', emoji: '💤', subtitle: '明天继续加油' },
        { text: '夜猫子也要休息', emoji: '🦉', subtitle: '身体是革命的本钱' },
        { text: '星星陪你学习', emoji: '✨', subtitle: '但也要爱护眼睛' },
        { text: '凌晨的努力最珍贵', emoji: '🌟', subtitle: '但别太拼了' }
    ],
    // 清晨 05:00-06:59 - 早起
    earlyMorning: [
        { text: '早起的鸟儿有虫吃', emoji: '🐦', subtitle: '新的一天开始了' },
        { text: '早安，追梦人', emoji: '🌅', subtitle: '日出而作' },
        { text: '清晨好，世界安静', emoji: '🌄', subtitle: '最佳学习时间' },
        { text: '晨光熹微，精神抖擞', emoji: '☀️', subtitle: '开始美好的一天' },
        { text: '早起真棒！', emoji: '💪', subtitle: '坚持就是胜利' }
    ],
    // 上午 07:00-11:59 - 早上好
    morning: [
        { text: '早上好', emoji: '☀️', subtitle: '今天也要元气满满' },
        { text: '美好的早晨', emoji: '🌞', subtitle: '一起来学习吧' },
        { text: 'Good Morning', emoji: '🌤️', subtitle: '阳光正好' },
        { text: '上午好，学霸', emoji: '📚', subtitle: '大脑最活跃的时间' },
        { text: '早上好，加油', emoji: '💪', subtitle: '新的一天新的进步' },
        { text: '阳光明媚的上午', emoji: '🌻', subtitle: '适合背单词' }
    ],
    // 中午 12:00-13:59 - 午间
    noon: [
        { text: '中午好', emoji: '🌤️', subtitle: '记得吃午饭' },
        { text: '午安', emoji: '🍱', subtitle: '劳逸结合很重要' },
        { text: '正午时分', emoji: '☀️', subtitle: '太阳当空照' },
        { text: '午间休息一下', emoji: '😌', subtitle: '下午更有精神' },
        { text: '午饭时间', emoji: '🍜', subtitle: '吃饱才有力气学' }
    ],
    // 下午 14:00-17:59 - 下午好
    afternoon: [
        { text: '下午好', emoji: '⛅', subtitle: '继续加油' },
        { text: 'Good Afternoon', emoji: '🌤️', subtitle: '学习进行时' },
        { text: '下午茶时间', emoji: '☕', subtitle: '来杯提神饮料' },
        { text: '午后阳光', emoji: '🌇', subtitle: '静心学习' },
        { text: '下午好，同学', emoji: '📖', subtitle: '保持专注' },
        { text: '阳光下午', emoji: '😊', subtitle: '心情愉悦' }
    ],
    // 傍晚 18:00-19:59 - 黄昏
    sunset: [
        { text: '傍晚好', emoji: '🌇', subtitle: '夕阳西下' },
        { text: '黄昏时分', emoji: '🌆', subtitle: '一天即将结束' },
        { text: '晚霞真美', emoji: '🌅', subtitle: '今天学了多少？' },
        { text: '日落时刻', emoji: '🌄', subtitle: '准备休息了吗' },
        { text: 'Good Evening', emoji: '✨', subtitle: '傍晚的宁静' }
    ],
    // 晚上 20:00-22:59 - 晚安
    evening: [
        { text: '晚上好', emoji: '🌙', subtitle: '夜晚学习时间' },
        { text: '夜幕降临', emoji: '🌃', subtitle: '安静的学习氛围' },
        { text: 'Good Night', emoji: '⭐', subtitle: '最后冲刺一下' },
        { text: '晚间学习', emoji: '📚', subtitle: '加油！' },
        { text: '夜色温柔', emoji: '🌛', subtitle: '保护好眼睛' }
    ],
    // 深夜 23:00-23:59 - 该睡了
    night: [
        { text: '夜深了', emoji: '🌙', subtitle: '该休息了' },
        { text: '快睡觉吧', emoji: '😴', subtitle: '明天继续' },
        { text: '晚安，好梦', emoji: '💤', subtitle: '睡眠很重要' },
        { text: '月亮出来了', emoji: '🌕', subtitle: '该说晚安了' },
        { text: '深夜了，早点睡', emoji: '🛏️', subtitle: '身体是本钱' }
    ]
};

// 特殊日期问候
var specialDateGreetings = {
    '01-01': { text: '新年快乐！', emoji: '🎉', subtitle: '新的一年，新的开始' },
    '02-14': { text: '情人节快乐', emoji: '💕', subtitle: '爱与学习同在' },
    '03-08': { text: '女神节快乐', emoji: '👑', subtitle: '最美的你' },
    '04-01': { text: '愚人节快乐', emoji: '🤡', subtitle: '认真学习不是玩笑' },
    '05-01': { text: '劳动节快乐', emoji: '💪', subtitle: '学习也是一种劳动' },
    '05-04': { text: '青年节快乐', emoji: '🌟', subtitle: '年轻就是资本' },
    '06-01': { text: '儿童节快乐', emoji: '🎈', subtitle: '保持童心' },
    '09-10': { text: '教师节快乐', emoji: '🎓', subtitle: '感谢老师' },
    '10-01': { text: '国庆节快乐', emoji: '🇨🇳', subtitle: '祖国万岁' },
    '10-31': { text: 'Happy Halloween', emoji: '🎃', subtitle: '南瓜节快乐' },
    '12-24': { text: '平安夜快乐', emoji: '🎄', subtitle: '平安喜乐' },
    '12-25': { text: '圣诞快乐', emoji: '🎅', subtitle: 'Merry Christmas' },
    '12-31': { text: '跨年快乐', emoji: '🎊', subtitle: '再见旧年' }
};

// 周末特别问候
var weekendGreetings = [
    { text: '周末愉快', emoji: '🎉', subtitle: '放松但不放纵' },
    { text: '周末学习日', emoji: '📚', subtitle: '弯道超车的时候' },
    { text: 'Happy Weekend', emoji: '🌈', subtitle: '劳逸结合' },
    { text: '周末也要加油', emoji: '💪', subtitle: '坚持就是胜利' }
];

// 学习状态感知问候
function getStudyAwareGreeting(hour, streak, todayWords) {
    if (streak >= 30) {
        return { text: '学习达人', emoji: '🏆', subtitle: '已连续' + streak + '天' };
    }
    if (streak >= 7) {
        return { text: '坚持就是胜利', emoji: '🔥', subtitle: '已连续' + streak + '天' };
    }
    if (todayWords >= 50) {
        return { text: '今日学霸', emoji: '🌟', subtitle: '已学习' + todayWords + '词' };
    }
    if (todayWords >= 20) {
        return { text: '进步中', emoji: '📈', subtitle: '已学习' + todayWords + '词' };
    }
    return null;
}

// 获取精确时间段
function getTimePeriod(hour, minute) {
    // 更精确的时间划分
    if (hour >= 0 && hour < 5) return 'lateNight';      // 00:00-04:59 深夜
    if (hour >= 5 && hour < 7) return 'earlyMorning';   // 05:00-06:59 清晨
    if (hour >= 7 && hour < 12) return 'morning';       // 07:00-11:59 上午
    if (hour >= 12 && hour < 14) return 'noon';         // 12:00-13:59 中午
    if (hour >= 14 && hour < 18) return 'afternoon';    // 14:00-17:59 下午
    if (hour >= 18 && hour < 20) return 'sunset';       // 18:00-19:59 傍晚
    if (hour >= 20 && hour < 23) return 'evening';      // 20:00-22:59 晚上
    return 'night';                                      // 23:00-23:59 深夜
}

// 计算太阳/月亮位置（基于时间）
function calculateCelestialPosition(hour, minute) {
    var totalMinutes = hour * 60 + minute;
    var position = {};
    
    // 太阳轨迹：6:00 升起（右下角）-> 12:00 最高点 -> 18:00 落下（左下角）
    // 月亮轨迹：18:00 升起 -> 00:00 最高点 -> 06:00 落下
    
    if (hour >= 6 && hour < 18) {
        // 白天 - 太阳
        var dayMinutes = totalMinutes - 360; // 从6:00开始计算
        var dayProgress = dayMinutes / 720;  // 12小时 = 720分钟
        
        // 太阳从右到左移动
        position.right = 85 - (dayProgress * 70); // 从85%到15%
        
        // 太阳高度：抛物线轨迹
        // 中午12点最高，早晚最低
        var heightProgress = Math.abs(dayProgress - 0.5) * 2; // 0到1再到0
        position.top = 70 - Math.sin((1 - heightProgress) * Math.PI / 2) * 55; // 15%到70%
        
        position.isSun = true;
    } else {
        // 夜晚 - 月亮
        var nightMinutes;
        if (hour >= 18) {
            nightMinutes = totalMinutes - 1080; // 从18:00开始
        } else {
            nightMinutes = totalMinutes + 360;  // 0:00之后
        }
        var nightProgress = nightMinutes / 720; // 12小时周期
        
        // 月亮从右到左
        position.right = 85 - (nightProgress * 70);
        
        // 月亮高度
        var heightProgress = Math.abs(nightProgress - 0.5) * 2;
        position.top = 65 - Math.sin((1 - heightProgress) * Math.PI / 2) * 45;
        
        position.isSun = false;
    }
    
    return position;
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
    var minute = beijingTime.getMinutes();
    var month = beijingTime.getMonth() + 1;
    var date = beijingTime.getDate();
    var dayOfWeek = beijingTime.getDay();
    
    // V1: 获取精确时间段
    var timePeriod = getTimePeriod(hour, minute);
    
    // V6: 检查特殊日期
    var dateKey = (month < 10 ? '0' : '') + month + '-' + (date < 10 ? '0' : '') + date;
    var greeting = null;
    
    if (specialDateGreetings[dateKey]) {
        greeting = specialDateGreetings[dateKey];
    }
    // V6: 周末特别问候
    else if ((dayOfWeek === 0 || dayOfWeek === 6) && Math.random() < 0.3) {
        greeting = weekendGreetings[Math.floor(Math.random() * weekendGreetings.length)];
    }
    
    // V7: 学习状态感知
    if (!greeting) {
        var streak = calculateStreak();
        var todayWords = getTodayLearnedWords();
        var studyGreeting = getStudyAwareGreeting(hour, streak, todayWords);
        if (studyGreeting && Math.random() < 0.2) {
            greeting = studyGreeting;
        }
    }
    
    // V2: 从问候语库随机选择
    if (!greeting) {
        var greetings = greetingLibrary[timePeriod] || greetingLibrary.morning;
        greeting = greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // 更新UI
    if (greetingEl) {
        greetingEl.innerHTML = greeting.text + ' ' + greeting.emoji;
        greetingEl.setAttribute('data-subtitle', greeting.subtitle || '');
    }
    
    // V3: 更新天体位置
    updateCelestialBody(hour, minute);
    
    // 更新场景（映射到CSS时段）
    var cssTimePeriod = mapToCssTimePeriod(timePeriod);
    updateTimeScene(cssTimePeriod);
    
    // 更新日期
    if (dateEl) {
        var weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        dateEl.textContent = month + '月' + date + '日 ' + weekdays[dayOfWeek];
    }
    
    // 计算连续学习天数
    if (streakEl) {
        var streak = calculateStreak();
        streakEl.textContent = streak;
    }
}

// 映射问候时段到CSS时段
function mapToCssTimePeriod(timePeriod) {
    var mapping = {
        'lateNight': 'night',
        'earlyMorning': 'dawn',
        'morning': 'morning',
        'noon': 'noon',
        'afternoon': 'afternoon',
        'sunset': 'sunset',
        'evening': 'evening',
        'night': 'night'
    };
    return mapping[timePeriod] || 'morning';
}

// V3: 更新天体（太阳/月亮）位置
function updateCelestialBody(hour, minute) {
    var celestialEl = document.getElementById('celestialBody');
    if (!celestialEl) return;
    
    var pos = calculateCelestialPosition(hour, minute);
    
    // 应用位置
    celestialEl.style.right = pos.right + '%';
    celestialEl.style.top = pos.top + '%';
    celestialEl.style.transition = 'all 0.5s ease-out';
    
    // 根据高度调整亮度和大小
    var altitudeFactor = 1 - (pos.top / 70); // 越高越亮
    var scale = 0.8 + altitudeFactor * 0.4;
    var brightness = 0.7 + altitudeFactor * 0.3;
    
    celestialEl.style.transform = 'scale(' + scale + ')';
    celestialEl.style.filter = 'brightness(' + brightness + ')';
}

// 获取今日学习单词数
function getTodayLearnedWords() {
    try {
        var today = new Date().toDateString();
        var learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '{}');
        var count = 0;
        
        for (var word in learnedWords) {
            if (learnedWords[word] && learnedWords[word].lastReview) {
                var lastReview = new Date(learnedWords[word].lastReview).toDateString();
                if (lastReview === today) count++;
            }
        }
        return count;
    } catch (e) {
        return 0;
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

// 获取天空装饰（V9增强版）
function getSkyDecorations(timePeriod) {
    if (['evening', 'night'].includes(timePeriod)) {
        // 星星 + 流星
        var stars = '';
        for (var i = 1; i <= 15; i++) {
            stars += '<div class="star star-' + i + '"></div>';
        }
        // 添加流星效果（夜间）
        if (timePeriod === 'night') {
            stars += '<div class="shooting-star shooting-star-1"></div>';
            stars += '<div class="shooting-star shooting-star-2"></div>';
        }
        return stars;
    } else if (timePeriod === 'sunset') {
        // 傍晚：云朵 + 少量星星
        return '<div class="cloud cloud-1"></div><div class="cloud cloud-2"></div><div class="star star-1" style="opacity:0.3"></div><div class="star star-2" style="opacity:0.2"></div>';
    } else {
        // 白天：云朵
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
// ==================== 首页导航栏互动系统 V10 ====================
// V1: 头像点击动画和表情反馈
// V2: 连续天数徽章庆祝动画
// V3: 时间显示互动（双击切换格式）
// V4: 问候语点击切换
// V5: 天体点击互动（太阳/月亮表情）
// V6: 长按显示详细统计
// V7: 摇一摇彩蛋
// V8: 手势滑动效果
// V9: 语音播报问候
// V10: 智能助手气泡

var HeaderInteraction = (function() {
    var isInitialized = false;
    var touchStartY = 0;
    var lastTapTime = 0;
    var tapCount = 0;
    
    // 初始化所有互动
    function init() {
        if (isInitialized) return;
        isInitialized = true;
        
        console.log('[HeaderInteraction] 初始化首页互动系统...');
        
        // 延迟初始化，确保DOM已加载
        setTimeout(function() {
            initAvatarInteraction();      // V1
            initStreakInteraction();       // V2
            initTimeInteraction();         // V3
            initGreetingInteraction();     // V4
            initCelestialInteraction();    // V5
            initLongPressStats();          // V6
            initShakeEasterEgg();          // V7
            initSwipeEffects();            // V8
            initAssistantBubble();         // V10
        }, 500);
    }
    
    // V1: 头像互动
    function initAvatarInteraction() {
        var avatarRing = document.getElementById('sceneIconRing');
        if (!avatarRing) return;
        
        // 添加点击波纹效果
        avatarRing.addEventListener('click', function(e) {
            createRipple(e, avatarRing);
            
            // 随机表情反馈
            var reactions = ['😊', '🎉', '✨', '💪', '🌟', '👋', '🥳', '😎'];
            var reaction = reactions[Math.floor(Math.random() * reactions.length)];
            showFloatingEmoji(avatarRing, reaction);
            
            // 触感反馈
            if (window.UX && window.UX.HapticFeedback) {
                window.UX.HapticFeedback.light();
            }
        });
        
        // 双击切换头像模式
        avatarRing.addEventListener('dblclick', function() {
            showAvatarModeSelector();
        });
    }
    
    // V2: 连续天数徽章互动
    function initStreakInteraction() {
        var streakBadge = document.getElementById('streakBadge');
        if (!streakBadge) return;
        
        streakBadge.addEventListener('click', function(e) {
            var streak = parseInt(document.getElementById('streakCount')?.textContent || '0');
            
            // 根据连续天数显示不同的庆祝效果
            if (streak >= 7) {
                celebrateStreak(streak);
            } else {
                showStreakEncouragement(streak);
            }
            
            // 触感反馈
            if (window.UX && window.UX.HapticFeedback) {
                window.UX.HapticFeedback.medium();
            }
        });
        
        // 长按显示连续学习详情
        var pressTimer = null;
        streakBadge.addEventListener('touchstart', function() {
            pressTimer = setTimeout(function() {
                showStreakDetails();
            }, 600);
        });
        
        streakBadge.addEventListener('touchend', function() {
            clearTimeout(pressTimer);
        });
    }
    
    // V3: 时间显示互动
    function initTimeInteraction() {
        var timeDisplay = document.getElementById('timeDisplay');
        if (!timeDisplay) return;
        
        var is24HourFormat = localStorage.getItem('time24Hour') !== 'false';
        var showSeconds = localStorage.getItem('timeShowSeconds') === 'true';
        
        // 双击切换12/24小时制
        timeDisplay.addEventListener('dblclick', function() {
            is24HourFormat = !is24HourFormat;
            localStorage.setItem('time24Hour', is24HourFormat.toString());
            updateTimeFormat();
            showToast(is24HourFormat ? '已切换到24小时制' : '已切换到12小时制');
            
            if (window.UX && window.UX.HapticFeedback) {
                window.UX.HapticFeedback.light();
            }
        });
        
        // 三击显示/隐藏秒数
        var clickCount = 0;
        var clickTimer = null;
        
        timeDisplay.addEventListener('click', function() {
            clickCount++;
            
            if (clickTimer) clearTimeout(clickTimer);
            
            clickTimer = setTimeout(function() {
                if (clickCount >= 3) {
                    showSeconds = !showSeconds;
                    localStorage.setItem('timeShowSeconds', showSeconds.toString());
                    showToast(showSeconds ? '已显示秒数' : '已隐藏秒数');
                }
                clickCount = 0;
            }, 400);
        });
    }
    
    // V4: 问候语互动
    function initGreetingInteraction() {
        var greetingText = document.getElementById('greetingText');
        if (!greetingText) return;
        
        greetingText.style.cursor = 'pointer';
        
        greetingText.addEventListener('click', function() {
            // 添加点击动画
            greetingText.classList.add('greeting-bounce');
            setTimeout(function() {
                greetingText.classList.remove('greeting-bounce');
            }, 600);
            
            // 切换到新的问候语
            refreshGreeting();
            
            if (window.UX && window.UX.HapticFeedback) {
                window.UX.HapticFeedback.light();
            }
        });
    }
    
    // V5: 天体互动（太阳/月亮）
    function initCelestialInteraction() {
        var celestialBody = document.getElementById('celestialBody');
        if (!celestialBody) return;
        
        celestialBody.style.cursor = 'pointer';
        celestialBody.style.zIndex = '10';
        
        celestialBody.addEventListener('click', function(e) {
            e.stopPropagation();
            
            var header = document.getElementById('homeHeader');
            var timePeriod = header?.getAttribute('data-time-period') || 'morning';
            var isSun = !['evening', 'night'].includes(timePeriod);
            
            // 太阳/月亮的表情反应
            if (isSun) {
                showCelestialReaction('sun');
                createSunburstEffect(celestialBody);
            } else {
                showCelestialReaction('moon');
                createMoonlightEffect(celestialBody);
            }
            
            if (window.UX && window.UX.HapticFeedback) {
                window.UX.HapticFeedback.medium();
            }
        });
    }
    
    // V6: 长按显示详细统计
    function initLongPressStats() {
        var headerContent = document.querySelector('.header-content');
        if (!headerContent) return;
        
        var pressTimer = null;
        var isLongPress = false;
        
        headerContent.addEventListener('touchstart', function(e) {
            isLongPress = false;
            pressTimer = setTimeout(function() {
                isLongPress = true;
                showQuickStats();
            }, 800);
        });
        
        headerContent.addEventListener('touchend', function() {
            clearTimeout(pressTimer);
        });
        
        headerContent.addEventListener('touchmove', function() {
            clearTimeout(pressTimer);
        });
    }
    
    // V7: 摇一摇彩蛋
    function initShakeEasterEgg() {
        if (typeof DeviceMotionEvent === 'undefined') return;
        
        var shakeThreshold = 15;
        var lastShake = 0;
        var shakeCount = 0;
        
        // 请求设备运动权限 (iOS 13+)
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            // 需要用户手势触发
            document.body.addEventListener('click', function requestMotion() {
                DeviceMotionEvent.requestPermission()
                    .then(function(response) {
                        if (response === 'granted') {
                            enableShakeDetection();
                        }
                    })
                    .catch(console.error);
                document.body.removeEventListener('click', requestMotion);
            }, { once: true });
        } else {
            enableShakeDetection();
        }
        
        function enableShakeDetection() {
            window.addEventListener('devicemotion', function(e) {
                var acc = e.accelerationIncludingGravity;
                if (!acc) return;
                
                var total = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
                var now = Date.now();
                
                if (total > shakeThreshold && now - lastShake > 500) {
                    lastShake = now;
                    shakeCount++;
                    
                    if (shakeCount >= 3) {
                        triggerShakeEasterEgg();
                        shakeCount = 0;
                    }
                    
                    // 3秒后重置计数
                    setTimeout(function() {
                        shakeCount = Math.max(0, shakeCount - 1);
                    }, 3000);
                }
            });
        }
    }
    
    // V8: 手势滑动效果
    function initSwipeEffects() {
        var header = document.getElementById('homeHeader');
        if (!header) return;
        
        var startY = 0;
        var startX = 0;
        
        header.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
            startX = e.touches[0].clientX;
        });
        
        header.addEventListener('touchmove', function(e) {
            var deltaY = e.touches[0].clientY - startY;
            var deltaX = e.touches[0].clientX - startX;
            
            // 下拉刷新效果
            if (deltaY > 50 && Math.abs(deltaX) < 30) {
                header.style.transform = 'translateY(' + Math.min(deltaY * 0.3, 30) + 'px)';
            }
        });
        
        header.addEventListener('touchend', function(e) {
            var deltaY = e.changedTouches[0].clientY - startY;
            
            // 下拉刷新触发
            if (deltaY > 80) {
                refreshGreeting();
                showToast('✨ 已刷新');
            }
            
            header.style.transform = '';
            header.style.transition = 'transform 0.3s ease';
            setTimeout(function() {
                header.style.transition = '';
            }, 300);
        });
    }
    
    // V10: 智能助手气泡
    function initAssistantBubble() {
        // 检查是否应该显示助手提示
        var lastTip = localStorage.getItem('lastAssistantTip');
        var now = Date.now();
        
        // 每6小时最多显示一次
        if (lastTip && now - parseInt(lastTip) < 6 * 60 * 60 * 1000) {
            return;
        }
        
        // 延迟显示
        setTimeout(function() {
            var tip = getSmartTip();
            if (tip) {
                showAssistantBubble(tip);
                localStorage.setItem('lastAssistantTip', now.toString());
            }
        }, 3000);
    }
    
    // ==================== 辅助函数 ====================
    
    // 创建点击波纹
    function createRipple(e, element) {
        var ripple = document.createElement('div');
        ripple.className = 'interaction-ripple';
        
        var rect = element.getBoundingClientRect();
        var size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    }
    
    // 显示浮动表情
    function showFloatingEmoji(element, emoji) {
        var float = document.createElement('div');
        float.className = 'floating-emoji';
        float.textContent = emoji;
        
        var rect = element.getBoundingClientRect();
        float.style.left = (rect.left + rect.width / 2) + 'px';
        float.style.top = rect.top + 'px';
        
        document.body.appendChild(float);
        
        setTimeout(function() {
            float.remove();
        }, 1000);
    }
    
    // 头像模式选择器
    function showAvatarModeSelector() {
        var modes = [
            { icon: '🌤️', name: '天气图标', mode: 'weather' },
            { icon: '😊', name: '表情头像', mode: 'emoji' },
            { icon: '📷', name: '自定义图片', mode: 'custom' }
        ];
        
        var html = '<div class="avatar-mode-selector">' +
            '<h3>选择头像模式</h3>' +
            '<div class="mode-options">';
        
        modes.forEach(function(m) {
            html += '<div class="mode-option" onclick="setAvatarMode(\'' + m.mode + '\')">' +
                '<span class="mode-icon">' + m.icon + '</span>' +
                '<span class="mode-name">' + m.name + '</span>' +
            '</div>';
        });
        
        html += '</div></div>';
        
        showInteractionModal(html);
    }
    
    // 连续天数庆祝
    function celebrateStreak(streak) {
        var messages = {
            7: '🔥 一周连续！太棒了！',
            14: '⭐ 两周连续！坚持就是胜利！',
            30: '🏆 一个月了！你是学习达人！',
            60: '💎 两个月！简直是学神！',
            100: '👑 百日传奇！无人能敌！'
        };
        
        var message = '🔥 连续 ' + streak + ' 天！继续保持！';
        
        for (var days in messages) {
            if (streak >= parseInt(days)) {
                message = messages[days];
            }
        }
        
        // 显示庆祝效果
        showCelebration(message, streak);
        
        // 撒花效果
        if (streak >= 7 && window.UX && window.UX.MicroInteractions) {
            window.UX.MicroInteractions.confetti();
        }
    }
    
    // 连续天数鼓励
    function showStreakEncouragement(streak) {
        var messages = [
            '刚开始，加油！每一天都是新的开始 💪',
            '继续坚持，连续7天有惊喜！ ⭐',
            '你在进步！再坚持几天！ 🌱',
            '学习的路上，你不孤单 🤝',
            '今天也要好好学习哦 📚'
        ];
        
        var message = messages[Math.min(streak, messages.length - 1)];
        showToast(message);
    }
    
    // 显示连续学习详情
    function showStreakDetails() {
        var streak = calculateStreak();
        var totalDays = Object.keys(JSON.parse(localStorage.getItem('studyDays') || '{}')).length;
        var totalWords = Object.keys(JSON.parse(localStorage.getItem('learnedWords') || '{}')).length;
        
        var html = '<div class="streak-details-modal">' +
            '<h3>📊 学习统计</h3>' +
            '<div class="stat-grid">' +
                '<div class="stat-item">' +
                    '<span class="stat-value">' + streak + '</span>' +
                    '<span class="stat-label">连续天数</span>' +
                '</div>' +
                '<div class="stat-item">' +
                    '<span class="stat-value">' + totalDays + '</span>' +
                    '<span class="stat-label">学习天数</span>' +
                '</div>' +
                '<div class="stat-item">' +
                    '<span class="stat-value">' + totalWords + '</span>' +
                    '<span class="stat-label">已学单词</span>' +
                '</div>' +
            '</div>' +
        '</div>';
        
        showInteractionModal(html);
    }
    
    // 刷新问候语
    function refreshGreeting() {
        if (typeof updateGreeting === 'function') {
            updateGreeting();
        }
    }
    
    // 显示天体反应
    function showCelestialReaction(type) {
        var reactions = {
            sun: ['☀️ 阳光明媚！', '🌞 今天天气真好！', '✨ 充满能量！', '🌻 向阳而生！'],
            moon: ['🌙 夜深了~', '✨ 星光闪闪', '🌟 晚安好梦', '💫 宁静的夜晚']
        };
        
        var msgs = reactions[type] || reactions.sun;
        var msg = msgs[Math.floor(Math.random() * msgs.length)];
        showToast(msg);
    }
    
    // 太阳光芒效果
    function createSunburstEffect(element) {
        var burst = document.createElement('div');
        burst.className = 'sunburst-effect';
        element.appendChild(burst);
        
        setTimeout(function() {
            burst.remove();
        }, 800);
    }
    
    // 月光效果
    function createMoonlightEffect(element) {
        var glow = document.createElement('div');
        glow.className = 'moonlight-effect';
        element.appendChild(glow);
        
        setTimeout(function() {
            glow.remove();
        }, 800);
    }
    
    // 显示快速统计
    function showQuickStats() {
        var streak = calculateStreak();
        var todayWords = getTodayLearnedWords();
        
        var html = '<div class="quick-stats-popup">' +
            '<div class="qs-item">🔥 连续 <strong>' + streak + '</strong> 天</div>' +
            '<div class="qs-item">📚 今日 <strong>' + todayWords + '</strong> 词</div>' +
            '<div class="qs-tip">继续加油！</div>' +
        '</div>';
        
        showQuickPopup(html);
        
        if (window.UX && window.UX.HapticFeedback) {
            window.UX.HapticFeedback.heavy();
        }
    }
    
    // 摇一摇彩蛋
    function triggerShakeEasterEgg() {
        var eggs = [
            { text: '🎉 发现隐藏彩蛋！', effect: 'confetti' },
            { text: '🌈 彩虹出现了！', effect: 'rainbow' },
            { text: '⭐ 今天会有好运！', effect: 'stars' },
            { text: '🎁 获得神秘奖励！', effect: 'gift' },
            { text: '🚀 学习火箭启动！', effect: 'rocket' }
        ];
        
        var egg = eggs[Math.floor(Math.random() * eggs.length)];
        showToast(egg.text);
        
        if (egg.effect === 'confetti' && window.UX && window.UX.MicroInteractions) {
            window.UX.MicroInteractions.confetti();
        }
        
        if (window.UX && window.UX.HapticFeedback) {
            window.UX.HapticFeedback.heavy();
        }
    }
    
    // 获取智能提示
    function getSmartTip() {
        var hour = new Date().getHours();
        var streak = calculateStreak();
        var todayWords = getTodayLearnedWords();
        
        var tips = [];
        
        // 基于时间的提示
        if (hour >= 6 && hour < 9) {
            tips.push('🌅 早起学习效率高！背几个单词吧');
        }
        if (hour >= 12 && hour < 14) {
            tips.push('🍱 午休时间，复习一下今天的单词？');
        }
        if (hour >= 21 && hour < 23) {
            tips.push('🌙 睡前复习记忆更牢固哦');
        }
        if (hour >= 23 || hour < 5) {
            tips.push('💤 太晚了，早点休息明天继续');
        }
        
        // 基于学习状态的提示
        if (todayWords === 0) {
            tips.push('📚 今天还没学习，来背几个单词吧！');
        }
        if (streak === 0) {
            tips.push('🔥 开始你的连续学习之旅吧！');
        }
        if (streak >= 7 && streak < 30) {
            tips.push('⭐ 已经连续 ' + streak + ' 天了，太棒了！');
        }
        
        return tips.length > 0 ? tips[Math.floor(Math.random() * tips.length)] : null;
    }
    
    // 显示助手气泡
    function showAssistantBubble(tip) {
        var bubble = document.createElement('div');
        bubble.className = 'assistant-bubble';
        bubble.innerHTML = '<div class="bubble-content">' + tip + '</div>' +
            '<button class="bubble-close" onclick="this.parentElement.remove()">×</button>';
        
        var header = document.getElementById('homeHeader');
        if (header) {
            header.appendChild(bubble);
            
            // 5秒后自动消失
            setTimeout(function() {
                if (bubble.parentElement) {
                    bubble.classList.add('bubble-fadeout');
                    setTimeout(function() {
                        bubble.remove();
                    }, 300);
                }
            }, 5000);
        }
    }
    
    // 显示互动模态框
    function showInteractionModal(html) {
        var overlay = document.createElement('div');
        overlay.className = 'interaction-modal-overlay';
        overlay.innerHTML = '<div class="interaction-modal">' + html + '</div>';
        
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
        
        document.body.appendChild(overlay);
    }
    
    // 显示快速弹出
    function showQuickPopup(html) {
        var popup = document.createElement('div');
        popup.className = 'quick-popup';
        popup.innerHTML = html;
        
        document.body.appendChild(popup);
        
        setTimeout(function() {
            popup.classList.add('popup-fadeout');
            setTimeout(function() {
                popup.remove();
            }, 300);
        }, 2000);
    }
    
    // 显示庆祝效果
    function showCelebration(message, streak) {
        var celebration = document.createElement('div');
        celebration.className = 'streak-celebration';
        celebration.innerHTML = '<div class="celebration-content">' +
            '<div class="celebration-number">' + streak + '</div>' +
            '<div class="celebration-text">' + message + '</div>' +
        '</div>';
        
        document.body.appendChild(celebration);
        
        setTimeout(function() {
            celebration.classList.add('celebration-fadeout');
            setTimeout(function() {
                celebration.remove();
            }, 500);
        }, 2500);
    }
    
    // 更新时间格式
    function updateTimeFormat() {
        if (typeof updateTimeDisplay === 'function') {
            updateTimeDisplay();
        }
    }
    
    return {
        init: init
    };
})();

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', function() {
    HeaderInteraction.init();
});

// 暴露全局
window.HeaderInteraction = HeaderInteraction;


// ==================== 网络连接稳定性增强系统 V5 ====================
// V1: 网络状态监控
// V2: 智能重试机制
// V3: 连接健康检查
// V4: 离线队列管理
// V5: 自动恢复机制

var NetworkStability = (function() {
    var isOnline = navigator.onLine;
    var connectionQuality = 'unknown'; // good, moderate, poor, offline
    var lastSuccessfulRequest = Date.now();
    var pendingRequests = [];
    var healthCheckInterval = null;
    var reconnectAttempts = 0;
    var maxReconnectAttempts = 5;
    var listeners = [];
    
    // V1: 网络状态监控
    function init() {
        console.log('[NetworkStability] 初始化网络稳定性系统...');
        
        // 监听在线/离线事件
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        
        // 监听网络信息变化（如果支持）
        if ('connection' in navigator) {
            navigator.connection.addEventListener('change', handleConnectionChange);
            updateConnectionQuality();
        }
        
        // 启动健康检查
        startHealthCheck();
        
        // 初始检测
        detectConnectionQuality();
    }
    
    // 在线事件处理
    function handleOnline() {
        console.log('[NetworkStability] 网络已恢复');
        isOnline = true;
        reconnectAttempts = 0;
        
        // 显示恢复提示
        showNetworkStatus('online');
        
        // 尝试处理队列中的请求
        processQueue();
        
        // 通知监听器
        notifyListeners('online');
        
        // 触感反馈
        if (window.UX && window.UX.HapticFeedback) {
            window.UX.HapticFeedback.success();
        }
    }
    
    // 离线事件处理
    function handleOffline() {
        console.log('[NetworkStability] 网络已断开');
        isOnline = false;
        connectionQuality = 'offline';
        
        // 显示离线提示
        showNetworkStatus('offline');
        
        // 通知监听器
        notifyListeners('offline');
    }
    
    // 处理连接变化
    function handleConnectionChange() {
        updateConnectionQuality();
        notifyListeners('change');
    }
    
    // 更新连接质量
    function updateConnectionQuality() {
        if (!navigator.connection) return;
        
        var conn = navigator.connection;
        var effectiveType = conn.effectiveType; // 4g, 3g, 2g, slow-2g
        var downlink = conn.downlink; // Mbps
        var rtt = conn.rtt; // ms
        
        // 根据网络指标判断质量
        if (effectiveType === '4g' && downlink > 5 && rtt < 100) {
            connectionQuality = 'good';
        } else if (effectiveType === '4g' || effectiveType === '3g') {
            connectionQuality = 'moderate';
        } else {
            connectionQuality = 'poor';
        }
        
        console.log('[NetworkStability] 连接质量:', connectionQuality, {
            type: effectiveType,
            downlink: downlink + 'Mbps',
            rtt: rtt + 'ms'
        });
    }
    
    // V2: 智能重试机制
    function smartFetch(url, options, config) {
        config = config || {};
        var maxRetries = config.maxRetries || 3;
        var baseDelay = config.baseDelay || 1000;
        var timeout = config.timeout || 15000;
        
        return new Promise(function(resolve, reject) {
            var attempt = 0;
            
            function tryFetch() {
                attempt++;
                
                // 检查是否离线
                if (!isOnline) {
                    // 加入队列
                    if (config.queueIfOffline) {
                        addToQueue({ url: url, options: options, config: config, resolve: resolve, reject: reject });
                        return;
                    }
                    reject(new Error('网络离线'));
                    return;
                }
                
                var controller = new AbortController();
                var timeoutId = setTimeout(function() {
                    controller.abort();
                }, timeout);
                
                fetch(url, Object.assign({}, options, { signal: controller.signal }))
                    .then(function(response) {
                        clearTimeout(timeoutId);
                        lastSuccessfulRequest = Date.now();
                        reconnectAttempts = 0;
                        resolve(response);
                    })
                    .catch(function(error) {
                        clearTimeout(timeoutId);
                        
                        if (attempt < maxRetries) {
                            // 指数退避
                            var delay = baseDelay * Math.pow(2, attempt - 1);
                            // 添加抖动
                            delay += Math.random() * 1000;
                            
                            console.log('[NetworkStability] 重试 ' + attempt + '/' + maxRetries + ', 延迟 ' + Math.round(delay) + 'ms');
                            
                            setTimeout(tryFetch, delay);
                        } else {
                            reject(error);
                        }
                    });
            }
            
            tryFetch();
        });
    }
    
    // V3: 连接健康检查
    function startHealthCheck() {
        // 每30秒检查一次
        healthCheckInterval = setInterval(function() {
            if (isOnline) {
                detectConnectionQuality();
            }
        }, 30000);
    }
    
    // 检测连接质量
    function detectConnectionQuality() {
        var startTime = Date.now();
        var testUrl = 'https://www.gstatic.com/generate_204';
        
        // 备用检测URL
        var fallbackUrls = [
            'https://connectivitycheck.gstatic.com/generate_204',
            'https://www.google.com/generate_204'
        ];
        
        fetch(testUrl, { 
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store'
        })
        .then(function() {
            var latency = Date.now() - startTime;
            
            if (latency < 200) {
                connectionQuality = 'good';
            } else if (latency < 500) {
                connectionQuality = 'moderate';
            } else {
                connectionQuality = 'poor';
            }
            
            console.log('[NetworkStability] 连接延迟:', latency + 'ms, 质量:', connectionQuality);
        })
        .catch(function() {
            // 静默失败，不改变状态
        });
    }
    
    // V4: 离线队列管理
    function addToQueue(request) {
        pendingRequests.push(request);
        console.log('[NetworkStability] 请求已加入队列，当前队列长度:', pendingRequests.length);
        
        // 持久化队列（可选）
        try {
            var queueData = pendingRequests.map(function(r) {
                return { url: r.url, options: r.options };
            });
            localStorage.setItem('networkQueue', JSON.stringify(queueData));
        } catch (e) {}
    }
    
    // 处理队列
    function processQueue() {
        if (pendingRequests.length === 0) return;
        
        console.log('[NetworkStability] 处理队列中的 ' + pendingRequests.length + ' 个请求');
        
        var queue = pendingRequests.slice();
        pendingRequests = [];
        
        queue.forEach(function(request, index) {
            setTimeout(function() {
                smartFetch(request.url, request.options, request.config)
                    .then(request.resolve)
                    .catch(request.reject);
            }, index * 500); // 错开请求
        });
        
        // 清除持久化队列
        localStorage.removeItem('networkQueue');
    }
    
    // V5: 自动恢复机制
    function attemptReconnect() {
        if (reconnectAttempts >= maxReconnectAttempts) {
            console.log('[NetworkStability] 达到最大重连次数');
            return;
        }
        
        reconnectAttempts++;
        console.log('[NetworkStability] 尝试重连 ' + reconnectAttempts + '/' + maxReconnectAttempts);
        
        detectConnectionQuality();
        
        // 检测成功后处理队列
        setTimeout(function() {
            if (connectionQuality !== 'offline') {
                processQueue();
            } else if (reconnectAttempts < maxReconnectAttempts) {
                // 递增延迟重试
                setTimeout(attemptReconnect, 5000 * reconnectAttempts);
            }
        }, 2000);
    }
    
    // 显示网络状态提示
    function showNetworkStatus(status) {
        var messages = {
            online: { text: '网络已恢复 ✓', type: 'success' },
            offline: { text: '网络已断开，数据将在恢复后同步', type: 'warning' },
            poor: { text: '网络信号较弱', type: 'info' }
        };
        
        var msg = messages[status];
        if (msg && typeof showToast === 'function') {
            showToast(msg.text);
        }
        
        // 更新UI指示器
        updateNetworkIndicator(status);
    }
    
    // 更新网络指示器
    function updateNetworkIndicator(status) {
        var indicator = document.getElementById('networkIndicator');
        
        if (!indicator) {
            // 创建指示器
            indicator = document.createElement('div');
            indicator.id = 'networkIndicator';
            indicator.className = 'network-indicator';
            document.body.appendChild(indicator);
        }
        
        indicator.className = 'network-indicator network-' + status;
        indicator.innerHTML = status === 'offline' ? 
            '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M23.64 7c-.45-.34-4.93-4-11.64-4C5.28 3 .81 6.66.36 7l10.08 12.56c.8 1 2.32 1 3.12 0L23.64 7z" opacity="0.3"/><path fill="currentColor" d="M3.41 1.64L2 3.05 5.02 6.07c-1.89.79-3.4 1.73-4.38 2.53L10.72 21.1c.8 1 2.32 1 3.12 0l2.5-3.12 3.61 3.61 1.41-1.41L3.41 1.64z"/></svg>' :
            '';
        
        // 离线时显示，在线时隐藏
        if (status === 'online') {
            setTimeout(function() {
                indicator.classList.add('network-hidden');
            }, 2000);
        } else {
            indicator.classList.remove('network-hidden');
        }
    }
    
    // 添加监听器
    function addListener(callback) {
        listeners.push(callback);
    }
    
    // 通知监听器
    function notifyListeners(event) {
        listeners.forEach(function(listener) {
            try {
                listener({
                    type: event,
                    isOnline: isOnline,
                    quality: connectionQuality
                });
            } catch (e) {}
        });
    }
    
    // 获取当前状态
    function getStatus() {
        return {
            isOnline: isOnline,
            quality: connectionQuality,
            lastSuccess: lastSuccessfulRequest,
            queueLength: pendingRequests.length
        };
    }
    
    return {
        init: init,
        smartFetch: smartFetch,
        getStatus: getStatus,
        addListener: addListener,
        processQueue: processQueue,
        detectQuality: detectConnectionQuality
    };
})();

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    NetworkStability.init();
});

// 暴露全局
window.NetworkStability = NetworkStability;

// V12: 打开订阅页面
function openSubscriptionPage() {
    if (typeof showPaymentModal === 'function') {
        showPaymentModal();
    } else {
        console.error('showPaymentModal 函数不存在');
        alert('订阅功能正在准备中');
    }
}

window.openSubscriptionPage = openSubscriptionPage;
