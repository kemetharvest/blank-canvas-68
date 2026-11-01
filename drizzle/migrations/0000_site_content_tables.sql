-- Site content tables: the site's editable data lives here so it can be managed
-- from outside the site (the Cloud data screen), not hardcoded in components.

CREATE TABLE public.hero_slides (
  id text PRIMARY KEY,
  image text NOT NULL,
  alt text NOT NULL,
  headline text,
  sort_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE public.news_items (
  id text PRIMARY KEY,
  date_label text NOT NULL,
  title text NOT NULL,
  excerpt text,
  image text NOT NULL,
  alt text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.card_tabs (
  id text PRIMARY KEY,
  label text NOT NULL,
  lead text NOT NULL,
  body text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.loan_types (
  id text PRIMARY KEY,
  label text NOT NULL,
  max_amount int NOT NULL,
  step int NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.footer_items (
  id text PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.savings_banner (
  id text PRIMARY KEY,
  image text NOT NULL,
  alt text NOT NULL
);

CREATE TABLE public.cards (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  image_alt text NOT NULL,
  more_href text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.card_benefits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id text NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text,
  note text,
  bullets text[],
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.programs (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  bullets text[],
  image text NOT NULL,
  image_alt text NOT NULL,
  more_href text NOT NULL,
  sort_order int NOT NULL DEFAULT 0
);

CREATE TABLE public.site_texts (
  key text PRIMARY KEY,
  value text NOT NULL
);

GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT SELECT ON public.news_items TO anon, authenticated;
GRANT SELECT ON public.card_tabs TO anon, authenticated;
GRANT SELECT ON public.loan_types TO anon, authenticated;
GRANT SELECT ON public.footer_items TO anon, authenticated;
GRANT SELECT ON public.savings_banner TO anon, authenticated;
GRANT SELECT ON public.cards TO anon, authenticated;
GRANT SELECT ON public.card_benefits TO anon, authenticated;
GRANT SELECT ON public.programs TO anon, authenticated;
GRANT SELECT ON public.site_texts TO anon, authenticated;

GRANT ALL ON public.hero_slides TO service_role;
GRANT ALL ON public.news_items TO service_role;
GRANT ALL ON public.card_tabs TO service_role;
GRANT ALL ON public.loan_types TO service_role;
GRANT ALL ON public.footer_items TO service_role;
GRANT ALL ON public.savings_banner TO service_role;
GRANT ALL ON public.cards TO service_role;
GRANT ALL ON public.card_benefits TO service_role;
GRANT ALL ON public.programs TO service_role;
GRANT ALL ON public.site_texts TO service_role;

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_tabs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.loan_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.savings_banner ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.card_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_texts ENABLE ROW LEVEL SECURITY;

CREATE POLICY hero_slides_read ON public.hero_slides FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY news_items_read ON public.news_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY card_tabs_read ON public.card_tabs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY loan_types_read ON public.loan_types FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY footer_items_read ON public.footer_items FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY savings_banner_read ON public.savings_banner FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY cards_read ON public.cards FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY card_benefits_read ON public.card_benefits FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY programs_read ON public.programs FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY site_texts_read ON public.site_texts FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.hero_slides (id, image, alt, headline, sort_order, is_active) VALUES
  ('ansulema', 'slide-ansulema', 'الأنسليمة — تمليك عقد في الأردن بفائدة 0% على 4 سنوات', NULL, 1, true),
  ('cards-cashback', 'slide-cards-3cards', 'بطاقات البنك الائتمانية — كاش باك على جميع البطاقات، فعّل الآن واحصل على الاسترداد', 'كاش باك على جميع البطاقات
فعّل الآن واحصل على الاسترداد', 2, true),
  ('housing', 'slide-housing', 'بيت الأحلام ما رح يحلم! امتلك بيتك اليوم بنسبة فائدة ثابتة 4.99% لأول 3 سنوات وتمويل لغاية 100%', NULL, 3, true),
  ('cashback', 'slide-cashback', 'كاش باك بفائدة 3.5% وبحد أعلى 200 دينار بس تدفع بأي من بطاقات ماستركارد الائتمانية', NULL, 4, true),
  ('tawfeer', 'slide-tawfeer', 'حسابات التوفير الجوائز قدرة — اقتنع أو غَح حسابات التوفير الجوائز ولا تقنوت فرصتك للربح!', NULL, 5, true),
  ('school', 'slide-school', 'طريقة أسمال! قشر رسوم المدارس والمجاميع بفائدة 0% وفترة سداد مرنة لغاية 12 شهراٌ باستخدام بطاقات ماستركارد الائتمانية', NULL, 6, true),
  ('55', 'slide-55', 'خمسين سنة بين أهلنا وناسنا', NULL, 7, true),
  ('meu', 'slide-meu', 'بكالوريوس أو ماجستير؟ كمّل مشوارك الجامعي بقرة — 0% فائدة على الطالب وفرصة سداد مرنة لغاية 5 سنوات', NULL, 8, true);

INSERT INTO public.news_items (id, date_label, title, excerpt, image, alt, sort_order) VALUES
  ('careem', '٢٠٢٦ – أكتوبر - ١٢', 'مزايا بطاقات ماستركارد — 0.09 JOD الدفعة الشهرية', 'اكتشف عرض Priceless المميزة لحملة بطاقات ماستركارد من البنك الأردني الكويتي.', 'news-careem', 'عرض Careem مع بطاقات ماستركارد', 1),
  ('fintech', '٢٠٢٦ – سبتمبر - ٢٨', 'البنك الأردني الكويتي راعٍ ذهبي لمهرجان الأردن للتكنولوجيا المالية', NULL, 'news-fintech', 'مهرجان الأردن للتكنولوجيا المالية', 2),
  ('school-bags', '٢٠٢٦ – سبتمبر - ١٤', 'توزيع الحقائب المدرسية على طلبة المدارس ضمن مبادرة المجتمع', NULL, 'news-school', 'مبادرة توزيع الحقائب المدرسية', 3),
  ('savings-winners', '٢٠٢٦ – أغسطس - ٣٠', 'إعلان أسماء الراجحين في برنامج حسابات التوفير للعام 2026', NULL, 'savings-banner', 'برنامج حسابات التوفير', 4);

INSERT INTO public.card_tabs (id, label, lead, body, sort_order) VALUES
  ('credit', 'بطاقات الائتمان', 'بفئاتها المتعددة والتي توفر مرونة في الدفع والقدرة الشرائية، بالإضافة لحدود ائتمانية تلبي احتياجاتك بما يلائم دخلك الشهري.', 'يمكن استخدام البطاقة في عمليات الشراء أو السحب النقدي من أجهزة الصراف الآلي المتوفرة في جميع أنحاء العالم، أو من أي فرع من فروع البنك.', 1),
  ('debit', 'بطاقات الخصم', 'بطاقات مرتبطة مباشرة بحسابك الجاري أو حساب التوفير، تتيح لك الشراء والسحب النقدي مع خصم فوري من رصيد حسابك.', 'مقبولة لدى ملايين نقاط البيع وأجهزة الصراف الآلي حول العالم، مع إمكانية إدارتها بسهولة عبر الخدمات المصرفية عبر الإنترنت.', 2),
  ('prepaid', 'بطاقات المدفوعة', 'بطاقات قابلة لإعادة الشحن تمنحك تحكماٌ كاملاٌ بمصروفاتك؛ اشحنها بالمبلغ الذي تريده واستخدمها بحرية وأمان.', 'خيار مثالي للمشتريات اليومية وللهدايا وللاستخدام الآمن عبر الإنترنت دون الحاجة إلى حساب مصرفي.', 3);

INSERT INTO public.loan_types (id, label, max_amount, step, sort_order) VALUES
  ('personal', 'القرض الشخصي', 200000, 5000, 1),
  ('vehicle', 'قرض مركبة', 100000, 5000, 2),
  ('housing', 'قرض الإسكان', 500000, 10000, 3);

INSERT INTO public.footer_items (id, question, answer, sort_order) VALUES
  ('about', 'نبذة عن البنك', 'تعرّف على قصة البنك ورؤيته ورسالته، وشبكة فروعه وخدماته في الأردن وخارجها.', 1),
  ('investors', 'معلومات تهم المستثمرين', 'البيانات المالية، التقارير السنوية، وإفصاحات الشركات المتداولة.', 2),
  ('realestate', 'العقارات', 'الممتلكات المعروضة للبيع من قبل البنك وتفاصيل التواصل بشأنها.', 3),
  ('treasury', 'الخزينة والمؤسسات المالية', 'خدمات الخزينة، البنوك المراسلة، والعلاقات مع المؤسسات المالية.', 4),
  ('contact', 'تواصل معنا', 'فروع البنك، أرقام التواصل، والبريد الإلكتروني للاستفسارات والشكاوى.', 5);

INSERT INTO public.savings_banner (id, image, alt) VALUES
  ('main', 'savings-winners', 'الراجحون ببرنامج حسابات التوفير — الجوائز لعام 2026');

INSERT INTO public.cards (id, title, description, image, image_alt, more_href, sort_order) VALUES
  ('classic', 'بطاقة ماستركارد كلاسيك الائتمانية', 'يقدم البنك الأردني الكويتي بطاقة ماستركارد كلاسيك الائتمانية المقبولة دولياٌ مجاناٌ للسنة الأولى، والتي تتيح لك التسوق وكسب النقاط بشكل فوري وآمن. تتيح البطاقة الائتمانية الدوارة لحاملها إمكانية تسديد سحوبات البطاقة على دفعات شهرية.', 'card-classic', 'بطاقة ماستركارد كلاسيك الائتمانية', 'https://www.jkb.com/ar/cards/mastercard-classic-credit-card', 1),
  ('titanium', 'بطاقة ماستركارد تيتانيوم الائتمانية', 'يقدم البنك الأردني الكويتي بطاقة ماستركارد تيتانيوم الائتمانية المقبولة دولياٌ مجاناٌ للسنة الأولى، والتي تمكنك من التسوق وكسب النقاط على الفور وبشكل آمن، وتسديد سحوبات البطاقة على دفعات شهرية، مع فترة سماح تصل إلى 51 يوماٌ في حدها الأقصى.', 'card-titanium', 'بطاقة ماستركارد تيتانيوم الائتمانية', 'https://www.jkb.com/ar/cards/mastercard-titanium', 2),
  ('platinum', 'بطاقة ماستركارد بلاتينيوم الائتمانية', 'يقدم البنك الأردني الكويتي بطاقة ماستركارد بلاتينيوم الائتمانية المقبولة دولياٌ مجاناٌ للسنة الأولى، والتي تمكنك من التسوق وكسب النقاط على الفور وبشكل آمن، وتسديد سحوبات البطاقة على دفعات شهرية، مع فترة سماح تصل إلى 51 يوماٌ في حدها الأقصى.', 'card-platinum', 'بطاقة ماستركارد بلاتينيوم الائتمانية', 'https://www.jkb.com/ar/cards/mastercard-platinum', 3),
  ('world', 'بطاقة ماستركارد وورلد الائتمانية', 'يقدم البنك الأردني الكويتي بطاقة ماستركارد وورلد الائتمانية، والمقبولة عالمياٌ. بطاقة ماستركارد الدوارة تتيح لحاملها إمكانية تسديد سحوبات البطاقة على دفعات شهرية، مع فترة سماح قد تصل إلى 51 يوماٌ في حدها الأقصى.', 'card-world', 'بطاقة ماستركارد وورلد الائتمانية', 'https://www.jkb.com/ar/cards/mastercard-world', 4),
  ('world-elite', 'بطاقة ماستركارد وورلد إيليت Biometric', 'خدمة المساعد الشخصي Quintessentially، توصلك إلى ما لا يمكن الوصول إليه. خدمة تعمل 24 ساعة في اليوم بناءٌ على طلبك لمنحك المساعدة والوصول إلى أكثر الأمور أهمية لك.', 'card-world-elite', 'بطاقة ماستركارد وورلد إيليت Biometric', 'https://www.jkb.com/ar/cards/mastercard-world-elite-biometric-card', 5),
  ('fly-plus', 'بطاقة ماستركارد " فلاي آند بلس " الائتمانية', 'بطاقة ماستركارد " فلاي آند بلس " من البنك الأردني الكويتي – الملكية الأردنية تجمع بين متعتي السفر والتسوق، إذ يمكنك استخدام بطاقة " فلاي آند بلس " لشراء كل ما تحتاجه من المحلات التجارية والأسواق.', 'card-fly-plus', 'بطاقة ماستركارد فلاي آند بلس الائتمانية', 'https://www.jkb.com/ar/cards/mastercard-fly-plus-credit', 6),
  ('amex', 'أمريكان إكسبرس', 'تقدم بطاقة أميكس باقة من المزايا وأفضل برامج للمكافآت.', 'card-amex', 'بطاقة أمريكان إكسبرس', 'https://www.jkb.com/ar/cards/amex', 7);

INSERT INTO public.card_benefits (card_id, title, body, note, bullets, sort_order) VALUES
  ('classic', 'إمكانية تقسيط مشترياتكم بفائدة 0%', 'إمكانية تقسيط مشترياتكم بفائدة 0% من خلال شركائنا في برنامج التقسيط ولفترات تقسيط تصل لغاية 36 شهراٌ.', NULL, NULL, 1),
  ('classic', 'الحصول على خصم فوري على المشتريات.', 'إمكانية الحصول على خصم فوري على المشتريات التي تتم من خلال البطاقة الائتمانية ومن خلال مجموعة مختارة من التجار.', NULL, NULL, 2),
  ('titanium', 'إمكانية تقسيط مشترياتكم بفائدة 0%', 'إمكانية تقسيط مشترياتكم بفائدة 0% من خلال شركائنا في برنامج التقسيط ولفترات تقسيط تصل لغاية 36 شهراٌ.', NULL, NULL, 1),
  ('titanium', 'ميزة الدخول المجاني إلى صالات المطارات', 'إمكانية دخول العميل حامل البطاقة فقط إلى بعض من صالات رجال الأعمال من خلال التسجيل على تطبيق Mastercard Travel Pass.', NULL, ARRAY['الوصول إلى 5 صالات في عدد من المطارات في الدول العربية.','إمكانية الاستفادة من جميع المرافق الموجودة في الصالات.'], 2),
  ('platinum', 'إمكانية تقسيط مشترياتكم بفائدة 0%', 'إمكانية تقسيط مشترياتكم بفائدة 0% من خلال شركائنا في برنامج التقسيط ولفترات تقسيط تصل لغاية 36 شهراٌ.', NULL, NULL, 1),
  ('platinum', 'ميزة الدخول المجاني إلى صالات المطارات', 'إمكانية دخول العميل حامل البطاقة فقط إلى بعض من صالات رجال الأعمال من خلال التسجيل على تطبيق Mastercard Travel Pass.', NULL, ARRAY['الوصول إلى 25 صالة في عدد من المطارات في مختلف أنحاء العالم.','إمكانية الاستفادة من جميع المرافق الموجودة في الصالات.'], 2),
  ('world', 'إمكانية تقسيط مشترياتكم بفائدة 0%', 'إمكانية تقسيط مشترياتكم بفائدة 0% من خلال شركائنا في برنامج التقسيط ولفترات تقسيط تصل لغاية 36 شهراٌ.', NULL, NULL, 1),
  ('world', 'ميزة الدخول المجاني إلى صالات المطارات', 'إمكانية دخول العميل حامل البطاقة فقط إلى بعض صالات رجال الأعمال من خلال التسجيل على تطبيق Mastercard Travel Pass.', NULL, ARRAY['الوصول إلى أكثر من 1,100 صالة في عدد من المطارات في مختلف أنحاء العالم.','إمكانية الاستفادة من جميع المرافق الموجودة في الصالات.'], 2),
  ('world-elite', 'خدمة المساعد الشخصي', 'خدمة كونسيرج السفر من وورلد إيليت المجانية المقدمة من شركة TEN، خدمة متوفرة على مدار 24 ساعة لتلبية طلباتك وتوصيلك بكل ما يهمك. التخطيط لرحلة مفعمة بالرفاهية، الدخول لأفضل المطاعم الفاخرة وحضور الفعاليات الترفيهية الحصرية.', 'دع وورلد إيليت كونسيرج يتكفل بكافة الترتيبات بينما تتمتع أنت بوقتك!', NULL, 1),
  ('world-elite', 'ميزة الدخول المجاني إلى صالات المطارات', 'إمكانية دخول العميل حامل البطاقة مع دعوة ضيف إلى بعض صالات رجال الأعمال من خلال التسجيل على تطبيق Mastercard Travel Pass.', NULL, ARRAY['الوصول إلى أكثر من 1,100 صالة في عدد من المطارات في مختلف أنحاء العالم.','إمكانية الاستفادة من جميع المرافق الموجودة في الصالات.'], 2),
  ('fly-plus', 'اكتساب الأميال على برنامج المسافر الدائم "Royal Club"', 'باستخدام بطاقة الماستركارد "فلاي آند بلس" للمشتريات اليومية واستبدال الأميال المجمعة بمزايا خاصة بالسفر من خلال الملكية الأردنية وتحالف ون وورلد (One World Alliance).', NULL, NULL, 1),
  ('fly-plus', 'ميزة الدخول المجاني إلى صالات المطارات', 'إمكانية دخول العميل حامل البطاقة فقط إلى بعض صالات رجال الأعمال من خلال التسجيل على تطبيق Mastercard Travel Pass.', NULL, ARRAY['الوصول إلى أكثر من 1,100 صالة في عدد من المطارات في مختلف أنحاء العالم.','إمكانية الاستفادة من جميع المرافق الموجودة في الصالات.'], 2),
  ('amex', 'برامج مكافآت العضوية', 'برامج مكافآت العضوية تخول حامل البطاقة الحصول على نقطة واحدة مقابل كل دولار ينفقه، حيث يمكن استبدال هذه النقاط بتذاكر سفر، إقامات في الفنادق، قسائم مشتريات، تناول العشاء وغيرها الكثير.', NULL, NULL, 1);

INSERT INTO public.programs (id, title, description, bullets, image, image_alt, more_href, sort_order) VALUES
  ('instant-discount', 'برنامج الخصم المباشر', 'استمتع بخصومات فورية من العديد من المتاجر من خلال برنامج الخصم المباشر عند استخدام بطاقة ماستركارد.', ARRAY['احصل على خصم مباشر عند استخدامك بطاقة ماستركارد.','برنامج الخصم المباشر يتضمن العديد من السلع والخدمات من متاجر مختلفة.'], 'program-instant-discount', 'برنامج الخصم المباشر', 'https://www.jkb.com/ar/cards/instant-discount-program', 1),
  ('installment', 'برنامج التقسيط من خلال بطاقات ماستركارد الائتمانية', 'بإمكانك تقسيط مشترياتك من خلال بطاقات ماستركارد الائتمانية من البنك الأردني الكويتي بفائدة 0% وفترة سداد تصل لغاية 36 شهراٌ، وذلك عند استخدامك بطاقة ماستركارد الائتمانية بكافة فئاتها للشراء من خلال مجموعة من شركائنا في برنامج التقسيط ضمن القطاعات المتنوعة: الإلكترونيات والصحة والساعات والسفر وأكثر من ذلك بكثير.', ARRAY[]::text[], 'program-installment', 'برنامج التقسيط', 'https://www.jkb.com/ar/cards/installment-plan-with-mastercard-credit-cards', 2);

INSERT INTO public.site_texts (key, value) VALUES
  ('announcement_title', 'إعلان إلى السادة مساهمي وعملاء البنك الأردني الكويتي'),
  ('announcement_body', 'بخصوص أسماءهم وأرباح المساهمين وودائع العملاء الذين ينطبق عليهم قانون تملك الحكومة للأموال التي لحقها التقادم.'),
  ('footer_copyright', '© 2026 البنك الأردني الكويتي. جميع الحقوق محفوظة.'),
  ('home_cards_heading', 'البطاقات'),
  ('home_news_heading', 'الأخبار'),
  ('home_loan_heading', 'حساب القرض'),
  ('cards_eyebrow', 'اختر بطاقة الائتمان المناسبة لك'),
  ('cards_heading', 'بطاقات ماستركارد'),
  ('cards_intro', 'بفئاتها المتعددة والتي تمنحك المرونة في الدفع والقدرة الشرائية بالإضافة للعديد من المزايا التي تلبي احتياجاتك بما يلائم دخلك الشهري.');
