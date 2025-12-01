import web_webview from '@ohos.web.webview';
import hilog from '@ohos.hilog';
import common from '@ohos.app.ability.common';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';
import vibrator from '@ohos.vibrator';
import promptAction from '@ohos.promptAction';
import deviceInfo from '@ohos.deviceInfo';
import window from '@ohos.window';

/**
 * 学术英语精进 - WebView 容器页面 v3.0
 * 加载 PWA Web 应用
 * 
 * v1.0 - 基础 WebView 加载
 * v2.0 - 添加原生桥接、震动反馈、Toast
 * v3.0 - 完整原生功能：错误处理、安全区域适配、弹窗处理
 */
@Entry
@Component
struct WebContainer {
  // WebView 控制器
  controller: web_webview.WebviewController = new web_webview.WebviewController();
  
  // Web 资源路径
  @State webSrc: string = 'resource://rawfile/www/index.html';
  
  // 加载状态
  @State isLoading: boolean = true;
  @State loadProgress: number = 0;
  @State loadError: boolean = false;
  @State errorMessage: string = '';
  
  // 是否可以返回
  @State canGoBack: boolean = false;
  
  // 安全区域（刘海屏适配）
  @State safeAreaTop: number = 0;
  @State safeAreaBottom: number = 0;
  
  // 返回键防抖
  private lastBackTime: number = 0;

  aboutToAppear(): void {
    // 初始化 WebView 设置
    web_webview.WebviewController.setWebDebuggingAccess(true);
    
    // 获取安全区域
    this.getSafeAreaInsets();
    
    // 请求所需权限
    this.requestPermissions();
  }

  // 获取安全区域（刘海屏适配）
  private async getSafeAreaInsets(): Promise<void> {
    try {
      const windowClass = await window.getLastWindow(getContext(this));
      const avoidArea = windowClass.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
      this.safeAreaTop = px2vp(avoidArea.topRect.height);
      this.safeAreaBottom = px2vp(avoidArea.bottomRect.height);
      hilog.info(0x0000, 'AcademicEnglish', 'Safe area: top=%{public}d, bottom=%{public}d', 
        this.safeAreaTop, this.safeAreaBottom);
    } catch (err) {
      hilog.error(0x0000, 'AcademicEnglish', 'Failed to get safe area: %{public}s', JSON.stringify(err));
    }
  }

  // 请求所需权限
  async requestPermissions(): Promise<void> {
    try {
      const context = getContext(this) as common.UIAbilityContext;
      const atManager = abilityAccessCtrl.createAtManager();
      
      // 请求多个权限
      const permissions: Array<string> = [
        'ohos.permission.MICROPHONE',
        'ohos.permission.INTERNET',
        'ohos.permission.VIBRATE'
      ];
      
      const result = await atManager.requestPermissionsFromUser(context, permissions);
      
      hilog.info(0x0000, 'AcademicEnglish', 'Permissions result: %{public}s', 
        JSON.stringify(result));
    } catch (err) {
      hilog.error(0x0000, 'AcademicEnglish', 'Failed to request permissions: %{public}s', 
        JSON.stringify(err));
    }
  }

  // 触发震动反馈
  private triggerVibration(duration: number = 50): void {
    try {
      vibrator.startVibration({
        type: 'time',
        duration: duration
      }, {
        id: 0,
        usage: 'touch'
      });
    } catch (err) {
      hilog.error(0x0000, 'AcademicEnglish', 'Vibration failed: %{public}s', JSON.stringify(err));
    }
  }

  // 显示 Toast
  private showToast(message: string): void {
    try {
      promptAction.showToast({
        message: message,
        duration: 2000,
        bottom: 100
      });
    } catch (err) {
      hilog.error(0x0000, 'AcademicEnglish', 'Toast failed: %{public}s', JSON.stringify(err));
    }
  }

