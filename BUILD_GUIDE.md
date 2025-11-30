# 🎓 学术英语精进 - 桌面应用打包指南

## 📱 应用介绍

**学术英语精进** 是一款专为 GRE、托福和学术英语学习设计的应用，支持：
- 📚 词汇训练（含 570+ 学术词汇）
- 🎧 听力练习
- 📖 阅读精讲（100+ 学术文章）
- 🗣️ 口语跟读
- 📝 学习资源推荐

## 🖥️ 打包成桌面应用

### 前置要求

1. **安装 Node.js**（v18 或更高）
   - macOS: `brew install node`
   - Windows: 从 https://nodejs.org/ 下载
   - Linux: `sudo apt install nodejs npm`

2. **验证安装**
   ```bash
   node -v  # 应显示 v18.x.x 或更高
   npm -v   # 应显示 9.x.x 或更高
   ```

### 快速打包

**方式一：使用脚本（推荐）**
```bash
# 添加执行权限
chmod +x build.sh

# 运行打包脚本
./build.sh
```

**方式二：手动打包**
```bash
# 1. 安装依赖
npm install

# 2. 打包（选择你的平台）
npm run build:mac    # macOS
npm run build:win    # Windows
npm run build:linux  # Linux

# 或打包全平台
npm run build:all
```

### 打包输出

打包完成后，安装文件位于 `dist/` 目录：

| 平台 | 文件类型 | 说明 |
|------|---------|------|
| macOS | `.dmg` | 双击打开，拖入 Applications |
| Windows | `.exe` | 安装程序，双击安装 |
| Windows | `portable.exe` | 便携版，无需安装 |
| Linux | `.AppImage` | 添加执行权限后运行 |
| Linux | `.deb` | Debian/Ubuntu 软件包 |

## 📲 其他安装方式

### PWA 安装（无需打包）

用户可以直接通过浏览器安装 PWA：

1. 使用 Chrome/Edge 访问应用网址
2. 点击地址栏右侧的 "安装" 图标
3. 确认安装

PWA 优势：
- ✅ 无需下载大文件
- ✅ 自动更新
- ✅ 离线可用
- ✅ 跨平台

### GitHub Pages 部署

```bash
# 推送到 GitHub
git add .
git commit -m "Update app"
git push origin main

# 在 GitHub 仓库设置中启用 Pages
# Settings → Pages → Source: main branch
```

## 🔧 开发模式

```bash
# 启动开发服务器
npm start

# 或使用 Python 服务器
python3 server.py
```

## 📁 项目结构

```
english-boost-app/
├── index.html          # 主页面
├── styles.css          # 样式表
├── app.js              # 主应用逻辑
├── modules.js          # 功能模块
├── vocabulary.js       # 词汇模块
├── reading-data.js     # 阅读数据
├── listening-data.js   # 听力数据
├── main.js             # Electron 主进程
├── package.json        # 项目配置
├── manifest.json       # PWA 配置
├── sw.js               # Service Worker
├── server.py           # 本地服务器
├── build.sh            # 打包脚本
└── assets/             # 图标资源
    └── icon.svg        # 应用图标
```

## ❓ 常见问题

### Q: 打包时提示缺少图标？
A: 需要将 `assets/icon.svg` 转换为对应格式：
- macOS: `.icns`（使用 iconutil）
- Windows: `.ico`（使用在线转换工具）
- Linux: `.png`（512x512）

### Q: Windows 打包需要代码签名？
A: 非签名版本会触发 SmartScreen 警告，用户可以选择"仍要运行"。
   正式发布建议购买代码签名证书。

### Q: 应用体积太大？
A: Electron 打包后约 150-200MB，这是正常的。
   如需更小体积，可考虑使用 Tauri 替代。

## 📞 技术支持

如有问题，请联系开发团队或提交 Issue。

---

**版本**: 1.0.0  
**更新日期**: 2024
