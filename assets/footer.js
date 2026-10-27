/* Hayat shared footer. Replaces each template's own footer (kept hidden so its scripts never
   meet a missing element) with one consistent, bilingual, night-toned footer.
   Load after the template's main.js. Styles: footer.css. */
(() => {
  const { icon, logo, esc, lang } = window.HY;
  const D = window.HY_DATA || {};
  const T = (ar, en) => (lang() === 'ar' ? ar : en);
  const old = [...document.querySelectorAll('body > footer, footer.foot')].pop();
  const foot = document.createElement('footer');
  foot.className = 'hy-foot';
  foot.setAttribute('data-no-motion', '');
  if (old) { old.hidden = true; old.setAttribute('aria-hidden', 'true'); old.after(foot); } else document.body.appendChild(foot);

  const anchor = (...ids) => { const id = ids.find((i) => document.getElementById(i)); return id ? `#${id}` : '#top'; };
  const wa = (text) => (window.HY.wa ? window.HY.wa(text) : '#');
  const phone = D.company?.phone || '+964 770 000 0000';
  const email = D.company?.email || 'hello@hayat.iq';

  // Footer actions reuse the page's own controls when they exist (track dialog, search sheet).
  function clickMatching(re) {
    const b = [...document.querySelectorAll('header button, header a, nav button, nav a, [data-track], #trackBtn')].find((x) => re.test(x.textContent || '') || x.hasAttribute('data-track'));
    if (b) { b.click(); return true; }
    return false;
  }

  function render() {
    const svc = [
      [T('طيران', 'Flights'), anchor('search', 'searchTitle')], [T('فنادق', 'Hotels'), anchor('hotels', 'search')],
      [T('بكجات ورحلات جماعية', 'Packages & group tours'), anchor('packages', 'pk', 'destRail', 'search')],
      [T('رحلات تشارتر', 'Charter flights'), anchor('charter', 'departures', 'chtH', 'search')],
      [T('شرائح eSIM', 'eSIM data'), anchor('esim', 'search')], [T('معالجة التأشيرات', 'Visa processing'), anchor('visa', 'visas', 'search')],
      [T('تأمين السفر', 'Travel insurance'), anchor('extras', 'insurance', 'services', 'search')], [T('تنقلات المطار', 'Airport transfers'), anchor('extras', 'transfers', 'services', 'search')],
    ];
    const biz = [
      [T('سفر الشركات', 'Corporate travel'), anchor('corporate', 'business', 'corp')],
      [T('بوابة الوكلاء', 'Agent portal'), anchor('b2b', 'agents', 'business')],
      [T('سجّل وكالتك', 'Register your agency'), anchor('b2b', 'agents', 'bbReg', 'business')],
      [T('كتل مقاعد التشارتر', 'Charter seat blocks'), anchor('charter', 'departures', 'b2b')],
    ];
    foot.innerHTML = `
      <div class="hyf-wrap hyf-cta">
        <div>
          <h2>${esc(T('رحلتك القادمة تبدأ برسالة', 'Your next trip starts with a message'))}</h2>
          <p>${esc(T('مستشار حقيقي يرد خلال دقائق، بالعربية والإنجليزية، من مكتبنا في بغداد.', 'A real advisor replies within minutes, in Arabic or English, from our Baghdad office.'))}</p>
        </div>
        <div class="hyf-cta-actions">
          <a class="hyf-btn hyf-btn-wa" href="${wa(T('مرحباً، أريد مساعدة في التخطيط لرحلة', 'Hello, I would like help planning a trip'))}" target="_blank" rel="noopener">${icon('whatsapp', { size: 20 })}${esc(T('راسل مستشاراً', 'Message an advisor'))}</a>
          <a class="hyf-btn hyf-btn-ghost" href="${anchor('search', 'plan', 'top')}">${icon('search', { size: 18 })}${esc(T('ابحث واحجز', 'Search & book'))}</a>
        </div>
      </div>

      <div class="hyf-wrap hyf-grid">
        <div class="hyf-brand">
          <a class="hy-logo" href="#top" aria-label="Hayat">${logo()}</a>
          <p class="hyf-about">${esc(T('حياة للسفر والسياحة: طيران، فنادق، بكجات، رحلات تشارتر مباشرة، eSIM وتأشيرات، للمسافرين والشركات ووكلاء السفر في العراق.', 'Hayat Travel & Tourism: flights, hotels, packages, direct charter flights, eSIM and visas, for travellers, companies and travel agents in Iraq.'))}</p>
          <ul class="hyf-contact">
            <li>${icon('map', { size: 16 })}<span>${esc(T('المكتب الرئيسي، بغداد، العراق', 'Head office, Baghdad, Iraq'))}<small>${esc(T('السبت إلى الخميس · 9:00 – 21:00', 'Saturday to Thursday · 9:00 – 21:00'))}</small></span></li>
            <li>${icon('phone', { size: 16 })}<span class="figure">${esc(phone)}</span></li>
            <li>${icon('whatsapp', { size: 16 })}<a href="${wa(T('مرحباً', 'Hello'))}" target="_blank" rel="noopener">${esc(T('واتساب على مدار الساعة', 'WhatsApp, 24/7'))}</a></li>
            <li>${icon('chat', { size: 16 })}<span class="figure">${esc(email)}</span></li>
          </ul>
        </div>
        <nav class="hyf-col" aria-label="${esc(T('الخدمات', 'Services'))}"><h3>${esc(T('الخدمات', 'Services'))}</h3><ul>${svc.map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`).join('')}</ul></nav>
        <nav class="hyf-col" aria-label="${esc(T('للأعمال', 'For business'))}"><h3>${esc(T('للأعمال', 'For business'))}</h3><ul>${biz.map(([l, h]) => `<li><a href="${h}">${esc(l)}</a></li>`).join('')}</ul></nav>
        <nav class="hyf-col" aria-label="${esc(T('المساعدة', 'Help'))}"><h3>${esc(T('المساعدة', 'Help'))}</h3><ul>
          <li><button type="button" data-hf="track">${esc(T('تتبّع حجزك', 'Track a booking'))}</button></li>
          <li><a href="${anchor('faq')}">${esc(T('الأسئلة الشائعة', 'FAQ'))}</a></li>
          <li><a href="${anchor('faq', 'trust')}">${esc(T('طرق الدفع', 'Payment methods'))}</a></li>
          <li><a href="${anchor('faq')}">${esc(T('الإلغاء والاسترداد', 'Cancellation & refunds'))}</a></li>
          <li><a href="${wa(T('أحتاج مساعدة', 'I need help'))}" target="_blank" rel="noopener">${esc(T('تواصل معنا', 'Contact us'))}</a></li>
        </ul></nav>
        <nav class="hyf-col" aria-label="${esc(T('الشركة', 'Company'))}"><h3>${esc(T('الشركة', 'Company'))}</h3><ul>
          <li><a href="#top">${esc(T('من نحن', 'About Hayat'))}</a></li>
          <li><a href="#top">${esc(T('الوظائف', 'Careers'))}</a><span class="hyf-tag">${esc(T('نوظّف', 'Hiring'))}</span></li>
          <li><a href="#top">${esc(T('سياسة الخصوصية', 'Privacy policy'))}</a></li>
          <li><a href="#top">${esc(T('الشروط والأحكام', 'Terms & conditions'))}</a></li>
        </ul></nav>
      </div>

      <div class="hyf-wrap hyf-row">
        <div class="hyf-chips"><span class="hyf-row-label">${esc(T('ادفع كما يناسبك', 'Pay your way'))}</span>
          ${['ZainCash', 'Qi Card', 'FastPay', 'Visa', 'Mastercard', T('نقداً في المكتب', 'Cash at office'), T('تحويل مصرفي للشركات', 'Bank transfer (business)')].map((p) => `<span class="hyf-chip-pay">${esc(p)}</span>`).join('')}</div>
        <div class="hyf-apps">${window.HY.storeBadges()}</div>
        <div class="hyf-social" aria-label="${esc(T('تابعنا', 'Follow us'))}">${window.HY.socialLinks()}</div>
      </div>

      <div class="hyf-wrap hyf-bottom">
        <span>© <span class="figure">2026</span> ${esc(T('حياة للسفر والسياحة. جميع الحقوق محفوظة.', 'Hayat Travel & Tourism. All rights reserved.'))}</span>
        <span class="hyf-legal">
          <a href="#top">${esc(T('الخصوصية', 'Privacy'))}</a><a href="#top">${esc(T('الشروط', 'Terms'))}</a><a href="#top">${esc(T('ملفات الارتباط', 'Cookies'))}</a>
        </span>
        <button type="button" class="hyf-top" data-hf="top">${icon('arrowR', { size: 16 })}${esc(T('إلى الأعلى', 'Back to top'))}</button>
        <p class="hyf-note">${esc(T('نموذج تصميم أوّلي: الأسعار وأرقام التواصل والبيانات للعرض فقط.', 'Design prototype: prices, contact numbers and data are illustrative.'))}</p>
      </div>
      <div class="hyf-wrap hyf-mark" aria-hidden="true">${logo()}</div>`;
  }

  foot.addEventListener('click', (e) => {
    const a = e.target.closest('[data-hf]');
    if (!a) return;
    if (a.dataset.hf === 'top') window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    if (a.dataset.hf === 'track' && !clickMatching(/تتبّ?ع|Track/i)) window.open(wa(T('أريد تتبّع حجزي', 'I would like to track my booking')), '_blank', 'noopener');
  });
  render();
  window.HY.onChange(render);
})();
