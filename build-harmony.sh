#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║          学术英语精进 - HarmonyOS 构建脚本 v1.0                                  ║
# ║          支持: HarmonyOS NEXT (API 9+) / 鸿蒙 4.0+                             ║
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
APP_ID="com.academic.english.harmony"
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "1.0.0")

# HarmonyOS 项目目录
HARMONY_DIR="$PROJECT_DIR/harmony-next"
OUTPUT_DIR="$PROJECT_DIR/dist/harmony"
mkdir -p "$OUTPUT_DIR"

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           🔷 ${APP_NAME} - HarmonyOS 构建工具 v1.0                    ║${NC}"
echo -e "${BLUE}╠══════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║  版本: ${VERSION}                                                          ║${NC}"
echo -e "${BLUE}║  Bundle: ${APP_ID}                                           ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 显示菜单
show_menu() {
    echo -e "${CYAN}请选择操作:${NC}"
    echo ""
    echo -e "  ${GREEN}1)${NC} 同步 Web 资源 - 复制 PWA 文件到 rawfile"
    echo -e "  ${GREEN}2)${NC} 打开 DevEco Studio - 使用 IDE 构建"
    echo -e "  ${GREEN}3)${NC} 命令行构建 HAP - 需要配置环境"
    echo -e "  ${GREEN}4)${NC} 创建签名配置 - 生成发布签名"
    echo -e "  ${GREEN}5)${NC} 查看构建指南 - 详细说明"
    echo -e "  ${RED}0)${NC} 退出"
    echo ""
    read -p "请输入选项 [0-5]: " choice
}

# 检查环境
check_environment() {
    echo -e "${YELLOW}🔍 检查构建环境...${NC}"
    
    # 检查 Node.js
    if command -v node &>/dev/null; then
        echo -e "${GREEN}   ✓ Node.js $(node -v)${NC}"
    else
        echo -e "${YELLOW}   ⚠️ Node.js 未安装${NC}"
    fi
    
    # 检查 DevEco Studio (macOS)
    if [ -d "/Applications/DevEco Studio.app" ]; then
        echo -e "${GREEN}   ✓ DevEco Studio 已安装${NC}"
    elif [ -d "$HOME/Applications/DevEco Studio.app" ]; then
        echo -e "${GREEN}   ✓ DevEco Studio 已安装 (用户目录)${NC}"
    else
        echo -e "${YELLOW}   ⚠️ DevEco Studio 未检测到${NC}"
        echo -e "${YELLOW}      请从华为开发者联盟下载安装${NC}"
    fi
    
    # 检查 hvigorw (HarmonyOS 构建工具)
    if [ -f "$HARMONY_DIR/hvigorw" ] || command -v hvigorw &>/dev/null; then
        echo -e "${GREEN}   ✓ Hvigor 构建工具可用${NC}"
    else
        echo -e "${YELLOW}   ⚠️ Hvigor 命令行工具未配置${NC}"
    fi
    
    echo ""
}

# 同步 Web 资源
sync_web_resources() {
    echo ""
    echo -e "${CYAN}🔄 同步 Web 资源到 HarmonyOS 项目${NC}"
    echo ""
    
    # 创建 rawfile 目录
    RAWFILE_DIR="$HARMONY_DIR/entry/src/main/resources/rawfile/www"
    mkdir -p "$RAWFILE_DIR"
    
    echo -e "${YELLOW}📦 复制 Web 文件...${NC}"
    
    # 复制核心文件
    cp "$PROJECT_DIR/index.html" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/styles.css" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/app.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/vocabulary.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/dictionary.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/modules.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/listening-module.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/listening-data.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/reading-data.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/sources.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/online_sources.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/sw.js" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/manifest.json" "$RAWFILE_DIR/"
    cp "$PROJECT_DIR/auth.js" "$RAWFILE_DIR/"
    
    # 复制数据文件
    cp "$PROJECT_DIR/words.json" "$RAWFILE_DIR/" 2>/dev/null || true
    cp "$PROJECT_DIR/word_definitions.json" "$RAWFILE_DIR/" 2>/dev/null || true
    cp "$PROJECT_DIR/word_chinese.json" "$RAWFILE_DIR/" 2>/dev/null || true
    
    # 复制资源目录
    if [ -d "$PROJECT_DIR/assets" ]; then
        cp -r "$PROJECT_DIR/assets" "$RAWFILE_DIR/"
    fi
    
    echo -e "${GREEN}   ✓ Web 资源已同步到 rawfile/www/${NC}"
    
    # 统计文件数量
    FILE_COUNT=$(find "$RAWFILE_DIR" -type f | wc -l | tr -d ' ')
    TOTAL_SIZE=$(du -sh "$RAWFILE_DIR" | cut -f1)
    echo -e "${GREEN}   ✓ 共 ${FILE_COUNT} 个文件，总计 ${TOTAL_SIZE}${NC}"
    
    echo ""
    echo -e "${GREEN}✓ Web 资源同步完成！${NC}"
}

