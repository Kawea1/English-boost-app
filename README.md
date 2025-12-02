<p align="center">
  <img src="assets/icon-192.png" width="128" height="128" alt="学术英语精进">
</p>

<h1 align="center">🎯 学术英语精进 Academic English Boost</h1>

<p align="center">
  <strong>专为 GRE/托福/学术英语学习者打造的一站式免费学习平台</strong>
</p>

<p align="center">
  <a href="https://kawea1.github.io/English-boost-app">
    <img src="https://img.shields.io/badge/🌐_在线使用-点击访问-4285f4?style=for-the-badge" alt="在线使用">
  </a>
</p>

<p align="center">
  <a href="https://github.com/Kawea1/English-boost-app/stargazers">
    <img src="https://img.shields.io/github/stars/Kawea1/English-boost-app?style=flat-square&color=yellow" alt="Stars">
  </a>
  <a href="https://github.com/Kawea1/English-boost-app/network/members">
    <img src="https://img.shields.io/github/forks/Kawea1/English-boost-app?style=flat-square&color=blue" alt="Forks">
  </a>
  <a href="https://github.com/Kawea1/English-boost-app/commits/main">
    <img src="https://img.shields.io/github/last-commit/Kawea1/English-boost-app?style=flat-square&color=green" alt="Last Commit">
  </a>
  <a href="https://github.com/Kawea1/English-boost-app/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Kawea1/English-boost-app?style=flat-square" alt="License">
  </a>
</p>

<p align="center">
  <a href="#-立即使用">🚀 立即使用</a> •
  <a href="#-功能特性">✨ 功能</a> •
  <a href="#-安装方式">📥 安装</a> •
  <a href="#-本地开发">💻 开发</a> •
  <a href="#-反馈与贡献">🤝 贡献</a>
</p>

---

## 🚀 立即使用

### 在线访问（推荐）

👉 **[https://kawea1.github.io/English-boost-app](https://kawea1.github.io/English-boost-app)**

无需下载，打开网页即可使用！支持手机、平板、电脑全平台。

### 添加到手机主屏幕（像App一样使用）

| 平台 | 操作步骤 |
|:---:|:---|
| **📱 iPhone/iPad** | Safari 打开上方链接 → 点击底部「分享」按钮 → 选择「添加到主屏幕」 |
| **🤖 Android** | Chrome 打开上方链接 → 点击右上角菜单 → 选择「添加到主屏幕」 |

> 💡 添加到主屏幕后，像原生 App 一样全屏使用，支持离线访问！每次打开自动获取最新内容。

---

## ✨ 功能特性

### 📖 核心词汇（10000+ 词）
- **多词库支持**：GRE 核心词、托福词汇、六级词汇、学术 570 词、高阶学术词汇
- **智能复习**：基于艾宾浩斯遗忘曲线，科学间隔重复
- **中英双语**：音标、例句、详细释义、词根词缀
- **真人发音**：美式英语语音合成

### 🎧 精听训练（50+ 材料）
- 学术讲座、TOEFL/GRE 风格听力材料
- 填空式听写练习，即时反馈
- 0.5x - 2.0x 可调语速

### 🎤 口语跟读（100+ 句子）
- 语音识别实时评分（0-100分）
- 原音 vs 录音对比播放
- 学术/商务/日常多场景覆盖

### 📰 阅读精读（100+ 文章）
- GRE/托福/学术期刊精选文章
- 理解题训练 + 核心词汇标注

### ✍️ 写作练习
- 多种考试题型（托福/GRE/雅思/考研/六级）
- 限时写作模式
- 范文参考与词汇提示

### 🔄 复习系统
- 7 个科学复习节点提醒
- 学习数据统计追踪
- 本地数据自动保存

### 🐾 学习伙伴（新功能）
- 可爱的虚拟宠物陪伴学习
- 10 种萌宠可选（小猫、小狗、熊猫等）
- 互动点击有惊喜

---

## 📥 安装方式

### 方式一：在线使用（零安装，推荐）

直接访问 **https://kawea1.github.io/English-boost-app**

### 方式二：克隆仓库（方便获取更新）

```bash
# 克隆仓库
git clone https://github.com/Kawea1/English-boost-app.git
cd English-boost-app

# 之后想更新到最新版，只需运行：
git pull
```

### 方式三：下载 ZIP

1. 点击本页面右上角绿色 **Code** 按钮
2. 选择 **Download ZIP**
3. 解压后用浏览器打开 `index.html`

---

## 💻 本地开发

```bash
# 克隆仓库
git clone https://github.com/Kawea1/English-boost-app.git
cd English-boost-app

# 启动本地服务器（任选其一）

# 方式1：Python
python -m http.server 8080

# 方式2：Node.js
npx serve .

# 方式3：VS Code Live Server 插件

# 然后访问 http://localhost:8080
```

### 项目结构

```
English-boost-app/
├── index.html          # 主页面
├── app.js              # 核心逻辑
├── styles.css          # 样式表
├── vocabulary.js       # 词汇模块
├── listening-module.js # 听力模块
├── writing-module.js   # 写作模块
├── ux-enhancements.js  # 用户体验增强
├── words.json          # 词库数据
├── assets/             # 图标资源
└── www/                # PWA 资源
```

---

## 🛠️ 技术栈

| 技术 | 用途 |
|:---:|:---:|
| **原生 JavaScript** | 核心逻辑 |
| **CSS3** | 界面样式 + 动画 |
| **PWA** | 离线访问 + 添加到主屏幕 |
| **Web Speech API** | 语音合成 + 语音识别 |
| **LocalStorage** | 本地数据存储 |
| **GitHub Pages** | 静态网站托管 |

---

## 🤝 反馈与贡献

### 发现问题或有建议？

1. [提交 Issue](https://github.com/Kawea1/English-boost-app/issues/new) 描述您遇到的问题
2. 或者直接 Fork 项目，修改后提交 Pull Request

### 支持项目

如果这个项目对您有帮助，欢迎：
- ⭐ 给项目点个 Star
- 📢 分享给需要的朋友
- 🐛 帮忙报告 Bug

---

## 📝 更新日志

### v2.0 (2024-12)
- ✨ 新增可爱宠物系统
- ✍️ 写作模块全面升级
- 🎨 UI 界面优化
- 🐛 修复若干问题

### v1.0 (2024-11)
- 🎉 首次发布
- 📖 词汇学习模块
- 🎧 听力训练模块
- 🎤 口语跟读模块
- 📰 阅读练习模块

---

## 📄 开源协议

[MIT License](LICENSE) - 自由使用，欢迎 Fork！

---

<p align="center">
  <sub>Made with ❤️ for English learners | 为英语学习者用心打造</sub>
</p>

<p align="center">
  <sub>如有问题，请 <a href="https://github.com/Kawea1/English-boost-app/issues">提交 Issue</a></sub>
</p>
