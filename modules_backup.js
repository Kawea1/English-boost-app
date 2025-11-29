// 听力模块
let currentListening = null;
let playbackSpeed = 1.0;
// 词汇发音(美式) — 本地实现，仅使用词典音频或浏览器 TTS
function speakWord() {
    var word = document.getElementById('wordMain') && document.getElementById('wordMain').textContent;
    if (!word) return;
    // 词汇发音(美式) — 本地实现，仅使用词典音频或浏览器 TTS
    function speakWord() {
        var el = document.getElementById('wordMain');
        var word = el ? el.textContent : '';
        if (!word) return;
        try {
            if (typeof lookupWord === 'function') {
                lookupWord(word).then(function(info) {
                    if (info && info.audio) { var a = new Audio(info.audio); a.play(); return; }
                    speakWithBrowser(word, 0.8);
                }).catch(function() { speakWithBrowser(word, 0.8); });
            } else {
                speakWithBrowser(word, 0.8);
            }
        } catch (e) {
            speakWithBrowser(word, 0.8);
        }
    }
    var btn = document.getElementById('playBtn');
    utterance.onstart = function() { if (btn) btn.textContent = '⏸️'; incrementStat('stat_listen'); };
    utterance.onend = function() { if (btn) btn.textContent = '▶️'; };
    speechSynthesis.speak(utterance);
}

// 简单统计函数
function incrementStat(key, delta) {
    var k = key || 'stat_listen';
    var cur = parseInt(localStorage.getItem(k) || '0');
    localStorage.setItem(k, '' + (cur + (delta || 1)));
}

function adjustSpeed(delta) {
    playbackSpeed = Math.max(0.5, Math.min(2.0, playbackSpeed + delta));
    document.getElementById('speedDisplay').textContent = playbackSpeed.toFixed(1) + 'x';
}

function checkAnswerEnhanced() {
    if (!currentListening) { alert('请先选择一个练习'); return; }
    var input = document.getElementById('blankInput');
    var feedback = document.getElementById('answerFeedback');
    if (!input || !feedback) return;
    var userAnswer = input.value.trim().toLowerCase();
    var correctAnswer = currentListening.blank.toLowerCase();
    feedback.classList.remove('hidden');
    var fullText = currentListening.transcript.replace('___', '<strong style="color:#667eea;">' + currentListening.blank + '</strong>');
    if (userAnswer === correctAnswer) {
        feedback.style.background = '#d4edda';
        feedback.style.color = '#155724';
        feedback.innerHTML = '<div style="margin-bottom:10px;">✅ <strong>正确！</strong></div><div style="margin-bottom:10px;"><strong>📝 完整原文：</strong></div><div style="background:#fff;padding:10px;border-radius:6px;line-height:1.8;">' + fullText + '</div><div style="margin-top:10px;"><strong>🎯 答案句：</strong> ' + (currentListening.keysentence || fullText) + '</div>';
    } else {
        feedback.style.background = '#f8d7da';
        feedback.style.color = '#721c24';
        feedback.innerHTML = '<div style="margin-bottom:10px;">❌ <strong>错误</strong>。正确答案是: <strong>' + currentListening.blank + '</strong></div><div>你的答案: ' + (userAnswer || '(空)') + '</div><hr style="border:none;border-top:1px solid #ddd;margin:10px 0;"><div style="margin-bottom:10px;"><strong>📝 完整原文：</strong></div><div style="background:#fff;padding:10px;border-radius:6px;line-height:1.8;">' + fullText + '</div><div style="margin-top:10px;"><strong>🎯 答案句：</strong> ' + (currentListening.keysentence || fullText) + '</div>';
    }
}

// 阅读模块
var currentPassage = null;

