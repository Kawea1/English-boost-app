// ==================== 用户体验增强模块 v1-v5 ====================
// 让用户爱上这款软件的高级交互体验

(function() {
    'use strict';
    
    // ========== 版本1: 微交互与动画增强 ==========
    
    // 触觉反馈系统（支持所有平台）
    const HapticFeedback = {
        // 检测是否支持震动
        isSupported: 'vibrate' in navigator,
        
        // 轻触反馈
        light() {
            if (this.isSupported) navigator.vibrate(10);
            this.playSound('tap');
        },
        
        // 中等反馈
        medium() {
            if (this.isSupported) navigator.vibrate(20);
            this.playSound('click');
        },
        
        // 成功反馈
        success() {
            if (this.isSupported) navigator.vibrate([10, 50, 10]);
            this.playSound('success');
        },
        
        // 错误反馈
        error() {
            if (this.isSupported) navigator.vibrate([50, 100, 50]);
            this.playSound('error');
        },
        
        // 播放音效（可选）
        playSound(type) {
            if (!window.uxSettings?.soundEnabled) return;
            // 使用 Web Audio API 生成简单音效
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                const sounds = {
                    tap: { freq: 800, duration: 0.05 },
                    click: { freq: 600, duration: 0.08 },
                    success: { freq: 880, duration: 0.15 },
                    error: { freq: 300, duration: 0.2 }
                };
                
                const sound = sounds[type] || sounds.tap;
                osc.frequency.value = sound.freq;
                gain.gain.value = 0.1;
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + sound.duration);
                
                osc.start();
                osc.stop(ctx.currentTime + sound.duration);
            } catch (e) {}
        }
    };
    
    // 涟漪效果（Material Design风格）
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        ripple.className = 'ux-ripple';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => ripple.remove());
    }
    
    // 按钮弹跳效果
    function addBounceEffect(element) {
        element.classList.add('ux-bounce');
        setTimeout(() => element.classList.remove('ux-bounce'), 300);
    }
    
    // 卡片翻转效果
    function addFlipEffect(element) {
        element.classList.add('ux-flip');
        setTimeout(() => element.classList.remove('ux-flip'), 600);
    }
    
    // 成功庆祝动画
    function celebrateSuccess(element) {
        // 创建五彩纸屑
        const colors = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        const container = document.createElement('div');
        container.className = 'ux-confetti-container';
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'ux-confetti';
            confetti.style.cssText = `
                --x: ${Math.random() * 200 - 100}px;
                --y: ${Math.random() * -200 - 50}px;
                --r: ${Math.random() * 720 - 360}deg;
                --delay: ${Math.random() * 0.3}s;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${50 + Math.random() * 20 - 10}%;
            `;
            container.appendChild(confetti);
        }
        
        element.style.position = 'relative';
        element.appendChild(container);
        setTimeout(() => container.remove(), 2000);
    }
    
    // 进度脉冲动画
    function pulseProgress(element) {
        element.classList.add('ux-pulse');
        setTimeout(() => element.classList.remove('ux-pulse'), 1000);
    }
    
    // ========== 版本2: 情感化设计与反馈 ==========
    
    // 鼓励消息系统
    const EncouragementSystem = {
        messages: {
            start: [
                '开始新的学习旅程！💪',
                '今天又是充满希望的一天！✨',
                '准备好挑战自己了吗？🚀',
                '让我们开始吧！🎯'
            ],
            progress: [
                '太棒了，继续保持！🌟',
                '你做得很好！👏',
                '进步神速！🔥',
                '离目标又近了一步！📈'
            ],
            milestone: [
                '🎉 重大突破！你太厉害了！',
                '🏆 恭喜达成里程碑！',
                '⭐ 你是学习之星！',
                '🌈 你的努力正在开花结果！'
            ],
            streak: [
                '🔥 连续学习{days}天！太强了！',
                '💪 {days}天坚持不懈，你真棒！',
                '🎯 已连续打卡{days}天，继续加油！',
                '⚡ {days}天连胜！势不可挡！'
            ],
            comeback: [
                '欢迎回来！我们想你了 🥰',
                '休息好了吗？让我们继续前进！💫',
                '新的开始，新的可能！🌱',
                '准备好了就出发吧！🚀'
            ],
            night: [
                '夜深了，注意休息哦 🌙',
                '今天辛苦了，明天继续！😴',
                '学习很重要，睡眠也很重要 💤',
                '晚安，明天见！🌟'
            ]
        },
        
        getRandom(category) {
            const msgs = this.messages[category];
            return msgs[Math.floor(Math.random() * msgs.length)];
        },
        
        getStreakMessage(days) {
            return this.getRandom('streak').replace('{days}', days);
        }
    };
    
    // 智能Toast系统（带表情和动画）
    function showSmartToast(message, type = 'info', duration = 3000) {
        const existing = document.querySelector('.ux-smart-toast');
        if (existing) existing.remove();
        
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            achievement: '🏆',
            streak: '🔥',
            level: '⬆️',
            reward: '🎁'
        };
        
        const toast = document.createElement('div');
        toast.className = `ux-smart-toast ux-toast-${type}`;
        toast.innerHTML = `
            <span class="ux-toast-icon">${icons[type] || icons.info}</span>
            <span class="ux-toast-message">${message}</span>
            <div class="ux-toast-progress"></div>
        `;
        
        document.body.appendChild(toast);
        
        // 触发动画
        requestAnimationFrame(() => {
            toast.classList.add('ux-toast-show');
            toast.querySelector('.ux-toast-progress').style.animation = 
                `uxToastProgress ${duration}ms linear forwards`;
        });
        
        // 自动关闭
        setTimeout(() => {
            toast.classList.remove('ux-toast-show');
            toast.classList.add('ux-toast-hide');
            setTimeout(() => toast.remove(), 300);
        }, duration);
        
        // 支持点击关闭
        toast.addEventListener('click', () => {
            toast.classList.remove('ux-toast-show');
            toast.classList.add('ux-toast-hide');
            setTimeout(() => toast.remove(), 300);
        });
        
        HapticFeedback.light();
    }
    
    // 情感化加载动画
    function showLoadingWithMessage(message = '加载中...') {
        let loader = document.getElementById('uxLoader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'uxLoader';
            loader.className = 'ux-loader-overlay';
            document.body.appendChild(loader);
        }
        
        const tips = [
            '知识就是力量 💪',
            '每天进步一点点 📈',
            '坚持就是胜利 🏆',
            '你比想象中更强大 ⭐',
            '学习使人快乐 🎉'
        ];
        const tip = tips[Math.floor(Math.random() * tips.length)];
        
        loader.innerHTML = `
            <div class="ux-loader-content">
                <div class="ux-loader-spinner">
                    <div class="ux-loader-ring"></div>
                    <div class="ux-loader-ring"></div>
                    <div class="ux-loader-ring"></div>
                </div>
                <p class="ux-loader-message">${message}</p>
                <p class="ux-loader-tip">${tip}</p>
            </div>
        `;
        loader.classList.add('ux-loader-visible');
    }
    
    function hideLoading() {
        const loader = document.getElementById('uxLoader');
        if (loader) {
            loader.classList.remove('ux-loader-visible');
        }
    }
    
    // ========== 版本3: 智能引导与提示系统 ==========
    
    // 功能引导气泡
    function showGuide(targetSelector, message, position = 'bottom') {
        const target = document.querySelector(targetSelector);
        if (!target) return;
        
        // 移除已有引导
        document.querySelectorAll('.ux-guide-bubble').forEach(g => g.remove());
        
        const guide = document.createElement('div');
        guide.className = `ux-guide-bubble ux-guide-${position}`;
        guide.innerHTML = `
            <div class="ux-guide-content">
                <p>${message}</p>
                <button class="ux-guide-btn" onclick="this.parentElement.parentElement.remove()">知道了</button>
            </div>
            <div class="ux-guide-arrow"></div>
        `;
        
        const rect = target.getBoundingClientRect();
        const scrollTop = window.pageYOffset;
        
        switch (position) {
            case 'top':
                guide.style.left = `${rect.left + rect.width / 2}px`;
                guide.style.top = `${rect.top + scrollTop - 10}px`;
                break;
            case 'bottom':
                guide.style.left = `${rect.left + rect.width / 2}px`;
                guide.style.top = `${rect.bottom + scrollTop + 10}px`;
                break;
            case 'left':
                guide.style.left = `${rect.left - 10}px`;
                guide.style.top = `${rect.top + scrollTop + rect.height / 2}px`;
                break;
            case 'right':
                guide.style.left = `${rect.right + 10}px`;
                guide.style.top = `${rect.top + scrollTop + rect.height / 2}px`;
                break;
        }
        
        document.body.appendChild(guide);
        
        // 高亮目标元素
        target.classList.add('ux-guide-highlight');
        guide.addEventListener('click', () => {
            target.classList.remove('ux-guide-highlight');
        });
        
        HapticFeedback.light();
    }
    
    // 新功能提示徽章
    function addNewBadge(targetSelector, text = 'NEW') {
        const target = document.querySelector(targetSelector);
        if (!target || target.querySelector('.ux-new-badge')) return;
        
        const badge = document.createElement('span');
        badge.className = 'ux-new-badge';
        badge.textContent = text;
        target.style.position = 'relative';
        target.appendChild(badge);
    }
    
    // 工具提示增强
    function addTooltip(element, content, position = 'top') {
        element.setAttribute('data-ux-tooltip', content);
        element.setAttribute('data-ux-tooltip-pos', position);
        element.classList.add('ux-has-tooltip');
    }
    
    // 键盘快捷键提示
    function showShortcutHint(key, action) {
        const hint = document.createElement('div');
        hint.className = 'ux-shortcut-hint';
        hint.innerHTML = `
            <kbd>${key}</kbd>
            <span>${action}</span>
        `;
        document.body.appendChild(hint);
        
        setTimeout(() => {
            hint.classList.add('ux-shortcut-hide');
            setTimeout(() => hint.remove(), 300);
        }, 2000);
    }
    
    // 首次使用引导流程
    const OnboardingFlow = {
        steps: [
            { target: '.module-card:first-child', message: '点击这里开始词汇学习 📚', position: 'bottom' },
            { target: '.streak-badge', message: '这里显示你的连续学习天数 🔥', position: 'bottom' },
            { target: '.nav-item[data-tab="stats"]', message: '点击这里查看学习统计 📊', position: 'top' },
            { target: '.nav-item[data-tab="settings"]', message: '这里可以个性化设置 ⚙️', position: 'top' }
        ],
        currentStep: 0,
        
        start() {
            if (localStorage.getItem('onboardingComplete')) return;
            this.currentStep = 0;
            this.showStep();
        },
        
        showStep() {
            if (this.currentStep >= this.steps.length) {
                this.complete();
                return;
            }
            
            const step = this.steps[this.currentStep];
            showGuide(step.target, step.message, step.position);
            
            // 监听关闭并进入下一步
            const guide = document.querySelector('.ux-guide-bubble');
            if (guide) {
                guide.querySelector('.ux-guide-btn').addEventListener('click', () => {
                    this.currentStep++;
                    setTimeout(() => this.showStep(), 500);
                });
            }
        },
        
        complete() {
            localStorage.setItem('onboardingComplete', 'true');
            showSmartToast('引导完成！开始你的学习之旅吧！', 'success');
        },
        
        reset() {
            localStorage.removeItem('onboardingComplete');
            this.currentStep = 0;
        }
    };
    
    // ========== 版本4: 成就系统与激励机制 ==========
    
    // 成就定义
    const Achievements = {
        list: {
            'first_word': { name: '初出茅庐', desc: '学习第一个单词', icon: '🌱', points: 10 },
            'word_10': { name: '小有所成', desc: '累计学习10个单词', icon: '📚', points: 20 },
            'word_50': { name: '学富五车', desc: '累计学习50个单词', icon: '🎓', points: 50 },
            'word_100': { name: '百词斩', desc: '累计学习100个单词', icon: '💯', points: 100 },
            'word_500': { name: '词汇大师', desc: '累计学习500个单词', icon: '👑', points: 200 },
            'streak_3': { name: '三日之约', desc: '连续学习3天', icon: '🔥', points: 30 },
            'streak_7': { name: '一周坚持', desc: '连续学习7天', icon: '⚡', points: 70 },
            'streak_30': { name: '月度冠军', desc: '连续学习30天', icon: '🏆', points: 300 },
            'perfect_quiz': { name: '满分王', desc: '测验获得满分', icon: '⭐', points: 50 },
            'early_bird': { name: '早起鸟儿', desc: '早上6点前学习', icon: '🐦', points: 30 },
            'night_owl': { name: '夜猫子', desc: '凌晨学习', icon: '🦉', points: 30 },
            'speed_learner': { name: '神速学习', desc: '1分钟内记住5个单词', icon: '⚡', points: 40 },
            'review_master': { name: '复习达人', desc: '复习100个单词', icon: '🔄', points: 80 }
        },
        
        // 检查并解锁成就
        check(achievementId) {
            const unlocked = this.getUnlocked();
            if (unlocked.includes(achievementId)) return false;
            
            const achievement = this.list[achievementId];
            if (!achievement) return false;
            
            // 解锁成就
            unlocked.push(achievementId);
            localStorage.setItem('unlockedAchievements', JSON.stringify(unlocked));
            
            // 增加积分
            this.addPoints(achievement.points);
            
            // 显示解锁动画
            this.showUnlockAnimation(achievement);
            
            return true;
        },
        
        getUnlocked() {
            try {
                return JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
            } catch {
                return [];
            }
        },
        
        getPoints() {
            return parseInt(localStorage.getItem('achievementPoints') || '0');
        },
        
        addPoints(points) {
            const current = this.getPoints();
            localStorage.setItem('achievementPoints', current + points);
        },
        
        // 成就解锁动画
        showUnlockAnimation(achievement) {
            const overlay = document.createElement('div');
            overlay.className = 'ux-achievement-overlay';
            overlay.innerHTML = `
                <div class="ux-achievement-card">
                    <div class="ux-achievement-glow"></div>
                    <div class="ux-achievement-icon">${achievement.icon}</div>
                    <div class="ux-achievement-content">
                        <div class="ux-achievement-label">🎉 成就解锁！</div>
                        <div class="ux-achievement-name">${achievement.name}</div>
                        <div class="ux-achievement-desc">${achievement.desc}</div>
                        <div class="ux-achievement-points">+${achievement.points} 积分</div>
                    </div>
                    <div class="ux-achievement-particles">
                        ${Array(20).fill('<span></span>').join('')}
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
            HapticFeedback.success();
            
            // 自动关闭
            setTimeout(() => {
                overlay.classList.add('ux-achievement-hide');
                setTimeout(() => overlay.remove(), 500);
            }, 3500);
            
            // 点击关闭
            overlay.addEventListener('click', () => {
                overlay.classList.add('ux-achievement-hide');
                setTimeout(() => overlay.remove(), 500);
            });
        },
        
        // 检查各种成就条件
        checkWordCount(count) {
            if (count >= 1) this.check('first_word');
            if (count >= 10) this.check('word_10');
            if (count >= 50) this.check('word_50');
            if (count >= 100) this.check('word_100');
            if (count >= 500) this.check('word_500');
        },
        
        checkStreak(days) {
            if (days >= 3) this.check('streak_3');
            if (days >= 7) this.check('streak_7');
            if (days >= 30) this.check('streak_30');
        },
        
        checkTime() {
            const hour = new Date().getHours();
            if (hour >= 5 && hour < 6) this.check('early_bird');
            if (hour >= 0 && hour < 5) this.check('night_owl');
        }
    };
    
    // 等级系统
    const LevelSystem = {
        levels: [
            { level: 1, name: '学习新手', minPoints: 0, icon: '🌱' },
            { level: 2, name: '初级学者', minPoints: 100, icon: '📖' },
            { level: 3, name: '中级学者', minPoints: 300, icon: '📚' },
            { level: 4, name: '高级学者', minPoints: 600, icon: '🎓' },
            { level: 5, name: '学术精英', minPoints: 1000, icon: '⭐' },
            { level: 6, name: '知识大师', minPoints: 1500, icon: '👑' },
            { level: 7, name: '学术泰斗', minPoints: 2500, icon: '🏆' },
            { level: 8, name: '传奇学者', minPoints: 4000, icon: '💎' },
            { level: 9, name: '至尊宗师', minPoints: 6000, icon: '🌟' },
            { level: 10, name: '学神', minPoints: 10000, icon: '👼' }
        ],
        
        getCurrentLevel() {
            const points = Achievements.getPoints();
            let currentLevel = this.levels[0];
            
            for (const level of this.levels) {
                if (points >= level.minPoints) {
                    currentLevel = level;
                }
            }
            
            return currentLevel;
        },
        
        getNextLevel() {
            const current = this.getCurrentLevel();
            const nextIndex = this.levels.findIndex(l => l.level === current.level) + 1;
            return this.levels[nextIndex] || null;
        },
        
        getProgress() {
            const points = Achievements.getPoints();
            const current = this.getCurrentLevel();
            const next = this.getNextLevel();
            
            if (!next) return 100;
            
            const levelPoints = points - current.minPoints;
            const levelRange = next.minPoints - current.minPoints;
            
            return Math.min(100, Math.round((levelPoints / levelRange) * 100));
        },
        
        checkLevelUp() {
            const savedLevel = parseInt(localStorage.getItem('currentLevel') || '1');
            const currentLevel = this.getCurrentLevel().level;
            
            if (currentLevel > savedLevel) {
                localStorage.setItem('currentLevel', currentLevel);
                this.showLevelUpAnimation(this.getCurrentLevel());
                return true;
            }
            return false;
        },
        
        showLevelUpAnimation(level) {
            const overlay = document.createElement('div');
            overlay.className = 'ux-levelup-overlay';
            overlay.innerHTML = `
                <div class="ux-levelup-card">
                    <div class="ux-levelup-rays"></div>
                    <div class="ux-levelup-icon">${level.icon}</div>
                    <div class="ux-levelup-content">
                        <div class="ux-levelup-label">⬆️ 等级提升！</div>
                        <div class="ux-levelup-level">Lv.${level.level}</div>
                        <div class="ux-levelup-name">${level.name}</div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(overlay);
            HapticFeedback.success();
            
            setTimeout(() => {
                overlay.classList.add('ux-levelup-hide');
                setTimeout(() => overlay.remove(), 500);
            }, 3000);
        }
    };
    
    // ========== 版本5: 个性化体验优化 ==========
    
    // 学习数据分析
    const LearningAnalytics = {
        // 记录学习时间分布
        recordSession() {
            const hour = new Date().getHours();
            const sessions = this.getSessions();
            sessions[hour] = (sessions[hour] || 0) + 1;
            localStorage.setItem('learningSessions', JSON.stringify(sessions));
        },
        
        getSessions() {
            try {
                return JSON.parse(localStorage.getItem('learningSessions') || '{}');
            } catch {
                return {};
            }
        },
        
        // 获取最佳学习时间
        getBestTime() {
            const sessions = this.getSessions();
            let maxHour = -1;
            let maxCount = 0;
            
            for (const hour in sessions) {
                if (sessions[hour] > maxCount) {
                    maxCount = sessions[hour];
                    maxHour = parseInt(hour);
                }
            }
            
            if (maxHour === -1) return null;
            
            const timeRanges = {
                morning: [5, 12],
                afternoon: [12, 18],
                evening: [18, 22],
                night: [22, 5]
            };
            
            for (const range in timeRanges) {
                const [start, end] = timeRanges[range];
                if (range === 'night') {
                    if (maxHour >= start || maxHour < end) return range;
                } else {
                    if (maxHour >= start && maxHour < end) return range;
                }
            }
            return null;
        },
        
        // 获取学习效率分析
        getEfficiencyTip() {
            const bestTime = this.getBestTime();
            const tips = {
                morning: '你是晨型学习者！早上是你的黄金学习时间 🌅',
                afternoon: '下午是你的高效时段，继续保持！ ☀️',
                evening: '傍晚学习效果最佳，安排好复习时间 🌆',
                night: '你喜欢夜间学习，记得适当休息哦 🌙'
            };
            return tips[bestTime] || '还没有足够的数据，继续学习吧！ 📊';
        }
    };
    
    // 智能提醒系统
    const SmartReminder = {
        // 检查是否该提醒复习
        checkReviewReminder() {
            const lastReview = localStorage.getItem('lastReviewTime');
            if (!lastReview) return;
            
            const hoursSince = (Date.now() - parseInt(lastReview)) / (1000 * 60 * 60);
            
            if (hoursSince >= 24) {
                this.showReminder('review', '已经24小时没复习了，记忆正在消退 😢');
            } else if (hoursSince >= 12) {
                this.showReminder('gentle', '该复习一下今天学的单词了 📚');
            }
        },
        
        // 检查学习目标
        checkGoalReminder() {
            const todayWords = parseInt(localStorage.getItem('todayWords') || '0');
            const dailyGoal = parseInt(localStorage.getItem('dailyWordGoal') || '20');
            const progress = (todayWords / dailyGoal) * 100;
            
            if (progress < 50 && new Date().getHours() >= 18) {
                this.showReminder('goal', `今日目标完成${Math.round(progress)}%，加油完成剩余任务！ 💪`);
            }
        },
        
        showReminder(type, message) {
            // 检查是否最近已提醒过
            const lastReminder = localStorage.getItem(`lastReminder_${type}`);
            if (lastReminder && Date.now() - parseInt(lastReminder) < 4 * 60 * 60 * 1000) {
                return; // 4小时内不重复提醒
            }
            
            localStorage.setItem(`lastReminder_${type}`, Date.now());
            showSmartToast(message, 'info', 5000);
        }
    };
    
    // 手势交互增强
    const GestureEnhancer = {
        init() {
            // 下拉刷新
            this.initPullToRefresh();
            // 滑动返回
            this.initSwipeBack();
            // 双击顶部回到顶部
            this.initDoubleTopTap();
        },
        
        initPullToRefresh() {
            let startY = 0;
            let pulling = false;
            
            document.addEventListener('touchstart', (e) => {
                if (window.scrollY === 0) {
                    startY = e.touches[0].pageY;
                    pulling = true;
                }
            }, { passive: true });
            
            document.addEventListener('touchmove', (e) => {
                if (!pulling) return;
                const currentY = e.touches[0].pageY;
                const diff = currentY - startY;
                
                if (diff > 100 && window.scrollY === 0) {
                    // 触发刷新
                    HapticFeedback.medium();
                    pulling = false;
                }
            }, { passive: true });
            
            document.addEventListener('touchend', () => {
                pulling = false;
            }, { passive: true });
        },
        
        initSwipeBack() {
            let startX = 0;
            let startY = 0;
            
            document.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX;
                startY = e.touches[0].pageY;
            }, { passive: true });
            
            document.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].pageX;
                const endY = e.changedTouches[0].pageY;
                const diffX = endX - startX;
                const diffY = Math.abs(endY - startY);
                
                // 从左边缘开始的右滑
                if (startX < 30 && diffX > 80 && diffY < 50) {
                    const modal = document.querySelector('.modal.active');
                    if (modal && typeof closeModule === 'function') {
                        HapticFeedback.light();
                        closeModule();
                    }
                }
            }, { passive: true });
        },
        
        initDoubleTopTap() {
            let lastTap = 0;
            const header = document.querySelector('header, .home-header');
            
            if (header) {
                header.addEventListener('click', () => {
                    const now = Date.now();
                    if (now - lastTap < 300) {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        HapticFeedback.light();
                    }
                    lastTap = now;
                });
            }
        }
    };
    
    // 主题随时间变化
    const AdaptiveTheme = {
        update() {
            const hour = new Date().getHours();
            const body = document.body;
            
            // 根据时间自动调整主题色调
            if (hour >= 6 && hour < 12) {
                body.setAttribute('data-time-theme', 'morning');
            } else if (hour >= 12 && hour < 18) {
                body.setAttribute('data-time-theme', 'afternoon');
            } else if (hour >= 18 && hour < 22) {
                body.setAttribute('data-time-theme', 'evening');
            } else {
                body.setAttribute('data-time-theme', 'night');
            }
        }
    };
    
    // ==================== UI 改进 v6.1-v6.10 ====================
    
    // ========== v6.1: 微交互动画系统 ==========
    const MicroAnimations = {
        // 添加进入动画到元素
        addEntryAnimation(elements, type = 'fadeInUp') {
            const els = typeof elements === 'string' ? document.querySelectorAll(elements) : elements;
            els.forEach((el, index) => {
                el.style.animation = `${type} 0.4s ease-out ${index * 0.05}s both`;
            });
        },
        
        // 添加呼吸灯效果
        addBreathingGlow(element) {
            element.classList.add('breathing-glow');
        },
        
        // 移除呼吸灯效果
        removeBreathingGlow(element) {
            element.classList.remove('breathing-glow');
        },
        
        // 成功打勾动画
        showCheckmark(container) {
            container.innerHTML = `
                <svg class="animated-checkmark" width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="28" fill="none" stroke="#10b981" stroke-width="2"/>
                    <path d="M18 30 L26 38 L42 22" fill="none" stroke="#10b981" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            `;
        }
    };
    
    // ========== v6.2: 骨架屏加载系统 ==========
    const SkeletonLoader = {
        // 创建卡片骨架屏
        createCardSkeleton() {
            return `
                <div class="skeleton-card">
                    <div class="skeleton skeleton-avatar"></div>
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text short"></div>
                    <div class="skeleton skeleton-button"></div>
                </div>
            `;
        },
        
        // 创建单词卡片骨架屏
        createWordCardSkeleton() {
            return `
                <div class="word-card-skeleton">
                    <div class="skeleton skeleton-word"></div>
                    <div class="skeleton skeleton-phonetic"></div>
                    <div class="skeleton skeleton-meaning"></div>
                </div>
            `;
        },
        
        // 创建列表骨架屏
        createListSkeleton(count = 5) {
            let html = '';
            for (let i = 0; i < count; i++) {
                html += `
                    <div class="list-skeleton-item">
                        <div class="skeleton skeleton-icon"></div>
                        <div class="skeleton-content">
                            <div class="skeleton skeleton-title" style="width: ${60 + Math.random() * 30}%"></div>
                            <div class="skeleton skeleton-text" style="width: ${40 + Math.random() * 40}%"></div>
                        </div>
                    </div>
                `;
            }
            return html;
        },
        
        // 显示骨架屏
        show(container, type = 'card') {
            const el = typeof container === 'string' ? document.querySelector(container) : container;
            if (!el) return;
            
            el.setAttribute('data-original-content', el.innerHTML);
            
            switch (type) {
                case 'word':
                    el.innerHTML = this.createWordCardSkeleton();
                    break;
                case 'list':
                    el.innerHTML = this.createListSkeleton();
                    break;
                default:
                    el.innerHTML = this.createCardSkeleton();
            }
        },
        
        // 隐藏骨架屏
        hide(container) {
            const el = typeof container === 'string' ? document.querySelector(container) : container;
            if (!el) return;
            
            const original = el.getAttribute('data-original-content');
            if (original) {
                el.innerHTML = original;
                el.removeAttribute('data-original-content');
            }
        }
    };
    
    // ========== v6.3: 触觉反馈增强 ==========
    const TouchFeedback = {
        // 按压效果
        addPressEffect(element) {
            element.classList.add('press-effect');
        },
        
        // 长按效果
        addLongPressEffect(element, callback, duration = 500) {
            let timer = null;
            let startTime = 0;
            
            element.classList.add('long-press-btn');
            
            element.addEventListener('touchstart', (e) => {
                startTime = Date.now();
                timer = setTimeout(() => {
                    HapticFeedback.success();
                    callback(e);
                }, duration);
            });
            
            element.addEventListener('touchend', () => {
                clearTimeout(timer);
                if (Date.now() - startTime < duration) {
                    HapticFeedback.light();
                }
            });
            
            element.addEventListener('touchcancel', () => {
                clearTimeout(timer);
            });
        },
        
        // 卡片按压
        addCardPress(element) {
            element.classList.add('card-press');
        },
        
        // 列表项按压
        addListItemPress(element) {
            element.classList.add('list-item-press');
        }
    };
    
    // ========== v6.4: 3D 悬浮效果 ==========
    const Card3D = {
        // 启用 3D 效果
        enable(element) {
            element.classList.add('card-3d');
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateZ(10px)
                `;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = '';
            });
        },
        
        // 添加 3D 阴影
        add3DShadow(element) {
            element.classList.add('shadow-3d');
        }
    };
    
    // ========== v6.5: 数字动画系统 ==========
    const NumberAnimation = {
        // 数字递增动画
        countUp(element, target, duration = 1000) {
            const start = parseInt(element.textContent) || 0;
            const startTime = performance.now();
            const diff = target - start;
            
            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // 缓动函数
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(start + diff * easeOutQuart);
                
                element.textContent = current;
                element.classList.add('updating');
                
                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    element.classList.remove('updating');
                    element.classList.add('count-up');
                }
            };
            
            requestAnimationFrame(animate);
        },
        
        // 百分比动画
        animatePercentage(element, target, duration = 800) {
            this.countUp(element, target, duration);
            element.classList.add('percentage-bounce');
            setTimeout(() => element.classList.remove('percentage-bounce'), 500);
        },
        
        // 连击数字效果
        comboEffect(element) {
            element.classList.add('combo-number');
            setTimeout(() => element.classList.remove('combo-number'), 500);
        },
        
        // 进度条动画
        animateProgress(progressBar, target) {
            progressBar.classList.add('progress-fill-animated');
            progressBar.style.width = `${target}%`;
        },
        
        // 环形进度动画
        animateRingProgress(circle, target, total = 100) {
            const circumference = 2 * Math.PI * parseFloat(circle.getAttribute('r'));
            const offset = circumference - (target / total) * circumference;
            
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = circumference;
            
            requestAnimationFrame(() => {
                circle.classList.add('ring-progress');
                circle.style.strokeDashoffset = offset;
            });
        }
    };
    
    // ========== v6.6: 主题过渡系统 ==========
    const ThemeTransition = {
        // 平滑切换主题
        switchTheme(newTheme) {
            const body = document.body;
            
            // 添加过渡类
            body.classList.add('theme-transitioning');
            
            // 移除旧主题
            const themeClasses = ['theme-default', 'theme-ocean', 'theme-forest', 
                                  'theme-sunset', 'theme-rose', 'theme-dark',
                                  'theme-mint', 'theme-coffee', 'theme-lavender'];
            themeClasses.forEach(cls => body.classList.remove(cls));
            
            // 添加新主题
            if (newTheme !== 'default') {
                body.classList.add(`theme-${newTheme}`);
            }
            
            // 触发动画
            setTimeout(() => {
                body.classList.remove('theme-transitioning');
            }, 500);
            
            // 保存设置
            localStorage.setItem('selectedTheme', newTheme);
            
            // 触发反馈
            HapticFeedback.medium();
        },
        
        // 主题预览
        previewTheme(theme) {
            const preview = document.querySelector(`.theme-option[data-theme="${theme}"]`);
            if (preview) {
                preview.classList.add('previewing');
                setTimeout(() => preview.classList.remove('previewing'), 300);
            }
        }
    };
    
    // ========== v6.7: 滚动效果系统 ==========
    const ScrollEffects = {
        // 初始化滚动监听
        init() {
            this.observeElements();
            this.setupStickyHeader();
        },
        
        // 监听元素进入视口
        observeElements() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            document.querySelectorAll('.scroll-reveal, .stagger-reveal').forEach(el => {
                observer.observe(el);
            });
        },
        
        // 设置粘性头部
        setupStickyHeader() {
            const header = document.querySelector('.sticky-header');
            if (!header) return;
            
            let lastScroll = 0;
            
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                
                lastScroll = currentScroll;
            }, { passive: true });
        },
        
        // 添加滚动显示效果
        addScrollReveal(element) {
            element.classList.add('scroll-reveal');
        },
        
        // 添加交错显示效果
        addStaggerReveal(elements) {
            elements.forEach((el, index) => {
                el.classList.add('stagger-reveal');
                el.style.setProperty('--stagger-index', index);
            });
        }
    };
    
    // ========== v6.8: 涟漪效果增强 ==========
    const RippleEffect = {
        // 创建涟漪
        create(event, element, color = 'rgba(255, 255, 255, 0.4)') {
            const rect = element.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            
            element.style.setProperty('--ripple-x', `${x}px`);
            element.style.setProperty('--ripple-y', `${y}px`);
            element.classList.add('btn-ripple');
        },
        
        // 添加发光效果
        addGlow(element) {
            element.classList.add('btn-glow');
        },
        
        // 添加边框动画
        addBorderAnimation(element) {
            element.classList.add('btn-border-anim');
        },
        
        // 绑定到按钮
        bindToButtons() {
            document.addEventListener('mousedown', (e) => {
                const btn = e.target.closest('button:not(.no-ripple)');
                if (btn) {
                    this.create(e, btn);
                }
            });
        }
    };
    
    // ========== v6.9: 空状态管理 ==========
    const EmptyState = {
        // 显示空状态
        show(container, type = 'default', options = {}) {
            const el = typeof container === 'string' ? document.querySelector(container) : container;
            if (!el) return;
            
            const configs = {
                default: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
                    title: '暂无数据',
                    desc: '数据正在加载中...'
                },
                offline: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.58 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg>`,
                    title: '网络已断开',
                    desc: '请检查您的网络连接后重试'
                },
                noResults: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v6M8 11h6"/></svg>`,
                    title: '未找到结果',
                    desc: '尝试使用不同的关键词搜索'
                },
                error: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`,
                    title: '加载失败',
                    desc: '出了点问题，请稍后重试'
                },
                success: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
                    title: '完成',
                    desc: '太棒了！你已经完成所有任务'
                },
                noData: {
                    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
                    title: '暂无内容',
                    desc: '开始添加一些内容吧'
                }
            };
            
            const config = { ...configs[type], ...options };
            
            el.innerHTML = `
                <div class="empty-state ${type}">
                    <div class="empty-state-icon">
                        ${config.icon}
                    </div>
                    <h3 class="empty-state-title">${config.title}</h3>
                    <p class="empty-state-desc">${config.desc}</p>
                    ${config.actionText ? `
                        <button class="empty-state-action" onclick="${config.actionHandler || ''}">
                            ${config.actionText}
                        </button>
                    ` : ''}
                </div>
            `;
        },
        
        // 隐藏空状态
        hide(container) {
            const el = typeof container === 'string' ? document.querySelector(container) : container;
            if (!el) return;
            const emptyState = el.querySelector('.empty-state');
            if (emptyState) emptyState.remove();
        }
    };
    
    // ========== v6.10: 底部导航增强 ==========
    const BottomNavEnhancer = {
        // 初始化
        init() {
            this.bindEvents();
            this.updateIndicator();
        },
        
        // 绑定事件
        bindEvents() {
            const navItems = document.querySelectorAll('.nav-item');
            
            navItems.forEach(item => {
                item.addEventListener('click', (e) => {
                    // 添加切换动画
                    item.classList.add('switching');
                    setTimeout(() => item.classList.remove('switching'), 400);
                    
                    // 触觉反馈
                    HapticFeedback.light();
                    
                    // 更新指示器
                    setTimeout(() => this.updateIndicator(), 50);
                });
            });
        },
        
        // 更新指示器位置
        updateIndicator() {
            const activeItem = document.querySelector('.nav-item.active');
            const indicator = document.querySelector('.nav-indicator');
            
            if (!activeItem || !indicator) return;
            
            const rect = activeItem.getBoundingClientRect();
            const navRect = activeItem.parentElement.getBoundingClientRect();
            const centerX = rect.left - navRect.left + rect.width / 2 - 20;
            
            indicator.style.transform = `translateX(${centerX}px)`;
        },
        
        // 显示徽章
        showBadge(tabName, count) {
            const item = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
            if (!item) return;
            
            let badge = item.querySelector('.nav-badge');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'nav-badge';
                item.appendChild(badge);
            }
            
            badge.textContent = count > 99 ? '99+' : count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        },
        
        // 隐藏徽章
        hideBadge(tabName) {
            const item = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
            if (!item) return;
            
            const badge = item.querySelector('.nav-badge');
            if (badge) badge.style.display = 'none';
        }
    };
    
    // ========== 全局设置 ==========
    window.uxSettings = {
        soundEnabled: localStorage.getItem('uxSoundEnabled') !== 'false',
        hapticEnabled: localStorage.getItem('uxHapticEnabled') !== 'false',
        animationsEnabled: localStorage.getItem('uxAnimationsEnabled') !== 'false'
    };
    
    // 初始化
    function initUXEnhancements() {
        // 添加涟漪效果到所有按钮
        document.addEventListener('click', (e) => {
            const target = e.target.closest('button, .module-card, .nav-item, .setting-item, .quiz-option, .answer-option');
            if (target && window.uxSettings.animationsEnabled) {
                createRipple(e, target);
                HapticFeedback.light();
            }
        });
        
        // 初始化手势
        GestureEnhancer.init();
        
        // 更新主题
        AdaptiveTheme.update();
        setInterval(() => AdaptiveTheme.update(), 60000);
        
        // 记录学习会话
        LearningAnalytics.recordSession();
        
        // 检查提醒
        setTimeout(() => {
            SmartReminder.checkReviewReminder();
            SmartReminder.checkGoalReminder();
        }, 5000);
        
        // 检查成就
        Achievements.checkTime();
        
        // v6.7: 初始化滚动效果
        ScrollEffects.init();
        
        // v6.8: 初始化涟漪效果
        RippleEffect.bindToButtons();
        
        // v6.10: 初始化底部导航
        BottomNavEnhancer.init();
        
        // 给模块卡片添加进入动画
        MicroAnimations.addEntryAnimation('.module-card');
        
        console.log('[UX] Enhancements v1-v5, UI v6.1-v6.10 initialized');
    }
    
    // DOM 加载后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initUXEnhancements);
    } else {
        initUXEnhancements();
    }
    
    // 暴露 API
    window.UX = {
        HapticFeedback,
        createRipple,
        addBounceEffect,
        addFlipEffect,
        celebrateSuccess,
        pulseProgress,
        showSmartToast,
        showLoadingWithMessage,
        hideLoading,
        showGuide,
        addNewBadge,
        addTooltip,
        showShortcutHint,
        OnboardingFlow,
        Achievements,
        LevelSystem,
        LearningAnalytics,
        SmartReminder,
        EncouragementSystem,
        // v6.1-v6.10 新增 API
        MicroAnimations,
        SkeletonLoader,
        TouchFeedback,
        Card3D,
        NumberAnimation,
        ThemeTransition,
        ScrollEffects,
        RippleEffect,
        EmptyState,
        BottomNavEnhancer,
        settings: window.uxSettings
    };
    
})();
