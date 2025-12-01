# 📱 学术英语精进 - 多平台发布与下载指南

> 本应用支持 iOS、Android、HarmonyOS 三大移动平台，以及 PWA 和桌面应用

---

## 📋 目录

1. [快速开始](#快速开始)
2. [iOS 发布指南](#ios-发布指南)
3. [Android 发布指南](#android-发布指南)
4. [HarmonyOS 发布指南](#harmonyos-发布指南)
5. [PWA 部署指南](#pwa-部署指南)
6. [Desktop 桌面应用](#desktop-桌面应用)
7. [下载分发方案](#下载分发方案)
8. [常见问题](#常见问题)

---

## 🚀 快速开始

### 一键构建所有平台

```bash
# 给脚本添加执行权限
chmod +x build-multi-platform.sh

# 运行多平台构建工具
./build-multi-platform.sh
```

### 单独构建某个平台

```bash
./build-multi-platform.sh ios       # iOS
./build-multi-platform.sh android   # Android  
./build-multi-platform.sh harmony   # HarmonyOS
./build-multi-platform.sh pwa       # PWA 网页应用
./build-multi-platform.sh desktop   # 桌面应用
```

---

## 🍎 iOS 发布指南

### 环境要求
- macOS 操作系统
- Xcode 14.0+ (从 App Store 安装)
- Apple Developer 账号 ($99/年)
- CocoaPods (`sudo gem install cocoapods`)

### 构建步骤

```bash
# 1. 运行 iOS 构建脚本
./build-ios-release.sh

# 或使用统一入口
./build-multi-platform.sh ios
```

### 发布到 App Store

1. **准备工作**
   - 注册 Apple Developer Program
   - 在 App Store Connect 创建 App 记录
   - 准备应用截图 (iPhone 6.7", 6.5", iPad)
   - 准备应用描述、关键词、隐私政策 URL

2. **构建 Archive**
   ```
   Xcode → Product → Archive
   ```

3. **上传到 App Store Connect**
   ```
   Window → Organizer → Distribute App → App Store Connect
   ```

4. **提交审核**
   - 登录 App Store Connect
   - 填写版本信息
   - 提交审核（通常 1-3 天）

### TestFlight 测试

1. 构建并上传 Archive
2. 在 App Store Connect 添加测试员
3. 测试员收到邮件后下载 TestFlight 安装

### Ad-Hoc 分发

```bash
# 导出 IPA 文件
Xcode → Archive → Distribute App → Ad Hoc
```

可通过以下方式分发 IPA:
- 蒲公英 (pgyer.com)
- fir.im
- 企业 MDM

---

## 🤖 Android 发布指南

### 环境要求
- Java JDK 11+
- Android Studio (可选)
- Android SDK

### 构建步骤

```bash
# 1. 运行 Android 构建脚本
./build-android-release.sh

# 选择:
# 1) Debug APK - 开发测试
# 2) Release APK - 正式发布
# 3) AAB - Google Play 发布
```

### 创建签名密钥

```bash
./build-android-release.sh
# 选择 4) 创建签名密钥
```

或手动创建:
```bash
keytool -genkey -v \
  -keystore release-key.keystore \
  -keyalg RSA -keysize 2048 \
  -validity 10000 \
  -alias academic-english
```

### 发布到 Google Play

1. **准备工作**
   - 注册 Google Play Console ($25 一次性)
   - 准备应用截图、描述、隐私政策

2. **上传 AAB**
   ```bash
   ./build-android-release.sh
   # 选择 3) Release AAB
   ```

3. **提交审核**
   - 登录 Google Play Console
   - 创建应用 → 上传 AAB
   - 填写信息 → 提交审核

### 国内应用商店发布

| 应用商店 | 网址 | 特点 |
|---------|------|------|
| 华为应用市场 | developer.huawei.com | 华为设备首选 |
| 小米应用商店 | dev.mi.com | 小米设备首选 |
| OPPO 应用商店 | open.oppomobile.com | OPPO/一加设备 |
| vivo 应用商店 | dev.vivo.com.cn | vivo 设备 |
| 应用宝 | open.qq.com | 腾讯渠道 |
| 酷安 | coolapk.com | 极客社区 |

### APK 直接分发

```bash
# 构建 Release APK
./build-android-release.sh
# 选择 2) Release APK

# 输出位置
dist/android/academic-english-v1.0.0.apk
```

分发方式:
- 直接分享 APK 文件
- 蒲公英 (pgyer.com)
- fir.im
- 自建下载页面

---

## 🔷 HarmonyOS 发布指南

### 环境要求
- DevEco Studio 4.0+ (从华为开发者联盟下载)
- HarmonyOS SDK
- 华为开发者账号

### 安装 DevEco Studio

1. 访问 https://developer.harmonyos.com/cn/develop/deveco-studio
2. 下载并安装 DevEco Studio
3. 启动后配置 SDK

### 构建步骤

```bash
# 1. 同步 Web 资源
./build-harmony.sh sync

# 2. 打开 DevEco Studio
./build-harmony.sh open

# 或使用统一入口
./build-multi-platform.sh harmony
```

### 在 DevEco Studio 中构建

1. **开发调试**
   - 连接华为手机（需开启开发者选项）
   - 或使用 Remote Emulator
   - 点击 ▶ 运行

2. **构建 HAP**
   ```
   Build → Build Hap(s)/App(s) → Build Hap(s)
   ```

### 发布到华为应用市场

1. **注册开发者**
   - 访问 https://developer.huawei.com
   - 完成企业/个人认证

2. **创建应用**
   - 登录 AppGallery Connect
   - 我的项目 → 添加项目

3. **签名配置**
   - DevEco Studio → Build → Generate Key and CSR
   - AppGallery Connect 申请发布证书

4. **上传 HAP/APP**
   - 我的应用 → 版本管理 → 上传

5. **提交审核**
   - 填写应用信息
   - 上传截图
   - 提交审核

---

## 🌐 PWA 部署指南

PWA (Progressive Web App) 可以直接通过浏览器访问，并添加到手机主屏幕。

### 本地测试

```bash
# 启动本地服务器
python3 -m http.server 8000

# 访问
open http://localhost:8000
```

### 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel

# 按提示操作即可
```

### 部署到 GitHub Pages

1. 创建 `gh-pages` 分支
2. 将 `www` 目录内容推送到该分支
3. 在仓库 Settings → Pages 启用

### 添加到主屏幕

**iOS Safari:**
1. 访问 PWA 网址
2. 点击分享按钮 📤
3. 选择「添加到主屏幕」

**Android Chrome:**
1. 访问 PWA 网址
2. 点击菜单 ⋮
3. 选择「添加到主屏幕」

---

## 💻 Desktop 桌面应用

基于 Electron 构建的桌面应用。

### 构建命令

```bash
# macOS
npm run build:mac

# Windows
npm run build:win

# Linux
npm run build:linux

# 全平台
npm run build:all
```

### 输出位置

```
dist/
├── 学术英语精进-1.0.0.dmg      # macOS
├── 学术英语精进 Setup 1.0.0.exe # Windows
└── 学术英语精进-1.0.0.AppImage  # Linux
```

---

## 📥 下载分发方案

### 方案一：自建下载页面

创建一个简单的下载页面，托管到 GitHub Pages 或其他静态托管服务。

```html
<!DOCTYPE html>
<html>
<head>
    <title>学术英语精进 - 下载</title>
</head>
<body>
    <h1>📚 学术英语精进</h1>
    <p>GRE · 托福 · 学术英语学习</p>
    
    <h2>下载应用</h2>
    <ul>
        <li><a href="ios-link">🍎 iOS (App Store)</a></li>
        <li><a href="android-apk-link">🤖 Android (APK 直装)</a></li>
        <li><a href="harmony-link">🔷 HarmonyOS (华为应用市场)</a></li>
        <li><a href="pwa-link">🌐 网页版 (PWA)</a></li>
    </ul>
</body>
</html>
```

### 方案二：使用第三方分发平台

| 平台 | 特点 | 网址 |
|------|------|------|
| 蒲公英 | 支持 iOS/Android，扫码下载 | pgyer.com |
| fir.im | 免费额度较大 | fir.im |
| 酷安 | Android 社区分发 | coolapk.com |

### 方案三：应用商店

| 平台 | 商店 | 费用 |
|------|------|------|
| iOS | App Store | $99/年 |
| Android | Google Play | $25 一次性 |
| Android | 华为/小米/OPPO/vivo | 免费 |
| HarmonyOS | 华为应用市场 | 免费 |

---

## ❓ 常见问题

### Q: iOS 构建失败，提示签名问题？
A: 需要在 Xcode 中配置 Signing & Capabilities，选择你的 Apple Developer Team。

### Q: Android 构建失败，提示 SDK 版本问题？
A: 检查 `android/variables.gradle` 中的 SDK 版本配置，确保与本地安装的 SDK 版本匹配。

### Q: HarmonyOS 如何在真机调试？
A: 需要在华为手机设置中开启「开发者选项」和「USB 调试」，然后用 USB 连接电脑。

### Q: PWA 离线功能不生效？
A: 确保 Service Worker (sw.js) 正确注册，并且资源已缓存。首次访问需要联网。

### Q: 如何更新已发布的应用？
A: 
1. 修改 `package.json` 中的 version
2. 重新构建各平台包
3. 上传到各应用商店（会自动识别为更新）

---

## 📞 技术支持

如有问题，请提交 Issue 或联系开发团队。

---

*最后更新: 2024年12月*
