// vocabulary.js - 核心词汇模块（带中文释义）
window.vocabularyData = [
    // GRE核心词汇 (50词)
    { word: 'aberrant', phonetic: '/əˈberənt/', meaningEn: 'departing from the accepted standard', meaningCn: '异常的，偏离正道的', example: 'His aberrant behavior worried his parents.' },
    { word: 'abstruse', phonetic: '/æbˈstruːs/', meaningEn: 'difficult to understand', meaningCn: '深奥的，难懂的', example: 'The professor made abstruse concepts accessible.' },
    { word: 'acerbic', phonetic: '/əˈsɜːrbɪk/', meaningEn: 'sharp and critical', meaningCn: '尖刻的，辛辣的', example: 'Her acerbic wit made her famous.' },
    { word: 'acumen', phonetic: '/əˈkjuːmən/', meaningEn: 'keen insight', meaningCn: '敏锐，聪明', example: 'His business acumen led to success.' },
    { word: 'adamant', phonetic: '/ˈædəmənt/', meaningEn: 'refusing to change', meaningCn: '坚定不移的', example: 'She was adamant about her decision.' },
    { word: 'admonish', phonetic: '/ədˈmɑːnɪʃ/', meaningEn: 'warn or reprimand firmly', meaningCn: '告诫，警告', example: 'The teacher admonished the students.' },
    { word: 'aesthetic', phonetic: '/esˈθetɪk/', meaningEn: 'relating to beauty', meaningCn: '美学的，审美的', example: 'The building has great aesthetic appeal.' },
    { word: 'affable', phonetic: '/ˈæfəbl/', meaningEn: 'friendly and easy to talk to', meaningCn: '和蔼可亲的', example: 'The affable host welcomed everyone.' },
    { word: 'alacrity', phonetic: '/əˈlækrəti/', meaningEn: 'brisk eagerness', meaningCn: '敏捷，欣然', example: 'She accepted the offer with alacrity.' },
    { word: 'alleviate', phonetic: '/əˈliːvieɪt/', meaningEn: 'make less severe', meaningCn: '减轻，缓解', example: 'The medicine helped alleviate the pain.' },
    { word: 'amalgamate', phonetic: '/əˈmælɡəmeɪt/', meaningEn: 'combine or unite', meaningCn: '合并，混合', example: 'The two companies amalgamated.' },
    { word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaningEn: 'unclear in meaning', meaningCn: '模糊的，歧义的', example: 'The statement was deliberately ambiguous.' },
    { word: 'ameliorate', phonetic: '/əˈmiːliəreɪt/', meaningEn: 'make better', meaningCn: '改善，改进', example: 'Steps were taken to ameliorate conditions.' },
    { word: 'amenable', phonetic: '/əˈmiːnəbl/', meaningEn: 'willing to agree', meaningCn: '顺从的，愿意接受的', example: 'He was amenable to suggestions.' },
    { word: 'anachronistic', phonetic: '/əˌnækrəˈnɪstɪk/', meaningEn: 'belonging to a different time', meaningCn: '时代错误的', example: 'The customs seemed anachronistic.' },
    { word: 'analogous', phonetic: '/əˈnæləɡəs/', meaningEn: 'comparable in certain respects', meaningCn: '类似的，相似的', example: 'The situation is analogous to ours.' },
    { word: 'anomaly', phonetic: '/əˈnɑːməli/', meaningEn: 'something unusual', meaningCn: '异常，反常现象', example: 'The results revealed an anomaly.' },
    { word: 'antipathy', phonetic: '/ænˈtɪpəθi/', meaningEn: 'strong dislike', meaningCn: '反感，厌恶', example: 'She felt antipathy toward him.' },
    { word: 'apathy', phonetic: '/ˈæpəθi/', meaningEn: 'lack of interest', meaningCn: '冷漠，无动于衷', example: 'Voter apathy was widespread.' },
    { word: 'appease', phonetic: '/əˈpiːz/', meaningEn: 'pacify by giving in', meaningCn: '平息，安抚', example: 'They tried to appease the angry crowd.' },
    { word: 'arbitrary', phonetic: '/ˈɑːrbɪtreri/', meaningEn: 'based on random choice', meaningCn: '任意的，武断的', example: 'The decision seemed arbitrary.' },
    { word: 'archaic', phonetic: '/ɑːrˈkeɪɪk/', meaningEn: 'very old or outdated', meaningCn: '古老的，过时的', example: 'The law is archaic and needs reform.' },
    { word: 'arduous', phonetic: '/ˈɑːrdʒuəs/', meaningEn: 'difficult and tiring', meaningCn: '艰苦的，费力的', example: 'The climb was arduous but rewarding.' },
    { word: 'articulate', phonetic: '/ɑːrˈtɪkjələt/', meaningEn: 'express clearly', meaningCn: '清楚表达的，善于表达的', example: 'She is an articulate speaker.' },
    { word: 'ascetic', phonetic: '/əˈsetɪk/', meaningEn: 'practicing self-denial', meaningCn: '苦行的，禁欲的', example: 'He lived an ascetic life.' },
    { word: 'assiduous', phonetic: '/əˈsɪdʒuəs/', meaningEn: 'showing great care', meaningCn: '勤勉的，刻苦的', example: 'She was assiduous in her studies.' },
    { word: 'astute', phonetic: '/əˈstuːt/', meaningEn: 'shrewd and perceptive', meaningCn: '精明的，敏锐的', example: 'An astute observer noticed the change.' },
    { word: 'audacious', phonetic: '/ɔːˈdeɪʃəs/', meaningEn: 'bold and daring', meaningCn: '大胆的，无畏的', example: 'It was an audacious plan.' },
    { word: 'austere', phonetic: '/ɔːˈstɪr/', meaningEn: 'severe or strict', meaningCn: '简朴的，严峻的', example: 'The room had an austere appearance.' },
    { word: 'avarice', phonetic: '/ˈævərɪs/', meaningEn: 'extreme greed', meaningCn: '贪婪，贪财', example: 'His avarice knew no bounds.' },
    { word: 'banal', phonetic: '/bəˈnɑːl/', meaningEn: 'lacking originality', meaningCn: '平庸的，陈腐的', example: 'The movie had a banal plot.' },
    { word: 'belligerent', phonetic: '/bəˈlɪdʒərənt/', meaningEn: 'hostile and aggressive', meaningCn: '好战的，挑衅的', example: 'His belligerent attitude caused problems.' },
    { word: 'benevolent', phonetic: '/bəˈnevələnt/', meaningEn: 'well-meaning and kind', meaningCn: '仁慈的，善意的', example: 'A benevolent donor funded the project.' },
    { word: 'bolster', phonetic: '/ˈboʊlstər/', meaningEn: 'support or strengthen', meaningCn: '支持，加强', example: 'Evidence bolstered his argument.' },
    { word: 'burgeon', phonetic: '/ˈbɜːrdʒən/', meaningEn: 'grow rapidly', meaningCn: '迅速发展，萌芽', example: 'The industry began to burgeon.' },
    { word: 'cacophony', phonetic: '/kəˈkɑːfəni/', meaningEn: 'harsh mixture of sounds', meaningCn: '刺耳的声音，不和谐', example: 'A cacophony of car horns filled the air.' },
    { word: 'candid', phonetic: '/ˈkændɪd/', meaningEn: 'truthful and straightforward', meaningCn: '坦率的，直言不讳的', example: 'She gave a candid assessment.' },
    { word: 'capricious', phonetic: '/kəˈprɪʃəs/', meaningEn: 'unpredictable', meaningCn: '反复无常的，任性的', example: 'The weather was capricious.' },
    { word: 'castigate', phonetic: '/ˈkæstɪɡeɪt/', meaningEn: 'criticize severely', meaningCn: '严厉批评，惩罚', example: 'Critics castigated the decision.' },
    { word: 'catalyst', phonetic: '/ˈkætəlɪst/', meaningEn: 'agent that causes change', meaningCn: '催化剂，促进因素', example: 'The event was a catalyst for reform.' },
    { word: 'caustic', phonetic: '/ˈkɔːstɪk/', meaningEn: 'sarcastic and critical', meaningCn: '尖刻的，腐蚀性的', example: 'His caustic remarks hurt her.' },
    { word: 'chicanery', phonetic: '/ʃɪˈkeɪnəri/', meaningEn: 'trickery and deception', meaningCn: '欺骗，诡计', example: 'Political chicanery undermined trust.' },
    { word: 'circumspect', phonetic: '/ˈsɜːrkəmspekt/', meaningEn: 'cautious and prudent', meaningCn: '谨慎的，小心的', example: 'Be circumspect in your decisions.' },
    { word: 'clandestine', phonetic: '/klænˈdestɪn/', meaningEn: 'kept secret', meaningCn: '秘密的，暗中的', example: 'They held clandestine meetings.' },
    { word: 'coalesce', phonetic: '/ˌkoʊəˈles/', meaningEn: 'come together', meaningCn: '联合，合并', example: 'Different groups coalesced into one.' },
    { word: 'cogent', phonetic: '/ˈkoʊdʒənt/', meaningEn: 'clear and convincing', meaningCn: '有说服力的，令人信服的', example: 'She presented a cogent argument.' },
    { word: 'commensurate', phonetic: '/kəˈmenʃərət/', meaningEn: 'corresponding in size', meaningCn: '相称的，相当的', example: 'Salary commensurate with experience.' },
    { word: 'compelling', phonetic: '/kəmˈpelɪŋ/', meaningEn: 'powerfully convincing', meaningCn: '令人信服的，引人注目的', example: 'The evidence was compelling.' },
    { word: 'complacent', phonetic: '/kəmˈpleɪsnt/', meaningEn: 'self-satisfied', meaningCn: '自满的，得意的', example: 'Success made him complacent.' },
    { word: 'comprehensive', phonetic: '/ˌkɑːmprɪˈhensɪv/', meaningEn: 'complete and thorough', meaningCn: '全面的，综合的', example: 'A comprehensive study was conducted.' }
];

