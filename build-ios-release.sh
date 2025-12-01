#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║          学术英语精进 - iOS 发布构建脚本 v1.0                                    ║
# ║          支持: 开发调试 / TestFlight / App Store 发布                          ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

# 应用信息
APP_NAME="学术英语精进"
APP_ID="com.academic.english"
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

# 输出目录
OUTPUT_DIR="$PROJECT_DIR/dist/ios"
mkdir -p "$OUTPUT_DIR"

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║               🍎 ${APP_NAME} - iOS 构建工具 v1.0                      ║${NC}"
echo -e "${BLUE}╠══════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║  版本: ${VERSION}                                                          ║${NC}"
echo -e "${BLUE}║  Bundle ID: ${APP_ID}                                              ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 显示菜单
show_menu() {
    echo -e "${CYAN}请选择构建模式:${NC}"
    echo ""
    echo -e "  ${GREEN}1)${NC} 开发调试 (Debug) - 连接真机/模拟器测试"
    echo -e "  ${GREEN}2)${NC} TestFlight 测试版 - 上传到 TestFlight 进行测试"
    echo -e "  ${GREEN}3)${NC} App Store 发布版 - 正式发布到 App Store"
    echo -e "  ${GREEN}4)${NC} 导出 IPA 文件 - 企业分发/Ad-Hoc 安装"
    echo -e "  ${GREEN}5)${NC} 仅同步资源 - 更新 www 目录但不构建"
    echo -e "  ${RED}0)${NC} 退出"
    echo ""
    read -p "请输入选项 [0-5]: " choice
}

# 检查环境
check_environment() {
    echo -e "${YELLOW}🔍 检查构建环境...${NC}"
    
    # 检查 Xcode
    if ! xcode-select -p &>/dev/null; then
        echo -e "${RED}❌ 未检测到 Xcode Command Line Tools${NC}"
        echo "   请运行: xcode-select --install"
        exit 1
    fi
    
    if [ ! -d "/Applications/Xcode.app" ]; then
        echo -e "${RED}❌ 未检测到 Xcode.app${NC}"
        echo "   请从 App Store 安装 Xcode"
        exit 1
    fi
    
    echo -e "${GREEN}   ✓ Xcode 已安装${NC}"
    
    # 检查 Node.js
    if ! command -v node &>/dev/null; then
        echo -e "${RED}❌ 未检测到 Node.js${NC}"
        exit 1
    fi
    echo -e "${GREEN}   ✓ Node.js $(node -v)${NC}"
    
    # 检查 CocoaPods
    if ! command -v pod &>/dev/null; then
        echo -e "${YELLOW}📦 安装 CocoaPods...${NC}"
        sudo gem install cocoapods
    fi
    echo -e "${GREEN}   ✓ CocoaPods 已安装${NC}"
    
    # 检查 Capacitor CLI
    if ! npx cap --version &>/dev/null; then
        echo -e "${YELLOW}📦 安装 Capacitor CLI...${NC}"
        npm install @capacitor/cli @capacitor/core @capacitor/ios
    fi
    echo -e "${GREEN}   ✓ Capacitor CLI 已安装${NC}"
    
    echo ""
}

# 同步 Web 资源
sync_web_resources() {
    echo -e "${YELLOW}📦 同步 Web 资源到 www/...${NC}"
    
    mkdir -p www
    
    # 复制核心文件
    cp index.html www/
    cp styles.css www/
    cp app.js www/
    cp vocabulary.js www/
    cp dictionary.js www/
    cp modules.js www/
    cp listening-module.js www/
    cp listening-data.js www/
    cp reading-data.js www/
    cp sources.js www/
    cp online_sources.js www/
    cp sw.js www/
    cp manifest.json www/
    cp auth.js www/
    
    # 复制数据文件
    cp words.json www/ 2>/dev/null || true
    cp word_definitions.json www/ 2>/dev/null || true
    cp word_chinese.json www/ 2>/dev/null || true
    
    # 复制资源目录
    cp -r assets www/ 2>/dev/null || true
    
    echo -e "${GREEN}   ✓ Web 资源已同步${NC}"
}

# Capacitor 同步
capacitor_sync() {
    echo -e "${YELLOW}📦 Capacitor iOS 同步...${NC}"
    npx cap sync ios
    echo -e "${GREEN}   ✓ Capacitor 同步完成${NC}"
}

# 安装 Pod 依赖
install_pods() {
    echo -e "${YELLOW}📦 安装 CocoaPods 依赖...${NC}"
    cd "$PROJECT_DIR/ios/App"
    pod install
    cd "$PROJECT_DIR"
    echo -e "${GREEN}   ✓ Pod 依赖已安装${NC}"
}

# 开发调试模式
build_debug() {
    echo ""
    echo -e "${CYAN}🔧 开发调试模式${NC}"
    echo ""
    
    sync_web_resources
    capacitor_sync
    install_pods
    
    echo -e "${YELLOW}📱 打开 Xcode...${NC}"
    npx cap open ios
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                     🎉 开发环境已准备就绪                              ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  在 Xcode 中:                                                        ║${NC}"
    echo -e "${GREEN}║  1. 选择目标设备（真机或模拟器）                                        ║${NC}"
    echo -e "${GREEN}║  2. 点击 ▶ 运行按钮                                                  ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  首次运行需要:                                                        ║${NC}"
    echo -e "${GREEN}║  • Signing & Capabilities → 选择 Team                               ║${NC}"
    echo -e "${GREEN}║  • 真机需信任开发者: 设置 → 通用 → VPN与设备管理                        ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
}

