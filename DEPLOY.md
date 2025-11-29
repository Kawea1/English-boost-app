部署说明 — 将 PWA 发布并在 iPhone 上安装

步骤 A — 生成 30,000 词表（本地运行）
1. 在终端中安装依赖：

```bash
python3 -m pip install --user requests
```

2. 运行生成脚本（会写入 `~/english-boost-app/words.json` 和 `words.txt`）：

```bash
python3 ~/english-boost-app/scripts/generate_wordlist.py
```

3. 本地预览：确保在 `~/english-boost-app` 目录启动一个 HTTP 服务器：

```bash
cd ~/english-boost-app
python3 -m http.server 8080
# 在浏览器打开 http://localhost:8080 并登录（使用管理员密钥）。
```

将 `words.json` 上传到你将要部署的网站根目录（或与仓库一并提交），前端会自动加载该列表并扩展到 30k。

步骤 B — 推荐部署方式（Vercel，最快且支持 HTTPS）
1. 注册 Vercel（https://vercel.com）并安装 CLI：

```bash
npm i -g vercel
```

2. 在项目目录运行：

```bash
cd ~/english-boost-app
vercel login
vercel --prod
```

3. 将 `words.json` 一并包含到项目根并部署，或把它放到公开可访问的 URL（例如 `/words.json`）。

步骤 C — 通过 GitHub Pages（替代方案）
1. 将项目推到 GitHub 仓库（创建一个新的 repo），然后使用 `gh-pages` 分支或 GitHub Pages 设置来托管 `main` 或 `gh-pages`。
2. 注意：GitHub Pages 默认提供 HTTPS，只要 `words.json` 在仓库中并在根路径可访问，PWA 会工作。

步骤 D — 在 iPhone 上安装 PWA
1. 在 iPhone 的 Safari 中打开你部署的网站 URL（例如 `https://your-domain.com`）。
2. 点击底部中间的“分享”按钮（方形带上箭头）。
3. 向下滚动并点击“添加到主屏幕”。
4. 按提示命名并确认。应用图标会出现在主屏幕，可离线打开（取决于 service worker 缓存）。

安全提示
- 当前认证为客户端静态密钥（`auth.js`），这意味着密钥在前端可见。如果你需要真实的密钥分发和验证，请让我为你搭建一个简单的服务器端验证（例如使用 Node.js + Express + SQLite），我可以帮你部署在 Vercel 或 Fly.io 上。

后续我可以代劳的事项（选项）
- 我可以在你的 GitHub 仓库中推送代码并配置 GitHub Pages（需要你授权或提供仓库访问）。
- 我可以帮你把 `words.json` 生成并直接上传到你选择的主机（需要主机凭证或 GitHub 权限）。
