/**
 * 写作练习数据 - 基于真实考试题型
 * 
 * 题型覆盖:
 * - TOEFL IBT: 综合写作 + 学术讨论写作
 * - GRE: Issue分析 + Argument分析
 * - 雅思: Task1图表 + Task2议论文
 * - 考研: 应用文 + 图画/图表作文
 * - 学术英语: 论文写作 + 摘要 + 文献综述
 * 
 * V1-V5: 基础结构与TOEFL综合写作
 */

// ==================== V1: 写作题目基础结构 ====================
const WRITING_TYPES = {
  // TOEFL题型
  TOEFL_INTEGRATED: 'toefl_integrated',      // 综合写作 (阅读+听力+写作)
  TOEFL_DISCUSSION: 'toefl_discussion',      // 学术讨论写作
  
  // GRE题型
  GRE_ISSUE: 'gre_issue',                    // Issue分析
  GRE_ARGUMENT: 'gre_argument',              // Argument分析
  
  // 雅思题型
  IELTS_TASK1_LINE: 'ielts_task1_line',      // 线图
  IELTS_TASK1_BAR: 'ielts_task1_bar',        // 柱状图
  IELTS_TASK1_PIE: 'ielts_task1_pie',        // 饼图
  IELTS_TASK1_TABLE: 'ielts_task1_table',    // 表格
  IELTS_TASK1_PROCESS: 'ielts_task1_process',// 流程图
  IELTS_TASK1_MAP: 'ielts_task1_map',        // 地图
  IELTS_TASK2: 'ielts_task2',                // 大作文议论文
  
  // 考研题型
  KAOYAN_APPLICATION: 'kaoyan_application',   // 应用文
  KAOYAN_PICTURE: 'kaoyan_picture',           // 图画作文 (英语一)
  KAOYAN_CHART: 'kaoyan_chart',               // 图表作文 (英语二)
  
  // 学术英语题型
  ACADEMIC_PAPER: 'academic_paper',           // 学术论文写作
  ACADEMIC_ABSTRACT: 'academic_abstract',     // 摘要写作
  ACADEMIC_REVIEW: 'academic_review'          // 文献综述
};

// 话题分类
const TOPIC_CATEGORIES = {
  EDUCATION: 'education',           // 教育
  TECHNOLOGY: 'technology',         // 科技
  ENVIRONMENT: 'environment',       // 环境
  SOCIETY: 'society',               // 社会
  ECONOMY: 'economy',               // 经济
  CULTURE: 'culture',               // 文化
  HEALTH: 'health',                 // 健康
  SCIENCE: 'science',               // 科学
  HISTORY: 'history',               // 历史
  GOVERNMENT: 'government',         // 政府政策
  MEDIA: 'media',                   // 媒体
  ARTS: 'arts',                     // 艺术
  BUSINESS: 'business',             // 商业
  PSYCHOLOGY: 'psychology'          // 心理学
};

// 难度等级
const DIFFICULTY_LEVELS = {
  BASIC: 'basic',           // 基础 (六级水平)
  INTERMEDIATE: 'intermediate', // 中级 (TOEFL/雅思)
  ADVANCED: 'advanced'      // 高级 (GRE)
};

// ==================== V2: 写作模板与句型 ====================
const WRITING_TEMPLATES = {
  // 开头段模板
  introductions: {
    opinion: [
      "In contemporary society, the question of whether {topic} has sparked considerable debate.",
      "The issue of {topic} has become increasingly prominent in modern discourse.",
      "It is often argued that {topic}, and this perspective merits careful examination.",
      "The assertion that {topic} raises fundamental questions about our values and priorities."
    ],
    discussion: [
      "There are divergent views regarding {topic}, with valid arguments on both sides.",
      "The debate surrounding {topic} has intensified in recent years.",
      "While some advocate for {viewA}, others contend that {viewB}."
    ],
    problem_solution: [
      "The phenomenon of {problem} has emerged as a pressing concern in contemporary society.",
      "{Problem} poses significant challenges that require immediate attention and innovative solutions.",
      "In addressing {problem}, it is essential to consider both immediate interventions and long-term strategies."
    ],
    summary: [
      "The reading passage discusses {topic}, presenting several key points.",
      "Both the reading and the lecture address {topic}, but they present contrasting perspectives.",
      "The lecturer challenges the main arguments presented in the reading passage regarding {topic}."
    ],
    critique: [
      "The argument claims that {claim}, but this reasoning contains several logical flaws.",
      "While the author asserts {claim}, the argument relies on questionable assumptions.",
      "The conclusion that {claim} is undermined by insufficient evidence and logical gaps."
    ]
  },
  
  // 论证段模板
  bodyParagraphs: {
    reason_example: [
      "First and foremost, {reason}. For instance, {example}.",
      "Another significant factor is {reason}. This is evident in {example}.",
      "Moreover, {reason}, which can be demonstrated by {example}."
    ],
    both_sides: [
      "On the one hand, proponents argue that {viewA}. They point to {evidence}.",
      "Conversely, critics contend that {viewB}. Their reasoning is based on {counterEvidence}."
    ],
    solution_details: [
      "One effective approach would be to {solution}. This could be implemented through {details}.",
      "A practical solution involves {action}, which has proven successful in {context}."
    ],
    summary_points: [
      "The lecturer refutes the reading's first point by explaining that {counterArgument}.",
      "Regarding {point}, the professor provides evidence that contradicts the reading.",
      "The lecture challenges this claim, noting that {alternative explanation}."
    ],
    logical_flaw: [
      "The argument assumes that {assumption}, but this overlooks {flaw}.",
      "A critical weakness is the failure to consider {alternative}.",
      "The reasoning depends on {correlation}, which does not necessarily indicate causation."
    ]
  },
  
  // 过渡句型
  transitions: {
    addition: ["Furthermore", "Moreover", "In addition", "Additionally", "What is more"],
    contrast: ["However", "Nevertheless", "On the other hand", "Conversely", "In contrast"],
    example: ["For instance", "To illustrate", "A case in point is", "Consider the example of"],
    cause_effect: ["Consequently", "As a result", "Therefore", "Thus", "Hence"],
    concession: ["Admittedly", "Granted", "While it is true that", "Despite this"]
  },
  
  // 结论段模板
  conclusions: {
    opinion: [
      "In conclusion, I firmly believe that {opinion} because {reasons}.",
      "To sum up, the evidence overwhelmingly supports the view that {opinion}.",
      "Ultimately, {opinion} represents the most compelling perspective on this issue."
    ],
    balanced: [
      "In light of the arguments presented, a nuanced approach that considers both perspectives seems most appropriate.",
      "To conclude, while both viewpoints have merit, the key lies in finding a balanced solution."
    ],
    summary: [
      "In summary, the lecture effectively challenges the reading's main arguments through {key points}.",
      "The professor's counterarguments cast significant doubt on the claims made in the reading passage."
    ],
    call_to_action: [
      "Therefore, immediate action is required to implement {solutions} and address {problem}.",
      "It is imperative that we take concrete steps to {action} before the situation worsens."
    ],
    evaluation: [
      "In conclusion, the argument fails to provide convincing evidence due to {flaws}.",
      "Ultimately, these logical weaknesses significantly undermine the argument's credibility."
    ]
  }
};

// ==================== V3: TOEFL综合写作题目 (1-5) ====================
const TOEFL_INTEGRATED_TOPICS = [
  // 题目1: 恐龙灭绝理论
  {
    id: 'toefl_int_001',
    type: WRITING_TYPES.TOEFL_INTEGRATED,
    topic: TOPIC_CATEGORIES.SCIENCE,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200, // 20分钟
    wordCount: { min: 150, max: 225 },
    
    title: "Dinosaur Extinction Theories",
    
    reading: {
      text: `The extinction of dinosaurs approximately 66 million years ago has long puzzled scientists. One widely accepted theory, known as the asteroid impact hypothesis, suggests that a massive asteroid struck Earth, causing catastrophic environmental changes that led to the dinosaurs' demise.

First, there is compelling geological evidence supporting this theory. Scientists have discovered a thin layer of iridium—a rare element on Earth but abundant in asteroids—in rock formations dating to exactly 66 million years ago. This "iridium anomaly" has been found at over 100 sites worldwide, suggesting a global event.

Second, the impact crater itself has been identified. The Chicxulub crater, located off the coast of Mexico's Yucatan Peninsula, is approximately 180 kilometers in diameter. Dating of the crater confirms it formed precisely when the dinosaurs became extinct.

Third, the environmental consequences of such an impact would have been devastating. The collision would have triggered massive wildfires, blocked sunlight with debris and soot, and caused a prolonged "impact winter." These conditions would have collapsed food chains, particularly affecting large animals like dinosaurs that required substantial food resources.`,
      readingTime: 180 // 3分钟
    },
    
    lecture: {
      transcript: `Now, while the asteroid impact theory is popular, it's not without problems. Let me explain why some scientists remain skeptical.

First, about that iridium layer. Yes, iridium is rare on Earth's surface, but it's actually quite abundant in Earth's mantle. Volcanic eruptions can bring iridium to the surface. In fact, there's evidence of massive volcanic activity—called the Deccan Traps—in India that occurred exactly when the dinosaurs died out. These eruptions lasted thousands of years and could easily account for the global iridium deposits.

Second, the timing of the Chicxulub impact is actually questionable. Some recent studies suggest the crater might have formed 300,000 years before the mass extinction, not at the same time. If that's true, the impact couldn't have caused the immediate extinction. The dinosaurs would have had hundreds of thousands of years to recover from any impact effects.

Third, consider this: the environmental effects of an asteroid impact would have affected all species equally. But the fossil record shows that some species survived while others died. Small mammals, birds, and crocodiles made it through, but dinosaurs didn't. This selective pattern suggests something other than a single catastrophic event—perhaps a gradual environmental change that some species could adapt to and others couldn't.`,
      audioUrl: null // 实际应用中可添加音频
    },
    
    prompt: "Summarize the points made in the lecture, being sure to explain how they cast doubt on the specific points made in the reading passage.",
    
    keyPoints: [
      "Iridium could come from volcanic activity (Deccan Traps), not just asteroids",
      "Crater timing may be 300,000 years before extinction",
      "Selective extinction pattern contradicts single catastrophic event"
    ],
    
    sampleResponse: `The lecture challenges the asteroid impact theory presented in the reading by raising several important counterarguments.

First, while the reading cites the worldwide iridium layer as evidence of an asteroid impact, the professor points out that iridium is also abundant in Earth's mantle. The Deccan Traps volcanic eruptions in India, which occurred simultaneously with the extinction event, could have brought iridium to the surface through prolonged volcanic activity, providing an alternative explanation for the global iridium deposits.

Second, the lecturer questions the timing of the Chicxulub crater. Contrary to the reading's claim that the crater dates precisely to the extinction event, some recent research suggests the impact may have occurred 300,000 years earlier. If accurate, this timeline would undermine the direct causal link between the impact and dinosaur extinction.

Third, the lecture challenges the reading's environmental catastrophe argument. The professor notes that an asteroid impact should have affected all species equally, yet the fossil record shows selective survival—small mammals, birds, and crocodiles survived while dinosaurs perished. This pattern is more consistent with gradual environmental changes that allowed some species to adapt, rather than a sudden catastrophic event.`,
    
    vocabulary: ["iridium", "anomaly", "crater", "catastrophic", "extinction", "fossil record", "volcanic activity"],
    
    scoringCriteria: {
      taskCompletion: "Accurately summarizes lecture points and their relationship to reading",
      organization: "Clear structure with logical flow",
      language: "Appropriate academic vocabulary and grammar"
    }
  },
  
  // 题目2: 远程工作利弊
  {
    id: 'toefl_int_002',
    type: WRITING_TYPES.TOEFL_INTEGRATED,
    topic: TOPIC_CATEGORIES.BUSINESS,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200,
    wordCount: { min: 150, max: 225 },
    
    title: "Remote Work Benefits",
    
    reading: {
      text: `Many companies have embraced remote work as a permanent option, citing numerous benefits for both employers and employees. Proponents argue that working from home represents a significant advancement in workplace flexibility.

First, remote work substantially increases employee productivity. Studies show that workers freed from office distractions complete tasks more efficiently. Without lengthy commutes and frequent interruptions from colleagues, employees can focus more intently on their work and accomplish more during business hours.

Second, companies save considerable money through remote work arrangements. Businesses can reduce or eliminate expenses for office space, utilities, office supplies, and other overhead costs. Some companies have reported saving thousands of dollars per employee annually by transitioning to remote work models.

Third, remote work improves employee well-being and job satisfaction. Workers appreciate the flexibility to manage their personal responsibilities alongside professional duties. This improved work-life balance leads to higher morale, reduced stress, and lower employee turnover rates.`,
      readingTime: 180
    },
    
    lecture: {
      transcript: `These supposed benefits of remote work? They're not as straightforward as the reading suggests. Let me give you some perspective from recent research.

About productivity—yes, some studies show gains, but there's a catch. The productivity boost mainly applies to individual, routine tasks. For creative work, problem-solving, and innovation, remote workers actually perform worse. Spontaneous conversations and in-person brainstorming sessions are crucial for generating new ideas, and you simply can't replicate that over video calls.

Regarding cost savings, companies are overlooking hidden expenses. Sure, you save on office rent, but now you're paying for cybersecurity upgrades, home office equipment for employees, software licenses for collaboration tools, and technical support for remote systems. Many companies have found their overall costs didn't decrease as much as expected—some even increased.

And about well-being? The reality is more complex. Many remote workers experience increased isolation and loneliness. The boundary between work and personal life becomes blurred—people end up working longer hours because they can't "leave" the office. Burnout rates among remote workers have actually risen. Some employees, especially younger ones and new hires, struggle to build professional relationships and receive mentorship when working remotely.`,
      audioUrl: null
    },
    
    prompt: "Summarize the points made in the lecture, being sure to explain how they challenge the specific claims made in the reading passage.",
    
    keyPoints: [
      "Productivity gains limited to routine tasks; creative work suffers",
      "Hidden costs offset savings (cybersecurity, equipment, software)",
      "Isolation, blurred boundaries, and burnout challenges well-being claims"
    ],
    
    sampleResponse: `The lecture presents a more nuanced view of remote work, challenging each benefit described in the reading.

First, the professor acknowledges productivity gains but argues they are limited to individual, routine tasks. For creative work and innovation, remote employees actually perform worse because they miss spontaneous in-person interactions and brainstorming opportunities that video calls cannot replicate.

Second, while the reading emphasizes cost savings from reduced office space, the lecture reveals hidden expenses that offset these savings. Companies must invest in enhanced cybersecurity, home office equipment for employees, collaboration software licenses, and expanded technical support. The professor notes that many companies found their total costs did not decrease significantly—and some even increased.

Third, the lecturer challenges the well-being argument by highlighting negative aspects of remote work. Many employees experience isolation and loneliness. Without a physical separation between work and home, boundaries blur, leading to longer working hours. Consequently, burnout rates have risen among remote workers. The professor also notes that younger employees and new hires particularly struggle to develop professional relationships and receive mentorship in remote environments.`,
    
    vocabulary: ["productivity", "overhead costs", "work-life balance", "turnover", "cybersecurity", "burnout", "mentorship"]
  },
  
  // 题目3: 海洋酸化
  {
    id: 'toefl_int_003',
    type: WRITING_TYPES.TOEFL_INTEGRATED,
    topic: TOPIC_CATEGORIES.ENVIRONMENT,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200,
    wordCount: { min: 150, max: 225 },
    
    title: "Ocean Acidification Solutions",
    
    reading: {
      text: `Ocean acidification, caused by increased absorption of atmospheric carbon dioxide, threatens marine ecosystems worldwide. Scientists have proposed several geoengineering solutions to combat this growing problem.

First, adding large quantities of lime (calcium hydroxide) to the oceans could neutralize acidity. This approach mimics natural weathering processes that have regulated ocean chemistry for millions of years. Lime is abundant, inexpensive, and its chemical reaction with acidic water is well understood.

Second, iron fertilization offers a promising solution. Adding iron to certain ocean regions stimulates phytoplankton growth, which absorbs CO2 during photosynthesis. When these organisms die and sink, they carry carbon to the deep ocean, effectively removing it from the atmosphere and reducing acidification.

Third, cultivating large-scale seaweed farms could help restore ocean pH levels. Seaweed absorbs enormous amounts of CO2 as it grows, and these farms could be established in coastal waters worldwide. Additionally, harvested seaweed has commercial value as food, fertilizer, and biofuel feedstock.`,
      readingTime: 180
    },
    
    lecture: {
      transcript: `These geoengineering proposals sound promising, but each has serious problems that the reading doesn't mention.

Let's start with adding lime. The scale required is staggering. To make any meaningful difference, we'd need to add billions of tons of lime annually. Mining, transporting, and distributing that much material would require enormous amounts of energy—most likely from fossil fuels—which would release more CO2 and worsen the problem we're trying to solve. It's essentially counterproductive.

Iron fertilization? It's been tested, and the results were disappointing. Yes, phytoplankton blooms occur, but most of the carbon doesn't actually reach the deep ocean. The organisms get eaten by zooplankton or decompose near the surface, releasing the CO2 right back into the water. Worse, the artificial blooms can create oxygen-depleted "dead zones" where other marine life cannot survive.

And seaweed farms face practical limitations. The best conditions for seaweed growth exist in limited coastal areas. You can't just grow seaweed anywhere in the ocean—it needs specific temperature, light, and nutrient conditions. Scaling up to a level that would meaningfully impact global ocean chemistry would require covering vast stretches of coastline, competing with fishing, shipping, and other marine uses.`,
      audioUrl: null
    },
    
    prompt: "Summarize the points made in the lecture, being sure to explain how they challenge the solutions proposed in the reading passage.",
    
    keyPoints: [
      "Lime addition requires fossil fuels, potentially worsening the problem",
      "Iron fertilization: carbon doesn't reach deep ocean; creates dead zones",
      "Seaweed farms limited to specific coastal conditions; scaling challenges"
    ],
    
    sampleResponse: `The lecture systematically challenges each geoengineering solution presented in the reading passage.

First, regarding lime addition, the professor points out the enormous scale required. Adding billions of tons of lime annually would demand massive amounts of energy for mining and transportation, most likely from fossil fuels. This energy consumption would release additional CO2, potentially counteracting or even worsening the acidification problem the solution aims to address.

Second, iron fertilization has proven disappointing in actual tests. While phytoplankton blooms do occur, the professor explains that most carbon fails to reach the deep ocean as the reading suggests. Instead, zooplankton consume the phytoplankton or organisms decompose near the surface, releasing CO2 back into the water. Furthermore, these artificial blooms can create oxygen-depleted "dead zones" that harm other marine life.

Third, the lecturer highlights practical limitations of seaweed farming. Seaweed requires specific conditions—particular temperatures, light levels, and nutrients—that exist only in limited coastal areas. Scaling these farms to meaningfully impact global ocean chemistry would require covering extensive coastlines, creating conflicts with fishing, shipping, and other important marine activities.`,
    
    vocabulary: ["acidification", "geoengineering", "phytoplankton", "photosynthesis", "decompose", "oxygen-depleted", "coastal"]
  },
  
  // 题目4: 古代玛雅文明衰落
  {
    id: 'toefl_int_004',
    type: WRITING_TYPES.TOEFL_INTEGRATED,
    topic: TOPIC_CATEGORIES.HISTORY,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200,
    wordCount: { min: 150, max: 225 },
    
    title: "Maya Civilization Collapse",
    
    reading: {
      text: `The collapse of the ancient Maya civilization around 900 CE has fascinated historians for centuries. Recent research points to prolonged drought as the primary cause of this dramatic decline.

First, climate data from lake sediments and cave formations reveals severe drought conditions lasting decades. These paleoclimate records show that the period between 800-1000 CE was the driest in the region's 7,000-year history. Such extended water shortages would have devastated agricultural production.

Second, the Maya were highly dependent on rain-fed agriculture. Unlike other ancient civilizations with access to major rivers, the Maya relied on seasonal rainfall and limited water storage systems. A prolonged drought would have caused widespread crop failures, food shortages, and ultimately famine.

Third, environmental stress typically leads to social and political instability. Historical patterns show that when resources become scarce, societies often experience internal conflicts, population displacement, and the breakdown of political institutions. The Maya were no exception to this pattern.`,
      readingTime: 180
    },
    
    lecture: {
      transcript: `While drought certainly played a role, the reading oversimplifies a complex historical event. Let me explain why drought alone cannot explain the Maya collapse.

First, about those climate records—they're valid, but they show regional variations. Drought was severe in some Maya areas but not others. Yet even cities in regions with adequate rainfall collapsed. If drought were the sole cause, we'd expect those wetter regions to survive or even thrive as people migrated there. The fact that they didn't suggests other factors were at work.

Second, the Maya had actually developed sophisticated water management systems. They built enormous reservoirs, called aguadas, that could store millions of liters of water. Archaeological evidence shows these systems functioned during the drought period. Many communities had water supplies that should have sustained them through dry spells. The reading underestimates Maya adaptability.

Third, there's strong evidence of warfare intensifying before the drought period. Inscriptions and archaeological findings show that cities were already fighting each other aggressively by 800 CE—before the worst droughts hit. This warfare destroyed agricultural infrastructure, disrupted trade networks, and diverted resources from food production to military purposes. The conflict may have weakened Maya society so severely that they couldn't cope with the drought when it came.`,
      audioUrl: null
    },
    
    prompt: "Summarize the points made in the lecture, being sure to explain how they complicate the drought explanation presented in the reading passage.",
    
    keyPoints: [
      "Drought was regional, but even wetter areas collapsed",
      "Maya had sophisticated water storage (aguadas) that functioned during drought",
      "Warfare intensified before drought period, weakening society's resilience"
    ],
    
    sampleResponse: `The lecture complicates the drought explanation by presenting evidence that multiple factors contributed to the Maya collapse.

First, while the professor acknowledges the validity of climate records, she points out that drought severity varied by region. Notably, cities in areas with adequate rainfall also collapsed. If drought were the primary cause, communities in wetter regions should have survived or absorbed migrants from drought-stricken areas. Their collapse suggests additional factors were involved.

Second, the lecturer challenges the reading's claim about Maya vulnerability to water shortages. Archaeological evidence reveals that the Maya had developed sophisticated water management systems, including massive reservoirs called aguadas capable of storing millions of liters. These systems remained functional during the drought period, indicating that many communities had adequate water supplies. This evidence suggests the reading underestimates Maya adaptive capabilities.

Third, the professor presents evidence of intensifying warfare before the drought's onset. Archaeological findings and inscriptions show aggressive conflicts between cities by 800 CE, preceding the worst droughts. This warfare destroyed agricultural infrastructure, disrupted trade, and diverted resources to military purposes. The pre-existing conflict may have so weakened Maya society that it could not withstand the subsequent environmental stress.`,
    
    vocabulary: ["paleoclimate", "sediments", "rainfall", "reservoirs", "archaeological", "inscriptions", "infrastructure"]
  },
  
  // 题目5: 人工智能艺术创作
  {
    id: 'toefl_int_005',
    type: WRITING_TYPES.TOEFL_INTEGRATED,
    topic: TOPIC_CATEGORIES.ARTS,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200,
    wordCount: { min: 150, max: 225 },
    
    title: "AI-Generated Art",
    
    reading: {
      text: `Artificial intelligence has revolutionized creative fields, with AI systems now capable of generating original artwork. Many argue that AI art represents a legitimate and valuable new form of artistic expression.

First, AI art demonstrates genuine creativity. Modern AI systems don't simply copy existing works—they generate novel combinations, styles, and concepts that have never existed before. These creations can evoke emotional responses and aesthetic appreciation just like traditional art.

Second, AI art democratizes creative expression. Previously, creating visual art required years of technical training. Now, anyone with access to AI tools can generate professional-quality images by simply describing their vision. This accessibility opens artistic creation to millions who previously lacked the technical skills.

Third, art has always evolved with technology. Photography was once dismissed as "not real art," yet it's now recognized as a legitimate artistic medium. Film, digital art, and other technological innovations faced similar skepticism before gaining acceptance. AI art is simply the next step in this ongoing evolution.`,
      readingTime: 180
    },
    
    lecture: {
      transcript: `The reading presents AI art in an overly positive light. There are significant concerns that deserve attention.

On the creativity question—let's be clear about what AI actually does. It analyzes millions of existing artworks and generates statistical patterns. It doesn't have emotions, experiences, or intentions. When we talk about creativity, we usually mean expressing something meaningful about human experience. AI lacks the consciousness and intentionality that we consider essential to artistic creation.

About democratization—there's a troubling flip side. AI systems were trained on millions of artworks created by human artists, often without permission or compensation. When someone uses AI to generate "their" artwork, they're essentially exploiting the uncredited labor of countless artists whose work was scraped from the internet. That's not democratization; it's appropriation. Many artists are rightfully upset that their styles and techniques are being replicated without consent.

And comparing AI to photography or film misses a crucial distinction. Those technologies still required human operators to make creative decisions—framing, timing, lighting, editing. The human remained the creative agent. With AI art, users provide brief text prompts while the AI makes countless aesthetic decisions. The creative agency has fundamentally shifted to the machine.`,
      audioUrl: null
    },
    
    prompt: "Summarize the points made in the lecture, being sure to explain how they challenge the arguments presented in the reading passage.",
    
    keyPoints: [
      "AI lacks consciousness and intentionality essential to creativity",
      "AI trained on artists' work without permission—appropriation, not democratization",
      "Unlike photography/film, AI makes aesthetic decisions—creative agency shifts to machine"
    ],
    
    sampleResponse: `The lecture presents significant counterarguments to the reading's positive portrayal of AI art.

First, the professor challenges the creativity claim by examining what AI actually does. Rather than genuine creation, AI systems analyze statistical patterns from millions of existing artworks. The lecturer emphasizes that AI lacks consciousness, emotions, and intentionality—qualities typically considered essential to artistic creativity. Without the ability to express meaningful human experiences, AI cannot create art in the traditional sense.

Second, the democratization argument is reframed as appropriation. The professor notes that AI systems were trained on millions of artworks scraped from the internet without artists' permission or compensation. When users generate AI art, they exploit the uncredited labor of countless artists whose styles and techniques are replicated without consent. Rather than democratizing art, this raises serious ethical concerns.

Third, the comparison to photography and film is challenged. The professor points out a fundamental distinction: those technologies still required human operators to make creative decisions about framing, timing, lighting, and editing. With AI art, users merely provide brief text prompts while the AI makes countless aesthetic decisions autonomously. This represents a fundamental shift of creative agency from human to machine, unlike previous technological innovations.`,
    
    vocabulary: ["consciousness", "intentionality", "aesthetic", "democratize", "appropriation", "consent", "agency"]
  }
];

// ==================== V4: TOEFL学术讨论写作 (1-5) ====================
const TOEFL_DISCUSSION_TOPICS = [
  // 题目1: 在线教育vs传统教育
  {
    id: 'toefl_disc_001',
    type: WRITING_TYPES.TOEFL_DISCUSSION,
    topic: TOPIC_CATEGORIES.EDUCATION,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 600, // 10分钟
    wordCount: { min: 100, max: 150 },
    
    title: "Online vs. Traditional Education",
    
    professorQuestion: {
      name: "Dr. Williams",
      context: "This week, we've been examining different educational models. Today, I'd like you to consider the growing trend of online education.",
      question: "Do you think online courses can provide the same quality of education as traditional in-person classes? Why or why not?"
    },
    
    studentResponses: [
      {
        name: "Alex",
        response: "I believe online courses can be just as effective as traditional classes. With video lectures, interactive discussions, and digital resources, students can learn at their own pace. Plus, they have access to professors from top universities worldwide, which wouldn't be possible otherwise. The flexibility allows working students to pursue education without sacrificing their careers."
      },
      {
        name: "Jordan",
        response: "I disagree. Online learning misses the personal interaction that's crucial for education. In a classroom, professors can read students' expressions, adjust their teaching in real-time, and create a sense of community. Students also miss networking opportunities and the discipline that comes from attending scheduled classes. Self-motivation is harder to maintain at home with all its distractions."
      }
    ],
    
    prompt: "In your response, you should express and support your opinion, contribute to the discussion by considering the perspectives of both students, and stay on topic.",
    
    sampleResponse: `While both Alex and Jordan raise valid points, I believe the answer depends on the subject and student. For theoretical courses like history or literature, online learning can be equally effective—perhaps even superior, since students can review lectures multiple times. However, for subjects requiring hands-on practice, like laboratory sciences or performing arts, in-person instruction remains essential. The key factor is individual learning style: self-disciplined students thrive online, while others need the structure of physical classrooms. Ultimately, a hybrid approach combining online flexibility with periodic in-person sessions might offer the best of both worlds.`,
    
    keyElements: [
      "Acknowledge both perspectives",
      "Provide nuanced personal opinion",
      "Support with specific reasoning",
      "Offer original insight"
    ]
  },
  
  // 题目2: 社交媒体对民主的影响
  {
    id: 'toefl_disc_002',
    type: WRITING_TYPES.TOEFL_DISCUSSION,
    topic: TOPIC_CATEGORIES.MEDIA,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 600,
    wordCount: { min: 100, max: 150 },
    
    title: "Social Media and Democracy",
    
    professorQuestion: {
      name: "Dr. Chen",
      context: "We've been analyzing the intersection of technology and political systems this semester.",
      question: "Has social media been a positive or negative force for democracy? Consider both the opportunities it creates and the challenges it presents."
    },
    
    studentResponses: [
      {
        name: "Maria",
        response: "Social media has empowered democratic participation like never before. Citizens can now organize protests, share information about government actions, and hold officials accountable in real-time. Movements like the Arab Spring showed how platforms can help people challenge authoritarian regimes. Social media gives voice to marginalized groups who previously had no platform."
      },
      {
        name: "David",
        response: "I'm skeptical about social media's democratic benefits. It's become a tool for spreading misinformation and deepening political divisions. Algorithm-driven feeds create echo chambers where people only see views they already agree with. Foreign actors have used these platforms to interfere in elections. The result is a more polarized, less informed electorate."
      }
    ],
    
    prompt: "In your response, express your opinion on the topic and contribute to the discussion by addressing what the other students said.",
    
    sampleResponse: `Both perspectives capture important truths about social media's complex role in democracy. I agree with Maria that these platforms have unprecedented potential for civic engagement—the ability to instantly mobilize millions of people represents a genuine democratic advancement. However, David's concerns about misinformation are equally valid and perhaps more urgent. The difference lies in how platforms are designed and regulated. Currently, engagement-maximizing algorithms amplify divisive content because controversy generates clicks. With proper oversight and algorithmic transparency, social media could enhance democracy. Without it, the manipulative potential David describes will likely predominate. The technology itself is neutral; our governance of it determines its democratic impact.`,
    
    keyElements: [
      "Engage with both student responses",
      "Present balanced analysis",
      "Offer solution or synthesis",
      "Demonstrate critical thinking"
    ]
  },
  
  // 题目3: 人工智能与就业
  {
    id: 'toefl_disc_003',
    type: WRITING_TYPES.TOEFL_DISCUSSION,
    topic: TOPIC_CATEGORIES.TECHNOLOGY,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 600,
    wordCount: { min: 100, max: 150 },
    
    title: "AI and Employment",
    
    professorQuestion: {
      name: "Dr. Patel",
      context: "This week's readings focused on automation and its economic implications.",
      question: "As artificial intelligence becomes more capable, should governments implement policies to protect workers from job displacement, or should the market be allowed to adjust naturally?"
    },
    
    studentResponses: [
      {
        name: "Sophia",
        response: "Government intervention is essential. Historical precedent shows that technological unemployment can devastate communities for generations. We need proactive policies: retraining programs, stronger social safety nets, perhaps even universal basic income. Waiting for the market to 'naturally adjust' means abandoning millions of workers to poverty while corporations reap automation's benefits."
      },
      {
        name: "James",
        response: "I think government intervention would do more harm than good. Throughout history, technology has always created more jobs than it destroyed. Artificial constraints would just slow innovation and make our economy less competitive globally. Workers should take personal responsibility for adapting their skills. The best policy is to improve education so people can continuously learn."
      }
    ],
    
    prompt: "Contribute to the discussion by expressing your viewpoint and addressing the arguments made by the other students.",
    
    sampleResponse: `I find merit in both positions but believe they're not mutually exclusive. James correctly notes that technology historically creates new jobs—but Sophia's point about transition periods is crucial. The problem isn't total employment but the time and suffering involved in adjustment. When manufacturing declined, entire regions experienced decades of economic devastation. A balanced approach would combine Sophia's support systems with James's emphasis on education. Rather than protecting obsolete jobs, governments should fund rapid retraining and provide temporary assistance during career transitions. This acknowledges market dynamism while recognizing that "natural adjustment" involves real human costs that ethical societies should mitigate.`,
    
    keyElements: [
      "Synthesize competing viewpoints",
      "Reference historical context",
      "Propose practical middle ground",
      "Demonstrate economic reasoning"
    ]
  },
  
  // 题目4: 气候变化个人责任
  {
    id: 'toefl_disc_004',
    type: WRITING_TYPES.TOEFL_DISCUSSION,
    topic: TOPIC_CATEGORIES.ENVIRONMENT,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 600,
    wordCount: { min: 100, max: 150 },
    
    title: "Individual vs. Systemic Climate Action",
    
    professorQuestion: {
      name: "Dr. Thompson",
      context: "Our environmental ethics unit has explored various approaches to addressing climate change.",
      question: "Should individuals focus on changing their personal behaviors (reducing consumption, eating less meat, driving less), or should they primarily focus on political action to change corporate and governmental policies?"
    },
    
    studentResponses: [
      {
        name: "Emma",
        response: "Personal behavior change is essential. Every individual choice matters, and when millions make sustainable choices, the cumulative impact is enormous. Besides, political action seems futile when corporations control politicians. At least with personal choices, we have direct control. Living our values also influences others and creates cultural change from the ground up."
      },
      {
        name: "Carlos",
        response: "Focusing on personal behavior is a distraction promoted by corporations to shift blame onto consumers. One hundred companies produce 71% of global emissions. Individual carbon footprints are trivial by comparison. The emphasis on personal guilt keeps people busy recycling while oil companies lobby against meaningful regulation. Political action targeting systemic change is the only effective approach."
      }
    ],
    
    prompt: "Share your perspective on this debate and respond to the points raised by your classmates.",
    
    sampleResponse: `Carlos makes a compelling statistical argument about corporate emissions, but I think he and Emma present a false dichotomy. Political engagement and personal choices aren't competing priorities—they're complementary. Politicians respond to constituents who demonstrate commitment through their lifestyles; someone who advocates for climate policy while maintaining a high-carbon lifestyle appears hypocritical and is easily dismissed. Moreover, consumer choices do influence corporate behavior when they affect profits. The most effective approach combines both: personally reducing consumption while channeling saved time and money into political organizing. Emma's cultural change and Carlos's systemic change ultimately require each other—neither alone is sufficient.`,
    
    keyElements: [
      "Identify false dichotomy",
      "Show how approaches complement each other",
      "Provide strategic reasoning",
      "Maintain balanced perspective"
    ]
  },
  
  // 题目5: 大学专业化vs通识教育
  {
    id: 'toefl_disc_005',
    type: WRITING_TYPES.TOEFL_DISCUSSION,
    topic: TOPIC_CATEGORIES.EDUCATION,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 600,
    wordCount: { min: 100, max: 150 },
    
    title: "Specialization vs. Liberal Arts",
    
    professorQuestion: {
      name: "Dr. Morrison",
      context: "We've been examining the purpose and structure of higher education in our society.",
      question: "Should universities primarily prepare students for specific careers through specialized training, or should they emphasize broad liberal arts education that develops critical thinking and diverse knowledge?"
    },
    
    studentResponses: [
      {
        name: "Ryan",
        response: "With tuition costs so high, students need practical job skills. Liberal arts graduates often struggle to find employment related to their degrees. Specialized programs in engineering, nursing, or computer science guarantee better career outcomes. Universities should adapt to economic realities rather than clinging to outdated educational models."
      },
      {
        name: "Nina",
        response: "Specialization is shortsighted. The jobs of tomorrow don't exist yet—many current jobs will be automated. What students need are adaptable skills: critical thinking, communication, creativity. Liberal arts education builds these transferable capabilities. Besides, education isn't just job training; it's about developing informed citizens and meaningful lives."
      }
    ],
    
    prompt: "Express your opinion on this topic and engage with the perspectives shared by your classmates.",
    
    sampleResponse: `Both Ryan and Nina capture legitimate concerns, but I believe universities can and should serve both purposes simultaneously. The key is integration rather than either/or. Technical fields benefit from humanities exposure—engineers who understand ethics and history design better products for society. Conversely, liberal arts students gain from practical courses that apply their analytical skills to real-world problems. Nina's point about adaptability is crucial: the most successful professionals combine deep expertise with broad perspective. A reformed curriculum might require specialized majors with substantial general education components, producing graduates who are both immediately employable and capable of lifelong learning as industries evolve.`,
    
    keyElements: [
      "Propose synthesis of opposing views",
      "Consider long-term implications",
      "Offer practical solution",
      "Connect to broader purpose of education"
    ]
  }
];

// ==================== V5: 数据导出 ====================
// 汇总所有写作数据
const writingData = {
  version: '1.0.0',
  lastUpdated: '2024-12-02',
  
  // 类型定义
  types: WRITING_TYPES,
  categories: TOPIC_CATEGORIES,
  difficulties: DIFFICULTY_LEVELS,
  
  // 模板资源
  templates: WRITING_TEMPLATES,
  
  // 题目数据
  topics: {
    toefl_integrated: TOEFL_INTEGRATED_TOPICS,
    toefl_discussion: TOEFL_DISCUSSION_TOPICS,
    gre_issue: [],       // V16-V20 添加
    gre_argument: [],    // V16-V20 添加
    ielts_task1: [],     // V21-V25 添加
    ielts_task2: [],     // V21-V25 添加
    kaoyan: [],          // V26-V30 添加
    academic: []         // V26-V30 添加（学术英语写作）
  },
  
  // 统计信息
  stats: {
    totalTopics: TOEFL_INTEGRATED_TOPICS.length + TOEFL_DISCUSSION_TOPICS.length,
    byType: {
      toefl_integrated: TOEFL_INTEGRATED_TOPICS.length,
      toefl_discussion: TOEFL_DISCUSSION_TOPICS.length
    }
  }
};

// 获取随机题目
function getRandomWritingTopic(type = null, difficulty = null) {
  let pool = [];
  
  if (type) {
    if (type.startsWith('toefl_integrated')) pool = TOEFL_INTEGRATED_TOPICS;
    else if (type.startsWith('toefl_discussion')) pool = TOEFL_DISCUSSION_TOPICS;
  } else {
    pool = [...TOEFL_INTEGRATED_TOPICS, ...TOEFL_DISCUSSION_TOPICS];
  }
  
  if (difficulty) {
    pool = pool.filter(t => t.difficulty === difficulty);
  }
  
  return pool[Math.floor(Math.random() * pool.length)];
}

// 获取指定类型的所有题目
function getWritingTopicsByType(type) {
  switch(type) {
    case WRITING_TYPES.TOEFL_INTEGRATED:
      return TOEFL_INTEGRATED_TOPICS;
    case WRITING_TYPES.TOEFL_DISCUSSION:
      return TOEFL_DISCUSSION_TOPICS;
    default:
      return [];
  }
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    writingData,
    WRITING_TYPES,
    TOPIC_CATEGORIES,
    DIFFICULTY_LEVELS,
    WRITING_TEMPLATES,
    TOEFL_INTEGRATED_TOPICS,
    TOEFL_DISCUSSION_TOPICS,
    getRandomWritingTopic,
    getWritingTopicsByType
  };
}

console.log('✅ 写作数据模块加载完成 (V1-V5)');
console.log(`📝 TOEFL综合写作: ${TOEFL_INTEGRATED_TOPICS.length} 道`);
console.log(`💬 TOEFL学术讨论: ${TOEFL_DISCUSSION_TOPICS.length} 道`);

// ==================== V6-V10: 更多TOEFL综合写作题目 ====================

// V6: 生物技术与农业
TOEFL_INTEGRATED_TOPICS.push({
  id: 'toefl_int_006',
  type: WRITING_TYPES.TOEFL_INTEGRATED,
  topic: TOPIC_CATEGORIES.SCIENCE,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 1200,
  wordCount: { min: 150, max: 225 },
  
  title: "Genetically Modified Crops",
  
  reading: {
    text: `Genetically modified (GM) crops have been heralded as a solution to global food security challenges. Proponents argue that these crops offer substantial benefits for agriculture and society.

First, GM crops significantly increase agricultural yields. Through genetic engineering, scientists have developed crops that are resistant to pests, diseases, and harsh environmental conditions. These modifications allow farmers to produce more food on the same amount of land, helping to feed a growing global population.

Second, GM crops reduce the need for chemical pesticides. Crops engineered with natural pest resistance, such as Bt corn that produces its own insecticide, eliminate the need for farmers to spray harmful chemicals. This benefits both environmental health and farmer safety.

Third, GM crops can be enhanced with improved nutritional profiles. Scientists have developed crops fortified with essential vitamins and minerals, such as Golden Rice enriched with Vitamin A. These biofortified crops can address malnutrition in developing countries where dietary diversity is limited.`,
    readingTime: 180
  },
  
  lecture: {
    transcript: `The reading paints an optimistic picture, but there are serious concerns about GM crops that deserve consideration.

About those yield increases—the evidence is actually mixed. While some GM crops do produce higher yields initially, long-term studies show the gains often diminish over time. Why? Pests evolve resistance to GM modifications, just as bacteria evolve resistance to antibiotics. Farmers then need to apply pesticides anyway, or plant newer, more expensive GM varieties. The promised sustainability doesn't always materialize.

On the pesticide reduction claim, there's an important caveat. Yes, some pesticide use has declined, but herbicide use has actually increased dramatically. Many GM crops are engineered to resist herbicides, allowing farmers to spray entire fields without killing the crops. This has led to the emergence of herbicide-resistant "superweeds" that require even more chemicals to control. The net environmental benefit is questionable.

And regarding nutrition—Golden Rice is a good example of promise versus reality. Despite decades of development, it still isn't widely available. Distribution challenges, farmer adoption, and cultural preferences have prevented these crops from reaching the populations that need them most. Meanwhile, critics argue that resources spent on GM solutions could be better invested in promoting diverse diets and improving food distribution systems.`,
    audioUrl: null
  },
  
  prompt: "Summarize the points made in the lecture, explaining how they cast doubt on the claims in the reading passage.",
  
  keyPoints: [
    "Yield gains diminish as pests develop resistance",
    "Herbicide-resistant crops have increased herbicide use and created superweeds",
    "Biofortified crops like Golden Rice face distribution and adoption challenges"
  ],
  
  sampleResponse: `The lecture raises significant counterarguments to the reading's positive portrayal of GM crops.

First, concerning yield increases, the professor explains that while initial gains occur, long-term studies show diminishing returns. Pests evolve resistance to GM modifications over time, similar to antibiotic resistance. Consequently, farmers eventually need to apply pesticides or purchase newer GM varieties, undermining the claimed sustainability.

Second, the pesticide reduction claim requires important context. Although some pesticide use has declined, herbicide use has increased dramatically because many GM crops are engineered to resist herbicides. This enables farmers to spray entire fields, which has led to the emergence of herbicide-resistant "superweeds" requiring even more chemicals to control. The environmental benefit is therefore questionable.

Third, the lecturer challenges the nutritional enhancement argument using Golden Rice as an example. Despite decades of development, this crop remains largely unavailable due to distribution challenges, farmer adoption issues, and cultural preferences. The professor suggests that resources might be better allocated to promoting dietary diversity and improving existing food distribution systems rather than pursuing GM solutions.`,
  
  vocabulary: ["biofortified", "herbicide", "antibiotic resistance", "sustainability", "genetic engineering"]
});

// V7: 城市绿化建设
TOEFL_INTEGRATED_TOPICS.push({
  id: 'toefl_int_007',
  type: WRITING_TYPES.TOEFL_INTEGRATED,
  topic: TOPIC_CATEGORIES.ENVIRONMENT,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 1200,
  wordCount: { min: 150, max: 225 },
  
  title: "Urban Green Roofs",
  
  reading: {
    text: `Urban planners increasingly advocate for green roofs—rooftops covered with vegetation—as a solution to multiple environmental challenges in cities. These living rooftops offer significant benefits.

First, green roofs effectively reduce urban heat island effects. Cities are typically several degrees warmer than surrounding rural areas because buildings and pavement absorb and retain heat. Green roofs absorb less heat and cool the air through evapotranspiration, lowering ambient temperatures and reducing energy consumption for air conditioning.

Second, green roofs manage stormwater effectively. They absorb and retain rainwater that would otherwise overwhelm urban drainage systems, reducing flooding and decreasing polluted runoff into waterways. Studies show that green roofs can retain 50-90% of rainfall during typical storms.

Third, green roofs provide valuable urban habitat for wildlife. As natural spaces disappear from cities, rooftop gardens offer refuges for birds, insects, and other species. Some green roofs have been designed specifically to support endangered species and promote urban biodiversity.`,
    readingTime: 180
  },
  
  lecture: {
    transcript: `Green roofs sound wonderful in theory, but let's examine the practical realities.

First, the cooling benefits exist, but they're often overstated. The temperature reduction primarily affects the building directly below the green roof. The impact on overall neighborhood temperatures is minimal unless a very high percentage of buildings have green roofs—which rarely happens. Additionally, the cooling effect drops significantly during droughts when the plants are stressed and evapotranspiration decreases.

Second, the stormwater benefits, while real, come with complications. Green roofs require significant structural reinforcement because wet soil is extremely heavy—up to 100 pounds per square foot. Many existing buildings cannot support this weight without costly retrofitting. Furthermore, proper maintenance is essential; poorly maintained green roofs can actually become sources of pollution rather than solutions as accumulated debris washes into drainage systems.

Third, the wildlife habitat argument is somewhat misleading. Rooftop conditions are harsh—extreme temperatures, high winds, limited soil depth. Most green roofs support only the hardiest plants and a narrow range of insect species. They cannot replicate the complex ecosystems of ground-level green spaces. For true biodiversity benefits, investment in parks and natural areas would be far more effective.`,
    audioUrl: null
  },
  
  prompt: "Summarize the lecture points and explain how they challenge the reading passage claims.",
  
  keyPoints: [
    "Cooling benefits limited to individual buildings; diminish during droughts",
    "Structural requirements and maintenance needs complicate stormwater management",
    "Harsh rooftop conditions limit biodiversity benefits compared to ground-level parks"
  ],
  
  sampleResponse: `The lecture provides a more cautious assessment of green roofs, challenging each benefit presented in the reading.

First, while acknowledging cooling benefits exist, the professor explains they are often overstated. Temperature reduction primarily affects individual buildings rather than entire neighborhoods unless a very high percentage of rooftops are covered—which is rare. Moreover, the cooling effect diminishes significantly during droughts when plant stress reduces evapotranspiration.

Second, the stormwater management benefits face practical complications. Green roofs require substantial structural reinforcement because wet soil can weigh up to 100 pounds per square foot. Many existing buildings cannot support this weight without expensive retrofitting. Additionally, without proper maintenance, green roofs can become pollution sources rather than solutions when accumulated debris washes into drainage systems.

Third, the lecturer challenges the wildlife habitat claim as misleading. Rooftop conditions are harsh, with extreme temperatures, high winds, and limited soil depth. Only the hardiest plants and a narrow range of insects can survive, making green roofs unable to replicate complex ground-level ecosystems. Investment in parks and natural areas would provide far more effective biodiversity benefits.`,
  
  vocabulary: ["evapotranspiration", "stormwater", "retrofitting", "biodiversity", "urban heat island"]
});

// V8: 四天工作周
TOEFL_INTEGRATED_TOPICS.push({
  id: 'toefl_int_008',
  type: WRITING_TYPES.TOEFL_INTEGRATED,
  topic: TOPIC_CATEGORIES.BUSINESS,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 1200,
  wordCount: { min: 150, max: 225 },
  
  title: "Four-Day Workweek",
  
  reading: {
    text: `The four-day workweek is gaining traction as businesses explore alternatives to traditional work schedules. Advocates argue that reducing the standard workweek from five to four days offers substantial benefits.

First, a shorter workweek improves employee well-being. Workers gain an extra day for personal responsibilities, hobbies, and family time. Studies from companies that have implemented four-day weeks report reduced stress levels, better mental health, and improved work-life balance.

Second, productivity often increases despite fewer working hours. Employees are more focused and efficient when they know their time is limited. Companies that have tested four-day weeks report that workers accomplish the same amount—or more—in fewer hours, as they waste less time on unnecessary meetings and distractions.

Third, the environmental benefits are significant. One fewer commuting day per week reduces carbon emissions from transportation. Additionally, offices consume less energy for lighting, heating, and cooling. Some estimates suggest a 20% reduction in workplace carbon footprint.`,
    readingTime: 180
  },
  
  lecture: {
    transcript: `The four-day workweek has gotten a lot of positive press, but the reality is more complicated than those headlines suggest.

About well-being improvements—yes, some workers report better life balance, but others experience increased stress. Why? Because the same work must be completed in less time. Many employees end up working longer days or feeling pressured to perform at unsustainable intensities. Workers in customer-facing roles or those who collaborate across time zones often can't take the extra day off anyway.

Regarding productivity—the studies cited are often short-term trials where employees were highly motivated to prove the concept worked. It's called the Hawthorne effect—people perform better when they know they're being observed. Long-term results are less encouraging. Some companies have quietly abandoned four-day experiments because productivity actually declined once the novelty wore off.

And those environmental benefits? They assume people stay home on their day off. But surveys show many use the extra day for travel, shopping, or other activities that generate their own carbon emissions. Additionally, keeping a business operational five days while each employee works four typically requires hiring additional staff, which can actually increase overall emissions rather than decrease them.`,
    audioUrl: null
  },
  
  prompt: "Summarize the points made in the lecture and explain how they complicate the arguments in the reading.",
  
  keyPoints: [
    "Well-being gains offset by pressure to complete same work in less time",
    "Productivity studies affected by Hawthorne effect; long-term results less positive",
    "Environmental benefits undermined by off-day activities and need for additional staff"
  ],
  
  sampleResponse: `The lecture presents a more nuanced view of the four-day workweek, challenging each benefit described in the reading.

First, while some workers experience improved well-being, others face increased stress from completing the same workload in less time. Employees may work longer days or feel pressure to perform at unsustainable intensities. Customer-facing workers and those collaborating across time zones often cannot participate in the shortened week anyway.

Second, the professor questions the productivity evidence. Short-term trials may reflect the Hawthorne effect—workers performing better because they know they're being observed. Long-term results are less encouraging, with some companies quietly abandoning four-day experiments when productivity declined after the initial novelty wore off.

Third, the environmental benefits are challenged. The reading's assumptions require employees to stay home on their extra day off, but surveys show many use the time for travel, shopping, or other emission-generating activities. Furthermore, maintaining five-day business operations with employees working only four days often requires hiring additional staff, potentially increasing rather than decreasing overall emissions.`,
  
  vocabulary: ["Hawthorne effect", "work-life balance", "carbon footprint", "customer-facing", "time zones"]
});

// V9: 睡眠与学习
TOEFL_INTEGRATED_TOPICS.push({
  id: 'toefl_int_009',
  type: WRITING_TYPES.TOEFL_INTEGRATED,
  topic: TOPIC_CATEGORIES.PSYCHOLOGY,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 1200,
  wordCount: { min: 150, max: 225 },
  
  title: "Sleep and Memory Consolidation",
  
  reading: {
    text: `Sleep plays a crucial role in learning and memory consolidation. Neuroscience research has established several mechanisms through which sleep enhances cognitive function.

First, during sleep, the brain replays and strengthens neural pathways associated with newly learned information. Studies using brain imaging have shown that patterns of neural activity observed during learning are reactivated during subsequent sleep, reinforcing memory traces.

Second, sleep facilitates the transfer of memories from short-term to long-term storage. The hippocampus, which initially stores new information, transfers it to the neocortex during sleep for permanent storage. This process is particularly active during slow-wave deep sleep.

Third, sleep helps the brain identify and retain important information while discarding irrelevant details. During sleep, the brain seems to distinguish between significant and trivial experiences, strengthening useful memories while allowing unimportant ones to fade. This selective process makes learning more efficient.`,
    readingTime: 180
  },
  
  lecture: {
    transcript: `The reading presents a compelling case for sleep's role in memory, but some recent research suggests the picture is more complicated.

First, about neural replay during sleep—yes, it occurs, but whether it actually improves memory is debated. Some researchers argue that replay might be a byproduct of sleep rather than a mechanism for memory enhancement. Studies have shown that disrupting replay doesn't always impair memory consolidation, suggesting other processes may be more important.

Second, the transfer from hippocampus to neocortex doesn't work uniformly for all types of memory. Procedural memories—like how to ride a bike—don't seem to rely on this transfer process. And emotional memories appear to be consolidated differently, sometimes even strengthened by sleep deprivation under certain conditions. The reading's model oversimplifies the variety of memory systems.

Third, the idea that sleep selectively preserves important memories is appealing but hard to test. How does the brain determine what's "important"? Recent studies suggest that expectation matters—if you know you'll be tested on something, sleep helps retain it. But sleep doesn't somehow magically know what you'll need. Without explicit tagging of important information during learning, sleep's selective benefits may not apply.`,
    audioUrl: null
  },
  
  prompt: "Summarize the lecture's points and how they complicate the reading's claims about sleep and memory.",
  
  keyPoints: [
    "Neural replay might be byproduct rather than memory mechanism; disruption doesn't always impair memory",
    "Memory transfer model doesn't apply uniformly to all memory types (procedural, emotional)",
    "Selective preservation depends on expectation; sleep doesn't automatically identify importance"
  ],
  
  sampleResponse: `The lecture complicates the reading's claims about sleep and memory by presenting alternative interpretations of the evidence.

First, while neural replay during sleep is documented, the professor questions whether it actually enhances memory. Some researchers argue replay may be a byproduct of sleep rather than a causal mechanism. Studies showing that disrupting replay doesn't always impair memory consolidation suggest other processes may be more important for memory formation.

Second, the hippocampus-to-neocortex transfer model does not apply uniformly to all memory types. Procedural memories, like physical skills, don't seem to rely on this process. Emotional memories are consolidated differently and may sometimes be strengthened by sleep deprivation. The reading's model oversimplifies the diversity of human memory systems.

Third, the professor challenges the selective preservation claim. Determining what the brain considers "important" is difficult. Recent research suggests that expectation plays a key role—information explicitly tagged as important during learning benefits from sleep. However, sleep cannot automatically identify important information; without such conscious tagging, the selective benefits described in the reading may not occur.`,
  
  vocabulary: ["consolidation", "hippocampus", "neocortex", "procedural memory", "neural replay", "slow-wave sleep"]
});

// V10: 语言濒危
TOEFL_INTEGRATED_TOPICS.push({
  id: 'toefl_int_010',
  type: WRITING_TYPES.TOEFL_INTEGRATED,
  topic: TOPIC_CATEGORIES.CULTURE,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 1200,
  wordCount: { min: 150, max: 225 },
  
  title: "Preserving Endangered Languages",
  
  reading: {
    text: `Linguists estimate that half of the world's approximately 7,000 languages will disappear by the end of this century. Efforts to preserve endangered languages are essential for several reasons.

First, each language represents a unique system of knowledge. Indigenous languages often contain specialized vocabulary for local plants, animals, and ecological relationships that don't exist in major world languages. When a language dies, this accumulated knowledge—sometimes developed over thousands of years—is lost forever.

Second, language is fundamental to cultural identity. For many communities, their language embodies their history, values, and worldview. Losing a language often leads to cultural dissolution as younger generations become disconnected from their heritage.

Third, linguistic diversity benefits science. Each language offers unique insights into human cognition and the range of possible grammatical structures. Languages with unusual features help linguists understand what is universal about human language and what is culturally specific.`,
    readingTime: 180
  },
  
  lecture: {
    transcript: `While I share concern for endangered languages, we should think critically about preservation efforts.

First, about unique knowledge systems—yes, indigenous languages contain specialized vocabulary, but this knowledge can be documented and translated. Scientists regularly work with native speakers to catalog botanical and ecological terms. The knowledge itself can survive even if the language doesn't. What's lost isn't the knowledge per se, but one particular way of expressing it.

Second, the cultural identity argument has an uncomfortable implication. Who decides whether a community should preserve its language? Often, young people in these communities choose to learn majority languages because it provides better economic opportunities. Should we tell them they're wrong? Preserving a language that community members have chosen to abandon raises ethical questions about whose interests are being served—the community's or outside linguists and anthropologists who study them.

Third, while linguistic diversity is scientifically valuable, we have to be realistic about resources. Documentation projects are expensive and time-consuming. With thousands of languages endangered, we can't preserve them all. Perhaps resources are better spent on thorough documentation rather than revival efforts for languages that may have only a handful of elderly speakers.`,
    audioUrl: null
  },
  
  prompt: "Summarize the lecture's arguments and explain how they challenge or complicate the reading's position on language preservation.",
  
  keyPoints: [
    "Unique knowledge can be documented and translated; knowledge survives even without the language",
    "Community members themselves often choose majority languages; ethical questions about who decides",
    "Limited resources; documentation may be more realistic than revival for most languages"
  ],
  
  sampleResponse: `The lecture offers a more nuanced perspective on language preservation, challenging several points from the reading.

First, while acknowledging that indigenous languages contain specialized knowledge, the professor argues this knowledge can be documented and translated through work with native speakers. The knowledge itself can survive even if the original language does not; what is lost is a particular way of expressing that knowledge rather than the knowledge itself.

Second, the cultural identity argument raises ethical concerns. Young people in endangered language communities often choose to learn majority languages for economic opportunities. The professor questions who has the right to decide that these communities should preserve their languages, suggesting that outside interests of linguists and anthropologists might conflict with community members' own choices.

Third, the professor acknowledges the scientific value of linguistic diversity but emphasizes practical limitations. With thousands of languages endangered and preservation resources limited, comprehensive revival efforts are unrealistic. The professor suggests that thorough documentation of endangered languages may be a more achievable goal than attempting to revive languages with only a few elderly speakers remaining.`,
  
  vocabulary: ["endangered language", "linguistic diversity", "indigenous", "documentation", "botanical", "cultural dissolution"]
});

// 更新统计信息
writingData.stats.totalTopics = TOEFL_INTEGRATED_TOPICS.length + TOEFL_DISCUSSION_TOPICS.length;
writingData.stats.byType.toefl_integrated = TOEFL_INTEGRATED_TOPICS.length;

console.log('✅ V6-V10 TOEFL综合写作扩展完成');
console.log(`�� TOEFL综合写作: ${TOEFL_INTEGRATED_TOPICS.length} 道`);

// ==================== V11-V15: 更多TOEFL学术讨论写作 ====================

// V11: 大学是否应该强制通识教育
TOEFL_DISCUSSION_TOPICS.push({
  id: 'toefl_disc_006',
  type: WRITING_TYPES.TOEFL_DISCUSSION,
  topic: TOPIC_CATEGORIES.EDUCATION,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 600,
  wordCount: { min: 100, max: 150 },
  
  title: "Required General Education Courses",
  
  professorQuestion: {
    name: "Dr. Anderson",
    context: "We've been discussing the structure of university curricula and what constitutes a complete education.",
    question: "Should universities require all students to take general education courses outside their major, or should students be allowed to focus exclusively on their chosen field of study?"
  },
  
  studentResponses: [
    {
      name: "Michael",
      response: "General education requirements are essential. A well-rounded education creates better citizens and more adaptable workers. Engineering students who understand history and ethics make better decisions. Science students who study art develop creativity. These connections between disciplines are where innovation happens."
    },
    {
      name: "Priya",
      response: "I think required courses waste time and money. Students already know what they want to study, and forcing them to take unrelated courses delays graduation and increases debt. If someone wants to be a programmer, why should they sit through art history? Students should have the freedom to design their own education."
    }
  ],
  
  prompt: "Express your opinion and engage with both perspectives in the discussion.",
  
  sampleResponse: `Both Michael and Priya raise valid concerns, but I believe a middle ground exists. Michael correctly notes that interdisciplinary exposure fosters innovation—many breakthroughs occur at the intersection of fields. However, Priya's concerns about time and cost are practical realities for many students. Perhaps universities could require fewer general courses while ensuring those requirements are demonstrably connected to career skills. Alternatively, integrating broader perspectives within major courses—teaching ethics in engineering classes, for instance—could achieve Michael's goals without Priya's drawbacks. The key is making general education purposeful rather than arbitrary, so students see its relevance to their professional and personal development.`,
  
  keyElements: ["Synthesize both views", "Propose practical compromise", "Address financial concerns", "Connect to innovation"]
});

// V12: 政府是否应该资助艺术
TOEFL_DISCUSSION_TOPICS.push({
  id: 'toefl_disc_007',
  type: WRITING_TYPES.TOEFL_DISCUSSION,
  topic: TOPIC_CATEGORIES.ARTS,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 600,
  wordCount: { min: 100, max: 150 },
  
  title: "Government Funding for the Arts",
  
  professorQuestion: {
    name: "Dr. Nakamura",
    context: "This week we've examined the relationship between government and cultural institutions.",
    question: "Should governments provide significant funding for the arts (museums, theaters, public art), or should arts organizations rely on private donations and ticket sales?"
  },
  
  studentResponses: [
    {
      name: "Elena",
      response: "Government funding is crucial for preserving culture. Without public support, only profitable, popular entertainment survives. Opera, classical music, and experimental art would disappear. The arts enrich society in ways that market value can't measure. European countries fund the arts heavily, and their cultural heritage is far better preserved than ours."
    },
    {
      name: "Tyler",
      response: "Taxpayers shouldn't be forced to pay for art they might never see or enjoy. Private funding ensures accountability—if people value certain art, they'll pay for it. Government involvement also risks political influence over artistic content. The arts should stand on their own merits in the marketplace."
    }
  ],
  
  prompt: "Share your perspective on government arts funding and respond to your classmates' arguments.",
  
  sampleResponse: `Elena and Tyler both present compelling arguments, but I think the debate oversimplifies the issue. Elena is right that purely market-driven arts funding would eliminate culturally important but less commercially viable works. However, Tyler's concern about accountability is legitimate—public money should be spent responsibly. I propose a hybrid model: base government funding for established cultural institutions (museums, public libraries), while using competitive grants for new artistic projects. This ensures cultural preservation without unlimited spending. Additionally, matching-fund programs could leverage private donations, satisfying Tyler's preference for market signals while providing Elena's desired public support. The goal should be accessibility—ensuring art isn't available only to the wealthy.`,
  
  keyElements: ["Acknowledge both perspectives", "Propose hybrid model", "Address accountability", "Consider accessibility"]
});

// V13: 是否应该限制社交媒体使用年龄
TOEFL_DISCUSSION_TOPICS.push({
  id: 'toefl_disc_008',
  type: WRITING_TYPES.TOEFL_DISCUSSION,
  topic: TOPIC_CATEGORIES.TECHNOLOGY,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 600,
  wordCount: { min: 100, max: 150 },
  
  title: "Age Restrictions on Social Media",
  
  professorQuestion: {
    name: "Dr. Martinez",
    context: "Our unit on digital citizenship has explored the impact of technology on youth development.",
    question: "Should governments implement and enforce stricter age restrictions on social media platforms, requiring users to be at least 16 to create accounts?"
  },
  
  studentResponses: [
    {
      name: "Lisa",
      response: "Absolutely. Research shows social media harms adolescent mental health—increasing anxiety, depression, and body image issues. Children lack the maturity to navigate online social dynamics and can become victims of cyberbullying. Just as we restrict alcohol and driving, we should protect children from social media until they're developmentally ready."
    },
    {
      name: "Kevin",
      response: "Age restrictions are impractical and counterproductive. Kids will simply lie about their age, as they already do. Banning social media makes it more appealing and drives usage underground where parents can't monitor it. Instead, we should educate children about responsible use and let parents decide what's appropriate for their families."
    }
  ],
  
  prompt: "Contribute to this discussion by expressing your viewpoint and addressing the arguments raised.",
  
  sampleResponse: `Both Lisa and Kevin identify real challenges, but I think they're addressing different problems. Lisa's mental health concerns are well-documented, but Kevin correctly notes that prohibition rarely works with technology—children will find workarounds. Rather than focusing solely on age restrictions, which are easily circumvented, I'd advocate for a multi-pronged approach: requiring platforms to design age-appropriate versions with limited features for younger users, mandating parental consent and oversight mechanisms, and integrating digital literacy education into schools. This acknowledges Lisa's valid concerns about developmental readiness while accepting Kevin's practical reality that total bans are unenforceable. The goal should be harm reduction, not impossible prohibition.`,
  
  keyElements: ["Identify core tension", "Acknowledge enforcement challenges", "Propose alternative approach", "Focus on harm reduction"]
});

// V14: 远程医疗是否应该成为主流
TOEFL_DISCUSSION_TOPICS.push({
  id: 'toefl_disc_009',
  type: WRITING_TYPES.TOEFL_DISCUSSION,
  topic: TOPIC_CATEGORIES.HEALTH,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 600,
  wordCount: { min: 100, max: 150 },
  
  title: "Telemedicine as Standard Care",
  
  professorQuestion: {
    name: "Dr. Williams",
    context: "The pandemic accelerated adoption of telemedicine. Now we're examining whether these changes should become permanent.",
    question: "Should telemedicine (video consultations with doctors) become a standard option for routine medical care, or should in-person visits remain the norm?"
  },
  
  studentResponses: [
    {
      name: "Amy",
      response: "Telemedicine should definitely become standard. It increases access for rural patients, reduces waiting times, and is more convenient for everyone. For routine check-ups and prescription renewals, video calls are perfectly adequate. It also reduces transmission of illnesses in waiting rooms. The pandemic proved that remote care works."
    },
    {
      name: "Daniel",
      response: "I'm skeptical. Doctors can miss physical symptoms they would catch in person—a slight limp, skin changes, unusual breathing. The doctor-patient relationship suffers when mediated by screens. And what about patients without reliable internet or who aren't tech-savvy? Telemedicine creates a two-tier healthcare system."
    }
  ],
  
  prompt: "Share your opinion on telemedicine and engage with the points raised by your classmates.",
  
  sampleResponse: `Amy and Daniel both make valid points, suggesting the answer depends on the type of care involved. Amy is right that for routine matters—medication refills, follow-up questions, mental health check-ins—telemedicine is often more efficient and accessible. However, Daniel correctly notes that physical examinations remain irreplaceable for many conditions. Rather than choosing one or the other, I'd advocate for hybrid care models: telemedicine as a first-line option for appropriate cases, with clear protocols for when in-person visits are necessary. Daniel's digital divide concern is crucial—expanding broadband access and providing technology support must accompany any telemedicine expansion. The goal should be augmenting care access, not replacing the irreplaceable aspects of physical medicine.`,
  
  keyElements: ["Distinguish routine vs. complex care", "Propose hybrid model", "Address digital divide", "Consider implementation needs"]
});

// V15: 大学体育是否应该付薪给学生运动员
TOEFL_DISCUSSION_TOPICS.push({
  id: 'toefl_disc_010',
  type: WRITING_TYPES.TOEFL_DISCUSSION,
  topic: TOPIC_CATEGORIES.EDUCATION,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 600,
  wordCount: { min: 100, max: 150 },
  
  title: "Paying College Athletes",
  
  professorQuestion: {
    name: "Dr. Johnson",
    context: "College athletics in the United States is a multi-billion dollar industry, yet student athletes traditionally receive no direct compensation.",
    question: "Should college athletes be paid salaries beyond their scholarships, or does payment undermine the educational mission of collegiate sports?"
  },
  
  studentResponses: [
    {
      name: "Marcus",
      response: "College athletes absolutely deserve payment. Football and basketball programs generate billions in revenue, but the athletes who create that value receive nothing while coaches earn millions. It's exploitative. Many athletes come from low-income backgrounds and can't afford basic expenses while dedicating 40+ hours weekly to their sport. The 'amateur' model is just a way for universities to profit from free labor."
    },
    {
      name: "Sarah",
      response: "Paying athletes would destroy the student-athlete model. They already receive scholarships worth hundreds of thousands of dollars. If we pay them, they become employees, not students. Schools would focus even more on revenue sports, cutting funding for less popular programs. The arms race for top recruits would benefit only wealthy schools, destroying competitive balance."
    }
  ],
  
  prompt: "Express your perspective on this issue and respond to the arguments made by your classmates.",
  
  sampleResponse: `Marcus and Sarah both raise legitimate concerns about a genuinely complex issue. Marcus correctly identifies the exploitation inherent in a system where schools profit enormously while athletes in revenue sports cannot share in the wealth they create. However, Sarah's concerns about competitive balance and non-revenue sports are practical realities that simple payment schemes would worsen. I'd propose allowing athletes to profit from their name, image, and likeness—essentially letting them earn endorsement money—while maintaining the scholarship system. This addresses Marcus's concern about athletes' economic rights without directly tying school budgets to player salaries, which would hurt smaller programs as Sarah fears. Additionally, revenue-sharing from media deals could fund improved support for all student-athletes, not just stars.`,
  
  keyElements: ["Acknowledge exploitation concerns", "Address competitive balance", "Propose NIL solution", "Consider all athletes"]
});

// 更新统计信息
writingData.stats.totalTopics = TOEFL_INTEGRATED_TOPICS.length + TOEFL_DISCUSSION_TOPICS.length;
writingData.stats.byType.toefl_discussion = TOEFL_DISCUSSION_TOPICS.length;

console.log('✅ V11-V15 TOEFL学术讨论扩展完成');
console.log(`💬 TOEFL学术讨论: ${TOEFL_DISCUSSION_TOPICS.length} 道`);

// ==================== V16-V20: GRE写作题目 ====================

// GRE Issue 分析题目
const GRE_ISSUE_TOPICS = [
  // V16: Issue 1 - 教育与创造力
  {
    id: 'gre_issue_001',
    type: WRITING_TYPES.GRE_ISSUE,
    topic: TOPIC_CATEGORIES.EDUCATION,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 1800, // 30分钟
    wordCount: { min: 500, max: 700 },
    
    title: "Education and Creativity",
    
    prompt: "Educational institutions have a responsibility to dissuade students from pursuing fields of study in which they are unlikely to succeed.",
    
    instructions: "Write a response in which you discuss the extent to which you agree or disagree with the claim. In developing and supporting your position, be sure to address the most compelling reasons and/or examples that could be used to challenge your position.",
    
    keyConsiderations: [
      "Definition of 'success' - financial, personal fulfillment, social contribution?",
      "Role of educational institutions - guidance vs. gatekeeping",
      "Individual autonomy vs. institutional responsibility",
      "Prediction accuracy - can success be reliably predicted?",
      "Late bloomers and unconventional paths"
    ],
    
    sampleOutline: {
      position: "Disagree - institutions should guide but not dissuade",
      paragraph1: "Educational institutions cannot reliably predict success; many successful people defied early assessments",
      paragraph2: "Dissuading students undermines autonomy and may reinforce existing inequalities",
      paragraph3: "Alternative approach: provide honest feedback while supporting student choices",
      conclusion: "Institutions should inform, not restrict; true education empowers rather than limits"
    },
    
    sampleResponse: `The claim that educational institutions should actively dissuade students from pursuing fields where they are "unlikely to succeed" rests on two problematic assumptions: that success can be reliably predicted, and that institutions possess the wisdom to make such determinations. While well-intentioned guidance has its place, I fundamentally disagree with the prescription of dissuasion.

First, the historical record provides abundant evidence that early assessments of potential are frequently wrong. Albert Einstein's teachers reportedly considered him a poor student; J.K. Rowling's initial Harry Potter manuscript was rejected by twelve publishers. Had influential educators convinced these individuals to abandon their pursuits, humanity would have lost significant contributions. The complexity of success—combining talent, persistence, timing, and circumstance—makes prediction notoriously unreliable.

Second, the concept of "unlikely to succeed" carries troubling implications. Success as defined by whom? If measured purely by income or prestige, then perhaps certain paths seem more promising. But a teacher who finds profound meaning in education, or an artist who enriches community life without wealth, may consider themselves successful by equally valid metrics. When institutions presume to know which pursuits merit discouragement, they often perpetuate narrow definitions of success that privilege certain backgrounds and capabilities over others.

Furthermore, there is the question of who bears the costs of being wrong. If an institution dissuades a student who would have thrived, that student loses the opportunity for fulfillment and contribution. If a student pursues a challenging path despite warnings and struggles, they at least made an autonomous choice and gained valuable experience. The costs of institutional overreach seem to outweigh those of letting students attempt difficult journeys.

This is not to say institutions have no role in guidance. Honest, data-informed counseling about career prospects, required competencies, and likely challenges serves students well. The distinction lies between providing information that empowers informed decisions and actively discouraging pursuit based on probabilistic predictions.

In conclusion, educational institutions should resist the paternalistic impulse to dissuade students from their chosen paths. True education develops individuals' capacity to assess their own goals and capabilities, not to substitute institutional judgment for personal aspiration. The appropriate role is to illuminate pathways—including their difficulties—while trusting students to make informed choices about their own lives.`,
    
    scoringCriteria: {
      analysis: "Depth of examination of the issue's complexities",
      reasoning: "Quality of supporting logic and examples",
      organization: "Clarity and coherence of essay structure",
      language: "Precision and sophistication of expression"
    }
  },
  
  // V17: Issue 2 - 技术与隐私
  {
    id: 'gre_issue_002',
    type: WRITING_TYPES.GRE_ISSUE,
    topic: TOPIC_CATEGORIES.TECHNOLOGY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 1800,
    wordCount: { min: 500, max: 700 },
    
    title: "Technology and Privacy",
    
    prompt: "In any field of inquiry, the beginner is more likely than the expert to make important contributions.",
    
    instructions: "Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.",
    
    keyConsiderations: [
      "Fresh perspectives vs. deep knowledge",
      "Revolutionary vs. incremental advances",
      "Field-specific differences (arts vs. sciences)",
      "Definition of 'important contributions'",
      "Historical examples of beginner vs. expert innovations"
    ],
    
    sampleOutline: {
      position: "Qualified disagreement - both contribute differently",
      paragraph1: "Experts make most contributions due to accumulated knowledge and recognized gaps",
      paragraph2: "Beginners occasionally provide breakthrough insights by questioning assumptions",
      paragraph3: "Different types of contributions: refinement vs. paradigm shifts",
      conclusion: "Healthy fields need both; the claim overstates beginner advantage"
    },
    
    sampleResponse: `The provocative claim that beginners are more likely than experts to make important contributions challenges our intuitive respect for expertise. While beginners occasionally offer revolutionary insights, the statement dramatically overstates their advantage. In most fields, the cumulative knowledge and refined judgment that comes with expertise remains essential for meaningful progress.

The case for beginners rests largely on famous examples of outsiders disrupting established fields. Darwin was a theological student, not a trained naturalist, when he conceived natural selection. The Wright brothers were bicycle mechanics, not engineers. These examples suggest that fresh eyes, unconstrained by conventional wisdom, can see possibilities that experts miss. There is psychological validity to this: expertise can create cognitive blind spots where familiar frameworks filter out anomalies that might point toward new understanding.

However, such examples are memorable precisely because they are exceptional. For every Darwin, thousands of informed contributions from trained scientists built the knowledge base that made evolutionary theory comprehensible. The vast majority of scientific papers, artistic works, and technical innovations emerge from individuals with deep domain expertise. Experts understand which problems are tractable, which approaches have failed, and where genuine opportunities exist. This accumulated wisdom prevents wasteful repetition and enables efficient progress.

Moreover, the nature of contributions differs systematically. Beginners, when they do contribute meaningfully, typically provide conceptual reframings or cross-disciplinary connections—seeing familiar problems in new ways. Experts contribute through refinement, extension, and application of existing knowledge. Both types of contribution matter, but claiming beginners are "more likely" to make important ones ignores how fields actually advance: primarily through expert accumulation with occasional revolutionary disruptions.

The statement also underestimates how modern expertise has evolved. Contemporary experts are increasingly trained to question assumptions and seek cross-disciplinary insights—incorporating the very "beginner's mind" advantages into their approach. The false dichotomy between beginner freshness and expert rigidity dissolves when we recognize that the best experts cultivate both qualities.

In conclusion, while beginners occasionally catalyze paradigm shifts through their unconstrained perspective, the claim that they are "more likely" than experts to make important contributions distorts reality. Healthy intellectual progress requires the complementary strengths of fresh insight and accumulated wisdom, with expert contributions forming the essential foundation upon which occasional beginner breakthroughs build.`,
    
    scoringCriteria: {
      analysis: "Nuanced examination of beginner vs. expert contributions",
      reasoning: "Balanced consideration of counterarguments",
      organization: "Logical flow and coherent structure",
      language: "Precise academic vocabulary"
    }
  },
  
  // V18: Issue 3 - 政府与艺术
  {
    id: 'gre_issue_003',
    type: WRITING_TYPES.GRE_ISSUE,
    topic: TOPIC_CATEGORIES.GOVERNMENT,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 1800,
    wordCount: { min: 500, max: 700 },
    
    title: "Government Support for Arts",
    
    prompt: "Governments should focus on solving the immediate problems of today rather than on trying to solve the anticipated problems of the future.",
    
    instructions: "Write a response in which you discuss the extent to which you agree or disagree with the recommendation and explain your reasoning for the position you take. In developing and supporting your position, describe specific circumstances in which adopting the recommendation would or would not be advantageous and explain how these examples shape your position.",
    
    keyConsiderations: [
      "Short-term vs. long-term planning",
      "Resource allocation trade-offs",
      "Predictability of future problems",
      "Examples: climate change, pandemic preparedness",
      "Political incentives and time horizons"
    ],
    
    sampleOutline: {
      position: "Disagree - both present and future problems require attention",
      paragraph1: "Immediate problems must be addressed, but not at exclusive cost of future planning",
      paragraph2: "Some future problems (climate, demographics) require early action to be solvable",
      paragraph3: "False dichotomy - effective governance integrates both timeframes",
      conclusion: "Balanced approach that addresses present while preparing for future"
    },
    
    sampleResponse: `The recommendation that governments should prioritize immediate over anticipated problems reflects a common political reality: voters reward visible, near-term results. However, as policy guidance, this advice proves dangerously shortsighted. Effective governance requires simultaneous attention to both present crises and foreseeable challenges; abandoning future planning would ultimately worsen the very immediate problems governments seek to solve.

Consider climate change, the paradigmatic example of an "anticipated problem." Decades ago, scientists warned of greenhouse gas consequences. Had governments then invested in clean energy transitions, today's "immediate problems" of extreme weather, agricultural disruption, and climate migration would be far less severe. The future has become the present, and nations that failed to prepare now face more expensive, more difficult remediation. This pattern—where neglected future problems become overwhelming present crises—recurs across domains from pandemic preparedness to infrastructure maintenance to educational reform.

That said, the recommendation contains a kernel of wisdom: governments cannot ignore immediate suffering in favor of abstract future benefits. A government that lets citizens starve while building theoretical resilience has failed its fundamental obligations. The COVID-19 pandemic illustrated this tension: resources devoted to immediate healthcare strained capacity for longer-term projects. Such trade-offs are real and difficult.

The resolution lies in recognizing a false dichotomy. Effective governments integrate short-term and long-term planning rather than choosing between them. Singapore's development, for instance, combined immediate economic growth with decades-long investments in education, water security, and land use planning. The United States' postwar highway system addressed immediate transportation needs while anticipating suburban growth. These examples demonstrate that addressing future problems often creates immediate benefits—jobs, economic activity, improved services—that make the dichotomy less stark than it appears.

Furthermore, democratic accountability should incorporate future citizens. Current voters may prefer immediate gratification, but governments bear obligations to those who will inherit the consequences of today's choices. Constitutional frameworks, independent institutions, and long-term planning bodies exist precisely to counterbalance short-term political incentives.

In conclusion, while governments must remain responsive to immediate needs, the recommendation to deprioritize anticipated problems would prove counterproductive. The wisest governance integrates both timeframes, recognizing that today's preparation prevents tomorrow's crises and that sustainable solutions to immediate problems often require long-term thinking.`,
    
    scoringCriteria: {
      analysis: "Exploration of time-horizon trade-offs in governance",
      reasoning: "Concrete examples supporting position",
      organization: "Clear thesis with developed paragraphs",
      language: "Sophisticated political vocabulary"
    }
  }
];

// GRE Argument 分析题目
const GRE_ARGUMENT_TOPICS = [
  // V19: Argument 1 - 商业决策
  {
    id: 'gre_arg_001',
    type: WRITING_TYPES.GRE_ARGUMENT,
    topic: TOPIC_CATEGORIES.BUSINESS,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 1800,
    wordCount: { min: 500, max: 700 },
    
    title: "Palean Baskets Trade Argument",
    
    prompt: `The following appeared in a memo from a vice president of a large, highly diversified company:

"Ten years ago our company had two new office buildings constructed as regional headquarters for two regions of the country. The buildings were constructed by two different construction companies—Loss Construction and Flig Construction. Although the two buildings had identical floor plans, the building constructed by Flig Construction cost 25 percent more to build. However, that building's heating and cooling costs have been lower than those of the building constructed by Loss Construction. Given this information, for any new building that we construct in the future, we should hire Flig Construction."`,
    
    instructions: "Write a response in which you examine the stated and/or unstated assumptions of the argument. Be sure to explain how the argument depends on these assumptions and what the implications are for the argument if the assumptions prove unwarranted.",
    
    logicalFlaws: [
      "Correlation vs. causation - lower costs may not be due to construction quality",
      "Small sample size - only two buildings compared",
      "Omitted variables - climate, usage patterns, maintenance differences",
      "Temporal changes - construction practices may have changed over 10 years",
      "Cost comparison incomplete - total cost of ownership not fully analyzed"
    ],
    
    sampleResponse: `The vice president's recommendation to exclusively hire Flig Construction for future projects rests on several assumptions that, upon examination, may prove unwarranted. While the lower heating and cooling costs in Flig's building are noteworthy, concluding that Flig should construct all future buildings requires leaps of logic that the available evidence does not support.

First, the argument assumes that the difference in operating costs stems from construction quality rather than other factors. However, the two buildings, despite identical floor plans, may exist in different climatic regions. A building in Minnesota will have different heating demands than one in Arizona, regardless of construction quality. Without controlling for climate, the comparison reveals little about construction effectiveness. Similarly, the buildings may experience different occupancy levels, operating hours, or maintenance regimens—all of which significantly affect energy costs.

Second, the argument draws a sweeping conclusion from an extremely limited sample. Two buildings constructed ten years ago by different companies provide minimal statistical basis for generalizing about those companies' current capabilities. Flig Construction may have had a particularly skilled team on that project, or Loss Construction may have faced supply chain issues that affected that specific building. Neither company's performance on a single decade-old project reliably predicts their work on future diverse projects.

Third, the 25 percent higher initial construction cost deserves more analysis than the argument provides. The vice president focuses on operating cost savings but does not calculate whether these savings offset the premium paid upfront. If the Flig building cost $10 million while the Loss building cost $8 million, and operating costs differ by $20,000 annually, it would take a century to recover the initial difference. Moreover, the nature of the construction cost difference matters: did Flig use higher-quality materials that justify the premium, or were they simply less efficient?

Fourth, the argument assumes both companies remain comparable to their capabilities ten years ago. Construction companies evolve; Loss Construction may have improved its practices, while Flig Construction may have experienced turnover or declining standards. Current bids and references would provide more relevant information than decade-old data.

Finally, the recommendation ignores important contextual factors for future projects. Building needs vary enormously—an office building in one region may require different expertise than a manufacturing facility or research laboratory elsewhere. A single past success does not indicate that Flig can optimally execute all building types in all locations.

In conclusion, while the energy cost difference between the two buildings warrants investigation, the evidence presented provides an insufficient basis for mandating exclusive use of Flig Construction. The company would be better served by evaluating multiple factors including climate-controlled comparisons, current capabilities of various contractors, total cost of ownership calculations, and project-specific requirements.`,
    
    scoringCriteria: {
      analysis: "Identification of unstated assumptions and logical gaps",
      reasoning: "Explanation of why assumptions matter",
      organization: "Systematic treatment of argument flaws",
      language: "Clear, precise analytical writing"
    }
  },
  
  // V20: Argument 2 - 城市规划
  {
    id: 'gre_arg_002',
    type: WRITING_TYPES.GRE_ARGUMENT,
    topic: TOPIC_CATEGORIES.GOVERNMENT,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 1800,
    wordCount: { min: 500, max: 700 },
    
    title: "City Traffic Reduction Argument",
    
    prompt: `The following appeared in a letter to the editor of the Balmer Island Gazette:

"The population of Balmer Island increases from approximately 5,500 people to approximately 30,000 during the summer months. To reduce the number of accidents involving mopeds and pedestrians, the town council of Balmer Island should limit the number of mopeds rented by the island's moped rental companies from 50 per day to 30 per day during the summer season. By limiting the number of rentals, the town council will enhance the overall safety of pedestrians and reduce the number of fatalities."`,
    
    instructions: "Write a response in which you discuss what questions would need to be answered in order to decide whether the recommendation is likely to have the predicted result. Be sure to explain how the answers to these questions would help to evaluate the recommendation.",
    
    logicalFlaws: [
      "Assumes rental mopeds are primary accident cause",
      "Ignores private moped ownership",
      "No baseline accident data provided",
      "Proportionality unclear - does 40% reduction in rentals yield significant safety gains?",
      "Possible unintended consequences not considered"
    ],
    
    sampleResponse: `The letter writer recommends limiting moped rentals to reduce pedestrian accidents on Balmer Island. While the safety concern is legitimate, several crucial questions must be answered before we can evaluate whether this recommendation would achieve its intended result.

First, what proportion of moped-pedestrian accidents involve rental mopeds versus privately owned ones? If most accidents involve residents or visitors who bring their own mopeds to the island, restricting rentals would address only a small portion of the problem. The letter assumes rental mopeds are the primary danger, but without data distinguishing accident sources, this assumption may be unfounded. Additionally, we must ask whether rental companies currently rent to inexperienced riders who are more accident-prone, or whether their customers are similar in skill level to private moped owners.

Second, what is the current baseline of accidents, and how significant is the problem? The letter mentions reducing "fatalities," implying deaths have occurred, but provides no numbers. If the island experiences one moped-related fatality every several years, the problem—while tragic—may not justify regulations that significantly restrict visitor mobility. Conversely, if accidents are frequent, more aggressive measures might be warranted. Without this baseline data, we cannot assess whether the proposed reduction is proportionate to the risk.

Third, how would reduced rental availability affect transportation patterns? Balmer Island's summer population increases sixfold, suggesting tourists constitute most of the population during peak season. If moped rental is restricted, how will these visitors travel? They might shift to cars or bicycles, potentially creating different safety hazards. Alternatively, they might walk more, increasing pedestrian density and potentially vulnerability. Or rental companies might circumvent restrictions by offering all-day or multi-day rentals counted as single daily rentals. Understanding likely behavioral responses is essential for predicting actual outcomes.

Fourth, are there alternative interventions that might more effectively address the problem? Speed limits, designated moped lanes, mandatory safety briefings for renters, or improved pedestrian infrastructure might reduce accidents without restricting availability. If such alternatives exist, comparing their likely effectiveness and costs to the rental restriction would help evaluate whether the recommendation represents the best approach.

Fifth, what are the economic implications for the island community? Moped rental businesses presumably contribute to the local economy and provide a service tourists value. Restricting their operations may have financial consequences for business owners, employees, and the island's tourism industry more broadly. Whether these costs are justified depends on the magnitude of safety benefits achieved.

In conclusion, the recommendation to limit moped rentals rests on assumptions about accident causation, problem severity, and behavioral responses that require empirical investigation before we can confidently predict whether the policy would enhance pedestrian safety. Without answers to these questions, the proposed solution may prove ineffective or counterproductive.`,
    
    scoringCriteria: {
      analysis: "Identification of key questions and assumptions",
      reasoning: "Explanation of how answers affect evaluation",
      organization: "Systematic questioning of argument",
      language: "Clear analytical expression"
    }
  }
];

// 更新写作数据统计
writingData.topics.gre_issue = GRE_ISSUE_TOPICS;
writingData.topics.gre_argument = GRE_ARGUMENT_TOPICS;
writingData.stats.byType.gre_issue = GRE_ISSUE_TOPICS.length;
writingData.stats.byType.gre_argument = GRE_ARGUMENT_TOPICS.length;

console.log('✅ V16-V20 GRE写作题目添加完成');
console.log(`📖 GRE Issue: ${GRE_ISSUE_TOPICS.length} 道`);
console.log(`🔍 GRE Argument: ${GRE_ARGUMENT_TOPICS.length} 道`);

// ==================== V21-V25: 雅思写作题目 ====================

// 雅思 Task 1 图表题
const IELTS_TASK1_TOPICS = [
  // V21: 线图 - 人口变化
  {
    id: 'ielts_t1_001',
    type: WRITING_TYPES.IELTS_TASK1_LINE,
    topic: TOPIC_CATEGORIES.SOCIETY,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200, // 20分钟
    wordCount: { min: 150, max: 200 },
    
    title: "Urban and Rural Population Trends",
    
    chartDescription: "The line graph shows the percentage of population living in urban and rural areas in one country from 1950 to 2050 (projected).",
    
    chartData: {
      type: "line",
      xAxis: "Year",
      yAxis: "Percentage of population",
      series: [
        { name: "Urban", data: [30, 35, 42, 50, 58, 65, 72, 78, 82, 85, 87] },
        { name: "Rural", data: [70, 65, 58, 50, 42, 35, 28, 22, 18, 15, 13] }
      ],
      labels: ["1950", "1960", "1970", "1980", "1990", "2000", "2010", "2020", "2030", "2040", "2050"]
    },
    
    prompt: "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    
    keyFeatures: [
      "Dramatic reversal from rural to urban majority",
      "Crossover point around 1980 (50-50)",
      "Steady, continuous trends in both directions",
      "Projected continuation of urbanization",
      "Specific data points at key moments"
    ],
    
    sampleResponse: `The line graph illustrates the proportion of the population residing in urban versus rural areas in a particular country over a century, from 1950 to 2050, with projections for the future.

Overall, the data reveals a dramatic demographic shift from a predominantly rural to a predominantly urban population, with the two lines crossing around 1980 when equal proportions lived in each area type.

In 1950, approximately 70% of the population lived in rural areas, while only 30% resided in cities. Over the following three decades, urbanization progressed steadily, and by 1980, the urban and rural populations had converged at roughly 50% each—a significant milestone in the country's demographic history.

Following this crossover, the urban population continued to grow while the rural population declined correspondingly. By 2010, nearly three-quarters of people (72%) lived in urban areas, leaving just 28% in rural regions. The projections suggest this trend will continue, with urban dwellers expected to constitute 87% of the population by 2050, compared to only 13% in rural areas.

In summary, the graph depicts a complete reversal of settlement patterns, with the country transforming from a primarily rural society in 1950 to a highly urbanized one by 2050.`,
    
    vocabulary: ["proportion", "demographic shift", "converge", "milestone", "correspondingly", "constitute"],
    
    scoringCriteria: {
      taskAchievement: "Clear overview and key features accurately reported",
      coherence: "Logical progression with appropriate paragraphing",
      lexicalResource: "Range of vocabulary for describing trends",
      grammar: "Accurate use of tenses and comparison structures"
    }
  },
  
  // V22: 柱状图 - 能源消耗
  {
    id: 'ielts_t1_002',
    type: WRITING_TYPES.IELTS_TASK1_BAR,
    topic: TOPIC_CATEGORIES.ENVIRONMENT,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200,
    wordCount: { min: 150, max: 200 },
    
    title: "Energy Consumption by Source",
    
    chartDescription: "The bar chart compares energy consumption from five different sources (oil, natural gas, coal, nuclear, and renewable) in three countries (USA, China, Germany) in 2020.",
    
    chartData: {
      type: "bar",
      xAxis: "Energy source",
      yAxis: "Consumption (million tonnes oil equivalent)",
      categories: ["Oil", "Natural Gas", "Coal", "Nuclear", "Renewable"],
      series: [
        { name: "USA", data: [900, 750, 280, 200, 180] },
        { name: "China", data: [680, 290, 1950, 90, 350] },
        { name: "Germany", data: [110, 85, 70, 25, 95] }
      ]
    },
    
    prompt: "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    
    keyFeatures: [
      "China's dominance in coal consumption",
      "USA's high oil and natural gas use",
      "Germany's relatively balanced, smaller-scale consumption",
      "Renewable energy variations between countries",
      "Nuclear energy relatively low across all three"
    ],
    
    sampleResponse: `The bar chart compares energy consumption across five sources—oil, natural gas, coal, nuclear, and renewable—in the United States, China, and Germany in 2020.

Overall, the USA and China consumed far more energy than Germany across most categories, though their energy profiles differed significantly. Coal dominated China's energy mix, while the USA relied more heavily on oil and natural gas.

The most striking feature is China's coal consumption, which stood at approximately 1,950 million tonnes oil equivalent—vastly exceeding that of both the USA (280) and Germany (70). In contrast, the USA led in oil consumption at 900 million tonnes, followed by China at 680 and Germany at just 110. Natural gas showed a similar pattern, with the USA consuming 750 million tonnes compared to China's 290 and Germany's 85.

Regarding cleaner energy sources, the USA had the highest nuclear consumption at 200 million tonnes, while China consumed only 90 and Germany 25. Interestingly, China led in renewable energy consumption with 350 million tonnes, surpassing both the USA (180) and Germany (95).

In summary, the three countries exhibited distinctly different energy profiles, with China being coal-dependent, the USA favoring fossil fuels broadly, and Germany maintaining lower but more balanced consumption.`,
    
    vocabulary: ["energy mix", "consumption", "vastly exceeding", "fossil fuels", "renewable", "coal-dependent"],
    
    scoringCriteria: {
      taskAchievement: "Accurate reporting with clear comparisons",
      coherence: "Well-organized with logical grouping",
      lexicalResource: "Appropriate vocabulary for data description",
      grammar: "Correct comparative structures"
    }
  },
  
  // V23: 饼图 - 家庭支出
  {
    id: 'ielts_t1_003',
    type: WRITING_TYPES.IELTS_TASK1_PIE,
    topic: TOPIC_CATEGORIES.ECONOMY,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 1200,
    wordCount: { min: 150, max: 200 },
    
    title: "Household Expenditure Categories",
    
    chartDescription: "The pie charts compare household expenditure across five categories in the UK in 1980 and 2020.",
    
    chartData: {
      type: "pie",
      charts: [
        {
          title: "1980",
          data: [
            { category: "Housing", percentage: 25 },
            { category: "Food", percentage: 30 },
            { category: "Transport", percentage: 15 },
            { category: "Entertainment", percentage: 10 },
            { category: "Other", percentage: 20 }
          ]
        },
        {
          title: "2020",
          data: [
            { category: "Housing", percentage: 35 },
            { category: "Food", percentage: 15 },
            { category: "Transport", percentage: 20 },
            { category: "Entertainment", percentage: 15 },
            { category: "Other", percentage: 15 }
          ]
        }
      ]
    },
    
    prompt: "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
    
    keyFeatures: [
      "Housing costs increased significantly (25% to 35%)",
      "Food expenditure halved (30% to 15%)",
      "Transport and entertainment increased",
      "Overall shift from basic necessities to housing",
      "More balanced distribution in 2020"
    ],
    
    sampleResponse: `The pie charts illustrate how British household expenditure was distributed across five categories in 1980 compared to 2020.

Overall, the most notable changes were the substantial increase in housing costs and the marked decline in food expenditure, reflecting shifting economic priorities over the four decades.

In 1980, food represented the largest expense at 30% of household budgets, followed closely by housing at 25%. Transport accounted for 15%, entertainment for 10%, and other expenses for 20%. This distribution suggests that basic necessities dominated household spending at that time.

By 2020, the pattern had changed considerably. Housing had become the dominant expense, rising to 35%—an increase of 10 percentage points. Conversely, food expenditure had halved to just 15%. Transport rose moderately to 20%, while entertainment increased to 15%, matching the food category. The "other" category decreased slightly to 15%.

In summary, UK households in 2020 allocated a much larger proportion of their income to housing compared to 1980, while spending relatively less on food. This shift suggests both rising property costs and greater disposable income for non-essential categories like entertainment.`,
    
    vocabulary: ["expenditure", "distribution", "proportion", "percentage points", "conversely", "disposable income"],
    
    scoringCriteria: {
      taskAchievement: "Clear comparison between two time periods",
      coherence: "Logical organization with overview",
      lexicalResource: "Appropriate vocabulary for percentages and change",
      grammar: "Accurate use of comparative and past tenses"
    }
  }
];

// 雅思 Task 2 大作文
const IELTS_TASK2_TOPICS = [
  // V24: 议论文 - 教育话题
  {
    id: 'ielts_t2_001',
    type: WRITING_TYPES.IELTS_TASK2,
    topic: TOPIC_CATEGORIES.EDUCATION,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 250, max: 300 },
    
    title: "University Education: Theoretical vs. Practical",
    
    questionType: "Discussion + Opinion",
    
    prompt: "Some people believe that universities should focus on providing academic knowledge and theoretical understanding. Others think that universities should focus on practical skills that help students in their future careers. Discuss both views and give your own opinion.",
    
    keyPoints: {
      view1: [
        "Deep understanding enables innovation and critical thinking",
        "Academic knowledge has lasting value beyond specific careers",
        "Theoretical foundations support adaptation to changing job markets"
      ],
      view2: [
        "Employers seek job-ready graduates",
        "Student debt requires better employment outcomes",
        "Practical skills address real-world problems"
      ],
      synthesis: [
        "Both are complementary, not opposing",
        "Balance varies by field of study",
        "Universities should integrate both approaches"
      ]
    },
    
    sampleResponse: `The purpose of university education has long been debated, with some advocating for theoretical academic focus while others emphasize practical career preparation. In my view, the most effective universities integrate both approaches, recognizing that deep understanding and applicable skills complement rather than contradict each other.

Those who favor academic knowledge argue that universities should prioritize intellectual development over vocational training. Theoretical understanding provides graduates with analytical frameworks that remain valuable even as specific job requirements change. A student who truly understands economic principles, for example, can adapt to various finance roles, while one trained only in current software may struggle when technology evolves. Furthermore, academic inquiry fosters the critical thinking and innovation that drive societal progress beyond mere job performance.

Conversely, proponents of practical education highlight the economic realities facing today's students. With rising tuition costs and increasing student debt, graduates need clear paths to employment. They argue that theoretical knowledge divorced from application may leave students unprepared for workplace demands. Employers frequently report that graduates lack essential skills like project management, communication, and technical competencies—gaps that practically oriented programs could address.

However, framing this as a binary choice misrepresents how learning actually works. The most effective professionals combine theoretical understanding with practical application. Medical schools blend anatomy lectures with clinical rotations; engineering programs pair physics with design projects. This integration produces graduates who can both perform current tasks and adapt to future challenges.

In conclusion, rather than choosing between academic and practical emphases, universities should thoughtfully integrate both. The specific balance may vary by field—a philosophy program will naturally be more theoretical than a nursing program—but the principle of combining understanding with application should guide curricular design across disciplines.`,
    
    vocabulary: ["vocational", "analytical frameworks", "critical thinking", "curricular", "integration"],
    
    scoringCriteria: {
      taskResponse: "Addresses both views with clear personal position",
      coherence: "Logical progression with clear paragraphing",
      lexicalResource: "Wide range of vocabulary appropriately used",
      grammar: "Complex sentences with flexibility and accuracy"
    }
  },
  
  // V25: 议论文 - 环境话题
  {
    id: 'ielts_t2_002',
    type: WRITING_TYPES.IELTS_TASK2,
    topic: TOPIC_CATEGORIES.ENVIRONMENT,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 2400,
    wordCount: { min: 250, max: 300 },
    
    title: "Individual vs. Government Environmental Responsibility",
    
    questionType: "Problem + Solution / To what extent",
    
    prompt: "Environmental problems are too big for individual countries or individual people to address. Instead, these problems should be dealt with at an international level. To what extent do you agree or disagree with this statement?",
    
    keyPoints: {
      agree: [
        "Global problems require coordinated responses (climate, oceans)",
        "Individual countries may free-ride on others' efforts",
        "Resources and expertise can be pooled internationally"
      ],
      disagree: [
        "Individual action creates cultural change and market signals",
        "National policies can be more responsive and enforceable",
        "Local environmental issues require local solutions"
      ]
    },
    
    sampleResponse: `Environmental challenges such as climate change and ocean pollution undoubtedly transcend national borders, leading some to argue that only international cooperation can address them effectively. While I agree that global coordination is essential for certain issues, I believe this statement oversimplifies the matter by dismissing the crucial roles of individuals and national governments.

International action is indeed necessary for truly global problems. Climate change results from collective emissions that no single country can reverse alone, and the atmosphere respects no borders. Similarly, marine plastic pollution requires international agreements since currents carry waste across oceans. The Paris Agreement and Montreal Protocol demonstrate that coordinated global action can achieve results impossible for isolated national efforts.

However, the claim that individual and national efforts are insufficient underestimates their importance. Individual choices—consuming less, recycling, choosing sustainable products—collectively shape markets and cultural norms. When millions of consumers demand eco-friendly options, industries respond. Moreover, individuals often influence policy by voting and activism, making personal engagement the foundation of political will for environmental action.

National governments also play irreplaceable roles. They can implement enforceable regulations, fund green infrastructure, and incentivize innovation through domestic policies. Furthermore, many environmental issues are inherently local: regional air quality, watershed management, and land conservation require locally tailored solutions that international bodies cannot provide.

The most effective approach combines all three levels. International agreements set frameworks and shared targets; national policies translate these into enforceable laws and investments; individual actions build cultural support and market demand. Rather than viewing these as alternatives, we should recognize their interdependence.

In conclusion, while international cooperation is essential for global environmental challenges, claiming that individuals and nations cannot contribute meaningfully is both inaccurate and counterproductive. All levels of action are necessary and mutually reinforcing.`,
    
    vocabulary: ["transcend", "coordination", "irreplaceable", "enforceable", "interdependence", "mutually reinforcing"],
    
    scoringCriteria: {
      taskResponse: "Clear position with nuanced agreement/disagreement",
      coherence: "Well-structured argument with clear progression",
      lexicalResource: "Sophisticated vocabulary accurately used",
      grammar: "Range of complex structures with high accuracy"
    }
  }
];

// 更新写作数据统计
writingData.topics.ielts_task1 = IELTS_TASK1_TOPICS;
writingData.topics.ielts_task2 = IELTS_TASK2_TOPICS;
writingData.stats.byType.ielts_task1 = IELTS_TASK1_TOPICS.length;
writingData.stats.byType.ielts_task2 = IELTS_TASK2_TOPICS.length;

console.log('✅ V21-V25 雅思写作题目添加完成');
console.log(`📊 IELTS Task 1: ${IELTS_TASK1_TOPICS.length} 道`);
console.log(`📝 IELTS Task 2: ${IELTS_TASK2_TOPICS.length} 道`);

// ==================== V26-V30: 考研与六级写作题目 ====================

// 考研英语作文
const KAOYAN_TOPICS = [
  // V26: 应用文 - 求职信
  {
    id: 'kaoyan_app_001',
    type: WRITING_TYPES.KAOYAN_APPLICATION,
    topic: TOPIC_CATEGORIES.BUSINESS,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 900, // 15分钟
    wordCount: { min: 100, max: 150 },
    
    title: "求职申请信",
    
    prompt: "Directions: You are a senior student who is looking for a job after graduation. Write a letter to a company to apply for a position. Your letter should include: 1) the position you are applying for, 2) your qualifications, 3) your hope for an interview.",
    
    format: {
      greeting: "Dear Sir or Madam,",
      body: "Three paragraphs covering the required points",
      closing: "Yours sincerely, Li Ming"
    },
    
    sampleResponse: `Dear Sir or Madam,

I am writing to apply for the Marketing Assistant position advertised on your company website. As a senior student majoring in Business Administration at Beijing University, I believe my academic background and practical experience make me an excellent candidate for this role.

During my university years, I have consistently achieved outstanding academic results while gaining valuable experience through internships. Last summer, I interned at ABC Company where I assisted with market research and social media campaigns. This experience enhanced my analytical abilities and communication skills. Additionally, I am proficient in Microsoft Office and have intermediate-level English proficiency.

I am confident that my enthusiasm for marketing, combined with my educational background and hands-on experience, would enable me to contribute effectively to your team. I would welcome the opportunity to discuss my qualifications in an interview at your earliest convenience.

Yours sincerely,
Li Ming`,
    
    keyElements: [
      "Clear statement of purpose",
      "Relevant qualifications and experience",
      "Polite request for interview",
      "Professional tone throughout"
    ],
    
    vocabulary: ["candidate", "proficient", "enhance", "analytical", "contribute effectively"]
  },
  
  // V27: 应用文 - 建议信
  {
    id: 'kaoyan_app_002',
    type: WRITING_TYPES.KAOYAN_APPLICATION,
    topic: TOPIC_CATEGORIES.EDUCATION,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 900,
    wordCount: { min: 100, max: 150 },
    
    title: "建议信",
    
    prompt: "Directions: Your university library needs improvement. Write a letter to the library director to make suggestions. Your letter should include: 1) the current problems, 2) your suggestions for improvement, 3) your expectations.",
    
    format: {
      greeting: "Dear Director,",
      body: "Three paragraphs as specified",
      closing: "Yours sincerely, Li Ming"
    },
    
    sampleResponse: `Dear Director,

I am writing to offer some suggestions regarding our university library. While the library provides valuable resources, there are areas that could be improved to better serve students' needs.

Currently, the most pressing issues are the limited study space during examination periods and the outdated computer facilities. Many students struggle to find seats, especially in the evenings. Additionally, the slow computers significantly reduce study efficiency. I would like to suggest extending library hours during exam seasons and upgrading the computer systems. Furthermore, creating more group study rooms would benefit collaborative learning.

I am confident that these improvements would greatly enhance our library's service quality and create a more conducive learning environment. I hope you will consider these suggestions seriously.

Yours sincerely,
Li Ming`,
    
    keyElements: [
      "Polite identification of problems",
      "Constructive suggestions",
      "Positive expectations",
      "Respectful tone"
    ]
  },
  
  // V28: 图画作文 - 社会现象
  {
    id: 'kaoyan_pic_001',
    type: WRITING_TYPES.KAOYAN_PICTURE,
    topic: TOPIC_CATEGORIES.SOCIETY,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 160, max: 200 },
    
    title: "手机依赖现象",
    
    pictureDescription: "A cartoon showing family members sitting together at a dinner table, but each person is looking at their smartphone instead of communicating with each other. The caption reads: 'Together yet apart'",
    
    prompt: "Write an essay based on the picture above. In your essay, you should: 1) describe the picture briefly, 2) interpret its meaning, 3) give your comments.",
    
    sampleResponse: `The cartoon vividly depicts a thought-provoking scene of a modern family gathering. Although the family members sit close together around a dinner table, each person is entirely absorbed in their own smartphone, paying no attention to those beside them. The caption "Together yet apart" precisely captures this ironic situation.

This image reflects a concerning phenomenon in contemporary society: the paradox of digital connection and physical disconnection. While smartphones have revolutionized communication by enabling us to connect with people worldwide, they have simultaneously created barriers in face-to-face interactions. Many people now prioritize virtual connections over real relationships, leading to emotional distance even among family members.

The implications of this trend are far-reaching. Family bonds, which require meaningful conversation and shared experiences, cannot be maintained through screen time alone. Children who grow up in such environments may develop inadequate social skills and emotional intelligence. Moreover, this behavior pattern often extends to friendships and professional relationships.

To address this issue, individuals should consciously set boundaries for device usage, particularly during family time. Parents must model healthy technology habits for their children. Only by restoring genuine human connection can we prevent technology from isolating us from those who matter most.`,
    
    structure: {
      paragraph1: "Picture description",
      paragraph2: "Meaning interpretation",
      paragraph3: "Social implications",
      paragraph4: "Comments and suggestions"
    },
    
    vocabulary: ["thought-provoking", "absorbed", "paradox", "revolutionized", "implications", "consciously"]
  }
];

// 六级英语作文
const ACADEMIC_WRITING_TOPICS = [
  // 学术论文写作 - 研究摘要
  {
    id: 'academic_001',
    type: WRITING_TYPES.ACADEMIC_ABSTRACT,
    topic: TOPIC_CATEGORIES.SCIENCE,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 200, max: 300 },
    
    title: "研究摘要写作 - 气候变化研究",
    
    prompt: "Write an abstract for a research paper that investigates the impact of urban green spaces on local temperature regulation. Your abstract should include: background, research objective, methodology, key findings, and conclusions.",
    
    outline: {
      background: "Context and importance of the research",
      objective: "Clear statement of research aims",
      methodology: "Brief description of methods used",
      results: "Key findings and data",
      conclusion: "Implications and significance"
    },
    
    sampleResponse: `This study investigates the thermal regulation effects of urban green spaces in metropolitan areas experiencing rapid urbanization. As cities worldwide face increasing heat island effects, understanding the cooling potential of vegetated areas has become crucial for sustainable urban planning.

Our research employed remote sensing analysis and ground-based temperature monitoring across 15 major metropolitan areas over a three-year period (2020-2023). We analyzed the correlation between green space coverage, vegetation density, and ambient temperature variations using multivariate regression models.

Results indicate that areas with more than 30% green space coverage exhibited average temperature reductions of 2.3°C during summer months compared to equivalent areas with minimal vegetation. Furthermore, the cooling effect extended up to 400 meters beyond green space boundaries, suggesting significant spillover benefits for adjacent urban zones. Tree canopy cover proved more effective than grass surfaces, with an additional 0.8°C reduction per 10% increase in canopy density.

These findings demonstrate that strategic green space integration can serve as a cost-effective climate adaptation strategy. Urban planners should prioritize increasing vegetated areas, particularly tree cover, to mitigate heat island effects and enhance urban livability. Future research should explore optimal spatial configurations for maximizing cooling benefits.`,
    
    vocabulary: ["thermal regulation", "urbanization", "remote sensing", "multivariate regression", "spillover benefits", "climate adaptation"]
  },
  
  // 学术论文写作 - 文献综述
  {
    id: 'academic_002',
    type: WRITING_TYPES.ACADEMIC_REVIEW,
    topic: TOPIC_CATEGORIES.TECHNOLOGY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 3000, // 50分钟
    wordCount: { min: 400, max: 600 },
    
    title: "文献综述 - 人工智能在医疗诊断中的应用",
    
    prompt: "Write a literature review section examining recent advances in AI-assisted medical diagnosis. Synthesize findings from multiple perspectives, identify research gaps, and suggest future research directions.",
    
    outline: {
      introduction: "Scope and significance of the review",
      thematic_analysis: "Major themes and findings in the literature",
      critical_evaluation: "Strengths and limitations of existing research",
      gaps: "Identified research gaps",
      future_directions: "Recommendations for future research"
    },
    
    sampleResponse: `The application of artificial intelligence in medical diagnosis has garnered substantial scholarly attention over the past decade, with researchers exploring diverse implementations ranging from image recognition to predictive analytics.

Early research in this domain focused primarily on radiology applications. Smith et al. (2018) demonstrated that convolutional neural networks could achieve 94% accuracy in detecting pulmonary nodules, surpassing average radiologist performance. Subsequent studies by Chen and colleagues (2019) extended these findings to dermatological applications, showing that deep learning models could identify melanoma with sensitivity comparable to board-certified dermatologists. These foundational studies established the viability of AI as a diagnostic support tool.

A parallel stream of research has examined AI applications in pathology. Thompson (2020) conducted a comprehensive review of 47 studies utilizing machine learning for histopathological analysis, finding mean accuracy improvements of 12% when AI was used as a second reader. However, Johnson et al. (2021) cautioned that many studies suffered from methodological limitations, including small sample sizes and lack of external validation, raising questions about generalizability.

More recent literature has shifted toward exploring hybrid human-AI diagnostic models. The landmark CLARITY study (Wilson, 2022) demonstrated that radiologist-AI collaboration outperformed either alone, achieving 97.3% accuracy in breast cancer detection. This collaborative paradigm has gained traction, with researchers increasingly emphasizing AI as augmentation rather than replacement.

Despite these advances, significant gaps persist in the literature. First, most studies focus on Western populations, raising concerns about algorithmic bias when applied to diverse demographic groups. Second, longitudinal studies examining real-world implementation challenges remain scarce. Third, the ethical implications of AI-assisted diagnosis, particularly regarding liability and patient consent, are underexplored.

Future research should prioritize diverse, multi-center trials with rigorous external validation protocols. Additionally, implementation science approaches are needed to understand factors affecting successful integration into clinical workflows. Addressing these gaps will be essential for translating promising research findings into meaningful clinical impact.`,
    
    vocabulary: ["convolutional neural networks", "histopathological analysis", "external validation", "algorithmic bias", "implementation science", "clinical workflows"]
  },
  
  // 学术论文写作 - 研究论文引言
  {
    id: 'academic_003',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.EDUCATION,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400,
    wordCount: { min: 300, max: 450 },
    
    title: "研究论文引言 - 在线学习效果研究",
    
    prompt: "Write an introduction section for a research paper investigating the effectiveness of online learning compared to traditional classroom instruction. Include background, problem statement, research questions, and significance of the study.",
    
    outline: {
      hook: "Engaging opening statement",
      background: "Context and existing knowledge",
      problem_statement: "Gap in knowledge or practical problem",
      purpose: "Research objectives and questions",
      significance: "Why this research matters"
    },
    
    sampleResponse: `The global pandemic of 2020-2021 precipitated an unprecedented shift in educational delivery, compelling institutions worldwide to transition rapidly from traditional classroom instruction to online learning platforms. While this transformation addressed immediate public health concerns, it simultaneously raised fundamental questions about the relative effectiveness of digital versus face-to-face educational modalities—questions that remain inadequately answered in the scholarly literature.

Prior research on online learning has produced mixed findings. Meta-analyses conducted by Means et al. (2013) suggested that blended learning approaches could produce superior learning outcomes compared to purely face-to-face instruction. However, these studies predominantly examined voluntary online learners who may possess higher self-regulation capabilities, limiting the generalizability of findings to broader student populations. More recent investigations during the pandemic period have revealed significant challenges, including decreased student engagement, increased achievement gaps among disadvantaged populations, and concerns about academic integrity.

The rapid, involuntary nature of recent online learning transitions provides a unique opportunity to examine effectiveness under naturalistic conditions, free from the self-selection biases that have plagued earlier research. Understanding these dynamics is crucial as educational institutions consider hybrid models for the post-pandemic era.

This study addresses the following research questions: (1) How do learning outcomes differ between students in online versus traditional classroom sections of the same courses? (2) What student characteristics moderate the effectiveness of online learning? (3) How do student engagement patterns differ across modalities?

The significance of this research extends beyond academic interest. As institutions invest substantially in educational technology infrastructure, evidence-based insights are essential for informed decision-making. Furthermore, understanding which students benefit most—and least—from online instruction can inform targeted support interventions. Finally, this research contributes to theoretical understanding of how learning environment characteristics interact with individual differences to shape educational outcomes.`,
    
    vocabulary: ["modalities", "meta-analyses", "self-regulation", "generalizability", "naturalistic conditions", "self-selection biases"]
  },
  
  // 学术论文写作 - 方法论部分
  {
    id: 'academic_004',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.PSYCHOLOGY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400,
    wordCount: { min: 300, max: 450 },
    
    title: "研究方法论 - 心理学实验设计",
    
    prompt: "Write a methodology section for a psychology research paper examining the effects of mindfulness meditation on academic stress and performance among university students. Include participants, materials, procedure, and data analysis plan.",
    
    outline: {
      participants: "Sample description and recruitment",
      materials: "Instruments and measures used",
      procedure: "Step-by-step experimental process",
      analysis: "Statistical methods and approach"
    },
    
    sampleResponse: `Participants

A total of 180 undergraduate students (mean age = 20.3 years, SD = 1.8; 58% female) were recruited from a large public university through the psychology department participant pool. Eligibility criteria included: (a) enrollment as a full-time student, (b) no prior formal meditation training, and (c) absence of diagnosed anxiety or mood disorders requiring medication. Participants received course credit for participation. Sample size was determined a priori using G*Power software, with parameters set to detect a medium effect size (d = 0.5) at α = .05 with 80% statistical power.

Materials

Academic stress was measured using the Academic Stress Scale (ASS; Lin & Chen, 2019), a 24-item instrument with established reliability (α = .89) and construct validity. Performance was assessed through cumulative GPA and scores on a standardized problem-solving task adapted from the Graduate Record Examination. The Mindful Attention Awareness Scale (MAAS; Brown & Ryan, 2003) served as a manipulation check. All questionnaires were administered electronically via Qualtrics.

Procedure

Following informed consent, participants completed baseline assessments during the first week of the semester. They were then randomly assigned to either the mindfulness intervention group (n = 90) or an active control group (n = 90) using a computer-generated randomization sequence with block sizes of six to ensure balanced allocation.

The intervention group participated in an 8-week mindfulness-based stress reduction program, comprising weekly 90-minute group sessions and daily 20-minute guided meditation practices delivered via a mobile application. The control group attended weekly 90-minute study skills workshops with equivalent time commitment. Both conditions were led by trained facilitators blind to research hypotheses.

Post-intervention assessments were administered during week 9, with follow-up measures collected at week 16 to assess sustained effects.

Data Analysis

Primary analyses employed 2 (condition) × 3 (time) mixed-design ANOVAs with Greenhouse-Geisser corrections for sphericity violations. Effect sizes were calculated using partial eta squared. Moderation analyses examined whether baseline stress levels influenced treatment response using PROCESS macro (Hayes, 2018). All analyses were conducted in SPSS version 28, with significance set at p < .05.`,
    
    vocabulary: ["eligibility criteria", "a priori", "manipulation check", "randomization sequence", "Greenhouse-Geisser corrections", "partial eta squared"]
  },
  
  // 学术讨论写作
  {
    id: 'academic_005',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.ENVIRONMENT,
    difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
    timeLimit: 2100, // 35分钟
    wordCount: { min: 250, max: 350 },
    
    title: "学术讨论 - 可持续发展与经济增长",
    
    prompt: "Write a discussion section analyzing whether sustainable development and economic growth can be compatible. Present multiple perspectives, evaluate evidence, and develop your own reasoned position.",
    
    outline: {
      overview: "Frame the debate",
      perspective1: "Economic growth priority argument",
      perspective2: "Environmental limits argument",
      synthesis: "Your integrated analysis",
      implications: "Practical considerations"
    },
    
    sampleResponse: `The relationship between sustainable development and economic growth has emerged as one of the most contested issues in contemporary policy discourse. While traditional economic paradigms have often positioned these goals as inherently conflicting, recent theoretical and empirical developments suggest a more nuanced reality.

Proponents of the "growth imperative" perspective argue that economic expansion is essential for generating the resources necessary to address environmental challenges. They point to the Environmental Kuznets Curve hypothesis, which posits that environmental degradation initially increases with economic development but eventually decreases as societies become wealthy enough to afford cleaner technologies and stricter regulations. Empirical support for this view comes from developed nations that have achieved both high living standards and declining emissions intensity.

Conversely, ecological economists challenge the assumption that growth can be indefinitely "decoupled" from environmental impact. Citing thermodynamic constraints and the rebound effect—whereby efficiency gains are offset by increased consumption—they argue that absolute decoupling remains elusive at the global scale. Jackson's (2009) influential analysis demonstrated that achieving carbon neutrality through technological progress alone would require implausible rates of efficiency improvement.

Synthesizing these perspectives, the evidence suggests that compatibility depends critically on the type and measurement of growth pursued. GDP-focused growth that ignores ecological boundaries is demonstrably unsustainable. However, qualitative development emphasizing well-being, equity, and resource efficiency may be compatible with—indeed, may require—intact ecological systems. The emerging concept of "green growth" attempts to operationalize this distinction.

For policy-makers, this analysis implies that the growth-sustainability trade-off is not inevitable but must be actively managed through strategic investments in clean technology, appropriate pricing of environmental externalities, and reformed measures of economic success that account for natural capital depreciation.`,
    
    vocabulary: ["Environmental Kuznets Curve", "emissions intensity", "decoupled", "rebound effect", "carbon neutrality", "natural capital depreciation"]
  },
  
  // ==================== 新增高级学术写作题目 ====================
  
  // 学术论文 - 研究背景与问题陈述
  {
    id: 'academic_008',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.HEALTH,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400,
    wordCount: { min: 350, max: 500 },
    
    title: "研究背景 - 公共卫生危机应对",
    
    prompt: "Write a background and problem statement section for a research paper examining the effectiveness of different public health communication strategies during disease outbreaks. Establish the research context, identify the gap in knowledge, and articulate the problem.",
    
    outline: {
      context: "Historical and current public health landscape",
      existing_knowledge: "What we know from prior research",
      gap: "What remains unknown or contested",
      problem: "Clear articulation of the research problem",
      rationale: "Why this problem matters"
    },
    
    sampleResponse: `Public health communication during disease outbreaks represents a critical determinant of population-level behavioral responses and, consequently, epidemiological outcomes. The COVID-19 pandemic dramatically illustrated how communication strategies can either facilitate or undermine public health objectives, with substantial variation observed across jurisdictions in message clarity, consistency, and public reception.

Historical analysis of outbreak communication reveals evolving paradigms. During the 2003 SARS outbreak, health authorities largely employed top-down, expert-driven messaging with limited attention to community engagement. The 2009 H1N1 influenza pandemic marked a shift toward more interactive communication, utilizing emerging social media platforms. However, Vaughan and Tinker's (2009) comprehensive review noted that communication strategies remained predominantly reactive rather than strategic, with insufficient attention to audience segmentation and message tailoring.

The scholarly literature on health communication has generated important insights regarding message framing, source credibility, and channel selection. Meta-analyses by Noar et al. (2016) demonstrate that gain-framed messages promoting preventive behaviors generally outperform loss-framed alternatives, though effect sizes vary considerably across contexts. Research on source effects indicates that trust in communicators significantly moderates message acceptance, with Siegrist and Zingg (2014) finding that perceived competence and benevolence independently predict behavioral compliance.

Despite this substantial knowledge base, critical gaps persist. First, most existing research derives from controlled experimental settings that may poorly approximate the complex, evolving information environments characteristic of actual outbreaks. Second, limited research examines how competing information sources—including misinformation—interact with official communications to shape public understanding. Third, the differential effectiveness of communication strategies across diverse populations remains inadequately characterized, raising concerns about health equity implications.

The current research problem centers on understanding which communication approaches most effectively promote protective behaviors during outbreak scenarios, and for whom. This question has acquired renewed urgency given the proliferation of digital information channels and the documented challenges of maintaining public trust amid prolonged health emergencies. Addressing this gap holds significant implications for pandemic preparedness planning and evidence-based public health practice.`,
    
    vocabulary: ["epidemiological outcomes", "audience segmentation", "message framing", "source credibility", "health equity", "pandemic preparedness"]
  },
  
  // 学术论文 - 理论框架
  {
    id: 'academic_009',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.PSYCHOLOGY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2700,
    wordCount: { min: 400, max: 550 },
    
    title: "理论框架 - 行为改变理论整合",
    
    prompt: "Write a theoretical framework section that integrates multiple behavior change theories to explain technology adoption among older adults. Justify your theoretical choices and explain how concepts interrelate.",
    
    outline: {
      overview: "Introduction to theoretical approach",
      theory1: "First major theory and its contribution",
      theory2: "Second theory and complementary insights",
      integration: "How theories work together",
      application: "Application to research context"
    },
    
    sampleResponse: `This study employs an integrated theoretical framework drawing upon the Technology Acceptance Model (TAM), Social Cognitive Theory (SCT), and the Unified Theory of Acceptance and Use of Technology (UTAUT) to explain the complex dynamics underlying technology adoption among older adults. While each theory offers valuable but partial explanations, their integration provides a more comprehensive lens for understanding adoption processes in this demographic.

The Technology Acceptance Model, originally proposed by Davis (1989), posits that perceived usefulness and perceived ease of use constitute the primary determinants of technology acceptance. Extensive empirical testing has validated TAM's predictive validity across diverse populations and technologies. However, TAM's parsimony comes at the cost of explanatory depth—it identifies what predicts adoption but provides limited insight into the mechanisms through which perceptions form and evolve. For older adults specifically, TAM fails to account for the unique barriers they face, including age-related cognitive and physical changes, generational differences in technology exposure, and distinctive motivational profiles.

Social Cognitive Theory addresses several of TAM's limitations by emphasizing the role of self-efficacy—the belief in one's capability to perform specific behaviors—as a critical mediating variable. Bandura's (1986) triadic reciprocal determinism framework suggests that behavior, personal factors, and environmental influences continuously interact to shape outcomes. Applied to technology adoption, SCT highlights how observational learning from peers, vicarious experiences, and verbal persuasion from trusted others can build or diminish confidence in using new technologies. For older adults, who may lack technology-proficient peer networks, SCT illuminates the importance of social support structures and modeling opportunities.

The Unified Theory of Acceptance and Use of Technology extends these perspectives by incorporating facilitating conditions and social influence as direct predictors of adoption behavior. UTAUT's recognition of moderating variables—age, gender, experience, and voluntariness—provides explicit theoretical grounding for examining how adoption processes vary across the older adult population, which itself exhibits substantial heterogeneity.

Our integrated framework synthesizes these perspectives as follows: perceived usefulness and ease of use (TAM) shape behavioral intentions, but these perceptions are themselves influenced by self-efficacy beliefs (SCT) developed through social learning processes. Facilitating conditions (UTAUT) both directly enable adoption behavior and indirectly influence self-efficacy through mastery experiences. Social influence (UTAUT) operates through SCT's observational learning mechanisms. This integration predicts that interventions targeting self-efficacy enhancement through supported practice opportunities, combined with structural facilitation and normative peer influence, will most effectively promote sustained technology adoption among older adults.`,
    
    vocabulary: ["Technology Acceptance Model", "self-efficacy", "triadic reciprocal determinism", "observational learning", "facilitating conditions", "behavioral intentions"]
  },
  
  // 学术论文 - 研究结果呈现
  {
    id: 'academic_010',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.BUSINESS,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400,
    wordCount: { min: 350, max: 500 },
    
    title: "研究结果 - 组织变革与员工绩效",
    
    prompt: "Write a results section for a quantitative study examining the relationship between organizational change communication and employee performance. Present statistical findings clearly with appropriate interpretation.",
    
    outline: {
      preliminary: "Descriptive statistics and assumptions",
      main_analysis: "Primary hypothesis testing",
      additional: "Supplementary analyses",
      summary: "Key findings overview"
    },
    
    sampleResponse: `This section presents the results of analyses examining the relationship between organizational change communication quality (OCCQ) and employee performance, including tests of hypothesized mediating and moderating effects.

Preliminary Analyses

Descriptive statistics and correlations among study variables are presented in Table 1. Mean OCCQ scores (M = 3.42, SD = 0.89) indicated moderate perceived communication quality, with substantial variation across organizational units (range: 2.18 to 4.67). Employee performance ratings (M = 3.78, SD = 0.74) were slightly above the scale midpoint. As expected, OCCQ correlated positively with performance (r = .41, p < .001), change readiness (r = .52, p < .001), and organizational trust (r = .58, p < .001). Variance inflation factors ranged from 1.24 to 2.31, indicating no multicollinearity concerns.

Primary Hypothesis Tests

Hypothesis 1 predicted that OCCQ would positively predict employee performance controlling for baseline performance and demographic variables. Hierarchical regression analysis supported this hypothesis. After accounting for control variables (Step 1: R² = .12, p < .001), OCCQ explained significant additional variance (ΔR² = .14, p < .001). The standardized coefficient (β = .38, p < .001) indicated that a one standard deviation increase in OCCQ was associated with a .38 standard deviation increase in performance.

Hypothesis 2 proposed that organizational trust would mediate the OCCQ-performance relationship. Bootstrap analysis (5,000 samples) revealed a significant indirect effect (ab = 0.21, 95% CI [0.14, 0.29]). The direct effect remained significant but was substantially reduced (c' = 0.19, p < .01), suggesting partial mediation. Trust accounted for approximately 52% of the total effect, indicating that enhanced organizational trust represents a key mechanism through which communication quality influences performance.

Hypothesis 3 tested whether employee tenure moderated the OCCQ-performance relationship. The interaction term was significant (β = -.12, p < .05). Simple slopes analysis revealed that OCCQ more strongly predicted performance among employees with shorter tenure (b = 0.48, p < .001) compared to longer-tenured employees (b = 0.28, p < .01), though effects were significant for both groups.

Supplementary Analyses

Exploratory analyses examined whether specific communication dimensions—clarity, frequency, and two-way dialogue—differentially predicted outcomes. Results indicated that clarity (β = .22, p < .001) and two-way dialogue (β = .19, p < .01) were significant predictors, while frequency alone was not (β = .06, p = .18), suggesting that communication quality rather than quantity drives performance effects.

Summary

Results supported all three hypotheses, demonstrating that organizational change communication quality significantly predicts employee performance, with organizational trust serving as a partial mediator and employee tenure moderating effect strength.`,
    
    vocabulary: ["hierarchical regression", "variance inflation factors", "bootstrap analysis", "indirect effect", "simple slopes analysis", "partial mediation"]
  },
  
  // 文献综述 - 跨学科研究
  {
    id: 'academic_011',
    type: WRITING_TYPES.ACADEMIC_REVIEW,
    topic: TOPIC_CATEGORIES.SCIENCE,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 3000,
    wordCount: { min: 450, max: 650 },
    
    title: "跨学科文献综述 - 神经科学与教育",
    
    prompt: "Write a literature review examining the intersection of neuroscience and educational practice. Critically evaluate claims about 'brain-based learning' and identify what neuroscience can legitimately contribute to education.",
    
    outline: {
      introduction: "The neuro-education movement",
      promises: "What neuroscience claims to offer education",
      critiques: "Scholarly criticisms and neuromyths",
      legitimate: "Valid contributions of neuroscience",
      integration: "Pathways for meaningful integration"
    },
    
    sampleResponse: `The past two decades have witnessed growing enthusiasm for applying neuroscientific findings to educational practice, generating a burgeoning "neuroeducation" movement. This review critically examines the literature at this intersection, evaluating both the promises and limitations of neuroscience-informed pedagogy.

The Appeal of Brain-Based Learning

The allure of neuroscience for educators is readily understandable. Advances in neuroimaging technologies have rendered brain activity visible in unprecedented ways, and the biological grounding of neuroscientific explanations lends them an aura of scientific authority. Proponents argue that understanding how the brain learns should logically inform how we teach. Commercial "brain-based learning" programs have proliferated, promising to optimize instruction based on neuroscientific principles.

Howard-Jones (2014) categorizes neuroscience applications in education into several domains: attention and memory enhancement, understanding developmental trajectories, identifying learning disabilities, and designing optimal learning environments. Each domain has generated substantial research activity and practical applications of varying quality.

The Problem of Neuromyths

Scholarly analysis has identified significant problems with how neuroscience is translated into educational practice. Dekker et al. (2012) surveyed teachers across multiple countries, finding that 49% endorsed neuromyths—false beliefs about the brain presented as scientific fact. The most prevalent myths included learning styles based on hemispheric dominance, the claim that we use only 10% of our brains, and critical periods that strictly constrain learning windows.

These misconceptions persist despite explicit debunking because they often contain a kernel of neuroscientific truth that becomes distorted through oversimplification. The "left brain/right brain" myth, for instance, reflects genuine hemispheric specialization but grossly overstates the degree of functional lateralization in normal cognition. Similarly, while neural plasticity exhibits age-related patterns, the notion of fixed critical periods for most learning is neurobiologically inaccurate.

Bruer's (1997) influential critique argued that neuroscience and education remain "a bridge too far" apart—the level of analysis appropriate for educational intervention (behavioral, cognitive) differs fundamentally from neuroscientific analysis (neural, molecular). Attempting to derive classroom practices directly from brain imaging studies involves problematic inferential leaps across explanatory levels.

Legitimate Contributions

Despite these critiques, neuroscience has made genuine contributions to educational understanding. Research on reading disabilities exemplifies productive integration. Neuroimaging studies have revealed that dyslexia involves atypical activation patterns in left temporoparietal regions during phonological processing, providing biological validation for phonics-based interventions that behavioral research had already supported. Importantly, neuroscience here complements rather than replaces cognitive and educational perspectives.

Understanding of memory consolidation processes has informed spacing and interleaving recommendations with legitimate neuroscientific grounding. The role of sleep in memory consolidation, emotional regulation in learning, and the neurobiological effects of chronic stress all represent areas where neuroscience offers educationally relevant insights.

Toward Meaningful Integration

For neuroscience to contribute productively to education, several conditions must be met. First, claims must be appropriately modest, recognizing that neuroscience typically explains why interventions work rather than prescribing what interventions to use. Second, educational implications should be derived through careful translation that acknowledges different levels of analysis. Third, practitioners need sufficient scientific literacy to evaluate neuroscience claims critically.

The most promising pathway involves collaborative research programs where neuroscientists and educators jointly design studies addressing educationally meaningful questions with neurobiologically informed methods. Such "use-inspired basic research" can generate knowledge that advances both scientific understanding and practical application.`,
    
    vocabulary: ["neuroimaging", "neuromyths", "hemispheric specialization", "neural plasticity", "phonological processing", "memory consolidation"]
  },
  
  // 学术论文 - 研究讨论部分
  {
    id: 'academic_012',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.ENVIRONMENT,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2700,
    wordCount: { min: 400, max: 550 },
    
    title: "研究讨论 - 可再生能源政策效果",
    
    prompt: "Write a discussion section for a study that examined the effectiveness of renewable energy subsidies across different national contexts. Interpret findings, compare with prior research, acknowledge limitations, and discuss implications.",
    
    outline: {
      interpretation: "What findings mean",
      comparison: "Relation to prior research",
      mechanisms: "Explanations for observed patterns",
      limitations: "Study constraints",
      implications: "Theoretical and practical significance"
    },
    
    sampleResponse: `This study examined the effectiveness of renewable energy subsidies across 28 OECD countries over a 15-year period, with particular attention to how institutional and economic contexts moderate policy impacts. The findings advance understanding of renewable energy transitions while highlighting the contingent nature of policy effectiveness.

Interpretation of Key Findings

Our results demonstrate substantial heterogeneity in subsidy effectiveness across national contexts. While the average effect of feed-in tariffs on renewable capacity additions was positive and significant (β = 0.34), this aggregate finding masks considerable variation. Countries with strong institutional quality indicators experienced effects roughly twice as large as those with weaker governance structures. This pattern suggests that policy design alone is insufficient—implementation capacity and regulatory credibility fundamentally shape outcomes.

The finding that subsidy effectiveness diminishes at higher renewable penetration levels carries important implications. The nonlinear relationship identified (with inflection points around 25% renewable share) indicates that policies effective during early-stage transitions may require modification as renewable portfolios mature. This trajectory aligns with theoretical expectations regarding grid integration challenges, diminishing returns to capacity expansion, and evolving political economy dynamics as incumbent interests adapt.

Comparison with Prior Research

These findings partially align with and partially extend existing literature. Consistent with Johnstone et al.'s (2010) cross-national analysis, we find that policy stability matters more than policy generosity—countries with frequent policy changes showed substantially lower effectiveness regardless of subsidy levels. However, our findings qualify the optimistic conclusions of studies that examined early-adopter countries in isolation. The strong results observed in Germany, Denmark, and Spain during their initial renewable buildouts do not straightforwardly generalize to later adopters facing different technological, economic, and political conditions.

The moderating role of institutional quality echoes findings from the broader policy implementation literature while specifying mechanisms relevant to energy transitions. Our results suggest that regulatory independence of energy authorities and judicial enforcement of contracts represent particularly important institutional dimensions, more so than generic governance indices.

Explaining Observed Patterns

Several mechanisms likely account for the institutional moderation effects. First, investor confidence in subsidy durability depends on credible commitment mechanisms that stronger institutions provide. Second, effective grid management and infrastructure planning require competent regulatory agencies. Third, opposition from incumbent energy interests may be more effectively managed within robust institutional frameworks.

The diminishing returns at higher penetration levels likely reflect multiple overlapping factors: grid integration costs that rise nonlinearly, political resistance that intensifies as transitions threaten established interests, and simple saturation of optimal deployment sites. Disentangling these mechanisms would require more granular data than our cross-national approach permits.

Limitations

Several limitations warrant acknowledgment. The observational design limits causal inference despite our use of fixed effects and instrumental variables; unobserved confounders may influence both policy adoption and outcomes. Our renewable energy measure aggregates diverse technologies (solar, wind, biomass) that respond differently to policy instruments. The focus on OECD countries limits generalizability to developing economy contexts where different dynamics may prevail.

Theoretical and Practical Implications

Theoretically, these findings underscore the importance of contingent policy analysis that moves beyond universal best-practice recommendations. Energy transition scholarship should more explicitly incorporate institutional political economy perspectives that recognize how context shapes policy effects.

For policymakers, our results suggest that renewable energy policy design should be calibrated to national institutional capacities. Countries with weaker governance structures might prioritize institution-building alongside subsidy implementation, or adopt policy designs that require less administrative capacity. Additionally, policy approaches should evolve as renewable portfolios mature, with different instruments appropriate at different transition stages.`,
    
    vocabulary: ["feed-in tariffs", "institutional quality", "regulatory credibility", "grid integration", "observational design", "instrumental variables"]
  },
  
  // 研究摘要 - 社会科学研究
  {
    id: 'academic_013',
    type: WRITING_TYPES.ACADEMIC_ABSTRACT,
    topic: TOPIC_CATEGORIES.SOCIETY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 1800,
    wordCount: { min: 250, max: 350 },
    
    title: "研究摘要 - 社会流动性与教育不平等",
    
    prompt: "Write an abstract for a sociological research paper examining intergenerational social mobility and the role of educational institutions in reproducing or reducing inequality.",
    
    outline: {
      background: "Social mobility context",
      objective: "Research aims",
      methods: "Data and analytical approach",
      findings: "Key results",
      conclusions: "Implications"
    },
    
    sampleResponse: `Intergenerational social mobility—the extent to which children's socioeconomic outcomes differ from their parents'—represents a fundamental indicator of societal openness and equality of opportunity. This study investigates whether educational institutions serve as "great equalizers" that promote mobility or as mechanisms of social reproduction that perpetuate inequality across generations.

Drawing upon longitudinal panel data tracking 12,847 individuals across three generations in the United States and United Kingdom (1970-2020), we employ intergenerational elasticity measures and structural equation modeling to examine how educational attainment mediates the relationship between parental socioeconomic status and children's adult outcomes. We disaggregate effects by educational sector (public versus private), institutional selectivity, and credential type to identify where mobility-enhancing or reproduction effects concentrate.

Results reveal a complex picture that challenges both strong mobility and strong reproduction narratives. Educational attainment significantly mediates intergenerational status transmission, accounting for approximately 40% of the parent-child socioeconomic correlation in both countries. However, the mediating role of education has weakened over the study period as credential inflation has increased educational requirements for equivalent occupational positions.

Critically, we find substantial heterogeneity across educational pathways. Elite higher education institutions exhibit strong reproduction effects—children from advantaged backgrounds who attend selective universities experience enhanced mobility relative to similarly-qualified peers at non-selective institutions, while disadvantaged students at elite institutions show more modest gains. Conversely, vocational education pathways demonstrate stronger equalizing effects, providing meaningful mobility channels for students from working-class backgrounds.

Cross-national comparison reveals that institutional structures matter: the UK's more stratified educational system produces greater reproduction effects than the US system, though neither country achieves the mobility levels that meritocratic ideals would predict.

These findings suggest that educational expansion alone is insufficient for enhancing mobility; attention must focus on reducing inequalities in access to high-return educational pathways and addressing non-educational factors that enable advantaged families to convert credentials into outcomes more effectively.`,
    
    vocabulary: ["intergenerational elasticity", "structural equation modeling", "credential inflation", "reproduction effects", "stratified educational system", "meritocratic ideals"]
  },
  
  // 学术论文 - 政策分析
  {
    id: 'academic_014',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.GOVERNMENT,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2700,
    wordCount: { min: 400, max: 550 },
    
    title: "政策分析 - 数据隐私监管框架比较",
    
    prompt: "Write a comparative policy analysis section examining different approaches to data privacy regulation (GDPR vs. US sectoral approach vs. China's framework). Evaluate strengths and weaknesses of each approach.",
    
    outline: {
      framework: "Analytical approach",
      gdpr: "European comprehensive model",
      us: "American sectoral approach",
      china: "Chinese state-centered model",
      evaluation: "Comparative assessment"
    },
    
    sampleResponse: `This analysis examines three distinct regulatory approaches to data privacy protection: the European Union's comprehensive General Data Protection Regulation (GDPR), the United States' sectoral patchwork system, and China's emerging state-centered framework. Using a comparative institutional analysis framework, we evaluate each approach across dimensions of individual protection, innovation effects, enforcement mechanisms, and international implications.

Analytical Framework

Effective data privacy regulation must balance multiple objectives that exist in tension: protecting individual autonomy and preventing harm, enabling beneficial data uses that drive innovation, maintaining regulatory coherence and enforceability, and functioning within broader geopolitical and economic contexts. No regulatory approach optimizes all dimensions simultaneously; each reflects distinctive normative priorities and institutional capabilities.

The European Model: GDPR

The GDPR, implemented in 2018, represents the most comprehensive data privacy regulatory framework globally. Its key features include: extraterritorial application to any organization processing EU residents' data; requirements for explicit consent for data collection; data subject rights including access, rectification, erasure ("right to be forgotten"), and portability; mandatory data protection impact assessments; and substantial penalties (up to 4% of global revenue).

The GDPR's strengths include regulatory clarity through unified rules, strong individual rights protections, and global influence as a de facto international standard. However, significant limitations have emerged. Compliance costs disproportionately burden small enterprises, potentially advantaging established incumbents. Consent mechanisms have generated "consent fatigue" without necessarily improving informed decision-making. Enforcement remains uneven across member states, with under-resourced data protection authorities struggling to address complaint backlogs.

The American Model: Sectoral Regulation

The United States lacks comprehensive federal privacy legislation, instead relying on sector-specific laws (HIPAA for health, COPPA for children, GLBA for finance) supplemented by Federal Trade Commission enforcement against "unfair and deceptive practices" and state-level initiatives, most notably California's CCPA.

This approach offers flexibility and accommodates sector-specific risk profiles. Innovation effects appear more positive than under GDPR—American technology companies have maintained competitive advantages partly attributable to lighter regulatory burdens. However, gaps between sectoral laws create protection inconsistencies, and enforcement depends heavily on FTC resources and priorities. The absence of baseline federal standards generates compliance complexity for businesses operating across jurisdictions while leaving many data practices unregulated.

The Chinese Model: State-Centered Framework

China's Personal Information Protection Law (PIPL), effective 2021, superficially resembles GDPR but operates within fundamentally different political-economic logic. While PIPL establishes consent requirements, data subject rights, and cross-border transfer restrictions, it explicitly exempts state surveillance activities and requires companies to assist government data requests.

This framework prioritizes state capacity alongside individual protection, reflecting authoritarian governance priorities. For individuals, PIPL provides meaningful protections against commercial data misuse while providing no safeguards against state monitoring. For foreign businesses, data localization requirements and vague national security provisions create substantial compliance uncertainty and potential vulnerability to political pressure.

Comparative Assessment

Each model embodies distinctive regulatory philosophies. The EU prioritizes individual rights as fundamental, accepting innovation costs. The US privileges market flexibility, accepting protection gaps. China instrumentalizes privacy protection within state capacity objectives. These differences reflect deeper variations in political values, institutional capacities, and economic structures that make simple "best practice" recommendations inappropriate.

International regulatory fragmentation creates challenges for global data flows and digital commerce. Emerging discussions around interoperability mechanisms (adequacy decisions, standard contractual clauses, certification schemes) represent attempts to manage this fragmentation, but fundamental normative divergences limit harmonization prospects. Organizations operating globally must navigate this complex landscape, often implementing the most restrictive applicable standard—typically GDPR—as a practical compliance strategy.`,
    
    vocabulary: ["extraterritorial application", "data portability", "sectoral regulation", "consent fatigue", "data localization", "regulatory fragmentation"]
  },
  
  // 文献综述 - 研究方法评估
  {
    id: 'academic_015',
    type: WRITING_TYPES.ACADEMIC_REVIEW,
    topic: TOPIC_CATEGORIES.SCIENCE,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2700,
    wordCount: { min: 400, max: 550 },
    
    title: "方法论综述 - 因果推断方法的演进",
    
    prompt: "Write a methodological literature review examining the evolution of causal inference methods in social science research. Compare experimental, quasi-experimental, and observational approaches.",
    
    outline: {
      evolution: "Historical development",
      experimental: "Randomized experiments",
      quasi: "Quasi-experimental designs",
      observational: "Observational methods",
      synthesis: "Integration and future directions"
    },
    
    sampleResponse: `The pursuit of causal knowledge represents a foundational aspiration of scientific inquiry. This review traces the evolution of causal inference methods in social science research, examining how methodological innovations have expanded researchers' capacity to draw credible causal conclusions from diverse data structures.

Historical Development

Causal inference methodology has undergone substantial transformation over the past century. Fisher's (1935) formalization of randomized experimentation established the "gold standard" for causal identification, demonstrating how random assignment eliminates confounding and enables unbiased treatment effect estimation. However, the recognition that many important social science questions preclude experimental manipulation—for ethical, practical, or fundamental reasons—motivated development of alternative approaches.

The Rubin Causal Model, elaborated through the 1970s and 1980s, provided a unified potential outcomes framework that clarified the fundamental problem of causal inference: for any individual, we can observe only one potential outcome (under treatment or control), rendering individual causal effects inherently unidentifiable. This formalization clarified that causal inference requires assumptions that substitute for missing counterfactual data, whether through randomization, design, or statistical modeling.

Randomized Controlled Trials

Randomized experiments remain the methodological benchmark for causal inference. Random assignment ensures that treatment and control groups are, in expectation, equivalent on all pre-treatment characteristics—both observed and unobserved—eliminating confounding by design. When experiments achieve adequate statistical power and avoid attrition and contamination threats, they provide highly credible causal estimates.

However, experimental limitations are well-documented. External validity concerns arise when experimental samples or settings poorly represent target populations. Ethical constraints prohibit randomizing many consequential treatments. Practical considerations often limit experimental duration, precluding examination of long-term effects. The rise of field experiments has addressed some concerns by conducting randomization in naturalistic settings, though selection into experimental participation remains a validity threat.

Quasi-Experimental Methods

The methodological innovations of greatest practical significance involve quasi-experimental designs that exploit natural variation for causal identification. Regression discontinuity designs leverage arbitrary thresholds in treatment assignment—such as test score cutoffs determining program eligibility—to compare observations just above and just below cutoffs where assignment is effectively random. Difference-in-differences approaches compare outcome changes between treated and untreated groups, with the "parallel trends" assumption substituting for random assignment.

Instrumental variables methods address confounding by identifying exogenous variation that affects treatment but influences outcomes only through treatment. The credibility revolution in economics has emphasized the importance of "natural experiments" providing plausibly exogenous instruments, though debates continue regarding what constitutes sufficient evidence of instrument validity.

Recent innovations include synthetic control methods for comparative case studies and regression kink designs that exploit discontinuities in treatment intensity rather than assignment. Each method involves characteristic assumptions whose plausibility must be evaluated contextually.

Observational Approaches

When quasi-experimental opportunities are unavailable, researchers employ statistical techniques to address confounding. Propensity score methods model treatment assignment probability and use these scores for matching, stratification, or weighting, intending to balance observed covariates between treatment groups. However, selection on unobservables remains a fundamental threat.

Sensitivity analysis approaches—including Rosenbaum bounds and the E-value framework—characterize how strong unobserved confounding would need to be to explain away observed effects, providing readers information to assess robustness. Newer machine learning methods for causal inference, including causal forests and double machine learning, offer improved flexibility in modeling complex confounding structures while maintaining valid inference.

Synthesis and Future Directions

The methodological landscape has evolved toward explicit acknowledgment of identifying assumptions and their testable implications. Contemporary best practice involves multiple analysis approaches—triangulating across methods with different assumptions to assess robustness. The integration of experimental and observational evidence through meta-analysis and replication studies further strengthens causal inference.

Future developments will likely involve greater use of machine learning for treatment effect heterogeneity, refined methods for dynamic treatment regimes, and continued attention to external validity—understanding not just whether effects exist but for whom and under what conditions they generalize.`,
    
    vocabulary: ["potential outcomes framework", "regression discontinuity", "difference-in-differences", "instrumental variables", "propensity score", "sensitivity analysis"]
  },
  
  // 学术论文 - 伦理考量
  {
    id: 'academic_016',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.TECHNOLOGY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400,
    wordCount: { min: 350, max: 500 },
    
    title: "伦理讨论 - 人工智能研究伦理",
    
    prompt: "Write an ethics section for a research paper that developed and tested an AI system for automated hiring decisions. Address fairness, transparency, accountability, and human oversight concerns.",
    
    outline: {
      framework: "Ethical principles guiding the research",
      fairness: "Bias and discrimination concerns",
      transparency: "Explainability issues",
      accountability: "Responsibility allocation",
      safeguards: "Protective measures implemented"
    },
    
    sampleResponse: `The development and deployment of AI systems for high-stakes decisions such as employment selection raises profound ethical concerns that require explicit acknowledgment and systematic address. This section examines the ethical dimensions of our research through the lens of established AI ethics principles: fairness, transparency, accountability, and human oversight.

Ethical Framework

Our research was guided by the IEEE Ethically Aligned Design principles and the European Commission's Ethics Guidelines for Trustworthy AI. These frameworks emphasize that AI systems should respect human autonomy, prevent harm, ensure fairness, and maintain explicability. We established an ethics advisory board comprising computer scientists, legal scholars, and civil society representatives who reviewed research design and implementation at key milestones.

Fairness and Non-Discrimination

AI hiring systems risk encoding and amplifying existing societal biases, potentially producing discriminatory outcomes at scale. Our approach addressed fairness through multiple mechanisms. First, we conducted extensive bias audits examining model performance across protected categories (gender, race, age, disability status) using both individual fairness and group fairness metrics. Where disparate impact was detected (adverse impact ratios below 0.8), we implemented algorithmic interventions including reweighting, adversarial debiasing, and post-processing calibration.

However, we acknowledge fundamental limitations. "Fairness" admits multiple, sometimes conflicting, mathematical definitions—equalizing false positive rates may conflict with equalizing false negative rates. Our choices among fairness criteria reflect value judgments that reasonable people might contest. Additionally, historical training data inevitably reflects historical inequities; while we can mitigate measured disparities, we cannot ensure the system is free from all discriminatory effects.

Transparency and Explainability

Black-box AI decision-making poses challenges for affected individuals' rights to explanation and for organizational accountability. Our system implements local interpretable explanations (LIME/SHAP values) that identify which features most influenced individual decisions. Candidates receive explanations for automated screening decisions, and human reviewers access feature importance information alongside model recommendations.

Yet transparency has limits. The underlying model involves complex feature interactions that simple explanations may not fully capture. There exists an inherent tension between model accuracy (which often benefits from complexity) and explainability. We prioritized explanations that are meaningful to non-technical audiences over complete technical disclosure, a choice that involves epistemic trade-offs.

Accountability and Responsibility

AI systems complicate traditional accountability structures by distributing decision-making across human developers, algorithmic processes, and deploying organizations. We address this through explicit responsibility allocation: the development team is accountable for model validity and bias mitigation; deploying organizations bear responsibility for appropriate use and human oversight; and we have established clear appeal mechanisms for candidates to contest automated decisions.

We maintain comprehensive audit logs documenting training data, model versions, and decision rationales to enable retrospective accountability. However, accountability remains challenging when harms emerge from complex system interactions rather than identifiable individual failures.

Human Oversight and Control

Given the limitations and risks of automated decision-making, we designed the system to augment rather than replace human judgment. Automated screening produces recommendations rather than final decisions; human recruiters review all recommendations before candidates are advanced or rejected. We implemented override capabilities allowing human reviewers to countermand algorithmic recommendations with documented justification.

We recognize that human oversight can become perfunctory if users develop automation bias—excessive trust in algorithmic recommendations. To mitigate this, we randomized whether recommendations were displayed before or after initial human review in a subset of cases, monitoring for systematic differences that would indicate overdependence on automation.

Despite these safeguards, we cannot guarantee that our system, if widely deployed, would improve upon existing hiring practices in all dimensions. The appropriate role of AI in high-stakes decisions remains contested, and our research should be understood as exploring possibilities rather than providing definitive solutions.`,
    
    vocabulary: ["disparate impact", "adversarial debiasing", "local interpretable explanations", "automation bias", "audit logs", "algorithmic accountability"]
  },
  
  // 研究摘要 - 交叉学科研究
  {
    id: 'academic_017',
    type: WRITING_TYPES.ACADEMIC_ABSTRACT,
    topic: TOPIC_CATEGORIES.HEALTH,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 1800,
    wordCount: { min: 250, max: 350 },
    
    title: "研究摘要 - 城市设计与公共健康",
    
    prompt: "Write an abstract for an interdisciplinary research paper examining how urban design features influence physical activity levels and mental health outcomes in city residents.",
    
    outline: {
      context: "Built environment and health nexus",
      purpose: "Study objectives",
      methods: "Research design",
      results: "Main findings",
      significance: "Implications"
    },
    
    sampleResponse: `The built environment shapes daily behaviors in ways that substantially influence population health outcomes. This interdisciplinary study examines how specific urban design features—walkability, green space access, mixed land use, and public transit availability—affect physical activity levels and mental health among urban residents, with attention to how effects vary across sociodemographic groups.

We conducted a cross-sectional study in three diverse metropolitan areas (N = 8,426 adults) combining objective environmental measures derived from geographic information systems with individual-level health data from surveys and accelerometer-measured physical activity. Multilevel regression models estimated associations between neighborhood-level design features and individual outcomes while accounting for residential self-selection through propensity score weighting.

Results revealed that walkability—operationalized as a composite of residential density, intersection density, and land use mix—demonstrated the strongest associations with physical activity. Residents of high-walkability neighborhoods accumulated 23 additional minutes of moderate-to-vigorous physical activity per week compared to low-walkability residents (95% CI: 17-29 minutes). Green space within 500 meters of residence was associated with both increased recreational activity and reduced depressive symptoms (β = -0.14, p < .001), with effects on mental health operating partially through social cohesion mechanisms.

Importantly, associations varied by socioeconomic status. Walkability effects on physical activity were substantially stronger among higher-income residents, potentially reflecting differences in time flexibility, safety perceptions, and destination quality. Conversely, green space mental health benefits were more pronounced among lower-income residents, suggesting parks may provide compensatory resources for populations with fewer private alternatives.

Mixed land use showed nuanced effects: commercial diversity supported walking for transportation but not recreational activity, while transit proximity increased overall mobility but was not independently associated with health outcomes after controlling for walkability.

These findings support health-promoting urban design investments while highlighting the importance of equity considerations. Design features that benefit population health on average may not equally serve all residents; targeted interventions addressing access barriers and neighborhood quality in disadvantaged areas are necessary to realize equitable health benefits from built environment improvements. Future longitudinal research should examine whether neighborhood changes produce corresponding health changes among existing residents.`,
    
    vocabulary: ["built environment", "walkability", "accelerometer-measured", "multilevel regression", "residential self-selection", "social cohesion"]
  },
  
  // 学术论文 - 研究局限与未来方向
  {
    id: 'academic_018',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.ECONOMY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2100,
    wordCount: { min: 300, max: 450 },
    
    title: "研究局限与未来方向 - 数字平台经济研究",
    
    prompt: "Write a limitations and future directions section for a study examining the economic impacts of gig economy platforms on labor markets and worker welfare.",
    
    outline: {
      limitations: "Study constraints",
      internal: "Internal validity concerns",
      external: "External validity concerns",
      future: "Research agenda",
      conclusion: "Closing thoughts"
    },
    
    sampleResponse: `While this study advances understanding of gig economy labor market effects, several limitations warrant acknowledgment and point toward productive directions for future research.

Study Limitations

First, our analysis relies primarily on administrative data from a single platform operating in the United States, limiting generalizability to other platforms, gig work modalities, and national contexts. Platform-specific effects may reflect idiosyncratic features of the studied company's algorithms, policies, and worker composition rather than gig economy dynamics broadly. Different platforms exhibit substantial variation in worker classification, compensation structures, and algorithmic management practices that may produce heterogeneous labor market effects.

Second, the observational design constrains causal inference despite our use of instrumental variables and difference-in-differences approaches. The instruments employed—geographic variation in smartphone adoption timing—may not satisfy exclusion restrictions if smartphone diffusion correlates with unobserved local economic conditions that independently affect labor outcomes. Sensitivity analyses suggest our main findings are robust to moderate violations of identifying assumptions, but we cannot rule out confounding by unobserved factors.

Third, our outcome measures, while comprehensive regarding earnings and hours, incompletely capture worker welfare. We lack direct measures of job satisfaction, work-related stress, skill development, or long-term career trajectories. The welfare implications of gig work likely involve trade-offs between flexibility benefits and security costs that our economic metrics do not fully represent.

Internal Validity Concerns

Selection into gig work is non-random and potentially endogenous to the outcomes we study. Workers may enter gig platforms precisely when traditional employment options deteriorate, conflating platform effects with broader labor market shocks. Our attempts to address selection through matching on observables cannot eliminate selection on unobservables. Ideal identification would involve random assignment to platform access, which is neither feasible nor ethical at scale.

Measurement error presents additional concerns. Earnings reported through the platform may not reflect total worker income if participants engage in multiple income sources simultaneously. Additionally, platform algorithm changes during our study period may have altered the treatment being measured in ways our time-fixed specifications cannot capture.

External Validity Considerations

Generalization beyond our study context faces multiple challenges. The US regulatory environment regarding worker classification, benefits mandates, and minimum wage laws differs substantially from other jurisdictions, likely moderating platform effects. Cultural differences in work orientation and social safety net variations affect how workers experience gig arrangements. Our findings may not extrapolate to contexts where gig work substitutes for informal rather than formal employment.

The platform economy continues evolving rapidly; findings from our 2018-2022 study period may not describe current or future dynamics. Regulatory changes, platform consolidation, and technological developments (including AI-driven automation) continuously reshape the landscape.

Future Research Directions

Several productive research directions emerge from these limitations. First, multi-platform and cross-national comparative studies could identify which findings generalize versus reflect context-specific factors. Collaborations with multiple platforms willing to share data would enable such research while addressing platform-specific confounds.

Second, prospective longitudinal designs following individuals before and after gig platform engagement could better address selection concerns while capturing longer-term career trajectory effects. Ideal designs would combine administrative records across employment types with survey measures of subjective welfare.

Third, experimental or quasi-experimental studies exploiting platform policy variations—such as algorithmic changes, compensation structure modifications, or benefits provision pilots—could provide cleaner causal identification of specific mechanism effects.

Finally, research integrating quantitative labor market analysis with qualitative investigation of worker experiences could provide richer understanding of how platform work is lived, moving beyond aggregate patterns to illuminate heterogeneous experiences and their determinants.`,
    
    vocabulary: ["gig economy", "exclusion restrictions", "difference-in-differences", "selection on unobservables", "external validity", "algorithmic management"]
  },
  
  // ==================== 新增多样题型学术写作 V31 ====================
  
  // 研究提案写作 (Research Proposal)
  {
    id: 'academic_019',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.SCIENCE,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 3000, // 50分钟
    wordCount: { min: 500, max: 700 },
    
    title: "研究提案 - 量子计算与药物发现",
    taskType: "Research Proposal",
    
    prompt: "Write a research proposal for a project investigating the application of quantum computing algorithms in accelerating drug discovery for neurodegenerative diseases. Include background, objectives, methodology, expected outcomes, and timeline.",
    
    outline: {
      background: "Research context and significance",
      objectives: "Specific aims and hypotheses",
      methodology: "Proposed methods and approach",
      outcomes: "Expected results and impact",
      timeline: "Project schedule and milestones"
    },
    
    sampleResponse: `Title: Quantum-Enhanced Molecular Simulation for Accelerated Neurodegenerative Drug Discovery

1. Background and Significance

Neurodegenerative diseases, including Alzheimer's and Parkinson's, affect over 50 million people globally, with prevalence projected to triple by 2050 as populations age. Despite decades of research, therapeutic options remain limited, with drug development hampered by the extraordinary complexity of protein-ligand interactions underlying neurodegeneration.

Classical computational approaches to drug discovery face fundamental limitations. Molecular dynamics simulations of protein folding and drug binding require exponential computational resources as system size increases, making accurate simulation of large biomolecular systems practically infeasible. Current approximation methods sacrifice accuracy for tractability, potentially missing promising drug candidates.

Quantum computing offers a paradigm shift for computational chemistry. Quantum systems can naturally represent molecular wavefunctions, enabling exponentially more efficient simulation of electronic structures through algorithms such as Variational Quantum Eigensolver (VQE) and Quantum Phase Estimation. Recent hardware advances—including IBM's 1000+ qubit processors and improved error correction—have brought practical quantum advantage within reach for chemistry applications.

This research proposes to develop and validate quantum computing approaches for simulating protein-drug interactions relevant to neurodegenerative disease targets, potentially accelerating the identification of promising therapeutic candidates.

2. Specific Aims and Hypotheses

Aim 1: Develop hybrid quantum-classical algorithms optimized for simulating amyloid-beta and alpha-synuclein binding interactions.
Hypothesis: Quantum algorithms can achieve chemical accuracy (< 1 kcal/mol error) for binding energy calculations at computational costs orders of magnitude lower than classical methods for systems exceeding 100 atoms.

Aim 2: Validate quantum simulation predictions through comparison with experimental binding data and high-level classical calculations for known drug candidates.
Hypothesis: Quantum-derived binding predictions will correlate more strongly with experimental IC50 values than predictions from standard docking software.

Aim 3: Apply validated quantum workflows to screen a virtual library of novel compounds, identifying candidates for experimental testing.
Hypothesis: Quantum-enhanced screening will identify at least three novel lead compounds with experimental binding affinity exceeding current drug candidates.

3. Research Methodology

3.1 Algorithm Development
We will extend VQE algorithms for larger molecular systems by implementing active space selection methods that identify chemically essential orbitals for quantum processing while treating peripheral electrons classically. Ansatz circuits will be optimized through machine learning-guided architecture search, balancing accuracy against noise sensitivity on near-term hardware.

3.2 Hardware Platform
Primary computations will utilize IBM Quantum systems accessed through the IBM Quantum Network, supplemented by IonQ trapped-ion systems for comparison. Error mitigation techniques including zero-noise extrapolation and probabilistic error cancellation will address hardware noise.

3.3 Validation Protocol
We will benchmark quantum results against gold-standard CCSD(T) calculations for small model systems (< 20 atoms) and against experimental binding data from published literature for larger protein-ligand systems. Statistical metrics including mean absolute error, correlation coefficients, and ranking accuracy will quantify performance.

3.4 Virtual Screening
A library of 10,000 compounds from the ZINC database, filtered for blood-brain barrier permeability and drug-likeness, will be screened against validated protein targets. Top candidates will be synthesized and tested in collaboration with medicinal chemistry partners.

4. Expected Outcomes and Impact

Primary Deliverables:
• Open-source quantum chemistry software package optimized for drug discovery applications
• Validated binding predictions for 50+ known compounds targeting amyloid-beta and alpha-synuclein
• 3-5 novel lead compound candidates with experimental validation
• Published benchmarking datasets enabling community method comparison

Scientific Impact:
This project will establish the practical utility of quantum computing for drug discovery, demonstrating computational advantages while identifying limitations requiring further hardware development. Methodological advances will transfer to other therapeutic areas and materials science applications.

Societal Impact:
Success could accelerate development of desperately needed neurodegenerative disease treatments, potentially reducing the 10-15 year drug development timeline and associated costs.

5. Timeline and Milestones

Year 1:
• Q1-Q2: Algorithm development and small-molecule benchmarking
• Q3-Q4: Protocol validation on model protein systems

Year 2:
• Q1-Q2: Full-scale protein-ligand simulations; comparison with experimental data
• Q3-Q4: Virtual screening; candidate selection for synthesis

Year 3:
• Q1-Q2: Experimental validation of lead compounds
• Q3-Q4: Publication, software release, and dissemination

6. Budget Justification (Summary)
Total: $1.2M over 3 years
Personnel (60%): PI, 2 postdoctoral researchers, 1 graduate student
Quantum Computing Access (25%): Cloud computing credits for IBM and IonQ systems
Experimental Validation (10%): Compound synthesis and binding assays
Travel/Publication (5%): Conference presentations and open-access publication fees`,
    
    vocabulary: ["Variational Quantum Eigensolver", "protein-ligand interactions", "active space selection", "error mitigation", "blood-brain barrier permeability", "CCSD(T) calculations"]
  },
  
  // 学术书评写作 (Academic Book Review)
  {
    id: 'academic_020',
    type: WRITING_TYPES.ACADEMIC_REVIEW,
    topic: TOPIC_CATEGORIES.SOCIETY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 400, max: 550 },
    
    title: "学术书评 - 社会学著作评析",
    taskType: "Academic Book Review",
    
    prompt: "Write an academic book review of a hypothetical new sociological work titled 'Digital Divides: Technology and Inequality in the Twenty-First Century' by Dr. Maria Chen. Summarize key arguments, evaluate methodology, assess contributions, and identify limitations.",
    
    outline: {
      summary: "Main arguments and structure",
      methodology: "Research approach evaluation",
      contributions: "Scholarly significance",
      critique: "Limitations and counterarguments",
      recommendation: "Overall assessment"
    },
    
    sampleResponse: `Book Review: Digital Divides: Technology and Inequality in the Twenty-First Century
By Maria Chen. Cambridge University Press, 2024. 342 pp. $34.95 (cloth).

In an era of unprecedented technological proliferation, Maria Chen's ambitious new work addresses a paradox of our digital age: even as technology becomes ever more ubiquitous, its benefits remain starkly unequally distributed. "Digital Divides" offers a comprehensive, empirically grounded analysis of how technological change intersects with and often amplifies existing social stratifications.

Summary of Arguments

Chen structures her analysis around three dimensions of digital inequality: access, skills, and outcomes. The access divide—traditionally conceived as the binary distinction between "haves" and "have-nots"—is reconceptualized as a graduated spectrum involving connection quality, device capabilities, and usage contexts. Drawing on survey data from 15 countries, Chen demonstrates that mobile-only internet users, disproportionately lower-income, experience functionally different internets than desktop or multi-device users, with implications for employment, education, and civic participation.

The skills dimension extends beyond operational competencies to encompass critical digital literacies—the ability to evaluate information credibility, navigate algorithmic systems strategically, and protect privacy. Chen's original contribution here lies in demonstrating how skill gaps compound over time: early advantages in critical literacy enable more sophisticated engagement, generating cumulative divergence that standardized digital literacy training cannot easily address.

Most provocatively, Chen argues that even controlling for access and skills, digital technologies generate systematically unequal outcomes. Platform algorithms, designed to maximize engagement and revenue, allocate attention and opportunity in ways that favor already-advantaged groups. Her analysis of algorithmic job matching platforms reveals that identical qualifications yield differential outcomes based on neighborhood proxies for race and class.

Methodological Evaluation

Chen's mixed-methods approach represents a notable strength. Quantitative analyses of large-scale survey data establish patterns at population scale, while ethnographic case studies in communities spanning San Francisco's Mission District to rural Kentucky illuminate mechanisms and lived experiences. This triangulation lends credibility to claims that neither method alone could substantiate.

However, the cross-sectional survey design limits causal inference. Chen acknowledges this limitation but perhaps underestimates its implications—the correlation between digital engagement patterns and life outcomes could reflect selection effects whereby pre-existing advantages enable sophisticated technology use rather than technology generating advantages.

Scholarly Contributions

"Digital Divides" makes several significant contributions. First, Chen's multidimensional framework advances beyond outdated binary conceptualizations, providing vocabulary and measures for more nuanced policy analysis. Second, the algorithmic inequality analysis extends critical algorithm studies beyond journalism to systematic social scientific investigation. Third, the comparative international scope reveals how national contexts—particularly educational systems and labor market structures—moderate technology's stratifying effects.

Limitations and Critique

Several limitations warrant note. Chen's focus on individual-level inequalities underattends structural and institutional dimensions; how organizations and governments adopt and deploy technology receives cursory treatment. Additionally, the algorithmic analysis, while compelling, relies heavily on audit methodologies whose generalizability remains uncertain. Finally, the rapid pace of technological change threatens relevance—some platforms analyzed have already modified practices in response to scrutiny.

Chen's normative stance, while clearly stated, would benefit from engagement with counterarguments. Techno-optimists might argue that mobile-first access, while inferior, still represents meaningful improvement over no access. Similarly, the skills analysis assumes particular literacy forms as valuable without fully interrogating whose knowledge counts as competence.

Recommendation

Despite these limitations, "Digital Divides" represents essential reading for scholars and practitioners concerned with technology and inequality. Chen's rigorous empiricism, conceptual sophistication, and accessible prose make this work valuable across disciplinary boundaries. For a field often characterized by anecdote and speculation, Chen's systematic approach provides a foundation for evidence-based policy discussion. Recommended for graduate courses in digital sociology, science and technology studies, and social policy.`,
    
    vocabulary: ["digital literacy", "algorithmic inequality", "cross-sectional design", "selection effects", "audit methodologies", "techno-optimists"]
  },
  
  // 案例分析写作 (Case Study Analysis)
  {
    id: 'academic_021',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.BUSINESS,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2700, // 45分钟
    wordCount: { min: 450, max: 600 },
    
    title: "案例分析 - 企业数字化转型",
    taskType: "Case Study Analysis",
    
    prompt: "Write a case study analysis examining the digital transformation journey of a traditional manufacturing company. Apply relevant theoretical frameworks, analyze key decisions, evaluate outcomes, and derive generalizable lessons.",
    
    outline: {
      introduction: "Case overview and significance",
      analysis: "Application of theoretical frameworks",
      decisions: "Critical decision points",
      outcomes: "Results and evaluation",
      lessons: "Generalizable insights"
    },
    
    sampleResponse: `Case Study Analysis: Digital Transformation at Precision Manufacturing Corp.

Executive Summary

This case analysis examines the five-year digital transformation journey of Precision Manufacturing Corp. (PMC), a mid-sized industrial equipment manufacturer that successfully transitioned from traditional operations to a digitally-enabled business model. Through systematic analysis applying established transformation frameworks, we identify critical success factors and derive lessons applicable to similar organizations navigating digital disruption.

Company Background

Founded in 1978, PMC manufactured precision tooling equipment for automotive and aerospace industries, generating $450 million in annual revenue with 2,200 employees across three facilities. By 2018, PMC faced mounting competitive pressure from digitally-native competitors offering smart, connected products with predictive maintenance capabilities. Customer expectations were shifting toward outcome-based purchasing models. PMC's legacy systems, siloed operations, and engineering-dominant culture presented significant transformation barriers.

Theoretical Framework

We analyze PMC's transformation through the lens of dynamic capabilities theory (Teece, 2007), which emphasizes sensing, seizing, and reconfiguring as key organizational capacities for adapting to changing environments. Additionally, we apply the ambidexterity framework (O'Reilly & Tushman, 2008) to examine how PMC balanced exploitation of existing competencies with exploration of new capabilities.

Sensing: Recognizing the Need for Change

PMC's transformation began when new CEO Sarah Martinez commissioned a competitive intelligence initiative in 2018. Market analysis revealed that digitally-enabled competitors were capturing market share by offering IoT-connected equipment with remote monitoring and predictive maintenance—capabilities PMC lacked entirely. Customer surveys indicated that 67% of major accounts were evaluating competitors specifically for digital capabilities. This systematic environmental scanning—rather than reactive crisis response—exemplifies effective sensing.

Critically, Martinez translated these external signals into internal urgency by communicating findings widely and establishing cross-functional task forces to develop response strategies. The sensing phase concluded with a board-approved digital transformation strategy identifying three priorities: smart product development, manufacturing digitization, and customer experience enhancement.

Seizing: Strategic Decisions and Resource Allocation

The transformation unfolded through several critical decision points:

Decision 1: Build vs. Buy Technology Capabilities
Rather than attempting to develop IoT platforms internally, PMC acquired Sensorix, a 35-person startup specializing in industrial sensing and analytics, for $28 million. This decision accelerated capability development by approximately two years while bringing digital-native talent into the organization. Integration challenges arose—cultural conflicts between startup and legacy workforces required sustained management attention—but the acquisition ultimately proved pivotal.

Decision 2: Organizational Structure for Transformation
PMC established a separate Digital Innovation unit reporting directly to the CEO, rather than embedding transformation within existing business units. This structural ambidexterity enabled exploration activities to proceed without being constrained by legacy operational metrics and cultural norms. However, PMC also established explicit integration mechanisms—joint project teams, shared performance metrics, and rotation programs—to ensure eventual capability transfer to core operations.

Decision 3: Phased vs. Big Bang Implementation
PMC adopted a staged implementation approach, piloting smart product capabilities with three willing customers before broad rollout. This deliberate experimentation enabled learning and adjustment while limiting risk exposure. The pilot phase identified critical software bugs and user experience issues that were addressed before scale deployment.

Resource Allocation
Total transformation investment reached $85 million over five years, representing approximately 19% of cumulative net income. This significant commitment demonstrated strategic seriousness while requiring careful financial management to maintain operational performance during the transition.

Reconfiguring: Operational Transformation

By 2023, PMC had fundamentally reconfigured its business model. Key outcomes included:

• Product Transformation: 78% of new product revenue now derives from smart, connected equipment, up from 0% in 2018.
• Service Revenue: Predictive maintenance contracts generated $62 million in recurring service revenue, improving customer retention by 23%.
• Operational Efficiency: Manufacturing digitization reduced production costs by 12% through predictive quality management and optimized scheduling.
• Customer Satisfaction: Net Promoter Score increased from 32 to 58 as customers valued outcome-focused relationships.

However, outcomes were not uniformly positive. Legacy product lines experienced accelerated decline as resources shifted to digital offerings. Some long-tenured employees—particularly in traditional engineering roles—departed, representing knowledge loss. Additionally, the $28 million acquisition was later assessed as overpriced given comparable deals in the sector.

Generalizable Lessons

Several lessons emerge from PMC's experience:

1. Leadership Commitment Is Necessary but Insufficient: CEO Martinez's vision and sustained attention were essential, but success required distributed leadership across functions. The CDO, CTO, and business unit leaders all played critical roles.

2. Ambidexterity Requires Explicit Design: Separating exploration from exploitation enabled innovation but created reintegration challenges. Organizations should plan for integration from the outset.

3. Acquisition Can Accelerate Capability Development: PMC's acquisition strategy proved effective, but integration demands significant management attention and cultural sensitivity.

4. Customer Co-creation Reduces Risk: Pilot implementations with engaged customers provided invaluable feedback while building advocates for new offerings.

5. Transformation Is Continuous: PMC's leaders emphasized that digital transformation is not a destination but an ongoing capability. The organizational capacities developed—sensing, experimentation, adaptation—represent enduring competitive assets.

Conclusion

PMC's transformation illustrates how established manufacturers can successfully navigate digital disruption through systematic application of dynamic capabilities and organizational ambidexterity. While context-specific factors inevitably limit direct transferability, the patterns identified here offer guidance for practitioners facing similar challenges.`,
    
    vocabulary: ["dynamic capabilities", "ambidexterity", "digital disruption", "IoT-connected", "structural separation", "customer co-creation"]
  },
  
  // 实验报告写作 (Lab Report / Experimental Paper)
  {
    id: 'academic_022',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.SCIENCE,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 400, max: 550 },
    
    title: "实验报告 - 材料科学研究",
    taskType: "Experimental Report",
    
    prompt: "Write a results and discussion section for an experimental study investigating the mechanical properties of a novel biodegradable polymer composite for medical implant applications. Present data clearly and interpret findings.",
    
    outline: {
      results: "Systematic data presentation",
      statistical: "Statistical analysis",
      interpretation: "Meaning of findings",
      comparison: "Relation to existing materials",
      implications: "Clinical significance"
    },
    
    sampleResponse: `Results and Discussion

Mechanical Characterization Results

Tensile testing of the novel PLA-hydroxyapatite nanocomposite (PLA-nHA) across varying nanoparticle concentrations (0%, 5%, 10%, 15%, 20% w/w) revealed significant composition-dependent mechanical behavior. Results for all test conditions (n = 6 per group) are summarized in Table 1.

Ultimate tensile strength (UTS) increased progressively with nHA content up to 15% (45.2 ± 2.1 MPa to 72.8 ± 3.4 MPa, p < 0.001, one-way ANOVA), representing a 61% improvement over neat PLA. However, further increasing nHA to 20% produced no additional strength gain (71.9 ± 4.2 MPa) and increased variability, likely reflecting nanoparticle agglomeration at higher concentrations as confirmed by SEM imaging (Figure 2).

Young's modulus exhibited similar compositional dependence. The 15% nHA composite achieved modulus of 4.2 ± 0.3 GPa, approaching cortical bone values (15-25 GPa) more closely than neat PLA (2.8 ± 0.2 GPa). This improved stiffness matching may reduce stress shielding effects in load-bearing implant applications.

Notably, elongation at break decreased monotonically with nHA content, from 8.2 ± 1.1% (neat PLA) to 3.4 ± 0.6% (20% nHA). This brittleness-strength tradeoff reflects the constraining effect of rigid ceramic inclusions on polymer chain mobility. The 15% composition represents a balanced compromise, maintaining 4.8 ± 0.7% elongation while maximizing strength.

Fatigue Testing Results

Cyclic loading tests at 60% UTS (corresponding to physiological loading magnitudes for orthopedic applications) revealed that the 15% PLA-nHA composite sustained 1.2 × 10⁶ cycles before failure, substantially exceeding the 0.4 × 10⁶ cycles achieved by neat PLA (p < 0.01). This three-fold improvement in fatigue life suggests that nHA reinforcement enhances long-term durability under cyclic physiological loads.

S-N curve analysis indicated that the fatigue endurance limit (stress level sustainable for > 10⁷ cycles) increased from approximately 35% UTS for neat PLA to 45% UTS for the 15% nHA composite. This elevated endurance limit provides additional safety margin for implant applications where load magnitudes may exceed design assumptions.

Biodegradation Kinetics

Accelerated degradation studies in phosphate-buffered saline (PBS, pH 7.4, 37°C) over 24 weeks revealed distinct degradation profiles. Mass loss rates fitted well to first-order kinetics (R² > 0.95 for all compositions). The degradation rate constant decreased with nHA content: k = 0.028 week⁻¹ for neat PLA versus k = 0.019 week⁻¹ for 15% nHA composite, corresponding to projected complete degradation times of approximately 18 versus 26 months respectively.

Importantly, mechanical property retention during degradation favored nHA-reinforced compositions. After 12 weeks, the 15% nHA composite retained 78% of initial UTS compared to only 52% for neat PLA. This extended mechanical integrity is clinically significant, as implants must maintain load-bearing capacity throughout the healing period.

pH monitoring of degradation media showed less acidic accumulation for nHA composites (minimum pH 6.8 versus 6.2 for neat PLA), attributed to buffering capacity of released hydroxyapatite dissolution products. This buffered degradation may reduce inflammatory responses associated with acidic PLA degradation products—a known limitation of PLA implants.

Interpretation and Comparison with Existing Materials

The observed property profile positions PLA-nHA composites favorably relative to existing biodegradable implant materials. Compared to pure PLA (approved for numerous medical devices), the 15% nHA composition offers superior strength, improved modulus matching to bone, enhanced fatigue resistance, and potentially reduced inflammatory responses during degradation.

Comparison with the current clinical standard for resorbable orthopedic fixation—70:30 poly(L-lactide-co-D,L-lactide) copolymers—reveals that PLA-nHA achieves comparable strength (72.8 vs. ~70 MPa) with substantially improved stiffness (4.2 vs. ~2.5 GPa). The closer mechanical match to bone may improve load transfer and reduce stress concentration at implant-bone interfaces.

The osteoconductive potential of hydroxyapatite represents an additional advantage not captured in mechanical testing. Previous in vitro studies with similar compositions have demonstrated enhanced osteoblast adhesion and proliferation on nHA-containing surfaces, suggesting the composite may actively promote bone integration rather than merely serving as passive space-holders.

Clinical Implications and Limitations

For load-bearing orthopedic applications such as interference screws or fracture fixation devices, the 15% PLA-nHA composite demonstrates mechanical properties adequate for initial fixation strength while providing extended mechanical integrity during the typical 3-6 month bone healing period. The gradual degradation profile allows progressive load transfer to healing bone, potentially reducing stress shielding concerns.

However, several limitations constrain clinical translation. First, mechanical properties, while improved, remain below those of metallic implants (titanium UTS ~900 MPa), limiting applications to lower-load anatomical sites. Second, our accelerated degradation conditions may not perfectly predict in vivo behavior, where enzymatic activity and dynamic loading affect degradation kinetics. Third, biocompatibility assessment through cell culture and animal studies is required before human application.`,
    
    vocabulary: ["ultimate tensile strength", "Young's modulus", "stress shielding", "fatigue endurance limit", "biodegradation kinetics", "osteoconductive"]
  },
  
  // 因果分析论文 (Causal Analysis Essay)
  {
    id: 'academic_023',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.SOCIETY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 400, max: 550 },
    
    title: "因果分析 - 社交媒体与青少年心理健康",
    taskType: "Causal Analysis Essay",
    
    prompt: "Write a causal analysis essay examining the relationship between social media use and adolescent mental health. Identify potential causal mechanisms, evaluate evidence quality, consider alternative explanations, and draw nuanced conclusions.",
    
    outline: {
      phenomenon: "Observed patterns",
      mechanisms: "Proposed causal pathways",
      evidence: "Research evidence evaluation",
      alternatives: "Competing explanations",
      synthesis: "Nuanced conclusions"
    },
    
    sampleResponse: `The Relationship Between Social Media Use and Adolescent Mental Health: A Causal Analysis

Introduction: The Observed Phenomenon

Rates of anxiety, depression, and psychological distress among adolescents have increased substantially since 2012—coinciding with widespread smartphone and social media adoption. In the United States, the proportion of teens reporting persistent feelings of sadness or hopelessness rose from 26% in 2009 to 44% in 2021, with particularly steep increases among girls. This temporal correlation has prompted intense speculation—and growing parental concern—that social media may be causally responsible for deteriorating adolescent mental health.

However, establishing causation from correlation presents formidable challenges. This essay systematically evaluates the evidence for causal relationships between social media use and adolescent mental wellbeing, identifying proposed mechanisms, assessing evidence quality, and considering alternative explanations.

Proposed Causal Mechanisms

Several theoretical pathways have been proposed through which social media might negatively impact adolescent mental health:

Social Comparison: Social media platforms expose users to curated, idealized presentations of peers' lives, potentially triggering unfavorable social comparisons. Festinger's social comparison theory predicts that such upward comparisons generate negative self-evaluations, particularly when comparison targets are perceived as similar. Adolescents, developmentally primed for peer comparison, may be especially vulnerable.

Sleep Displacement: Social media use, particularly before bedtime, may displace sleep or impair sleep quality through blue light exposure and arousal effects. Adolescents require 8-10 hours of sleep for optimal functioning; chronic sleep insufficiency is strongly associated with depression and anxiety.

Cyberbullying: Social media platforms enable peer harassment that follows victims beyond school hours, potentially intensifying victimization experiences. Unlike face-to-face bullying, cyberbullying can be anonymous, persistent, and publicly visible.

Displacement of Protective Activities: Time spent on social media may displace face-to-face social interaction, physical activity, and other activities with established mental health benefits.

Algorithmic Amplification: Platform algorithms optimized for engagement may preferentially surface emotionally provocative content, potentially creating "filter bubbles" of negative material for vulnerable users.

Evidence Evaluation

The evidence base for these mechanisms varies considerably in quality and consistency.

Correlational studies consistently find associations between social media use and poor mental health outcomes, but effect sizes are typically modest (r ≈ 0.10-0.15). Importantly, correlation cannot establish causation; the observed associations might reflect reverse causation (distressed adolescents turning to social media for coping) or confounding by third variables (e.g., family dysfunction affecting both social media use and mental health).

Longitudinal studies improve upon cross-sectional designs by examining temporal precedence. Findings are mixed: some studies find that social media use predicts subsequent mental health problems, others find no relationship after controlling for prior mental health, and some find bidirectional effects. A recent coordinated analysis across seven longitudinal datasets found small prospective effects that diminished after accounting for baseline symptoms.

Experimental studies provide stronger causal leverage. Randomized trials in which participants reduce or abstain from social media have generally found modest improvements in wellbeing, though effects are inconsistent and may reflect demand characteristics or withdrawal effects rather than genuine causal relationships. Notably, experimental abstinence studies cannot capture long-term developmental effects.

Natural experiments—such as the staggered rollout of Facebook across universities—offer additional causal evidence. Braghieri et al. (2022) found that Facebook introduction was associated with increased depression and anxiety symptoms among college students, with effects concentrated among more vulnerable students. However, the unique context of early Facebook adoption may limit generalizability.

Alternative Explanations

Several factors beyond social media may contribute to adolescent mental health trends:

Economic Insecurity: The 2008 financial crisis and subsequent economic instability affected family wellbeing during formative years for current adolescents.

Academic Pressure: College admission competitiveness has intensified, potentially elevating achievement anxiety.

Awareness and Reporting: Increased mental health awareness may have changed symptom recognition and reporting rather than actual prevalence.

Pandemic Effects: Recent data reflect COVID-19 disruptions that confound social media-specific effects.

Measurement Changes: Survey methodology modifications complicate trend interpretation.

Synthesized Conclusions

The evidence suggests that social media use likely has some causal influence on adolescent mental health, but the effect is probably smaller than public discourse implies, highly heterogeneous across individuals, and interacts with pre-existing vulnerabilities.

Several conclusions appear warranted:

First, social media is neither universally harmful nor universally benign. Effects depend on usage patterns, content exposure, and individual characteristics. Passive consumption and social comparison behaviors appear more problematic than active communication and support-seeking.

Second, vulnerable adolescents—those with pre-existing mental health challenges, body image concerns, or limited offline social support—appear most susceptible to negative effects. Universal interventions may be less efficient than targeted approaches for at-risk youth.

Third, platform design matters. Features that intensify social comparison (visible likes, follower counts, filtered images) may be more harmful than features supporting authentic connection.

Fourth, the moderate effect sizes observed should not be dismissed. At population scale, even small effects translate to meaningful numbers of affected individuals. However, moral panic and simplistic conclusions are equally unwarranted.

For policy and practice, this analysis suggests that measured responses—promoting digital literacy, supporting parental engagement, and encouraging platform design modifications—are more appropriate than extreme restrictions whose benefits remain uncertain and whose costs (social isolation, reduced information access) may be substantial.`,
    
    vocabulary: ["social comparison theory", "temporal precedence", "demand characteristics", "natural experiments", "heterogeneous effects", "confounding variables"]
  },
  
  // ==================== 新增多样题型学术写作 V32 ====================
  
  // 批判性分析写作 (Critical Analysis Essay)
  {
    id: 'academic_024',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.PHILOSOPHY,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2700, // 45分钟
    wordCount: { min: 450, max: 600 },
    
    title: "批判性分析 - 功利主义伦理学批评",
    taskType: "Critical Analysis Essay",
    
    prompt: "Write a critical analysis essay examining the strengths and weaknesses of utilitarian ethical theory. Engage with major objections, evaluate responses, and develop your own reasoned assessment.",
    
    outline: {
      exposition: "Clear statement of the theory",
      strengths: "Arguments in favor",
      objections: "Major criticisms",
      responses: "Defenses and counterarguments",
      assessment: "Your evaluated position"
    },
    
    sampleResponse: `A Critical Analysis of Utilitarian Ethics

Introduction

Utilitarianism, the ethical theory holding that actions are right insofar as they maximize aggregate well-being, has exerted profound influence on moral philosophy, public policy, and everyday ethical reasoning since its systematic articulation by Jeremy Bentham and John Stuart Mill. Its intuitive appeal—that we should act to produce the greatest good for the greatest number—has made it perhaps the most influential consequentialist framework. Yet utilitarianism has also attracted sustained philosophical criticism. This essay critically examines the theory's strengths and weaknesses, evaluates major objections and responses, and develops an assessed judgment of utilitarianism's adequacy as a comprehensive ethical theory.

Exposition of the Theory

Classical utilitarianism comprises several core commitments. First, consequentialism: the moral status of actions depends solely on their outcomes, not on intentions, motives, or adherence to rules independent of consequences. Second, welfarism: the relevant consequences are those affecting well-being or welfare. Third, aggregationism: the morally relevant outcome is the sum total of individual welfare, without privileging any particular person's interests. Fourth, maximization: among available actions, the right choice is that which produces the greatest aggregate welfare.

These commitments admit considerable variation. Hedonistic utilitarians identify welfare with pleasure and the absence of pain; preference utilitarians with satisfaction of preferences; objective list theorists with possession of objectively valuable goods. Act utilitarians apply the maximization principle directly to individual actions; rule utilitarians to general rules of conduct.

Strengths of Utilitarianism

Utilitarianism possesses several theoretical virtues. First, its impartiality: by counting everyone's welfare equally, utilitarianism embodies the moral insight that arbitrary distinctions—of race, nationality, or social position—should not determine whose interests matter. This egalitarian foundation has powered progressive moral arguments from abolitionism to animal welfare.

Second, utilitarianism provides determinate guidance. Where deontological theories may generate conflicting duties without decision procedures, utilitarianism offers a common metric—welfare—for comparing alternatives. This calculability makes utilitarian reasoning practically applicable to policy analysis, where trade-offs between competing goods are unavoidable.

Third, utilitarianism's focus on actual outcomes aligns with common moral intuitions that consequences matter. An ethics that condemned actions producing wonderful outcomes while approving those causing suffering would seem perverse. Utilitarianism captures this intuition systematically.

Major Objections

Despite these strengths, utilitarianism faces formidable objections.

The Demandingness Objection: If morality requires maximizing aggregate welfare, virtually any personal pursuit—enjoying a meal, spending time with family, pursuing hobbies—is morally impermissible when resources could instead relieve suffering elsewhere. This seems to make morality impossibly demanding, leaving no space for personal projects and relationships that give life meaning. Bernard Williams famously argued that utilitarianism alienates agents from their own commitments, destroying the integrity essential to meaningful agency.

The Justice Objection: Utilitarianism appears to permit—indeed require—grave injustices if they maximize aggregate welfare. A surgeon might be obligated to kill one healthy patient to harvest organs saving five others. Punishment of the innocent could be justified if it maximally deterred crime. These implications clash violently with deeply held moral convictions about individual rights and justice.

The Measurement Problem: Meaningful interpersonal welfare comparisons face formidable philosophical and practical obstacles. How can we compare the intensity of different persons' pleasures, or aggregate incommensurable values like health, knowledge, and relationships into a single welfare metric? Without such comparisons, the utilitarian calculus becomes indeterminate.

The Integrity Objection: Williams argued that utilitarianism fails to respect the separateness of persons, treating individuals merely as containers for welfare units rather than as distinct agents with their own projects and commitments. This reduces persons to mere locations where value might be produced or destroyed.

Utilitarian Responses

Sophisticated utilitarians have developed responses to these objections.

To demandingness, some argue that maximizing welfare in practice requires sustainable moral commitment; burning out through excessive sacrifice ultimately reduces welfare production. Rule utilitarianism accommodates personal prerogatives by noting that rules permitting personal pursuits likely maximize welfare compared to maximally demanding alternatives.

To justice objections, rule utilitarians argue that institutions protecting individual rights generally maximize long-term welfare; the organ-harvesting surgeon would undermine trust in medicine, producing net disutility. Even act utilitarians note that our intuitions about such cases may be unreliable guides, shaped by evolutionary and cultural factors poorly tracking actual welfare.

To measurement concerns, defenders argue that approximate comparisons suffice for practical guidance; we need not measure welfare precisely to judge that alleviating severe suffering matters more than satisfying trivial preferences. Preference utilitarianism sidesteps some measurement problems by respecting individuals' own valuations.

Critical Assessment

These responses, while partially successful, do not fully vindicate utilitarianism. The rule utilitarian response to justice objections succeeds only contingently—if circumstances arose where injustice truly maximized welfare, the theory would endorse it. The commitment to maximization that drives utilitarianism's determinacy also generates its most troubling implications.

More fundamentally, utilitarianism struggles to capture the moral significance of how welfare is distributed, not merely how much exists. A distribution concentrating all welfare in a few while others suffer seems morally inferior to a more equal distribution of the same total—yet aggregative utilitarianism cannot accommodate this intuition.

My assessed judgment is that utilitarianism captures important moral truths—that consequences matter, that suffering should be reduced, that all persons' interests count equally—while failing as a complete ethical theory. These insights are better incorporated within a pluralistic framework that also recognizes constraints on how individuals may be treated and prerogatives to pursue personal projects. Utilitarianism illuminates one important dimension of moral evaluation but cannot bear the weight of serving as our sole ethical criterion.`,
    
    vocabulary: ["consequentialism", "welfarism", "aggregationism", "demandingness objection", "separateness of persons", "rule utilitarianism"]
  },
  
  // 综合回应写作 (Synthesis Essay)
  {
    id: 'academic_025',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.EDUCATION,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 400, max: 550 },
    
    title: "综合写作 - 高等教育的目的",
    taskType: "Synthesis Essay",
    
    prompt: "Synthesize multiple perspectives on the purpose of higher education. Draw from at least three different viewpoints (economic, civic, personal development, etc.), identify areas of agreement and tension, and develop an integrated position.",
    
    outline: {
      introduction: "Frame the question",
      perspectives: "Present multiple viewpoints",
      analysis: "Areas of agreement and conflict",
      synthesis: "Integrated position",
      implications: "Practical consequences"
    },
    
    sampleResponse: `The Purpose of Higher Education: A Synthesis of Perspectives

Introduction

What is higher education for? This seemingly simple question has generated vastly different answers from economists, philosophers, civic leaders, and students themselves. As universities face mounting pressures—from rising costs and student debt to demands for demonstrable "return on investment"—clarity about educational purposes has become urgently practical. This essay synthesizes major perspectives on higher education's purpose, identifies tensions and convergences among them, and develops an integrated position that honors multiple legitimate aims.

The Economic Perspective

From an economic standpoint, higher education functions primarily as human capital development—the cultivation of knowledge and skills that enhance individual productivity and, in aggregate, drive economic growth. This view emphasizes vocational preparation: universities should equip graduates with competencies employers value, ensuring smooth labor market transitions and justifying educational investments through enhanced lifetime earnings.

Supporting this perspective, empirical research consistently finds substantial earnings premiums for college graduates—approximately $1 million in additional lifetime earnings compared to high school graduates in the United States. Economists like Claudia Goldin and Lawrence Katz have documented how educational attainment expansion drove twentieth-century economic growth.

Critics note that reducing education to economic training impoverishes our understanding of what universities can offer while pressuring curricula toward narrow vocationalism at the expense of broader intellectual development.

The Civic Perspective

Political theorists from Thomas Jefferson to contemporary scholars like Martha Nussbaum have emphasized higher education's role in cultivating democratic citizenship. On this view, universities should develop the critical thinking, historical understanding, and civic knowledge necessary for informed participation in self-governance.

Jefferson's vision of public education aimed to identify and cultivate "natural aristocracy"—individuals of talent who would lead democratic institutions. Contemporary advocates emphasize that democracy requires citizens capable of evaluating complex policy arguments, understanding diverse perspectives, and engaging constructively across differences.

This perspective supports broad general education requirements, including history, political science, and ethics, even when such courses lack obvious vocational application. The recent erosion of civic knowledge among young Americans—surveys reveal alarming ignorance of basic governmental structures—suggests this purpose remains urgent.

The Personal Development Perspective

Humanistic educators emphasize higher education as a transformative journey of personal growth and self-discovery. Cardinal Newman's classic "Idea of a University" articulated this vision: universities should cultivate the "philosophical habit of mind"—the capacity for integrated, critical thinking across domains—rather than merely transmitting specialized knowledge.

On this view, exposure to great works of literature, philosophy, and science expands students' horizons, challenges parochial assumptions, and develops capacities for reflection and meaning-making that enrich lives regardless of career outcomes. Education is intrinsically valuable, not merely instrumentally useful.

Critics worry this perspective is elitist—a luxury affordable only for the privileged—and insufficiently attentive to students' legitimate concerns about employability.

The Knowledge Creation Perspective

Universities are not merely teaching institutions but sites of research and knowledge creation. This perspective, associated with the Humboldtian research university model, emphasizes the unity of teaching and research: students learn not just established knowledge but how knowledge is produced, ideally participating themselves in scholarly inquiry.

This research mission generates discoveries with broad social benefits—from medical breakthroughs to technological innovations—while training the next generation of scholars and scientists. Graduate education and research-intensive undergraduate programs embody this purpose.

Tensions and Convergences

These perspectives generate genuine tensions. Economic and personal development views may conflict when liberal arts education lacks clear labor market returns. Civic and economic perspectives diverge when civic education competes with vocational training for curricular space. Research priorities may conflict with undergraduate teaching quality when faculty incentives emphasize publication over instruction.

Yet convergences also exist. Critical thinking—emphasized by humanistic and civic perspectives—also enhances economic productivity in knowledge economies requiring adaptable, analytical workers. Research and teaching can be complementary when students engage in inquiry alongside faculty. And all perspectives share commitment to developing human potential, differing primarily in which potentials they emphasize.

An Integrated Position

Rather than privileging one purpose, I argue universities should explicitly pursue multiple aims while acknowledging tensions among them. Higher education should prepare students for productive work without reducing education to job training; should cultivate civic capacities without imposing particular political views; should foster personal growth without ignoring economic realities facing graduates.

Achieving this integration requires institutional self-awareness about purposes and trade-offs. Curricula should combine depth in disciplinary or professional knowledge with breadth in general education. Teaching should connect specialized content to broader questions of meaning and application. Assessment should measure multiple dimensions of student development, not merely employment outcomes.

Most importantly, universities should resist external pressures to collapse multiple purposes into a single metric—whether graduation rates, starting salaries, or research rankings. The richness of higher education lies precisely in serving diverse legitimate aims, even when these exist in productive tension.`,
    
    vocabulary: ["human capital", "vocational preparation", "democratic citizenship", "philosophical habit of mind", "Humboldtian model", "general education"]
  },
  
  // 问题-解决方案论文 (Problem-Solution Essay)
  {
    id: 'academic_026',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.ENVIRONMENT,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 400, max: 550 },
    
    title: "问题-解决方案 - 海洋塑料污染",
    taskType: "Problem-Solution Essay",
    
    prompt: "Write a problem-solution essay addressing the crisis of ocean plastic pollution. Clearly define the problem, analyze causes, propose evidence-based solutions, and evaluate their feasibility.",
    
    outline: {
      problem: "Define and scope the issue",
      causes: "Root cause analysis",
      solutions: "Proposed interventions",
      evaluation: "Feasibility assessment",
      action: "Implementation priorities"
    },
    
    sampleResponse: `Addressing the Ocean Plastic Pollution Crisis: Problems and Solutions

The Problem Defined

Plastic pollution has emerged as one of the most visible and intractable environmental challenges of our era. An estimated 8 million metric tons of plastic enter the world's oceans annually—equivalent to dumping a garbage truck of plastic into the ocean every minute. At current trajectories, ocean plastic could outweigh fish by 2050.

This pollution takes multiple forms: visible debris accumulating in massive ocean gyres; microplastics—fragments smaller than 5mm—pervading marine ecosystems and food chains; and "ghost gear"—abandoned fishing equipment that continues capturing and killing marine life. Impacts include entanglement and ingestion affecting over 800 marine species, ecosystem disruption, economic damage to fisheries and tourism, and emerging concerns about microplastics entering human food supplies.

The problem's scope and persistence demand urgent attention. Unlike many pollutants that degrade over time, conventional plastics persist for centuries, meaning that today's pollution represents a legacy burden for generations.

Root Causes

Effective solutions require understanding why plastic enters oceans in the first place. Several interconnected factors drive the problem:

Production Growth: Global plastic production has increased exponentially—from 2 million tons in 1950 to over 400 million tons annually today—driven by plastic's versatility, durability, and low cost. This production growth has far outpaced waste management infrastructure development.

Linear Economic Model: The dominant "take-make-dispose" economic model treats plastics as single-use, disposable commodities rather than valuable materials warranting recovery and reuse. Only 9% of plastic ever produced has been recycled.

Inadequate Waste Management: In many developing nations experiencing rapid economic growth, waste collection and processing infrastructure remains underdeveloped. An estimated 80% of ocean plastic originates from land-based sources in countries with inadequate waste systems, particularly in Southeast Asia.

Export of Plastic Waste: Until recently, wealthy nations exported vast quantities of plastic waste to developing countries for "recycling"—much of which was actually dumped or burned due to insufficient processing capacity.

Product Design: Many products are designed without consideration for end-of-life management, incorporating materials that complicate recycling or embedding plastics in ways that prevent recovery.

Proposed Solutions

Addressing ocean plastic requires interventions across the plastics value chain:

1. Reduce Production of Virgin Plastic
The most effective intervention targets the problem at its source. Policies could include taxes on virgin plastic production, making recycled alternatives more cost-competitive; bans on demonstrably unnecessary single-use plastics (straws, bags, cutlery); and extended producer responsibility (EPR) schemes requiring manufacturers to finance end-of-life management. The European Union's Single-Use Plastics Directive exemplifies this approach.

2. Improve Waste Management Infrastructure
In high-leakage regions, investments in basic waste collection can dramatically reduce ocean inputs. The Ocean Conservancy estimates that improving waste management in just five Asian countries (China, Indonesia, Philippines, Thailand, Vietnam) could reduce ocean plastic by 45%. Financing mechanisms could include international climate funds, development assistance, and EPR revenues from global producers.

3. Promote Circular Economy Approaches
Redesigning products for recyclability, developing deposit-return systems for packaging, and creating markets for recycled materials can shift from linear to circular material flows. Chemical recycling technologies that break plastics into molecular building blocks offer potential for processing mixed plastics that mechanical recycling cannot handle.

4. Innovate Alternative Materials
Truly biodegradable plastics and bio-based alternatives could reduce persistence for applications where recycling is impractical. However, current "biodegradable" plastics often require industrial composting conditions absent in marine environments. Research investment should prioritize materials that genuinely degrade in natural conditions.

5. Remove Existing Pollution
While prevention should be prioritized, some removal of existing pollution is warranted. Intercepting plastic in rivers before ocean entry offers more efficiency than open-ocean cleanup. Technologies like boom systems and trash wheels have demonstrated effectiveness in concentrated pollution areas.

Feasibility Assessment

These solutions vary in feasibility. Production reduction faces industry resistance but has proven politically achievable in some jurisdictions. Waste infrastructure investment requires significant capital but generates co-benefits for public health and economic development. Circular economy transitions require coordination across complex value chains but align with emerging business opportunities. Material innovation shows promise but requires continued R&D investment before commercial viability.

Implementation Priorities

Given resource constraints, priorities should reflect both impact and feasibility. Short-term priorities include waste management infrastructure in high-leakage regions and eliminating demonstrably unnecessary single-use plastics. Medium-term priorities include comprehensive EPR systems and circular economy infrastructure. Long-term priorities include material innovation and legacy pollution remediation.

Success requires coordinated action across governmental, corporate, and civil society actors. The recently initiated UN Plastics Treaty negotiations offer an opportunity to establish binding international frameworks. However, policy leadership from major economies and corporate commitment to supply chain transformation will ultimately determine whether the tide of ocean plastic can be turned.`,
    
    vocabulary: ["microplastics", "ocean gyres", "extended producer responsibility", "circular economy", "chemical recycling", "single-use plastics"]
  },
  
  // 过程分析论文 (Process Analysis Essay)
  {
    id: 'academic_027',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.SCIENCE,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 400, max: 550 },
    
    title: "过程分析 - mRNA疫苗开发流程",
    taskType: "Process Analysis Essay",
    
    prompt: "Write a process analysis essay explaining how mRNA vaccines are developed and manufactured. Explain each stage clearly, discuss key challenges, and highlight innovations that enabled rapid COVID-19 vaccine development.",
    
    outline: {
      overview: "Process introduction",
      stages: "Sequential steps explained",
      challenges: "Technical obstacles",
      innovations: "Key breakthroughs",
      implications: "Future applications"
    },
    
    sampleResponse: `The Development and Manufacturing of mRNA Vaccines: A Process Analysis

Introduction

The unprecedented speed of COVID-19 mRNA vaccine development—from viral sequence publication to emergency authorization in under eleven months—represented a scientific achievement that transformed pandemic response while heralding a new era in vaccinology. Understanding how mRNA vaccines are designed, tested, and manufactured illuminates both the remarkable scientific advances that enabled this achievement and the processes that will shape future vaccine development.

Overview of mRNA Vaccine Technology

Traditional vaccines use weakened or inactivated pathogens, or protein subunits, to train immune systems. mRNA vaccines take a fundamentally different approach: rather than introducing antigens directly, they deliver genetic instructions that enable the body's own cells to produce target proteins, which then trigger immune responses. This approach offers significant advantages—rapid design iteration, no need to culture live pathogens, and potentially strong immune responses—but required decades of research to overcome formidable technical challenges.

Stage 1: Target Identification and Sequence Design

Vaccine development begins with identifying appropriate antigenic targets—proteins that will elicit protective immune responses. For SARS-CoV-2, researchers focused on the spike protein, which mediates viral entry into host cells and is accessible to neutralizing antibodies.

Once the target is selected, the mRNA sequence must be designed. This involves more than simply transcribing the protein-coding sequence. Key design decisions include:

Codon Optimization: Selecting synonymous codons preferred by human cellular machinery to maximize translation efficiency.

Nucleoside Modification: Incorporating modified nucleosides (such as pseudouridine or N1-methylpseudouridine) that reduce innate immune sensing of foreign RNA—a breakthrough by Katalin Karikó and Drew Weissman that was essential to mRNA vaccine viability.

Structural Elements: Designing 5' cap structures, untranslated regions (UTRs), and poly-A tails that enhance mRNA stability and translation.

For the COVID-19 spike protein, researchers introduced additional modifications—proline substitutions that lock the protein in prefusion conformation—enhancing immunogenicity.

Stage 2: mRNA Synthesis

The designed sequence is synthesized through in vitro transcription (IVT), an enzymatic process using DNA templates. Steps include:

Template Preparation: Producing linearized plasmid DNA containing the target sequence flanked by promoter elements.

Transcription Reaction: Using T7 RNA polymerase to synthesize mRNA from the DNA template, incorporating modified nucleotides as specified.

Capping: Adding 5' cap structures either co-transcriptionally or enzymatically post-transcription.

Purification: Removing DNA templates, enzymes, and truncated products through chromatographic methods. Highly pure mRNA is essential—contaminants can trigger unwanted immune responses or reduce efficacy.

Stage 3: Formulation with Lipid Nanoparticles

Naked mRNA is rapidly degraded and poorly taken up by cells. Encapsulation in lipid nanoparticles (LNPs) is critical for protecting mRNA and enabling cellular delivery. The formulation process involves:

Lipid Preparation: Dissolving ionizable lipids, structural lipids (cholesterol, phospholipids), and PEGylated lipids in ethanol. The ionizable lipid component—subject to extensive optimization and proprietary to each manufacturer—becomes positively charged at low pH to complex with negatively charged mRNA, then neutralizes at physiological pH.

Microfluidic Mixing: Rapidly combining aqueous mRNA solution with ethanolic lipid solution under controlled conditions. This self-assembly process produces uniform nanoparticles approximately 80-100nm in diameter.

Purification and Concentration: Removing ethanol and concentrating the product through tangential flow filtration.

Stage 4: Fill-Finish and Quality Control

The formulated vaccine undergoes aseptic filling into vials, a process requiring stringent contamination controls. Critical quality control tests include:

Identity Testing: Confirming mRNA sequence integrity through sequencing or hybridization assays.

Potency Assays: Measuring protein expression in cell-based systems.

Purity Analysis: Assessing RNA integrity, residual DNA, and endotoxin levels.

Particle Characterization: Confirming LNP size distribution and encapsulation efficiency.

Stability Testing: Evaluating product integrity under various storage conditions.

The ultra-cold storage requirements for some mRNA vaccines (-70°C for Pfizer-BioNTech initially) reflect mRNA's inherent instability—a challenge addressed through formulation optimization, with newer products stable at standard refrigeration temperatures.

Stage 5: Clinical Development

Parallel to manufacturing scale-up, clinical trials proceed through phases:

Phase 1: Safety assessment and dose-finding in small groups (tens of participants).

Phase 2: Expanded safety and immunogenicity evaluation (hundreds of participants).

Phase 3: Large-scale efficacy trials (tens of thousands) comparing vaccinated and placebo groups for infection rates.

The COVID-19 vaccines compressed these timelines through overlapping phases, at-risk manufacturing investments, and rolling regulatory submissions—innovations in process rather than cutting corners on safety assessment.

Key Innovations Enabling Rapid Development

Several factors enabled unprecedented development speed:

Platform Technology: Years of prior mRNA vaccine research meant foundational technologies existed; only target sequence design was COVID-specific.

Modified Nucleosides: The Karikó-Weissman discovery, recognized with the 2023 Nobel Prize, solved the critical immunogenicity problem.

Lipid Nanoparticle Advances: Decades of LNP development for siRNA therapeutics provided delivery solutions.

Regulatory Innovation: Expedited review pathways and continuous data submission accelerated authorization.

Investment: Massive government funding removed financial risk barriers to parallel processing.

Future Implications

mRNA technology's demonstrated success opens extensive applications: personalized cancer vaccines, universal influenza vaccines, and treatments for genetic diseases. Manufacturing platforms established for COVID-19 provide infrastructure for rapid responses to future pandemic threats. The mRNA revolution, born of decades of persistent research, has permanently transformed vaccine science.`,
    
    vocabulary: ["in vitro transcription", "lipid nanoparticles", "codon optimization", "nucleoside modification", "immunogenicity", "prefusion conformation"]
  },
  
  // 比较对比论文 (Compare-Contrast Essay)
  {
    id: 'academic_028',
    type: WRITING_TYPES.ACADEMIC_PAPER,
    topic: TOPIC_CATEGORIES.GOVERNMENT,
    difficulty: DIFFICULTY_LEVELS.ADVANCED,
    timeLimit: 2400, // 40分钟
    wordCount: { min: 400, max: 550 },
    
    title: "比较对比 - 民主治理模式比较",
    taskType: "Compare-Contrast Essay",
    
    prompt: "Write a compare-contrast essay analyzing presidential and parliamentary systems of democratic governance. Compare their structures, examine their strengths and weaknesses, and evaluate which system better promotes democratic accountability and effective governance.",
    
    outline: {
      introduction: "Framework for comparison",
      similarities: "Common democratic elements",
      differences: "Structural distinctions",
      evaluation: "Comparative assessment",
      conclusion: "Reasoned judgment"
    },
    
    sampleResponse: `Presidential vs. Parliamentary Democracy: A Comparative Analysis

Introduction

Democratic governance takes varied institutional forms, with presidential and parliamentary systems representing two dominant models. The United States exemplifies presidentialism, with separately elected executive and legislative branches; the United Kingdom typifies parliamentarism, where executive authority derives from legislative confidence. These structural differences carry profound implications for accountability, representation, and governmental effectiveness. This essay systematically compares these systems, evaluating their respective strengths and limitations.

Common Democratic Foundations

Before examining differences, noting shared commitments is important. Both systems embrace fundamental democratic principles: popular sovereignty expressed through elections, constitutional constraints on governmental power, protection of individual rights, and rule of law. Both accommodate multi-party competition, though different structures create different party system incentives. Both have proven capable of sustaining stable democracy over extended periods.

These commonalities suggest that democratic quality depends less on institutional form than on deeper factors—political culture, civic engagement, institutional integrity—that determine how formal structures function in practice.

Structural Differences

Executive Selection and Accountability
The defining distinction concerns executive-legislative relationships. In presidential systems, the executive (president) is independently elected for a fixed term, creating separate mandates for executive and legislative branches. In parliamentary systems, the executive (prime minister and cabinet) emerges from the legislature, serving at legislative pleasure.

This structural difference generates cascading consequences. Presidential executives cannot be removed except through extraordinary procedures (impeachment), while parliamentary executives face continuous accountability through confidence votes. Parliamentary systems thus provide more immediate mechanisms for replacing failed leadership, while presidential systems offer stability against legislative mood swings.

Separation vs. Fusion of Powers
Presidential systems embody separation of powers—distinct branches exercising executive, legislative, and judicial functions with mutual checks. Parliamentary systems fuse executive and legislative powers, with cabinets drawn from and accountable to parliament.

This affects policy-making dynamics. Presidential systems create potential for gridlock when different parties control executive and legislative branches—"divided government" blocking policy action. Parliamentary systems concentrate power, enabling decisive government action when majorities are cohesive, but risking insufficient checks on executive authority.

Electoral Representation
Parliamentary systems typically use proportional representation, producing multi-party legislatures that reflect diverse voter preferences but often requiring coalition governments. Presidential systems more commonly use winner-take-all elections that advantage two-party competition, simplifying voter choices but potentially excluding minority viewpoints.

Comparative Advantages

Presidential System Strengths:
Direct executive election provides clear voter choice for national leadership, enhancing democratic accountability. Fixed terms provide stability and policy continuity. Separation of powers creates robust checks against executive overreach—the judiciary and legislature can constrain presidential action. The system may be better suited to diverse, federal states where regional representation in the legislature is paramount.

Presidential System Weaknesses:
Divided government can produce policy paralysis, with presidents and legislatures blaming each other for inaction. Fixed terms make removing failed presidents difficult—Nixon's prolonged resistance to resignation illustrates the challenge. Dual democratic legitimacy claims (both branches elected) can generate constitutional crises when branches conflict without resolution mechanisms.

Parliamentary System Strengths:
Executive accountability is continuous—governments must maintain legislative confidence, and failed leadership can be replaced swiftly. Fusion of powers enables coherent policy implementation when governments command majorities. Coalition requirements can moderate extreme positions and incorporate diverse viewpoints. The system provides clearer responsibility attribution, as governing parties cannot blame separate institutions for policy failures.

Parliamentary System Weaknesses:
Government instability can result when fragmented legislatures cannot sustain coalitions—Italy's frequent government turnover exemplifies this risk. Concentrated power raises concerns about executive dominance of weak legislatures, particularly with strong majorities. Prime ministerial accountability may be diffused through collective cabinet responsibility.

Empirical Evidence

Comparative political science offers mixed empirical guidance. Juan Linz's influential analysis argued presidentialism's inherent instability contributed to democratic breakdown in Latin America. However, subsequent research (e.g., Cheibub 2007) suggests that presidential democracy's poor track record reflects context—presidents were adopted in regions with challenging conditions for democracy—rather than institutional design per se.

Measures of democratic quality, governance effectiveness, and citizen satisfaction show variation within each system type at least as large as between them, suggesting that institutional form matters less than how institutions are implemented.

Evaluated Conclusion

Neither system is inherently superior; each embodies different trade-offs between competing democratic values. Presidential systems prioritize checks and balances, executive stability, and direct popular mandate. Parliamentary systems prioritize accountability, governmental coherence, and adaptive responsiveness.

Optimal institutional choice depends on context: presidential systems may better suit divided societies requiring strong executive coordination; parliamentary systems may better serve homogeneous societies valuing responsive government. Most importantly, both systems can sustain healthy democracy when supported by robust democratic culture, independent judiciary, free press, and engaged citizenry. Institutional design matters, but it is one factor among many determining democratic flourishing.`,
    
    vocabulary: ["separation of powers", "confidence votes", "divided government", "proportional representation", "coalition government", "democratic accountability"]
  }
];

// 更新写作数据统计
writingData.topics.kaoyan = KAOYAN_TOPICS;
writingData.topics.academic = ACADEMIC_WRITING_TOPICS;
writingData.stats.byType.kaoyan = KAOYAN_TOPICS.length;
writingData.stats.byType.academic = ACADEMIC_WRITING_TOPICS.length;

// 更新总计
writingData.stats.totalTopics = 
  TOEFL_INTEGRATED_TOPICS.length + 
  TOEFL_DISCUSSION_TOPICS.length +
  GRE_ISSUE_TOPICS.length +
  GRE_ARGUMENT_TOPICS.length +
  IELTS_TASK1_TOPICS.length +
  IELTS_TASK2_TOPICS.length +
  KAOYAN_TOPICS.length +
  ACADEMIC_WRITING_TOPICS.length;

console.log('✅ V26-V30 考研&学术写作题目添加完成');
console.log(`📚 考研作文: ${KAOYAN_TOPICS.length} 道`);
console.log(`📖 学术写作: ${ACADEMIC_WRITING_TOPICS.length} 道`);
console.log('');
console.log('====== 写作模块数据汇总 ======');
console.log(`📊 总题目数: ${writingData.stats.totalTopics} 道`);
console.log('题型分布:');
console.log(`  - TOEFL综合写作: ${TOEFL_INTEGRATED_TOPICS.length}`);
console.log(`  - TOEFL学术讨论: ${TOEFL_DISCUSSION_TOPICS.length}`);
console.log(`  - GRE Issue: ${GRE_ISSUE_TOPICS.length}`);
console.log(`  - GRE Argument: ${GRE_ARGUMENT_TOPICS.length}`);
console.log(`  - IELTS Task 1: ${IELTS_TASK1_TOPICS.length}`);
console.log(`  - IELTS Task 2: ${IELTS_TASK2_TOPICS.length}`);
console.log(`  - 考研作文: ${KAOYAN_TOPICS.length}`);
console.log(`  - 学术写作: ${ACADEMIC_WRITING_TOPICS.length}`);

// 额外的辅助函数

// 按考试类型获取所有题目
function getTopicsByExam(examType) {
  switch(examType.toLowerCase()) {
    case 'toefl':
      return [...TOEFL_INTEGRATED_TOPICS, ...TOEFL_DISCUSSION_TOPICS];
    case 'gre':
      return [...GRE_ISSUE_TOPICS, ...GRE_ARGUMENT_TOPICS];
    case 'ielts':
      return [...IELTS_TASK1_TOPICS, ...IELTS_TASK2_TOPICS];
    case 'kaoyan':
      return KAOYAN_TOPICS;
    case 'academic':
      return ACADEMIC_WRITING_TOPICS;
    default:
      return [];
  }
}

// 按话题分类获取题目
function getTopicsByCategory(category) {
  const allTopics = [
    ...TOEFL_INTEGRATED_TOPICS,
    ...TOEFL_DISCUSSION_TOPICS,
    ...GRE_ISSUE_TOPICS,
    ...GRE_ARGUMENT_TOPICS,
    ...IELTS_TASK1_TOPICS,
    ...IELTS_TASK2_TOPICS,
    ...KAOYAN_TOPICS,
    ...ACADEMIC_WRITING_TOPICS
  ];
  return allTopics.filter(t => t.topic === category);
}

// 按难度获取题目
function getTopicsByDifficulty(difficulty) {
  const allTopics = [
    ...TOEFL_INTEGRATED_TOPICS,
    ...TOEFL_DISCUSSION_TOPICS,
    ...GRE_ISSUE_TOPICS,
    ...GRE_ARGUMENT_TOPICS,
    ...IELTS_TASK1_TOPICS,
    ...IELTS_TASK2_TOPICS,
    ...KAOYAN_TOPICS,
    ...ACADEMIC_WRITING_TOPICS
  ];
  return allTopics.filter(t => t.difficulty === difficulty);
}

// 获取随机题目（支持过滤）
function getRandomTopic(filters = {}) {
  let pool = [
    ...TOEFL_INTEGRATED_TOPICS,
    ...TOEFL_DISCUSSION_TOPICS,
    ...GRE_ISSUE_TOPICS,
    ...GRE_ARGUMENT_TOPICS,
    ...IELTS_TASK1_TOPICS,
    ...IELTS_TASK2_TOPICS,
    ...KAOYAN_TOPICS,
    ...ACADEMIC_WRITING_TOPICS
  ];
  
  if (filters.type) {
    pool = pool.filter(t => t.type === filters.type);
  }
  if (filters.topic) {
    pool = pool.filter(t => t.topic === filters.topic);
  }
  if (filters.difficulty) {
    pool = pool.filter(t => t.difficulty === filters.difficulty);
  }
  
  if (pool.length === 0) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

// ==================== V31-V35: 扩展更多题目 ====================

// V31: 更多 GRE Issue 题目
GRE_ISSUE_TOPICS.push({
  id: 'gre_issue_004',
  type: WRITING_TYPES.GRE_ISSUE,
  topic: TOPIC_CATEGORIES.SOCIETY,
  difficulty: DIFFICULTY_LEVELS.ADVANCED,
  timeLimit: 1800,
  wordCount: { min: 500, max: 700 },
  
  title: "Competition vs. Cooperation",
  
  prompt: "Competition for high grades seriously limits the quality of learning at all levels of education.",
  
  instructions: "Write a response in which you discuss the extent to which you agree or disagree with the statement and explain your reasoning for the position you take. In developing and supporting your position, you should consider ways in which the statement might or might not hold true and explain how these considerations shape your position.",
  
  keyConsiderations: [
    "Different types of learning goals",
    "Intrinsic vs. extrinsic motivation",
    "Effects on collaboration and knowledge sharing",
    "Stress and mental health implications",
    "Real-world applicability of competitive skills"
  ],
  
  sampleOutline: {
    position: "Partially agree - competition has mixed effects depending on context",
    paragraph1: "Competition can motivate effort but may distort learning priorities",
    paragraph2: "Grade focus encourages strategic rather than deep learning",
    paragraph3: "However, some competitive pressure prepares students for real-world challenges",
    conclusion: "Balanced approach combining healthy competition with collaborative learning"
  },
  
  sampleResponse: `The claim that competition for high grades limits learning quality captures an important tension in educational design. While I partially agree that excessive grade competition can distort learning priorities, the relationship between competition and educational quality is more nuanced than the statement suggests.

Competition for grades does create problematic incentives in several ways. When students focus primarily on maximizing scores, they may adopt strategic behaviors that undermine genuine understanding. Memorizing information for tests rather than developing conceptual mastery, choosing easier courses to protect GPAs, and viewing classmates as rivals rather than collaborators all represent rational responses to competitive pressures that nevertheless diminish educational value. Research consistently shows that intrinsic motivation—curiosity, interest, sense of purpose—produces deeper and more lasting learning than extrinsic rewards like grades.

Furthermore, intense grade competition can damage the collaborative dynamics essential to modern learning. Complex problems increasingly require diverse perspectives and collective intelligence. When students compete rather than cooperate, they may hoard insights rather than share them, creating an environment where collective knowledge growth is limited. The competitive classroom models an outdated individualistic paradigm poorly suited to contemporary professional realities.

However, the statement overstates its case by suggesting competition universally limits learning quality. Moderate competitive pressure can energize students who might otherwise coast, providing external structure for those who struggle with self-motivation. Competition also teaches valuable meta-skills—performing under pressure, managing time strategically, accepting and learning from setbacks—that serve students beyond academic contexts. The problem lies not in competition itself but in systems that make grades the dominant or exclusive metric of success.

The resolution lies in designing educational environments that harness competition's motivational benefits while mitigating its distorting effects. This might include multiple assessment methods that reward different types of excellence, grading systems that emphasize mastery over relative ranking, and explicit cultivation of collaborative skills alongside individual achievement.

In conclusion, while unrestrained grade competition can indeed limit learning quality by distorting incentives and undermining collaboration, well-designed educational systems can channel competitive instincts productively. The goal should be not eliminating competition but balancing it with structures that promote deep learning and cooperative skill development.`,
  
  scoringCriteria: {
    analysis: "Nuanced examination of competition's effects",
    reasoning: "Consideration of both benefits and drawbacks",
    organization: "Clear structure with balanced treatment",
    language: "Sophisticated academic vocabulary"
  }
});

// V31: 更多 GRE Argument 题目
GRE_ARGUMENT_TOPICS.push({
  id: 'gre_arg_003',
  type: WRITING_TYPES.GRE_ARGUMENT,
  topic: TOPIC_CATEGORIES.HEALTH,
  difficulty: DIFFICULTY_LEVELS.ADVANCED,
  timeLimit: 1800,
  wordCount: { min: 500, max: 700 },
  
  title: "Health Supplement Recommendation",
  
  prompt: `The following appeared in a health magazine:

"A study of over 1,000 adults found that those who took a daily vitamin D supplement had 40% fewer respiratory infections over a two-year period than those who did not take supplements. The study participants who took supplements also reported higher energy levels and better mood. Therefore, all adults should take daily vitamin D supplements to improve their health and prevent respiratory infections."`,
  
  instructions: "Write a response in which you discuss what specific evidence is needed to evaluate the argument and explain how the evidence would weaken or strengthen the argument.",
  
  logicalFlaws: [
    "Correlation vs. causation not established",
    "Self-selection bias in supplement users",
    "No control for confounding variables (diet, exercise, lifestyle)",
    "Self-reported outcomes (energy, mood) unreliable",
    "Generalization from specific population to all adults"
  ],
  
  sampleResponse: `The health magazine's recommendation that all adults take daily vitamin D supplements rests on a study with significant methodological limitations. Before accepting this sweeping recommendation, we would need additional evidence addressing several critical gaps.

First, we need evidence about how study participants were assigned to the supplement and non-supplement groups. If participants self-selected—choosing whether to take supplements based on personal preferences—the two groups likely differ in ways beyond vitamin D intake. Health-conscious individuals who choose supplements may also exercise more, eat better, sleep adequately, and manage stress effectively. These confounding factors, rather than vitamin D itself, might explain the observed health differences. Evidence from a randomized controlled trial, where participants are randomly assigned to supplement or placebo groups, would substantially strengthen the causal claim.

Second, information about participants' baseline vitamin D levels would help evaluate the argument. If supplement-takers were vitamin D deficient while non-takers had adequate levels, the benefits might reflect correcting deficiency rather than general supplementation value. Conversely, if both groups had similar starting levels, the case for universal supplementation would be stronger. Without this data, we cannot determine whether supplements benefit everyone or only those with existing deficiencies.

Third, we need objective measures of the reported outcomes. The study mentions participants "reported" higher energy levels and better mood—subjective assessments vulnerable to placebo effects and expectation bias. People who believe supplements improve health may perceive benefits even without physiological changes. Laboratory measures of immune function, validated depression scales, or objective productivity metrics would provide more reliable evidence than self-reports.

Fourth, evidence about the study population's characteristics would help assess generalizability. The recommendation targets "all adults," but the study participants may represent a narrow demographic—perhaps predominantly one age group, geographic region, or health status. If participants were elderly individuals in northern climates with limited sun exposure, results might not apply to young adults in sunny regions. Information about participant diversity is essential for evaluating the universal recommendation.

Finally, we would benefit from evidence about potential risks of vitamin D supplementation. The argument focuses exclusively on benefits while ignoring possible harms. Excessive vitamin D can cause toxicity, and long-term supplementation effects may differ from short-term outcomes. A complete evaluation requires weighing benefits against potential risks.

In conclusion, while the study provides suggestive evidence that vitamin D supplements may benefit some adults, the evidence needed to justify universal supplementation includes randomized trial data, baseline vitamin D measurements, objective outcome measures, diverse participant demographics, and risk assessment. Without such evidence, the sweeping recommendation is premature.`,
  
  scoringCriteria: {
    analysis: "Identification of specific evidence needs",
    reasoning: "Clear explanation of how evidence affects argument",
    organization: "Systematic treatment of evidentiary gaps",
    language: "Precise analytical expression"
  }
});

// V32: 更多雅思 Task 1 题目 - 表格
IELTS_TASK1_TOPICS.push({
  id: 'ielts_t1_004',
  type: WRITING_TYPES.IELTS_TASK1_TABLE,
  topic: TOPIC_CATEGORIES.EDUCATION,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 1200,
  wordCount: { min: 150, max: 200 },
  
  title: "University Graduate Employment Rates",
  
  chartDescription: "The table shows the percentage of university graduates in employment within six months of graduation, by field of study, in 2010 and 2020.",
  
  chartData: {
    type: "table",
    headers: ["Field of Study", "2010 (%)", "2020 (%)"],
    rows: [
      ["Medicine", 98, 99],
      ["Engineering", 89, 92],
      ["Computer Science", 85, 95],
      ["Business", 78, 82],
      ["Law", 82, 75],
      ["Arts & Humanities", 65, 58],
      ["Social Sciences", 70, 68]
    ]
  },
  
  prompt: "Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
  
  keyFeatures: [
    "Medicine consistently highest employment rate",
    "Computer Science showed largest increase",
    "Law and Arts/Humanities declined",
    "Overall trend: STEM fields improved, humanities declined",
    "Gap between highest and lowest widened"
  ],
  
  sampleResponse: `The table compares graduate employment rates across seven fields of study in 2010 and 2020, measuring the percentage employed within six months of graduation.

Overall, STEM-related fields generally maintained or improved their employment rates, while humanities and some social sciences experienced declines. Medicine remained the highest-performing field throughout, while Arts and Humanities had the lowest rates in both years.

Medicine graduates achieved near-universal employment, rising slightly from 98% to 99%. Computer Science showed the most dramatic improvement, jumping from 85% to 95%—a 10 percentage point increase that reflects growing demand for technology professionals. Engineering also improved moderately, from 89% to 92%.

In contrast, several fields experienced declining employment prospects. Law dropped notably from 82% to 75%, suggesting increased competition in the legal profession. Arts and Humanities fell from an already low 65% to just 58%, while Social Sciences edged down slightly from 70% to 68%.

Business graduates saw modest improvement from 78% to 82%, positioning them in the middle range.

In summary, the data reveals a widening gap between technology-oriented fields and humanities, with the difference between highest and lowest employment rates expanding from 33 to 41 percentage points over the decade.`,
  
  vocabulary: ["employment rate", "percentage point", "dramatic improvement", "declining prospects", "widening gap"]
});

// V32: 更多雅思 Task 2 题目
IELTS_TASK2_TOPICS.push({
  id: 'ielts_t2_003',
  type: WRITING_TYPES.IELTS_TASK2,
  topic: TOPIC_CATEGORIES.TECHNOLOGY,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 2400,
  wordCount: { min: 250, max: 300 },
  
  title: "Social Media Age Restrictions",
  
  questionType: "Advantages/Disadvantages + Opinion",
  
  prompt: "Many people believe that social media sites should set a minimum age limit for users. What are the advantages and disadvantages of this? Give your own opinion.",
  
  keyPoints: {
    advantages: [
      "Protects children from cyberbullying and harmful content",
      "Reduces social comparison and mental health issues",
      "Allows time for emotional maturity before online exposure"
    ],
    disadvantages: [
      "Difficult to enforce effectively",
      "May push children to lie about age or use alternative platforms",
      "Excludes children from educational benefits and social connections"
    ]
  },
  
  sampleResponse: `The question of whether social media platforms should enforce minimum age requirements has become increasingly relevant as digital technology pervades children's lives. While age restrictions offer significant protective benefits, they also present practical challenges that deserve careful consideration.

The primary advantage of minimum age limits is protection from documented harms. Research consistently links early social media use with increased anxiety, depression, and body image issues among young people. Children lack the emotional maturity to navigate online social dynamics, making them vulnerable to cyberbullying and manipulation. Age restrictions would provide a buffer period for developing resilience before exposure to these pressures.

Additionally, limiting young children's access could reduce harmful social comparison behaviors. Platforms designed to maximize engagement often promote unrealistic lifestyle portrayals that negatively affect developing self-esteem. Delaying exposure until adolescence might allow children to develop more secure identities.

However, significant disadvantages complicate this approach. Enforcement presents enormous practical challenges—children can easily lie about their ages, and parents may create accounts on children's behalf. Strict restrictions might simply drive usage underground, where parental oversight becomes even more difficult.

Furthermore, social media offers genuine educational and social benefits that age restrictions would deny young users. Many children use platforms to connect with family, pursue creative interests, and access educational content. Complete exclusion seems both impractical and potentially counterproductive.

In my view, rather than strict age cutoffs, a more effective approach combines graduated access with robust parental controls and digital literacy education. Platforms could offer age-appropriate versions with limited features, while schools teach critical evaluation of online content. This balanced strategy addresses legitimate protection concerns while acknowledging the impossibility of complete restriction in our digital age.`,
  
  vocabulary: ["pervades", "documented harms", "resilience", "social comparison", "graduated access", "digital literacy"]
});

// V33: 更多考研作文题目
KAOYAN_TOPICS.push({
  id: 'kaoyan_app_003',
  type: WRITING_TYPES.KAOYAN_APPLICATION,
  topic: TOPIC_CATEGORIES.EDUCATION,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 900,
  wordCount: { min: 100, max: 150 },
  
  title: "感谢信",
  
  prompt: "Directions: You have just received a scholarship from a foundation. Write a letter to express your gratitude. Your letter should include: 1) your appreciation for the scholarship, 2) how you plan to use the opportunity, 3) your future goals.",
  
  format: {
    greeting: "Dear Sir or Madam,",
    body: "Three paragraphs as specified",
    closing: "Yours sincerely, Li Ming"
  },
  
  sampleResponse: `Dear Sir or Madam,

I am writing to express my heartfelt gratitude for being selected as a recipient of the Excellence Scholarship from your foundation. This generous support means a great deal to me and will significantly impact my academic journey.

With this scholarship, I plan to dedicate more time to my research without the burden of part-time work. I intend to use part of the funds to purchase essential research materials and attend academic conferences in my field. This financial support will allow me to focus entirely on my studies and produce higher quality work.

My ultimate goal is to complete my doctoral dissertation with distinction and contribute meaningful research to my field. I hope to eventually become a university professor and continue the tradition of supporting deserving students, just as your foundation has supported me. I promise to work diligently to justify your confidence in my potential.

Yours sincerely,
Li Ming`,
  
  keyElements: [
    "Express genuine gratitude",
    "Specific plans for using the scholarship",
    "Connect to future aspirations",
    "Promise of dedication"
  ]
});

// V33: 更多图画作文
KAOYAN_TOPICS.push({
  id: 'kaoyan_pic_002',
  type: WRITING_TYPES.KAOYAN_PICTURE,
  topic: TOPIC_CATEGORIES.CULTURE,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 2400,
  wordCount: { min: 160, max: 200 },
  
  title: "传统文化传承",
  
  pictureDescription: "A cartoon showing two images side by side: on the left, an elderly person teaching a child traditional calligraphy; on the right, the same child years later teaching their own child. The caption reads: 'Passing the torch'",
  
  prompt: "Write an essay based on the picture above. In your essay, you should: 1) describe the picture briefly, 2) interpret its meaning, 3) give your comments.",
  
  sampleResponse: `The cartoon presents a touching scene of cultural transmission across generations. On the left, an elderly person patiently teaches a child the art of traditional Chinese calligraphy. On the right, years later, that same child—now an adult—is teaching their own child the same skill. The caption "Passing the torch" elegantly captures the essence of this generational relay.

This illustration conveys a profound message about the preservation and continuation of traditional culture. Each generation serves as both learner and teacher, receiving cultural heritage from elders and transmitting it to descendants. The calligraphy in the image symbolizes not merely an art form but the broader tradition of Chinese cultural wisdom that must be actively passed down rather than passively inherited.

The implications of this image are significant in our rapidly modernizing society. As technology dominates daily life, traditional arts risk being forgotten. The cartoon reminds us that cultural preservation requires conscious effort and personal commitment. Parents and grandparents bear responsibility for introducing young people to their heritage, while the younger generation must value and continue these traditions.

In my view, the vitality of any culture depends on this chain of transmission remaining unbroken. We should create opportunities for intergenerational learning, whether through family activities, school programs, or community events. Only through such dedicated effort can we ensure that our cultural treasures survive and thrive for future generations.`,
  
  vocabulary: ["cultural transmission", "generational relay", "heritage", "preservation", "intergenerational"]
});

// V34: 更多学术写作题目 - 研究结论部分
ACADEMIC_WRITING_TOPICS.push({
  id: 'academic_006',
  type: WRITING_TYPES.ACADEMIC_PAPER,
  topic: TOPIC_CATEGORIES.TECHNOLOGY,
  difficulty: DIFFICULTY_LEVELS.ADVANCED,
  timeLimit: 2400,
  wordCount: { min: 300, max: 450 },
  
  title: "研究结论与未来展望",
  
  prompt: "Write a conclusion section for a research paper that investigated the effectiveness of different teaching methods in STEM education. Summarize key findings, discuss limitations, and suggest directions for future research.",
  
  outline: {
    summary: "Restate main findings",
    implications: "Theoretical and practical significance",
    limitations: "Study constraints",
    future: "Research directions"
  },
  
  sampleResponse: `This study investigated the comparative effectiveness of inquiry-based, lecture-based, and blended teaching approaches in undergraduate STEM education across a diverse sample of 1,247 students at three research universities. Our findings offer several contributions to the ongoing pedagogical discourse.

The results provide robust evidence that inquiry-based methods significantly outperform traditional lecture formats in promoting conceptual understanding and problem-solving skills, with effect sizes of d = 0.68 and d = 0.72 respectively. These findings align with constructivist learning theory and extend previous research by demonstrating that benefits persist across demographic subgroups, including traditionally underrepresented populations in STEM fields. Notably, the blended approach combining structured inquiry with targeted direct instruction yielded the strongest outcomes, suggesting that pedagogical eclecticism may be optimal.

The practical implications are substantial. Institutions seeking to improve STEM retention rates should consider systematic integration of inquiry-based activities into existing curricula. However, our findings also highlight the importance of adequate instructor training and reduced class sizes to implement these methods effectively—considerations that carry significant resource implications.

Several limitations warrant acknowledgment. First, the study's duration of one academic year may not capture long-term retention effects or transfer of learning to subsequent courses. Second, despite random assignment at the section level, selection effects may persist at the course enrollment level. Third, our outcome measures, while validated, may not fully capture the affective dimensions of learning, such as scientific identity formation or intrinsic motivation.

Future research should address these gaps through longitudinal designs tracking students throughout their academic careers and into professional practice. Investigation of implementation variables—what makes inquiry-based instruction succeed in some contexts but not others—represents a particularly promising direction. Additionally, research examining how artificial intelligence tools might enhance or complement inquiry-based learning in STEM contexts could inform evolving pedagogical practices.

In conclusion, this research strengthens the evidence base for active learning approaches while highlighting the complexity of educational intervention effects. Moving forward, educational research and practice must continue to evolve together, with findings informing implementation and implementation experiences refining theoretical understanding.`,
  
  vocabulary: ["pedagogical discourse", "effect sizes", "constructivist learning theory", "pedagogical eclecticism", "longitudinal designs", "implementation variables"]
});

// V34: 学术论文写作 - 批判性分析
ACADEMIC_WRITING_TOPICS.push({
  id: 'academic_007',
  type: WRITING_TYPES.ACADEMIC_REVIEW,
  topic: TOPIC_CATEGORIES.SOCIETY,
  difficulty: DIFFICULTY_LEVELS.ADVANCED,
  timeLimit: 2400,
  wordCount: { min: 350, max: 500 },
  
  title: "批判性文献评述 - 社交媒体与民主",
  
  prompt: "Write a critical analysis examining competing scholarly perspectives on social media's impact on democratic participation. Evaluate the evidence supporting different viewpoints and identify methodological strengths and weaknesses.",
  
  outline: {
    introduction: "Frame the scholarly debate",
    perspective_positive: "Democratization thesis",
    perspective_negative: "Polarization and misinformation concerns",
    critique: "Methodological evaluation",
    synthesis: "Integrated assessment"
  },
  
  sampleResponse: `The relationship between social media platforms and democratic processes has generated vigorous scholarly debate, with researchers offering sharply divergent assessments. This analysis examines the competing perspectives and evaluates the evidentiary basis for each position.

The "democratization thesis" posits that social media platforms expand political participation by lowering barriers to civic engagement. Proponents cite evidence of increased voter registration through online campaigns, the mobilization capacity demonstrated during the Arab Spring movements, and data showing that marginalized groups can amplify voices previously excluded from mainstream discourse. Bennett and Segerberg's (2013) influential "connective action" framework suggests that digital networks enable new forms of political organizing that complement—or even surpass—traditional institutional channels.

Conversely, a substantial body of research raises concerns about polarization, misinformation, and the erosion of deliberative norms. Sunstein's (2017) "echo chamber" hypothesis suggests that algorithmic curation creates homogeneous information environments that reinforce pre-existing beliefs and inhibit exposure to opposing viewpoints. Empirical studies by Vosoughi et al. (2018) demonstrate that false information spreads more rapidly than accurate content on social platforms, raising questions about informed democratic deliberation.

Methodological evaluation reveals significant limitations in both literatures. Studies supporting the democratization thesis often rely on case studies of successful mobilizations, potentially neglecting failed movements and introducing selection bias. Correlation between social media use and civic participation may reflect reverse causation—engaged citizens may simply adopt new communication tools without those tools being causally efficacious.

The polarization literature faces its own challenges. Definitions of "echo chambers" vary substantially across studies, and recent large-scale analyses by Guess et al. (2021) suggest that exposure diversity on social media actually exceeds offline networks for many users. Additionally, laboratory studies of misinformation effects may overestimate real-world impact given the artificial attention protocols employed.

Synthesizing these perspectives, a more nuanced picture emerges. Social media's democratic effects appear highly contingent on platform design, regulatory environment, media literacy levels, and pre-existing institutional contexts. Rather than asking whether social media is "good" or "bad" for democracy, scholars should investigate the conditions under which different outcomes obtain. Future research employing natural experiments and platform-level data access could significantly advance our understanding of these conditional relationships.`,
  
  vocabulary: ["democratization thesis", "connective action", "algorithmic curation", "deliberative norms", "reverse causation", "conditional relationships"]
});

// V35: 更多 TOEFL 综合写作
TOEFL_INTEGRATED_TOPICS.push({
  id: 'toefl_int_011',
  type: WRITING_TYPES.TOEFL_INTEGRATED,
  topic: TOPIC_CATEGORIES.HISTORY,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 1200,
  wordCount: { min: 150, max: 225 },
  
  title: "Easter Island Statues Mystery",
  
  reading: {
    text: `The massive stone statues of Easter Island, called moai, have puzzled researchers for centuries. How did the ancient Polynesian inhabitants move these enormous figures, some weighing over 80 tons, from the quarries to platforms around the island's coast? Recent research supports the theory that the statues were "walked" to their destinations.

First, the shape of the moai suggests they were designed for upright transport. The statues have a forward-leaning center of gravity and a distinctive D-shaped base that would facilitate rocking motion. Computer simulations confirm that with this design, a team of people could rock the statue from side to side while pulling it forward, essentially "walking" it.

Second, experimental archaeology supports this theory. Researchers successfully moved a replica moai using the walking technique with just 18 people pulling ropes. The movement resembled the way one might walk a refrigerator across a room. This method requires far fewer people than the alternative theories involving log rollers or sledges.

Third, oral traditions of Easter Island describe the statues as having "walked" to their locations. According to local legends, the statues were animated by spiritual power and walked themselves. This oral history may preserve actual memory of the walking transport method.`,
    readingTime: 180
  },
  
  lecture: {
    transcript: `The walking theory for moai transport has captured public imagination, but there are significant problems with it that the reading overlooks.

First, about that design argument—yes, the statues could theoretically be walked, but that doesn't mean they were. The forward lean and base shape could equally serve other purposes, like stability when standing on platforms. We can't assume design features were intended for transport just because they happen to work for walking. Also, note that many statues were transported lying down—we find them fallen along ancient roads in horizontal positions, which contradicts the upright walking theory.

Second, the experimental replicas weren't truly representative. The replica used in walking experiments was about 5 tons—much smaller than the largest moai, which exceeded 80 tons. Walking a refrigerator is very different from walking an 80-ton giant. The forces involved scale up dramatically. Furthermore, the experiments occurred on relatively smooth, prepared ground. Easter Island's ancient roads were rough and uneven, making the rocking motion far more dangerous and difficult.

Third, interpreting oral traditions literally is problematic. "The statues walked" could be metaphorical language for many transport methods—or it could reflect religious beliefs about the statues' spiritual animation rather than describing actual movement technique. Many cultures describe inanimate objects as having life or agency without meaning it literally. We shouldn't treat mythology as historical documentation.`,
    audioUrl: null
  },
  
  prompt: "Summarize the points made in the lecture, explaining how they challenge the claims made in the reading passage.",
  
  keyPoints: [
    "Design features could serve other purposes; many statues found horizontal",
    "Experimental replicas too small and conditions too ideal",
    "Oral traditions may be metaphorical, not literal descriptions"
  ],
  
  sampleResponse: `The lecture challenges the reading's claim that Easter Island's moai statues were transported by "walking" them to their destinations.

First, the professor disputes the design argument. While the reading suggests the statues' forward lean and D-shaped base indicate they were designed for upright walking transport, the lecturer points out these features could serve other purposes, such as stability when standing. More significantly, many statues have been found lying horizontally along ancient roads, which contradicts the theory that they were transported upright.

Second, the experimental evidence is questioned. The lecturer notes that the replica used in walking experiments weighed only about 5 tons—far less than the largest moai at over 80 tons. Scaling up the forces involved would make the walking technique dramatically more difficult and dangerous. Additionally, the experiments were conducted on smooth, prepared ground rather than the rough, uneven ancient roads of Easter Island.

Third, the interpretation of oral traditions is challenged. The professor argues that the phrase "the statues walked" could be metaphorical or reflect religious beliefs about spiritual animation rather than literal descriptions of transport technique. Many cultures attribute agency to inanimate objects without meaning it literally, so treating mythology as historical evidence is methodologically questionable.`,
  
  vocabulary: ["moai", "quarries", "experimental archaeology", "oral traditions", "metaphorical", "methodology"]
});

// V35: 更多 TOEFL 学术讨论
TOEFL_DISCUSSION_TOPICS.push({
  id: 'toefl_disc_011',
  type: WRITING_TYPES.TOEFL_DISCUSSION,
  topic: TOPIC_CATEGORIES.SCIENCE,
  difficulty: DIFFICULTY_LEVELS.INTERMEDIATE,
  timeLimit: 600,
  wordCount: { min: 100, max: 150 },
  
  title: "Space Exploration Funding",
  
  professorQuestion: {
    name: "Dr. Reynolds",
    context: "We've been examining the allocation of scientific research funding in our society.",
    question: "Given limited resources, should governments prioritize funding for space exploration or focus those resources on solving problems here on Earth, such as climate change, disease, and poverty?"
  },
  
  studentResponses: [
    {
      name: "Chen",
      response: "Earth's problems must come first. With millions facing hunger, disease, and the existential threat of climate change, spending billions on space missions seems morally irresponsible. We should solve our problems here before venturing elsewhere. Space can wait; suffering people cannot."
    },
    {
      name: "Aisha",
      response: "Space exploration isn't separate from solving Earth's problems—it contributes to solutions. Satellite technology helps us monitor climate change, medical research in space leads to health innovations, and the space industry creates jobs. Besides, inspiring human achievement matters. We can do both."
    }
  ],
  
  prompt: "Express your opinion on this topic and engage with both perspectives.",
  
  sampleResponse: `Both Chen and Aisha raise important points, but I believe they present a false dichotomy. The choice isn't between space exploration and addressing Earth's problems—rather, it's about optimizing resource allocation across both domains.

Chen's moral argument has emotional weight, but the premise that space funding significantly diverts resources from humanitarian needs is questionable. NASA's budget represents less than 0.5% of U.S. federal spending, while defense exceeds 15%. Eliminating space programs wouldn't meaningfully address poverty or climate change.

Aisha correctly notes that space research generates practical benefits. GPS navigation, weather prediction, and telecommunications all derive from space technology. Climate scientists rely heavily on satellite data. However, these benefits don't automatically justify every space initiative—each program should demonstrate value.

The strongest position acknowledges that both domains deserve funding, with allocations reflecting careful cost-benefit analysis. Pure exploration should continue at modest levels for its inspirational and scientific value, while applied space technology should receive robust support when it addresses terrestrial needs. The goal isn't choosing one or the other but investing wisely in both.`,
  
  keyElements: [
    "Challenge false dichotomy",
    "Contextualize budget claims",
    "Acknowledge valid points from both sides",
    "Propose nuanced allocation approach"
  ]
});

// 更新统计信息
writingData.stats.totalTopics = 
  TOEFL_INTEGRATED_TOPICS.length + 
  TOEFL_DISCUSSION_TOPICS.length +
  GRE_ISSUE_TOPICS.length +
  GRE_ARGUMENT_TOPICS.length +
  IELTS_TASK1_TOPICS.length +
  IELTS_TASK2_TOPICS.length +
  KAOYAN_TOPICS.length +
  ACADEMIC_WRITING_TOPICS.length;

writingData.stats.byType.toefl_integrated = TOEFL_INTEGRATED_TOPICS.length;
writingData.stats.byType.toefl_discussion = TOEFL_DISCUSSION_TOPICS.length;
writingData.stats.byType.gre_issue = GRE_ISSUE_TOPICS.length;
writingData.stats.byType.gre_argument = GRE_ARGUMENT_TOPICS.length;
writingData.stats.byType.ielts_task1 = IELTS_TASK1_TOPICS.length;
writingData.stats.byType.ielts_task2 = IELTS_TASK2_TOPICS.length;
writingData.stats.byType.kaoyan = KAOYAN_TOPICS.length;
writingData.stats.byType.academic = ACADEMIC_WRITING_TOPICS.length;

console.log('✅ V31-V35 写作题目扩展完成');
console.log(`📊 新增题目统计:`);
console.log(`  - GRE Issue: +1 (共${GRE_ISSUE_TOPICS.length}道)`);
console.log(`  - GRE Argument: +1 (共${GRE_ARGUMENT_TOPICS.length}道)`);
console.log(`  - IELTS Task 1: +1 (共${IELTS_TASK1_TOPICS.length}道)`);
console.log(`  - IELTS Task 2: +1 (共${IELTS_TASK2_TOPICS.length}道)`);
console.log(`  - 考研作文: +2 (共${KAOYAN_TOPICS.length}道)`);
console.log(`  - 学术写作: +2 (共${ACADEMIC_WRITING_TOPICS.length}道)`);
console.log(`  - TOEFL综合写作: +1 (共${TOEFL_INTEGRATED_TOPICS.length}道)`);
console.log(`  - TOEFL学术讨论: +1 (共${TOEFL_DISCUSSION_TOPICS.length}道)`);
console.log(`📚 总计: ${writingData.stats.totalTopics} 道写作题目`);

// 导出所有新增内容
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    // 原有导出
    writingData,
    WRITING_TYPES,
    TOPIC_CATEGORIES,
    DIFFICULTY_LEVELS,
    WRITING_TEMPLATES,
    TOEFL_INTEGRATED_TOPICS,
    TOEFL_DISCUSSION_TOPICS,
    getRandomWritingTopic,
    getWritingTopicsByType,
    // V16-V35 导出
    GRE_ISSUE_TOPICS,
    GRE_ARGUMENT_TOPICS,
    IELTS_TASK1_TOPICS,
    IELTS_TASK2_TOPICS,
    KAOYAN_TOPICS,
    ACADEMIC_WRITING_TOPICS,
    getTopicsByExam,
    getTopicsByCategory,
    getTopicsByDifficulty,
    getRandomTopic
  };
}

console.log('✅ 写作数据模块加载完成 (V1-V35)');

// ==================== V36: 英文拼写检查系统 ====================
/**
 * AI 写作辅助模块 - 拼写检查
 * 功能：实时检测英文拼写错误并提供纠正建议
 */

// 常见拼写错误词典（正确拼写 -> 常见错误形式）
const COMMON_MISSPELLINGS = {
  // 常见混淆词
  'receive': ['recieve', 'recive', 'receeve'],
  'believe': ['beleive', 'belive', 'beleave'],
  'achieve': ['acheive', 'achive', 'acheeve'],
  'separate': ['seperate', 'seprate', 'separete'],
  'definitely': ['definately', 'definitly', 'deffinitely', 'definetly'],
  'occurrence': ['occurence', 'occurance', 'occurrance'],
  'accommodate': ['accomodate', 'acommodate', 'accomadate'],
  'necessary': ['neccessary', 'necessery', 'neccesary'],
  'environment': ['enviroment', 'environmnet', 'enviornment'],
  'government': ['goverment', 'governmnet', 'govermnent'],
  'development': ['developement', 'devlopment', 'develpoment'],
  'argument': ['arguement', 'argumnet', 'arguemnt'],
  'beginning': ['begining', 'beginnig', 'begginning'],
  'recommend': ['recomend', 'reccommend', 'recommand'],
  'temperature': ['temprature', 'temperture', 'temparature'],
  'immediately': ['immediatly', 'imediately', 'immediatley'],
  'occasionally': ['occasionaly', 'occassionally', 'ocassionally'],
  'successful': ['successfull', 'succesful', 'sucessful'],
  'professional': ['proffesional', 'profesional', 'proffessional'],
  'knowledge': ['knowlege', 'knowlede', 'knowlegde'],
  'experience': ['experiance', 'expirience', 'experince'],
  'independent': ['independant', 'indepedent', 'independet'],
  'opportunity': ['oportunity', 'oppurtunity', 'oppertunity'],
  'analysis': ['anaylsis', 'analisis', 'analaysis'],
  'consensus': ['concensus', 'consensis', 'consensous'],
  'consequences': ['consequenses', 'consequnces', 'consequeces'],
  'comprehensive': ['comperhensive', 'comprehnsive', 'comprahensive'],
  'phenomenon': ['phenomenom', 'phenemenon', 'phenomeon'],
  'significance': ['significane', 'significence', 'signifcance'],
  'perspective': ['prospective', 'perspectiv', 'persepctive'],
  'particularly': ['particulary', 'particuarly', 'particularily'],
  'therefore': ['therefor', 'therfore', 'therfor'],
  'whether': ['wether', 'wheather', 'wheter'],
  'through': ['trough', 'thorugh', 'thruogh'],
  'although': ['altough', 'althought', 'allthough'],
  'which': ['wich', 'whcih', 'whihc'],
  'their': ['thier', 'ther', 'theri'],
  'because': ['becuase', 'becasue', 'beacuse'],
  'different': ['diffrent', 'diferent', 'differnt'],
  'important': ['importent', 'importnat', 'improtant'],
  'influence': ['influance', 'influnce', 'influece'],
  'maintain': ['maintian', 'maintan', 'mantain'],
  'existence': ['existance', 'existense', 'existince'],
  'structure': ['struture', 'strcuture', 'structre'],
  'technique': ['techique', 'technqiue', 'tecnique'],
  'efficiency': ['efficency', 'effeciency', 'efficiancy']
};

// 构建反向索引（错误拼写 -> 正确拼写）
const MISSPELLING_INDEX = {};
Object.keys(COMMON_MISSPELLINGS).forEach(correct => {
  COMMON_MISSPELLINGS[correct].forEach(wrong => {
    MISSPELLING_INDEX[wrong.toLowerCase()] = correct;
  });
});

// 基础词汇表（用于拼写验证）
const BASIC_VOCABULARY = new Set([
  // 常用学术词汇
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
  'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used',
  'and', 'but', 'or', 'nor', 'for', 'yet', 'so', 'both', 'either', 'neither',
  'not', 'only', 'own', 'same', 'than', 'too', 'very', 'just', 'also',
  'this', 'that', 'these', 'those', 'what', 'which', 'who', 'whom', 'whose',
  'where', 'when', 'why', 'how', 'all', 'each', 'every', 'both', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'any', 'many', 'much',
  // 添加所有正确拼写的词
  ...Object.keys(COMMON_MISSPELLINGS)
]);

/**
 * 计算编辑距离（Levenshtein Distance）
 * 用于模糊匹配拼写建议
 */
function levenshteinDistance(str1, str2) {
  const m = str1.length;
  const n = str2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // 替换
          dp[i - 1][j] + 1,     // 删除
          dp[i][j - 1] + 1      // 插入
        );
      }
    }
  }
  return dp[m][n];
}

/**
 * 检查单词拼写
 * @param {string} word - 待检查的单词
 * @returns {Object} 检查结果 { isCorrect, suggestions, errorType }
 */
function checkSpelling(word) {
  if (!word || word.length < 2) {
    return { isCorrect: true, suggestions: [], errorType: null };
  }
  
  const lowerWord = word.toLowerCase();
  
  // 1. 检查是否在已知错误词典中
  if (MISSPELLING_INDEX[lowerWord]) {
    return {
      isCorrect: false,
      suggestions: [MISSPELLING_INDEX[lowerWord]],
      errorType: 'common_misspelling',
      confidence: 0.95
    };
  }
  
  // 2. 检查是否是正确的词汇
  if (BASIC_VOCABULARY.has(lowerWord) || Object.keys(COMMON_MISSPELLINGS).includes(lowerWord)) {
    return { isCorrect: true, suggestions: [], errorType: null };
  }
  
  // 3. 使用编辑距离找相似词
  const suggestions = [];
  const correctWords = Object.keys(COMMON_MISSPELLINGS);
  
  for (const correct of correctWords) {
    const distance = levenshteinDistance(lowerWord, correct);
    if (distance <= 2 && distance > 0) {
      suggestions.push({ word: correct, distance });
    }
  }
  
  // 按编辑距离排序
  suggestions.sort((a, b) => a.distance - b.distance);
  
  if (suggestions.length > 0) {
    return {
      isCorrect: false,
      suggestions: suggestions.slice(0, 3).map(s => s.word),
      errorType: 'possible_misspelling',
      confidence: 0.7
    };
  }
  
  // 4. 未知单词（可能是正确的专业术语）
  return {
    isCorrect: true, // 默认认为是正确的
    suggestions: [],
    errorType: null,
    isUnknown: true
  };
}

/**
 * 检查文本中的所有拼写错误
 * @param {string} text - 待检查的文本
 * @returns {Array} 错误列表 [{ word, position, suggestions, errorType }]
 */
function checkTextSpelling(text) {
  const errors = [];
  // 匹配英文单词
  const wordRegex = /\b[a-zA-Z]+\b/g;
  let match;
  
  while ((match = wordRegex.exec(text)) !== null) {
    const word = match[0];
    const result = checkSpelling(word);
    
    if (!result.isCorrect) {
      errors.push({
        word: word,
        position: match.index,
        endPosition: match.index + word.length,
        suggestions: result.suggestions,
        errorType: result.errorType,
        confidence: result.confidence
      });
    }
  }
  
  return errors;
}

// 导出 V36 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.checkSpelling = checkSpelling;
  window.WritingAI.checkTextSpelling = checkTextSpelling;
  window.WritingAI.COMMON_MISSPELLINGS = COMMON_MISSPELLINGS;
  window.WritingAI.levenshteinDistance = levenshteinDistance;
}

console.log('✅ V36 拼写检查系统加载完成');

// ==================== V37: 语法检查系统 ====================
/**
 * AI 写作辅助模块 - 语法检查
 * 功能：检测常见语法错误并提供修正建议
 */

// 常见语法错误模式
const GRAMMAR_PATTERNS = [
  // 主谓一致错误
  {
    id: 'subject_verb_singular',
    pattern: /\b(he|she|it|everyone|someone|anyone|nobody|each|every)\s+(are|were|have|do)\b/gi,
    message: '主谓一致错误：单数主语应使用单数动词',
    suggestion: (match) => {
      const fixes = { 'are': 'is', 'were': 'was', 'have': 'has', 'do': 'does' };
      return match.replace(/\b(are|were|have|do)\b/i, m => fixes[m.toLowerCase()]);
    },
    category: 'subject_verb_agreement'
  },
  {
    id: 'subject_verb_plural',
    pattern: /\b(they|we|people|students|children)\s+(is|was|has|does)\b/gi,
    message: '主谓一致错误：复数主语应使用复数动词',
    suggestion: (match) => {
      const fixes = { 'is': 'are', 'was': 'were', 'has': 'have', 'does': 'do' };
      return match.replace(/\b(is|was|has|does)\b/i, m => fixes[m.toLowerCase()]);
    },
    category: 'subject_verb_agreement'
  },
  
  // 冠词错误
  {
    id: 'article_a_an_vowel',
    pattern: /\ba\s+([aeiou][a-z]+)\b/gi,
    message: '冠词错误：元音开头的单词前应使用 "an"',
    suggestion: (match, word) => 'an ' + word,
    category: 'article'
  },
  {
    id: 'article_an_consonant',
    pattern: /\ban\s+([bcdfghjklmnpqrstvwxyz][a-z]+)\b/gi,
    message: '冠词错误：辅音开头的单词前应使用 "a"',
    suggestion: (match, word) => 'a ' + word,
    category: 'article',
    exceptions: ['hour', 'honest', 'honor', 'heir'] // 特殊情况
  },
  
  // 双重否定
  {
    id: 'double_negative',
    pattern: /\b(don't|doesn't|didn't|won't|can't|couldn't|shouldn't|wouldn't)\s+\w+\s+(no|nothing|nobody|nowhere|never)\b/gi,
    message: '双重否定：在标准英语中应避免双重否定',
    suggestion: null,
    category: 'double_negative'
  },
  
  // 常见时态错误
  {
    id: 'tense_yesterday_present',
    pattern: /\byesterday\b[^.]*\b(is|are|go|come|do|have)\b(?!\s+going\s+to)/gi,
    message: '时态错误：yesterday 应与过去时连用',
    suggestion: null,
    category: 'tense'
  },
  {
    id: 'tense_tomorrow_past',
    pattern: /\btomorrow\b[^.]*\b(was|were|went|came|did|had)\b/gi,
    message: '时态错误：tomorrow 应与将来时连用',
    suggestion: null,
    category: 'tense'
  },
  
  // 介词错误
  {
    id: 'preposition_depend',
    pattern: /\bdepends?\s+(of|for|with)\b/gi,
    message: '介词搭配错误：depend 应与 on 搭配',
    suggestion: (match) => match.replace(/\b(of|for|with)\b/i, 'on'),
    category: 'preposition'
  },
  {
    id: 'preposition_consist',
    pattern: /\bconsists?\s+(with|on|for)\b/gi,
    message: '介词搭配错误：consist 应与 of 搭配',
    suggestion: (match) => match.replace(/\b(with|on|for)\b/i, 'of'),
    category: 'preposition'
  },
  {
    id: 'preposition_interested',
    pattern: /\binterested\s+(of|for|with)\b/gi,
    message: '介词搭配错误：interested 应与 in 搭配',
    suggestion: (match) => match.replace(/\b(of|for|with)\b/i, 'in'),
    category: 'preposition'
  },
  
  // 词性错误
  {
    id: 'adjective_adverb',
    pattern: /\b(run|walk|speak|write|work|think)\s+(quick|slow|careful|beautiful|easy)\b/gi,
    message: '词性错误：动词后应使用副词而非形容词',
    suggestion: (match) => {
      return match.replace(/\b(quick|slow|careful|beautiful|easy)\b/i, m => {
        const adverbs = {
          'quick': 'quickly', 'slow': 'slowly', 'careful': 'carefully',
          'beautiful': 'beautifully', 'easy': 'easily'
        };
        return adverbs[m.toLowerCase()] || m + 'ly';
      });
    },
    category: 'word_form'
  },
  
  // 常见表达错误
  {
    id: 'expression_despite_of',
    pattern: /\bdespite\s+of\b/gi,
    message: '表达错误：despite 后不需要 of',
    suggestion: (match) => 'despite',
    category: 'expression'
  },
  {
    id: 'expression_discuss_about',
    pattern: /\bdiscuss\s+about\b/gi,
    message: '表达错误：discuss 是及物动词，后面直接跟宾语',
    suggestion: (match) => 'discuss',
    category: 'expression'
  },
  {
    id: 'expression_return_back',
    pattern: /\breturn\s+back\b/gi,
    message: '表达冗余：return 本身已包含 back 的含义',
    suggestion: (match) => 'return',
    category: 'redundancy'
  }
];

/**
 * 检查文本语法错误
 * @param {string} text - 待检查的文本
 * @returns {Array} 错误列表
 */
function checkGrammar(text) {
  const errors = [];
  
  GRAMMAR_PATTERNS.forEach(rule => {
    let match;
    const regex = new RegExp(rule.pattern.source, rule.pattern.flags);
    
    while ((match = regex.exec(text)) !== null) {
      // 检查例外情况
      if (rule.exceptions) {
        const matchedWord = match[1] ? match[1].toLowerCase() : '';
        if (rule.exceptions.includes(matchedWord)) continue;
      }
      
      const error = {
        id: rule.id,
        text: match[0],
        position: match.index,
        endPosition: match.index + match[0].length,
        message: rule.message,
        category: rule.category,
        suggestion: rule.suggestion ? rule.suggestion(match[0], match[1]) : null
      };
      
      errors.push(error);
    }
  });
  
  // 按位置排序
  errors.sort((a, b) => a.position - b.position);
  
  return errors;
}

/**
 * 获取语法错误类型统计
 */
function getGrammarErrorStats(errors) {
  const stats = {};
  errors.forEach(e => {
    stats[e.category] = (stats[e.category] || 0) + 1;
  });
  return stats;
}

// 导出 V37 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.checkGrammar = checkGrammar;
  window.WritingAI.getGrammarErrorStats = getGrammarErrorStats;
  window.WritingAI.GRAMMAR_PATTERNS = GRAMMAR_PATTERNS;
}

console.log('✅ V37 语法检查系统加载完成');

// ==================== V38: 智能续写建议系统 ====================
/**
 * AI 写作辅助模块 - 智能续写
 * 功能：根据上下文预测用户想要写的内容，提供续写建议
 */

// 学术写作常用句式模式
const CONTINUATION_PATTERNS = {
  // 开头句式
  openings: {
    'In recent years': [
      ', there has been a growing interest in...',
      ', the issue of... has attracted considerable attention.',
      ', significant progress has been made in...'
    ],
    'It is widely': [
      ' believed that...',
      ' acknowledged that...',
      ' recognized that...'
    ],
    'The purpose of this': [
      ' essay is to...',
      ' paper is to examine...',
      ' study is to investigate...'
    ],
    'This essay will': [
      ' argue that...',
      ' examine the extent to which...',
      ' discuss both sides of...'
    ]
  },
  
  // 论证句式
  arguments: {
    'First': [
      'ly, it is important to note that...',
      ' and foremost, we must consider...',
      ', the most significant point is that...'
    ],
    'Second': [
      'ly, another key factor is...',
      ', it should be noted that...',
      ', we must also consider...'
    ],
    'Furthermore': [
      ', it is worth mentioning that...',
      ', this is supported by the fact that...',
      ', research has shown that...'
    ],
    'However': [
      ', it must be acknowledged that...',
      ', there are also arguments against this view.',
      ', some critics argue that...'
    ],
    'On the other hand': [
      ', proponents of this view argue that...',
      ', there is evidence to suggest that...',
      ', it could be argued that...'
    ],
    'For example': [
      ', studies have shown that...',
      ', a case in point is...',
      ', consider the situation where...'
    ],
    'In addition': [
      ', it is important to consider...',
      ', there is also the issue of...',
      ' to this, we must also examine...'
    ]
  },
  
  // 结论句式
  conclusions: {
    'In conclusion': [
      ', it is clear that...',
      ', the evidence suggests that...',
      ', while both views have merit, I believe...'
    ],
    'To sum up': [
      ', the main points discussed above indicate that...',
      ', there are compelling arguments on both sides.',
      ', this essay has examined...'
    ],
    'All things considered': [
      ', it seems reasonable to conclude that...',
      ', the benefits outweigh the drawbacks.',
      ', a balanced approach is needed.'
    ],
    'Taking everything into account': [
      ', I would argue that...',
      ', the most effective solution would be...',
      ', both perspectives offer valuable insights.'
    ]
  },
  
  // 对比句式
  contrast: {
    'While': [
      ' some people believe that..., others argue that...',
      ' it is true that..., it is also important to consider...',
      ' there are advantages to..., there are also disadvantages.'
    ],
    'Although': [
      ' this approach has its merits, there are also limitations.',
      ' some may disagree, the evidence clearly shows...',
      ' challenging, this is not impossible.'
    ],
    'Despite': [
      ' the challenges, significant progress has been made.',
      ' these concerns, there are still reasons for optimism.',
      ' its limitations, this approach offers several advantages.'
    ]
  },
  
  // 因果句式
  causeEffect: {
    'As a result': [
      ', many people now believe that...',
      ', there has been a significant increase in...',
      ', this has led to...'
    ],
    'Consequently': [
      ', it is essential to...',
      ', measures should be taken to...',
      ', this raises important questions about...'
    ],
    'Therefore': [
      ', it can be concluded that...',
      ', it is necessary to consider...',
      ', the government should...'
    ],
    'This leads to': [
      ' the conclusion that...',
      ' important implications for...',
      ' a number of consequences.'
    ]
  }
};

// 基于最后几个词的智能补全
const WORD_COMPLETIONS = {
  'I believe': [' that', ' strongly that', ' it is important'],
  'It is': [' essential to', ' important to note that', ' widely believed that', ' clear that'],
  'There are': [' several reasons for', ' many factors that', ' both advantages and disadvantages'],
  'This is': [' because', ' due to the fact that', ' evidenced by', ' particularly important'],
  'We should': [' consider', ' take into account', ' not ignore the fact that'],
  'The main': [' reason is that', ' argument is that', ' advantage is', ' disadvantage is'],
  'One of the': [' most important factors is', ' main reasons is', ' key issues is'],
  'According to': [' recent studies', ' experts', ' research', ' statistics'],
  'Studies have': [' shown that', ' revealed that', ' demonstrated that', ' indicated that'],
  'It can be': [' argued that', ' seen that', ' concluded that', ' observed that'],
  'In order to': [' achieve this', ' address this issue', ' solve this problem'],
  'On the one': [' hand, ... On the other hand, ...'],
  'Not only': [' ... but also ...', ' does this ..., but it also ...'],
  'The more': [' ..., the more ...', ' we understand, the better we can ...']
};

/**
 * 获取续写建议
 * @param {string} text - 当前文本
 * @param {number} cursorPosition - 光标位置
 * @returns {Array} 建议列表
 */
function getSuggestions(text, cursorPosition) {
  const textBeforeCursor = text.substring(0, cursorPosition);
  const suggestions = [];
  
  // 获取最后的词组（最多5个词）
  const words = textBeforeCursor.trim().split(/\s+/);
  const lastWords = words.slice(-5);
  
  // 1. 检查句式模式匹配
  for (let i = lastWords.length; i >= 1; i--) {
    const phrase = lastWords.slice(-i).join(' ');
    
    // 遍历所有模式类别
    for (const category of Object.values(CONTINUATION_PATTERNS)) {
      if (category[phrase]) {
        suggestions.push(...category[phrase].map(s => ({
          text: s,
          type: 'phrase_continuation',
          confidence: 0.9 - (0.1 * (lastWords.length - i))
        })));
      }
    }
  }
  
  // 2. 检查词组补全
  for (let i = Math.min(4, lastWords.length); i >= 1; i--) {
    const phrase = lastWords.slice(-i).join(' ');
    if (WORD_COMPLETIONS[phrase]) {
      suggestions.push(...WORD_COMPLETIONS[phrase].map(s => ({
        text: s,
        type: 'word_completion',
        confidence: 0.85
      })));
    }
  }
  
  // 3. 基于段落位置的建议
  const paragraphs = textBeforeCursor.split(/\n\n+/);
  const currentParagraph = paragraphs[paragraphs.length - 1] || '';
  const sentenceCount = (currentParagraph.match(/[.!?]+/g) || []).length;
  
  if (sentenceCount === 0 && currentParagraph.trim().length < 20) {
    // 段落开头，建议开头句式
    suggestions.push({
      text: 'In contemporary society, ',
      type: 'paragraph_start',
      confidence: 0.7
    });
    suggestions.push({
      text: 'It is widely acknowledged that ',
      type: 'paragraph_start',
      confidence: 0.7
    });
  }
  
  // 4. 去重并排序
  const uniqueSuggestions = [];
  const seen = new Set();
  
  for (const s of suggestions) {
    if (!seen.has(s.text)) {
      seen.add(s.text);
      uniqueSuggestions.push(s);
    }
  }
  
  // 按置信度排序，返回前5个
  return uniqueSuggestions
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 5);
}

/**
 * 智能自动补全（输入时触发）
 * @param {string} currentWord - 当前正在输入的词
 * @param {string} context - 上下文
 * @returns {Array} 补全建议
 */
function getAutoComplete(currentWord, context) {
  if (!currentWord || currentWord.length < 2) return [];
  
  const completions = [];
  const lowerWord = currentWord.toLowerCase();
  
  // 学术常用词补全
  const academicWords = [
    'furthermore', 'moreover', 'nevertheless', 'consequently', 'therefore',
    'however', 'although', 'whereas', 'meanwhile', 'subsequently',
    'significant', 'substantial', 'considerable', 'fundamental', 'essential',
    'demonstrate', 'illustrate', 'indicate', 'suggest', 'reveal',
    'argument', 'perspective', 'approach', 'methodology', 'framework',
    'analyze', 'examine', 'investigate', 'evaluate', 'assess',
    'implication', 'consequence', 'phenomenon', 'hypothesis', 'conclusion'
  ];
  
  for (const word of academicWords) {
    if (word.startsWith(lowerWord) && word !== lowerWord) {
      completions.push({
        word: word,
        remaining: word.substring(currentWord.length),
        confidence: 0.8 + (currentWord.length / word.length) * 0.2
      });
    }
  }
  
  return completions.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
}

// 导出 V38 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.getSuggestions = getSuggestions;
  window.WritingAI.getAutoComplete = getAutoComplete;
  window.WritingAI.CONTINUATION_PATTERNS = CONTINUATION_PATTERNS;
  window.WritingAI.WORD_COMPLETIONS = WORD_COMPLETIONS;
}

console.log('✅ V38 智能续写建议系统加载完成');

// ==================== V39: 词汇增强建议系统 ====================
/**
 * AI 写作辅助模块 - 词汇增强
 * 功能：建议更高级、更学术的词汇替换简单词汇
 */

// 简单词 -> 高级替换词映射
const VOCABULARY_UPGRADES = {
  // 动词替换
  'show': {
    basic: ['display', 'present', 'reveal'],
    academic: ['demonstrate', 'illustrate', 'manifest', 'exhibit', 'elucidate'],
    context: {
      data: ['indicate', 'suggest', 'reflect'],
      research: ['reveal', 'uncover', 'expose'],
      argument: ['substantiate', 'corroborate', 'validate']
    }
  },
  'think': {
    basic: ['believe', 'consider', 'feel'],
    academic: ['contend', 'posit', 'maintain', 'assert', 'hypothesize'],
    context: {
      opinion: ['argue', 'hold', 'submit'],
      analysis: ['surmise', 'conjecture', 'postulate']
    }
  },
  'say': {
    basic: ['state', 'mention', 'tell'],
    academic: ['assert', 'contend', 'proclaim', 'articulate', 'expound'],
    context: {
      quote: ['declare', 'affirm', 'pronounce'],
      argument: ['argue', 'claim', 'maintain']
    }
  },
  'get': {
    basic: ['obtain', 'receive', 'acquire'],
    academic: ['procure', 'attain', 'secure', 'garner'],
    context: {
      results: ['yield', 'derive', 'elicit'],
      knowledge: ['gain', 'glean', 'assimilate']
    }
  },
  'make': {
    basic: ['create', 'produce', 'build'],
    academic: ['construct', 'fabricate', 'generate', 'formulate', 'devise'],
    context: {
      decision: ['render', 'arrive at'],
      argument: ['advance', 'put forth']
    }
  },
  'use': {
    basic: ['apply', 'employ', 'utilize'],
    academic: ['leverage', 'harness', 'exploit', 'deploy'],
    context: {
      method: ['implement', 'adopt', 'incorporate'],
      resource: ['avail oneself of', 'draw upon']
    }
  },
  'help': {
    basic: ['assist', 'aid', 'support'],
    academic: ['facilitate', 'expedite', 'foster', 'bolster'],
    context: {
      understanding: ['elucidate', 'clarify'],
      progress: ['advance', 'promote', 'further']
    }
  },
  'change': {
    basic: ['alter', 'modify', 'adjust'],
    academic: ['transform', 'revolutionize', 'reconfigure', 'metamorphose'],
    context: {
      slight: ['tweak', 'amend', 'revise'],
      major: ['overhaul', 'restructure']
    }
  },
  
  // 形容词替换
  'good': {
    basic: ['great', 'excellent', 'fine'],
    academic: ['beneficial', 'advantageous', 'favorable', 'propitious', 'auspicious'],
    context: {
      quality: ['superior', 'exceptional', 'exemplary'],
      outcome: ['optimal', 'desirable', 'salutary']
    }
  },
  'bad': {
    basic: ['poor', 'negative', 'harmful'],
    academic: ['detrimental', 'deleterious', 'pernicious', 'adverse', 'inimical'],
    context: {
      effect: ['baneful', 'noxious', 'injurious'],
      quality: ['substandard', 'deficient', 'inadequate']
    }
  },
  'big': {
    basic: ['large', 'huge', 'great'],
    academic: ['substantial', 'considerable', 'significant', 'extensive', 'immense'],
    context: {
      importance: ['paramount', 'momentous', 'pivotal'],
      size: ['vast', 'colossal', 'monumental']
    }
  },
  'small': {
    basic: ['little', 'tiny', 'minor'],
    academic: ['negligible', 'marginal', 'minimal', 'modest', 'incremental'],
    context: {
      importance: ['trivial', 'inconsequential', 'peripheral'],
      amount: ['scant', 'meager', 'paltry']
    }
  },
  'important': {
    basic: ['significant', 'major', 'key'],
    academic: ['crucial', 'pivotal', 'paramount', 'indispensable', 'imperative'],
    context: {
      urgency: ['pressing', 'critical', 'vital'],
      relevance: ['pertinent', 'germane', 'salient']
    }
  },
  'different': {
    basic: ['various', 'diverse', 'distinct'],
    academic: ['disparate', 'divergent', 'heterogeneous', 'multifarious'],
    context: {
      comparison: ['dissimilar', 'contrasting', 'incongruous']
    }
  },
  
  // 副词替换
  'very': {
    basic: ['really', 'extremely', 'highly'],
    academic: ['exceedingly', 'remarkably', 'extraordinarily', 'profoundly'],
    note: '建议用更具体的副词或直接用更强的形容词'
  },
  'also': {
    basic: ['too', 'as well'],
    academic: ['furthermore', 'moreover', 'additionally', 'likewise'],
    context: {
      emphasis: ['indeed', 'in fact']
    }
  },
  'but': {
    basic: ['however', 'yet', 'still'],
    academic: ['nevertheless', 'nonetheless', 'notwithstanding', 'conversely'],
    context: {
      contrast: ['on the contrary', 'in contrast'],
      concession: ['albeit', 'although']
    }
  },
  
  // 名词替换
  'problem': {
    basic: ['issue', 'difficulty', 'challenge'],
    academic: ['predicament', 'dilemma', 'conundrum', 'quandary', 'impediment'],
    context: {
      social: ['phenomenon', 'concern'],
      technical: ['obstacle', 'constraint', 'limitation']
    }
  },
  'result': {
    basic: ['outcome', 'effect', 'consequence'],
    academic: ['ramification', 'repercussion', 'implication', 'upshot'],
    context: {
      research: ['finding', 'conclusion'],
      action: ['aftermath', 'byproduct']
    }
  },
  'way': {
    basic: ['method', 'approach', 'means'],
    academic: ['methodology', 'mechanism', 'modality', 'avenue', 'paradigm'],
    context: {
      solution: ['stratagem', 'tactic'],
      behavior: ['manner', 'fashion', 'mode']
    }
  },
  'thing': {
    basic: ['item', 'object', 'matter'],
    academic: ['phenomenon', 'aspect', 'element', 'factor', 'entity'],
    note: '建议使用更具体的名词'
  }
};

/**
 * 获取词汇升级建议
 * @param {string} word - 原始词汇
 * @param {string} context - 上下文（可选）
 * @returns {Object} 替换建议
 */
function getVocabularyUpgrade(word, context = '') {
  const lowerWord = word.toLowerCase();
  const upgrades = VOCABULARY_UPGRADES[lowerWord];
  
  if (!upgrades) {
    return null;
  }
  
  const result = {
    original: word,
    basic: upgrades.basic || [],
    academic: upgrades.academic || [],
    contextual: [],
    note: upgrades.note || null
  };
  
  // 根据上下文提供更精确的建议
  if (context && upgrades.context) {
    const lowerContext = context.toLowerCase();
    for (const [key, suggestions] of Object.entries(upgrades.context)) {
      if (lowerContext.includes(key)) {
        result.contextual = suggestions;
        break;
      }
    }
  }
  
  return result;
}

/**
 * 扫描文本中可升级的词汇
 * @param {string} text - 待检查的文本
 * @returns {Array} 可升级词汇列表
 */
function scanForUpgrades(text) {
  const upgrades = [];
  const words = text.match(/\b\w+\b/g) || [];
  const seenWords = new Set();
  
  words.forEach((word, index) => {
    const lowerWord = word.toLowerCase();
    if (seenWords.has(lowerWord)) return;
    
    if (VOCABULARY_UPGRADES[lowerWord]) {
      // 获取上下文（前后10个词）
      const contextStart = Math.max(0, index - 10);
      const contextEnd = Math.min(words.length, index + 10);
      const context = words.slice(contextStart, contextEnd).join(' ');
      
      const upgrade = getVocabularyUpgrade(word, context);
      if (upgrade) {
        // 找到词在原文中的位置
        const regex = new RegExp('\\b' + word + '\\b', 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
          upgrades.push({
            ...upgrade,
            position: match.index,
            endPosition: match.index + word.length
          });
        }
        seenWords.add(lowerWord);
      }
    }
  });
  
  return upgrades;
}

/**
 * 获取词汇多样性分数
 * @param {string} text - 文本
 * @returns {Object} 词汇分析结果
 */
function analyzeVocabularyDiversity(text) {
  const words = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  const uniqueWords = new Set(words);
  const totalWords = words.length;
  const uniqueCount = uniqueWords.size;
  
  // 计算简单词使用频率
  let simpleWordCount = 0;
  const simpleWordsUsed = [];
  
  words.forEach(word => {
    if (VOCABULARY_UPGRADES[word]) {
      simpleWordCount++;
      if (!simpleWordsUsed.includes(word)) {
        simpleWordsUsed.push(word);
      }
    }
  });
  
  return {
    totalWords,
    uniqueWords: uniqueCount,
    diversityRatio: uniqueCount / totalWords,
    simpleWordRatio: simpleWordCount / totalWords,
    simpleWordsUsed,
    score: Math.round((1 - simpleWordCount / totalWords) * 100),
    suggestion: simpleWordCount > totalWords * 0.1 
      ? '建议替换一些简单词汇以提升文章学术性'
      : '词汇使用良好'
  };
}

// 导出 V39 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.getVocabularyUpgrade = getVocabularyUpgrade;
  window.WritingAI.scanForUpgrades = scanForUpgrades;
  window.WritingAI.analyzeVocabularyDiversity = analyzeVocabularyDiversity;
  window.WritingAI.VOCABULARY_UPGRADES = VOCABULARY_UPGRADES;
}

console.log('✅ V39 词汇增强建议系统加载完成');

// ==================== V40: 学术短语推荐系统 ====================
/**
 * AI 写作辅助模块 - 学术短语库
 * 功能：根据写作场景推荐合适的学术表达
 */

const ACADEMIC_PHRASES = {
  // 引入主题
  introduction: {
    general: [
      'In recent years, there has been growing interest in...',
      'It is widely acknowledged that...',
      'One of the most significant issues facing society today is...',
      'The question of whether... has sparked considerable debate.',
      'This essay will examine the extent to which...'
    ],
    thesis: [
      'This essay argues that...',
      'The central thesis of this paper is...',
      'This analysis will demonstrate that...',
      'The primary contention of this work is...',
      'I will endeavor to show that...'
    ],
    background: [
      'To fully understand this issue, it is necessary to...',
      'Historically, the concept of... has evolved significantly.',
      'The origins of this debate can be traced back to...',
      'Prior to examining..., it is essential to establish...'
    ]
  },
  
  // 表达观点
  opinion: {
    strong: [
      'It is my firm conviction that...',
      'I strongly maintain that...',
      'There can be little doubt that...',
      'The evidence compellingly suggests that...',
      'It is abundantly clear that...'
    ],
    moderate: [
      'It would appear that...',
      'On balance, it seems that...',
      'The available evidence suggests that...',
      'It is reasonable to conclude that...',
      'One could argue that...'
    ],
    tentative: [
      'It might be suggested that...',
      'There is some evidence to support the view that...',
      'It is possible that...',
      'One interpretation is that...'
    ]
  },
  
  // 添加支持论据
  support: {
    evidence: [
      'Research conducted by... demonstrates that...',
      'According to a study published in...',
      'Empirical evidence suggests that...',
      'Statistical data from... reveals that...',
      'A compelling illustration of this can be found in...'
    ],
    example: [
      'A pertinent example of this phenomenon is...',
      'This point is exemplified by...',
      'To illustrate this further, consider...',
      'A case in point is...',
      'This is evident in the case of...'
    ],
    reasoning: [
      'The rationale behind this is...',
      'This can be attributed to...',
      'The underlying reason for this is...',
      'This phenomenon can be explained by...',
      'The logic of this argument rests on...'
    ]
  },
  
  // 对比和转折
  contrast: {
    however: [
      'Nevertheless, it must be acknowledged that...',
      'Notwithstanding the above, there are valid concerns about...',
      'However, a critical examination reveals that...',
      'Despite this, one cannot overlook the fact that...',
      'Conversely, it could be argued that...'
    ],
    comparison: [
      'In contrast to..., ... demonstrates a different pattern.',
      'While... emphasizes..., ... takes a different approach.',
      'Unlike..., which..., ... tends to...',
      'A stark contrast can be drawn between... and...',
      'Whereas... focuses on..., ... prioritizes...'
    ],
    concession: [
      'Admittedly, there is some merit in the argument that...',
      'While it is true that..., this does not negate...',
      'Although... may be valid to some extent...',
      'Granted that..., it remains the case that...',
      'It would be remiss not to acknowledge that...'
    ]
  },
  
  // 因果关系
  causation: {
    cause: [
      'This can be attributed to several factors, including...',
      'The primary catalyst for this was...',
      'This phenomenon stems from...',
      'The root cause of this issue lies in...',
      'This development was precipitated by...'
    ],
    effect: [
      'As a consequence of this...',
      'This has far-reaching implications for...',
      'The ramifications of this extend to...',
      'This has given rise to...',
      'The net effect of this has been...'
    ],
    relationship: [
      'There exists a strong correlation between... and...',
      'A causal link has been established between...',
      '... is inextricably linked to...',
      'The relationship between... and... is multifaceted.',
      '... and ... are mutually reinforcing.'
    ]
  },
  
  // 强调和总结
  emphasis: {
    importance: [
      'It is crucial to recognize that...',
      'Of paramount importance is the fact that...',
      'What is particularly significant here is...',
      'This underscores the importance of...',
      'The significance of this cannot be overstated.'
    ],
    clarity: [
      'To put it more precisely...',
      'In other words...',
      'What this essentially means is...',
      'To be more specific...',
      'In essence, this suggests that...'
    ]
  },
  
  // 结论
  conclusion: {
    summary: [
      'In light of the evidence presented...',
      'Taking all factors into consideration...',
      'On the basis of the foregoing analysis...',
      'Having examined the various aspects of this issue...',
      'In summation, the arguments presented herein suggest that...'
    ],
    recommendation: [
      'It is therefore recommended that...',
      'Policy makers should consider...',
      'Future research should focus on...',
      'Steps must be taken to address...',
      'A concerted effort is needed to...'
    ],
    final: [
      'Ultimately, the evidence supports the conclusion that...',
      'In the final analysis, it is clear that...',
      'All things considered, it can be concluded that...',
      'The weight of evidence points to the conclusion that...',
      'To conclude, this essay has demonstrated that...'
    ]
  },
  
  // 过渡衔接
  transition: {
    addition: [
      'Furthermore, it is worth noting that...',
      'Moreover, an additional consideration is...',
      'In addition to the above...',
      'Equally important is the fact that...',
      'Another crucial aspect to consider is...'
    ],
    sequence: [
      'First and foremost...',
      'Subsequently...',
      'Following this...',
      'At this juncture...',
      'Finally, and perhaps most importantly...'
    ],
    reference: [
      'As previously mentioned...',
      'In connection with the foregoing...',
      'With reference to...',
      'Returning to the earlier point about...',
      'As discussed in the preceding section...'
    ]
  }
};

/**
 * 根据写作位置和意图获取短语建议
 * @param {string} intent - 写作意图类型
 * @param {string} subType - 子类型（可选）
 * @returns {Array} 推荐短语列表
 */
function getAcademicPhrases(intent, subType = null) {
  const category = ACADEMIC_PHRASES[intent];
  if (!category) return [];
  
  if (subType && category[subType]) {
    return category[subType];
  }
  
  // 返回该类别下所有短语
  let allPhrases = [];
  Object.values(category).forEach(phrases => {
    allPhrases = allPhrases.concat(phrases);
  });
  return allPhrases;
}

/**
 * 智能短语推荐 - 根据上下文分析适合的短语
 * @param {string} text - 当前已写的文本
 * @param {string} cursorContext - 光标附近的文本
 * @returns {Object} 推荐结果
 */
function suggestAcademicPhrases(text, cursorContext = '') {
  const analysis = {
    position: 'body',
    intent: 'support',
    suggestions: []
  };
  
  const textLength = text.length;
  const lowerText = text.toLowerCase();
  const lowerContext = cursorContext.toLowerCase();
  
  // 判断写作位置
  if (textLength < 200) {
    analysis.position = 'introduction';
    analysis.intent = 'introduction';
    analysis.suggestions = getAcademicPhrases('introduction', 'general')
      .concat(getAcademicPhrases('introduction', 'thesis'));
  } else if (textLength > 1500 || lowerText.includes('in conclusion') || 
             lowerContext.includes('finally') || lowerContext.includes('to sum')) {
    analysis.position = 'conclusion';
    analysis.intent = 'conclusion';
    analysis.suggestions = getAcademicPhrases('conclusion');
  } else {
    // 主体段落 - 根据上下文判断意图
    if (lowerContext.includes('because') || lowerContext.includes('due to') ||
        lowerContext.includes('reason') || lowerContext.includes('cause')) {
      analysis.intent = 'causation';
      analysis.suggestions = getAcademicPhrases('causation');
    } else if (lowerContext.includes('however') || lowerContext.includes('but') ||
               lowerContext.includes('although') || lowerContext.includes('despite')) {
      analysis.intent = 'contrast';
      analysis.suggestions = getAcademicPhrases('contrast');
    } else if (lowerContext.includes('for example') || lowerContext.includes('such as') ||
               lowerContext.includes('instance')) {
      analysis.intent = 'support';
      analysis.suggestions = getAcademicPhrases('support', 'example');
    } else if (lowerContext.includes('i believe') || lowerContext.includes('i think') ||
               lowerContext.includes('opinion')) {
      analysis.intent = 'opinion';
      analysis.suggestions = getAcademicPhrases('opinion');
    } else if (lowerContext.includes('important') || lowerContext.includes('significant') ||
               lowerContext.includes('crucial')) {
      analysis.intent = 'emphasis';
      analysis.suggestions = getAcademicPhrases('emphasis');
    } else {
      // 默认提供过渡短语
      analysis.intent = 'transition';
      analysis.suggestions = getAcademicPhrases('transition', 'addition');
    }
  }
  
  // 限制返回数量
  analysis.suggestions = analysis.suggestions.slice(0, 8);
  
  return analysis;
}

/**
 * 检测文本中是否使用了学术短语
 * @param {string} text - 待检查文本
 * @returns {Object} 使用情况分析
 */
function analyzeAcademicPhraseUsage(text) {
  const lowerText = text.toLowerCase();
  const usedPhrases = [];
  let totalPhrases = 0;
  
  // 扁平化短语库
  const checkPhrases = (obj, path = '') => {
    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        value.forEach(phrase => {
          totalPhrases++;
          const phraseStart = phrase.toLowerCase().split('...')[0].trim();
          if (phraseStart.length > 5 && lowerText.includes(phraseStart)) {
            usedPhrases.push({
              phrase,
              category: path ? `${path}.${key}` : key
            });
          }
        });
      } else if (typeof value === 'object') {
        checkPhrases(value, path ? `${path}.${key}` : key);
      }
    }
  };
  
  checkPhrases(ACADEMIC_PHRASES);
  
  return {
    usedCount: usedPhrases.length,
    usedPhrases,
    coverage: (usedPhrases.length / (text.split('.').length - 1)) * 100,
    suggestion: usedPhrases.length < 3 
      ? '建议增加学术短语的使用以提升文章专业性'
      : '学术短语使用情况良好'
  };
}

// 导出 V40 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.getAcademicPhrases = getAcademicPhrases;
  window.WritingAI.suggestAcademicPhrases = suggestAcademicPhrases;
  window.WritingAI.analyzeAcademicPhraseUsage = analyzeAcademicPhraseUsage;
  window.WritingAI.ACADEMIC_PHRASES = ACADEMIC_PHRASES;
}

console.log('✅ V40 学术短语推荐系统加载完成');

// ==================== V41: 句式多样化分析系统 ====================
/**
 * AI 写作辅助模块 - 句式分析与多样化
 * 功能：分析句子结构，建议多样化改写
 */

// 句式模板库
const SENTENCE_PATTERNS = {
  // 强调句型
  emphasis: [
    {
      name: 'It is...that (强调句)',
      pattern: 'It is [focus] that [rest of sentence]',
      example: 'It is education that plays a crucial role in development.',
      usage: '强调某个特定元素'
    },
    {
      name: 'What...is (主语从句强调)',
      pattern: 'What [subject] [verb] is [emphasis]',
      example: 'What truly matters is the quality of education.',
      usage: '强调重要性'
    },
    {
      name: 'Not only...but also',
      pattern: 'Not only [point 1], but [subject] also [point 2]',
      example: 'Not only does technology improve efficiency, but it also creates new opportunities.',
      usage: '双重强调'
    },
    {
      name: 'Only by/when/if',
      pattern: 'Only by/when/if [condition] can [subject] [result]',
      example: 'Only by addressing the root causes can we achieve lasting change.',
      usage: '条件强调'
    }
  ],
  
  // 对比句型
  contrast: [
    {
      name: 'While...主句',
      pattern: 'While [concession], [main point]',
      example: 'While technology offers many benefits, its drawbacks cannot be ignored.',
      usage: '转折对比'
    },
    {
      name: 'Unlike...which...',
      pattern: 'Unlike [A] which [characteristic], [B] [different characteristic]',
      example: 'Unlike traditional methods which are time-consuming, modern approaches are highly efficient.',
      usage: '直接对比'
    },
    {
      name: 'Whereas',
      pattern: '[Point A], whereas [contrasting point B]',
      example: 'Some argue for strict regulations, whereas others advocate for market freedom.',
      usage: '平行对比'
    },
    {
      name: 'Rather than...prefer',
      pattern: 'Rather than [option A], [subject] should [option B]',
      example: 'Rather than focusing solely on grades, students should develop critical thinking.',
      usage: '选择对比'
    }
  ],
  
  // 因果句型
  causation: [
    {
      name: '分词作原因状语',
      pattern: '[V-ing], [subject] [result]',
      example: 'Having witnessed the effects firsthand, researchers recommend immediate action.',
      usage: '表示原因'
    },
    {
      name: 'Such...that',
      pattern: '[Subject] is such [adj noun] that [consequence]',
      example: 'The problem is of such magnitude that it requires global cooperation.',
      usage: '程度因果'
    },
    {
      name: 'Given that',
      pattern: 'Given that [premise], it follows that [conclusion]',
      example: 'Given that resources are limited, prioritization becomes essential.',
      usage: '逻辑推导'
    },
    {
      name: 'The fact that...leads to',
      pattern: 'The fact that [observation] leads to [consequence]',
      example: 'The fact that population is aging leads to significant economic challenges.',
      usage: '事实推论'
    }
  ],
  
  // 复杂主语句型
  complex_subject: [
    {
      name: '主语从句',
      pattern: 'That [clause] is [adjective]',
      example: 'That education should be accessible to all is beyond dispute.',
      usage: '陈述普遍认知'
    },
    {
      name: 'Whether引导主语从句',
      pattern: 'Whether [option A] or [option B] depends on [factor]',
      example: 'Whether this approach succeeds or fails depends on implementation.',
      usage: '表示选择判断'
    },
    {
      name: '形式主语it',
      pattern: 'It is [adjective] that [clause]',
      example: 'It is essential that governments take immediate action.',
      usage: '评价性陈述'
    }
  ],
  
  // 定语从句句型
  relative: [
    {
      name: '非限制性定语从句',
      pattern: '[Noun], which [additional info], [rest]',
      example: 'Technology, which has evolved rapidly, continues to reshape society.',
      usage: '补充说明'
    },
    {
      name: '介词+which/whom',
      pattern: '[Noun] [prep] which [clause]',
      example: 'The extent to which technology impacts daily life is remarkable.',
      usage: '正式书面表达'
    }
  ],
  
  // 倒装句型
  inversion: [
    {
      name: '否定副词倒装',
      pattern: 'Never/Rarely/Seldom + aux + subject + verb',
      example: 'Rarely has such a significant transformation occurred so quickly.',
      usage: '强调罕见性'
    },
    {
      name: 'So/Such倒装',
      pattern: 'So [adj] is [noun] that [consequence]',
      example: 'So profound is the impact that it cannot be reversed.',
      usage: '强调程度'
    },
    {
      name: 'Not until倒装',
      pattern: 'Not until [time/condition] did [subject] [verb]',
      example: 'Not until the evidence emerged did the true extent become clear.',
      usage: '强调时间或条件'
    }
  ],
  
  // 条件句型
  conditional: [
    {
      name: '虚拟条件句',
      pattern: 'Were [subject] to [verb], [result]',
      example: 'Were governments to implement stricter policies, emissions would decrease.',
      usage: '假设情况'
    },
    {
      name: 'Provided/Providing that',
      pattern: 'Provided that [condition], [result]',
      example: 'Provided that resources are allocated efficiently, the goal is achievable.',
      usage: '条件假设'
    }
  ]
};

/**
 * 分析句子结构
 * @param {string} sentence - 单个句子
 * @returns {Object} 句子分析结果
 */
function analyzeSentenceStructure(sentence) {
  const analysis = {
    length: sentence.split(/\s+/).length,
    type: 'simple',
    hasSubordinate: false,
    hasParticiple: false,
    startsWithSubject: true,
    complexity: 'low'
  };
  
  const lowerSentence = sentence.toLowerCase();
  
  // 检测从句标记词
  const subordinates = ['that', 'which', 'who', 'whom', 'whose', 'when', 'where', 'while', 
                        'although', 'because', 'since', 'if', 'unless', 'whereas'];
  subordinates.forEach(word => {
    if (lowerSentence.includes(' ' + word + ' ')) {
      analysis.hasSubordinate = true;
      analysis.type = 'complex';
    }
  });
  
  // 检测分词结构
  if (/\b\w+ing\b,/.test(sentence) || /\b\w+ed\b,/.test(sentence)) {
    analysis.hasParticiple = true;
    analysis.type = 'complex';
  }
  
  // 检测是否以主语开头
  const starterWords = ['however', 'therefore', 'moreover', 'furthermore', 'consequently',
                        'although', 'while', 'because', 'since', 'if', 'when'];
  starterWords.forEach(word => {
    if (lowerSentence.startsWith(word)) {
      analysis.startsWithSubject = false;
    }
  });
  
  // 评估复杂度
  if (analysis.length > 25 && analysis.hasSubordinate) {
    analysis.complexity = 'high';
  } else if (analysis.length > 15 || analysis.hasSubordinate) {
    analysis.complexity = 'medium';
  }
  
  return analysis;
}

/**
 * 分析整篇文章的句式多样性
 * @param {string} text - 完整文本
 * @returns {Object} 多样性分析报告
 */
function analyzeSentenceVariety(text) {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const report = {
    totalSentences: sentences.length,
    averageLength: 0,
    shortSentences: 0,      // < 10 words
    mediumSentences: 0,     // 10-20 words
    longSentences: 0,       // > 20 words
    complexSentences: 0,
    subjectStartRatio: 0,
    varietyScore: 0,
    issues: [],
    suggestions: []
  };
  
  let totalWords = 0;
  let subjectStarts = 0;
  
  sentences.forEach(sentence => {
    const analysis = analyzeSentenceStructure(sentence);
    totalWords += analysis.length;
    
    if (analysis.length < 10) report.shortSentences++;
    else if (analysis.length <= 20) report.mediumSentences++;
    else report.longSentences++;
    
    if (analysis.type === 'complex') report.complexSentences++;
    if (analysis.startsWithSubject) subjectStarts++;
  });
  
  report.averageLength = Math.round(totalWords / sentences.length);
  report.subjectStartRatio = subjectStarts / sentences.length;
  
  // 计算多样性分数
  const lengthVariety = 1 - Math.abs(0.33 - report.shortSentences/sentences.length) 
                         - Math.abs(0.5 - report.mediumSentences/sentences.length)
                         - Math.abs(0.17 - report.longSentences/sentences.length);
  
  const complexityVariety = report.complexSentences / sentences.length;
  const startVariety = 1 - report.subjectStartRatio;
  
  report.varietyScore = Math.round((lengthVariety * 40 + complexityVariety * 30 + startVariety * 30));
  
  // 生成问题和建议
  if (report.subjectStartRatio > 0.7) {
    report.issues.push('过多句子以主语开头，缺乏变化');
    report.suggestions.push('尝试使用状语从句、分词结构或倒装句开头');
  }
  
  if (report.shortSentences > sentences.length * 0.4) {
    report.issues.push('短句过多，文章可能显得零碎');
    report.suggestions.push('尝试合并相关短句，使用连接词构建复合句');
  }
  
  if (report.complexSentences < sentences.length * 0.2) {
    report.issues.push('复杂句式较少，文章层次感不足');
    report.suggestions.push('适当增加从句、分词结构等复杂句式');
  }
  
  if (report.averageLength < 12) {
    report.issues.push('平均句长偏短');
    report.suggestions.push('增加修饰成分，丰富句子内容');
  } else if (report.averageLength > 25) {
    report.issues.push('平均句长偏长，可能影响可读性');
    report.suggestions.push('适当拆分长句，保持阅读节奏');
  }
  
  return report;
}

/**
 * 获取句式改写建议
 * @param {string} sentence - 需要改写的句子
 * @returns {Array} 改写建议
 */
function getSentenceVariations(sentence) {
  const variations = [];
  const words = sentence.split(/\s+/);
  
  // 检测简单主谓宾结构，建议使用强调句
  if (words.length < 15 && !sentence.toLowerCase().startsWith('it is')) {
    variations.push({
      type: 'emphasis',
      suggestion: `可以改写为强调句：It is ... that ...`,
      pattern: SENTENCE_PATTERNS.emphasis[0]
    });
  }
  
  // 如果句子表达观点，建议使用主语从句
  if (sentence.toLowerCase().includes('i think') || 
      sentence.toLowerCase().includes('i believe')) {
    variations.push({
      type: 'formal',
      suggestion: '避免第一人称，可改写为：It is believed/argued that...',
      pattern: SENTENCE_PATTERNS.complex_subject[2]
    });
  }
  
  // 建议添加从句
  if (words.length < 12 && !sentence.includes(',')) {
    variations.push({
      type: 'complex',
      suggestion: '可以添加 which/who 从句补充信息',
      pattern: SENTENCE_PATTERNS.relative[0]
    });
  }
  
  // 随机推荐高级句型
  const allPatterns = Object.values(SENTENCE_PATTERNS).flat();
  const randomPattern = allPatterns[Math.floor(Math.random() * allPatterns.length)];
  variations.push({
    type: 'alternative',
    suggestion: `可以尝试使用 "${randomPattern.name}" 句型`,
    pattern: randomPattern
  });
  
  return variations;
}

// 导出 V41 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.analyzeSentenceStructure = analyzeSentenceStructure;
  window.WritingAI.analyzeSentenceVariety = analyzeSentenceVariety;
  window.WritingAI.getSentenceVariations = getSentenceVariations;
  window.WritingAI.SENTENCE_PATTERNS = SENTENCE_PATTERNS;
}

console.log('✅ V41 句式多样化分析系统加载完成');

// ==================== V42: 实时写作反馈系统 ====================
/**
 * AI 写作辅助模块 - 实时反馈
 * 功能：在用户输入时提供即时反馈和建议
 */

// 反馈类型配置
const FEEDBACK_CONFIG = {
  debounceMs: 500,        // 防抖延迟
  minTextLength: 20,      // 最小触发长度
  maxSuggestions: 5,      // 最大建议数
  enableSpelling: true,
  enableGrammar: true,
  enableStyle: true,
  enableVocabulary: true
};

// 写作目标跟踪
const WRITING_GOALS = {
  toefl_integrated: {
    minWords: 150,
    maxWords: 225,
    targetParagraphs: 3,
    timeLimit: 20
  },
  toefl_independent: {
    minWords: 300,
    maxWords: 400,
    targetParagraphs: 5,
    timeLimit: 30
  },
  gre_issue: {
    minWords: 500,
    maxWords: 700,
    targetParagraphs: 5,
    timeLimit: 30
  },
  gre_argument: {
    minWords: 400,
    maxWords: 600,
    targetParagraphs: 5,
    timeLimit: 30
  },
  ielts_task1: {
    minWords: 150,
    maxWords: 200,
    targetParagraphs: 4,
    timeLimit: 20
  },
  ielts_task2: {
    minWords: 250,
    maxWords: 300,
    targetParagraphs: 5,
    timeLimit: 40
  }
};

/**
 * 创建实时反馈管理器
 * @returns {Object} 反馈管理器实例
 */
function createFeedbackManager() {
  let lastText = '';
  let debounceTimer = null;
  let feedbackHistory = [];
  
  return {
    config: { ...FEEDBACK_CONFIG },
    
    /**
     * 更新配置
     */
    updateConfig(newConfig) {
      Object.assign(this.config, newConfig);
    },
    
    /**
     * 触发实时分析
     * @param {string} text - 当前文本
     * @param {Object} options - 选项
     */
    analyze(text, options = {}) {
      return new Promise((resolve) => {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        
        debounceTimer = setTimeout(() => {
          const feedback = this.performAnalysis(text, options);
          feedbackHistory.push({
            timestamp: Date.now(),
            feedback
          });
          resolve(feedback);
        }, this.config.debounceMs);
      });
    },
    
    /**
     * 执行综合分析
     */
    performAnalysis(text, options) {
      const feedback = {
        timestamp: Date.now(),
        wordCount: 0,
        paragraphCount: 0,
        progress: {},
        issues: [],
        suggestions: [],
        scores: {},
        highlights: []
      };
      
      if (text.length < this.config.minTextLength) {
        return feedback;
      }
      
      // 基础统计
      const words = text.trim().split(/\s+/).filter(w => w.length > 0);
      feedback.wordCount = words.length;
      feedback.paragraphCount = text.split(/\n\n+/).filter(p => p.trim().length > 0).length;
      
      // 进度追踪
      if (options.writingType && WRITING_GOALS[options.writingType]) {
        const goal = WRITING_GOALS[options.writingType];
        feedback.progress = {
          wordProgress: Math.min(100, Math.round(feedback.wordCount / goal.minWords * 100)),
          paragraphProgress: Math.round(feedback.paragraphCount / goal.targetParagraphs * 100),
          isWithinRange: feedback.wordCount >= goal.minWords && feedback.wordCount <= goal.maxWords,
          wordsNeeded: Math.max(0, goal.minWords - feedback.wordCount),
          wordsOver: Math.max(0, feedback.wordCount - goal.maxWords)
        };
      }
      
      // 拼写检查
      if (this.config.enableSpelling && typeof checkTextSpelling === 'function') {
        const spellingResults = checkTextSpelling(text);
        spellingResults.forEach(error => {
          feedback.issues.push({
            type: 'spelling',
            severity: 'error',
            message: `拼写错误: "${error.word}"`,
            suggestion: error.suggestions.join(', '),
            position: error.position
          });
          feedback.highlights.push({
            start: error.position,
            end: error.position + error.word.length,
            type: 'spelling-error'
          });
        });
      }
      
      // 语法检查
      if (this.config.enableGrammar && typeof checkGrammar === 'function') {
        const grammarResults = checkGrammar(text);
        grammarResults.forEach(error => {
          feedback.issues.push({
            type: 'grammar',
            severity: error.severity || 'warning',
            message: error.message,
            suggestion: error.correction,
            position: error.position
          });
          feedback.highlights.push({
            start: error.position,
            end: error.endPosition,
            type: 'grammar-error'
          });
        });
      }
      
      // 词汇建议
      if (this.config.enableVocabulary && typeof scanForUpgrades === 'function') {
        const upgrades = scanForUpgrades(text);
        upgrades.slice(0, 3).forEach(upgrade => {
          feedback.suggestions.push({
            type: 'vocabulary',
            message: `"${upgrade.original}" 可替换为更高级词汇`,
            options: upgrade.academic.slice(0, 3)
          });
          feedback.highlights.push({
            start: upgrade.position,
            end: upgrade.endPosition,
            type: 'vocabulary-upgrade'
          });
        });
      }
      
      // 句式分析
      if (this.config.enableStyle && typeof analyzeSentenceVariety === 'function') {
        const varietyReport = analyzeSentenceVariety(text);
        feedback.scores.sentenceVariety = varietyReport.varietyScore;
        varietyReport.issues.forEach(issue => {
          feedback.suggestions.push({
            type: 'style',
            message: issue
          });
        });
      }
      
      // 计算综合分数
      feedback.scores.overall = this.calculateOverallScore(feedback);
      
      // 限制反馈数量
      feedback.issues = feedback.issues.slice(0, this.config.maxSuggestions);
      feedback.suggestions = feedback.suggestions.slice(0, this.config.maxSuggestions);
      
      return feedback;
    },
    
    /**
     * 计算综合分数
     */
    calculateOverallScore(feedback) {
      let score = 100;
      
      // 扣分项
      score -= feedback.issues.filter(i => i.type === 'spelling').length * 2;
      score -= feedback.issues.filter(i => i.type === 'grammar').length * 3;
      
      // 加分项
      if (feedback.scores.sentenceVariety > 60) {
        score += 5;
      }
      
      // 进度奖励
      if (feedback.progress.wordProgress >= 100) {
        score += 5;
      }
      
      return Math.max(0, Math.min(100, score));
    },
    
    /**
     * 获取反馈历史
     */
    getHistory() {
      return feedbackHistory.slice(-10);
    },
    
    /**
     * 清除历史
     */
    clearHistory() {
      feedbackHistory = [];
    }
  };
}

/**
 * 生成实时提示消息
 * @param {Object} feedback - 反馈对象
 * @returns {Object} 格式化的提示信息
 */
function formatFeedbackMessage(feedback) {
  const messages = {
    primary: '',
    secondary: [],
    status: 'normal'  // normal, warning, error, success
  };
  
  // 主要信息
  if (feedback.progress.wordsNeeded > 0) {
    messages.primary = `还需要 ${feedback.progress.wordsNeeded} 词达到最低要求`;
    messages.status = 'warning';
  } else if (feedback.progress.wordsOver > 0) {
    messages.primary = `已超出 ${feedback.progress.wordsOver} 词，建议精简`;
    messages.status = 'warning';
  } else if (feedback.progress.wordProgress >= 100) {
    messages.primary = `字数达标 ✓ (${feedback.wordCount} 词)`;
    messages.status = 'success';
  } else {
    messages.primary = `已写 ${feedback.wordCount} 词`;
  }
  
  // 次要信息
  if (feedback.issues.length > 0) {
    const spellingCount = feedback.issues.filter(i => i.type === 'spelling').length;
    const grammarCount = feedback.issues.filter(i => i.type === 'grammar').length;
    
    if (spellingCount > 0) {
      messages.secondary.push(`${spellingCount} 处拼写问题`);
    }
    if (grammarCount > 0) {
      messages.secondary.push(`${grammarCount} 处语法问题`);
    }
    messages.status = 'error';
  }
  
  if (feedback.suggestions.length > 0) {
    messages.secondary.push(`${feedback.suggestions.length} 条改进建议`);
  }
  
  return messages;
}

/**
 * 创建写作进度追踪器
 * @param {string} writingType - 写作类型
 * @returns {Object} 进度追踪器
 */
function createProgressTracker(writingType) {
  const goal = WRITING_GOALS[writingType] || WRITING_GOALS.toefl_independent;
  const startTime = Date.now();
  
  return {
    goal,
    startTime,
    
    /**
     * 获取当前状态
     */
    getStatus(text) {
      const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const wordsPerMinute = wordCount / elapsedMinutes;
      
      return {
        wordCount,
        elapsedMinutes: Math.round(elapsedMinutes * 10) / 10,
        wordsPerMinute: Math.round(wordsPerMinute),
        remainingTime: Math.max(0, goal.timeLimit - elapsedMinutes),
        projectedFinalCount: Math.round(wordsPerMinute * goal.timeLimit),
        isOnTrack: wordCount >= (goal.minWords * elapsedMinutes / goal.timeLimit),
        percentComplete: Math.round(wordCount / goal.minWords * 100)
      };
    },
    
    /**
     * 获取建议
     */
    getAdvice(status) {
      if (status.remainingTime < 5 && status.wordCount < goal.minWords) {
        return '时间紧迫！专注于完成基本要求。';
      } else if (status.isOnTrack) {
        return '进度良好，继续保持！';
      } else if (status.wordsPerMinute < 10) {
        return '写作速度偏慢，尝试先写出想法再修改。';
      } else {
        return '略微落后，可以加快节奏。';
      }
    }
  };
}

// 导出 V42 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.createFeedbackManager = createFeedbackManager;
  window.WritingAI.formatFeedbackMessage = formatFeedbackMessage;
  window.WritingAI.createProgressTracker = createProgressTracker;
  window.WritingAI.WRITING_GOALS = WRITING_GOALS;
  window.WritingAI.FEEDBACK_CONFIG = FEEDBACK_CONFIG;
}

console.log('✅ V42 实时写作反馈系统加载完成');

// ==================== V43: 段落结构分析系统 ====================
/**
 * AI 写作辅助模块 - 段落结构分析
 * 功能：分析段落组织，确保逻辑连贯性
 */

// 段落类型识别关键词
const PARAGRAPH_MARKERS = {
  introduction: {
    starters: ['in recent years', 'nowadays', 'it is widely', 'the question of', 
               'one of the most', 'there has been', 'this essay'],
    functions: ['引入话题', '背景介绍', '陈述论点']
  },
  thesis: {
    starters: ['i believe', 'i argue', 'this essay will', 'in my opinion',
               'the main argument', 'i contend', 'i maintain'],
    functions: ['明确立场', '表达观点', '提出论点']
  },
  body_example: {
    starters: ['for example', 'for instance', 'a case in point', 'consider',
               'to illustrate', 'take', 'one example'],
    functions: ['举例说明', '具体论证', '实例支持']
  },
  body_reason: {
    starters: ['first', 'second', 'another', 'one reason', 'the primary',
               'additionally', 'furthermore', 'moreover'],
    functions: ['论证原因', '阐述理由', '递进论述']
  },
  body_contrast: {
    starters: ['however', 'on the other hand', 'conversely', 'in contrast',
               'nevertheless', 'while', 'although', 'despite'],
    functions: ['对比论证', '转折分析', '反驳观点']
  },
  body_cause: {
    starters: ['because', 'since', 'as a result', 'consequently', 'therefore',
               'this leads to', 'the reason', 'due to'],
    functions: ['因果分析', '结果阐述', '影响说明']
  },
  conclusion: {
    starters: ['in conclusion', 'to conclude', 'in summary', 'to sum up',
               'all things considered', 'ultimately', 'in the final analysis'],
    functions: ['总结全文', '重申观点', '提出建议']
  }
};

// 标准段落结构模板
const PARAGRAPH_TEMPLATES = {
  PEEL: {
    name: 'PEEL 结构',
    components: ['Point (论点)', 'Evidence (证据)', 'Explanation (解释)', 'Link (衔接)'],
    description: '适合论证段落，结构清晰'
  },
  TEEL: {
    name: 'TEEL 结构',
    components: ['Topic Sentence (主题句)', 'Explanation (解释)', 'Evidence (证据)', 'Link (衔接)'],
    description: '标准学术段落结构'
  },
  SEEAL: {
    name: 'SEEAL 结构',
    components: ['Statement (陈述)', 'Evidence (证据)', 'Explanation (解释)', 
                 'Analysis (分析)', 'Link (链接)'],
    description: '深入分析型段落'
  }
};

/**
 * 识别段落类型
 * @param {string} paragraph - 段落文本
 * @returns {Object} 段落类型信息
 */
function identifyParagraphType(paragraph) {
  const lowerPara = paragraph.toLowerCase().trim();
  
  let bestMatch = {
    type: 'body_general',
    confidence: 0,
    functions: ['一般论述']
  };
  
  for (const [type, markers] of Object.entries(PARAGRAPH_MARKERS)) {
    let matchCount = 0;
    markers.starters.forEach(starter => {
      if (lowerPara.includes(starter)) {
        matchCount++;
      }
    });
    
    const confidence = matchCount / markers.starters.length;
    if (confidence > bestMatch.confidence) {
      bestMatch = {
        type,
        confidence: Math.round(confidence * 100),
        functions: markers.functions
      };
    }
  }
  
  return bestMatch;
}

/**
 * 分析段落内部结构
 * @param {string} paragraph - 段落文本
 * @returns {Object} 结构分析
 */
function analyzeParagraphStructure(paragraph) {
  const sentences = paragraph.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const analysis = {
    sentenceCount: sentences.length,
    hasTopicSentence: false,
    hasEvidence: false,
    hasExplanation: false,
    hasConclusion: false,
    structure: [],
    score: 0,
    issues: []
  };
  
  if (sentences.length === 0) return analysis;
  
  // 分析第一句是否为主题句
  const firstSentence = sentences[0].toLowerCase();
  const topicIndicators = ['the', 'a', 'one', 'this', 'an'];
  if (topicIndicators.some(ind => firstSentence.trim().startsWith(ind)) ||
      firstSentence.length > 30) {
    analysis.hasTopicSentence = true;
    analysis.structure.push('Topic');
  }
  
  // 分析中间句子
  sentences.slice(1, -1).forEach((sentence, idx) => {
    const lower = sentence.toLowerCase();
    
    // 检测证据
    if (lower.includes('study') || lower.includes('research') || 
        lower.includes('according to') || lower.includes('data') ||
        lower.includes('statistic') || lower.includes('%') ||
        lower.includes('for example')) {
      analysis.hasEvidence = true;
      analysis.structure.push('Evidence');
    }
    // 检测解释
    else if (lower.includes('this means') || lower.includes('because') ||
             lower.includes('this shows') || lower.includes('therefore') ||
             lower.includes('in other words')) {
      analysis.hasExplanation = true;
      analysis.structure.push('Explanation');
    }
    else {
      analysis.structure.push('Development');
    }
  });
  
  // 分析最后一句
  if (sentences.length > 1) {
    const lastSentence = sentences[sentences.length - 1].toLowerCase();
    const conclusionIndicators = ['therefore', 'thus', 'hence', 'consequently', 
                                   'as a result', 'this demonstrates', 'this shows'];
    if (conclusionIndicators.some(ind => lastSentence.includes(ind))) {
      analysis.hasConclusion = true;
      analysis.structure.push('Conclusion');
    } else {
      analysis.structure.push('Development');
    }
  }
  
  // 计算结构分数
  let score = 40; // 基础分
  if (analysis.hasTopicSentence) score += 20;
  if (analysis.hasEvidence) score += 20;
  if (analysis.hasExplanation) score += 10;
  if (analysis.hasConclusion) score += 10;
  analysis.score = score;
  
  // 生成问题提示
  if (!analysis.hasTopicSentence) {
    analysis.issues.push('段落缺少明确的主题句');
  }
  if (!analysis.hasEvidence && sentences.length > 3) {
    analysis.issues.push('建议增加具体证据或例子');
  }
  if (!analysis.hasExplanation && analysis.hasEvidence) {
    analysis.issues.push('证据需要进一步解释说明');
  }
  if (sentences.length < 3) {
    analysis.issues.push('段落内容较少，可以进一步展开');
  }
  if (sentences.length > 8) {
    analysis.issues.push('段落较长，考虑拆分为多个段落');
  }
  
  return analysis;
}

/**
 * 分析全文段落组织
 * @param {string} text - 完整文本
 * @returns {Object} 整体分析报告
 */
function analyzeEssayStructure(text) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  
  const report = {
    paragraphCount: paragraphs.length,
    paragraphs: [],
    hasIntroduction: false,
    hasConclusion: false,
    bodyParagraphs: 0,
    overallScore: 0,
    flow: [],
    issues: [],
    suggestions: []
  };
  
  paragraphs.forEach((para, index) => {
    const typeInfo = identifyParagraphType(para);
    const structureInfo = analyzeParagraphStructure(para);
    
    const paraAnalysis = {
      index: index + 1,
      type: typeInfo.type,
      confidence: typeInfo.confidence,
      functions: typeInfo.functions,
      structure: structureInfo,
      preview: para.substring(0, 50) + '...'
    };
    
    report.paragraphs.push(paraAnalysis);
    report.flow.push(typeInfo.type);
    
    // 检测开头结尾
    if (index === 0 && typeInfo.type === 'introduction') {
      report.hasIntroduction = true;
    }
    if (index === paragraphs.length - 1 && typeInfo.type === 'conclusion') {
      report.hasConclusion = true;
    }
    if (typeInfo.type.startsWith('body_')) {
      report.bodyParagraphs++;
    }
  });
  
  // 计算整体分数
  let score = 50;
  if (report.hasIntroduction) score += 15;
  if (report.hasConclusion) score += 15;
  if (report.bodyParagraphs >= 2) score += 10;
  if (report.paragraphCount >= 4 && report.paragraphCount <= 6) score += 10;
  
  report.overallScore = Math.min(100, score);
  
  // 生成问题和建议
  if (!report.hasIntroduction) {
    report.issues.push('缺少明确的引言段落');
    report.suggestions.push('开头段落应该引入话题并陈述论点');
  }
  if (!report.hasConclusion) {
    report.issues.push('缺少结论段落');
    report.suggestions.push('结尾应该总结全文并重申观点');
  }
  if (report.bodyParagraphs < 2) {
    report.issues.push('主体段落不足');
    report.suggestions.push('至少需要2-3个主体段落来充分论证');
  }
  if (report.paragraphCount < 3) {
    report.issues.push('段落数量过少');
    report.suggestions.push('标准学术文章应包含4-5个段落');
  }
  
  // 检查段落流程
  const expectedFlow = ['introduction', 'body', 'body', 'conclusion'];
  const hasLogicalFlow = report.flow[0]?.includes('intro') && 
                         report.flow[report.flow.length - 1]?.includes('conclusion');
  if (!hasLogicalFlow) {
    report.suggestions.push('建议遵循"引言-主体-结论"的标准结构');
  }
  
  return report;
}

/**
 * 获取段落改进建议
 * @param {string} paragraph - 段落文本
 * @param {string} type - 目标段落类型
 * @returns {Array} 改进建议
 */
function getParagraphSuggestions(paragraph, type = null) {
  const currentType = identifyParagraphType(paragraph);
  const structure = analyzeParagraphStructure(paragraph);
  const suggestions = [];
  
  // 根据当前类型给出建议
  if (currentType.type === 'introduction') {
    if (!paragraph.toLowerCase().includes('essay') && 
        !paragraph.toLowerCase().includes('argue')) {
      suggestions.push({
        type: 'structure',
        message: '建议在引言末尾明确表明论点/文章目的'
      });
    }
  }
  
  if (currentType.type.startsWith('body_')) {
    if (structure.sentenceCount < 4) {
      suggestions.push({
        type: 'development',
        message: '主体段落建议包含4-6个句子，充分展开论述',
        template: PARAGRAPH_TEMPLATES.PEEL
      });
    }
    
    if (!structure.hasEvidence) {
      suggestions.push({
        type: 'evidence',
        message: '添加具体例子或数据支持观点',
        starters: ['For example,', 'Research shows that', 'A case in point is']
      });
    }
  }
  
  if (currentType.type === 'conclusion') {
    if (paragraph.toLowerCase().includes('i think') || 
        paragraph.toLowerCase().includes('new point')) {
      suggestions.push({
        type: 'content',
        message: '结论段不应引入新观点，应总结已论述的内容'
      });
    }
  }
  
  // 通用建议
  structure.issues.forEach(issue => {
    suggestions.push({
      type: 'improvement',
      message: issue
    });
  });
  
  return suggestions;
}

// 导出 V43 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.identifyParagraphType = identifyParagraphType;
  window.WritingAI.analyzeParagraphStructure = analyzeParagraphStructure;
  window.WritingAI.analyzeEssayStructure = analyzeEssayStructure;
  window.WritingAI.getParagraphSuggestions = getParagraphSuggestions;
  window.WritingAI.PARAGRAPH_MARKERS = PARAGRAPH_MARKERS;
  window.WritingAI.PARAGRAPH_TEMPLATES = PARAGRAPH_TEMPLATES;
}

console.log('✅ V43 段落结构分析系统加载完成');

// ==================== V44: 写作风格检测系统 ====================
/**
 * AI 写作辅助模块 - 风格分析
 * 功能：检测写作风格，提供学术化建议
 */

// 风格特征词库
const STYLE_MARKERS = {
  // 口语化表达（应避免）
  informal: {
    words: ['gonna', 'wanna', 'gotta', 'kinda', 'sorta', 'dunno', 'yeah', 'yep', 
            'nope', 'ok', 'okay', 'stuff', 'thing', 'things', 'lot', 'lots',
            'really', 'pretty', 'quite', 'kind of', 'sort of', 'a bit'],
    contractions: ["don't", "won't", "can't", "isn't", "aren't", "doesn't", 
                   "didn't", "hasn't", "haven't", "hadn't", "wouldn't", "couldn't",
                   "shouldn't", "mustn't", "it's", "that's", "there's", "here's",
                   "what's", "who's", "let's", "I'm", "you're", "we're", "they're"],
    phrases: ['a lot of', 'lots of', 'so much', 'really good', 'very bad',
              'pretty much', 'kind of like', 'you know', 'I mean']
  },
  
  // 第一人称过度使用
  first_person: {
    overuse: ['i think', 'i believe', 'i feel', 'in my opinion', 'i argue',
              'i suggest', 'i would say', 'from my perspective', 'i find'],
    alternatives: {
      'i think': ['it is believed that', 'one might argue that', 'evidence suggests that'],
      'i believe': ['it can be contended that', 'there is reason to believe that'],
      'in my opinion': ['arguably', 'it is evident that', 'the evidence indicates']
    }
  },
  
  // 模糊表达（应具体化）
  vague: {
    words: ['some', 'many', 'most', 'few', 'several', 'often', 'sometimes',
            'usually', 'generally', 'basically', 'actually', 'literally',
            'obviously', 'clearly', 'of course'],
    phrases: ['a number of', 'a variety of', 'in some ways', 'to some extent',
              'more or less', 'in general', 'on the whole']
  },
  
  // 学术表达（应使用）
  academic: {
    verbs: ['analyze', 'evaluate', 'examine', 'investigate', 'demonstrate',
            'illustrate', 'indicate', 'suggest', 'reveal', 'establish',
            'determine', 'identify', 'assess', 'consider', 'explore'],
    transitions: ['furthermore', 'moreover', 'consequently', 'nevertheless',
                  'notwithstanding', 'subsequently', 'henceforth', 'thereby'],
    hedging: ['may', 'might', 'could', 'appears to', 'seems to', 'tends to',
              'suggests that', 'indicates that', 'it is possible that']
  },
  
  // 过度表达（应适度）
  excessive: {
    absolutes: ['always', 'never', 'all', 'none', 'every', 'no one', 'everyone',
                'absolutely', 'definitely', 'certainly', 'undoubtedly', 'surely'],
    superlatives: ['best', 'worst', 'most', 'least', 'greatest', 'smallest',
                   'highest', 'lowest', 'perfect', 'ideal', 'ultimate']
  }
};

// 考试类型风格要求
const EXAM_STYLE_REQUIREMENTS = {
  toefl: {
    formal: 0.7,
    academic: 0.5,
    firstPerson: true,  // TOEFL 允许第一人称
    hedging: 0.2
  },
  gre: {
    formal: 0.9,
    academic: 0.7,
    firstPerson: false,  // GRE 避免第一人称
    hedging: 0.3
  },
  ielts: {
    formal: 0.8,
    academic: 0.6,
    firstPerson: true,  // IELTS Task 2 允许
    hedging: 0.25
  }
};

/**
 * 分析文本风格
 * @param {string} text - 待分析文本
 * @returns {Object} 风格分析报告
 */
function analyzeWritingStyle(text) {
  const lowerText = text.toLowerCase();
  const words = lowerText.match(/\b\w+\b/g) || [];
  const totalWords = words.length;
  
  const report = {
    informal: {
      count: 0,
      instances: [],
      score: 100
    },
    contractions: {
      count: 0,
      instances: []
    },
    firstPerson: {
      count: 0,
      instances: [],
      overuse: false
    },
    vague: {
      count: 0,
      instances: []
    },
    academic: {
      count: 0,
      instances: []
    },
    excessive: {
      count: 0,
      instances: []
    },
    overallScore: 0,
    formalityLevel: '',
    suggestions: []
  };
  
  // 检测口语化词汇
  STYLE_MARKERS.informal.words.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    const matches = text.match(regex);
    if (matches) {
      report.informal.count += matches.length;
      report.informal.instances.push({ word, count: matches.length });
    }
  });
  
  // 检测缩写
  STYLE_MARKERS.informal.contractions.forEach(contraction => {
    if (lowerText.includes(contraction.toLowerCase())) {
      report.contractions.count++;
      report.contractions.instances.push(contraction);
    }
  });
  
  // 检测第一人称
  STYLE_MARKERS.first_person.overuse.forEach(phrase => {
    if (lowerText.includes(phrase)) {
      report.firstPerson.count++;
      report.firstPerson.instances.push(phrase);
    }
  });
  report.firstPerson.overuse = report.firstPerson.count > 3;
  
  // 检测模糊表达
  STYLE_MARKERS.vague.words.forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    if (regex.test(text)) {
      report.vague.count++;
      report.vague.instances.push(word);
    }
  });
  
  // 检测学术词汇
  STYLE_MARKERS.academic.verbs.concat(STYLE_MARKERS.academic.transitions).forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    if (regex.test(text)) {
      report.academic.count++;
      report.academic.instances.push(word);
    }
  });
  
  // 检测过度表达
  STYLE_MARKERS.excessive.absolutes.concat(STYLE_MARKERS.excessive.superlatives).forEach(word => {
    const regex = new RegExp('\\b' + word + '\\b', 'gi');
    if (regex.test(text)) {
      report.excessive.count++;
      report.excessive.instances.push(word);
    }
  });
  
  // 计算正式程度分数
  let formalityScore = 100;
  formalityScore -= report.informal.count * 3;
  formalityScore -= report.contractions.count * 5;
  formalityScore -= report.vague.count * 2;
  formalityScore -= report.excessive.count * 2;
  formalityScore += report.academic.count * 2;
  formalityScore = Math.max(0, Math.min(100, formalityScore));
  
  report.overallScore = formalityScore;
  
  // 确定正式程度等级
  if (formalityScore >= 85) {
    report.formalityLevel = '高度学术化';
  } else if (formalityScore >= 70) {
    report.formalityLevel = '较为正式';
  } else if (formalityScore >= 50) {
    report.formalityLevel = '中等正式';
  } else {
    report.formalityLevel = '偏口语化';
  }
  
  // 生成建议
  if (report.informal.count > 0) {
    report.suggestions.push({
      type: 'informal',
      message: `检测到 ${report.informal.count} 处口语化表达，建议替换为更正式的词汇`,
      examples: report.informal.instances.slice(0, 3)
    });
  }
  
  if (report.contractions.count > 0) {
    report.suggestions.push({
      type: 'contraction',
      message: `检测到 ${report.contractions.count} 处缩写形式，学术写作应使用完整形式`,
      examples: report.contractions.instances.slice(0, 3)
    });
  }
  
  if (report.firstPerson.overuse) {
    report.suggestions.push({
      type: 'firstPerson',
      message: '第一人称使用过多，建议采用更客观的表达方式',
      alternatives: STYLE_MARKERS.first_person.alternatives
    });
  }
  
  if (report.vague.count > totalWords * 0.03) {
    report.suggestions.push({
      type: 'vague',
      message: '模糊表达较多，建议使用更具体的数据或表述',
      examples: report.vague.instances.slice(0, 3)
    });
  }
  
  if (report.academic.count < 5) {
    report.suggestions.push({
      type: 'academic',
      message: '学术词汇使用较少，建议增加专业表达',
      recommended: STYLE_MARKERS.academic.verbs.slice(0, 5)
    });
  }
  
  return report;
}

/**
 * 检查是否符合特定考试风格要求
 * @param {string} text - 文本
 * @param {string} examType - 考试类型
 * @returns {Object} 符合度报告
 */
function checkExamStyleCompliance(text, examType) {
  const styleReport = analyzeWritingStyle(text);
  const requirements = EXAM_STYLE_REQUIREMENTS[examType] || EXAM_STYLE_REQUIREMENTS.toefl;
  
  const compliance = {
    examType,
    overall: true,
    checks: [],
    score: 0
  };
  
  // 正式度检查
  const formalityPassed = styleReport.overallScore >= requirements.formal * 100;
  compliance.checks.push({
    criterion: '正式程度',
    required: `≥${requirements.formal * 100}%`,
    actual: `${styleReport.overallScore}%`,
    passed: formalityPassed
  });
  
  // 学术词汇检查
  const academicRatio = styleReport.academic.count / (text.split(/\s+/).length);
  const academicPassed = academicRatio >= requirements.academic * 0.1;
  compliance.checks.push({
    criterion: '学术词汇',
    required: `≥${requirements.academic * 10}%`,
    actual: `${Math.round(academicRatio * 100)}%`,
    passed: academicPassed
  });
  
  // 第一人称检查
  const firstPersonPassed = requirements.firstPerson || !styleReport.firstPerson.overuse;
  compliance.checks.push({
    criterion: '第一人称使用',
    required: requirements.firstPerson ? '允许' : '应避免',
    actual: styleReport.firstPerson.overuse ? '过多' : '适度',
    passed: firstPersonPassed
  });
  
  // 计算总体得分
  const passedCount = compliance.checks.filter(c => c.passed).length;
  compliance.score = Math.round(passedCount / compliance.checks.length * 100);
  compliance.overall = compliance.score >= 70;
  
  return compliance;
}

/**
 * 获取风格改进建议
 * @param {string} sentence - 待改进的句子
 * @returns {Array} 改进建议
 */
function getStyleImprovements(sentence) {
  const improvements = [];
  const lowerSentence = sentence.toLowerCase();
  
  // 替换缩写
  STYLE_MARKERS.informal.contractions.forEach(contraction => {
    if (lowerSentence.includes(contraction.toLowerCase())) {
      const expanded = {
        "don't": "do not",
        "won't": "will not",
        "can't": "cannot",
        "isn't": "is not",
        "aren't": "are not",
        "doesn't": "does not",
        "didn't": "did not",
        "hasn't": "has not",
        "haven't": "have not",
        "wouldn't": "would not",
        "couldn't": "could not",
        "shouldn't": "should not",
        "it's": "it is",
        "that's": "that is",
        "there's": "there is",
        "I'm": "I am",
        "you're": "you are",
        "we're": "we are",
        "they're": "they are"
      };
      
      if (expanded[contraction]) {
        improvements.push({
          type: 'contraction',
          original: contraction,
          replacement: expanded[contraction],
          message: `将 "${contraction}" 替换为 "${expanded[contraction]}"`
        });
      }
    }
  });
  
  // 替换第一人称
  for (const [phrase, alternatives] of Object.entries(STYLE_MARKERS.first_person.alternatives)) {
    if (lowerSentence.includes(phrase)) {
      improvements.push({
        type: 'firstPerson',
        original: phrase,
        replacements: alternatives,
        message: `考虑将 "${phrase}" 替换为更客观的表达`
      });
    }
  }
  
  // 替换口语化词汇
  const informalReplacements = {
    'a lot of': 'numerous/many/substantial',
    'lots of': 'a great deal of/considerable',
    'really': 'significantly/considerably',
    'pretty': 'fairly/reasonably',
    'thing': '[specific noun]',
    'stuff': '[specific noun]',
    'ok': 'acceptable/satisfactory',
    'good': 'beneficial/favorable/advantageous',
    'bad': 'detrimental/adverse/unfavorable'
  };
  
  for (const [informal, formal] of Object.entries(informalReplacements)) {
    if (lowerSentence.includes(informal)) {
      improvements.push({
        type: 'informal',
        original: informal,
        replacement: formal,
        message: `将 "${informal}" 替换为 "${formal}"`
      });
    }
  }
  
  return improvements;
}

// 导出 V44 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.analyzeWritingStyle = analyzeWritingStyle;
  window.WritingAI.checkExamStyleCompliance = checkExamStyleCompliance;
  window.WritingAI.getStyleImprovements = getStyleImprovements;
  window.WritingAI.STYLE_MARKERS = STYLE_MARKERS;
  window.WritingAI.EXAM_STYLE_REQUIREMENTS = EXAM_STYLE_REQUIREMENTS;
}

console.log('✅ V44 写作风格检测系统加载完成');

// ==================== V45: 综合写作助手集成 ====================
/**
 * AI 写作辅助模块 - 综合集成
 * 功能：整合所有AI功能，提供一站式写作辅助
 */

/**
 * 创建综合写作助手
 * @param {Object} options - 配置选项
 * @returns {Object} 写作助手实例
 */
function createWritingAssistant(options = {}) {
  const config = {
    examType: options.examType || 'toefl',
    writingType: options.writingType || 'toefl_independent',
    enableSpelling: options.enableSpelling !== false,
    enableGrammar: options.enableGrammar !== false,
    enableVocabulary: options.enableVocabulary !== false,
    enableStyle: options.enableStyle !== false,
    enableStructure: options.enableStructure !== false,
    autoSuggest: options.autoSuggest !== false,
    language: options.language || 'en'
  };
  
  // 写作会话状态
  let session = {
    startTime: Date.now(),
    text: '',
    history: [],
    feedback: [],
    wordCount: 0,
    lastAnalysis: null
  };
  
  return {
    config,
    session,
    
    /**
     * 初始化写作会话
     */
    startSession(writingType) {
      session = {
        startTime: Date.now(),
        text: '',
        history: [],
        feedback: [],
        wordCount: 0,
        lastAnalysis: null
      };
      config.writingType = writingType || config.writingType;
      console.log(`📝 写作会话已开始 - ${config.writingType}`);
      return this.getSessionInfo();
    },
    
    /**
     * 获取会话信息
     */
    getSessionInfo() {
      const goal = WRITING_GOALS[config.writingType] || WRITING_GOALS.toefl_independent;
      const elapsedMinutes = (Date.now() - session.startTime) / 60000;
      
      return {
        writingType: config.writingType,
        examType: config.examType,
        goal,
        elapsedMinutes: Math.round(elapsedMinutes * 10) / 10,
        remainingTime: Math.max(0, goal.timeLimit - elapsedMinutes),
        wordCount: session.wordCount,
        targetWords: goal.minWords,
        progress: Math.round(session.wordCount / goal.minWords * 100)
      };
    },
    
    /**
     * 更新文本并获取实时反馈
     */
    updateText(text) {
      session.text = text;
      session.wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
      session.history.push({
        timestamp: Date.now(),
        wordCount: session.wordCount,
        textLength: text.length
      });
      
      return this.getQuickFeedback();
    },
    
    /**
     * 获取快速反馈（用于实时显示）
     */
    getQuickFeedback() {
      const feedback = {
        wordCount: session.wordCount,
        paragraphCount: session.text.split(/\n\n+/).filter(p => p.trim()).length,
        issues: [],
        status: 'writing'
      };
      
      const goal = WRITING_GOALS[config.writingType];
      if (goal) {
        if (session.wordCount < goal.minWords) {
          feedback.status = 'below_target';
          feedback.wordsNeeded = goal.minWords - session.wordCount;
        } else if (session.wordCount > goal.maxWords) {
          feedback.status = 'above_target';
          feedback.wordsOver = session.wordCount - goal.maxWords;
        } else {
          feedback.status = 'on_target';
        }
      }
      
      return feedback;
    },
    
    /**
     * 执行完整分析
     */
    performFullAnalysis() {
      const text = session.text;
      if (!text || text.length < 50) {
        return { error: '文本太短，无法进行完整分析' };
      }
      
      const analysis = {
        timestamp: Date.now(),
        wordCount: session.wordCount,
        sessionInfo: this.getSessionInfo(),
        spelling: null,
        grammar: null,
        vocabulary: null,
        sentences: null,
        paragraphs: null,
        style: null,
        overallScore: 0,
        summary: {
          strengths: [],
          weaknesses: [],
          priorities: []
        }
      };
      
      // 拼写检查
      if (config.enableSpelling && typeof checkTextSpelling === 'function') {
        analysis.spelling = {
          errors: checkTextSpelling(text),
          score: 100
        };
        analysis.spelling.score = Math.max(0, 100 - analysis.spelling.errors.length * 2);
      }
      
      // 语法检查
      if (config.enableGrammar && typeof checkGrammar === 'function') {
        analysis.grammar = {
          issues: checkGrammar(text),
          score: 100
        };
        analysis.grammar.score = Math.max(0, 100 - analysis.grammar.issues.length * 3);
      }
      
      // 词汇分析
      if (config.enableVocabulary && typeof analyzeVocabularyDiversity === 'function') {
        analysis.vocabulary = analyzeVocabularyDiversity(text);
        const upgrades = typeof scanForUpgrades === 'function' ? scanForUpgrades(text) : [];
        analysis.vocabulary.upgradeSuggestions = upgrades.slice(0, 5);
      }
      
      // 句式分析
      if (typeof analyzeSentenceVariety === 'function') {
        analysis.sentences = analyzeSentenceVariety(text);
      }
      
      // 段落结构分析
      if (config.enableStructure && typeof analyzeEssayStructure === 'function') {
        analysis.paragraphs = analyzeEssayStructure(text);
      }
      
      // 风格分析
      if (config.enableStyle && typeof analyzeWritingStyle === 'function') {
        analysis.style = analyzeWritingStyle(text);
        if (typeof checkExamStyleCompliance === 'function') {
          analysis.style.compliance = checkExamStyleCompliance(text, config.examType);
        }
      }
      
      // 计算综合分数
      let scores = [];
      if (analysis.spelling) scores.push(analysis.spelling.score);
      if (analysis.grammar) scores.push(analysis.grammar.score);
      if (analysis.vocabulary) scores.push(analysis.vocabulary.score);
      if (analysis.sentences) scores.push(analysis.sentences.varietyScore);
      if (analysis.paragraphs) scores.push(analysis.paragraphs.overallScore);
      if (analysis.style) scores.push(analysis.style.overallScore);
      
      analysis.overallScore = scores.length > 0 
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
      
      // 生成总结
      this.generateSummary(analysis);
      
      session.lastAnalysis = analysis;
      session.feedback.push(analysis);
      
      return analysis;
    },
    
    /**
     * 生成分析总结
     */
    generateSummary(analysis) {
      const summary = analysis.summary;
      
      // 识别优点
      if (analysis.spelling && analysis.spelling.score >= 90) {
        summary.strengths.push('拼写准确率高');
      }
      if (analysis.grammar && analysis.grammar.score >= 85) {
        summary.strengths.push('语法运用良好');
      }
      if (analysis.vocabulary && analysis.vocabulary.score >= 70) {
        summary.strengths.push('词汇多样性较好');
      }
      if (analysis.sentences && analysis.sentences.varietyScore >= 70) {
        summary.strengths.push('句式变化丰富');
      }
      if (analysis.paragraphs && analysis.paragraphs.hasIntroduction && analysis.paragraphs.hasConclusion) {
        summary.strengths.push('文章结构完整');
      }
      if (analysis.style && analysis.style.overallScore >= 80) {
        summary.strengths.push('学术风格规范');
      }
      
      // 识别弱点和优先改进项
      if (analysis.spelling && analysis.spelling.errors.length > 3) {
        summary.weaknesses.push('存在多处拼写错误');
        summary.priorities.push({ area: 'spelling', message: '检查拼写错误' });
      }
      if (analysis.grammar && analysis.grammar.issues.length > 3) {
        summary.weaknesses.push('语法问题较多');
        summary.priorities.push({ area: 'grammar', message: '修正语法错误' });
      }
      if (analysis.vocabulary && analysis.vocabulary.score < 50) {
        summary.weaknesses.push('词汇较为简单');
        summary.priorities.push({ area: 'vocabulary', message: '使用更高级的词汇' });
      }
      if (analysis.sentences && analysis.sentences.varietyScore < 50) {
        summary.weaknesses.push('句式变化不足');
        summary.priorities.push({ area: 'sentences', message: '增加句式多样性' });
      }
      if (analysis.paragraphs && !analysis.paragraphs.hasConclusion) {
        summary.weaknesses.push('缺少结论段');
        summary.priorities.push({ area: 'structure', message: '添加结论段落' });
      }
      if (analysis.style && analysis.style.contractions.count > 0) {
        summary.weaknesses.push('使用了缩写形式');
        summary.priorities.push({ area: 'style', message: '展开所有缩写' });
      }
      
      // 按优先级排序
      summary.priorities.sort((a, b) => {
        const priority = { spelling: 1, grammar: 2, structure: 3, style: 4, vocabulary: 5, sentences: 6 };
        return (priority[a.area] || 99) - (priority[b.area] || 99);
      });
    },
    
    /**
     * 获取当前位置的智能建议
     */
    getSuggestionsAtCursor(cursorPosition) {
      const text = session.text;
      const textBeforeCursor = text.substring(0, cursorPosition);
      const textAfterCursor = text.substring(cursorPosition);
      
      const suggestions = {
        continuation: null,
        phrases: null,
        vocabulary: null
      };
      
      // 续写建议
      if (typeof getSuggestions === 'function') {
        const lastSentence = textBeforeCursor.split(/[.!?]/).pop() || '';
        suggestions.continuation = getSuggestions(textBeforeCursor, { examType: config.examType });
      }
      
      // 学术短语建议
      if (typeof suggestAcademicPhrases === 'function') {
        const context = textBeforeCursor.slice(-200);
        suggestions.phrases = suggestAcademicPhrases(textBeforeCursor, context);
      }
      
      // 词汇升级建议
      const lastWord = textBeforeCursor.match(/\b\w+$/)?.[0];
      if (lastWord && typeof getVocabularyUpgrade === 'function') {
        suggestions.vocabulary = getVocabularyUpgrade(lastWord);
      }
      
      return suggestions;
    },
    
    /**
     * 获取改进后的文本
     */
    getImprovedText() {
      let improvedText = session.text;
      
      // 应用拼写修正
      if (typeof checkTextSpelling === 'function') {
        const errors = checkTextSpelling(improvedText);
        errors.reverse().forEach(error => {
          if (error.suggestions.length > 0) {
            improvedText = improvedText.substring(0, error.position) + 
                          error.suggestions[0] + 
                          improvedText.substring(error.position + error.word.length);
          }
        });
      }
      
      return {
        original: session.text,
        improved: improvedText,
        changes: []
      };
    },
    
    /**
     * 导出分析报告
     */
    exportReport() {
      return {
        sessionInfo: this.getSessionInfo(),
        text: session.text,
        analysis: session.lastAnalysis,
        history: session.history,
        exportTime: new Date().toISOString()
      };
    },
    
    /**
     * 重置会话
     */
    resetSession() {
      session = {
        startTime: Date.now(),
        text: '',
        history: [],
        feedback: [],
        wordCount: 0,
        lastAnalysis: null
      };
    }
  };
}

/**
 * 获取综合评分等级
 * @param {number} score - 综合分数
 * @returns {Object} 等级信息
 */
function getScoreGrade(score) {
  if (score >= 90) return { grade: 'A', label: '优秀', color: '#4CAF50' };
  if (score >= 80) return { grade: 'B', label: '良好', color: '#8BC34A' };
  if (score >= 70) return { grade: 'C', label: '中等', color: '#FFC107' };
  if (score >= 60) return { grade: 'D', label: '及格', color: '#FF9800' };
  return { grade: 'F', label: '需改进', color: '#F44336' };
}

/**
 * 生成写作建议清单
 * @param {Object} analysis - 分析结果
 * @returns {Array} 建议列表
 */
function generateActionItems(analysis) {
  const items = [];
  
  if (!analysis) return items;
  
  // 拼写
  if (analysis.spelling && analysis.spelling.errors.length > 0) {
    items.push({
      priority: 1,
      category: '拼写',
      action: `修正 ${analysis.spelling.errors.length} 处拼写错误`,
      details: analysis.spelling.errors.slice(0, 3).map(e => e.word)
    });
  }
  
  // 语法
  if (analysis.grammar && analysis.grammar.issues.length > 0) {
    items.push({
      priority: 2,
      category: '语法',
      action: `修正 ${analysis.grammar.issues.length} 处语法问题`,
      details: analysis.grammar.issues.slice(0, 3).map(i => i.message)
    });
  }
  
  // 结构
  if (analysis.paragraphs) {
    if (!analysis.paragraphs.hasIntroduction) {
      items.push({
        priority: 3,
        category: '结构',
        action: '添加引言段落',
        details: ['引入话题背景', '明确表达论点']
      });
    }
    if (!analysis.paragraphs.hasConclusion) {
      items.push({
        priority: 3,
        category: '结构',
        action: '添加结论段落',
        details: ['总结主要论点', '重申立场']
      });
    }
  }
  
  // 风格
  if (analysis.style && analysis.style.contractions.count > 0) {
    items.push({
      priority: 4,
      category: '风格',
      action: '展开所有缩写',
      details: analysis.style.contractions.instances.slice(0, 5)
    });
  }
  
  // 词汇
  if (analysis.vocabulary && analysis.vocabulary.upgradeSuggestions?.length > 0) {
    items.push({
      priority: 5,
      category: '词汇',
      action: '使用更高级的词汇',
      details: analysis.vocabulary.upgradeSuggestions.slice(0, 3).map(u => u.original)
    });
  }
  
  return items.sort((a, b) => a.priority - b.priority);
}

// 导出 V45 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.createWritingAssistant = createWritingAssistant;
  window.WritingAI.getScoreGrade = getScoreGrade;
  window.WritingAI.generateActionItems = generateActionItems;
  
  // 创建全局默认实例
  window.WritingAssistant = createWritingAssistant();
  
  // 导出写作题目到全局（供 writing-module.js 使用）
  window.TOEFL_INTEGRATED_TOPICS = TOEFL_INTEGRATED_TOPICS;
  window.TOEFL_DISCUSSION_TOPICS = TOEFL_DISCUSSION_TOPICS;
  window.GRE_ISSUE_TOPICS = GRE_ISSUE_TOPICS;
  window.GRE_ARGUMENT_TOPICS = GRE_ARGUMENT_TOPICS;
  window.IELTS_TASK1_TOPICS = IELTS_TASK1_TOPICS;
  window.IELTS_TASK2_TOPICS = IELTS_TASK2_TOPICS;
  window.KAOYAN_TOPICS = KAOYAN_TOPICS;
  window.ACADEMIC_WRITING_TOPICS = ACADEMIC_WRITING_TOPICS;
}

console.log('✅ V45 综合写作助手集成加载完成');
console.log('🎉 AI 写作辅助模块 V36-V45 全部加载完成！');

// ==================== V46: 增强版 AI 段落评分系统 ====================
/**
 * 高级学术写作评分系统
 * 功能：段落级别详细评分、具体问题定位、改进建议
 */

// 学术写作评分标准
const ACADEMIC_SCORING_CRITERIA = {
  // 结构与组织 (25分)
  structure: {
    weight: 25,
    criteria: {
      introduction: { weight: 6, description: '引言是否清晰陈述研究背景和目的' },
      thesis: { weight: 5, description: '论点是否明确' },
      bodyOrganization: { weight: 6, description: '主体段落是否逻辑清晰' },
      transitions: { weight: 4, description: '段落间过渡是否自然' },
      conclusion: { weight: 4, description: '结论是否有效总结' }
    }
  },
  // 论证与分析 (25分)
  argumentation: {
    weight: 25,
    criteria: {
      evidence: { weight: 8, description: '是否有充分的证据支持' },
      analysis: { weight: 8, description: '分析是否深入' },
      counterarguments: { weight: 5, description: '是否考虑了对立观点' },
      logic: { weight: 4, description: '逻辑推理是否严密' }
    }
  },
  // 语言与词汇 (25分)
  language: {
    weight: 25,
    criteria: {
      vocabulary: { weight: 8, description: '学术词汇使用' },
      grammar: { weight: 7, description: '语法正确性' },
      clarity: { weight: 5, description: '表达清晰度' },
      formality: { weight: 5, description: '学术语体规范' }
    }
  },
  // 学术规范 (25分)
  academic: {
    weight: 25,
    criteria: {
      citations: { weight: 6, description: '引用是否规范' },
      objectivity: { weight: 6, description: '是否保持客观' },
      hedging: { weight: 5, description: '是否使用适当的谨慎表达' },
      precision: { weight: 4, description: '术语使用是否准确' },
      formatting: { weight: 4, description: '格式是否规范' }
    }
  }
};

// 学术词汇库
const ACADEMIC_VOCABULARY = {
  // 引入观点
  introduction: ['this paper examines', 'this study investigates', 'the purpose of this research', 
    'this analysis explores', 'the present study aims', 'this article addresses'],
  // 对比连接词
  contrast: ['however', 'nevertheless', 'conversely', 'on the other hand', 'in contrast', 
    'alternatively', 'whereas', 'despite', 'notwithstanding'],
  // 因果关系
  causation: ['consequently', 'therefore', 'thus', 'hence', 'as a result', 'accordingly',
    'due to', 'owing to', 'leads to', 'results in', 'contributes to'],
  // 强调
  emphasis: ['significantly', 'notably', 'importantly', 'crucially', 'fundamentally',
    'particularly', 'especially', 'primarily'],
  // 谨慎表达 (hedging)
  hedging: ['may', 'might', 'could', 'appears to', 'seems to', 'suggests', 'indicates',
    'tends to', 'arguably', 'potentially', 'likely', 'possibly'],
  // 总结
  conclusion: ['in conclusion', 'to summarize', 'in summary', 'overall', 'taken together',
    'these findings suggest', 'this analysis demonstrates']
};

// 常见学术写作问题模式
const WRITING_ISSUE_PATTERNS = {
  // 过于绝对的表述
  absoluteStatements: {
    pattern: /\b(always|never|all|none|every|no one|everyone|absolutely|definitely|certainly|undoubtedly|proves? that|clearly shows?)\b/gi,
    issue: '表述过于绝对',
    suggestion: '使用更谨慎的表达如 "suggests", "indicates", "tends to"'
  },
  // 第一人称过度使用
  excessiveFirstPerson: {
    pattern: /\b(I think|I believe|I feel|in my opinion|my view)\b/gi,
    issue: '第一人称表达过多',
    suggestion: '学术写作应保持客观，使用"This study argues..."等表达'
  },
  // 口语化表达
  informalLanguage: {
    pattern: /\b(gonna|wanna|gotta|kinda|sorta|lots of|a lot of|things|stuff|get|got|big|good|bad|nice|pretty much|basically)\b/gi,
    issue: '口语化表达',
    suggestion: '使用更正式的学术词汇'
  },
  // 缩写
  contractions: {
    pattern: /\b(can't|won't|don't|doesn't|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|couldn't|wouldn't|shouldn't|it's|that's|there's)\b/gi,
    issue: '使用了缩写形式',
    suggestion: '学术写作应避免缩写，使用完整形式'
  },
  // 空洞的开头
  weakOpeners: {
    pattern: /^(There (is|are|was|were)|It (is|was) (clear|obvious|evident|important|interesting))/gim,
    issue: '段落开头空洞',
    suggestion: '使用更具体、更有力的开头'
  },
  // 句子过长
  longSentences: {
    pattern: /[^.!?]{150,}/g,
    issue: '句子过长',
    suggestion: '将长句拆分为更短、更清晰的句子'
  },
  // 重复用词
  repetition: {
    check: (text) => {
      const words = text.toLowerCase().match(/\b\w{5,}\b/g) || [];
      const counts = {};
      words.forEach(w => counts[w] = (counts[w] || 0) + 1);
      return Object.entries(counts)
        .filter(([word, count]) => count > 3 && !['which', 'these', 'their', 'would', 'could', 'should', 'about', 'other'].includes(word))
        .map(([word, count]) => ({ word, count }));
    },
    issue: '词汇重复',
    suggestion: '使用同义词或变换表达方式'
  }
};

/**
 * 分析单个段落
 * @param {string} paragraph - 段落文本
 * @param {number} index - 段落索引
 * @param {number} totalParagraphs - 总段落数
 * @returns {Object} 段落分析结果
 */
function analyzeParagraph(paragraph, index, totalParagraphs) {
  const result = {
    index: index,
    position: index === 0 ? 'introduction' : (index === totalParagraphs - 1 ? 'conclusion' : 'body'),
    text: paragraph,
    wordCount: paragraph.split(/\s+/).filter(w => w.length > 0).length,
    sentenceCount: paragraph.split(/[.!?]+/).filter(s => s.trim().length > 0).length,
    score: 100,
    issues: [],
    strengths: [],
    suggestions: []
  };
  
  // 检查字数
  if (result.wordCount < 30) {
    result.issues.push({ type: 'length', message: '段落过短，内容不够充分' });
    result.score -= 10;
  } else if (result.wordCount > 250) {
    result.issues.push({ type: 'length', message: '段落过长，建议拆分' });
    result.score -= 5;
  }
  
  // 检查问题模式
  Object.entries(WRITING_ISSUE_PATTERNS).forEach(([key, pattern]) => {
    if (pattern.pattern) {
      const matches = paragraph.match(pattern.pattern);
      if (matches && matches.length > 0) {
        result.issues.push({
          type: key,
          message: pattern.issue,
          instances: matches.slice(0, 3),
          suggestion: pattern.suggestion
        });
        result.score -= Math.min(15, matches.length * 3);
      }
    }
  });
  
  // 检查重复用词
  const repetitions = WRITING_ISSUE_PATTERNS.repetition.check(paragraph);
  if (repetitions.length > 0) {
    result.issues.push({
      type: 'repetition',
      message: '存在重复用词',
      instances: repetitions.slice(0, 3).map(r => `"${r.word}" (${r.count}次)`),
      suggestion: WRITING_ISSUE_PATTERNS.repetition.suggestion
    });
    result.score -= repetitions.length * 3;
  }
  
  // 检查学术词汇使用
  let academicWordCount = 0;
  Object.values(ACADEMIC_VOCABULARY).flat().forEach(phrase => {
    if (paragraph.toLowerCase().includes(phrase.toLowerCase())) {
      academicWordCount++;
    }
  });
  
  if (academicWordCount >= 3) {
    result.strengths.push('学术词汇运用良好');
    result.score = Math.min(100, result.score + 5);
  } else if (academicWordCount === 0 && result.wordCount > 50) {
    result.issues.push({
      type: 'vocabulary',
      message: '缺少学术词汇',
      suggestion: '添加适当的学术连接词和表达方式'
    });
    result.score -= 5;
  }
  
  // 根据位置检查特定要求
  if (result.position === 'introduction') {
    // 检查引言是否包含关键要素
    const hasBackground = /\b(context|background|recent(ly)?|study|research|investigate|examine)\b/i.test(paragraph);
    const hasThesis = /\b(this (paper|study|research|article|analysis)|aim|purpose|argue|examine|investigate)\b/i.test(paragraph);
    
    if (hasBackground) result.strengths.push('包含研究背景');
    else {
      result.issues.push({ type: 'structure', message: '引言缺少研究背景', suggestion: '添加研究背景和上下文' });
      result.score -= 8;
    }
    
    if (hasThesis) result.strengths.push('论点明确');
    else {
      result.issues.push({ type: 'structure', message: '引言缺少明确论点', suggestion: '明确陈述研究目的或主要论点' });
      result.score -= 10;
    }
  }
  
  if (result.position === 'conclusion') {
    const hasSummary = /\b(in conclusion|to summarize|in summary|overall|therefore|thus|these findings|this (study|analysis|research) (shows?|demonstrates?|suggests?))\b/i.test(paragraph);
    
    if (hasSummary) result.strengths.push('结论总结到位');
    else {
      result.issues.push({ type: 'structure', message: '结论缺少总结性语言', suggestion: '添加总结词如"In conclusion", "To summarize"等' });
      result.score -= 8;
    }
  }
  
  if (result.position === 'body') {
    // 检查主体段落的主题句
    const firstSentence = paragraph.split(/[.!?]/)[0] || '';
    if (firstSentence.length < 20) {
      result.issues.push({ type: 'structure', message: '主题句不够清晰', suggestion: '段落首句应明确陈述本段主要观点' });
      result.score -= 5;
    }
    
    // 检查是否有证据或例子
    const hasEvidence = /\b(for example|for instance|such as|according to|research shows?|studies? (indicate|suggest|show)|evidence|data|statistics|findings)\b/i.test(paragraph);
    if (hasEvidence) result.strengths.push('有证据支持论点');
    else if (result.wordCount > 60) {
      result.suggestions.push('考虑添加具体例证或数据支持');
    }
  }
  
  result.score = Math.max(0, Math.min(100, result.score));
  return result;
}

/**
 * 完整的学术写作评分
 * @param {string} text - 完整文章
 * @param {Object} topic - 题目信息（可选）
 * @returns {Object} 评分结果
 */
function scoreAcademicWriting(text, topic = null) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 20);
  const totalWords = text.split(/\s+/).filter(w => w.length > 0).length;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  const result = {
    overallScore: 0,
    grade: '',
    totalWords: totalWords,
    paragraphCount: paragraphs.length,
    sentenceCount: sentences.length,
    avgSentenceLength: Math.round(totalWords / sentences.length) || 0,
    
    // 各维度分数
    dimensions: {
      structure: { score: 0, maxScore: 25, feedback: [] },
      argumentation: { score: 0, maxScore: 25, feedback: [] },
      language: { score: 0, maxScore: 25, feedback: [] },
      academic: { score: 0, maxScore: 25, feedback: [] }
    },
    
    // 段落分析
    paragraphAnalysis: [],
    
    // 总体反馈
    strengths: [],
    weaknesses: [],
    priorityImprovements: [],
    
    // 最需要改进的段落
    weakestParagraph: null
  };
  
  // 分析每个段落
  paragraphs.forEach((para, idx) => {
    const analysis = analyzeParagraph(para, idx, paragraphs.length);
    result.paragraphAnalysis.push(analysis);
  });
  
  // 找出最弱的段落
  const sortedByScore = [...result.paragraphAnalysis].sort((a, b) => a.score - b.score);
  if (sortedByScore.length > 0 && sortedByScore[0].score < 70) {
    result.weakestParagraph = {
      index: sortedByScore[0].index + 1,
      position: sortedByScore[0].position,
      score: sortedByScore[0].score,
      mainIssues: sortedByScore[0].issues.slice(0, 3)
    };
  }
  
  // 计算结构分数
  if (paragraphs.length >= 3) {
    result.dimensions.structure.score += 10;
    result.dimensions.structure.feedback.push('✓ 段落数量合适');
  } else {
    result.dimensions.structure.feedback.push('✗ 段落数量不足，建议至少3段');
  }
  
  const introAnalysis = result.paragraphAnalysis.find(p => p.position === 'introduction');
  const conclusionAnalysis = result.paragraphAnalysis.find(p => p.position === 'conclusion');
  
  if (introAnalysis && introAnalysis.strengths.includes('论点明确')) {
    result.dimensions.structure.score += 8;
  }
  if (conclusionAnalysis && conclusionAnalysis.strengths.includes('结论总结到位')) {
    result.dimensions.structure.score += 7;
  }
  
  // 计算语言分数
  let totalIssues = result.paragraphAnalysis.reduce((sum, p) => sum + p.issues.length, 0);
  let academicStrengths = result.paragraphAnalysis.filter(p => p.strengths.includes('学术词汇运用良好')).length;
  
  result.dimensions.language.score = Math.max(0, 25 - totalIssues * 2);
  if (academicStrengths >= 2) {
    result.dimensions.language.score = Math.min(25, result.dimensions.language.score + 5);
    result.dimensions.language.feedback.push('✓ 学术词汇运用得当');
  }
  
  // 计算论证分数
  const evidenceParagraphs = result.paragraphAnalysis.filter(p => p.strengths.includes('有证据支持论点')).length;
  result.dimensions.argumentation.score = Math.min(25, 10 + evidenceParagraphs * 5);
  if (evidenceParagraphs >= 2) {
    result.dimensions.argumentation.feedback.push('✓ 论证有充分证据支持');
  } else {
    result.dimensions.argumentation.feedback.push('✗ 需要更多证据和例证支持论点');
  }
  
  // 计算学术规范分数
  const contractionIssues = result.paragraphAnalysis.filter(p => p.issues.some(i => i.type === 'contractions')).length;
  const firstPersonIssues = result.paragraphAnalysis.filter(p => p.issues.some(i => i.type === 'excessiveFirstPerson')).length;
  
  result.dimensions.academic.score = 25;
  if (contractionIssues > 0) {
    result.dimensions.academic.score -= contractionIssues * 5;
    result.dimensions.academic.feedback.push('✗ 存在缩写形式，应展开');
  }
  if (firstPersonIssues > 0) {
    result.dimensions.academic.score -= firstPersonIssues * 3;
    result.dimensions.academic.feedback.push('✗ 第一人称使用过多');
  }
  if (result.dimensions.academic.score >= 20) {
    result.dimensions.academic.feedback.push('✓ 学术规范较好');
  }
  result.dimensions.academic.score = Math.max(0, result.dimensions.academic.score);
  
  // 计算总分
  result.overallScore = 
    result.dimensions.structure.score +
    result.dimensions.argumentation.score +
    result.dimensions.language.score +
    result.dimensions.academic.score;
  
  // 如果有题目要求，检查字数
  if (topic && topic.wordCount) {
    if (totalWords < topic.wordCount.min) {
      result.overallScore = Math.max(0, result.overallScore - 10);
      result.weaknesses.push(`字数不足（${totalWords}/${topic.wordCount.min}词）`);
    } else if (totalWords > topic.wordCount.max * 1.2) {
      result.overallScore = Math.max(0, result.overallScore - 5);
      result.weaknesses.push(`字数过多（${totalWords}/${topic.wordCount.max}词）`);
    }
  }
  
  // 生成等级
  if (result.overallScore >= 90) result.grade = 'A (优秀)';
  else if (result.overallScore >= 80) result.grade = 'B (良好)';
  else if (result.overallScore >= 70) result.grade = 'C (中等)';
  else if (result.overallScore >= 60) result.grade = 'D (及格)';
  else result.grade = 'F (需改进)';
  
  // 汇总优缺点
  result.paragraphAnalysis.forEach(p => {
    p.strengths.forEach(s => {
      if (!result.strengths.includes(s)) result.strengths.push(s);
    });
    p.issues.forEach(issue => {
      if (!result.weaknesses.some(w => w.includes(issue.type))) {
        result.weaknesses.push(issue.message);
      }
    });
  });
  
  // 生成优先改进建议
  if (result.weakestParagraph) {
    result.priorityImprovements.push({
      priority: 1,
      area: `第${result.weakestParagraph.index}段 (${result.weakestParagraph.position === 'introduction' ? '引言' : result.weakestParagraph.position === 'conclusion' ? '结论' : '主体'})`,
      issues: result.weakestParagraph.mainIssues.map(i => i.message),
      action: '这是最需要改进的段落'
    });
  }
  
  if (result.dimensions.language.score < 15) {
    result.priorityImprovements.push({
      priority: 2,
      area: '语言表达',
      issues: ['存在多处语言问题'],
      action: '检查并修正语言错误，增加学术词汇'
    });
  }
  
  if (result.dimensions.structure.score < 15) {
    result.priorityImprovements.push({
      priority: 3,
      area: '文章结构',
      issues: ['结构不够完整'],
      action: '确保有清晰的引言、主体和结论'
    });
  }
  
  return result;
}

/**
 * 生成详细的段落反馈HTML
 */
function generateParagraphFeedbackHTML(analysis) {
  return analysis.paragraphAnalysis.map((para, idx) => {
    const positionLabel = para.position === 'introduction' ? '引言' : 
                          para.position === 'conclusion' ? '结论' : `主体段${idx}`;
    const scoreClass = para.score >= 80 ? 'good' : para.score >= 60 ? 'warning' : 'error';
    
    let issuesHTML = '';
    if (para.issues.length > 0) {
      issuesHTML = `
        <div class="para-issues">
          ${para.issues.map(issue => `
            <div class="issue-item">
              <span class="issue-icon">⚠️</span>
              <span class="issue-text">${issue.message}</span>
              ${issue.instances ? `<span class="issue-examples">(如: ${issue.instances.slice(0, 2).join(', ')})</span>` : ''}
              ${issue.suggestion ? `<div class="issue-suggestion">💡 ${issue.suggestion}</div>` : ''}
            </div>
          `).join('')}
        </div>
      `;
    }
    
    let strengthsHTML = '';
    if (para.strengths.length > 0) {
      strengthsHTML = `
        <div class="para-strengths">
          ${para.strengths.map(s => `<span class="strength-tag">✓ ${s}</span>`).join('')}
        </div>
      `;
    }
    
    return `
      <div class="paragraph-feedback ${scoreClass}">
        <div class="para-header">
          <span class="para-label">${positionLabel}</span>
          <span class="para-score">${para.score}分</span>
          <span class="para-words">${para.wordCount}词</span>
        </div>
        ${strengthsHTML}
        ${issuesHTML}
      </div>
    `;
  }).join('');
}

// 导出 V46 功能
if (typeof window !== 'undefined') {
  window.WritingAI = window.WritingAI || {};
  window.WritingAI.scoreAcademicWriting = scoreAcademicWriting;
  window.WritingAI.analyzeParagraph = analyzeParagraph;
  window.WritingAI.generateParagraphFeedbackHTML = generateParagraphFeedbackHTML;
  window.WritingAI.ACADEMIC_SCORING_CRITERIA = ACADEMIC_SCORING_CRITERIA;
  window.WritingAI.ACADEMIC_VOCABULARY = ACADEMIC_VOCABULARY;
}

console.log('✅ V46 增强版 AI 段落评分系统加载完成');