# TestFlight 构建
build_testflight() {
    echo ""
    echo -e "${CYAN}✈️  TestFlight 测试版构建${NC}"
    echo ""
    
    sync_web_resources
    capacitor_sync
    install_pods
    
    echo -e "${YELLOW}📦 构建 Archive...${NC}"
    
    cd "$PROJECT_DIR/ios/App"
    
    # 清理之前的构建
    xcodebuild clean -workspace App.xcworkspace -scheme App -configuration Release
    
    # 构建 Archive
    xcodebuild archive \
        -workspace App.xcworkspace \
        -scheme App \
        -configuration Release \
        -archivePath "$OUTPUT_DIR/App.xcarchive" \
        CODE_SIGN_STYLE="Automatic"
    
    cd "$PROJECT_DIR"
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                   🎉 Archive 构建完成                                 ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  Archive 位置: dist/ios/App.xcarchive                               ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  上传到 TestFlight:                                                  ║${NC}"
    echo -e "${GREEN}║  1. 打开 Xcode → Window → Organizer                                 ║${NC}"
    echo -e "${GREEN}║  2. 选择 Archive → Distribute App                                   ║${NC}"
    echo -e "${GREEN}║  3. 选择 App Store Connect → Upload                                 ║${NC}"
    echo -e "${GREEN}║  4. 在 App Store Connect 网站管理 TestFlight                         ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
    
    # 打开 Organizer
    open "$OUTPUT_DIR/App.xcarchive"
}

# App Store 发布
build_appstore() {
    echo ""
    echo -e "${CYAN}🏪 App Store 发布版构建${NC}"
    echo ""
    
    sync_web_resources
    capacitor_sync
    install_pods
    
    echo -e "${YELLOW}📱 打开 Xcode...${NC}"
    npx cap open ios
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                   📱 App Store 发布指南                               ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  准备工作:                                                           ║${NC}"
    echo -e "${GREEN}║  • Apple Developer Program 会员资格 (\$99/年)                        ║${NC}"
    echo -e "${GREEN}║  • App Store Connect 中创建 App 记录                                ║${NC}"
    echo -e "${GREEN}║  • 准备应用截图 (6.7\"、6.5\"、5.5\" iPhone + iPad)                    ║${NC}"
    echo -e "${GREEN}║  • 准备应用描述、关键词、隐私政策 URL                                   ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  在 Xcode 中:                                                        ║${NC}"
    echo -e "${GREEN}║  1. Product → Archive                                               ║${NC}"
    echo -e "${GREEN}║  2. Window → Organizer → Distribute App                             ║${NC}"
    echo -e "${GREEN}║  3. 选择 App Store Connect → Upload                                 ║${NC}"
    echo -e "${GREEN}║  4. 在 App Store Connect 提交审核                                    ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
}

# 导出 IPA
export_ipa() {
    echo ""
    echo -e "${CYAN}📦 导出 IPA 文件${NC}"
    echo ""
    
    sync_web_resources
    capacitor_sync
    install_pods
    
    echo -e "${YELLOW}📱 打开 Xcode...${NC}"
    npx cap open ios
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                   📦 IPA 导出指南                                    ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  在 Xcode 中:                                                        ║${NC}"
    echo -e "${GREEN}║  1. Product → Archive                                               ║${NC}"
    echo -e "${GREEN}║  2. Window → Organizer → Distribute App                             ║${NC}"
    echo -e "${GREEN}║  3. 选择发布方式:                                                    ║${NC}"
    echo -e "${GREEN}║     • Ad Hoc: 测试设备安装 (需要设备 UDID)                            ║${NC}"
    echo -e "${GREEN}║     • Enterprise: 企业内部分发 (需要企业证书)                         ║${NC}"
    echo -e "${GREEN}║     • Development: 开发测试                                          ║${NC}"
    echo -e "${GREEN}║  4. 导出的 IPA 可通过以下方式安装:                                    ║${NC}"
    echo -e "${GREEN}║     • Apple Configurator 2                                          ║${NC}"
    echo -e "${GREEN}║     • 企业 MDM 分发                                                  ║${NC}"
    echo -e "${GREEN}║     • 第三方分发平台 (蒲公英、fir.im 等)                              ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
}

# 仅同步
sync_only() {
    echo ""
    echo -e "${CYAN}🔄 仅同步资源${NC}"
    echo ""
    
    sync_web_resources
    capacitor_sync
    
    echo ""
    echo -e "${GREEN}✓ 资源同步完成！${NC}"
}

# 主程序
main() {
    check_environment
    show_menu
    
    case $choice in
        1) build_debug ;;
        2) build_testflight ;;
        3) build_appstore ;;
        4) export_ipa ;;
        5) sync_only ;;
        0) echo "退出"; exit 0 ;;
        *) echo -e "${RED}无效选项${NC}"; exit 1 ;;
    esac
}

# 如果有命令行参数，直接执行
if [ "$1" != "" ]; then
    check_environment
    case $1 in
        debug) build_debug ;;
        testflight) build_testflight ;;
        appstore) build_appstore ;;
        ipa) export_ipa ;;
        sync) sync_only ;;
        *) echo "用法: $0 [debug|testflight|appstore|ipa|sync]"; exit 1 ;;
    esac
else
    main
fi
