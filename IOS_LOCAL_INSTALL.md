# iOS 本地安装指南

## 快速安装步骤

### 方式一：使用构建脚本（推荐）

1. **运行构建脚本**
```bash
./build-ios-release.sh
```

2. **选择选项 4** - 导出 IPA 文件

3. **在 Xcode 中操作**：
   - Product → Archive
   - Window → Organizer → Distribute App
   - 选择 **Ad Hoc** 或 **Development**
   - 导出 IPA 文件到 `dist/ios/` 目录

### 方式二：直接命令行构建

```bash
# 1. 同步资源
./build-ios-release.sh sync

# 2. 打开 Xcode 项目
open ios/App/App.xcworkspace

# 3. 在 Xcode 中：
#    - 选择真机设备
#    - Product → Archive
#    - Distribute App → Ad Hoc
```

## 安装到设备

### 方法 1：Apple Configurator 2（官方工具）

1. 从 Mac App Store 下载 **Apple Configurator 2**
2. 用数据线连接 iPhone/iPad
3. 将 IPA 文件拖入设备
4. 在设备上：设置 → 通用 → VPN与设备管理 → 信任开发者

### 方法 2：Xcode 直接安装

```bash
# 连接设备后
xcrun devicectl device install app --device <设备ID> dist/ios/App.ipa
```

### 方法 3：第三方分发平台

上传 IPA 到：
- **蒲公英**: https://www.pgyer.com
- **fir.im**: https://fir.im
- **TestFlight**: 需要 Apple Developer 账号

## 前置要求

- macOS 系统
- Xcode 14+ 已安装
- Apple ID（免费开发者账号即可）
- iOS 设备（iPhone/iPad）

## 首次配置

1. **在 Xcode 中设置签名**：
   - 打开 `ios/App/App.xcworkspace`
   - 选择 App target
   - Signing & Capabilities → Team → 选择你的 Apple ID

2. **添加设备 UDID**（Ad Hoc 分发需要）：
   - 连接设备到 Mac
   - Xcode → Window → Devices and Simulators
   - 复制 Identifier (UDID)
   - 在 Apple Developer 网站添加设备

## 故障排除

### 问题：无法安装 IPA
- 确认设备 UDID 已添加到配置文件
- 检查证书是否过期
- 在设备上信任开发者证书

### 问题：应用闪退
- 检查 Xcode Console 日志
- 确认所有依赖已正确安装：`cd ios/App && pod install`

### 问题：签名失败
- 确保 Apple ID 已登录 Xcode
- 尝试自动签名：Signing & Capabilities → Automatically manage signing

## 快速测试（无需导出 IPA）

```bash
# 1. 连接设备
# 2. 运行
./build-ios-release.sh debug

# 3. 在 Xcode 中点击运行按钮 ▶
```

## 注意事项

- **免费 Apple ID** 限制：
  - 每 7 天需重新签名
  - 最多 3 个应用
  - 无法使用推送通知等高级功能

- **付费开发者账号** ($99/年)：
  - 无时间限制
  - 可上传 TestFlight 和 App Store
  - 支持所有功能

## 相关文档

- [完整构建指南](./BUILD_GUIDE.md)
- [发布指南](./RELEASE_GUIDE.md)
- [打包指南](./PACKAGING_GUIDE.md)
