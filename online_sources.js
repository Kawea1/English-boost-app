// 真实学习网站资源
window.ONLINE_SOURCES = [
    // GRE资源
    {name: 'Magoosh GRE', category: 'GRE', url: 'https://gre.magoosh.com', description: 'GRE备考视频课程和练习题'},
    {name: 'Manhattan Prep GRE', category: 'GRE', url: 'https://www.manhattanprep.com/gre', description: 'GRE策略指南和模考'},
    {name: 'GRE Prep Club', category: 'GRE', url: 'https://greprepclub.com', description: 'GRE真题讨论和备考社区'},
    {name: 'Kaplan GRE', category: 'GRE', url: 'https://www.kaptest.com/gre', description: 'GRE全面备考方案'},
    {name: 'PowerScore GRE', category: 'GRE', url: 'https://www.powerscore.com/gre', description: 'GRE逻辑和写作指导'},
    {name: 'Gregmat', category: 'GRE', url: 'https://www.gregmat.com', description: 'GRE免费备考视频'},
    {name: 'ETS GRE官网', category: 'GRE', url: 'https://www.ets.org/gre', description: 'GRE官方资料和报名'},
    
    // 托福资源
    {name: 'TOEFL官方', category: 'TOEFL', url: 'https://www.ets.org/toefl', description: '托福官方报名和资料'},
    {name: 'Magoosh TOEFL', category: 'TOEFL', url: 'https://toefl.magoosh.com', description: '托福视频课程'},
    {name: 'TOEFL Resources', category: 'TOEFL', url: 'https://www.toeflresources.com', description: '托福免费练习材料'},
    {name: 'Notefull TOEFL', category: 'TOEFL', url: 'https://www.notefull.com', description: '托福写作口语模板'},
    {name: 'BestMyTest', category: 'TOEFL', url: 'https://www.bestmytest.com', description: '托福模拟考试'},
    {name: 'TST Prep', category: 'TOEFL', url: 'https://tstprep.com', description: '托福口语练习'},
    
    // 学术英语资源
    {name: 'Academic Phrasebank', category: '学术英语', url: 'https://www.phrasebank.manchester.ac.uk', description: '学术写作短语库'},
    {name: 'Google Scholar', category: '学术英语', url: 'https://scholar.google.com', description: '学术论文搜索引擎'},
    {name: 'JSTOR', category: '学术英语', url: 'https://www.jstor.org', description: '学术期刊数据库'},
    {name: 'ResearchGate', category: '学术英语', url: 'https://www.researchgate.net', description: '学术社交网络'},
    {name: 'Academia.edu', category: '学术英语', url: 'https://www.academia.edu', description: '学术论文分享平台'},
    
    // 词汇学习
    {name: 'Vocabulary.com', category: '词汇', url: 'https://www.vocabulary.com', description: '智能词汇学习系统'},
    {name: 'Memrise', category: '词汇', url: 'https://www.memrise.com', description: '词汇记忆卡片'},
    {name: 'Quizlet', category: '词汇', url: 'https://quizlet.com', description: '词汇闪卡和测试'},
    {name: 'WordReference', category: '词汇', url: 'https://www.wordreference.com', description: '专业词典查询'},
    {name: 'Merriam-Webster', category: '词汇', url: 'https://www.merriam-webster.com', description: '权威英语词典'},
    {name: 'Cambridge Dictionary', category: '词汇', url: 'https://dictionary.cambridge.org', description: '剑桥词典'},
    
    // 听力练习
    {name: 'TED Talks', category: '听力', url: 'https://www.ted.com', description: '高质量演讲视频'},
    {name: 'BBC Learning English', category: '听力', url: 'https://www.bbc.co.uk/learningenglish', description: 'BBC英语学习'},
    {name: 'VOA Learning English', category: '听力', url: 'https://learningenglish.voanews.com', description: 'VOA慢速英语'},
    {name: 'NPR', category: '听力', url: 'https://www.npr.org', description: '美国国家公共电台'},
    {name: 'Elllo', category: '听力', url: 'https://www.elllo.org', description: '英语听力练习库'},
    {name: 'Randalls ESL', category: '听力', url: 'https://www.esl-lab.com', description: '分级听力练习'},
    
    // 阅读资源
    {name: 'The Economist', category: '阅读', url: 'https://www.economist.com', description: '经济学人杂志'},
    {name: 'The Atlantic', category: '阅读', url: 'https://www.theatlantic.com', description: '深度文章'},
    {name: 'Scientific American', category: '阅读', url: 'https://www.scientificamerican.com', description: '科学美国人'},
    {name: 'National Geographic', category: '阅读', url: 'https://www.nationalgeographic.com', description: '国家地理'},
    {name: 'The New Yorker', category: '阅读', url: 'https://www.newyorker.com', description: '纽约客杂志'},
    {name: 'Nature', category: '阅读', url: 'https://www.nature.com', description: '自然期刊'},
    
    // 写作资源  
    {name: 'Grammarly', category: '写作', url: 'https://www.grammarly.com', description: '语法检查工具'},
    {name: 'Hemingway Editor', category: '写作', url: 'https://hemingwayapp.com', description: '文章简洁度检查'},
    {name: 'Purdue OWL', category: '写作', url: 'https://owl.purdue.edu', description: '学术写作指南'},
    {name: 'WriteCheck', category: '写作', url: 'https://www.writecheck.com', description: '论文查重'},
    
    // 综合学习
    {name: 'Khan Academy', category: '综合', url: 'https://www.khanacademy.org', description: '免费综合学习平台'},
    {name: 'Coursera', category: '综合', url: 'https://www.coursera.org', description: '名校在线课程'},
    {name: 'edX', category: '综合', url: 'https://www.edx.org', description: '哈佛MIT课程'},
    {name: 'Duolingo', category: '综合', url: 'https://www.duolingo.com', description: '游戏化语言学习'}
];

