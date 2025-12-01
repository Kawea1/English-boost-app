#!/bin/bash

# ╔══════════════════════════════════════════════════════════════════════════════╗
# ║          学术英语精进 - Android 发布构建脚本 v1.0                                ║
# ║          支持: Debug APK / Release APK / AAB (Google Play)                    ║
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
OUTPUT_DIR="$PROJECT_DIR/dist/android"
mkdir -p "$OUTPUT_DIR"

# 签名配置 (请修改为你自己的签名信息)
KEYSTORE_PATH="$PROJECT_DIR/android/app/release-key.keystore"
KEY_ALIAS="academic-english"

echo ""
echo -e "${BLUE}╔══════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║              🤖 ${APP_NAME} - Android 构建工具 v1.0                   ║${NC}"
echo -e "${BLUE}╠══════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${BLUE}║  版本: ${VERSION}                                                          ║${NC}"
echo -e "${BLUE}║  Package: ${APP_ID}                                                ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# 显示菜单
show_menu() {
    echo -e "${CYAN}请选择构建模式:${NC}"
    echo ""
    echo -e "  ${GREEN}1)${NC} Debug APK - 开发调试 (无需签名)"
    echo -e "  ${GREEN}2)${NC} Release APK - 正式版 APK (需要签名)"
    echo -e "  ${GREEN}3)${NC} Release AAB - Google Play 发布包"
    echo -e "  ${GREEN}4)${NC} 创建签名密钥 - 生成发布用的 keystore"
    echo -e "  ${GREEN}5)${NC} 打开 Android Studio - 手动构建"
    echo -e "  ${GREEN}6)${NC} 仅同步资源 - 更新 www 目录"
    echo -e "  ${RED}0)${NC} 退出"
    echo ""
    read -p "请输入选项 [0-6]: " choice
}

# 检查环境
check_environment() {
    echo -e "${YELLOW}🔍 检查构建环境...${NC}"
    
    # 检查 Node.js
    if ! command -v node &>/dev/null; then
        echo -e "${RED}❌ 未检测到 Node.js${NC}"
        exit 1
    fi
    echo -e "${GREEN}   ✓ Node.js $(node -v)${NC}"
    
    # 检查 Java
    if ! command -v java &>/dev/null; then
        echo -e "${RED}❌ 未检测到 Java${NC}"
        echo "   请安装 JDK 11 或更高版本"
        exit 1
    fi
    JAVA_VERSION=$(java -version 2>&1 | head -n 1)
    echo -e "${GREEN}   ✓ Java: $JAVA_VERSION${NC}"
    
    # 检查 Android SDK (通过 ANDROID_HOME 或 ANDROID_SDK_ROOT)
    if [ -z "$ANDROID_HOME" ] && [ -z "$ANDROID_SDK_ROOT" ]; then
        # 尝试常见位置
        if [ -d "$HOME/Library/Android/sdk" ]; then
            export ANDROID_HOME="$HOME/Library/Android/sdk"
        elif [ -d "$HOME/Android/Sdk" ]; then
            export ANDROID_HOME="$HOME/Android/Sdk"
        else
            echo -e "${YELLOW}⚠️  未设置 ANDROID_HOME，将使用 Android Studio 构建${NC}"
        fi
    fi
    
    if [ -n "$ANDROID_HOME" ]; then
        echo -e "${GREEN}   ✓ Android SDK: $ANDROID_HOME${NC}"
    fi
    
    # 检查 Capacitor CLI
    if ! npx cap --version &>/dev/null; then
        echo -e "${YELLOW}📦 安装 Capacitor CLI...${NC}"
        npm install @capacitor/cli @capacitor/core @capacitor/android
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
    echo -e "${YELLOW}📦 Capacitor Android 同步...${NC}"
    npx cap sync android
    echo -e "${GREEN}   ✓ Capacitor 同步完成${NC}"
}

# 构建 Debug APK
build_debug_apk() {
    echo ""
    echo -e "${CYAN}🔧 构建 Debug APK${NC}"
    echo ""
    
    sync_web_resources
    capacitor_sync
    
    echo -e "${YELLOW}📦 构建 Debug APK...${NC}"
    cd "$PROJECT_DIR/android"
    
    # 使用 Gradle Wrapper 构建
    ./gradlew assembleDebug
    
    # 复制 APK 到输出目录
    APK_PATH="$PROJECT_DIR/android/app/build/outputs/apk/debug/app-debug.apk"
    if [ -f "$APK_PATH" ]; then
        cp "$APK_PATH" "$OUTPUT_DIR/academic-english-debug-v${VERSION}.apk"
        echo -e "${GREEN}   ✓ Debug APK 构建成功${NC}"
    fi
    
    cd "$PROJECT_DIR"
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                    🎉 Debug APK 构建完成                              ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  APK 位置:                                                           ║${NC}"
    echo -e "${GREEN}║  dist/android/academic-english-debug-v${VERSION}.apk                     ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  安装方法:                                                           ║${NC}"
    echo -e "${GREEN}║  1. 传输 APK 到 Android 手机                                         ║${NC}"
    echo -e "${GREEN}║  2. 在手机上打开 APK 文件安装                                         ║${NC}"
    echo -e "${GREEN}║  3. 或使用 adb: adb install dist/android/academic-english-debug.apk ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
    
    # 打开输出目录
    open "$OUTPUT_DIR" 2>/dev/null || xdg-open "$OUTPUT_DIR" 2>/dev/null || true
}

