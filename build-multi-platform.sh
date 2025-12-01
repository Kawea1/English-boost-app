#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║          学术英语精进 - 多平台统一构建脚本 v1.0                                    ║
# ║          支持: iOS / Android / HarmonyOS / PWA / Desktop                       ║
# ╚══════════════════════════════════════════════════════════════════════════════╝

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

# 应用信息
APP_NAME="学术英语精进"
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

# 输出目录
DIST_DIR="$PROJECT_DIR/dist"
mkdir -p "$DIST_DIR"

# 清屏并显示 Logo
clear
echo ""
echo -e "${PURPLE}    ╔═══════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}    ║                                                                   ║${NC}"
echo -e "${PURPLE}    ║      ${WHITE}📚 学术英语精进 - 多平台构建系统 ${PURPLE}                          ║${NC}"
echo -e "${PURPLE}    ║                                                                   ║${NC}"
echo -e "${PURPLE}    ║         ${CYAN}GRE · 托福 · 学术英语 · 离线学习${PURPLE}                        ║${NC}"
echo -e "${PURPLE}    ║                                                                   ║${NC}"
echo -e "${PURPLE}    ╚═══════════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "    ${WHITE}版本: ${GREEN}v${VERSION}${NC}"
echo -e "    ${WHITE}项目: ${CYAN}${PROJECT_DIR}${NC}"
echo ""

# 显示主菜单
show_main_menu() {
    echo -e "${WHITE}════════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}                        选择构建平台${NC}"
    echo -e "${WHITE}════════════════════════════════════════════════════════════════════════${NC}"
    echo ""
    echo -e "    ${GREEN}1)${NC} 🍎  ${WHITE}iOS${NC}           - iPhone/iPad 应用"
    echo -e "    ${GREEN}2)${NC} 🤖  ${WHITE}Android${NC}       - 安卓手机/平板应用"
    echo -e "    ${GREEN}3)${NC} 🔷  ${WHITE}HarmonyOS${NC}     - 鸿蒙系统应用"
    echo -e "    ${GREEN}4)${NC} 🌐  ${WHITE}PWA${NC}           - 网页渐进式应用"
    echo -e "    ${GREEN}5)${NC} 💻  ${WHITE}Desktop${NC}       - 桌面应用 (Mac/Win/Linux)"
    echo ""
    echo -e "${WHITE}────────────────────────────────────────────────────────────────────────${NC}"
    echo ""
    echo -e "    ${GREEN}6)${NC} 📦  ${WHITE}全部构建${NC}      - 一键构建所有平台"
    echo -e "    ${GREEN}7)${NC} 🔄  ${WHITE}同步资源${NC}      - 仅同步 www 目录"
    echo -e "    ${GREEN}8)${NC} 📊  ${WHITE}查看状态${NC}      - 检查构建环境和产物"
    echo ""
    echo -e "${WHITE}────────────────────────────────────────────────────────────────────────${NC}"
    echo ""
    echo -e "    ${RED}0)${NC}  退出"
    echo ""
    echo -e "${WHITE}════════════════════════════════════════════════════════════════════════${NC}"
    echo ""
    read -p "    请选择 [0-8]: " main_choice
}

# 同步 www 资源
sync_www() {
    echo ""
    echo -e "${YELLOW}📦 同步 Web 资源...${NC}"
    
    mkdir -p www
    
    # 核心文件列表
    local files=(
        "index.html"
        "styles.css"
        "app.js"
        "vocabulary.js"
        "dictionary.js"
        "modules.js"
        "listening-module.js"
        "listening-data.js"
        "reading-data.js"
        "sources.js"
        "online_sources.js"
        "sw.js"
        "manifest.json"
        "auth.js"
        "words.json"
        "word_definitions.json"
        "word_chinese.json"
    )
    
    for file in "${files[@]}"; do
        if [ -f "$PROJECT_DIR/$file" ]; then
            cp "$PROJECT_DIR/$file" www/
        fi
    done
    
    # 复制资源目录
    cp -r assets www/ 2>/dev/null || true
    
    echo -e "${GREEN}   ✓ 资源已同步到 www/ 目录${NC}"
}

