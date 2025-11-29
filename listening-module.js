// listening-module.js - 精听训练模块（基于已学单词）
let currentListeningSentence = null;
let completedListeningSentences = [];
let isPlaying = false;
let playbackSpeed = 1.0;

// 从localStorage加载已完成的句子
try {
    completedListeningSentences = JSON.parse(localStorage.getItem('completedListeningSentences') || '[]');
} catch(e) {
    completedListeningSentences = [];
}

// 初始化听力模块
function initListeningModule() {
    console.log('initListeningModule called');
    
    // 加载下一个句子
    loadNextListeningSentence();
    
    // 更新统计
    updateListeningStats();
}

// 获取可用的听力练习句子（基于已学单词）
function getAvailableListeningSentences() {
    // 获取已学单词列表
    let learnedWords = [];
    try {
        learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    } catch(e) {
        learnedWords = [];
    }
    
    // 如果没有已学单词，使用vocabularyData的前20个单词
    if (learnedWords.length === 0 && window.vocabularyData) {
        learnedWords = window.vocabularyData.slice(0, 20).map(w => w.word);
    }
    
    // 从vocabularyData中找到已学单词的例句
    const sentences = [];
    if (window.vocabularyData) {
        window.vocabularyData.forEach(wordData => {
            if (learnedWords.includes(wordData.word) && wordData.example) {
                // 检查例句中是否包含该单词（用于填空）
                const word = wordData.word.toLowerCase();
                const example = wordData.example;
                
                // 查找单词在句子中的位置（不区分大小写）
                const regex = new RegExp(word, 'i');
                if (regex.test(example)) {
                    sentences.push({
                        id: wordData.word,
                        word: wordData.word,
                        sentence: example,
                        blank: wordData.word,
                        meaningCn: wordData.meaningCn,
                        meaningEn: wordData.meaningEn
                    });
                }
            }
        });
    }
    
    // 如果基于单词的句子不够，也加入原来的listeningData
    if (window.listeningData) {
        window.listeningData.forEach(item => {
            sentences.push({
                id: 'listening_' + item.id,
                word: item.blank,
                sentence: item.keysentence || item.transcript.replace(/_+/g, item.blank),
                blank: item.blank,
                meaningCn: '',
                meaningEn: '',
                title: item.title
            });
        });
    }
    
    return sentences;
}

// 加载下一个随机句子
function loadNextListeningSentence() {
    const allSentences = getAvailableListeningSentences();
    
    // 过滤掉已完成的句子
    const availableSentences = allSentences.filter(s => !completedListeningSentences.includes(s.id));
    
    // 如果所有句子都完成了，重置
    if (availableSentences.length === 0) {
        if (allSentences.length > 0) {
            completedListeningSentences = [];
            localStorage.setItem('completedListeningSentences', '[]');
            if (typeof showToast === 'function') {
                showToast('🎉 所有练习已完成！重新开始');
            }
        }
        // 重新获取
        const resetSentences = getAvailableListeningSentences();
        if (resetSentences.length === 0) {
            showNoSentencesMessage();
            return;
        }
        currentListeningSentence = resetSentences[Math.floor(Math.random() * resetSentences.length)];
    } else {
        // 随机选择一个
        currentListeningSentence = availableSentences[Math.floor(Math.random() * availableSentences.length)];
    }
    
    renderListeningExercise();
    updateListeningStats();
}

// 显示没有句子的提示
function showNoSentencesMessage() {
    const exerciseDiv = document.getElementById('listeningExercise');
    if (exerciseDiv) {
        exerciseDiv.innerHTML = `
            <div style="text-align:center;padding:40px 20px;">
                <div style="font-size:60px;margin-bottom:20px;">📚</div>
                <h3 style="color:#1e1b4b;margin-bottom:12px;">还没有可用的听力练习</h3>
                <p style="color:#6b7280;margin-bottom:20px;">请先去"核心词汇"模块学习一些单词，<br>这些单词的例句将成为你的听力练习素材！</p>
                <button onclick="closeModal('listeningModal')" style="background:var(--gradient-primary);color:white;border:none;padding:12px 24px;border-radius:12px;font-weight:600;cursor:pointer;">
                    去学单词
                </button>
            </div>
        `;
    }
}

