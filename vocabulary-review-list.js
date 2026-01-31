// 艾宾浩斯遗忘曲线单词复习列表
(function() {
    'use strict';

    // 显示复习列表
    window.showReviewList = function() {
        if (!window.fsrsManager) {
            alert('FSRS系统未初始化');
            return;
        }

        var dueCards = window.fsrsManager.getDueCards();
        var stats = window.fsrsManager.getStats();

        var modal = document.createElement('div');
        modal.id = 'reviewListModal';
        modal.className = 'modal active';
        modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center;';

        var content = '<div style="background:white;border-radius:16px;width:90%;max-width:500px;max-height:85vh;overflow:hidden;display:flex;flex-direction:column;">';
        
        // 头部
        content += '<div style="padding:20px;border-bottom:1px solid #e5e7eb;">';
        content += '<div style="display:flex;justify-content:space-between;align-items:center;">';
        content += '<h2 style="margin:0;font-size:20px;color:#1f2937;">📚 复习列表</h2>';
        content += '<button onclick="closeReviewList()" style="background:none;border:none;font-size:24px;color:#6b7280;cursor:pointer;">×</button>';
        content += '</div>';
        
        // 统计信息
        content += '<div style="display:flex;gap:16px;margin-top:12px;font-size:13px;">';
        content += '<span style="color:#6b7280;">待复习: <strong style="color:#ef4444;">' + dueCards.length + '</strong></span>';
        content += '<span style="color:#6b7280;">总计: <strong style="color:#3b82f6;">' + stats.total + '</strong></span>';
        content += '<span style="color:#6b7280;">已掌握: <strong style="color:#10b981;">' + stats.review + '</strong></span>';
        content += '</div>';
        content += '</div>';

        // 列表内容
        content += '<div style="flex:1;overflow-y:auto;padding:16px;">';
        
        if (dueCards.length === 0) {
            content += '<div style="text-align:center;padding:40px 20px;color:#9ca3af;">';
            content += '<div style="font-size:48px;margin-bottom:12px;">✓</div>';
            content += '<div style="font-size:16px;">暂无需要复习的单词</div>';
            content += '</div>';
        } else {
            dueCards.forEach(function(item, index) {
                var card = item.card;
                var overdueDays = item.overdueDays;
                var urgencyColor = overdueDays > 3 ? '#ef4444' : overdueDays > 1 ? '#f59e0b' : '#3b82f6';
                
                content += '<div style="background:#f9fafb;border-radius:12px;padding:14px;margin-bottom:10px;border-left:4px solid ' + urgencyColor + ';">';
                content += '<div style="display:flex;justify-content:space-between;align-items:start;margin-bottom:8px;">';
                content += '<div style="flex:1;">';
                content += '<div style="font-size:18px;font-weight:600;color:#1f2937;margin-bottom:4px;">' + item.word + '</div>';
                
                // 查找单词释义
                var wordData = window.vocabularyData ? window.vocabularyData.find(function(w) { 
                    return w.word.toLowerCase() === item.word.toLowerCase(); 
                }) : null;
                
                if (wordData) {
                    content += '<div style="font-size:13px;color:#6b7280;">' + wordData.meaningCn + '</div>';
                }
                content += '</div>';
                
                // 逾期标记
                if (overdueDays > 0) {
                    content += '<span style="background:' + urgencyColor + ';color:white;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:600;">逾期' + overdueDays + '天</span>';
                }
                content += '</div>';
                
                // 学习信息
                content += '<div style="display:flex;gap:12px;font-size:12px;color:#9ca3af;">';
                content += '<span>复习' + card.reps + '次</span>';
                content += '<span>难度' + card.difficulty.toFixed(1) + '</span>';
                content += '<span>稳定性' + card.stability.toFixed(1) + '天</span>';
                content += '</div>';
                
                // 复习按钮
                content += '<button onclick="reviewWord(\'' + item.word + '\')" style="margin-top:10px;width:100%;padding:8px;background:#3b82f6;color:white;border:none;border-radius:8px;font-size:13px;font-weight:500;cursor:pointer;">开始复习</button>';
                content += '</div>';
            });
        }
        
        content += '</div>';

        // 底部操作
        content += '<div style="padding:16px;border-top:1px solid #e5e7eb;">';
        if (dueCards.length > 0) {
            content += '<button onclick="startBatchReview()" style="width:100%;padding:12px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:white;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;">开始批量复习 (' + dueCards.length + '个)</button>';
        } else {
            content += '<button onclick="closeReviewList()" style="width:100%;padding:12px;background:#f3f4f6;color:#6b7280;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;">关闭</button>';
        }
        content += '</div>';

        content += '</div>';

        modal.innerHTML = content;
        document.body.appendChild(modal);
    };

    // 关闭复习列表
    window.closeReviewList = function() {
        var modal = document.getElementById('reviewListModal');
        if (modal) modal.remove();
    };

    // 复习单个单词
    window.reviewWord = function(word) {
        closeReviewList();
        
        // 在词汇模块中找到并显示该单词
        if (window.vocabularyData) {
            var wordData = window.vocabularyData.find(function(w) {
                return w.word.toLowerCase() === word.toLowerCase();
            });
            
            if (wordData) {
                // 打开词汇模块并显示该单词
                if (typeof openModule === 'function') {
                    openModule('vocabulary');
                }
                
                // 设置当前单词
                setTimeout(function() {
                    if (window.learningQueue) {
                        window.learningQueue = [wordData];
                        window.currentQueueIndex = 0;
                        if (typeof showCurrentWord === 'function') {
                            showCurrentWord();
                        }
                    }
                }, 300);
            }
        }
    };

    // 开始批量复习
    window.startBatchReview = function() {
        closeReviewList();
        
        var dueCards = window.fsrsManager.getDueCards();
        if (dueCards.length === 0) return;
        
        // 获取需要复习的单词数据
        var reviewWords = [];
        dueCards.forEach(function(item) {
            if (window.vocabularyData) {
                var wordData = window.vocabularyData.find(function(w) {
                    return w.word.toLowerCase() === item.word.toLowerCase();
                });
                if (wordData) {
                    reviewWords.push(wordData);
                }
            }
        });
        
        if (reviewWords.length > 0) {
            // 打开词汇模块
            if (typeof openModule === 'function') {
                openModule('vocabulary');
            }
            
            // 设置复习队列
            setTimeout(function() {
                window.sessionWords = reviewWords;
                window.learningQueue = reviewWords;
                window.currentQueueIndex = 0;
                window.sessionWordProgress = {};
                
                reviewWords.forEach(function(w) {
                    window.sessionWordProgress[w.word] = {
                        times: 0,
                        completed: false
                    };
                });
                
                if (typeof showCurrentWord === 'function') {
                    showCurrentWord();
                }
                if (typeof updateVocabProgress === 'function') {
                    updateVocabProgress();
                }
            }, 300);
        }
    };

    console.log('[复习列表] 已加载');
})();
