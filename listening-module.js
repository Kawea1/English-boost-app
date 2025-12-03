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
    
    // 检查全盘复习模式
    updateListeningForReviewMode();
    
    // 加载下一个句子
    loadNextListeningSentence();
    
    // 更新统计
    updateListeningStats();
}

// 检查是否启用全盘复习模式
function isComprehensiveReviewEnabled() {
    try {
        var settings = JSON.parse(localStorage.getItem('appSettings') || '{}');
        return settings.comprehensiveReviewMode === true;
    } catch(e) {
        return false;
    }
}

// 更新听力模块标题以反映复习模式
function updateListeningForReviewMode() {
    if (isComprehensiveReviewEnabled()) {
        var titleEl = document.getElementById('audioTitle');
        if (titleEl) {
            var badge = document.createElement('span');
            badge.className = 'review-mode-badge';
            badge.innerHTML = '复习模式';
            titleEl.parentNode.insertBefore(badge, titleEl.nextSibling);
        }
    }
}

// 获取可用的听力练习句子（基于已学单词）
function getAvailableListeningSentences() {
    // 检查是否启用全盘复习模式
    var reviewMode = isComprehensiveReviewEnabled();
    
    // 获取已学单词列表
    let learnedWords = [];
    try {
        learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    } catch(e) {
        learnedWords = [];
    }
    
    // 如果是复习模式，只使用今日学习的单词
    if (reviewMode) {
        learnedWords = getTodayWordsForListening();
        if (learnedWords.length === 0) {
            // 没有今日单词，取最近学习的10个
            var wordProgress = {};
            try {
                wordProgress = JSON.parse(localStorage.getItem('wordLearningProgress') || '{}');
            } catch(e) {}
            
            var allLearned = JSON.parse(localStorage.getItem('learnedWords') || '[]');
            learnedWords = allLearned.slice().sort(function(a, b) {
                var aTime = wordProgress[a] ? new Date(wordProgress[a].lastReview || 0).getTime() : 0;
                var bTime = wordProgress[b] ? new Date(wordProgress[b].lastReview || 0).getTime() : 0;
                return bTime - aTime;
            }).slice(0, 10);
        }
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
                        meaningEn: wordData.meaningEn,
                        isReviewWord: reviewMode
                    });
                }
            }
        });
    }
    
    // 如果不是复习模式或基于单词的句子不够，也加入原来的listeningData
    if (!reviewMode && window.listeningData) {
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

// 获取今日学习的单词（用于听力模块）
function getTodayWordsForListening() {
    var today = new Date().toDateString();
    var wordProgress = {};
    try {
        wordProgress = JSON.parse(localStorage.getItem('wordLearningProgress') || '{}');
    } catch(e) {}
    
    var learnedWords = [];
    try {
        learnedWords = JSON.parse(localStorage.getItem('learnedWords') || '[]');
    } catch(e) {}
    
    return learnedWords.filter(function(word) {
        var progress = wordProgress[word];
        if (!progress || !progress.lastReview) return false;
        var reviewDate = new Date(progress.lastReview).toDateString();
        return reviewDate === today;
    });
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
                <div style="font-size:60px;margin-bottom:20px;"><svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#6366f1" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg></div>
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
    
    // 更新标题 - 不暴露答案！
    const titleEl = document.getElementById('audioTitle');
    const descEl = document.getElementById('audioDesc');
    // 生成提示：首字母 + 单词长度
    const hint = blankWord.charAt(0).toUpperCase() + '___  (' + blankWord.length + '个字母)';
    if (titleEl) titleEl.textContent = '精听填词 #' + (completedListeningSentences.length + 1);
    if (descEl) descEl.textContent = '提示: ' + hint;
    
    // 更新填空区域 - 美化样式
    const blankArea = document.getElementById('blankArea');
    if (blankArea) {
        blankArea.innerHTML = `
            <div style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);padding:20px;border-radius:16px;border:1px solid #e2e8f0;margin-bottom:8px;">
                <div style="font-size:16px;line-height:1.8;color:#334155;text-align:center;">
                    <span>${parts[0] || ''}</span>
                    <input type="text" id="blankInput" placeholder="?" autocomplete="off" autocapitalize="off" spellcheck="false"
                        style="border:none;border-bottom:3px solid #6366f1;background:transparent;padding:6px 12px;width:100px;font-size:18px;font-weight:600;margin:0 6px;outline:none;transition:all 0.3s ease;color:#6366f1;text-align:center;" 
                        onfocus="this.style.borderColor='#a855f7';this.placeholder='';" 
                        onblur="this.style.borderColor='#6366f1';this.placeholder='?';"
                        onkeypress="if(event.key==='Enter')checkAnswerEnhanced()">
                    <span>${parts[1] || ''}</span>
                </div>
            </div>
            <p style="text-align:center;font-size:13px;color:#94a3b8;margin:0;">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1.3A7 7 0 0 0 12 2z"/></svg>仔细听音频，输入空白处的单词
            </p>
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
// 缓存高质量语音
let listeningCachedVoices = null;
let listeningPreferredVoice = null;

// 选择最佳语音（优先高质量美式发音）
function selectListeningVoice(voices) {
    // macOS 高质量美式英语语音优先级列表
    const preferredVoices = [
        'Samantha',      // macOS 高质量美式女声
        'Ava',           // macOS 高质量美式女声
        'Allison',       // macOS 高质量美式女声
        'Alex',          // macOS 高质量美式男声
        'Karen',         // macOS 高质量澳式女声（作为备选）
    ];
    
    // 首先尝试找高质量的指定语音
    for (const name of preferredVoices) {
        const voice = voices.find(v => v.name.includes(name) && v.lang.startsWith('en'));
        if (voice) {
            console.log('Listening 选择高质量语音:', voice.name, voice.lang);
            return voice;
        }
    }
    
    // 其次找任何美式英语语音
    const usVoice = voices.find(v => v.lang === 'en-US' || v.lang === 'en_US');
    if (usVoice) {
        console.log('Listening 使用美式语音:', usVoice.name);
        return usVoice;
    }
    
    // 最后找任何英语语音
    const enVoice = voices.find(v => v.lang.startsWith('en'));
    if (enVoice) {
        console.log('Listening 使用英语语音:', enVoice.name);
        return enVoice;
    }
    
    return null;
}

// 获取或加载语音
function getListeningVoice() {
    if (listeningPreferredVoice) return listeningPreferredVoice;
    
    const voices = speechSynthesis.getVoices();
    if (voices.length > 0) {
        listeningCachedVoices = voices;
        listeningPreferredVoice = selectListeningVoice(voices);
        return listeningPreferredVoice;
    }
    return null;
}

function togglePlayEnhanced() {
    if (!currentListeningSentence) {
        if (typeof showToast === 'function') showToast('请先加载练习');
        return;
    }
    
    if ('speechSynthesis' in window) {
        const btn = document.getElementById('playBtn');
        
        if (isPlaying) {
            speechSynthesis.cancel();
            isPlaying = false;
            if (btn) {
                btn.classList.remove('playing');
            }
        } else {
            speechSynthesis.cancel();
            
            const utterance = new SpeechSynthesisUtterance(currentListeningSentence.sentence);
            utterance.lang = 'en-US';
            utterance.rate = playbackSpeed;
            
            // 使用高质量语音
            const voice = getListeningVoice();
            if (voice) {
                utterance.voice = voice;
            }
            
            utterance.onend = function() {
                isPlaying = false;
                if (btn) {
                    btn.classList.remove('playing');
                }
            };
            
            speechSynthesis.speak(utterance);
            isPlaying = true;
            if (btn) {
                btn.classList.add('playing');
            }
            
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
    playbackSpeed = Math.round(playbackSpeed * 10) / 10; // 避免浮点精度问题
    
    const speedDisplay = document.getElementById('speedDisplay');
    if (speedDisplay) {
        speedDisplay.textContent = playbackSpeed.toFixed(1);
    }
    
    // 更新速度条填充
    const speedFill = document.getElementById('speedFill');
    if (speedFill) {
        // 0.5x -> 0%, 1.0x -> 33%, 1.5x -> 67%, 2.0x -> 100%
        const percentage = ((playbackSpeed - 0.5) / 1.5) * 100;
        speedFill.style.width = percentage + '%';
    }
    
    // 如果正在播放，重新播放以应用新速度
    if (isPlaying) {
        speechSynthesis.cancel();
        isPlaying = false;
        const btn = document.getElementById('playBtn');
        if (btn) btn.classList.remove('playing');
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
        alert(input === correct ? '正确！' : '错误，答案是: ' + currentListeningSentence.blank);
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
                <span style="background:linear-gradient(135deg,#10b981,#059669);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg></span>
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
        
        // 获取提示（首字母和长度）
        const blankWord = currentListeningSentence.blank;
        const hint = blankWord.charAt(0) + '___' + ' (' + blankWord.length + '个字母)';
        
        feedback.innerHTML = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <span style="background:linear-gradient(135deg,#ef4444,#dc2626);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="M8 15h8"/><path d="M9 9h.01"/><path d="M15 9h.01"/></svg></span>
                <div>
                    <div style="font-size:18px;font-weight:700;color:#991b1b;">再试一次！</div>
                    <div style="font-size:14px;color:#b91c1c;">不要放弃，仔细听</div>
                </div>
            </div>
            <div style="background:white;padding:14px;border-radius:12px;margin-bottom:12px;">
                <div style="font-size:14px;color:#6b7280;margin-bottom:6px;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V16a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-1.3A7 7 0 0 0 12 2z"/></svg>提示</div>
                <div style="font-size:16px;font-weight:600;color:#6366f1;">${hint}</div>
                ${currentListeningSentence.meaningCn ? `<div style="font-size:13px;color:#6b7280;margin-top:4px;">词义: ${currentListeningSentence.meaningCn}</div>` : ''}
            </div>
            <div style="display:flex;gap:10px;margin-top:16px;">
                <button onclick="document.getElementById('blankInput').value='';document.getElementById('blankInput').focus();document.getElementById('answerFeedback').style.display='none';" style="flex:1;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;padding:14px;border-radius:12px;font-weight:600;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>再试一次
                </button>
                <button onclick="showListeningAnswer()" style="flex:1;background:linear-gradient(135deg,#6b7280,#4b5563);color:white;border:none;padding:14px;border-radius:12px;font-weight:600;font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>看答案
                </button>
            </div>
        `;
    }
}

// 标记完成并进入下一题
function markCompletedAndNext() {
    loadNextListeningSentence();
}

// 显示答案（用户选择看答案时调用）
function showListeningAnswer() {
    if (!currentListeningSentence) return;
    
    const feedback = document.getElementById('answerFeedback');
    if (!feedback) return;
    
    feedback.style.background = 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, rgba(234,88,12,0.1) 100%)';
    feedback.style.border = '2px solid #fbbf24';
    feedback.style.color = '#92400e';
    feedback.innerHTML = `
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
            <span style="background:linear-gradient(135deg,#f59e0b,#d97706);width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="white" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></span>
            <div>
                <div style="font-size:18px;font-weight:700;color:#92400e;">答案揭晓</div>
                <div style="font-size:14px;color:#a16207;">下次继续努力！</div>
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
        <button onclick="loadNextListeningSentence()" style="margin-top:16px;width:100%;background:var(--gradient-primary);color:white;border:none;padding:14px;border-radius:12px;font-weight:600;font-size:15px;cursor:pointer;">
            下一题 →
        </button>
    `;
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
        if (typeof showToast === 'function') showToast('进度已重置');
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
window.showListeningAnswer = showListeningAnswer;
