# 学术英语精进 - 全平台构建指南

## 📦 已构建的安装包

### 🖥️ 桌面端
| 平台 | 文件 | 状态 |
|------|------|------|
| macOS | `dist/学术英语精进-1.0.0.dmg` | ✅ 已构建 |
| Windows | `dist/学术英语精进 Setup 1.0.0.exe` | ✅ 已构建 |
| Windows 便携版 | `dist/学术英语精进 1.0.0.exe` | ✅ 已构建 |
| Linux | `dist/学术英语精进-*.AppImage` | 🔧 需构建 |

### 📱 移动端
| 平台 | 项目目录 | 状态 |
|------|----------|------|
| iOS | `ios/` | ✅ 已创建 (需 Xcode 编译) |
| Android | `android/` | ✅ 已创建 (需 Android Studio 编译) |
| 鸿蒙 | `harmony/` | ✅ 已创建 (需 DevEco Studio 编译) |

---

## 🚀 快速构建命令

```bash
# 交互式全平台构建菜单
./build-all.sh

# 或使用 npm 命令:
npm run build:mac      # macOS
npm run build:win      # Windows
npm run build:linux    # Linux
npm run ios:open       # 打开 Xcode
npm run android:open   # 打开 Android Studio
npm run sync           # 同步 Web 资源到所有平台
```

---

## 🍎 iOS 构建步骤

### 前置要求
1. 安装 **Xcode** (从 App Store)
2. 安装 **CocoaPods**: `sudo gem install cocoapods`
3. 配置: `sudo xcode-select -s /Applications/Xcode.app/Contents/Developer`

### 构建
```bash
npm run sync && npm run ios:open
```
在 Xcode 中选择开发团队 → 连接设备 → ▶ 运行

---

## 🤖 Android 构建步骤

### 前置要求
安装 **Android Studio**: https://developer.android.com/studio

### 构建
```bash
npm run sync && npm run android:open
```
等待 Gradle 同步 → 连接设备 → ▶ 运行

### 生成 APK
```bash
cd android && ./gradlew assembleDebug
# 输出: android/app/build/outputs/apk/debug/app-debug.apk
```

---

## 🔷 鸿蒙 HarmonyOS 构建步骤

### 前置要求
安装 **DevEco Studio**: https://developer.harmonyos.com/cn/develop/deveco-studio

### 构建
1. 打开 DevEco Studio
2. File → Open → 选择 `harmony` 目录
3. 连接华为/荣耀设备 → ▶ 运行

---

## 📁 项目结构

```
├── dist/           # 桌面端安装包
├── ios/            # iOS 项目
├── android/        # Android 项目  
├── harmony/        # 鸿蒙项目
├── www/            # 移动端 Web 资源
├── build-all.sh    # 全平台构建脚本
└── deploy.sh       # 自动部署脚本
```