// 当前学习状态
var currentWordIndex = 0;
var wordsPerSession = parseInt(localStorage.getItem('wordsPerSession') || '20'); // 每次学习单词数
var sessionWords = []; // 本次学习的单词
var learnedWords = [];
var wordRatings = {};

try {
    learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    wordRatings = JSON.parse(localStorage.getItem('wordRatings') || '{}');
} catch(e) {
    learnedWords = [];
    wordRatings = {};
}

// 初始化词汇模块
function initVocabulary() {
    // 显示设置面板
    showVocabSettings();
    // 初始化本次学习的单词
    initSessionWords();
    updateVocabProgress();
    showCurrentWord();
    // speakWord已在showCurrentWord中调用，无需重复
}

// 显示单词数量设置
function showVocabSettings() {
    var settingsEl = document.getElementById('vocabSettings');
    if (!settingsEl) {
        // 在词汇模块顶部添加设置
        var modalHeader = document.querySelector('#vocabularyModal .modal-header');
        if (modalHeader) {
            var settingsDiv = document.createElement('div');
            settingsDiv.id = 'vocabSettings';
            settingsDiv.style.cssText = 'padding:12px 20px;background:linear-gradient(180deg,#f8f7ff 0%,#f1f5f9 100%);display:flex;align-items:center;gap:12px;border-bottom:1px solid rgba(99,102,241,0.1);';
            settingsDiv.innerHTML = '<span style="color:#374151;font-weight:600;">📚 每次学习:</span>' +
                '<select id="wordsPerSessionSelect" onchange="changeWordsPerSession(this.value)" style="padding:8px 16px;border-radius:10px;border:2px solid #6366f1;background:white;color:#1e1b4b;font-weight:600;cursor:pointer;outline:none;">' +
                '<option value="10"' + (wordsPerSession === 10 ? ' selected' : '') + '>10个</option>' +
                '<option value="20"' + (wordsPerSession === 20 ? ' selected' : '') + '>20个</option>' +
                '<option value="30"' + (wordsPerSession === 30 ? ' selected' : '') + '>30个</option>' +
                '<option value="50"' + (wordsPerSession === 50 ? ' selected' : '') + '>50个</option>' +
                '<option value="100"' + (wordsPerSession === 100 ? ' selected' : '') + '>100个</option>' +
                '</select>' +
                '<span style="color:#6b7280;font-size:13px;">（选择后自动刷新）</span>';
            modalHeader.after(settingsDiv);
        }
    }
}

