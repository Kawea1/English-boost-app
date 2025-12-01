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
    if (index < 20) return { name: '日常对话', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>', color: '#3b82f6' };
    if (index < 40) return { name: '学术表达', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>', color: '#8b5cf6' };
    if (index < 60) return { name: '环境与社会', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>', color: '#10b981' };
    if (index < 80) return { name: '科技与创新', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/></svg>', color: '#f59e0b' };
    return { name: '商务与职场', icon: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>', color: '#ef4444' };
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
            '<span style="background:' + category.color + '20;color:' + category.color + ';padding:3px 8px;border-radius:12px;font-size:12px;display:inline-flex;align-items:center;gap:4px;">' + 
            category.icon + ' ' + category.name + '</span>' +
            '<span style="background:' + difficulty.color + '20;color:' + difficulty.color + ';padding:3px 8px;border-radius:12px;font-size:12px;margin-left:6px;display:inline-flex;align-items:center;gap:2px;">' +
            '<svg viewBox="0 0 24 24" width="12" height="12" fill="' + difficulty.color + '" stroke="none"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg>'.repeat(difficulty.stars) + ' ' + difficulty.level + '</span>';
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
        'Microsoft David'
    ];
    
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
                '<p style="font-weight:600;display:flex;align-items:center;justify-content:center;gap:6px;"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>录音时间太短</p>' +
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
                '<span style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#6b7280" stroke-width="2"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg></span>' +
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
    var emojiHtml, title, subtitle, titleColor;
    if (score >= 90) {
        emojiHtml = '<span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#fbbf24,#f59e0b);display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>';
        title = '完美发音！'; subtitle = '你的发音非常标准，堪称典范！'; titleColor = '#059669';
    } else if (score >= 80) {
        emojiHtml = '<span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#a855f7,#7c3aed);display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="white" stroke="none"><path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z"/></svg></span>';
        title = '非常棒！'; subtitle = '发音清晰准确，继续保持！'; titleColor = '#059669';
    } else if (score >= 70) {
        emojiHtml = '<span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#3b82f6,#2563eb);display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg></span>';
        title = '很不错！'; subtitle = '大部分发音正确，注意个别单词'; titleColor = '#3b82f6';
    } else if (score >= 60) {
        emojiHtml = '<span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#f59e0b,#d97706);display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg></span>';
        title = '继续加油！'; subtitle = '基础不错，多练习几遍会更好'; titleColor = '#f59e0b';
    } else if (score >= 40) {
        emojiHtml = '<span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#7c3aed);display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></span>';
        title = '需要练习'; subtitle = '先听原音，注意每个单词的发音'; titleColor = '#f59e0b';
    } else {
        emojiHtml = '<span style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#ef4444,#dc2626);display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg></span>';
        title = '继续努力'; subtitle = '多听几遍原音，逐词跟读'; titleColor = '#ef4444';
    }
    
    html += '<div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">' +
        emojiHtml +
        '<div><div style="font-weight:700;font-size:18px;color:' + titleColor + ';">' + title + '</div>' +
        '<div style="font-size:13px;color:#6b7280;">' + subtitle + '</div></div></div>';
    
    // 详细评分条
    html += '<div style="background:#f8fafc;padding:14px;border-radius:12px;margin-bottom:12px;">' +
        '<div style="font-size:12px;font-weight:600;color:#64748b;margin-bottom:10px;display:flex;align-items:center;gap:6px;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg> 评分详情</div>';
    
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
        '<div style="font-size:11px;color:#3b82f6;margin-bottom:4px;font-weight:600;display:flex;align-items:center;gap:4px;"><svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg> 目标句子</div>' +
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
            "<span style='width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;'><svg viewBox='0 0 24 24' width='22' height='22' fill='none' stroke='white' stroke-width='2'><path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/><path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/></svg></span>" +
            "<div><div style='font-weight:600;color:#333;'>今日阅读</div>" +
            "<div style='font-size:13px;color:#888;'>今日已读 " + todayCount + " 篇</div></div></div>" +
            "<button onclick='loadRandomUnreadPassage()' style='padding:10px 20px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;border-radius:25px;font-size:14px;font-weight:600;cursor:pointer;box-shadow:0 2px 8px rgba(102,126,234,0.3);display:flex;align-items:center;gap:6px;'><svg viewBox='0 0 24 24' width='16' height='16' fill='none' stroke='currentColor' stroke-width='2'><path d='M23 4v6h-6'/><path d='M1 20v-6h6'/><path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'/></svg> 换一篇</button></div>";
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
        detailHtml += "<div style='font-size:12px;color:#667eea;font-weight:600;margin-bottom:6px;display:flex;align-items:center;gap:4px;'><svg viewBox='0 0 24 24' width='14' height='14' fill='none' stroke='currentColor' stroke-width='2'><path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'/><path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'/></svg> 答案解析</div>";
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
    var gradeIcon = "";
    if (score >= 90) { grade = "优秀"; gradeColor = "#10b981"; gradeIcon = "<svg viewBox='0 0 24 24' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2'><path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6'/><path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18'/><path d='M4 22h16'/><path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'/><path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'/><path d='M18 2H6v7a6 6 0 0 0 12 0V2Z'/></svg>"; }
    else if (score >= 70) { grade = "良好"; gradeColor = "#3b82f6"; gradeIcon = "<svg viewBox='0 0 24 24' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2'><path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3'/></svg>"; }
    else if (score >= 60) { grade = "及格"; gradeColor = "#f59e0b"; gradeIcon = "<svg viewBox='0 0 24 24' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2'><path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5'/></svg>"; }
    else { grade = "需加强"; gradeColor = "#ef4444"; gradeIcon = "<svg viewBox='0 0 24 24' width='24' height='24' fill='none' stroke='currentColor' stroke-width='2'><path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/><path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/></svg>"; }
    
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
            "<div><div style='font-size:24px;'>" + gradeIcon + "</div><div style='font-size:12px;opacity:0.8;'>" + grade + "</div></div></div></div>" +
            // 详细解析标题
            "<div style='display:flex;align-items:center;gap:10px;margin-bottom:15px;'>" +
            "<span style='width:32px;height:32px;border-radius:8px;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;'><svg viewBox='0 0 24 24' width='18' height='18' fill='none' stroke='white' stroke-width='2'><path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'/><polyline points='14 2 14 8 20 8'/><line x1='16' y1='13' x2='8' y2='13'/><line x1='16' y1='17' x2='8' y2='17'/><polyline points='10 9 9 9 8 9'/></svg></span>" +
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
        'GRE': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
        'TOEFL': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
        '学术英语': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>',
        'IELTS': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>',
        'SAT': '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
    };
    
    var categoryColors = {
        'GRE': '#6366f1',
        'TOEFL': '#3b82f6',
        '学术英语': '#10b981',
        'IELTS': '#f59e0b',
        'SAT': '#ec4899'
    };
    
    Object.keys(categories).forEach(function(category) {
        var icon = categoryIcons[category] || '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>';
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
        'GRE': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"8\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"16\" x2=\"12.01\" y2=\"16\"/></svg>',
        'TOEFL': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z\"/></svg>',
        '学术英语': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M22 10v6M2 10l10-5 10 5-10 5z\"/><path d=\"M6 12v5c3 3 9 3 12 0v-5\"/></svg>',
        '词汇': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 19.5A2.5 2.5 0 0 1 6.5 17H20\"/><path d=\"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z\"/></svg>',
        '听力': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M3 18v-6a9 9 0 0 1 18 0v6\"/><path d=\"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z\"/></svg>',
        '阅读': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z\"/><path d=\"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z\"/></svg>',
        '写作': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7\"/><path d=\"M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z\"/></svg>',
        '综合': '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2z\"/></svg>'
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
        var icon = categoryIcons[category] || '<svg viewBox=\"0 0 24 24\" width=\"18\" height=\"18\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\"/><path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\"/></svg>';
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

// ==================== 艾宾浩斯复习模块 ====================

// 艾宾浩斯复习间隔（天数）
const EBBINGHAUS_INTERVALS = [1, 2, 4, 7, 15, 30, 60]; // 第1次复习在1天后，第2次在2天后...

// 复习模式
const REVIEW_MODES = {
    QUICK: 'quick',      // 快速复习 - 只看单词和释义
    DEEP: 'deep',        // 深度复习 - 包含拼写测试
    LISTENING: 'listen'  // 听力复习 - 听音辨词
};

// 当前复习设置
let currentReviewMode = REVIEW_MODES.QUICK;
let reviewHistory = JSON.parse(localStorage.getItem('reviewHistory') || '[]');
let reviewStreak = parseInt(localStorage.getItem('reviewStreak') || '0');
let lastReviewDate = localStorage.getItem('lastReviewDate') || '';

// 收藏的重点单词
let starredWords = JSON.parse(localStorage.getItem('starredWords') || '[]');

// 收藏/取消收藏单词
function toggleStarWord(word) {
    const index = starredWords.indexOf(word);
    if (index === -1) {
        starredWords.push(word);
        showToast('⭐ 已收藏');
    } else {
        starredWords.splice(index, 1);
        showToast('已取消收藏');
    }
    localStorage.setItem('starredWords', JSON.stringify(starredWords));
    return starredWords.includes(word);
}

// 检查单词是否已收藏
function isWordStarred(word) {
    return starredWords.includes(word);
}

// 获取所有收藏的单词
function getStarredWords() {
    return starredWords;
}

// 获取艾宾浩斯记忆曲线数据（用于可视化）
function getEbbinghausCurveData(word) {
    const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
    const stat = wordStats[word];
    
    if (!stat || !stat.reviewCount) {
        return null;
    }
    
    // 计算当前记忆保持率（基于艾宾浩斯遗忘曲线公式）
    // R = e^(-t/S) 其中 R 是记忆保持率，t 是时间，S 是记忆强度
    const now = new Date();
    const lastReview = stat.lastReviewDate ? new Date(stat.lastReviewDate) : now;
    const daysSinceReview = Math.max(0, (now - lastReview) / (1000 * 60 * 60 * 24));
    
    // 记忆强度基于复习次数和难度
    let memoryStrength = stat.reviewCount * (stat.difficulty === 'easy' ? 1.5 : stat.difficulty === 'hard' ? 0.7 : 1);
    memoryStrength = Math.max(1, memoryStrength);
    
    // 计算当前记忆保持率
    const retentionRate = Math.round(100 * Math.exp(-daysSinceReview / memoryStrength));
    
    return {
        word: word,
        reviewCount: stat.reviewCount,
        difficulty: stat.difficulty,
        lastReviewDate: stat.lastReviewDate,
        nextReviewDate: stat.nextReviewDate,
        daysSinceReview: Math.floor(daysSinceReview),
        retentionRate: Math.max(0, Math.min(100, retentionRate)),
        memoryStrength: memoryStrength
    };
}

// 获取智能推荐复习时间
function getRecommendedReviewTime() {
    const now = new Date();
    const hour = now.getHours();
    
    // 基于认知科学研究的最佳复习时间
    // 早晨(7-9): 适合学习新知识
    // 上午(10-12): 适合困难内容复习
    // 下午(14-17): 适合一般复习
    // 晚上(20-22): 适合睡前巩固
    
    let recommendation = {
        currentBest: '',
        nextBest: '',
        tip: ''
    };
    
    if (hour >= 7 && hour < 9) {
        recommendation.currentBest = '现在适合学习新单词';
        recommendation.nextBest = '10-12点适合复习困难单词';
        recommendation.tip = '💡 早晨记忆效果最好，建议学习新内容';
    } else if (hour >= 10 && hour < 12) {
        recommendation.currentBest = '现在适合深度复习';
        recommendation.nextBest = '14-17点可进行一般复习';
        recommendation.tip = '💡 上午精力充沛，适合挑战困难单词';
    } else if (hour >= 14 && hour < 17) {
        recommendation.currentBest = '现在适合快速复习';
        recommendation.nextBest = '20-22点适合睡前巩固';
        recommendation.tip = '💡 下午适合复习已学内容，巩固记忆';
    } else if (hour >= 20 && hour < 22) {
        recommendation.currentBest = '现在适合睡前巩固';
        recommendation.nextBest = '明早7-9点学习新单词';
        recommendation.tip = '💡 睡前复习有助于记忆巩固到长期记忆';
    } else {
        recommendation.currentBest = '可以进行简单复习';
        recommendation.nextBest = '建议在7-9点或20-22点集中学习';
        recommendation.tip = '💡 选择固定时间学习，养成习惯效果更好';
    }
    
    return recommendation;
}

// 获取单词记忆状态分析
function getMemoryStatusAnalysis() {
    const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
    const learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    
    const analysis = {
        total: learnedWords.length,
        newWords: 0,      // 新学（复习次数<2）
        learning: 0,      // 学习中（复习次数2-4）
        familiar: 0,      // 熟悉（复习次数5-7）
        mastered: 0,      // 已掌握（复习次数>=8且difficulty为easy）
        hardWords: [],    // 困难单词列表
        needUrgentReview: 0  // 急需复习（记忆保持率<50%）
    };
    
    learnedWords.forEach(word => {
        const stat = wordStats[word] || { reviewCount: 0, difficulty: 'medium' };
        const curveData = getEbbinghausCurveData(word);
        
        if (stat.reviewCount < 2) {
            analysis.newWords++;
        } else if (stat.reviewCount < 5) {
            analysis.learning++;
        } else if (stat.reviewCount < 8) {
            analysis.familiar++;
        } else if (stat.difficulty === 'easy') {
            analysis.mastered++;
        } else {
            analysis.familiar++;
        }
        
        if (stat.difficulty === 'hard') {
            analysis.hardWords.push(word);
        }
        
        if (curveData && curveData.retentionRate < 50) {
            analysis.needUrgentReview++;
        }
    });
    
    return analysis;
}

// 检查并更新连续复习天数
function updateReviewStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastReviewDate === today) {
        // 今天已经复习过
        return reviewStreak;
    } else if (lastReviewDate === yesterdayStr) {
        // 昨天复习过，连续天数+1
        reviewStreak++;
        localStorage.setItem('reviewStreak', reviewStreak.toString());
        localStorage.setItem('lastReviewDate', today);
        return reviewStreak;
    } else if (lastReviewDate !== today) {
        // 超过一天没复习，重置
        if (lastReviewDate && lastReviewDate !== today) {
            const lastDate = new Date(lastReviewDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
                reviewStreak = 1;
            } else {
                reviewStreak++;
            }
        } else {
            reviewStreak = 1;
        }
        localStorage.setItem('reviewStreak', reviewStreak.toString());
        localStorage.setItem('lastReviewDate', today);
        return reviewStreak;
    }
    return reviewStreak;
}

// 记录复习历史
function addReviewHistory(wordsCount, correctCount, mode) {
    const record = {
        date: new Date().toISOString(),
        wordsCount: wordsCount,
        correctCount: correctCount,
        mode: mode,
        accuracy: wordsCount > 0 ? Math.round((correctCount / wordsCount) * 100) : 0
    };
    
    reviewHistory.unshift(record);
    // 只保留最近30天的记录
    if (reviewHistory.length > 30) {
        reviewHistory = reviewHistory.slice(0, 30);
    }
    localStorage.setItem('reviewHistory', JSON.stringify(reviewHistory));
}

// 获取本周复习统计
function getWeeklyReviewStats() {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    
    let totalWords = 0;
    let totalCorrect = 0;
    let daysWithReview = 0;
    const dailyStats = {};
    
    reviewHistory.forEach(record => {
        const recordDate = new Date(record.date);
        if (recordDate >= weekAgo) {
            const dateStr = recordDate.toDateString();
            if (!dailyStats[dateStr]) {
                dailyStats[dateStr] = { words: 0, correct: 0 };
                daysWithReview++;
            }
            dailyStats[dateStr].words += record.wordsCount;
            dailyStats[dateStr].correct += record.correctCount;
            totalWords += record.wordsCount;
            totalCorrect += record.correctCount;
        }
    });
    
    return {
        totalWords,
        totalCorrect,
        daysWithReview,
        avgAccuracy: totalWords > 0 ? Math.round((totalCorrect / totalWords) * 100) : 0,
        dailyStats
    };
}

// 获取待复习的单词
function getWordsToReview() {
    const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
    const today = new Date().toDateString();
    const wordsToReview = [];
    
    Object.keys(wordStats).forEach(word => {
        const stat = wordStats[word];
        if (!stat.nextReviewDate) return;
        
        const nextReview = new Date(stat.nextReviewDate);
        const todayDate = new Date(today);
        
        // 如果下次复习日期已到或已过
        if (nextReview <= todayDate) {
            wordsToReview.push({
                word: word,
                ...stat
            });
        }
    });
    
    // 按掌握程度排序，优先复习困难的
    wordsToReview.sort((a, b) => {
        const priorityA = a.difficulty === 'hard' ? 0 : (a.difficulty === 'medium' ? 1 : 2);
        const priorityB = b.difficulty === 'hard' ? 0 : (b.difficulty === 'medium' ? 1 : 2);
        return priorityA - priorityB;
    });
    
    return wordsToReview;
}

// 获取艾宾浩斯复习计划
function getReviewSchedule() {
    const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
    const schedule = {};
    const today = new Date();
    
    // 初始化未来7天的计划
    for (let i = 0; i <= 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateStr = date.toDateString();
        schedule[dateStr] = [];
    }
    
    // 将单词分配到对应的复习日期
    Object.keys(wordStats).forEach(word => {
        const stat = wordStats[word];
        if (!stat.nextReviewDate) return;
        
        const nextReview = new Date(stat.nextReviewDate).toDateString();
        if (schedule[nextReview]) {
            schedule[nextReview].push({
                word: word,
                ...stat
            });
        }
    });
    
    return schedule;
}

// 更新复习统计
function updateReviewStats() {
    const learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
    
    // 计算已学单词数
    const totalLearned = learnedWords.length;
    
    // 计算待复习单词数
    const wordsToReview = getWordsToReview();
    const needReview = wordsToReview.length;
    
    // 计算已掌握单词数（复习次数>=5且最近评价为easy的）
    let mastered = 0;
    Object.keys(wordStats).forEach(word => {
        const stat = wordStats[word];
        if (stat.reviewCount >= 5 && stat.difficulty === 'easy') {
            mastered++;
        }
    });
    
    // 更新UI
    const totalLearnedEl = document.getElementById('totalLearned');
    const needReviewEl = document.getElementById('needReview');
    const masteredEl = document.getElementById('mastered');
    
    if (totalLearnedEl) {
        totalLearnedEl.textContent = totalLearned;
        // 添加动画效果
        totalLearnedEl.classList.add('stat-update');
        setTimeout(() => totalLearnedEl.classList.remove('stat-update'), 300);
    }
    if (needReviewEl) {
        needReviewEl.textContent = needReview;
        needReviewEl.classList.add('stat-update');
        setTimeout(() => needReviewEl.classList.remove('stat-update'), 300);
    }
    if (masteredEl) {
        masteredEl.textContent = mastered;
        masteredEl.classList.add('stat-update');
        setTimeout(() => masteredEl.classList.remove('stat-update'), 300);
    }
    
    // 更新复习计划列表
    updateScheduleList();
}

// 更新复习计划列表
function updateScheduleList() {
    const container = document.getElementById('scheduleList');
    if (!container) return;
    
    const schedule = getReviewSchedule();
    const today = new Date().toDateString();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toDateString();
    
    let html = '';
    
    const dateKeys = Object.keys(schedule).sort((a, b) => new Date(a) - new Date(b));
    
    dateKeys.forEach((dateStr, index) => {
        const words = schedule[dateStr];
        const count = words.length;
        
        let label = '';
        let isToday = false;
        let isTomorrow = false;
        
        if (dateStr === today) {
            label = '今天';
            isToday = true;
        } else if (dateStr === tomorrowStr) {
            label = '明天';
            isTomorrow = true;
        } else {
            const date = new Date(dateStr);
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
            label = `${month}/${day} ${weekDays[date.getDay()]}`;
        }
        
        html += `
            <div class="schedule-item-new ${isToday ? 'today' : ''} ${isTomorrow ? 'tomorrow' : ''} ${count === 0 ? 'empty' : ''}">
                <div class="schedule-date-wrap">
                    ${isToday ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' : 
                      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>'}
                    <span>${label}</span>
                </div>
                <span class="schedule-count-badge ${count > 0 ? 'has-words' : ''}">${count} 词</span>
            </div>
        `;
    });
    
    if (!html) {
        html = '<div class="empty-schedule"><p>还没有学习记录，快去学习新单词吧！</p></div>';
    }
    
    container.innerHTML = html;
}

// 当前复习状态
let currentReviewWords = [];
let currentReviewIndex = 0;
let reviewSessionStats = { correct: 0, wrong: 0 };

// 开始复习
function startReview() {
    currentReviewWords = getWordsToReview();
    
    if (currentReviewWords.length === 0) {
        showToast('🎉 太棒了！今天没有需要复习的单词');
        return;
    }
    
    // 显示复习模式选择
    showReviewModeSelector();
}

// 显示复习模式选择器
function showReviewModeSelector() {
    const container = document.querySelector('.review-content-new');
    if (!container) return;
    
    const wordCount = currentReviewWords.length;
    const weeklyStats = getWeeklyReviewStats();
    const memoryStatus = getMemoryStatusAnalysis();
    const recommendation = getRecommendedReviewTime();
    
    container.innerHTML = `
        <div class="review-mode-selector">
            <div class="mode-header">
                <h3>选择复习模式</h3>
                <p>今天有 <span class="highlight">${wordCount}</span> 个单词待复习</p>
            </div>
            
            <!-- 智能推荐提示 -->
            <div class="smart-tip">
                <div class="tip-icon">💡</div>
                <div class="tip-content">${recommendation.tip}</div>
            </div>
            
            <div class="streak-display ${reviewStreak >= 7 ? 'fire' : ''}">
                <div class="streak-icon">${reviewStreak >= 7 ? '🔥' : '📅'}</div>
                <div class="streak-info">
                    <span class="streak-count">${reviewStreak}</span>
                    <span class="streak-label">连续复习天数</span>
                </div>
            </div>
            
            <!-- 记忆状态概览 -->
            <div class="memory-overview">
                <div class="memory-bar">
                    <div class="memory-segment new" style="width: ${memoryStatus.total > 0 ? (memoryStatus.newWords / memoryStatus.total * 100) : 0}%" title="新学"></div>
                    <div class="memory-segment learning" style="width: ${memoryStatus.total > 0 ? (memoryStatus.learning / memoryStatus.total * 100) : 0}%" title="学习中"></div>
                    <div class="memory-segment familiar" style="width: ${memoryStatus.total > 0 ? (memoryStatus.familiar / memoryStatus.total * 100) : 0}%" title="熟悉"></div>
                    <div class="memory-segment mastered" style="width: ${memoryStatus.total > 0 ? (memoryStatus.mastered / memoryStatus.total * 100) : 0}%" title="已掌握"></div>
                </div>
                <div class="memory-legend">
                    <span class="legend-item"><i class="dot new"></i>新学 ${memoryStatus.newWords}</span>
                    <span class="legend-item"><i class="dot learning"></i>学习中 ${memoryStatus.learning}</span>
                    <span class="legend-item"><i class="dot familiar"></i>熟悉 ${memoryStatus.familiar}</span>
                    <span class="legend-item"><i class="dot mastered"></i>掌握 ${memoryStatus.mastered}</span>
                </div>
            </div>
            
            <div class="mode-cards">
                <div class="mode-card quick" onclick="selectReviewMode('quick')">
                    <div class="mode-icon">⚡</div>
                    <div class="mode-name">快速复习</div>
                    <div class="mode-desc">看单词 → 显示释义 → 评价记忆</div>
                    <div class="mode-time">预计 ${Math.ceil(wordCount * 0.3)} 分钟</div>
                </div>
                
                <div class="mode-card deep" onclick="selectReviewMode('deep')">
                    <div class="mode-icon">📝</div>
                    <div class="mode-name">深度复习</div>
                    <div class="mode-desc">看释义 → 拼写单词 → 验证正确性</div>
                    <div class="mode-time">预计 ${Math.ceil(wordCount * 0.5)} 分钟</div>
                </div>
                
                <div class="mode-card listen" onclick="selectReviewMode('listen')">
                    <div class="mode-icon">🎧</div>
                    <div class="mode-name">听力复习</div>
                    <div class="mode-desc">听发音 → 选择正确释义</div>
                    <div class="mode-time">预计 ${Math.ceil(wordCount * 0.4)} 分钟</div>
                </div>
            </div>
            
            <div class="weekly-summary">
                <div class="weekly-title">📊 本周复习</div>
                <div class="weekly-stats-row">
                    <div class="weekly-stat">
                        <span class="weekly-value">${weeklyStats.totalWords}</span>
                        <span class="weekly-label">复习单词</span>
                    </div>
                    <div class="weekly-stat">
                        <span class="weekly-value">${weeklyStats.daysWithReview}/7</span>
                        <span class="weekly-label">活跃天数</span>
                    </div>
                    <div class="weekly-stat">
                        <span class="weekly-value">${weeklyStats.avgAccuracy}%</span>
                        <span class="weekly-label">平均正确率</span>
                    </div>
                </div>
            </div>
        </div>
        
        <button onclick="backToReviewPlan()" class="btn-back-plan">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            返回复习计划
        </button>
    `;
    
    addReviewModeStyles();
}

// 选择复习模式
function selectReviewMode(mode) {
    currentReviewMode = mode;
    currentReviewIndex = 0;
    reviewSessionStats = { correct: 0, wrong: 0 };
    
    if (mode === 'quick') {
        showReviewInterface();
    } else if (mode === 'deep') {
        showDeepReviewInterface();
    } else if (mode === 'listen') {
        showListeningReviewInterface();
    }
}

// 显示复习界面
function showReviewInterface() {
    const container = document.querySelector('.review-content-new');
    if (!container) return;
    
    const total = currentReviewWords.length;
    const current = currentReviewIndex + 1;
    
    container.innerHTML = `
        <div class="review-session-card">
            <div class="review-progress-bar">
                <div class="review-progress-fill" style="width: ${(current / total) * 100}%"></div>
            </div>
            <div class="review-progress-text">
                <span>⚡ 快速复习</span>
                <span class="review-progress-count">${current} / ${total}</span>
            </div>
        </div>
        
        <div class="review-word-card" id="reviewWordCard">
            <button class="star-btn" id="starBtn" onclick="toggleCurrentWordStar(event)">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </button>
            <div class="review-word-main" id="reviewWordMain">加载中...</div>
            <div class="review-word-phonetic" id="reviewWordPhonetic"></div>
            <div class="review-word-memory-bar" id="reviewMemoryBar"></div>
            <div class="review-word-meaning hidden" id="reviewWordMeaning">
                <div class="meaning-cn" id="reviewMeaningCn"></div>
                <div class="meaning-en" id="reviewMeaningEn"></div>
                <div class="word-example" id="reviewWordExample"></div>
            </div>
            <div class="review-word-hint" id="reviewWordHint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                点击卡片播放发音
            </div>
        </div>
        
        <div class="review-actions">
            <button class="review-show-btn" id="reviewShowBtn" onclick="showReviewMeaning()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                显示释义
            </button>
            <div class="review-rate-buttons hidden" id="reviewRateButtons">
                <button class="review-rate-btn forgot" onclick="rateReviewWord('forgot')">
                    <span class="rate-emoji">😰</span>
                    <span class="rate-text">忘了</span>
                </button>
                <button class="review-rate-btn vague" onclick="rateReviewWord('vague')">
                    <span class="rate-emoji">🤔</span>
                    <span class="rate-text">模糊</span>
                </button>
                <button class="review-rate-btn remember" onclick="rateReviewWord('remember')">>
                    <span class="rate-emoji">😊</span>
                    <span class="rate-text">记得</span>
                </button>
            </div>
        </div>
        
        <button class="review-quit-btn" onclick="quitReview()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            退出复习
        </button>
    `;
    
    // 添加复习界面样式
    addReviewStyles();
    
    // 显示当前单词
    showCurrentReviewWord();
}

// 切换当前单词的收藏状态
function toggleCurrentWordStar(event) {
    if (event) event.stopPropagation();
    
    const wordInfo = currentReviewWords[currentReviewIndex];
    if (!wordInfo) return;
    
    const isStarred = toggleStarWord(wordInfo.word);
    updateStarButton(isStarred);
}

// 更新收藏按钮状态
function updateStarButton(isStarred) {
    const starBtn = document.getElementById('starBtn');
    if (starBtn) {
        if (isStarred) {
            starBtn.classList.add('starred');
            starBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        } else {
            starBtn.classList.remove('starred');
            starBtn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        }
    }
}

// 显示当前复习单词
function showCurrentReviewWord() {
    if (currentReviewIndex >= currentReviewWords.length) {
        showReviewComplete();
        return;
    }
    
    const wordInfo = currentReviewWords[currentReviewIndex];
    const word = wordInfo.word;
    
    // 从词汇数据中查找完整信息
    let wordData = null;
    if (window.vocabularyData) {
        wordData = window.vocabularyData.find(w => w.word === word);
    }
    
    // 获取记忆曲线数据
    const curveData = getEbbinghausCurveData(word);
    
    const wordMainEl = document.getElementById('reviewWordMain');
    const phoneticEl = document.getElementById('reviewWordPhonetic');
    const meaningEl = document.getElementById('reviewWordMeaning');
    const meaningCnEl = document.getElementById('reviewMeaningCn');
    const meaningEnEl = document.getElementById('reviewMeaningEn');
    const exampleEl = document.getElementById('reviewWordExample');
    const showBtn = document.getElementById('reviewShowBtn');
    const rateButtons = document.getElementById('reviewRateButtons');
    const hintEl = document.getElementById('reviewWordHint');
    const memoryBarEl = document.getElementById('reviewMemoryBar');
    
    if (wordMainEl) wordMainEl.textContent = word;
    if (phoneticEl) phoneticEl.textContent = wordData ? wordData.phonetic : '';
    if (meaningCnEl) meaningCnEl.textContent = wordData ? wordData.meaningCn : wordInfo.meaningCn || '';
    if (meaningEnEl) meaningEnEl.textContent = wordData ? wordData.meaningEn : wordInfo.meaningEn || '';
    if (exampleEl) exampleEl.textContent = wordData ? `"${wordData.example}"` : '';
    
    // 显示记忆保持率条
    if (memoryBarEl && curveData) {
        const retentionColor = curveData.retentionRate >= 70 ? '#10b981' : 
                              curveData.retentionRate >= 40 ? '#f59e0b' : '#ef4444';
        memoryBarEl.innerHTML = `
            <div class="memory-retention-bar">
                <div class="retention-fill" style="width: ${curveData.retentionRate}%; background: ${retentionColor}"></div>
            </div>
            <span class="retention-text">记忆保持率 ${curveData.retentionRate}%</span>
        `;
    } else if (memoryBarEl) {
        memoryBarEl.innerHTML = '';
    }
    
    // 更新收藏按钮状态
    updateStarButton(isWordStarred(word));
    
    // 重置显示状态
    if (meaningEl) meaningEl.classList.add('hidden');
    if (showBtn) showBtn.classList.remove('hidden');
    if (rateButtons) rateButtons.classList.add('hidden');
    if (hintEl) hintEl.classList.remove('hidden');
    
    // 更新进度
    const total = currentReviewWords.length;
    const current = currentReviewIndex + 1;
    const progressFill = document.querySelector('.review-progress-fill');
    const progressCount = document.querySelector('.review-progress-count');
    if (progressFill) progressFill.style.width = `${(current / total) * 100}%`;
    if (progressCount) progressCount.textContent = `${current} / ${total}`;
    
    // 绑定点击播放
    const wordCard = document.getElementById('reviewWordCard');
    if (wordCard) {
        wordCard.onclick = function(e) {
            // 如果点击的是收藏按钮，不播放发音
            if (e.target.closest('.star-btn')) return;
            speakReviewWord(word);
        };
    }
}

// 播放复习单词发音
function speakReviewWord(word) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    }
}

// ========== 深度复习模式 ==========
function showDeepReviewInterface() {
    const container = document.querySelector('.review-content-new');
    if (!container) return;
    
    const total = currentReviewWords.length;
    const current = currentReviewIndex + 1;
    
    container.innerHTML = `
        <div class="review-session-card deep-mode">
            <div class="review-progress-bar">
                <div class="review-progress-fill" style="width: ${(current / total) * 100}%"></div>
            </div>
            <div class="review-progress-text">
                <span>📝 深度复习</span>
                <span class="review-progress-count">${current} / ${total}</span>
            </div>
        </div>
        
        <div class="deep-review-card" id="deepReviewCard">
            <div class="deep-meaning-display" id="deepMeaning">加载中...</div>
            <div class="deep-phonetic" id="deepPhonetic"></div>
            <div class="deep-input-wrap">
                <input type="text" id="deepSpellInput" class="deep-spell-input" placeholder="输入单词拼写..." autocomplete="off" autocapitalize="off">
                <button class="deep-hint-btn" onclick="showDeepHint()" id="deepHintBtn">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    提示
                </button>
            </div>
            <div class="deep-result hidden" id="deepResult">
                <div class="deep-correct-word" id="deepCorrectWord"></div>
                <div class="deep-example" id="deepExample"></div>
            </div>
        </div>
        
        <div class="review-actions">
            <button class="review-check-btn" id="deepCheckBtn" onclick="checkDeepSpelling()">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                检查拼写
            </button>
            <div class="review-rate-buttons hidden" id="deepRateButtons">
                <button class="review-rate-btn forgot" onclick="rateReviewWord('forgot')">
                    <span class="rate-emoji">😰</span>
                    <span class="rate-text">忘了</span>
                </button>
                <button class="review-rate-btn vague" onclick="rateReviewWord('vague')">
                    <span class="rate-emoji">🤔</span>
                    <span class="rate-text">模糊</span>
                </button>
                <button class="review-rate-btn remember" onclick="rateReviewWord('remember')">
                    <span class="rate-emoji">😊</span>
                    <span class="rate-text">记得</span>
                </button>
            </div>
        </div>
        
        <button class="review-quit-btn" onclick="quitReview()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            退出复习
        </button>
    `;
    
    addReviewStyles();
    showCurrentDeepWord();
    
    // 绑定输入框回车事件
    const input = document.getElementById('deepSpellInput');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                checkDeepSpelling();
            }
        });
        input.focus();
    }
}

