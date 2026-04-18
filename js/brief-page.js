(function() {
  function getI18n() {
    return window.AIDEFEND_I18N || {
      translations: { en: {}, 'zh-TW': {} },
      getCurrentLang: () => 'en',
    };
  }

  function sanitizeHtml(value) {
    return window.DOMPurify.sanitize(String(value || ''));
  }

  function sanitizeText(value) {
    return window.DOMPurify.sanitize(String(value || ''), {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
    });
  }

  function renderParagraphs(value, className) {
    const classAttr = className ? ` class="${className}"` : '';
    return String(value || '')
      .split(/\n\n+/)
      .map((part) => part.trim())
      .filter(Boolean)
      .map((part) => `<p${classAttr}>${sanitizeText(part)}</p>`)
      .join('');
  }

  function escapeAttr(value) {
    return sanitizeText(value)
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function safeExternalUrl(value) {
    const candidate = String(value || '').trim();
    return /^https?:\/\//i.test(candidate) ? candidate : '#';
  }

  function t(key) {
    const i18n = getI18n();
    const lang = i18n.getCurrentLang();
    return (i18n.translations[lang] && i18n.translations[lang][key])
      || (i18n.translations.en && i18n.translations.en[key])
      || key;
  }

  function getLocale() {
    return getI18n().getCurrentLang() === 'zh-TW' ? 'zh-TW' : 'en-US';
  }

  function formatDate(dateString) {
    return new Intl.DateTimeFormat(getLocale(), {
      year: 'numeric',
      month: getLocale() === 'zh-TW' ? 'long' : 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${dateString}T00:00:00Z`));
  }

  function formatDateTime(value) {
    const candidate = String(value || '').trim();
    if (!candidate) return '';

    if (/^\d{4}$/.test(candidate)) {
      return new Intl.DateTimeFormat(getLocale(), {
        year: 'numeric',
        timeZone: 'UTC',
      }).format(new Date(`${candidate}-01-01T00:00:00Z`));
    }

    if (/^\d{4}-\d{2}$/.test(candidate)) {
      return new Intl.DateTimeFormat(getLocale(), {
        year: 'numeric',
        month: getLocale() === 'zh-TW' ? 'long' : 'short',
        timeZone: 'UTC',
      }).format(new Date(`${candidate}-01T00:00:00Z`));
    }

    const hasTime = candidate.includes('T');
    const normalized = /^\d{4}-\d{2}-\d{2}$/.test(candidate) ? `${candidate}T00:00:00Z` : candidate;
    const parsed = new Date(normalized);

    if (Number.isNaN(parsed.getTime())) {
      return sanitizeText(candidate);
    }

    return new Intl.DateTimeFormat(getLocale(), {
      year: 'numeric',
      month: getLocale() === 'zh-TW' ? 'long' : 'short',
      day: 'numeric',
      hour: hasTime ? 'numeric' : undefined,
      minute: hasTime ? '2-digit' : undefined,
      timeZone: 'UTC',
    }).format(parsed);
  }

  function getSourceTypeLabel(type) {
    const lang = getI18n().getCurrentLang();
    const labels = {
      en: {
        article: 'Article',
        paper: 'Paper',
        cve: 'CVE',
        blog: 'Blog',
        report: 'Report',
        advisory: 'Advisory',
      },
      'zh-TW': {
        article: '\u6587\u7ae0',
        paper: '\u8ad6\u6587',
        cve: 'CVE',
        blog: '\u90e8\u843d\u683c',
        report: '\u5831\u544a',
        advisory: '\u516c\u544a',
      },
    };
    return (labels[lang] && labels[lang][type]) || labels.en[type] || sanitizeText(type);
  }

  function effectClass(effectiveness) {
    return `aia-effectiveness aia-effectiveness-${sanitizeText(effectiveness)}`;
  }

  function tagClass(tag) {
    const groups = {
      red: ['Prompt Injection', 'Jailbreak'],
      purple: ['Model Theft', 'Model Poisoning'],
      cyan: ['Infrastructure', 'MCP Security'],
      green: ['Defense', 'Detection'],
      amber: ['Supply Chain', 'Data Poisoning'],
      blue: ['General', 'LLM Safety', 'RAG', 'Agentic AI'],
    };
    const match = Object.keys(groups).find((name) => groups[name].includes(tag));
    return `aia-tag ${match ? `aia-tag-${match}` : 'aia-tag-blue'}`;
  }

  function icon(name) {
    const icons = {
      threat: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 11 4.16-.26 8-5.45 8-11V5l-8-3Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>',
      defenses: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5.55 3.84 10.74 8 11 4.16-.26 8-5.45 8-11V5l-8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
      gaps: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
      doNow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.75C9 15.5 9.5 16.5 9.5 18h5c0-1.5.5-2.5 1.5-3.25A7 7 0 0 0 12 2Z"/></svg>',
      conclusion: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15.09 14.37a5 5 0 1 0-6.18 0"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>',
      copy: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
      check: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      print: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>',
    };
    return icons[name];
  }

  function getSectionAnchor(id) {
    return `aia-section-${id}`;
  }

  function renderToolbar() {
    const copyDefault = escapeAttr(t('brief.copy-url'));
    const copyActive = escapeAttr(t('brief.copied'));
    const copyAria = escapeAttr(t('brief.copy-url-aria'));
    const printAria = escapeAttr(t('brief.print-aria'));
    return `
      <div class="aia-toolbar" role="toolbar" aria-label="${escapeAttr(t('brief.toolbar-label'))}">
        <button type="button" class="aia-toolbar-btn" data-action="copy-url" aria-label="${copyAria}">
          <span class="aia-toolbar-btn-icon aia-toolbar-btn-icon-default" aria-hidden="true">${icon('copy')}</span>
          <span class="aia-toolbar-btn-icon aia-toolbar-btn-icon-active" aria-hidden="true">${icon('check')}</span>
          <span class="aia-toolbar-btn-label" data-default="${copyDefault}" data-active="${copyActive}">${sanitizeText(t('brief.copy-url'))}</span>
        </button>
        <button type="button" class="aia-toolbar-btn" data-action="print" aria-label="${printAria}">
          <span class="aia-toolbar-btn-icon" aria-hidden="true">${icon('print')}</span>
          <span class="aia-toolbar-btn-label">${sanitizeText(t('brief.print'))}</span>
        </button>
      </div>
    `;
  }

  function legacyCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (error) {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }

  function flashToolbarButton(button, labelKey, duration) {
    const labelEl = button.querySelector('.aia-toolbar-btn-label');
    if (!labelEl) return;
    const defaultText = labelEl.getAttribute('data-default') || labelEl.textContent;
    const activeText = labelKey === 'active'
      ? (labelEl.getAttribute('data-active') || defaultText)
      : sanitizeText(t('brief.copy-failed'));
    labelEl.textContent = activeText;
    button.classList.add(labelKey === 'active' ? 'is-copied' : 'is-error');
    window.setTimeout(() => {
      labelEl.textContent = defaultText;
      button.classList.remove('is-copied', 'is-error');
    }, duration);
  }

  function setupToolbar(scope) {
    const copyBtn = scope.querySelector('[data-action="copy-url"]');
    const printBtn = scope.querySelector('[data-action="print"]');

    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const url = window.location.href;
        const onSuccess = () => flashToolbarButton(copyBtn, 'active', 2000);
        const onFailure = () => flashToolbarButton(copyBtn, 'error', 2000);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(onSuccess).catch(() => {
            if (legacyCopy(url)) onSuccess();
            else onFailure();
          });
        } else if (legacyCopy(url)) {
          onSuccess();
        } else {
          onFailure();
        }
      });
    }

    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  function renderDefense(defense) {
    const techniqueId = sanitizeText(defense.id);
    const effectiveness = sanitizeText(defense.effectiveness);
    const viewLabel = escapeAttr(t('brief.view-technique'));
    const externalIcon = '<svg class="aia-defense-id-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>';
    return `
      <article class="aia-defense-item">
        <div class="aia-defense-top">
          <div>
            <a class="aia-defense-id" href="https://aidefend.net/#t=${encodeURIComponent(techniqueId)}" target="_blank" rel="noopener" aria-label="${viewLabel}: ${techniqueId}">
              <span>${techniqueId}</span>${externalIcon}
            </a>
            <div class="aia-defense-name">${sanitizeText(defense.name)}</div>
          </div>
          <span class="${effectClass(effectiveness)}">${sanitizeText(t(`brief.effectiveness.${effectiveness}`))}</span>
        </div>
        <div class="aia-defense-relevance aia-inline-rich-text">${sanitizeHtml(defense.relevance)}</div>
      </article>
    `;
  }

  function renderGap(gap) {
    const suggestion = gap.suggestion
      ? `<div class="aia-gap-suggestion aia-inline-rich-text"><strong>${sanitizeText(t('brief.gap-suggestion'))}:</strong> ${sanitizeHtml(gap.suggestion)}</div>`
      : '';
    return `
      <article class="aia-gap-item">
        <h3 class="aia-gap-area">${sanitizeText(gap.area)}</h3>
        <div class="aia-gap-description aia-inline-rich-text">${sanitizeHtml(gap.description)}</div>
        ${suggestion}
      </article>
    `;
  }

  function renderMiniStat(value, labelKey) {
    return `
      <div class="aia-mini-stat">
        <span class="aia-mini-stat-value">${sanitizeText(value)}</span>
        <span class="aia-mini-stat-label">${sanitizeText(t(labelKey))}</span>
      </div>
    `;
  }

  function buildSections(content, defenses, gaps) {
    const sections = [
      {
        id: 'threat',
        column: 'full',
        navLabel: sanitizeText(t('brief.threat')),
        title: sanitizeText(t('brief.threat')),
        className: 'aia-section-threat',
        iconName: 'threat',
        body: `<div class="aia-rich-text">${sanitizeHtml(content.threatAnalysis)}</div>`,
      },
      {
        id: 'defenses',
        column: 'full',
        navLabel: sanitizeText(t('brief.defenses-title')),
        title: sanitizeText(t('brief.defenses-count').replace('{n}', String(defenses.length))),
        className: 'aia-section-defenses',
        iconName: 'defenses',
        body: `<div class="aia-defense-list" data-count="${defenses.length}">${defenses.map(renderDefense).join('')}</div>`,
      },
      {
        id: 'do-now',
        column: 'full',
        navLabel: sanitizeText(t('brief.do-now')),
        title: sanitizeText(t('brief.do-now')),
        className: 'aia-section-do-now',
        iconName: 'doNow',
        body: `<div class="aia-rich-text">${sanitizeHtml(content.whatDefendersShouldDoNow)}</div>`,
      },
    ];

    if (gaps.length > 0) {
      sections.push({
        id: 'gaps',
        column: 'full',
        navLabel: sanitizeText(t('brief.gaps-title')),
        title: `${sanitizeText(String(gaps.length))} ${sanitizeText(t('brief.gaps-count'))}`,
        className: 'aia-section-gaps',
        iconName: 'gaps',
        body: `<div class="aia-gap-list">${gaps.map(renderGap).join('')}</div>`,
      });
    }

    sections.push({
      id: 'conclusion',
      column: 'full',
      navLabel: sanitizeText(t('brief.conclusion')),
      title: sanitizeText(t('brief.conclusion')),
      className: 'aia-section-conclusion',
      iconName: 'conclusion',
      body: `<div class="aia-rich-text">${sanitizeHtml(content.conclusion)}</div>`,
    });

    return sections;
  }

  function renderSectionNav(sections) {
    return `
      <div class="aia-detail-outline" role="navigation" aria-label="Brief sections">
        ${sections.map((section) => `
          <a class="aia-outline-link" href="#${getSectionAnchor(section.id)}">
            <span class="aia-outline-link-icon" aria-hidden="true">${icon(section.iconName)}</span>
            <span>${section.navLabel}</span>
          </a>
        `).join('')}
      </div>
    `;
  }

  function renderSection(section) {
    return `
      <section id="${getSectionAnchor(section.id)}" class="glow-card aia-section-card ${section.className}" data-col="${section.column}">
        <div class="aia-section-header">
          <span class="aia-section-icon">${icon(section.iconName)}</span>
          <h2 class="aia-section-title">${section.title}</h2>
        </div>
        ${section.body}
      </section>
    `;
  }

  function isValidBrief(brief) {
    return brief
      && typeof brief === 'object'
      && brief.slug
      && brief.date
      && brief.source
      && brief.en
      && brief['zh-TW'];
  }

  const briefNavState = { index: null, loading: null };

  function loadBriefsIndex() {
    if (briefNavState.index) return Promise.resolve(briefNavState.index);
    if (briefNavState.loading) return briefNavState.loading;
    briefNavState.loading = import('../../data/briefs-index.js')
      .then(async (module) => {
        const indexed = Array.isArray(module.briefs) ? module.briefs : [];
        const checks = await Promise.all(indexed.map(async (brief) => {
          const href = briefPageHref(brief);
          if (!href || href === '#') return null;
          try {
            const response = await fetch(href, { method: 'HEAD', cache: 'no-cache' });
            return response.ok ? brief : null;
          } catch (error) {
            return null;
          }
        }));
        briefNavState.index = checks.filter(Boolean);
        return briefNavState.index;
      })
      .catch(() => {
        briefNavState.index = [];
        return briefNavState.index;
      });
    return briefNavState.loading;
  }

  function briefPageHref(brief) {
    const month = String(brief.date || '').slice(0, 7);
    const slug = String(brief.slug || '');
    if (!month || !slug) return '#';
    const hasOrder = Number.isInteger(brief.publishOrder) && brief.publishOrder >= 0;
    const prefix = hasOrder ? `${String(brief.publishOrder).padStart(3, '0')}-` : '';
    return `../${month}/${prefix}${slug}.html`;
  }

  function renderBriefNavArrow(direction) {
    if (direction === 'left') {
      return '<svg class="aia-brief-nav-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>';
    }
    return '<svg class="aia-brief-nav-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>';
  }

  function renderBriefNavButton(target, direction, labelKey, ariaKey) {
    const lang = getI18n().getCurrentLang();
    if (!target) {
      return `<span class="aia-brief-nav-btn aia-brief-nav-btn-empty aia-brief-nav-btn-${direction}" aria-hidden="true"></span>`;
    }
    const href = briefPageHref(target);
    const content = (target && target[lang]) || (target && target.en) || {};
    const title = sanitizeText(content.title || target.slug || '');
    const label = sanitizeText(t(labelKey));
    const aria = escapeAttr(t(ariaKey));
    const date = target.date ? sanitizeText(formatDate(target.date)) : '';
    const arrow = renderBriefNavArrow(direction);
    const pieces = [
      `<span class="aia-brief-nav-direction">${direction === 'left' ? arrow : ''}<span class="aia-brief-nav-label">${label}</span>${direction === 'right' ? arrow : ''}</span>`,
      `<span class="aia-brief-nav-title">${title}</span>`,
      date ? `<span class="aia-brief-nav-date">${date}</span>` : '',
    ].join('');
    return `<a class="aia-brief-nav-btn aia-brief-nav-btn-${direction}" href="${escapeAttr(href)}" aria-label="${aria}">${pieces}</a>`;
  }

  function findSiblings(currentSlug) {
    const index = briefNavState.index || [];
    const pos = index.findIndex((item) => item && item.slug === currentSlug);
    if (pos === -1) return { newer: null, older: null };
    return {
      newer: pos > 0 ? index[pos - 1] : null,
      older: pos < index.length - 1 ? index[pos + 1] : null,
    };
  }

  function goToBrief(brief) {
    if (!brief) return;
    const href = briefPageHref(brief);
    if (href && href !== '#') window.location.href = href;
  }

  function isTypingTarget(node) {
    if (!node) return false;
    if (node.isContentEditable) return true;
    const tag = node.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  }

  function hasHorizontalScrollAncestor(node) {
    let el = node;
    while (el && el !== document.body && el.nodeType === 1) {
      if (el.scrollWidth > el.clientWidth + 1) {
        const style = window.getComputedStyle(el);
        if (/(auto|scroll)/.test(style.overflowX)) return true;
      }
      el = el.parentElement;
    }
    return false;
  }

  function setupBriefNavigation(currentSlug) {
    if (!currentSlug) return;

    document.addEventListener('keydown', (event) => {
      if (event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      if (isTypingTarget(event.target)) return;

      loadBriefsIndex().then(() => {
        const { newer, older } = findSiblings(currentSlug);
        const target = event.key === 'ArrowLeft' ? newer : older;
        if (target) goToBrief(target);
      });
    });

    const SWIPE_MIN_DISTANCE = 80;
    const SWIPE_MAX_DURATION = 700;
    const SWIPE_HORIZONTAL_RATIO = 2;
    const EDGE_EXCLUSION = 30;
    let touchStart = null;

    document.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) { touchStart = null; return; }
      const t = event.touches[0];
      if (t.clientX < EDGE_EXCLUSION || t.clientX > window.innerWidth - EDGE_EXCLUSION) {
        touchStart = null;
        return;
      }
      if (isTypingTarget(event.target)) { touchStart = null; return; }
      touchStart = { x: t.clientX, y: t.clientY, time: Date.now(), target: event.target };
    }, { passive: true });

    document.addEventListener('touchmove', (event) => {
      if (!touchStart || event.touches.length !== 1) return;
      const t = event.touches[0];
      if (Math.abs(t.clientY - touchStart.y) > 60
          && Math.abs(t.clientY - touchStart.y) > Math.abs(t.clientX - touchStart.x)) {
        touchStart = null;
      }
    }, { passive: true });

    document.addEventListener('touchend', (event) => {
      if (!touchStart) return;
      const start = touchStart;
      touchStart = null;
      if (event.changedTouches.length !== 1) return;

      const t = event.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const dt = Date.now() - start.time;

      if (dt > SWIPE_MAX_DURATION) return;
      if (Math.abs(dx) < SWIPE_MIN_DISTANCE) return;
      if (Math.abs(dx) < Math.abs(dy) * SWIPE_HORIZONTAL_RATIO) return;
      if (hasHorizontalScrollAncestor(start.target)) return;

      loadBriefsIndex().then(() => {
        const { newer, older } = findSiblings(currentSlug);
        const target = dx > 0 ? newer : older;
        if (target) goToBrief(target);
      });
    }, { passive: true });

    document.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  }

  function applyBriefNav(currentSlug) {
    const host = document.getElementById('aia-brief-nav');
    if (!host) return;
    const index = briefNavState.index || [];
    if (!index.length) {
      host.innerHTML = '';
      return;
    }
    const pos = index.findIndex((item) => item && item.slug === currentSlug);
    if (pos === -1) {
      host.innerHTML = '';
      return;
    }
    const newer = pos > 0 ? index[pos - 1] : null;
    const older = pos < index.length - 1 ? index[pos + 1] : null;
    if (!newer && !older) {
      host.innerHTML = '';
      return;
    }
    host.innerHTML = `
      <nav class="aia-brief-nav" aria-label="${escapeAttr(t('brief.nav.label'))}">
        ${renderBriefNavButton(newer, 'left', 'brief.nav.newer', 'brief.nav.newer-aria')}
        ${renderBriefNavButton(older, 'right', 'brief.nav.older', 'brief.nav.older-aria')}
      </nav>
    `;
  }

  function renderBrief(brief) {
    const root = document.getElementById('brief-app');
    if (!root) return;

    if (!isValidBrief(brief)) {
      root.innerHTML = `
        <section class="aia-error">
          <div class="glow-card">
            <h1>${sanitizeText(t('brief.invalid'))}</h1>
            <p>${sanitizeText(t('aia.coming-soon'))}</p>
          </div>
        </section>
      `;
      return;
    }

    const lang = getI18n().getCurrentLang();
    const content = brief[lang] || brief.en;
    const gaps = Array.isArray(content.gaps) ? content.gaps : [];
    const defenses = Array.isArray(content.defenses) ? content.defenses : [];
    const tags = Array.isArray(brief.tags) ? brief.tags : [];
    const sections = buildSections(content, defenses, gaps);
    const sourceMetaParts = [];

    if (brief.source.author) {
      sourceMetaParts.push(`${sanitizeText(t('brief.by'))} ${sanitizeText(brief.source.author)}`);
    }
    if (brief.source.authoredAt) {
      sourceMetaParts.push(`${sanitizeText(t('brief.originally-published'))}: ${sanitizeText(formatDateTime(brief.source.authoredAt))}`);
    }

    root.innerHTML = `
      <section class="aia-detail-shell">
        <div class="aia-detail-inner">
          <div class="aia-detail-top">
            <nav class="aia-breadcrumb" aria-label="Breadcrumb">
              <a href="../">AIDEFEND in Action</a>
              <span class="aia-breadcrumb-sep">/</span>
              <span>${sanitizeText(content.title)}</span>
            </nav>
          </div>

          <header class="glow-card aia-brief-header">
            <div class="aia-brief-header-grid">
              <div class="aia-brief-header-main">
                <div class="aia-header-meta">
                  <span class="aia-source-badge aia-source-${sanitizeText(brief.source.type)}">${getSourceTypeLabel(brief.source.type)}</span>
                  <span class="aia-header-date">${sanitizeText(t('brief.published'))}: ${sanitizeText(formatDate(brief.date))}</span>
                </div>
                <h1 class="aia-brief-title">${sanitizeText(content.title)}</h1>
                ${renderParagraphs(content.summary, 'aia-brief-summary')}
                <div class="aia-card-tags">
                  ${tags.map((tag) => `<span class="${tagClass(tag)}">${sanitizeText(tag)}</span>`).join('')}
                </div>
              </div>

              <div class="aia-brief-aside">
                <div class="aia-brief-aside-toolbar">${renderToolbar()}</div>
                <div class="aia-brief-kpis">
                  ${renderMiniStat(String(defenses.length), 'brief.defense-count-short')}
                </div>

                <div class="aia-source-panel">
                  <a class="aia-source-link" href="${safeExternalUrl(brief.source.url)}" target="_blank" rel="noopener">
                    ${sanitizeText(t('brief.source'))}: ${sanitizeText(brief.source.title)}&nbsp;<span class="aia-source-arrow" aria-hidden="true">&nearr;</span>
                  </a>
                  ${sourceMetaParts.length
                    ? `<div class="aia-source-meta">${sourceMetaParts.join(' <span class="aia-source-meta-sep">&middot;</span> ')}</div>`
                    : ''}
                </div>
              </div>
            </div>
          </header>

          ${renderSectionNav(sections)}

          <div class="aia-sections-grid">
            ${sections.map(renderSection).join('')}
          </div>

          <div id="aia-brief-nav" class="aia-brief-nav-host"></div>
        </div>
      </section>
    `;

    document.title = `${content.title} | AIDEFEND in Action`;
    setupToolbar(root);
    setupSectionNavScroll(root);

    loadBriefsIndex().then(() => applyBriefNav(brief.slug));
  }

  function setupSectionNavScroll(root) {
    const outline = root.querySelector('.aia-detail-outline');
    if (!outline) return;
    const header = root.querySelector('.aia-brief-header');
    outline.querySelectorAll('a.aia-outline-link').forEach((link) => {
      link.addEventListener('click', (event) => {
        const href = link.getAttribute('href') || '';
        if (!href.startsWith('#')) return;
        const target = document.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        const navHeight = parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue('--nav-height')
        ) || 72;
        const outlineHeight = outline.getBoundingClientRect().height;
        const headerBottom = header
          ? header.getBoundingClientRect().bottom + window.scrollY
          : 0;
        const stickyThreshold = Math.max(0, headerBottom - navHeight);
        const targetDocTop = target.getBoundingClientRect().top + window.scrollY;
        const desiredScroll = targetDocTop - (navHeight + outlineHeight + 8);
        const finalScroll = Math.max(desiredScroll, stickyThreshold + 20);
        window.scrollTo({ top: finalScroll, behavior: 'smooth' });
        if (history.pushState) {
          history.pushState(null, '', href);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const dataEl = document.getElementById('brief-data');
    if (!dataEl) return;

    let brief = null;
    try {
      brief = JSON.parse(dataEl.textContent);
    } catch (error) {
      brief = null;
    }

    renderBrief(brief);
    document.addEventListener('aidefend:langchange', () => renderBrief(brief));

    if (brief && brief.slug) setupBriefNavigation(brief.slug);
  });
})();
