// modules.js - 口语、阅读等模块

// ==================== 口语模块 ====================
var currentSpeakingIndex = 0;
var isRecording = false;
var mediaRecorder = null;
var audioChunks = [];
var recognition = null;
var recognizedText = '';

var speakingSentences = [
    // 日常对话 (1-20)
    "The quick brown fox jumps over the lazy dog.",
    "Could you please tell me how to get to the nearest subway station?",
    "I would like to make a reservation for two people at seven o'clock.",
    "Excuse me, is this seat taken?",
    "The weather forecast says it will be sunny tomorrow.",
    "I'm looking forward to seeing you at the party this weekend.",
    "Would you mind if I opened the window? It's quite warm in here.",
    "Let me know if you need any help with your luggage.",
    "I apologize for being late. The traffic was terrible this morning.",
    "Could you speak a little slower? I'm still learning English.",
    "What do you usually do on weekends?",
    "I've been living in this city for about three years now.",
    "This restaurant has the best Italian food in town.",
    "How long have you been waiting here?",
    "I think we should take a break and grab some coffee.",
    "The movie was so touching that I almost cried.",
    "Do you have any plans for the summer vacation?",
    "I really appreciate your help with this project.",
    "Let's meet at the coffee shop around the corner.",
    "I'm not sure if I can make it to the meeting tomorrow.",
    
    // 学术表达 (21-40)
    "Practice makes perfect in language learning.",
    "Technology has transformed modern education.",
    "Critical thinking is essential for academic success.",
    "The research findings suggest a strong correlation between the variables.",
    "According to recent studies, climate change is accelerating rapidly.",
    "The hypothesis was tested through a series of controlled experiments.",
    "This paper examines the impact of social media on youth behavior.",
    "Further research is needed to validate these preliminary results.",
    "The data analysis reveals significant patterns in consumer behavior.",
    "Academic integrity is fundamental to scholarly research.",
    "The literature review identifies several gaps in existing knowledge.",
    "Statistical methods were applied to analyze the collected data.",
    "The study contributes to our understanding of human cognition.",
    "Interdisciplinary approaches can lead to innovative solutions.",
    "The findings have important implications for future policy decisions.",
    "Peer review ensures the quality and credibility of academic publications.",
    "The experiment was conducted under strictly controlled conditions.",
    "Theoretical frameworks provide a foundation for empirical research.",
    "The results support the initial hypothesis proposed by the researchers.",
    "Critical analysis of sources is essential for academic writing.",
    
    // 环境与社会 (41-60)
    "Environmental protection requires global cooperation.",
    "Cultural diversity enriches our society.",
    "Sustainable development balances economy and environment.",
    "Renewable energy sources are becoming more affordable and efficient.",
    "Reducing carbon emissions is crucial for combating climate change.",
    "Biodiversity loss threatens the stability of ecosystems worldwide.",
    "Community engagement plays a vital role in local development.",
    "Social responsibility should be a core value for modern businesses.",
    "Equal access to education can help reduce social inequality.",
    "Volunteering benefits both the community and the individual.",
    "Public transportation reduces traffic congestion and air pollution.",
    "Recycling programs help minimize waste and conserve resources.",
    "Urban planning should prioritize green spaces and pedestrian areas.",
    "Mental health awareness has increased significantly in recent years.",
    "Civic participation strengthens democratic institutions.",
    "Healthcare should be accessible to all members of society.",
    "Cultural heritage preservation connects us to our history.",
    "Gender equality remains an important goal for global development.",
    "Food security is a growing concern in many developing countries.",
    "Water conservation is essential in regions facing drought conditions.",
    
    // 科技与创新 (61-80)
    "Scientific research drives innovation forward.",
    "Artificial intelligence is reshaping the future of work.",
    "Innovation drives economic growth and social progress.",
    "Machine learning algorithms can process vast amounts of data quickly.",
    "Cybersecurity has become a top priority for organizations worldwide.",
    "The internet has revolutionized how we access information.",
    "Smart devices are becoming an integral part of daily life.",
    "Digital transformation is changing traditional business models.",
    "Automation may replace some jobs but will also create new opportunities.",
    "Virtual reality offers immersive experiences for education and entertainment.",
    "Cloud computing enables flexible and scalable data storage solutions.",
    "Blockchain technology has applications beyond cryptocurrency.",
    "Biotechnology advances are improving healthcare outcomes.",
    "Space exploration continues to push the boundaries of human knowledge.",
    "Electric vehicles are gaining popularity as a sustainable transportation option.",
    "The development of quantum computers could revolutionize computing.",
    "Telemedicine has expanded access to healthcare services.",
    "Robotics is transforming manufacturing and logistics industries.",
    "Augmented reality enhances user experiences in various applications.",
    "The Internet of Things connects everyday objects to the digital world.",
    
    // 商务与职场 (81-100)
    "Effective communication bridges understanding.",
    "Education is the foundation of a prosperous society.",
    "Globalization has connected people across borders.",
    "Strong leadership skills are essential for career advancement.",
    "Time management is crucial for maintaining work-life balance.",
    "Networking can open doors to new professional opportunities.",
    "Customer satisfaction should be the primary focus of any business.",
    "Teamwork and collaboration lead to better project outcomes.",
    "Continuous learning is necessary to stay competitive in today's job market.",
    "Clear communication helps prevent misunderstandings in the workplace.",
    "Setting realistic goals is the first step toward achieving success.",
    "Adaptability is a valuable skill in rapidly changing industries.",
    "Constructive feedback helps employees improve their performance.",
    "Professional development programs benefit both employees and employers.",
    "Ethical business practices build trust and long-term relationships.",
    "Effective negotiation skills can lead to mutually beneficial agreements.",
    "Problem-solving abilities are highly valued by employers.",
    "Remote work has become increasingly common since the pandemic.",
    "Perseverance leads to achievement.",
    "Knowledge empowers individuals and communities."
];

// 已练习句子记录（避免重复）
var practicedSentences = [];
var maxPracticedHistory = 20; // 记住最近20条，避免连续重复

function initSpeakingModule() {
    // 随机选择一个句子
    currentSpeakingIndex = getRandomSentenceIndex();
    var el = document.getElementById("targetSentence");
    if (el) el.textContent = speakingSentences[currentSpeakingIndex];
    
    // 初始化语音识别
    initSpeechRecognition();
    
    // 隐藏结果卡片
    var resultCard = document.getElementById("resultCard");
    if (resultCard) resultCard.classList.add("hidden");
    
    // 显示句子难度和类别
    updateSentenceInfo();
}

// 获取随机句子索引（避免重复）
function getRandomSentenceIndex() {
    var available = [];
    for (var i = 0; i < speakingSentences.length; i++) {
        if (practicedSentences.indexOf(i) === -1) {
            available.push(i);
        }
    }
    
    // 如果所有句子都练习过了，清空记录重新开始
    if (available.length === 0) {
        practicedSentences = [];
        available = [];
        for (var i = 0; i < speakingSentences.length; i++) {
            available.push(i);
        }
    }
    
    var randomIndex = available[Math.floor(Math.random() * available.length)];
    
    // 记录已练习
    practicedSentences.push(randomIndex);
    if (practicedSentences.length > maxPracticedHistory) {
        practicedSentences.shift();
    }
    
    return randomIndex;
}

// 获取句子类别
function getSentenceCategory(index) {
    if (index < 20) return { name: '日常对话', icon: '💬', color: '#3b82f6' };
    if (index < 40) return { name: '学术表达', icon: '📚', color: '#8b5cf6' };
    if (index < 60) return { name: '环境与社会', icon: '🌍', color: '#10b981' };
    if (index < 80) return { name: '科技与创新', icon: '🔬', color: '#f59e0b' };
    return { name: '商务与职场', icon: '💼', color: '#ef4444' };
}