// 显示当前深度复习单词
function showCurrentDeepWord() {
    if (currentReviewIndex >= currentReviewWords.length) {
        showReviewComplete();
        return;
    }
    
    const wordInfo = currentReviewWords[currentReviewIndex];
    const word = wordInfo.word;
    
    let wordData = null;
    if (window.vocabularyData) {
        wordData = window.vocabularyData.find(w => w.word === word);
    }
    
    const meaningEl = document.getElementById('deepMeaning');
    const phoneticEl = document.getElementById('deepPhonetic');
    const inputEl = document.getElementById('deepSpellInput');
    const resultEl = document.getElementById('deepResult');
    const checkBtn = document.getElementById('deepCheckBtn');
    const rateButtons = document.getElementById('deepRateButtons');
    const hintBtn = document.getElementById('deepHintBtn');
    
    const meaningCn = wordData ? wordData.meaningCn : wordInfo.meaningCn || '暂无释义';
    if (meaningEl) meaningEl.textContent = meaningCn;
    if (phoneticEl) phoneticEl.textContent = `(${word.length} 个字母)`;
    if (inputEl) {
        inputEl.value = '';
        inputEl.disabled = false;
        inputEl.focus();
    }
    if (resultEl) resultEl.classList.add('hidden');
    if (checkBtn) checkBtn.classList.remove('hidden');
    if (rateButtons) rateButtons.classList.add('hidden');
    if (hintBtn) {
        hintBtn.classList.remove('hidden');
        hintBtn.dataset.hintShown = 'false';
    }
    
    // 更新进度
    const total = currentReviewWords.length;
    const current = currentReviewIndex + 1;
    const progressFill = document.querySelector('.review-progress-fill');
    const progressCount = document.querySelector('.review-progress-count');
    if (progressFill) progressFill.style.width = `${(current / total) * 100}%`;
    if (progressCount) progressCount.textContent = `${current} / ${total}`;
}

