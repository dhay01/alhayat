/* Majlis · business template for Hayat Travel.
   Arabic copy for static markup is harvested from index.html (the source of truth);
   EN holds its English. S holds strings that only exist in JS, as [ar, en].
   Every search/form control is built with the shared kit (assets/forms.js → window.HF). */
(() => {
  const D = window.HY_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const L = (o) => HY.pick(o);
  const t = (k) => HY.t(k);
  const ic = (n, o) => HY.icon(n, o);
  const esc = HY.esc;
  const plain = (x) => String(x).replace(/[ً-ْ]/g, ''); // display face: no diacritics
  const root = document.documentElement;
  const img = (n) => `media/${n}.jpg`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const ar = () => HY.lang() === 'ar';
  const arrow = () => (ar() ? '←' : '→');

  /* ---------------- dictionary ---------------- */
  const EN = {
    __title: 'Hayat Travel & Tourism · Every travel service in one place',
    skip: 'Skip to search',
    'nav.label': 'Main', 'nav.services': 'Services', 'nav.packages': 'Packages', 'nav.charter': 'Charter flights', 'nav.b2b': 'Agencies',
    'nav.corp': 'Companies', 'nav.contact': 'Contact', 'nav.menu': 'Menu',
    'lang.switch': 'العربية', 'lang.short': 'ع', 'theme.switch': 'Toggle dark mode',
    'trk.nav': 'Track my booking', 'login.nav': 'Agent login',
    'hero.eyebrow': 'Hayat Travel & Tourism · Baghdad since 2010',
    'hero.title': 'Every travel service in one place',
    'hero.sub': 'Flights, hotels, packages and visas. Search here, then finish online or on WhatsApp with an advisor who knows your name.',
    'search.title': 'Search and book', 'search.tabs': 'Services',
    'f.trip': 'Trip type', 'f.return': 'Return', 'f.oneway': 'One way', 'f.multi': 'Multi-city', 'f.open': 'Open return',
    'f.tax': 'Prices include taxes, no booking fee', 'f.search': 'Search',
    'c.find': 'Show programmes', 'e.show': 'Show plans', 'v.check': 'Show requirements',
    'svc.title': 'Everything your trip needs',
    'dst.title': 'Where to go in…',
    'pkg.title': 'This season’s packages', 'pkg.lede': 'Flight, hotel and transfers at one price, confirmed on WhatsApp within minutes.',
    'ch.title': 'Your seat on a direct flight this season', 'ch.lede': 'Seasonal direct flights from Baghdad, Erbil and Basra, with checked baggage included.',
    'biz.title': 'For travel agencies and companies',
    'b2b.title': 'Wholesale rates for your agency, sold under your name',
    'b2b.t1': 'Net fares, hotels and charter seats', 'b2b.t2': 'Credit wallet with a daily statement', 'b2b.t3': 'Invoices and vouchers with your logo', 'b2b.reg': 'Register your agency',
    'co.title': 'One account for all your team’s trips',
    'co.t1': 'A travel policy applied automatically', 'co.t2': 'Manager approval in one tap', 'co.t3': 'One monthly invoice instead of dozens of receipts', 'co.cta': 'Open a company account',
    'why.title': 'Why Hayat', 'st.routes': 'destinations from Iraq', 'st.suppliers': 'airlines and suppliers', 'st.hotels': 'hotels at wholesale rates', 'st.gov': 'governorates served',
    'why.l': 'Licensed by the Tourism Board', 'why.o': 'A real office in Karrada, Baghdad', 'why.w': 'WhatsApp replies within 5 minutes', 'why.p': 'ZainCash, Qi Card, card or cash',
    'faq.title': 'Before you book', 'faq.lede': 'Not answered here? Message us and an advisor replies within minutes.', 'faq.ask': 'Ask on WhatsApp',
    'ct.title': 'Contact support', 'ct.wa': 'WhatsApp', 'ct.waD': 'Fastest: replies within 5 minutes', 'ct.phone': 'Call',
    'ct.phoneD': 'Saturday to Thursday, 9am to 9pm', 'ct.office': 'Office', 'ct.addr': 'Baghdad, Karrada, 62nd Street', 'ct.officeD': 'No appointment needed',
    'dlg.close': 'Close',
    'trk.title': 'Track your booking', 'trk.lede': 'Enter your booking reference and the phone number it was booked with.', 'trk.ref': 'Booking reference', 'trk.phone': 'Phone number', 'trk.go': 'Track',
    'login.title': 'Agent portal', 'login.lede': 'Sign in with your agency account to see net rates, your wallet and bookings.',
    'l.email': 'Agency email', 'l.pass': 'Password', 'l.remember': 'Remember this device', 'l.forgot': 'Forgot password?', 'l.go': 'Sign in',
    'l.noAcct': 'No account yet?', 'l.register': 'Register your agency',
  };

  const S = {
    'theme.toLight': ['الوضع الفاتح', 'Light mode'], 'theme.toDark': ['الوضع الداكن', 'Dark mode'],
    // tabs + service tiles
    'tab.flights': ['طيران', 'Flights'], 'tab.hotels': ['فنادق', 'Hotels'], 'tab.packages': ['بكجات', 'Packages'], 'tab.esim': ['eSIM', 'eSIM'],
    'tab.charter': ['تشارتر', 'Charter'], 'tab.visa': ['تأشيرة', 'Visa'],
    'go.flights': ['ابحث عن رحلة', 'Search flights'], 'go.hotels': ['ابحث عن فندق', 'Search hotels'], 'go.packages': ['شاهد البكجات', 'See packages'],
    'go.charter': ['شاهد البرامج', 'See programmes'], 'go.esim': ['اختر باقة', 'Pick a plan'], 'go.visa': ['اعرف المتطلبات', 'Check requirements'],
    'go.insurance': ['اطلب وثيقة', 'Request a policy'], 'go.transfers': ['احجز سائقاً', 'Book a driver'],
    // field labels
    'f.from': ['من', 'From'], 'f.to': ['إلى', 'To'], 'f.dates': ['التواريخ', 'Dates'], 'f.validity': ['صلاحية العودة', 'Return valid for'], 'f.pax': ['المسافرون', 'Travellers'],
    'h.city': ['المدينة أو الوجهة', 'City or destination'], 'h.dates': ['الوصول والمغادرة', 'Check-in – check-out'], 'h.guests': ['الغرف والضيوف', 'Rooms and guests'],
    'k.dest': ['الوجهة', 'Destination'], 'k.month': ['الشهر', 'Month'], 'c.from': ['مدينة المغادرة', 'Departing from'], 'c.to': ['الوجهة', 'Destination'],
    'e.country': ['الدولة أو المنطقة', 'Country or region'], 'e.days': ['مدة الرحلة', 'Trip length'], 'v.dest': ['الوجهة', 'Destination'], 'v.purpose': ['الغرض', 'Purpose'],
    'opt.anyDest': ['كل الوجهات', 'Any destination'], 'opt.anyMonth': ['أي شهر', 'Any month'], 'opt.anyCity': ['كل مدن العراق', 'Any Iraqi city'],
    'opt.m3': ['3 أشهر', '3 months'], 'opt.m6': ['6 أشهر', '6 months'], 'opt.m12': ['12 شهراً', '12 months'],
    'opt.tourism': ['سياحة', 'Tourism'], 'opt.business': ['عمل', 'Business'], 'opt.family': ['زيارة عائلية', 'Family visit'],
    'px.ad': ['بالغون', 'Adults'], 'px.adS': ['12 سنة فأكثر', '12+ years'], 'px.ch': ['أطفال', 'Children'], 'px.chS': ['2 – 11 سنة', '2–11 years'], 'px.in': ['رضّع', 'Infants'], 'px.inS': ['أقل من سنتين', 'Under 2'],
    'px.rooms': ['الغرف', 'Rooms'], 'px.trav': ['مسافر', 'traveller'], 'px.travs': ['مسافرين', 'travellers'], 'px.room': ['غرفة', 'room'], 'px.roomsS': ['غرف', 'rooms'], 'px.guest': ['ضيف', 'guest'], 'px.guests': ['ضيوف', 'guests'],
    'ml.add': ['أضف رحلة', 'Add a flight'], 'ml.remove': ['حذف الرحلة', 'Remove flight'], 'ml.date': ['التاريخ', 'Date'],
    // results
    'r.illus': ['نتائج توضيحية · السعر النهائي يُؤكد على واتساب', 'Illustrative results · final price confirmed on WhatsApp'],
    'r.close': ['إغلاق النتائج', 'Close results'], 'r.book': ['احجز على واتساب', 'Book on WhatsApp'], 'r.direct': ['مباشر', 'Direct'], 'r.stop': ['توقف واحد عبر', '1 stop via'],
    'r.bag': ['حقيبة', 'Bag'], 'r.perPax': ['للشخص', 'per person'], 'r.night': ['لليلة', 'per night'],
    'r.free': ['إلغاء مجاني', 'Free cancellation'], 'r.nonref': ['غير قابل للاسترداد', 'Non-refundable'], 'r.none': ['لا توجد بكجات لهذا الاختيار حالياً. اسألنا على واتساب ونبني لك رحلة.', 'No packages for that choice right now. Ask us on WhatsApp and we will build one.'],
    'r.flights': ['رحلات', 'flights'], 'r.returnNote': ['أسعار ذهاب وعودة تُعرض بعد اختيار رحلة العودة.', 'Return fares shown after you pick the inbound flight.'],
    'r.multiNote': ['يظهر هنا سعر الرحلة الأولى؛ نرسل لك تسعير المسار الكامل على واتساب.', 'First leg shown here; we send the full multi-city fare on WhatsApp.'],
    'r.openNote': ['تذكرة بعودة مفتوحة صالحة لمدة', 'Open-return ticket valid for'],
    'r.hotelsIn': ['فنادق في', 'Hotels in'], 'r.otherCities': ['اقتراحات من مدن أخرى', 'Suggestions from other cities'],
    'r.noProg': ['لا توجد برامج تشارتر بهذا الاختيار. هذه كل البرامج المتاحة:', 'No charter programme matches that choice. Here are all current programmes:'],
    'r.progs': ['برامج تشارتر', 'charter programmes'], 'r.ask': ['اسألنا على واتساب', 'Ask us on WhatsApp'],
    // packages
    'p.nights': ['ليالٍ', 'nights'], 'p.departs': ['المغادرة', 'Departs'], 'p.seats': ['مقاعد متبقية', 'seats left'],
    'p.sold': ['نفدت المقاعد', 'Sold out'], 'p.from': ['من', 'from'], 'p.book': ['احجز', 'Book'], 'p.notify': ['أبلغني بموعد جديد', 'Notify me'], 'p.perPax': ['للشخص', 'per person'],
    // charter programmes
    'cp.seat': ['مقعد من', 'Seat from'], 'cp.pkg': ['مع فندق من', 'With hotel from'],
    'cp.left': ['مقعداً متبقياً', 'seats left'], 'cp.sold': ['نفدت المقاعد', 'Sold out'],
    'cp.bookSeat': ['احجز مقعدك', 'Book your seat'], 'cp.withHotel': ['أو مع فندق', 'or with a hotel'], 'cp.wait': ['قائمة الانتظار', 'Join the waitlist'], 'cp.all': ['الكل', 'All'],
    // month guide
    'mg.flights': ['ابحث عن رحلات', 'Search flights'], 'mg.pkgs': ['شاهد البكجات', 'See packages'],
    // esim
    'es.days': ['يوماً', 'days'], 'es.buy': ['اشترِ على واتساب', 'Buy on WhatsApp'], 'es.pop': ['الأكثر طلباً', 'Most popular'], 'es.net': ['شبكة', 'Network'],
    // visa
    'vs.for': ['للمسافرين العراقيين', 'For Iraqi travellers'],
    'vs.time': ['مدة الإنجاز', 'Processing'], 'vs.fee': ['الرسوم من', 'Fee from'],
    'vs.daysN': ['أيام عمل تقريباً', 'working days approx.'], 'vs.noProc': ['لا تحتاج معاملة', 'No processing needed'], 'vs.advisor': ['يحددها المستشار', 'Set by your advisor'],
    'vs.noFee': ['بدون رسوم تأشيرة', 'No visa fee'], 'vs.docs': ['الأوراق المطلوبة', 'Documents needed'], 'vs.start': ['ابدأ الملف على واتساب', 'Start the file on WhatsApp'],
    'doc.photo': ['صورة شخصية بخلفية بيضاء', 'Photo on a white background'], 'doc.id': ['نسخة من البطاقة الوطنية', 'Copy of your national ID card'],
    'doc.ticket': ['حجز طيران ذهاب وعودة', 'Return flight booking'], 'doc.hotel': ['حجز فندق', 'Hotel booking'], 'doc.bank': ['كشف حساب بنكي لـ 6 أشهر', '6-month bank statement'],
    'doc.job': ['تأييد عمل أو سجل تجاري', 'Employment letter or trade licence'], 'doc.ins': ['تأمين سفر (نوفره لك)', 'Travel insurance (we provide it)'],
    'doc.bio': ['موعد بصمة في مركز التقديم', 'Biometrics appointment'], 'doc.cash': ['رسوم تُدفع نقداً عند الوصول', 'Fee paid in cash on arrival'], 'doc.history': ['سجل سفر سابق إن وُجد', 'Previous travel history if any'],
    // tracking + login
    'trk.empty': ['أدخل رقم الحجز ورقم الهاتف.', 'Enter your booking reference and phone number.'], 'trk.demo': ['نتيجة توضيحية', 'Illustrative result'],
    'trk.s1': ['تم استلام الطلب', 'Request received'], 'trk.s2': ['تم الدفع', 'Payment received'], 'trk.s3': ['صدرت التذكرة / القسيمة', 'Ticket / voucher issued'], 'trk.s4': ['أُرسلت إلى واتساب', 'Sent to WhatsApp'],
    'trk.help': ['تحدث مع المستشار عن هذا الحجز', 'Talk to an advisor about this booking'], 'trk.waMsg': ['مرحباً، أريد متابعة حجزي. المرجع:', 'Hello, I would like to follow up on my booking. Ref:'],
    'l.fill': ['أدخل البريد وكلمة المرور.', 'Enter your email and password.'],
    'l.demo': ['في النسخة الفعلية تفتح هنا لوحة الوكلاء بمحفظتك وحجوزاتك. لطلب حساب أو استعادة الدخول، راسل مكتب الوكلاء.', 'In production this opens the agent dashboard with your wallet and bookings. To request an account or restore access, message the agency desk.'],
    'l.desk': ['راسل مكتب الوكلاء', 'Message the agency desk'],
    // whatsapp
    'wa.hello': ['مرحباً حياة، عندي استفسار عن رحلة.', 'Hello Hayat, I have a question about a trip.'],
    'wa.register': ['مرحباً، أريد تسجيل وكالتي في بوابة حياة B2B. المرجع: HYT-B2B-REG', 'Hello, I would like to register my agency on the Hayat B2B portal. Ref: HYT-B2B-REG'],
    'wa.login': ['مرحباً مكتب الوكلاء، أحتاج مساعدة في الدخول إلى البوابة. المرجع: HYT-B2B-ACCESS', 'Hello agency desk, I need help signing in to the portal. Ref: HYT-B2B-ACCESS'],
    'wa.corp': ['مرحباً، نريد فتح حساب سفر لشركتنا. المرجع: HYT-CORP-REQ', 'Hello, we would like to open a company travel account. Ref: HYT-CORP-REQ'],
    'wa.insurance': ['مرحباً، أريد وثيقة تأمين سفر. المرجع: HYT-INS-REQ', 'Hello, I would like a travel insurance policy. Ref: HYT-INS-REQ'],
    'wa.transfers': ['مرحباً، أريد حجز تنقل من المطار. المرجع: HYT-TRF-REQ', 'Hello, I would like to book an airport transfer. Ref: HYT-TRF-REQ'],
    'wa.pkgNotify': ['مرحباً، أبلغوني بموعد جديد لبكج', 'Hello, tell me about a new date for package'],
    'wa.book': ['مرحباً حياة، أريد حجز', 'Hello Hayat, I would like to book'], 'wa.ref': ['المرجع', 'Ref'],
    'wa.seat': ['مرحباً حياة، أريد حجز مقعد على برنامج التشارتر', 'Hello Hayat, I would like a seat on charter programme'],
    'wa.seatHotel': ['مرحباً حياة، أريد باقة مقعد مع فندق على برنامج التشارتر', 'Hello Hayat, I would like a seat-and-hotel package on charter programme'],
    'wa.wait': ['مرحباً حياة، أضيفوني لقائمة الانتظار على برنامج التشارتر', 'Hello Hayat, please add me to the waitlist for charter programme'],
  };
  const FAQ = [
    ['كيف أدفع؟', 'How can I pay?', 'زين كاش، كي كارد، FastPay، فيزا وماستركارد، أو نقداً في مكتبنا ببغداد. الوكلاء والشركات يدفعون من رصيد الائتمان.', 'ZainCash, Qi Card, FastPay, Visa and Mastercard, or cash at our Baghdad office. Agencies and companies pay from their credit balance.'],
    ['هل يمكنني إلغاء الحجز؟', 'Can I cancel?', 'يعتمد على شروط شركة الطيران أو الفندق. نوضح الشروط قبل الدفع، ونسترد المبلغ بنفس طريقة الدفع خلال 7 إلى 14 يوم عمل.', 'It depends on the airline or hotel rules. We show the terms before you pay and refund by the same method within 7 to 14 working days.'],
    ['متى تصلني التذكرة الإلكترونية؟', 'When do I get my e-ticket?', 'فور إصدارها، عادة خلال 30 دقيقة من الدفع، على واتساب والبريد الإلكتروني. لا تحتاج نسخة مطبوعة.', 'As soon as it is issued, usually within 30 minutes of payment, on WhatsApp and email. No printout needed.'],
    ['هل يدعم هاتفي شريحة eSIM؟', 'Does my phone support eSIM?', 'معظم الهواتف من آيفون XS وسامسونج S20 وجوجل بكسل 3 فما فوق تدعمها. للتأكد اطلب ‎*#06#‎ في لوحة الاتصال: إذا ظهر رقم EID فهاتفك يدعم eSIM.', 'Most phones from iPhone XS, Samsung S20 and Google Pixel 3 onward do. To check, dial *#06#: if an EID number appears, your phone supports eSIM.'],
    ['كيف أثبت شريحة eSIM؟', 'How do I install an eSIM?', 'من الإعدادات > الخلوي > إضافة eSIM ثم امسح رمز QR وأنت متصل بالإنترنت قبل السفر. تتفعل تلقائياً عند الوصول.', 'Settings > Cellular > Add eSIM, then scan the QR code on Wi-Fi before you fly. It activates automatically on arrival.'],
    ['كم تستغرق التأشيرة؟', 'How long does a visa take?', 'التأشيرات الإلكترونية من 3 إلى 5 أيام عمل، وشنغن والمملكة المتحدة من 15 إلى 21 يوماً بعد موعد البصمة. قدّم مبكراً في المواسم.', 'e-Visas take 3 to 5 working days; Schengen and UK take 15 to 21 days after biometrics. Apply early in peak season.'],
    ['كيف تعمل رحلات التشارتر؟', 'How do charter flights work?', 'هي رحلات مباشرة موسمية بمواعيد أسبوعية ثابتة. تحجز مقعداً فقط أو مقعداً مع فندق، والأمتعة مشمولة. المقاعد محدودة ونؤكدها على واتساب خلال دقائق.', 'They are seasonal direct flights on fixed weekly days. You book a seat only, or a seat with a hotel, with baggage included. Seats are limited and we confirm on WhatsApp within minutes.'],
  ];

  const dict = { ar: {}, en: { ...EN } };
  for (const [k, v] of Object.entries(S)) { dict.ar[k] = v[0]; dict.en[k] = v[1]; }
  $$('[data-i18n]').forEach((el) => { if (!(el.dataset.i18n in dict.ar)) dict.ar[el.dataset.i18n] = el.textContent.trim(); });
  $$('[data-i18n-attr]').forEach((el) => el.dataset.i18nAttr.split(';').forEach((p) => {
    const [a, k] = p.split(':'); if (!(k in dict.ar)) dict.ar[k] = el.getAttribute(a) || '';
  }));
  dict.ar.__title = document.title;
  dict.ar['lang.switch'] = 'English'; dict.ar['lang.short'] = 'EN';
  dict.ar['theme.switch'] = 'تبديل الوضع الداكن';
  const P = (k) => ({ ar: dict.ar[k], en: dict.en[k] }); // bilingual pair for the form kit

  /* ---------------- helpers ---------------- */
  const air = (code) => D.airports.find((a) => a.code === code);
  const city = (code) => L(air(code)?.city) || code;
  const destBy = (slug) => D.destinations.find((d) => d.slug === slug);
  const DEST_AIR = { istanbul: 'IST', dubai: 'DXB', baku: 'GYD', trabzon: 'TZX', georgia: 'TBS', antalya: 'AYT', cairo: 'CAI', 'kuala-lumpur': 'KUL', maldives: 'MLE', paris: 'CDG', london: 'LHR', sharm: 'SSH' };
  const IQ = ['BGW', 'EBL', 'BSR', 'NJF'];
  const MONTHS = { ar: ['كانون الثاني', 'شباط', 'آذار', 'نيسان', 'أيار', 'حزيران', 'تموز', 'آب', 'أيلول', 'تشرين الأول', 'تشرين الثاني', 'كانون الأول'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] };
  const DOW = { ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'], en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] };
  const fmtD = (d, long = false) => (d ? `${long ? `${DOW[HY.lang()][d.getDay()]} ` : ''}${d.getDate()} ${MONTHS[HY.lang()][d.getMonth()]}` : '');
  const fmtISO = (iso) => fmtD(new Date(`${iso}T12:00:00`));
  const iso = (d) => (d ? `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` : '');
  const dayIn = (n) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); return d; };
  const monthsAhead = (n, start = 0) => Array.from({ length: n }, (_, i) => { const d = new Date(); d.setDate(1); d.setMonth(d.getMonth() + start + i); return d; });
  const ym = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  const monthLabel = (d) => ({ ar: `${MONTHS.ar[d.getMonth()]} ${d.getFullYear()}`, en: `${MONTHS.en[d.getMonth()]} ${d.getFullYear()}` });
  const waBtn = (text, label = t('r.book'), cls = 'btn btn-wa') => `<a class="${cls}" href="${HY.wa(text)}" target="_blank" rel="noopener">${ic('whatsapp', { size: 18 })}<span>${esc(label)}</span></a>`;
  const stars = (n) => `<span class="stars" aria-label="${n}★">${'★'.repeat(n)}</span>`;
  const jumpTo = (sel) => $(sel).scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });

  // Visa destinations: HY_DATA.visas, plus destination countries it does not list (fee/time on request).
  const VISAS = [...D.visas.map((v) => ({ ...v }))];
  [['cairo', 'arrival'], ['maldives', 'arrival'], ['kuala-lumpur', 'free'], ['alula', 'evisa'], ['bali', 'arrival']].forEach(([slug, type]) => {
    if (destBy(slug)) VISAS.push({ country: destBy(slug).country, type, days: null, from: type === 'free' ? 0 : null });
  });
  const VISA_DOCS = {
    evisa: ['doc.photo', 'doc.id', 'doc.ticket', 'doc.hotel'],
    arrival: ['doc.ticket', 'doc.hotel', 'doc.cash'],
    free: ['doc.ticket', 'doc.hotel'],
    schengen: ['doc.photo', 'doc.bank', 'doc.job', 'doc.ins', 'doc.hotel', 'doc.bio'],
    uk: ['doc.photo', 'doc.bank', 'doc.job', 'doc.history', 'doc.bio'],
  };
  // Charter programme seasons (months 1–12) derived from HY_DATA.charter.programmes[].season.
  const SEASON = { 'HYT-CHT-AYT': [4, 5, 6, 7, 8, 9, 10], 'HYT-CHT-TZX': [6, 7, 8, 9], 'HYT-CHT-BUS': [5, 6, 7, 8, 9] };
  const inSeason = (p, m) => !SEASON[p.id] || SEASON[p.id].includes(m);
  const PROGS = D.charter.programmes || [];
  // Month guide: illustrative average day temperatures (°C).
  const GUIDE = {
    11: [['istanbul', 15], ['dubai', 30], ['cairo', 25], ['kuala-lumpur', 31]],
    12: [['dubai', 25], ['maldives', 30], ['sharm', 26], ['baku', 8]],
    1: [['dubai', 23], ['kuala-lumpur', 31], ['cairo', 19], ['georgia', 6]],
    2: [['maldives', 30], ['bali', 30], ['dubai', 25], ['istanbul', 9]],
  };

  /* ---------------- state ---------------- */
  const TABS = ['flights', 'hotels', 'packages', 'charter', 'esim', 'visa'];
  const TAB_IC = { flights: 'plane', hotels: 'bed', packages: 'luggage', esim: 'sim', charter: 'plane-up', visa: 'documents' };
  const state = { tab: 'flights', searched: new Set(), chCity: 'all', guide: null, trk: null };

  const fillIcons = (scope = document) => $$('[data-ic]', scope).forEach((el) => {
    if (el.dataset.icDone) return;
    el.innerHTML = ic(el.dataset.ic, { size: +(el.dataset.size || 20), dir: 'dir' in el.dataset });
    el.dataset.icDone = '1';
  });
  fillIcons();
  HY.i18n(dict); // translate static markup before the kit paints its fields

  /* ---------------- form kit controls ---------------- */
  const C = {};
  const priceOf = (d) => 180 + ((d.getDate() * 37 + d.getMonth() * 11) % 140);
  const paxRows = [
    { key: 'ad', label: P('px.ad'), sub: P('px.adS'), min: 1, value: 1 },
    { key: 'ch', label: P('px.ch'), sub: P('px.chS') },
    { key: 'in', label: P('px.in'), sub: P('px.inS') },
  ];
  const travSum = (v) => { const n = (v.ad || 0) + (v.ch || 0) + (v.in || 0); return `${n} ${t(n > 1 ? 'px.travs' : 'px.trav')}`; };

  const tripSel = $('#tripSel');
  C.trip = { get: () => tripSel.value };
  tripSel.addEventListener('change', () => syncTrip());
  C.from = HF.airport($('#fFrom'), { label: P('f.from'), value: 'BGW' });
  C.to = HF.airport($('#fTo'), { label: P('f.to'), value: 'IST' });
  HF.swap($('#fSwap'), C.from, C.to);
  C.dates = HF.dates($('#fDates'), { label: P('f.dates'), range: true, value: [dayIn(14), dayIn(21)], price: priceOf });
  C.valid = HF.select($('#fValid'), { label: P('f.validity'), icon: 'clock', value: '6', options: [{ value: '3', label: P('opt.m3') }, { value: '6', label: P('opt.m6') }, { value: '12', label: P('opt.m12') }] });
  C.pax = HF.pax($('#fPax'), { label: P('f.pax'), cabin: true, rows: paxRows, summary: travSum });

  const destOpts = () => D.destinations.map((d) => ({ value: d.slug, label: d.name, sub: d.country, icon: 'map' }));
  C.hCity = HF.select($('#hCity'), { label: P('h.city'), icon: 'map', search: true, showSub: true, value: 'istanbul', options: destOpts });
  C.hDates = HF.dates($('#hDates'), { label: P('h.dates'), range: true, value: [dayIn(14), dayIn(19)] });
  C.hPax = HF.pax($('#hPax'), { label: P('h.guests'), icon: 'bed', rows: [{ key: 'rooms', label: P('px.rooms'), min: 1, max: 5, value: 1 }, { key: 'ad', label: P('px.ad'), sub: P('px.adS'), min: 1, value: 2 }, { key: 'ch', label: P('px.ch'), sub: P('px.chS') }],
    summary: (v) => `${v.rooms} ${t(v.rooms > 1 ? 'px.roomsS' : 'px.room')} · ${v.ad + v.ch} ${t(v.ad + v.ch > 1 ? 'px.guests' : 'px.guest')}` });

  const monthOpts = (n, anyKey) => () => [{ value: '', label: P(anyKey), icon: 'calendar' }, ...monthsAhead(n, 1).map((d) => ({ value: ym(d), label: monthLabel(d), icon: 'calendar' }))];
  C.kDest = HF.select($('#kDest'), { label: P('k.dest'), icon: 'map', search: true, showSub: true, value: '',
    options: () => [{ value: '', label: P('opt.anyDest'), icon: 'globe' }, ...destOpts().filter((o) => D.packages.some((p) => p.dest === o.value))] });
  C.kMonth = HF.select($('#kMonth'), { label: P('k.month'), icon: 'calendar', value: '', options: monthOpts(6, 'opt.anyMonth') });
  C.kPax = HF.pax($('#kPax'), { label: P('f.pax'), rows: [{ ...paxRows[0], value: 2 }, paxRows[1]], summary: travSum });

  C.cFrom = HF.select($('#cFrom'), { label: P('c.from'), icon: 'plane-up', showCode: true, value: 'all',
    options: () => [{ value: 'all', label: P('opt.anyCity'), icon: 'map' }, ...IQ.map((c) => ({ value: c, label: air(c).city, code: c, icon: 'plane-up' }))] });
  C.cTo = HF.select($('#cTo'), { label: P('c.to'), icon: 'map', showCode: true, value: 'all',
    options: () => [{ value: 'all', label: P('opt.anyDest'), icon: 'globe' }, ...[...new Set(PROGS.map((p) => p.to))].map((c) => ({ value: c, label: air(c)?.city || c, code: c, icon: 'plane' }))] });
  C.cMonth = HF.select($('#cMonth'), { label: P('k.month'), icon: 'calendar', value: '', options: monthOpts(12, 'opt.anyMonth') });

  const esimOpts = () => D.esim.regions.map((r) => ({ value: r.id, label: { ar: `${r.flag}  ${r.name.ar}`, en: `${r.flag}  ${r.name.en}` }, sub: { ar: `شبكة ${r.net}`, en: `${r.net} network` } }));
  const dayOpts = () => [7, 15, 30].map((n) => ({ value: String(n), label: { ar: `${n} يوماً`, en: `${n} days` }, icon: 'calendar' }));
  C.eRegion = HF.select($('#eRegion'), { label: P('e.country'), icon: 'globe', search: true, value: 'tr', options: esimOpts });
  C.eDays = HF.select($('#eDays'), { label: P('e.days'), icon: 'calendar', value: '15', options: dayOpts });

  const visaOpts = () => VISAS.map((v, i) => ({ value: String(i), label: v.country, sub: D.visaTypes[v.type], icon: 'documents' }));
  C.vDest = HF.select($('#vDest'), { label: P('v.dest'), icon: 'map', search: true, showSub: true, value: '0', options: visaOpts });
  C.vPurpose = HF.select($('#vPurpose'), { label: P('v.purpose'), icon: 'info', value: 'tourism', options: [{ value: 'tourism', label: P('opt.tourism') }, { value: 'business', label: P('opt.business') }, { value: 'family', label: P('opt.family') }] });

  // section controls
  const guideMonths = monthsAhead(4, 1);
  state.guide = guideMonths[0].getMonth() + 1;
  C.monthSeg = HF.seg($('#monthSeg'), { options: guideMonths.map((d) => ({ value: String(d.getMonth() + 1), label: { ar: MONTHS.ar[d.getMonth()], en: MONTHS.en[d.getMonth()] } })), value: String(state.guide), onChange: (v) => { state.guide = +v; renderGuide(true); } });
  C.chCity = HF.seg($('#chCitySeg'), { options: [{ value: 'all', label: P('cp.all') }, ...['BGW', 'EBL', 'BSR'].map((c) => ({ value: c, label: air(c).city }))], value: 'all', onChange: (v) => { state.chCity = v; renderProgs(true); } });

  /* ---------------- multi-city legs ---------------- */
  const mlegs = [{ from: 'IST', to: 'DXB', d: dayIn(18) }];
  function renderMulti() {
    const box = $('#multiLegs');
    if (C.trip.get() !== 'multi') { box.innerHTML = ''; return; }
    box.innerHTML = mlegs.map((l, i) => `<div class="ml-row"><span class="leg-n figure">${i + 2}</span>
      <div class="hf-pair"><div data-ml-from="${i}"></div><button type="button" data-ml-swap="${i}"></button><div data-ml-to="${i}"></div></div>
      <div data-ml-date="${i}"></div>
      ${i ? `<button type="button" class="icon-btn icon-btn-sm" data-mlrm="${i}" aria-label="${esc(t('ml.remove'))}">${ic('close', { size: 16 })}</button>` : '<span></span>'}</div>`).join('')
      + (mlegs.length < 3 ? `<button type="button" class="lnk" data-mladd>${ic('plus', { size: 16 })}<span>${esc(t('ml.add'))}</span></button>` : '');
    mlegs.forEach((l, i) => {
      const a = HF.airport($(`[data-ml-from="${i}"]`, box), { label: P('f.from'), value: l.from, onChange: (v) => { l.from = v; } });
      const b = HF.airport($(`[data-ml-to="${i}"]`, box), { label: P('f.to'), value: l.to, onChange: (v) => { l.to = v; } });
      HF.swap($(`[data-ml-swap="${i}"]`, box), a, b);
      $(`[data-ml-swap="${i}"]`, box).addEventListener('click', () => { l.from = a.get(); l.to = b.get(); });
      HF.dates($(`[data-ml-date="${i}"]`, box), { label: P('ml.date'), value: [l.d], min: dayIn(0), price: priceOf, onChange: ([d]) => { l.d = d; } });
    });
  }
  $('#multiLegs').addEventListener('click', (e) => {
    if (e.target.closest('[data-mladd]')) { const l = mlegs[mlegs.length - 1]; mlegs.push({ from: l.to, to: 'BGW', d: new Date(l.d.getTime() + 5 * 864e5) }); renderMulti(); }
    const rm = e.target.closest('[data-mlrm]'); if (rm) { mlegs.splice(+rm.dataset.mlrm, 1); renderMulti(); }
  });
  function syncTrip() {
    const trip = C.trip.get();
    $('#p-flights').dataset.trip = trip;
    C.dates.setRange(trip === 'return');
    if (trip === 'return') { const [d1, d2] = C.dates.get(); if (!d2) C.dates.set([d1, new Date(d1.getTime() + 7 * 864e5)]); }
    renderMulti();
  }

  /* ---------------- search tabs ---------------- */
  function renderTabs() {
    $('#tabs').innerHTML = TABS.map((k) => `<button type="button" role="tab" id="tab-${k}" aria-controls="p-${k}" data-tab="${k}" aria-selected="${k === state.tab}" tabindex="${k === state.tab ? 0 : -1}">${ic(TAB_IC[k], { size: 20 })}<span>${esc(t(`tab.${k}`))}</span></button>`).join('');
    $$('.panel').forEach((p) => p.setAttribute('aria-labelledby', `tab-${p.dataset.kind}`));
  }
  function selectTab(k, focus = false) {
    state.tab = k;
    HF.closeAll();
    $$('#tabs [role=tab]').forEach((b) => { const on = b.dataset.tab === k; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; if (on && focus) b.focus(); });
    $$('.panel').forEach((p) => { p.hidden = p.dataset.kind !== k; });
    // a tab you already searched keeps its results when you come back to it
    if (state.searched.has(k)) showResults(k, { scroll: false }); else results.hidden = true;
  }
  $('#tabs').addEventListener('click', (e) => { const b = e.target.closest('[data-tab]'); if (b) selectTab(b.dataset.tab); });
  $('#tabs').addEventListener('keydown', (e) => {
    let i = TABS.indexOf(state.tab);
    const fwd = ar() ? 'ArrowLeft' : 'ArrowRight', back = ar() ? 'ArrowRight' : 'ArrowLeft';
    if (e.key === fwd) i = (i + 1) % TABS.length; else if (e.key === back) i = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = TABS.length - 1; else return;
    e.preventDefault(); selectTab(TABS[i], true);
  });

  /* ---------------- results ---------------- */
  const results = $('#results');
  function showResults(kind, { scroll = true } = {}) {
    results.innerHTML = `<div class="res-head"><span class="res-tag">${ic('info', { size: 16 })}<span>${esc(t('r.illus'))}</span></span><button type="button" class="icon-btn icon-btn-sm" data-close aria-label="${esc(t('r.close'))}">${ic('close', { size: 18 })}</button></div><div class="res-body res-${kind}">${R[kind]()}</div>`;
    results.hidden = false;
    if (!scroll) return;
    results.classList.remove('in'); void results.offsetWidth; results.classList.add('in');
    const r = results.getBoundingClientRect();
    if (r.top > innerHeight * 0.7 || r.top < 0) results.scrollIntoView({ behavior: reduce.matches ? 'auto' : 'smooth', block: 'start' });
  }
  function runSearch(kind, opts) { HF.closeAll(); state.searched.add(kind); showResults(kind, opts); }
  results.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) { results.hidden = true; state.searched.delete(state.tab); } });

  const R = {
    flights() {
      const from = C.from.get(), to = C.to.get(), px = C.pax.get(), trip = C.trip.get();
      const n = px.ad + px.ch + px.in;
      const mult = { economy: 1, premium: 1.45, business: 2.6, first: 3.8 }[px.cabin] || 1;
      const [d1, d2] = C.dates.get();
      const rows = D.flights.map((fl, i) => {
        const price = Math.round(fl.price * mult);
        const ref = `HYT-FLT-${fl.code}${from}${to}-${i + 1}`;
        const extra = trip === 'multi' ? ` + ${mlegs.map((l) => `${l.from} → ${l.to} ${iso(l.d)}`).join(' + ')}` : trip === 'open' ? ` · open return ${C.valid.get()}m` : trip === 'return' && d2 ? ` · return ${iso(d2)}` : '';
        const msg = `${t('wa.book')} ${fl.code} ${fl.dep} ${from} → ${to} · ${iso(d1)}${extra} · ${n} pax · ${px.cabin}. ${t('wa.ref')}: ${ref}`;
        return `<article class="fl-row">
          <div class="fl-air"><span class="fl-code figure">${fl.code}</span><span>${esc(L(fl.airline))}</span></div>
          <div class="fl-times"><b class="figure">${fl.dep}</b><div class="fl-line"><span class="figure">${fl.dur}</span><i></i><small>${fl.stops ? `${t('r.stop')} <span class="figure">${fl.via}</span>` : t('r.direct')}</small></div><b class="figure">${fl.arr}</b></div>
          <div class="fl-bag">${ic('luggage', { size: 16 })}<span>${t('r.bag')} <span class="figure">${fl.bag}</span></span></div>
          <div class="price-stack"><b>${HY.money(price)}</b><small>${t('r.perPax')}</small></div>
          ${waBtn(msg, t('r.book'), 'btn btn-wa btn-sm')}
        </article>`;
      }).join('');
      const head = `<p class="res-title"><b>${esc(city(from))} ${arrow()} ${esc(city(to))}</b> · ${fmtD(d1, true)} · <span class="figure">${D.flights.length}</span> ${t('r.flights')}</p>`;
      const note = trip === 'return' ? t('r.returnNote') : trip === 'multi' ? t('r.multiNote') : trip === 'open' ? `${t('r.openNote')} ${L(P(`opt.m${C.valid.get()}`))}.` : '';
      return head + rows + (note ? `<p class="res-note">${note}</p>` : '');
    },
    hotels() {
      const c = C.hCity.get(); const [d1, d2] = C.hDates.get(); const g = C.hPax.get();
      const nights = d2 ? Math.max(1, Math.round((d2 - d1) / 864e5)) : 1;
      let list = D.hotels.filter((h) => h.city === c); const other = !list.length; if (other) list = D.hotels;
      const head = `<p class="res-title"><b>${other ? t('r.otherCities') : `${t('r.hotelsIn')} ${esc(L(destBy(c).name))}`}</b> · ${fmtD(d1)} – ${fmtD(d2)} · <span class="figure">${nights}N</span></p>`;
      return head + `<div class="htl-grid">${list.map((h, i) => {
        const ref = `HYT-HTL-${h.city.slice(0, 3).toUpperCase()}-${i + 1}`;
        return `<article class="htl">
          <img src="${img(h.img)}" alt="" loading="lazy">
          <div class="htl-b"><div class="htl-top">${stars(h.stars)}<span class="chip ${h.free ? 'chip-ok' : 'chip-mute'}">${h.free ? t('r.free') : t('r.nonref')}</span></div>
          <h4>${esc(L(h.name))}</h4><p class="muted">${esc(L(h.area))}، ${esc(L(destBy(h.city).name))}</p>
          <div class="htl-foot"><div class="price-stack"><b>${HY.money(h.from)}</b><small>${t('r.night')}</small></div>${waBtn(`${t('wa.book')} ${L(h.name)} · ${iso(d1)} → ${iso(d2)} · ${g.rooms}R/${g.ad + g.ch}G. ${t('wa.ref')}: ${ref}`, t('r.book'), 'btn btn-wa btn-sm')}</div></div>
        </article>`;
      }).join('')}</div>`;
    },
    packages() {
      const d = C.kDest.get(), m = C.kMonth.get();
      let list = D.packages.filter((p) => (!d || p.dest === d));
      const inMonth = list.filter((p) => !m || p.departs.startsWith(m));
      if (inMonth.length) list = inMonth;
      if (!list.length) return `<p class="res-empty">${t('r.none')}</p>${waBtn(t('wa.hello'), t('r.ask'))}`;
      return `<div class="pkg-grid">${list.map(pkgCard).join('')}</div>`;
    },
    charter() {
      const f = C.cFrom.get(), to = C.cTo.get(), m = C.cMonth.get();
      const mon = m ? +m.split('-')[1] : 0;
      let list = PROGS.filter((p) => (f === 'all' || p.from === f) && (to === 'all' || p.to === to) && (!mon || inSeason(p, mon)));
      const none = !list.length; if (none) list = PROGS;
      return `${none ? `<p class="res-empty">${ic('info', { size: 18 })} ${t('r.noProg')}</p>` : `<p class="res-title"><b><span class="figure">${list.length}</span> ${t('r.progs')}</b>${m ? ` · ${esc(L(monthLabel(new Date(`${m}-01T12:00:00`))))}` : ''}</p>`}
        <div class="prog-grid">${list.map(progCard).join('')}</div>`;
    },
    esim() {
      const r = D.esim.regions.find((x) => x.id === C.eRegion.get());
      const days = +C.eDays.get();
      return `<p class="res-title"><b>${r.flag} ${esc(L(r.name))}</b> · <span class="figure">${days}</span> ${t('es.days')}</p><div class="plans">${esimPlans(r, days)}</div>`;
    },
    visa() { return visaCard(+C.vDest.get()); },
  };
  $$('.panel').forEach((form) => form.addEventListener('submit', (e) => { e.preventDefault(); runSearch(form.dataset.kind); }));

  /* ---------------- packages ---------------- */
  function pkgCard(p) {
    const dest = destBy(p.dest);
    const sold = p.seats === 0;
    const seats = sold ? `<span class="chip chip-bad">${t('p.sold')}</span>` : p.seats != null && p.seats <= 5 ? `<span class="chip chip-warn"><span class="figure">${p.seats}</span> ${t('p.seats')}</span>` : '';
    const msg = sold ? `${t('wa.pkgNotify')} ${L(p.name)}. ${t('wa.ref')}: ${p.id}` : `${t('wa.book')} ${L(p.name)} · ${p.departs}. ${t('wa.ref')}: ${p.id}`;
    const price = p.from == null ? HY.money(null) : `<small>${t('p.from')}</small> ${HY.money(p.from)}`;
    return `<article class="pkg ${sold ? 'is-sold' : ''}">
      <div class="pkg-img"><img src="${img(p.img)}" alt="" loading="lazy">${seats}</div>
      <div class="pkg-b">
        <h3>${esc(L(p.name))}</h3>
        <p class="pkg-meta"><span class="figure">${p.nights}</span> ${t('p.nights')} · ${esc(L(dest.country))} · ${t('p.departs')} ${fmtISO(p.departs)}</p>
        <p class="pkg-inc">${p.includes.slice(0, 3).map((k) => esc(L(D.includes[k]))).join(' · ')}</p>
        <div class="pkg-foot"><div class="pkg-price">${price} <small>${t('p.perPax')}</small></div>
          ${waBtn(msg, sold ? t('p.notify') : t('p.book'), `btn btn-sm ${sold ? 'btn-ghost' : 'btn-wa'}`)}</div>
      </div>
    </article>`;
  }
  const renderPackages = () => { $('#pkgGrid').innerHTML = D.packages.map(pkgCard).join(''); };

  /* ---------------- charter programmes ---------------- */
  function progCard(p) {
    const sold = p.seats === 0, req = p.seats == null;
    const seatTxt = sold ? `<span class="prog-seats is-sold">${t('cp.sold')}</span>` : req ? '' : `<span class="prog-seats"><span class="figure">${p.seats}</span> ${t('cp.left')}</span>`;
    const ctas = sold
      ? waBtn(`${t('wa.wait')} ${p.id}`, t('cp.wait'), 'btn btn-ghost btn-sm')
      : `${waBtn(`${t('wa.seat')} ${p.id} (${p.from} → ${p.to}, ${L(p.day)} ${p.dep}). ${t('wa.ref')}: ${p.id}`, t('cp.bookSeat'), 'btn btn-wa btn-sm')}
         <a class="lnk" href="${HY.wa(`${t('wa.seatHotel')} ${p.id} (${p.from} → ${p.to}). ${t('wa.ref')}: ${p.id}`)}" target="_blank" rel="noopener">${t('cp.withHotel')} ${HY.money(p.pkg)}</a>`;
    return `<article class="prog ${sold ? 'is-sold' : ''}">
      <div class="prog-img"><img src="${img(p.img)}" alt="" loading="lazy"></div>
      <div class="prog-b">
        <h3 class="prog-route display">${esc(plain(city(p.from)))} <i>${arrow()}</i> ${esc(plain(city(p.to)))}</h3>
        <p class="prog-when">${esc(L(p.day))} · <span class="figure">${p.dep}</span> · <span class="figure">${p.dur}</span></p>
        <div class="prog-price"><small>${t('cp.seat')}</small> <b>${HY.money(p.seat)}</b>${seatTxt}</div>
        <div class="prog-ctas">${ctas}</div>
      </div>
    </article>`;
  }
  function renderProgs(animate) {
    const list = PROGS.filter((p) => state.chCity === 'all' || p.from === state.chCity);
    const g = $('#progGrid');
    g.innerHTML = list.map(progCard).join('');
    if (animate) { g.classList.remove('swap-in'); void g.offsetWidth; g.classList.add('swap-in'); }
  }

  /* ---------------- services ---------------- */
  // [service id, photo, where the tile leads: a search tab, a page section, or WhatsApp]
  const SVC = [['flights', 'hero-wing', 'tab'], ['hotels', 'hotel', 'tab'], ['packages', 'istanbul', '#packages'], ['charter', 'charter-jet', '#charter'],
    ['esim', 'esim-phone', 'tab'], ['visa', 'visa-passport', 'tab'], ['insurance', 'lounge', 'wa'], ['transfers', 'transfer-car', 'wa']];
  function renderServices() {
    $('#svcGrid').innerHTML = SVC.map(([id, photo, to]) => {
      const s = D.services.find((x) => x.id === id);
      const inner = `<img src="${img(photo)}" alt="" loading="lazy"><span class="svc-b"><b>${esc(plain(L(s.name)))}</b><span class="svc-line">${esc(L(s.line))}</span>
        <span class="svc-go">${esc(t(`go.${id}`))}${ic(to === 'wa' ? 'whatsapp' : 'arrowR', { size: 16, dir: to !== 'wa' })}</span></span>`;
      if (to === 'wa') return `<a class="svc" href="${HY.wa(t(`wa.${id}`))}" target="_blank" rel="noopener">${inner}</a>`;
      if (to === 'tab') return `<button type="button" class="svc" data-go="${id}">${inner}</button>`;
      return `<a class="svc" href="${to}">${inner}</a>`;
    }).join('');
  }
  $('#svcGrid').addEventListener('click', (e) => {
    const b = e.target.closest('[data-go]'); if (!b) return;
    selectTab(b.dataset.go); jumpTo('#search');
    $(`#tab-${b.dataset.go}`).focus({ preventScroll: true });
  });

  /* ---------------- month guide ---------------- */
  function renderGuide(animate) {
    const list = (GUIDE[state.guide] || GUIDE[11]).map(([slug, temp]) => ({ d: destBy(slug), temp })).filter((x) => x.d);
    const row = $('#archRow');
    row.innerHTML = list.map(({ d, temp }) => `<button type="button" class="arch" data-dest="${d.slug}">
      <span class="arch-img"><img src="${img(d.img)}" alt="" loading="lazy"><span class="arch-temp figure">${temp}°C</span></span>
      <span class="arch-b"><small>${esc(L(d.country))} · <span class="figure">${d.flight}</span></small><b class="display">${esc(plain(L(d.name)))}</b>
        <span class="arch-price">${t('p.from')} ${HY.money(d.from)}</span>
        <span class="arch-go">${t(DEST_AIR[d.slug] ? 'mg.flights' : 'mg.pkgs')}${ic('arrowR', { size: 16, dir: true })}</span></span>
    </button>`).join('');
    if (animate) { row.classList.remove('swap-in'); void row.offsetWidth; row.classList.add('swap-in'); }
  }
  $('#archRow').addEventListener('click', (e) => {
    const b = e.target.closest('[data-dest]'); if (!b) return;
    const code = DEST_AIR[b.dataset.dest];
    if (code) { selectTab('flights'); C.to.set(code); runSearch('flights', { scroll: false }); }
    else { selectTab('packages'); C.kDest.set(D.packages.some((p) => p.dest === b.dataset.dest) ? b.dataset.dest : ''); runSearch('packages', { scroll: false }); }
    jumpTo('#search');
  });

  /* ---------------- eSIM ---------------- */
  function esimPlans(r, days) {
    return r.plans.map(([gb, d, usd], i) => {
      const ref = `HYT-ESIM-${r.id.toUpperCase()}-${gb}`;
      const best = d === days || (i === 1 && !r.plans.some((p) => p[1] === days));
      return `<article class="plan ${best ? 'is-pop' : ''}">
        ${best ? `<span class="plan-pop">${t('es.pop')}</span>` : ''}
        <div class="plan-gb figure">${gb}<small>GB</small></div>
        <p class="plan-d"><span class="figure">${d}</span> ${t('es.days')} · ${t('es.net')} <span class="figure">${r.net}</span></p>
        <div class="plan-p">${HY.money(usd)}</div>
        ${waBtn(`${t('wa.book')} eSIM ${L(r.name)} ${gb}GB / ${d}d. ${t('wa.ref')}: ${ref}`, t('es.buy'), 'btn btn-sm btn-wa')}
      </article>`;
    }).join('');
  }

  /* ---------------- visa ---------------- */
  function visaCard(i) {
    const v = VISAS[i];
    const ref = `HYT-VSA-${(v.country.en || '').replace(/[^A-Za-z]/g, '').slice(0, 3).toUpperCase()}`;
    const time = v.type === 'free' ? t('vs.noProc') : v.days == null ? t('vs.advisor') : `<span class="figure">${v.days}</span> ${t('vs.daysN')}`;
    const fee = v.from === 0 ? t('vs.noFee') : HY.money(v.from);
    const tone = v.type === 'free' ? 'ok' : (v.type === 'evisa' || v.type === 'arrival') ? 'info' : 'warn';
    return `<article class="visa-card">
      <div class="visa-top"><div><small class="muted">${t('vs.for')}</small><h3>${esc(L(v.country))}</h3></div><span class="chip chip-${tone}">${esc(L(D.visaTypes[v.type]))}</span></div>
      <dl class="visa-facts"><div><dt>${t('vs.time')}</dt><dd>${time}</dd></div><div><dt>${t('vs.fee')}</dt><dd>${fee}</dd></div></dl>
      <div><p class="lbl">${t('vs.docs')}</p><ul class="ticks">${VISA_DOCS[v.type].map((k) => `<li>${esc(t(k))}</li>`).join('')}</ul></div>
      <div>${waBtn(`${t('wa.book')} ${L(D.visaTypes[v.type])} · ${L(v.country)}. ${t('wa.ref')}: ${ref}`, t('vs.start'))}</div>
    </article>`;
  }

  /* ---------------- FAQ ---------------- */
  function renderFaq() {
    const open = $$('#faqList details').map((d) => d.open);
    $('#faqList').innerHTML = FAQ.map(([qa, qe, aa, ae], i) => `<details ${open[i] ? 'open' : ''}><summary><span>${esc(ar() ? qa : qe)}</span>${ic('plus', { size: 20 })}</summary><p>${esc(ar() ? aa : ae)}</p></details>`).join('');
  }

  /* ---------------- dialogs: tracking, agent login ---------------- */
  const menuBtn = $('#menuBtn'), drawer = $('#drawer');
  const closeDrawer = () => { drawer.hidden = true; menuBtn.setAttribute('aria-expanded', 'false'); };
  const openDlg = (dlg) => {
    closeDrawer(); HF.closeAll();
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
    setTimeout(() => dlg.querySelector('input').focus(), 50);
  };
  const trackDlg = $('#trackDlg'), loginDlg = $('#loginDlg');
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-track]')) openDlg(trackDlg);
    else if (e.target.closest('[data-login]')) openDlg(loginDlg);
  });
  [trackDlg, loginDlg].forEach((d) => d.addEventListener('click', (e) => { if (e.target === d) d.close(); }));
  const markEmpty = (form, names) => names.map((n) => { const x = form[n]; const bad = !x.value.trim(); x.closest('.hf-field').classList.toggle('is-error', bad); return bad; }).some(Boolean);

  function trackResult(ref) {
    const kind = /PKG/.test(ref) ? 'tab.packages' : /HTL/.test(ref) ? 'tab.hotels' : /CHT/.test(ref) ? 'tab.charter' : 'tab.flights';
    const steps = ['trk.s1', 'trk.s2', 'trk.s3', 'trk.s4'];
    return `<div class="dlg-res"><div class="dlg-res-h"><b class="figure">${esc(ref)}</b><span class="chip chip-info">${t(kind)}</span><span class="res-tag">${t('trk.demo')}</span></div>
      <ol class="steps">${steps.map((k, i) => `<li class="${i < 3 ? 'done' : 'now'}">${t(k)}</li>`).join('')}</ol>
      ${waBtn(`${t('trk.waMsg')} ${ref}`, t('trk.help'), 'btn btn-wa btn-block')}</div>`;
  }
  $('#trackForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target;
    if (markEmpty(f, ['ref', 'phone'])) { state.trk = null; $('#trackOut').innerHTML = `<p class="res-empty">${ic('info', { size: 18 })} ${t('trk.empty')}</p>`; return; }
    state.trk = f.ref.value.trim().toUpperCase();
    $('#trackOut').innerHTML = trackResult(state.trk);
  });
  $('#loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    $('#loginOut').innerHTML = markEmpty(e.target, ['email', 'password'])
      ? `<p class="res-empty">${ic('info', { size: 18 })} ${t('l.fill')}</p>`
      : `<div class="dlg-res"><p class="muted">${t('l.demo')}</p>${waBtn(t('wa.login'), t('l.desk'), 'btn btn-wa btn-block')}</div>`;
  });

  /* ---------------- contact / static WA ---------------- */
  function renderStatic() {
    $$('[data-wa]').forEach((a) => { a.href = HY.wa(t(`wa.${a.dataset.wa}`)); a.target = '_blank'; a.rel = 'noopener'; });
    $('#ctWa').textContent = D.company.phone; $('#ctPhone').textContent = D.company.phone;
    $('#ctTel').href = `tel:${D.company.phone.replace(/\s/g, '')}`;
    const dark = HY.theme() === 'dark';
    $('#themeBtn .theme-ic').innerHTML = ic(dark ? 'sun' : 'moon', { size: 20 });
    $('#themeBtn').setAttribute('aria-label', t(dark ? 'theme.toLight' : 'theme.toDark'));
  }

  /* ---------------- nav ---------------- */
  $('#langBtn').addEventListener('click', () => { HF.closeAll(); HY.toggleLang(); });
  $('#themeBtn').addEventListener('click', () => HY.toggleTheme());
  menuBtn.addEventListener('click', () => { const o = drawer.hidden; drawer.hidden = !o; menuBtn.setAttribute('aria-expanded', String(o)); });
  drawer.addEventListener('click', (e) => { if (e.target.closest('a')) closeDrawer(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer.hidden) { closeDrawer(); menuBtn.focus(); }
  });
  const nav = $('.nav');
  const onScroll = () => nav.classList.toggle('is-stuck', window.scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------------- render all ---------------- */
  function renderAll() {
    renderTabs(); renderServices(); renderPackages(); renderProgs(); renderGuide();
    renderFaq(); renderMulti(); renderStatic();
    if (state.trk) $('#trackOut').innerHTML = trackResult(state.trk);
    if (state.searched.has(state.tab)) showResults(state.tab, { scroll: false });
    fillIcons();
  }
  HY.onChange(renderAll);
  renderAll();
  syncTrip();
  selectTab(state.tab);
  requestAnimationFrame(() => root.classList.add('ready'));
})();