// 初始化本次学习的单词
function initSessionWords() {
    currentWordIndex = 0;
    sessionWords = [];
    
    if (!window.vocabularyData || window.vocabularyData.length === 0) return;
    
    // 随机选择指定数量的单词
    var allIndices = [];
    for (var i = 0; i < window.vocabularyData.length; i++) {
        allIndices.push(i);
    }
    
    // 打乱顺序
    for (var j = allIndices.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var temp = allIndices[j];
        allIndices[j] = allIndices[k];
        allIndices[k] = temp;
    }
    
    // 取前N个
    var count = Math.min(wordsPerSession, allIndices.length);
    for (var m = 0; m < count; m++) {
        sessionWords.push(window.vocabularyData[allIndices[m]]);
    }
}

// 修改每次学习单词数
function changeWordsPerSession(value) {
    wordsPerSession = parseInt(value);
    localStorage.setItem('wordsPerSession', wordsPerSession.toString());
    
    // 自动刷新，重新开始学习
    currentWordIndex = 0;
    initSessionWords();
    
    // 恢复"显示释义"按钮
    var showMeaningBtn = document.getElementById('showMeaningBtn');
    if (showMeaningBtn) {
        showMeaningBtn.classList.remove('hidden');
        showMeaningBtn.textContent = '显示释义';
    }
    
    // 隐藏评分按钮
    var rateButtons = document.getElementById('rateButtons');
    if (rateButtons) rateButtons.classList.add('hidden');
    
    // 隐藏释义
    var wordMeaning = document.getElementById('wordMeaning');
    if (wordMeaning) wordMeaning.classList.add('hidden');
    
    updateVocabProgress();
    showCurrentWord();
}

