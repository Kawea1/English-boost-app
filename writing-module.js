/**
 * 写作练习模块 - Writing Practice Module
 * 
 * 功能:
 * - 多种考试题型（托福/GRE/雅思/考研/六级）
 * - 限时写作练习
 * - 智能评分与反馈
 * - 词汇与句型提示
 * - 写作历史记录
 * 
 * Version: 1.0.0
 */

(function() {
    'use strict';

    // ==================== 写作模块状态 ====================
    const WritingModule = {
        currentTopic: null,
        currentType: null,
        timer: null,
        timeRemaining: 0,
        isWriting: false,
        writingHistory: [],
        
        // V2.9: 获取当前学习目标
        getCurrentLearningGoal() {
            if (typeof ActivationSystem !== 'undefined' && ActivationSystem.getLearningGoal) {
                return ActivationSystem.getLearningGoal();
            }
            try {
                const goalData = JSON.parse(localStorage.getItem('eb_learning_goal') || '{}');
                return goalData.goal || null;
            } catch(e) {
                return null;
            }
        },
        
        // V2.9: 根据学习目标获取推荐的写作类型
        getRecommendedWritingType() {
            const goal = this.getCurrentLearningGoal();
            const mapping = {
                'gre': 'gre',
                'toefl': 'toefl',
                'academic': 'gre' // 学术英语推荐GRE写作（分析性写作）
            };
            return mapping[goal] || null;
        },
        
        // 初始化
        init() {
            this.loadHistory();
            this.bindEvents();
            
            // V2.9: 根据学习目标自动选择写作类型
            const recommendedType = this.getRecommendedWritingType();
            if (recommendedType) {
                console.log('✍️ V2.9: 根据学习目标自动选择写作类型:', recommendedType);
                // 高亮推荐的类型
                this.highlightRecommendedType(recommendedType);
            }
            
            console.log('✍️ 写作模块已加载');
        },
        
        // V2.9: 高亮推荐的写作类型
        highlightRecommendedType(type) {
            const typeElements = document.querySelectorAll('.writing-exam-type');
            typeElements.forEach(el => {
                if (el.dataset.type === type) {
                    el.classList.add('recommended');
                    // 添加推荐标签
                    if (!el.querySelector('.recommend-badge')) {
                        const badge = document.createElement('span');
                        badge.className = 'recommend-badge';
                        badge.innerHTML = '推荐';
                        el.appendChild(badge);
                    }
                }
            });
            
            // 添加推荐样式
            this.addRecommendStyles();
        },
        
        // V2.9: 添加推荐样式
        addRecommendStyles() {
            if (document.getElementById('writing-recommend-styles')) return;
            
            const style = document.createElement('style');
            style.id = 'writing-recommend-styles';
            style.textContent = `
                .writing-exam-type.recommended {
                    border: 2px solid #6366f1 !important;
                    box-shadow: 0 0 15px rgba(99, 102, 241, 0.3) !important;
                    position: relative;
                }
                .writing-exam-type.recommended::after {
                    content: '✨';
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    font-size: 16px;
                }
                .recommend-badge {
                    position: absolute;
                    top: 5px;
                    right: 5px;
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    color: white;
                    font-size: 10px;
                    padding: 2px 6px;
                    border-radius: 10px;
                    font-weight: 600;
                }
            `;
            document.head.appendChild(style);
        },
        
        // 加载历史记录
        loadHistory() {
            const saved = localStorage.getItem('writingHistory');
            this.writingHistory = saved ? JSON.parse(saved) : [];
        },
        
        // 保存历史记录
        saveHistory() {
            localStorage.setItem('writingHistory', JSON.stringify(this.writingHistory));
        },
        
        // 绑定事件
        bindEvents() {
            // 考试类型选择
            document.querySelectorAll('.writing-exam-type').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.selectExamType(e.target.dataset.type);
                });
            });
        },
        
        // 选择考试类型
        selectExamType(type) {
            this.currentType = type;
            this.showTopicList(type);
        },
        
        // V2.10: 获取学习目标专属的写作提示
        getGoalWritingTips() {
            const goal = this.getCurrentLearningGoal();
            const tips = {
                'gre': {
                    focus: 'GRE分析性写作',
                    advice: [
                        '注重论证的逻辑性和条理性',
                        '使用高级词汇展示语言能力',
                        '分析论点的前提假设和逻辑漏洞',
                        '提供具体例子支持观点'
                    ]
                },
                'toefl': {
                    focus: '托福综合写作',
                    advice: [
                        '准确概括阅读和听力材料要点',
                        '清晰对比材料中的不同观点',
                        '使用适当的过渡词连接段落',
                        '控制好时间分配'
                    ]
                },
                'academic': {
                    focus: '学术论文写作',
                    advice: [
                        '使用正式的学术语言',
                        '引用证据支持论点',
                        '保持客观中立的语气',
                        '注意论文结构规范'
                    ]
                }
            };
            return tips[goal] || null;
        },
        
        // 显示题目列表
        showTopicList(examType) {
            const container = document.getElementById('writing-topic-list');
            if (!container) return;
            
            let topics = [];
            let typeName = '';
            
            switch(examType) {
                case 'toefl':
                    topics = [...(window.TOEFL_INTEGRATED_TOPICS || []), ...(window.TOEFL_DISCUSSION_TOPICS || [])];

                    typeName = 'TOEFL';
                    break;
                case 'gre':
                    topics = [...(window.GRE_ISSUE_TOPICS || []), ...(window.GRE_ARGUMENT_TOPICS || [])];
                    typeName = 'GRE';
                    break;
                case 'ielts':
                    topics = [...(window.IELTS_TASK1_TOPICS || []), ...(window.IELTS_TASK2_TOPICS || [])];
                    typeName = '雅思';
                    break;
                case 'kaoyan':
                    topics = window.KAOYAN_TOPICS || [];
                    typeName = '考研';
                    break;
                case 'academic':
                    topics = window.ACADEMIC_WRITING_TOPICS || [];
                    typeName = '学术英语';
                    break;
            }
            
            if (topics.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📝</div>
                        <p>暂无${typeName}写作题目</p>
                        <p class="text-muted">题目正在准备中...</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = topics.map((topic, index) => `
                <div class="writing-topic-card" onclick="WritingModule.startWriting('${topic.id}', '${examType}')">
                    <div class="topic-header">
                        <span class="topic-number">#${index + 1}</span>
                        <span class="topic-type">${this.getTypeLabel(topic.type)}</span>
                        <span class="topic-difficulty ${topic.difficulty}">${this.getDifficultyLabel(topic.difficulty)}</span>
                    </div>
                    <h3 class="topic-title">${topic.title}</h3>
                    <div class="topic-meta">
                        <span><i class="icon-clock"></i> ${Math.floor(topic.timeLimit / 60)}分钟</span>
                        <span><i class="icon-text"></i> ${topic.wordCount.min}-${topic.wordCount.max}词</span>
                        <span><i class="icon-tag"></i> ${this.getCategoryLabel(topic.topic)}</span>
                    </div>
                    ${this.getTopicProgress(topic.id)}
                </div>
            `).join('');
        },
        
        // 获取题目进度
        getTopicProgress(topicId) {
            const history = this.writingHistory.find(h => h.topicId === topicId);
            if (history) {
                return `<div class="topic-progress completed">
                    <span class="progress-icon">✓</span>
                    <span>已完成 - 得分: ${history.score || '--'}</span>
                </div>`;
            }
            return '<div class="topic-progress">未完成</div>';
        },
        
        // 获取类型标签
        getTypeLabel(type) {
            const labels = {
                'toefl_integrated': '综合写作',
                'toefl_discussion': '学术讨论',
                'gre_issue': 'Issue分析',
                'gre_argument': 'Argument分析',
                'ielts_task1_line': '线图描述',
                'ielts_task1_bar': '柱状图',
                'ielts_task1_pie': '饼图',
                'ielts_task1_table': '表格',
                'ielts_task2': '议论文',
                'kaoyan_application': '应用文',
                'kaoyan_picture': '图画作文',
                'kaoyan_chart': '图表作文',
                'academic_paper': '学术论文',
                'academic_abstract': '研究摘要',
                'academic_review': '文献综述'
            };
            return labels[type] || type;
        },
        
        // 获取难度标签
        getDifficultyLabel(difficulty) {
            const labels = {
                'basic': '基础',
                'intermediate': '中级',
                'advanced': '高级'
            };
            return labels[difficulty] || difficulty;
        },
        
        // 获取分类标签
        getCategoryLabel(category) {
            const labels = {
                'education': '教育',
                'technology': '科技',
                'environment': '环境',
                'society': '社会',
                'economy': '经济',
                'culture': '文化',
                'health': '健康',
                'science': '科学',
                'history': '历史',
                'government': '政策',
                'media': '媒体',
                'arts': '艺术',
                'business': '商业',
                'psychology': '心理'
            };
            return labels[category] || category;
        },
        
        // 开始写作
        startWriting(topicId, examType) {
            // 查找题目
            let topic = this.findTopic(topicId, examType);
            if (!topic) {
                alert('题目未找到');
                return;
            }
            
            this.currentTopic = topic;
            this.timeRemaining = topic.timeLimit;
            this.isWriting = true;
            
            // 显示写作界面
            this.showWritingInterface(topic);
        },
        
        // 查找题目
        findTopic(topicId, examType) {
            const allTopics = {
                'toefl': [...(window.TOEFL_INTEGRATED_TOPICS || []), ...(window.TOEFL_DISCUSSION_TOPICS || [])],
                'gre': [...(window.GRE_ISSUE_TOPICS || []), ...(window.GRE_ARGUMENT_TOPICS || [])],
                'ielts': [...(window.IELTS_TASK1_TOPICS || []), ...(window.IELTS_TASK2_TOPICS || [])],
                'kaoyan': window.KAOYAN_TOPICS || [],
                'academic': window.ACADEMIC_WRITING_TOPICS || []
            };
            
            const topics = allTopics[examType] || [];
            return topics.find(t => t.id === topicId);
        },
        
        // 显示写作界面
        showWritingInterface(topic) {
            const writingArea = document.getElementById('writing-practice-area');
            if (!writingArea) return;
            
            // 根据题型显示不同内容
            let materialHtml = '';
            
            if (topic.type === 'toefl_integrated') {
                materialHtml = `
                    <div class="writing-material">
                        <div class="material-tabs">
                            <button class="material-tab active" onclick="WritingModule.showMaterial('reading')">阅读材料</button>
                            <button class="material-tab" onclick="WritingModule.showMaterial('lecture')">听力要点</button>
                        </div>
                        <div class="material-content" id="material-reading">
                            <div class="material-text">${topic.reading.text}</div>
                        </div>
                        <div class="material-content hidden" id="material-lecture">
                            <div class="material-text">${topic.lecture.transcript}</div>
                        </div>
                    </div>
                `;
            } else if (topic.type === 'toefl_discussion') {
                materialHtml = `
                    <div class="writing-material">
                        <div class="professor-question">
                            <div class="professor-avatar">👨‍🏫</div>
                            <div class="professor-content">
                                <div class="professor-name">${topic.professorQuestion.name}</div>
                                <p>${topic.professorQuestion.context}</p>
                                <p class="question-text">${topic.professorQuestion.question}</p>
                            </div>
                        </div>
                        ${topic.studentResponses ? `
                            <div class="student-responses">
                                ${topic.studentResponses.map(s => `
                                    <div class="student-response">
                                        <div class="student-avatar">${s.name.charAt(0)}</div>
                                        <div class="student-content">
                                            <div class="student-name">${s.name}</div>
                                            <p>${s.response}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        ` : ''}
                    </div>
                `;
            } else if (topic.type.startsWith('gre_')) {
                materialHtml = `
                    <div class="writing-material">
                        <div class="gre-prompt">
                            <h4>Prompt:</h4>
                            <p class="prompt-text">${topic.prompt || topic.statement}</p>
                            ${topic.instructions ? `<p class="prompt-instructions">${topic.instructions}</p>` : ''}
                        </div>
                    </div>
                `;
            }
            
            writingArea.innerHTML = `
                <div class="writing-header">
                    <button class="back-btn" onclick="WritingModule.exitWriting()">
                        <span class="back-icon">←</span> 返回
                    </button>
                    <div class="writing-timer" id="writing-timer">
                        <span class="timer-icon">⏱</span>
                        <span class="timer-value">${this.formatTime(topic.timeLimit)}</span>
                    </div>
                    <div class="word-count" id="word-count">
                        <span>0</span>/${topic.wordCount.min}-${topic.wordCount.max}词
                    </div>
                </div>
                
                <div class="writing-title">
                    <span class="type-badge">${this.getTypeLabel(topic.type)}</span>
                    <h2>${topic.title}</h2>
                </div>
                
                ${materialHtml}
                
                <div class="writing-prompt">
                    <h4>写作要求:</h4>
                    <p>${topic.prompt}</p>
                </div>
                
                <div class="writing-editor">
                    <textarea 
                        id="writing-textarea" 
                        placeholder="在此输入你的作文..."
                        oninput="WritingModule.updateWordCount()"
                    ></textarea>
                </div>
                
                <div class="writing-tools">
                    <button class="tool-btn" onclick="WritingModule.showVocabulary()">
                        <span>📚</span> 推荐词汇
                    </button>
                    <button class="tool-btn" onclick="WritingModule.showTemplates()">
                        <span>📝</span> 句型模板
                    </button>
                    <button class="tool-btn" onclick="WritingModule.showSample()">
                        <span>💡</span> 范文参考
                    </button>
                </div>
                
                <div class="writing-actions">
                    <button class="btn-secondary" onclick="WritingModule.saveDraft()">保存草稿</button>
                    <button class="btn-primary" onclick="WritingModule.submitWriting()">提交作文</button>
                </div>
            `;
            
            // 显示写作界面
            document.getElementById('writing-main').classList.add('hidden');
            writingArea.classList.remove('hidden');
            
            // 启动计时器
            this.startTimer();
        },
        
        // 切换材料显示
        showMaterial(type) {
            document.querySelectorAll('.material-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.material-content').forEach(content => {
                content.classList.add('hidden');
            });
            
            document.querySelector(`.material-tab[onclick*="${type}"]`).classList.add('active');
            document.getElementById(`material-${type}`).classList.remove('hidden');
        },
        
        // 启动计时器
        startTimer() {
            if (this.timer) clearInterval(this.timer);
            
            this.timer = setInterval(() => {
                this.timeRemaining--;
                
                const timerEl = document.getElementById('writing-timer');
                if (timerEl) {
                    timerEl.querySelector('.timer-value').textContent = this.formatTime(this.timeRemaining);
                    
                    if (this.timeRemaining <= 300) { // 最后5分钟
                        timerEl.classList.add('warning');
                    }
                    if (this.timeRemaining <= 60) { // 最后1分钟
                        timerEl.classList.add('danger');
                    }
                }
                
                if (this.timeRemaining <= 0) {
                    this.timeUp();
                }
            }, 1000);
        },
        
        // 格式化时间
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },
        
        // 时间到
        timeUp() {
            clearInterval(this.timer);
            alert('⏰ 时间到！请提交你的作文。');
            this.submitWriting();
        },
        
        // 更新字数统计
        updateWordCount() {
            const textarea = document.getElementById('writing-textarea');
            if (!textarea) return;
            
            const text = textarea.value.trim();
            const wordCount = text ? text.split(/\s+/).length : 0;
            
            const countEl = document.getElementById('word-count');
            if (countEl) {
                countEl.querySelector('span').textContent = wordCount;
                
                const minWords = this.currentTopic.wordCount.min;
                const maxWords = this.currentTopic.wordCount.max;
                
                countEl.classList.remove('under', 'over', 'good');
                if (wordCount < minWords) {
                    countEl.classList.add('under');
                } else if (wordCount > maxWords) {
                    countEl.classList.add('over');
                } else {
                    countEl.classList.add('good');
                }
            }
        },
        
        // 显示推荐词汇
        showVocabulary() {
            if (!this.currentTopic || !this.currentTopic.vocabulary) {
                alert('暂无推荐词汇');
                return;
            }
            
            const modal = this.createModal('推荐词汇', `
                <div class="vocabulary-list">
                    ${this.currentTopic.vocabulary.map(word => `
                        <div class="vocab-item" onclick="WritingModule.insertWord('${word}')">
                            <span class="vocab-word">${word}</span>
                        </div>
                    `).join('')}
                </div>
                <p class="vocab-hint">点击词汇可插入到作文中</p>
            `);
            document.body.appendChild(modal);
        },
        
        // 显示句型模板
        showTemplates() {
            const templates = window.WRITING_TEMPLATES || {};
            
            const modal = this.createModal('句型模板', `
                <div class="template-sections">
                    <div class="template-section">
                        <h4>开头段</h4>
                        ${(templates.introductions?.opinion || []).slice(0, 3).map(t => `
                            <div class="template-item" onclick="WritingModule.insertTemplate('${t.replace(/'/g, "\\'")}')">
                                ${t}
                            </div>
                        `).join('')}
                    </div>
                    <div class="template-section">
                        <h4>过渡词</h4>
                        <div class="transition-words">
                            ${Object.entries(templates.transitions || {}).map(([type, words]) => `
                                <div class="transition-group">
                                    <span class="group-label">${this.getTransitionLabel(type)}:</span>
                                    ${words.slice(0, 3).map(w => `<span class="transition-word" onclick="WritingModule.insertWord('${w}, ')">${w}</span>`).join('')}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="template-section">
                        <h4>结尾段</h4>
                        ${(templates.conclusions?.opinion || []).slice(0, 2).map(t => `
                            <div class="template-item" onclick="WritingModule.insertTemplate('${t.replace(/'/g, "\\'")}')">
                                ${t}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `);
            document.body.appendChild(modal);
        },
        
        // 获取过渡词类型标签
        getTransitionLabel(type) {
            const labels = {
                'addition': '递进',
                'contrast': '转折',
                'example': '举例',
                'cause_effect': '因果',
                'concession': '让步'
            };
            return labels[type] || type;
        },
        
        // 显示范文
        showSample() {
            if (!this.currentTopic || !this.currentTopic.sampleResponse) {
                alert('暂无范文参考');
                return;
            }
            
            const modal = this.createModal('范文参考', `
                <div class="sample-response">
                    <div class="sample-warning">
                        ⚠️ 建议先完成写作再查看范文
                    </div>
                    <div class="sample-text">${this.currentTopic.sampleResponse}</div>
                    ${this.currentTopic.keyPoints ? `
                        <div class="key-points">
                            <h4>关键要点:</h4>
                            <ul>
                                ${this.currentTopic.keyPoints.map(p => `<li>${p}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `);
            document.body.appendChild(modal);
        },
        
        // 创建模态框
        createModal(title, content) {
            const modal = document.createElement('div');
            modal.className = 'writing-modal-overlay';
            modal.innerHTML = `
                <div class="writing-modal">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" onclick="this.closest('.writing-modal-overlay').remove()">×</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            `;
            return modal;
        },
        
        // 插入词汇
        insertWord(word) {
            const textarea = document.getElementById('writing-textarea');
            if (textarea) {
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const text = textarea.value;
                textarea.value = text.substring(0, start) + word + text.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + word.length;
                textarea.focus();
                this.updateWordCount();
            }
        },
        
        // 插入模板
        insertTemplate(template) {
            const textarea = document.getElementById('writing-textarea');
            if (textarea) {
                if (textarea.value) {
                    textarea.value += '\n\n' + template;
                } else {
                    textarea.value = template;
                }
                textarea.focus();
                this.updateWordCount();
            }
            document.querySelector('.writing-modal-overlay')?.remove();
        },
        
        // 保存草稿
        saveDraft() {
            const textarea = document.getElementById('writing-textarea');
            if (!textarea || !this.currentTopic) return;
            
            const draft = {
                topicId: this.currentTopic.id,
                content: textarea.value,
                timeRemaining: this.timeRemaining,
                savedAt: new Date().toISOString()
            };
            
            localStorage.setItem(`writing_draft_${this.currentTopic.id}`, JSON.stringify(draft));
            
            this.showToast('草稿已保存 ✓');
        },
        
        // 提交作文
        submitWriting() {
            clearInterval(this.timer);
            
            const textarea = document.getElementById('writing-textarea');
            if (!textarea || !this.currentTopic) return;
            
            const content = textarea.value.trim();
            if (!content) {
                alert('请先写入内容');
                return;
            }
            
            const wordCount = content.split(/\s+/).length;
            
            // 使用增强版 AI 评分系统
            let aiAnalysis = null;
            if (window.WritingAI && window.WritingAI.scoreAcademicWriting) {
                aiAnalysis = window.WritingAI.scoreAcademicWriting(content, this.currentTopic);
            }
            
            // 获取分数（优先使用 AI 评分）
            const score = aiAnalysis ? aiAnalysis.overallScore : this.calculateScore(content, this.currentTopic);
            
            // 保存记录
            const record = {
                topicId: this.currentTopic.id,
                topicTitle: this.currentTopic.title,
                type: this.currentTopic.type,
                content: content,
                wordCount: wordCount,
                score: score,
                aiAnalysis: aiAnalysis,
                timeUsed: this.currentTopic.timeLimit - this.timeRemaining,
                submittedAt: new Date().toISOString()
            };
            
            this.writingHistory.unshift(record);
            if (this.writingHistory.length > 50) {
                this.writingHistory = this.writingHistory.slice(0, 50);
            }
            this.saveHistory();
            
            // 删除草稿
            localStorage.removeItem(`writing_draft_${this.currentTopic.id}`);
            
            // 显示结果
            this.showResult(record);
        },
        
        // 计算评分 (简单评分算法)
        calculateScore(content, topic) {
            let score = 0;
            const wordCount = content.split(/\s+/).length;
            const minWords = topic.wordCount.min;
            const maxWords = topic.wordCount.max;
            
            // 字数评分 (30分)
            if (wordCount >= minWords && wordCount <= maxWords) {
                score += 30;
            } else if (wordCount >= minWords * 0.8) {
                score += 20;
            } else if (wordCount >= minWords * 0.5) {
                score += 10;
            }
            
            // 词汇使用 (25分)
            if (topic.vocabulary) {
                const usedVocab = topic.vocabulary.filter(v => 
                    content.toLowerCase().includes(v.toLowerCase())
                ).length;
                score += Math.min(25, usedVocab * 5);
            } else {
                score += 15; // 默认分
            }
            
            // 段落结构 (25分)
            const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
            if (paragraphs.length >= 3) {
                score += 25;
            } else if (paragraphs.length >= 2) {
                score += 15;
            } else {
                score += 5;
            }
            
            // 句子多样性 (20分)
            const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
            const avgLength = sentences.reduce((sum, s) => sum + s.split(/\s+/).length, 0) / sentences.length;
            if (avgLength >= 12 && avgLength <= 25) {
                score += 20;
            } else if (avgLength >= 8) {
                score += 10;
            }
            
            return Math.min(100, score);
        },
        
        // 显示结果
        showResult(record) {
            const writingArea = document.getElementById('writing-practice-area');
            if (!writingArea) return;
            
            const timeUsedMins = Math.floor(record.timeUsed / 60);
            const timeUsedSecs = record.timeUsed % 60;
            
            // 生成 AI 分析内容
            let aiAnalysisHTML = '';
            if (record.aiAnalysis) {
                const ai = record.aiAnalysis;
                
                // 维度分数
                const dimensionHTML = `
                    <div class="ai-dimensions">
                        <h4>📊 各维度评分</h4>
                        <div class="dimension-grid">
                            <div class="dimension-item">
                                <div class="dim-label">结构组织</div>
                                <div class="dim-score">${ai.dimensions.structure.score}/${ai.dimensions.structure.maxScore}</div>
                                <div class="dim-bar"><div class="dim-fill" style="width: ${ai.dimensions.structure.score / ai.dimensions.structure.maxScore * 100}%"></div></div>
                            </div>
                            <div class="dimension-item">
                                <div class="dim-label">论证分析</div>
                                <div class="dim-score">${ai.dimensions.argumentation.score}/${ai.dimensions.argumentation.maxScore}</div>
                                <div class="dim-bar"><div class="dim-fill" style="width: ${ai.dimensions.argumentation.score / ai.dimensions.argumentation.maxScore * 100}%"></div></div>
                            </div>
                            <div class="dimension-item">
                                <div class="dim-label">语言表达</div>
                                <div class="dim-score">${ai.dimensions.language.score}/${ai.dimensions.language.maxScore}</div>
                                <div class="dim-bar"><div class="dim-fill" style="width: ${ai.dimensions.language.score / ai.dimensions.language.maxScore * 100}%"></div></div>
                            </div>
                            <div class="dimension-item">
                                <div class="dim-label">学术规范</div>
                                <div class="dim-score">${ai.dimensions.academic.score}/${ai.dimensions.academic.maxScore}</div>
                                <div class="dim-bar"><div class="dim-fill" style="width: ${ai.dimensions.academic.score / ai.dimensions.academic.maxScore * 100}%"></div></div>
                            </div>
                        </div>
                    </div>
                `;
                
                // 段落分析
                let paragraphHTML = '';
                if (ai.paragraphAnalysis && ai.paragraphAnalysis.length > 0) {
                    paragraphHTML = `
                        <div class="ai-paragraphs">
                            <h4>📝 段落分析</h4>
                            ${ai.paragraphAnalysis.map((para, idx) => {
                                const posLabel = para.position === 'introduction' ? '引言段' : 
                                                para.position === 'conclusion' ? '结论段' : `主体段${idx}`;
                                const scoreClass = para.score >= 80 ? 'score-good' : para.score >= 60 ? 'score-warning' : 'score-error';
                                
                                let issuesList = '';
                                if (para.issues.length > 0) {
                                    issuesList = para.issues.map(issue => `
                                        <div class="para-issue">
                                            <span class="issue-badge">⚠️</span>
                                            <span class="issue-msg">${issue.message}</span>
                                            ${issue.instances ? `<span class="issue-example">${issue.instances.slice(0, 2).join(', ')}</span>` : ''}
                                            ${issue.suggestion ? `<div class="issue-tip">💡 ${issue.suggestion}</div>` : ''}
                                        </div>
                                    `).join('');
                                }
                                
                                let strengthsList = '';
                                if (para.strengths.length > 0) {
                                    strengthsList = para.strengths.map(s => `<span class="strength-tag">✓ ${s}</span>`).join('');
                                }
                                
                                return `
                                    <div class="para-analysis ${scoreClass}">
                                        <div class="para-header">
                                            <span class="para-name">${posLabel}</span>
                                            <span class="para-score-badge ${scoreClass}">${para.score}分</span>
                                            <span class="para-words">${para.wordCount}词</span>
                                        </div>
                                        ${strengthsList ? `<div class="para-strengths">${strengthsList}</div>` : ''}
                                        ${issuesList ? `<div class="para-issues">${issuesList}</div>` : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                }
                
                // 最需要改进的段落
                let weakestHTML = '';
                if (ai.weakestParagraph) {
                    weakestHTML = `
                        <div class="ai-priority">
                            <h4>🎯 优先改进</h4>
                            <div class="priority-card">
                                <div class="priority-header">
                                    <span class="priority-icon">📍</span>
                                    <span class="priority-title">第${ai.weakestParagraph.index}段需要重点修改</span>
                                    <span class="priority-score">${ai.weakestParagraph.score}分</span>
                                </div>
                                <div class="priority-issues">
                                    ${ai.weakestParagraph.mainIssues.map(i => `<div class="priority-issue">• ${i.message}</div>`).join('')}
                                </div>
                            </div>
                        </div>
                    `;
                }
                
                // 优缺点总结
                let summaryHTML = '';
                if (ai.strengths.length > 0 || ai.weaknesses.length > 0) {
                    summaryHTML = `
                        <div class="ai-summary">
                            <div class="summary-col">
                                <h5>✅ 优点</h5>
                                <ul>${ai.strengths.slice(0, 4).map(s => `<li>${s}</li>`).join('') || '<li>继续努力!</li>'}</ul>
                            </div>
                            <div class="summary-col">
                                <h5>⚠️ 待改进</h5>
                                <ul>${ai.weaknesses.slice(0, 4).map(w => `<li>${w}</li>`).join('') || '<li>表现不错!</li>'}</ul>
                            </div>
                        </div>
                    `;
                }
                
                aiAnalysisHTML = `
                    <div class="ai-analysis-section">
                        <div class="ai-analysis-header">
                            <span class="ai-icon">🤖</span>
                            <span class="ai-title">AI 智能评分分析</span>
                        </div>
                        ${dimensionHTML}
                        ${weakestHTML}
                        ${paragraphHTML}
                        ${summaryHTML}
                    </div>
                `;
            }
            
            writingArea.innerHTML = `
                <div class="writing-result">
                    <div class="result-header">
                        <div class="result-icon">🎉</div>
                        <h2>作文已提交</h2>
                    </div>
                    
                    <div class="result-score">
                        <div class="score-circle">
                            <span class="score-value">${record.score}</span>
                            <span class="score-label">分</span>
                        </div>
                        <div class="score-grade">${record.aiAnalysis ? record.aiAnalysis.grade : this.getGrade(record.score)}</div>
                    </div>
                    
                    <div class="result-stats">
                        <div class="stat-item">
                            <span class="stat-icon">📝</span>
                            <span class="stat-value">${record.wordCount}</span>
                            <span class="stat-label">词数</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">⏱</span>
                            <span class="stat-value">${timeUsedMins}:${timeUsedSecs.toString().padStart(2, '0')}</span>
                            <span class="stat-label">用时</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-icon">📊</span>
                            <span class="stat-value">${record.aiAnalysis ? record.aiAnalysis.paragraphCount : '-'}</span>
                            <span class="stat-label">段落</span>
                        </div>
                    </div>
                    
                    ${aiAnalysisHTML || `
                        <div class="result-feedback">
                            <h4>评分反馈</h4>
                            <ul>
                                ${this.getFeedback(record)}
                            </ul>
                        </div>
                    `}
                    
                    <div class="result-content">
                        <h4>你的作文</h4>
                        <div class="content-text">${record.content.replace(/\n/g, '<br>')}</div>
                    </div>
                    
                    ${this.currentTopic.sampleResponse ? `
                        <div class="result-sample">
                            <h4>范文参考</h4>
                            <div class="sample-text">${this.currentTopic.sampleResponse}</div>
                        </div>
                    ` : ''}
                    
                    <div class="result-actions">
                        <button class="btn-secondary" onclick="WritingModule.exitWriting()">返回列表</button>
                        <button class="btn-primary" onclick="WritingModule.startWriting('${record.topicId}', '${this.currentType}')">重新练习</button>
                    </div>
                </div>
            `;
        },
        
        // 获取等级
        getGrade(score) {
            if (score >= 90) return '优秀 A';
            if (score >= 80) return '良好 B';
            if (score >= 70) return '中等 C';
            if (score >= 60) return '及格 D';
            return '需努力 F';
        },
        
        // 获取反馈
        getFeedback(record) {
            const feedback = [];
            const topic = this.currentTopic;
            
            // 字数反馈
            if (record.wordCount >= topic.wordCount.min && record.wordCount <= topic.wordCount.max) {
                feedback.push('<li class="good">✓ 字数符合要求</li>');
            } else if (record.wordCount < topic.wordCount.min) {
                feedback.push(`<li class="warning">⚠ 字数偏少，建议至少${topic.wordCount.min}词</li>`);
            } else {
                feedback.push(`<li class="warning">⚠ 字数过多，建议控制在${topic.wordCount.max}词以内</li>`);
            }
            
            // 段落反馈
            const paragraphs = record.content.split(/\n\n+/).filter(p => p.trim());
            if (paragraphs.length >= 3) {
                feedback.push('<li class="good">✓ 段落结构清晰</li>');
            } else {
                feedback.push('<li class="warning">⚠ 建议分3-4个段落</li>');
            }
            
            // 词汇反馈
            if (topic.vocabulary) {
                const usedVocab = topic.vocabulary.filter(v => 
                    record.content.toLowerCase().includes(v.toLowerCase())
                );
                if (usedVocab.length >= 3) {
                    feedback.push(`<li class="good">✓ 使用了${usedVocab.length}个推荐词汇</li>`);
                } else {
                    feedback.push('<li class="info">💡 尝试使用更多高级词汇</li>');
                }
            }
            
            return feedback.join('');
        },
        
        // 退出写作
        exitWriting() {
            clearInterval(this.timer);
            this.isWriting = false;
            this.currentTopic = null;
            
            document.getElementById('writing-practice-area')?.classList.add('hidden');
            document.getElementById('writing-main')?.classList.remove('hidden');
        },
        
        // 显示历史记录
        showHistory() {
            const container = document.getElementById('writing-history-list');
            if (!container) return;
            
            if (this.writingHistory.length === 0) {
                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📋</div>
                        <p>暂无写作记录</p>
                        <p class="text-muted">完成练习后会在这里显示</p>
                    </div>
                `;
                return;
            }
            
            container.innerHTML = this.writingHistory.slice(0, 20).map(record => `
                <div class="history-item">
                    <div class="history-info">
                        <h4>${record.topicTitle}</h4>
                        <div class="history-meta">
                            <span>${this.getTypeLabel(record.type)}</span>
                            <span>${record.wordCount}词</span>
                            <span>${new Date(record.submittedAt).toLocaleDateString()}</span>
                        </div>
                    </div>
                    <div class="history-score">
                        <span class="score">${record.score}</span>
                        <span class="label">分</span>
                    </div>
                </div>
            `).join('');
        },
        
        // 显示提示
        showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'writing-toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => toast.classList.add('show'), 10);
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 300);
            }, 2000);
        }
    };

    // 暴露到全局
    window.WritingModule = WritingModule;
    
    // V1.1-V1.5: 增强初始化，确保模块可进入
    function initWritingModule() {
        console.log('✍️ V1.1: 初始化写作模块...');
        
        // V1.2: 确保模块元素存在
        const moduleEl = document.getElementById('writing-module');
        if (!moduleEl) {
            console.error('❌ V1.2: 写作模块元素不存在');
            return;
        }
        
        // V1.3: 初始化模块
        WritingModule.init();
        
        // V1.4: 绑定返回按钮
        const backBtn = moduleEl.querySelector('.back-btn');
        if (backBtn) {
            backBtn.onclick = function() {
                console.log('✍️ V1.4: 关闭写作模块');
                moduleEl.classList.add('hidden');
                // 显示底部导航
                const bottomNav = document.getElementById('bottomNav');
                if (bottomNav) bottomNav.classList.remove('hidden');
            };
        }
        
        console.log('✅ V1.5: 写作模块初始化完成');
    }
    
    // 页面加载后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initWritingModule);
    } else {
        initWritingModule();
    }
    
})();
