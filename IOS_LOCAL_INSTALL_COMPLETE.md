# iOS 本地安装完整指南

## 📋 目录
1. [环境准备](#环境准备)
2. [快速构建](#快速构建)
3. [本地安装方法](#本地安装方法)
4. [常见问题](#常见问题)

---

## 🔧 环境准备

### 必需软件

#### 1. 安装 Xcode
```bash
# 方法 1: 从 App Store 安装（推荐）
# 打开 App Store，搜索 "Xcode"，点击安装
# 大小约 12GB，需要一些时间

# 方法 2: 从 Apple Developer 下载
# https://developer.apple.com/xcode/
```

安装后验证：
```bash
xcode-select -p
# 应输出: /Applications/Xcode.app/Contents/Developer
```

#### 2. 安装 Command Line Tools
```bash
xcode-select --install
```

#### 3. 安装 CocoaPods
```bash
sudo gem install cocoapods
```

#### 4. 验证 Node.js
```bash
node -v  # 应显示版本号
npm -v   # 应显示版本号
```

---

## 🚀 快速构建

### 方法 1: 使用自动化脚本（推荐）

```bash
# 1. 赋予执行权限
chmod +x build-ios-release.sh

# 2. 运行构建脚本
./build-ios-release.sh

# 3. 选择选项 4 "导出 IPA 文件"
```

### 方法 2: 手动构建步骤

#### 步骤 1: 同步 Web 资源
```bash
# 创建 www 目录
mkdir -p www

# 复制核心文件
cp index.html styles.css app.js vocabulary.js dictionary.js modules.js www/
cp listening-module.js listening-data.js reading-data.js sources.js www/
cp fsrs-algorithm.js auth.js subscription.js activation.js www/
cp writing-module.js writing-data.js speaking-data.js ux-enhancements.js www/
cp online_sources.js vocabulary-improvements.js vocabulary-review-list.js www/
cp manifest.json sw.js version.json www/
cp *.json www/ 2>/dev/null || true
cp -r assets www/ 2>/dev/null || true
```

#### 步骤 2: 安装依赖
```bash
npm install
npx cap sync ios
```

#### 步骤 3: 安装 iOS 依赖
```bash
cd ios/App
pod install
cd ../..
```

#### 步骤 4: 在 Xcode 中打开项目
```bash
open ios/App/App.xcworkspace
```

#### 步骤 5: 配置签名
1. 在 Xcode 中选择项目 "App"
2. 选择 "Signing & Capabilities" 标签
3. 勾选 "Automatically manage signing"
4. 选择你的 Apple ID 团队

#### 步骤 6: 构建归档
1. 在 Xcode 菜单栏选择 Product > Archive
2. 等待构建完成（可能需要几分钟）

#### 步骤 7: 导出 IPA
1. 归档完成后，会自动打开 Organizer 窗口
2. 选择刚才创建的归档
3. 点击 "Distribute App"
4. 选择 "Development" 或 "Ad Hoc"
5. 选择导出选项，点击 "Next"
6. 选择保存位置，导出 IPA 文件

---

## 📱 本地安装方法

### 方法 1: 使用 Xcode 直接安装（最简单）

```bash
# 1. 连接 iPhone 到 Mac
# 2. 在 Xcode 中选择你的设备
# 3. 点击运行按钮 (▶️)
# 应用会自动安装到设备上
```

### 方法 2: 使用 Apple Configurator（推荐用于多设备）

1. 从 App Store 安装 Apple Configurator
2. 连接 iPhone 到 Mac
3. 打开 Apple Configurator
4. 选择设备
5. 点击 "添加" > "应用"
6. 选择导出的 IPA 文件
7. 应用会自动安装

### 方法 3: 使用 ios-deploy（命令行）

```bash
# 安装 ios-deploy
npm install -g ios-deploy

# 安装 IPA 到连接的设备
ios-deploy --bundle path/to/your/app.ipa
```

### 方法 4: 使用 TestFlight（适合测试分发）

1. 在 App Store Connect 创建应用
2. 上传 IPA 到 TestFlight
3. 邀请测试用户
4. 用户通过 TestFlight 应用安装

### 方法 5: 使用 AltStore（无需开发者账号）

```bash
# 1. 在 Mac 上安装 AltServer
# 下载: https://altstore.io

# 2. 在 iPhone 上安装 AltStore 应用

# 3. 通过 AltStore 安装 IPA
# - 将 IPA 文件传输到 iPhone
# - 在 AltStore 中打开 IPA 文件
# - 点击安装
```

---

## 🔐 签名和证书

### 开发者证书（免费）
- 使用个人 Apple ID
- 应用有效期 7 天
- 需要每周重新签名

### 付费开发者账号
- 年费 $99 USD
- 应用有效期 1 年
- 可以分发给其他设备

### 企业证书
- 年费 $299 USD
- 可以内部分发
- 不需要通过 App Store

---

## 📦 IPA 文件位置

构建完成后，IPA 文件通常位于：

```
~/Library/Developer/Xcode/Archives/[日期]/App [时间]/Products/Applications/App.ipa
```

或者通过脚本导出到：
```
./ios-builds/App_[版本]_[日期].ipa
```

---

## ⚠️ 常见问题

### 1. "Xcode 未安装"
**解决方案**: 从 App Store 安装 Xcode

### 2. "无法验证开发者"
**解决方案**: 
```
设置 > 通用 > VPN与设备管理 > 信任开发者
```

### 3. "签名失败"
**解决方案**:
- 确保 Bundle ID 唯一
- 检查证书是否有效
- 尝试清理构建: Product > Clean Build Folder

### 4. "Pod install 失败"
**解决方案**:
```bash
cd ios/App
pod repo update
pod install
```

### 5. "设备不受信任"
**解决方案**:
- 在 iPhone 上点击"信任此电脑"
- 在 Mac 上打开 Xcode > Window > Devices and Simulators
- 右键点击设备 > "Show Provisioning Profiles"

### 6. "应用闪退"
**解决方案**:
- 检查 Xcode 控制台日志
- 确保所有资源文件已正确复制到 www 目录
- 验证 capacitor.config.ts 配置

---

## 🎯 快速开始检查清单

- [ ] 安装 Xcode
- [ ] 安装 Command Line Tools
- [ ] 安装 CocoaPods
- [ ] 验证 Node.js 和 npm
- [ ] 运行 `npm install`
- [ ] 同步 Web 资源到 www 目录
- [ ] 运行 `npx cap sync ios`
- [ ] 安装 iOS 依赖 `pod install`
- [ ] 在 Xcode 中配置签名
- [ ] 构建归档
- [ ] 导出 IPA
- [ ] 安装到设备

---

## 📞 获取帮助

如果遇到问题：
1. 查看 Xcode 控制台日志
2. 检查 `ios/App/App/Info.plist` 配置
3. 验证 `capacitor.config.ts` 设置
4. 查看 Capacitor 官方文档: https://capacitorjs.com/docs/ios

---

## 🔄 更新应用

当需要更新应用时：

```bash
# 1. 更新 Web 资源
cp [更新的文件] www/

# 2. 同步到 iOS
npx cap sync ios

# 3. 重新构建
./build-ios-release.sh
```

---

## 📝 注意事项

1. **首次构建**: 可能需要 10-20 分钟
2. **网络要求**: 需要下载 CocoaPods 依赖
3. **磁盘空间**: 至少需要 15GB 可用空间
4. **系统要求**: macOS 12.0 或更高版本
5. **设备要求**: iOS 13.0 或更高版本

---

## 🎉 完成

按照以上步骤，你应该能够成功构建并安装 iOS 应用到你的设备上。

如果一切顺利，你将看到"学术英语精进"应用图标出现在你的 iPhone 主屏幕上！
