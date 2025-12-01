// Service Worker for English Boost App
// 每次更新时修改版本号
const CACHE_NAME = 'english-boost-v3.0';

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
    '/sources.js',
    '/online_sources.js',
    '/modules.js',
    '/auth.js',
    '/manifest.json',
    '/quotes.js'
];

// 安装事件 - 立即激活新版本
self.addEventListener('install', event => {
    console.log('[SW] Installing new version...');
    // 跳过等待，立即激活
    self.skipWaiting();
});

// 激活事件 - 清理所有旧缓存
self.addEventListener('activate', event => {
    console.log('[SW] Activating and clearing old caches...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // 删除所有旧版本缓存
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // 立即控制所有客户端
            return self.clients.claim();
        }).then(() => {
            // 通知所有客户端刷新
            return self.clients.matchAll().then(clients => {
                clients.forEach(client => {
                    client.postMessage({ type: 'SW_UPDATED' });
                });
            });
        })
    );
});

// 拦截请求 - 网络优先策略（确保始终获取最新版本）
self.addEventListener('fetch', event => {
    const request = event.request;
    
    // 只处理 GET 请求
    if (request.method !== 'GET') {
        return;
    }
    
    // 跳过非同源请求
    if (!request.url.startsWith(self.location.origin)) {
        return;
    }
    
    event.respondWith(
        // 网络优先：先尝试从网络获取最新版本
        fetch(request)
            .then(response => {
                // 网络请求成功，更新缓存
                if (response && response.status === 200) {
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(request, responseToCache);
                    });
                }
                return response;
            })
            .catch(error => {
                // 网络失败，使用缓存（离线模式）
                console.log('[SW] Network failed, using cache:', request.url);
                return caches.match(request).then(cachedResponse => {
                    if (cachedResponse) {
                        return cachedResponse;
                    }
                    // 如果是页面请求，返回首页
                    if (request.headers.get('accept').includes('text/html')) {
                        return caches.match('/index.html');
                    }
                    return new Response('Offline', { status: 503 });
                });
            })
    );
});

// 监听消息 - 支持手动清理缓存
self.addEventListener('message', event => {
    if (event.data === 'CLEAR_CACHE') {
        console.log('[SW] Manual cache clear requested');
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => caches.delete(cacheName))
            );
        }).then(() => {
            event.source.postMessage({ type: 'CACHE_CLEARED' });
        });
    }
});

