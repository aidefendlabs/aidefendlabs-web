/* ============================================
   AIDEFEND Labs - i18n (Internationalization)
   English / 繁體中文 language toggle
   ============================================ */

const translations = {
  en: {
    // Nav
    'nav.framework': 'Framework',
    'nav.mission': 'Mission',
    'nav.whats-next': "What's Next",
    'nav.explore': 'Explore AIDEFEND',

    // Hero
    'hero.title.line1': 'Democratizing',
    'hero.title.line2': 'AI Security Defenses',
    'hero.subtitle': 'We build <strong class="text-gradient">technical, code-level, no-BS</strong> AI defensive frameworks and tools &mdash; not governance checklists &mdash; that give security teams and developers the concrete countermeasures they need to protect AI systems from real-world threats.',
    'hero.cta.explore': 'Explore the Framework',
    'hero.cta.mcp': 'MCP Service',
    'hero.techline': 'SECURE BY DESIGN',

    // Framework section
    'framework.label': 'Flagship Project',
    'framework.title': 'The AIDEFEND Framework',
    'framework.subtitle': '<strong class="text-gradient">Free and open-source.</strong> Not another governance checklist. AIDEFEND is a hands-on technical framework &mdash; every defensive technique ships with implementation guidance, architecture patterns, and ready-to-use code examples so your team can deploy real protections, not just policies.',
    'framework.stat1': 'Threat Frameworks Mapped',
    'framework.stat2': 'Defensive Techniques',
    'framework.stat3': 'Implementation Guidelines',
    'framework.stat4': 'Strategic Views',
    'framework.tactics.title': 'Tactics View',
    'framework.tactics.desc': 'Explore defenses by strategic function: Model, Harden, Detect, Isolate, Deceive, Evict, and Restore &mdash; each with code examples and implementation guidance.',
    'framework.pillars.title': 'Pillars View',
    'framework.pillars.desc': 'Organize controls by stack component: Data, Model, Infrastructure, and Application layers with concrete architecture patterns.',
    'framework.phases.title': 'Phases View',
    'framework.phases.desc': 'Embed security across the AI lifecycle: Design, Build, Validate, Operate, Respond, and Restore.',
    'framework.frameworks.title': 'Frameworks View',
    'framework.frameworks.desc': 'Browse defenses cross-mapped to MITRE ATLAS, OWASP, MAESTRO, NIST, and 5+ additional threat frameworks.',
    'framework.visit': 'Visit aidefend.net',

    // Hot Topics
    'topics.label': 'AI Defense Knowledge Base',
    'topics.title': 'Comprehensive Coverage Across the <span class="text-gradient">AI Threat Landscape</span>',
    'topics.subtitle': 'From prompt injection to autonomous agent swarms &mdash; a growing knowledge base of defensive techniques with implementation guidance and code examples for every major AI attack surface.',

    'topics.prompt.title': 'Prompt Injection',
    'topics.prompt.desc': 'The #1 LLM threat. Attackers manipulate model behavior through crafted inputs that override system instructions.',
    'topics.agentic.title': 'Agentic AI Security',
    'topics.agentic.desc': 'Autonomous agents introduce new risks &mdash; unauthorized actions, goal drift, and privilege escalation across tool chains.',
    'topics.mcp.title': 'MCP &amp; Tool Security',
    'topics.mcp.desc': 'Model Context Protocol expands the attack surface. Tool poisoning, registry spoofing, and TOCTOU attacks threaten agent workflows.',
    'topics.rag.title': 'RAG Poisoning Defense',
    'topics.rag.desc': 'Attackers inject malicious content into vector stores and knowledge bases, corrupting retrieval-augmented generation pipelines.',
    'topics.data.title': 'Data Poisoning &amp; Supply Chain',
    'topics.data.desc': 'Compromised training data and untrusted model artifacts undermine AI integrity from the foundation up.',
    'topics.code.title': 'AI-Generated Code Safety',
    'topics.code.desc': 'AI coding assistants can produce vulnerable or malicious code. Admission controls prevent unsafe code from reaching production.',
    'topics.swarm.title': 'Multi-Agent &amp; Swarm Security',
    'topics.swarm.desc': 'When agents collaborate autonomously, rogue actors can infiltrate the swarm. Detect compromised agents before they cascade.',
    'topics.deception.title': 'AI Deception &amp; Honeypots',
    'topics.deception.desc': 'Turn the tables on attackers. Deploy decoy AI services, canary tasks, and honey data to detect and study adversaries in real time.',
    'topics.memory.title': 'AI Memory &amp; State Security',
    'topics.memory.desc': 'Persistent agent memory is a new attack surface. Poisoned memories can alter agent behavior long after the initial compromise.',

    // Technique names
    'tech.AID-H-017': 'System Prompt Hardening',
    'tech.AID-H-027': 'Closed-Loop Prompt Injection Detector Hardening',
    'tech.AID-D-001': 'Adversarial Input &amp; Prompt Injection Detection',
    'tech.AID-H-018': 'Secure Agent Architecture',
    'tech.AID-H-019': 'Tool Authorization &amp; Capability Scoping',
    'tech.AID-M-009': 'Agent Autonomy &amp; Authority Governance',
    'tech.AID-H-025': 'Tool &amp; MCP Resolution Integrity',
    'tech.AID-H-029': 'MCP &amp; Tool Client Security Hardening',
    'tech.AID-D-003.004': 'Tool-Call Sequence Anomaly Detection',
    'tech.AID-H-021': 'RAG Index Hygiene &amp; Signing',
    'tech.AID-D-014': 'RAG Content &amp; Relevance Monitoring',
    'tech.AID-R-005': 'Rapid Vector Index Rollback &amp; Quarantine',
    'tech.AID-H-003.003': 'Dataset Supply Chain Validation',
    'tech.AID-H-002.007': 'External Media &amp; Document Provenance Verification',
    'tech.AID-D-004.001': 'Static Artifact Hash &amp; Signature Verification',
    'tech.AID-H-026': 'Unsafe Code Execution Prevention',
    'tech.AID-H-032': 'AI-Generated Code Admission Control &amp; Safe Promotion',
    'tech.AID-I-001.005': 'Pre-Execution Behavioral Analysis in Sandboxes',
    'tech.AID-D-011.002': 'Inter-Agent Security &amp; Consensus Monitoring',
    'tech.AID-D-011.003': 'Agent Population Drift &amp; Rogue-Instance Escalation',
    'tech.AID-D-016': 'Rogue Agent Discovery, Reputation &amp; Quarantine',
    'tech.AID-DV-001': 'Honeypot AI Services &amp; Decoy Models/APIs',
    'tech.AID-DV-005': 'Decoy Agent Behaviors &amp; Canary Tasks',
    'tech.AID-DV-002': 'Honey Data, Decoy Artifacts &amp; Canary Tokens',
    'tech.AID-M-002.004': 'Trust-Tiered Memory/KB Write-Gate',
    'tech.AID-I-004.005': 'Memory TTL, Staleness Decay &amp; Forced Forgetting',
    'tech.AID-I-004.003': 'Cryptographic Memory Integrity',

    // Threat Frameworks
    'frameworks.label': 'Comprehensive Coverage',
    'frameworks.title': 'Mapped to Industry-Leading Threat Frameworks',
    'frameworks.subtitle': 'Every defensive technique is explicitly mapped to known threats from the most critical AI security frameworks.',

    // Mission
    'mission.label': 'Our Mission',
    'mission.title': 'AI Security Should Be <span class="text-gradient">Accessible to All</span>',
    'mission.statement': 'We believe that defending AI systems shouldn\'t be a privilege reserved for the largest organizations. Our mission is to democratize AI security defenses by developing and maintaining accessible frameworks, guidance, tools, and services that empower everyone to adopt AI safely and responsibly.',
    'mission.open.title': 'Open Knowledge',
    'mission.open.desc': 'Freely accessible security intelligence and defensive guidance for the entire AI community.',
    'mission.practical.title': 'Practical Defenses',
    'mission.practical.desc': 'Real-world countermeasures with implementation guidance, code examples, and tool recommendations.',
    'mission.community.title': 'Community First',
    'mission.community.desc': 'Built for the community. Every contribution strengthens the collective defense of AI systems worldwide.',

    // Roadmap
    'roadmap.label': "What's Next",
    'roadmap.title': 'Building the Future of <span class="text-gradient">AI Defense</span>',
    'roadmap.desc': 'The AIDEFEND framework is just the beginning. We\'re actively building new tools, services, and capabilities to make AI security more actionable, automated, and accessible for teams of all sizes.',
    'roadmap.tooling': 'Advanced Tooling',
    'roadmap.api': 'API &amp; Integrations',
    'roadmap.enterprise': 'Enterprise Solutions',
    'roadmap.community': 'Community Platform',
    'roadmap.stay': 'Stay connected &mdash; more announcements coming soon.',

    // Footer
    'footer.pbc': 'Public Benefit Corporation',
    'footer.framework': 'Framework',
    'footer.mcp': 'MCP Service',
    'footer.github': 'GitHub',
    'footer.linkedin': 'LinkedIn',
    'footer.rights': 'All rights reserved.',
    'footer.mission': 'Democratizing AI security defenses for organizations, developers, and the broader public.',
  },

  'zh-TW': {
    // Nav
    'nav.framework': '框架',
    'nav.mission': '關於我們',
    'nav.whats-next': '接下來',
    'nav.explore': '探索 AIDEFEND',

    // Hero
    'hero.title.line1': '讓每個人都能做好',
    'hero.title.line2': 'AI 資安防禦',
    'hero.subtitle': '我們做的是<strong class="text-gradient">技術面、能夠實作和執行、講重點的</strong> AI 資安防禦框架跟工具 &mdash; 不是虛無飄渺高高在上的合規清單 &mdash; 讓資安團隊和開發者拿到能直接用的防禦手段，真正擋住 AI 系統的資安威脅。',
    'hero.cta.explore': '看看框架',
    'hero.cta.mcp': 'MCP 服務',
    'hero.techline': 'SECURE BY DESIGN',

    // Framework section
    'framework.label': '核心專案',
    'framework.title': 'AIDEFEND 框架',
    'framework.subtitle': '<strong class="text-gradient">免費、開源。</strong> AIDEFEND 是實戰導向的技術框架 &mdash; 每個防禦技術都有實作教學、架構範例跟可以直接拿來用 (或是參考) 的 code，讓你的團隊部署真正的防護，不只是寫政策。',
    'framework.stat1': '威脅框架對應',
    'framework.stat2': '防禦技術',
    'framework.stat3': '實作指引',
    'framework.stat4': '策略視角',
    'framework.tactics.title': 'Tactics 視角',
    'framework.tactics.desc': '從策略功能來看防禦：建模、強化、偵測、隔離、欺敵、驅逐、復原 &mdash; 每項都有 code 範例和實作指引。',
    'framework.pillars.title': 'Pillars 視角',
    'framework.pillars.desc': '依技術架構層來組織：資料層、模型層、基礎設施層、應用層，搭配實際的架構設計。',
    'framework.phases.title': 'Phases 視角',
    'framework.phases.desc': '在 AI 生命週期的每個階段植入安全：設計、開發、驗證、營運、應變、復原。',
    'framework.frameworks.title': 'Frameworks 視角',
    'framework.frameworks.desc': '所有防禦都對應到 MITRE ATLAS、OWASP、MAESTRO、NIST 等 5 個以上的威脅框架。',
    'framework.visit': '前往 aidefend.net',

    // Hot Topics
    'topics.label': 'AI 防禦知識庫',
    'topics.title': '完整覆蓋 <span class="text-gradient">AI 威脅面向</span>',
    'topics.subtitle': '從 Prompt Injection 到自主 Agent 群集 &mdash; 持續擴充的防禦知識庫，涵蓋每個主要 AI 攻擊面的實作指引與程式碼範例。',

    'topics.prompt.title': 'Prompt Injection',
    'topics.prompt.desc': 'LLM 頭號威脅。攻擊者透過精心設計的輸入操控模型行為，直接蓋掉系統指令。',
    'topics.agentic.title': 'Agentic AI 安全',
    'topics.agentic.desc': '自主 Agent 帶來新的風險 &mdash; 未授權操作、目標偏移、跨工具鏈的權限升級。',
    'topics.mcp.title': 'MCP 與工具安全',
    'topics.mcp.desc': 'MCP 協定擴大了攻擊面。工具投毒、Registry 偽造、TOCTOU 攻擊都在威脅 Agent 的工作流。',
    'topics.rag.title': 'RAG 投毒防禦',
    'topics.rag.desc': '攻擊者把惡意內容塞進 Vector Store 跟知識庫，汙染整條 RAG Pipeline。',
    'topics.data.title': '資料投毒與供應鏈',
    'topics.data.desc': '被汙染的訓練資料和不可信的模型檔，從根基就破壞 AI 的完整性。',
    'topics.code.title': 'AI 生成程式碼安全',
    'topics.code.desc': 'AI 寫的 code 可能有漏洞甚至是惡意的。需要准入控制來擋住不安全的程式碼進 production。',
    'topics.swarm.title': '多 Agent 與群集安全',
    'topics.swarm.desc': '當多個 Agent 自主協作，惡意的可以混進去。要在影響擴散前抓到被入侵的 Agent。',
    'topics.deception.title': 'AI 欺敵與蜜罐',
    'topics.deception.desc': '反過來釣攻擊者。部署假的 AI 服務、Canary 任務和蜜罐資料，即時偵測並研究對手。',
    'topics.memory.title': 'AI 記憶與狀態安全',
    'topics.memory.desc': 'Agent 的持久化記憶是新的攻擊面。被汙染的記憶可以在初始入侵後持續影響 Agent 的行為。',

    // Technique names - 保留英文技術名稱，更易辨識
    'tech.AID-H-017': 'System Prompt 強化',
    'tech.AID-H-027': '閉環 Prompt Injection 偵測器強化',
    'tech.AID-D-001': '對抗性輸入與 Prompt Injection 偵測',
    'tech.AID-H-018': '安全 Agent 架構',
    'tech.AID-H-019': '工具授權與能力範圍限定',
    'tech.AID-M-009': 'Agent 自主性與權限治理',
    'tech.AID-H-025': '工具與 MCP 解析完整性',
    'tech.AID-H-029': 'MCP 與工具端安全強化',
    'tech.AID-D-003.004': 'Tool Call 序列異常偵測',
    'tech.AID-H-021': 'RAG Index 清理與簽章',
    'tech.AID-D-014': 'RAG 內容與相關性監控',
    'tech.AID-R-005': 'Vector Index 快速回滾與隔離',
    'tech.AID-H-003.003': 'Dataset 供應鏈驗證',
    'tech.AID-H-002.007': '外部媒體與文件來源驗證',
    'tech.AID-D-004.001': '靜態 Artifact Hash 與簽章驗證',
    'tech.AID-H-026': '不安全程式碼執行防護',
    'tech.AID-H-032': 'AI 生成程式碼准入控制',
    'tech.AID-I-001.005': 'Sandbox 執行前行為分析',
    'tech.AID-D-011.002': '跨 Agent 安全與共識監控',
    'tech.AID-D-011.003': 'Agent 群體漂移與異常實例升級',
    'tech.AID-D-016': '惡意 Agent 發現、評分與隔離',
    'tech.AID-DV-001': '蜜罐 AI 服務與誘餌模型/API',
    'tech.AID-DV-005': '誘餌 Agent 行為與 Canary 任務',
    'tech.AID-DV-002': '蜜罐資料、誘餌 Artifact 與 Canary Token',
    'tech.AID-M-002.004': '信任分級記憶寫入閘門',
    'tech.AID-I-004.005': '記憶 TTL、過期衰減與強制遺忘',
    'tech.AID-I-004.003': '記憶加密完整性驗證',

    // Threat Frameworks
    'frameworks.label': '完整對應',
    'frameworks.title': '對應業界主流威脅框架',
    'frameworks.subtitle': '每個防禦技術都明確對應到主流 AI 資安框架裡的已知威脅。',

    // Mission
    'mission.label': '關於我們',
    'mission.title': 'AI 資安<span class="text-gradient">不該只有大公司才做得到</span>',
    'mission.statement': '我們相信保護 AI 系統不該是大企業的專利。我們的目標是打造好用的框架、指引、工具跟服務，讓不管什麼規模的團隊都能安全地導入 AI。',
    'mission.open.title': '開放知識',
    'mission.open.desc': '免費公開的資安情報與防禦指引，整個 AI 社群都能用。',
    'mission.practical.title': '實戰導向',
    'mission.practical.desc': '能用在真實環境的防禦對策，附帶實作教學、程式碼範例跟工具推薦。',
    'mission.community.title': '社群為本',
    'mission.community.desc': '為社群而做。每一份貢獻都在強化全球 AI 系統的防禦力。',

    // Roadmap
    'roadmap.label': '接下來',
    'roadmap.title': '打造 <span class="text-gradient">AI 防禦</span>的下一步',
    'roadmap.desc': 'AIDEFEND 框架只是開始。我們正在積極開發新工具、新服務、新功能，讓 AI 資安更好落地、更自動化，不管團隊大小都能用。',
    'roadmap.tooling': '進階工具',
    'roadmap.api': 'API 與整合',
    'roadmap.enterprise': '企業方案',
    'roadmap.community': '社群平台',
    'roadmap.stay': '持續關注 &mdash; 更多消息即將公布。',

    // Footer
    'footer.pbc': '公益公司',
    'footer.framework': '框架',
    'footer.mcp': 'MCP 服務',
    'footer.github': 'GitHub',
    'footer.linkedin': 'LinkedIn',
    'footer.rights': '保留所有權利。',
    'footer.mission': '讓每個組織、每個開發者都能做好 AI 資安防禦。',
  }
};