  build() {
    Column() {
      // 状态栏占位（安全区域适配）
      Row()
        .width('100%')
        .height(this.safeAreaTop)
        .backgroundColor('#667eea')
      
      Stack({ alignContent: Alignment.Top }) {
        // 错误页面
        if (this.loadError) {
          Column() {
            Text('😞')
              .fontSize(60)
              .margin({ bottom: 20 })
            
            Text('页面加载失败')
              .fontSize(20)
              .fontWeight(FontWeight.Bold)
              .fontColor('#333')
              .margin({ bottom: 10 })
            
            Text(this.errorMessage || '请检查网络连接后重试')
              .fontSize(14)
              .fontColor('#666')
              .textAlign(TextAlign.Center)
              .margin({ bottom: 30, left: 40, right: 40 })
            
            Button('重新加载')
              .width(150)
              .height(44)
              .fontSize(16)
              .fontColor(Color.White)
              .backgroundColor('#667eea')
              .borderRadius(22)
              .onClick(() => {
                this.loadError = false;
                this.errorMessage = '';
                this.controller.refresh();
              })
          }
          .width('100%')
          .height('100%')
          .justifyContent(FlexAlign.Center)
          .alignItems(HorizontalAlign.Center)
          .backgroundColor('#f5f5f5')
        }
        
        // WebView 主体
        Web({ src: this.webSrc, controller: this.controller })
          .width('100%')
          .height('100%')
          .javaScriptAccess(true)
          .domStorageAccess(true)
          .databaseAccess(true)
          .fileAccess(true)
          .imageAccess(true)
          .mediaPlayGestureAccess(true)
          .mixedMode(MixedMode.All)
          .cacheMode(CacheMode.Default)
          .overviewModeAccess(true)
          .textZoomRatio(100)
          .zoomAccess(false)
          .verticalScrollBarAccess(false)
          .horizontalScrollBarAccess(false)
          .geolocationAccess(true)
          .userAgent('Mozilla/5.0 (HarmonyOS; Phone) AcademicEnglish/1.0')
          // 页面开始加载
          .onPageBegin((event) => {
            this.isLoading = true;
            this.loadProgress = 0;
            this.loadError = false;
            hilog.info(0x0000, 'AcademicEnglish', 'Page begin: %{public}s', event?.url ?? '');
          })
          // 页面加载完成
          .onPageEnd((event) => {
            this.isLoading = false;
            this.loadProgress = 100;
            this.canGoBack = this.controller.accessBackward();
            hilog.info(0x0000, 'AcademicEnglish', 'Page end: %{public}s', event?.url ?? '');
            
            // 注入 HarmonyOS 桥接代码
            this.injectBridge();
          })
          // 加载进度
          .onProgressChange((event) => {
            this.loadProgress = event?.newProgress ?? 0;
          })
          // 处理权限请求
          .onPermissionRequest((event) => {
            if (event) {
              event.request.grant(event.request.getAccessibleResource());
              hilog.info(0x0000, 'AcademicEnglish', 'Permission granted');
            }
          })
          // HTTP 错误
          .onHttpErrorReceive((event) => {
            const code = event?.response?.getResponseCode() ?? 0;
            if (code >= 400) {
              hilog.error(0x0000, 'AcademicEnglish', 'HTTP Error: %{public}d', code);
            }
          })
          // 错误处理
          .onErrorReceive((event) => {
            this.loadError = true;
            this.errorMessage = event?.error?.getErrorInfo() ?? '加载失败';
            hilog.error(0x0000, 'AcademicEnglish', 'Error: %{public}s', 
              JSON.stringify(event?.error) ?? '');
          })
          // JS 控制台日志
          .onConsole((event) => {
            hilog.info(0x0000, 'AcademicEnglish', 'Console: %{public}s', 
              event?.message?.getMessage() ?? '');
            return false;
          })
          // 处理 Alert 弹窗
          .onAlert((event) => {
            if (event) {
              promptAction.showDialog({
                title: '提示',
                message: event.message,
                buttons: [{ text: '确定', color: '#667eea' }]
              }).then(() => {
                event.result.handleConfirm();
              });
              return true;
            }
            return false;
          })
          // 处理 Confirm 弹窗
          .onConfirm((event) => {
            if (event) {
              promptAction.showDialog({
                title: '确认',
                message: event.message,
                buttons: [
                  { text: '取消', color: '#666' },
                  { text: '确定', color: '#667eea' }
                ]
              }).then((result) => {
                if (result.index === 1) {
                  event.result.handleConfirm();
                } else {
                  event.result.handleCancel();
                }
              });
              return true;
            }
            return false;
          })
        
        // 加载进度条
        if (this.isLoading && !this.loadError) {
          Column() {
            Progress({ value: this.loadProgress, total: 100, type: ProgressType.Linear })
              .width('100%')
              .height(3)
              .color('#667eea')
              .backgroundColor('#E0E0E0')
          }
          .width('100%')
        }
      }
      .width('100%')
      .layoutWeight(1)
      
      // 底部安全区域
      Row()
        .width('100%')
        .height(this.safeAreaBottom)
        .backgroundColor(Color.White)
    }
    .width('100%')
    .height('100%')
  }