// 真题资源
window.PUBLIC_PARSED = [
    {title: 'GRE官方OG真题', category: 'GRE', source: 'ETS官方', url: 'https://www.ets.org/gre/revised_general/prepare/powerprep'},
    {title: 'GRE PP2真题解析', category: 'GRE', source: 'ETS官方', url: 'https://www.ets.org/gre/revised_general/prepare'},
    {title: 'GRE数学170真题', category: 'GRE', source: 'GRE Prep Club', url: 'https://greprepclub.com/forum/gre-quant-3'},
    {title: 'GRE阅读机经', category: 'GRE', source: '考满分', url: 'https://gre.kmf.com/reading'},
    {title: 'GRE填空500题', category: 'GRE', source: 'Magoosh', url: 'https://gre.magoosh.com/flashcards/vocabulary'},
    {title: 'GRE写作题库', category: 'GRE', source: 'ETS官方', url: 'https://www.ets.org/gre/revised_general/prepare/analytical_writing'},
    {title: '托福TPO1-70', category: 'TOEFL', source: 'ETS官方', url: 'https://www.ets.org/toefl/test-takers/ibt/prepare/tests'},
    {title: '托福听力真题', category: 'TOEFL', source: '托福资源网', url: 'https://www.toeflresources.com/listening'},
    {title: '托福口语真题', category: 'TOEFL', source: 'TST Prep', url: 'https://tstprep.com/toefl-speaking'},
    {title: '托福写作范文', category: 'TOEFL', source: 'Notefull', url: 'https://www.notefull.com/toefl-writing'},
    {title: '学术写作范文库', category: '学术英语', source: 'Purdue OWL', url: 'https://owl.purdue.edu/owl/general_writing/academic_writing'},
    {title: '研究生英语核心词汇', category: '学术英语', source: 'Academic Word List', url: 'https://www.wgtn.ac.nz/lals/resources/academicwordlist'},
    {title: '学术论文阅读指南', category: '学术英语', source: 'Scribbr', url: 'https://www.scribbr.com/category/academic-writing'},
    {title: 'SCI论文写作技巧', category: '学术英语', source: 'Springer', url: 'https://www.springer.com/gp/authors-editors'},
    {title: '学术演讲技巧', category: '学术英语', source: 'TED-Ed', url: 'https://ed.ted.com'},
    {title: 'IELTS真题Cambridge 1-18', category: 'IELTS', source: '剑桥官方', url: 'https://www.cambridge.org/gb/cambridgeenglish/catalog/cambridge-english-exams-ielts'},
    {title: 'IELTS写作高分范文', category: 'IELTS', source: 'IELTS Buddy', url: 'https://www.ieltsbuddy.com/ielts-sample-essays.html'},
    {title: 'IELTS口语话题库', category: 'IELTS', source: 'IELTS Liz', url: 'https://ieltsliz.com/ielts-speaking'},
    {title: 'SAT官方练习题', category: 'SAT', source: 'College Board', url: 'https://collegereadiness.collegeboard.org/sat/practice'},
    {title: 'SAT阅读高频文章', category: 'SAT', source: 'Khan Academy', url: 'https://www.khanacademy.org/sat'}
];
