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

// ==================== V1: 单词掌握度追踪系统 ====================
// 多维度追踪每个单词的掌握程度

var wordMasteryData = {};  // 单词掌握度数据
try {
    wordMasteryData = JSON.parse(localStorage.getItem('wordMasteryData') || '{}');
} catch(e) {
    wordMasteryData = {};
}

// 掌握度等级定义
var MASTERY_LEVELS = {
    0: { name: '未学习', icon: '○', color: '#9ca3af', bgColor: '#f3f4f6' },
    1: { name: '初识', icon: '◔', color: '#f59e0b', bgColor: '#fef3c7' },
    2: { name: '熟悉', icon: '◑', color: '#3b82f6', bgColor: '#dbeafe' },
    3: { name: '掌握', icon: '◕', color: '#10b981', bgColor: '#d1fae5' },
    4: { name: '精通', icon: '●', color: '#8b5cf6', bgColor: '#ede9fe' },
    5: { name: '完美', icon: '★', color: '#ec4899', bgColor: '#fce7f3' }
};

// 初始化单词掌握度
function initWordMastery(word) {
    if (!wordMasteryData[word]) {
        wordMasteryData[word] = {
            level: 0,                    // 掌握等级 0-5
            totalViews: 0,               // 总查看次数
            correctCount: 0,             // 正确次数
            wrongCount: 0,               // 错误次数
            lastStudied: null,           // 最后学习时间
            firstStudied: null,          // 首次学习时间
            studyHistory: [],            // 学习历史 [{date, result, duration}]
            pronunciationScore: 0,       // 发音得分
            spellingScore: 0,            // 拼写得分
            meaningScore: 0,             // 释义记忆得分
            retentionRate: 0,            // 记忆保持率
            difficulty: 'medium',        // 个人难度评估
            notes: ''                    // 用户笔记
        };
    }
    return wordMasteryData[word];
}

// 更新单词掌握度
function updateWordMastery(word, result, options) {
    options = options || {};
    var mastery = initWordMastery(word);
    var now = Date.now();
    
    // 更新基础统计
    mastery.totalViews++;
    mastery.lastStudied = now;
    if (!mastery.firstStudied) {
        mastery.firstStudied = now;
    }
    
    // 记录学习历史
    mastery.studyHistory.push({
        date: now,
        result: result,  // 'correct', 'wrong', 'partial', 'skip'
        duration: options.duration || 0,
        type: options.type || 'review'  // 'learn', 'review', 'quiz', 'pronunciation'
    });
    
    // 保留最近50条历史
    if (mastery.studyHistory.length > 50) {
        mastery.studyHistory = mastery.studyHistory.slice(-50);
    }
    
    // 更新正确/错误次数
    if (result === 'correct') {
        mastery.correctCount++;
    } else if (result === 'wrong') {
        mastery.wrongCount++;
    }
    
    // 更新维度得分
    if (options.pronunciationScore !== undefined) {
        mastery.pronunciationScore = Math.round(
            mastery.pronunciationScore * 0.7 + options.pronunciationScore * 0.3
        );
    }
    if (options.spellingScore !== undefined) {
        mastery.spellingScore = Math.round(
            mastery.spellingScore * 0.7 + options.spellingScore * 0.3
        );
    }
    if (options.meaningScore !== undefined) {
        mastery.meaningScore = Math.round(
            mastery.meaningScore * 0.7 + options.meaningScore * 0.3
        );
    }
    
    // 计算记忆保持率
    mastery.retentionRate = calculateRetentionRate(mastery);
    
    // 计算掌握等级
    mastery.level = calculateMasteryLevel(mastery);
    
    // 评估个人难度
    mastery.difficulty = assessPersonalDifficulty(mastery);
    
    // 保存数据
    saveWordMastery();
    
    return mastery;
}

// 计算记忆保持率
function calculateRetentionRate(mastery) {
    if (mastery.correctCount + mastery.wrongCount === 0) return 0;
    
    // 基于正确率计算，加权最近的表现
    var recentHistory = mastery.studyHistory.slice(-10);
    var recentCorrect = recentHistory.filter(function(h) { 
        return h.result === 'correct'; 
    }).length;
    
    var overallRate = mastery.correctCount / (mastery.correctCount + mastery.wrongCount);
    var recentRate = recentHistory.length > 0 ? recentCorrect / recentHistory.length : 0;
    
    // 70%权重给最近表现，30%给总体表现
    return Math.round((recentRate * 0.7 + overallRate * 0.3) * 100);
}

// 计算掌握等级
function calculateMasteryLevel(mastery) {
    var score = 0;
    
    // 因素1: 学习次数 (最高20分)
    score += Math.min(mastery.totalViews * 2, 20);
    
    // 因素2: 记忆保持率 (最高30分)
    score += mastery.retentionRate * 0.3;
    
    // 因素3: 发音得分 (最高15分)
    score += mastery.pronunciationScore * 0.15;
    
    // 因素4: 拼写得分 (最高15分)
    score += mastery.spellingScore * 0.15;
    
    // 因素5: 释义记忆 (最高20分)
    score += mastery.meaningScore * 0.2;
    
    // 转换为等级
    if (score >= 90) return 5;  // 完美
    if (score >= 75) return 4;  // 精通
    if (score >= 55) return 3;  // 掌握
    if (score >= 35) return 2;  // 熟悉
    if (score >= 15) return 1;  // 初识
    return 0;  // 未学习
}

// 评估个人难度
function assessPersonalDifficulty(mastery) {
    var errorRate = mastery.wrongCount / Math.max(1, mastery.totalViews);
    var avgDuration = 0;
    
    if (mastery.studyHistory.length > 0) {
        var totalDuration = mastery.studyHistory.reduce(function(sum, h) {
            return sum + (h.duration || 0);
        }, 0);
        avgDuration = totalDuration / mastery.studyHistory.length;
    }
    
    // 错误率高或学习时间长表示难度大
    if (errorRate > 0.5 || avgDuration > 10000) return 'hard';
    if (errorRate > 0.2 || avgDuration > 5000) return 'medium';
    return 'easy';
}

// 保存掌握度数据
function saveWordMastery() {
    try {
        localStorage.setItem('wordMasteryData', JSON.stringify(wordMasteryData));
    } catch(e) {
        console.warn('保存掌握度数据失败:', e);
    }
}

// 获取单词掌握度信息
function getWordMastery(word) {
    return wordMasteryData[word] || initWordMastery(word);
}

// 获取掌握度等级信息
function getMasteryLevelInfo(level) {
    return MASTERY_LEVELS[level] || MASTERY_LEVELS[0];
}

// 生成掌握度显示HTML
function renderMasteryBadge(word, options) {
    options = options || {};
    var mastery = getWordMastery(word);
    var levelInfo = getMasteryLevelInfo(mastery.level);
    var size = options.size || 'normal';  // 'mini', 'normal', 'large'
    
    var sizeClasses = {
        mini: 'mastery-badge-mini',
        normal: 'mastery-badge-normal',
        large: 'mastery-badge-large'
    };
    
    var html = '<div class="mastery-badge ' + sizeClasses[size] + '" ';
    html += 'style="background:' + levelInfo.bgColor + ';color:' + levelInfo.color + ';" ';
    html += 'data-word="' + word + '" title="' + levelInfo.name + ' - 保持率' + mastery.retentionRate + '%">';
    html += '<span class="mastery-icon">' + levelInfo.icon + '</span>';
    
    if (size !== 'mini') {
        html += '<span class="mastery-text">' + levelInfo.name + '</span>';
    }
    
    if (size === 'large') {
        html += '<span class="mastery-rate">' + mastery.retentionRate + '%</span>';
    }
    
    html += '</div>';
    
    return html;
}

// 生成详细掌握度卡片
function renderMasteryCard(word) {
    var mastery = getWordMastery(word);
    var levelInfo = getMasteryLevelInfo(mastery.level);
    
    var html = '<div class="mastery-card">';
    
    // 头部：等级和保持率
    html += '<div class="mastery-card-header" style="background:' + levelInfo.bgColor + '">';
    html += '<div class="mastery-level-display">';
    html += '<span class="mastery-level-icon" style="color:' + levelInfo.color + '">' + levelInfo.icon + '</span>';
    html += '<span class="mastery-level-name">' + levelInfo.name + '</span>';
    html += '</div>';
    html += '<div class="mastery-retention">';
    html += '<span class="retention-value">' + mastery.retentionRate + '%</span>';
    html += '<span class="retention-label">记忆保持</span>';
    html += '</div>';
    html += '</div>';
    
    // 三维度进度条
    html += '<div class="mastery-dimensions">';
    html += renderDimensionBar('发音', mastery.pronunciationScore);
    html += renderDimensionBar('拼写', mastery.spellingScore);
    html += renderDimensionBar('释义', mastery.meaningScore);
    html += '</div>';
    
    // 统计信息
    html += '<div class="mastery-stats">';
    html += '<div class="stat-item"><span class="stat-value">' + mastery.totalViews + '</span><span class="stat-label">学习次数</span></div>';
    html += '<div class="stat-item"><span class="stat-value">' + mastery.correctCount + '</span><span class="stat-label">正确</span></div>';
    html += '<div class="stat-item"><span class="stat-value">' + mastery.wrongCount + '</span><span class="stat-label">错误</span></div>';
    
    var difficultyLabels = { easy: '简单', medium: '适中', hard: '困难' };
    var difficultyColors = { easy: '#10b981', medium: '#f59e0b', hard: '#ef4444' };
    html += '<div class="stat-item"><span class="stat-value" style="color:' + difficultyColors[mastery.difficulty] + '">' + difficultyLabels[mastery.difficulty] + '</span><span class="stat-label">难度</span></div>';
    html += '</div>';
    
    // 学习时间线
    if (mastery.firstStudied) {
        html += '<div class="mastery-timeline">';
        html += '<span class="timeline-item">首次: ' + formatDate(mastery.firstStudied) + '</span>';
        if (mastery.lastStudied) {
            html += '<span class="timeline-item">最近: ' + formatTimeAgo(mastery.lastStudied) + '</span>';
        }
        html += '</div>';
    }
    
    html += '</div>';
    
    return html;
}

// 渲染维度进度条
function renderDimensionBar(label, score) {
    var color = score >= 80 ? '#10b981' : (score >= 50 ? '#3b82f6' : (score >= 30 ? '#f59e0b' : '#ef4444'));
    
    var html = '<div class="dimension-bar-item">';
    html += '<span class="dimension-label">' + label + '</span>';
    html += '<div class="dimension-bar-track">';
    html += '<div class="dimension-bar-fill" style="width:' + score + '%;background:' + color + '"></div>';
    html += '</div>';
    html += '<span class="dimension-value">' + score + '</span>';
    html += '</div>';
    
    return html;
}

// 格式化日期
function formatDate(timestamp) {
    var date = new Date(timestamp);
    return (date.getMonth() + 1) + '/' + date.getDate();
}

// 格式化时间差
function formatTimeAgo(timestamp) {
    var now = Date.now();
    var diff = now - timestamp;
    
    var minutes = Math.floor(diff / 60000);
    var hours = Math.floor(diff / 3600000);
    var days = Math.floor(diff / 86400000);
    
    if (days > 0) return days + '天前';
    if (hours > 0) return hours + '小时前';
    if (minutes > 0) return minutes + '分钟前';
    return '刚刚';
}

// 获取掌握度统计
function getMasteryStats() {
    var stats = {
        total: window.vocabularyData ? window.vocabularyData.length : 0,
        byLevel: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        avgRetention: 0,
        hardWords: [],
        masteredWords: [],
        needReview: []
    };
    
    var totalRetention = 0;
    var retentionCount = 0;
    
    Object.keys(wordMasteryData).forEach(function(word) {
        var m = wordMasteryData[word];
        stats.byLevel[m.level]++;
        
        if (m.retentionRate > 0) {
            totalRetention += m.retentionRate;
            retentionCount++;
        }
        
        if (m.difficulty === 'hard') {
            stats.hardWords.push(word);
        }
        
        if (m.level >= 4) {
            stats.masteredWords.push(word);
        }
        
        // 检查是否需要复习（超过3天未学习且保持率低于80%）
        if (m.lastStudied && (Date.now() - m.lastStudied > 3 * 86400000) && m.retentionRate < 80) {
            stats.needReview.push({ word: word, urgency: 100 - m.retentionRate });
        }
    });
    
    stats.avgRetention = retentionCount > 0 ? Math.round(totalRetention / retentionCount) : 0;
    stats.needReview.sort(function(a, b) { return b.urgency - a.urgency; });
    
    return stats;
}

// 添加掌握度追踪样式
function addMasteryTrackingStyles() {
    if (document.getElementById('masteryTrackingStyles')) return;
    
    var style = document.createElement('style');
    style.id = 'masteryTrackingStyles';
    style.textContent = `
        /* V1: 掌握度徽章样式 */
        .mastery-badge {
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 4px 10px;
            border-radius: 20px;
            font-weight: 600;
            transition: all 0.2s ease;
        }
        
        .mastery-badge:hover {
            transform: scale(1.05);
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        
        .mastery-badge-mini {
            padding: 2px 6px;
            font-size: 12px;
        }
        
        .mastery-badge-normal {
            padding: 4px 10px;
            font-size: 13px;
        }
        
        .mastery-badge-large {
            padding: 6px 14px;
            font-size: 14px;
        }
        
        .mastery-icon {
            font-size: 1.1em;
        }
        
        .mastery-rate {
            margin-left: 4px;
            opacity: 0.8;
        }
        
        /* 掌握度卡片 */
        .mastery-card {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        }
        
        .mastery-card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 16px;
        }
        
        .mastery-level-display {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .mastery-level-icon {
            font-size: 28px;
        }
        
        .mastery-level-name {
            font-size: 18px;
            font-weight: 700;
            color: #1f2937;
        }
        
        .mastery-retention {
            text-align: right;
        }
        
        .retention-value {
            display: block;
            font-size: 24px;
            font-weight: 700;
            color: #1f2937;
        }
        
        .retention-label {
            font-size: 12px;
            color: #6b7280;
        }
        
        /* 维度进度条 */
        .mastery-dimensions {
            padding: 16px;
        }
        
        .dimension-bar-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .dimension-label {
            width: 60px;
            font-size: 13px;
            color: #4b5563;
        }
        
        .dimension-bar-track {
            flex: 1;
            height: 8px;
            background: #e5e7eb;
            border-radius: 4px;
            overflow: hidden;
        }
        
        .dimension-bar-fill {
            height: 100%;
            border-radius: 4px;
            transition: width 0.5s ease;
        }
        
        .dimension-value {
            width: 30px;
            text-align: right;
            font-size: 13px;
            font-weight: 600;
            color: #374151;
        }
        
        /* 统计信息 */
        .mastery-stats {
            display: flex;
            justify-content: space-around;
            padding: 16px;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-value {
            display: block;
            font-size: 18px;
            font-weight: 700;
            color: #1f2937;
        }
        
        .stat-label {
            font-size: 11px;
            color: #6b7280;
        }
        
        /* 时间线 */
        .mastery-timeline {
            display: flex;
            justify-content: space-between;
            padding: 12px 16px;
            font-size: 12px;
            color: #6b7280;
            border-top: 1px solid #e5e7eb;
        }
        
        /* 单词卡片中的掌握度指示 */
        .word-mastery-indicator {
            position: absolute;
            top: 12px;
            right: 12px;
        }
    `;
    document.head.appendChild(style);
}

// 导出V1功能
window.initWordMastery = initWordMastery;
window.updateWordMastery = updateWordMastery;
window.getWordMastery = getWordMastery;
window.getMasteryLevelInfo = getMasteryLevelInfo;
window.renderMasteryBadge = renderMasteryBadge;
window.renderMasteryCard = renderMasteryCard;
window.getMasteryStats = getMasteryStats;
window.addMasteryTrackingStyles = addMasteryTrackingStyles;

// V11: 同义词/反义词数据
var wordRelationsData = null;

// V12: 智能助记词数据
var wordMnemonicsData = null;

// V13: 词汇难度分级数据
var wordDifficultyData = null;

// V15: 丰富例句数据
var wordExamplesData = null;

// V16: 真题词汇标记数据
var wordExamTagsData = null;

// ==================== V14: 科学助记系统 ====================
// 基于认知心理学的10个维度改进

// V14.1: 助记效果评估数据
var mnemonicEffectivenessData = {};
try {
    mnemonicEffectivenessData = JSON.parse(localStorage.getItem('mnemonicEffectiveness') || '{}');
} catch(e) {
    mnemonicEffectivenessData = {};
}

// V14.2: 用户自定义助记词
var userCustomMnemonics = {};
try {
    userCustomMnemonics = JSON.parse(localStorage.getItem('userCustomMnemonics') || '{}');
} catch(e) {
    userCustomMnemonics = {};
}

