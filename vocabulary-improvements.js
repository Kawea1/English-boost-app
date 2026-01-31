// 词汇模块核心改进 - 3个最紧迫问题的解决方案

// ==================== 改进1: 简化学习流程 - 直接显示释义 ====================
// 修改showCurrentWord函数，直接显示释义和评分按钮

// ==================== 改进2: 错题本系统 ====================
var wrongWordsBook = [];
try {
    wrongWordsBook = JSON.parse(localStorage.getItem('wrongWordsBook') || '[]');
} catch(e) {
    wrongWordsBook = [];
}

function addToWrongWordsBook(word, meaningCn) {
    var existing = wrongWordsBook.find(function(w) { return w.word === word; });
    if (!existing) {
        wrongWordsBook.push({
            word: word,
            meaningCn: meaningCn,
            addedAt: Date.now(),
            reviewCount: 0,
            lastReview: null
        });
        localStorage.setItem('wrongWordsBook', JSON.stringify(wrongWordsBook));
    }
}

function showWrongWordsBook() {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    var html = '<div style="background:white;border-radius:16px;width:90%;max-width:500px;max-height:80vh;display:flex;flex-direction:column;">';
    html += '<div style="padding:16px;border-bottom:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">';
    html += '<h3 style="margin:0;font-size:18px;font-weight:700;color:#1f2937;">错题本 (' + wrongWordsBook.length + ')</h3>';
    html += '<button onclick="this.parentElement.parentElement.parentElement.remove()" style="background:none;border:none;font-size:24px;color:#6b7280;cursor:pointer;">×</button>';
    html += '</div>';
    
    html += '<div style="flex:1;overflow-y:auto;padding:16px;">';
    if (wrongWordsBook.length === 0) {
        html += '<div style="text-align:center;padding:40px;color:#9ca3af;">暂无错词</div>';
    } else {
        wrongWordsBook.forEach(function(item) {
            html += '<div style="padding:12px;margin-bottom:8px;background:#fef2f2;border-radius:8px;border-left:3px solid #ef4444;">';
            html += '<div style="font-size:16px;font-weight:600;color:#1f2937;margin-bottom:4px;">' + item.word + '</div>';
            html += '<div style="font-size:13px;color:#6b7280;">' + item.meaningCn + '</div>';
            html += '<div style="font-size:11px;color:#9ca3af;margin-top:4px;">复习' + item.reviewCount + '次</div>';
            html += '</div>';
        });
    }
    html += '</div>';
    
    html += '<div style="padding:16px;border-top:1px solid #e5e7eb;">';
    html += '<button onclick="startWrongWordsReview()" style="width:100%;padding:12px;background:#ef4444;color:white;border:none;border-radius:8px;font-weight:600;cursor:pointer;">开始复习</button>';
    html += '</div>';
    html += '</div>';
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
}

function startWrongWordsReview() {
    // 关闭错题本弹窗
    var overlay = document.querySelector('[style*="z-index:10000"]');
    if (overlay) overlay.remove();
    
    // 设置复习模式
    if (wrongWordsBook.length > 0) {
        alert('错题复习功能开发中');
    }
}

// ==================== 改进3: 可视化学习进度 ====================
function renderProgressRing(completed, total) {
    var percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    var circumference = 2 * Math.PI * 45;
    var offset = circumference * (1 - completed / total);
    
    var html = '<div style="position:relative;width:120px;height:120px;margin:0 auto;">';
    html += '<svg width="120" height="120" style="transform:rotate(-90deg);">';
    html += '<circle cx="60" cy="60" r="45" fill="none" stroke="#e5e7eb" stroke-width="8"/>';
    html += '<circle cx="60" cy="60" r="45" fill="none" stroke="#6366f1" stroke-width="8" stroke-dasharray="' + circumference + '" stroke-dashoffset="' + offset + '" stroke-linecap="round" style="transition:stroke-dashoffset 0.5s ease;"/>';
    html += '</svg>';
    html += '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;">';
    html += '<div style="font-size:32px;font-weight:700;color:#1f2937;">' + percentage + '%</div>';
    html += '<div style="font-size:12px;color:#6b7280;">' + completed + '/' + total + '</div>';
    html += '</div>';
    html += '</div>';
    
    return html;
}