function initReadingModule() {
    var list = document.getElementById('readingList');
    if (!list || typeof READING_PASSAGES === 'undefined') return;
    list.innerHTML = '<h4 style="margin:0 0 10px 0;color:#333;">选择文章 (共' + READING_PASSAGES.length + '篇):</h4>';
    READING_PASSAGES.forEach(function(passage, idx) {
        var div = document.createElement('div');
        div.className = 'passage-item';
        div.innerHTML = '<strong>' + (idx + 1) + '. ' + passage.title + '</strong><br><span style="color:#666;font-size:14px;">📊 ' + passage.difficulty + ' | 📂 ' + passage.category + '</span>';
        div.onclick = function() { showPassage(idx); };
        list.appendChild(div);
    });
}

function showPassage(idx) {
    currentPassage = READING_PASSAGES[idx];
    document.getElementById('passageArea').classList.remove('hidden');
    document.getElementById('passageTitle').textContent = currentPassage.title;
    document.getElementById('passageMeta').innerHTML = '📊 难度: ' + currentPassage.difficulty + ' | 📂 ' + currentPassage.category + ' | 📖 ' + currentPassage.topic;
    document.getElementById('passageText').innerHTML = '<p style="text-indent:2em;margin-bottom:15px;line-height:1.8;">' + currentPassage.passage.replace(/\n\n/g, '</p><p style="text-indent:2em;margin-bottom:15px;line-height:1.8;">') + '</p>';
    var vocabSection = document.getElementById('vocabSection');
    if (currentPassage.vocabulary && currentPassage.vocabulary.length > 0) {
        vocabSection.innerHTML = '<h4 style="margin:0 0 10px 0;">📚 核心词汇</h4>' + currentPassage.vocabulary.map(function(v) { return '<span style="display:inline-block;background:#e3f2fd;padding:5px 10px;border-radius:4px;margin:3px;font-size:14px;">' + v.word + ': ' + v.meaning + '</span>'; }).join('');
    } else { vocabSection.innerHTML = ''; }
    var questionsList = document.getElementById('questionsList');
    questionsList.innerHTML = '';
    currentPassage.questions.forEach(function(q, qIdx) {
        var qDiv = document.createElement('div');
        qDiv.className = 'question-block';
        var optionsHtml = '';
        q.options.forEach(function(opt, optIdx) {
            var letter = String.fromCharCode(65 + optIdx);
            optionsHtml += '<label style="display:block;padding:8px;margin:5px 0;background:#f5f5f5;border-radius:4px;cursor:pointer;"><input type="radio" name="q' + qIdx + '" value="' + letter + '" style="margin-right:10px;">' + letter + '. ' + opt + '</label>';
        });
        qDiv.innerHTML = '<p style="font-weight:bold;margin-bottom:10px;">' + (qIdx + 1) + '. ' + q.question + '</p><div class="options">' + optionsHtml + '</div><div id="feedback_q' + qIdx + '" class="q-feedback hidden" style="margin-top:10px;padding:10px;border-radius:4px;"></div>';
        questionsList.appendChild(qDiv);
    });
    document.getElementById('readingResult').classList.add('hidden');
}

function checkReadingAnswers() {
    if (!currentPassage) { alert('请先选择一篇文章'); return; }
    var correct = 0;
    var total = currentPassage.questions.length;
    currentPassage.questions.forEach(function(q, qIdx) {
        var selected = document.querySelector('input[name="q' + qIdx + '"]:checked');
        var feedback = document.getElementById('feedback_q' + qIdx);
        feedback.classList.remove('hidden');
        if (selected && selected.value === q.answer) {
            correct++;
            feedback.style.background = '#d4edda';
            feedback.style.color = '#155724';
            feedback.innerHTML = '✅ 正确！<br><strong>解析:</strong> ' + q.explanation;
        } else {
            feedback.style.background = '#f8d7da';
            feedback.style.color = '#721c24';
            feedback.innerHTML = '❌ 错误。正确答案: ' + q.answer + '<br><strong>解析:</strong> ' + q.explanation;
        }
    });
    var result = document.getElementById('readingResult');
    result.classList.remove('hidden');
    result.style.padding = '15px';
    result.style.background = correct === total ? '#d4edda' : '#fff3cd';
    result.style.borderRadius = '8px';
    result.innerHTML = '<strong>得分: ' + correct + '/' + total + '</strong> (' + Math.round(correct/total*100) + '%)';

    // 标记已完成阅读统计（每次提交视为完成一次阅读）
    incrementStat('stat_reading', 1);
}