function updateVocabProgress() {
    var progress = document.getElementById('vocabProgress');
    if (progress) {
        progress.textContent = (currentWordIndex + 1) + '/' + sessionWords.length;
    }
}

function showCurrentWord() {
    if (!sessionWords || sessionWords.length === 0) {
        initSessionWords();
    }
    if (!sessionWords || sessionWords.length === 0) return;
    
    var wordData = sessionWords[currentWordIndex];
    if (!wordData) return;
    
    document.getElementById('wordMain').textContent = wordData.word;
    document.getElementById('wordPhonetic').textContent = wordData.phonetic || '';
    
    // 隐藏释义区域
    document.getElementById('wordMeaning').classList.add('hidden');
    document.getElementById('rateButtons').classList.add('hidden');
    document.getElementById('showMeaningBtn').classList.remove('hidden');
    
    updateVocabProgress();
    
    // 自动朗读新单词
    speakWord();
}

function showMeaning() {
    var wordData = sessionWords[currentWordIndex];
    if (!wordData) return;
    
    // 查询字典数据
    var dictData = null;
    if (typeof queryDictionary === 'function') {
        dictData = queryDictionary(wordData.word);
    }
    
    // 构建释义HTML（中英文双语）
    var meaningHtml = '';
    
    // 如果有字典数据，优先显示
    if (dictData) {
        meaningHtml += '<div class="dict-container" style="background:#f8f9fa;padding:12px;border-radius:8px;margin-bottom:10px;">';
        if (dictData.definitions && dictData.definitions.length > 0) {
            meaningHtml += '<div style="font-weight:600;margin-bottom:8px;">📚 词典释义</div>';
            dictData.definitions.slice(0, 3).forEach(function(def, idx) {
                meaningHtml += '<div style="margin-bottom:6px;font-size:14px;color:#555;">• ' + def + '</div>';
            });
        }
        meaningHtml += '</div>';
    }
    
    meaningHtml += '<div class="meaning-cn" style="font-size:20px;color:#333;margin-bottom:10px;font-weight:600;">📖 ' + (wordData.meaningCn || '暂无中文释义') + '</div>';
    meaningHtml += '<div class="meaning-en" style="color:#666;font-size:15px;margin-bottom:15px;">📝 ' + (wordData.meaningEn || wordData.meaning || '') + '</div>';
    
    if (wordData.example) {
        meaningHtml += '<div class="word-example" style="color:#888;font-size:14px;font-style:italic;padding-top:15px;border-top:1px solid #e0e0e0;">💬 ' + wordData.example + '</div>';
    }
    
    document.getElementById('meaningCn').innerHTML = meaningHtml;
    document.getElementById('meaningEn').innerHTML = '';
    document.getElementById('wordExample').innerHTML = '';
    
    document.getElementById('wordMeaning').classList.remove('hidden');
    document.getElementById('showMeaningBtn').classList.add('hidden');
    document.getElementById('rateButtons').classList.remove('hidden');
}

