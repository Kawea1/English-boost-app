# 🎯 英语冲刺通 (English Boost App)

一款为 GRE、托福、六级等考试设计的全功能英语学习 PWA 应用。支持离线使用，可安装到手机主屏幕。

🌐 **在线访问**: [https://english-boost-app.vercel.app](https://english-boost-app.vercel.app)

## ✨ 功能特性

### 📖 核心词汇
- **10000+ 高频词汇**：GRE、托福、六级、学术570词
- **智能记忆系统**：艾宾浩斯遗忘曲线复习提醒
- **三级难度评分**：困难/一般/简单，自适应复习间隔
- **中英双语释义**：包含音标、例句、详细定义
- **真人发音**：美式英语 TTS 发音

### 🎧 精听训练
- **填空式听写**：边听边填，即时反馈
- **可调语速**：0.5x - 2.0x
- **答案解析**：完整句子对照

### 🎤 口语跟读
- **语音识别**：Web Speech API 实时识别
- **智能评分**：0-100 分相似度评分
- **发音对比**：原音 vs 录音对比

### 📰 阅读精读
- **100+ 精选文章**：GRE/托福/学术英语
- **理解题训练**：每篇配有选择题
- **核心词汇标注**：重点词汇表

### 🔄 复习巩固
- **科学复习计划**：7 个时间节点
- **学习统计**：已学/待复习/已掌握
- **进度追踪**：全面的数据统计

### 🌐 学习资源
- **在线资源整合**：TED、学术文章、音频
- **一键访问**：直接跳转原文

## 🚀 技术特点

- **纯静态部署**：无需后端服务器
- **PWA 支持**：离线可用，可安装到主屏幕
- **自动更新**：网络优先策略，始终获取最新版本
- **用户数据安全**：学习进度本地保存，更新不丢失

## 📱 技术栈

- HTML5 + CSS3 + Vanilla JavaScript
- Service Worker (PWA)
- Web Speech API
- Local Storage
- Vercel 静态托管

## 📁 项目结构

\`\`\`
english-boost-app/
├── index.html          # 主页面
├── styles.css          # 样式表
├── app.js              # 应用主逻辑
├── auth.js             # 认证系统
├── vocabulary.js       # 词汇模块
├── dictionary.js       # 字典功能
├── listening-module.js # 听力模块
├── modules.js          # 口语/阅读/资源/复习模块
├── quotes.js           # 名人名言（370+条）
├── sw.js               # Service Worker
├── manifest.json       # PWA 配置
├── vercel.json         # Vercel 部署配置
├── words.json          # 词汇数据库
├── word_chinese.json   # 中文释义
└── scripts/            # Python 工具脚本
\`\`\`

## 🔧 本地开发

\`\`\`bash
# 启动本地服务器
python3 -m http.server 8000

# 访问
open http://localhost:8000
\`\`\`

## 🚀 部署更新

\`\`\`bash
# 提交并推送更改
git add -A && git commit -m "更新内容" && git push

# Vercel 会自动检测并重新部署
\`\`\`

## 📄 许可证

Copyright © 2025 黄家伟. All Rights Reserved.

本项目保留所有权利，未经授权不得复制、修改或分发。

## 👤 作者

**黄家伟** (Jiawei Huang)

---

**开始你的英语冲刺之旅！🚀**
