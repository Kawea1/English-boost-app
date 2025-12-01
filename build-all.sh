#!/bin/bash

# 学术英语精进 - 全平台构建脚本
# 支持: macOS, Windows, Linux, iOS, Android, 鸿蒙

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_DIR="/Users/huangjiawei/english-boost-app"
cd "$PROJECT_DIR"

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║          学术英语精进 - 全平台构建工具 v1.0                  ║${NC}"
echo -e "${CYAN}╠════════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║  🖥️  桌面: macOS / Windows / Linux (Electron)              ║${NC}"
echo -e "${CYAN}║  📱 移动: iOS / Android (Capacitor)                        ║${NC}"
echo -e "${CYAN}║  🔷 鸿蒙: HarmonyOS (DevEco Studio)                        ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 显示菜单
show_menu() {
    echo -e "${BLUE}请选择要构建的平台:${NC}"
    echo ""
    echo "  1) 🍎 macOS 桌面应用 (.dmg)"
    echo "  2) 🪟 Windows 桌面应用 (.exe)"
    echo "  3) 🐧 Linux 桌面应用 (.AppImage)"
    echo "  4) 📱 iOS 应用 (需要 Xcode)"
    echo "  5) 🤖 Android 应用 (需要 Android Studio)"
    echo "  6) 🔷 鸿蒙应用 (需要 DevEco Studio)"
    echo "  7) 🌐 同步 Web 资源到所有平台"
    echo "  8) 📦 构建全部桌面平台"
    echo "  9) 📱 构建全部移动平台"
    echo "  0) ❌ 退出"
    echo ""
}

# 同步Web资源
sync_web() {
    echo -e "${YELLOW}📦 同步 Web 资源...${NC}"
    
    # 更新 www 目录
    mkdir -p www
    cp index.html styles.css app.js vocabulary.js dictionary.js modules.js \
       listening-module.js listening-data.js reading-data.js sources.js \
       online_sources.js sw.js manifest.json auth.js www/ 2>/dev/null || true
    cp -r assets www/ 2>/dev/null || true
    cp words.json word_definitions.json word_chinese.json www/ 2>/dev/null || true
    
    # 同步到 Capacitor 平台
    npx cap sync 2>/dev/null || true
    
    # 同步到鸿蒙
    mkdir -p harmony/common
    cp -r www/* harmony/common/ 2>/dev/null || true
    
    echo -e "${GREEN}   ✓ Web 资源已同步到所有平台${NC}"
}

# 构建 macOS
build_mac() {
    echo -e "${YELLOW}🍎 构建 macOS 应用...${NC}"
    npm run build:mac
    echo -e "${GREEN}   ✓ macOS 应用构建完成: dist/学术英语精进-*.dmg${NC}"
}

# 构建 Windows
build_win() {
    echo -e "${YELLOW}🪟 构建 Windows 应用...${NC}"
    npm run build:win
    echo -e "${GREEN}   ✓ Windows 应用构建完成: dist/学术英语精进*.exe${NC}"
}

# 构建 Linux
build_linux() {
    echo -e "${YELLOW}🐧 构建 Linux 应用...${NC}"
    npm run build:linux
    echo -e "${GREEN}   ✓ Linux 应用构建完成: dist/学术英语精进*.AppImage${NC}"
}

# 构建 iOS
build_ios() {
    echo -e "${YELLOW}📱 构建 iOS 应用...${NC}"
    
    # 检查 Xcode
    if ! xcode-select -p &>/dev/null || [ ! -d "/Applications/Xcode.app" ]; then
        echo -e "${RED}❌ 错误: 需要安装 Xcode${NC}"
        echo ""
        echo "请从 App Store 安装 Xcode，然后运行:"
        echo "  sudo xcode-select -s /Applications/Xcode.app/Contents/Developer"
        echo "  sudo gem install cocoapods"
        return 1
    fi
    
    sync_web
    npx cap open ios
    
    echo -e "${GREEN}   ✓ Xcode 已打开 iOS 项目${NC}"
    echo ""
    echo -e "${BLUE}在 Xcode 中:${NC}"
    echo "  1. 选择你的开发团队 (Signing & Capabilities)"
    echo "  2. 连接 iPhone 或选择模拟器"
    echo "  3. 点击 ▶ 运行"
}

# 构建 Android
build_android() {
    echo -e "${YELLOW}🤖 构建 Android 应用...${NC}"
    
    # 检查 Android Studio
    if [ ! -d "/Applications/Android Studio.app" ] && [ ! -d "$HOME/Library/Android/sdk" ]; then
        echo -e "${RED}❌ 错误: 需要安装 Android Studio${NC}"
        echo ""
        echo "请从以下地址下载安装:"
        echo "  https://developer.android.com/studio"
        return 1
    fi
    
    sync_web
    npx cap open android
    
    echo -e "${GREEN}   ✓ Android Studio 已打开项目${NC}"
    echo ""
    echo -e "${BLUE}在 Android Studio 中:${NC}"
    echo "  1. 等待 Gradle 同步完成"
    echo "  2. 连接 Android 手机或启动模拟器"
    echo "  3. 点击 ▶ 运行"
    echo "  4. 构建 APK: Build → Build Bundle(s) / APK(s) → Build APK(s)"
}

# 构建鸿蒙
build_harmony() {
    echo -e "${YELLOW}🔷 构建鸿蒙应用...${NC}"
    
    # 检查 DevEco Studio
    if [ ! -d "/Applications/DevEco Studio.app" ] && [ ! -d "$HOME/Applications/DevEco Studio.app" ]; then
        echo -e "${RED}❌ 错误: 需要安装 DevEco Studio${NC}"
        echo ""
        echo "请从华为开发者联盟下载:"
        echo "  https://developer.harmonyos.com/cn/develop/deveco-studio"
        echo ""
        echo "安装完成后，将 harmony 目录导入 DevEco Studio"
        return 1
    fi
    
    sync_web
    
    # 打开 DevEco Studio
    if [ -d "/Applications/DevEco Studio.app" ]; then
        open "/Applications/DevEco Studio.app" --args "$PROJECT_DIR/harmony"
    else
        open "$HOME/Applications/DevEco Studio.app" --args "$PROJECT_DIR/harmony"
    fi
    
    echo -e "${GREEN}   ✓ 鸿蒙项目已准备${NC}"
    echo ""
    echo -e "${BLUE}在 DevEco Studio 中:${NC}"
    echo "  1. File → Open → 选择 harmony 目录"
    echo "  2. 等待项目同步完成"
    echo "  3. 连接华为/荣耀手机或启动模拟器"
    echo "  4. 点击 ▶ 运行"
}

# 主循环
while true; do
    show_menu
    read -p "请输入选项 [0-9]: " choice
    echo ""
    
    case $choice in
        1) build_mac ;;
        2) build_win ;;
        3) build_linux ;;
        4) build_ios ;;
        5) build_android ;;
        6) build_harmony ;;
        7) sync_web ;;
        8) 
            echo -e "${YELLOW}📦 构建全部桌面平台...${NC}"
            build_mac
            build_win
            build_linux
            ;;
        9)
            echo -e "${YELLOW}📱 构建全部移动平台...${NC}"
            sync_web
            build_ios
            build_android
            build_harmony
            ;;
        0) 
            echo -e "${GREEN}再见！${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}无效选项，请重试${NC}"
            ;;
    esac
    
    echo ""
    read -p "按回车键继续..."
    echo ""
done