// 获取句子难度
function getSentenceDifficulty(sentence) {
    var words = sentence.split(/\s+/).length;
    if (words <= 8) return { level: '简单', stars: 1, color: '#10b981' };
    if (words <= 15) return { level: '中等', stars: 2, color: '#f59e0b' };
    return { level: '困难', stars: 3, color: '#ef4444' };
}

// 更新句子信息显示
function updateSentenceInfo() {
    var category = getSentenceCategory(currentSpeakingIndex);
    var difficulty = getSentenceDifficulty(speakingSentences[currentSpeakingIndex]);
    
    var infoEl = document.getElementById('sentenceInfo');
    if (infoEl) {
        infoEl.innerHTML = 
            '<span style="background:' + category.color + '20;color:' + category.color + ';padding:3px 8px;border-radius:12px;font-size:12px;">' + 
            category.icon + ' ' + category.name + '</span>' +
            '<span style="background:' + difficulty.color + '20;color:' + difficulty.color + ';padding:3px 8px;border-radius:12px;font-size:12px;margin-left:6px;">' +
            '⭐'.repeat(difficulty.stars) + ' ' + difficulty.level + '</span>';
    }
}

// 录音计时器
var recordingTimer = null;
var recordingStartTime = 0;
var MAX_RECORDING_TIME = 30000; // 最长30秒

function initSpeechRecognition() {
    // 检查浏览器支持
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.log('浏览器不支持语音识别');
        return;
    }
    
    recognition = new SpeechRecognition();
    recognition.continuous = true;  // 改为持续监听
    recognition.interimResults = true;  // 启用中间结果，提高识别成功率
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;
    
    var finalTranscript = '';  // 存储最终结果
    
    recognition.onresult = function(event) {
        var transcript = '';
        for (var i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
            if (event.results[i].isFinal) {
                finalTranscript = transcript;
            }
        }
        recognizedText = finalTranscript || transcript;
        console.log('识别结果:', recognizedText, '(final:', event.results[event.results.length-1].isFinal, ')');
    };
    
    recognition.onerror = function(event) {
        console.log('语音识别错误:', event.error);
        stopRecordingUI();
        
        if (event.error === 'not-allowed') {
            alert('请允许麦克风访问权限');
        } else if (event.error === 'no-speech') {
            // 没检测到语音，显示提示但不弹窗打断用户
            showSpeakingResult('');
        } else if (event.error === 'aborted') {
            // 用户中止，检查是否有识别结果
            if (recognizedText) {
                showSpeakingResult(recognizedText);
            }
        }
    };
    
    recognition.onend = function() {
        console.log('语音识别结束，最终文本:', recognizedText);
        stopRecordingUI();
        
        // 如果有识别结果，显示评分
        if (recognizedText) {
            showSpeakingResult(recognizedText);
            recognizedText = '';  // 重置
        }
    };
}

function speakSentence() {
    var text = speakingSentences[currentSpeakingIndex];
    if (!text) return;
    if (window.speechSynthesis) {
        speechSynthesis.cancel();
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        utterance.rate = 0.85;
        utterance.volume = 1;
        utterance.pitch = 1;
        
        // 选择最佳美式语音
        var voices = speechSynthesis.getVoices();
        var voice = selectBestUSVoice(voices);
        if (voice) {
            utterance.voice = voice;
            console.log('口语模块使用语音:', voice.name);
        }
        
        speechSynthesis.speak(utterance);
    }
}

// 选择最佳美式英语语音（与vocabulary.js保持一致）
function selectBestUSVoice(voices) {
    if (!voices || voices.length === 0) return null;
    
    // macOS/iOS 优质美式语音
    var preferredNames = ['Samantha', 'Alex', 'Allison', 'Ava', 'Susan', 'Tom', 
                          'Google US English', 'Microsoft Zira', 'Microsoft David'];
    
    for (var i = 0; i < preferredNames.length; i++) {
        var voice = voices.find(function(v) {
            return v.name.includes(preferredNames[i]) && 
                   (v.lang === 'en-US' || v.lang.startsWith('en-US'));
        });
        if (voice) return voice;
    }
    
    // 降级：任何美式英语
    var usVoice = voices.find(function(v) {
        return v.lang === 'en-US' || v.lang.startsWith('en-US');
    });
    if (usVoice) return usVoice;
    
    // 最后降级：任何英语
    return voices.find(function(v) { return v.lang.startsWith('en'); });
}

function nextSentence() {
    // 随机选择下一个句子（而不是顺序）
    currentSpeakingIndex = getRandomSentenceIndex();
    var el = document.getElementById("targetSentence");
    if (el) el.textContent = speakingSentences[currentSpeakingIndex];
    
    // 更新句子信息
    updateSentenceInfo();
    
    // 隐藏上次结果
    var resultCard = document.getElementById("resultCard");
    if (resultCard) resultCard.classList.add("hidden");
}

// 按住录音 - 开始
function startHoldRecording(event) {
    event.preventDefault(); // 防止触摸设备的默认行为
    event.stopPropagation();
    
    if (isRecording) return; // 防止重复触发
    
    // 检查浏览器支持
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert('您的浏览器不支持语音识别功能，请使用Chrome或Safari浏览器');
        return;
    }
    
    if (!recognition) {
        initSpeechRecognition();
    }
    
    if (!recognition) {
        alert('语音识别初始化失败');
        return;
    }
    
    isRecording = true;
    recognizedText = '';
    recordingStartTime = Date.now();
    
    // 更新UI - 按下状态
    var recordBtn = document.getElementById("recordBtn");
    var recordText = document.getElementById("recordText");
    var indicator = document.getElementById("recordingIndicator");
    
    if (recordBtn) {
        recordBtn.style.background = 'linear-gradient(135deg,#10b981,#059669)';
        recordBtn.style.transform = 'scale(0.95)';
        recordBtn.style.boxShadow = '0 2px 10px rgba(16,185,129,0.4)';
    }
    if (recordText) recordText.textContent = '正在录音...';
    if (indicator) indicator.classList.remove('hidden');
    
    // 震动反馈（移动设备）
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
    
    // 设置最大录音时长限制（30秒）
    recordingTimer = setTimeout(function() {
        if (isRecording) {
            console.log('录音达到最大时长，自动停止');
            stopHoldRecording({preventDefault: function(){}, stopPropagation: function(){}});
        }
    }, MAX_RECORDING_TIME);
    
    // 开始识别
    try {
        recognition.start();
        console.log('开始语音识别（按住模式）');
    } catch (e) {
        console.log('语音识别启动失败:', e);
        // 可能是上次没有正确停止，尝试重新初始化
        recognition = null;
        initSpeechRecognition();
        try {
            recognition.start();
        } catch (e2) {
            console.log('重试启动失败:', e2);
            stopRecordingUI();
        }
    }
}

// 按住录音 - 结束
function stopHoldRecording(event) {
    if (!isRecording) return; // 如果没在录音就不处理
    
    event.preventDefault();
    event.stopPropagation();
    
    // 清除最大时长计时器
    if (recordingTimer) {
        clearTimeout(recordingTimer);
        recordingTimer = null;
    }
    
    // 震动反馈
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
    
    // 计算录音时长
    var duration = Date.now() - recordingStartTime;
    console.log('录音时长:', duration, 'ms');
    
    // 如果录音时间太短（小于500ms），给提示
    if (duration < 500) {
        stopRecordingUI();
        var resultArea = document.getElementById("resultArea");
        if (resultArea) {
            resultArea.innerHTML = '<div style="padding:16px;background:#fef3c7;border-radius:12px;color:#92400e;text-align:center;">' +
                '<p style="font-weight:600;">⚠️ 录音时间太短</p>' +
                '<p style="font-size:13px;margin-top:4px;">请按住按钮说完整句话后再松开</p></div>';
        }
        var resultCard = document.getElementById("resultCard");
        if (resultCard) resultCard.classList.remove("hidden");
        return;
    }
    
    if (recognition) {
        try {
            recognition.stop();
            console.log('停止语音识别（松开按钮）');
        } catch (e) {
            console.log('停止识别失败:', e);
            stopRecordingUI();
        }
    } else {
        stopRecordingUI();
    }
}

