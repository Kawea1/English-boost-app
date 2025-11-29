# 🚀 部署指南 - 支持无限用户

本指南帮助您将应用部署到 Vercel，支持无限用户同时在线。

## 方法一：通过 GitHub + Vercel（推荐）

### 步骤 1：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库，名称如 `english-boost-app`
3. 设为 **Private**（私有）保护代码

### 步骤 2：推送代码到 GitHub

在终端执行：
```bash
cd /Users/huangjiawei/english-boost-app

# 添加远程仓库（替换为您的用户名）
git remote add origin https://github.com/您的用户名/english-boost-app.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 3：连接 Vercel

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 **"Add New... → Project"**
4. 选择您刚创建的 `english-boost-app` 仓库
5. 点击 **"Deploy"**

### 步骤 4：完成！

部署成功后，Vercel 会给您一个网址，如：
- `https://english-boost-app.vercel.app`

## 方法二：直接拖拽部署

1. 访问 https://vercel.com/new
2. 将整个 `english-boost-app` 文件夹拖拽到页面
3. 等待部署完成

---

## 🔄 后续更新维护

每次修改代码后，只需：

```bash
cd /Users/huangjiawei/english-boost-app
git add -A
git commit -m "更新说明"
git push
```

Vercel 会**自动检测并重新部署**，通常1-2分钟完成。

---

## 📊 Vercel 免费版能力

| 功能 | 额度 |
|-----|------|
| 并发用户 | **无限制** |
| 带宽 | 100GB/月 |
| 部署次数 | 无限制 |
| HTTPS | 自动配置 |
| CDN | 全球加速 |
| 域名 | 可绑定自定义域名 |

---

## 🔐 绑定自定义域名（可选）

1. 在 Vercel 项目设置中添加域名
2. 按提示配置 DNS 记录
3. 等待 SSL 证书自动生成

---

## ❓ 常见问题

**Q: 部署失败怎么办？**
A: 检查 Vercel 的构建日志，通常是文件路径问题。

**Q: 如何回滚到之前版本？**
A: 在 Vercel 控制台的 Deployments 页面，点击任意历史版本的 "..." → "Promote to Production"

**Q: 数据会丢失吗？**
A: 不会。用户数据存储在各自浏览器的 localStorage 中，与服务器无关。
