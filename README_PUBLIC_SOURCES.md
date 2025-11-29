README: 公共在线资源已加入
=================================

我已将一组公开、免费可访问的在线资源添加到项目，用于在没有官方真题时补充练习材料：

- 文件：`online_sources.js`
  - 描述：设置了 `window.ONLINE_SOURCES`，包含若干 TED 演讲页面、ETS 官方样题与其他免费练习页面。
  - 用法：前端调用 `initOnlineResources()` 或直接读取 `window.ONLINE_SOURCES` 来显示这些资源；也可以通过 `showResource(src)` 在 modal 中打开。

合规说明
- 这些资源仅包含公开可访问的文章/演讲链接与官方示例页（例如 ETS 的样题页面），不包含付费/受限的完整官方真题。
- 若需要导入或分析付费/受限的官方真题，务必将文件手动上传到 `official_inputs/`（见 `README_OFFICIAL.md`），并确认你对这些材料拥有使用权或已获得授权。

下一步建议
- 若你同意：我可以把 `online_sources.js` 自动注入到前端页面（例如在 `index.html` 或构建流程中引入），并把每个源转换为 app 内可点击的条目。
- 我也可以把这些公开资源解析成与 `reading-data.js` 相同的 JSON schema（生成到 `public_parsed/`），以便直接进入练习流。

若要我继续：回复确认即可（我会继续：自动注入到前端并生成 `public_parsed/`）。
