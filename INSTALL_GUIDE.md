# 📱 学术英语精进 - 安装指南

**最新版本**: v4.9.3  
**更新日期**: 2025年12月4日

---

## 🌟 推荐方式: PWA 在线版 (所有平台)

### 适用于: iOS、Android、HarmonyOS、macOS、Windows

**优势**: 
- ✅ 无需下载安装包
- ✅ 自动更新到最新版
- ✅ 支持离线使用
- ✅ 体验接近原生应用

### 安装步骤:

#### **iOS/iPadOS (Safari)**
1. 使用 Safari 打开: https://kawea1.github.io/English-boost-app/
2. 点击底部 **分享** 按钮 <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16' height='16'%3E%3Cpath fill='%23007AFF' d='M12 2L8 6h3v8h2V6h3L12 2zm-6 14v4h12v-4h2v6H4v-6h2z'/%3E%3C/svg%3E" />
3. 选择 **"添加到主屏幕"**
4. 点击 **"添加"**
5. ✅ 完成! 在主屏幕找到应用图标

#### **Android (Chrome)**
1. 使用 Chrome 打开: https://kawea1.github.io/English-boost-app/
2. 点击右上角 **菜单** ⋮
3. 选择 **"添加到主屏幕"** 或 **"安装应用"**
4. 点击 **"安装"**
5. ✅ 完成! 应用已添加到桌面

#### **HarmonyOS (华为浏览器)**
1. 使用华为浏览器打开: https://kawea1.github.io/English-boost-app/
2. 点击底部 **"⋮"** 菜单
3. 选择 **"添加到桌面"**
4. 点击 **"添加"**
5. ✅ 完成! 应用已添加到桌面

#### **macOS (Safari/Chrome)**
1. 使用 Safari 或 Chrome 打开链接
2. Safari: **文件 → 添加到 Dock**
3. Chrome: **地址栏右侧 → 安装图标**
4. ✅ 完成! 应用已添加

#### **Windows (Edge/Chrome)**
1. 使用 Edge 或 Chrome 打开链接
2. 地址栏右侧点击 **"安装"** 图标
3. 点击 **"安装"**
4. ✅ 完成! 应用已添加到开始菜单

---

## 📦 本地构建安装 (开发者)

### iOS 版本 (需要 macOS)

```bash
# 1. 克隆仓库
git clone https://github.com/Kawea1/English-boost-app.git
cd English-boost-app

# 2. 运行构建脚本
./build-ios.sh

# 3. 在 Xcode 中运行到设备
```

**要求**:
- macOS 13.0+
- Xcode 14.0+
- CocoaPods
- iOS 13.0+ 设备

---

### Android 版本

```bash
# 1. 克隆仓库
git clone https://github.com/Kawea1/English-boost-app.git
cd English-boost-app

# 2. 运行构建脚本
./build-android-release.sh

# 3. 选择 "1) Debug APK"

# 4. 在 dist/android/ 目录找到 APK 文件
```

**要求**:
- Java JDK 11+
- Android Studio
- Android SDK 30+

**APK 位置**: `dist/android/app-debug.apk`

---

### HarmonyOS 版本

```bash
# 1. 克隆仓库
git clone https://github.com/Kawea1/English-boost-app.git
cd English-boost-app

# 2. 运行构建脚本
./build-harmony.sh

# 3. 选择 "1) 同步 Web 资源"

# 4. 选择 "2) 打开 DevEco Studio"

# 5. 在 DevEco Studio 中构建 HAP
```

**要求**:
- DevEco Studio 4.0+
- HarmonyOS SDK
- HarmonyOS 4.0+ 设备

---

## 🆘 常见问题

### Q1: PWA 安装后显示 404
**A**: 已在 v4.9.3 修复。如遇到问题:
1. 卸载旧版 PWA
2. 清除浏览器缓存
3. 重新访问链接安装

### Q2: iOS 无法添加到主屏幕
**A**: 确保:
- 使用 **Safari** 浏览器(Chrome 不支持)
- iOS 版本 13.0+
- 未使用隐私浏览模式

### Q3: Android 安装提示"未知来源"
**A**: 
1. 设置 → 安全 → 允许未知来源
2. 或使用 PWA 在线版,无需此权限

### Q4: 构建脚本报错
**A**: 检查:
- [ ] 网络连接正常
- [ ] 已安装所需开发工具
- [ ] 权限: `chmod +x build-*.sh`
- [ ] 查看 [BUILD_TEST_REPORT.md](./BUILD_TEST_REPORT.md)

### Q5: 如何更新到最新版
**A**: PWA 会自动更新。如需手动:
1. 打开应用
2. 下拉刷新
3. 如有更新会显示通知
4. 点击"立即更新"

---

## 📊 版本对比

| 方式 | 优点 | 缺点 | 推荐度 |
|------|------|------|--------|
| **PWA 在线版** | 免安装、自动更新、跨平台 | 首次需联网 | ⭐⭐⭐⭐⭐ |
| **iOS 本地** | 原生性能最佳 | 需开发者账号 | ⭐⭐⭐ |
| **Android APK** | 完全离线 | 手动更新 | ⭐⭐⭐⭐ |
| **HarmonyOS** | 鸿蒙生态优化 | 生态较新 | ⭐⭐⭐⭐ |

---

## 🔗 快速链接

- **在线使用**: https://kawea1.github.io/English-boost-app/
- **GitHub 仓库**: https://github.com/Kawea1/English-boost-app
- **问题反馈**: https://github.com/Kawea1/English-boost-app/issues
- **构建指南**: [BUILD_GUIDE.md](./BUILD_GUIDE.md)
- **更新日志**: [CHANGELOG.md](./CHANGELOG.md)

---

## 💡 使用建议

1. **首选 PWA 在线版** - 最方便、最稳定
2. **离线使用** - 首次打开后即可离线使用
3. **定期更新** - 保持应用最新获得最佳体验
4. **多设备同步** - 登录后数据云端同步

---

**祝学习愉快! 🎓**
