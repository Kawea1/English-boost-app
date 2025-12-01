# 学术英语精进 - 平台原生功能改进文档

## 版本历史

### v1.0 → v2.0 (当前版本)

---

## Android 平台改进 (5个版本)

### 版本 1: 权限与 Manifest 增强
**文件**: `android/app/src/main/AndroidManifest.xml`

**改进内容**:
- ✅ 添加麦克风权限 (`RECORD_AUDIO`) - 口语练习
- ✅ 添加音频设置权限 (`MODIFY_AUDIO_SETTINGS`)
- ✅ 添加存储权限 (兼容 Android 13+)
- ✅ 添加振动权限 (`VIBRATE`) - 学习提醒
- ✅ 添加通知权限 (`POST_NOTIFICATIONS`)
- ✅ 添加前台服务权限 - 后台播放
- ✅ 添加开机启动权限 - 学习提醒恢复
- ✅ 配置 Deep Links (englishboost://)
- ✅ 屏幕方向锁定为竖屏
- ✅ 软键盘自适应调整

---

### 版本 2: MainActivity 增强
**文件**: `android/app/src/main/java/com/academic/english/MainActivity.java`

**改进内容**:
- ✅ 沉浸式状态栏 (透明状态栏 + 主题色)
- ✅ 自动权限请求 (麦克风、振动、通知)
- ✅ WebView 性能优化 (硬件加速)
- ✅ WebView 调试支持 (Debug 模式)
- ✅ 权限回调处理 (通知 JavaScript)
- ✅ 返回键处理优化 (WebView 历史优先)
- ✅ Android 11+ 新 API 适配
- ✅ 深色模式导航栏适配

---

### 版本 3: 资源与主题增强
**文件**: 
- `android/app/src/main/res/values/styles.xml`
- `android/app/src/main/res/values/colors.xml`
- `android/app/src/main/res/values/strings.xml`
- `android/app/src/main/res/values-night/colors.xml`

**改进内容**:
- ✅ 完整的蓝紫渐变色系定义
- ✅ 功能颜色 (成功/警告/错误/信息)
- ✅ 单词等级颜色区分
- ✅ 深色模式完整支持
- ✅ 启动页主题优化
- ✅ 对话框和底部 Sheet 样式
- ✅ 窗口动画配置
- ✅ 完整的中文字符串资源

---

### 版本 4: 网络与文件配置
**文件**:
- `android/app/src/main/res/xml/network_security_config.xml`
- `android/app/src/main/res/xml/file_paths.xml`
- `android/app/proguard-rules.pro`

**改进内容**:
- ✅ 网络安全配置 (开发/生产分离)
- ✅ 本地开发服务器白名单
- ✅ 证书信任配置
- ✅ 文件共享路径配置
- ✅ ProGuard 混淆规则
- ✅ Capacitor 混淆保护
- ✅ WebView JavaScript 接口保护

---

### 版本 5: 构建配置增强
**文件**: 
- `android/app/build.gradle`
- `android/app/src/main/java/com/academic/english/BootReceiver.java`
- `android/app/src/main/res/drawable/*.xml`

**改进内容**:
- ✅ 签名配置模板
- ✅ 产品风味 (Free/Premium)
- ✅ 构建类型优化 (Debug/Release)
- ✅ MultiDex 支持
- ✅ BuildConfig 字段
- ✅ Lint 配置
- ✅ 开机启动接收器 (学习提醒恢复)
- ✅ 通知渠道创建
- ✅ Drawable 资源 (渐变/圆角/按钮)

---

## iOS 平台改进 (5个版本)

### 版本 1: Info.plist 权限配置
**文件**: `ios/App/App/Info.plist`

**改进内容**:
- ✅ 麦克风权限说明 (中文)
- ✅ 语音识别权限说明
- ✅ 相机权限说明 (预留)
- ✅ 相册权限说明 (预留)
- ✅ 后台模式配置 (音频、fetch)
- ✅ App Transport Security 配置
- ✅ 文件共享功能
- ✅ URL Schemes 查询配置
- ✅ 屏幕方向配置 (仅竖屏)
- ✅ 状态栏样式配置

---

### 版本 2: AppDelegate 增强
**文件**: `ios/App/App/AppDelegate.swift`

**改进内容**:
- ✅ 音频会话配置 (播放+录音)
- ✅ 蓝牙耳机支持
- ✅ 推送通知配置
- ✅ APNs Device Token 处理
- ✅ Deep Links 处理
- ✅ Universal Links 支持
- ✅ 应用生命周期优化
- ✅ 学习进度保存触发
- ✅ 通知点击处理
- ✅ 模块导航桥接

---

### 版本 3: Podfile 配置增强
**文件**: `ios/App/Podfile`

**改进内容**:
- ✅ 常用 Pods 模板 (注释状态)
- ✅ 构建后处理配置
- ✅ 部署目标统一
- ✅ Swift 版本配置
- ✅ 代码签名配置 (CI/CD)
- ✅ 架构设置

---

### 版本 4: Capacitor 统一配置
**文件**: `capacitor.config.ts`

**改进内容**:
- ✅ iOS 特定配置 (scheme、contentInset)
- ✅ Android 特定配置 (混合模式、背景色)
- ✅ SplashScreen 插件配置
- ✅ StatusBar 插件配置
- ✅ Keyboard 插件配置
- ✅ 后台运行配置
- ✅ 服务器配置 (allowNavigation)

---

### 版本 5: 构建脚本与文档
**文件**: 
- `build-ios-release.sh`
- `build-android-release.sh`
- `RELEASE_GUIDE.md`

**改进内容**:
- ✅ iOS 构建脚本 (Debug/TestFlight/App Store)
- ✅ Android 构建脚本 (APK/AAB)
- ✅ 多平台统一构建入口
- ✅ 完整的发布指南文档

---

## 文件清单

### Android 新增/修改文件

```
android/
├── app/
│   ├── build.gradle                    # [修改] 构建配置增强
│   ├── proguard-rules.pro              # [修改] 混淆规则
│   └── src/main/
│       ├── AndroidManifest.xml         # [修改] 权限和配置
│       ├── java/com/academic/english/
│       │   ├── MainActivity.java       # [修改] 主Activity增强
│       │   └── BootReceiver.java       # [新增] 开机接收器
│       └── res/
│           ├── drawable/
│           │   ├── dialog_background.xml       # [新增]
│           │   ├── bottom_sheet_background.xml # [新增]
│           │   ├── gradient_background.xml     # [新增]
│           │   └── button_primary_background.xml # [新增]
│           ├── values/
│           │   ├── colors.xml          # [新增] 颜色资源
│           │   ├── strings.xml         # [修改] 字符串资源
│           │   └── styles.xml          # [修改] 主题样式
│           ├── values-night/
│           │   └── colors.xml          # [新增] 深色模式颜色
│           └── xml/
│               ├── file_paths.xml      # [修改] 文件路径
│               └── network_security_config.xml # [新增]
```

### iOS 新增/修改文件

```
ios/
└── App/
    ├── App/
    │   ├── Info.plist                  # [修改] 权限配置
    │   └── AppDelegate.swift           # [修改] 应用代理
    └── Podfile                         # [修改] CocoaPods配置
```

### 通用配置文件

```
capacitor.config.ts                     # [修改] Capacitor配置
```

---

## 使用说明

### 同步配置到原生项目

```bash
# 同步 Web 资源到原生项目
npx cap sync

# 仅同步 iOS
npx cap sync ios

# 仅同步 Android
npx cap sync android
```

### 构建 Android

```bash
# Debug APK
./build-android-release.sh debug

# Release APK (需要签名配置)
./build-android-release.sh release

# AAB (Google Play)
./build-android-release.sh aab
```

### 构建 iOS

```bash
# Debug 构建
./build-ios-release.sh debug

# TestFlight
./build-ios-release.sh testflight

# App Store
./build-ios-release.sh appstore
```

---

## 注意事项

1. **Android 签名**: 发布前需要在 `build.gradle` 中配置签名信息
2. **iOS 证书**: 需要有效的 Apple Developer 账号和证书
3. **推送通知**: 需要配置 Firebase (Android) 和 APNs (iOS)
4. **Deep Links**: 需要在各应用商店配置 App Links / Universal Links

---

## 下一步计划

- [ ] 添加应用内更新检查
- [ ] 实现原生分享功能
- [ ] 添加 Widget 支持 (iOS 14+ / Android 12+)
- [ ] 实现 App Clips (iOS) / Instant Apps (Android)
- [ ] 添加 Siri Shortcuts / Google Assistant 集成
