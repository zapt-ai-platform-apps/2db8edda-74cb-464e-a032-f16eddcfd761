-- Create Sunnahs table
CREATE TABLE IF NOT EXISTS "sunnahs" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "content" TEXT NOT NULL,
  "explanation" TEXT NOT NULL,
  "examples" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "source" TEXT NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Create Completions table
CREATE TABLE IF NOT EXISTS "completions" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "sunnah_id" INTEGER NOT NULL,
  "notes" TEXT,
  "shared" BOOLEAN DEFAULT FALSE,
  "completed_at" TIMESTAMP DEFAULT NOW()
);

-- Create Daily Sunnahs table
CREATE TABLE IF NOT EXISTS "daily_sunnahs" (
  "id" SERIAL PRIMARY KEY,
  "sunnah_id" INTEGER NOT NULL,
  "date" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);

-- Add initial Sunnahs data if table is empty
INSERT INTO "sunnahs" ("title", "content", "explanation", "examples", "type", "source")
SELECT
  'التسمية عند الأكل',
  'قول بسم الله قبل الأكل',
  'من السنة النبوية قول بسم الله قبل البدء بالطعام، وفي حالة نسيان التسمية في أول الطعام، يقول المسلم: بسم الله في أوله وآخره.',
  'قول بسم الله قبل تناول وجبة الإفطار، التذكير بالتسمية عند تناول الطعام مع العائلة أو الأصدقاء',
  'قولية',
  'صحيح البخاري'
WHERE NOT EXISTS (SELECT 1 FROM "sunnahs" LIMIT 1);

INSERT INTO "sunnahs" ("title", "content", "explanation", "examples", "type", "source")
SELECT
  'الأكل باليد اليمنى',
  'تناول الطعام باليد اليمنى',
  'من هدي النبي صلى الله عليه وسلم استخدام اليد اليمنى في الأكل والشرب، وقد نهى عن الأكل والشرب باليد اليسرى.',
  'استخدام اليد اليمنى عند تناول الوجبات، تعليم الأطفال أهمية استخدام اليمنى في الأكل',
  'عملية',
  'صحيح مسلم'
WHERE EXISTS (SELECT 1 FROM "sunnahs" LIMIT 1);

INSERT INTO "sunnahs" ("title", "content", "explanation", "examples", "type", "source")
SELECT
  'الابتسامة في وجه الآخرين',
  'الابتسامة في وجه الآخرين',
  'الابتسامة في وجه الآخرين صدقة وسنة من السنن النبوية التي تدخل السرور على القلوب وتزيد المودة بين الناس.',
  'الابتسام للزملاء في العمل، الابتسام للجيران عند لقائهم، الابتسام للأطفال لإدخال السرور عليهم',
  'عملية',
  'سنن الترمذي'
WHERE EXISTS (SELECT 1 FROM "sunnahs" LIMIT 1);

INSERT INTO "sunnahs" ("title", "content", "explanation", "examples", "type", "source")
SELECT
  'رد السلام',
  'رد التحية بمثلها أو بأحسن منها',
  'من آداب الإسلام رد السلام بمثله أو بأحسن منه، فإذا قال شخص: السلام عليكم، ترد عليه: وعليكم السلام، أو وعليكم السلام ورحمة الله وبركاته.',
  'الرد على تحية السلام من الزملاء أو الأصدقاء، تعليم الأطفال آداب السلام والرد',
  'قولية',
  'صحيح البخاري'
WHERE EXISTS (SELECT 1 FROM "sunnahs" LIMIT 1);

INSERT INTO "sunnahs" ("title", "content", "explanation", "examples", "type", "source")
SELECT
  'الوضوء قبل النوم',
  'الوضوء قبل النوم',
  'من السنن النبوية التوضؤ قبل النوم، وقد كان النبي صلى الله عليه وسلم يتوضأ قبل نومه كما يتوضأ للصلاة.',
  'الوضوء قبل النوم ليلاً، تعليم الأطفال أهمية الوضوء قبل النوم',
  'عملية',
  'صحيح البخاري'
WHERE EXISTS (SELECT 1 FROM "sunnahs" LIMIT 1);

INSERT INTO "sunnahs" ("title", "content", "explanation", "examples", "type", "source")
SELECT
  'الدعاء قبل دخول الخلاء',
  'قول: اللهم إني أعوذ بك من الخبث والخبائث',
  'من السنة قول هذا الدعاء قبل دخول الحمام لطلب الحماية من الشياطين التي تتواجد في أماكن قضاء الحاجة.',
  'قول الدعاء قبل دخول الحمام في المنزل أو الأماكن العامة، تعليم الأطفال هذا الدعاء',
  'قولية',
  'صحيح البخاري ومسلم'
WHERE EXISTS (SELECT 1 FROM "sunnahs" LIMIT 1);

INSERT INTO "sunnahs" ("title", "content", "explanation", "examples", "type", "source")
SELECT
  'تشميت العاطس',
  'قول: يرحمك الله لمن عطس وحمد الله',
  'إذا عطس شخص وقال الحمد لله، فالسنة أن نقول له: يرحمك الله، ويرد هو: يهديكم الله ويصلح بالكم.',
  'تشميت الزملاء أو أفراد الأسرة عند العطس، تعليم الأطفال هذا الأدب الإسلامي',
  'قولية',
  'صحيح البخاري'
WHERE EXISTS (SELECT 1 FROM "sunnahs" LIMIT 1);