function showProgressDashboard() {
    var completedCount = 0;
    if (typeof sessionWords !== 'undefined' && typeof sessionWordProgress !== 'undefined') {
        sessionWords.forEach(function(w) {
            if (sessionWordProgress[w.word] && sessionWordProgress[w.word].completed) {
                completedCount++;
            }
        });
    }
    
    var total = typeof sessionWords !== 'undefined' ? sessionWords.length : 0;
    
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.6);z-index:10000;display:flex;align-items:center;justify-content:center;';
    
    var html = '<div style="background:white;border-radius:20px;width:90%;max-width:400px;padding:24px;">';
    html += '<h2 style="margin:0 0 20px;text-align:center;font-size:20px;font-weight:700;color:#1f2937;">学习进度</h2>';
    
    html += renderProgressRing(completedCount, total);
    
    html += '<div style="margin-top:24px;display:grid;grid-template-columns:repeat(2,1fr);gap:12px;">';
    html += '<div style="text-align:center;padding:16px;background:#f0fdf4;border-radius:12px;">';
    html += '<div style="font-size:24px;font-weight:700;color:#10b981;">' + completedCount + '</div>';
    html += '<div style="font-size:12px;color:#059669;">已掌握</div>';
    html += '</div>';
    html += '<div style="text-align:center;padding:16px;background:#fef3c7;border-radius:12px;">';
    html += '<div style="font-size:24px;font-weight:700;color:#f59e0b;">' + (total - completedCount) + '</div>';
    html += '<div style="font-size:12px;color:#d97706;">待学习</div>';
    html += '</div>';
    html += '</div>';
    
    html += '<button onclick="this.parentElement.parentElement.remove()" style="width:100%;margin-top:20px;padding:12px;background:#6366f1;color:white;border:none;border-radius:8px;font-weight:600;cursor:pointer;">关闭</button>';
    html += '</div>';
    
    overlay.innerHTML = html;
    document.body.appendChild(overlay);
}

// ==================== 改进4: 增强反馈选项 ====================
function showEnhancedRatingButtons() {
    var html = '<div style="display:flex;gap:8px;margin-top:16px;">';
    
    // 不认识
    html += '<button onclick="rateWord(\'again\')" style="flex:1;padding:12px;background:#fef2f2;border:2px solid #fecaca;border-radius:8px;cursor:pointer;">';
    html += '<div style="font-size:18px;">😫</div>';
    html += '<div style="font-size:12px;color:#dc2626;font-weight:600;">不认识</div>';
    html += '</button>';
    
    // 模糊
    html += '<button onclick="rateWord(\'hard\')" style="flex:1;padding:12px;background:#fef3c7;border:2px solid #fde68a;border-radius:8px;cursor:pointer;">';
    html += '<div style="font-size:18px;">🤔</div>';
    html += '<div style="font-size:12px;color:#d97706;font-weight:600;">模糊</div>';
    html += '</button>';
    
    // 认识
    html += '<button onclick="rateWord(\'good\')" style="flex:1;padding:12px;background:#dcfce7;border:2px solid #bbf7d0;border-radius:8px;cursor:pointer;">';
    html += '<div style="font-size:18px;">😊</div>';
    html += '<div style="font-size:12px;color:#16a34a;font-weight:600;">认识</div>';
    html += '</button>';
    
    html += '</div>';
    
    return html;
}

// 导出函数
window.addToWrongWordsBook = addToWrongWordsBook;
window.showWrongWordsBook = showWrongWordsBook;
window.startWrongWordsReview = startWrongWordsReview;
window.showProgressDashboard = showProgressDashboard;
window.renderProgressRing = renderProgressRing;
window.showEnhancedRatingButtons = showEnhancedRatingButtons;