// 显示拼写提示
function showDeepHint() {
    const wordInfo = currentReviewWords[currentReviewIndex];
    const word = wordInfo.word;
    const hintBtn = document.getElementById('deepHintBtn');
    const inputEl = document.getElementById('deepSpellInput');
    
    if (hintBtn && hintBtn.dataset.hintShown !== 'true') {
        // 显示首字母
        if (inputEl) inputEl.placeholder = `${word[0]}${'_'.repeat(word.length - 1)}`;
        hintBtn.dataset.hintShown = 'true';
        hintBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
            发音
        `;
        hintBtn.onclick = function() { speakReviewWord(word); };
    }
}

// 检查深度复习拼写
function checkDeepSpelling() {
    const wordInfo = currentReviewWords[currentReviewIndex];
    const word = wordInfo.word;
    const inputEl = document.getElementById('deepSpellInput');
    const resultEl = document.getElementById('deepResult');
    const correctWordEl = document.getElementById('deepCorrectWord');
    const exampleEl = document.getElementById('deepExample');
    const checkBtn = document.getElementById('deepCheckBtn');
    const rateButtons = document.getElementById('deepRateButtons');
    
    if (!inputEl) return;
    
    const userInput = inputEl.value.trim().toLowerCase();
    const isCorrect = userInput === word.toLowerCase();
    
    let wordData = null;
    if (window.vocabularyData) {
        wordData = window.vocabularyData.find(w => w.word === word);
    }
    
    if (resultEl) {
        resultEl.classList.remove('hidden');
        resultEl.classList.remove('correct', 'wrong');
        resultEl.classList.add(isCorrect ? 'correct' : 'wrong');
    }
    
    if (correctWordEl) {
        correctWordEl.innerHTML = `
            <span class="result-icon">${isCorrect ? '✓' : '✗'}</span>
            <span class="result-word">${word}</span>
            ${!isCorrect ? `<span class="user-input">你的答案: ${userInput || '(空)'}</span>` : ''}
        `;
    }
    
    if (exampleEl && wordData) {
        exampleEl.textContent = wordData.example || '';
    }
    
    if (inputEl) inputEl.disabled = true;
    if (checkBtn) checkBtn.classList.add('hidden');
    if (rateButtons) rateButtons.classList.remove('hidden');
    
    // 播放发音
    speakReviewWord(word);
}

// ========== 听力复习模式 ==========
let listeningOptions = [];

function showListeningReviewInterface() {
    const container = document.querySelector('.review-content-new');
    if (!container) return;
    
    const total = currentReviewWords.length;
    const current = currentReviewIndex + 1;
    
    container.innerHTML = `
        <div class="review-session-card listen-mode">
            <div class="review-progress-bar">
                <div class="review-progress-fill" style="width: ${(current / total) * 100}%"></div>
            </div>
            <div class="review-progress-text">
                <span>🎧 听力复习</span>
                <span class="review-progress-count">${current} / ${total}</span>
            </div>
        </div>
        
        <div class="listen-review-card" id="listenReviewCard">
            <div class="listen-play-area" id="listenPlayArea" onclick="playListeningWord()">
                <div class="listen-icon">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                </div>
                <div class="listen-hint">点击播放发音</div>
            </div>
            <div class="listen-options" id="listenOptions">
                <!-- 选项将动态生成 -->
            </div>
            <div class="listen-result hidden" id="listenResult">
                <div class="listen-answer" id="listenAnswer"></div>
            </div>
        </div>
        
        <div class="review-actions">
            <button class="review-next-btn hidden" id="listenNextBtn" onclick="nextListeningWord()">
                下一个
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
        </div>
        
        <button class="review-quit-btn" onclick="quitReview()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            退出复习
        </button>
    `;
    
    addReviewStyles();
    showCurrentListeningWord();
}

// 显示当前听力复习单词
function showCurrentListeningWord() {
    if (currentReviewIndex >= currentReviewWords.length) {
        showReviewComplete();
        return;
    }
    
    const wordInfo = currentReviewWords[currentReviewIndex];
    const word = wordInfo.word;
    
    // 生成选项（1个正确答案 + 3个干扰项）
    listeningOptions = generateListeningOptions(word);
    
    const optionsEl = document.getElementById('listenOptions');
    const resultEl = document.getElementById('listenResult');
    const nextBtn = document.getElementById('listenNextBtn');
    
    if (optionsEl) {
        let html = '';
        listeningOptions.forEach((opt, index) => {
            html += `
                <div class="listen-option" data-word="${opt.word}" onclick="selectListeningOption(this, '${opt.word}')">
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-meaning">${opt.meaning}</span>
                </div>
            `;
        });
        optionsEl.innerHTML = html;
    }
    
    if (resultEl) resultEl.classList.add('hidden');
    if (nextBtn) nextBtn.classList.add('hidden');
    
    // 更新进度
    const total = currentReviewWords.length;
    const current = currentReviewIndex + 1;
    const progressFill = document.querySelector('.review-progress-fill');
    const progressCount = document.querySelector('.review-progress-count');
    if (progressFill) progressFill.style.width = `${(current / total) * 100}%`;
    if (progressCount) progressCount.textContent = `${current} / ${total}`;
    
    // 自动播放发音
    setTimeout(() => playListeningWord(), 500);
}

// 生成听力选项
function generateListeningOptions(correctWord) {
    const options = [];
    
    // 获取正确答案的释义
    let correctWordData = null;
    if (window.vocabularyData) {
        correctWordData = window.vocabularyData.find(w => w.word === correctWord);
    }
    const correctMeaning = correctWordData ? correctWordData.meaningCn : '暂无释义';
    
    options.push({ word: correctWord, meaning: correctMeaning, isCorrect: true });
    
    // 从其他待复习单词中选择干扰项
    const otherWords = currentReviewWords.filter(w => w.word !== correctWord);
    const shuffledOthers = otherWords.sort(() => Math.random() - 0.5).slice(0, 3);
    
    shuffledOthers.forEach(w => {
        let wordData = null;
        if (window.vocabularyData) {
            wordData = window.vocabularyData.find(wd => wd.word === w.word);
        }
        const meaning = wordData ? wordData.meaningCn : '暂无释义';
        options.push({ word: w.word, meaning: meaning, isCorrect: false });
    });
    
    // 如果干扰项不足，从词库中随机选择
    while (options.length < 4 && window.vocabularyData) {
        const randomWord = window.vocabularyData[Math.floor(Math.random() * window.vocabularyData.length)];
        if (!options.find(o => o.word === randomWord.word)) {
            options.push({ word: randomWord.word, meaning: randomWord.meaningCn, isCorrect: false });
        }
    }
    
    // 打乱顺序
    return options.sort(() => Math.random() - 0.5);
}

// 播放听力单词发音
function playListeningWord() {
    const wordInfo = currentReviewWords[currentReviewIndex];
    if (wordInfo) {
        speakReviewWord(wordInfo.word);
        
        // 播放动画
        const playArea = document.getElementById('listenPlayArea');
        if (playArea) {
            playArea.classList.add('playing');
            setTimeout(() => playArea.classList.remove('playing'), 800);
        }
    }
}

// 选择听力选项
function selectListeningOption(element, selectedWord) {
    const wordInfo = currentReviewWords[currentReviewIndex];
    const correctWord = wordInfo.word;
    const isCorrect = selectedWord === correctWord;
    
    // 禁用所有选项
    document.querySelectorAll('.listen-option').forEach(opt => {
        opt.onclick = null;
        opt.classList.add('disabled');
        if (opt.dataset.word === correctWord) {
            opt.classList.add('correct');
        } else if (opt === element && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    // 显示结果
    const resultEl = document.getElementById('listenResult');
    const answerEl = document.getElementById('listenAnswer');
    const nextBtn = document.getElementById('listenNextBtn');
    
    if (resultEl) resultEl.classList.remove('hidden');
    if (answerEl) {
        let wordData = null;
        if (window.vocabularyData) {
            wordData = window.vocabularyData.find(w => w.word === correctWord);
        }
        answerEl.innerHTML = `
            <div class="answer-word">${correctWord}</div>
            <div class="answer-phonetic">${wordData ? wordData.phonetic : ''}</div>
            <div class="answer-meaning">${wordData ? wordData.meaningCn : ''}</div>
        `;
    }
    if (nextBtn) nextBtn.classList.remove('hidden');
    
    // 更新统计
    if (isCorrect) {
        reviewSessionStats.correct++;
    } else {
        reviewSessionStats.wrong++;
    }
    
    // 更新单词状态
    updateWordReviewStats(correctWord, isCorrect ? 'remember' : 'forgot');
}

// 下一个听力单词
function nextListeningWord() {
    currentReviewIndex++;
    showCurrentListeningWord();
}

// 更新单词复习统计（听力模式专用）
function updateWordReviewStats(word, rating) {
    const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
    if (!wordStats[word]) {
        wordStats[word] = {
            reviewCount: 0,
            difficulty: 'medium',
            lastReviewDate: null,
            nextReviewDate: null
        };
    }
    
    const stat = wordStats[word];
    stat.reviewCount = (stat.reviewCount || 0) + 1;
    stat.lastReviewDate = new Date().toISOString();
    
    let intervalIndex = Math.min(stat.reviewCount - 1, EBBINGHAUS_INTERVALS.length - 1);
    
    if (rating === 'forgot') {
        intervalIndex = 0;
        stat.difficulty = 'hard';
    } else if (rating === 'vague') {
        stat.difficulty = 'medium';
    } else {
        intervalIndex = Math.min(intervalIndex + 1, EBBINGHAUS_INTERVALS.length - 1);
        stat.difficulty = 'easy';
    }
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + EBBINGHAUS_INTERVALS[intervalIndex]);
    stat.nextReviewDate = nextDate.toISOString();
    
    wordStats[word] = stat;
    localStorage.setItem('wordStats', JSON.stringify(wordStats));
}

// 显示复习单词释义
function showReviewMeaning() {
    const meaningEl = document.getElementById('reviewWordMeaning');
    const showBtn = document.getElementById('reviewShowBtn');
    const rateButtons = document.getElementById('reviewRateButtons');
    const hintEl = document.getElementById('reviewWordHint');
    
    if (meaningEl) meaningEl.classList.remove('hidden');
    if (showBtn) showBtn.classList.add('hidden');
    if (rateButtons) rateButtons.classList.remove('hidden');
    if (hintEl) hintEl.classList.add('hidden');
}

// 评价复习单词
function rateReviewWord(rating) {
    const wordInfo = currentReviewWords[currentReviewIndex];
    const word = wordInfo.word;
    
    // 更新单词统计
    const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
    if (!wordStats[word]) {
        wordStats[word] = {
            reviewCount: 0,
            difficulty: 'medium',
            lastReviewDate: null,
            nextReviewDate: null
        };
    }
    
    const stat = wordStats[word];
    stat.reviewCount = (stat.reviewCount || 0) + 1;
    stat.lastReviewDate = new Date().toISOString();
    
    // 根据评价调整下次复习时间
    let intervalIndex = Math.min(stat.reviewCount - 1, EBBINGHAUS_INTERVALS.length - 1);
    
    if (rating === 'forgot') {
        // 忘记了，重置到第1天
        intervalIndex = 0;
        stat.difficulty = 'hard';
        reviewSessionStats.wrong++;
    } else if (rating === 'vague') {
        // 模糊，保持当前间隔
        stat.difficulty = 'medium';
        reviewSessionStats.wrong++;
    } else {
        // 记得，增加间隔
        intervalIndex = Math.min(intervalIndex + 1, EBBINGHAUS_INTERVALS.length - 1);
        stat.difficulty = 'easy';
        reviewSessionStats.correct++;
    }
    
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + EBBINGHAUS_INTERVALS[intervalIndex]);
    stat.nextReviewDate = nextDate.toISOString();
    
    wordStats[word] = stat;
    localStorage.setItem('wordStats', JSON.stringify(wordStats));
    
    // 下一个单词
    currentReviewIndex++;
    showCurrentReviewWord();
}

// 显示复习完成
function showReviewComplete() {
    const container = document.querySelector('.review-content-new');
    if (!container) return;
    
    const total = reviewSessionStats.correct + reviewSessionStats.wrong;
    const accuracy = total > 0 ? Math.round((reviewSessionStats.correct / total) * 100) : 0;
    
    // 更新连续复习天数
    updateReviewStreak();
    
    // 记录复习历史
    addReviewHistory(total, reviewSessionStats.correct, currentReviewMode);
    
    // 更新今日复习进度
    if (typeof updateDailyProgress === 'function') {
        updateDailyProgress('review', total);
    }
    
    // 生成鼓励语
    let encourageText = '';
    let encourageEmoji = '';
    if (accuracy >= 90) {
        encourageText = '完美！你的记忆力超群！';
        encourageEmoji = '🏆';
    } else if (accuracy >= 80) {
        encourageText = '太棒了！继续保持！';
        encourageEmoji = '🌟';
    } else if (accuracy >= 60) {
        encourageText = '不错！再接再厉！';
        encourageEmoji = '💪';
    } else {
        encourageText = '加油！多复习几遍会更好！';
        encourageEmoji = '📚';
    }
    
    // 生成模式标签
    const modeLabels = {
        'quick': '⚡ 快速复习',
        'deep': '📝 深度复习',
        'listen': '🎧 听力复习'
    };
    const modeLabel = modeLabels[currentReviewMode] || '复习';

    container.innerHTML = `
        <div class="review-complete-card">
            <div class="complete-confetti"></div>
            <div class="complete-icon">${encourageEmoji}</div>
            <h3>复习完成！</h3>
            <p class="complete-subtitle">${modeLabel}已完成</p>
            
            <div class="complete-stats">
                <div class="complete-stat">
                    <span class="stat-value">${total}</span>
                    <span class="stat-label">复习单词</span>
                </div>
                <div class="complete-stat">
                    <span class="stat-value correct">${reviewSessionStats.correct}</span>
                    <span class="stat-label">记住了</span>
                </div>
                <div class="complete-stat">
                    <span class="stat-value wrong">${reviewSessionStats.wrong}</span>
                    <span class="stat-label">需加强</span>
                </div>
            </div>
            
            <div class="accuracy-display">
                <div class="accuracy-ring">
                    <svg viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" stroke-width="8"/>
                        <circle cx="60" cy="60" r="52" fill="none" stroke="url(#reviewGrad)" stroke-width="8" stroke-linecap="round" 
                            stroke-dasharray="${326.7 * accuracy / 100} 326.7" transform="rotate(-90 60 60)"/>
                        <defs>
                            <linearGradient id="reviewGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stop-color="#f59e0b"/>
                                <stop offset="100%" stop-color="#f97316"/>
                            </linearGradient>
                        </defs>
                    </svg>
                    <div class="accuracy-value">${accuracy}%</div>
                </div>
                <span class="accuracy-label">正确率</span>
            </div>
            
            <div class="streak-badge ${reviewStreak >= 7 ? 'fire' : ''}">
                <span class="streak-fire">${reviewStreak >= 7 ? '🔥' : '📅'}</span>
                <span>连续复习 <strong>${reviewStreak}</strong> 天</span>
            </div>
            
            <div class="complete-message">
                ${encourageText}
            </div>
        </div>
        
        <div class="complete-actions">
            <button onclick="continueReview()" class="btn-continue-review" ${getWordsToReview().length === 0 ? 'disabled' : ''}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                继续复习
            </button>
            <button onclick="backToReviewPlan()" class="btn-back-plan">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                返回计划
            </button>
        </div>
    `;
    
    // 添加庆祝动画
    addCelebrationEffect();
    
    // 更新统计
    updateReviewStats();
}

// 继续复习
function continueReview() {
    currentReviewWords = getWordsToReview();
    if (currentReviewWords.length === 0) {
        showToast('🎉 今天的复习任务全部完成！');
        return;
    }
    showReviewModeSelector();
}

// 添加庆祝效果
function addCelebrationEffect() {
    const confetti = document.querySelector('.complete-confetti');
    if (!confetti) return;
    
    // 创建彩纸效果
    for (let i = 0; i < 30; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.animationDelay = Math.random() * 0.5 + 's';
        piece.style.backgroundColor = ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6'][Math.floor(Math.random() * 5)];
        confetti.appendChild(piece);
    }
}

// 退出复习
function quitReview() {
    if (currentReviewIndex > 0) {
        if (!confirm('确定要退出吗？当前进度会保存。')) {
            return;
        }
    }
    backToReviewPlan();
}

// 返回复习计划
function backToReviewPlan() {
    const container = document.querySelector('.review-content-new');
    if (!container) return;
    
    const memoryStatus = getMemoryStatusAnalysis();
    const weeklyStats = getWeeklyReviewStats();
    const recommendation = getRecommendedReviewTime();
    const starredCount = getStarredWords().length;
    
    container.innerHTML = `
        <div class="review-plan-card">
            <div class="plan-header">
                <div class="plan-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                </div>
                <div>
                    <h4>艾宾浩斯复习计划</h4>
                    <p>按科学规律安排复习，事半功倍</p>
                </div>
            </div>
            <div id="scheduleList" class="schedule-list-new"></div>
        </div>
        
        <!-- 学习数据可视化 -->
        <div class="review-analytics">
            <div class="analytics-header">
                <span>📊 学习数据</span>
            </div>
            
            <div class="analytics-chart">
                <div class="weekly-chart">
                    ${generateWeeklyChart(weeklyStats)}
                </div>
            </div>
            
            <div class="analytics-stats">
                <div class="analytics-item">
                    <span class="analytics-value">${weeklyStats.totalWords}</span>
                    <span class="analytics-label">本周复习</span>
                </div>
                <div class="analytics-item">
                    <span class="analytics-value">${weeklyStats.avgAccuracy}%</span>
                    <span class="analytics-label">正确率</span>
                </div>
                <div class="analytics-item">
                    <span class="analytics-value">${memoryStatus.needUrgentReview}</span>
                    <span class="analytics-label">急需复习</span>
                </div>
                <div class="analytics-item starred">
                    <span class="analytics-value">⭐ ${starredCount}</span>
                    <span class="analytics-label">收藏单词</span>
                </div>
            </div>
        </div>
        
        <!-- 智能建议 -->
        <div class="smart-suggestion">
            <div class="suggestion-icon">💡</div>
            <div class="suggestion-text">${recommendation.currentBest}</div>
        </div>
        
        <button onclick="startReview()" class="btn-start-review">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            开始复习
        </button>
        
        ${starredCount > 0 ? `
        <button onclick="reviewStarredWords()" class="btn-review-starred">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            复习收藏 (${starredCount}词)
        </button>
        ` : ''}
    `;
    
    updateReviewStats();
    addReviewAnalyticsStyles();
}

// 生成本周图表
function generateWeeklyChart(weeklyStats) {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        const dayStats = weeklyStats.dailyStats[dateStr] || { words: 0 };
        const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
        days.push({
            label: dayNames[date.getDay()],
            value: dayStats.words,
            isToday: i === 0
        });
    }
    
    const maxValue = Math.max(...days.map(d => d.value), 10);
    
    return days.map(day => `
        <div class="chart-bar ${day.isToday ? 'today' : ''} ${day.value > 0 ? 'has-value' : ''}">
            <div class="bar-fill" style="height: ${day.value > 0 ? Math.max(10, (day.value / maxValue) * 100) : 0}%">
                ${day.value > 0 ? `<span class="bar-value">${day.value}</span>` : ''}
            </div>
            <span class="bar-label">${day.label}</span>
        </div>
    `).join('');
}

// 复习收藏的单词
function reviewStarredWords() {
    const starred = getStarredWords();
    if (starred.length === 0) {
        showToast('还没有收藏任何单词');
        return;
    }
    
    // 将收藏的单词转换为复习格式
    currentReviewWords = starred.map(word => {
        const wordStats = JSON.parse(localStorage.getItem('wordStats') || '{}');
        return {
            word: word,
            ...(wordStats[word] || {})
        };
    });
    
    currentReviewIndex = 0;
    reviewSessionStats = { correct: 0, wrong: 0 };
    
    showReviewModeSelector();
}

// 添加数据分析样式
function addReviewAnalyticsStyles() {
    if (document.getElementById('reviewAnalyticsStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'reviewAnalyticsStyles';
    style.textContent = `
        .review-analytics {
            background: white;
            border-radius: 16px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .analytics-header {
            font-size: 15px;
            font-weight: 700;
            color: #374151;
            margin-bottom: 16px;
        }
        
        .weekly-chart {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            height: 80px;
            padding: 0 10px;
            margin-bottom: 16px;
        }
        
        .chart-bar {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            width: 12%;
        }
        
        .bar-fill {
            width: 100%;
            min-height: 0;
            background: #e5e7eb;
            border-radius: 4px 4px 0 0;
            position: relative;
            transition: height 0.5s ease;
        }
        
        .chart-bar.has-value .bar-fill {
            background: linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%);
        }
        
        .chart-bar.today .bar-fill {
            background: linear-gradient(180deg, #f59e0b 0%, #f97316 100%);
        }
        
        .bar-value {
            position: absolute;
            top: -20px;
            left: 50%;
            transform: translateX(-50%);
            font-size: 11px;
            font-weight: 700;
            color: #6366f1;
        }
        
        .chart-bar.today .bar-value {
            color: #f59e0b;
        }
        
        .bar-label {
            font-size: 12px;
            color: #9ca3af;
        }
        
        .chart-bar.today .bar-label {
            color: #f59e0b;
            font-weight: 700;
        }
        
        .analytics-stats {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
        }
        
        .analytics-item {
            text-align: center;
            padding: 10px 4px;
            background: #f9fafb;
            border-radius: 10px;
        }
        
        .analytics-item.starred {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }
        
        .analytics-value {
            font-size: 18px;
            font-weight: 800;
            color: #1e1b4b;
            display: block;
        }
        
        .analytics-label {
            font-size: 11px;
            color: #9ca3af;
        }
        
        .smart-suggestion {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 16px;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12px;
            margin-bottom: 16px;
        }
        
        .suggestion-icon {
            font-size: 24px;
        }
        
        .suggestion-text {
            font-size: 14px;
            color: #92400e;
            font-weight: 600;
        }
        
        .btn-review-starred {
            width: 100%;
            padding: 14px;
            background: transparent;
            color: #f59e0b;
            border: 2px solid #fde68a;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 12px;
            transition: all 0.3s ease;
        }
        
        .btn-review-starred:hover {
            background: #fef3c7;
            border-color: #f59e0b;
        }
    `;
    document.head.appendChild(style);
}

// 添加复习界面样式
function addReviewStyles() {
    if (document.getElementById('reviewStyles')) return;
    
    const style = document.createElement('style');
    style.id = 'reviewStyles';
    style.textContent = `
        /* 复习模式选择器样式 */
        .review-mode-selector {
            padding: 10px 0;
        }
        
        .mode-header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .mode-header h3 {
            font-size: 20px;
            font-weight: 800;
            color: #1e1b4b;
            margin-bottom: 8px;
        }
        
        .mode-header p {
            font-size: 15px;
            color: #6b7280;
        }
        
        .mode-header .highlight {
            color: #f59e0b;
            font-weight: 700;
        }
        
        .streak-display {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            padding: 16px;
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            border-radius: 16px;
            margin-bottom: 20px;
        }
        
        .streak-display.fire {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }
        
        .streak-icon {
            font-size: 32px;
        }
        
        .streak-info {
            display: flex;
            flex-direction: column;
        }
        
        .streak-count {
            font-size: 28px;
            font-weight: 800;
            color: #1e1b4b;
        }
        
        .streak-label {
            font-size: 13px;
            color: #6b7280;
        }
        
        /* 智能提示样式 */
        .smart-tip {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 16px;
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border-radius: 12px;
            margin-bottom: 16px;
            border-left: 3px solid #10b981;
        }
        
        .tip-icon {
            font-size: 20px;
        }
        
        .tip-content {
            font-size: 14px;
            color: #166534;
            font-weight: 500;
        }
        
        /* 记忆状态概览 */
        .memory-overview {
            background: white;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .memory-bar {
            height: 10px;
            background: #e5e7eb;
            border-radius: 5px;
            overflow: hidden;
            display: flex;
            margin-bottom: 10px;
        }
        
        .memory-segment {
            height: 100%;
            transition: width 0.5s ease;
        }
        
        .memory-segment.new { background: #fde68a; }
        .memory-segment.learning { background: #93c5fd; }
        .memory-segment.familiar { background: #86efac; }
        .memory-segment.mastered { background: #10b981; }
        
        .memory-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 12px;
            font-size: 12px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 4px;
            color: #6b7280;
        }
        
        .legend-item .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
        
        .legend-item .dot.new { background: #fde68a; }
        .legend-item .dot.learning { background: #93c5fd; }
        .legend-item .dot.familiar { background: #86efac; }
        .legend-item .dot.mastered { background: #10b981; }
        
        /* 收藏按钮 */
        .star-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 40px;
            height: 40px;
            border: none;
            background: #f3f4f6;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            z-index: 10;
        }
        
        .star-btn:hover {
            background: #e5e7eb;
            transform: scale(1.1);
        }
        
        .star-btn.starred {
            background: #fef3c7;
        }
        
        .star-btn svg {
            color: #9ca3af;
        }
        
        .star-btn.starred svg {
            color: #f59e0b;
        }
        
        /* 记忆保持率条 */
        .review-word-memory-bar {
            margin: 12px 0;
        }
        
        .memory-retention-bar {
            height: 6px;
            background: #e5e7eb;
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 6px;
        }
        
        .retention-fill {
            height: 100%;
            border-radius: 3px;
            transition: width 0.5s ease;
        }
        
        .retention-text {
            font-size: 12px;
            color: #9ca3af;
        }
        
        .mode-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 20px;
        }
        
        .mode-card {
            padding: 20px;
            border-radius: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            border: 2px solid transparent;
        }
        
        .mode-card:active {
            transform: scale(0.98);
        }
        
        .mode-card.quick {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }
        
        .mode-card.quick:hover {
            border-color: #f59e0b;
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.2);
        }
        
        .mode-card.deep {
            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
        }
        
        .mode-card.deep:hover {
            border-color: #6366f1;
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.2);
        }
        
        .mode-card.listen {
            background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
        }
        
        .mode-card.listen:hover {
            border-color: #06b6d4;
            box-shadow: 0 6px 20px rgba(6, 182, 212, 0.2);
        }
        
        .mode-icon {
            font-size: 32px;
            margin-bottom: 8px;
        }
        
        .mode-name {
            font-size: 18px;
            font-weight: 700;
            color: #1e1b4b;
            margin-bottom: 4px;
        }
        
        .mode-desc {
            font-size: 13px;
            color: #6b7280;
            margin-bottom: 8px;
        }
        
        .mode-time {
            font-size: 12px;
            color: #9ca3af;
            font-weight: 600;
        }
        
        .weekly-summary {
            background: white;
            border-radius: 16px;
            padding: 16px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }
        
        .weekly-title {
            font-size: 15px;
            font-weight: 700;
            color: #374151;
            margin-bottom: 12px;
        }
        
        .weekly-stats-row {
            display: flex;
            justify-content: space-around;
        }
        
        .weekly-stat {
            text-align: center;
        }
        
        .weekly-value {
            font-size: 20px;
            font-weight: 800;
            color: #1e1b4b;
            display: block;
        }
        
        .weekly-label {
            font-size: 12px;
            color: #9ca3af;
        }
        
        .btn-back-plan {
            width: 100%;
            padding: 14px;
            background: transparent;
            color: #6b7280;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin-top: 12px;
            transition: all 0.2s ease;
        }
        
        .btn-back-plan:hover {
            border-color: #d1d5db;
            color: #374151;
        }
        
        /* 深度复习样式 */
        .deep-review-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            margin-bottom: 20px;
        }
        
        .deep-meaning-display {
            font-size: 24px;
            font-weight: 700;
            color: #1e1b4b;
            margin-bottom: 8px;
            line-height: 1.4;
        }
        
        .deep-phonetic {
            font-size: 14px;
            color: #9ca3af;
            margin-bottom: 24px;
        }
        
        .deep-input-wrap {
            display: flex;
            gap: 10px;
            margin-bottom: 16px;
        }
        
        .deep-spell-input {
            flex: 1;
            padding: 14px 18px;
            font-size: 18px;
            font-weight: 600;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            text-align: center;
            letter-spacing: 2px;
            transition: all 0.2s ease;
        }
        
        .deep-spell-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
        }
        
        .deep-hint-btn {
            padding: 14px 16px;
            background: #f3f4f6;
            border: none;
            border-radius: 12px;
            color: #6b7280;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        
        .deep-hint-btn:hover {
            background: #e5e7eb;
        }
        
        .deep-result {
            padding: 20px;
            border-radius: 12px;
            margin-top: 16px;
        }
        
        .deep-result.correct {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
        }
        
        .deep-result.wrong {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
        }
        
        .deep-correct-word {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        .deep-correct-word .result-icon {
            font-size: 24px;
            font-weight: 800;
        }
        
        .deep-result.correct .result-icon {
            color: #10b981;
        }
        
        .deep-result.wrong .result-icon {
            color: #ef4444;
        }
        
        .deep-correct-word .result-word {
            font-size: 24px;
            font-weight: 800;
            color: #1e1b4b;
        }
        
        .deep-correct-word .user-input {
            width: 100%;
            font-size: 14px;
            color: #6b7280;
            margin-top: 8px;
        }
        
        .deep-example {
            font-size: 14px;
            color: #6b7280;
            font-style: italic;
            margin-top: 12px;
        }
        
        .review-check-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        
        .review-check-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
        }
        
        /* 听力复习样式 */
        .listen-review-card {
            background: white;
            border-radius: 20px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            margin-bottom: 20px;
        }
        
        .listen-play-area {
            width: 140px;
            height: 140px;
            margin: 0 auto 24px;
            background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
            border-radius: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .listen-play-area:hover {
            transform: scale(1.05);
            box-shadow: 0 10px 30px rgba(6, 182, 212, 0.3);
        }
        
        .listen-play-area.playing {
            animation: pulse 0.8s ease;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .listen-icon {
            color: #0891b2;
            margin-bottom: 8px;
        }
        
        .listen-hint {
            font-size: 13px;
            color: #0891b2;
            font-weight: 600;
        }
        
        .listen-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .listen-option {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px;
            background: #f9fafb;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.2s ease;
            border: 2px solid transparent;
        }
        
        .listen-option:hover:not(.disabled) {
            background: #f3f4f6;
            border-color: #e5e7eb;
        }
        
        .listen-option.disabled {
            cursor: default;
        }
        
        .listen-option.correct {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border-color: #10b981;
        }
        
        .listen-option.wrong {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border-color: #ef4444;
        }
        
        .option-letter {
            width: 32px;
            height: 32px;
            background: white;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #6b7280;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        
        .option-meaning {
            flex: 1;
            font-size: 15px;
            color: #374151;
            font-weight: 600;
        }
        
        .listen-result {
            margin-top: 20px;
            padding: 20px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border-radius: 12px;
            text-align: center;
        }
        
        .answer-word {
            font-size: 28px;
            font-weight: 800;
            color: #1e1b4b;
        }
        
        .answer-phonetic {
            font-size: 16px;
            color: #6b7280;
            margin: 4px 0;
        }
        
        .answer-meaning {
            font-size: 16px;
            color: #374151;
            font-weight: 600;
        }
        
        .review-next-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        
        .review-next-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(6, 182, 212, 0.3);
        }
        
        /* 复习进度条主题样式 */
        .review-session-card.deep-mode {
            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
        }
        
        .review-session-card.deep-mode .review-progress-text {
            color: #3730a3;
        }
        
        .review-session-card.deep-mode .review-progress-fill {
            background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
        }
        
        .review-session-card.listen-mode {
            background: linear-gradient(135deg, #cffafe 0%, #a5f3fc 100%);
        }
        
        .review-session-card.listen-mode .review-progress-text {
            color: #0e7490;
        }
        
        .review-session-card.listen-mode .review-progress-fill {
            background: linear-gradient(90deg, #06b6d4 0%, #0891b2 100%);
        }
        
        /* 完成界面增强 */
        .complete-actions {
            display: flex;
            gap: 12px;
        }
        
        .btn-continue-review {
            flex: 1;
            padding: 16px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        
        .btn-continue-review:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
        }
        
        .btn-continue-review:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .complete-actions .btn-back-plan {
            flex: 1;
            margin-top: 0;
        }
        
        .streak-badge {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            padding: 10px 20px;
            background: #f3f4f6;
            border-radius: 30px;
            font-size: 14px;
            color: #374151;
            margin-bottom: 16px;
        }
        
        .streak-badge.fire {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            color: #92400e;
        }
        
        .streak-badge strong {
            font-weight: 800;
        }
        
        /* 彩纸动画 */
        .complete-confetti {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 200px;
            overflow: hidden;
            pointer-events: none;
        }
        
        .confetti-piece {
            position: absolute;
            width: 10px;
            height: 10px;
            border-radius: 2px;
            animation: confetti-fall 2s ease-out forwards;
        }
        
        @keyframes confetti-fall {
            0% {
                transform: translateY(-20px) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(200px) rotate(720deg);
                opacity: 0;
            }
        }
        
        /* 统计更新动画 */
        .stat-update {
            animation: stat-pop 0.3s ease;
        }
        
        @keyframes stat-pop {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        
        .review-session-card {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 16px;
            padding: 16px 20px;
            margin-bottom: 20px;
        }
        
        .review-progress-bar {
            height: 8px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 10px;
        }
        
        .review-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #f59e0b 0%, #f97316 100%);
            border-radius: 4px;
            transition: width 0.3s ease;
        }
        
        .review-progress-text {
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #92400e;
            font-weight: 600;
        }
        
        .review-progress-count {
            font-weight: 700;
        }
        
        .review-word-card {
            position: relative;
            background: white;
            border-radius: 20px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            margin-bottom: 20px;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .review-word-card:active {
            transform: scale(0.98);
        }
        
        .review-word-main {
            font-size: 40px;
            font-weight: 800;
            color: #1e1b4b;
            margin-bottom: 8px;
        }
        
        .review-word-phonetic {
            font-size: 18px;
            color: #6b7280;
            margin-bottom: 20px;
        }
        
        .review-word-meaning {
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        
        .review-word-meaning .meaning-cn {
            font-size: 20px;
            font-weight: 700;
            color: #1e1b4b;
            margin-bottom: 8px;
        }
        
        .review-word-meaning .meaning-en {
            font-size: 15px;
            color: #6b7280;
            margin-bottom: 12px;
        }
        
        .review-word-meaning .word-example {
            font-size: 14px;
            color: #9ca3af;
            font-style: italic;
        }
        
        .review-word-hint {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 13px;
            color: #9ca3af;
            margin-top: 16px;
        }
        
        .review-actions {
            margin-bottom: 16px;
        }
        
        .review-show-btn {
            width: 100%;
            padding: 16px;
            background: var(--gradient-primary);
            color: white;
            border: none;
            border-radius: 14px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            transition: all 0.3s ease;
        }
        
        .review-show-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(99, 102, 241, 0.3);
        }
        
        .review-rate-buttons {
            display: flex;
            gap: 12px;
        }
        
        .review-rate-btn {
            flex: 1;
            padding: 16px 12px;
            border: none;
            border-radius: 14px;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 6px;
            transition: all 0.3s ease;
        }
        
        .review-rate-btn.forgot {
            background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
            border: 2px solid #fecaca;
        }
        
        .review-rate-btn.forgot:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(239, 68, 68, 0.2);
        }
        
        .review-rate-btn.vague {
            background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
            border: 2px solid #fde68a;
        }
        
        .review-rate-btn.vague:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(245, 158, 11, 0.2);
        }
        
        .review-rate-btn.remember {
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            border: 2px solid #a7f3d0;
        }
        
        .review-rate-btn.remember:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(16, 185, 129, 0.2);
        }
        
        .review-rate-btn .rate-emoji {
            font-size: 28px;
        }
        
        .review-rate-btn .rate-text {
            font-size: 14px;
            font-weight: 700;
            color: #374151;
        }
        
        .review-quit-btn {
            width: 100%;
            padding: 14px;
            background: transparent;
            color: #9ca3af;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            transition: all 0.2s ease;
        }
        
        .review-quit-btn:hover {
            color: #6b7280;
            border-color: #d1d5db;
        }
        
        /* 复习完成卡片 */
        .review-complete-card {
            background: white;
            border-radius: 24px;
            padding: 40px 30px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            margin-bottom: 20px;
        }
        
        .review-complete-card .complete-icon {
            font-size: 64px;
            margin-bottom: 16px;
        }
        
        .review-complete-card h3 {
            font-size: 24px;
            font-weight: 800;
            color: #1e1b4b;
            margin-bottom: 8px;
        }
        
        .review-complete-card .complete-subtitle {
            font-size: 15px;
            color: #6b7280;
            margin-bottom: 24px;
        }
        
        .complete-stats {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin-bottom: 24px;
        }
        
        .complete-stat {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .complete-stat .stat-value {
            font-size: 32px;
            font-weight: 800;
            color: #1e1b4b;
        }
        
        .complete-stat .stat-value.correct {
            color: #10b981;
        }
        
        .complete-stat .stat-value.wrong {
            color: #f59e0b;
        }
        
        .complete-stat .stat-label {
            font-size: 13px;
            color: #6b7280;
            font-weight: 600;
        }
        
        .accuracy-display {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .accuracy-ring {
            position: relative;
            width: 120px;
            height: 120px;
        }
        
        .accuracy-ring svg {
            width: 100%;
            height: 100%;
        }
        
        .accuracy-value {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 28px;
            font-weight: 800;
            color: #f59e0b;
        }
        
        .accuracy-label {
            font-size: 14px;
            color: #6b7280;
            font-weight: 600;
            margin-top: 8px;
        }
        
        .complete-message {
            font-size: 16px;
            color: #374151;
            font-weight: 600;
            padding: 12px 20px;
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            border-radius: 12px;
        }
        
        /* 复习计划列表样式增强 */
        .schedule-item-new {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 14px 16px;
            background: #f9fafb;
            border-radius: 12px;
            margin-bottom: 8px;
            transition: all 0.2s ease;
        }
        
        .schedule-item-new:hover {
            background: #f3f4f6;
        }
        
        .schedule-item-new.today {
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        }
        
        .schedule-item-new.today .schedule-date-wrap {
            color: #92400e;
            font-weight: 700;
        }
        
        .schedule-item-new.tomorrow {
            background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
        }
        
        .schedule-item-new.tomorrow .schedule-date-wrap {
            color: #3730a3;
        }
        
        .schedule-date-wrap {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #374151;
            font-size: 14px;
            font-weight: 600;
        }
        
        .schedule-count-badge {
            padding: 6px 12px;
            background: #e5e7eb;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 700;
            color: #6b7280;
        }
        
        .schedule-count-badge.has-words {
            background: linear-gradient(135deg, #f59e0b 0%, #f97316 100%);
            color: white;
        }
        
        .empty-schedule {
            padding: 40px 20px;
            text-align: center;
            color: #9ca3af;
        }
    `;
    document.head.appendChild(style);
}

// 添加复习模式选择器样式
function addReviewModeStyles() {
    // 复习模式样式已包含在 addReviewStyles 中
    addReviewStyles();
}

// ==================== 设置页面功能 ====================

// 切换设置标签页
function switchSettingsTab(tabName) {
    // 更新标签按钮状态
    document.querySelectorAll('.settings-tab-new').forEach(tab => {
        tab.classList.remove('active');
    });
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    
    // 更新面板显示
    document.querySelectorAll('.settings-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    const targetPanel = document.getElementById('settingsPanel-' + tabName);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
    
    // 重置滚动位置，显示底部栏
    const settingsContent = document.querySelector('#settingsModal .settings-content');
    const bottomBar = document.querySelector('.settings-bottom-bar');
    if (settingsContent) {
        settingsContent.scrollTop = 0;
    }
    if (bottomBar) {
        bottomBar.classList.remove('hiding');
        bottomBar.classList.add('visible');
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
    
    // 应用液态玻璃效果
    applyLiquidGlass(settings.liquidGlassMode);
    
    // 处理复习提醒设置
    if (settings.reviewReminder) {
        setupReviewReminder();
    } else {
        cancelReviewReminder();
    }
    
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
    console.log('toggleLiquidGlass called with:', enabled);
    applyLiquidGlass(enabled);
    
    // 保存设置
    const settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
    settings.liquidGlassMode = enabled;
    localStorage.setItem('appSettings', JSON.stringify(settings));
    console.log('Settings saved:', settings);
    
    // 显示切换提示
    if (enabled) {
        showLiquidGlassToast('✨ 液态玻璃效果已启用');
    } else {
        showToast('液态玻璃效果已关闭');
    }
}

// 应用液态玻璃效果
function applyLiquidGlass(enabled) {
    console.log('applyLiquidGlass called with:', enabled);
    console.log('Body classes before:', document.body.className);
    if (enabled) {
        document.body.classList.add('liquid-glass-mode');
    } else {
        document.body.classList.remove('liquid-glass-mode');
    }
    console.log('Body classes after:', document.body.className);
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

// ==================== 复习提醒功能 ====================
var reviewReminderTimer = null;
var reviewCheckInterval = null;

// 设置复习提醒
function setupReviewReminder() {
    // 请求通知权限
    if ('Notification' in window) {
        if (Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    startReviewReminderCheck();
                    showToast('✅ 已启用复习提醒通知');
                } else {
                    showToast('❌ 请允许通知权限以接收复习提醒');
                    // 即使没有权限也启用应用内提醒
                    startReviewReminderCheck();
                }
            });
        } else if (Notification.permission === 'granted') {
            startReviewReminderCheck();
        } else {
            // 通知被拒绝，使用应用内提醒
            startReviewReminderCheck();
            showToast('💡 通知权限被禁用，将使用应用内提醒');
        }
    } else {
        // 浏览器不支持通知，使用应用内提醒
        startReviewReminderCheck();
    }
}

// 开始复习提醒检查
function startReviewReminderCheck() {
    // 清除现有的定时器
    cancelReviewReminder();
    
    // 立即检查一次
    checkReviewNeeded();
    
    // 每30分钟检查一次
    reviewCheckInterval = setInterval(checkReviewNeeded, 30 * 60 * 1000);
    
    console.log('复习提醒已启动');
}

// 取消复习提醒
function cancelReviewReminder() {
    if (reviewCheckInterval) {
        clearInterval(reviewCheckInterval);
        reviewCheckInterval = null;
    }
    if (reviewReminderTimer) {
        clearTimeout(reviewReminderTimer);
        reviewReminderTimer = null;
    }
    console.log('复习提醒已取消');
}

// 检查是否需要复习
function checkReviewNeeded() {
    const learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    const wordProgress = JSON.parse(localStorage.getItem('wordProgress') || '{}');
    const lastReviewTime = localStorage.getItem('lastReviewTime');
    const now = Date.now();
    
    // 计算需要复习的单词
    let wordsToReview = 0;
    const reviewIntervals = [
        1 * 60 * 60 * 1000,      // 1小时
        6 * 60 * 60 * 1000,      // 6小时
        24 * 60 * 60 * 1000,     // 1天
        3 * 24 * 60 * 60 * 1000, // 3天
        7 * 24 * 60 * 60 * 1000, // 7天
        14 * 24 * 60 * 60 * 1000 // 14天
    ];
    
    learnedWords.forEach(word => {
        const progress = wordProgress[word];
        if (progress) {
            const lastReview = progress.lastReview || progress.learnedAt || 0;
            const reviewCount = progress.reviewCount || 0;
            const interval = reviewIntervals[Math.min(reviewCount, reviewIntervals.length - 1)];
            
            if (now - lastReview >= interval) {
                wordsToReview++;
            }
        }
    });
    
    // 如果有需要复习的单词
    if (wordsToReview > 0) {
        // 检查是否距离上次提醒超过1小时
        if (!lastReviewTime || now - parseInt(lastReviewTime) > 60 * 60 * 1000) {
            sendReviewReminder(wordsToReview);
            localStorage.setItem('lastReviewTime', now.toString());
        }
    }
    
    return wordsToReview;
}

// 发送复习提醒
function sendReviewReminder(wordCount) {
    const message = `📚 您有 ${wordCount} 个单词需要复习！`;
    
    // 尝试发送系统通知
    if ('Notification' in window && Notification.permission === 'granted') {
        try {
            const notification = new Notification('English Boost 复习提醒', {
                body: message,
                icon: '/assets/icon-192.png',
                badge: '/assets/icon-72.png',
                tag: 'review-reminder',
                requireInteraction: true,
                actions: [
                    { action: 'review', title: '开始复习' },
                    { action: 'later', title: '稍后提醒' }
                ]
            });
            
            notification.onclick = function() {
                window.focus();
                // 打开词汇模块
                if (typeof openModule === 'function') {
                    openModule('vocabulary');
                }
                notification.close();
            };
        } catch (e) {
            console.error('发送通知失败:', e);
            showInAppReviewReminder(wordCount);
        }
    } else {
        // 使用应用内提醒
        showInAppReviewReminder(wordCount);
    }
}

// 显示应用内复习提醒
function showInAppReviewReminder(wordCount) {
    // 检查是否已有提醒显示
    if (document.querySelector('.review-reminder-popup')) {
        return;
    }
    
    const popup = document.createElement('div');
    popup.className = 'review-reminder-popup';
    popup.innerHTML = `
        <div class="review-reminder-content">
            <div class="review-reminder-icon">📚</div>
            <div class="review-reminder-text">
                <h4>复习提醒</h4>
                <p>您有 <strong>${wordCount}</strong> 个单词需要复习</p>
            </div>
            <div class="review-reminder-actions">
                <button class="btn-review-now" onclick="startReviewFromReminder()">立即复习</button>
                <button class="btn-review-later" onclick="dismissReviewReminder()">稍后</button>
            </div>
            <button class="review-reminder-close" onclick="dismissReviewReminder()">×</button>
        </div>
    `;
    
    // 添加样式
    const style = document.createElement('style');
    style.id = 'review-reminder-style';
    style.textContent = `
        .review-reminder-popup {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        }
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .review-reminder-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 16px;
            padding: 20px;
            color: white;
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
            max-width: 320px;
            position: relative;
        }
        .review-reminder-icon {
            font-size: 40px;
            margin-bottom: 12px;
        }
        .review-reminder-text h4 {
            margin: 0 0 8px 0;
            font-size: 18px;
            font-weight: 600;
        }
        .review-reminder-text p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
        }
        .review-reminder-text strong {
            color: #ffd700;
            font-size: 18px;
        }
        .review-reminder-actions {
            display: flex;
            gap: 10px;
            margin-top: 16px;
        }
        .btn-review-now {
            flex: 1;
            padding: 10px 16px;
            border: none;
            border-radius: 10px;
            background: white;
            color: #667eea;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s;
        }
        .btn-review-now:hover {
            transform: scale(1.02);
        }
        .btn-review-later {
            padding: 10px 16px;
            border: 2px solid rgba(255,255,255,0.5);
            border-radius: 10px;
            background: transparent;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
        }
        .btn-review-later:hover {
            background: rgba(255,255,255,0.1);
        }
        .review-reminder-close {
            position: absolute;
            top: 10px;
            right: 10px;
            width: 24px;
            height: 24px;
            border: none;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            color: white;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `;
    
    if (!document.getElementById('review-reminder-style')) {
        document.head.appendChild(style);
    }
    document.body.appendChild(popup);
    
    // 30秒后自动消失
    setTimeout(() => {
        dismissReviewReminder();
    }, 30000);
}

// 从提醒开始复习
function startReviewFromReminder() {
    dismissReviewReminder();
    if (typeof openModule === 'function') {
        openModule('vocabulary');
    }
}

// 关闭复习提醒
function dismissReviewReminder() {
    const popup = document.querySelector('.review-reminder-popup');
    if (popup) {
        popup.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (popup.parentNode) popup.parentNode.removeChild(popup);
        }, 300);
    }
}

// 获取需要复习的单词列表
function getWordsToReview() {
    const learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    const wordProgress = JSON.parse(localStorage.getItem('wordProgress') || '{}');
    const now = Date.now();
    
    const reviewIntervals = [
        1 * 60 * 60 * 1000,
        6 * 60 * 60 * 1000,
        24 * 60 * 60 * 1000,
        3 * 24 * 60 * 60 * 1000,
        7 * 24 * 60 * 60 * 1000,
        14 * 24 * 60 * 60 * 1000
    ];
    
    return learnedWords.filter(word => {
        const progress = wordProgress[word];
        if (progress) {
            const lastReview = progress.lastReview || progress.learnedAt || 0;
            const reviewCount = progress.reviewCount || 0;
            const interval = reviewIntervals[Math.min(reviewCount, reviewIntervals.length - 1)];
            return now - lastReview >= interval;
        }
        return false;
    });
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
        // 取消之前的播放
        speechSynthesis.cancel();

        var u = new SpeechSynthesisUtterance("Hello, this is a test of the text-to-speech system.");
        u.lang = "en-US";
        u.rate = parseFloat(document.getElementById('playbackSpeed')?.value || 1);
        
        // 使用最佳语音
        var voices = speechSynthesis.getVoices();
        var voice = selectBestUSVoice(voices);
        if (voice) {
            u.voice = voice;
            console.log('预览使用语音:', voice.name);
        }

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

// 确认重置所有数据 - 版本4优化：符合《个人信息保护法》第47条删除权要求
function confirmResetAll() {
    // 创建专业的数据删除确认弹窗
    const overlay = document.createElement('div');
    overlay.id = 'dataDeleteOverlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.6);z-index:10001;display:flex;align-items:center;justify-content:center;padding:20px;';
    
    overlay.innerHTML = `
        <div style="background:white;border-radius:20px;max-width:400px;width:100%;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.3);">
            <div style="padding:24px;text-align:center;">
                <div style="width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,#fef3c7,#fde68a);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                </div>
                <h3 style="margin:0 0 8px;font-size:18px;color:#1f2937;">确认删除所有数据</h3>
                <p style="margin:0 0 16px;color:#6b7280;font-size:14px;line-height:1.6;">
                    根据《个人信息保护法》第47条，您有权删除您的个人信息。
                </p>
                <div style="background:#fef3c7;border-radius:12px;padding:14px;margin-bottom:20px;text-align:left;">
                    <p style="margin:0;font-size:13px;color:#92400e;font-weight:600;">此操作将永久删除：</p>
                    <ul style="margin:8px 0 0;padding-left:20px;font-size:13px;color:#b45309;">
                        <li>所有学习进度记录</li>
                        <li>词汇掌握数据</li>
                        <li>应用设置和偏好</li>
                        <li>激活状态信息</li>
                    </ul>
                </div>
                <p style="margin:0 0 20px;color:#ef4444;font-size:13px;font-weight:600;">⚠️ 此操作不可撤销！</p>
                <div style="display:flex;gap:12px;">
                    <button onclick="document.getElementById('dataDeleteOverlay').remove();" style="flex:1;padding:14px;background:#f3f4f6;border:none;border-radius:12px;font-size:15px;font-weight:600;color:#374151;cursor:pointer;">取消</button>
                    <button onclick="executeDataDeletion()" style="flex:1;padding:14px;background:linear-gradient(135deg,#ef4444,#dc2626);border:none;border-radius:12px;font-size:15px;font-weight:600;color:white;cursor:pointer;">确认删除</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}

// 执行数据删除
function executeDataDeletion() {
    // 记录删除操作日志（合规留痕，存储后立即清除）
    const deletionLog = {
        action: 'user_requested_data_deletion',
        timestamp: new Date().toISOString(),
        reason: 'User exercised right to deletion under PIPL Article 47'
    };
    console.log('Data deletion executed:', deletionLog);
    
    // 清除所有 localStorage 数据
    localStorage.clear();
    
    // 移除弹窗
    const overlay = document.getElementById('dataDeleteOverlay');
    if (overlay) overlay.remove();
    
    // 显示提示并刷新
    showToast('✅ 所有数据已删除');
    setTimeout(() => location.reload(), 1500);
}

// 导出删除函数
window.executeDataDeletion = executeDataDeletion;

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
window.showLiquidGlassToast = showLiquidGlassToast;
window.toggleLiquidGlass = toggleLiquidGlass;
window.applyLiquidGlass = applyLiquidGlass;
window.setupReviewReminder = setupReviewReminder;
window.cancelReviewReminder = cancelReviewReminder;
window.checkReviewNeeded = checkReviewNeeded;
window.startReviewFromReminder = startReviewFromReminder;
window.dismissReviewReminder = dismissReviewReminder;
window.getWordsToReview = getWordsToReview;

// ==================== 法律合规功能 ====================

// 显示隐私政策
function showPrivacyPolicy() {
    const modal = document.getElementById('privacyPolicyModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// 显示用户协议
function showUserAgreement() {
    const modal = document.getElementById('userAgreementModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

// 关闭法律文档弹窗
function closeLegalModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

// 导出法律相关函数
window.showPrivacyPolicy = showPrivacyPolicy;
window.showUserAgreement = showUserAgreement;
window.closeLegalModal = closeLegalModal;

console.log("modules.js loaded");