// 渲染听力练习界面
function renderListeningExercise() {
    if (!currentListeningSentence) return;
    
    const item = currentListeningSentence;
    const sentence = item.sentence;
    const blankWord = item.blank;
    
    // 创建填空句子（将目标单词替换为下划线）
    const regex = new RegExp(blankWord, 'i');
    const parts = sentence.split(regex);
    
    // 更新标题
    const titleEl = document.getElementById('audioTitle');
    const descEl = document.getElementById('audioDesc');
    if (titleEl) titleEl.textContent = item.title || '单词练习: ' + blankWord;
    if (descEl) descEl.textContent = item.meaningCn ? '词义: ' + item.meaningCn : '听音填词';
    
    // 更新填空区域
    const blankArea = document.getElementById('blankArea');
    if (blankArea) {
        blankArea.innerHTML = `
            <span>${parts[0] || ''}</span>
            <input type="text" id="blankInput" placeholder="____" 
                style="border:2px solid #6366f1;border-radius:10px;padding:10px 16px;width:140px;font-size:16px;margin:0 8px;outline:none;transition:all 0.3s ease;box-shadow:0 2px 8px rgba(99,102,241,0.2);" 
                onfocus="this.style.boxShadow='0 4px 15px rgba(99,102,241,0.3)';this.style.borderColor='#a855f7';" 
                onblur="this.style.boxShadow='0 2px 8px rgba(99,102,241,0.2)';this.style.borderColor='#6366f1';"
                onkeypress="if(event.key==='Enter')checkAnswerEnhanced()">
            <span>${parts[1] || ''}</span>
        `;
    }
    
    // 清除反馈
    const feedback = document.getElementById('answerFeedback');
    if (feedback) {
        feedback.style.display = 'none';
        feedback.innerHTML = '';
    }
}

// 更新统计
function updateListeningStats() {
    const allSentences = getAvailableListeningSentences();
    const completed = completedListeningSentences.length;
    const total = allSentences.length;
    
    const totalEl = document.getElementById('listeningTotalCount');
    const completedEl = document.getElementById('listeningCompletedCount');
    
    if (totalEl) totalEl.textContent = total;
    if (completedEl) completedEl.textContent = completed;
}

// 音频播放功能
function togglePlayEnhanced() {
    if (!currentListeningSentence) {
        if (typeof showToast === 'function') showToast('请先加载练习');
        return;
    }
    
    if ('speechSynthesis' in window) {
        if (isPlaying) {
            speechSynthesis.cancel();
            isPlaying = false;
            const btn = document.getElementById('playBtn');
            if (btn) btn.innerHTML = '▶️';
        } else {
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(currentListeningSentence.sentence);
            utterance.lang = 'en-US';
            utterance.rate = playbackSpeed;
            
            utterance.onend = function() {
                isPlaying = false;
                const btn = document.getElementById('playBtn');
                if (btn) btn.innerHTML = '▶️';
            };
            
            speechSynthesis.speak(utterance);
            isPlaying = true;
            const btn = document.getElementById('playBtn');
            if (btn) btn.innerHTML = '⏸️';
            
            // 更新统计
            const count = parseInt(localStorage.getItem('stat_listen') || '0');
            localStorage.setItem('stat_listen', (count + 1).toString());
        }
    } else {
        alert('您的浏览器不支持语音合成');
    }
}

// 调整播放速度
function adjustSpeed(delta) {
    playbackSpeed = Math.max(0.5, Math.min(2.0, playbackSpeed + delta));
    const speedDisplay = document.getElementById('speedDisplay');
    if (speedDisplay) {
        speedDisplay.textContent = playbackSpeed.toFixed(1) + 'x';
    }
    
    // 如果正在播放，重新播放以应用新速度
    if (isPlaying) {
        speechSynthesis.cancel();
        isPlaying = false;
        setTimeout(() => togglePlayEnhanced(), 100);
    }
}

