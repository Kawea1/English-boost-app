#!/bin/bash

# ==========================================
# English Boost 桌面应用打包脚本
# 支持 Windows, macOS, Linux
# ==========================================

set -e

echo "🚀 English Boost 桌面应用打包工具"
echo "=================================="

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 需要安装 Node.js"
    echo "请访问 https://nodejs.org 下载安装"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"

# 安装依赖
echo ""
echo "📦 安装依赖..."
npm install

# 检测操作系统
OS=$(uname -s)
ARCH=$(uname -m)

echo ""
echo "🖥️  检测到系统: $OS ($ARCH)"

# 根据系统选择打包目标
case "$OS" in
    Darwin)
        echo "🍎 打包 macOS 应用..."
        npm run build:mac
        echo ""
        echo "✅ macOS 应用已生成到 dist/ 目录"
        echo "   - DMG 安装包: dist/*.dmg"
        ;;
    Linux)
        echo "🐧 打包 Linux 应用..."
        npm run build:linux
        echo ""
        echo "✅ Linux 应用已生成到 dist/ 目录"
        echo "   - AppImage: dist/*.AppImage"
        echo "   - DEB包: dist/*.deb"
        ;;
    MINGW*|CYGWIN*|MSYS*)
        echo "🪟 打包 Windows 应用..."
        npm run build:win
        echo ""
        echo "✅ Windows 应用已生成到 dist/ 目录"
        echo "   - 安装包: dist/*.exe"
        echo "   - 便携版: dist/*-portable.exe"
        ;;
    *)
        echo "⚠️  未知系统，尝试打包所有平台..."
        npm run build
        ;;
esac

echo ""
echo "🎉 打包完成！"
echo ""
echo "📁 输出目录: $(pwd)/dist/"
ls -la dist/ 2>/dev/null || echo "   (等待生成...)"
