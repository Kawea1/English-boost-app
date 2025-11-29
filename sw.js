// Service Worker for English Boost App
const CACHE_NAME = 'english-boost-v2.7';
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
    '/manifest.json'
];

// 安装事件 - 缓存资源
self.addEventListener('install', event => {
    console.log('[SW] Installing Service Worker...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('[SW] Caching app shell');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', event => {
    console.log('[SW] Activating Service Worker...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.filter(cacheName => {
                    return cacheName !== CACHE_NAME;
                }).map(cacheName => {
                    console.log('[SW] Deleting old cache:', cacheName);
                    return caches.delete(cacheName);
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 拦截请求 - 优先使用缓存
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 缓存命中，返回缓存的资源
                if (response) {
                    return response;
                }
                
                // 缓存未命中，从网络获取
                return fetch(event.request).then(response => {
                    // 检查是否是有效响应
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // 克隆响应，一份给浏览器，一份存入缓存
                    const responseToCache = response.clone();
                    
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    
                    return response;
                }).catch(error => {
                    console.log('[SW] Fetch failed:', error);
                    // 可以返回一个自定义的离线页面
                    return caches.match('/index.html');
                });
            })
    );
});

