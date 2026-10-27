(() => {
  /* Calm hovers: strip lift/scale/rotate hover transforms from cards and buttons in every stylesheet,
     keeping image zoom, icon motion and underline sweeps. Icons animate instead (motion.css). */
  const KEEP = /(^|[\s>+~])(img|video|svg)\b|\.ic\b|\.ic-|-ic\b|icon|arrow|swap|::?(after|before)\b/i;
  const PROPS = ['transform', 'translate', 'scale', 'rotate'];
  const subject = (sel) => sel.trim().split(/\s*[\s>+~]\s*/).pop();
  function walk(list) {
    for (let i = 0; i < list.length; i++) {
      const r = list[i];
      if (r.cssRules && !(r instanceof CSSStyleRule)) { walk(r.cssRules); continue; }
      if (!(r instanceof CSSStyleRule) || !/:hover|:focus-within/.test(r.selectorText) || !PROPS.some((p) => r.style.getPropertyValue(p))) continue;
      const sels = r.selectorText.split(/,(?![^(]*\))/);
      const keep = sels.filter((x) => KEEP.test(subject(x)));
      const strip = sels.filter((x) => !KEEP.test(subject(x)));
      if (!strip.length) continue;
      if (keep.length) { try { (r.parentRule || r.parentStyleSheet).insertRule(`${keep.join(',')}{${r.style.cssText}}`, i + 1); i++; } catch (e) { /* skip */ } r.selectorText = strip.join(','); }
      PROPS.forEach((p) => r.style.removeProperty(p));
    }
  }
  const run = () => [...document.styleSheets].forEach((sh) => { try { walk(sh.cssRules); } catch (e) { /* cross-origin */ } });
  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', run); else run();
  addEventListener('load', run);
})();
/* Hayat motion kit · adds premium motion to any template without changing its markup much.
   Load last (after the template's main.js). Styles: motion.css.
   - progress line, reveal-on-scroll with stagger, headline word reveal,
     image parallax. Hover movement on cards and buttons is replaced by icon motion (motion.css).
   Opt out on any element (and its subtree) with [data-no-motion].
   Content stays visible without JS and under prefers-reduced-motion. */
(() => {
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  if (RM.matches) return;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const off = (el) => el.closest('[data-no-motion], dialog, .hf-panel, header, nav, footer, .sr-only, [aria-hidden="true"]');
  const skip = (el) => off(el) || el.closest('.hm-r'); // reveal: don't nest reveals
  // Elements a template already animates or positions specially are left alone.
  const busy = (el) => {
    const cs = getComputedStyle(el);
    return cs.position === 'fixed' || cs.position === 'sticky' || parseFloat(cs.opacity) < 0.98
      || /(^|\s)(reveal|in|is-in|is-new|stagger|word-in|heading-in)(\s|$)/.test(el.className || '');
  };

  /* ---------- progress line ---------- */
  const bar = document.createElement('div');
  bar.className = 'hm-progress'; bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  /* ---------- reveal targets ---------- */
  const sections = $$('main > section, main section, body > section').filter((s, i, a) => a.indexOf(s) === i);
  const first = sections[0];
  const CANDIDATES = 'h2, article, figure, .card, [class*="-card"], [class*="card "], li, .tile, .mcard, .svc, .maid, .review, details';
  const io = new IntersectionObserver((ents) => ents.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('hm-in', 'hm-words-in');
    io.unobserve(e.target);
    // Horizontal rails: siblings scrolled out sideways never intersect, so reveal them with this one.
    const p = e.target.parentElement;
    if (p && p.scrollWidth > p.clientWidth + 4) [...p.children].forEach((c) => { if (c.classList.contains('hm-r')) { c.classList.add('hm-in'); io.unobserve(c); } });
  }), { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  function prepare(root = document) {
    sections.forEach((sec) => {
      if (sec === first || skip(sec)) return;
      const found = $$(CANDIDATES, sec).filter((el) => !skip(el) && !busy(el) && el.offsetParent !== null);
      // keep only outermost matches, and only lists of 2+ siblings for <li>
      const outer = found.filter((el) => !found.some((o) => o !== el && o.contains(el)))
        .filter((el) => el.tagName !== 'LI' || el.parentElement.children.length > 1)
        .slice(0, 60);
      outer.forEach((el) => {
        if (el.classList.contains('hm-r')) return;
        const sibs = [...el.parentElement.children].filter((c) => c.classList.contains('hm-r') || outer.includes(c));
        el.style.setProperty('--hm-i', Math.min(sibs.indexOf(el), 8));
        el.classList.add('hm-r');
        if (el.tagName === 'H2') splitWords(el);
        // already on screen at load: show without waiting
        const r = el.getBoundingClientRect();
        // on screen or already scrolled past: show without waiting
        if (r.top < innerHeight * 0.9) requestAnimationFrame(() => el.classList.add('hm-in', 'hm-words-in'));
        else io.observe(el);
      });
    });
  }
  /* Headlines: wrap words (never letters, so Arabic joining is kept) in spans. */
  function splitWords(h) {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === 3 && n.textContent.trim()) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
            const s = document.createElement('span'); s.className = 'hm-w'; s.style.setProperty('--hm-wi', i++); s.textContent = part; frag.appendChild(s);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !/^(SVG|IMG|BR)$/i.test(n.tagName)) walk(n);
      });
    };
    walk(h);
    h.classList.remove('hm-r'); h.classList.add('hm-r'); h.style.opacity = '1'; h.style.translate = 'none';
  }

  /* ---------- parallax images ---------- */
  let pxImgs = [];
  function preparePx() {
    pxImgs = $$('main img').filter((img) => {
      if (off(img) || img.classList.contains('hm-px')) return false;
      const p = img.parentElement; if (!p) return false;
      const cs = getComputedStyle(p);
      const r = img.getBoundingClientRect();
      return (cs.overflow === 'hidden' || cs.overflowY === 'hidden' || cs.overflow === 'clip') && r.height > 160 && r.width > 160
        && getComputedStyle(img).objectFit === 'cover' && !(sections[0] && sections[0].contains(img));
    }).slice(0, 40);
    pxImgs.forEach((img) => img.classList.add('hm-px'));
  }

  /* ---------- scroll loop ---------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const h = document.documentElement.scrollHeight - innerHeight;
      bar.style.setProperty('--hm-p', h > 0 ? (scrollY / h).toFixed(4) : 0);
      const vh = innerHeight;
      pxImgs.forEach((img) => {
        const r = img.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const t = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2); // -1..1
        img.style.setProperty('--hm-y', `${(-t * Math.min(40, r.height * 0.07)).toFixed(1)}px`);
      });
    });
  }

  function init() {
    prepare(); preparePx(); onScroll();
  }
  // Templates render sections from JS: wait a beat, and re-scan when content changes (language, filters).
  const start = () => setTimeout(init, 350);
  if (document.readyState === 'complete') start(); else addEventListener('load', start);
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  let mo = null;
  const rescan = () => { clearTimeout(mo); mo = setTimeout(() => { prepare(); preparePx(); }, 400); };
  new MutationObserver((muts) => {
    if (muts.some((m) => [...m.addedNodes].some((n) => n.nodeType === 1 && !n.classList?.contains('hm-w') && !n.classList?.contains('hf-panel') && !n.closest?.('.hf-panel')))) rescan();
  }).observe(document.querySelector('main') || document.body, { childList: true, subtree: true });
})();