// 口语模块
var currentSentenceIdx = 0;
var isRecording = false;
var recognition = null;
var recordStart = 0;

function initSpeakingModule() {
    if (typeof speakingSentences === 'undefined' || speakingSentences.length === 0) return;
    currentSentenceIdx = 0;
    showCurrentSentence();
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = false;
        recognition.interimResults = false;
            recognition.onresult = function(event) { var r = event.results[0][0]; showSpeakingResult(r.transcript, r.confidence); };
        recognition.onend = function() { isRecording = false; document.getElementById('recordText').textContent = '点击录音'; document.getElementById('recordingIndicator').classList.add('hidden'); };
        recognition.onerror = function() { isRecording = false; document.getElementById('recordText').textContent = '点击录音'; document.getElementById('recordingIndicator').classList.add('hidden'); };
    }
}

function showCurrentSentence() {
    if (typeof speakingSentences !== 'undefined' && speakingSentences.length > 0) {
        document.getElementById('targetSentence').textContent = speakingSentences[currentSentenceIdx];
    }
}

function nextSentence() {
    if (typeof speakingSentences !== 'undefined') {
            currentSentenceIdx = (currentSentenceIdx + 1) % speakingSentences.length;
)
    if (!word) return;
    // 优先尝试词典音频（若有 lookupWord 可用），否则使用本地浏览器 TTS
    try {
        if (typeof lookupWord === 'function') {
            lookupWord(word).then(function(info) {
                if (info && info.audio) { var a = new Audio(info.audio); a.play(); return; }
                speakWithBrowser(word, 0.8);
            }).catch(function() { speakWithBrowser(word, 0.8); });
        } else {
            speakWithBrowser(word, 0.8);
        }
    } catch (e) {
        speakWithBrowser(word, 0.8);
    }
    var score = Math.round(matches / Math.max(words1.length, 1) * 100);
    document.getElementById('scoreValue').textContent = score;
    var circle = document.getElementById('scoreCircle');
    circle.style.background = score >= 80 ? '#4CAF50' : score >= 60 ? '#FF9800' : '#f44336';
    var feedback = document.getElementById('speakingFeedback');
    feedback.innerHTML = score >= 80 ? '🎉 太棒了！发音非常准确！' : score >= 60 ? '👍 不错！继续练习会更好！' : '💪 加油！多听几遍原音再试试！';
    }
    function showSpeakingResult(recognized, confidence) {
        document.getElementById('resultCard').classList.remove('hidden');
        document.getElementById('recognizedText').textContent = recognized || '';
        incrementStat('stat_speaking', 1);

        var target = (speakingSentences[currentSentenceIdx] || '').toLowerCase();
        var spoken = (recognized || '').toLowerCase();
        var words1 = target.split(/\s+/).filter(Boolean);
        var words2 = spoken.split(/\s+/).filter(Boolean);

        // 准确性 (accuracy): 单词匹配比例
        var matches = 0; words2.forEach(function(w) { if (words1.indexOf(w) !== -1) matches++; });
        var accuracy = Math.round(matches / Math.max(words1.length, 1) * 100);

        // 流利度 (fluency): 期望时长 vs 实际时长
        var actualMs = recordStart ? (Date.now() - recordStart) : 0;
        // 估算期望时长（每词 300ms 作为基准）
        var expectedMs = Math.max(400, words1.length * 300);
        var fluency = 100 - Math.min(100, Math.abs(actualMs - expectedMs) / expectedMs * 100);
        fluency = Math.round(Math.max(0, Math.min(100, fluency)));

        // 发音 (pronunciation): 使用识别置信度作为代理 + 准确性权重
        var pronConf = typeof confidence === 'number' ? Math.round(confidence * 100) : 70;
        var pronunciation = Math.round((pronConf * 0.7) + (accuracy * 0.3));

        // 完整度 (completeness): 识别到的单词数占目标比例
        var completeness = Math.round(Math.min(100, words2.length / Math.max(words1.length, 1) * 100));

        // 综合得分（权重可后续调整）
        var total = Math.round((accuracy * 0.45) + (fluency * 0.2) + (pronunciation * 0.25) + (completeness * 0.1));

        // 更新 UI（若元素存在）
        var setIf = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
        setIf('scoreValue', total);
        var circle = document.getElementById('scoreCircle'); if (circle) circle.style.background = total >= 80 ? '#4CAF50' : total >= 60 ? '#FF9800' : '#f44336';
        setIf('scoreAccuracy', accuracy + '%');
        setIf('scoreFluency', fluency + '%');
        setIf('scorePronunciation', pronunciation + '%');
        setIf('scoreCompleteness', completeness + '%');

        var feedback = document.getElementById('speakingFeedback');
        if (feedback) feedback.innerHTML = total >= 80 ? '🎉 太棒了！发音与流利度都很好！' : total >= 60 ? '👍 不错！继续加强发音与节奏。' : '💪 加油！多模仿原音、放慢速度再练习。';

        // 保存历史记录到 localStorage
        try {
            var hist = JSON.parse(localStorage.getItem('speakingHistory') || '[]');
            hist.unshift({ sentence: target, timestamp: Date.now(), durationMs: actualMs, accuracy: accuracy, fluency: fluency, pronunciation: pronunciation, completeness: completeness, score: total });
            if (hist.length > 200) hist = hist.slice(0,200);
            localStorage.setItem('speakingHistory', JSON.stringify(hist));
        } catch (e) { console.error('save history failed', e); }

        // 重置 recordStart
        recordStart = 0;
    }
    function showSpeakingResult(recognized, confidence) {
        document.getElementById('resultCard').classList.remove('hidden');
        document.getElementById('recognizedText').textContent = recognized || '';
        incrementStat('stat_speaking', 1);

        var target = (speakingSentences[currentSentenceIdx] || '').toLowerCase();
        var spoken = (recognized || '').toLowerCase();
        var words1 = target.split(/\s+/).filter(Boolean);
        var words2 = spoken.split(/\s+/).filter(Boolean);

        // 准确性 (accuracy): 单词匹配比例
        var matches = 0; words2.forEach(function(w) { if (words1.indexOf(w) !== -1) matches++; });
        var accuracy = Math.round(matches / Math.max(words1.length, 1) * 100);

        // 流利度 (fluency): 期望时长 vs 实际时长
        var actualMs = recordStart ? (Date.now() - recordStart) : 0;
        // 估算期望时长（每词 300ms 作为基准）
        var expectedMs = Math.max(400, words1.length * 300);
        var fluency = 100 - Math.min(100, Math.abs(actualMs - expectedMs) / expectedMs * 100);
        fluency = Math.round(Math.max(0, Math.min(100, fluency)));

        // 发音 (pronunciation): 使用识别置信度作为代理 + 准确性权重
        var pronConf = typeof confidence === 'number' ? Math.round(confidence * 100) : 70;
        var pronunciation = Math.round((pronConf * 0.7) + (accuracy * 0.3));

        // 完整度 (completeness): 识别到的单词数占目标比例
        var completeness = Math.round(Math.min(100, words2.length / Math.max(words1.length, 1) * 100));

        // 综合得分（权重可后续调整）
        var total = Math.round((accuracy * 0.45) + (fluency * 0.2) + (pronunciation * 0.25) + (completeness * 0.1));

        // 更新 UI（若元素存在）
        var setIf = function(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; };
        setIf('scoreValue', total);
        var circle = document.getElementById('scoreCircle'); if (circle) circle.style.background = total >= 80 ? '#4CAF50' : total >= 60 ? '#FF9800' : '#f44336';
        setIf('scoreAccuracy', accuracy + '%');
        setIf('scoreFluency', fluency + '%');
        setIf('scorePronunciation', pronunciation + '%');
        setIf('scoreCompleteness', completeness + '%');

        var feedback = document.getElementById('speakingFeedback');
        if (feedback) feedback.innerHTML = total >= 80 ? '🎉 太棒了！发音与流利度都很好！' : total >= 60 ? '👍 不错！继续加强发音与节奏。' : '💪 加油！多模仿原音、放慢速度再练习。';

        // 保存历史记录到 localStorage
        try {
            var hist = JSON.parse(localStorage.getItem('speakingHistory') || '[]');
            hist.unshift({ sentence: target, timestamp: Date.now(), durationMs: actualMs, accuracy: accuracy, fluency: fluency, pronunciation: pronunciation, completeness: completeness, score: total });
            if (hist.length > 200) hist = hist.slice(0,200);
            localStorage.setItem('speakingHistory', JSON.stringify(hist));
        } catch (e) { console.error('save history failed', e); }

        // 重置 recordStart
        recordStart = 0;
    }