// V14.3: 记忆宫殿数据
var memoryPalaceData = {};
try {
    memoryPalaceData = JSON.parse(localStorage.getItem('memoryPalace') || '{}');
} catch(e) {
    memoryPalaceData = {};
}

// V14.4: 情感锚定数据
var emotionalAnchorData = {};
try {
    emotionalAnchorData = JSON.parse(localStorage.getItem('emotionalAnchors') || '{}');
} catch(e) {
    emotionalAnchorData = {};
}

// V14.5: 分块记忆组
var chunkingGroups = {};
try {
    chunkingGroups = JSON.parse(localStorage.getItem('chunkingGroups') || '{}');
} catch(e) {
    chunkingGroups = {};
}

// V14-V19: 科学记忆方法类型（基于研究）- 极简纯净版
var MNEMONIC_SCIENCE = {
    types: {
        'etymology': { 
            name: '词源', 
            icon: 'root', 
            color: '#166534', 
            bg: '#dcfce7', 
            bgGradient: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
            effectiveness: 0.85, 
            description: '词根词缀',
            shortDesc: '词根'
        },
        'phonetic': { 
            name: '谐音', 
            icon: 'sound', 
            color: '#92400e', 
            bg: '#fef3c7', 
            bgGradient: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            effectiveness: 0.72, 
            description: '声音联想',
            shortDesc: '音联'
        },
        'visual': { 
            name: '联想', 
            icon: 'image', 
            color: '#1e40af', 
            bg: '#dbeafe', 
            bgGradient: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
            effectiveness: 0.88, 
            description: '画面联想',
            shortDesc: '联想'
        },
        'story': { 
            name: '故事', 
            icon: 'book', 
            color: '#7c2d12', 
            bg: '#ffedd5', 
            bgGradient: 'linear-gradient(135deg, #ffedd5 0%, #fed7aa 100%)',
            effectiveness: 0.90, 
            description: '情节联想',
            shortDesc: '故事'
        },
        'loci': { 
            name: '定位', 
            icon: 'location', 
            color: '#5b21b6', 
            bg: '#ede9fe', 
            bgGradient: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
            effectiveness: 0.92, 
            description: '空间记忆',
            shortDesc: '定位'
        },
        'chunking': { 
            name: '分块', 
            icon: 'grid', 
            color: '#0f766e', 
            bg: '#ccfbf1', 
            bgGradient: 'linear-gradient(135deg, #ccfbf1 0%, #99f6e4 100%)',
            effectiveness: 0.80, 
            description: '分组记忆',
            shortDesc: '分块'
        },
        'emotional': { 
            name: '情感', 
            icon: 'heart', 
            color: '#be123c', 
            bg: '#ffe4e6', 
            bgGradient: 'linear-gradient(135deg, #ffe4e6 0%, #fecdd3 100%)',
            effectiveness: 0.87, 
            description: '情感联想',
            shortDesc: '情感'
        },
        'kinesthetic': { 
            name: '动作', 
            icon: 'move', 
            color: '#4338ca', 
            bg: '#e0e7ff', 
            bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
            effectiveness: 0.78, 
            description: '动作记忆',
            shortDesc: '动作'
        },
        'elaboration': { 
            name: '加工', 
            icon: 'search', 
            color: '#6d28d9', 
            bg: '#f3e8ff', 
            bgGradient: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
            effectiveness: 0.86, 
            description: '深度处理',
            shortDesc: '加工'
        },
        'dual_coding': { 
            name: '双编码', 
            icon: 'layers', 
            color: '#0369a1', 
            bg: '#e0f2fe', 
            bgGradient: 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)',
            effectiveness: 0.89, 
            description: '双通道',
            shortDesc: '双编码'
        }
    },
    // V15: 效果等级映射（无emoji）
    effectivenessEmoji: function(score) {
        if (score >= 0.9) return { emoji: '', label: 'S', color: '#f59e0b' };
        if (score >= 0.85) return { emoji: '', label: 'A', color: '#22c55e' };
        if (score >= 0.8) return { emoji: '', label: 'B', color: '#3b82f6' };
        if (score >= 0.7) return { emoji: '', label: 'C', color: '#8b5cf6' };
        return { emoji: '', label: 'D', color: '#6b7280' };
    },
    // 记忆强度计算（基于艾宾浩斯遗忘曲线修正）
    calculateRetention: function(initialStrength, hoursSinceEncoding, reviewCount) {
        // R = S * e^(-t/τ) + reinforcement_bonus
        var tau = 24 * (1 + reviewCount * 0.5); // 复习增加记忆半衰期
        var retention = initialStrength * Math.exp(-hoursSinceEncoding / tau);
        var bonus = Math.min(0.3, reviewCount * 0.05);
        return Math.min(1, retention + bonus);
    },
    // 推荐最佳助记类型（基于用户历史表现）
    recommendType: function(word, userHistory) {
        var scores = {};
        var types = Object.keys(this.types);
        
        types.forEach(function(type) {
            var baseScore = MNEMONIC_SCIENCE.types[type].effectiveness;
            var userScore = userHistory[type] || baseScore;
            scores[type] = (baseScore + userScore) / 2;
        });
        
        // 根据词汇特征调整推荐
        if (word.length > 8) scores['chunking'] *= 1.2;
        if (/^(un|re|pre|dis|mis)/.test(word)) scores['etymology'] *= 1.3;
        if (/tion$|sion$|ment$|ness$/.test(word)) scores['etymology'] *= 1.2;
        
        var best = types.reduce(function(a, b) {
            return scores[a] > scores[b] ? a : b;
        });
        
        return { type: best, score: scores[best], allScores: scores };
    }
};

// V14.1: 记录助记效果
function recordMnemonicEffectiveness(word, mnemonicType, wasEffective) {
    if (!mnemonicEffectivenessData[word]) {
        mnemonicEffectivenessData[word] = {
            type: mnemonicType,
            exposures: 0,
            successes: 0,
            lastReview: null,
            effectiveness: 0.5
        };
    }
    
    var data = mnemonicEffectivenessData[word];
    data.exposures++;
    if (wasEffective) data.successes++;
    data.lastReview = Date.now();
    data.effectiveness = data.successes / data.exposures;
    
    // 更新类型总体效果
    if (!mnemonicEffectivenessData._typeStats) {
        mnemonicEffectivenessData._typeStats = {};
    }
    if (!mnemonicEffectivenessData._typeStats[mnemonicType]) {
        mnemonicEffectivenessData._typeStats[mnemonicType] = { total: 0, success: 0 };
    }
    mnemonicEffectivenessData._typeStats[mnemonicType].total++;
    if (wasEffective) mnemonicEffectivenessData._typeStats[mnemonicType].success++;
    
    localStorage.setItem('mnemonicEffectiveness', JSON.stringify(mnemonicEffectivenessData));
}

// V14.2: 保存用户自定义助记词
function saveCustomMnemonic(word, mnemonic) {
    userCustomMnemonics[word.toLowerCase()] = {
        mnemonic: mnemonic.text,
        type: mnemonic.type || 'custom',
        createdAt: Date.now(),
        visual: mnemonic.visual || null,
        emotional: mnemonic.emotional || null,
        story: mnemonic.story || null
    };
    localStorage.setItem('userCustomMnemonics', JSON.stringify(userCustomMnemonics));
}

// V14.3: 添加到记忆宫殿
function addToMemoryPalace(word, location, imageDescription) {
    if (!memoryPalaceData.locations) {
        memoryPalaceData.locations = [
            { id: 'home_entrance', name: '家门口', description: '熟悉的家门入口' },
            { id: 'living_room', name: '客厅', description: '舒适的客厅' },
            { id: 'kitchen', name: '厨房', description: '厨房' },
            { id: 'bedroom', name: '卧室', description: '卧室' },
            { id: 'bathroom', name: '卫生间', description: '卫生间' },
            { id: 'balcony', name: '阳台', description: '阳台' },
            { id: 'study', name: '书房', description: '书房' },
            { id: 'garden', name: '花园', description: '花园' }
        ];
    }
    
    if (!memoryPalaceData.placements) {
        memoryPalaceData.placements = {};
    }
    
    memoryPalaceData.placements[word.toLowerCase()] = {
        locationId: location,
        image: imageDescription,
        placedAt: Date.now()
    };
    
    localStorage.setItem('memoryPalace', JSON.stringify(memoryPalaceData));
}

// V14.4: 设置情感锚定
function setEmotionalAnchor(word, emotion, intensity) {
    var emotions = {
        'joy': { icon: '●', name: '快乐', color: '#fbbf24' },
        'surprise': { icon: '●', name: '惊讶', color: '#8b5cf6' },
        'fear': { icon: '●', name: '恐惧', color: '#6b7280' },
        'disgust': { icon: '●', name: '厌恶', color: '#22c55e' },
        'anger': { icon: '●', name: '愤怒', color: '#ef4444' },
        'sadness': { icon: '●', name: '悲伤', color: '#3b82f6' },
        'love': { icon: '●', name: '爱', color: '#ec4899' },
        'curiosity': { icon: '●', name: '好奇', color: '#f59e0b' }
    };
    
    emotionalAnchorData[word.toLowerCase()] = {
        emotion: emotion,
        intensity: intensity || 5,
        data: emotions[emotion],
        setAt: Date.now()
    };
    
    localStorage.setItem('emotionalAnchors', JSON.stringify(emotionalAnchorData));
}

// V14.5: 创建分块记忆组
function createChunkingGroup(groupName, words, commonPattern) {
    var groupId = 'chunk_' + Date.now();
    chunkingGroups[groupId] = {
        name: groupName,
        words: words,
        pattern: commonPattern,
        createdAt: Date.now()
    };
    
    // 标记每个单词属于哪个组
    words.forEach(function(word) {
        if (!chunkingGroups._wordToGroup) chunkingGroups._wordToGroup = {};
        chunkingGroups._wordToGroup[word.toLowerCase()] = groupId;
    });
    
    localStorage.setItem('chunkingGroups', JSON.stringify(chunkingGroups));
    return groupId;
}

// V14.6: 获取增强版助记信息
function getEnhancedMnemonic(word) {
    var lowerWord = word.toLowerCase();
    var baseMnemonic = getWordMnemonic(word);
    var customMnemonic = userCustomMnemonics[lowerWord];
    var effectiveness = mnemonicEffectivenessData[lowerWord];
    var palace = memoryPalaceData.placements ? memoryPalaceData.placements[lowerWord] : null;
    var emotion = emotionalAnchorData[lowerWord];
    var chunk = chunkingGroups._wordToGroup ? chunkingGroups[chunkingGroups._wordToGroup[lowerWord]] : null;
    
    return {
        base: baseMnemonic,
        custom: customMnemonic,
        effectiveness: effectiveness,
        memoryPalace: palace,
        emotionalAnchor: emotion,
        chunkGroup: chunk,
        hasEnhancements: !!(customMnemonic || palace || emotion || chunk),
        recommended: MNEMONIC_SCIENCE.recommendType(word, mnemonicEffectivenessData._typeStats || {})
    };
}

// V11: 加载同义词/反义词数据
function loadWordRelations() {
    if (wordRelationsData) return Promise.resolve(wordRelationsData);
    
    return fetch('word_relations.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load word relations');
            return response.json();
        })
        .then(function(data) {
            wordRelationsData = data;
            console.log('[V11] 同义词/反义词数据加载成功，共', Object.keys(data).length, '组');
            return data;
        })
        .catch(function(err) {
            console.warn('[V11] 加载同义词/反义词数据失败:', err);
            wordRelationsData = {};
            return {};
        });
}

// V12: 加载智能助记词数据
function loadWordMnemonics() {
    if (wordMnemonicsData) return Promise.resolve(wordMnemonicsData);
    
    return fetch('word_mnemonics.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load word mnemonics');
            return response.json();
        })
        .then(function(data) {
            wordMnemonicsData = data;
            console.log('[V12] 智能助记词数据加载成功，共', Object.keys(data).length, '个');
            return data;
        })
        .catch(function(err) {
            console.warn('[V12] 加载智能助记词数据失败:', err);
            wordMnemonicsData = {};
            return {};
        });
}

// V13: 加载词汇难度分级数据
function loadWordDifficulty() {
    if (wordDifficultyData) return Promise.resolve(wordDifficultyData);
    
    return fetch('word_difficulty.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load word difficulty');
            return response.json();
        })
        .then(function(data) {
            wordDifficultyData = data;
            console.log('[V13] 词汇难度分级数据加载成功，共', Object.keys(data).length, '个');
            return data;
        })
        .catch(function(err) {
            console.warn('[V13] 加载词汇难度分级数据失败:', err);
            wordDifficultyData = {};
            return {};
        });
}

// V15: 加载丰富例句数据
function loadWordExamples() {
    if (wordExamplesData) return Promise.resolve(wordExamplesData);
    
    return fetch('word_examples.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load word examples');
            return response.json();
        })
        .then(function(data) {
            wordExamplesData = data;
            console.log('[V15] 丰富例句数据加载成功，共', Object.keys(data).length, '个');
            return data;
        })
        .catch(function(err) {
            console.warn('[V15] 加载丰富例句数据失败:', err);
            wordExamplesData = {};
            return {};
        });
}

// V11: 获取单词的同义词/反义词
function getWordRelations(word) {
    if (!wordRelationsData) return null;
    var lowerWord = word.toLowerCase();
    return wordRelationsData[lowerWord] || null;
}

// V12: 获取单词的助记词
function getWordMnemonic(word) {
    if (!wordMnemonicsData) return null;
    var lowerWord = word.toLowerCase();
    return wordMnemonicsData[lowerWord] || null;
}

// V13: 获取单词难度等级
function getWordDifficulty(word) {
    if (!wordDifficultyData) return null;
    var lowerWord = word.toLowerCase();
    return wordDifficultyData[lowerWord] || null;
}

// V15: 获取单词丰富例句
function getWordExamples(word) {
    if (!wordExamplesData) return null;
    var lowerWord = word.toLowerCase();
    return wordExamplesData[lowerWord] || null;
}

// V16: 加载真题词汇标记数据
function loadWordExamTags() {
    if (wordExamTagsData) return Promise.resolve(wordExamTagsData);
    
    return fetch('word_exam_tags.json')
        .then(function(response) {
            if (!response.ok) throw new Error('Failed to load exam tags');
            return response.json();
        })
        .then(function(data) {
            wordExamTagsData = data;
            console.log('[V16] 真题词汇标记加载成功，共', Object.keys(data).length, '个');
            return data;
        })
        .catch(function(err) {
            console.warn('[V16] 加载真题词汇标记失败:', err);
            wordExamTagsData = {};
            return {};
        });
}

