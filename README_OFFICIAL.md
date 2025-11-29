如何把官方真题导入本地 PWA

步骤概览：

1. 法律与授权（必须）：
   - 请确认你拥有这些真题文件的合法使用权（个人学习/备考许可）。
   - 我不能替你下载付费或受版权保护的真题；但可以帮助你把你拥有的文件解析并集成到本地应用。

2. 准备本地文件：
   - 在项目根目录创建文件夹 `official_inputs/`。
   - 把官方 PDF（或音频）放入 `official_inputs/`。音频放在 `official_inputs/audio/`。

3. 安装依赖（Python 环境）：
```bash
python3 -m venv .venv
source .venv/bin/activate
pip install pypdf pdfminer.six pytesseract pillow pydub
# 如果需要 OCR：
# brew install tesseract  (macOS)
```

4. 运行解析脚本：
```bash
python3 scripts/ingest_official.py
```

5. 结果会写入 `official_parsed/official_parsed.json`，你可以检查并授权我把这些解析后的条目合并为 app 内的练习集。

6. 我可以继续：
   - 把解析后的真题拆分成题目 JSON（阅读、听力、选择题等）。
   - 在 `reading` 和 `listening` 模块中显示并生成互动作答界面。

如果你同意并愿意上传真题文件到 `official_inputs/`（或把文件通过其它方式提供给我），我会立即开始解析并把结果集成到 app。 