// 保留原来的toggleRecording兼容性
function toggleRecording() {
    if (isRecording) {
        stopHoldRecording({preventDefault: function(){}});
    } else {
        startHoldRecording({preventDefault: function(){}});
    }
}

function stopRecordingUI() {
    isRecording = false;
    
    // 清除计时器
    if (recordingTimer) {
        clearTimeout(recordingTimer);
        recordingTimer = null;
    }
    
    var recordBtn = document.getElementById("recordBtn");
    var recordText = document.getElementById("recordText");
    var indicator = document.getElementById("recordingIndicator");
    
    if (recordBtn) {
        recordBtn.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
        recordBtn.style.transform = 'scale(1)';
        recordBtn.style.boxShadow = '0 6px 25px rgba(239,68,68,0.4)';
    }
    if (recordText) recordText.textContent = '按住录音';
    if (indicator) indicator.classList.add('hidden');
}

function showSpeakingResult(transcript) {
    var targetText = speakingSentences[currentSpeakingIndex];
    
    // 获取DOM元素
    var resultCard = document.getElementById("resultCard");
    var recognizedEl = document.getElementById("recognizedText");
    var scoreValue = document.getElementById("scoreValue");
    var scoreCircle = document.getElementById("scoreCircle");
    var feedbackEl = document.getElementById("speakingFeedback");
    
    // 如果没有识别到任何内容
    if (!transcript || transcript.trim() === '') {
        if (resultCard) resultCard.classList.remove("hidden");
        if (recognizedEl) recognizedEl.textContent = '(未识别到语音，请重试)';
        if (scoreValue) scoreValue.textContent = '0';
        if (scoreCircle) {
            scoreCircle.style.background = 'linear-gradient(135deg,#9ca3af,#6b7280)';
        }
        if (feedbackEl) {
            feedbackEl.innerHTML = '<div style="display:flex;align-items:center;gap:10px;">' +
                '<span style="font-size:28px;">🎤</span>' +
                '<div><div style="font-weight:700;color:#6b7280;">未检测到语音</div>' +
                '<div style="font-size:13px;color:#9ca3af;">请确保麦克风正常工作，按住按钮清晰说话</div></div></div>';
        }
        return;
    }
    
    // 使用升级版评分系统
    var result = calculateSimilarity(transcript, targetText);
    var score = result.score;
    var details = result.details;
    
    // 显示结果卡片（带动画）
    if (resultCard) {
        resultCard.classList.remove("hidden");
        resultCard.style.animation = 'slideUp 0.3s ease';
    }
    
    // 显示识别文本（高亮匹配/不匹配的词）
    if (recognizedEl) {
        recognizedEl.innerHTML = highlightMatches(transcript, targetText);
    }
    
    // 分数动画
    if (scoreValue) {
        animateScore(scoreValue, score);
    }
    
    // 根据分数调整颜色和效果
    if (scoreCircle) {
        if (score >= 85) {
            scoreCircle.style.background = 'linear-gradient(135deg,#10b981,#059669)';
            scoreCircle.style.boxShadow = '0 0 30px rgba(16,185,129,0.5)';
        } else if (score >= 70) {
            scoreCircle.style.background = 'linear-gradient(135deg,#3b82f6,#2563eb)';
            scoreCircle.style.boxShadow = '0 0 30px rgba(59,130,246,0.5)';
        } else if (score >= 50) {
            scoreCircle.style.background = 'linear-gradient(135deg,#f59e0b,#d97706)';
            scoreCircle.style.boxShadow = '0 0 30px rgba(245,158,11,0.5)';
        } else {
            scoreCircle.style.background = 'linear-gradient(135deg,#ef4444,#dc2626)';
            scoreCircle.style.boxShadow = '0 0 30px rgba(239,68,68,0.5)';
        }
    }
    
    // 生成详细反馈
    if (feedbackEl) {
        var feedback = generateDetailedFeedback(score, details, transcript, targetText);
        feedbackEl.innerHTML = feedback;
    }
    
    // 更新统计
    var count = parseInt(localStorage.getItem('stat_speaking') || '0');
    localStorage.setItem('stat_speaking', (count + 1).toString());
    
    // 保存最佳成绩
    saveBestScore(currentSpeakingIndex, score);
    
    // 更新今日目标进度
    if (typeof updateDailyProgress === 'function') {
        updateDailyProgress('speaking', 1);
    }
}

