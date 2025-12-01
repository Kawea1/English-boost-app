#!/bin/bash

# 学术英语精进 - 自动部署脚本
# 功能：更新版本号、清除缓存、推送到Git

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目目录
PROJECT_DIR="/Users/huangjiawei/english-boost-app"
cd "$PROJECT_DIR"

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        学术英语精进 - 自动部署工具                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# 1. 生成新版本号（时间戳）
VERSION=$(date +%Y%m%d%H%M%S)
echo -e "${YELLOW}📦 步骤 1/5: 更新版本号...${NC}"

# 更新所有JS和CSS文件的版本号
sed -i '' "s/styles\.css?v=[0-9]*/styles.css?v=$VERSION/g" index.html
sed -i '' "s/modules\.js?v=[0-9]*/modules.js?v=$VERSION/g" index.html
sed -i '' "s/vocabulary\.js?v=[0-9]*/vocabulary.js?v=$VERSION/g" index.html
sed -i '' "s/app\.js?v=[0-9]*/app.js?v=$VERSION/g" index.html
sed -i '' "s/dictionary\.js?v=[0-9]*/dictionary.js?v=$VERSION/g" index.html
sed -i '' "s/listening-module\.js?v=[0-9]*/listening-module.js?v=$VERSION/g" index.html
sed -i '' "s/listening-data\.js?v=[0-9]*/listening-data.js?v=$VERSION/g" index.html
sed -i '' "s/reading-data\.js?v=[0-9]*/reading-data.js?v=$VERSION/g" index.html
sed -i '' "s/sources\.js?v=[0-9]*/sources.js?v=$VERSION/g" index.html
sed -i '' "s/online_sources\.js?v=[0-9]*/online_sources.js?v=$VERSION/g" index.html

echo -e "${GREEN}   ✓ 版本号已更新为: $VERSION${NC}"

# 2. 同步 www 目录（移动端资源）
echo -e "${YELLOW}📦 步骤 2/6: 同步移动端资源...${NC}"
mkdir -p www
cp index.html styles.css app.js vocabulary.js dictionary.js modules.js \
   listening-module.js listening-data.js reading-data.js sources.js \
   online_sources.js sw.js manifest.json auth.js download.html www/ 2>/dev/null || true
cp -r assets www/ 2>/dev/null || true
cp words.json word_definitions.json word_chinese.json www/ 2>/dev/null || true
echo -e "${GREEN}   ✓ www 目录已同步${NC}"

# 3. 更新 Service Worker 版本（清除PWA缓存）
echo -e "${YELLOW}📦 步骤 3/6: 更新 Service Worker...${NC}"

if [ -f "sw.js" ]; then
    # 更新缓存版本号
    sed -i '' "s/CACHE_VERSION = '[^']*'/CACHE_VERSION = 'v$VERSION'/g" sw.js
    sed -i '' "s/academic-english-v[0-9]*/academic-english-v$VERSION/g" sw.js
    echo -e "${GREEN}   ✓ Service Worker 缓存版本已更新${NC}"
else
    echo -e "${RED}   ⚠ sw.js 不存在，跳过${NC}"
fi

# 4. 更新 manifest.json 版本
echo -e "${YELLOW}📦 步骤 4/6: 更新 Manifest...${NC}"

if [ -f "manifest.json" ]; then
    # 如果manifest中有版本号就更新
    if grep -q '"version"' manifest.json; then
        sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"1.0.$VERSION\"/g" manifest.json
    fi
    echo -e "${GREEN}   ✓ Manifest 已更新${NC}"
fi

# 5. Git 提交和推送
echo -e "${YELLOW}📦 步骤 5/6: Git 提交和推送...${NC}"

# 检查是否有变更
if git diff --quiet && git diff --staged --quiet; then
    echo -e "${YELLOW}   ⚠ 没有检测到文件变更${NC}"
else
    # 获取提交信息
    if [ -n "$1" ]; then
        COMMIT_MSG="$1"
    else
        COMMIT_MSG="🚀 自动部署 v$VERSION"
    fi
    
    git add -A
    git commit -m "$COMMIT_MSG"
    
    # 推送到远程
    echo -e "${BLUE}   → 推送到 origin/main...${NC}"
    git push origin main 2>&1 || {
        echo -e "${RED}   ✗ 推送失败，请检查网络或权限${NC}"
        exit 1
    }
    
    echo -e "${GREEN}   ✓ 已推送到 GitHub${NC}"
fi

# 6. 显示部署信息
echo -e "${YELLOW}📦 步骤 6/6: 生成部署报告...${NC}"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                  ✅ 部署成功！                       ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  版本号: ${NC}$VERSION"
echo -e "${GREEN}║  时间:   ${NC}$(date '+%Y-%m-%d %H:%M:%S')"
echo -e "${GREEN}╠════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  📱 用户访问方式:                                    ║${NC}"

# 获取GitHub Pages地址
REMOTE_URL=$(git remote get-url origin 2>/dev/null || echo "")
if [[ "$REMOTE_URL" == *"github.com"* ]]; then
    if [[ "$REMOTE_URL" == git@github.com:* ]]; then
        REPO_PATH=$(echo "$REMOTE_URL" | sed 's/git@github.com://' | sed 's/.git$//')
    else
        REPO_PATH=$(echo "$REMOTE_URL" | sed 's/https:\/\/github.com\///' | sed 's/.git$//')
    fi
    USERNAME=$(echo "$REPO_PATH" | cut -d'/' -f1)
    REPONAME=$(echo "$REPO_PATH" | cut -d'/' -f2)
    PAGES_URL="https://$USERNAME.github.io/$REPONAME"
    echo -e "${GREEN}║  • 网页版: ${NC}$PAGES_URL"
    echo -e "${GREEN}║  • 下载页: ${NC}$PAGES_URL/download.html"
fi

echo -e "${GREEN}╠════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  🔄 更新已自动推送，用户刷新页面即可获取最新版本      ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# 提示强制刷新
echo -e "${BLUE}提示: 用户可以使用以下方式强制刷新:${NC}"
echo "  • Mac: Cmd + Shift + R"
echo "  • Windows: Ctrl + Shift + R"
echo "  • 或在设置中清除站点数据"
echo ""
