# English Boost 桌面应用打包指南

## 📦 项目概述

English Boost 是一款完全本地化的英语学习应用，支持打包为跨平台桌面应用。

### 特性
- ✅ 100% 本地运行，无需联网
- ✅ FSRS 科学记忆算法
- ✅ 支持 Windows / macOS / Linux
- ✅ 数据本地存储，隐私安全

---

## 🛠️ 环境准备

### 1. 安装 Node.js

下载地址: https://nodejs.org

```bash
# 验证安装
node -v    # 应显示 v18+ 或更高版本
npm -v     # 应显示 9+ 或更高版本
```

### 2. 安装项目依赖

```bash
cd english-boost
npm install
```

---

## 🚀 打包方法

### 方法一：使用脚本（推荐）

#### macOS / Linux
```bash
chmod +x build-desktop.sh
./build-desktop.sh
```

#### Windows (PowerShell)
```powershell
npm install
npm run build:win
```

### 方法二：手动打包

```bash
# 安装依赖
npm install

# 打包当前平台
npm run build

# 或指定平台
npm run build:win    # Windows
npm run build:mac    # macOS
npm run build:linux  # Linux
```

---

## 📁 输出文件

打包完成后，在 `dist/` 目录下找到安装包：

| 平台 | 文件类型 | 说明 |
|------|----------|------|
| Windows | `.exe` | 安装程序 |
| Windows | `*-portable.exe` | 便携版（无需安装） |
| macOS | `.dmg` | 磁盘镜像安装包 |
| macOS | `.zip` | 压缩包版本 |
| Linux | `.AppImage` | 通用Linux应用 |
| Linux | `.deb` | Debian/Ubuntu包 |
| Linux | `.rpm` | RedHat/Fedora包 |

---

## 🔧 配置说明

### package.json 关键配置

```json
{
  "name": "english-boost",
  "version": "1.0.0",
  "main": "main.js",
  "build": {
    "appId": "com.englishboost.app",
    "productName": "English Boost",
    "directories": {
      "output": "dist"
    },
    "files": [
      "**/*",
      "!dist/**",
      "!node_modules/**"
    ]
  }
}
```

### Electron 配置 (main.js)

主进程文件已配置：
- 窗口大小自适应
- 开发者工具（生产环境禁用）
- 安全的 web 偏好设置

---

## 🔐 代码签名（发布用）

### macOS 签名

1. 获取 Apple 开发者证书
2. 配置 `package.json`:

```json
{
  "build": {
    "mac": {
      "identity": "Your Developer ID Application"
    }
  }
}
```

### Windows 签名

1. 购买代码签名证书
2. 配置签名工具：

```json
{
  "build": {
    "win": {
      "signingHashAlgorithms": ["sha256"],
      "certificateFile": "./cert.pfx",
      "certificatePassword": "password"
    }
  }
}
```

---

## 🧪 本地测试

### 开发模式

```bash
npm start
```

### 预览打包效果

```bash
npm run pack  # 只打包，不创建安装程序
```

---

## 📊 FSRS 记忆算法

本应用集成了 FSRS (Free Spaced Repetition Scheduler) 科学记忆算法：

### 核心参数

| 参数 | 说明 | 默认值 |
|------|------|--------|
| requestRetention | 目标记忆保持率 | 90% |
| maximumInterval | 最大复习间隔 | 365天 |

### 使用方法

```javascript
// 评分单词
window.rateWordFSRS('aberrant', 'good');

// 获取待复习单词
window.getDueWordsFSRS();

// 获取统计
window.getFSRSStats();
```

### 评分说明

| 评分 | 含义 | 下次复习 |
|------|------|----------|
| Again (1) | 完全忘记 | 1分钟后 |
| Hard (2) | 困难回忆 | 短间隔 |
| Good (3) | 正常回忆 | 正常间隔 |
| Easy (4) | 轻松回忆 | 长间隔 |

---

## ❓ 常见问题

### Q: 打包失败，提示找不到 electron
```bash
npm install electron electron-builder --save-dev
```

### Q: macOS 打包报权限错误
```bash
xcode-select --install
```

### Q: Windows 打包后图标不显示
确保 `build/icon.ico` 存在且格式正确（256x256 或更大）

### Q: 应用无法启动
检查 `main.js` 中的路径配置是否正确

---

## 📝 版本历史

- **v1.0.0** - 初始版本
  - 词汇学习模块
  - FSRS 科学记忆算法
  - 听力/口语/阅读/写作模块
  - 本地数据存储

---

## 📧 技术支持

如有问题，请通过应用内"反馈建议"功能联系。