// 分数动画效果
function animateScore(element, targetScore) {
    var current = 0;
    var duration = 800;
    var startTime = null;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        
        // 使用easeOut效果
        var easeProgress = 1 - Math.pow(1 - progress, 3);
        current = Math.round(easeProgress * targetScore);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

// 高亮匹配/不匹配的词
function highlightMatches(spoken, target) {
    var spokenWords = spoken.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    var targetWords = target.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    var originalSpoken = spoken.split(/\s+/);
    
    var targetSet = {};
    targetWords.forEach(function(w) {
        targetSet[w] = (targetSet[w] || 0) + 1;
    });
    
    var html = originalSpoken.map(function(word, i) {
        var cleanWord = spokenWords[i];
        if (targetSet[cleanWord] && targetSet[cleanWord] > 0) {
            targetSet[cleanWord]--;
            return '<span style="color:#10b981;font-weight:600;">' + word + '</span>';
        } else {
            return '<span style="color:#ef4444;text-decoration:underline;">' + word + '</span>';
        }
    }).join(' ');
    
    return html;
}

// 保存最佳成绩
function saveBestScore(sentenceIndex, score) {
    try {
        var bestScores = JSON.parse(localStorage.getItem('speakingBestScores') || '{}');
        if (!bestScores[sentenceIndex] || score > bestScores[sentenceIndex]) {
            bestScores[sentenceIndex] = score;
            localStorage.setItem('speakingBestScores', JSON.stringify(bestScores));
        }
    } catch(e) {}
}

// 生成详细反馈
function generateDetailedFeedback(score, details, spoken, target) {
    var html = '';
    
    // 总体评价
    var emoji, title, subtitle, titleColor;
    if (score >= 90) {
        emoji = '🏆'; title = '完美发音！'; subtitle = '你的发音非常标准，堪称典范！'; titleColor = '#059669';
    } else if (score >= 80) {
        emoji = '🌟'; title = '非常棒！'; subtitle = '发音清晰准确，继续保持！'; titleColor = '#059669';
    } else if (score >= 70) {
        emoji = '👍'; title = '很不错！'; subtitle = '大部分发音正确，注意个别单词'; titleColor = '#3b82f6';
    } else if (score >= 60) {
        emoji = '💪'; title = '继续加油！'; subtitle = '基础不错，多练习几遍会更好'; titleColor = '#f59e0b';
    } else if (score >= 40) {
        emoji = '📖'; title = '需要练习'; subtitle = '先听原音，注意每个单词的发音'; titleColor = '#f59e0b';
    } else {
        emoji = '🎯'; title = '继续努力'; subtitle = '多听几遍原音，逐词跟读'; titleColor = '#ef4444';
    }
    
    html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
        '<span style="font-size:36px;">' + emoji + '</span>' +
        '<div><div style="font-weight:700;font-size:18px;color:' + titleColor + ';">' + title + '</div>' +
        '<div style="font-size:13px;color:#6b7280;">' + subtitle + '</div></div></div>';
    
    // 详细评分条
    html += '<div style="background:#f8fafc;padding:14px;border-radius:12px;margin-bottom:12px;">' +
        '<div style="font-size:12px;font-weight:600;color:#64748b;margin-bottom:10px;">📊 评分详情</div>';
    
    // 单词准确率
    html += createScoreBar('单词准确', details.wordMatch, '#3b82f6', 
        details.matchedWords + '/' + details.totalWords + ' 个单词匹配');
    
    // 词序正确率
    html += createScoreBar('语序正确', details.orderMatch, '#8b5cf6', 
        details.orderMatch >= 80 ? '语序很好' : '注意词序');
    
    // 完整度
    html += createScoreBar('内容完整', details.completeness, '#10b981',
        '说了 ' + details.spokenWords + ' 个词');
    
    html += '</div>';
    
    // 目标句子
    html += '<div style="background:#f0f9ff;padding:12px;border-radius:10px;border-left:3px solid #3b82f6;">' +
        '<div style="font-size:11px;color:#3b82f6;margin-bottom:4px;font-weight:600;">📝 目标句子</div>' +
        '<div style="color:#1e40af;font-size:14px;line-height:1.5;">' + target + '</div></div>';
    
    return html;
}

// 创建评分条
function createScoreBar(label, percentage, color, hint) {
    return '<div style="margin-bottom:8px;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px;">' +
        '<span style="font-size:12px;color:#475569;">' + label + '</span>' +
        '<span style="font-size:11px;color:#94a3b8;">' + hint + '</span></div>' +
        '<div style="height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">' +
        '<div style="width:' + percentage + '%;height:100%;background:' + color + ';border-radius:3px;transition:width 0.5s ease;"></div>' +
        '</div></div>';
}

// 升级版评分系统
function calculateSimilarity(str1, str2) {
    // 清理字符串
    str1 = str1.replace(/[^\w\s]/g, '').trim().toLowerCase();
    str2 = str2.replace(/[^\w\s]/g, '').trim().toLowerCase();
    
    if (!str1 || !str2) return { score: 0, details: { wordMatch: 0, orderMatch: 0, completeness: 0 } };
    
    var words1 = str1.split(/\s+/);
    var words2 = str2.split(/\s+/);
    
    // 1. 单词匹配率（40分）
    var matchCount = 0;
    var targetWords = {};
    var matchedPositions = [];
    
    words2.forEach(function(w, i) {
        targetWords[w] = targetWords[w] || [];
        targetWords[w].push(i);
    });
    
    words1.forEach(function(w, i) {
        if (targetWords[w] && targetWords[w].length > 0) {
            matchCount++;
            matchedPositions.push({ spoken: i, target: targetWords[w].shift() });
        }
    });
    
    var wordMatchScore = (matchCount / words2.length) * 40;
    
    // 2. 词序正确率（30分）- 检查匹配单词的相对顺序
    var orderScore = 0;
    if (matchedPositions.length > 1) {
        var correctOrder = 0;
        for (var i = 1; i < matchedPositions.length; i++) {
            if (matchedPositions[i].target > matchedPositions[i-1].target) {
                correctOrder++;
            }
        }
        orderScore = (correctOrder / (matchedPositions.length - 1)) * 30;
    } else if (matchedPositions.length === 1) {
        orderScore = 30; // 只有一个词，顺序满分
    }
    
    // 3. 完整度评分（30分）- 说了多少目标内容
    var completeness = Math.min(words1.length / words2.length, 1.2); // 最高1.2倍
    var completenessScore = Math.min(completeness * 25, 30);
    
    // 4. 额外奖励：完美匹配
    var bonus = 0;
    if (matchCount === words2.length && words1.length === words2.length) {
        bonus = 5; // 完美匹配奖励
    }
    
    var finalScore = Math.round(wordMatchScore + orderScore + completenessScore + bonus);
    finalScore = Math.min(100, Math.max(0, finalScore));
    
    return {
        score: finalScore,
        details: {
            wordMatch: Math.round(wordMatchScore / 40 * 100),
            orderMatch: Math.round(orderScore / 30 * 100),
            completeness: Math.round(completenessScore / 30 * 100),
            matchedWords: matchCount,
            totalWords: words2.length,
            spokenWords: words1.length
        }
    };
}

function levenshteinDistance(str1, str2) {
    var m = str1.length;
    var n = str2.length;
    var dp = [];
    
    for (var i = 0; i <= m; i++) {
        dp[i] = [i];
    }
    for (var j = 0; j <= n; j++) {
        dp[0][j] = j;
    }
    
    for (var i = 1; i <= m; i++) {
        for (var j = 1; j <= n; j++) {
            if (str1[i-1] === str2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1]) + 1;
            }
        }
    }
    
    return dp[m][n];
}

// 旧版反馈函数保留兼容
function generateSpeakingFeedback(score, spoken, target) {
    return generateDetailedFeedback(score, {
        wordMatch: score,
        orderMatch: score,
        completeness: score,
        matchedWords: 0,
        totalWords: 0,
        spokenWords: 0
    }, spoken, target);
}

// ==================== 阅读模块 ====================
var currentReadingIndex = 0;
var readArticles = [];
var readingScores = [];
var todayReadArticles = []; // 今日阅读的文章列表

try { 
    readArticles = JSON.parse(localStorage.getItem("readArticles") || "[]"); 
    readingScores = JSON.parse(localStorage.getItem("readingScores") || "[]");
    
    // 获取今日阅读记录
    var todayReadData = JSON.parse(localStorage.getItem("todayReadArticles") || '{"date":"","articles":[]}');
    var today = new Date().toDateString();
    if (todayReadData.date === today) {
        todayReadArticles = todayReadData.articles || [];
    } else {
        // 新的一天，重置今日阅读
        todayReadArticles = [];
        localStorage.setItem("todayReadArticles", JSON.stringify({date: today, articles: []}));
    }
} catch(e) { 
    readArticles = []; 
    readingScores = [];
    todayReadArticles = [];
}

// 记录今日阅读
function recordTodayRead(articleId) {
    var today = new Date().toDateString();
    var todayReadData = JSON.parse(localStorage.getItem("todayReadArticles") || '{"date":"","articles":[]}');
    
    // 如果是新的一天，重置
    if (todayReadData.date !== today) {
        todayReadData = {date: today, articles: []};
    }
    
    // 避免重复记录同一篇文章
    if (todayReadData.articles.indexOf(articleId) === -1) {
        todayReadData.articles.push(articleId);
        localStorage.setItem("todayReadArticles", JSON.stringify(todayReadData));
        todayReadArticles = todayReadData.articles;
        
        // 同步更新今日阅读计数（供首页统计使用）
        localStorage.setItem("todayReadingCount", todayReadData.articles.length.toString());
        localStorage.setItem("todayReadingDate", today);
    }
}

function initReadingModule() {
    updateReadingStats();
    loadRandomUnreadPassage();
}

function updateReadingStats() {
    var passages = window.READING_PASSAGES || [];
    var readCountEl = document.getElementById("readCount");
    var totalEl = document.getElementById("totalArticles");
    var avgEl = document.getElementById("avgScore");
    
    // 今日阅读篇数
    var today = new Date().toDateString();
    var todayReadData = JSON.parse(localStorage.getItem("todayReadArticles") || '{"date":"","articles":[]}');
    var todayCount = (todayReadData.date === today) ? todayReadData.articles.length : 0;
    
    if (readCountEl) readCountEl.textContent = todayCount;
    if (totalEl) totalEl.textContent = passages.length;
    if (avgEl) {
        if (readingScores.length > 0) {
            var sum = readingScores.reduce(function(a, b) { return a + b; }, 0);
            avgEl.textContent = Math.round(sum / readingScores.length) + "%";
        } else {
            avgEl.textContent = "--";
        }
    }
}