// 词汇发音(美式)
function speakWord() {
    var word = document.getElementById('wordMain').textContent;
        if (window.APP_SETTINGS && window.APP_SETTINGS.useCloudTTS && window.APP_SETTINGS.cloudTTSUrl) {
            // 优先调用云端高质量 TTS
            fetch(window.APP_SETTINGS.cloudTTSUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-API-KEY': window.APP_SETTINGS.cloudTTSKey || '' },
                body: JSON.stringify({ text: word, lang: 'en-US', voice: 'alloy' })
            }).then(function(res) { return res.arrayBuffer(); }).then(function(buf) {
                var blob = new Blob([buf], { type: 'audio/mpeg' });
                var url = URL.createObjectURL(blob);
                var a = new Audio(url);
                a.play();
                a.onended = function() { URL.revokeObjectURL(url); };
            }).catch(function(err) {
                console.warn('cloud TTS failed, fallback to browser TTS', err);
                // 回退到浏览器TTS
                speakWithBrowser(word, 0.8);
            });
            return;
        }

        if (!('speechSynthesis' in window)) return;
        speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8;
        var voices = speechSynthesis.getVoices();
        var preferred = voices.find(function(v) { return (v.lang || '').startsWith('en-US') && (v.name || '').toLowerCase().includes('google'); });
        if (!preferred) preferred = voices.find(function(v) { return (v.lang || '').startsWith('en-US'); });
        if (preferred) utterance.voice = preferred;
        speechSynthesis.speak(utterance);
    }
}