// 检查答案
function checkAnswerEnhanced() {
    console.log('checkAnswerEnhanced called');
    if (!currentListeningSentence) {
        alert('请先加载练习');
        return;
    }
    
    const blankInput = document.getElementById('blankInput');
    if (!blankInput) {
        alert('找不到输入框');
        return;
    }
    
    const input = blankInput.value.trim().toLowerCase();
    const correct = currentListeningSentence.blank.toLowerCase();
    const feedback = document.getElementById('answerFeedback');
    
    if (!feedback) {
        alert(input === correct ? '✅ 正确！' : '❌ 错误，答案是: ' + currentListeningSentence.blank);
        return;
    }
    
    feedback.style.display = 'block';
    feedback.classList.remove('hidden');
    
    if (input === correct) {
        feedback.style.background = 'linear-gradient(135deg, rgba(16,185,129,0.1) 0%, rgba(5,150,105,0.1) 100%)';
        feedback.style.border = '2px solid #10b981';
        feedback.style.color = '#065f46';
        feedback.style.padding = '20px';
        feedback.style.borderRadius = '16px';
        feedback.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <span style="background:linear-gradient(135deg,#10b981,#059669);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;">🎉</span>
                <div>
                    <div style="font-size:18px;font-weight:700;color:#065f46;">完全正确！</div>
                    <div style="font-size:14px;color:#047857;">太棒了，继续保持！</div>
                </div>
            </div>
            <div style="background:white;padding:14px;border-radius:12px;font-size:15px;color:#374151;">
                <div style="margin-bottom:8px;">答案: <strong style="color:#10b981;">"${currentListeningSentence.blank}"</strong></div>
                ${currentListeningSentence.meaningCn ? `<div style="font-size:13px;color:#6b7280;">释义: ${currentListeningSentence.meaningCn}</div>` : ''}
            </div>
            <button onclick="markCompletedAndNext()" style="margin-top:16px;width:100%;background:var(--gradient-primary);color:white;border:none;padding:14px;border-radius:12px;font-weight:600;font-size:15px;cursor:pointer;">
                下一题 →
            </button>
        `;
        
        // 标记为已完成
        if (!completedListeningSentences.includes(currentListeningSentence.id)) {
            completedListeningSentences.push(currentListeningSentence.id);
            localStorage.setItem('completedListeningSentences', JSON.stringify(completedListeningSentences));
        }
        
        // 更新今日目标进度
        if (typeof updateDailyProgress === 'function') {
            updateDailyProgress('listening', 1);
        }
        
        updateListeningStats();
    } else {
        feedback.style.background = 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(220,38,38,0.1) 100%)';
        feedback.style.border = '2px solid #f87171';
        feedback.style.color = '#991b1b';
        feedback.style.padding = '20px';
        feedback.style.borderRadius = '16px';
        feedback.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <span style="background:linear-gradient(135deg,#ef4444,#dc2626);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;">💪</span>
                <div>
                    <div style="font-size:18px;font-weight:700;color:#991b1b;">再试一次！</div>
                    <div style="font-size:14px;color:#b91c1c;">正确答案是下面这个哦</div>
                </div>
            </div>
            <div style="background:white;padding:14px;border-radius:12px;margin-bottom:12px;">
                <div style="font-size:14px;color:#6b7280;margin-bottom:6px;">正确答案</div>
                <div style="font-size:16px;font-weight:600;color:#059669;">"${currentListeningSentence.blank}"</div>
                ${currentListeningSentence.meaningCn ? `<div style="font-size:13px;color:#6b7280;margin-top:4px;">释义: ${currentListeningSentence.meaningCn}</div>` : ''}
            </div>
            <div style="background:white;padding:14px;border-radius:12px;">
                <div style="font-size:14px;color:#6b7280;margin-bottom:6px;">完整句子</div>
                <div style="font-size:15px;color:#374151;line-height:1.6;">${currentListeningSentence.sentence}</div>
            </div>
            <button onclick="loadNextListeningSentence()" style="margin-top:16px;width:100%;background:linear-gradient(135deg,#6b7280,#4b5563);color:white;border:none;padding:14px;border-radius:12px;font-weight:600;font-size:15px;cursor:pointer;">
                换一题
            </button>
        `;
    }
}

// 标记完成并进入下一题
function markCompletedAndNext() {
    loadNextListeningSentence();
}

// 刷新/换一个练习
function refreshListening() {
    loadNextListeningSentence();
    if (typeof showToast === 'function') showToast('🔄 已切换新题目');
}

// 重置所有进度
function resetListeningProgress() {
    if (confirm('确定要重置精听训练进度吗？')) {
        completedListeningSentences = [];
        localStorage.setItem('completedListeningSentences', '[]');
        loadNextListeningSentence();
        if (typeof showToast === 'function') showToast('✅ 进度已重置');
    }
}

// 导出函数到全局
window.initListeningModule = initListeningModule;
window.togglePlayEnhanced = togglePlayEnhanced;
window.adjustSpeed = adjustSpeed;
window.checkAnswerEnhanced = checkAnswerEnhanced;
window.loadNextListeningSentence = loadNextListeningSentence;
window.refreshListening = refreshListening;
window.markCompletedAndNext = markCompletedAndNext;
window.resetListeningProgress = resetListeningProgress;