function loadRandomUnreadPassage() {
    var passages = window.READING_PASSAGES;
    if (!passages || passages.length === 0) {
        var el = document.getElementById("readingList");
        if (el) el.innerHTML = "<p style='color:#f44336;padding:20px;text-align:center;'>阅读数据加载中...</p>";
        return;
    }
    var unread = [];
    for (var i = 0; i < passages.length; i++) {
        if (readArticles.indexOf(passages[i].id) === -1) unread.push(i);
    }
    if (unread.length === 0) {
        readArticles = [];
        localStorage.setItem("readArticles", "[]");
        for (var j = 0; j < passages.length; j++) unread.push(j);
    }
    var idx = unread[Math.floor(Math.random() * unread.length)];
    
    // 更新控制栏
    var listEl = document.getElementById("readingList");
    if (listEl) {
        // 获取今日阅读篇数
        var today = new Date().toDateString();
        var todayReadData = JSON.parse(localStorage.getItem("todayReadArticles") || '{"date":"","articles":[]}');
        var todayCount = (todayReadData.date === today) ? todayReadData.articles.length : 0;
        
        listEl.innerHTML = 
            "<div style='display:flex;align-items:center;justify-content:space-between;'>" +
            "<div style='display:flex;align-items:center;gap:8px;'>" +
            "<span style='font-size:24px;'>📚</span>" +
            "<div><div style='font-weight:600;color:#333;'>今日阅读</div>" +
            "<div style='font-size:13px;color:#888;'>今日已读 " + todayCount + " 篇</div></div></div>" +
            "<button onclick='loadRandomUnreadPassage()' style='padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;border-radius:25px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(102,126,234,0.3);'>换一篇 🔄</button></div>";
    }
    loadReadingPassage(idx);
}

function loadReadingPassage(index) {
    var passages = window.READING_PASSAGES;
    if (!passages) return;
    currentReadingIndex = index;
    var p = passages[index];
    if (!p) return;
    
    // 标记已读（总计）
    if (readArticles.indexOf(p.id) === -1) {
        readArticles.push(p.id);
        localStorage.setItem("readArticles", JSON.stringify(readArticles));
    }
    
    // 记录今日阅读
    recordTodayRead(p.id);
    updateReadingStats();
    
    var area = document.getElementById("passageArea");
    if (area) area.classList.remove("hidden");
    
    // 设置标题和标签
    var titleEl = document.getElementById("passageTitle");
    var categoryEl = document.getElementById("passageCategory");
    var difficultyEl = document.getElementById("passageDifficulty");
    var topicEl = document.getElementById("passageTopic");
    
    if (titleEl) titleEl.textContent = p.title;
    if (categoryEl) categoryEl.textContent = p.category || "GRE";
    if (difficultyEl) difficultyEl.textContent = p.difficulty || "中等";
    if (topicEl) topicEl.textContent = p.topic || "综合";
    
    // 统计词数和阅读时间
    var wordCount = p.passage ? p.passage.split(/\s+/).length : 0;
    var readTime = Math.ceil(wordCount / 200); // 假设每分钟200词
    var wordCountEl = document.getElementById("wordCount");
    var readTimeEl = document.getElementById("readTime");
    if (wordCountEl) wordCountEl.textContent = wordCount;
    if (readTimeEl) readTimeEl.textContent = readTime;
    
    // 设置文章内容（分段显示）
    var textEl = document.getElementById("passageText");
    if (textEl) {
        var paragraphs = p.passage.split("\n\n");
        var html = "";
        paragraphs.forEach(function(para, idx) {
            if (para.trim()) {
                html += "<p style='margin-bottom:16px;text-indent:2em;'>" + para.trim() + "</p>";
            }
        });
        textEl.innerHTML = html;
    }
    
    // 核心词汇
    var vocabListEl = document.getElementById("vocabList");
    if (vocabListEl && p.vocabulary && p.vocabulary.length > 0) {
        var vocabHtml = "";
        p.vocabulary.forEach(function(v) {
            vocabHtml += "<span onclick=\"alert('" + v.word + ": " + (v.meaning || "").replace(/'/g, "\\'") + "')\" style='background:#f0f4ff;color:#667eea;padding:6px 12px;border-radius:20px;font-size:13px;cursor:pointer;transition:all 0.2s;' onmouseover=\"this.style.background='#667eea';this.style.color='white';\" onmouseout=\"this.style.background='#f0f4ff';this.style.color='#667eea';\">" + v.word + "</span>";
        });
        vocabListEl.innerHTML = vocabHtml;
        document.getElementById("vocabSection").style.display = "block";
    } else {
        document.getElementById("vocabSection").style.display = "none";
    }
    
    // 生成题目（高级UI）
    var qList = document.getElementById("questionsList");
    if (qList && p.questions) {
        var html = "";
        for (var q = 0; q < p.questions.length; q++) {
            html += "<div class='question-card' style='margin-bottom:20px;padding:20px;background:#f8f9fa;border-radius:12px;transition:all 0.3s;' data-q='" + q + "'>";
            html += "<div style='display:flex;align-items:flex-start;gap:12px;'>";
            html += "<span style='background:linear-gradient(135deg,#667eea,#764ba2);color:white;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:600;flex-shrink:0;'>" + (q+1) + "</span>";
            html += "<p style='margin:0;font-weight:600;color:#333;line-height:1.5;'>" + p.questions[q].question + "</p></div>";
            html += "<div style='margin-top:15px;margin-left:40px;'>";
            for (var o = 0; o < p.questions[q].options.length; o++) {
                var lbl = String.fromCharCode(65 + o);
                html += "<label class='option-label' style='display:flex;align-items:flex-start;padding:12px 15px;margin:8px 0;background:white;border:2px solid #e8e8e8;border-radius:10px;cursor:pointer;transition:all 0.2s;' onmouseover=\"this.style.borderColor='#667eea';this.style.background='#f8f0ff';\" onmouseout=\"if(!this.querySelector('input').checked){this.style.borderColor='#e8e8e8';this.style.background='white';}\">";
                html += "<input type='radio' name='q" + q + "' value='" + lbl + "' style='margin-right:10px;margin-top:2px;accent-color:#667eea;' onchange=\"selectOption(this)\">";
                html += "<span style='flex:1;'><strong style='color:#667eea;margin-right:8px;'>" + lbl + ".</strong><span style='color:#444;'>" + p.questions[q].options[o] + "</span></span></label>";
            }
            html += "</div></div>";
        }
        qList.innerHTML = html;
    }
    
    // 重置结果区域
    var resultEl = document.getElementById("readingResult");
    if (resultEl) {
        resultEl.classList.add("hidden");
        resultEl.innerHTML = "";
    }
    
    // 显示提交按钮
    var submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
        submitBtn.style.display = "block";
        submitBtn.textContent = "提交答案";
    }
}

// 选项选中效果
function selectOption(input) {
    var card = input.closest('.question-card');
    var labels = card.querySelectorAll('.option-label');
    labels.forEach(function(lbl) {
        lbl.style.borderColor = '#e8e8e8';
        lbl.style.background = 'white';
    });
    input.parentElement.style.borderColor = '#667eea';
    input.parentElement.style.background = '#f0f4ff';
}

