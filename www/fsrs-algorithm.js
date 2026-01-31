/**
 * FSRS (Free Spaced Repetition Scheduler) 科学记忆算法
 * 基于记忆心理学研究，比 SM-2 更精确的间隔重复算法
 * 参考: https://github.com/open-spaced-repetition/fsrs4anki
 */

(function() {
    'use strict';

    // FSRS 默认参数（基于大规模用户数据优化）
    const FSRS_PARAMS = {
        w: [0.4, 0.6, 2.4, 5.8, 4.93, 0.94, 0.86, 0.01, 1.49, 0.14, 0.94, 2.18, 0.05, 0.34, 1.26, 0.29, 2.61],
        requestRetention: 0.9,  // 目标记忆保持率 90%
        maximumInterval: 365,   // 最大间隔天数
        easyBonus: 1.3,
        hardInterval: 1.2
    };

    // 评分等级
    const Rating = {
        Again: 1,  // 完全忘记
        Hard: 2,   // 困难回忆
        Good: 3,   // 正常回忆
        Easy: 4    // 轻松回忆
    };

    // 卡片状态
    const State = {
        New: 0,        // 新卡片
        Learning: 1,   // 学习中
        Review: 2,     // 复习中
        Relearning: 3  // 重新学习
    };

    /**
     * FSRS 核心类
     */
    class FSRS {
        constructor(params = {}) {
            this.w = params.w || FSRS_PARAMS.w;
            this.requestRetention = params.requestRetention || FSRS_PARAMS.requestRetention;
            this.maximumInterval = params.maximumInterval || FSRS_PARAMS.maximumInterval;
        }

        /**
         * 初始化新卡片
         */
        initCard() {
            return {
                due: new Date(),
                stability: 0,
                difficulty: 0,
                elapsedDays: 0,
                scheduledDays: 0,
                reps: 0,
                lapses: 0,
                state: State.New,
                lastReview: null
            };
        }

        /**
         * 计算记忆保持率
         */
        forgettingCurve(elapsedDays, stability) {
            return Math.pow(1 + elapsedDays / (9 * stability), -1);
        }

        /**
         * 计算下次复习间隔
         */
        nextInterval(stability) {
            const interval = (stability / FSRS_PARAMS.w[0]) * 
                (Math.pow(this.requestRetention, 1 / FSRS_PARAMS.w[1]) - 1);
            return Math.min(Math.max(Math.round(interval), 1), this.maximumInterval);
        }

        /**
         * 计算初始稳定性
         */
        initStability(rating) {
            return Math.max(this.w[rating - 1], 0.1);
        }

        /**
         * 计算初始难度
         */
        initDifficulty(rating) {
            return Math.min(Math.max(this.w[4] - this.w[5] * (rating - 3), 1), 10);
        }

        /**
         * 更新稳定性
         */
        nextStability(d, s, r, rating) {
            const hardPenalty = rating === Rating.Hard ? this.w[15] : 1;
            const easyBonus = rating === Rating.Easy ? this.w[16] : 1;

            return s * (1 + Math.exp(this.w[8]) *
                (11 - d) *
                Math.pow(s, -this.w[9]) *
                (Math.exp((1 - r) * this.w[10]) - 1) *
                hardPenalty *
                easyBonus);
        }

        /**
         * 更新难度
         */
        nextDifficulty(d, rating) {
            const nextD = d - this.w[6] * (rating - 3);
            return Math.min(Math.max(this.meanReversion(this.w[4], nextD), 1), 10);
        }

        /**
         * 均值回归
         */
        meanReversion(init, current) {
            return this.w[7] * init + (1 - this.w[7]) * current;
        }

        /**
         * 遗忘后重新计算稳定性
         */
        nextForgetStability(d, s, r) {
            return this.w[11] *
                Math.pow(d, -this.w[12]) *
                (Math.pow(s + 1, this.w[13]) - 1) *
                Math.exp((1 - r) * this.w[14]);
        }

        /**
         * 核心调度函数 - 根据评分更新卡片
         */
        schedule(card, rating, now = new Date()) {
            const newCard = { ...card };
            
            if (newCard.state === State.New) {
                newCard.elapsedDays = 0;
            } else {
                newCard.elapsedDays = newCard.lastReview ? 
                    Math.max(0, (now - new Date(newCard.lastReview)) / (1000 * 60 * 60 * 24)) : 0;
            }

            newCard.lastReview = now;
            newCard.reps += 1;

            switch (newCard.state) {
                case State.New:
                    this.scheduleNew(newCard, rating);
                    break;
                case State.Learning:
                case State.Relearning:
                    this.scheduleLearning(newCard, rating);
                    break;
                case State.Review:
                    this.scheduleReview(newCard, rating);
                    break;
            }

            return newCard;
        }

        /**
         * 新卡片调度
         */
        scheduleNew(card, rating) {
            card.difficulty = this.initDifficulty(rating);
            card.stability = this.initStability(rating);

            switch (rating) {
                case Rating.Again:
                    card.scheduledDays = 0;
                    card.state = State.Learning;
                    card.due = new Date(card.lastReview.getTime() + 1 * 60 * 1000); // 1分钟后
                    break;
                case Rating.Hard:
                    card.scheduledDays = 0;
                    card.state = State.Learning;
                    card.due = new Date(card.lastReview.getTime() + 5 * 60 * 1000); // 5分钟后
                    break;
                case Rating.Good:
                    card.scheduledDays = 1;
                    card.state = State.Review;
                    card.due = new Date(card.lastReview.getTime() + 24 * 60 * 60 * 1000); // 1天后
                    break;
                case Rating.Easy:
                    card.scheduledDays = this.nextInterval(card.stability * FSRS_PARAMS.easyBonus);
                    card.state = State.Review;
                    card.due = new Date(card.lastReview.getTime() + card.scheduledDays * 24 * 60 * 60 * 1000);
                    break;
            }
        }

        /**
         * 学习中卡片调度
         */
        scheduleLearning(card, rating) {
            switch (rating) {
                case Rating.Again:
                    card.scheduledDays = 0;
                    card.due = new Date(card.lastReview.getTime() + 1 * 60 * 1000);
                    card.lapses += card.state === State.Relearning ? 1 : 0;
                    break;
                case Rating.Hard:
                    card.scheduledDays = 0;
                    card.due = new Date(card.lastReview.getTime() + 10 * 60 * 1000);
                    break;
                case Rating.Good:
                    card.scheduledDays = 1;
                    card.state = State.Review;
                    card.due = new Date(card.lastReview.getTime() + 24 * 60 * 60 * 1000);
                    break;
                case Rating.Easy:
                    card.scheduledDays = this.nextInterval(card.stability * FSRS_PARAMS.easyBonus);
                    card.state = State.Review;
                    card.due = new Date(card.lastReview.getTime() + card.scheduledDays * 24 * 60 * 60 * 1000);
                    break;
            }

            card.difficulty = this.nextDifficulty(card.difficulty, rating);
            card.stability = this.initStability(rating);
        }

        /**
         * 复习卡片调度
         */
        scheduleReview(card, rating) {
            const retrievability = this.forgettingCurve(card.elapsedDays, card.stability);

            switch (rating) {
                case Rating.Again:
                    card.stability = this.nextForgetStability(card.difficulty, card.stability, retrievability);
                    card.scheduledDays = 0;
                    card.state = State.Relearning;
                    card.due = new Date(card.lastReview.getTime() + 1 * 60 * 1000);
                    card.lapses += 1;
                    break;
                case Rating.Hard:
                    card.stability = this.nextStability(card.difficulty, card.stability, retrievability, rating);
                    card.scheduledDays = this.nextInterval(card.stability * FSRS_PARAMS.hardInterval);
                    card.due = new Date(card.lastReview.getTime() + card.scheduledDays * 24 * 60 * 60 * 1000);
                    break;
                case Rating.Good:
                    card.stability = this.nextStability(card.difficulty, card.stability, retrievability, rating);
                    card.scheduledDays = this.nextInterval(card.stability);
                    card.due = new Date(card.lastReview.getTime() + card.scheduledDays * 24 * 60 * 60 * 1000);
                    break;
                case Rating.Easy:
                    card.stability = this.nextStability(card.difficulty, card.stability, retrievability, rating);
                    card.scheduledDays = this.nextInterval(card.stability * FSRS_PARAMS.easyBonus);
                    card.due = new Date(card.lastReview.getTime() + card.scheduledDays * 24 * 60 * 60 * 1000);
                    break;
            }

            card.difficulty = this.nextDifficulty(card.difficulty, rating);
        }

        /**
         * 获取各评分对应的预计间隔（用于UI显示）
         */
        getSchedulingOptions(card) {
            const options = {};
            [Rating.Again, Rating.Hard, Rating.Good, Rating.Easy].forEach(rating => {
                const scheduledCard = this.schedule({ ...card }, rating);
                options[rating] = {
                    interval: scheduledCard.scheduledDays,
                    due: scheduledCard.due,
                    displayText: this.formatInterval(scheduledCard.scheduledDays, scheduledCard.state)
                };
            });
            return options;
        }

        /**
         * 格式化间隔显示
         */
        formatInterval(days, state) {
            if (state === State.Learning || state === State.Relearning) {
                if (days === 0) return '< 1分钟';
                return days < 1 ? `${Math.round(days * 24 * 60)}分钟` : `${days}天`;
            }
            if (days === 0) return '< 1分钟';
            if (days === 1) return '1天';
            if (days < 7) return `${days}天`;
            if (days < 30) return `${Math.round(days / 7)}周`;
            if (days < 365) return `${Math.round(days / 30)}月`;
            return `${(days / 365).toFixed(1)}年`;
        }
    }

    // ==================== 词汇学习管理器 ====================
    
    class VocabularyFSRS {
        constructor() {
            this.fsrs = new FSRS();
            this.cards = this.loadCards();
        }

        /**
         * 加载卡片数据
         */
        loadCards() {
            try {
                return JSON.parse(localStorage.getItem('fsrs_cards') || '{}');
            } catch (e) {
                return {};
            }
        }

        /**
         * 保存卡片数据
         */
        saveCards() {
            localStorage.setItem('fsrs_cards', JSON.stringify(this.cards));
        }

        /**
         * 获取或创建单词卡片
         */
        getCard(word) {
            const key = word.toLowerCase();
            if (!this.cards[key]) {
                this.cards[key] = this.fsrs.initCard();
                this.cards[key].word = word;
            }
            return this.cards[key];
        }

        /**
         * 评分并更新卡片
         */
        rate(word, rating) {
            const key = word.toLowerCase();
            const card = this.getCard(word);
            
            // 转换评分格式
            const fsrsRating = this.convertRating(rating);
            
            // 使用FSRS调度
            const updatedCard = this.fsrs.schedule(card, fsrsRating);
            this.cards[key] = updatedCard;
            this.saveCards();

            return {
                card: updatedCard,
                nextReview: updatedCard.due,
                interval: updatedCard.scheduledDays,
                displayText: this.fsrs.formatInterval(updatedCard.scheduledDays, updatedCard.state)
            };
        }

        /**
         * 转换评分格式
         */
        convertRating(rating) {
            const map = {
                'again': Rating.Again,
                'hard': Rating.Hard,
                'good': Rating.Good,
                'easy': Rating.Easy,
                'medium': Rating.Good
            };
            return map[rating] || Rating.Good;
        }

        /**
         * 获取今日待复习单词
         */
        getDueCards() {
            const now = new Date();
            const dueCards = [];

            Object.keys(this.cards).forEach(key => {
                const card = this.cards[key];
                if (new Date(card.due) <= now) {
                    dueCards.push({
                        word: card.word || key,
                        card: card,
                        overdueDays: Math.floor((now - new Date(card.due)) / (1000 * 60 * 60 * 24))
                    });
                }
            });

            // 按逾期天数排序
            dueCards.sort((a, b) => b.overdueDays - a.overdueDays);
            return dueCards;
        }

        /**
         * 获取学习统计
         */
        getStats() {
            const now = new Date();
            const stats = {
                total: 0,
                new: 0,
                learning: 0,
                review: 0,
                due: 0,
                avgStability: 0,
                avgDifficulty: 0
            };

            let stabilitySum = 0;
            let difficultySum = 0;

            Object.values(this.cards).forEach(card => {
                stats.total++;
                
                switch (card.state) {
                    case State.New: stats.new++; break;
                    case State.Learning:
                    case State.Relearning: stats.learning++; break;
                    case State.Review: stats.review++; break;
                }

                if (new Date(card.due) <= now) {
                    stats.due++;
                }

                stabilitySum += card.stability || 0;
                difficultySum += card.difficulty || 0;
            });

            stats.avgStability = stats.total > 0 ? (stabilitySum / stats.total).toFixed(2) : 0;
            stats.avgDifficulty = stats.total > 0 ? (difficultySum / stats.total).toFixed(2) : 0;

            return stats;
        }

        /**
         * 获取预览选项（用于显示各评分对应的间隔）
         */
        getSchedulingPreview(word) {
            const card = this.getCard(word);
            return this.fsrs.getSchedulingOptions(card);
        }
    }

    // 创建全局实例
    window.FSRS = FSRS;
    window.VocabularyFSRS = VocabularyFSRS;
    window.fsrsManager = new VocabularyFSRS();
    
    // 提供便捷方法
    window.rateWordFSRS = function(word, rating) {
        return window.fsrsManager.rate(word, rating);
    };
    
    window.getDueWordsFSRS = function() {
        return window.fsrsManager.getDueCards();
    };
    
    window.getFSRSStats = function() {
        return window.fsrsManager.getStats();
    };

    console.log('[FSRS] 科学记忆算法已加载');

})();