# iOS 构建
build_ios() {
    echo ""
    echo -e "${CYAN}🍎 iOS 构建${NC}"
    echo ""
    
    if [ -f "$PROJECT_DIR/build-ios-release.sh" ]; then
        chmod +x "$PROJECT_DIR/build-ios-release.sh"
        "$PROJECT_DIR/build-ios-release.sh"
    else
        echo -e "${RED}❌ iOS 构建脚本不存在${NC}"
    fi
}

# Android 构建
build_android() {
    echo ""
    echo -e "${CYAN}🤖 Android 构建${NC}"
    echo ""
    
    if [ -f "$PROJECT_DIR/build-android-release.sh" ]; then
        chmod +x "$PROJECT_DIR/build-android-release.sh"
        "$PROJECT_DIR/build-android-release.sh"
    else
        echo -e "${RED}❌ Android 构建脚本不存在${NC}"
    fi
}

# HarmonyOS 构建
build_harmony() {
    echo ""
    echo -e "${CYAN}🔷 HarmonyOS 构建${NC}"
    echo ""
    
    if [ -f "$PROJECT_DIR/build-harmony.sh" ]; then
        chmod +x "$PROJECT_DIR/build-harmony.sh"
        "$PROJECT_DIR/build-harmony.sh"
    else
        echo -e "${RED}❌ HarmonyOS 构建脚本不存在${NC}"
    fi
}

# PWA 部署
build_pwa() {
    echo ""
    echo -e "${CYAN}🌐 PWA 部署${NC}"
    echo ""
    
    sync_www
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                     🌐 PWA 部署指南                                  ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  PWA 文件已准备就绪！                                                ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【本地测试】                                                         ║${NC}"
    echo -e "${GREEN}║  python3 -m http.server 8000                                        ║${NC}"
    echo -e "${GREEN}║  然后访问 http://localhost:8000                                      ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【部署到 Vercel】                                                    ║${NC}"
    echo -e "${GREEN}║  1. 安装 Vercel CLI: npm i -g vercel                                ║${NC}"
    echo -e "${GREEN}║  2. 运行: vercel                                                    ║${NC}"
    echo -e "${GREEN}║  3. 按提示完成部署                                                   ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【部署到 GitHub Pages】                                             ║${NC}"
    echo -e "${GREEN}║  1. 将 www 目录内容推送到 gh-pages 分支                              ║${NC}"
    echo -e "${GREEN}║  2. 在仓库设置中启用 GitHub Pages                                    ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【iOS 添加到主屏幕】                                                 ║${NC}"
    echo -e "${GREEN}║  Safari 访问 → 分享按钮 → 添加到主屏幕                               ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【Android 添加到主屏幕】                                             ║${NC}"
    echo -e "${GREEN}║  Chrome 访问 → 菜单 → 添加到主屏幕                                   ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
}

# Desktop 构建
build_desktop() {
    echo ""
    echo -e "${CYAN}💻 Desktop 桌面应用构建${NC}"
    echo ""
    
    echo -e "${YELLOW}请选择构建目标:${NC}"
    echo ""
    echo -e "  ${GREEN}1)${NC} macOS (.dmg)"
    echo -e "  ${GREEN}2)${NC} Windows (.exe)"
    echo -e "  ${GREEN}3)${NC} Linux (.AppImage)"
    echo -e "  ${GREEN}4)${NC} 全部平台"
    echo ""
    read -p "请选择 [1-4]: " desktop_choice
    
    # 确保依赖安装
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}📦 安装依赖...${NC}"
        npm install
    fi
    
    case $desktop_choice in
        1)
            echo -e "${YELLOW}📦 构建 macOS 应用...${NC}"
            npm run build:mac
            ;;
        2)
            echo -e "${YELLOW}📦 构建 Windows 应用...${NC}"
            npm run build:win
            ;;
        3)
            echo -e "${YELLOW}📦 构建 Linux 应用...${NC}"
            npm run build:linux
            ;;
        4)
            echo -e "${YELLOW}📦 构建全平台桌面应用...${NC}"
            npm run build:all
            ;;
        *)
            echo -e "${RED}无效选项${NC}"
            return
            ;;
    esac
    
    echo ""
    echo -e "${GREEN}✓ 桌面应用构建完成！${NC}"
    echo -e "${GREEN}  输出目录: dist/${NC}"
    
    # 打开输出目录
    open "$DIST_DIR" 2>/dev/null || xdg-open "$DIST_DIR" 2>/dev/null || true
}