// 资源模块
function initResourcesModule() {
    var parsedDiv = document.getElementById('parsedResources');
    if (parsedDiv && typeof window.PUBLIC_PARSED !== 'undefined') {
        parsedDiv.innerHTML = '<h4 style="margin:0 0 15px 0;">📚 真题资源</h4>';
        window.PUBLIC_PARSED.forEach(function(item) {
            var div = document.createElement('div');
            div.style.cssText = 'padding:12px;margin:8px 0;background:#fff;border-radius:8px;border-left:4px solid #667eea;';
            div.innerHTML = '<strong>' + item.title + '</strong><br><span style="color:#666;font-size:14px;">' + item.category + ' | ' + item.source + '</span><br><a href="' + item.url + '" target="_blank" style="color:#667eea;font-size:14px;">访问资源 →</a>';
            parsedDiv.appendChild(div);
        });
    }
    var onlineDiv = document.getElementById('onlineResources');
    if (onlineDiv && typeof window.ONLINE_SOURCES !== 'undefined') {
        onlineDiv.innerHTML = '<h4 style="margin:0 0 15px 0;">🌐 学习网站</h4>';
        window.ONLINE_SOURCES.forEach(function(item) {
            var div = document.createElement('div');
            div.style.cssText = 'padding:12px;margin:8px 0;background:#fff;border-radius:8px;border-left:4px solid #764ba2;';
            div.innerHTML = '<strong>' + item.name + '</strong><br><span style="color:#666;font-size:14px;">' + item.category + ' - ' + item.description + '</span><br><a href="' + item.url + '" target="_blank" style="color:#764ba2;font-size:14px;">访问网站 →</a>';
            onlineDiv.appendChild(div);
        });
    }
}