# 打开 DevEco Studio
open_deveco() {
    echo ""
    echo -e "${CYAN}🔧 打开 DevEco Studio${NC}"
    echo ""
    
    # 先同步资源
    sync_web_resources
    
    # 查找 DevEco Studio
    DEVECO_PATH=""
    if [ -d "/Applications/DevEco Studio.app" ]; then
        DEVECO_PATH="/Applications/DevEco Studio.app"
    elif [ -d "$HOME/Applications/DevEco Studio.app" ]; then
        DEVECO_PATH="$HOME/Applications/DevEco Studio.app"
    fi
    
    if [ -n "$DEVECO_PATH" ]; then
        echo -e "${YELLOW}📱 打开 DevEco Studio...${NC}"
        open "$DEVECO_PATH" --args "$HARMONY_DIR"
        
        echo ""
        echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
        echo -e "${GREEN}║              🎉 DevEco Studio 已打开                                 ║${NC}"
        echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
        echo -e "${GREEN}║  在 DevEco Studio 中:                                               ║${NC}"
        echo -e "${GREEN}║  1. File → Open → 选择 harmony-next 目录                           ║${NC}"
        echo -e "${GREEN}║  2. 等待项目同步完成                                                ║${NC}"
        echo -e "${GREEN}║  3. 连接华为手机或使用模拟器                                         ║${NC}"
        echo -e "${GREEN}║  4. 点击 ▶ 运行按钮                                                 ║${NC}"
        echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
        echo -e "${GREEN}║  构建 HAP 包:                                                        ║${NC}"
        echo -e "${GREEN}║  Build → Build Hap(s)/App(s) → Build Hap(s)                        ║${NC}"
        echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
    else
        echo -e "${RED}❌ 未找到 DevEco Studio${NC}"
        echo ""
        echo "请从华为开发者联盟下载 DevEco Studio:"
        echo "https://developer.harmonyos.com/cn/develop/deveco-studio"
        echo ""
        echo "安装后，手动打开项目："
        echo "  项目路径: $HARMONY_DIR"
    fi
}

# 命令行构建
build_hap() {
    echo ""
    echo -e "${CYAN}📦 命令行构建 HAP${NC}"
    echo ""
    
    # 同步资源
    sync_web_resources
    
    cd "$HARMONY_DIR"
    
    # 检查 hvigorw
    if [ -f "./hvigorw" ]; then
        echo -e "${YELLOW}📦 开始构建...${NC}"
        chmod +x ./hvigorw
        ./hvigorw assembleHap --mode module -p product=default
        
        # 查找构建产物
        HAP_PATH=$(find . -name "*.hap" -type f 2>/dev/null | head -n 1)
        if [ -n "$HAP_PATH" ]; then
            cp "$HAP_PATH" "$OUTPUT_DIR/academic-english-v${VERSION}.hap"
            echo -e "${GREEN}   ✓ HAP 构建成功${NC}"
            echo -e "${GREEN}   输出: dist/harmony/academic-english-v${VERSION}.hap${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️ 命令行构建需要配置 Hvigor${NC}"
        echo ""
        echo "建议使用 DevEco Studio 构建 (选项 2)"
        echo ""
        echo "或者配置命令行环境:"
        echo "1. 安装 DevEco Studio"
        echo "2. 配置环境变量 DEVECO_SDK_HOME"
        echo "3. 在项目目录运行 ohpm install"
    fi
    
    cd "$PROJECT_DIR"
}