// V16: 获取单词真题标记
function getWordExamTags(word) {
    if (!wordExamTagsData) return null;
    var lowerWord = word.toLowerCase();
    return wordExamTagsData[lowerWord] || null;
}

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
    // V8: 加载自适应难度数据
    loadAdaptiveDifficulty();
    // V11: 加载同义词/反义词数据
    loadWordRelations();
    // V12: 加载智能助记词数据
    loadWordMnemonics();
    // V13: 加载词汇难度分级数据
    loadWordDifficulty();
    // V15: 加载丰富例句数据
    loadWordExamples();
    // V16: 加载真题词汇标记数据
    loadWordExamTags();
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
            padding: 12px 16px;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .settings-row {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
            margin-bottom: 8px;
        }
        
        .setting-item {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .setting-label {
            color: #374151;
            font-weight: 500;
            font-size: 13px;
            white-space: nowrap;
            display: flex;
            align-items: center;
            gap: 4px;
        }
        
        .setting-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            background: #6366f1;
            color: white;
            border-radius: 4px;
            font-size: 10px;
            font-weight: bold;
        }
        
        .tip-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 16px;
            height: 16px;
            background: #f59e0b;
            color: white;
            border-radius: 50%;
            font-size: 9px;
        }
        
        .setting-select {
            padding: 6px 10px;
            border-radius: 6px;
            border: 1px solid #d1d5db;
            background: white;
            color: #1e1b4b;
            font-weight: 500;
            font-size: 13px;
            cursor: pointer;
            outline: none;
            min-width: 70px;
        }
        
        .setting-select:focus {
            border-color: #6366f1;
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
            font-weight: 600;
        }
        
        /* 学习进度指示器 */
        .learning-progress-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 4px;
            margin-top: 10px;
            padding: 8px 12px;
            background: #f3f4f6;
            border-radius: 8px;
        }
        
        .progress-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: #e5e7eb;
        }
        
        .progress-dot.completed {
            background: #10b981;
        }
        
        .progress-dot.current {
            background: #6366f1;
        }
        
        .progress-label {
            margin-left: 6px;
            font-size: 12px;
            color: #6b7280;
            font-weight: 500;
        }
        
        /* 词卡优化样式 */
        .word-card-enhanced {
            background: white;
            border-radius: 12px;
            padding: 24px;
            border: 1px solid #e5e7eb;
        }
        
        .word-main-enhanced {
            font-size: 36px;
            font-weight: 700;
            color: #1e1b4b;
            text-align: center;
            margin-bottom: 6px;
        }
        
        .word-phonetic-enhanced {
            font-size: 16px;
            color: #6b7280;
            text-align: center;
            margin-bottom: 16px;
        }
        
        /* 评分按钮优化 */
        .rate-btn-enhanced {
            flex: 1;
            padding: 12px 10px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
        }
        
        .rate-btn-enhanced.hard {
            background: #fef2f2;
            color: #dc2626;
        }
        
        .rate-btn-enhanced.hard:hover {
            background: #fee2e2;
        }
        
        .rate-btn-enhanced.medium {
            background: #fffbeb;
            color: #d97706;
        }
        
        .rate-btn-enhanced.medium:hover {
            background: #fef3c7;
        }
        
        .rate-btn-enhanced.easy {
            background: #ecfdf5;
            color: #059669;
        }
        
        .rate-btn-enhanced.easy:hover {
            background: #d1fae5;
        }
        
        .rate-emoji {
            font-size: 20px;
        }
        
        .rate-text {
            font-size: 13px;
        }
        
        .rate-hint {
            font-size: 10px;
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
            background: #fef3c7;
            color: #92400e;
        }
        
        .learning-badge.new .badge-icon {
            font-size: 12px;
        }
        
        .learning-badge.learning {
            background: #e0e7ff;
            color: #3730a3;
        }
        
        .learning-badge.completed {
            background: #d1fae5;
            color: #065f46;
        }
        
        .learning-badge.completed .badge-icon {
            font-size: 12px;
        }
        
        .badge-count {
            font-size: 15px;
            font-weight: 700;
            color: #4f46e5;
        }
        
        .badge-separator {
            font-size: 11px;
            color: #9ca3af;
            margin: 0 1px;
        }
        
        .badge-total {
            font-size: 12px;
            font-weight: 600;
            color: #6b7280;
        }
        
        .badge-text {
            font-size: 11px;
            margin-left: 2px;
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
    
    // V2.6: 根据学习目标过滤词汇
    var goalVocabulary = getGoalFilteredVocabulary();
    var effectiveWordsPerSession = getEffectiveWordsPerSession();
    
    // 随机选择指定数量的单词
    var allIndices = [];
    for (var i = 0; i < goalVocabulary.length; i++) {
        allIndices.push(i);
    }
    
    // 打乱顺序
    for (var j = allIndices.length - 1; j > 0; j--) {
        var k = Math.floor(Math.random() * (j + 1));
        var temp = allIndices[j];
        allIndices[j] = allIndices[k];
        allIndices[k] = temp;
    }
    
    // 取前N个（根据目标调整数量）
    var count = Math.min(effectiveWordsPerSession, allIndices.length);
    for (var m = 0; m < count; m++) {
        var wordData = goalVocabulary[allIndices[m]];
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

// V2.6: 根据学习目标获取过滤后的词汇列表
function getGoalFilteredVocabulary() {
    var goal = null;
    
    // 尝试从ActivationSystem获取学习目标
    if (typeof ActivationSystem !== 'undefined' && ActivationSystem.getLearningGoal) {
        goal = ActivationSystem.getLearningGoal();
    } else {
        // 备用：直接从localStorage获取
        try {
            var goalData = JSON.parse(localStorage.getItem('eb_learning_goal') || '{}');
            goal = goalData.goal;
        } catch(e) {
            goal = null;
        }
    }
    
    console.log('[V2.6] 当前学习目标:', goal);
    
    // 如果没有设置目标或使用所有词汇
    if (!goal) {
        return window.vocabularyData;
    }
    
    // 根据目标过滤词汇
    var filteredWords = [];
    var examTagsLoaded = wordExamTagsData && Object.keys(wordExamTagsData).length > 0;
    
    window.vocabularyData.forEach(function(wordData) {
        var shouldInclude = false;
        var wordLower = wordData.word.toLowerCase();
        
        if (goal === 'gre') {
            // GRE模式：优先GRE高频词
            if (examTagsLoaded && wordExamTagsData[wordLower]) {
                var tags = wordExamTagsData[wordLower];
                shouldInclude = tags.gre || tags.gre_high_freq || tags.graduate;
            }
            // 如果没有标签数据，默认包含难度较高的词
            if (!shouldInclude && wordDifficultyData && wordDifficultyData[wordLower]) {
                var diff = wordDifficultyData[wordLower];
                shouldInclude = diff.level === 'advanced' || diff.level === 'expert';
            }
            // 兜底：包含所有词汇
            if (!shouldInclude && (!examTagsLoaded || !wordDifficultyData)) {
                shouldInclude = true;
            }
        } else if (goal === 'toefl') {
            // 托福模式：托福常考词
            if (examTagsLoaded && wordExamTagsData[wordLower]) {
                var tags = wordExamTagsData[wordLower];
                shouldInclude = tags.toefl || tags.toefl_high_freq || tags.academic;
            }
            if (!shouldInclude && wordDifficultyData && wordDifficultyData[wordLower]) {
                var diff = wordDifficultyData[wordLower];
                shouldInclude = diff.level === 'intermediate' || diff.level === 'advanced';
            }
            if (!shouldInclude && (!examTagsLoaded || !wordDifficultyData)) {
                shouldInclude = true;
            }
        } else if (goal === 'academic') {
            // 学术英语模式：AWL学术词汇
            if (examTagsLoaded && wordExamTagsData[wordLower]) {
                var tags = wordExamTagsData[wordLower];
                shouldInclude = tags.awl || tags.academic || tags.research;
            }
            // 检查是否为AWL词汇（通过标签或其他方式）
            if (!shouldInclude && window.awlWordList && window.awlWordList.includes(wordLower)) {
                shouldInclude = true;
            }
            if (!shouldInclude && (!examTagsLoaded || !window.awlWordList)) {
                shouldInclude = true;
            }
        } else {
            // 未知目标，包含所有
            shouldInclude = true;
        }
        
        if (shouldInclude) {
            filteredWords.push(wordData);
        }
    });
    
    console.log('[V2.6] 目标过滤后词汇数:', filteredWords.length, '/', window.vocabularyData.length);
    
    // 如果过滤后词汇太少，返回全部
    if (filteredWords.length < 20) {
        console.log('[V2.6] 过滤后词汇不足，使用全部词汇');
        return window.vocabularyData;
    }
    
    return filteredWords;
}

// V2.7: 根据学习目标获取有效的每次学习单词数
function getEffectiveWordsPerSession() {
    var goal = null;
    
    if (typeof ActivationSystem !== 'undefined' && ActivationSystem.getGoalDailyWords) {
        var goalDailyWords = ActivationSystem.getGoalDailyWords();
        if (goalDailyWords) {
            // 使用目标配置的每日单词数，但不超过用户设置
            return Math.min(goalDailyWords, wordsPerSession);
        }
    }
    
    return wordsPerSession;
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
    // V10: 更新进度环
    var progressRingFill = document.getElementById('progressRingFill');
    var progressText = document.getElementById('vocabProgressText');
    var oldProgress = document.getElementById('vocabProgress');
    
    var completedCount = 0;
    sessionWords.forEach(function(w) {
        if (sessionWordProgress[w.word] && sessionWordProgress[w.word].completed) {
            completedCount++;
        }
    });
    
    // 计算进度百分比
    var total = sessionWords.length || 1;
    var progress = completedCount / total;
    var circumference = 2 * Math.PI * 20; // r=20
    var offset = circumference * (1 - progress);
    
    // 更新进度环
    if (progressRingFill) {
        progressRingFill.style.strokeDashoffset = offset;
    }
    
    // 更新数字
    if (progressText) {
        progressText.textContent = completedCount;
    }
    
    // 兼容旧版进度显示
    if (oldProgress) {
        oldProgress.textContent = (currentQueueIndex + 1) + '/' + learningQueue.length + ' (已掌握: ' + completedCount + '/' + sessionWords.length + ')';
    }
    
    // V8: 更新统计面板
    updateVocabStats();
}

// V8: 更新学习统计
function updateVocabStats() {
    var stats = loadDailyStats();
    
    var statTodayNew = document.getElementById('statTodayNew');
    var statTodayReview = document.getElementById('statTodayReview');
    var statMastered = document.getElementById('statMastered');
    var statStreak = document.getElementById('statStreak');
    
    if (statTodayNew) statTodayNew.textContent = stats.newToday || 0;
    if (statTodayReview) statTodayReview.textContent = stats.reviewToday || 0;
    if (statMastered) statMastered.textContent = stats.mastered || 0;
    if (statStreak) statStreak.textContent = stats.streak || 0;
}

// V8: 加载今日统计数据
function loadDailyStats() {
    try {
        var today = new Date().toDateString();
        var statsKey = 'vocabStats_' + today;
        var stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
        
        // 获取总掌握数
        var wordProgress = JSON.parse(localStorage.getItem('wordProgress') || '{}');
        var masteredCount = 0;
        Object.keys(wordProgress).forEach(function(word) {
            if (wordProgress[word].level >= 4) masteredCount++;
        });
        stats.mastered = masteredCount;
        
        // 计算连续学习天数
        stats.streak = calculateStreak();
        
        return stats;
    } catch (e) {
        return { newToday: 0, reviewToday: 0, mastered: 0, streak: 0 };
    }
}

// 计算学习连续天数
function calculateStreak() {
    try {
        var streak = 0;
        var date = new Date();
        
        for (var i = 0; i < 365; i++) {
            var dateStr = date.toDateString();
            var statsKey = 'vocabStats_' + dateStr;
            var dayStats = JSON.parse(localStorage.getItem(statsKey) || '{}');
            
            if ((dayStats.newToday || 0) + (dayStats.reviewToday || 0) > 0) {
                streak++;
                date.setDate(date.getDate() - 1);
            } else if (i === 0) {
                // 今天还没学习，继续检查昨天
                date.setDate(date.getDate() - 1);
            } else {
                break;
            }
        }
        return streak;
    } catch (e) {
        return 0;
    }
}

// V8: 切换统计面板显示
function toggleVocabStats() {
    var panel = document.getElementById('vocabStatsPanel');
    if (panel) {
        panel.classList.toggle('hidden');
        updateVocabStats();
    }
}

// V6: 学习模式状态
var learningModeState = {
    mode: 'normal', // normal, review, difficult
    isFirstTime: true, // 是否首次学习此词
    consecutiveCorrect: 0 // 连续正确次数
};

// v4.9.1: 单词卡片折叠状态
var isWordCardExpanded = false;

function showCurrentWord() {
    if (!learningQueue || learningQueue.length === 0) {
        initSessionWords();
    }
    if (!learningQueue || learningQueue.length === 0) return;
    
    // 确保掌握度样式已加载
    addMasteryTrackingStyles();
    
    // v4.9.1: 重置卡片为简版
    isWordCardExpanded = false;
    
    // 检查是否完成所有学习
    if (currentQueueIndex >= learningQueue.length) {
        showSessionSummary();
        return;
    }
    
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    // V6: 检测学习模式
    var word = wordData.word;
    var sessionProgress = sessionWordProgress[word] || { times: 0, completed: false };
    var isReview = sessionProgress.times > 0;
    var isHardWord = hardWordsInSession && hardWordsInSession.indexOf(word) > -1;
    var isImmediateReview = immediateReviewQueue && immediateReviewQueue.some(function(r) { return r.word === word; });
    
    // 确定学习模式
    if (isImmediateReview) {
        learningModeState.mode = 'immediate';
    } else if (isHardWord) {
        learningModeState.mode = 'difficult';
    } else if (isReview) {
        learningModeState.mode = 'review';
    } else {
        learningModeState.mode = 'normal';
    }
    learningModeState.isFirstTime = !isReview;
    
    // V6: 显示学习模式提示
    showLearningModeIndicator(learningModeState.mode);
    
    // V10: 适配新版HTML结构
    var wordMain = document.getElementById('wordMain');
    var wordPhonetic = document.getElementById('wordPhonetic');
    var wordMeaning = document.getElementById('wordMeaning');
    var rateButtons = document.getElementById('rateButtons');
    var showMeaningBtn = document.getElementById('showMeaningBtn');
    var swipeHint = document.getElementById('swipeHint');
    
    if (wordMain) {
        // V10: 添加单词切换动画
        wordMain.classList.add('exiting');
        setTimeout(function() {
            wordMain.textContent = wordData.word;
            wordMain.classList.remove('exiting');
            wordMain.classList.add('entering');
            setTimeout(function() {
                wordMain.classList.remove('entering');
            }, 350);
        }, 250);
    }
    
    if (wordPhonetic) wordPhonetic.textContent = wordData.phonetic || '';
    
    // V1: 显示掌握度徽章
    showMasteryBadge(wordData.word);
    
    // V13: 显示难度等级标签
    showDifficultyBadge(wordData.word);
    
    // V16: 显示真题标记标签
    showExamTagsBadge(wordData.word);
    
    // 隐藏释义区域
    if (wordMeaning) wordMeaning.classList.add('hidden');
    if (rateButtons) rateButtons.classList.add('hidden');
    if (showMeaningBtn) showMeaningBtn.classList.remove('hidden');
    if (swipeHint) swipeHint.style.display = '';
    
    updateVocabProgress();
    
    // 更新右上角学习次数徽章
    updateLearningBadge();
    
    // 更新学习进度指示器
    updateLearningProgressIndicator();
    
    // v4.9.1: 显示首次使用说明
    showFirstTimeGuide();
    
    // v4.9.1: 添加卡片展开/收起按钮
    addCardToggleButton();
    
    // V4.8.12: 修复发音问题 - 在动画完成后朗读新单词
    setTimeout(function() {
        speakText(wordData.word);
    }, 300);
}

// v4.9.1: 首次使用说明（仅首次安装时显示）
function showFirstTimeGuide() {
    var hasShownGuide = localStorage.getItem('vocabGuideShown');
    if (hasShownGuide) return;
    
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.75);z-index:100000;display:flex;align-items:center;justify-content:center;animation:fadeIn 0.3s ease;';
    
    var guide = document.createElement('div');
    guide.style.cssText = 'background:#fff;border-radius:24px;padding:32px 24px;max-width:340px;width:90%;box-shadow:0 20px 40px rgba(0,0,0,0.3);animation:scaleIn 0.4s ease;';
    guide.innerHTML = '<div style="text-align:center;"><div style="font-size:48px;margin-bottom:16px;">📖</div><h3 style="font-size:22px;font-weight:700;color:#1f2937;margin:0 0 12px;">学习规则说明</h3><div style="text-align:left;background:#f9fafb;padding:16px;border-radius:12px;margin:20px 0;"><div style="margin-bottom:12px;"><span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;background:#10b981;color:white;border-radius:50%;font-weight:700;margin-right:8px;">✓</span><span style="color:#374151;font-size:15px;font-weight:500;">点击"认识"</span><div style="color:#6b7280;font-size:13px;margin:4px 0 0 36px;">连续认识3次即完成学习</div></div><div><span style="display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;background:#ef4444;color:white;border-radius:50%;font-weight:700;margin-right:8px;">✗</span><span style="color:#374151;font-size:15px;font-weight:500;">点击"不认识"</span><div style="color:#6b7280;font-size:13px;margin:4px 0 0 36px;">重新开始学习该单词</div></div></div><div style="background:#fef3c7;padding:12px;border-radius:10px;margin-bottom:20px;"><div style="color:#92400e;font-size:13px;line-height:1.5;">💡 提示：卡片右侧有 <strong>⋮</strong> 按钮<br/>点击可展开查看详细释义和例句</div></div><button onclick="this.closest(\'div[style*=\\\"position:fixed\\\"]\').remove();localStorage.setItem(\'vocabGuideShown\',\'true\');" style="width:100%;padding:14px;background:linear-gradient(135deg,#6366f1,#a855f7);color:white;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;">开始学习</button></div>';
    
    overlay.appendChild(guide);
    document.body.appendChild(overlay);
}

// v4.9.1: 添加卡片展开/收起按钮
function addCardToggleButton() {
    var wordCard = document.getElementById('wordCard');
    if (!wordCard) return;
    
    var existing = document.getElementById('cardToggleBtn');
    if (existing) existing.remove();
    
    var toggleBtn = document.createElement('button');
    toggleBtn.id = 'cardToggleBtn';
    toggleBtn.innerHTML = '⋮';
    toggleBtn.style.cssText = 'position:absolute;top:50%;right:16px;transform:translateY(-50%);width:36px;height:36px;border-radius:50%;background:#f3f4f6;border:none;font-size:20px;color:#6b7280;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;z-index:10;';
    toggleBtn.onclick = function() {
        toggleWordCard();
    };
    wordCard.style.position = 'relative';
    wordCard.appendChild(toggleBtn);
}

// v4.9.1: 切换单词卡片展开/收起
function toggleWordCard() {
    isWordCardExpanded = !isWordCardExpanded;
    var wordMeaning = document.getElementById('wordMeaning');
    var toggleBtn = document.getElementById('cardToggleBtn');
    var rateButtons = document.getElementById('rateButtons');
    var showMeaningBtn = document.getElementById('showMeaningBtn');
    
    if (isWordCardExpanded) {
        // 展开 - 显示详细信息
        if (wordMeaning) wordMeaning.classList.remove('hidden');
        if (toggleBtn) {
            toggleBtn.innerHTML = '×';
            toggleBtn.style.fontSize = '28px';
        }
        // 自动显示评分按钮
        if (rateButtons) rateButtons.classList.remove('hidden');
        if (showMeaningBtn) showMeaningBtn.classList.add('hidden');
    } else {
        // 收起 - 仅显示单词
        if (wordMeaning) wordMeaning.classList.add('hidden');
        if (toggleBtn) {
            toggleBtn.innerHTML = '⋮';
            toggleBtn.style.fontSize = '20px';
        }
        if (rateButtons) rateButtons.classList.add('hidden');
        if (showMeaningBtn) showMeaningBtn.classList.remove('hidden');
    }
}

// V1: 显示掌握度徽章
function showMasteryBadge(word) {
    var masteryContainer = document.getElementById('masteryBadgeContainer');
    var wordMainEl = document.getElementById('wordMain');
    
    if (!masteryContainer && wordMainEl) {
        masteryContainer = document.createElement('div');
        masteryContainer.id = 'masteryBadgeContainer';
        masteryContainer.style.cssText = 'display:flex;justify-content:center;margin-top:8px;';
        wordMainEl.parentNode.insertBefore(masteryContainer, wordMainEl.nextSibling);
    }
    
    if (masteryContainer) {
        var mastery = getWordMastery(word);
        masteryContainer.innerHTML = renderMasteryBadge(word, { size: 'normal' });
        
        // 点击徽章显示详细卡片
        masteryContainer.onclick = function() {
            showMasteryDetailPopup(word);
        };
        masteryContainer.style.cursor = 'pointer';
    }
}

// V1: 显示掌握度详情弹窗
function showMasteryDetailPopup(word) {
    var overlay = document.createElement('div');
    overlay.id = 'masteryDetailOverlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:10000;animation:fadeIn 0.2s ease;';
    
    var popup = document.createElement('div');
    popup.style.cssText = 'background:white;border-radius:20px;max-width:340px;width:90%;max-height:80vh;overflow-y:auto;animation:slideUp 0.3s ease;';
    
    // 标题栏
    var header = '<div style="padding:16px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">';
    header += '<span style="font-size:18px;font-weight:700;">' + word + ' 掌握度</span>';
    header += '<button onclick="document.getElementById(\'masteryDetailOverlay\').remove()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#6b7280;">×</button>';
    header += '</div>';
    
    popup.innerHTML = header + renderMasteryCard(word);
    overlay.appendChild(popup);
    
    overlay.onclick = function(e) {
        if (e.target === overlay) overlay.remove();
    };
    
    document.body.appendChild(overlay);
}

// V13: 显示难度等级标签
function showDifficultyBadge(word) {
    var difficulty = getWordDifficulty(word);
    
    // 查找或创建难度标签容器
    var badge = document.getElementById('difficultyBadge');
    var phoneticEl = document.getElementById('wordPhonetic');
    
    if (!badge && phoneticEl) {
        badge = document.createElement('span');
        badge.id = 'difficultyBadge';
        badge.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-left:10px;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;vertical-align:middle;';
        phoneticEl.parentNode.insertBefore(badge, phoneticEl.nextSibling);
    }
    
    if (badge) {
        if (difficulty) {
            // 根据难度等级设置不同颜色
            var levelStyles = {
                1: { bg: '#dcfce7', color: '#166534', border: '#bbf7d0', icon: '●', label: '基础' },
                2: { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe', icon: '●', label: '中等' },
                3: { bg: '#fef3c7', color: '#92400e', border: '#fde68a', icon: '●', label: '中高级' },
                4: { bg: '#fce7f3', color: '#9d174d', border: '#fbcfe8', icon: '●', label: '高级' },
                5: { bg: '#ede9fe', color: '#5b21b6', border: '#ddd6fe', icon: '●', label: '专业' }
            };
            var style = levelStyles[difficulty.level] || levelStyles[3];
            badge.style.background = style.bg;
            badge.style.color = style.color;
            badge.style.border = '1px solid ' + style.border;
            badge.style.display = 'inline-flex';
            
            // 构建标签内容
            var sourceTags = '';
            if (difficulty.sources && difficulty.sources.length > 0) {
                difficulty.sources.slice(0, 2).forEach(function(src) {
                    var srcStyle = src === 'GRE' ? 'background:#fee2e2;color:#991b1b;' : 
                                   src === 'TOEFL' ? 'background:#e0e7ff;color:#3730a3;' : 
                                   'background:#f3f4f6;color:#374151;';
                    sourceTags += '<span style="' + srcStyle + 'padding:1px 5px;border-radius:4px;font-size:9px;margin-left:4px;">' + src + '</span>';
                });
            }
            
            badge.innerHTML = '<span>' + style.icon + '</span><span>' + style.label + '</span>' + sourceTags;
        } else {
            badge.style.display = 'none';
        }
    }
}

// V16: 显示真题标记标签
function showExamTagsBadge(word) {
    var examTags = getWordExamTags(word);
    
    // 查找或创建真题标签容器
    var examBadge = document.getElementById('examTagsBadge');
    var difficultyBadge = document.getElementById('difficultyBadge');
    var phoneticEl = document.getElementById('wordPhonetic');
    
    if (!examBadge && (difficultyBadge || phoneticEl)) {
        examBadge = document.createElement('span');
        examBadge.id = 'examTagsBadge';
        examBadge.style.cssText = 'display:inline-flex;align-items:center;gap:4px;margin-left:8px;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:600;vertical-align:middle;';
        
        // 插入到难度标签之后，或音标之后
        if (difficultyBadge && difficultyBadge.parentNode) {
            difficultyBadge.parentNode.insertBefore(examBadge, difficultyBadge.nextSibling);
        } else if (phoneticEl && phoneticEl.parentNode) {
            phoneticEl.parentNode.insertBefore(examBadge, phoneticEl.nextSibling);
        }
    }
    
    if (examBadge) {
        if (examTags) {
            examBadge.style.display = 'inline-flex';
            examBadge.style.background = 'linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)';
            examBadge.style.color = '#92400e';
            examBadge.style.border = '1px solid #fcd34d';
            
            var content = '<span style="font-weight:600;font-size:10px;color:#92400e;margin-right:4px;">真题</span>';
            if (examTags.gre) {
                var greHeat = examTags.gre.count >= 12 ? '★★' : examTags.gre.count >= 8 ? '★' : '';
                content += '<span style="background:#7c3aed;color:white;padding:1px 6px;border-radius:4px;font-size:9px;">GRE×' + examTags.gre.count + greHeat + '</span>';
            }
            if (examTags.toefl) {
                var toeflHeat = examTags.toefl.count >= 10 ? '★★' : examTags.toefl.count >= 6 ? '★' : '';
                content += '<span style="background:#2563eb;color:white;padding:1px 6px;border-radius:4px;font-size:9px;margin-left:2px;">TOEFL×' + examTags.toefl.count + toeflHeat + '</span>';
            }
            
            examBadge.innerHTML = content;
        } else {
            examBadge.style.display = 'none';
        }
    }
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
            badge.className = 'learning-badge';
            if (currentTimes === 0) {
                badge.classList.add('new');
                badge.innerHTML = '<span class="badge-text">新词</span>';
            } else {
                badge.classList.add('learning');
                badge.innerHTML = '<span class="badge-count">' + currentTimes + '</span><span class="badge-separator">/</span><span class="badge-total">' + requiredLearningTimes + '</span>';
            }
        }
    }
}