function showResourceTab(tab) {
    var parsedDiv = document.getElementById('parsedResources');
    var onlineDiv = document.getElementById('onlineResources');
    var tabParsed = document.getElementById('tabParsed');
    var tabOnline = document.getElementById('tabOnline');
    if (tab === 'parsed') {
        parsedDiv.classList.remove('hidden');
        onlineDiv.classList.add('hidden');
        tabParsed.style.background = '#667eea';
        tabParsed.style.color = 'white';
        tabOnline.style.background = '#ddd';
        tabOnline.style.color = '#333';
    } else {
        parsedDiv.classList.add('hidden');
        onlineDiv.classList.remove('hidden');
        tabOnline.style.background = '#667eea';
        tabOnline.style.color = 'white';
        tabParsed.style.background = '#ddd';
        tabParsed.style.color = '#333';
    }
}

// 初始化
if ('speechSynthesis' in window) { speechSynthesis.getVoices(); }

// 设置相关函数
function loadAppSettings() {
    var s = JSON.parse(localStorage.getItem('APP_SETTINGS') || '{}');
    if (s.useCloudTTS !== undefined && document.getElementById('useCloudTTS')) {
        document.getElementById('useCloudTTS').checked = !!s.useCloudTTS;
    }
    if (s.cloudTTSUrl && document.getElementById('cloudTTSUrl')) document.getElementById('cloudTTSUrl').value = s.cloudTTSUrl;
    if (s.cloudTTSKey && document.getElementById('cloudTTSKey')) document.getElementById('cloudTTSKey').value = s.cloudTTSKey;
    if (s.theme && document.getElementById('themeSelect')) document.getElementById('themeSelect').value = s.theme;
    window.APP_SETTINGS = Object.assign({}, window.APP_SETTINGS, s);
    applyTheme(s.theme || 'default');
}

function saveAppSettings() {
    var s = {
        useCloudTTS: !!document.getElementById('useCloudTTS').checked,
        cloudTTSUrl: document.getElementById('cloudTTSUrl').value || '',
        cloudTTSKey: document.getElementById('cloudTTSKey').value || '',
        theme: document.getElementById('themeSelect').value || 'default'
    };
    localStorage.setItem('APP_SETTINGS', JSON.stringify(s));
    window.APP_SETTINGS = Object.assign({}, window.APP_SETTINGS, s);
    alert('设置已保存');
    applyTheme(s.theme);
}

function resetAppSettings() {
    localStorage.removeItem('APP_SETTINGS');
    window.APP_SETTINGS = { useCloudTTS: false, cloudTTSUrl: '', cloudTTSKey: '' };
    loadAppSettings();
    alert('已重置设置');
}

function previewTTS() {
    var text = 'This is a test of American English pronunciation.';
        speakWithBrowser(text, 0.95);
}

function applyTheme(name) {
    var container = document.querySelector('.container');
    if (!container) return;
    if (name === 'light') {
        document.body.style.background = '#f3f6f9';
        container.style.background = '#fff';
    } else if (name === 'dark') {
        document.body.style.background = '#121212';
        container.style.background = '#1e1e1e';
    } else {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        container.style.background = '#f5f7fa';
    }
}
