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
    // ==================== v7.1: 可拖拽漂浮装饰物 ====================
    const FloatingDecor = {
        emojis: ['🌸', '⭐', '🌙', '☁️', '🍀', '🦋', '🌈', '💫'],
        decorElements: [],
        
        init() {
            this.createDecors();
            this.setupDrag();
        },
        
        createDecors(count = 5) {
            const container = document.querySelector('.header-scene') || document.querySelector('.home-header');
            if (!container) return;
            
            for (let i = 0; i < count; i++) {
                const decor = document.createElement('div');
                decor.className = 'floating-decor float-emoji';
                decor.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
                decor.style.left = `${Math.random() * 80 + 10}%`;
                decor.style.top = `${Math.random() * 60 + 20}%`;
                container.appendChild(decor);
                this.decorElements.push(decor);
            }
        },
        
        setupDrag() {
            this.decorElements.forEach(el => {
                let isDragging = false;
                let startX, startY, initialX, initialY;
                
                el.addEventListener('touchstart', (e) => {
                    isDragging = true;
                    el.classList.add('dragging');
                    const touch = e.touches[0];
                    startX = touch.clientX;
                    startY = touch.clientY;
                    const rect = el.getBoundingClientRect();
                    initialX = rect.left;
                    initialY = rect.top;
                }, { passive: true });
                
                el.addEventListener('touchmove', (e) => {
                    if (!isDragging) return;
                    const touch = e.touches[0];
                    const dx = touch.clientX - startX;
                    const dy = touch.clientY - startY;
                    el.style.position = 'fixed';
                    el.style.left = `${initialX + dx}px`;
                    el.style.top = `${initialY + dy}px`;
                }, { passive: true });
                
                el.addEventListener('touchend', () => {
                    isDragging = false;
                    el.classList.remove('dragging');
                }, { passive: true });
            });
        }
    };
    
    // ==================== v7.2: 点击产生泡泡/爱心效果 (可选功能) ====================
    const ClickEffects = {
        container: null,
        effects: ['bubble', 'heart', 'star'],
        currentEffect: 'heart',
        isEnabled: false,  // V9.32: 默认关闭，用户可选开启
        clickHandler: null,
        
        init() {
            // V9.32: 只创建容器，不自动绑定点击事件
            this.createContainer();
            // 检查用户设置是否开启
            const saved = localStorage.getItem('clickEffectsEnabled');
            if (saved === 'true') {
                this.enable();
            }
        },
        
        createContainer() {
            if (this.container) return;
            this.container = document.createElement('div');
            this.container.className = 'click-effect-container';
            document.body.appendChild(this.container);
        },
        
        // V9.32: 启用点击效果
        enable() {
            if (this.isEnabled) return;
            this.isEnabled = true;
            this.clickHandler = (e) => {
                // 不在按钮或链接上触发
                if (e.target.closest('button, a, .nav-item, input, .stress-ball, .modal, .setting-item')) return;
                
                const x = e.clientX;
                const y = e.clientY;
                
                // 随机效果
                const effectType = this.effects[Math.floor(Math.random() * this.effects.length)];
                this.createEffect(x, y, effectType);
            };
            document.addEventListener('click', this.clickHandler);
            localStorage.setItem('clickEffectsEnabled', 'true');
        },
        
        // V9.32: 禁用点击效果
        disable() {
            if (!this.isEnabled) return;
            this.isEnabled = false;
            if (this.clickHandler) {
                document.removeEventListener('click', this.clickHandler);
                this.clickHandler = null;
            }
            localStorage.setItem('clickEffectsEnabled', 'false');
        },
        
        // V9.32: 切换开关
        toggle() {
            if (this.isEnabled) {
                this.disable();
            } else {
                this.enable();
            }
            return this.isEnabled;
        },
        
        setupClickListener() {
            // V9.32: 废弃，保留兼容性
        },
        
        createEffect(x, y, type = 'heart') {
            const count = type === 'bubble' ? 5 : 3;
            
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    const effect = document.createElement('div');
                    effect.className = `${type}-effect`;
                    
                    if (type === 'heart') {
                        effect.textContent = ['❤️', '💕', '💖', '💗'][Math.floor(Math.random() * 4)];
                    } else if (type === 'star') {
                        effect.textContent = ['⭐', '✨', '🌟', '💫'][Math.floor(Math.random() * 4)];
                    } else {
                        const size = Math.random() * 20 + 10;
                        effect.style.width = `${size}px`;
                        effect.style.height = `${size}px`;
                    }
                    
                    const offsetX = (Math.random() - 0.5) * 50;
                    const offsetY = (Math.random() - 0.5) * 20;
                    effect.style.left = `${x + offsetX}px`;
                    effect.style.top = `${y + offsetY}px`;
                    
                    this.container.appendChild(effect);
                    
                    setTimeout(() => effect.remove(), 1500);
                }, i * 100);
            }
        }
    };
    
    // ==================== v7.3: 呼吸引导圆圈 ====================
    const BreathingGuide = {
        element: null,
        isActive: false,
        breatheInterval: null,
        phases: ['吸气...', '屏住...', '呼气...', '屏住...'],
        
        init() {
            this.createElement();
            this.setupEvents();
        },
        
        createElement() {
            this.element = document.createElement('div');
            this.element.className = 'breathing-guide';
            this.element.innerHTML = `
                <div class="breathing-circle"></div>
                <span class="breathing-text">点击开始</span>
            `;
            document.body.appendChild(this.element);
        },
        
        setupEvents() {
            this.element.addEventListener('click', () => {
                this.toggle();
            });
        },
        
        toggle() {
            this.isActive = !this.isActive;
            this.element.classList.toggle('active', this.isActive);
            
            if (this.isActive) {
                this.startBreathing();
                HapticFeedback.medium();
            } else {
                this.stopBreathing();
            }
        },
        
        startBreathing() {
            const textEl = this.element.querySelector('.breathing-text');
            let phase = 0;
            
            textEl.textContent = this.phases[0];
            
            this.breatheInterval = setInterval(() => {
                phase = (phase + 1) % 4;
                textEl.textContent = this.phases[phase];
            }, 2000);
        },
        
        stopBreathing() {
            if (this.breatheInterval) {
                clearInterval(this.breatheInterval);
                this.breatheInterval = null;
            }
            const textEl = this.element.querySelector('.breathing-text');
            textEl.textContent = '点击开始';
        }
    };
    
    // ==================== v7.4: 触摸涟漪池 ====================
    const RipplePool = {
        init() {
            const headerScene = document.querySelector('.header-scene');
            if (!headerScene) return;
            
            const pool = document.createElement('div');
            pool.className = 'ripple-pool';
            headerScene.appendChild(pool);
            
            pool.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                const rect = pool.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                this.createRipple(pool, x, y);
            }, { passive: true });
            
            pool.addEventListener('click', (e) => {
                const rect = pool.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.createRipple(pool, x, y);
            });
        },
        
        createRipple(container, x, y) {
            const ripple = document.createElement('div');
            ripple.className = 'ripple-wave';
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            container.appendChild(ripple);
            
            HapticFeedback.light();
            
            setTimeout(() => ripple.remove(), 2000);
        }
    };
    
    // ==================== v7.5: 可揉捏的压力球 ====================
    const StressBall = {
        element: null,
        squeezeCount: 0,
        
        init() {
            this.createElement();
            this.setupEvents();
            this.loadCount();
        },
        
        createElement() {
            this.element = document.createElement('div');
            this.element.className = 'stress-ball';
            this.element.innerHTML = '<span class="stress-ball-counter">今日: 0次</span>';
            document.body.appendChild(this.element);
        },
        
        setupEvents() {
            this.element.addEventListener('mousedown', () => this.squeeze());
            this.element.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.squeeze();
            });
            
            this.element.addEventListener('mouseup', () => this.release());
            this.element.addEventListener('touchend', () => this.release());
        },
        
        squeeze() {
            this.squeezeCount++;
            this.updateCounter();
            this.saveCount();
            HapticFeedback.medium();
            
            // 每10次有特殊效果
            if (this.squeezeCount % 10 === 0) {
                celebrateSuccess();
                showSmartToast(`已揉捏 ${this.squeezeCount} 次！压力释放中~ 🎉`, 'success', 2000);
            }
        },
        
        release() {
            this.element.classList.add('squeezed');
            setTimeout(() => {
                this.element.classList.remove('squeezed');
            }, 300);
        },
        
        updateCounter() {
            const counter = this.element.querySelector('.stress-ball-counter');
            if (counter) {
                counter.textContent = `今日: ${this.squeezeCount}次`;
            }
        },
        
        loadCount() {
            const today = new Date().toDateString();
            const saved = localStorage.getItem('stressBallData');
            if (saved) {
                const data = JSON.parse(saved);
                if (data.date === today) {
                    this.squeezeCount = data.count;
                    this.updateCounter();
                }
            }
        },
        
        saveCount() {
            localStorage.setItem('stressBallData', JSON.stringify({
                date: new Date().toDateString(),
                count: this.squeezeCount
            }));
        }
    };
    
    // ==================== v7.6: 动态天气粒子效果 (可选功能) ====================
    const WeatherParticles = {
        container: null,
        currentWeather: 'sunny',
        isEnabled: false,  // V9.32: 默认关闭
        
        init() {
            // V9.32: 只检查设置，不自动启用
            const saved = localStorage.getItem('weatherParticlesEnabled');
            if (saved === 'true') {
                this.enable();
            }
        },
        
        enable() {
            if (this.isEnabled) return;
            const headerScene = document.querySelector('.header-scene');
            if (!headerScene) return;
            
            this.isEnabled = true;
            this.container = document.createElement('div');
            this.container.className = 'weather-particles';
            headerScene.appendChild(this.container);
            
            // 根据时间设置天气
            this.setWeatherByTime();
            localStorage.setItem('weatherParticlesEnabled', 'true');
        },
        
        disable() {
            if (!this.isEnabled) return;
            this.isEnabled = false;
            if (this.container) {
                this.container.remove();
                this.container = null;
            }
            localStorage.setItem('weatherParticlesEnabled', 'false');
        },
        
        toggle() {
            if (this.isEnabled) {
                this.disable();
            } else {
                this.enable();
            }
            return this.isEnabled;
        },
        
        setWeatherByTime() {
            if (!this.container) return;
            const hour = new Date().getHours();
            
            if (hour >= 6 && hour < 18) {
                // 白天 - 随机阳光或萤火虫
                this.createSunRays();
            } else {
                // 晚上 - 萤火虫
                this.createFireflies();
            }
        },
        
        createRain(count = 30) {
            if (!this.container) return;
            for (let i = 0; i < count; i++) {
                const drop = document.createElement('div');
                drop.className = 'rain-drop';
                drop.style.left = `${Math.random() * 100}%`;
                drop.style.animationDuration = `${Math.random() * 0.5 + 0.5}s`;
                drop.style.animationDelay = `${Math.random() * 2}s`;
                this.container.appendChild(drop);
            }
        },
        
        createSnow(count = 20) {
            if (!this.container) return;
            for (let i = 0; i < count; i++) {
                const flake = document.createElement('div');
                flake.className = 'snowflake';
                flake.textContent = '❄';
                flake.style.left = `${Math.random() * 100}%`;
                flake.style.fontSize = `${Math.random() * 8 + 8}px`;
                flake.style.animationDuration = `${Math.random() * 3 + 3}s`;
                flake.style.animationDelay = `${Math.random() * 3}s`;
                this.container.appendChild(flake);
            }
        },
        
        createSunRays(count = 8) {
            if (!this.container) return;
            for (let i = 0; i < count; i++) {
                const ray = document.createElement('div');
                ray.className = 'sun-ray';
                ray.style.left = `${i * 15 + Math.random() * 10}%`;
                ray.style.transform = `rotate(${Math.random() * 30 - 15}deg)`;
                ray.style.animationDelay = `${Math.random() * 2}s`;
                ray.style.opacity = '0.3';
                this.container.appendChild(ray);
            }
        },
        
        createFireflies(count = 8) {
            if (!this.container) return;
            for (let i = 0; i < count; i++) {
                const firefly = document.createElement('div');
                firefly.className = 'firefly';
                firefly.style.left = `${Math.random() * 80 + 10}%`;
                firefly.style.top = `${Math.random() * 60 + 20}%`;
                firefly.style.animationDelay = `${Math.random() * 5}s`;
                firefly.style.animationDuration = `${Math.random() * 4 + 6}s`;
                this.container.appendChild(firefly);
            }
        }
    };
    
    // ==================== v7.7: 互动式音乐波形 ====================
    const MusicVisualizer = {
        element: null,
        isPlaying: false,
        audio: null,
        tracks: [
            { name: '轻松钢琴', url: 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==' }
        ],
        
        init() {
            this.createElement();
            this.setupEvents();
        },
        
        createElement() {
            this.element = document.createElement('div');
            this.element.className = 'music-visualizer';
            this.element.innerHTML = `
                <div class="music-bar"></div>
                <div class="music-bar"></div>
                <div class="music-bar"></div>
                <div class="music-bar"></div>
                <div class="music-bar"></div>
            `;
            this.element.title = '点击播放/暂停白噪音';
            document.body.appendChild(this.element);
        },
        
        setupEvents() {
            this.element.addEventListener('click', () => {
                this.toggle();
            });
        },
        
        toggle() {
            this.isPlaying = !this.isPlaying;
            this.element.classList.toggle('playing', this.isPlaying);
            
            if (this.isPlaying) {
                // 实际应用中这里可以播放真实音频
                showSmartToast('🎵 白噪音播放中...', 'info', 1500);
                HapticFeedback.light();
            } else {
                showSmartToast('🔇 已暂停', 'info', 1000);
            }
        }
    };
    
    // ==================== v7.8: 励志弹幕流 ====================
    const Danmaku = {
        container: null,
        messages: [
            '加油！你可以的！💪',
            '每天进步一点点 ✨',
            '坚持就是胜利 🏆',
            '今天也要元气满满！🌟',
            '学习使我快乐 📚',
            'You can do it! 💖',
            '相信自己！🌈',
            '努力终会有回报 🎯',
            '保持热爱，奔赴山海 🌊',
            '未来可期！🚀'
        ],
        isEnabled: true,
        interval: null,
        
        init() {
            this.createContainer();
            this.start();
        },
        
        createContainer() {
            this.container = document.createElement('div');
            this.container.className = 'danmaku-container';
            document.body.appendChild(this.container);
        },
        
        start() {
            // 初始发送几条
            setTimeout(() => this.send(), 1000);
            setTimeout(() => this.send(), 3000);
            
            // 定期发送
            this.interval = setInterval(() => {
                if (this.isEnabled && Math.random() > 0.5) {
                    this.send();
                }
            }, 8000);
        },
        
        send(customMsg) {
            const msg = customMsg || this.messages[Math.floor(Math.random() * this.messages.length)];
            const item = document.createElement('div');
            item.className = 'danmaku-item';
            item.textContent = msg;
            
            // 随机位置和速度
            const top = Math.random() * 30 + 10; // 10%-40% 从顶部
            const duration = Math.random() * 5 + 8; // 8-13秒
            
            item.style.top = `${top}%`;
            item.style.animationDuration = `${duration}s`;
            
            // 随机彩虹效果
            if (Math.random() > 0.8) {
                item.classList.add('rainbow');
            }
            
            this.container.appendChild(item);
            
            // 动画结束后移除
            setTimeout(() => item.remove(), duration * 1000);
        },
        
        toggle(enabled) {
            this.isEnabled = enabled;
        }
    };
    
    // ==================== v7.9: 成就徽章展示 ====================
    const AchievementShowcase = {
        element: null,
        
        init() {
            this.createElement();
        },
        
        createElement() {
            this.element = document.createElement('div');
            this.element.className = 'achievement-showcase';
            this.element.innerHTML = `
                <div class="achievement-confetti"></div>
                <div class="achievement-header">
                    <div class="achievement-badge-large">🏆</div>
                    <h3 class="achievement-title">成就达成！</h3>
                    <p class="achievement-desc">恭喜解锁新成就</p>
                </div>
                <button class="btn btn-primary" style="width:100%" onclick="this.parentElement.classList.remove('show')">太棒了！</button>
            `;
            document.body.appendChild(this.element);
        },
        
        show(badge, title, desc) {
            const badgeEl = this.element.querySelector('.achievement-badge-large');
            const titleEl = this.element.querySelector('.achievement-title');
            const descEl = this.element.querySelector('.achievement-desc');
            
            badgeEl.textContent = badge;
            titleEl.textContent = title;
            descEl.textContent = desc;
            
            this.element.classList.add('show');
            this.createConfetti();
            
            HapticFeedback.success();
        },
        
        createConfetti() {
            const confettiContainer = this.element.querySelector('.achievement-confetti');
            confettiContainer.innerHTML = '';
            
            const colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#1dd1a1', '#5f27cd'];
            
            for (let i = 0; i < 50; i++) {
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.left = `${Math.random() * 100}%`;
                piece.style.background = colors[Math.floor(Math.random() * colors.length)];
                piece.style.animationDelay = `${Math.random() * 0.5}s`;
                piece.style.transform = `rotate(${Math.random() * 360}deg)`;
                confettiContainer.appendChild(piece);
            }
        }
    };
    
    // ==================== v7.10: 宠物陪伴系统 ====================
    const StudyPet = {
        element: null,
        mood: 'happy', // happy, sleeping, normal
        speechTexts: [
            '加油哦！💪',
            '你真棒！🌟',
            '休息一下吧~',
            '我相信你！',
            '继续努力！✨',
            '今天也很棒！',
            '一起学习吧！📚'
        ],
        
        init() {
            this.createElement();
            this.setupEvents();
            this.startBehavior();
        },
        
        createElement() {
            this.element = document.createElement('div');
            this.element.className = 'study-pet';
            this.element.innerHTML = `
                <div class="pet-speech">点我互动~</div>
                <div class="pet-body">
                    <div class="pet-eyes">
                        <div class="pet-eye"></div>
                        <div class="pet-eye"></div>
                    </div>
                    <div class="pet-mouth"></div>
                    <div class="pet-blush left"></div>
                    <div class="pet-blush right"></div>
                </div>
            `;
            document.body.appendChild(this.element);
        },
        
        setupEvents() {
            this.element.addEventListener('click', () => {
                this.interact();
            });
        },
        
        interact() {
            this.setMood('happy');
            this.speak();
            HapticFeedback.light();
            
            setTimeout(() => {
                this.setMood('normal');
            }, 2000);
        },
        
        speak(text) {
            const speech = this.element.querySelector('.pet-speech');
            const msg = text || this.speechTexts[Math.floor(Math.random() * this.speechTexts.length)];
            speech.textContent = msg;
            this.element.classList.add('talking');
            
            setTimeout(() => {
                this.element.classList.remove('talking');
            }, 3000);
        },
        
        setMood(mood) {
            this.element.classList.remove('happy', 'sleeping', 'normal');
            this.element.classList.add(mood);
            this.mood = mood;
        },
        
        startBehavior() {
            // 随机行为
            setInterval(() => {
                const hour = new Date().getHours();
                
                // 晚上睡觉
                if (hour >= 23 || hour < 6) {
                    this.setMood('sleeping');
                    return;
                }
                
                // 随机说话
                if (Math.random() > 0.9) {
                    this.speak();
                }
            }, 30000);
        }
    };
    
    // ==================== V8.0: 精简解压系统重构 ====================
    /**
     * 解压系统 V8 - 精简版
     * 改进内容：
     * V8.1: 统一关闭机制
     * V8.2: 精简浮动按钮（合并为一个控制中心）
     * V8.3: 优化弹窗层级和关闭逻辑
     * V8.4: 添加遮罩点击关闭
     * V8.5: 优化动画性能
     * V8.6: 减少视觉干扰
     * V8.7: 统一控制面板入口
     * V8.8: 优化触摸体验
     * V8.9: 添加快速关闭手势
     * V8.10: 精简宠物交互
     */
    
    // V8.1: 全局关闭管理器
    const CloseManager = {
        activeOverlays: [],
        
        register(overlay, closeCallback) {
            this.activeOverlays.push({ overlay, closeCallback });
        },
        
        unregister(overlay) {
            this.activeOverlays = this.activeOverlays.filter(o => o.overlay !== overlay);
        },
        
        closeAll() {
            [...this.activeOverlays].forEach(({ closeCallback }) => {
                if (closeCallback) closeCallback();
            });
        },
        
        closeLast() {
            if (this.activeOverlays.length > 0) {
                const last = this.activeOverlays.pop();
                if (last.closeCallback) last.closeCallback();
            }
        }
    };
    
    // V8.2: ESC键关闭最后一个弹窗
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            CloseManager.closeLast();
        }
    });
    
    // 解压系统初始化 - V9.32 精简版（默认关闭，用户可选）
    const StressReliefSystem = {
        init() {
            // V9.32: 解压功能改为可选，不再自动启用
            setTimeout(() => {
                // V9.32: 只初始化模块，不自动启用效果
                // 各模块会检查localStorage中的用户设置
                ClickEffects.init();           // 检查是否启用点击效果
                WeatherParticles.init();       // 检查是否启用天气粒子
                
                console.log('✨ 解压互动系统 V9.32 已加载（默认关闭，可在设置中开启）');
                
                // V8.5: 延迟初始化控制面板
                setTimeout(() => {
                    StressReliefSystemV2.init();
                }, 500);
            }, 1000);
        }
    };
    
    // ==================== V8.6: 精简沙画板 ====================
    // V9.24: 添加遮罩关闭功能
    const ZenSandbox = {
        canvas: null,
        ctx: null,
        isDrawing: false,
        lastX: 0,
        lastY: 0,
        isActive: false,
        overlay: null,
        
        init() {
            this.createElements();
            this.setupEvents();
        },
        
        createElements() {
            // V9.24: 添加遮罩层
            // V9.31: 添加pointer-events: none防止拦截点击
            const overlay = document.createElement('div');
            overlay.className = 'zen-sandbox-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition: all 0.3s;
            `;
            document.body.appendChild(overlay);
            this.overlay = overlay;
            
            // V8.6: 移除独立切换按钮，通过统一面板控制
            // 沙盘容器
            const sandbox = document.createElement('div');
            sandbox.className = 'zen-sandbox';
            sandbox.innerHTML = `
                <button class="zen-sandbox-close" title="关闭">×</button>
                <canvas class="zen-sandbox-canvas"></canvas>
                <div class="zen-sandbox-tools">
                    <button class="sandbox-tool active" data-tool="draw">✏️</button>
                    <button class="sandbox-tool" data-tool="rake">〰️</button>
                    <button class="sandbox-tool" data-tool="clear">🗑️</button>
                </div>
            `;
            document.body.appendChild(sandbox);
            
            this.sandbox = sandbox;
            this.canvas = sandbox.querySelector('.zen-sandbox-canvas');
            this.ctx = this.canvas.getContext('2d');
            
            // V8.7: 添加关闭按钮事件
            sandbox.querySelector('.zen-sandbox-close').addEventListener('click', () => this.close());
            
            // V9.24: 遮罩点击关闭
            overlay.addEventListener('click', () => this.close());
        },
        
        setupEvents() {
            // 绘画事件
            this.canvas.addEventListener('touchstart', (e) => this.startDraw(e), { passive: false });
            this.canvas.addEventListener('touchmove', (e) => this.draw(e), { passive: false });
            this.canvas.addEventListener('touchend', () => this.endDraw());
            this.canvas.addEventListener('mousedown', (e) => this.startDrawMouse(e));
            this.canvas.addEventListener('mousemove', (e) => this.drawMouse(e));
            this.canvas.addEventListener('mouseup', () => this.endDraw());
            
            // 工具选择
            this.sandbox.querySelectorAll('.sandbox-tool').forEach(tool => {
                tool.addEventListener('click', (e) => {
                    const action = e.target.dataset.tool;
                    if (action === 'clear') {
                        this.clear();
                    } else {
                        this.sandbox.querySelectorAll('.sandbox-tool').forEach(t => t.classList.remove('active'));
                        e.target.classList.add('active');
                    }
                });
            });
        },
        
        // V8.8: 统一的打开/关闭方法
        // V9.24: 添加遮罩支持
        // V9.31: 显示时启用pointer-events
        open() {
            this.isActive = true;
            this.sandbox.classList.add('active');
            this.overlay.style.opacity = '1';
            this.overlay.style.visibility = 'visible';
            this.overlay.style.pointerEvents = 'auto';
            this.resizeCanvas();
            this.fillSand();
            CloseManager.register(this.sandbox, () => this.close());
            HapticFeedback.medium();
        },
        
        close() {
            this.isActive = false;
            this.sandbox.classList.remove('active');
            this.overlay.style.opacity = '0';
            this.overlay.style.visibility = 'hidden';
            this.overlay.style.pointerEvents = 'none';
            CloseManager.unregister(this.sandbox);
        },
        
        toggleSandbox() {
            if (this.isActive) {
                this.close();
            } else {
                this.open();
            }
        },
        
        resizeCanvas() {
            this.canvas.width = this.sandbox.offsetWidth;
            this.canvas.height = this.sandbox.offsetHeight;
        },
        
        fillSand() {
            this.ctx.fillStyle = '#e8d4b8';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // 添加沙粒纹理
            for (let i = 0; i < 3000; i++) {
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                this.ctx.fillStyle = `rgba(139, 119, 101, ${Math.random() * 0.3})`;
                this.ctx.fillRect(x, y, 1, 1);
            }
        },
        
        startDraw(e) {
            e.preventDefault();
            this.isDrawing = true;
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            this.lastX = touch.clientX - rect.left;
            this.lastY = touch.clientY - rect.top;
        },
        
        startDrawMouse(e) {
            this.isDrawing = true;
            const rect = this.canvas.getBoundingClientRect();
            this.lastX = e.clientX - rect.left;
            this.lastY = e.clientY - rect.top;
        },
        
        draw(e) {
            if (!this.isDrawing) return;
            e.preventDefault();
            const touch = e.touches[0];
            const rect = this.canvas.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            this.drawLine(x, y);
        },
        
        drawMouse(e) {
            if (!this.isDrawing) return;
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.drawLine(x, y);
        },
        
        drawLine(x, y) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.lastX, this.lastY);
            this.ctx.lineTo(x, y);
            this.ctx.strokeStyle = '#c4a87c';
            this.ctx.lineWidth = 15;
            this.ctx.lineCap = 'round';
            this.ctx.shadowColor = 'rgba(0,0,0,0.2)';
            this.ctx.shadowBlur = 5;
            this.ctx.stroke();
            
            this.lastX = x;
            this.lastY = y;
        },
        
        endDraw() {
            this.isDrawing = false;
        },
        
        clear() {
            this.fillSand();
            HapticFeedback.light();
        }
    };
    
    // ==================== V8.7: 精简心情调色板 ====================
    // V9.26: 添加遮罩关闭功能
    const MoodPalette = {
        isActive: false,
        currentMood: null,
        overlay: null,
        
        init() {
            this.createElement();
            this.setupEvents();
        },
        
        createElement() {
            // V9.26: 添加遮罩层
            // V9.31: 添加pointer-events: none防止拦截点击
            const overlay = document.createElement('div');
            overlay.className = 'mood-palette-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.4);
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition: all 0.3s;
            `;
            document.body.appendChild(overlay);
            this.overlay = overlay;
            overlay.addEventListener('click', () => this.close());
            
            const palette = document.createElement('div');
            palette.className = 'mood-palette';
            palette.innerHTML = `
                <button class="mood-palette-close" title="关闭">×</button>
                <h4 style="margin: 0 0 15px; font-size: 14px; color: var(--gray-600);">今天心情如何？</h4>
                <div class="mood-colors">
                    <div class="mood-color" style="background: #ff6b6b" data-mood="😊" data-name="开心"></div>
                    <div class="mood-color" style="background: #feca57" data-mood="😎" data-name="自信"></div>
                    <div class="mood-color" style="background: #48dbfb" data-mood="😌" data-name="平静"></div>
                    <div class="mood-color" style="background: #1dd1a1" data-mood="🤗" data-name="温暖"></div>
                    <div class="mood-color" style="background: #5f27cd" data-mood="🤔" data-name="思考"></div>
                    <div class="mood-color" style="background: #ff9ff3" data-mood="💖" data-name="幸福"></div>
                </div>
                <div style="margin-top: 15px;">
                    <p style="font-size: 12px; color: var(--gray-500); margin-bottom: 8px;">能量值</p>
                    <input type="range" class="mood-slider" min="1" max="10" value="5">
                </div>
            `;
            document.body.appendChild(palette);
            this.element = palette;
        },
        
        setupEvents() {
            // V8.7: 移除左侧toggle按钮，通过统一面板控制
            // 添加关闭按钮
            this.element.querySelector('.mood-palette-close').addEventListener('click', () => this.close());
            
            this.element.querySelectorAll('.mood-color').forEach(color => {
                color.addEventListener('click', (e) => {
                    this.selectMood(e.target);
                });
            });
        },
        
        open() {
            this.isActive = true;
            this.element.classList.add('active');
            this.overlay.style.opacity = '1';
            this.overlay.style.visibility = 'visible';
            this.overlay.style.pointerEvents = 'auto';
            CloseManager.register(this.element, () => this.close());
        },
        
        close() {
            this.isActive = false;
            this.element.classList.remove('active');
            this.overlay.style.opacity = '0';
            this.overlay.style.visibility = 'hidden';
            this.overlay.style.pointerEvents = 'none';
            CloseManager.unregister(this.element);
        },
        
        selectMood(el) {
            this.element.querySelectorAll('.mood-color').forEach(c => c.classList.remove('selected'));
            el.classList.add('selected');
            
            const mood = el.dataset.mood;
            const name = el.dataset.name;
            this.currentMood = { mood, name };
            
            this.saveMood();
            showSmartToast(`今天的心情：${mood} ${name}`, 'success', 2000);
            HapticFeedback.light();
            
            // V8.7: 选择后自动关闭
            setTimeout(() => this.close(), 1500);
        },
        
        saveMood() {
            const moodLog = JSON.parse(localStorage.getItem('moodLog') || '[]');
            moodLog.push({
                ...this.currentMood,
                energy: this.element.querySelector('.mood-slider').value,
                date: new Date().toISOString()
            });
            localStorage.setItem('moodLog', JSON.stringify(moodLog.slice(-30)));
        }
    };
    
    // ==================== V8.8: 精简泡泡纸 ====================
    // V9.25: 添加遮罩关闭功能
    const BubbleWrap = {
        isActive: false,
        bubbleCount: 0,
        poppedCount: 0,
        overlay: null,
        
        init() {
            this.createElements();
        },
        
        createElements() {
            // V9.25: 添加遮罩层
            // V9.31: 添加pointer-events: none防止拦截点击
            const overlay = document.createElement('div');
            overlay.className = 'bubble-wrap-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition: all 0.3s;
            `;
            document.body.appendChild(overlay);
            this.overlay = overlay;
            overlay.addEventListener('click', () => this.close());
            
            // V8.8: 移除独立toggle按钮
            const wrap = document.createElement('div');
            wrap.className = 'bubble-wrap';
            wrap.innerHTML = '<button class="bubble-wrap-close" title="关闭">×</button>';
            document.body.appendChild(wrap);
            
            this.wrap = wrap;
            
            // 关闭按钮
            wrap.querySelector('.bubble-wrap-close').addEventListener('click', () => this.close());
        },
        
        open() {
            this.isActive = true;
            this.wrap.classList.add('active');
            this.overlay.style.opacity = '1';
            this.overlay.style.visibility = 'visible';
            this.overlay.style.pointerEvents = 'auto';
            this.createBubbles();
            CloseManager.register(this.wrap, () => this.close());
            HapticFeedback.medium();
        },
        
        close() {
            this.isActive = false;
            this.wrap.classList.remove('active');
            this.overlay.style.opacity = '0';
            this.overlay.style.visibility = 'hidden';
            this.overlay.style.pointerEvents = 'none';
            CloseManager.unregister(this.wrap);
        },
        
        toggleWrap() {
            if (this.isActive) {
                this.close();
            } else {
                this.open();
            }
        },
        
        createBubbles() {
            // 清除旧的泡泡，保留关闭按钮
            const closeBtn = this.wrap.querySelector('.bubble-wrap-close');
            this.wrap.innerHTML = '';
            this.wrap.appendChild(closeBtn);
            
            this.poppedCount = 0;
            const count = Math.floor((this.wrap.offsetWidth / 48) * (this.wrap.offsetHeight / 48));
            this.bubbleCount = count;
            
            for (let i = 0; i < count; i++) {
                const bubble = document.createElement('div');
                bubble.className = 'pop-bubble';
                bubble.addEventListener('click', () => this.popBubble(bubble));
                bubble.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    this.popBubble(bubble);
                }, { passive: false });
                this.wrap.appendChild(bubble);
            }
        },
        
        popBubble(bubble) {
            if (bubble.classList.contains('popped')) return;
            
            bubble.classList.add('pop-animation');
            HapticFeedback.light();
            
            setTimeout(() => {
                bubble.classList.add('popped');
                bubble.classList.remove('pop-animation');
                this.poppedCount++;
                
                if (this.poppedCount >= this.bubbleCount) {
                    setTimeout(() => {
                        showSmartToast('🎉 全部戳完了！好解压~', 'success', 2000);
                        celebrateSuccess();
                    }, 300);
                }
            }, 150);
        }
    };
    
    // ==================== V8.9: 精简番茄钟 ====================
    // V9.27: 添加遮罩关闭功能
    const FocusTimer = {
        isActive: false,
        isRunning: false,
        timeLeft: 25 * 60,
        totalTime: 25 * 60,
        interval: null,
        overlay: null,
        
        init() {
            this.createElement();
            this.setupEvents();
        },
        
        createElement() {
            // V9.27: 添加遮罩层
            // V9.31: 添加pointer-events: none防止拦截点击
            const overlay = document.createElement('div');
            overlay.className = 'focus-timer-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.4);
                z-index: 9999;
                opacity: 0;
                visibility: hidden;
                pointer-events: none;
                transition: all 0.3s;
            `;
            document.body.appendChild(overlay);
            this.overlay = overlay;
            overlay.addEventListener('click', () => this.close());
            
            const timer = document.createElement('div');
            timer.className = 'focus-timer';
            timer.innerHTML = `
                <button class="focus-timer-close" title="关闭">×</button>
                <div class="timer-display">25:00</div>
                <div class="timer-progress">
                    <div class="timer-progress-bar" style="width: 100%"></div>
                </div>
                <div class="timer-controls">
                    <button class="timer-btn primary start-btn">开始专注</button>
                    <button class="timer-btn secondary reset-btn">重置</button>
                </div>
            `;
            document.body.appendChild(timer);
            this.element = timer;
        },
        
        setupEvents() {
            const startBtn = this.element.querySelector('.start-btn');
            const resetBtn = this.element.querySelector('.reset-btn');
            const closeBtn = this.element.querySelector('.focus-timer-close');
            
            startBtn.addEventListener('click', () => this.toggleTimer());
            resetBtn.addEventListener('click', () => this.reset());
            closeBtn.addEventListener('click', () => this.close());
        },
        
        show() {
            this.isActive = true;
            this.element.classList.add('active');
            this.overlay.style.opacity = '1';
            this.overlay.style.visibility = 'visible';
            this.overlay.style.pointerEvents = 'auto';
            CloseManager.register(this.element, () => this.close());
        },
        
        close() {
            this.isActive = false;
            this.element.classList.remove('active');
            this.overlay.style.opacity = '0';
            this.overlay.style.visibility = 'hidden';
            this.overlay.style.pointerEvents = 'none';
            CloseManager.unregister(this.element);
            // V8.9: 关闭时暂停计时但不重置
            if (this.isRunning) {
                this.pause();
            }
        },
        
        toggleTimer() {
            if (this.isRunning) {
                this.pause();
            } else {
                this.start();
            }
        },
        
        start() {
            this.isRunning = true;
            this.element.querySelector('.start-btn').textContent = '暂停';
            
            this.interval = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.complete();
                }
            }, 1000);
            
            HapticFeedback.medium();
        },
        
        pause() {
            this.isRunning = false;
            this.element.querySelector('.start-btn').textContent = '继续';
            clearInterval(this.interval);
        },
        
        reset() {
            this.pause();
            this.timeLeft = this.totalTime;
            this.updateDisplay();
            this.element.querySelector('.start-btn').textContent = '开始专注';
        },
        
        complete() {
            this.pause();
            showSmartToast('🍅 专注时间结束！休息一下吧~', 'success', 3000);
            celebrateSuccess();
            HapticFeedback.success();
            this.reset();
        },
        
        updateDisplay() {
            const mins = Math.floor(this.timeLeft / 60);
            const secs = this.timeLeft % 60;
            const display = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            this.element.querySelector('.timer-display').textContent = display;
            const progress = (this.timeLeft / this.totalTime) * 100;
            this.element.querySelector('.timer-progress-bar').style.width = `${progress}%`;
        }
    };
    
    // ==================== v7.15: 轻拍节奏游戏 ====================
    const RhythmGame = {
        isActive: false,
        score: 0,
        gameInterval: null,
        
        init() {
            // 简化版：不自动创建，通过控制面板启动
        },
        
        start() {
            if (this.isActive) return;
            this.isActive = true;
            this.score = 0;
            
            this.createElement();
            this.startGame();
        },
        
        createElement() {
            const game = document.createElement('div');
            game.className = 'rhythm-game active';
            game.innerHTML = `
                <div class="rhythm-score">得分: 0</div>
                <div class="rhythm-lanes">
                    <div class="rhythm-lane" data-lane="0"><div class="rhythm-hit-zone"></div></div>
                    <div class="rhythm-lane" data-lane="1"><div class="rhythm-hit-zone"></div></div>
                    <div class="rhythm-lane" data-lane="2"><div class="rhythm-hit-zone"></div></div>
                </div>
            `;
            document.body.appendChild(game);
            this.element = game;
            
            // 点击检测
            game.querySelectorAll('.rhythm-lane').forEach(lane => {
                lane.addEventListener('click', () => this.hitLane(lane));
            });
        },
        
        startGame() {
            // 每800ms生成一个音符
            this.gameInterval = setInterval(() => {
                if (!this.isActive) return;
                this.spawnNote();
            }, 800);
            
            // 30秒后结束
            setTimeout(() => this.endGame(), 30000);
        },
        
        spawnNote() {
            const laneIdx = Math.floor(Math.random() * 3);
            const lane = this.element.querySelectorAll('.rhythm-lane')[laneIdx];
            
            const note = document.createElement('div');
            note.className = 'rhythm-note';
            note.style.animationDuration = '2s';
            lane.appendChild(note);
            
            note.addEventListener('animationend', () => note.remove());
        },
        
        hitLane(lane) {
            const notes = lane.querySelectorAll('.rhythm-note');
            const hitZone = lane.querySelector('.rhythm-hit-zone');
            const hitRect = hitZone.getBoundingClientRect();
            
            notes.forEach(note => {
                const noteRect = note.getBoundingClientRect();
                // 检测是否在击中区域
                if (noteRect.bottom > hitRect.top && noteRect.top < hitRect.bottom) {
                    this.score += 100;
                    note.remove();
                    this.updateScore();
                    this.showFeedback('Perfect!');
                    HapticFeedback.light();
                }
            });
        },
        
        updateScore() {
            this.element.querySelector('.rhythm-score').textContent = `得分: ${this.score}`;
        },
        
        showFeedback(text) {
            const feedback = document.createElement('div');
            feedback.className = 'rhythm-feedback';
            feedback.textContent = text;
            this.element.appendChild(feedback);
            setTimeout(() => feedback.remove(), 500);
        },
        
        endGame() {
            clearInterval(this.gameInterval);
            this.isActive = false;
            
            showSmartToast(`🎵 游戏结束！得分: ${this.score}`, 'success', 3000);
            
            setTimeout(() => {
                if (this.element) {
                    this.element.remove();
                    this.element = null;
                }
            }, 1000);
        }
    };
    
    // ==================== v7.16: 随机奖励刮刮卡 ====================
    const ScratchCard = {
        prizes: [
            { emoji: '⭐', text: '获得额外5分钟休息时间！' },
            { emoji: '🎁', text: '解锁今日隐藏名言！' },
            { emoji: '💎', text: '获得双倍学习积分！' },
            { emoji: '🌟', text: '你今天特别棒！' },
            { emoji: '🍀', text: '好运降临！' },
            { emoji: '🎉', text: '庆祝坚持学习！' }
        ],
        
        init() {
            // 随机触发（每次10%概率）
            if (Math.random() < 0.1) {
                setTimeout(() => this.show(), 5000);
            }
        },
        
        show() {
            const prize = this.prizes[Math.floor(Math.random() * this.prizes.length)];
            
            const card = document.createElement('div');
            card.className = 'scratch-card';
            card.innerHTML = `
                <button class="scratch-card-close">×</button>
                <div class="scratch-card-content">
                    <div class="scratch-prize">${prize.emoji}</div>
                    <div class="scratch-text">${prize.text}</div>
                </div>
                <div class="scratch-cover"></div>
            `;
            document.body.appendChild(card);
            
            setTimeout(() => card.classList.add('show'), 10);
            
            // 刮开效果
            const cover = card.querySelector('.scratch-cover');
            cover.addEventListener('click', () => {
                cover.style.opacity = '0';
                setTimeout(() => cover.remove(), 300);
                HapticFeedback.success();
                celebrateSuccess();
            });
            
            // 关闭
            card.querySelector('.scratch-card-close').addEventListener('click', () => {
                card.classList.remove('show');
                setTimeout(() => card.remove(), 400);
            });
        }
    };
    
    // ==================== v7.17: 幸运转盘 ====================
    const LuckyWheel = {
        prizes: ['🎁 双倍积分', '⭐ 鼓励之星', '💪 加油卡', '🌟 好运徽章', '🎉 庆祝时刻', '💎 钻石奖励', '🍀 幸运草', '🏆 成就达成'],
        currentRotation: 0,
        
        init() {
            // 不自动显示，通过控制面板触发
        },
        
        show() {
            const wheel = document.createElement('div');
            wheel.className = 'lucky-wheel';
            wheel.innerHTML = `
                <div class="wheel-container">
                    <div class="wheel-pointer"></div>
                    <div class="wheel"></div>
                    <div class="wheel-center">转一转</div>
                </div>
                <button class="wheel-close">×</button>
            `;
            document.body.appendChild(wheel);
            
            setTimeout(() => wheel.classList.add('show'), 10);
            
            const center = wheel.querySelector('.wheel-center');
            const wheelEl = wheel.querySelector('.wheel');
            
            center.addEventListener('click', () => {
                if (center.dataset.spinning) return;
                center.dataset.spinning = 'true';
                center.textContent = '...';
                
                // 随机旋转
                const extraRotation = 1440 + Math.random() * 360; // 至少4圈
                this.currentRotation += extraRotation;
                wheelEl.style.transform = `rotate(${this.currentRotation}deg)`;
                
                // 4秒后显示结果
                setTimeout(() => {
                    const prizeIndex = Math.floor(Math.random() * this.prizes.length);
                    showSmartToast(`🎰 ${this.prizes[prizeIndex]}`, 'success', 3000);
                    HapticFeedback.success();
                    center.textContent = '再转';
                    delete center.dataset.spinning;
                }, 4000);
            });
            
            wheel.querySelector('.wheel-close').addEventListener('click', () => {
                wheel.classList.remove('show');
                setTimeout(() => wheel.remove(), 400);
            });
            
            this.element = wheel;
        }
    };
    
    // ==================== v7.18: 可爱表情反应 ====================
    const EmojiReactions = {
        emojis: ['😊', '🎉', '💪', '🌟', '❤️'],
        
        init() {
            this.createElement();
            this.setupEvents();
        },
        
        createElement() {
            const container = document.createElement('div');
            container.className = 'emoji-reactions';
            
            this.emojis.forEach(emoji => {
                const btn = document.createElement('button');
                btn.className = 'emoji-btn';
                btn.textContent = emoji;
                container.appendChild(btn);
            });
            
            document.body.appendChild(container);
            this.element = container;
        },
        
        setupEvents() {
            this.element.querySelectorAll('.emoji-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    this.explode(e.target.textContent, e.target);
                });
            });
        },
        
        explode(emoji, target) {
            const rect = target.getBoundingClientRect();
            
            for (let i = 0; i < 8; i++) {
                const explosion = document.createElement('div');
                explosion.className = 'emoji-explosion';
                explosion.textContent = emoji;
                explosion.style.left = `${rect.left + rect.width / 2}px`;
                explosion.style.top = `${rect.top + rect.height / 2}px`;
                explosion.style.animationDelay = `${i * 0.05}s`;
                document.body.appendChild(explosion);
                
                setTimeout(() => explosion.remove(), 1000);
            }
            
            HapticFeedback.light();
        }
    };
    
    // ==================== v7.19: 冥想引导界面 ====================
    const MeditationMode = {
        isActive: false,
        timer: null,
        seconds: 0,
        texts: ['放松...', '呼吸...', '专注当下...', '感受平静...', '释放压力...'],
        
        init() {
            // 通过控制面板触发
        },
        
        start(duration = 180) { // 默认3分钟
            this.seconds = duration;
            this.createElement();
            this.isActive = true;
            
            setTimeout(() => {
                this.element.classList.add('active');
                this.startTimer();
                this.cycleText();
            }, 10);
        },
        
        createElement() {
            const overlay = document.createElement('div');
            overlay.className = 'meditation-overlay';
            overlay.innerHTML = `
                <div class="meditation-stars"></div>
                <div class="meditation-orb"></div>
                <div class="meditation-text">放松...</div>
                <div class="meditation-timer">3:00</div>
                <button class="meditation-close">×</button>
            `;
            document.body.appendChild(overlay);
            this.element = overlay;
            
            // 创建星星
            const stars = overlay.querySelector('.meditation-stars');
            for (let i = 0; i < 50; i++) {
                const star = document.createElement('div');
                star.className = 'meditation-star';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 2}s`;
                stars.appendChild(star);
            }
            
            // 关闭按钮
            overlay.querySelector('.meditation-close').addEventListener('click', () => this.stop());
        },
        
        startTimer() {
            this.timer = setInterval(() => {
                this.seconds--;
                this.updateTimer();
                
                if (this.seconds <= 0) {
                    this.complete();
                }
            }, 1000);
        },
        
        updateTimer() {
            const mins = Math.floor(this.seconds / 60);
            const secs = this.seconds % 60;
            this.element.querySelector('.meditation-timer').textContent = 
                `${mins}:${secs.toString().padStart(2, '0')}`;
        },
        
        cycleText() {
            let idx = 0;
            this.textInterval = setInterval(() => {
                idx = (idx + 1) % this.texts.length;
                this.element.querySelector('.meditation-text').textContent = this.texts[idx];
            }, 5000);
        },
        
        stop() {
            this.isActive = false;
            clearInterval(this.timer);
            clearInterval(this.textInterval);
            
            this.element.classList.remove('active');
            setTimeout(() => this.element.remove(), 500);
        },
        
        complete() {
            this.stop();
            showSmartToast('🧘 冥想完成！感觉更平静了~', 'success', 3000);
            HapticFeedback.success();
        }
    };
    
    // ==================== V9.33-V9.37: 删除解压面板功能 ====================
    /**
     * 解压面板功能评估：
     * V9.33: 分析发现该功能存在以下问题：
     *   1. 按钮位置干扰正常操作（左下角容易误触）
     *   2. 面板关闭逻辑不稳定
     *   3. 功能与主要学习目的不符
     *   4. 占用屏幕空间
     *   5. 用户几乎不使用
     * 
     * V9.34: 决定删除该功能，保留核心解压工具（沙画、泡泡等）
     *        可通过设置中的开关单独启用
     * 
     * V9.35: 清理相关代码和样式
     * V9.36: 移除浮动按钮
     * V9.37: 完全禁用，用户可在设置中手动开启解压功能
     */
    
    // 解压面板 - 已禁用 (V9.33-V9.37)
    const StressReliefPanel = {
        isVisible: false,
        overlay: null,
        toggle: null,
        panel: null,
        
        init() {
            // V9.37: 完全禁用解压面板
            // 不再创建浮动按钮，用户可通过设置开启单独功能
            console.log('💤 解压面板已禁用 (V9.37)');
        },
        
        createElement() {
            // 已禁用
        },
        
        setupEvents() {
            // 已禁用
        },
        
        togglePanel() {
            // 已禁用
        },
        
        showPanel() {
            // 已禁用
        },
        
        hidePanel() {
            // 已禁用
        },
        
        handleAction(action) {
            // 已禁用
        }
    };
    
    // V9.37: 精简版 StressReliefSystemV2 - 只初始化基础模块
    const StressReliefSystemV2 = {
        init() {
            // V9.37: 只初始化基础模块，不显示面板
            ZenSandbox.init();
            MoodPalette.init();
            BubbleWrap.init();
            FocusTimer.init();
            // V9.37: 不再初始化 StressReliefPanel
            
            console.log('✨ 解压系统 V9.37 已加载（面板已移除，功能可通过设置开启）');
        }
    };

    // 页面加载后初始化解压系统
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => StressReliefSystem.init());
    } else {
        StressReliefSystem.init();
    }

    // ==================== 宠物陪伴系统 v12 可爱动物版 ====================
    // 6个版本迭代：使用SVG绘制符合人类认知的可爱动物形象
    
    // v12.1: 宠物类型定义
    const PET_TYPES = {
        cat: { name: '小猫咪', sound: '喵~' },
        dog: { name: '小狗狗', sound: '汪汪~' },
        rabbit: { name: '小兔兔', sound: '~' },
        bear: { name: '小熊熊', sound: '哼哼~' },
        panda: { name: '熊猫', sound: '嘤嘤~' },
        fox: { name: '小狐狸', sound: '呜~' },
        penguin: { name: '小企鹅', sound: '嘎嘎~' },
        hamster: { name: '小仓鼠', sound: '吱吱~' },
        owl: { name: '猫头鹰', sound: '咕咕~' },
        shark: { name: '小鲨鲨', sound: '咕噜~' }
    };
    
    // v12.2: 使用SVG绘制可爱动物 - 更符合人类认知
    function generatePetSVG(type, size = 50) {
        const svgs = {
            // 小猫咪 - 圆脸尖耳朵
            cat: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="catGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FFD4E5"/><stop offset="100%" style="stop-color:#FFB6C1"/></linearGradient></defs>
                <!-- 耳朵 -->
                <path d="M25 35 L20 10 L40 25 Z" fill="url(#catGrad)" stroke="#FF69B4" stroke-width="1"/>
                <path d="M75 35 L80 10 L60 25 Z" fill="url(#catGrad)" stroke="#FF69B4" stroke-width="1"/>
                <path d="M27 30 L24 15 L38 26 Z" fill="#FFB6C1"/>
                <path d="M73 30 L76 15 L62 26 Z" fill="#FFB6C1"/>
                <!-- 脸 -->
                <ellipse cx="50" cy="55" rx="35" ry="32" fill="url(#catGrad)" stroke="#FF69B4" stroke-width="1"/>
                <!-- 眼睛 -->
                <ellipse cx="35" cy="50" rx="8" ry="10" fill="white"/>
                <ellipse cx="65" cy="50" rx="8" ry="10" fill="white"/>
                <ellipse cx="36" cy="52" rx="5" ry="6" fill="#333"/>
                <ellipse cx="66" cy="52" rx="5" ry="6" fill="#333"/>
                <circle cx="34" cy="49" r="2" fill="white"/>
                <circle cx="64" cy="49" r="2" fill="white"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="62" rx="4" ry="3" fill="#FF69B4"/>
                <!-- 嘴巴 -->
                <path d="M50 65 Q45 72 40 68" fill="none" stroke="#FF69B4" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M50 65 Q55 72 60 68" fill="none" stroke="#FF69B4" stroke-width="1.5" stroke-linecap="round"/>
                <!-- 胡须 -->
                <line x1="20" y1="58" x2="32" y2="60" stroke="#FF69B4" stroke-width="1"/>
                <line x1="20" y1="65" x2="32" y2="65" stroke="#FF69B4" stroke-width="1"/>
                <line x1="68" y1="60" x2="80" y2="58" stroke="#FF69B4" stroke-width="1"/>
                <line x1="68" y1="65" x2="80" y2="65" stroke="#FF69B4" stroke-width="1"/>
                <!-- 腮红 -->
                <ellipse cx="25" cy="62" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
                <ellipse cx="75" cy="62" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
            </svg>`,
            
            // 小狗狗 - 垂耳朵大鼻子
            dog: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="dogGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#F5DEB3"/><stop offset="100%" style="stop-color:#DEB887"/></linearGradient></defs>
                <!-- 垂耳朵 -->
                <ellipse cx="22" cy="50" rx="12" ry="25" fill="#CD853F"/>
                <ellipse cx="78" cy="50" rx="12" ry="25" fill="#CD853F"/>
                <!-- 脸 -->
                <ellipse cx="50" cy="50" rx="32" ry="30" fill="url(#dogGrad)" stroke="#CD853F" stroke-width="1"/>
                <!-- 眼睛 -->
                <ellipse cx="38" cy="45" rx="7" ry="8" fill="white"/>
                <ellipse cx="62" cy="45" rx="7" ry="8" fill="white"/>
                <ellipse cx="39" cy="47" rx="4" ry="5" fill="#333"/>
                <ellipse cx="63" cy="47" rx="4" ry="5" fill="#333"/>
                <circle cx="37" cy="44" r="2" fill="white"/>
                <circle cx="61" cy="44" r="2" fill="white"/>
                <!-- 大鼻子 -->
                <ellipse cx="50" cy="58" rx="8" ry="6" fill="#333"/>
                <ellipse cx="48" cy="56" rx="2" ry="1.5" fill="#666"/>
                <!-- 嘴巴 -->
                <path d="M50 64 Q50 72 42 70" fill="none" stroke="#CD853F" stroke-width="2" stroke-linecap="round"/>
                <path d="M50 64 Q50 72 58 70" fill="none" stroke="#CD853F" stroke-width="2" stroke-linecap="round"/>
                <!-- 舌头 -->
                <ellipse cx="50" cy="73" rx="5" ry="6" fill="#FF6B6B"/>
                <!-- 腮红 -->
                <ellipse cx="28" cy="55" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
                <ellipse cx="72" cy="55" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
            </svg>`,
            
            // 小兔兔 - 长耳朵红眼睛
            rabbit: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="rabbitGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FFFFFF"/><stop offset="100%" style="stop-color:#FFF0F5"/></linearGradient></defs>
                <!-- 长耳朵 -->
                <ellipse cx="35" cy="22" rx="10" ry="25" fill="url(#rabbitGrad)" stroke="#FFB6C1" stroke-width="1"/>
                <ellipse cx="65" cy="22" rx="10" ry="25" fill="url(#rabbitGrad)" stroke="#FFB6C1" stroke-width="1"/>
                <ellipse cx="35" cy="22" rx="5" ry="18" fill="#FFB6C1" opacity="0.4"/>
                <ellipse cx="65" cy="22" rx="5" ry="18" fill="#FFB6C1" opacity="0.4"/>
                <!-- 脸 -->
                <ellipse cx="50" cy="62" rx="30" ry="28" fill="url(#rabbitGrad)" stroke="#FFB6C1" stroke-width="1"/>
                <!-- 眼睛 -->
                <ellipse cx="38" cy="55" rx="8" ry="10" fill="white"/>
                <ellipse cx="62" cy="55" rx="8" ry="10" fill="white"/>
                <ellipse cx="39" cy="57" rx="5" ry="6" fill="#FF6B8A"/>
                <ellipse cx="63" cy="57" rx="5" ry="6" fill="#FF6B8A"/>
                <circle cx="37" cy="54" r="2" fill="white"/>
                <circle cx="61" cy="54" r="2" fill="white"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="68" rx="4" ry="3" fill="#FFB6C1"/>
                <!-- Y形嘴巴 -->
                <line x1="50" y1="71" x2="50" y2="76" stroke="#FFB6C1" stroke-width="1.5"/>
                <path d="M44 80 Q50 76 56 80" fill="none" stroke="#FFB6C1" stroke-width="1.5"/>
                <!-- 腮红 -->
                <ellipse cx="28" cy="65" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
                <ellipse cx="72" cy="65" rx="6" ry="4" fill="#FFB6C1" opacity="0.5"/>
            </svg>`,
            
            // 小熊熊 - 圆耳朵棕色
            bear: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="bearGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#DEB887"/><stop offset="100%" style="stop-color:#CD853F"/></linearGradient></defs>
                <!-- 圆耳朵 -->
                <circle cx="25" cy="28" r="14" fill="url(#bearGrad)" stroke="#8B4513" stroke-width="1"/>
                <circle cx="75" cy="28" r="14" fill="url(#bearGrad)" stroke="#8B4513" stroke-width="1"/>
                <circle cx="25" cy="28" r="8" fill="#C4A67C"/>
                <circle cx="75" cy="28" r="8" fill="#C4A67C"/>
                <!-- 脸 -->
                <ellipse cx="50" cy="55" rx="35" ry="32" fill="url(#bearGrad)" stroke="#8B4513" stroke-width="1"/>
                <!-- 眼睛 -->
                <ellipse cx="38" cy="48" rx="5" ry="6" fill="#333"/>
                <ellipse cx="62" cy="48" rx="5" ry="6" fill="#333"/>
                <circle cx="36" cy="46" r="2" fill="white"/>
                <circle cx="60" cy="46" r="2" fill="white"/>
                <!-- 口鼻区域 -->
                <ellipse cx="50" cy="65" rx="15" ry="12" fill="#C4A67C"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="60" rx="6" ry="4" fill="#333"/>
                <!-- 嘴巴 -->
                <path d="M50 64 Q45 72 42 68" fill="none" stroke="#8B4513" stroke-width="1.5"/>
                <path d="M50 64 Q55 72 58 68" fill="none" stroke="#8B4513" stroke-width="1.5"/>
                <!-- 腮红 -->
                <ellipse cx="28" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.4"/>
                <ellipse cx="72" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.4"/>
            </svg>`,
            
            // 熊猫 - 黑眼圈标志性
            panda: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <!-- 黑耳朵 -->
                <circle cx="25" cy="25" r="14" fill="#333"/>
                <circle cx="75" cy="25" r="14" fill="#333"/>
                <!-- 白脸 -->
                <ellipse cx="50" cy="55" rx="35" ry="32" fill="white" stroke="#ddd" stroke-width="1"/>
                <!-- 黑眼圈 -->
                <ellipse cx="35" cy="48" rx="14" ry="12" fill="#333"/>
                <ellipse cx="65" cy="48" rx="14" ry="12" fill="#333"/>
                <!-- 眼睛 -->
                <ellipse cx="35" cy="48" rx="6" ry="7" fill="white"/>
                <ellipse cx="65" cy="48" rx="6" ry="7" fill="white"/>
                <ellipse cx="36" cy="50" rx="3" ry="4" fill="#333"/>
                <ellipse cx="66" cy="50" rx="3" ry="4" fill="#333"/>
                <circle cx="34" cy="47" r="1.5" fill="white"/>
                <circle cx="64" cy="47" r="1.5" fill="white"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="62" rx="5" ry="4" fill="#333"/>
                <!-- 嘴巴 -->
                <path d="M50 66 Q45 73 40 70" fill="none" stroke="#333" stroke-width="1.5"/>
                <path d="M50 66 Q55 73 60 70" fill="none" stroke="#333" stroke-width="1.5"/>
                <!-- 腮红 -->
                <ellipse cx="25" cy="60" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
                <ellipse cx="75" cy="60" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
            </svg>`,
            
            // 小狐狸 - 尖脸大尾巴
            fox: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="foxGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FF8C00"/><stop offset="100%" style="stop-color:#FF6600"/></linearGradient></defs>
                <!-- 尖耳朵 -->
                <path d="M28 40 L18 8 L42 30 Z" fill="url(#foxGrad)" stroke="#CC5500" stroke-width="1"/>
                <path d="M72 40 L82 8 L58 30 Z" fill="url(#foxGrad)" stroke="#CC5500" stroke-width="1"/>
                <path d="M28 35 L22 15 L38 30 Z" fill="#FFE4C4"/>
                <path d="M72 35 L78 15 L62 30 Z" fill="#FFE4C4"/>
                <!-- 尖脸 -->
                <path d="M15 45 Q50 40 85 45 Q85 75 50 88 Q15 75 15 45 Z" fill="url(#foxGrad)" stroke="#CC5500" stroke-width="1"/>
                <!-- 白色脸部 -->
                <path d="M30 55 Q50 50 70 55 Q70 75 50 85 Q30 75 30 55 Z" fill="white"/>
                <!-- 眼睛 -->
                <ellipse cx="38" cy="50" rx="6" ry="7" fill="white" stroke="#CC5500" stroke-width="0.5"/>
                <ellipse cx="62" cy="50" rx="6" ry="7" fill="white" stroke="#CC5500" stroke-width="0.5"/>
                <ellipse cx="39" cy="52" rx="3" ry="4" fill="#333"/>
                <ellipse cx="63" cy="52" rx="3" ry="4" fill="#333"/>
                <circle cx="37" cy="49" r="1.5" fill="white"/>
                <circle cx="61" cy="49" r="1.5" fill="white"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="65" rx="4" ry="3" fill="#333"/>
                <!-- 嘴巴 -->
                <path d="M50 68 Q47 73 44 70" fill="none" stroke="#CC5500" stroke-width="1"/>
                <path d="M50 68 Q53 73 56 70" fill="none" stroke="#CC5500" stroke-width="1"/>
            </svg>`,
            
            // 小企鹅 - 圆身白肚子
            penguin: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <!-- 身体 -->
                <ellipse cx="50" cy="55" rx="35" ry="40" fill="#333"/>
                <!-- 白肚子 -->
                <ellipse cx="50" cy="60" rx="22" ry="30" fill="white"/>
                <!-- 眼睛 -->
                <ellipse cx="38" cy="40" rx="8" ry="9" fill="white"/>
                <ellipse cx="62" cy="40" rx="8" ry="9" fill="white"/>
                <ellipse cx="39" cy="42" rx="4" ry="5" fill="#333"/>
                <ellipse cx="63" cy="42" rx="4" ry="5" fill="#333"/>
                <circle cx="37" cy="39" r="2" fill="white"/>
                <circle cx="61" cy="39" r="2" fill="white"/>
                <!-- 嘴巴 -->
                <path d="M40 52 L50 58 L60 52 Z" fill="#FF8C00"/>
                <!-- 腮红 -->
                <ellipse cx="30" cy="48" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
                <ellipse cx="70" cy="48" rx="5" ry="3" fill="#FFB6C1" opacity="0.6"/>
                <!-- 脚 -->
                <ellipse cx="40" cy="92" rx="8" ry="4" fill="#FF8C00"/>
                <ellipse cx="60" cy="92" rx="8" ry="4" fill="#FF8C00"/>
            </svg>`,
            
            // 小仓鼠 - 胖脸大腮帮
            hamster: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="hamGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FFE4C4"/><stop offset="100%" style="stop-color:#F4A460"/></linearGradient></defs>
                <!-- 圆耳朵 -->
                <circle cx="22" cy="32" r="10" fill="url(#hamGrad)" stroke="#CD853F" stroke-width="1"/>
                <circle cx="78" cy="32" r="10" fill="url(#hamGrad)" stroke="#CD853F" stroke-width="1"/>
                <circle cx="22" cy="32" r="5" fill="#FFB6C1"/>
                <circle cx="78" cy="32" r="5" fill="#FFB6C1"/>
                <!-- 胖脸 -->
                <ellipse cx="50" cy="55" rx="38" ry="35" fill="url(#hamGrad)" stroke="#CD853F" stroke-width="1"/>
                <!-- 眼睛 -->
                <ellipse cx="38" cy="48" rx="6" ry="7" fill="#333"/>
                <ellipse cx="62" cy="48" rx="6" ry="7" fill="#333"/>
                <circle cx="36" cy="46" r="2" fill="white"/>
                <circle cx="60" cy="46" r="2" fill="white"/>
                <!-- 鼻子 -->
                <ellipse cx="50" cy="58" rx="3" ry="2" fill="#FF9999"/>
                <!-- 嘴巴 -->
                <path d="M50 60 Q47 66 44 63" fill="none" stroke="#CD853F" stroke-width="1.5"/>
                <path d="M50 60 Q53 66 56 63" fill="none" stroke="#CD853F" stroke-width="1.5"/>
                <!-- 大腮帮 -->
                <ellipse cx="25" cy="60" rx="12" ry="10" fill="#FFE4C4" stroke="#F4A460" stroke-width="1"/>
                <ellipse cx="75" cy="60" rx="12" ry="10" fill="#FFE4C4" stroke="#F4A460" stroke-width="1"/>
                <!-- 腮红 -->
                <ellipse cx="25" cy="60" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
                <ellipse cx="75" cy="60" rx="6" ry="4" fill="#FFB6C1" opacity="0.6"/>
            </svg>`,
            
            // 猫头鹰 - 大眼睛
            owl: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="owlGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#DEB887"/><stop offset="100%" style="stop-color:#8B4513"/></linearGradient></defs>
                <!-- 角/耳朵 -->
                <path d="M28 35 L22 12 L38 28 Z" fill="url(#owlGrad)"/>
                <path d="M72 35 L78 12 L62 28 Z" fill="url(#owlGrad)"/>
                <!-- 身体 -->
                <ellipse cx="50" cy="55" rx="35" ry="38" fill="url(#owlGrad)" stroke="#6B4423" stroke-width="1"/>
                <!-- 脸部羽毛圈 -->
                <ellipse cx="35" cy="45" rx="18" ry="18" fill="#F5DEB3"/>
                <ellipse cx="65" cy="45" rx="18" ry="18" fill="#F5DEB3"/>
                <!-- 大眼睛 -->
                <circle cx="35" cy="45" r="12" fill="white" stroke="#8B4513" stroke-width="1"/>
                <circle cx="65" cy="45" r="12" fill="white" stroke="#8B4513" stroke-width="1"/>
                <circle cx="35" cy="47" r="7" fill="#FFD700"/>
                <circle cx="65" cy="47" r="7" fill="#FFD700"/>
                <circle cx="35" cy="47" r="4" fill="#333"/>
                <circle cx="65" cy="47" r="4" fill="#333"/>
                <circle cx="33" cy="44" r="2" fill="white"/>
                <circle cx="63" cy="44" r="2" fill="white"/>
                <!-- 喙 -->
                <path d="M45 58 L50 68 L55 58 Z" fill="#FF8C00"/>
                <!-- 胸前羽毛 -->
                <ellipse cx="50" cy="78" rx="18" ry="12" fill="#F5DEB3"/>
                <path d="M42 72 L50 82 L58 72" fill="none" stroke="#CD853F" stroke-width="1"/>
                <path d="M38 78 L50 88 L62 78" fill="none" stroke="#CD853F" stroke-width="1"/>
            </svg>`,
            
            // 小鲨鲨 - 可爱版
            shark: `<svg viewBox="0 0 100 100" width="${size}" height="${size}">
                <defs><linearGradient id="sharkGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#708090"/><stop offset="100%" style="stop-color:#4682B4"/></linearGradient></defs>
                <!-- 背鳍 -->
                <path d="M50 15 L45 35 L55 35 Z" fill="url(#sharkGrad)"/>
                <!-- 身体 -->
                <ellipse cx="50" cy="55" rx="38" ry="30" fill="url(#sharkGrad)" stroke="#4169E1" stroke-width="1"/>
                <!-- 白肚子 -->
                <ellipse cx="50" cy="62" rx="25" ry="18" fill="white"/>
                <!-- 眼睛 -->
                <ellipse cx="35" cy="48" rx="8" ry="9" fill="white"/>
                <ellipse cx="65" cy="48" rx="8" ry="9" fill="white"/>
                <ellipse cx="36" cy="50" rx="4" ry="5" fill="#333"/>
                <ellipse cx="66" cy="50" rx="4" ry="5" fill="#333"/>
                <circle cx="34" cy="47" r="2" fill="white"/>
                <circle cx="64" cy="47" r="2" fill="white"/>
                <!-- 腮 -->
                <line x1="18" y1="55" x2="28" y2="52" stroke="#4169E1" stroke-width="1.5"/>
                <line x1="18" y1="60" x2="28" y2="58" stroke="#4169E1" stroke-width="1.5"/>
                <line x1="82" y1="55" x2="72" y2="52" stroke="#4169E1" stroke-width="1.5"/>
                <line x1="82" y1="60" x2="72" y2="58" stroke="#4169E1" stroke-width="1.5"/>
                <!-- 嘴巴 -->
                <path d="M40 68 Q50 75 60 68" fill="none" stroke="#4169E1" stroke-width="2"/>
                <!-- 腮红 -->
                <ellipse cx="28" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
                <ellipse cx="72" cy="58" rx="5" ry="3" fill="#FFB6C1" opacity="0.5"/>
                <!-- 侧鳍 -->
                <ellipse cx="18" cy="55" rx="8" ry="4" fill="url(#sharkGrad)" transform="rotate(-20 18 55)"/>
                <ellipse cx="82" cy="55" rx="8" ry="4" fill="url(#sharkGrad)" transform="rotate(20 82 55)"/>
            </svg>`
        };
        
        return svgs[type] || svgs.cat;
    }
    
    // v12.3: 精简食物
    const FOOD_TYPES = {
        apple: { name: '苹果', hunger: 20 },
        cookie: { name: '饼干', hunger: 30 },
        cake: { name: '蛋糕', hunger: 50 }
    };
    const ACCESSORIES = {};
    const PET_ACHIEVEMENTS = [];
    
    // v12.4-v12.6: 宠物系统主模块
    const VirtualPetSystem = {
        data: null,
        container: null,
        
        getDefaultData() {
            return {
                hasPet: false,
                petSkipped: false,
                petType: null,
                petName: '',
                hunger: 100,
                happiness: 100,
                lastVisit: null
            };
        },
        
        init() {
            this.loadData();
            if (!this.data.hasPet && !this.data.petSkipped) {
                this.showPetSelection();
            } else if (this.data.hasPet) {
                this.createPetUI();
            }
            console.log('🐾 宠物系统 v12 可爱动物版已加载');
        },
        
        showAdoptionAgain() {
            this.data.petSkipped = false;
            this.saveData();
            this.showPetSelection();
        },
        
        loadData() {
            const saved = localStorage.getItem('virtualPetData');
            this.data = saved ? JSON.parse(saved) : this.getDefaultData();
        },
        
        saveData() {
            localStorage.setItem('virtualPetData', JSON.stringify(this.data));
        },
        
        // v12.4: 宠物选择界面
        showPetSelection() {
            const overlay = document.createElement('div');
            overlay.className = 'pet-select-overlay';
            overlay.innerHTML = `
                <div class="pet-select-modal">
                    <button class="pet-close" onclick="this.closest('.pet-select-overlay').remove()">×</button>
                    <h2>选择学习伙伴</h2>
                    <p class="pet-hint">它会在学习时默默陪伴你~</p>
                    <div class="pet-list">
                        ${Object.entries(PET_TYPES).map(([key, pet]) => `
                            <div class="pet-card" data-type="${key}">
                                <div class="pet-preview">${generatePetSVG(key, 45)}</div>
                                <span class="pet-name">${pet.name}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="pet-naming">
                        <input type="text" class="pet-input" placeholder="给它起个名字~" maxlength="8">
                    </div>
                    <div class="pet-actions">
                        <button class="pet-skip-btn">暂不领养</button>
                        <button class="pet-confirm-btn" disabled>确认领养</button>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);
            requestAnimationFrame(() => overlay.classList.add('show'));
            
            let selectedType = null;
            const confirmBtn = overlay.querySelector('.pet-confirm-btn');
            const nameInput = overlay.querySelector('.pet-input');
            
            overlay.querySelectorAll('.pet-card').forEach(card => {
                card.onclick = () => {
                    overlay.querySelectorAll('.pet-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    selectedType = card.dataset.type;
                    confirmBtn.disabled = !nameInput.value.trim();
                };
            });
            
            nameInput.oninput = () => {
                confirmBtn.disabled = !(selectedType && nameInput.value.trim());
            };
            
            overlay.querySelector('.pet-skip-btn').onclick = () => {
                this.data.petSkipped = true;
                this.saveData();
                overlay.classList.remove('show');
                setTimeout(() => overlay.remove(), 200);
            };
            
            confirmBtn.onclick = () => {
                if (selectedType && nameInput.value.trim()) {
                    this.adoptPet(selectedType, nameInput.value.trim());
                    overlay.classList.remove('show');
                    setTimeout(() => overlay.remove(), 200);
                }
            };
        },
        
        adoptPet(type, name) {
            this.data.hasPet = true;
            this.data.petSkipped = false;
            this.data.petType = type;
            this.data.petName = name;
            this.data.lastVisit = new Date().toDateString();
            this.saveData();
            this.createPetUI();
            showSmartToast(`${name}成为了你的伙伴！`, 'success');
        },
        
        // v12.5: 创建SVG宠物UI
        createPetUI() {
            if (this.container) return;
            const pet = PET_TYPES[this.data.petType];
            
            this.container = document.createElement('div');
            this.container.className = 'pet-widget';
            this.container.innerHTML = `
                <div class="pet-avatar-svg">
                    ${generatePetSVG(this.data.petType, 60)}
                </div>
                <div class="pet-bubble" style="display:none;"></div>
                <div class="pet-name-tag">${this.data.petName}</div>
            `;
            document.body.appendChild(this.container);
            
            this.container.onclick = () => this.interact();
            setTimeout(() => this.greet(), 1000);
        },
        
        // v12.6: 互动效果
        interact() {
            this.data.happiness = Math.min(100, this.data.happiness + 5);
            this.saveData();
            
            // 跳跃动画
            const avatar = this.container?.querySelector('.pet-avatar-svg');
            if (avatar) {
                avatar.classList.add('bounce');
                setTimeout(() => avatar.classList.remove('bounce'), 500);
            }
            
            // 显示爱心
            this.showHearts();
            this.showBubble(PET_TYPES[this.data.petType].sound);
            
            if (typeof HapticFeedback !== 'undefined') HapticFeedback.light();
        },
        
        // 显示爱心效果
        showHearts() {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const heart = document.createElement('div');
                    heart.className = 'pet-heart-float';
                    heart.textContent = '❤️';
                    heart.style.left = `${20 + Math.random() * 40}px`;
                    this.container.appendChild(heart);
                    setTimeout(() => heart.remove(), 1000);
                }, i * 100);
            }
        },
        
        showBubble(text) {
            const bubble = this.container?.querySelector('.pet-bubble');
            if (!bubble) return;
            bubble.textContent = text;
            bubble.style.display = 'block';
            setTimeout(() => bubble.style.display = 'none', 2000);
        },
        
        greet() {
            const pet = PET_TYPES[this.data.petType];
            const hour = new Date().getHours();
            let msg = pet.sound;
            if (hour < 6) msg = '夜深了~';
            else if (hour < 12) msg = '早安~';
            else if (hour < 18) msg = '加油~';
            else msg = '晚上好~';
            this.showBubble(msg);
        },
        
        onStudy() {
            if (!this.data.hasPet) return;
            this.data.happiness = Math.min(100, this.data.happiness + 2);
            this.saveData();
            if (Math.random() > 0.7) {
                this.showBubble('继续加油！✨');
            }
        }
    };
    
    // 初始化
    setTimeout(() => VirtualPetSystem.init(), 1500);

    // v10 精简版导出
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
        // v7.1-v7.10 解压互动系统
        FloatingDecor,
        ClickEffects,
        BreathingGuide,
        RipplePool,
        StressBall,
        WeatherParticles,
        MusicVisualizer,
        Danmaku,
        AchievementShowcase,
        StudyPet,
        StressReliefSystem,
        // v7.11-v7.20 解压互动系统 V2
        ZenSandbox,
        MoodPalette,
        BubbleWrap,
        FocusTimer,
        RhythmGame,
        ScratchCard,
        LuckyWheel,
        EmojiReactions,
        MeditationMode,
        StressReliefPanel,
        StressReliefSystemV2,
        // v8.1-v8.20 宠物陪伴系统
        VirtualPetSystem,
        PET_TYPES,
        FOOD_TYPES,
        ACCESSORIES,
        PET_ACHIEVEMENTS,
        settings: window.uxSettings
    };
    
})();
