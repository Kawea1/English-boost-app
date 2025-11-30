#!/bin/bash

# 学术英语精进 - 一键打包脚本
# 支持 macOS / Windows / Linux

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║         学术英语精进 - 应用打包工具                          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    echo "请先安装 Node.js: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js 版本: $(node -v)"
echo "✓ npm 版本: $(npm -v)"
echo ""

# 安装依赖
echo "📦 安装依赖..."
npm install

# 选择打包平台
echo ""
echo "请选择打包平台:"
echo "  1) macOS (dmg)"
echo "  2) Windows (exe 安装包)"
echo "  3) Windows (便携版)"
echo "  4) Linux (AppImage)"
echo "  5) 全平台打包"
echo ""
read -p "请输入选项 [1-5]: " choice

case $choice in
    1)
        echo "🍎 正在打包 macOS 版本..."
        npm run build:mac
        ;;
    2)
        echo "🪟 正在打包 Windows 安装版..."
        npm run build:win
        ;;
    3)
        echo "🪟 正在打包 Windows 便携版..."
        npx electron-builder --win portable
        ;;
    4)
        echo "🐧 正在打包 Linux 版本..."
        npm run build:linux
        ;;
    5)
        echo "🌍 正在打包全平台版本..."
        npm run build:all
        ;;
    *)
        echo "❌ 无效选项"
        exit 1
        ;;
esac

echo ""
echo "════════════════════════════════════════════════════════════"
echo "✅ 打包完成！"
echo "📁 输出目录: ./dist/"
echo ""
echo "提示："
echo "  - macOS: 双击 .dmg 文件安装"
echo "  - Windows: 运行 .exe 安装程序"
echo "  - Linux: 运行 .AppImage 文件"
echo "════════════════════════════════════════════════════════════"
