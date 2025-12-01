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
var requiredLearningTimes = parseInt(localStorage.getItem('requiredLearningTimes') || '3'); // 每个单词需要学习的次数
var sessionWords = []; // 本次学习的单词（原始列表）
var learningQueue = []; // 学习队列（包含重复出现的单词）
var currentQueueIndex = 0; // 当前队列索引
var learnedWords = [];
var wordRatings = {};
var wordLearningProgress = {}; // 记录每个单词的学习进度
var sessionWordProgress = {}; // 本轮学习中每个单词的进度（用于间隔重复）

try {
    learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    wordRatings = JSON.parse(localStorage.getItem('wordRatings') || '{}');
    wordLearningProgress = JSON.parse(localStorage.getItem('wordLearningProgress') || '{}');
} catch(e) {
    learnedWords = [];
    wordRatings = {};
    wordLearningProgress = {};
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
            settingsDiv.className = 'vocab-settings-panel';
            settingsDiv.innerHTML = 
                '<div class="settings-row">' +
                    '<div class="setting-item">' +
                        '<span class="setting-label"><span class="setting-icon">✦</span> 每次学习</span>' +
                        '<select id="wordsPerSessionSelect" onchange="changeWordsPerSession(this.value)" class="setting-select">' +
                            '<option value="10"' + (wordsPerSession === 10 ? ' selected' : '') + '>10个</option>' +
                            '<option value="20"' + (wordsPerSession === 20 ? ' selected' : '') + '>20个</option>' +
                            '<option value="30"' + (wordsPerSession === 30 ? ' selected' : '') + '>30个</option>' +
                            '<option value="50"' + (wordsPerSession === 50 ? ' selected' : '') + '>50个</option>' +
                            '<option value="100"' + (wordsPerSession === 100 ? ' selected' : '') + '>100个</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="setting-item">' +
                        '<span class="setting-label"><span class="setting-icon">◈</span> 学习次数</span>' +
                        '<select id="learningTimesSelect" onchange="changeLearningTimes(this.value)" class="setting-select">' +
                            '<option value="1"' + (requiredLearningTimes === 1 ? ' selected' : '') + '>1次</option>' +
                            '<option value="2"' + (requiredLearningTimes === 2 ? ' selected' : '') + '>2次</option>' +
                            '<option value="3"' + (requiredLearningTimes === 3 ? ' selected' : '') + '>3次</option>' +
                            '<option value="4"' + (requiredLearningTimes === 4 ? ' selected' : '') + '>4次</option>' +
                            '<option value="5"' + (requiredLearningTimes === 5 ? ' selected' : '') + '>5次</option>' +
                        '</select>' +
                    '</div>' +
                '</div>' +
                '<div class="settings-tip"><span class="tip-icon">✧</span> 每个单词学习 <strong id="timesDisplay">' + requiredLearningTimes + '</strong> 次后才算掌握</div>';
            modalHeader.after(settingsDiv);
            
            // 添加样式
            addVocabSettingsStyles();
        }
    }
}

