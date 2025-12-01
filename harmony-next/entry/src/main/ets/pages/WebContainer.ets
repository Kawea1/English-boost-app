import web_webview from '@ohos.web.webview';
import hilog from '@ohos.hilog';
import common from '@ohos.app.ability.common';
import abilityAccessCtrl from '@ohos.abilityAccessCtrl';

/**
 * 学术英语精进 - WebView 容器页面
 * 加载 PWA Web 应用
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
  
  // 是否可以返回
  @State canGoBack: boolean = false;

  aboutToAppear(): void {
    // 初始化 WebView 设置
    web_webview.WebviewController.setWebDebuggingAccess(true);
    
    // 请求麦克风权限（用于口语练习）
    this.requestMicrophonePermission();
  }

  // 请求麦克风权限
  async requestMicrophonePermission(): Promise<void> {
    try {
      const context = getContext(this) as common.UIAbilityContext;
      const atManager = abilityAccessCtrl.createAtManager();
      
      const result = await atManager.requestPermissionsFromUser(context, [
        'ohos.permission.MICROPHONE'
      ]);
      
      hilog.info(0x0000, 'AcademicEnglish', 'Microphone permission result: %{public}s', 
        JSON.stringify(result));
    } catch (err) {
      hilog.error(0x0000, 'AcademicEnglish', 'Failed to request permission: %{public}s', 
        JSON.stringify(err));
    }
  }

  build() {
    Stack({ alignContent: Alignment.Top }) {
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
        // 允许地理位置
        .geolocationAccess(true)
        // 页面开始加载
        .onPageBegin((event) => {
          this.isLoading = true;
          this.loadProgress = 0;
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
            // 自动授予权限（麦克风等）
            event.request.grant(event.request.getAccessibleResource());
            hilog.info(0x0000, 'AcademicEnglish', 'Permission granted');
          }
        })
        // 错误处理
        .onErrorReceive((event) => {
          hilog.error(0x0000, 'AcademicEnglish', 'Error: %{public}s', 
            JSON.stringify(event?.error) ?? '');
        })
        // JS 消息处理
        .onConsole((event) => {
          hilog.info(0x0000, 'AcademicEnglish', 'Console: %{public}s', 
            event?.message?.getMessage() ?? '');
          return false;
        })
      
      // 加载进度条
      if (this.isLoading) {
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
    .height('100%')
  }

  // 注入 HarmonyOS 桥接代码
  private injectBridge(): void {
    const bridgeScript = `
      // HarmonyOS Bridge
      window.HarmonyOS = {
        isHarmony: true,
        version: '1.0.0',
        
        // 震动反馈
        vibrate: function(duration) {
          // 通过 postMessage 与原生通信
          window.postMessage({ type: 'vibrate', duration: duration }, '*');
        },
        
        // 显示 Toast
        showToast: function(message) {
          window.postMessage({ type: 'toast', message: message }, '*');
        },
        
        // 获取系统信息
        getSystemInfo: function() {
          return {
            platform: 'HarmonyOS',
            brand: 'Huawei',
            model: 'Unknown'
          };
        }
      };
      
      // 标记为原生 App 环境
      window.isNativeApp = true;
      window.isHarmonyOS = true;
      
      console.log('[HarmonyOS] Bridge injected successfully');
    `;
    
    this.controller.runJavaScript(bridgeScript);
  }

  // 处理返回按钮
  onBackPress(): boolean {
    if (this.controller.accessBackward()) {
      this.controller.backward();
      return true;
    }
    return false;
  }
}
