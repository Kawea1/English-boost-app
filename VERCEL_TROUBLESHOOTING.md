# Vercel 部署故障排查和修复指南

**更新日期**: 2025-12-04  
**版本**: v4.9.3

---

## 🔍 常见部署失败原因

### 1. **构建配置问题**
- ❌ 缺少 `vercel.json` 配置文件
- ❌ `vercel.json` 配置错误
- ❌ 构建命令设置不当

### 2. **文件路径问题**
- ❌ 静态资源路径错误
- ❌ Service Worker 路径不正确
- ❌ 大小写敏感问题

### 3. **依赖问题**
- ❌ `package.json` 缺失或配置错误
- ❌ Node.js 版本不兼容
- ❌ npm 依赖安装失败

### 4. **文件大小限制**
- ❌ 单个文件超过 Vercel 限制
- ❌ 总项目大小超出免费版限制

---

## ✅ 已修复的配置

### 更新的 `vercel.json`

```json
{
  "version": 2,
  "public": true,
  "github": {
    "silent": true
  },
  "buildCommand": "echo 'No build needed - Static HTML app'",
  "outputDirectory": ".",
  "routes": [
    {
      "src": "/sw.js",
      "headers": {
        "Cache-Control": "public, max-age=0, must-revalidate",
        "Service-Worker-Allowed": "/"
      }
    },
    {
      "src": "/manifest.json",
      "headers": {
        "Content-Type": "application/json"
      }
    },
    {
      "src": "/(.*\\.(js|css|json|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot))",
      "headers": {
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ],
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 关键修复点

1. **明确构建命令**: `buildCommand: "echo 'No build needed - Static HTML app'"`
   - 告诉 Vercel 这是纯静态应用，不需要构建

2. **设置输出目录**: `outputDirectory: "."`
   - 指定根目录为输出目录

3. **Service Worker 支持**: 特殊处理 `sw.js`
   - 确保 PWA 功能正常

4. **SPA 路由**: `rewrites` 配置
   - 所有路由重定向到 `index.html`

5. **缓存策略**: 
   - HTML: 不缓存 (max-age=0)
   - 静态资源: 长期缓存 (1年)

---

## 🚀 部署步骤

### 方式一: GitHub 自动部署（推荐）

1. **连接 GitHub 仓库**
   ```
   访问: https://vercel.com/new
   选择: Import Git Repository
   选择: Kawea1/English-boost-app
   ```

2. **项目配置**
   ```
   Framework Preset: Other (不选择任何框架)
   Root Directory: ./
   Build Command: (留空或使用默认)
   Output Directory: ./
   Install Command: npm install (如果不需要可留空)
   ```

3. **环境变量**
   - 无需配置（纯前端应用）

4. **点击 Deploy**
   - Vercel 会自动检测 `vercel.json` 配置
   - 部署时间: 1-3 分钟

### 方式二: Vercel CLI 部署

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署项目**
   ```bash
   cd /Users/huangjiawei/english-boost-app
   vercel
   ```

4. **生产环境部署**
   ```bash
   vercel --prod
   ```

---

## 🔧 故障排查步骤

### 1. 检查 Vercel 部署日志

访问: https://vercel.com/dashboard

1. 选择你的项目
2. 点击 "Deployments"
3. 点击失败的部署
4. 查看 "Building" 和 "Error" 日志

### 2. 常见错误和解决方案

#### 错误: "No Build Output"
```
解决:
1. 确认 vercel.json 中设置了 outputDirectory
2. 确认 index.html 在项目根目录
```

#### 错误: "Build Command Failed"
```
解决:
1. 设置 buildCommand 为空或简单命令
2. 或在 Vercel 控制台将 Build Command 留空
```

#### 错误: "File Size Limit Exceeded"
```
解决:
1. 检查是否有超大文件
2. 移除 node_modules、dist 等不必要的文件
3. 使用 .vercelignore 忽略大文件
```

#### 错误: "Service Worker Registration Failed"
```
解决:
1. 确认 sw.js 路径正确
2. 确认 vercel.json 中 Service-Worker-Allowed 设置
3. 检查 manifest.json 路径
```

### 3. 创建 `.vercelignore` 文件

```bash
# .vercelignore
node_modules/
dist/
.git/
.github/
android/
ios/
harmony/
harmony-next/
scripts/
official_inputs/
official_parsed/
public_parsed/
*.md
!README.md
*.txt
*.sh
.venv/
.DS_Store
*.log
```

---

## 📊 部署检查清单

### 部署前检查
- [ ] `vercel.json` 配置正确
- [ ] `index.html` 在根目录
- [ ] `manifest.json` 路径正确
- [ ] `sw.js` 路径正确
- [ ] 静态资源路径使用相对路径
- [ ] 创建 `.vercelignore` 排除大文件

### 部署后验证
- [ ] 访问部署的 URL
- [ ] 测试 PWA 安装功能
- [ ] 测试离线功能
- [ ] 测试所有模块功能
- [ ] 检查浏览器控制台无错误

---

## 🎯 Vercel 配置最佳实践

### 1. 项目设置
```
Framework Preset: Other
Root Directory: ./
Build Command: (留空)
Output Directory: ./
Install Command: (留空)
```

### 2. 环境变量
```
不需要配置（纯前端应用）
```

### 3. 域名设置
```
1. 在 Vercel 项目设置中添加自定义域名
2. 配置 DNS CNAME 记录指向 cname.vercel-dns.com
3. 等待 SSL 证书自动配置
```

### 4. 性能优化
```json
{
  "headers": [
    {
      "source": "/(.*\\.(js|css|png|jpg))",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## 🔄 重新部署

### 方法 1: 自动重新部署
1. 推送代码到 GitHub
2. Vercel 自动触发部署

### 方法 2: 手动重新部署
1. 访问 Vercel Dashboard
2. 选择项目 → Deployments
3. 点击 "Redeploy"

### 方法 3: CLI 重新部署
```bash
cd /Users/huangjiawei/english-boost-app
vercel --prod
```

---

## 📞 获取帮助

### Vercel 文档
- 官方文档: https://vercel.com/docs
- 配置参考: https://vercel.com/docs/configuration

### GitHub Issues
- 问题反馈: https://github.com/Kawea1/English-boost-app/issues

### Vercel 支持
- 社区论坛: https://github.com/vercel/vercel/discussions
- 支持邮件: support@vercel.com (付费用户)

---

## 🎉 成功部署后

### 访问你的应用
```
https://english-boost-app.vercel.app
或
https://你的自定义域名.com
```

### 更新 README
将 Vercel 部署链接添加到项目 README:
```markdown
🌐 **在线访问**: https://english-boost-app.vercel.app
```

### 监控和分析
1. Vercel Analytics - 访问统计
2. Web Vitals - 性能指标
3. 错误日志 - 运行时错误

---

## 📝 常见问题 FAQ

### Q1: 部署成功但访问404
**A**: 检查 `rewrites` 配置，确保所有路由重定向到 `index.html`

### Q2: PWA 功能不工作
**A**: 检查 Service Worker 的 headers 配置，特别是 `Service-Worker-Allowed`

### Q3: 部署很慢
**A**: 检查 `.vercelignore`，排除不必要的大文件

### Q4: 自定义域名不工作
**A**: 
1. 检查 DNS 配置
2. 等待 DNS 传播（最多48小时）
3. 检查 SSL 证书状态

### Q5: 如何回滚到之前的版本
**A**: 
1. Vercel Dashboard → Deployments
2. 找到历史版本
3. 点击 "..." → "Promote to Production"

---

<p align="center">
  <sub>最后更新: 2025-12-04 | 版本: v4.9.3</sub>
</p>