function rateWord(rating) {
    var wordData = sessionWords[currentWordIndex];
    if (!wordData) return;
    
    var word = wordData.word;
    
    // 计算复习间隔（艾宾浩斯曲线）
    var interval = 1; // 默认1天后复习
    if (rating === 'easy') {
        interval = 7; // 简单：7天
    } else if (rating === 'medium') {
        interval = 3; // 一般：3天
    } else if (rating === 'hard') {
        interval = 1; // 困难：1天
    }
    
    // 保存评分
    var prevCount = wordRatings[word] ? wordRatings[word].count : 0;
    wordRatings[word] = {
        rating: rating,
        lastReview: new Date().toISOString(),
        count: prevCount + 1,
        interval: interval
    };
    localStorage.setItem('wordRatings', JSON.stringify(wordRatings));
    
    // 记录已学单词
    if (learnedWords.indexOf(word) === -1) {
        learnedWords.push(word);
        localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
        localStorage.setItem('learnedCount', learnedWords.length.toString());
        
        // 更新今日目标进度
        if (typeof updateDailyProgress === 'function') {
            updateDailyProgress('vocabulary', 1);
        }
    }
    
    // 如果评分为简单，标记为已掌握
    if (rating === 'easy') {
        var mastered = parseInt(localStorage.getItem('masteredCount') || '0');
        localStorage.setItem('masteredCount', (mastered + 1).toString());
    }
    
    // 下一个词
    nextWord();
}

function nextWord() {
    if (currentWordIndex < sessionWords.length - 1) {
        currentWordIndex++;
        showCurrentWord();
    } else {
        // 学完本组，显示总结页面
        showSessionSummary();
    }
}

