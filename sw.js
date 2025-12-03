// Service Worker for English Boost App
// ==================== 版本控制 ====================
// 每次更新时修改版本号 - 格式: english-boost-v主版本.次版本.修订号.时间戳
const CACHE_VERSION = 'v4.8.1-bugfixes-simplify';
const BUILD_TIME = '20251203-1600';
const CACHE_NAME = `english-boost-v${CACHE_VERSION}-${BUILD_TIME}`;

// 关键资源版本哈希（用于验证完整性）
const RESOURCE_HASHES = {
    'app.js': CACHE_VERSION,
    'styles.css': CACHE_VERSION,
    'index.html': CACHE_VERSION
};

// 需要缓存的静态资源（仅用于离线备份）
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/vocabulary.js',
    '/dictionary.js',
    '/listening-data.js',
    '/listening-module.js',
    '/reading-data.js',
    '/speaking-data.js',
    '/writing-data.js',
    '/writing-module.js',
    '/sources.js',
    '/online_sources.js',
    '/modules.js',
    '/auth.js',
    '/subscription.js',
    '/manifest.json',
    '/quotes.js',
    '/version.json',
    // V11-V16: 词汇增强数据文件
    '/word_relations.json',
    '/word_mnemonics.json',
    '/word_difficulty.json',
    '/word_examples.json',
    '/word_exam_tags.json'
];

// 关键资源（必须确保最新）
const CRITICAL_RESOURCES = [
    '/app.js',
    '/styles.css',
    '/index.html',
    '/version.json'
];

// ==================== 安装事件 ====================
self.addEventListener('install', event => {
    console.log(`[SW] Installing version ${CACHE_VERSION}...`);
    
    event.waitUntil(
        // 预缓存关键资源
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Pre-caching critical resources');
                return Promise.all(
                    urlsToCache.map(url => {
                        return fetch(url + '?v=' + Date.now(), { cache: 'no-store' })
                            .then(response => {
                                if (response.ok) {
                                    return cache.put(url, response);
                                }
                            })
                            .catch(err => {
                                console.log('[SW] Failed to cache:', url, err);
                            });
                    })
                );
            })
            .then(() => {
                console.log('[SW] Installation complete, skipping waiting');
                // 立即激活
                return self.skipWaiting();
            })
    );
});

// ==================== 激活事件 ====================
self.addEventListener('activate', event => {
    console.log(`[SW] Activating version ${CACHE_VERSION}...`);
    
    event.waitUntil(
        Promise.all([
            // 1. 删除所有旧缓存
            caches.keys().then(cacheNames => {
                return Promise.all(
                    cacheNames
                        .filter(name => name.startsWith('english-boost-') && name !== CACHE_NAME)
                        .map(name => {
                            console.log('[SW] Deleting old cache:', name);
                            return caches.delete(name);
                        })
                );
            }),
            // 2. 立即控制所有客户端
            self.clients.claim()
        ])
        .then(() => {
            // 3. 广播更新消息给所有客户端
            return self.clients.matchAll({ type: 'window' });
        })
        .then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'SW_UPDATED',
                    version: CACHE_VERSION,
                    buildTime: BUILD_TIME,
                    timestamp: Date.now()
                });
            });
            console.log(`[SW] Activated! Notified ${clients.length} clients`);
        })
    );
});

// ==================== 请求拦截 ====================
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // 只处理 GET 请求
    if (request.method !== 'GET') return;
    
    // 跳过非同源请求和扩展请求
    if (!url.origin.includes(self.location.hostname) || 
        url.protocol === 'chrome-extension:') {
        return;
    }
    
    // 判断是否为关键资源
    const isCritical = CRITICAL_RESOURCES.some(r => url.pathname.endsWith(r));
    
    // 版本检查文件 - 始终从网络获取
    if (url.pathname.includes('version.json')) {
        event.respondWith(
            fetch(request.url + '?t=' + Date.now(), { 
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache, no-store, must-revalidate' }
            })
            .catch(() => caches.match(request))
        );
        return;
    }
    
    // 关键资源 - 网络优先 + 强制验证
    if (isCritical) {
        event.respondWith(networkFirstWithValidation(request));
        return;
    }
    
    // 普通资源 - 网络优先 + 缓存备份
    event.respondWith(networkFirstWithCache(request));
});