  // 注入 HarmonyOS 桥接代码 v3.0
  private injectBridge(): void {
    // 获取设备信息
    const deviceType = deviceInfo.deviceType;
    const brand = deviceInfo.brand;
    const model = deviceInfo.productModel;
    const osVersion = deviceInfo.osFullName;
    
    const bridgeScript = `
      (function() {
        // 防止重复注入
        if (window.HarmonyOS && window.HarmonyOS.initialized) {
          console.log('[HarmonyOS] Bridge already initialized');
          return;
        }
        
        // HarmonyOS 原生桥接 v3.0
        window.HarmonyOS = {
          initialized: true,
          isHarmony: true,
          version: '3.0.0',
          
          // 设备信息
          deviceInfo: {
            platform: 'HarmonyOS',
            deviceType: '${deviceType}',
            brand: '${brand}',
            model: '${model}',
            osVersion: '${osVersion}',
            safeAreaTop: ${this.safeAreaTop},
            safeAreaBottom: ${this.safeAreaBottom}
          },
          
          // 震动反馈
          vibrate: function(duration) {
            duration = duration || 50;
            console.log('[HarmonyOS] vibrate:', duration);
          },
          
          // 显示 Toast
          showToast: function(message) {
            console.log('[HarmonyOS] toast:', message);
          },
          
          // 获取系统信息
          getSystemInfo: function() {
            return this.deviceInfo;
          },
          
          // 检查网络状态
          isOnline: function() {
            return navigator.onLine;
          },
          
          // 复制到剪贴板
          copyToClipboard: function(text) {
            if (navigator.clipboard && navigator.clipboard.writeText) {
              navigator.clipboard.writeText(text).then(function() {
                window.HarmonyOS.showToast('已复制到剪贴板');
              });
            } else {
              var textarea = document.createElement('textarea');
              textarea.value = text;
              textarea.style.position = 'fixed';
              textarea.style.opacity = '0';
              document.body.appendChild(textarea);
              textarea.select();
              document.execCommand('copy');
              document.body.removeChild(textarea);
              window.HarmonyOS.showToast('已复制到剪贴板');
            }
          }
        };
        
        // 标记为原生 App 环境
        window.isNativeApp = true;
        window.isHarmonyOS = true;
        window.nativeAppVersion = '3.0.0';
        
        // 添加 CSS 变量适配安全区域
        document.documentElement.style.setProperty('--safe-area-top', '${this.safeAreaTop}px');
        document.documentElement.style.setProperty('--safe-area-bottom', '${this.safeAreaBottom}px');
        
        // 禁用长按选择（提升体验）
        document.body.style.webkitUserSelect = 'none';
        document.body.style.userSelect = 'none';
        
        // 禁用橡皮筋效果
        document.body.style.overscrollBehavior = 'none';
        
        // 触发就绪事件
        var event = new CustomEvent('harmonyReady', { 
          detail: window.HarmonyOS.deviceInfo 
        });
        window.dispatchEvent(event);
        
        console.log('[HarmonyOS] Bridge v3.0 initialized');
        console.log('[HarmonyOS] Device:', JSON.stringify(window.HarmonyOS.deviceInfo));
      })();
    `;
    
    this.controller.runJavaScript(bridgeScript);
  }

  // 处理返回按钮（双击退出）
  onBackPress(): boolean {
    if (this.loadError) {
      return false;
    }
    
    if (this.controller.accessBackward()) {
      this.controller.backward();
      this.triggerVibration(30);
      return true;
    }
    
    // 双击退出
    const now = Date.now();
    if (now - this.lastBackTime < 2000) {
      return false;
    }
    
    this.lastBackTime = now;
    this.showToast('再按一次退出应用');
    return true;
  }
}