# 创建签名密钥
create_keystore() {
    echo ""
    echo -e "${CYAN}🔐 创建签名密钥${NC}"
    echo ""
    
    if [ -f "$KEYSTORE_PATH" ]; then
        echo -e "${YELLOW}⚠️  签名密钥已存在: $KEYSTORE_PATH${NC}"
        read -p "是否覆盖? (y/N): " confirm
        if [ "$confirm" != "y" ] && [ "$confirm" != "Y" ]; then
            echo "已取消"
            return
        fi
    fi
    
    echo -e "${YELLOW}请输入签名信息:${NC}"
    read -p "密钥密码 (至少6位): " -s STORE_PASSWORD
    echo ""
    read -p "确认密码: " -s STORE_PASSWORD_CONFIRM
    echo ""
    
    if [ "$STORE_PASSWORD" != "$STORE_PASSWORD_CONFIRM" ]; then
        echo -e "${RED}❌ 密码不匹配${NC}"
        return
    fi
    
    read -p "您的姓名: " CN
    read -p "组织单位: " OU
    read -p "组织名称: " O
    read -p "城市: " L
    read -p "省份: " ST
    read -p "国家代码 (如 CN): " C
    
    # 生成密钥
    keytool -genkey -v \
        -keystore "$KEYSTORE_PATH" \
        -keyalg RSA \
        -keysize 2048 \
        -validity 10000 \
        -alias "$KEY_ALIAS" \
        -storepass "$STORE_PASSWORD" \
        -keypass "$STORE_PASSWORD" \
        -dname "CN=$CN, OU=$OU, O=$O, L=$L, ST=$ST, C=$C"
    
    echo ""
    echo -e "${GREEN}✓ 签名密钥创建成功: $KEYSTORE_PATH${NC}"
    echo -e "${YELLOW}⚠️  请妥善保管密钥文件和密码！丢失后无法更新 App！${NC}"
    
    # 创建签名配置文件
    cat > "$PROJECT_DIR/android/signing.properties" << EOF
# 签名配置 (请勿提交到 Git)
storeFile=release-key.keystore
storePassword=$STORE_PASSWORD
keyAlias=$KEY_ALIAS
keyPassword=$STORE_PASSWORD
EOF
    
    echo -e "${GREEN}✓ 签名配置已保存到 android/signing.properties${NC}"
    
    # 添加到 .gitignore
    if ! grep -q "signing.properties" "$PROJECT_DIR/.gitignore" 2>/dev/null; then
        echo "android/signing.properties" >> "$PROJECT_DIR/.gitignore"
        echo "android/app/release-key.keystore" >> "$PROJECT_DIR/.gitignore"
        echo -e "${GREEN}✓ 已添加到 .gitignore${NC}"
    fi
}

