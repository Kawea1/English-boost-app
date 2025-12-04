# 📱 学术英语精进 - 安装指南

**最新版本**: v4.9.3  
**更新日期**: 2025年12月4日

---

## 🌟 推荐方式: PWA 在线版 (所有平台)

访问链接: **https://kawea1.github.io/English-boost-app/**

### iOS/iPadOS 
在 Safari 中打开链接 → 点击分享按钮 → 添加到主屏幕

### Android 
在 Chrome 中打开链接 → 点击菜单 → 添加到主屏幕

### HarmonyOS
在华为浏览器中打开链接 → 点击菜单 → 添加到桌面

### 电脑端 (Windows/macOS/Linux)
在浏览器中打开链接 → 地址栏右侧点击安装图标

---

## 📦 移动端安装包下载

### iOS 版本 (.ipa)
**下载链接**: [GitHub Releases](https://github.com/Kawea1/English-boost-app/releases)
- 文件名: `EnglishBoost-v4.9.3.ipa`
- 安装方式: 使用 AltStore、Sideloadly 或企业证书安装
- 要求: iOS 13.0+

### Android 版本 (.apk)
**下载链接**: [GitHub Releases](https://github.com/Kawea1/English-boost-app/releases)
- 文件名: `EnglishBoost-v4.9.3.apk`
- 安装方式: 直接安装（需允许未知来源）
- 要求: Android 6.0+

### HarmonyOS 版本 (.hap)
**下载链接**: [GitHub Releases](https://github.com/Kawea1/English-boost-app/releases)
- 文件名: `EnglishBoost-v4.9.3.hap`
- 安装方式: 使用 DevEco Studio 或华为应用市场
- 要求: HarmonyOS 2.0+

---

## 🔧 本地构建 (开发者)

### iOS 构建
```bash
git clone https://github.com/Kawea1/English-boost-app.git
cd English-boost-app
./build-ios.sh
```

### Android 构建
```bash
./build-android-release.sh
# 生成的 APK 位于 dist/android/
```

### HarmonyOS 构建
```bash
./build-harmony.sh
# 在 DevEco Studio 中打开项目构建
```

---

## ❓ 常见问题

**Q: 推荐使用哪种安装方式？**  
A: PWA 在线版（自动更新，无需下载安装包）

**Q: iOS 如何安装？**  
A: 优先使用 PWA。如需 .ipa 文件，从 GitHub Releases 下载

**Q: Android 提示"未知来源"？**  
A: 设置 → 安全 → 允许安装未知应用

**Q: 构建失败？**  
A: 查看 [BUILD_TEST_REPORT.md](./BUILD_TEST_REPORT.md)

---

## 📞 技术支持

- GitHub Issues: https://github.com/Kawea1/English-boost-app/issues
- 文档: https://github.com/Kawea1/English-boost-app

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
