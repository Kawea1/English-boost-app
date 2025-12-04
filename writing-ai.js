/**
 * 学术写作智能评分系统 - Writing AI Scoring System
 * 
 * 基于学术写作标准的科学评分模型
 * 参考: TOEFL/IELTS/GRE 官方评分标准
 * 
 * Version: 1.0.0
 */

(function() {
    'use strict';

    const WritingAI = {
        
        /**
         * 主评分函数 - 学术写作综合评分
         * @param {string} content - 作文内容
         * @param {object} topic - 题目信息
         * @returns {object} 评分结果
         */
        scoreAcademicWriting(content, topic) {
            if (!content || !content.trim()) {
                return this.getEmptyScore();
            }

            const analysis = this.analyzeText(content, topic);
            const dimensions = this.calculateDimensions(analysis, topic);
            const overallScore = this.calculateOverallScore(dimensions);
            const grade = this.getGrade(overallScore);
            const suggestions = this.generateSuggestions(analysis, dimensions);

            return {
                overallScore: overallScore,
                grade: grade,
                dimensions: dimensions,
                analysis: analysis,
                suggestions: suggestions,
                paragraphAnalysis: this.analyzeParagraphs(content),
                paragraphCount: analysis.paragraphCount,
                timestamp: new Date().toISOString()
            };
        },

        /**
         * 文本基础分析
         */
        analyzeText(content, topic) {
            const words = content.split(/\s+/).filter(w => w.length > 0);
            const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
            const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
            
            // 词汇多样性分析
            const uniqueWords = new Set(words.map(w => w.toLowerCase()));
            const lexicalDiversity = uniqueWords.size / words.length;
            
            // 句子长度分析
            const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
            const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length || 0;
            
            // 学术词汇检测
            const academicWords = this.detectAcademicVocabulary(words);
            
            // 连接词检测
            const transitions = this.detectTransitionWords(content);
            
            // 复杂句型检测
            const complexSentences = this.detectComplexSentences(sentences);

            return {
                wordCount: words.length,
                sentenceCount: sentences.length,
                paragraphCount: paragraphs.length,
                uniqueWords: uniqueWords.size,
                lexicalDiversity: lexicalDiversity,
                avgSentenceLength: avgSentenceLength,
                academicWordCount: academicWords.length,
                academicWordRatio: academicWords.length / words.length,
                transitionCount: transitions.length,
                complexSentenceCount: complexSentences,
                sentenceLengths: sentenceLengths,
                paragraphs: paragraphs
            };
        },

        /**
         * 计算各维度分数
         */
        calculateDimensions(analysis, topic) {
            return {
                // 内容质量 (30分)
                content: this.scoreContent(analysis, topic),
                
                // 结构组织 (25分)
                structure: this.scoreStructure(analysis),
                
                // 语言运用 (25分)
                language: this.scoreLanguage(analysis),
                
                // 论证分析 (15分)
                argumentation: this.scoreArgumentation(analysis),
                
                // 学术规范 (5分)
                academic: this.scoreAcademic(analysis)
            };
        },

        /**
         * 内容质量评分 (30分)
         * - 字数达标: 0-10分
         * - 主题相关性: 0-10分
         * - 内容深度: 0-10分
         */
        scoreContent(analysis, topic) {
            let score = 0;
            const minWords = topic.wordCount.min;
            const maxWords = topic.wordCount.max;
            const wordCount = analysis.wordCount;

            // 字数达标 (10分)
            if (wordCount >= minWords && wordCount <= maxWords) {
                score += 10;
            } else if (wordCount >= minWords * 0.8) {
                score += 8;
            } else if (wordCount >= minWords * 0.6) {
                score += 5;
            } else if (wordCount >= minWords * 0.4) {
                score += 3;
            } else if (wordCount >= minWords * 0.2) {
                score += 1;
            }
            // wordCount < minWords * 0.2: 0分

            // 词汇多样性反映内容深度 (10分)
            if (analysis.lexicalDiversity >= 0.6) {
                score += 10;
            } else if (analysis.lexicalDiversity >= 0.5) {
                score += 8;
            } else if (analysis.lexicalDiversity >= 0.4) {
                score += 6;
            } else if (analysis.lexicalDiversity >= 0.3) {
                score += 4;
            } else if (analysis.lexicalDiversity >= 0.2) {
                score += 2;
            }

            // 学术词汇使用 (10分)
            if (analysis.academicWordRatio >= 0.15) {
                score += 10;
            } else if (analysis.academicWordRatio >= 0.12) {
                score += 8;
            } else if (analysis.academicWordRatio >= 0.08) {
                score += 6;
            } else if (analysis.academicWordRatio >= 0.05) {
                score += 4;
            } else if (analysis.academicWordRatio >= 0.02) {
                score += 2;
            }

            return {
                score: Math.round(score),
                maxScore: 30,
                details: {
                    wordCount: wordCount,
                    required: `${minWords}-${maxWords}`,
                    lexicalDiversity: (analysis.lexicalDiversity * 100).toFixed(1) + '%',
                    academicWords: analysis.academicWordCount
                }
            };
        },

        /**
         * 结构组织评分 (25分)
         * - 段落结构: 0-10分
         * - 逻辑连贯: 0-10分
         * - 布局合理: 0-5分
         */
        scoreStructure(analysis) {
            let score = 0;

            // 段落结构 (10分)
            const paraCount = analysis.paragraphCount;
            if (paraCount >= 4 && paraCount <= 6) {
                score += 10;
            } else if (paraCount === 3 || paraCount === 7) {
                score += 8;
            } else if (paraCount === 2 || paraCount === 8) {
                score += 5;
            } else if (paraCount === 1) {
                score += 2;
            }

            // 连接词使用 (10分)
            const transitionDensity = analysis.transitionCount / analysis.paragraphCount;
            if (transitionDensity >= 3) {
                score += 10;
            } else if (transitionDensity >= 2) {
                score += 8;
            } else if (transitionDensity >= 1.5) {
                score += 6;
            } else if (transitionDensity >= 1) {
                score += 4;
            } else if (transitionDensity >= 0.5) {
                score += 2;
            }

            // 段落平衡性 (5分)
            const avgWordsPerPara = analysis.wordCount / analysis.paragraphCount;
            if (avgWordsPerPara >= 50 && avgWordsPerPara <= 100) {
                score += 5;
            } else if (avgWordsPerPara >= 40 && avgWordsPerPara <= 120) {
                score += 4;
            } else if (avgWordsPerPara >= 30) {
                score += 2;
            }

            return {
                score: Math.round(score),
                maxScore: 25,
                details: {
                    paragraphs: paraCount,
                    transitions: analysis.transitionCount,
                    avgWordsPerPara: Math.round(avgWordsPerPara)
                }
            };
        },

        /**
         * 语言运用评分 (25分)
         * - 句子多样性: 0-10分
         * - 语法复杂度: 0-10分
         * - 用词准确性: 0-5分
         */
        scoreLanguage(analysis) {
            let score = 0;

            // 句子长度多样性 (10分)
            const avgLength = analysis.avgSentenceLength;
            if (avgLength >= 15 && avgLength <= 25) {
                score += 10;
            } else if (avgLength >= 12 && avgLength < 15) {
                score += 8;
            } else if (avgLength >= 10 && avgLength < 12) {
                score += 6;
            } else if (avgLength >= 8) {
                score += 4;
            } else if (avgLength >= 5) {
                score += 2;
            }

            // 复杂句型使用 (10分)
            const complexRatio = analysis.complexSentenceCount / analysis.sentenceCount;
            if (complexRatio >= 0.4) {
                score += 10;
            } else if (complexRatio >= 0.3) {
                score += 8;
            } else if (complexRatio >= 0.2) {
                score += 6;
            } else if (complexRatio >= 0.1) {
                score += 4;
            } else if (complexRatio > 0) {
                score += 2;
            }

            // 词汇丰富度 (5分)
            if (analysis.lexicalDiversity >= 0.65) {
                score += 5;
            } else if (analysis.lexicalDiversity >= 0.55) {
                score += 4;
            } else if (analysis.lexicalDiversity >= 0.45) {
                score += 3;
            } else if (analysis.lexicalDiversity >= 0.35) {
                score += 2;
            } else if (analysis.lexicalDiversity >= 0.25) {
                score += 1;
            }

            return {
                score: Math.round(score),
                maxScore: 25,
                details: {
                    avgSentenceLength: avgLength.toFixed(1),
                    complexSentences: analysis.complexSentenceCount,
                    lexicalDiversity: (analysis.lexicalDiversity * 100).toFixed(1) + '%'
                }
            };
        },

        /**
         * 论证分析评分 (15分)
         * - 论据充分: 0-8分
         * - 逻辑严密: 0-7分
         */
        scoreArgumentation(analysis) {
            let score = 0;

            // 段落数量反映论据充分度 (8分)
            const bodyParas = Math.max(0, analysis.paragraphCount - 2); // 减去引言和结论
            if (bodyParas >= 3) {
                score += 8;
            } else if (bodyParas === 2) {
                score += 6;
            } else if (bodyParas === 1) {
                score += 3;
            }

            // 句子数量反映论证详细度 (7分)
            const sentencesPerPara = analysis.sentenceCount / analysis.paragraphCount;
            if (sentencesPerPara >= 5) {
                score += 7;
            } else if (sentencesPerPara >= 4) {
                score += 5;
            } else if (sentencesPerPara >= 3) {
                score += 3;
            } else if (sentencesPerPara >= 2) {
                score += 1;
            }

            return {
                score: Math.round(score),
                maxScore: 15,
                details: {
                    bodyParagraphs: bodyParas,
                    sentencesPerPara: sentencesPerPara.toFixed(1)
                }
            };
        },

        /**
         * 学术规范评分 (5分)
         * - 学术词汇: 0-3分
         * - 正式语气: 0-2分
         */
        scoreAcademic(analysis) {
            let score = 0;

            // 学术词汇密度 (3分)
            if (analysis.academicWordRatio >= 0.12) {
                score += 3;
            } else if (analysis.academicWordRatio >= 0.08) {
                score += 2;
            } else if (analysis.academicWordRatio >= 0.04) {
                score += 1;
            }

            // 平均句长反映正式度 (2分)
            if (analysis.avgSentenceLength >= 15) {
                score += 2;
            } else if (analysis.avgSentenceLength >= 12) {
                score += 1;
            }

            return {
                score: Math.round(score),
                maxScore: 5,
                details: {
                    academicWords: analysis.academicWordCount,
                    ratio: (analysis.academicWordRatio * 100).toFixed(1) + '%'
                }
            };
        },

        /**
         * 计算总分 (0-100分)
         */
        calculateOverallScore(dimensions) {
            const total = dimensions.content.score +
                         dimensions.structure.score +
                         dimensions.language.score +
                         dimensions.argumentation.score +
                         dimensions.academic.score;
            
            return Math.max(0, Math.min(100, Math.round(total)));
        },

        /**
         * 获取等级
         */
        getGrade(score) {
            if (score >= 90) return 'A+ 优秀';
            if (score >= 85) return 'A 优秀';
            if (score >= 80) return 'A- 良好';
            if (score >= 75) return 'B+ 良好';
            if (score >= 70) return 'B 中等';
            if (score >= 65) return 'B- 中等';
            if (score >= 60) return 'C+ 及格';
            if (score >= 55) return 'C 及格';
            if (score >= 50) return 'C- 需改进';
            if (score >= 40) return 'D 需努力';
            if (score >= 30) return 'D- 需努力';
            if (score >= 20) return 'E 待加强';
            if (score >= 10) return 'E- 待加强';
            return 'F 不及格';
        },

        /**
         * 空作文评分
         */
        getEmptyScore() {
            return {
                overallScore: 0,
                grade: 'F 不及格',
                dimensions: {
                    content: { score: 0, maxScore: 30, details: {} },
                    structure: { score: 0, maxScore: 25, details: {} },
                    language: { score: 0, maxScore: 25, details: {} },
                    argumentation: { score: 0, maxScore: 15, details: {} },
                    academic: { score: 0, maxScore: 5, details: {} }
                },
                analysis: {},
                suggestions: ['请输入作文内容'],
                paragraphAnalysis: [],
                paragraphCount: 0
            };
        },

        /**
         * 学术词汇检测
         */
        detectAcademicVocabulary(words) {
            const academicWords = [
                'analysis', 'approach', 'concept', 'conclusion', 'consistent', 'context',
                'data', 'definition', 'demonstrate', 'derive', 'evidence', 'factors',
                'function', 'hypothesis', 'identify', 'illustrate', 'imply', 'indicate',
                'interpret', 'investigate', 'methodology', 'perspective', 'principle',
                'process', 'research', 'significant', 'theory', 'therefore', 'thus',
                'analyze', 'aspect', 'assume', 'authority', 'benefit', 'category',
                'challenge', 'circumstance', 'clarify', 'compare', 'component', 'comprehensive',
                'constitute', 'construct', 'contrast', 'contribute', 'criterion', 'debate',
                'define', 'demonstrate', 'dimension', 'distinct', 'element', 'emphasis',
                'establish', 'evaluate', 'framework', 'furthermore', 'generate', 'implement',
                'implication', 'instance', 'maintain', 'moreover', 'nevertheless', 'paradigm',
                'parameter', 'perceive', 'phenomenon', 'predict', 'previous', 'primary',
                'require', 'respond', 'revelation', 'strategy', 'structure', 'subsequent',
                'sufficient', 'technique', 'ultimately', 'vary', 'academic', 'advantage',
                'alternative', 'appropriate', 'considerable', 'crucial', 'demonstrate',
                'diverse', 'dynamic', 'enhance', 'ensure', 'essential', 'evident',
                'extensive', 'facilitate', 'fundamental', 'ignore', 'impact', 'initial',
                'integral', 'interact', 'major', 'mechanism', 'modify', 'objective',
                'obtain', 'obvious', 'occur', 'potential', 'precise', 'predominant',
                'preliminary', 'profound', 'promote', 'relevant', 'reliable', 'resolve',
                'retain', 'reveal', 'scope', 'sector', 'secure', 'significant', 'specify',
                'stability', 'statistics', 'substantial', 'survey', 'target', 'transmit',
                'underlying', 'undertake', 'valid', 'version', 'whereas', 'widespread'
            ];

            const found = [];
            words.forEach(word => {
                const lower = word.toLowerCase().replace(/[^a-z]/g, '');
                if (academicWords.includes(lower)) {
                    found.push(word);
                }
            });
            return found;
        },

        /**
         * 连接词检测
         */
        detectTransitionWords(content) {
            const transitions = [
                'however', 'moreover', 'furthermore', 'therefore', 'thus', 'consequently',
                'nevertheless', 'nonetheless', 'additionally', 'meanwhile', 'subsequently',
                'firstly', 'secondly', 'finally', 'in conclusion', 'in summary',
                'for example', 'for instance', 'such as', 'specifically', 'in particular',
                'on the other hand', 'in contrast', 'conversely', 'similarly', 'likewise',
                'as a result', 'accordingly', 'hence', 'indeed', 'in fact'
            ];

            const found = [];
            const lowerContent = content.toLowerCase();
            transitions.forEach(word => {
                if (lowerContent.includes(word)) {
                    found.push(word);
                }
            });
            return found;
        },

        /**
         * 复杂句型检测
         */
        detectComplexSentences(sentences) {
            let count = 0;
            const complexMarkers = [
                'which', 'who', 'whom', 'whose', 'that',
                'although', 'though', 'while', 'whereas',
                'because', 'since', 'as', 'if', 'unless',
                'before', 'after', 'when', 'whenever'
            ];

            sentences.forEach(sentence => {
                const lower = sentence.toLowerCase();
                const hasMarker = complexMarkers.some(marker => 
                    lower.includes(' ' + marker + ' ')
                );
                const hasComma = sentence.includes(',');
                if (hasMarker && hasComma) {
                    count++;
                }
            });

            return count;
        },

        /**
         * 段落分析
         */
        analyzeParagraphs(content) {
            const paragraphs = content.split(/\n\n+/).filter(p => p.trim().length > 0);
            
            return paragraphs.map((para, index) => {
                const words = para.split(/\s+/).length;
                const sentences = para.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
                
                let position = 'body';
                let score = 70;
                const issues = [];

                // 判断段落位置
                if (index === 0) {
                    position = 'introduction';
                    if (words < 50) {
                        issues.push({ type: 'length', message: '引言段建议至少50词', suggestion: '增加背景介绍或问题陈述' });
                        score -= 10;
                    }
                } else if (index === paragraphs.length - 1) {
                    position = 'conclusion';
                    if (words < 40) {
                        issues.push({ type: 'length', message: '结论段建议至少40词', suggestion: '总结主要论点' });
                        score -= 10;
                    }
                } else {
                    if (words < 60) {
                        issues.push({ type: 'length', message: '主体段建议至少60词', suggestion: '增加论据和例证' });
                        score -= 15;
                    }
                    if (sentences < 3) {
                        issues.push({ type: 'sentences', message: '句子数量偏少', suggestion: '增加论述细节' });
                        score -= 10;
                    }
                }

                return {
                    position: position,
                    content: para,
                    wordCount: words,
                    sentenceCount: sentences,
                    score: Math.max(0, Math.min(100, score)),
                    issues: issues
                };
            });
        },

        /**
         * 生成改进建议
         */
        generateSuggestions(analysis, dimensions) {
            const suggestions = [];

            // 内容相关
            if (dimensions.content.score < 20) {
                suggestions.push('字数严重不足，建议增加内容深度和广度');
            } else if (dimensions.content.score < 25) {
                suggestions.push('适当增加内容，丰富论述细节');
            }

            // 结构相关
            if (dimensions.structure.score < 15) {
                suggestions.push('建议使用4-5个段落（引言、2-3个主体段、结论）');
            }
            if (analysis.transitionCount < 3) {
                suggestions.push('增加连接词（如 however, moreover, therefore）提升连贯性');
            }

            // 语言相关
            if (dimensions.language.score < 15) {
                suggestions.push('尝试使用更多复杂句型和多样化的词汇');
            }
            if (analysis.avgSentenceLength < 10) {
                suggestions.push('句子平均长度偏短，可适当合并简单句');
            }

            // 论证相关
            if (dimensions.argumentation.score < 10) {
                suggestions.push('加强论证，每个主体段应包含论点、论据和例证');
            }

            // 学术规范
            if (dimensions.academic.score < 3) {
                suggestions.push('增加学术词汇的使用，保持正式语气');
            }

            // 通用建议
            if (suggestions.length === 0) {
                if (dimensions.content.score + dimensions.structure.score + 
                    dimensions.language.score + dimensions.argumentation.score + 
                    dimensions.academic.score >= 90) {
                    suggestions.push('优秀！继续保持高水平写作');
                } else {
                    suggestions.push('整体不错，可在细节上进一步打磨');
                }
            }

            return suggestions;
        }
    };

    // 暴露到全局
    window.WritingAI = WritingAI;

    console.log('📊 WritingAI: 学术写作评分系统已加载');

})();
