import type { CapacitorConfig } from '@capacitor/cli';

/**
 * 学术英语精进 - Capacitor 配置 v5.0
 * 
 * v1.0 - 基础配置
 * v2.0 - iOS 安全区域适配
 * v3.0 - Android 全屏沉浸式
 * v4.0 - 启动页和状态栏优化
 * v5.0 - 完整的平台特性配置
 */
const config: CapacitorConfig = {
  appId: 'com.academic.english',
  appName: '学术英语精进',
  webDir: 'www',
  
  // 服务器配置
  server: {
    androidScheme: 'https',
    iosScheme: 'capacitor',
    // 允许导航到外部链接
    allowNavigation: ['*.academic-english.com'],
    // 清除缓存（开发时启用）
    // cleartext: true
  },
  
  // iOS 平台配置
  ios: {
    // 内容边距自动适配安全区域
    contentInset: 'automatic',
    // 滚动到顶部手势
    scrollEnabled: true,
    // 允许混合内容
    allowsLinkPreview: false,
    // 状态栏样式
    preferredContentMode: 'mobile',
    // 背景色
    backgroundColor: '#667eea',
    // WebView 配置
    webContentsDebuggingEnabled: true,
    // 键盘配置
    limitsNavigationsToAppBoundDomains: true
  },
  
  // Android 平台配置
  android: {
    // 背景色
    backgroundColor: '#667eea',
    // 允许混合内容
    allowMixedContent: true,
    // 捕获输入
    captureInput: true,
    // WebView 调试（开发时启用）
    webContentsDebuggingEnabled: true,
    // 初始焦点
    initialFocus: true,
    // 覆盖返回按钮
    overrideUserAgent: 'AcademicEnglish/1.0 (Android)',
    // 全屏模式
    // buildOptions: {
    //   keystorePath: '',
    //   keystorePassword: '',
    //   keystoreAlias: '',
    //   keystoreAliasPassword: ''
    // }
  },
  
  // 插件配置
  plugins: {
    // 启动页配置
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      launchFadeOutDuration: 500,
      backgroundColor: '#667eea',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    },
    
    // 状态栏配置
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#667eea'
    },
    
    // 键盘配置
    Keyboard: {
      resize: 'body',
      resizeOnFullScreen: true
    },
    
    // 本地通知
    LocalNotifications: {
      smallIcon: 'ic_stat_icon',
      iconColor: '#667eea'
    },
    
    // 推送通知（预留）
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert']
    }
  }
};

export default config;