(function() {
  const STORAGE_KEY = 'aidefend-lang';

  function getCurrentLang() {
    return localStorage.getItem(STORAGE_KEY) || 'en';
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations(lang);
    updateToggleButton(lang);
    document.documentElement.lang = lang === 'zh-TW' ? 'zh-TW' : 'en';
  }

  function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key] !== undefined) {
        el.innerHTML = t[key];
      }
    });
  }

  function updateToggleButton(lang) {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    const labelEl = btn.querySelector('.lang-toggle-label');
    if (labelEl) {
      labelEl.textContent = lang === 'en' ? '中文' : 'EN';
    }
    btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');
  }

  function createToggleButton() {
    const btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.className = 'lang-toggle';
    btn.type = 'button';

    const lang = getCurrentLang();
    btn.setAttribute('aria-label', lang === 'en' ? 'Switch to Chinese' : 'Switch to English');

    btn.innerHTML = `
      <svg class="lang-toggle-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
      <span class="lang-toggle-label">${lang === 'en' ? '中文' : 'EN'}</span>
    `;

    btn.addEventListener('click', () => {
      const current = getCurrentLang();
      setLang(current === 'en' ? 'zh-TW' : 'en');
    });

    return btn;
  }

  function init() {
    // Insert toggle button into nav-inner (outside nav-links so it's always visible)
    const navInner = document.querySelector('.nav-inner');
    const navToggle = document.querySelector('.nav-toggle');
    if (navInner) {
      const btn = createToggleButton();
      // Insert before the hamburger toggle (or at the end if no toggle)
      if (navToggle) {
        navInner.insertBefore(btn, navToggle);
      } else {
        navInner.appendChild(btn);
      }
    }

    // Apply saved language
    const lang = getCurrentLang();
    if (lang !== 'en') {
      applyTranslations(lang);
      document.documentElement.lang = 'zh-TW';
    }
    updateToggleButton(lang);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
