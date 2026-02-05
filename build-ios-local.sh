#!/bin/bash

# 快速构建 iOS 本地安装包
# 用法: ./build-ios-local.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}🍎 iOS 本地安装 - 快速构建${NC}"
echo ""

# 检查环境
if ! command -v xcodebuild &>/dev/null; then
    echo -e "${RED}❌ 未安装 Xcode${NC}"
    echo "请从 App Store 安装 Xcode"
    exit 1
fi

if ! command -v node &>/dev/null; then
    echo -e "${RED}❌ 未安装 Node.js${NC}"
    exit 1
fi

# 1. 同步资源
echo -e "${YELLOW}📦 同步 Web 资源...${NC}"
mkdir -p www
cp index.html styles.css app.js vocabulary.js dictionary.js modules.js www/
cp listening-module.js listening-data.js reading-data.js sources.js www/
cp fsrs-algorithm.js auth.js subscription.js activation.js www/
cp writing-module.js writing-data.js speaking-data.js ux-enhancements.js www/
cp online_sources.js vocabulary-improvements.js vocabulary-review-list.js www/
cp manifest.json sw.js version.json www/
cp *.json www/ 2>/dev/null || true
cp -r assets www/ 2>/dev/null || true
echo -e "${GREEN}✓ 资源已同步${NC}"

# 2. 安装依赖
echo -e "${YELLOW}📦 安装依赖...${NC}"
npm install --silent
npx cap sync ios
echo -e "${GREEN}✓ 依赖已安装${NC}"

# 3. 安装 Pod
if command -v pod &>/dev/null; then
    echo -e "${YELLOW}📦 安装 CocoaPods...${NC}"
    cd ios/App && pod install && cd ../..
    echo -e "${GREEN}✓ Pod 已安装${NC}"
else
    echo -e "${YELLOW}⚠️  未安装 CocoaPods，跳过${NC}"
fi

# 4. 打开 Xcode
echo -e "${YELLOW}📱 打开 Xcode...${NC}"
open ios/App/App.xcworkspace

echo ""
echo -e "${GREEN}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║           🎉 准备完成！请在 Xcode 中操作              ║${NC}"
echo -e "${GREEN}╠════════════════════════════════════════════════════════╣${NC}"
echo -e "${GREEN}║  方法 1: 直接安装到设备（最简单）                      ║${NC}"
echo -e "${GREEN}║  1. 连接 iPhone 到 Mac                                ║${NC}"
echo -e "${GREEN}║  2. 在 Xcode 顶部选择你的设备                          ║${NC}"
echo -e "${GREEN}║  3. 点击运行按钮 ▶️                                    ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║  方法 2: 导出 IPA 文件                                 ║${NC}"
echo -e "${GREEN}║  1. Product → Archive                                 ║${NC}"
echo -e "${GREEN}║  2. Distribute App → Development/Ad Hoc               ║${NC}"
echo -e "${GREEN}║  3. 导出 IPA 文件                                      ║${NC}"
echo -e "${GREEN}║                                                        ║${NC}"
echo -e "${GREEN}║  首次运行需要配置签名:                                  ║${NC}"
echo -e "${GREEN}║  • Signing & Capabilities → Team → 选择你的 Apple ID  ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📖 详细说明请查看: IOS_LOCAL_INSTALL_COMPLETE.md${NC}"
echo ""