// 网络优先 + 验证策略（关键资源）
async function networkFirstWithValidation(request) {
    try {
        // 添加时间戳防止CDN缓存
        const url = new URL(request.url);
        url.searchParams.set('_t', Date.now());
        
        const networkResponse = await fetch(url.toString(), {
            cache: 'no-store',
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache'
            }
        });
        
        if (networkResponse && networkResponse.ok) {
            // 更新缓存
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, networkResponse.clone());
            console.log('[SW] Updated critical resource:', request.url);
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
    } catch (error) {
        console.log('[SW] Network failed for critical resource, using cache:', request.url);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        // 返回离线提示页
        return new Response('Offline - Critical resource unavailable', { 
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
        });
    }
}

// 网络优先 + 缓存策略（普通资源）
async function networkFirstWithCache(request) {
    try {
        const networkResponse = await fetch(request);
        
        if (networkResponse && networkResponse.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(request, networkResponse.clone());
            return networkResponse;
        }
        
        throw new Error('Network response not ok');
    } catch (error) {
        console.log('[SW] Network failed, using cache:', request.url);
        const cachedResponse = await caches.match(request);
        
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // 页面请求返回首页
        if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/index.html');
        }
        
        return new Response('Offline', { status: 503 });
    }
}

// ==================== 消息处理 ====================
self.addEventListener('message', event => {
    const { data, source } = event;
    
    console.log('[SW] Received message:', data);
    
    switch (data.type || data) {
        case 'CLEAR_CACHE':
        case 'FORCE_UPDATE':
            // 强制清理所有缓存
            handleClearCache(source);
            break;
            
        case 'GET_VERSION':
            // 返回当前版本信息
            source.postMessage({
                type: 'VERSION_INFO',
                version: CACHE_VERSION,
                buildTime: BUILD_TIME,
                cacheName: CACHE_NAME
            });
            break;
            
        case 'CHECK_UPDATE':
            // 检查更新并刷新关键资源
            handleCheckUpdate(source);
            break;
            
        case 'SKIP_WAITING':
            // 跳过等待立即激活
            self.skipWaiting();
            break;
    }
});

// 处理缓存清理
async function handleClearCache(client) {
    try {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        
        console.log('[SW] All caches cleared');
        
        if (client) {
            client.postMessage({ 
                type: 'CACHE_CLEARED',
                success: true,
                timestamp: Date.now()
            });
        }
    } catch (error) {
        console.error('[SW] Cache clear failed:', error);
        if (client) {
            client.postMessage({ 
                type: 'CACHE_CLEARED',
                success: false,
                error: error.message
            });
        }
    }
}

// 处理更新检查
async function handleCheckUpdate(client) {
    try {
        // 重新获取关键资源
        const cache = await caches.open(CACHE_NAME);
        
        for (const resource of CRITICAL_RESOURCES) {
            try {
                const response = await fetch(resource + '?t=' + Date.now(), { 
                    cache: 'no-store' 
                });
                if (response.ok) {
                    await cache.put(resource, response);
                    console.log('[SW] Refreshed:', resource);
                }
            } catch (e) {
                console.log('[SW] Failed to refresh:', resource);
            }
        }
        
        if (client) {
            client.postMessage({
                type: 'UPDATE_CHECKED',
                success: true,
                timestamp: Date.now()
            });
        }
    } catch (error) {
        console.error('[SW] Update check failed:', error);
    }
}

// ==================== 周期性同步（后台更新）====================
self.addEventListener('periodicsync', event => {
    if (event.tag === 'update-check') {
        event.waitUntil(handleCheckUpdate(null));
    }
});

// ==================== 推送通知（更新提醒）====================
self.addEventListener('push', event => {
    const data = event.data?.json() || {};
    
    if (data.type === 'UPDATE_AVAILABLE') {
        event.waitUntil(
            self.registration.showNotification('English Boost 有新版本', {
                body: data.message || '发现新版本，点击更新',
                icon: '/assets/icon-192.png',
                badge: '/assets/badge-72.png',
                tag: 'update-notification',
                data: { action: 'update' }
            })
        );
    }
});

self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.notification.data?.action === 'update') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

