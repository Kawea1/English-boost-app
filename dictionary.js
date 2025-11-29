// dictionary.js - 高级词典服务（Free Dictionary API + 备用）
const DICT_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

// 缓存已查询的词
const dictCache = new Map();

/**
 * 查询单词详细信息
 * @param {string} word 
 * @returns {Promise<{word, phonetic, audio, meanings: [{partOfSpeech, definitions: [{definition, example}]}]}>}
 */
async function lookupWord(word) {
  const key = word.toLowerCase().trim();
  if (dictCache.has(key)) return dictCache.get(key);

  try {
    const res = await fetch(DICT_API + encodeURIComponent(key));
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const entry = data[0];
    const phonetic = entry.phonetic || (entry.phonetics?.find(p => p.text)?.text) || '';
    const audio = entry.phonetics?.find(p => p.audio)?.audio || '';
    
    const meanings = (entry.meanings || []).map(m => ({
      partOfSpeech: m.partOfSpeech || '',
      definitions: (m.definitions || []).slice(0, 3).map(d => ({
        definition: d.definition || '',
        example: d.example || ''
      }))
    }));

    const result = { word: entry.word || key, phonetic, audio, meanings };
    dictCache.set(key, result);
    return result;
  } catch (e) {
    console.warn('Dictionary lookup failed:', e);
    return null;
  }
}

/**
 * 播放单词发音（优先使用词典音频，否则用 TTS）
 */
async function pronounceWord(word) {
  const info = await lookupWord(word);
  if (info?.audio) {
    const audio = new Audio(info.audio);
    audio.play().catch(() => speakTTS(word));
  } else {
    speakTTS(word);
  }
}

function speakTTS(text, rate = 0.9) {
  if ('speechSynthesis' in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  }
}

/**
 * 格式化词典结果为 HTML
 */
function formatDictEntry(info) {
  if (!info) return '<p class="dict-error">未找到释义</p>';
  
  let html = `<div class="dict-entry">`;
  html += `<div class="dict-word">${info.word}</div>`;
  if (info.phonetic) html += `<div class="dict-phonetic">${info.phonetic}</div>`;
  
  for (const m of info.meanings) {
    html += `<div class="dict-pos">${m.partOfSpeech}</div>`;
    html += `<ol class="dict-defs">`;
    for (const d of m.definitions) {
      html += `<li>${d.definition}`;
      if (d.example) html += `<div class="dict-example">"${d.example}"</div>`;
      html += `</li>`;
    }
    html += `</ol>`;
  }
  html += `</div>`;
  return html;
}

window.lookupWord = lookupWord;
window.pronounceWord = pronounceWord;
window.speakTTS = speakTTS;
window.formatDictEntry = formatDictEntry;
window.dictCache = dictCache;