// 更新学习进度指示器 (V12: 使用三点指示器)
function updateLearningProgressIndicator() {
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    var word = wordData.word;
    var progress = sessionWordProgress[word] || { times: 0, completed: false };
    var currentTimes = progress.times;
    
    // V12: 使用HTML中的三点指示器
    var learningDots = document.getElementById('learningDots');
    if (learningDots) {
        var dots = learningDots.querySelectorAll('.dot');
        dots.forEach(function(dot, index) {
            dot.classList.remove('active', 'completed');
            if (index < currentTimes) {
                dot.classList.add('completed');
            } else if (index === currentTimes) {
                dot.classList.add('active');
            }
        });
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
    
    // V11: 获取同义词/反义词
    var relations = getWordRelations(wordData.word);
    
    // V12: 获取助记词
    var mnemonic = getWordMnemonic(wordData.word);
    
    // V14: 获取增强版助记信息
    var enhancedMnemonic = getEnhancedMnemonic(wordData.word);
    
    // 构建释义HTML（中英文双语）
    var meaningHtml = '';
    
    // 如果有字典数据，优先显示 - 极简版
    if (dictData) {
        meaningHtml += '<div class="dict-container" style="background:#f8f7ff;padding:12px;border-radius:10px;margin-bottom:10px;border:1px solid #e5e7eb;">';
        if (dictData.definitions && dictData.definitions.length > 0) {
            meaningHtml += '<div style="font-weight:600;margin-bottom:8px;font-size:13px;color:#4338ca;">词典释义</div>';
            dictData.definitions.slice(0, 3).forEach(function(def, idx) {
                meaningHtml += '<div style="margin-bottom:4px;font-size:13px;color:#555;">• ' + def + '</div>';
            });
        }
        meaningHtml += '</div>';
    }
    
    // 中英文释义 - 极简版
    meaningHtml += '<div class="meaning-cn" style="font-size:18px;color:#1e1b4b;margin-bottom:10px;font-weight:600;">' + (wordData.meaningCn || '暂无中文释义') + '</div>';
    meaningHtml += '<div class="meaning-en" style="color:#6b7280;font-size:14px;margin-bottom:14px;line-height:1.6;">' + (wordData.meaningEn || wordData.meaning || '') + '</div>';
    
    // V16: 真题词汇标记展示
    var examTags = getWordExamTags(wordData.word);
    if (examTags) {
        // 真题标签 - 极简版
        meaningHtml += '<div class="exam-tags-section" style="margin-bottom:12px;padding:10px 12px;background:#fef3c7;border-radius:8px;border:1px solid #fde68a;">';
        meaningHtml += '<div style="font-size:12px;font-weight:600;color:#92400e;margin-bottom:6px;">真题词汇</div>';
        meaningHtml += '<div style="display:flex;flex-wrap:wrap;gap:6px;">';
        
        if (examTags.gre) {
            meaningHtml += '<span style="background:#7c3aed;color:white;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:500;">GRE ×' + examTags.gre.count + '</span>';
        }
        
        if (examTags.toefl) {
            meaningHtml += '<span style="background:#2563eb;color:white;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:500;">TOEFL ×' + examTags.toefl.count + '</span>';
        }
        
        meaningHtml += '</div>';
        meaningHtml += '</div>';
    }
    
    // V14-V19: 科学助记系统 - 极简版
    if (mnemonic || enhancedMnemonic.hasEnhancements) {
        meaningHtml += '<div style="margin-bottom:12px;padding:12px;background:#faf5ff;border-radius:8px;border:1px solid #e9d5ff;">';
        
        // 简化头部
        meaningHtml += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">';
        meaningHtml += '<span style="font-size:13px;font-weight:600;color:#7c3aed;">记忆技巧</span>';
        
        // 效果评估 - 简化版
        var effectivenessScore = enhancedMnemonic.effectiveness ? Math.round(enhancedMnemonic.effectiveness.effectiveness * 100) : null;
        if (effectivenessScore !== null) {
            var scoreColor = effectivenessScore >= 80 ? '#10b981' : effectivenessScore >= 50 ? '#f59e0b' : '#ef4444';
            meaningHtml += '<span style="font-size:11px;color:' + scoreColor + ';">' + effectivenessScore + '%</span>';
        }
        meaningHtml += '</div>';
        
        // 选择最佳助记来源（用户自定义 > 系统生成）
        var activeMnemonic = enhancedMnemonic.custom || mnemonic;
        
        if (activeMnemonic) {
            // 类型标签 - 简化版
            var mnemonicType = activeMnemonic.type || 'etymology';
            var typeInfo = MNEMONIC_SCIENCE.types[mnemonicType] || MNEMONIC_SCIENCE.types['etymology'];
            
            meaningHtml += '<div style="margin-bottom:8px;">';
            meaningHtml += '<span style="display:inline-block;padding:2px 8px;background:' + typeInfo.bg + ';color:' + typeInfo.color + ';border-radius:4px;font-size:11px;font-weight:500;">' + typeInfo.name + '</span>';
            if (enhancedMnemonic.custom) {
                meaningHtml += '<span style="display:inline-block;margin-left:4px;padding:2px 6px;background:#eff6ff;color:#2563eb;border-radius:4px;font-size:10px;">自定义</span>';
            }
            meaningHtml += '</div>';
            
            // 主助记内容
            meaningHtml += '<div style="font-size:14px;color:#581c87;line-height:1.6;padding:8px 10px;background:white;border-radius:6px;margin-bottom:8px;">';
            meaningHtml += activeMnemonic.mnemonic;
            meaningHtml += '</div>';
            
            // 词根信息 - 简化
            if (activeMnemonic.roots) {
                meaningHtml += '<div style="font-size:12px;color:#6b21a8;margin-bottom:6px;">';
                meaningHtml += '<span style="color:#9ca3af;">词根:</span> ' + activeMnemonic.roots;
                meaningHtml += '</div>';
            }
            
            // 联想画面 - 简化
            if (activeMnemonic.association) {
                meaningHtml += '<div style="font-size:12px;color:#1e40af;font-style:italic;margin-bottom:6px;">';
                meaningHtml += '<span style="color:#9ca3af;">联想:</span> ' + activeMnemonic.association;
                meaningHtml += '</div>';
            }
        }
        
        // 记忆宫殿位置 - 简化版
        if (enhancedMnemonic.memoryPalace) {
            var location = memoryPalaceData.locations.find(function(l) { return l.id === enhancedMnemonic.memoryPalace.locationId; });
            meaningHtml += '<div style="font-size:12px;color:#5b21b6;margin-bottom:6px;">';
            meaningHtml += '<span style="color:#9ca3af;">宫殿:</span> ' + (location ? location.name : '位置') + ' - ' + enhancedMnemonic.memoryPalace.image;
            meaningHtml += '</div>';
        }
        
        // 情感锚定 - 简化版
        if (enhancedMnemonic.emotionalAnchor) {
            var emo = enhancedMnemonic.emotionalAnchor;
            meaningHtml += '<div style="font-size:12px;color:#be185d;margin-bottom:6px;">';
            meaningHtml += '<span style="color:#9ca3af;">情感:</span> ' + emo.data.name + ' (' + emo.intensity + '/10)';
            meaningHtml += '</div>';
        }
        
        // 分块记忆组 - 简化版
        if (enhancedMnemonic.chunkGroup) {
            meaningHtml += '<div style="font-size:12px;color:#0f766e;margin-bottom:6px;">';
            meaningHtml += '<span style="color:#9ca3af;">分块:</span> ' + enhancedMnemonic.chunkGroup.name + ' (';
            var chunkPreview = enhancedMnemonic.chunkGroup.words.slice(0, 3).join(', ');
            if (enhancedMnemonic.chunkGroup.words.length > 3) chunkPreview += '...';
            meaningHtml += chunkPreview + ')';
            meaningHtml += '</div>';
        }
        
        // V5: 操作按钮已移除，保持极简
        
        meaningHtml += '</div>'; // 整个助记卡片结束
    } else {
        // 没有助记时显示添加建议 - 简化版
        var recommended = MNEMONIC_SCIENCE.recommendType(wordData.word, mnemonicEffectivenessData._typeStats || {});
        var recType = MNEMONIC_SCIENCE.types[recommended.type];
        
        meaningHtml += '<div style="margin-bottom:12px;padding:10px;background:#f9fafb;border-radius:6px;border:1px dashed #d1d5db;text-align:center;">';
        meaningHtml += '<div style="font-size:12px;color:#6b7280;margin-bottom:8px;">暂无记忆技巧</div>';
        meaningHtml += '<button onclick="showCustomMnemonicEditor(\'' + wordData.word + '\')" style="padding:6px 12px;background:#8b5cf6;border:none;border-radius:4px;color:white;font-size:12px;cursor:pointer;">+ 添加</button>';
        meaningHtml += '</div>';
    }
    
    // 同义词/反义词显示 - 极简版
    if (relations) {
        meaningHtml += '<div class="word-relations" style="margin-bottom:12px;padding:10px;background:#fefce8;border-radius:8px;border:1px solid #fde68a;">';
        
        // 同义词
        if (relations.synonyms && relations.synonyms.length > 0) {
            meaningHtml += '<div style="margin-bottom:8px;"><span style="font-weight:600;color:#15803d;font-size:11px;">同义词</span><div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">';
            relations.synonyms.forEach(function(syn) {
                meaningHtml += '<span style="padding:2px 8px;background:#dcfce7;border-radius:4px;font-size:12px;color:#166534;">' + syn + '</span>';
            });
            meaningHtml += '</div></div>';
        }
        
        // 反义词
        if (relations.antonyms && relations.antonyms.length > 0) {
            meaningHtml += '<div><span style="font-weight:600;color:#b91c1c;font-size:11px;">反义词</span><div style="margin-top:4px;display:flex;flex-wrap:wrap;gap:4px;">';
            relations.antonyms.forEach(function(ant) {
                meaningHtml += '<span style="padding:2px 8px;background:#fee2e2;border-radius:4px;font-size:12px;color:#991b1b;">' + ant + '</span>';
            });
            meaningHtml += '</div></div>';
        }
        
        meaningHtml += '</div>';
    }
    
    // 例句 - 极简版
    if (wordData.example) {
        meaningHtml += '<div class="word-example" style="color:#6b7280;font-size:13px;font-style:italic;padding-top:12px;border-top:1px solid #e5e7eb;">' + wordData.example + '</div>';
    }
    
    // V15: 丰富例句展示
    var wordExamples = getWordExamples(wordData.word);
    if (wordExamples && wordExamples.examples && wordExamples.examples.length > 0) {
        meaningHtml += '<div class="rich-examples-section" style="margin-top:16px;padding-top:16px;border-top:1px solid #e5e7eb;">';
        meaningHtml += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">';
        meaningHtml += '<span style="display:inline-flex;align-items:center;justify-content:center;width:26px;height:26px;background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);border-radius:8px;box-shadow:0 2px 6px rgba(139,92,246,0.3);">';
        meaningHtml += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>';
        meaningHtml += '</span>';
        meaningHtml += '<span style="font-weight:600;font-size:14px;color:#7c3aed;">丰富语境例句</span>';
        meaningHtml += '<span style="font-size:12px;color:#9ca3af;margin-left:auto;">' + wordExamples.examples.length + ' 个例句</span>';
        meaningHtml += '</div>';
        
        wordExamples.examples.forEach(function(example, index) {
            var sourceColors = {
                'GRE真题': { bg: '#fef3c7', text: '#d97706', border: '#fcd34d' },
                'TOEFL真题': { bg: '#dbeafe', text: '#2563eb', border: '#93c5fd' },
                '学术期刊': { bg: '#dcfce7', text: '#16a34a', border: '#86efac' },
                '经济学人': { bg: '#fce7f3', text: '#db2777', border: '#f9a8d4' },
                '纽约时报': { bg: '#e0e7ff', text: '#4f46e5', border: '#a5b4fc' },
                '科学美国人': { bg: '#ccfbf1', text: '#0d9488', border: '#5eead4' },
                '大西洋月刊': { bg: '#fef9c3', text: '#ca8a04', border: '#fde047' },
                '名著文学': { bg: '#f3e8ff', text: '#9333ea', border: '#d8b4fe' }
            };
            var sourceStyle = sourceColors[example.source] || { bg: '#f3f4f6', text: '#6b7280', border: '#d1d5db' };
            
            meaningHtml += '<div style="background:linear-gradient(135deg,#fafafa 0%,#f5f5f5 100%);border-radius:12px;padding:14px;margin-bottom:10px;border:1px solid #e5e7eb;">';
            meaningHtml += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">';
            meaningHtml += '<span style="width:20px;height:20px;background:#8b5cf6;color:white;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;">' + (index + 1) + '</span>';
            meaningHtml += '<span style="font-size:11px;padding:3px 8px;background:' + sourceStyle.bg + ';color:' + sourceStyle.text + ';border:1px solid ' + sourceStyle.border + ';border-radius:12px;font-weight:500;">' + example.source + '</span>';
            meaningHtml += '</div>';
            meaningHtml += '<p style="font-size:14px;color:#374151;line-height:1.6;margin:0 0 8px 0;font-style:italic;">"' + example.en + '"</p>';
            meaningHtml += '<p style="font-size:13px;color:#6b7280;line-height:1.5;margin:0;padding-left:12px;border-left:3px solid #8b5cf6;">' + example.cn + '</p>';
            meaningHtml += '</div>';
        });
        
        meaningHtml += '</div>';
    }
    
    document.getElementById('meaningCn').innerHTML = meaningHtml;
    document.getElementById('meaningEn').innerHTML = '';
    document.getElementById('wordExample').innerHTML = '';
    
    // V10: 适配新版HTML结构
    var wordMeaning = document.getElementById('wordMeaning');
    var showMeaningBtn = document.getElementById('showMeaningBtn');
    var rateButtons = document.getElementById('rateButtons');
    var swipeHint = document.getElementById('swipeHint');
    
    if (wordMeaning) wordMeaning.classList.remove('hidden');
    if (showMeaningBtn) showMeaningBtn.classList.add('hidden');
    if (rateButtons) rateButtons.classList.remove('hidden');
    if (swipeHint) swipeHint.style.display = 'none';
    
    // V3: 更新复习间隔显示
    updateIntervalDisplay();
}

// ==================== V1-V10: Anki风格智能复习系统 ====================

// V2: 智能即时复习队列管理器
var immediateReviewQueue = []; // 即时复习队列（困难/重学的单词）
var hardWordsInSession = []; // 本轮标记为困难的单词

// V8: 自适应难度系统
var adaptiveDifficulty = {
    // 用户历史表现
    recentPerformance: [], // 最近20次评分
    averageAccuracy: 0.7, // 平均准确率
    learningSpeed: 'normal', // slow, normal, fast
    preferredMode: 'balanced' // easy, balanced, challenging
};

// V8: 加载用户学习特征
function loadAdaptiveDifficulty() {
    try {
        var saved = localStorage.getItem('adaptiveDifficulty');
        if (saved) {
            adaptiveDifficulty = JSON.parse(saved);
        }
    } catch(e) {}
}

// V8: 更新自适应难度
function updateAdaptiveDifficulty(rating) {
    var isCorrect = (rating === 'good' || rating === 'easy');
    adaptiveDifficulty.recentPerformance.push(isCorrect ? 1 : 0);
    
    // 保持最近20次记录
    if (adaptiveDifficulty.recentPerformance.length > 20) {
        adaptiveDifficulty.recentPerformance.shift();
    }
    
    // 计算平均准确率
    var sum = adaptiveDifficulty.recentPerformance.reduce(function(a, b) { return a + b; }, 0);
    adaptiveDifficulty.averageAccuracy = sum / adaptiveDifficulty.recentPerformance.length;
    
    // 确定学习速度
    if (adaptiveDifficulty.averageAccuracy >= 0.85) {
        adaptiveDifficulty.learningSpeed = 'fast';
    } else if (adaptiveDifficulty.averageAccuracy <= 0.55) {
        adaptiveDifficulty.learningSpeed = 'slow';
    } else {
        adaptiveDifficulty.learningSpeed = 'normal';
    }
    
    // 保存
    localStorage.setItem('adaptiveDifficulty', JSON.stringify(adaptiveDifficulty));
}

// V8: 获取自适应调整因子
function getAdaptiveFactor(rating) {
    var factor = 1.0;
    
    switch(adaptiveDifficulty.learningSpeed) {
        case 'fast':
            // 学得快：增加间隔，减少复习频率
            if (rating === 'good' || rating === 'easy') factor = 1.15;
            break;
        case 'slow':
            // 学得慢：减少间隔，增加复习频率
            if (rating === 'hard' || rating === 'again') factor = 0.85;
            break;
    }
    
    return factor;
}

// V3 & V8: 计算并显示复习间隔（带自适应调整）
function calculateReviewInterval(word, rating) {
    var wordProgress = wordLearningProgress[word] || {};
    var easeFactor = wordProgress.easeFactor || 2.5;
    var currentInterval = wordProgress.interval || 0;
    var repetitions = wordProgress.repetitions || 0;
    
    // V8: 获取自适应因子
    var adaptiveFactor = getAdaptiveFactor(rating);
    
    var interval = 0;
    var nextEaseFactor = easeFactor;
    
    switch(rating) {
        case 'again': // 重学 - 立即复习
            interval = 0; // 立即（<1分钟）
            nextEaseFactor = Math.max(1.3, easeFactor - 0.2);
            break;
        case 'hard': // 困难 - 1天后
            interval = Math.max(1, Math.round(currentInterval * 1.2 * adaptiveFactor));
            nextEaseFactor = Math.max(1.3, easeFactor - 0.15);
            break;
        case 'good': // 良好 - 正常间隔
            if (repetitions === 0) {
                interval = 1;
            } else if (repetitions === 1) {
                interval = 3;
            } else {
                interval = Math.round(currentInterval * easeFactor * adaptiveFactor);
            }
            break;
        case 'easy': // 简单 - 延长间隔
            if (repetitions === 0) {
                interval = 4;
            } else {
                interval = Math.round(currentInterval * easeFactor * 1.3 * adaptiveFactor);
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

// V1 & V2 & V4 & V8: 重写评分函数 - Anki风格智能复习（带自适应难度）
function rateWord(rating) {
    var wordData = learningQueue[currentQueueIndex];
    if (!wordData) return;
    
    var word = wordData.word;
    
    // V8: 更新自适应难度
    updateAdaptiveDifficulty(rating);
    
    // V1: 更新掌握度追踪
    var masteryResult = 'partial';
    var masteryOptions = { type: 'review' };
    
    switch(rating) {
        case 'again':
            masteryResult = 'wrong';
            masteryOptions.meaningScore = 20;
            break;
        case 'hard':
            masteryResult = 'partial';
            masteryOptions.meaningScore = 50;
            break;
        case 'good':
            masteryResult = 'correct';
            masteryOptions.meaningScore = 80;
            break;
        case 'easy':
            masteryResult = 'correct';
            masteryOptions.meaningScore = 100;
            break;
    }
    
    updateWordMastery(word, masteryResult, masteryOptions);
    
    // 更新本轮学习进度
    var sessionProgress = sessionWordProgress[word] || { times: 0, completed: false };
    
    // V2: 根据评分处理即时复习队列
    switch(rating) {
        case 'again': // 重学 - 立即加入即时复习队列
            // 不增加学习次数
            addToImmediateReview(wordData, 1); // 1个单词后立即复习
            showRatingFeedback('again', '马上再来一次');
            break;
            
        case 'hard': // 困难 - 稍后在本组内复习
            // 增加学习次数但标记为困难
            sessionProgress.times++;
            if (hardWordsInSession.indexOf(word) === -1) {
                hardWordsInSession.push(word);
            }
            addToImmediateReview(wordData, 3); // 3个单词后复习
            showRatingFeedback('hard', '稍后再复习');
            break;
            
        case 'good': // 良好 - 正常进度
            sessionProgress.times++;
            sessionProgress.lastIndex = currentQueueIndex;
            // 从困难列表移除
            var hardIndex = hardWordsInSession.indexOf(word);
            if (hardIndex > -1) hardWordsInSession.splice(hardIndex, 1);
            // 评分反馈已简化
            break;
            
        case 'easy': // 简单 - 加速掌握
            sessionProgress.times += 2; // 简单直接+2次进度
            sessionProgress.lastIndex = currentQueueIndex;
            // 从困难列表移除
            var easyHardIndex = hardWordsInSession.indexOf(word);
            if (easyHardIndex > -1) hardWordsInSession.splice(easyHardIndex, 1);
            // 评分反馈已简化
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
            
            // 记录今日统计数据
            if (typeof recordDailyStats === 'function') {
                recordDailyStats('words', 1);
            }
            
            // 更新首页词汇进度
            if (typeof updateVocabProgress === 'function') {
                updateVocabProgress();
            }
            
            // 更新今日目标进度
            if (typeof updateDailyProgress === 'function') {
                updateDailyProgress('vocabulary', 1);
            }
            
            // v4.9.1: 已移除成就鼓励系统
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

// V5: 显示评分反馈（简化版）
function showRatingFeedback(rating, message) {
    var colors = {
        again: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' },
        hard: { bg: '#fff7ed', border: '#fed7aa', text: '#ea580c' },
        good: { bg: '#f0fdf4', border: '#bbf7d0', text: '#16a34a' },
        easy: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb' }
    };
    
    var style = colors[rating] || colors.good;
    
    var feedback = document.createElement('div');
    feedback.className = 'rating-feedback-card';
    feedback.innerHTML = '<span class="feedback-text">' + message + '</span>';
    feedback.style.cssText = 'position:fixed;top:25%;left:50%;transform:translateX(-50%);background:' + style.bg + ';color:' + style.text + ';padding:12px 24px;border-radius:10px;font-size:14px;font-weight:600;z-index:10001;box-shadow:0 4px 16px rgba(0,0,0,0.1);animation:feedbackBounce 0.3s ease;border:1px solid ' + style.border + ';';
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
    toast.innerHTML = message;
    toast.style.cssText = 'position:fixed;top:15%;left:50%;transform:translateX(-50%);background:#6366f1;color:white;padding:10px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:10001;';
    document.body.appendChild(toast);
    
    setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 1500);
}

// 显示单词完成提示
function showCompletionToast(word) {
    var toast = document.createElement('div');
    toast.className = 'word-completion-toast';
    toast.innerHTML = '<strong>' + word + '</strong> 已掌握';
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#10b981;color:white;padding:12px 20px;border-radius:8px;font-size:14px;font-weight:500;z-index:10001;';
    document.body.appendChild(toast);
    
    setTimeout(function() {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 1200);
}

// V6: 显示学习模式指示器
function showLearningModeIndicator(mode) {
    // 移除旧的指示器
    var oldIndicator = document.getElementById('learningModeIndicator');
    if (oldIndicator) oldIndicator.remove();
    
    var modeConfig = {
        normal: { text: '新词学习', color: '#6366f1', bg: '#eef2ff' },
        review: { text: '复习巩固', color: '#f59e0b', bg: '#fffbeb' },
        immediate: { text: '立即复习', color: '#ef4444', bg: '#fef2f2' },
        difficult: { text: '攻克难词', color: '#ea580c', bg: '#fff7ed' }
    };
    
    var config = modeConfig[mode] || modeConfig.normal;
    
    var indicator = document.createElement('div');
    indicator.id = 'learningModeIndicator';
    indicator.className = 'learning-mode-indicator mode-' + mode;
    indicator.innerHTML = config.text;
    indicator.style.cssText = 'position:absolute;top:-6px;left:50%;transform:translateX(-50%);background:' + config.bg + ';color:' + config.color + ';padding:3px 10px;border-radius:10px;font-size:11px;font-weight:500;z-index:10;';
    
    var wordCard = document.getElementById('wordCard');
    if (wordCard) {
        wordCard.style.position = 'relative';
        wordCard.insertBefore(indicator, wordCard.firstChild);
    }
}

function nextWord() {
    currentQueueIndex++;
    
    // V6: 从即时复习队列移除已处理的词
    if (immediateReviewQueue && immediateReviewQueue.length > 0) {
        var prevWord = learningQueue[currentQueueIndex - 1];
        if (prevWord) {
            immediateReviewQueue = immediateReviewQueue.filter(function(r) {
                return r.word !== prevWord.word;
            });
        }
    }
    
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

// V7 & V9: 显示增强版本轮学习总结
function showSessionSummary() {
    var wordCard = document.getElementById('wordCard');
    var rateButtons = document.getElementById('rateButtons');
    var showMeaningBtn = document.getElementById('showMeaningBtn');
    var vocabProgress = document.getElementById('vocabProgress');
    
    if (rateButtons) rateButtons.classList.add('hidden');
    if (showMeaningBtn) showMeaningBtn.classList.add('hidden');
    
    // V9: 获取学习统计
    var stats = getSessionStats();
    var duration = stats.duration;
    var minutes = Math.floor(duration / 60);
    var seconds = duration % 60;
    var timeStr = minutes > 0 ? minutes + '分' + seconds + '秒' : seconds + '秒';
    
    // 计算各评分数量
    var againCount = stats.again || 0;
    var hardCount = stats.hard || 0;
    var goodCount = stats.good || 0;
    var easyCount = stats.easy || 0;
    var totalRatings = againCount + hardCount + goodCount + easyCount;
    
    // V7: 构建增强版总结HTML - 简化版
    var summaryHtml = '<div style="padding:16px;">';
    
    // 顶部标题
    summaryHtml += '<div style="text-align:center;margin-bottom:16px;">';
    summaryHtml += '<div style="font-size:40px;margin-bottom:8px;">✓</div>';
    summaryHtml += '<h2 style="margin:0;color:#1e1b4b;font-size:18px;font-weight:600;">学习完成</h2>';
    summaryHtml += '<p style="color:#6b7280;margin-top:4px;font-size:13px;">共 ' + sessionWords.length + ' 个单词</p>';
    summaryHtml += '</div>';
    
    // 学习统计卡片 - 简化版
    summaryHtml += '<div style="background:#f8fafc;border-radius:8px;padding:12px;margin-bottom:12px;display:flex;gap:16px;justify-content:center;">';
    summaryHtml += '<div style="text-align:center;"><div style="font-size:10px;color:#6b7280;">用时</div><div style="font-size:13px;font-weight:600;color:#1e1b4b;">' + timeStr + '</div></div>';
    summaryHtml += '<div style="text-align:center;"><div style="font-size:10px;color:#6b7280;">准确率</div><div style="font-size:13px;font-weight:600;color:' + (stats.accuracy >= 80 ? '#10b981' : stats.accuracy >= 60 ? '#f59e0b' : '#ef4444') + ';">' + stats.accuracy + '%</div></div>';
    summaryHtml += '</div>';
    
    // 评分分布
    summaryHtml += '<div style="display:flex;gap:6px;justify-content:center;margin-bottom:12px;font-size:11px;">';
    if (easyCount > 0) summaryHtml += '<span style="color:#2563eb;">简单' + easyCount + '</span>';
    if (goodCount > 0) summaryHtml += '<span style="color:#16a34a;">良好' + goodCount + '</span>';
    if (hardCount > 0) summaryHtml += '<span style="color:#ea580c;">困难' + hardCount + '</span>';
    if (againCount > 0) summaryHtml += '<span style="color:#dc2626;">重学' + againCount + '</span>';
    summaryHtml += '</div>';
    
    // 简化掌握度显示
    var masteryRate = totalRatings > 0 ? Math.round(((easyCount + goodCount) / totalRatings) * 100) : 0;
    summaryHtml += '<div style="text-align:center;margin-bottom:12px;font-size:13px;color:#374151;">';
    summaryHtml += '掌握度: <span style="font-weight:600;color:#6366f1;">' + masteryRate + '%</span>';
    summaryHtml += '</div>';
    
    // 单词列表
    summaryHtml += '<div style="max-height:280px;overflow-y:auto;">';
    
    sessionWords.forEach(function(wordData, index) {
        var rating = wordRatings[wordData.word] ? wordRatings[wordData.word].rating : 'good';
        var ratingConfig = {
            easy: { label: '简', color: '#2563eb' },
            good: { label: '良', color: '#16a34a' },
            hard: { label: '难', color: '#ea580c' },
            again: { label: '重', color: '#dc2626' },
            medium: { label: '中', color: '#92400e' }
        };
        var config = ratingConfig[rating] || ratingConfig.good;
        
        summaryHtml += '<div style="background:#f9fafb;border-radius:6px;padding:8px 12px;margin-bottom:6px;display:flex;align-items:center;justify-content:space-between;">';
        summaryHtml += '<div style="display:flex;align-items:center;gap:8px;">';
        summaryHtml += '<span style="color:#6b7280;font-size:11px;">' + (index + 1) + '</span>';
        summaryHtml += '<span style="font-size:14px;font-weight:500;color:#1e1b4b;">' + wordData.word + '</span>';
        summaryHtml += '<span style="font-size:12px;color:#6b7280;">' + (wordData.meaningCn || '').substring(0, 15) + '</span>';
        summaryHtml += '</div>';
        summaryHtml += '<span style="font-size:10px;color:' + config.color + ';">' + config.label + '</span>';
        summaryHtml += '</div>';
    });
    
    summaryHtml += '</div>';
    
    // 操作按钮 - 简化版
    summaryHtml += '<div style="display:flex;gap:10px;margin-top:16px;">';
    summaryHtml += '<button onclick="restartSession()" style="flex:1;padding:12px;background:#6366f1;color:white;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;">继续学习</button>';
    summaryHtml += '<button onclick="closeModule()" style="flex:1;padding:12px;background:#f3f4f6;color:#374151;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;">完成</button>';
    summaryHtml += '</div>';
    summaryHtml += '</div>';
    
    if (wordCard) {
        wordCard.innerHTML = summaryHtml;
    }
    
    // 重置会话统计
    sessionStats = { again: 0, hard: 0, good: 0, easy: 0, startTime: null };
    
    // 更新统计
    var statWords = document.getElementById('stat_words');
    if (statWords) statWords.textContent = learnedWords.length;
}

// V7: 获取学习建议
function getLearningAdvice(masteryRate, hardCount, againCount) {
    if (masteryRate >= 90) {
        return '继续保持';
    } else if (masteryRate >= 70) {
        return '学得不错';
    } else if (hardCount > 0 || againCount > 0) {
        return '建议复习困难单词';
    } else {
        return '多看几遍加深记忆';
    }
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
// V4.8.12: TTS语音模式配置
var ttsVoiceConfig = {
    mode: localStorage.getItem('ttsVoiceMode') || 'system-default',
    voices: {
        'us-female': { lang: 'en-US', gender: 'female', names: ['Samantha', 'Victoria', 'Joanna', 'Salli'] },
        'us-male': { lang: 'en-US', gender: 'male', names: ['Alex', 'Matthew', 'Joey'] },
        'uk-female': { lang: 'en-GB', gender: 'female', names: ['Kate', 'Serena', 'Amy', 'Emma'] },
        'uk-male': { lang: 'en-GB', gender: 'male', names: ['Daniel', 'Arthur', 'Brian'] }
    }
};

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

// V4.8.12: 切换TTS语音模式
function changeTTSVoice(mode) {
    ttsVoiceConfig.mode = mode;
    localStorage.setItem('ttsVoiceMode', mode);
    
    // 重新选择语音
    if (mode === 'system-default') {
        preferredVoice = selectBestUSVoice(cachedVoices);
    } else {
        var config = ttsVoiceConfig.voices[mode];
        if (config) {
            preferredVoice = selectVoiceByConfig(cachedVoices, config);
        }
    }
    
    showToast('已切换语音模式');
    console.log('语音模式:', mode, '使用:', preferredVoice ? preferredVoice.name : '默认');
}

// V4.8.12: 根据配置选择语音
function selectVoiceByConfig(voices, config) {
    if (!voices || voices.length === 0) return null;
    
    // 先尝试按名称匹配
    for (var i = 0; i < config.names.length; i++) {
        var voice = voices.find(function(v) {
            return v.name.includes(config.names[i]) && v.lang.startsWith(config.lang);
        });
        if (voice) return voice;
    }
    
    // 如果没找到，按语言和性别匹配
    var filtered = voices.filter(function(v) {
        return v.lang.startsWith(config.lang);
    });
    
    if (filtered.length > 0) {
        // 优先选择第一个匹配的
        return filtered[0];
    }
    
    return null;
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
window.changeTTSVoice = changeTTSVoice;
window.restartSession = restartSession;
window.showSessionSummary = showSessionSummary;
window.updateLearningProgressIndicator = updateLearningProgressIndicator;
window.updateLearningBadge = updateLearningBadge;

// ==================== V14: 科学助记交互功能 ====================

// V14.7: 记录助记效果反馈
function rateMnemonicEffectiveness(word, wasEffective) {
    var mnemonic = getWordMnemonic(word);
    var mnemonicType = mnemonic ? (mnemonic.type || 'etymology') : 'unknown';
    
    recordMnemonicEffectiveness(word, mnemonicType, wasEffective);
    
    // 显示反馈动画
    var feedbackEl = document.createElement('div');
    feedbackEl.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:' + 
        (wasEffective ? 'linear-gradient(135deg,#22c55e,#16a34a)' : 'linear-gradient(135deg,#f97316,#ea580c)') + 
        ';color:white;padding:16px 28px;border-radius:16px;font-size:18px;font-weight:700;z-index:10000;' +
        'box-shadow:0 8px 32px rgba(0,0,0,0.2);animation:mnemonicFeedback 0.5s ease-out;';
    feedbackEl.innerHTML = wasEffective ? '已记录，继续加油' : '已标记，会加强复习';
    document.body.appendChild(feedbackEl);
    
    setTimeout(function() { feedbackEl.remove(); }, 1500);
    
    // 如果需要强化，添加到即时复习队列
    if (!wasEffective && typeof immediateReviewQueue !== 'undefined') {
        var wordData = learningQueue.find(function(w) { return w.word.toLowerCase() === word.toLowerCase(); });
        if (wordData && immediateReviewQueue.indexOf(wordData) === -1) {
            immediateReviewQueue.push(wordData);
            console.log('[V14] 添加到强化复习队列:', word);
        }
    }
}

// V14.8: 显示自定义助记编辑器
function showCustomMnemonicEditor(word) {
    var existingCustom = userCustomMnemonics[word.toLowerCase()];
    var baseMnemonic = getWordMnemonic(word);
    
    var overlayEl = document.createElement('div');
    overlayEl.id = 'customMnemonicOverlay';
    overlayEl.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
    
    var editorHtml = '<div style="background:white;border-radius:20px;width:90%;max-width:440px;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3);">';
    
    // 头部
    editorHtml += '<div style="background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 50%,#6366f1 100%);padding:20px;border-radius:20px 20px 0 0;">';
    editorHtml += '<div style="display:flex;align-items:center;justify-content:space-between;">';
    editorHtml += '<div style="display:flex;align-items:center;gap:12px;">';
    editorHtml += '<span style="font-size:24px;color:#8b5cf6;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg></span>';
    editorHtml += '<div><div style="color:white;font-size:18px;font-weight:700;">创建我的记忆法</div>';
    editorHtml += '<div style="color:rgba(255,255,255,0.8);font-size:13px;">' + word + '</div></div>';
    editorHtml += '</div>';
    editorHtml += '<button onclick="closeCustomMnemonicEditor()" style="background:rgba(255,255,255,0.2);border:none;width:36px;height:36px;border-radius:12px;color:white;font-size:20px;cursor:pointer;">×</button>';
    editorHtml += '</div></div>';
    
    // 内容区
    editorHtml += '<div style="padding:20px;">';
    
    // 科学方法选择
    editorHtml += '<div style="margin-bottom:16px;">';
    editorHtml += '<label style="display:block;font-size:13px;font-weight:600;color:#4b5563;margin-bottom:8px;">🔬 选择记忆方法（基于科学研究）</label>';
    editorHtml += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;" id="mnemonicTypeGrid">';
    
    var types = Object.keys(MNEMONIC_SCIENCE.types);
    types.forEach(function(type) {
        var info = MNEMONIC_SCIENCE.types[type];
        var isSelected = existingCustom && existingCustom.type === type;
        editorHtml += '<div onclick="selectMnemonicType(\'' + type + '\')" id="typeBtn_' + type + '" style="padding:10px;background:' + (isSelected ? info.bg : '#f9fafb') + ';border:2px solid ' + (isSelected ? info.color : '#e5e7eb') + ';border-radius:10px;cursor:pointer;transition:all 0.2s;" data-type="' + type + '">';
        editorHtml += '<div style="display:flex;align-items:center;gap:8px;">';
        editorHtml += '<span style="font-size:18px;">' + info.icon + '</span>';
        editorHtml += '<div><div style="font-size:12px;font-weight:600;color:' + info.color + ';">' + info.name + '</div>';
        editorHtml += '<div style="font-size:10px;color:#9ca3af;">' + Math.round(info.effectiveness * 100) + '% 有效</div></div>';
        editorHtml += '</div></div>';
    });
    editorHtml += '</div></div>';
    
    // 助记内容输入
    editorHtml += '<div style="margin-bottom:16px;">';
    editorHtml += '<label style="display:block;font-size:13px;font-weight:600;color:#4b5563;margin-bottom:8px;">💡 我的记忆技巧</label>';
    editorHtml += '<textarea id="customMnemonicText" placeholder="输入你独特的记忆方法..." style="width:100%;height:80px;padding:12px;border:2px solid #e5e7eb;border-radius:10px;font-size:14px;resize:none;box-sizing:border-box;">' + (existingCustom ? existingCustom.mnemonic : (baseMnemonic ? baseMnemonic.mnemonic : '')) + '</textarea>';
    editorHtml += '</div>';
    
    // 视觉联想
    editorHtml += '<div style="margin-bottom:16px;">';
    editorHtml += '<label style="display:block;font-size:13px;font-weight:600;color:#4b5563;margin-bottom:8px;">🎨 视觉画面描述（双重编码）</label>';
    editorHtml += '<input id="customVisual" type="text" placeholder="描述一个生动的画面..." value="' + (existingCustom && existingCustom.visual ? existingCustom.visual : (baseMnemonic && baseMnemonic.association ? baseMnemonic.association : '')) + '" style="width:100%;padding:12px;border:2px solid #e5e7eb;border-radius:10px;font-size:14px;box-sizing:border-box;">';
    editorHtml += '</div>';
    
    // 情感锚定
    editorHtml += '<div style="margin-bottom:16px;">';
    editorHtml += '<label style="display:block;font-size:13px;font-weight:600;color:#4b5563;margin-bottom:8px;">💖 情感连接（选择一个情感）</label>';
    editorHtml += '<div style="display:flex;flex-wrap:wrap;gap:8px;" id="emotionGrid">';
    var emotions = ['joy', 'surprise', 'fear', 'love', 'curiosity', 'anger'];
    var emotionData = {
        'joy': { icon: '😊', name: '快乐' },
        'surprise': { icon: '😲', name: '惊讶' },
        'fear': { icon: '😨', name: '恐惧' },
        'love': { icon: '❤️', name: '爱' },
        'curiosity': { icon: '🤔', name: '好奇' },
        'anger': { icon: '😠', name: '愤怒' }
    };
    emotions.forEach(function(emo) {
        var data = emotionData[emo];
        var isSelected = existingCustom && existingCustom.emotional === emo;
        editorHtml += '<div onclick="selectEmotion(\'' + emo + '\')" id="emoBtn_' + emo + '" style="padding:8px 12px;background:' + (isSelected ? '#fce7f3' : '#f9fafb') + ';border:2px solid ' + (isSelected ? '#ec4899' : '#e5e7eb') + ';border-radius:8px;cursor:pointer;display:flex;align-items:center;gap:4px;">';
        editorHtml += '<span style="font-size:16px;">' + data.icon + '</span>';
        editorHtml += '<span style="font-size:12px;color:#374151;">' + data.name + '</span>';
        editorHtml += '</div>';
    });
    editorHtml += '</div></div>';
    
    // 保存按钮
    editorHtml += '<button onclick="saveCustomMnemonicFromEditor(\'' + word + '\')" style="width:100%;padding:14px;background:linear-gradient(135deg,#8b5cf6 0%,#7c3aed 100%);border:none;border-radius:12px;color:white;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(139,92,246,0.3);">💾 保存我的记忆法</button>';
    
    editorHtml += '</div></div>';
    
    overlayEl.innerHTML = editorHtml;
    document.body.appendChild(overlayEl);
    
    // 添加选择状态变量
    window._selectedMnemonicType = existingCustom ? existingCustom.type : 'etymology';
    window._selectedEmotion = existingCustom ? existingCustom.emotional : null;
}

// 选择助记类型
function selectMnemonicType(type) {
    window._selectedMnemonicType = type;
    var grid = document.getElementById('mnemonicTypeGrid');
    if (grid) {
        var buttons = grid.querySelectorAll('[data-type]');
        buttons.forEach(function(btn) {
            var btnType = btn.getAttribute('data-type');
            var info = MNEMONIC_SCIENCE.types[btnType];
            if (btnType === type) {
                btn.style.background = info.bg;
                btn.style.borderColor = info.color;
            } else {
                btn.style.background = '#f9fafb';
                btn.style.borderColor = '#e5e7eb';
            }
        });
    }
}

// 选择情感
function selectEmotion(emotion) {
    window._selectedEmotion = window._selectedEmotion === emotion ? null : emotion;
    var grid = document.getElementById('emotionGrid');
    if (grid) {
        var buttons = grid.querySelectorAll('[id^="emoBtn_"]');
        buttons.forEach(function(btn) {
            var emo = btn.id.replace('emoBtn_', '');
            if (emo === window._selectedEmotion) {
                btn.style.background = '#fce7f3';
                btn.style.borderColor = '#ec4899';
            } else {
                btn.style.background = '#f9fafb';
                btn.style.borderColor = '#e5e7eb';
            }
        });
    }
}

// 保存自定义助记
function saveCustomMnemonicFromEditor(word) {
    var text = document.getElementById('customMnemonicText').value.trim();
    var visual = document.getElementById('customVisual').value.trim();
    
    if (!text) {
        alert('请输入记忆技巧！');
        return;
    }
    
    saveCustomMnemonic(word, {
        text: text,
        type: window._selectedMnemonicType || 'etymology',
        visual: visual || null,
        emotional: window._selectedEmotion || null
    });
    
    // 如果选择了情感，也保存情感锚定
    if (window._selectedEmotion) {
        setEmotionalAnchor(word, window._selectedEmotion, 7);
    }
    
    closeCustomMnemonicEditor();
    
    // 刷新显示
    showMeaning();
    
    // 显示保存成功提示
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#22c55e,#16a34a);color:white;padding:16px 28px;border-radius:16px;font-size:18px;font-weight:700;z-index:10000;box-shadow:0 8px 32px rgba(0,0,0,0.2);';
    toast.innerHTML = '保存成功';
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 1500);
}

// 关闭自定义助记编辑器
function closeCustomMnemonicEditor() {
    var overlay = document.getElementById('customMnemonicOverlay');
    if (overlay) overlay.remove();
}

// V14.9: 显示记忆宫殿编辑器
function showMemoryPalaceEditor(word) {
    var existingPlacement = memoryPalaceData.placements ? memoryPalaceData.placements[word.toLowerCase()] : null;
    
    var overlayEl = document.createElement('div');
    overlayEl.id = 'memoryPalaceOverlay';
    overlayEl.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
    
    // 初始化位置数据
    if (!memoryPalaceData.locations) {
        memoryPalaceData.locations = [
            { id: 'home_entrance', name: '🚪 家门口', description: '推开门，第一眼看到的地方' },
            { id: 'living_room', name: '🛋️ 客厅', description: '舒适的沙发和茶几' },
            { id: 'kitchen', name: '🍳 厨房', description: '锅碗瓢盆的地方' },
            { id: 'bedroom', name: '🛏️ 卧室', description: '休息的私人空间' },
            { id: 'bathroom', name: '🚿 卫生间', description: '洗漱的地方' },
            { id: 'balcony', name: '🌿 阳台', description: '阳光充足的地方' },
            { id: 'study', name: '📚 书房', description: '学习和工作的地方' },
            { id: 'garden', name: '🌸 花园', description: '花草树木的天地' }
        ];
    }
    
    var editorHtml = '<div style="background:white;border-radius:20px;width:90%;max-width:440px;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3);">';
    
    // 头部
    editorHtml += '<div style="background:linear-gradient(135deg,#6366f1 0%,#4f46e5 50%,#4338ca 100%);padding:20px;border-radius:20px 20px 0 0;">';
    editorHtml += '<div style="display:flex;align-items:center;justify-content:space-between;">';
    editorHtml += '<div style="display:flex;align-items:center;gap:12px;">';
    editorHtml += '<span style="font-size:32px;">🏛️</span>';
    editorHtml += '<div><div style="color:white;font-size:18px;font-weight:700;">记忆宫殿</div>';
    editorHtml += '<div style="color:rgba(255,255,255,0.8);font-size:13px;">将 "' + word + '" 放置在熟悉的位置</div></div>';
    editorHtml += '</div>';
    editorHtml += '<button onclick="closeMemoryPalaceEditor()" style="background:rgba(255,255,255,0.2);border:none;width:36px;height:36px;border-radius:12px;color:white;font-size:20px;cursor:pointer;">×</button>';
    editorHtml += '</div></div>';
    
    // 科学说明
    editorHtml += '<div style="padding:16px 20px;background:#eef2ff;border-bottom:1px solid #c7d2fe;">';
    editorHtml += '<div style="font-size:12px;color:#4338ca;">💡 <strong>记忆宫殿法</strong>是世界记忆冠军使用的技术。将单词与熟悉地点结合，利用空间记忆增强词汇记忆。</div>';
    editorHtml += '</div>';
    
    // 位置选择
    editorHtml += '<div style="padding:20px;">';
    editorHtml += '<label style="display:block;font-size:13px;font-weight:600;color:#4b5563;margin-bottom:12px;">📍 选择一个位置</label>';
    editorHtml += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:16px;" id="locationGrid">';
    
    memoryPalaceData.locations.forEach(function(loc) {
        var isSelected = existingPlacement && existingPlacement.locationId === loc.id;
        editorHtml += '<div onclick="selectPalaceLocation(\'' + loc.id + '\')" id="locBtn_' + loc.id + '" style="padding:14px;background:' + (isSelected ? '#e0e7ff' : '#f9fafb') + ';border:2px solid ' + (isSelected ? '#6366f1' : '#e5e7eb') + ';border-radius:12px;cursor:pointer;transition:all 0.2s;">';
        editorHtml += '<div style="font-size:16px;margin-bottom:4px;">' + loc.name + '</div>';
        editorHtml += '<div style="font-size:11px;color:#6b7280;">' + loc.description + '</div>';
        editorHtml += '</div>';
    });
    editorHtml += '</div>';
    
    // 画面描述
    editorHtml += '<div style="margin-bottom:16px;">';
    editorHtml += '<label style="display:block;font-size:13px;font-weight:600;color:#4b5563;margin-bottom:8px;">🎨 描述你看到的画面</label>';
    editorHtml += '<textarea id="palaceImage" placeholder="想象这个单词在这个位置发生了什么有趣的事情..." style="width:100%;height:80px;padding:12px;border:2px solid #e5e7eb;border-radius:10px;font-size:14px;resize:none;box-sizing:border-box;">' + (existingPlacement ? existingPlacement.image : '') + '</textarea>';
    editorHtml += '<div style="font-size:11px;color:#9ca3af;margin-top:6px;">💡 提示：画面越夸张、越有趣，记忆越深刻！</div>';
    editorHtml += '</div>';
    
    // 保存按钮
    editorHtml += '<button onclick="saveMemoryPalacePlacement(\'' + word + '\')" style="width:100%;padding:14px;background:linear-gradient(135deg,#6366f1 0%,#4f46e5 100%);border:none;border-radius:12px;color:white;font-size:16px;font-weight:700;cursor:pointer;box-shadow:0 4px 12px rgba(99,102,241,0.3);">🏛️ 放入记忆宫殿</button>';
    
    editorHtml += '</div></div>';
    
    overlayEl.innerHTML = editorHtml;
    document.body.appendChild(overlayEl);
    
    window._selectedLocation = existingPlacement ? existingPlacement.locationId : null;
}

// 选择宫殿位置
function selectPalaceLocation(locId) {
    window._selectedLocation = locId;
    var grid = document.getElementById('locationGrid');
    if (grid) {
        var buttons = grid.querySelectorAll('[id^="locBtn_"]');
        buttons.forEach(function(btn) {
            var id = btn.id.replace('locBtn_', '');
            if (id === locId) {
                btn.style.background = '#e0e7ff';
                btn.style.borderColor = '#6366f1';
            } else {
                btn.style.background = '#f9fafb';
                btn.style.borderColor = '#e5e7eb';
            }
        });
    }
}

// 保存记忆宫殿位置
function saveMemoryPalacePlacement(word) {
    var imageDesc = document.getElementById('palaceImage').value.trim();
    
    if (!window._selectedLocation) {
        alert('请选择一个位置！');
        return;
    }
    if (!imageDesc) {
        alert('请描述这个画面！');
        return;
    }
    
    addToMemoryPalace(word, window._selectedLocation, imageDesc);
    
    closeMemoryPalaceEditor();
    showMeaning();
    
    var toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#6366f1,#4f46e5);color:white;padding:16px 28px;border-radius:16px;font-size:18px;font-weight:700;z-index:10000;box-shadow:0 8px 32px rgba(0,0,0,0.2);';
    toast.innerHTML = '🏛️ 已放入记忆宫殿！';
    document.body.appendChild(toast);
    setTimeout(function() { toast.remove(); }, 1500);
}

// 关闭记忆宫殿编辑器
function closeMemoryPalaceEditor() {
    var overlay = document.getElementById('memoryPalaceOverlay');
    if (overlay) overlay.remove();
}

// V14.10: 添加助记动画样式
(function addMnemonicAnimationStyles() {
    if (document.getElementById('mnemonicAnimStyles')) return;
    var style = document.createElement('style');
    style.id = 'mnemonicAnimStyles';
    style.textContent = `
        @keyframes mnemonicFeedback {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.05); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        
        .word-mnemonic-v14 {
            animation: mnemonicSlideIn 0.4s ease-out;
        }
        
        @keyframes mnemonicSlideIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        #customMnemonicOverlay, #memoryPalaceOverlay {
            animation: overlayFadeIn 0.3s ease-out;
        }
        
        @keyframes overlayFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        #customMnemonicOverlay > div, #memoryPalaceOverlay > div {
            animation: modalSlideUp 0.3s ease-out;
        }
        
        @keyframes modalSlideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
})();

// 导出新功能
window.rateMnemonicEffectiveness = rateMnemonicEffectiveness;
window.showCustomMnemonicEditor = showCustomMnemonicEditor;
window.selectMnemonicType = selectMnemonicType;
window.selectEmotion = selectEmotion;
window.saveCustomMnemonicFromEditor = saveCustomMnemonicFromEditor;
window.closeCustomMnemonicEditor = closeCustomMnemonicEditor;
window.showMemoryPalaceEditor = showMemoryPalaceEditor;
window.selectPalaceLocation = selectPalaceLocation;
window.saveMemoryPalacePlacement = saveMemoryPalacePlacement;
window.closeMemoryPalaceEditor = closeMemoryPalaceEditor;

// ==================== V14.7-10: 高级科学记忆功能 ====================

// V14.7: 间隔强化机制 - 根据遗忘曲线优化复习时机
var spacedReinforcementData = {};
try {
    spacedReinforcementData = JSON.parse(localStorage.getItem('spacedReinforcement') || '{}');
} catch(e) {
    spacedReinforcementData = {};
}

function calculateOptimalReviewTime(word) {
    var data = spacedReinforcementData[word.toLowerCase()];
    if (!data) {
        return { nextReview: Date.now(), interval: 1 }; // 新词，立即复习
    }
    
    // 基于SM-2算法变体
    var lastReview = data.lastReview || Date.now();
    var easeFactor = data.easeFactor || 2.5;
    var interval = data.interval || 1;
    var reviews = data.reviews || 0;
    
    // 计算下次复习时间（小时）
    var nextIntervalHours = interval * easeFactor * (1 + reviews * 0.1);
    var nextReviewTime = lastReview + nextIntervalHours * 60 * 60 * 1000;
    
    return {
        nextReview: nextReviewTime,
        interval: nextIntervalHours,
        isOverdue: Date.now() > nextReviewTime,
        urgency: Math.max(0, (Date.now() - nextReviewTime) / (24 * 60 * 60 * 1000)) // 逾期天数
    };
}

function updateSpacedReinforcement(word, quality) {
    // quality: 0-5 (0=完全忘记, 5=完美记忆)
    var lowerWord = word.toLowerCase();
    var data = spacedReinforcementData[lowerWord] || {
        easeFactor: 2.5,
        interval: 1,
        reviews: 0,
        lastReview: null
    };
    
    // 更新易度因子
    data.easeFactor = Math.max(1.3, data.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    
    // 更新间隔
    if (quality >= 3) {
        if (data.reviews === 0) {
            data.interval = 1;
        } else if (data.reviews === 1) {
            data.interval = 6;
        } else {
            data.interval = data.interval * data.easeFactor;
        }
        data.reviews++;
    } else {
        data.reviews = 0;
        data.interval = 1;
    }
    
    data.lastReview = Date.now();
    spacedReinforcementData[lowerWord] = data;
    localStorage.setItem('spacedReinforcement', JSON.stringify(spacedReinforcementData));
    
    return data;
}

// V14.8: 分块记忆优化 - 自动检测词根词缀分组
function autoDetectChunkingPattern(word) {
    var patterns = {
        prefixes: {
            'un': '否定/相反',
            're': '再次/返回',
            'pre': '预先/之前',
            'dis': '否定/分离',
            'mis': '错误',
            'sub': '在下/次级',
            'super': '超级/上方',
            'inter': '相互/之间',
            'trans': '跨越/转变',
            'anti': '反对',
            'auto': '自动',
            'bi': '双',
            'co': '共同',
            'de': '向下/去除',
            'ex': '向外/前任',
            'in': '在内/否定',
            'im': '在内/否定',
            'non': '非',
            'over': '过度/在上',
            'post': '之后',
            'pro': '向前/支持',
            'semi': '半',
            'under': '不足/在下'
        },
        suffixes: {
            'tion': '名词(动作/状态)',
            'sion': '名词(动作/状态)',
            'ment': '名词(结果/状态)',
            'ness': '名词(性质)',
            'ity': '名词(性质)',
            'able': '形容词(能够)',
            'ible': '形容词(能够)',
            'ful': '形容词(充满)',
            'less': '形容词(缺乏)',
            'ous': '形容词(具有)',
            'ive': '形容词(倾向)',
            'al': '形容词/名词',
            'ly': '副词',
            'ize': '动词(使成为)',
            'ify': '动词(使成为)',
            'er': '名词(人/物)',
            'or': '名词(人/物)',
            'ist': '名词(从事者)',
            'ism': '名词(主义/行为)'
        }
    };
    
    var detected = {
        prefix: null,
        suffix: null,
        root: word
    };
    
    // 检测前缀
    for (var pre in patterns.prefixes) {
        if (word.toLowerCase().startsWith(pre) && word.length > pre.length + 2) {
            detected.prefix = { text: pre, meaning: patterns.prefixes[pre] };
            detected.root = word.slice(pre.length);
            break;
        }
    }
    
    // 检测后缀
    for (var suf in patterns.suffixes) {
        if (word.toLowerCase().endsWith(suf) && word.length > suf.length + 2) {
            detected.suffix = { text: suf, meaning: patterns.suffixes[suf] };
            if (!detected.prefix) {
                detected.root = word.slice(0, -suf.length);
            } else {
                detected.root = detected.root.slice(0, -suf.length);
            }
            break;
        }
    }
    
    return detected;
}

// 查找相似词根的单词（用于分组记忆）
function findSimilarRootWords(word) {
    var pattern = autoDetectChunkingPattern(word);
    if (!pattern.root || pattern.root.length < 3) return [];
    
    var similar = [];
    var root = pattern.root.toLowerCase();
    
    // 从学习队列中查找
    if (typeof learningQueue !== 'undefined' && learningQueue.length > 0) {
        learningQueue.forEach(function(w) {
            if (w.word.toLowerCase() !== word.toLowerCase()) {
                var otherPattern = autoDetectChunkingPattern(w.word);
                if (otherPattern.root && otherPattern.root.toLowerCase().includes(root.slice(0, 3))) {
                    similar.push(w.word);
                }
            }
        });
    }
    
    return similar.slice(0, 5);
}

// V14.9: 交互式记忆练习
function startMnemonicPractice(word) {
    var mnemonic = getWordMnemonic(word);
    var enhanced = getEnhancedMnemonic(word);
    
    var overlayEl = document.createElement('div');
    overlayEl.id = 'mnemonicPracticeOverlay';
    overlayEl.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px);';
    
    var practiceHtml = '<div style="background:white;border-radius:24px;width:90%;max-width:400px;overflow:hidden;box-shadow:0 25px 80px rgba(0,0,0,0.4);">';
    
    // 头部
    practiceHtml += '<div style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);padding:24px;text-align:center;">';
    practiceHtml += '<div style="font-size:40px;margin-bottom:8px;">🧠</div>';
    practiceHtml += '<div style="color:white;font-size:20px;font-weight:700;">记忆测验</div>';
    practiceHtml += '<div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px;">测试你的记忆效果</div>';
    practiceHtml += '</div>';
    
    // 练习内容
    practiceHtml += '<div style="padding:24px;">';
    
    // 第一步：显示单词，隐藏释义
    practiceHtml += '<div id="practiceStep1">';
    practiceHtml += '<div style="text-align:center;margin-bottom:20px;">';
    practiceHtml += '<div style="font-size:32px;font-weight:700;color:#1e1b4b;margin-bottom:8px;">' + word + '</div>';
    practiceHtml += '<div style="font-size:14px;color:#6b7280;">尝试回忆这个单词的意思</div>';
    practiceHtml += '</div>';
    
    // 提示按钮
    practiceHtml += '<div style="display:flex;gap:12px;margin-bottom:16px;">';
    practiceHtml += '<button onclick="showPracticeHint(1)" style="flex:1;padding:12px;background:#f3f4f6;border:2px solid #e5e7eb;border-radius:12px;font-size:13px;cursor:pointer;">💡 助记提示</button>';
    practiceHtml += '<button onclick="showPracticeHint(2)" style="flex:1;padding:12px;background:#f3f4f6;border:2px solid #e5e7eb;border-radius:12px;font-size:13px;cursor:pointer;">📚 词根提示</button>';
    practiceHtml += '</div>';
    
    // 提示显示区
    practiceHtml += '<div id="practiceHintArea" style="display:none;padding:16px;background:#fef3c7;border-radius:12px;margin-bottom:16px;"></div>';
    
    // 显示答案按钮
    practiceHtml += '<button onclick="showPracticeAnswer()" style="width:100%;padding:14px;background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);border:none;border-radius:12px;color:white;font-size:16px;font-weight:600;cursor:pointer;">👀 显示答案</button>';
    practiceHtml += '</div>';
    
    // 第二步：评估记忆（初始隐藏）
    practiceHtml += '<div id="practiceStep2" style="display:none;">';
    practiceHtml += '<div style="text-align:center;margin-bottom:20px;">';
    practiceHtml += '<div style="font-size:28px;font-weight:700;color:#1e1b4b;margin-bottom:12px;">' + word + '</div>';
    var wordData = learningQueue ? learningQueue.find(function(w) { return w.word.toLowerCase() === word.toLowerCase(); }) : null;
    practiceHtml += '<div style="font-size:18px;color:#059669;font-weight:600;">' + (wordData ? wordData.meaningCn : '暂无释义') + '</div>';
    practiceHtml += '</div>';
    
    // 记忆评估按钮
    practiceHtml += '<div style="font-size:14px;color:#6b7280;text-align:center;margin-bottom:12px;">你记住了吗？</div>';
    practiceHtml += '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">';
    practiceHtml += '<button onclick="ratePracticeResult(\'' + word + '\', 1)" style="padding:16px 8px;background:#fee2e2;border:2px solid #fecaca;border-radius:12px;cursor:pointer;"><div style="font-size:24px;">😫</div><div style="font-size:12px;color:#991b1b;font-weight:600;">忘记了</div></button>';
    practiceHtml += '<button onclick="ratePracticeResult(\'' + word + '\', 3)" style="padding:16px 8px;background:#fef3c7;border:2px solid #fde68a;border-radius:12px;cursor:pointer;"><div style="font-size:24px;">🤔</div><div style="font-size:12px;color:#92400e;font-weight:600;">有点印象</div></button>';
    practiceHtml += '<button onclick="ratePracticeResult(\'' + word + '\', 5)" style="padding:16px 8px;background:#dcfce7;border:2px solid #bbf7d0;border-radius:12px;cursor:pointer;"><div style="font-size:24px;">😊</div><div style="font-size:12px;color:#166534;font-weight:600;">完全记住</div></button>';
    practiceHtml += '</div>';
    practiceHtml += '</div>';
    
    practiceHtml += '</div>';
    
    // 关闭按钮
    practiceHtml += '<div style="padding:16px 24px 24px;text-align:center;">';
    practiceHtml += '<button onclick="closeMnemonicPractice()" style="padding:10px 24px;background:#f3f4f6;border:none;border-radius:8px;color:#6b7280;font-size:14px;cursor:pointer;">关闭练习</button>';
    practiceHtml += '</div>';
    
    practiceHtml += '</div>';
    
    overlayEl.innerHTML = practiceHtml;
    document.body.appendChild(overlayEl);
    
    // 保存当前单词信息供提示使用
    window._practiceWord = word;
    window._practiceMnemonic = mnemonic;
    window._practiceEnhanced = enhanced;
}

function showPracticeHint(hintType) {
    var hintArea = document.getElementById('practiceHintArea');
    if (!hintArea) return;
    
    var hintContent = '';
    if (hintType === 1 && window._practiceMnemonic) {
        hintContent = '💡 <strong>助记:</strong> ' + window._practiceMnemonic.mnemonic;
    } else if (hintType === 2 && window._practiceMnemonic && window._practiceMnemonic.roots) {
        hintContent = '📚 <strong>词根:</strong> ' + window._practiceMnemonic.roots;
    } else {
        var pattern = autoDetectChunkingPattern(window._practiceWord);
        if (pattern.prefix) {
            hintContent = '📚 <strong>前缀:</strong> ' + pattern.prefix.text + ' (' + pattern.prefix.meaning + ')';
        } else if (pattern.suffix) {
            hintContent = '📚 <strong>后缀:</strong> ' + pattern.suffix.text + ' (' + pattern.suffix.meaning + ')';
        } else {
            hintContent = '💡 没有额外提示，试着回忆一下吧！';
        }
    }
    
    hintArea.innerHTML = '<div style="font-size:14px;color:#92400e;">' + hintContent + '</div>';
    hintArea.style.display = 'block';
}

function showPracticeAnswer() {
    document.getElementById('practiceStep1').style.display = 'none';
    document.getElementById('practiceStep2').style.display = 'block';
}

function ratePracticeResult(word, quality) {
    // 更新间隔强化数据
    updateSpacedReinforcement(word, quality);
    
    // 更新助记效果
    recordMnemonicEffectiveness(word, window._practiceMnemonic ? window._practiceMnemonic.type : 'unknown', quality >= 3);
    
    closeMnemonicPractice();
    
    // 显示结果反馈
    var feedback = document.createElement('div');
    var feedbackText = quality >= 4 ? '太棒了' : quality >= 3 ? '继续加油' : '多复习几次';
    feedback.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:linear-gradient(135deg,#8b5cf6,#7c3aed);color:white;padding:20px 32px;border-radius:16px;font-size:20px;font-weight:700;z-index:10000;box-shadow:0 8px 32px rgba(0,0,0,0.3);';
    feedback.innerHTML = feedbackText;
    document.body.appendChild(feedback);
    setTimeout(function() { feedback.remove(); }, 1500);
}

function closeMnemonicPractice() {
    var overlay = document.getElementById('mnemonicPracticeOverlay');
    if (overlay) overlay.remove();
}

// V14.10: 记忆效果追踪面板
function showMnemonicStats() {
    var stats = calculateMnemonicStats();
    
    var overlayEl = document.createElement('div');
    overlayEl.id = 'mnemonicStatsOverlay';
    overlayEl.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);';
    
    var statsHtml = '<div style="background:white;border-radius:24px;width:90%;max-width:480px;max-height:85vh;overflow-y:auto;box-shadow:0 25px 80px rgba(0,0,0,0.4);">';
    
    // 头部
    statsHtml += '<div style="background:linear-gradient(135deg,#8b5cf6 0%,#6366f1 50%,#3b82f6 100%);padding:24px;border-radius:24px 24px 0 0;">';
    statsHtml += '<div style="display:flex;align-items:center;justify-content:space-between;">';
    statsHtml += '<div style="display:flex;align-items:center;gap:14px;">';
    statsHtml += '<span style="font-size:28px;color:#8b5cf6;"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg></span>';
    statsHtml += '<div><div style="color:white;font-size:20px;font-weight:700;">记忆效果统计</div>';
    statsHtml += '<div style="color:rgba(255,255,255,0.8);font-size:13px;">科学追踪你的学习进展</div></div>';
    statsHtml += '</div>';
    statsHtml += '<button onclick="closeMnemonicStats()" style="background:rgba(255,255,255,0.2);border:none;width:40px;height:40px;border-radius:14px;color:white;font-size:22px;cursor:pointer;">×</button>';
    statsHtml += '</div></div>';
    
    // 总体统计
    statsHtml += '<div style="padding:20px;">';
    
    // 核心指标卡片
    statsHtml += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:20px;">';
    
    statsHtml += '<div style="background:linear-gradient(135deg,#dcfce7,#bbf7d0);padding:16px;border-radius:16px;text-align:center;">';
    statsHtml += '<div style="font-size:28px;font-weight:700;color:#166534;">' + stats.totalWords + '</div>';
    statsHtml += '<div style="font-size:12px;color:#15803d;font-weight:600;">已记忆单词</div>';
    statsHtml += '</div>';
    
    statsHtml += '<div style="background:linear-gradient(135deg,#dbeafe,#bfdbfe);padding:16px;border-radius:16px;text-align:center;">';
    statsHtml += '<div style="font-size:28px;font-weight:700;color:#1e40af;">' + Math.round(stats.avgEffectiveness * 100) + '%</div>';
    statsHtml += '<div style="font-size:12px;color:#1d4ed8;font-weight:600;">平均记忆效果</div>';
    statsHtml += '</div>';
    
    statsHtml += '<div style="background:linear-gradient(135deg,#fef3c7,#fde68a);padding:16px;border-radius:16px;text-align:center;">';
    statsHtml += '<div style="font-size:28px;font-weight:700;color:#92400e;">' + stats.customMnemonics + '</div>';
    statsHtml += '<div style="font-size:12px;color:#b45309;font-weight:600;">自定义记忆法</div>';
    statsHtml += '</div>';
    
    statsHtml += '<div style="background:linear-gradient(135deg,#ede9fe,#ddd6fe);padding:16px;border-radius:16px;text-align:center;">';
    statsHtml += '<div style="font-size:28px;font-weight:700;color:#5b21b6;">' + stats.palacePlacements + '</div>';
    statsHtml += '<div style="font-size:12px;color:#6d28d9;font-weight:600;">记忆宫殿位置</div>';
    statsHtml += '</div>';
    
    statsHtml += '</div>';
    
    // 各类型效果分析
    statsHtml += '<div style="margin-bottom:20px;">';
    statsHtml += '<div style="font-size:13px;font-weight:600;color:#1f2937;margin-bottom:10px;">各记忆法效果</div>';
    
    if (stats.typeStats && Object.keys(stats.typeStats).length > 0) {
        Object.keys(stats.typeStats).forEach(function(type) {
            var typeStat = stats.typeStats[type];
            var typeInfo = MNEMONIC_SCIENCE.types[type] || { icon: '📝', name: type, color: '#6b7280' };
            var effectiveness = typeStat.total > 0 ? Math.round((typeStat.success / typeStat.total) * 100) : 0;
            var barColor = effectiveness >= 80 ? '#22c55e' : effectiveness >= 50 ? '#f59e0b' : '#ef4444';
            
            statsHtml += '<div style="display:flex;align-items:center;gap:12px;padding:10px;background:#f9fafb;border-radius:10px;margin-bottom:8px;">';
            statsHtml += '<span style="font-size:20px;">' + typeInfo.icon + '</span>';
            statsHtml += '<div style="flex:1;">';
            statsHtml += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">';
            statsHtml += '<span style="font-size:13px;font-weight:600;color:' + typeInfo.color + ';">' + typeInfo.name + '</span>';
            statsHtml += '<span style="font-size:12px;color:#6b7280;">' + typeStat.total + '次使用</span>';
            statsHtml += '</div>';
            statsHtml += '<div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;">';
            statsHtml += '<div style="height:100%;width:' + effectiveness + '%;background:' + barColor + ';border-radius:3px;"></div>';
            statsHtml += '</div>';
            statsHtml += '</div>';
            statsHtml += '<span style="font-size:14px;font-weight:700;color:' + barColor + ';min-width:45px;text-align:right;">' + effectiveness + '%</span>';
            statsHtml += '</div>';
        });
    } else {
        statsHtml += '<div style="text-align:center;padding:20px;color:#9ca3af;">暂无数据，继续学习积累吧！</div>';
    }
    
    statsHtml += '</div>';
    
    // 科学建议
    statsHtml += '<div style="background:linear-gradient(135deg,#f0f9ff,#e0f2fe);padding:16px;border-radius:14px;margin-bottom:16px;">';
    statsHtml += '<div style="display:flex;align-items:flex-start;gap:10px;">';
    statsHtml += '<span style="font-size:20px;">💡</span>';
    statsHtml += '<div><div style="font-size:13px;font-weight:600;color:#0369a1;margin-bottom:6px;">科学建议</div>';
    statsHtml += '<div style="font-size:12px;color:#0c4a6e;line-height:1.6;">' + generateScientificAdvice(stats) + '</div></div>';
    statsHtml += '</div></div>';
    
    // 快速练习按钮
    if (stats.overdueWords > 0) {
        statsHtml += '<button onclick="startOverduePractice();closeMnemonicStats();" style="width:100%;padding:14px;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;border-radius:12px;color:white;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:12px;box-shadow:0 4px 12px rgba(245,158,11,0.3);">⚡ ' + stats.overdueWords + '个单词需要复习</button>';
    }
    
    statsHtml += '</div></div>';
    
    overlayEl.innerHTML = statsHtml;
    document.body.appendChild(overlayEl);
}

function calculateMnemonicStats() {
    var stats = {
        totalWords: Object.keys(mnemonicEffectivenessData).filter(function(k) { return k !== '_typeStats'; }).length,
        avgEffectiveness: 0,
        customMnemonics: Object.keys(userCustomMnemonics).length,
        palacePlacements: memoryPalaceData.placements ? Object.keys(memoryPalaceData.placements).length : 0,
        emotionalAnchors: Object.keys(emotionalAnchorData).length,
        typeStats: mnemonicEffectivenessData._typeStats || {},
        overdueWords: 0
    };
    
    // 计算平均效果
    var totalEff = 0;
    var effCount = 0;
    Object.keys(mnemonicEffectivenessData).forEach(function(word) {
        if (word !== '_typeStats' && mnemonicEffectivenessData[word].effectiveness) {
            totalEff += mnemonicEffectivenessData[word].effectiveness;
            effCount++;
        }
    });
    stats.avgEffectiveness = effCount > 0 ? totalEff / effCount : 0;
    
    // 计算逾期复习单词
    Object.keys(spacedReinforcementData).forEach(function(word) {
        var review = calculateOptimalReviewTime(word);
        if (review.isOverdue) stats.overdueWords++;
    });
    
    return stats;
}

function generateScientificAdvice(stats) {
    var advice = [];
    
    if (stats.avgEffectiveness < 0.5) {
        advice.push('尝试使用更多视觉联想和情感锚定来增强记忆效果。');
    }
    if (stats.customMnemonics < 5) {
        advice.push('创建个性化记忆法能提升20-30%的记忆效果。');
    }
    if (stats.palacePlacements < 3) {
        advice.push('记忆宫殿法是世界记忆冠军常用技术，效果显著。');
    }
    if (stats.overdueWords > 5) {
        advice.push('有' + stats.overdueWords + '个单词即将遗忘，建议立即复习！');
    }
    
    if (advice.length === 0) {
        advice.push('继续保持！你的学习方法很科学，记忆效果良好。');
    }
    
    return advice.join(' ');
}

function startOverduePractice() {
    var overdueWords = [];
    Object.keys(spacedReinforcementData).forEach(function(word) {
        var review = calculateOptimalReviewTime(word);
        if (review.isOverdue) {
            overdueWords.push({ word: word, urgency: review.urgency });
        }
    });
    
    // 按紧急程度排序
    overdueWords.sort(function(a, b) { return b.urgency - a.urgency; });
    
    if (overdueWords.length > 0) {
        startMnemonicPractice(overdueWords[0].word);
    }
}

function closeMnemonicStats() {
    var overlay = document.getElementById('mnemonicStatsOverlay');
    if (overlay) overlay.remove();
}

// 导出V14.7-10功能
window.startMnemonicPractice = startMnemonicPractice;
window.showPracticeHint = showPracticeHint;
window.showPracticeAnswer = showPracticeAnswer;
window.ratePracticeResult = ratePracticeResult;
window.closeMnemonicPractice = closeMnemonicPractice;
window.showMnemonicStats = showMnemonicStats;
window.closeMnemonicStats = closeMnemonicStats;
window.startOverduePractice = startOverduePractice;

// ==================== V9: 键盘快捷键支持 ====================
document.addEventListener('keydown', function(e) {
    // 只在词汇模块可见时响应
    var vocabModal = document.getElementById('vocabularyModal');
    if (!vocabModal || !vocabModal.classList.contains('active')) return;
    
    // 忽略输入框中的键盘事件
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    var key = e.key.toLowerCase();
    var rateButtons = document.getElementById('rateButtons');
    var isRatingVisible = rateButtons && !rateButtons.classList.contains('hidden');
    
    switch(key) {
        case ' ': // 空格键
        case 'enter':
            e.preventDefault();
            if (isRatingVisible) {
                // 评分可见时，空格进入下一个（相当于良好）
                rateWord('good');
            } else {
                // 评分不可见时，显示释义
                showMeaning();
            }
            break;
            
        case '1':
            if (isRatingVisible) {
                e.preventDefault();
                rateWord('again');
            }
            break;
            
        case '2':
            if (isRatingVisible) {
                e.preventDefault();
                rateWord('hard');
            }
            break;
            
        case '3':
            if (isRatingVisible) {
                e.preventDefault();
                rateWord('good');
            }
            break;
            
        case '4':
            if (isRatingVisible) {
                e.preventDefault();
                rateWord('easy');
            }
            break;
            
        case 's':
            e.preventDefault();
            speakWord();
            break;
            
        case 'escape':
            closeModule();
            break;
            
        case '?':
        case 'h':
            // 切换键盘提示显示
            var hints = document.getElementById('keyboardHints');
            if (hints) {
                hints.classList.toggle('hidden');
            }
            break;
    }
});

// V8: 导出统计功能
window.toggleVocabStats = toggleVocabStats;
window.updateVocabStats = updateVocabStats;