# 创建签名配置
create_signing() {
    echo ""
    echo -e "${CYAN}🔐 HarmonyOS 签名配置指南${NC}"
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              HarmonyOS 应用签名步骤                                   ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  1. 注册华为开发者账号                                               ║${NC}"
    echo -e "${GREEN}║     https://developer.huawei.com/consumer/cn/                       ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  2. 创建应用                                                         ║${NC}"
    echo -e "${GREEN}║     AppGallery Connect → 我的项目 → 添加项目                        ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  3. 生成签名证书                                                     ║${NC}"
    echo -e "${GREEN}║     DevEco Studio → Build → Generate Key and CSR                   ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  4. 申请发布证书                                                     ║${NC}"
    echo -e "${GREEN}║     AppGallery Connect → 用户与访问 → 证书管理                      ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  5. 配置签名                                                         ║${NC}"
    echo -e "${GREEN}║     DevEco Studio → File → Project Structure → Signing Configs    ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
}

# 显示构建指南
show_guide() {
    echo ""
    echo -e "${CYAN}📖 HarmonyOS 构建完整指南${NC}"
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║              HarmonyOS NEXT 应用发布指南                              ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【环境准备】                                                         ║${NC}"
    echo -e "${GREEN}║  1. 下载 DevEco Studio 4.0+                                         ║${NC}"
    echo -e "${GREEN}║     https://developer.harmonyos.com/cn/develop/deveco-studio        ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  2. 配置 SDK                                                        ║${NC}"
    echo -e "${GREEN}║     DevEco Studio → Settings → SDK → HarmonyOS SDK                 ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【开发调试】                                                         ║${NC}"
    echo -e "${GREEN}║  1. 连接华为手机 (需开启开发者选项)                                   ║${NC}"
    echo -e "${GREEN}║  2. 或使用 Remote Emulator (需登录华为账号)                          ║${NC}"
    echo -e "${GREEN}║  3. 点击运行按钮安装调试                                              ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【构建发布】                                                         ║${NC}"
    echo -e "${GREEN}║  1. Build → Build Hap(s)/App(s) → Build Hap(s)                     ║${NC}"
    echo -e "${GREEN}║  2. 生成 .hap 安装包                                                 ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【华为应用市场发布】                                                 ║${NC}"
    echo -e "${GREEN}║  1. 登录 AppGallery Connect                                         ║${NC}"
    echo -e "${GREEN}║     https://developer.huawei.com/consumer/cn/service/josp/agc      ║${NC}"
    echo -e "${GREEN}║  2. 创建应用 → 上传 HAP/APP 包                                       ║${NC}"
    echo -e "${GREEN}║  3. 填写应用信息、截图、隐私政策                                      ║${NC}"
    echo -e "${GREEN}║  4. 提交审核                                                        ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  【项目结构】                                                         ║${NC}"
    echo -e "${GREEN}║  harmony-next/                                                      ║${NC}"
    echo -e "${GREEN}║  ├── AppScope/           # 应用级配置                                ║${NC}"
    echo -e "${GREEN}║  ├── entry/              # 主模块                                    ║${NC}"
    echo -e "${GREEN}║  │   └── src/main/                                                  ║${NC}"
    echo -e "${GREEN}║  │       ├── ets/        # ArkTS 代码                               ║${NC}"
    echo -e "${GREEN}║  │       └── resources/  # 资源文件                                  ║${NC}"
    echo -e "${GREEN}║  │           └── rawfile/www/  # PWA Web 文件                       ║${NC}"
    echo -e "${GREEN}║  └── build-profile.json5 # 构建配置                                  ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
}

# 主程序
main() {
    check_environment
    show_menu
    
    case $choice in
        1) sync_web_resources ;;
        2) open_deveco ;;
        3) build_hap ;;
        4) create_signing ;;
        5) show_guide ;;
        0) echo "退出"; exit 0 ;;
        *) echo -e "${RED}无效选项${NC}"; exit 1 ;;
    esac
}

# 如果有命令行参数，直接执行
if [ "$1" != "" ]; then
    check_environment
    case $1 in
        sync) sync_web_resources ;;
        open) open_deveco ;;
        build) build_hap ;;
        sign) create_signing ;;
        guide) show_guide ;;
        *) echo "用法: $0 [sync|open|build|sign|guide]"; exit 1 ;;
    esac
else
    main
fi