# 全部构建
build_all() {
    echo ""
    echo -e "${CYAN}📦 开始全平台构建...${NC}"
    echo ""
    
    # 同步资源
    sync_www
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                   📦 全平台构建说明                                   ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  资源已同步！请分别运行各平台构建:                                     ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  🍎 iOS:        ./build-ios-release.sh                              ║${NC}"
    echo -e "${GREEN}║  🤖 Android:    ./build-android-release.sh                          ║${NC}"
    echo -e "${GREEN}║  🔷 HarmonyOS:  ./build-harmony.sh                                  ║${NC}"
    echo -e "${GREEN}║  💻 Desktop:    npm run build:all                                   ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  或者使用快捷命令:                                                   ║${NC}"
    echo -e "${GREEN}║  ./build-multi-platform.sh ios      # 仅构建 iOS                    ║${NC}"
    echo -e "${GREEN}║  ./build-multi-platform.sh android  # 仅构建 Android                ║${NC}"
    echo -e "${GREEN}║  ./build-multi-platform.sh harmony  # 仅构建 HarmonyOS              ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
}

# 查看状态
show_status() {
    echo ""
    echo -e "${CYAN}📊 构建环境状态${NC}"
    echo ""
    echo -e "${WHITE}════════════════════════════════════════════════════════════════════════${NC}"
    
    # Node.js
    if command -v node &>/dev/null; then
        echo -e "  ${GREEN}✓${NC} Node.js      $(node -v)"
    else
        echo -e "  ${RED}✗${NC} Node.js      未安装"
    fi
    
    # npm
    if command -v npm &>/dev/null; then
        echo -e "  ${GREEN}✓${NC} npm          $(npm -v)"
    else
        echo -e "  ${RED}✗${NC} npm          未安装"
    fi
    
    # Xcode
    if [ -d "/Applications/Xcode.app" ]; then
        XCODE_VER=$(xcodebuild -version 2>/dev/null | head -n 1 || echo "已安装")
        echo -e "  ${GREEN}✓${NC} Xcode        $XCODE_VER"
    else
        echo -e "  ${YELLOW}○${NC} Xcode        未安装 (iOS 需要)"
    fi
    
    # CocoaPods
    if command -v pod &>/dev/null; then
        echo -e "  ${GREEN}✓${NC} CocoaPods    $(pod --version)"
    else
        echo -e "  ${YELLOW}○${NC} CocoaPods    未安装 (iOS 需要)"
    fi
    
    # Java
    if command -v java &>/dev/null; then
        JAVA_VER=$(java -version 2>&1 | head -n 1 | cut -d'"' -f2)
        echo -e "  ${GREEN}✓${NC} Java         $JAVA_VER"
    else
        echo -e "  ${YELLOW}○${NC} Java         未安装 (Android 需要)"
    fi
    
    # Android SDK
    if [ -n "$ANDROID_HOME" ] || [ -d "$HOME/Library/Android/sdk" ]; then
        echo -e "  ${GREEN}✓${NC} Android SDK  已配置"
    else
        echo -e "  ${YELLOW}○${NC} Android SDK  未配置 (Android 需要)"
    fi
    
    # DevEco Studio
    if [ -d "/Applications/DevEco Studio.app" ]; then
        echo -e "  ${GREEN}✓${NC} DevEco       已安装"
    else
        echo -e "  ${YELLOW}○${NC} DevEco       未安装 (HarmonyOS 需要)"
    fi
    
    # Capacitor
    if npx cap --version &>/dev/null; then
        echo -e "  ${GREEN}✓${NC} Capacitor    $(npx cap --version 2>/dev/null)"
    else
        echo -e "  ${YELLOW}○${NC} Capacitor    未安装"
    fi
    
    echo ""
    echo -e "${WHITE}════════════════════════════════════════════════════════════════════════${NC}"
    echo -e "${CYAN}📁 构建产物${NC}"
    echo -e "${WHITE}════════════════════════════════════════════════════════════════════════${NC}"
    
    # 检查输出目录
    if [ -d "$DIST_DIR/ios" ] && [ "$(ls -A $DIST_DIR/ios 2>/dev/null)" ]; then
        echo -e "  ${GREEN}✓${NC} iOS          $(ls -1 $DIST_DIR/ios 2>/dev/null | head -n 1)"
    else
        echo -e "  ${YELLOW}○${NC} iOS          未构建"
    fi
    
    if [ -d "$DIST_DIR/android" ] && [ "$(ls -A $DIST_DIR/android 2>/dev/null)" ]; then
        APK_COUNT=$(ls -1 $DIST_DIR/android/*.apk 2>/dev/null | wc -l | tr -d ' ')
        echo -e "  ${GREEN}✓${NC} Android      ${APK_COUNT} 个 APK"
    else
        echo -e "  ${YELLOW}○${NC} Android      未构建"
    fi
    
    if [ -d "$DIST_DIR/harmony" ] && [ "$(ls -A $DIST_DIR/harmony 2>/dev/null)" ]; then
        echo -e "  ${GREEN}✓${NC} HarmonyOS    $(ls -1 $DIST_DIR/harmony 2>/dev/null | head -n 1)"
    else
        echo -e "  ${YELLOW}○${NC} HarmonyOS    未构建"
    fi
    
    if [ -d "$DIST_DIR" ]; then
        DMG_COUNT=$(ls -1 $DIST_DIR/*.dmg 2>/dev/null | wc -l | tr -d ' ')
        EXE_COUNT=$(ls -1 $DIST_DIR/*.exe 2>/dev/null | wc -l | tr -d ' ')
        if [ "$DMG_COUNT" -gt 0 ] || [ "$EXE_COUNT" -gt 0 ]; then
            echo -e "  ${GREEN}✓${NC} Desktop      macOS: ${DMG_COUNT}, Windows: ${EXE_COUNT}"
        else
            echo -e "  ${YELLOW}○${NC} Desktop      未构建"
        fi
    fi
    
    echo ""
}

# 主程序
main() {
    show_main_menu
    
    case $main_choice in
        1) build_ios ;;
        2) build_android ;;
        3) build_harmony ;;
        4) build_pwa ;;
        5) build_desktop ;;
        6) build_all ;;
        7) sync_www; echo -e "${GREEN}✓ 资源同步完成${NC}" ;;
        8) show_status ;;
        0) echo ""; echo "再见！👋"; exit 0 ;;
        *) echo -e "${RED}无效选项${NC}"; exit 1 ;;
    esac
}

# 如果有命令行参数，直接执行
if [ "$1" != "" ]; then
    case $1 in
        ios) build_ios ;;
        android) build_android ;;
        harmony) build_harmony ;;
        pwa) build_pwa ;;
        desktop) build_desktop ;;
        all) build_all ;;
        sync) sync_www ;;
        status) show_status ;;
        *) 
            echo "用法: $0 [ios|android|harmony|pwa|desktop|all|sync|status]"
            exit 1 
            ;;
    esac
else
    main
fi