// 添加设置面板样式
function addVocabSettingsStyles() {
    if (document.getElementById('vocabSettingsStyles')) return;
    
    var style = document.createElement('style');
    style.id = 'vocabSettingsStyles';
    style.textContent = `
        .vocab-settings-panel {
            padding: 16px 20px;
            background: linear-gradient(135deg, #f8f7ff 0%, #e0e7ff 100%);
            border-bottom: 1px solid rgba(99, 102, 241, 0.15);
        }
        
        .settings-row {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            margin-bottom: 10px;
        }
        
        .setting-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .setting-label {
            color: #374151;
            font-weight: 600;
            font-size: 14px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        
        .setting-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border-radius: 6px;
            font-size: 11px;
            font-weight: bold;
            box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
        }
        
        .tip-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
            color: white;
            border-radius: 50%;
            font-size: 10px;
            box-shadow: 0 2px 4px rgba(245, 158, 11, 0.3);
        }
        
        .setting-select {
            padding: 8px 14px;
            border-radius: 10px;
            border: 2px solid #6366f1;
            background: white;
            color: #1e1b4b;
            font-weight: 600;
            font-size: 14px;
            cursor: pointer;
            outline: none;
            transition: all 0.2s ease;
            min-width: 80px;
        }
        
        .setting-select:hover {
            border-color: #4f46e5;
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
        }
        
        .setting-select:focus {
            border-color: #4f46e5;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }
        
        .settings-tip {
            color: #6b7280;
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .settings-tip strong {
            color: #6366f1;
            font-weight: 700;
        }
        
        /* 学习进度指示器 */
        .learning-progress-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin-top: 12px;
            padding: 10px 16px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
            border-radius: 12px;
        }
        
        .progress-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #e5e7eb;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .progress-dot.completed {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.4);
        }
        
        .progress-dot.current {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            box-shadow: 0 2px 8px rgba(99, 102, 241, 0.4);
            animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .progress-label {
            margin-left: 8px;
            font-size: 13px;
            color: #6b7280;
            font-weight: 500;
        }
        
        /* 词卡优化样式 */
        .word-card-enhanced {
            background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            border: 1px solid rgba(99, 102, 241, 0.1);
        }
        
        .word-main-enhanced {
            font-size: 42px;
            font-weight: 800;
            color: #1e1b4b;
            text-align: center;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        
        .word-phonetic-enhanced {
            font-size: 18px;
            color: #6b7280;
            text-align: center;
            margin-bottom: 20px;
        }
        
        /* 评分按钮优化 */
        .rate-btn-enhanced {
            flex: 1;
            padding: 16px 12px;
            border: none;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
        }
        
        .rate-btn-enhanced.hard {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            color: #dc2626;
            border: 2px solid #fecaca;
        }
        
        .rate-btn-enhanced.hard:hover {
            background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(220, 38, 38, 0.2);
        }
        
        .rate-btn-enhanced.medium {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            color: #d97706;
            border: 2px solid #fde68a;
        }
        
        .rate-btn-enhanced.medium:hover {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(217, 119, 6, 0.2);
        }
        
        .rate-btn-enhanced.easy {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            color: #059669;
            border: 2px solid #a7f3d0;
        }
        
        .rate-btn-enhanced.easy:hover {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(5, 150, 105, 0.2);
        }
        
        .rate-emoji {
            font-size: 24px;
        }
        
        .rate-text {
            font-size: 14px;
        }
        
        .rate-hint {
            font-size: 11px;
            opacity: 0.7;
            font-weight: 500;
        }
        
        /* 右上角学习次数徽章 */
        .learning-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            display: flex;
            align-items: center;
            gap: 2px;
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            z-index: 10;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        .learning-badge.new {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            color: #92400e;
            border: 2px solid #fcd34d;
        }
        
        .learning-badge.new .badge-icon {
            font-size: 14px;
            animation: sparkle 1.5s infinite;
        }
        
        @keyframes sparkle {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.8; }
        }
        
        .learning-badge.learning {
            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
            color: #3730a3;
            border: 2px solid #a5b4fc;
        }
        
        .learning-badge.completed {
            background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
            color: #065f46;
            border: 2px solid #6ee7b7;
        }
        
        .learning-badge.completed .badge-icon {
            font-size: 14px;
            animation: checkBounce 0.5s ease;
        }
        
        @keyframes checkBounce {
            0% { transform: scale(0); }
            50% { transform: scale(1.3); }
            100% { transform: scale(1); }
        }
        
        .badge-count {
            font-size: 16px;
            font-weight: 800;
            color: #4f46e5;
        }
        
        .badge-separator {
            font-size: 12px;
            color: #9ca3af;
            margin: 0 1px;
        }
        
        .badge-total {
            font-size: 13px;
            font-weight: 600;
            color: #6b7280;
        }
        
        .badge-text {
            font-size: 12px;
            margin-left: 2px;
        }
        
        /* Toast 动画 */
        @keyframes toastIn {
            from { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        @keyframes toastOut {
            from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            to { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
}

// 修改学习次数设置
function changeLearningTimes(value) {
    requiredLearningTimes = parseInt(value);
    localStorage.setItem('requiredLearningTimes', requiredLearningTimes.toString());
    
    var timesDisplay = document.getElementById('timesDisplay');
    if (timesDisplay) {
        timesDisplay.textContent = requiredLearningTimes;
    }
    
    // ====== 版本2改进：学习次数更新后自动刷新 ======
    // 重新计算所有单词的完成状态
    sessionWords.forEach(function(wordData) {
        var progress = sessionWordProgress[wordData.word];
        if (progress) {
            // 根据新的学习次数要求，重新判断是否完成
            progress.completed = progress.times >= requiredLearningTimes;
        }
    });
    
    // 重新构建学习队列（根据新的学习次数要求）
    buildLearningQueue();
    
    // 如果当前队列索引超出范围，重置
    if (currentQueueIndex >= learningQueue.length) {
        currentQueueIndex = Math.max(0, learningQueue.length - 1);
    }
    
    // 刷新进度显示
    updateVocabProgress();
    
    // 更新当前单词的进度显示
    updateLearningProgressIndicator();
    
    // 更新学习徽章
    updateLearningBadge();
    
    // 显示设置更新提示
    showSettingsUpdateToast('学习次数已更新为 ' + requiredLearningTimes + ' 次');
    
    // 触发设置更新事件
    try {
        window.dispatchEvent(new CustomEvent('vocabularySettingsUpdated', {
            detail: {
                setting: 'learningTimes',
                value: requiredLearningTimes,
                queueLength: learningQueue.length
            }
        }));
    } catch(e) {}
}

// 初始化本次学习的单词
function initSessionWords() {
    currentWordIndex = 0;
    currentQueueIndex = 0;
    sessionWords = [];
    learningQueue = [];
    sessionWordProgress = {}; // 重置本轮学习进度
    
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
        var wordData = window.vocabularyData[allIndices[m]];
        sessionWords.push(wordData);
        // 初始化本轮学习进度
        sessionWordProgress[wordData.word] = {
            times: 0,           // 本轮已学习次数
            completed: false,   // 本轮是否完成
            lastIndex: -1       // 上次出现的位置
        };
    }
    
    // 构建间隔重复的学习队列
    buildLearningQueue();
}

// 构建间隔重复的学习队列
function buildLearningQueue() {
    learningQueue = [];
    
    // 获取所有未完成的单词
    var pendingWords = sessionWords.filter(function(w) {
        return !sessionWordProgress[w.word].completed;
    });
    
    if (pendingWords.length === 0) return;
    
    // 计算每个单词还需要学习的次数
    var wordsNeedReview = [];
    pendingWords.forEach(function(wordData) {
        var progress = sessionWordProgress[wordData.word];
        var remaining = requiredLearningTimes - progress.times;
        for (var i = 0; i < remaining; i++) {
            wordsNeedReview.push({
                wordData: wordData,
                reviewRound: progress.times + i + 1
            });
        }
    });
    
    // 按照间隔重复的原则重新排列
    // 策略：先学新词，然后穿插复习
    var newWords = wordsNeedReview.filter(function(w) { return w.reviewRound === 1; });
    var reviewWords = wordsNeedReview.filter(function(w) { return w.reviewRound > 1; });
    
    // 打乱新词顺序
    shuffleArray(newWords);
    
    // 构建队列：每学习2-3个新词后，插入需要复习的词
    var result = [];
    var newWordIndex = 0;
    var reviewWordIndex = 0;
    var wordsSinceLastReview = {};
    var minGap = 3; // 同一个单词至少间隔3个位置再出现
    
    while (newWordIndex < newWords.length || reviewWordIndex < reviewWords.length) {
        // 优先添加新词
        var addedNewWord = false;
        if (newWordIndex < newWords.length) {
            var newWord = newWords[newWordIndex];
            result.push(newWord.wordData);
            wordsSinceLastReview[newWord.wordData.word] = 0;
            newWordIndex++;
            addedNewWord = true;
        }
        
        // 更新所有单词的间隔计数
        Object.keys(wordsSinceLastReview).forEach(function(w) {
            wordsSinceLastReview[w]++;
        });
        
        // 检查是否有需要复习的单词（间隔足够）
        if (reviewWordIndex < reviewWords.length && result.length >= minGap) {
            // 找到一个间隔足够的复习单词
            for (var i = reviewWordIndex; i < reviewWords.length; i++) {
                var reviewWord = reviewWords[i];
                var gap = wordsSinceLastReview[reviewWord.wordData.word] || 999;
                
                if (gap >= minGap) {
                    // 可以插入这个复习单词
                    result.push(reviewWord.wordData);
                    wordsSinceLastReview[reviewWord.wordData.word] = 0;
                    
                    // 从复习列表中移除
                    reviewWords.splice(i, 1);
                    
                    // 更新间隔计数
                    Object.keys(wordsSinceLastReview).forEach(function(w) {
                        wordsSinceLastReview[w]++;
                    });
                    break;
                }
            }
        }
        
        // 如果没有新词可加，继续添加复习词
        if (!addedNewWord && reviewWordIndex < reviewWords.length) {
            var nextReview = reviewWords[0];
            var nextGap = wordsSinceLastReview[nextReview.wordData.word] || 999;
            
            if (nextGap >= minGap) {
                result.push(nextReview.wordData);
                wordsSinceLastReview[nextReview.wordData.word] = 0;
                reviewWords.shift();
            } else {
                // 间隔不够，添加占位或跳过
                // 找其他可以复习的词
                var foundAlternative = false;
                for (var j = 1; j < reviewWords.length; j++) {
                    var altWord = reviewWords[j];
                    var altGap = wordsSinceLastReview[altWord.wordData.word] || 999;
                    if (altGap >= minGap) {
                        result.push(altWord.wordData);
                        wordsSinceLastReview[altWord.wordData.word] = 0;
                        reviewWords.splice(j, 1);
                        foundAlternative = true;
                        break;
                    }
                }
                
                // 如果找不到替代，强制添加（避免死循环）
                if (!foundAlternative) {
                    result.push(nextReview.wordData);
                    wordsSinceLastReview[nextReview.wordData.word] = 0;
                    reviewWords.shift();
                }
            }
            
            Object.keys(wordsSinceLastReview).forEach(function(w) {
                wordsSinceLastReview[w]++;
            });
        }
    }
    
    learningQueue = result;
}

// 数组随机打乱
function shuffleArray(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}

// 修改每次学习单词数
function changeWordsPerSession(value) {
    wordsPerSession = parseInt(value);
    localStorage.setItem('wordsPerSession', wordsPerSession.toString());
    
    // 自动刷新，重新开始学习
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
        // 显示队列进度和单词完成数
        var completedCount = 0;
        sessionWords.forEach(function(w) {
            if (sessionWordProgress[w.word] && sessionWordProgress[w.word].completed) {
                completedCount++;
            }
        });
        progress.textContent = (currentQueueIndex + 1) + '/' + learningQueue.length + ' (已掌握: ' + completedCount + '/' + sessionWords.length + ')';
    }
}

function showCurrentWord() {
    if (!learningQueue || learningQueue.length === 0) {
        initSessionWords();
    }
    if (!learningQueue || learningQueue.length === 0) return;
    
    // 检查是否完成所有学习
    if (currentQueueIndex >= learningQueue.length) {
        showSessionSummary();
        return;
    }
    
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    document.getElementById('wordMain').textContent = wordData.word;
    document.getElementById('wordPhonetic').textContent = wordData.phonetic || '';
    
    // 隐藏释义区域
    document.getElementById('wordMeaning').classList.add('hidden');
    document.getElementById('rateButtons').classList.add('hidden');
    document.getElementById('showMeaningBtn').classList.remove('hidden');
    
    updateVocabProgress();
    
    // 更新右上角学习次数徽章
    updateLearningBadge();
    
    // 更新学习进度指示器
    updateLearningProgressIndicator();
    
    // 自动朗读新单词
    speakWord();
}

// 更新右上角学习次数徽章
function updateLearningBadge() {
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    var word = wordData.word;
    var progress = sessionWordProgress[word] || { times: 0, completed: false };
    var currentTimes = progress.times;
    
    // 查找或创建徽章容器
    var badge = document.getElementById('learningBadge');
    if (!badge) {
        var wordCard = document.getElementById('wordCard');
        if (wordCard) {
            // 确保 wordCard 是相对定位
            wordCard.style.position = 'relative';
            
            badge = document.createElement('div');
            badge.id = 'learningBadge';
            badge.className = 'learning-badge';
            wordCard.insertBefore(badge, wordCard.firstChild);
        }
    }
    
    if (badge) {
        if (progress.completed) {
            badge.className = 'learning-badge completed';
            badge.innerHTML = '<span class="badge-icon">✓</span><span class="badge-text">已掌握</span>';
        } else {
            var remaining = requiredLearningTimes - currentTimes;
            badge.className = 'learning-badge';
            if (currentTimes === 0) {
                badge.classList.add('new');
                badge.innerHTML = '<span class="badge-icon"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg></span><span class="badge-text">新词</span>';
            } else {
                badge.classList.add('learning');
                badge.innerHTML = '<span class="badge-count">' + currentTimes + '</span><span class="badge-separator">/</span><span class="badge-total">' + requiredLearningTimes + '</span><span class="badge-text" style="margin-left:4px;">复习中</span>';
            }
        }
    }
}

// 更新学习进度指示器
function updateLearningProgressIndicator() {
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    var word = wordData.word;
    var progress = sessionWordProgress[word] || { times: 0, completed: false };
    var currentTimes = progress.times;
    
    // 查找或创建进度指示器容器
    var indicatorContainer = document.getElementById('learningProgressIndicator');
    if (!indicatorContainer) {
        var wordCard = document.getElementById('wordCard');
        if (wordCard) {
            indicatorContainer = document.createElement('div');
            indicatorContainer.id = 'learningProgressIndicator';
            indicatorContainer.className = 'learning-progress-indicator';
            wordCard.appendChild(indicatorContainer);
        }
    }
    
    if (indicatorContainer) {
        var dotsHtml = '';
        for (var i = 0; i < requiredLearningTimes; i++) {
            var dotClass = 'progress-dot';
            if (i < currentTimes) {
                dotClass += ' completed';
            } else if (i === currentTimes) {
                dotClass += ' current';
            }
            dotsHtml += '<div class="' + dotClass + '"></div>';
        }
        
        var statusText = '';
        if (progress.completed) {
            statusText = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#10b981" stroke-width="2.5" style="vertical-align:middle;margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>已掌握';
        } else {
            statusText = '第 ' + (currentTimes + 1) + '/' + requiredLearningTimes + ' 次学习';
        }
        
        indicatorContainer.innerHTML = dotsHtml + '<span class="progress-label">' + statusText + '</span>';
    }
}

function showMeaning() {
    var wordData = learningQueue[currentQueueIndex];
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
        meaningHtml += '<div class="dict-container" style="background:linear-gradient(135deg,#f8f7ff 0%,#eef2ff 100%);padding:14px;border-radius:12px;margin-bottom:12px;border:1px solid rgba(99,102,241,0.1);">';
        if (dictData.definitions && dictData.definitions.length > 0) {
            meaningHtml += '<div style="font-weight:700;margin-bottom:10px;display:flex;align-items:center;gap:8px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border-radius:6px;box-shadow:0 2px 6px rgba(99,102,241,0.3);"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span><span style="color:#4338ca;">词典释义</span></div>';
            dictData.definitions.slice(0, 3).forEach(function(def, idx) {
                meaningHtml += '<div style="margin-bottom:6px;font-size:14px;color:#555;">• ' + def + '</div>';
            });
        }
        meaningHtml += '</div>';
    }
    
    meaningHtml += '<div class="meaning-cn" style="font-size:20px;color:#1e1b4b;margin-bottom:12px;font-weight:700;display:flex;align-items:flex-start;gap:10px;"><span style="display:inline-flex;align-items:center;justify-content:center;min-width:26px;height:26px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:8px;box-shadow:0 2px 6px rgba(16,185,129,0.3);flex-shrink:0;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span><span>' + (wordData.meaningCn || '暂无中文释义') + '</span></div>';
    meaningHtml += '<div class="meaning-en" style="color:#4b5563;font-size:15px;margin-bottom:16px;display:flex;align-items:flex-start;gap:10px;"><span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);border-radius:7px;box-shadow:0 2px 6px rgba(59,130,246,0.3);flex-shrink:0;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span><span>' + (wordData.meaningEn || wordData.meaning || '') + '</span></div>';
    
    if (wordData.example) {
        meaningHtml += '<div class="word-example" style="color:#6b7280;font-size:14px;font-style:italic;padding-top:16px;border-top:1px solid #e5e7eb;display:flex;align-items:flex-start;gap:10px;"><span style="display:inline-flex;align-items:center;justify-content:center;min-width:24px;height:24px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:7px;box-shadow:0 2px 6px rgba(245,158,11,0.3);flex-shrink:0;"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span>' + wordData.example + '</span></div>';
    }
    
    document.getElementById('meaningCn').innerHTML = meaningHtml;
    document.getElementById('meaningEn').innerHTML = '';
    document.getElementById('wordExample').innerHTML = '';
    
    document.getElementById('wordMeaning').classList.remove('hidden');
    document.getElementById('showMeaningBtn').classList.add('hidden');
    document.getElementById('rateButtons').classList.remove('hidden');
    
    // V3: 更新复习间隔显示
    updateIntervalDisplay();
}

// ==================== V1-V10: Anki风格智能复习系统 ====================

// V2: 智能即时复习队列管理器
var immediateReviewQueue = []; // 即时复习队列（困难/重学的单词）
var hardWordsInSession = []; // 本轮标记为困难的单词

// V3: 计算并显示复习间隔
function calculateReviewInterval(word, rating) {
    var wordProgress = wordLearningProgress[word] || {};
    var easeFactor = wordProgress.easeFactor || 2.5;
    var currentInterval = wordProgress.interval || 0;
    var repetitions = wordProgress.repetitions || 0;
    
    var interval = 0;
    var nextEaseFactor = easeFactor;
    
    switch(rating) {
        case 'again': // 重学 - 立即复习
            interval = 0; // 立即（<1分钟）
            nextEaseFactor = Math.max(1.3, easeFactor - 0.2);
            break;
        case 'hard': // 困难 - 1天后
            interval = Math.max(1, Math.round(currentInterval * 1.2));
            nextEaseFactor = Math.max(1.3, easeFactor - 0.15);
            break;
        case 'good': // 良好 - 正常间隔
            if (repetitions === 0) {
                interval = 1;
            } else if (repetitions === 1) {
                interval = 3;
            } else {
                interval = Math.round(currentInterval * easeFactor);
            }
            break;
        case 'easy': // 简单 - 延长间隔
            if (repetitions === 0) {
                interval = 4;
            } else {
                interval = Math.round(currentInterval * easeFactor * 1.3);
            }
            nextEaseFactor = Math.min(2.5, easeFactor + 0.15);
            break;
    }
    
    return {
        interval: interval,
        easeFactor: nextEaseFactor,
        displayText: formatInterval(interval)
    };
}

// 格式化间隔时间显示
function formatInterval(days) {
    if (days === 0) return '<1分钟';
    if (days === 1) return '1天';
    if (days < 7) return days + '天';
    if (days < 30) return Math.round(days / 7) + '周';
    if (days < 365) return Math.round(days / 30) + '月';
    return Math.round(days / 365) + '年';
}

// V3: 更新间隔显示
function updateIntervalDisplay() {
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    var word = wordData.word;
    
    // 计算各评分对应的间隔
    var intervals = {
        again: calculateReviewInterval(word, 'again'),
        hard: calculateReviewInterval(word, 'hard'),
        good: calculateReviewInterval(word, 'good'),
        easy: calculateReviewInterval(word, 'easy')
    };
    
    // 更新按钮显示
    var againInterval = document.getElementById('againInterval');
    var hardInterval = document.getElementById('hardInterval');
    var goodInterval = document.getElementById('goodInterval');
    var easyInterval = document.getElementById('easyInterval');
    
    if (againInterval) againInterval.textContent = intervals.again.displayText;
    if (hardInterval) hardInterval.textContent = intervals.hard.displayText;
    if (goodInterval) goodInterval.textContent = intervals.good.displayText;
    if (easyInterval) easyInterval.textContent = intervals.easy.displayText;
}

// V1 & V2 & V4: 重写评分函数 - Anki风格智能复习
function rateWord(rating) {
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    var word = wordData.word;
    
    // 更新本轮学习进度
    var sessionProgress = sessionWordProgress[word] || { times: 0, completed: false };
    
    // V2: 根据评分处理即时复习队列
    switch(rating) {
        case 'again': // 重学 - 立即加入即时复习队列
            // 不增加学习次数
            addToImmediateReview(wordData, 1); // 1个单词后立即复习
            showRatingFeedback('again', '马上再来一次！💪');
            break;
            
        case 'hard': // 困难 - 稍后在本组内复习
            // 增加学习次数但标记为困难
            sessionProgress.times++;
            if (hardWordsInSession.indexOf(word) === -1) {
                hardWordsInSession.push(word);
            }
            addToImmediateReview(wordData, 3); // 3个单词后复习
            showRatingFeedback('hard', '稍后再复习 📝');
            break;
            
        case 'good': // 良好 - 正常进度
            sessionProgress.times++;
            sessionProgress.lastIndex = currentQueueIndex;
            // 从困难列表移除
            var hardIndex = hardWordsInSession.indexOf(word);
            if (hardIndex > -1) hardWordsInSession.splice(hardIndex, 1);
            showRatingFeedback('good', '继续保持！✓');
            break;
            
        case 'easy': // 简单 - 加速掌握
            sessionProgress.times += 2; // 简单直接+2次进度
            sessionProgress.lastIndex = currentQueueIndex;
            // 从困难列表移除
            var easyHardIndex = hardWordsInSession.indexOf(word);
            if (easyHardIndex > -1) hardWordsInSession.splice(easyHardIndex, 1);
            showRatingFeedback('easy', '太棒了！🎉');
            break;
            
        // 兼容旧版评分
        case 'medium':
            rating = 'good';
            sessionProgress.times++;
            break;
    }
    
    // 判断本轮是否完成
    if (sessionProgress.times >= requiredLearningTimes) {
        sessionProgress.completed = true;
        showCompletionToast(word);
        
        // 更新全局学习进度 (V4: SM-2算法)
        var intervalData = calculateReviewInterval(word, rating);
        var globalProgress = wordLearningProgress[word] || { 
            times: 0, 
            completed: false, 
            ratings: [],
            easeFactor: 2.5,
            interval: 0,
            repetitions: 0
        };
        
        globalProgress.times = sessionProgress.times;
        globalProgress.completed = true;
        globalProgress.ratings.push(rating);
        globalProgress.lastReview = new Date().toISOString();
        globalProgress.easeFactor = intervalData.easeFactor;
        globalProgress.interval = intervalData.interval;
        globalProgress.repetitions = (globalProgress.repetitions || 0) + 1;
        
        // 计算下次复习日期
        var nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + intervalData.interval);
        globalProgress.nextReview = nextReview.toISOString();
        
        wordLearningProgress[word] = globalProgress;
        localStorage.setItem('wordLearningProgress', JSON.stringify(wordLearningProgress));
        
        // 记录为已学
        if (learnedWords.indexOf(word) === -1) {
            learnedWords.push(word);
            localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
            localStorage.setItem('learnedCount', learnedWords.length.toString());
            
            // 更新今日目标进度
            if (typeof updateDailyProgress === 'function') {
                updateDailyProgress('vocabulary', 1);
            }
            
            // v3.5.0: 触发成就检查
            if (window.UX && window.UX.Achievements) {
                window.UX.Achievements.checkWordCount(learnedWords.length);
                if (learnedWords.length % 10 === 0) {
                    const msg = window.UX.EncouragementSystem.getRandom('milestone');
                    window.UX.showSmartToast(msg, 'achievement');
                } else if (Math.random() < 0.3) {
                    const msg = window.UX.EncouragementSystem.getRandom('progress');
                    window.UX.showSmartToast(msg, 'success');
                }
                window.UX.LevelSystem.checkLevelUp();
            }
        }
        
        // 如果评分为简单，标记为已掌握
        if (rating === 'easy') {
            var mastered = parseInt(localStorage.getItem('masteredCount') || '0');
            localStorage.setItem('masteredCount', (mastered + 1).toString());
        }
    }
    
    sessionWordProgress[word] = sessionProgress;
    
    // 保存评分（V4: 包含SM-2数据）
    var intervalInfo = calculateReviewInterval(word, rating);
    var prevCount = wordRatings[word] ? wordRatings[word].count : 0;
    wordRatings[word] = {
        rating: rating,
        lastReview: new Date().toISOString(),
        count: prevCount + 1,
        interval: intervalInfo.interval,
        easeFactor: intervalInfo.easeFactor,
        learningProgress: sessionProgress
    };
    localStorage.setItem('wordRatings', JSON.stringify(wordRatings));
    
    // 刷新UI
    updateVocabProgress();
    updateLearningBadge();
    updateLearningProgressIndicator();
    
    // V9: 更新学习统计
    updateSessionStats(rating);
    
    // 触发全局学习进度更新事件
    try {
        window.dispatchEvent(new CustomEvent('vocabularyProgressUpdated', {
            detail: {
                word: word,
                rating: rating,
                sessionProgress: sessionProgress,
                totalLearned: learnedWords.length,
                interval: intervalInfo.interval
            }
        }));
    } catch(e) {}
    
    // 下一个词
    nextWord();
}

// V2: 添加到即时复习队列
function addToImmediateReview(wordData, gap) {
    var insertIndex = Math.min(currentQueueIndex + gap, learningQueue.length);
    
    // 检查是否已经在队列中的相近位置
    var alreadyNearby = false;
    for (var i = currentQueueIndex + 1; i < Math.min(currentQueueIndex + gap + 2, learningQueue.length); i++) {
        if (learningQueue[i] && learningQueue[i].word === wordData.word) {
            alreadyNearby = true;
            break;
        }
    }
    
    if (!alreadyNearby) {
        learningQueue.splice(insertIndex, 0, wordData);
        immediateReviewQueue.push({
            word: wordData.word,
            insertedAt: insertIndex,
            timestamp: Date.now()
        });
    }
}

// V5: 显示评分反馈（带状态卡片效果）
function showRatingFeedback(rating, message) {
    var colors = {
        again: { bg: 'linear-gradient(135deg,#fef2f2 0%,#fee2e2 100%)', border: '#fecaca', text: '#dc2626', icon: '🔄' },
        hard: { bg: 'linear-gradient(135deg,#fff7ed 0%,#ffedd5 100%)', border: '#fed7aa', text: '#ea580c', icon: '💪' },
        good: { bg: 'linear-gradient(135deg,#f0fdf4 0%,#dcfce7 100%)', border: '#bbf7d0', text: '#16a34a', icon: '✓' },
        easy: { bg: 'linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%)', border: '#bfdbfe', text: '#2563eb', icon: '🎉' }
    };
    
    var style = colors[rating] || colors.good;
    
    var feedback = document.createElement('div');
    feedback.className = 'rating-feedback-card';
    feedback.innerHTML = '<span class="feedback-icon">' + style.icon + '</span><span class="feedback-text">' + message + '</span>';
    feedback.style.cssText = 'position:fixed;top:25%;left:50%;transform:translateX(-50%);background:' + style.bg + ';color:' + style.text + ';padding:16px 28px;border-radius:16px;font-size:16px;font-weight:700;z-index:10001;box-shadow:0 10px 40px rgba(0,0,0,0.15);animation:feedbackBounce 0.4s ease;border:2px solid ' + style.border + ';display:flex;align-items:center;gap:10px;';
    document.body.appendChild(feedback);
    
    setTimeout(function() {
        feedback.style.animation = 'feedbackOut 0.3s ease forwards';
        setTimeout(function() {
            if (feedback.parentNode) feedback.parentNode.removeChild(feedback);
        }, 300);
    }, 800);
}

// V9: 学习统计
var sessionStats = {
    again: 0,
    hard: 0,
    good: 0,
    easy: 0,
    startTime: null
};

function updateSessionStats(rating) {
    if (!sessionStats.startTime) {
        sessionStats.startTime = Date.now();
    }
    
    if (sessionStats[rating] !== undefined) {
        sessionStats[rating]++;
    }
    
    // 保存到localStorage
    localStorage.setItem('currentSessionStats', JSON.stringify(sessionStats));
}

function getSessionStats() {
    var duration = sessionStats.startTime ? Math.round((Date.now() - sessionStats.startTime) / 1000) : 0;
    var total = sessionStats.again + sessionStats.hard + sessionStats.good + sessionStats.easy;
    
    return {
        again: sessionStats.again,
        hard: sessionStats.hard,
        good: sessionStats.good,
        easy: sessionStats.easy,
        total: total,
        duration: duration,
        accuracy: total > 0 ? Math.round(((sessionStats.good + sessionStats.easy) / total) * 100) : 0
    };
}

// 将单词添加到队列后面（用于困难单词重复学习）- 兼容旧版
function addWordToQueueLater(wordData, gap) {
    addToImmediateReview(wordData, gap);
}

// 显示困难反馈 - 更新为新版
function showDifficultyFeedback(message) {
    showRatingFeedback('hard', message);
}

// ====== 版本2改进：设置更新提示 ======
function showSettingsUpdateToast(message) {
    var toast = document.createElement('div');
    toast.innerHTML = '<span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:rgba(255,255,255,0.25);border-radius:50%;margin-right:10px;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg></span><span style="font-weight:600;">' + message + '</span>';
    toast.style.cssText = 'position:fixed;top:15%;left:50%;transform:translateX(-50%);background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);color:white;padding:14px 24px;border-radius:14px;font-size:14px;z-index:10001;box-shadow:0 8px 30px rgba(99,102,241,0.35);animation:toastIn 0.3s ease;display:flex;align-items:center;';
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.animation = 'toastOut 0.3s ease';
        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 1500);
}

// 显示单词完成提示
function showCompletionToast(word) {
    var toast = document.createElement('div');
    toast.className = 'word-completion-toast';
    toast.innerHTML = '<span style="display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;background:rgba(255,255,255,0.25);border-radius:50%;margin-right:12px;"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span><div><strong style="font-size:18px;">' + word + '</strong><div style="font-size:13px;opacity:0.9;margin-top:2px;">学习完成！继续加油 ✓</div></div>';
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:white;padding:20px 32px;border-radius:20px;font-size:16px;font-weight:600;z-index:10001;box-shadow:0 15px 50px rgba(16,185,129,0.45);animation:toastIn 0.4s ease;display:flex;align-items:center;';
    document.body.appendChild(toast);
    
    setTimeout(function() {
        toast.style.animation = 'toastOut 0.3s ease';
        setTimeout(function() {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 1500);
}

function nextWord() {
    currentQueueIndex++;
    
    if (currentQueueIndex < learningQueue.length) {
        showCurrentWord();
    } else {
        // 检查是否所有单词都已完成
        var allCompleted = true;
        sessionWords.forEach(function(w) {
            if (!sessionWordProgress[w.word] || !sessionWordProgress[w.word].completed) {
                allCompleted = false;
            }
        });
        
        if (allCompleted) {
            // 学完本组，显示总结页面
            showSessionSummary();
        } else {
            // 还有未完成的单词，重新构建队列
            buildLearningQueue();
            currentQueueIndex = 0;
            if (learningQueue.length > 0) {
                showCurrentWord();
            } else {
                showSessionSummary();
            }
        }
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
    summaryHtml += '<div style="text-align:center;margin-bottom:28px;">';
    summaryHtml += '<div style="width:80px;height:80px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;box-shadow:0 10px 40px rgba(16,185,129,0.35);"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>';
    summaryHtml += '<h2 style="margin:0;color:#1e1b4b;font-size:26px;font-weight:800;">本轮学习完成！</h2>';
    summaryHtml += '<p style="color:#6b7280;margin-top:10px;font-size:15px;">共学习 <span style="color:#6366f1;font-weight:700;">' + sessionWords.length + '</span> 个单词</p>';
    summaryHtml += '</div>';
    
    summaryHtml += '<div style="max-height:400px;overflow-y:auto;">';
    
    sessionWords.forEach(function(wordData, index) {
        var rating = wordRatings[wordData.word] ? wordRatings[wordData.word].rating : 'medium';
        var ratingIcon = rating === 'easy' 
            ? '<span style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:50%;box-shadow:0 2px 8px rgba(16,185,129,0.3);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg></span>'
            : (rating === 'hard' 
                ? '<span style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;background:linear-gradient(135deg,#ef4444 0%,#dc2626 100%);border-radius:50%;box-shadow:0 2px 8px rgba(239,68,68,0.3);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span>'
                : '<span style="display:flex;align-items:center;justify-content:center;width:28px;height:28px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:50%;box-shadow:0 2px 8px rgba(245,158,11,0.3);"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3"><line x1="5" y1="12" x2="19" y2="12"/></svg></span>');
        
        summaryHtml += '<div style="background:linear-gradient(180deg,#ffffff 0%,#f8f9fa 100%);border-radius:16px;padding:16px;margin-bottom:12px;border:1px solid rgba(99,102,241,0.08);box-shadow:0 2px 8px rgba(0,0,0,0.04);">';
        summaryHtml += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">';
        summaryHtml += '<div style="display:flex;align-items:center;gap:12px;">';
        summaryHtml += '<span style="background:linear-gradient(135deg,#6366f1,#a855f7);color:white;width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;box-shadow:0 2px 6px rgba(99,102,241,0.3);">' + (index + 1) + '</span>';
        summaryHtml += '<span style="font-size:18px;font-weight:700;color:#1e1b4b;">' + wordData.word + '</span>';
        summaryHtml += '<span style="font-size:12px;color:#9ca3af;background:#f3f4f6;padding:2px 8px;border-radius:6px;">' + (wordData.phonetic || '') + '</span>';
        summaryHtml += '</div>';
        summaryHtml += ratingIcon;
        summaryHtml += '</div>';
        summaryHtml += '<div style="font-size:15px;color:#374151;font-weight:600;margin-bottom:6px;display:flex;align-items:center;gap:8px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:linear-gradient(135deg,#10b981 0%,#059669 100%);border-radius:5px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>' + (wordData.meaningCn || '') + '</div>';
        summaryHtml += '<div style="font-size:13px;color:#6b7280;margin-bottom:6px;display:flex;align-items:center;gap:8px;"><span style="display:inline-flex;align-items:center;justify-content:center;width:18px;height:18px;background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);border-radius:5px;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>' + (wordData.meaningEn || wordData.meaning || '') + '</div>';
        if (wordData.example) {
            summaryHtml += '<div style="font-size:12px;color:#9ca3af;font-style:italic;display:flex;align-items:flex-start;gap:8px;margin-top:8px;padding-top:8px;border-top:1px solid #f3f4f6;"><span style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:5px;flex-shrink:0;"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span>' + wordData.example + '</span></div>';
        }
        summaryHtml += '</div>';
    });
    
    summaryHtml += '</div>';
    
    summaryHtml += '<div style="display:flex;gap:12px;margin-top:24px;">';
    summaryHtml += '<button onclick="restartSession()" style="flex:1;padding:18px;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#a855f7 100%);color:white;border:none;border-radius:16px;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 8px 30px rgba(99,102,241,0.35);display:flex;align-items:center;justify-content:center;gap:10px;"><span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;background:rgba(255,255,255,0.2);border-radius:50%;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg></span>继续学习</button>';
    summaryHtml += '<button onclick="closeModule()" style="flex:1;padding:18px;background:linear-gradient(135deg,#f8fafc 0%,#f1f5f9 100%);color:#6366f1;border:2px solid rgba(99,102,241,0.3);border-radius:16px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:10px;"><span style="display:flex;align-items:center;justify-content:center;width:24px;height:24px;background:linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%);border-radius:50%;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></span>完成</button>';
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
window.changeLearningTimes = changeLearningTimes;
window.initSessionWords = initSessionWords;
window.restartSession = restartSession;
window.showSessionSummary = showSessionSummary;
window.updateLearningProgressIndicator = updateLearningProgressIndicator;
window.updateLearningBadge = updateLearningBadge;
