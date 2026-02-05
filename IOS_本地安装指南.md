# 📱 iOS 本地安装完整指南

## 🎯 快速开始（推荐）

### 方法一：直接运行到设备（最简单）

```bash
# 1. 运行构建脚本
./build-ios-local.sh

# 2. 在 Xcode 中：
#    - 连接 iPhone 到 Mac
#    - 选择你的设备
#    - 点击运行 ▶️
```

### 方法二：导出 IPA 安装包

```bash
# 1. 运行构建脚本
./build-ios-local.sh

# 2. 在 Xcode 中：
#    Product → Archive
#    Distribute App → Development
#    导出 IPA 文件
```

---

## 📋 详细步骤

### 第一步：环境准备

**必需工具：**
- ✅ macOS 系统
- ✅ Xcode（从 App Store 安装）
- ✅ Node.js（已安装）
- ⚠️ CocoaPods（可选，建议安装）

**安装 CocoaPods（推荐）：**
```bash
sudo gem install cocoapods
```

### 第二步：构建项目

```bash
# 运行自动化构建脚本
./build-ios-local.sh
```

脚本会自动：
- 📦 同步所有 Web 资源到 www 目录
- 📦 安装 npm 依赖
- 📦 同步 Capacitor iOS 项目
- 📦 安装 CocoaPods 依赖
- 🚀 打开 Xcode 工作空间

### 第三步：配置签名（首次必需）

在 Xcode 中：

1. **选择项目**
   - 点击左侧 `App` 项目

2. **配置签名**
   - 选择 `Signing & Capabilities` 标签
   - Team: 选择你的 Apple ID
   - Bundle Identifier: 保持默认或修改

3. **信任开发者证书**（首次安装）
   - 设备上：设置 → 通用 → VPN与设备管理
   - 点击你的开发者账号
   - 点击"信任"

### 第四步：安装到设备

#### 选项 A：直接运行（推荐）

1. 用数据线连接 iPhone 到 Mac
2. 在 Xcode 顶部选择你的设备
3. 点击运行按钮 ▶️
4. 应用会自动安装并启动

#### 选项 B：导出 IPA 文件

1. **创建归档**
   ```
   Product → Archive
   ```
   等待构建完成

2. **导出 IPA**
   - 点击 `Distribute App`
   - 选择 `Development` 或 `Ad Hoc`
   - 选择签名选项
   - 导出到文件夹

3. **安装 IPA**
   - 使用 Apple Configurator 2
   - 或使用 Xcode: Window → Devices and Simulators
   - 拖拽 IPA 到设备

---

## 🔧 常见问题

### Q1: "No signing certificate found"

**解决方案：**
1. 打开 Xcode Preferences → Accounts
2. 添加你的 Apple ID
3. 点击 "Download Manual Profiles"

### Q2: "Untrusted Developer"

**解决方案：**
在 iPhone 上：
```
设置 → 通用 → VPN与设备管理 → 信任开发者
```

### Q3: CocoaPods 安装失败

**解决方案：**
```bash
# 更新 CocoaPods
sudo gem install cocoapods

# 清理缓存
cd ios/App
pod cache clean --all
pod install
```

### Q4: 构建失败

**解决方案：**
```bash
# 清理项目
cd ios/App
xcodebuild clean

# 重新构建
cd ../..
./build-ios-local.sh
```

---

## 📱 设备要求

- iOS 13.0 或更高版本
- iPhone 或 iPad
- 开发者模式已启用（iOS 16+）

---

## 🎓 进阶选项

### 自定义配置

编辑 `capacitor.config.ts`：
```typescript
{
  appId: 'com.yourcompany.app',
  appName: '你的应用名称',
  // ...
}
```

### 修改图标和启动画面

替换文件：
```
ios/App/App/Assets.xcassets/AppIcon.appiconset/
ios/App/App/Assets.xcassets/Splash.imageset/
```

---

## 📞 获取帮助

如遇问题：
1. 查看 Xcode 控制台错误信息
2. 检查 `build-ios-local.sh` 输出
3. 参考 Apple 开发者文档

---

## ✅ 验证安装

安装成功后，应用应该：
- ✅ 在设备主屏幕显示图标
- ✅ 可以正常启动
- ✅ 所有功能正常工作
- ✅ 数据可以正常保存

---

**祝你使用愉快！🎉**
