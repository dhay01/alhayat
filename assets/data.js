/* Hayat mock catalogue shared by every template. All bilingual { ar, en }.
   Illustrative only: in production, prices/availability come from hayat-packages,
   hayat-reservations and hayat-b2b. No Umrah/Hajj, no customer reviews (management rule). */
window.HY_DATA = {
  company: {
    name: { ar: 'حياة للسفر والسياحة', en: 'Hayat Travel & Tourism' },
    phone: '+964 770 000 0000',       // placeholder
    whatsapp: '9647700000000',        // placeholder
    email: 'hello@hayat.iq',
    address: { ar: 'بغداد، العراق', en: 'Baghdad, Iraq' },
    since: 2010,
  },

  services: [
    { id: 'flights',   icon: 'plane',    img: 'hero-wing',     name: { ar: 'طيران', en: 'Flights' },        line: { ar: 'أسعار مباشرة من بغداد وأربيل والبصرة والنجف إلى أكثر من 120 مدينة.', en: 'Fares from Baghdad, Erbil, Basra and Najaf to 120+ cities.' } },
    { id: 'hotels',    icon: 'bed',      img: 'hotel',         name: { ar: 'فنادق', en: 'Hotels' },          line: { ar: 'فنادق منتقاة بأسعار الجملة، مع إلغاء مجاني على معظمها.', en: 'Curated hotels at wholesale rates, most with free cancellation.' } },
    { id: 'packages',  icon: 'luggage',  img: 'istanbul',      name: { ar: 'بكجات سياحية', en: 'Holiday packages' }, line: { ar: 'طيران وفندق وتنقلات وجولات في حجز واحد.', en: 'Flight, hotel, transfers and tours in one booking.' } },
    { id: 'charter',   icon: 'plane-up', img: 'dest-antalya',   name: { ar: 'رحلات تشارتر', en: 'Charter flights' }, line: { ar: 'مقاعد على رحلات مباشرة موسمية من بغداد وأربيل والبصرة، وحدها أو مع فندق.', en: 'Seats on seasonal direct flights from Baghdad, Erbil and Basra, alone or with a hotel.' } },
    { id: 'esim',      icon: 'sim', img: 'esim-phone',  name: { ar: 'شرائح eSIM', en: 'eSIM data' },      line: { ar: 'إنترنت فور وصولك في أكثر من 150 دولة، بدون تبديل الشريحة.', en: 'Data the moment you land in 150+ countries, no SIM swap.' } },
    { id: 'visa',      icon: 'documents', img: 'lounge', name: { ar: 'تأشيرات', en: 'Visas' },          line: { ar: 'نتابع ملف التأشيرة من الأوراق حتى الموافقة.', en: 'We handle your visa file from documents to approval.' } },
    { id: 'insurance', icon: 'shield',   img: 'esim-street',        name: { ar: 'تأمين سفر', en: 'Travel insurance' }, line: { ar: 'تغطية طبية وإلغاء وأمتعة معتمدة لطلبات التأشيرة.', en: 'Medical, cancellation and baggage cover accepted for visas.' } },
    { id: 'transfers', icon: 'truck',    img: 'transfer-car',  name: { ar: 'تنقلات المطار', en: 'Airport transfers' }, line: { ar: 'سائق بانتظارك عند الوصول، بسعر ثابت.', en: 'A driver waiting at arrivals, at a fixed price.' } },
    { id: 'b2b',       icon: 'building', img: 'b2b-office',    name: { ar: 'بوابة الوكلاء B2B', en: 'B2B agent portal' }, line: { ar: 'أسعار الجملة، محفظة ائتمان، وفواتير لوكلاء السفر.', en: 'Wholesale rates, credit wallet and invoicing for travel agents.' } },
    { id: 'corporate', icon: 'users',    img: 'corporate',     name: { ar: 'سفر الشركات', en: 'Corporate travel' }, line: { ar: 'حساب واحد لموظفيك، سياسة سفر، وفواتير شهرية.', en: 'One account for your team, travel policy, monthly invoicing.' } },
  ],

  airports: [
    { code: 'BGW', city: { ar: 'بغداد', en: 'Baghdad' } },
    { code: 'EBL', city: { ar: 'أربيل', en: 'Erbil' } },
    { code: 'BSR', city: { ar: 'البصرة', en: 'Basra' } },
    { code: 'NJF', city: { ar: 'النجف', en: 'Najaf' } },
    { code: 'ISU', city: { ar: 'السليمانية', en: 'Sulaymaniyah' } },
    { code: 'IST', city: { ar: 'إسطنبول', en: 'Istanbul' } },
    { code: 'DXB', city: { ar: 'دبي', en: 'Dubai' } },
    { code: 'GYD', city: { ar: 'باكو', en: 'Baku' } },
    { code: 'TBS', city: { ar: 'تبليسي', en: 'Tbilisi' } },
    { code: 'TZX', city: { ar: 'طرابزون', en: 'Trabzon' } },
    { code: 'AYT', city: { ar: 'أنطاليا', en: 'Antalya' } },
    { code: 'SSH', city: { ar: 'شرم الشيخ', en: 'Sharm El Sheikh' } },
    { code: 'BUS', city: { ar: 'باتومي', en: 'Batumi' } },
    { code: 'CAI', city: { ar: 'القاهرة', en: 'Cairo' } },
    { code: 'KUL', city: { ar: 'كوالالمبور', en: 'Kuala Lumpur' } },
    { code: 'MLE', city: { ar: 'المالديف', en: 'Maldives' } },
    { code: 'CDG', city: { ar: 'باريس', en: 'Paris' } },
    { code: 'LHR', city: { ar: 'لندن', en: 'London' } },
  ],

  destinations: [
    { slug: 'istanbul', img: 'istanbul', name: { ar: 'إسطنبول', en: 'Istanbul' }, country: { ar: 'تركيا', en: 'Türkiye' }, from: 420, flight: '2h 50m', visa: 'evisa', tag: { ar: 'الأكثر طلباً', en: 'Most booked' } },
    { slug: 'dubai', img: 'dubai', name: { ar: 'دبي', en: 'Dubai' }, country: { ar: 'الإمارات', en: 'UAE' }, from: 380, flight: '2h 20m', visa: 'evisa', tag: { ar: 'تسوّق', en: 'Shopping' } },
    { slug: 'baku', img: 'baku', name: { ar: 'باكو', en: 'Baku' }, country: { ar: 'أذربيجان', en: 'Azerbaijan' }, from: 510, flight: '2h 10m', visa: 'evisa', tag: { ar: 'عطلة قصيرة', en: 'Short break' } },
    { slug: 'trabzon', img: 'trabzon', name: { ar: 'طرابزون', en: 'Trabzon' }, country: { ar: 'تركيا', en: 'Türkiye' }, from: 560, flight: '2h 05m', visa: 'evisa', tag: { ar: 'طبيعة', en: 'Nature' } },
    { slug: 'georgia', img: 'georgia', name: { ar: 'جورجيا', en: 'Georgia' }, country: { ar: 'جورجيا', en: 'Georgia' }, from: 540, flight: '2h 30m', visa: 'free', tag: { ar: 'جبال', en: 'Mountains' } },
    { slug: 'sharm', img: 'sharm', name: { ar: 'شرم الشيخ', en: 'Sharm El Sheikh' }, country: { ar: 'مصر', en: 'Egypt' }, from: 610, flight: '3h 00m', visa: 'arrival', tag: { ar: 'بحر', en: 'Beach' } },
    { slug: 'maldives', img: 'maldives', name: { ar: 'المالديف', en: 'Maldives' }, country: { ar: 'المالديف', en: 'Maldives' }, from: 1890, flight: '7h 10m', visa: 'arrival', tag: { ar: 'شهر العسل', en: 'Honeymoon' } },
    { slug: 'alula', img: 'alula', name: { ar: 'العُلا', en: 'AlUla' }, country: { ar: 'السعودية', en: 'Saudi Arabia' }, from: 980, flight: '2h 40m', visa: 'evisa', tag: { ar: 'تراث', en: 'Heritage' } },
    { slug: 'antalya', img: 'dest-antalya', name: { ar: 'أنطاليا', en: 'Antalya' }, country: { ar: 'تركيا', en: 'Türkiye' }, from: 640, flight: '3h 05m', visa: 'evisa', tag: { ar: 'عائلي', en: 'Family' } },
    { slug: 'cairo', img: 'dest-cairo', name: { ar: 'القاهرة', en: 'Cairo' }, country: { ar: 'مصر', en: 'Egypt' }, from: 450, flight: '2h 45m', visa: 'arrival', tag: { ar: 'تاريخ', en: 'History' } },
    { slug: 'kuala-lumpur', img: 'dest-kl', name: { ar: 'كوالالمبور', en: 'Kuala Lumpur' }, country: { ar: 'ماليزيا', en: 'Malaysia' }, from: 1150, flight: '9h 30m', visa: 'free', tag: { ar: 'آسيا', en: 'Asia' } },
    { slug: 'bali', img: 'dest-bali', name: { ar: 'بالي', en: 'Bali' }, country: { ar: 'إندونيسيا', en: 'Indonesia' }, from: 1420, flight: '12h 40m', visa: 'arrival', tag: { ar: 'استوائي', en: 'Tropical' } },
    { slug: 'paris', img: 'dest-paris', name: { ar: 'باريس', en: 'Paris' }, country: { ar: 'فرنسا', en: 'France' }, from: 1290, flight: '6h 10m', visa: 'schengen', tag: { ar: 'أوروبا', en: 'Europe' } },
    { slug: 'london', img: 'dest-london', name: { ar: 'لندن', en: 'London' }, country: { ar: 'المملكة المتحدة', en: 'United Kingdom' }, from: 1350, flight: '6h 40m', visa: 'uk', tag: { ar: 'أوروبا', en: 'Europe' } },
  ],

  packages: [
    { id: 'HYT-PKG-1042', dest: 'istanbul', nights: 5, from: 690, img: 'istanbul', stars: 4, includes: ['flight', 'hotel', 'transfer', 'tour'], departs: '2026-11-06', seats: 9,
      name: { ar: 'إسطنبول بين القارتين', en: 'Istanbul between two continents' } },
    { id: 'HYT-PKG-1057', dest: 'trabzon', nights: 6, from: 840, img: 'trabzon', stars: 4, includes: ['flight', 'hotel', 'transfer', 'tour'], departs: '2026-11-12', seats: 4,
      name: { ar: 'طرابزون والهضاب الخضراء', en: 'Trabzon and the green plateaus' } },
    { id: 'HYT-PKG-1063', dest: 'baku', nights: 4, from: 720, img: 'baku', stars: 5, includes: ['flight', 'hotel', 'transfer'], departs: '2026-11-19', seats: 12,
      name: { ar: 'باكو، مدينة الرياح', en: 'Baku, city of winds' } },
    { id: 'HYT-PKG-1071', dest: 'maldives', nights: 5, from: 2650, img: 'maldives', stars: 5, includes: ['flight', 'hotel', 'transfer'], departs: '2026-12-03', seats: null,
      name: { ar: 'المالديف فوق الماء', en: 'Maldives over the water' } },
    { id: 'HYT-PKG-1080', dest: 'georgia', nights: 6, from: 780, img: 'georgia', stars: 4, includes: ['flight', 'hotel', 'transfer', 'tour'], departs: '2026-11-26', seats: 0,
      name: { ar: 'جورجيا من تبليسي إلى كازبيگي', en: 'Georgia, Tbilisi to Kazbegi' } },
    { id: 'HYT-PKG-1088', dest: 'kuala-lumpur', nights: 7, from: 1490, img: 'dest-kl', stars: 4, includes: ['flight', 'hotel', 'tour'], departs: '2026-12-10', seats: 7,
      name: { ar: 'ماليزيا: كوالالمبور ولنكاوي', en: 'Malaysia: Kuala Lumpur and Langkawi' } },
  ],
  includes: {
    flight: { ar: 'طيران', en: 'Flight' }, hotel: { ar: 'فندق', en: 'Hotel' },
    transfer: { ar: 'تنقلات', en: 'Transfers' }, tour: { ar: 'جولات', en: 'Tours' },
  },

  flights: [
    { airline: { ar: 'الخطوط الجوية العراقية', en: 'Iraqi Airways' }, code: 'IA', from: 'BGW', to: 'IST', dep: '07:40', arr: '10:30', dur: '3h 50m', stops: 0, price: 285, bag: '30kg' },
    { airline: { ar: 'الخطوط التركية', en: 'Turkish Airlines' }, code: 'TK', from: 'BGW', to: 'IST', dep: '04:15', arr: '07:05', dur: '3h 50m', stops: 0, price: 312, bag: '30kg' },
    { airline: { ar: 'فلاي بغداد', en: 'Fly Baghdad' }, code: 'IF', from: 'BGW', to: 'IST', dep: '13:20', arr: '16:10', dur: '3h 50m', stops: 0, price: 249, bag: '20kg' },
    { airline: { ar: 'فلاي دبي', en: 'flydubai' }, code: 'FZ', from: 'BGW', to: 'IST', dep: '09:55', arr: '17:40', dur: '8h 45m', stops: 1, via: 'DXB', price: 231, bag: '20kg' },
  ],

  hotels: [
    { name: { ar: 'فندق بيرا بالاس', en: 'Pera Palace Hotel' }, city: 'istanbul', stars: 5, area: { ar: 'بي أوغلو', en: 'Beyoğlu' }, from: 210, img: 'hotel', free: true },
    { name: { ar: 'سويسوتيل البوسفور', en: 'Swissôtel The Bosphorus' }, city: 'istanbul', stars: 5, area: { ar: 'بشكتاش', en: 'Beşiktaş' }, from: 245, img: 'lounge', free: true },
    { name: { ar: 'فندق ريكسوس الشاطئ', en: 'Rixos Premium Seagate' }, city: 'sharm', stars: 5, area: { ar: 'خليج نبق', en: 'Nabq Bay' }, from: 188, img: 'sharm', free: false },
  ],

  esim: {
    regions: [
      { id: 'tr', flag: '🇹🇷', name: { ar: 'تركيا', en: 'Türkiye' }, net: '5G', plans: [[3, 7, 9], [10, 15, 19], [20, 30, 32]] },
      { id: 'ae', flag: '🇦🇪', name: { ar: 'الإمارات', en: 'UAE' }, net: '5G', plans: [[1, 7, 8], [5, 15, 18], [10, 30, 29]] },
      { id: 'ge', flag: '🇬🇪', name: { ar: 'جورجيا', en: 'Georgia' }, net: '4G', plans: [[3, 7, 8], [10, 15, 16], [20, 30, 27]] },
      { id: 'az', flag: '🇦🇿', name: { ar: 'أذربيجان', en: 'Azerbaijan' }, net: '4G', plans: [[3, 7, 9], [10, 15, 18], [20, 30, 30]] },
      { id: 'eu', flag: '🇪🇺', name: { ar: 'أوروبا (39 دولة)', en: 'Europe (39 countries)' }, net: '5G', plans: [[5, 10, 15], [10, 30, 26], [20, 30, 39]] },
      { id: 'my', flag: '🇲🇾', name: { ar: 'ماليزيا', en: 'Malaysia' }, net: '5G', plans: [[3, 7, 7], [10, 15, 15], [20, 30, 24]] },
      { id: 'eg', flag: '🇪🇬', name: { ar: 'مصر', en: 'Egypt' }, net: '4G', plans: [[3, 7, 10], [10, 15, 21], [20, 30, 35]] },
      { id: 'gl', flag: '🌍', name: { ar: 'عالمي (120 دولة)', en: 'Global (120 countries)' }, net: '4G/5G', plans: [[3, 10, 19], [10, 30, 49], [20, 30, 79]] },
    ],
    // each plan: [GB, days, USD]
  },

  // Seat-based charter flight programmes: Hayat sells seats on seasonal direct charter
  // flights (often bundled with a hotel). Hayat does NOT hire whole aircraft or private jets.
  charter: {
    programmes: [
      { id: 'HYT-CHT-AYT', from: 'BGW', to: 'AYT', dest: 'antalya', img: 'dest-antalya', day: { ar: 'كل خميس', en: 'Every Thursday' }, season: { ar: 'من نيسان إلى تشرين الأول', en: 'April to October' }, dep: '06:30', dur: '3h 05m', seat: 330, pkg: 790, bag: '30kg', seats: 14 },
      { id: 'HYT-CHT-SSH', from: 'BGW', to: 'SSH', dest: 'sharm', img: 'sharm', day: { ar: 'كل اثنين', en: 'Every Monday' }, season: { ar: 'طوال العام', en: 'All year' }, dep: '08:10', dur: '3h 00m', seat: 360, pkg: 820, bag: '30kg', seats: 6 },
      { id: 'HYT-CHT-TZX', from: 'EBL', to: 'TZX', dest: 'trabzon', img: 'trabzon', day: { ar: 'كل سبت', en: 'Every Saturday' }, season: { ar: 'من حزيران إلى أيلول', en: 'June to September' }, dep: '07:45', dur: '2h 05m', seat: 290, pkg: 760, bag: '25kg', seats: 0 },
      { id: 'HYT-CHT-BUS', from: 'BGW', to: 'BUS', dest: 'georgia', img: 'georgia', day: { ar: 'كل أحد', en: 'Every Sunday' }, season: { ar: 'من أيار إلى أيلول', en: 'May to September' }, dep: '05:50', dur: '2h 30m', seat: 310, pkg: 740, bag: '25kg', seats: null },
      { id: 'HYT-CHT-GYD', from: 'BSR', to: 'GYD', dest: 'baku', img: 'baku', day: { ar: 'كل أربعاء', en: 'Every Wednesday' }, season: { ar: 'طوال العام', en: 'All year' }, dep: '09:20', dur: '2h 40m', seat: 280, pkg: 690, bag: '23kg', seats: 21 },
    ],
    notes: [
      { ar: 'مقاعد على رحلات مباشرة بدون توقف', en: 'Seats on direct, non-stop flights' },
      { ar: 'أمتعة مشمولة في السعر', en: 'Checked baggage included' },
      { ar: 'المقاعد محدودة وتُحجز بالتسلسل', en: 'Limited seats, first come first served' },
      { ar: 'متاح كمقعد فقط أو مع فندق', en: 'Seat only, or bundled with a hotel' },
    ],
  },


  visas: [
    { country: { ar: 'تركيا', en: 'Türkiye' }, type: 'evisa', days: 3, from: 60 },
    { country: { ar: 'الإمارات', en: 'UAE' }, type: 'evisa', days: 4, from: 110 },
    { country: { ar: 'أذربيجان', en: 'Azerbaijan' }, type: 'evisa', days: 3, from: 45 },
    { country: { ar: 'شنغن (أوروبا)', en: 'Schengen (Europe)' }, type: 'schengen', days: 15, from: 180 },
    { country: { ar: 'المملكة المتحدة', en: 'United Kingdom' }, type: 'uk', days: 21, from: 210 },
    { country: { ar: 'جورجيا', en: 'Georgia' }, type: 'free', days: 0, from: 0 },
  ],
  visaTypes: {
    evisa: { ar: 'تأشيرة إلكترونية', en: 'e-Visa' }, arrival: { ar: 'عند الوصول', en: 'On arrival' },
    free: { ar: 'بدون تأشيرة', en: 'Visa-free' }, schengen: { ar: 'شنغن', en: 'Schengen' }, uk: { ar: 'تأشيرة بريطانية', en: 'UK visa' },
  },

  b2b: {
    stats: [
      { n: '1,200+', l: { ar: 'وكيل سفر مسجّل', en: 'registered agencies' } },
      { n: '400K', l: { ar: 'فندق بأسعار الجملة', en: 'hotels at wholesale rates' } },
      { n: '24/7', l: { ar: 'دعم للوكلاء', en: 'agent support' } },
      { n: '18', l: { ar: 'محافظة عراقية', en: 'Iraqi governorates' } },
    ],
    features: [
      { icon: 'wallet', t: { ar: 'محفظة ائتمان', en: 'Credit wallet' }, d: { ar: 'سقف ائتماني، شحن فوري، وكشف حساب يومي.', en: 'Credit limit, instant top-up and a daily statement.' } },
      { icon: 'tag', t: { ar: 'أسعار الجملة', en: 'Net rates' }, d: { ar: 'طيران وفنادق وبكجات بأسعار صافية وهامش ربحك بيدك.', en: 'Net fares, hotels and packages; you set your markup.' } },
      { icon: 'documents', t: { ar: 'فواتير وتذاكر باسمك', en: 'Your brand on documents' }, d: { ar: 'فواتير وقسائم بشعار وكالتك.', en: 'Invoices and vouchers with your agency logo.' } },
      { icon: 'chat', t: { ar: 'مدير حساب', en: 'Account manager' }, d: { ar: 'شخص واحد يعرف وكالتك ويرد خلال دقائق.', en: 'One person who knows your agency and answers in minutes.' } },
    ],
  },
};
