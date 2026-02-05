# iOS 本地安装包制作指南

## 前置要求

### 必需软件
1. **macOS** 系统（iOS开发必须在Mac上进行）
2. **Xcode** - 从 App Store 免费下载
3. **Node.js** - 从 nodejs.org 下载
4. **CocoaPods** - iOS依赖管理工具

### 开发者账号（可选）
- **免费账号**：可以安装到自己的设备（7天有效期）
- **付费账号**（$99/年）：可以分发给其他设备

---

## 快速开始

### 方法一：使用自动化脚本（推荐）

```bash
# 1. 克隆或下载项目
cd /path/to/english-boost-app

# 2. 安装依赖
npm install

# 3. 运行构建脚本
./build-ios-release.sh ipa
```

脚本会自动：
- 检查环境
- 同步Web资源
- 安装CocoaPods依赖
- 打开Xcode项目

### 方法二：手动步骤

#### 步骤1：准备环境

```bash
# 安装 CocoaPods（如果未安装）
sudo gem install cocoapods

# 安装项目依赖
npm install

# 安装 Capacitor CLI
npm install @capacitor/cli @capacitor/core @capacitor/ios
```

#### 步骤2：同步资源

```bash
# 创建 www 目录并复制文件
mkdir -p www
cp index.html styles.css app.js vocabulary.js dictionary.js www/
cp modules.js listening-module.js listening-data.js reading-data.js www/
cp sources.js online_sources.js sw.js manifest.json auth.js www/
cp words.json word_definitions.json word_chinese.json www/
cp -r assets www/

# Capacitor 同步
npx cap sync ios

# 安装 iOS 依赖
cd ios/App
pod install
cd ../..
```

#### 步骤3：在 Xcode 中打开项目

```bash
# 打开 Xcode 项目
open ios/App/App.xcworkspace
```

**注意**：必须打开 `.xcworkspace` 文件，不是 `.xcodeproj`

#### 步骤4：配置签名

1. 在 Xcode 中选择项目 "App"
2. 选择 "Signing & Capabilities" 标签
3. 勾选 "Automatically manage signing"
4. 选择你的 Team（Apple ID）
5. 修改 Bundle Identifier（如果需要）

#### 步骤5：构建和导出

**选项A：直接安装到设备**
1. 连接 iPhone/iPad 到 Mac
2. 在 Xcode 顶部选择你的设备
3. 点击 ▶️ 运行按钮
4. 首次安装需要在设备上信任开发者证书：
   - 设置 → 通用 → VPN与设备管理 → 信任

**选项B：导出 IPA 文件**
1. 选择 "Any iOS Device (arm64)" 作为目标
2. Product → Archive
3. 等待归档完成
4. 在 Organizer 窗口中选择归档
5. 点击 "Distribute App"
6. 选择 "Development" 或 "Ad Hoc"
7. 选择导出选项并导出

---

## 安装 IPA 到设备

### 方法1：使用 Apple Configurator 2（推荐）

1. 从 App Store 下载 Apple Configurator 2
2. 连接 iOS 设备到 Mac
3. 双击设备图标
4. 点击 "添加" → "应用"
5. 选择导出的 .ipa 文件
6. 等待安装完成

### 方法2：使用 Xcode Devices

1. Window → Devices and Simulators
2. 选择你的设备
3. 点击 "+" 按钮
4. 选择 .ipa 文件
5. 等待安装完成

### 方法3：使用命令行工具

```bash
# 安装 ios-deploy
npm install -g ios-deploy

# 安装 IPA
ios-deploy --bundle /path/to/App.ipa
```

---

## 常见问题

### Q: 提示 "Untrusted Developer"
**A:** 在设备上：设置 → 通用 → VPN与设备管理 → 选择开发者 → 信任

### Q: 应用闪退
**A:** 检查：
- 设备是否信任了开发者证书
- Bundle ID 是否正确
- 是否使用了正确的 provisioning profile

### Q: 免费账号的7天限制
**A:** 
- 每7天需要重新安装
- 或升级到付费开发者账号（$99/年）

### Q: 无法连接设备
**A:**
- 确保设备已解锁
- 信任此电脑
- 更新 iTunes/Finder

---

## 分发给其他用户

### 使用 TestFlight（需要付费账号）

1. 在 App Store Connect 创建应用
2. 上传构建版本
3. 添加测试用户
4. 用户通过 TestFlight 安装

### 使用 Ad Hoc 分发（需要付费账号）

1. 收集设备 UDID
2. 在开发者中心添加设备
3. 创建 Ad Hoc provisioning profile
4. 使用该 profile 导出 IPA
5. 通过 Apple Configurator 或其他工具安装

---

## 自动化脚本说明

项目包含的 `build-ios-release.sh` 脚本可以自动化大部分流程：

```bash
# 查看帮助
./build-ios-release.sh --help

# 仅同步资源
./build-ios-release.sh sync

# 打开 Xcode
./build-ios-release.sh open

# 完整构建流程
./build-ios-release.sh ipa
```

---

## 技术支持

如遇到问题：
1. 查看 Xcode 控制台日志
2. 检查 `ios/App/App/` 目录下的配置文件
3. 确保所有依赖都已正确安装
4. 参考 Apple 官方文档

---

## 相关文档

- [Capacitor iOS 文档](https://capacitorjs.com/docs/ios)
- [Apple 开发者文档](https://developer.apple.com/documentation/)
- [CocoaPods 指南](https://guides.cocoapods.org/)