// 显示本轮学习总结
function showSessionSummary() {
    var wordCard = document.getElementById('wordCard');
    var rateButtons = document.getElementById('rateButtons');
    var showMeaningBtn = document.getElementById('showMeaningBtn');
    var vocabProgress = document.getElementById('vocabProgress');
    
    if (rateButtons) rateButtons.classList.add('hidden');
    if (showMeaningBtn) showMeaningBtn.classList.add('hidden');
    
    // 构建总结HTML
    var summaryHtml = '<div style="padding:20px;">';
    summaryHtml += '<div style="text-align:center;margin-bottom:24px;">';
    summaryHtml += '<div style="font-size:60px;margin-bottom:12px;">🎉</div>';
    summaryHtml += '<h2 style="margin:0;color:#1e1b4b;font-size:24px;font-weight:800;">本轮学习完成！</h2>';
    summaryHtml += '<p style="color:#6b7280;margin-top:8px;">共学习 ' + sessionWords.length + ' 个单词</p>';
    summaryHtml += '</div>';
    
    summaryHtml += '<div style="max-height:400px;overflow-y:auto;">';
    
    sessionWords.forEach(function(wordData, index) {
        var rating = wordRatings[wordData.word] ? wordRatings[wordData.word].rating : 'medium';
        var ratingEmoji = rating === 'easy' ? '😊' : (rating === 'hard' ? '😰' : '🤔');
        var ratingColor = rating === 'easy' ? '#10b981' : (rating === 'hard' ? '#ef4444' : '#f59e0b');
        
        summaryHtml += '<div style="background:linear-gradient(180deg,#f8f7ff 0%,#f1f5f9 100%);border-radius:16px;padding:16px;margin-bottom:12px;border:1px solid rgba(99,102,241,0.1);">';
        summaryHtml += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">';
        summaryHtml += '<div style="display:flex;align-items:center;gap:10px;">';
        summaryHtml += '<span style="background:linear-gradient(135deg,#6366f1,#a855f7);color:white;width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;">' + (index + 1) + '</span>';
        summaryHtml += '<span style="font-size:18px;font-weight:700;color:#1e1b4b;">' + wordData.word + '</span>';
        summaryHtml += '<span style="font-size:12px;color:#6b7280;">' + (wordData.phonetic || '') + '</span>';
        summaryHtml += '</div>';
        summaryHtml += '<span style="font-size:20px;">' + ratingEmoji + '</span>';
        summaryHtml += '</div>';
        summaryHtml += '<div style="font-size:16px;color:#374151;font-weight:600;margin-bottom:6px;">📖 ' + (wordData.meaningCn || '') + '</div>';
        summaryHtml += '<div style="font-size:14px;color:#6b7280;margin-bottom:6px;">📝 ' + (wordData.meaningEn || wordData.meaning || '') + '</div>';
        if (wordData.example) {
            summaryHtml += '<div style="font-size:13px;color:#9ca3af;font-style:italic;">💬 ' + wordData.example + '</div>';
        }
        summaryHtml += '</div>';
    });
    
    summaryHtml += '</div>';
    
    summaryHtml += '<div style="display:flex;gap:12px;margin-top:20px;">';
    summaryHtml += '<button onclick="restartSession()" style="flex:1;padding:16px;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%);color:white;border:none;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 6px 25px rgba(99,102,241,0.35);">🔄 继续学习</button>';
    summaryHtml += '<button onclick="closeModule()" style="flex:1;padding:16px;background:white;color:#6366f1;border:2px solid #6366f1;border-radius:14px;font-size:16px;font-weight:700;cursor:pointer;">✓ 完成</button>';
    summaryHtml += '</div>';
    summaryHtml += '</div>';
    
    if (wordCard) {
        wordCard.innerHTML = summaryHtml;
    }
    
    // 更新统计
    var statWords = document.getElementById('stat_words');
    if (statWords) statWords.textContent = learnedWords.length;
}

// 重新开始学习
function restartSession() {
    currentWordIndex = 0;
    
    // 恢复原始词卡结构（只恢复wordCard内部的内容，不包括按钮）
    var wordCard = document.getElementById('wordCard');
    if (wordCard) {
        wordCard.innerHTML = '<div class="word-main" id="wordMain">Loading...</div>' +
            '<div class="word-phonetic" id="wordPhonetic">/ˈləʊdɪŋ/</div>' +
            '<div class="word-meaning hidden" id="wordMeaning">' +
            '<div id="dictContainer"></div>' +
            '<div class="meaning-cn" id="meaningCn"></div>' +
            '<div class="meaning-en" id="meaningEn"></div>' +
            '<div class="word-example" id="wordExample"></div>' +
            '</div>';
    }
    
    // 恢复"显示释义"按钮
    var showMeaningBtn = document.getElementById('showMeaningBtn');
    if (showMeaningBtn) {
        showMeaningBtn.classList.remove('hidden');
        showMeaningBtn.textContent = '显示释义';
    }
    
    // 隐藏评分按钮
    var rateButtons = document.getElementById('rateButtons');
    if (rateButtons) rateButtons.classList.add('hidden');
    
    // 隐藏释义
    var wordMeaning = document.getElementById('wordMeaning');
    if (wordMeaning) wordMeaning.classList.add('hidden');
    
    // 重新初始化单词
    initSessionWords();
    updateVocabProgress();
    showCurrentWord();
}

function prevWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
    } else {
        currentWordIndex = sessionWords.length - 1;
    }
    showCurrentWord();
}

// 预加载语音列表
var cachedVoices = [];
var preferredVoice = null;

if ('speechSynthesis' in window) {
    cachedVoices = speechSynthesis.getVoices();
    speechSynthesis.onvoiceschanged = function() {
        cachedVoices = speechSynthesis.getVoices();
        preferredVoice = selectBestUSVoice(cachedVoices);
        console.log('可用语音:', cachedVoices.map(v => v.name + ' (' + v.lang + ')'));
        console.log('已选择语音:', preferredVoice ? preferredVoice.name : '默认');
    };
}

// 选择最佳美式英语语音
function selectBestUSVoice(voices) {
    if (!voices || voices.length === 0) return null;
    
    // macOS 上优质美式英语语音（按优先级排序）
    var preferredNames = [
        // macOS 高质量美式语音
        'Samantha',           // 美式女声 - 非常自然
        'Alex',               // 美式男声 - 非常自然
        'Allison',            // 美式女声 - 增强版
        'Ava',                // 美式女声 - 增强版
        'Susan',              // 美式女声
        'Tom',                // 美式男声
        'Zoe',                // 美式女声
        // iOS 语音
        'Samantha (Enhanced)',
        'Alex (Enhanced)',
        // Chrome/Edge 语音
        'Google US English',
        'Microsoft Zira',
        'Microsoft David',
    ];
    
    // 按优先级查找
    for (var i = 0; i < preferredNames.length; i++) {
        var voice = voices.find(function(v) {
            return v.name.includes(preferredNames[i]) && 
                   (v.lang === 'en-US' || v.lang.startsWith('en-US'));
        });
        if (voice) return voice;
    }
    
    // 如果没找到优先语音，查找任何美式英语语音
    var usVoice = voices.find(function(v) {
        return v.lang === 'en-US' || v.lang.startsWith('en-US');
    });
    if (usVoice) return usVoice;
    
    // 最后降级到任何英语语音
    return voices.find(function(v) {
        return v.lang.startsWith('en');
    });
}

// 美式发音 - 使用浏览器内置TTS
function speakWord() {
    var wordEl = document.getElementById('wordMain');
    var word = wordEl ? wordEl.textContent : '';
    if (!word) return;
    
    speakText(word);
}

// 通用语音播放函数
function speakText(text) {
    if (!('speechSynthesis' in window)) {
        console.log('浏览器不支持语音合成');
        return;
    }
    
    // 取消正在播放的语音
    speechSynthesis.cancel();
    
    // 创建语音对象
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;  // 稍微放慢，更清晰
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // 选择最佳语音
    var voices = cachedVoices.length > 0 ? cachedVoices : speechSynthesis.getVoices();
    var voice = preferredVoice || selectBestUSVoice(voices);
    
    if (voice) {
        utterance.voice = voice;
        console.log('使用语音:', voice.name);
    }
    
    // 播放
    speechSynthesis.speak(utterance);
}

// 保留旧函数名兼容
function speakWordTTS(word) {
    speakText(word);
}

function setVoiceAndSpeak(utterance, voices) {
    speechSynthesis.speak(utterance);
}

window.initVocabulary = initVocabulary;
window.showMeaning = showMeaning;
window.rateWord = rateWord;
window.speakWord = speakWord;
window.nextWord = nextWord;
window.prevWord = prevWord;
window.changeWordsPerSession = changeWordsPerSession;
window.initSessionWords = initSessionWords;
window.restartSession = restartSession;
window.showSessionSummary = showSessionSummary;