# 构建 Release APK
build_release_apk() {
    echo ""
    echo -e "${CYAN}📦 构建 Release APK${NC}"
    echo ""
    
    # 检查签名密钥
    if [ ! -f "$KEYSTORE_PATH" ]; then
        echo -e "${YELLOW}⚠️  未找到签名密钥${NC}"
        echo "是否现在创建签名密钥?"
        read -p "(y/N): " confirm
        if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
            create_keystore
        else
            echo "请先创建签名密钥 (选项 4)"
            return
        fi
    fi
    
    # 读取签名配置
    if [ -f "$PROJECT_DIR/android/signing.properties" ]; then
        source <(grep -v '^#' "$PROJECT_DIR/android/signing.properties" | sed 's/ *= */=/g')
    else
        read -p "请输入密钥密码: " -s STORE_PASSWORD
        echo ""
    fi
    
    sync_web_resources
    capacitor_sync
    
    echo -e "${YELLOW}📦 构建 Release APK...${NC}"
    cd "$PROJECT_DIR/android"
    
    # 配置 Gradle 签名
    cat > "$PROJECT_DIR/android/app/signing.gradle" << EOF
android {
    signingConfigs {
        release {
            storeFile file('release-key.keystore')
            storePassword '$STORE_PASSWORD'
            keyAlias '$KEY_ALIAS'
            keyPassword '$STORE_PASSWORD'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
EOF
    
    # 构建
    ./gradlew assembleRelease
    
    # 复制 APK
    APK_PATH="$PROJECT_DIR/android/app/build/outputs/apk/release/app-release.apk"
    if [ -f "$APK_PATH" ]; then
        cp "$APK_PATH" "$OUTPUT_DIR/academic-english-v${VERSION}.apk"
        echo -e "${GREEN}   ✓ Release APK 构建成功${NC}"
    fi
    
    cd "$PROJECT_DIR"
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                   🎉 Release APK 构建完成                             ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  APK 位置: dist/android/academic-english-v${VERSION}.apk                  ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  分发方式:                                                           ║${NC}"
    echo -e "${GREEN}║  • 直接分享 APK 文件给用户安装                                        ║${NC}"
    echo -e "${GREEN}║  • 上传到第三方应用商店 (蒲公英、fir.im、酷安等)                       ║${NC}"
    echo -e "${GREEN}║  • 上传到国内应用商店 (华为、小米、OPPO、vivo 等)                      ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
    
    open "$OUTPUT_DIR" 2>/dev/null || xdg-open "$OUTPUT_DIR" 2>/dev/null || true
}

# 构建 AAB (Google Play)
build_aab() {
    echo ""
    echo -e "${CYAN}📦 构建 Release AAB (Google Play)${NC}"
    echo ""
    
    # 检查签名密钥
    if [ ! -f "$KEYSTORE_PATH" ]; then
        echo -e "${YELLOW}⚠️  未找到签名密钥，请先创建 (选项 4)${NC}"
        return
    fi
    
    # 读取签名配置
    if [ -f "$PROJECT_DIR/android/signing.properties" ]; then
        source <(grep -v '^#' "$PROJECT_DIR/android/signing.properties" | sed 's/ *= */=/g')
    else
        read -p "请输入密钥密码: " -s STORE_PASSWORD
        echo ""
    fi
    
    sync_web_resources
    capacitor_sync
    
    echo -e "${YELLOW}📦 构建 AAB...${NC}"
    cd "$PROJECT_DIR/android"
    
    ./gradlew bundleRelease
    
    # 复制 AAB
    AAB_PATH="$PROJECT_DIR/android/app/build/outputs/bundle/release/app-release.aab"
    if [ -f "$AAB_PATH" ]; then
        cp "$AAB_PATH" "$OUTPUT_DIR/academic-english-v${VERSION}.aab"
        echo -e "${GREEN}   ✓ AAB 构建成功${NC}"
    fi
    
    cd "$PROJECT_DIR"
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                   🎉 AAB 构建完成                                    ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  AAB 位置: dist/android/academic-english-v${VERSION}.aab                  ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  Google Play 发布:                                                   ║${NC}"
    echo -e "${GREEN}║  1. 登录 Google Play Console                                        ║${NC}"
    echo -e "${GREEN}║  2. 创建应用 → 上传 AAB 文件                                         ║${NC}"
    echo -e "${GREEN}║  3. 填写应用信息、截图、隐私政策                                      ║${NC}"
    echo -e "${GREEN}║  4. 提交审核                                                        ║${NC}"
    echo -e "${GREEN}╚══════════════════════════════════════════════════════════════════════╝${NC}"
    
    open "$OUTPUT_DIR" 2>/dev/null || xdg-open "$OUTPUT_DIR" 2>/dev/null || true
}

# 打开 Android Studio
open_android_studio() {
    echo ""
    echo -e "${CYAN}🔧 打开 Android Studio${NC}"
    echo ""
    
    sync_web_resources
    capacitor_sync
    
    echo -e "${YELLOW}📱 打开 Android Studio...${NC}"
    npx cap open android
    
    echo ""
    echo -e "${GREEN}╔══════════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${GREEN}║                Android Studio 已打开                                 ║${NC}"
    echo -e "${GREEN}╠══════════════════════════════════════════════════════════════════════╣${NC}"
    echo -e "${GREEN}║  构建 APK:                                                          ║${NC}"
    echo -e "${GREEN}║  Build → Build Bundle(s) / APK(s) → Build APK(s)                   ║${NC}"
    echo -e "${GREEN}║                                                                      ║${NC}"
    echo -e "${GREEN}║  构建签名 APK:                                                       ║${NC}"
    echo -e "${GREEN}║  Build → Generate Signed Bundle / APK                              ║${NC}"
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
        1) build_debug_apk ;;
        2) build_release_apk ;;
        3) build_aab ;;
        4) create_keystore ;;
        5) open_android_studio ;;
        6) sync_only ;;
        0) echo "退出"; exit 0 ;;
        *) echo -e "${RED}无效选项${NC}"; exit 1 ;;
    esac
}

# 如果有命令行参数，直接执行
if [ "$1" != "" ]; then
    check_environment
    case $1 in
        debug) build_debug_apk ;;
        release) build_release_apk ;;
        aab) build_aab ;;
        keystore) create_keystore ;;
        studio) open_android_studio ;;
        sync) sync_only ;;
        *) echo "用法: $0 [debug|release|aab|keystore|studio|sync]"; exit 1 ;;
    esac
else
    main
fi
