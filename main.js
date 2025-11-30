/**
 * 学术英语精进 - Electron 主进程 v2.0
 * 极致丝滑体验版
 * 支持 Windows / macOS / Linux
 */

const { app, BrowserWindow, Menu, shell, ipcMain, nativeTheme, globalShortcut, Tray, nativeImage } = require('electron');
const path = require('path');

// 保持窗口和托盘引用
let mainWindow = null;
let tray = null;

// 是否为开发模式
const isDev = process.argv.includes('--dev');

// 启用更流畅的动画
app.commandLine.appendSwitch('enable-smooth-scrolling');

// 创建主窗口
function createWindow() {
    const { screen } = require('electron');
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    
    // 计算最佳窗口大小
    const windowWidth = Math.min(Math.floor(width * 0.85), 1400);
    const windowHeight = Math.min(Math.floor(height * 0.9), 900);

    mainWindow = new BrowserWindow({
        width: windowWidth,
        height: windowHeight,
        minWidth: 375,
        minHeight: 600,
        center: true,
        title: '学术英语精进',
        icon: path.join(__dirname, 'assets', 'icon.png'),
        backgroundColor: '#f3f4f6',
        
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            webSecurity: true,
            partition: 'persist:academic-english',
            backgroundThrottling: false,
            enableWebGL: true
        },
        
        // 窗口样式 - 根据平台优化
        titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
        trafficLightPosition: { x: 15, y: 15 },
        frame: process.platform !== 'darwin',
        vibrancy: process.platform === 'darwin' ? 'under-window' : undefined,
        
        // 窗口行为
        resizable: true,
        maximizable: true,
        fullscreenable: true,
        show: false,
        roundedCorners: true
    });

    // 加载应用
    mainWindow.loadFile('index.html');

    // 平滑显示窗口
    mainWindow.once('ready-to-show', () => {
        mainWindow.setOpacity(0);
        mainWindow.show();
        
        let opacity = 0;
        const fadeIn = setInterval(() => {
            opacity += 0.1;
            if (opacity >= 1) {
                mainWindow.setOpacity(1);
                clearInterval(fadeIn);
            } else {
                mainWindow.setOpacity(opacity);
            }
        }, 20);
        
        if (isDev) {
            mainWindow.webContents.openDevTools();
        }
    });

    // 外部链接处理
    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            shell.openExternal(url);
            return { action: 'deny' };
        }
        return { action: 'allow' };
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            if (!url.includes('localhost')) {
                event.preventDefault();
                shell.openExternal(url);
            }
        }
    });

    mainWindow.on('close', (event) => {
        if (process.platform === 'darwin' && !app.isQuitting) {
            event.preventDefault();
            mainWindow.hide();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// 创建应用菜单
function createMenu() {
    const isMac = process.platform === 'darwin';
    
    const template = [
        ...(isMac ? [{
            label: app.name,
            submenu: [
                { role: 'about', label: '关于学术英语精进' },
                { type: 'separator' },
                { role: 'services', label: '服务' },
                { type: 'separator' },
                { role: 'hide', label: '隐藏' },
                { role: 'hideOthers', label: '隐藏其他' },
                { role: 'unhide', label: '显示全部' },
                { type: 'separator' },
                { role: 'quit', label: '退出' }
            ]
        }] : []),
        
        {
            label: '文件',
            submenu: [
                isMac ? { role: 'close', label: '关闭窗口' } : { role: 'quit', label: '退出' }
            ]
        },
        
        {
            label: '编辑',
            submenu: [
                { role: 'undo', label: '撤销' },
                { role: 'redo', label: '重做' },
                { type: 'separator' },
                { role: 'cut', label: '剪切' },
                { role: 'copy', label: '复制' },
                { role: 'paste', label: '粘贴' },
                { role: 'selectAll', label: '全选' }
            ]
        },
        
        {
            label: '视图',
            submenu: [
                { role: 'reload', label: '刷新' },
                { role: 'forceReload', label: '强制刷新' },
                { type: 'separator' },
                { role: 'resetZoom', label: '重置缩放' },
                { role: 'zoomIn', label: '放大' },
                { role: 'zoomOut', label: '缩小' },
                { type: 'separator' },
                { role: 'togglefullscreen', label: '全屏' },
                ...(isDev ? [
                    { type: 'separator' },
                    { role: 'toggleDevTools', label: '开发者工具' }
                ] : [])
            ]
        },
        
        {
            label: '学习',
            submenu: [
                {
                    label: '词汇训练',
                    accelerator: 'CmdOrCtrl+1',
                    click: () => {
                        mainWindow?.webContents.executeJavaScript(`openModule('vocabulary')`);
                    }
                },
                {
                    label: '听力练习',
                    accelerator: 'CmdOrCtrl+2',
                    click: () => {
                        mainWindow?.webContents.executeJavaScript(`openModule('listening')`);
                    }
                },
                {
                    label: '阅读精讲',
                    accelerator: 'CmdOrCtrl+3',
                    click: () => {
                        mainWindow?.webContents.executeJavaScript(`openModule('reading')`);
                    }
                },
                {
                    label: '口语跟读',
                    accelerator: 'CmdOrCtrl+4',
                    click: () => {
                        mainWindow?.webContents.executeJavaScript(`openModule('speaking')`);
                    }
                },
                { type: 'separator' },
                {
                    label: '返回首页',
                    accelerator: 'Escape',
                    click: () => {
                        mainWindow?.webContents.executeJavaScript(`closeModule()`);
                    }
                }
            ]
        },
        
        {
            label: '窗口',
            submenu: [
                { role: 'minimize', label: '最小化' },
                { role: 'zoom', label: '缩放' },
                ...(isMac ? [
                    { type: 'separator' },
                    { role: 'front', label: '前置全部窗口' }
                ] : [
                    { role: 'close', label: '关闭' }
                ])
            ]
        },
        
        {
            label: '帮助',
            submenu: [
                {
                    label: '使用指南',
                    click: () => {
                        mainWindow?.webContents.executeJavaScript(`
                            alert('📚 学术英语精进使用指南\\n\\n快捷键：\\n• Cmd/Ctrl + 1-4: 快速进入各模块\\n• Esc: 返回首页\\n• Cmd/Ctrl + R: 刷新');
                        `);
                    }
                },
                { type: 'separator' },
                {
                    label: '反馈问题',
                    click: () => {
                        shell.openExternal('mailto:support@example.com');
                    }
                }
            ]
        }
    ];
    
    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// 应用准备就绪
app.whenReady().then(() => {
    createWindow();
    createMenu();
    
    app.on('activate', () => {
        if (mainWindow === null) {
            createWindow();
        } else {
            mainWindow.show();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('before-quit', () => {
    app.isQuitting = true;
});

// IPC 通信
ipcMain.handle('get-app-version', () => app.getVersion());
ipcMain.handle('get-platform', () => process.platform);
