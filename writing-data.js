/**
 * 写作练习数据 - 基于真实考试题型
 * 
 * 题型覆盖:
 * - TOEFL IBT: 综合写作 + 学术讨论写作
 * - GRE: Issue分析 + Argument分析
 * - 雅思: Task1图表 + Task2议论文
 * - 考研: 应用文 + 图画/图表作文
 * - 六级: 议论文/图画题
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
  
  // 六级题型
  CET6_ESSAY: 'cet6_essay',                   // 议论文
  CET6_PICTURE: 'cet6_picture'                // 图画题
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
      "{Problem} poses significant challenges that require immediate attention and innovative solutions."
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
    cet6: []             // V26-V30 添加
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
