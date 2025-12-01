// 多源阅读/听力示例数据（可扩展）
// 说明：app 会优先尝试直接嵌入可用媒体（iframe/embed），
// 若无法直接获取 transcript，则显示外部链接供用户打开。
window.ONLINE_SOURCES = [
  {
    id: 'ted_introverts',
    type: 'talk',
    title: 'Susan Cain — The Power of Introverts (TED)',
    sourceUrl: 'https://www.ted.com/talks/susan_cain_the_power_of_introverts',
    embedUrl: 'https://embed.ted.com/talks/susan_cain_the_power_of_introverts',
    transcriptApi: 'https://www.ted.com/talks/susan_cain_the_power_of_introverts/transcript.json?language=en'
  },
  {
    id: 'conversation_climate',
    type: 'article',
    title: 'Climate change and global health (The Conversation sample)',
    sourceUrl: 'https://theconversation.com/climate-change-and-global-health-12345',
    excerpt: 'Climate change represents one of the most profound challenges facing humanity in the 21st century...'
  },
  {
    id: 'arxiv_sample',
    type: 'paper',
    title: 'Sample arXiv paper — Abstract & link',
    sourceUrl: 'https://arxiv.org/abs/2001.00001',
    excerpt: 'We propose a novel method for ... (abstract)'
  },
  {
    id: 'npr_sample',
    type: 'audio',
    title: 'NPR: Short science story (示例)',
    sourceUrl: 'https://www.npr.org/sections/science/',
    embedUrl: ''
  }
];

// 小工具：尝试从 TED transcript API 提取纯文本（若跨域失败将返回 null）
window.fetchTedTranscript = async function(apiUrl) {
  try {
    const resp = await fetch(apiUrl);
    if (!resp.ok) return null;
    const js = await resp.json();
    if (!js || !js.records) return null;
    // records 是数组，包含段落信息
    return js.records.map(r => r.cue || r.text || '').join('\n\n');
  } catch (e) {
    return null;
  }
};