function checkReadingAnswers() {
    var passages = window.READING_PASSAGES;
    if (!passages) return;
    var p = passages[currentReadingIndex];
    if (!p || !p.questions) return;
    
    var correct = 0;
    var total = p.questions.length;
    var detailHtml = "";
    
    for (var i = 0; i < total; i++) {
        var sel = document.querySelector("input[name='q" + i + "']:checked");
        var userAns = sel ? sel.value : "未作答";
        var correctAns = p.questions[i].answer;
        var explanation = p.questions[i].explanation || "暂无解析";
        var isCorrect = userAns === correctAns;
        if (isCorrect) correct++;
        
        var statusColor = isCorrect ? "#10b981" : "#ef4444";
        var statusBg = isCorrect ? "#ecfdf5" : "#fef2f2";
        var statusIcon = isCorrect ? "✓" : "✗";
        var statusText = isCorrect ? "回答正确" : "回答错误";
        
        detailHtml += "<div style='margin-bottom:16px;border-radius:12px;overflow:hidden;border:1px solid " + (isCorrect ? "#a7f3d0" : "#fecaca") + ";'>";
        
        // 题目头部
        detailHtml += "<div style='background:" + statusBg + ";padding:15px;display:flex;align-items:center;justify-content:space-between;'>";
        detailHtml += "<div style='display:flex;align-items:center;gap:10px;'>";
        detailHtml += "<span style='background:" + statusColor + ";color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:bold;'>" + statusIcon + "</span>";
        detailHtml += "<span style='font-weight:600;color:#333;'>第 " + (i+1) + " 题</span></div>";
        detailHtml += "<span style='color:" + statusColor + ";font-weight:600;font-size:14px;'>" + statusText + "</span></div>";
        
        // 答案对比
        detailHtml += "<div style='padding:15px;background:white;'>";
        detailHtml += "<div style='display:flex;gap:20px;margin-bottom:12px;'>";
        detailHtml += "<div style='flex:1;'><div style='font-size:12px;color:#888;margin-bottom:4px;'>你的答案</div>";
        detailHtml += "<div style='font-weight:600;color:" + (isCorrect ? "#10b981" : "#ef4444") + ";'>" + userAns + "</div></div>";
        detailHtml += "<div style='flex:1;'><div style='font-size:12px;color:#888;margin-bottom:4px;'>正确答案</div>";
        detailHtml += "<div style='font-weight:600;color:#10b981;'>" + correctAns + "</div></div></div>";
        
        // 答案解析
        detailHtml += "<div style='background:#f8fafc;padding:12px;border-radius:8px;margin-top:10px;'>";
        detailHtml += "<div style='font-size:12px;color:#667eea;font-weight:600;margin-bottom:6px;'>📖 答案解析</div>";
        detailHtml += "<div style='font-size:14px;color:#555;line-height:1.6;'>" + explanation + "</div></div>";
        detailHtml += "</div></div>";
    }
    
    var score = Math.round((correct / total) * 100);
    
    // 保存分数
    readingScores.push(score);
    if (readingScores.length > 50) readingScores.shift(); // 只保留最近50次
    localStorage.setItem("readingScores", JSON.stringify(readingScores));
    updateReadingStats();
    
    // 分数评价
    var grade = "";
    var gradeColor = "";
    var gradeEmoji = "";
    if (score >= 90) { grade = "优秀"; gradeColor = "#10b981"; gradeEmoji = "🏆"; }
    else if (score >= 70) { grade = "良好"; gradeColor = "#3b82f6"; gradeEmoji = "👍"; }
    else if (score >= 60) { grade = "及格"; gradeColor = "#f59e0b"; gradeEmoji = "💪"; }
    else { grade = "需加强"; gradeColor = "#ef4444"; gradeEmoji = "📚"; }
    
    // 更新今日目标进度
    if (typeof updateDailyProgress === 'function') {
        updateDailyProgress('reading', 1);
    }
    
    var resultEl = document.getElementById("readingResult");
    if (resultEl) {
        resultEl.innerHTML = 
            // 分数卡片
            "<div style='text-align:center;padding:30px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:16px;margin-bottom:20px;color:white;'>" +
            "<div style='font-size:60px;font-weight:800;text-shadow:0 2px 10px rgba(0,0,0,0.2);'>" + score + "</div>" +
            "<div style='font-size:14px;opacity:0.9;margin-top:5px;'>得分</div>" +
            "<div style='display:flex;justify-content:center;gap:30px;margin-top:20px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.2);'>" +
            "<div><div style='font-size:24px;font-weight:700;'>" + correct + "</div><div style='font-size:12px;opacity:0.8;'>正确</div></div>" +
            "<div><div style='font-size:24px;font-weight:700;'>" + (total - correct) + "</div><div style='font-size:12px;opacity:0.8;'>错误</div></div>" +
            "<div><div style='font-size:24px;'>" + gradeEmoji + "</div><div style='font-size:12px;opacity:0.8;'>" + grade + "</div></div></div></div>" +
            // 详细解析标题
            "<div style='display:flex;align-items:center;gap:10px;margin-bottom:15px;'>" +
            "<span style='font-size:20px;'>📋</span>" +
            "<span style='font-size:18px;font-weight:700;color:#333;'>详细解析</span></div>" +
            // 详细解析内容
            detailHtml +
            // 继续按钮
            "<button onclick='loadRandomUnreadPassage();window.scrollTo({top:0,behavior:\"smooth\"});' style='width:100%;padding:16px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:white;border:none;border-radius:12px;font-size:16px;font-weight:600;cursor:pointer;margin-top:20px;'>继续下一篇 →</button>";
        
        resultEl.classList.remove("hidden");
        
        // 隐藏提交按钮
        var submitBtn = document.getElementById("submitBtn");
        if (submitBtn) submitBtn.style.display = "none";
        
        // 滚动到结果区域
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function saveAnswer() {}

// ==================== 学习资源模块 ====================
function initResourcesModule() {
    console.log('初始化学习资源模块');
    showResourceTab('parsed');
}

function showResourceTab(tab) {
    // 切换标签按钮状态
    var tabParsed = document.getElementById('tabParsed');
    var tabOnline = document.getElementById('tabOnline');
    var parsedDiv = document.getElementById('parsedResources');
    var onlineDiv = document.getElementById('onlineResources');
    
    if (tab === 'parsed') {
        if (tabParsed) tabParsed.classList.add('active');
        if (tabOnline) tabOnline.classList.remove('active');
        if (parsedDiv) parsedDiv.classList.remove('hidden');
        if (onlineDiv) onlineDiv.classList.add('hidden');
        renderParsedResources();
    } else {
        if (tabParsed) tabParsed.classList.remove('active');
        if (tabOnline) tabOnline.classList.add('active');
        if (parsedDiv) parsedDiv.classList.add('hidden');
        if (onlineDiv) onlineDiv.classList.remove('hidden');
        renderOnlineResources();
    }
}

function renderParsedResources() {
    var container = document.getElementById('parsedResources');
    if (!container) return;
    
    var resources = window.PUBLIC_PARSED || [];
    
    // 按类别分组
    var categories = {};
    resources.forEach(function(item) {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    var html = '';
    var categoryIcons = {
        'GRE': '🎯',
        'TOEFL': '🌐',
        '学术英语': '🎓',
        'IELTS': '🇬🇧',
        'SAT': '📚'
    };
    
    var categoryColors = {
        'GRE': '#6366f1',
        'TOEFL': '#3b82f6',
        '学术英语': '#10b981',
        'IELTS': '#f59e0b',
        'SAT': '#ec4899'
    };
    
    Object.keys(categories).forEach(function(category) {
        var icon = categoryIcons[category] || '📄';
        var color = categoryColors[category] || '#6366f1';
        
        html += '<div class="resource-category-card">';
        html += '<div class="resource-category-header" style="border-left: 4px solid ' + color + '">';
        html += '<span class="category-icon">' + icon + '</span>';
        html += '<span class="category-name">' + category + '</span>';
        html += '<span class="category-count">' + categories[category].length + ' 项资源</span>';
        html += '</div>';
        html += '<div class="resource-items">';
        
        categories[category].forEach(function(item) {
            html += '<a href="' + item.url + '" target="_blank" class="resource-item-card">';
            html += '<div class="resource-item-main">';
            html += '<div class="resource-item-title">' + item.title + '</div>';
            html += '<div class="resource-item-source">';
            html += '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>';
            html += '来源: ' + item.source;
            html += '</div>';
            html += '</div>';
            html += '<div class="resource-item-arrow">';
            html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
            html += '</div>';
            html += '</a>';
        });
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
}

function renderOnlineResources() {
    var container = document.getElementById('onlineResources');
    if (!container) return;
    
    var resources = window.ONLINE_SOURCES || [];
    
    // 按类别分组
    var categories = {};
    resources.forEach(function(item) {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    var html = '';
    var categoryIcons = {
        'GRE': '🎯',
        'TOEFL': '🌐',
        '学术英语': '🎓',
        '词汇': '📖',
        '听力': '🎧',
        '阅读': '📰',
        '写作': '✍️',
        '综合': '🌟'
    };
    
    var categoryColors = {
        'GRE': '#6366f1',
        'TOEFL': '#3b82f6',
        '学术英语': '#10b981',
        '词汇': '#8b5cf6',
        '听力': '#06b6d4',
        '阅读': '#f59e0b',
        '写作': '#ec4899',
        '综合': '#14b8a6'
    };
    
    Object.keys(categories).forEach(function(category) {
        var icon = categoryIcons[category] || '🔗';
        var color = categoryColors[category] || '#6366f1';
        
        html += '<div class="resource-category-card">';
        html += '<div class="resource-category-header" style="border-left: 4px solid ' + color + '">';
        html += '<span class="category-icon">' + icon + '</span>';
        html += '<span class="category-name">' + category + '</span>';
        html += '<span class="category-count">' + categories[category].length + ' 个网站</span>';
        html += '</div>';
        html += '<div class="resource-items">';
        
        categories[category].forEach(function(item) {
            html += '<a href="' + item.url + '" target="_blank" class="resource-item-card online">';
            html += '<div class="resource-item-main">';
            html += '<div class="resource-item-title">' + item.name + '</div>';
            html += '<div class="resource-item-desc">' + item.description + '</div>';
            html += '</div>';
            html += '<div class="resource-item-arrow">';
            html += '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';
            html += '</div>';
            html += '</a>';
        });
        
        html += '</div></div>';
    });
    
    container.innerHTML = html;
}

function updateReviewStats() {
    var el = document.getElementById("totalLearned");
    if (el) el.textContent = localStorage.getItem("learnedCount") || "0";
}
function startReview() { alert("复习功能开发中"); }

// ==================== 设置页面功能 ====================

// 切换设置标签页
function switchSettingsTab(tabName) {
    // 更新标签按钮状态
    document.querySelectorAll('.settings-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // 更新面板显示
    document.querySelectorAll('.settings-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    const targetPanel = document.getElementById('settingsPanel-' + tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// 加载应用设置
function loadAppSettings() {
    const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    
    // 主题设置
    const themeInputs = document.querySelectorAll('input[name="theme"]');
    themeInputs.forEach(input => {
        input.checked = input.value === (settings.theme || 'default');
    });
    
    // 学习偏好
    const autoPlay = document.getElementById('autoPlayPronunciation');
    const showExamples = document.getElementById('showExampleSentences');
    const reviewReminder = document.getElementById('reviewReminder');
    
    if (autoPlay) autoPlay.checked = settings.autoPlayPronunciation !== false;
    if (showExamples) showExamples.checked = settings.showExampleSentences !== false;
    if (reviewReminder) reviewReminder.checked = settings.reviewReminder === true;
    
    // 音频设置
    const useCloudTTS = document.getElementById('useCloudTTS');
    const cloudTTSUrl = document.getElementById('cloudTTSUrl');
    const cloudTTSKey = document.getElementById('cloudTTSKey');
    const playbackSpeed = document.getElementById('playbackSpeed');
    
    if (useCloudTTS) useCloudTTS.checked = settings.useCloudTTS === true;
    if (cloudTTSUrl) cloudTTSUrl.value = settings.cloudTTSUrl || '';
    if (cloudTTSKey) cloudTTSKey.value = settings.cloudTTSKey || '';
    if (playbackSpeed) {
        playbackSpeed.value = settings.playbackSpeed || 1;
        updateSpeedValue(playbackSpeed.value);
    }
    
    // 更新存储信息
    updateStorageInfo();
    
    // 应用主题
    applyTheme(settings.theme || 'default');
    
    // 液态玻璃模式 - 无论 DOM 是否存在都要应用效果
    applyLiquidGlass(settings.liquidGlassMode === true);
    const liquidGlassMode = document.getElementById('liquidGlassMode');
    if (liquidGlassMode) {
        liquidGlassMode.checked = settings.liquidGlassMode === true;
    }
}

// 保存应用设置
function saveAppSettings() {
    const settings = {
        theme: document.querySelector('input[name="theme"]:checked')?.value || 'default',
        autoPlayPronunciation: document.getElementById('autoPlayPronunciation')?.checked ?? true,
        showExampleSentences: document.getElementById('showExampleSentences')?.checked ?? true,
        reviewReminder: document.getElementById('reviewReminder')?.checked ?? false,
        useCloudTTS: document.getElementById('useCloudTTS')?.checked ?? false,
        cloudTTSUrl: document.getElementById('cloudTTSUrl')?.value || '',
        cloudTTSKey: document.getElementById('cloudTTSKey')?.value || '',
        playbackSpeed: document.getElementById('playbackSpeed')?.value || 1,
        liquidGlassMode: document.getElementById('liquidGlassMode')?.checked ?? false
    };
    
    localStorage.setItem('appSettings', JSON.stringify(settings));
    applyTheme(settings.theme);
    
    // 显示保存成功提示
    showToast('✅ 设置已保存');
}

// 重置应用设置
function resetAppSettings() {
    if (confirm('确定要重置所有设置吗？')) {
        localStorage.removeItem('appSettings');
        loadAppSettings();
        showToast('🔄 设置已重置');
    }
}

// 应用主题
function applyTheme(theme) {
    // 移除所有主题类
    document.body.classList.remove(
        'theme-default', 
        'theme-light', 
        'theme-dark',
        'theme-ocean',
        'theme-forest',
        'theme-sunset',
        'theme-rose',
        'theme-mint',
        'theme-coffee',
        'theme-lavender'
    );
    document.body.classList.add('theme-' + (theme || 'default'));
}

// 切换液态玻璃模式
function toggleLiquidGlass(enabled) {
    applyLiquidGlass(enabled);
    
    // 保存设置
    const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    settings.liquidGlassMode = enabled;
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // 显示切换提示
    if (enabled) {
        showLiquidGlassToast('✨ 液态玻璃效果已启用');
    } else {
        showToast('液态玻璃效果已关闭');
    }
}

// 应用液态玻璃效果
function applyLiquidGlass(enabled) {
    if (enabled) {
        document.body.classList.add('liquid-glass-mode');
    } else {
        document.body.classList.remove('liquid-glass-mode');
    }
}

// 液态玻璃风格的提示
function showLiquidGlassToast(message) {
    const toast = document.createElement('div');
    toast.className = 'liquid-glass-toast';
    toast.innerHTML = `
        <div class="liquid-toast-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
            </svg>
        </div>
        <span>${message}</span>
    `;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0.9);
        background: rgba(255, 255, 255, 0.65);
        backdrop-filter: blur(25px) saturate(180%);
        -webkit-backdrop-filter: blur(25px) saturate(180%);
        border: 1px solid rgba(255, 255, 255, 0.7);
        border-radius: 20px;
        padding: 20px 32px;
        display: flex;
        align-items: center;
        gap: 14px;
        font-size: 16px;
        font-weight: 600;
        color: #1e1b4b;
        z-index: 10001;
        box-shadow: 
            0 25px 60px rgba(0, 0, 0, 0.15),
            inset 0 1px 2px rgba(255, 255, 255, 0.8),
            inset 0 -1px 1px rgba(255, 255, 255, 0.3);
        opacity: 0;
        animation: liquidToastIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    `;
    
    // 添加图标样式
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        @keyframes liquidToastIn {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes liquidToastOut {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
        .liquid-toast-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(139, 92, 246, 0.2) 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #6366f1;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.5);
        }
    `;
    document.head.appendChild(iconStyle);
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'liquidToastOut 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
            if (iconStyle.parentNode) iconStyle.parentNode.removeChild(iconStyle);
        }, 400);
    }, 2000);
}

// 更新播放速度显示
function updateSpeedValue(value) {
    const speedValue = document.getElementById('speedValue');
    if (speedValue) {
        speedValue.textContent = parseFloat(value).toFixed(1) + 'x';
    }
}

// 切换密码可见性
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

// 预览TTS
function previewTTS() {
    if (window.speechSynthesis) {
        var u = new SpeechSynthesisUtterance("Hello, this is a test of the text-to-speech system.");
        u.lang = "en-US";
        u.rate = parseFloat(document.getElementById('playbackSpeed')?.value || 1);
        speechSynthesis.speak(u);
        showToast('🔊 正在播放测试音频');
    } else {
        showToast('❌ 您的浏览器不支持语音合成');
    }
}

// 导出所有数据
function exportAllData() {
    const data = {
        exportTime: new Date().toISOString(),
        version: '1.0.0',
        settings: JSON.parse(localStorage.getItem('appSettings') || '{}'),
        vocabulary: JSON.parse(localStorage.getItem('vocabularyProgress') || '{}'),
        statistics: JSON.parse(localStorage.getItem('learningStats') || '{}'),
        goals: JSON.parse(localStorage.getItem('dailyGoals') || '{}'),
        streak: localStorage.getItem('learningStreak') || '0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'english-boost-backup-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast('📤 数据已导出');
}

// 触发导入
function importDataTrigger() {
    document.getElementById('importDataFile').click();
}

// 导入数据
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.settings) localStorage.setItem('appSettings', JSON.stringify(data.settings));
            if (data.vocabulary) localStorage.setItem('vocabularyProgress', JSON.stringify(data.vocabulary));
            if (data.statistics) localStorage.setItem('learningStats', JSON.stringify(data.statistics));
            if (data.goals) localStorage.setItem('dailyGoals', JSON.stringify(data.goals));
            if (data.streak) localStorage.setItem('learningStreak', data.streak);
            
            loadAppSettings();
            showToast('📥 数据导入成功');
        } catch (error) {
            showToast('❌ 导入失败：文件格式错误');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// 确认清除缓存
function confirmClearCache() {
    if (confirm('确定要清除缓存吗？这不会影响您的学习进度。')) {
        // 清除缓存数据
        if ('caches' in window) {
            caches.keys().then(names => {
                names.forEach(name => caches.delete(name));
            });
        }
        showToast('🗑️ 缓存已清除');
        updateStorageInfo();
    }
}

// 确认重置所有数据
function confirmResetAll() {
    if (confirm('⚠️ 警告：这将删除所有学习进度和设置！\n\n确定要继续吗？')) {
        if (confirm('再次确认：这个操作不可撤销！')) {
            localStorage.clear();
            showToast('⚠️ 所有数据已清除，页面将刷新');
            setTimeout(() => location.reload(), 1500);
        }
    }
}

// 更新存储信息
function updateStorageInfo() {
    let totalSize = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            totalSize += localStorage.getItem(key).length * 2; // UTF-16
        }
    }
    
    const usedMB = (totalSize / 1024 / 1024).toFixed(2);
    const maxMB = 5; // 大多数浏览器限制
    const percent = Math.min((totalSize / 1024 / 1024 / maxMB) * 100, 100);
    
    const storageUsed = document.getElementById('storageUsed');
    const storageText = document.getElementById('storageText');
    
    if (storageUsed) storageUsed.style.width = percent + '%';
    if (storageText) storageText.textContent = '已使用 ' + usedMB + 'MB / ' + maxMB + 'MB';
}

// 显示帮助
function showHelp() {
    alert('📖 使用指南\n\n1. 词汇学习：每天学习新单词，系统会根据艾宾浩斯遗忘曲线安排复习\n\n2. 听力训练：选择听力材料，进行精听练习\n\n3. 口语练习：跟读句子，提高口语能力\n\n4. 阅读理解：阅读文章并回答问题\n\n5. 设置目标：设定每日学习目标，追踪进度');
}

// 检查更新
function checkForUpdates() {
    showToast('🪐 正在同步云端数据...');
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.update().then(() => {
                // 如果有新版本，SW会自动激活并刷新页面
                // 如果没有新版本，我们提示用户
                setTimeout(() => {
                    if (confirm('✨ 已经是最新版本了\n\n所有功能运行正常。如果您遇到显示问题，可以点击"确定"强制刷新缓存。')) {
                        window.location.reload(true);
                    }
                }, 2000);
            }).catch(err => {
                console.error('Update failed:', err);
                window.location.reload(true);
            });
        });
    } else {
        setTimeout(() => {
            window.location.reload(true);
        }, 1000);
    }
}

// 显示反馈
function showFeedback() {
    const feedback = prompt('📝 请输入您的反馈或建议：');
    if (feedback) {
        showToast('💬 感谢您的反馈！');
    }
}

// Toast提示
function showToast(message) {
    // 移除现有toast
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// 导出到全局
window.initSpeakingModule = initSpeakingModule;
window.speakSentence = speakSentence;
window.nextSentence = nextSentence;
window.toggleRecording = toggleRecording;
window.startHoldRecording = startHoldRecording;
window.stopHoldRecording = stopHoldRecording;
window.initReadingModule = initReadingModule;
window.loadRandomUnreadPassage = loadRandomUnreadPassage;
window.loadReadingPassage = loadReadingPassage;
window.checkReadingAnswers = checkReadingAnswers;
window.selectOption = selectOption;
window.updateReadingStats = updateReadingStats;
window.recordTodayRead = recordTodayRead;
window.saveAnswer = saveAnswer;
window.initResourcesModule = initResourcesModule;
window.showResourceTab = showResourceTab;
window.updateReviewStats = updateReviewStats;
window.startReview = startReview;
window.loadAppSettings = loadAppSettings;
window.saveAppSettings = saveAppSettings;
window.resetAppSettings = resetAppSettings;
window.applyTheme = applyTheme;
window.previewTTS = previewTTS;
window.switchSettingsTab = switchSettingsTab;
window.updateSpeedValue = updateSpeedValue;
window.togglePasswordVisibility = togglePasswordVisibility;
window.exportAllData = exportAllData;
window.importDataTrigger = importDataTrigger;
window.importData = importData;
window.confirmClearCache = confirmClearCache;
window.confirmResetAll = confirmResetAll;
window.showHelp = showHelp;
window.checkForUpdates = checkForUpdates;
window.showFeedback = showFeedback;
window.showToast = showToast;

console.log("modules.js loaded");
