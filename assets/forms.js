/* Hayat form kit · premium controls shared by every template.
   Load after hayat.js and data.js. Styles: forms.css.

   HF.select(host, { label, icon, options, value, placeholder, search, groups, onChange })
     options: [{ value, label, sub?, code?, icon?, disabled?, group? }]  (label/sub may be {ar,en})
   HF.airport(host, { label, icon, value, exclude, onChange })     → IATA picker (recent + popular + search)
   HF.dates(host, { label, range, value:[Date,Date?], min, months, price(date)→number|null, onChange })
   HF.pax(host, { label, icon, rows:[{key,label,sub,min,max,value}], cabin?, summary(values)→string, onChange })
   HF.seg(el, { options:[{value,label}], value, onChange })        → segmented control with sliding pill
   HF.swap(button, a, b)                                             → swaps two HF.airport controls

   Every control returns { el, get(), set(v), refresh() } and re-renders on HY.onChange (language/theme).
   Panels are appended to <body> and positioned against the field, flipping above when needed. */
(() => {
  const { esc, icon, pick, lang } = window.HY;
  const T = (ar, en) => (lang() === 'ar' ? ar : en);
  const L = (v) => (v && typeof v === 'object' ? pick(v) : v ?? '');
  const nf = new Intl.NumberFormat('en-US');
  let openCtl = null;
  const controls = new Set();

  /* ---------- panel plumbing ---------- */
  function makePanel(cls = '') {
    const p = document.createElement('div');
    p.className = `hf-panel ${cls}`;
    p.hidden = true;
    p.setAttribute('role', 'dialog');
    document.body.appendChild(p);
    return p;
  }
  function place(panel, field, width) {
    const r = field.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    // Phones: every panel becomes a bottom sheet, so nothing runs off screen.
    if (vw <= 640) {
      panel.classList.add('is-sheet');
      Object.assign(panel.style, { position: 'fixed', left: '0px', right: '0px', top: 'auto', bottom: '0px', width: '100%' });
      return;
    }
    panel.classList.remove('is-sheet');
    panel.style.bottom = 'auto'; panel.style.right = 'auto';
    const w = Math.min(width || Math.max(r.width, 300), vw - 24);
    panel.style.width = `${w}px`;
    const rtl = document.documentElement.dir === 'rtl';
    let x = rtl ? r.right - w : r.left;
    x = Math.max(12, Math.min(x, vw - w - 12));
    const ph = panel.offsetHeight || 360;
    const below = r.bottom + 8;
    const fitsBelow = below + ph < window.innerHeight - 8 || r.top < ph + 16;
    const y = fitsBelow ? below : r.top - ph - 8;
    panel.style.position = 'fixed';
    panel.style.left = `${x}px`;
    panel.style.top = `${Math.max(8, y)}px`;
  }
  function open(ctl) {
    if (openCtl && openCtl !== ctl) close(openCtl);
    openCtl = ctl;
    // Inside a modal <dialog> the panel must live in the dialog's top layer, or it renders behind it.
    const host = ctl.field.closest('dialog[open]') || document.body;
    if (ctl.panel.parentNode !== host) host.appendChild(ctl.panel);
    ctl.render(true);
    ctl.panel.hidden = false;
    ctl.field.setAttribute('aria-expanded', 'true');
    place(ctl.panel, ctl.field, ctl.width && ctl.width());
    requestAnimationFrame(() => place(ctl.panel, ctl.field, ctl.width && ctl.width()));
    ctl.onOpen && ctl.onOpen();
  }
  function close(ctl, focusBack) {
    if (!ctl) return;
    ctl.panel.hidden = true;
    ctl.field.setAttribute('aria-expanded', 'false');
    if (openCtl === ctl) openCtl = null;
    if (focusBack) ctl.field.focus();
  }
  document.addEventListener('pointerdown', (e) => {
    if (!openCtl) return;
    if (openCtl.panel.contains(e.target) || openCtl.field.contains(e.target)) return;
    close(openCtl);
  });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && openCtl) close(openCtl, true); });
  const reposition = () => { if (openCtl) place(openCtl.panel, openCtl.field, openCtl.width && openCtl.width()); };
  window.addEventListener('resize', reposition);
  window.addEventListener('scroll', reposition, { passive: true, capture: true });
  window.HY.onChange(() => controls.forEach((c) => c.refresh()));

  function shell(host, { label, icon: ic, caret = true }) {
    const field = document.createElement('button');
    field.type = 'button';
    field.className = 'hf-field';
    field.setAttribute('aria-haspopup', 'dialog');
    field.setAttribute('aria-expanded', 'false');
    host.replaceChildren(field);
    const paint = (value, sub, placeholder, code) => {
      field.innerHTML = `${ic ? icon(ic, { size: 20 }) : ''}
        <span class="hf-body"><span class="hf-label">${esc(L(label))}</span>
        <span class="hf-value ${placeholder ? 'is-placeholder' : ''}">${esc(value)}</span>${sub ? `<span class="hf-sub">${esc(sub)}</span>` : ''}</span>
        ${code ? `<span class="hf-code">${esc(code)}</span>` : ''}${caret ? icon('chevD', { size: 18, cls: 'hf-caret' }) : ''}`;
    };
    return { field, paint };
  }

  /* ---------- listbox (shared by select + airport) ---------- */
  function listbox(ctl, items, { search, placeholder, groups }) {
    const q = (ctl.query || '').trim().toLowerCase();
    const match = (o) => !q || [L(o.label), L(o.sub), o.code, o.value].join(' ').toLowerCase().includes(q);
    const visible = items.filter(match);
    const byGroup = groups && !q ? groups.map((g) => ({ title: L(g.title), items: g.items.filter(match) })).filter((g) => g.items.length) : [{ title: '', items: visible }];
    ctl.flat = byGroup.flatMap((g) => g.items);
    if (ctl.active == null || ctl.active >= ctl.flat.length) ctl.active = Math.max(0, ctl.flat.findIndex((o) => o.value === ctl.value));
    let i = -1;
    const rows = byGroup.map((g) => `${g.title ? `<div class="hf-group-title">${esc(g.title)}</div>` : ''}
      <ul class="hf-list" role="listbox">${g.items.map((o) => { i += 1; return `
        <li class="hf-option ${i === ctl.active ? 'is-active' : ''}" role="option" data-i="${i}" aria-selected="${o.value === ctl.value}" aria-disabled="${!!o.disabled}" ${o.disabled ? 'style="opacity:.45;cursor:default"' : ''}>
          ${o.icon ? icon(o.icon, { size: 18 }) : ''}
          <span class="hf-o-main"><b>${esc(L(o.label))}</b>${o.sub ? `<small>${esc(L(o.sub))}</small>` : ''}</span>
          ${o.code ? `<span class="hf-code">${esc(o.code)}</span>` : ''}${icon('check', { size: 18, cls: 'hf-check' })}
        </li>`; }).join('')}</ul>`).join('');
    ctl.panel.innerHTML = `${search ? `<div class="hf-panel-search">${icon('search', { size: 18 })}<input type="search" value="${esc(ctl.query || '')}" placeholder="${esc(placeholder || T('ابحث…', 'Search…'))}" aria-label="${esc(placeholder || T('ابحث', 'Search'))}" autocomplete="off"></div>` : ''}
      ${ctl.flat.length ? rows : `<div class="hf-empty">${esc(T('لا توجد نتائج مطابقة', 'No matches'))}</div>`}`;
    const input = ctl.panel.querySelector('.hf-panel-search input');
    if (input) {
      input.addEventListener('input', () => { ctl.query = input.value; ctl.active = 0; listbox(ctl, items, { search, placeholder, groups }); const n = ctl.panel.querySelector('.hf-panel-search input'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); });
      input.addEventListener('keydown', (e) => keys(ctl, e, items, { search, placeholder, groups }));
    }
    ctl.panel.querySelectorAll('.hf-option').forEach((li) => {
      li.addEventListener('click', () => { const o = ctl.flat[+li.dataset.i]; if (!o.disabled) ctl.choose(o); });
      li.addEventListener('mousemove', () => { if (ctl.active !== +li.dataset.i) { ctl.active = +li.dataset.i; ctl.panel.querySelectorAll('.hf-option').forEach((x) => x.classList.toggle('is-active', +x.dataset.i === ctl.active)); } });
    });
  }
  function keys(ctl, e, items, opts) {
    if (!ctl.flat || !ctl.flat.length) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      ctl.active = (ctl.active + (e.key === 'ArrowDown' ? 1 : -1) + ctl.flat.length) % ctl.flat.length;
      ctl.panel.querySelectorAll('.hf-option').forEach((x) => x.classList.toggle('is-active', +x.dataset.i === ctl.active));
      ctl.panel.querySelector('.hf-option.is-active')?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const o = ctl.flat[ctl.active]; if (o && !o.disabled) ctl.choose(o);
    }
  }

  /* ---------- select ---------- */
  function select(host, cfg) {
    const ctl = { value: cfg.value ?? cfg.options?.[0]?.value, panel: makePanel(), query: '' };
    const { field, paint } = shell(host, cfg);
    ctl.field = field;
    ctl.width = cfg.width ? () => cfg.width : null;
    const opts = () => (typeof cfg.options === 'function' ? cfg.options() : cfg.options);
    ctl.render = () => listbox(ctl, opts(), { search: cfg.search, placeholder: cfg.searchPlaceholder, groups: cfg.groups && cfg.groups() });
    ctl.refresh = () => {
      const o = opts().find((x) => x.value === ctl.value);
      paint(o ? L(o.label) : L(cfg.placeholder) || T('اختر', 'Select'), o && cfg.showSub ? L(o.sub) : '', !o, o && cfg.showCode ? o.code : '');
      if (!ctl.panel.hidden) ctl.render();
    };
    ctl.choose = (o) => { ctl.value = o.value; ctl.query = ''; close(ctl, true); ctl.refresh(); cfg.onChange && cfg.onChange(o.value, o); };
    ctl.onOpen = () => ctl.panel.querySelector('.hf-panel-search input')?.focus();
    field.addEventListener('click', () => (ctl.panel.hidden ? open(ctl) : close(ctl)));
    field.addEventListener('keydown', (e) => { if (['ArrowDown', 'ArrowUp'].includes(e.key) && ctl.panel.hidden) { e.preventDefault(); open(ctl); } else if (!ctl.panel.hidden) keys(ctl, e); });
    ctl.refresh();
    controls.add(ctl);
    return { el: field, get: () => ctl.value, set: (v) => { ctl.value = v; ctl.refresh(); }, refresh: ctl.refresh };
  }

  /* ---------- airport picker ---------- */
  const RECENT_KEY = 'hayat-recent-airports';
  const POPULAR = ['IST', 'DXB', 'GYD', 'AYT', 'CAI', 'TBS', 'KUL', 'SSH'];
  const COUNTRY = { BGW: ['العراق', 'Iraq'], EBL: ['العراق', 'Iraq'], BSR: ['العراق', 'Iraq'], NJF: ['العراق', 'Iraq'], ISU: ['العراق', 'Iraq'],
    IST: ['تركيا', 'Türkiye'], AYT: ['تركيا', 'Türkiye'], TZX: ['تركيا', 'Türkiye'], DXB: ['الإمارات', 'UAE'], GYD: ['أذربيجان', 'Azerbaijan'],
    TBS: ['جورجيا', 'Georgia'], BUS: ['جورجيا', 'Georgia'], CAI: ['مصر', 'Egypt'], SSH: ['مصر', 'Egypt'], KUL: ['ماليزيا', 'Malaysia'],
    MLE: ['المالديف', 'Maldives'], CDG: ['فرنسا', 'France'], LHR: ['المملكة المتحدة', 'United Kingdom'] };
  function airport(host, cfg) {
    const all = () => (window.HY_DATA?.airports || []).filter((a) => !(cfg.exclude && cfg.exclude().includes(a.code)))
      .map((a) => ({ value: a.code, code: a.code, icon: 'plane', label: a.city, sub: COUNTRY[a.code] ? { ar: COUNTRY[a.code][0], en: COUNTRY[a.code][1] } : '' }));
    const ctl = { value: cfg.value, panel: makePanel(), query: '' };
    const { field, paint } = shell(host, { ...cfg, caret: false });
    ctl.field = field;
    ctl.width = () => Math.max(field.getBoundingClientRect().width, 340);
    const recent = () => { try { return JSON.parse(window.HY.store.get(RECENT_KEY) || '[]'); } catch { return []; } };
    const groups = () => {
      const a = all();
      const r = recent().map((c) => a.find((x) => x.value === c)).filter(Boolean).slice(0, 3);
      const iraq = a.filter((x) => ['BGW', 'EBL', 'BSR', 'NJF', 'ISU'].includes(x.value));
      const pop = POPULAR.map((c) => a.find((x) => x.value === c)).filter(Boolean);
      return [r.length && { title: { ar: 'عمليات بحث حديثة', en: 'Recent searches' }, items: r.map((x) => ({ ...x, icon: 'history' })) },
        cfg.iraqFirst !== false && { title: { ar: 'مطارات العراق', en: 'Iraqi airports' }, items: iraq },
        { title: { ar: 'وجهات شائعة', en: 'Popular destinations' }, items: pop }].filter(Boolean);
    };
    ctl.render = () => listbox(ctl, all(), { search: true, placeholder: T('ابحث عن مدينة أو مطار', 'Search a city or airport'), groups: groups() });
    ctl.refresh = () => {
      const a = (window.HY_DATA?.airports || []).find((x) => x.code === ctl.value);
      paint(a ? L(a.city) : T('اختر المدينة', 'Choose a city'), a && COUNTRY[a.code] ? T(COUNTRY[a.code][0], COUNTRY[a.code][1]) : '', !a, a ? a.code : '');
      if (!ctl.panel.hidden) ctl.render();
    };
    ctl.choose = (o) => {
      ctl.value = o.value; ctl.query = ''; close(ctl, true); ctl.refresh();
      try { const r = [o.value, ...recent().filter((c) => c !== o.value)].slice(0, 5); window.HY.store.set(RECENT_KEY, JSON.stringify(r)); } catch { /* storage blocked */ }
      cfg.onChange && cfg.onChange(o.value);
    };
    ctl.onOpen = () => ctl.panel.querySelector('.hf-panel-search input')?.focus();
    field.addEventListener('click', () => (ctl.panel.hidden ? open(ctl) : close(ctl)));
    ctl.refresh();
    controls.add(ctl);
    return { el: field, get: () => ctl.value, set: (v) => { ctl.value = v; ctl.refresh(); }, refresh: ctl.refresh };
  }

  /* ---------- dates ---------- */
  const DAY = 86400000;
  const strip = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const same = (a, b) => a && b && a.getTime() === b.getTime();
  const MONTHS = { ar: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
  const DOW = { ar: ['سبت', 'أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة'], en: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'] };
  const fmt = (d) => (d ? `${d.getDate()} ${MONTHS[lang()][d.getMonth()]}` : '');
  function dates(host, cfg) {
    const min = strip(cfg.min || new Date());
    const v = cfg.value || [new Date(min.getTime() + 21 * DAY), cfg.range ? new Date(min.getTime() + 26 * DAY) : null];
    const ctl = { a: strip(v[0]), b: v[1] ? strip(v[1]) : null, view: new Date(strip(v[0]).getFullYear(), strip(v[0]).getMonth(), 1), panel: makePanel('hf-calendar'), picking: 'a' };
    const { field, paint } = shell(host, { ...cfg, icon: cfg.icon || 'calendar', caret: false });
    ctl.field = field;
    const months = () => (window.innerWidth < 720 ? 1 : cfg.months || (cfg.range ? 2 : 1));
    ctl.width = () => (months() === 2 ? 660 : 340);
    const monthHTML = (m) => {
      const first = new Date(m.getFullYear(), m.getMonth(), 1);
      const lead = (first.getDay() + 1) % 7; // weeks start on Saturday (Iraq)
      const count = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
      let cells = '';
      for (let i = 0; i < lead; i += 1) cells += '<span></span>';
      for (let d = 1; d <= count; d += 1) {
        const day = new Date(m.getFullYear(), m.getMonth(), d);
        const off = day < min;
        const sel = same(day, ctl.a) || same(day, ctl.b);
        const inr = ctl.a && ctl.b && day > ctl.a && day < ctl.b;
        const p = !off && cfg.price ? cfg.price(day) : null;
        cells += `<button type="button" class="hf-day ${sel ? 'is-sel' : ''} ${inr ? 'is-in' : ''} ${same(day, strip(new Date())) ? 'is-today' : ''}" data-t="${day.getTime()}" ${off ? 'disabled' : ''} aria-pressed="${sel}">${d}${p != null ? `<small>$${nf.format(p)}</small>` : ''}</button>`;
      }
      return `<div class="hf-month"><h4>${MONTHS[lang()][m.getMonth()]} <span class="figure">${m.getFullYear()}</span></h4>
        <div class="hf-dow">${DOW[lang()].map((x) => `<span>${x}</span>`).join('')}</div><div class="hf-days">${cells}</div></div>`;
    };
    ctl.render = () => {
      const n = months();
      const ms = Array.from({ length: n }, (_, i) => new Date(ctl.view.getFullYear(), ctl.view.getMonth() + i, 1));
      const canPrev = ctl.view > new Date(min.getFullYear(), min.getMonth(), 1);
      const prevIc = document.documentElement.dir === 'rtl' ? 'chevR' : 'chevL';
      const nextIc = document.documentElement.dir === 'rtl' ? 'chevL' : 'chevR';
      const hint = cfg.range ? (ctl.picking === 'a' ? T('اختر تاريخ المغادرة', 'Choose departure') : T('اختر تاريخ العودة', 'Choose return')) : T('اختر التاريخ', 'Choose a date');
      ctl.panel.innerHTML = `<div class="hf-cal">
        <div class="hf-cal-head"><button type="button" class="hf-cal-nav" data-nav="-1" ${canPrev ? '' : 'disabled'} aria-label="${T('الشهر السابق', 'Previous month')}">${icon(prevIc, { size: 18 })}</button>
          <b style="font-size:14px;color:var(--hf-label)">${esc(hint)}</b>
          <button type="button" class="hf-cal-nav" data-nav="1" aria-label="${T('الشهر التالي', 'Next month')}">${icon(nextIc, { size: 18 })}</button></div>
        <div class="hf-months" style="--months:${n}">${ms.map(monthHTML).join('')}</div></div>
        <div class="hf-panel-foot"><span>${icon('calendar', { size: 16 })} ${esc(fmt(ctl.a))}${cfg.range ? ` – ${esc(ctl.b ? fmt(ctl.b) : '…')}` : ''}</span>
          ${cfg.price ? `<span style="color:var(--hf-label)">${T('أسعار تقديرية لكل يوم', 'Indicative price per day')}</span>` : ''}</div>`;
      ctl.panel.querySelectorAll('[data-nav]').forEach((b) => b.addEventListener('click', () => { ctl.view = new Date(ctl.view.getFullYear(), ctl.view.getMonth() + +b.dataset.nav, 1); ctl.render(); }));
      ctl.panel.querySelectorAll('.hf-day[data-t]').forEach((b) => b.addEventListener('click', () => {
        const d = new Date(+b.dataset.t);
        if (!cfg.range) { ctl.a = d; close(ctl, true); ctl.refresh(); cfg.onChange && cfg.onChange([ctl.a]); return; }
        if (ctl.picking === 'a' || (ctl.a && d < ctl.a)) { ctl.a = d; ctl.b = null; ctl.picking = 'b'; ctl.render(); return; }
        ctl.b = d; ctl.picking = 'a'; close(ctl, true); ctl.refresh(); cfg.onChange && cfg.onChange([ctl.a, ctl.b]);
      }));
    };
    ctl.refresh = () => {
      // Same month: "12 – 18 أيار"; otherwise "30 تشرين الأول – 4 تشرين الثاني".
      const sameMonth = ctl.b && ctl.a.getMonth() === ctl.b.getMonth();
      const v = cfg.range ? (ctl.b ? (sameMonth ? `${ctl.a.getDate()} – ${fmt(ctl.b)}` : `${fmt(ctl.a)} – ${fmt(ctl.b)}`) : `${fmt(ctl.a)} – ${T('العودة', 'Return')}`) : fmt(ctl.a);
      const nights = cfg.range && ctl.b ? Math.round((ctl.b - ctl.a) / DAY) : 0;
      paint(v, nights ? (cfg.nightsLabel ? cfg.nightsLabel(nights) : T(`${nights} ليالٍ`, `${nights} nights`)) : '', false);
      if (!ctl.panel.hidden) ctl.render();
    };
    field.addEventListener('click', () => (ctl.panel.hidden ? open(ctl) : close(ctl)));
    ctl.refresh();
    controls.add(ctl);
    return { el: field, get: () => (cfg.range ? [ctl.a, ctl.b] : [ctl.a]), set: (vv) => { ctl.a = strip(vv[0]); ctl.b = vv[1] ? strip(vv[1]) : null; ctl.refresh(); }, refresh: ctl.refresh, setRange: (r) => { cfg.range = r; if (!r) ctl.b = null; ctl.refresh(); } };
  }

  /* ---------- passengers / rooms ---------- */
  const CABINS = [{ value: 'economy', label: { ar: 'اقتصادية', en: 'Economy' } }, { value: 'premium', label: { ar: 'مميزة', en: 'Premium' } },
    { value: 'business', label: { ar: 'رجال الأعمال', en: 'Business' } }, { value: 'first', label: { ar: 'الأولى', en: 'First' } }];
  function pax(host, cfg) {
    const ctl = { vals: Object.fromEntries(cfg.rows.map((r) => [r.key, r.value ?? r.min ?? 0])), cabin: cfg.cabin ? (cfg.cabinValue || 'economy') : null, panel: makePanel() };
    const { field, paint } = shell(host, { ...cfg, icon: cfg.icon || 'users' });
    ctl.field = field;
    ctl.width = () => Math.max(360, ctl.field.getBoundingClientRect().width);
    ctl.render = () => {
      ctl.panel.innerHTML = `<div class="hf-steps">${cfg.rows.map((r) => `
        <div class="hf-step"><span class="hf-o-main"><b>${esc(L(r.label))}</b>${r.sub ? `<small>${esc(L(r.sub))}</small>` : ''}</span>
          <span class="hf-stepper"><button type="button" data-k="${r.key}" data-d="-1" aria-label="${T('إنقاص', 'Decrease')} ${esc(L(r.label))}" ${ctl.vals[r.key] <= (r.min ?? 0) ? 'disabled' : ''}>${icon('minus', { size: 16 })}</button>
          <output class="figure">${ctl.vals[r.key]}</output>
          <button type="button" data-k="${r.key}" data-d="1" aria-label="${T('زيادة', 'Increase')} ${esc(L(r.label))}" ${ctl.vals[r.key] >= (r.max ?? 9) ? 'disabled' : ''}>${icon('plus', { size: 16 })}</button></span></div>`).join('')}
        ${cfg.cabin ? `<div style="padding:10px 6px 4px"><div class="hf-label" style="margin-bottom:8px">${T('درجة السفر', 'Cabin class')}</div><div class="hf-seg" data-cabin></div></div>` : ''}
        <button type="button" class="hf-done">${T('تم', 'Done')}</button></div>`;
      ctl.panel.querySelectorAll('[data-k]').forEach((b) => b.addEventListener('click', () => {
        const r = cfg.rows.find((x) => x.key === b.dataset.k);
        ctl.vals[r.key] = Math.min(r.max ?? 9, Math.max(r.min ?? 0, ctl.vals[r.key] + +b.dataset.d));
        ctl.render(); ctl.refresh(true); cfg.onChange && cfg.onChange({ ...ctl.vals, cabin: ctl.cabin });
      }));
      const segEl = ctl.panel.querySelector('[data-cabin]');
      if (segEl) seg(segEl, { options: CABINS, value: ctl.cabin, onChange: (v) => { ctl.cabin = v; ctl.refresh(true); cfg.onChange && cfg.onChange({ ...ctl.vals, cabin: ctl.cabin }); } });
      ctl.panel.querySelector('.hf-done').addEventListener('click', () => close(ctl, true));
    };
    ctl.refresh = (keepOpen) => {
      const sum = cfg.summary ? cfg.summary(ctl.vals) : cfg.rows.map((r) => `${ctl.vals[r.key]} ${L(r.short || r.label)}`).join(' · ');
      const cab = ctl.cabin ? L(CABINS.find((c) => c.value === ctl.cabin).label) : '';
      paint(sum, cab, false);
      if (!keepOpen && !ctl.panel.hidden) ctl.render();
    };
    field.addEventListener('click', () => (ctl.panel.hidden ? open(ctl) : close(ctl)));
    ctl.refresh();
    controls.add(ctl);
    return { el: field, get: () => ({ ...ctl.vals, cabin: ctl.cabin }), set: (v) => { Object.assign(ctl.vals, v); if (v.cabin) ctl.cabin = v.cabin; ctl.refresh(); }, refresh: ctl.refresh };
  }

  /* ---------- segmented control ---------- */
  function seg(el, cfg) {
    let value = cfg.value ?? cfg.options[0].value;
    el.classList.add('hf-seg');
    if (cfg.options.length > 3) el.dataset.wrap = '';
    el.setAttribute('role', 'group');
    const draw = () => {
      el.innerHTML = `<span class="hf-pill" aria-hidden="true"></span>${cfg.options.map((o) => `<button type="button" data-v="${esc(o.value)}" aria-pressed="${o.value === value}">${o.icon ? icon(o.icon, { size: 16 }) + ' ' : ''}${esc(L(o.label))}</button>`).join('')}`;
      el.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => { value = b.dataset.v; draw(); cfg.onChange && cfg.onChange(value); }));
      requestAnimationFrame(movePill);
    };
    const movePill = () => {
      const b = el.querySelector('[aria-pressed="true"]'); const pill = el.querySelector('.hf-pill');
      if (!b || !pill) return;
      const rtl = document.documentElement.dir === 'rtl';
      const start = rtl ? el.getBoundingClientRect().right - b.getBoundingClientRect().right : b.offsetLeft;
      pill.style.insetInlineStart = `${start}px`;
      pill.style.width = `${b.offsetWidth}px`;
      pill.style.top = `${b.offsetTop}px`;
      pill.style.height = `${b.offsetHeight}px`;
    };
    draw();
    window.addEventListener('resize', movePill);
    const api = { el, get: () => value, set: (v) => { value = v; draw(); }, refresh: draw };
    controls.add({ refresh: draw });
    return api;
  }

  /* ---------- swap ---------- */
  function swap(btn, a, b) {
    btn.classList.add('hf-swap');
    btn.innerHTML = icon('swap', { size: 18 });
    btn.setAttribute('aria-label', T('تبديل المدينتين', 'Swap cities'));
    btn.addEventListener('click', () => {
      const x = a.get(); a.set(b.get()); b.set(x);
      btn.classList.toggle('is-spun');
    });
  }

  window.HF = { select, airport, dates, pax, seg, swap, closeAll: () => close(openCtl) };
})();
