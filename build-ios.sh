#!/bin/bash

# 学术英语精进 - iOS 构建脚本
# 需要先安装 Xcode

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/Users/huangjiawei/english-boost-app"
cd "$PROJECT_DIR"

echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║        学术英语精进 - iOS 构建工具                    ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════╝${NC}"
echo ""

# 检查 Xcode
if ! xcode-select -p &>/dev/null || [ ! -d "/Applications/Xcode.app" ]; then
    echo -e "${RED}❌ 错误: 未检测到 Xcode${NC}"
    echo ""
    echo "请先从 App Store 安装 Xcode，然后运行："
    echo "  sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"
    echo ""
    exit 1
fi

# 检查 CocoaPods
if ! command -v pod &>/dev/null; then
    echo -e "${YELLOW}📦 安装 CocoaPods...${NC}"
    sudo gem install cocoapods
fi

# 1. 同步 www 目录
echo -e "${YELLOW}📦 步骤 1/4: 同步 Web 资源...${NC}"
mkdir -p www
cp index.html styles.css app.js vocabulary.js dictionary.js modules.js \
   listening-module.js listening-data.js reading-data.js sources.js \
   online_sources.js sw.js manifest.json auth.js www/ 2>/dev/null || true
cp -r assets www/ 2>/dev/null || true
cp words.json word_definitions.json word_chinese.json www/ 2>/dev/null || true
echo -e "${GREEN}   ✓ Web 资源已同步${NC}"

# 2. Capacitor 同步
echo -e "${YELLOW}📦 步骤 2/4: Capacitor 同步...${NC}"
npx cap sync ios
echo -e "${GREEN}   ✓ Capacitor 同步完成${NC}"

# 3. 打开 Xcode
echo -e "${YELLOW}📦 步骤 3/4: 打开 Xcode 项目...${NC}"
npx cap open ios
echo -e "${GREEN}   ✓ Xcode 已打开${NC}"

# 4. 显示后续步骤
echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              🍎 iOS 项目已准备就绪                   ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  在 Xcode 中完成以下步骤:                            ║${NC}"
echo -e "${GREEN}║  1. 选择 Signing & Capabilities                    ║${NC}"
echo -e "${GREEN}║  2. 选择你的 Apple Developer Team                  ║${NC}"
echo -e "${GREEN}║  3. 连接 iPhone 或选择模拟器                        ║${NC}"
echo -e "${GREEN}║  4. 点击 ▶ 运行按钮                                 ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  发布到 App Store:                                  ║${NC}"
echo -e "${GREEN}║  1. Product → Archive                              ║${NC}"
echo -e "${GREEN}║  2. Distribute App → App Store Connect             ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════╝${NC}"
echo ""
