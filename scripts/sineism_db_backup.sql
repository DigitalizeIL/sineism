--
-- PostgreSQL database dump
--

-- Dumped from database version 15.7
-- Dumped by pg_dump version 15.7 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: default
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO "default";

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: default
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Bookmark; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Bookmark" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    page integer NOT NULL,
    "bookmarkedItemId" text NOT NULL,
    "referenceType" text NOT NULL
);


ALTER TABLE public."Bookmark" OWNER TO "default";

--
-- Name: Bookmark_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Bookmark_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Bookmark_id_seq" OWNER TO "default";

--
-- Name: Bookmark_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Bookmark_id_seq" OWNED BY public."Bookmark".id;


--
-- Name: Category; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    name text NOT NULL,
    path text NOT NULL
);


ALTER TABLE public."Category" OWNER TO "default";

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Category_id_seq" OWNER TO "default";

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    "userId" integer NOT NULL,
    "commentNumber" integer NOT NULL,
    "postIds" integer[]
);


ALTER TABLE public."Comment" OWNER TO "default";

--
-- Name: Comment_commentNumber_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Comment_commentNumber_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_commentNumber_seq" OWNER TO "default";

--
-- Name: Comment_commentNumber_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Comment_commentNumber_seq" OWNED BY public."Comment"."commentNumber";


--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Comment_id_seq" OWNER TO "default";

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Orders; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Orders" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "orderId" text NOT NULL,
    product text NOT NULL,
    price numeric(65,30) NOT NULL
);


ALTER TABLE public."Orders" OWNER TO "default";

--
-- Name: Orders_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Orders_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Orders_id_seq" OWNER TO "default";

--
-- Name: Orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Orders_id_seq" OWNED BY public."Orders".id;


--
-- Name: Post; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Post" (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    metadata jsonb,
    "authorId" integer NOT NULL,
    "categoryId" integer NOT NULL,
    "postNumber" integer NOT NULL
);


ALTER TABLE public."Post" OWNER TO "default";

--
-- Name: Post_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Post_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Post_id_seq" OWNER TO "default";

--
-- Name: Post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Post_id_seq" OWNED BY public."Post".id;


--
-- Name: Post_postNumber_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Post_postNumber_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Post_postNumber_seq" OWNER TO "default";

--
-- Name: Post_postNumber_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Post_postNumber_seq" OWNED BY public."Post"."postNumber";


--
-- Name: Rating; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Rating" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "postId" integer,
    "commentId" integer,
    rating integer
);


ALTER TABLE public."Rating" OWNER TO "default";

--
-- Name: Rating_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Rating_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Rating_id_seq" OWNER TO "default";

--
-- Name: Rating_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Rating_id_seq" OWNED BY public."Rating".id;


--
-- Name: Settings; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."Settings" (
    id integer NOT NULL,
    key text NOT NULL,
    value text NOT NULL
);


ALTER TABLE public."Settings" OWNER TO "default";

--
-- Name: Settings_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."Settings_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Settings_id_seq" OWNER TO "default";

--
-- Name: Settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."Settings_id_seq" OWNED BY public."Settings".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."User" (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    role text DEFAULT 'GUEST'::text NOT NULL,
    "isSubscribed" boolean DEFAULT false NOT NULL
);


ALTER TABLE public."User" OWNER TO "default";

--
-- Name: UserCommentQuota; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public."UserCommentQuota" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    quota integer NOT NULL
);


ALTER TABLE public."UserCommentQuota" OWNER TO "default";

--
-- Name: UserCommentQuota_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."UserCommentQuota_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."UserCommentQuota_id_seq" OWNER TO "default";

--
-- Name: UserCommentQuota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."UserCommentQuota_id_seq" OWNED BY public."UserCommentQuota".id;


--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."User_id_seq" OWNER TO "default";

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: Bookmark id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Bookmark" ALTER COLUMN id SET DEFAULT nextval('public."Bookmark_id_seq"'::regclass);


--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: Comment commentNumber; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN "commentNumber" SET DEFAULT nextval('public."Comment_commentNumber_seq"'::regclass);


--
-- Name: Orders id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Orders" ALTER COLUMN id SET DEFAULT nextval('public."Orders_id_seq"'::regclass);


--
-- Name: Post id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Post" ALTER COLUMN id SET DEFAULT nextval('public."Post_id_seq"'::regclass);


--
-- Name: Post postNumber; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Post" ALTER COLUMN "postNumber" SET DEFAULT nextval('public."Post_postNumber_seq"'::regclass);


--
-- Name: Rating id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Rating" ALTER COLUMN id SET DEFAULT nextval('public."Rating_id_seq"'::regclass);


--
-- Name: Settings id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Settings" ALTER COLUMN id SET DEFAULT nextval('public."Settings_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."User" ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Name: UserCommentQuota id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."UserCommentQuota" ALTER COLUMN id SET DEFAULT nextval('public."UserCommentQuota_id_seq"'::regclass);


--
-- Data for Name: Bookmark; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Bookmark" (id, "userId", page, "bookmarkedItemId", "referenceType") FROM stdin;
1	14	2	2	1
9	18	1	2	comment
15	18	1	16	1
16	18	1	1	14
18	31	1	1	14
21	100	1	5	38
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Category" (id, name, path) FROM stdin;
37	נעשהה	exoterice
36	נשמעע	esoterice
38	קונטינגנטיי	contingentc
48	נשמע	esoteric
49	נעשה	exoteric
50	קונטינגנטי	contingent
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Comment" (id, content, "userId", "commentNumber", "postIds") FROM stdin;
\.


--
-- Data for Name: Orders; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Orders" (id, "userId", "orderId", product, price) FROM stdin;
1	18	9A6164445R632124C	Comments	1.000000000000000000000000000000
2	31	1XS71180PJ515802M	3 תגובות	1.000000000000000000000000000000
3	15	96B697129E178063W	3 תגובות	1.000000000000000000000000000000
4	93	29F41267T0544072Y	Registration	1.000000000000000000000000000000
5	95	01T30147T2441411X	Registration	30.000000000000000000000000000000
6	18	3VU77215C44949512	Registration	30.000000000000000000000000000000
7	98	21V31463AA5997902	Registration	30.000000000000000000000000000000
8	15	28G76763RD949341K	Registration	30.000000000000000000000000000000
\.


--
-- Data for Name: Post; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Post" (id, title, content, metadata, "authorId", "categoryId", "postNumber") FROM stdin;
79	בלי אנ"ת	עקב אי מניעת פרוייקט ההתנחבלויות: יש מדינה ישראלית יש מוות, יש מדינה פלסטינית יש מוות, יש מדינה כנענית יש חיים. יש מדינה ישראלית יש מעשה מדיני בלי ערך רוחני, יש מדינה פלסטינית יש מעשה מדיני בלי ערך רוחני, יש מדינה כנענית יש מעשה מדיני עם ערך רוחני. יש מדינה ישראלית יש קלקול עולם, יש מדינה פלסטינית שי קלקול עולם, יש מדינה כנענית יש תיקון עולם. מדינה כנענית איננה מדינה דו לאומית, איננה מדינת כל אזרחיה, איננה דמוקרטיה ליברלית. 	\N	31	37	3
76	בלי אנ"ת	היחידים אשר לחלוטין אינם אשמים בפשע ההתנחבלויות הם המתנחבלים ותומכיהם. האשמים בפשע זה הם: 1. המערביים, בכך שקיימו ושמקיימים הם קשרים כלשהם עם ישראל למרות ההתנחבלויות. 2. הערבים, בכך שלא מנעו ושלא מונעים את ההתנחבלות עי דרישה מישראל לספח את הגדה והרצועה למדינת ישראל. 3. הישראלים "השמאליים", בכך שלא מעיזים הם לתבוע הן מהמערביים והן מהערבים מילוי חובותיהם אלה.	\N	31	37	1
71	בלי אנ"ת	ההתקדמויות: מדתיות לחילונות, מקונסרבטיביות לפרוגרסיביות, מדיקטטורה לדמוקרטיה, מבערות להשכלה, מעריצות לחופש, מאמונה למדע ודומיהן הינן היסטוריציזם קונטינגנטי. \nהתקדמות מתניניות לרעלנות, מהיות עם לעם תנין להיות עם לעם רעיל הינו היסטוריציזם הכרחי.	\N	31	36	26
81	בלי אנ"ת	 בלי אלוהים כמקומו של עולם, עם אלוהים שמקומו מאחורי הברוש.	\N	31	36	19
75	בלי אנ"ת	מותר האדם מהבהמה דברים. אין דברים לבהמה.\nדברים (כמו האוורסט..), הכרחי 'לטפס' עליהם בשל עצם קיומם. \nהכרחי להשתמש גם בדברים קיימים ולא רק באותיות ובמילים ככלי דיבור. כשפה. זאת מחד גיסא. אך בה בעת ומאידך גיסא אין להשתמש בדברים קיימים למאומה מעבר לשפה!\nהמביא דברים בשם אומרם, המביא תוכנם של דברים, המביא דברים בהקשרם, המביא דברים ככוונת כותבם, המביא פשוטם, המביא דרשם, המביא סודם, המביא רימזם, המביא פרשנותם, המביא משמעם   מביא חורבן לעול	\N	31	36	17
72	1	קונטינגנטי מהו? אפשר איתו ואפשר בלעדיו. איננו הכרחי ואיננו הרסני. לא מועיל ולא מזיק.\nקוטג' 1%, קוטג' 9% וקל וחומר קוטג' 12% קונטינגנטיים. קוטג' 5% הכרחי.\n	\N	31	38	1
70	בלי אנ"ת	לא הקיימים (יהיו אשר יהיו. הן מעל והן מתחת גלגל הירח) אלא המעשים הם עיקר מותר היש מהאין. 	\N	31	36	16
78	בלי אנ"ת	נאורות כלומר בגרות (enlightment sive maturitas) out. נאורות כלומר הורות (enlightment sive paternitas) in.   ילדים זוללים חטיפים וממתקים רק אם הוריהם מאפשרים להם זאת. יהודים מתנחבלים רק אם המערביים ובראשם האמריקאים מאפשרים להם זאת.	\N	31	37	2
73	עם אנ"ת	הבל הבלים הכל הבל. אין חדש תחת השמש. מותר האדם מהבהמה אין. סוף דבר הכל נשמע, את האלוהים ירא ואת מצוותיו שמור כי זה כל האדם.	\N	31	36	11
80	בלי אנ"ת	נאורות ערבית מהי? בלי אורינטלדיציאה ובלי  אורינטלקולפה. עם כנעניות.	\N	31	37	4
84	בלי אנ"ת	אלוהים אשר מאחורי הברוש, שמור אותי ממתנחבלים ומחרדים העושים מעשים טובים, ממתנחבלים ומחרדים העושים מעשים רעים אשמר בעצמי. המאוחד עם מתנחבלים ועם חרדים העושים מעשים טובים והמגנים את אלה מבניהם העושים מעשים רעים, סופו שיהיה מאוחד עם מתנחבלים ועם חרדים ןבעל ברית גורל אחד איתם למרות שאיננו בעל ברית ייעוד איתם. חפץ חיים אוהב ימים לראות טוב ישמר מאוד לנפשו (ולנשמתו ולשכלו) מחבירה כלשהי עם מתנחבלים ועם חרדים יהיו אשר יהיו. אפרטהייד הוא כל האימפרטיב הקטגורי הקיומי והמוסרי במילה אחת, ואידך זיל גמור	\N	31	37	5
91	7	אתונה/בית הלל: חסד. ספרטה/בית שמאי: גבורה. אלה ואלה ערכים ראויים. כאשר הם סותרים יש לנהוג כבאתונה, כבית הלל. או להיפך..	\N	31	38	8
86	2	עיקר הפילוסופיה מהו? חשיפת האמת, הוודאי, ההרמוניה הקוסמית, אידאת הטוב, נוסחה נכונה למדינה תקינה וכיו"ב ע"י חשיפת העובדות הלוגיות, ההכרחיות, הקבועות, הבלתי תלויות בניסיון והפעלתן.	\N	31	38	2
93	10	כל מחלוקת לשם שמיים סופה להתקיים. לנצח. היכן? בשמיים. אחרי כלות כל היש/היישות.	\N	31	38	10
101	12	החי סובייקט. כל קיים אחר הוא אובייקט, אינסטרומנט עבור הסובייקט. הן האובייקט והן הסובייקט אף פעם לא נמצאים במנוחה אלא בתנועה תמידית. אל ההתכלות, אל המוות. האדם הוא הסובייקט היחידי שמודע לכך ולכן נמצא הוא תמיד במצב רוח של דאגה וחרדה. יש לאדם דעת. הדעת טרנסצנדנטית לתנועה אל ההתכלות ולכן באמצעותה יש לאדם גישה אל הבלתי מתכלים, אל המושגים הקבועים, הניצחיים. 	\N	31	38	12
87	4	העולם הנחשב והנתפס הוא מולקולה שעשויה מאטומים שהם העובדות הלוגיות.	\N	31	38	4
90	7	כלי עבודה פילוסופיים: קונפליקטים. דיאלקטיקה. אחדות ניגודים. תזה אנטיתזה סינתזה. דסטרוקציה (הרס) של ההשקפות/הנחות היסוד או/ו של תוצאותיהן. דקונסטרוקציה. 	\N	31	38	7
96	בלי אנ"ת	אכילת טוב ורע מעץ הדעת היא המונעת מהעולם הזה להיות הטוב שבכל העולמות האפשריים. טוב עץ הדעת למאכל ותאווה הוא לעיניים ונחמד העץ להשכיל בגבולות הנאות בלבד. חובות אוכלים מעץ החיים.     	\N	31	36	20
107	עם אנ"ת	העולם, השמים והארץ וכל צבאם כולל האדם, קונטינגנטיים. אין בם כולל באדם כל ערך וכל חשיבות.  הקיים היחידי בעל הערך הוא אלוהים. הטרנסצנדנטי לעולם.\nאבל, "אתה הבדלת אנוש מראש ותכירהו לעמוד לפניך", ובזכות חסד זה יש חשיבות ויש ערך לחיי אדם.	\N	31	36	14
98	11	הרוח, בין אם היא: 1.אמת מוחלטת, קבועה, הפוך בה והפוך והכל בה, מתקיימת גם אם ישנם וגם אם אינם שמיים וארץ וכל צבאם וכיו"ב,  2.משתנה, רפלקסיבית לעצם הקיום, להתפתחויות הקיום, למצב היסטורי מדיני חברתי מסויים וכיו"ב, טרנסצנדנטית ואופוזיציונית היא, לכל חומרי יהיה אשר יהיה.   בדיוק כפי שהנבואה טרנסצנדנטית ואופוזיציונית למלוכה.	\N	31	38	11
103	13	אם אינך יכול לנצח משהו הצטרף איליו.  אינך יכול לנצח את הזמניות הצטרף אליה. איך? ע"י הקביעה: יישות היא זמניות. משמעות/ערך היש הוא זמניותו. 	\N	31	38	13
109	בלי אנ"ת	בלי נרטיבים. בלי נרטיב דתי. בלי נרטיב פילוסופי. בלי נרטיב עמי.	\N	31	37	7
94	בלי אנ"ת	מי האיש החפץ להיות חפץ חיים ואוהב ימים לראות טוב ישמר מאוד לנשמתו ולשכלו ולנפשו מעבודת אלוהים נחשים ותנינים.  בהתאמה.	\N	31	36	9
92	9	איש האמונה הבודד הינו או האדם היוצר או האדם הנגאל.	\N	31	38	9
104	14	בית הילל חסד, בית שמאי גבורה.   בית הילל אתונאיות, בית שמאי ספרטניות.   במקרה של התנגשות מהי הדרך הנכונה?	\N	31	38	14
111	בלי אנ"ת	המקדש את העם היהודי, המקדש את הציונות, המקדש מדינת ישראל שופכי דמים. \n	\N	31	37	8
108	בלי אנ"ת	אכן עצלן העם. אכן שקרן העם. אכן אכזר העם.	\N	31	37	6
100	15	להיות רק כדי להיות. להיות שם. להיות בתוך העולם. להיות חלק מהיישות.	\N	31	38	15
85	3	לא באמת ניתן לדבר על פילוסופיה	\N	31	38	3
88	5	מהי נאורות? הכרה בערך האדם ובכלליות תבונתו.   	\N	31	38	5
89	6	אלוהים כלומר הטבע.    יישות כלומר זמניות.    ידיעה כלומר ממשות.    מילים כלומר ידיעה.    מילים כלומר ממשות.    נאורות כלומר בגרות.   אקזיסטנציאליזם כלומר הומניזם.	\N	31	38	6
114	עם אנ"ת	הצגת נוסחה אחידה וקבועה למדינה תקינה. חיפוש נוסחה קבועה ואחידה למדינה תקינה. 	\N	31	36	21
113	עם אנ"ת	צבא כושל מדינה כושלת. צבא תקין מדינה תקינה.	\N	31	37	9
110	בלי אנ"ת	עמים שופכים דמים.\nהציווי המוחלט (האימפרטיב הקטגורי) הראוי הוא: \nפעל כך שתוכל בכל רגע נתון להתייצב בפני אלוהים ואדם ולומר: ידי לא שפכו את הדם הזה. \n	\N	31	36	7
121	בלי אנ"ת	עם או בלי:\nהבדלה בין הבורא לבין העולם או האחדת הבורא והעולם,\nאיון הבורא או איון העולם.\nהבדלה בין החיים לבין הדעת (=בחינת החיים) או האחדת החיים והדעת. \nביטול ערך החיים או קידוש ערך החיים,\nביטול ערך הדעת או קידוש ערך הדעת,\nאיון האני או האלאת האני,\nביטול הסובייקט (האדם) או קידוש הסובייקט,\nהאלאת המהות אדם או האלאת התופעה אדם מסויים,\nראיה באחר גיהנום או ראיה באחר הגואל,\nראית העולם הזה כטוב או כרע שבכל העולמות האפשריים,\nנוח לאדם שלא נברא משנברא או נוח לו שנברא משלא נברא,\nכל הללו קונטינגנטיים. רשות.\nבלי להיות:\nאכזרים כלפי אכזרים, \nרחמנים כלפי אכזריים,\nאלה, שני אלה, בלבד הכרחיים. חובה.	\N	31	36	18
120	בלי אנ"ת	להיות טורף או לא להיות טורף, זאת השאלה? \n1.או להיות טורף על (טורף בלתי נטרף) או לא להיות טורף כלל.\n2.טורפים נטרפים משמידים אלה את אלה. רעילים לא נטרפים.\n3.שלא להיות לא טורפי על ולא רעילים זה לוקסוס השמור לענקים בלבד. ליוויתנים, פילים, היפופוטמים. \n 	\N	31	37	10
122	בלי אנ"ת	חזק שיכול לטרוף אך איננו טורף רעיל הוא. טורפו ממית עצמו ולכן נמנע מלטורפו.	\N	31	37	11
118	עם אנ"ת	הגוף הוא כלא אשר הנשמה צריכה לברוח ממנו. \nמטרה נשגבת זו מקדשת את כל האמצעים כולל עינויים עצמיים כגון: סגפנות., צום, התגלגלות בשלג, עוני, תפילות, לימודים.	\N	31	36	15
119	עם אנ"ת	היהדות/היהודים הם ישראל שבבשר. הנצרות/הנוצרים הם ישראל שברוח.	\N	31	36	24
117	16	בחינת החיים, איך: בחינת היחסים בין: \nהמחשבה הדתית, המחשבה המדעית, המחשבה הפוליטית.\nהאדם ואלוהיו, האדם ועולמו, האדם וחברתו.\nתיקון האדם, תיקון העולם, תיקון החברה.\n	\N	31	38	16
112	בלי אנ"ת	אכן טרנסצנדנטי הנשגב. \n1.טרנסצנדנטי הן לנבדל מהעולם, הן לכוליות העולם, הן לאימננטיות העולם.\n   הן לעולם והן לבוראו, יהיה אשר יהיה, הן לזה המושלם והן לזה המשתלם.\n2.טרנסצנדנטי הן לגשמיות והן לרוחניות, הן לאינדיבידואליות והן לאוניברסליות, הן למהויות והן לתופעות, הן לריאליזם והן לאידאליזם, הן לטוב \n   והן לרע, הן ליפה והן למכוער, הן לשמיים והן לארץ, הן לפיזיקה והן למטאפיזיקה, הן לאדם והן לעם. הן ליחיד והן לציבור, הן לממשיים והן \n   למופשטים, הן למשמעות והן לסתמיות, הן לפרטים והן לכלליים, הן לקבועים והן למשתנים.\n3.טרנסצנדנטי להישרדות אנשים כדרך שאר הקיימים.	\N	31	36	23
123	בלי אנ"ת	ציידים-לקטים, חקלאים-תעשיתיים,, בינה אנושית-בינה מלאכותית ואפילו כפריים-עירוניים out. טורפים חיצוניים-טורפים פנימיים in.\nמניעה מטורפים פנימיים להצטרף בעת מלחמה לטורפים חיצוניים בלי לטרוף אותם הוא אתגר כל האתגרים.	\N	31	36	25
116	בלי אנ"ת	בלי העולם הטוב ביותר מכל העולמות האפשריים, עם המדינה הטובה ביותר מכל המדינות האפשריות.\nמדינה טובה יותר ככל שהיא מאפשרת לכל אזרחיה ולכל תושביה חיים נעימים ונוחים יותר. ככל שמדינה חזקה יותר היא מדינה טובה יותר. \nככל שמדינה טורפת יותר היא חלשה יותר? לא. דין פרוטה כדין מאה. טריפה כהריון. או קיימת או לא קיימת. 	\N	31	36	22
115	בלי אנ"ת	מותר האדם מהבהמה מדינה. אין מדינה לבהמה.\nמדינה שאנ"ת בה אוכלת יושביה.	\N	31	36	2
126	19	ההוויה קובעת את התודעה? המדינה קובעת את התודעה? העם קובע את התודעה? הדת קובעת את התודעה? התרבות קובעת את התודעה?\nהתודעה קובעת את הזהות? הזהות קובעת את התודעה? המיתוס מכונן את האתוס? האתוס מכונן את המיתוס?האתוס מכונן את הזהות?\nאו שכן או שלא. הוודאי הוא: ניתן להאמין באתוס, אתוס מכונן זהות, בלי לממש אותו. ע"ע ציוני אמריקה. וגם ההיפך. 	\N	31	38	19
127	17	מדינת לאום מהי? מדינה=חברה=זהות.	\N	31	38	17
140	בלי אנ"ת	כי תקרב אל עיר להלחם עליה וקראת אליה לשלום?\nשלום הוא המשך המלחמה באמצעים אחרים. הרבה יותר מסוכנים.\nוכתתו חרבותם לאיתים וחניתותיהם למזמרות?\nאיתים ומזמרות במקום חרבות וחניתות הם כלי המלחמה המסוכנים ביותר.\nצימחונות היא קרניבוריות באמצעים אחרים. פרוגרסיביות היא פונדמנטליסטיות באמצעים אחרים.\n	\N	31	36	29
142	בלי אנ"ת	[ידי לא שופכות את הדם הזה]\nהגוזר מנאמנות לחובה זו את כל שאר נאמנויותיו הוא לבדו חופשי.\nהנאמן לחובות המונעות ממנו נאמנות לחובה זו עבד עבדים הוא.	\N	31	36	3
129	בלי אנ"ת	עם תנינים משמעו: ניתן להביס/לחסל את האוייב.\nבלי תנינים משמעו: לא מסוגלים להביס/לחסל את האוייב.\n	\N	31	37	12
130	בלי אנ"ת	רוח המפקד אוכלת הן אסטרטגיה והן טקטיקה לארוחת בוקר.\nפחד מהמפקד אוכל הן תבונה והן עובדות לארוחת בוקר.	\N	31	37	13
132	בלי אנ"ת	אכן מבצעת ישראל פשעי מלחמה. לא נגד הפלסטינים. כן נגד חייליה וחטופיה. ומשפחותיהם וחבריהם. 	\N	31	37	14
133	בלי אנ"ת	 הכלה היא מכביסת מילים. לקידוש הסטטוס קוו. לניהול סיכסוך.	\N	31	37	15
134	בלי אנ"ת	האם בגלל חוסר מקצוענות של בעלי התפקידים הובסנו ב'שמחת תורה'. בגלל שבעלי התפקידים הם בעלי מלאכה גרועים'?	\N	31	37	16
135	בלי אנ"ת	עם תנינים ובלי תנינים בגבולות העובדה שתחת אותה אלונקה שניהם נמצאים.	\N	31	37	17
138	18	הצאן והבקר ישחט להם ומצא להם?\nאם את כל דגי הים יאסף להם ומצא להם?	\N	31	38	18
143	בלי אנ"ת	בלי: דע את עצמך. עם: גיס חמישי מנע.	\N	31	36	5
136	בלי אנ"ת	ראשית דבר הכל נשמע, במקום שיש אנ"ת השתדל להיות איש, כי זה כל האדם.\n	\N	31	36	4
131	בלי אנ"ת	לעוזבך ולשוב מאחורייך? אל תפגעי בי! \nכי אל אשר תלכי אלך ובאשר תליני אלין, באשר תמותי אמות, רק המוות יפריד ביני לבינך, עמך עמי למרות שאלוהייך איננו אלוהי.	\N	31	36	28
141	בלי אנ"ת	אלוהים שלי, שמור אותי מרעים טובים. מרעים רעים אשמר בעצמי.	\N	31	36	10
139	בלי אנ"ת	אלוהים השופך דם האדם באדם דמו ישפך	\N	31	36	27
124	עם אנ"ת	התגבר כארי לעמוד בבוקר לעבודת בוראך, שיהא הוא מעורר השחר עבורך.	\N	31	36	13
137	בלי אנ"ת	בלי: הפתרון המדיני ביטחוני הוא זה וזה.\nעם: זה וזה מונע פתרון מדיני בטחוני.	\N	31	37	18
74	עם אנ"ת	יסוד היסודות ועמוד החוכמות לידע שיש שם מצוי ראשון, והוא ממציא כל נמצא, וכל הנמצאים בשמיים ובארץ ובמה שבניהם לא נמצאים אלא מאמיתות המצאו, ואם הוא אינו מצוי אף דבר אחר לא יכול להמצא, וכל הנמצאים מלבדו צריכים לו והוא לא צריך לאף אחד מהם, הוא לבדו אמת ואין לאף אחד אחר אמת כאמיתותו, אין וודאות קיומו כוודאות קיום אף אחד אחר, והוא היחידי אשר אין ספק בקיומו, אין  לאף אחר יחודיות כיחודיותו, מקומו של עולם הוא ואין העולם מקומו (או שכן...), מחשבותיו אינן מחשבות זולתו ודרכיו אינן דרכי זולתו, לא יראהו אדם וחי ולא יבינהו אדם (בכל אופן כל עוד הוא חי...), הן אין והן אינסוף בדיבור אחד הוא. כניעה לו היא משמעות החיים. יראתו היא משמעות החיים, שמירת מצוותיו היא משמעות החיים, מעמד האדם לפניו היא משמעות החיים. כל השאר קונטינגנטי.	\N	31	36	12
95	בלי אנ"ת	בלי:\n1.בראשית ברא אלוהים את השמים ואת הארץ?     \n2.מעץ הדעת טוב ורע לא תאכל ממנו?     \n3.ויהי כל הארץ שפה אחת ודברים אחדים?\nעם:\nויאמר עם הרוב אל עצמו: \nהנה עם המיעוט רב ועצום ממנו. הבה נתחכמה לו ונמרר את חייו למען ענותו בסבלותיו פן ירבה ויפרוץ ועלה מן הארץ, והיה כי תקראנה מלחמה ונוסף גם הוא על שונאינו ונלחם בנו.\n\n   \n	\N	31	36	6
146	בלי אנ"ת	בלי דתיות - חילונות. בלי דעת - חיים. בלי ימניות - שמאליות.\nעם: מלחמת חורמה בגיס חמישי, הן זה שבפועל והן זה שבכוח.	\N	31	36	8
157	3, עם אנ"ת, נשמע	  עיקרי הלכות יסודי התורה:\nהמוני העם הולכים במחשכי הזמן. אל תמשך באותם העיניינים.\nפרוש מדרכיהם ולך אל העיניינים הגדולים אשר בשמיים ומעבר לים הם.\nמעשה בראשית ומעשה מרכבה מיידעים לאדם את אלוהיו ומעניקים משמעות לחיו.	\N	31	37	21
147	8	הגות, זהות, מציאות, מה מימוש של מה?\nמציאות היא מימוש ההגות? מציאות היא מימוש הזהות? זהות היא מימוש ההגות? זהות היא מימוש המציאות? הגות היא מימוש המציאות? הגות היא מימוש הזהות?\nמציאות היא מקום? מקום הוא מציאות?	\N	31	38	8
150	בלי אנ"ת	בלי אמונה. עם אמנה.	\N	31	36	31
151	בלי אנ"ת	האמנות:\nחופש, שיוויון, אחווה.\nשלטון של כולם, על ידי כולם, למען כולם.\nזכות לחיים, לחופש, להשגת אושר.\nחירות, צדק, שלום.\nשיוויון חברתי, מדיני, אזרחי בלי הבדלי דת גזע ומין.\nמובנות מאליהן.\nהאמנה שעליה חייבת להיות מושתתת מדינה שאיננה חד שיבטית היא:\nבלי אלוהים, בלי נחשים, בלי תנינים.\n\n	\N	31	36	32
155	1, עם אנ"ת, נשמע	עיקר עיקרי יסודות הדת: \nלידע שהאל מנבא את בני ישראל.\nלידע שהאל מנבא את בני האדם, שהרי כל בני האדם נבראו בצלמו.\nנביא הינו בעל דעה רחבה ונכונה עד מאוד.\nאת מי מנבא אלוהים? את מי שהוא חכם גדול בחוכמות, גיבור כובש יצרו, עשיר  בעל פנאי, שלם בגופו, עניו, גבוה.	\N	31	37	19
152	בלי אנ"ת	מעץ הדעת טוב ורע לא תאכל ממנו כי ביום אוכלך ממנו מות תמות.\nמדעת חזק וחלש אכול תאכל ממנה כי ביום אוכלך ממנה חיו תחיה.	\N	31	36	33
145	בלי אנ"ת	אנ"ת = אלוהים, נחשים, תנינים.\nעם אנ"ת מתים.   בלי אנ"ת חיים.	\N	31	36	1
128	בלי אנ"ת	לאורך כל ההיסטוריה ולרוחב כל הגאוגרפיה מתנגדים מקומיים לפלישת זרים לארצם ונלחמים בהם.\nלאורך כל ההיסטוריה ולרוחב כל הגאוגרפיה אם וכאשר לא מסוגלים המקומיים לסלק את הפולשים נחלקים הם למתונים ולקיצונים.\nהמתונים משלימים עם הפלישה כדבר שלא ניתן לשינוי ומפסיקים להלחם, ולעיתים אף מעניקים הם להפסקת הלחימה משמעות דתית/רוחנית.\nהקיצונים שבניהם ממשיכים להילחם. נמות או נכבוש את ההר אומרים הם ועושים.\nפולשים מנצחים, ככל שמענים הם את המקומיים כן מרבים ומעצימים הם את הקיצוניים שבמקומיים וממעיטים ומחלישים את המתונים שבמקומיים.\n\n	\N	31	36	30
153	31	שאול ויהונתן הנאהבים והנעימים, בחייהם ובמותם לאנפרדו, מנשרים קלו מאריות גברו	\N	31	38	9
154	עם אנ"ת	הבלות, סתמיות, ריקנות, הישרדות, חייתיות\nזהות, מהות, תרבות, יישות, משמעות	\N	31	36	34
149	9	9	\N	31	38	9
156	2, עם אנ"ת, נשמע	נביא איננו נביא שקר משום שהוא משאר האומות אלא משום שבנבואתו סותר הוא את נבואת משה, את תורת משה.	\N	31	37	20
158	4, עם אנ"ת, נשמע	הדברים המופשטים מודיעים לאדם את האלוהות.\nהדברים הממשיים מודיעים לאדם את העולם. שמיים והארץ וכל צבאם כולל האדם.\nאלה ואלה קונטינגנטיים.\nהדברים ההכרחיים היחידים הם המודיעים לאדם את הדרך לכונן מדינה שאיננה אוכלת יושביה.	\N	31	36	35
159	4, עם אנ"ת, נשמע	תיקון, ריפוי, התחדשות, התקדמות, המציאות, איך? ע"י הגות. ע"י עיסוק בשאלות הגדולות. שאלות התשתית.\nלימוד התורה, חידושי תורה, תחית התורה, יניקה מהאוצר היהודי הם שיצילונו, הם שייחיה אותנו. \nתשתית אידאולוגית רעיונית, רדיקליזם רעיוני, רנסנס רוחני, הם צורך קיומי.\nכשהבעיות קיומיות הגויות רועמות הכרחיות. משוגע איש הרוח?! משיח איש הרוח. 	\N	31	37	22
161	5, עם אנ"ת, נשמע	הבדלות=השרדות.   השתלבות=התבוללות.	\N	31	37	23
170	57	דעת/יראת/עבודת אלוהים זו תכלית/מטרת/מגמת/תעודת החיים.\nראוי שתהה לאדם תכלית חיים אחת בעלת אופי נכבד אשר ממנהגוזר הוא את כל שאר התכליות. והיא: דעת/יראת/עבודת אלוהים.\nאדם אשר המטרה השכלית הנכבדה האחת אשר ממנה גוזר הוא את כל מגמות פניו ופעולותיו בחייו, את כל ריגשי לבבו ושאיפותיו בחייו, היא דעת/יראת/עבודת אלוהים אינו למטה מהנביאים.\nמשיג/מממש הוא את העליונה/הנשגבת מכל האידאות: שלימות האנושי ורוממותו. אדם אשר מוצא בדימיונו תכליות/מטרות אחרות כוזבות מביא עצמו לאבדון.\nרוממות התכלית השיכלית/קבלת עול שמיים היא עמודו של עולם. בלעדיה מצוי האדם כל חייו על אוניה מטורפת השטה ללא שום מטרה ומביא הוא על עצמו השפלה והורדה מרום ערכו כנברא בצלם.\nבכל דרכיך דעהו והוא יישר אורחותיך. כל עיסוקיך, בגוף ובממון ובשעשוע, ובחוכמה ובאתיקה ובאסתטיקה, ואפילו בעבירות, וכל ערכיך, צדק וחסד ודין וסדר, ואוניברסליות ופרטיקולריות, ראוי שלא יהיו מפוזרים אלא מדובקים אלה לאלה. איך? ע"י דעת/יראת/עבודת אלוהים. כמובן ע"פ הבנת/פירוש/הוראת חכמינו האלוהיים.\n\n\n	\N	31	36	7
163	51	ויספו השוטרים לדבר אל העם ואמרו: מי האיש הירא ורך הלבב ילך וישוב לביתו ולא ימיס את לבב אחיו כלבבו. למרות פסיקת השופטים.	\N	31	38	1
165	52	לא תעשה לך פסל וכל תמונה=המפרסם מצוות שמקיים מבטל את ערכן.	\N	31	38	2
164	51	אמנה=כללי משחק	\N	31	36	1
166	53	אדוני המדינה, אדוני העם, אדוני הארץ.\nממעמד לעם, מעדה ללאום.	\N	31	36	3
168	55	החרדיות והדתיות והלאומיות הם מפלטם של המפחדים פחד קיומי מהתבוללות ומהתמעטות דמוגרפית וממלחמת אחים.\nחילונית משגשגת, ליברליות משגשגת, מדינה משגשגת הינם איום קיומי עבור חרדים ודתיים ולאומיים.	\N	31	36	5
169	56	כל בלי אנ"ת על רגל אחת:\nהנשגב: לא באמונה אלא באמנה.\nהמוסר: לא בדעת אלא באמנה.\nהקיום: לא באחדות אלא באמנה.\nהאמנה: בלי גייס חמישי. בלבד. כל השאר מותר.	\N	31	36	6
167	54	ימניים ושמאליים, כלכליים חברתיים, הם בסיס וחומצה.\nבסיס וחומצה בכלי אחד הופכים למלח ומים, כלומר חיסול הדדי.\nאיך יתקיימו ימניים ושמאליים במדינה אחת?\nע"י נשיאה משותפת בעול קיום המדינה בלא כל מגע בניהם. \nכלומר: בלי 'מדינת רווחה'. עם 'קהילות רווחה'. \nמזון, מעון, מלבוש, מורה רופא, תרבות, ספורט, צורכי דת וכד' יסופקו לאדם לא ע"י המדינה אלא ע"י הקהילה.\nהמדינה בלבד, ולא עיריות, גובה מיסים. שני סוגי מיסים: 'מיסי תשתיות וביטחון' ו 'מיסי רווחה'.\nמיסי הרווחה אשר נגבים מאדם מסויים מועברים ע"י המדינה לקהילתו ומשמשים למימון פעולותיה למען חבריה, בהתאם למהותה/מדיניותה. \nחלק מסויים ממיסי התשתית והביטחון מעבירה המדינה לעיריות. \nחובה על כל אדם להשתייך לקהילה מסויימת, וזכותו לעבור מקהילה זו לאחרת.\nלכל חבר קהילה יש זכות בחירה בהנהגת הקהילה וזכות להיבחר להנהגת הקהילה.\nהנהלת הקהילה קובעת, בין שאר הדברים, את תוכנית הלימודים בבתי הספר שבמימונה. \nלפי צרכיה ובתשלום דיפרנציאלי מגייסת המדינה אנשים לצורך עבודתה ושמירתה.\nמגרעות רבות של חסר ושל יתר נמצאות בנוסחה זו אך הקורא הישר לא יבטלה בשל כך אלא להיפך, יתגייס וישחד מכוחו לתקנה ולשפרה.	\N	31	36	4
171	51	והיתה נפשיך אדוני צרורה בצרור חייך את יהוה אלוהיך, ואת נפש אויביך קלעת בתוך כף הקלע. התוצאה:\nשפלות גוף ונפש בהכרח גוררת שפלות ההרגשות המוסריות.\nהעבד, אין לו מטרת חיים לעצמו, אין תכלית לחייו, על כן ישפלו כוחותיו המוסריים.\nשפלות הגוף והנפש בעדות משפלת את כל ההרגשות המוסריות.\nאוי לעבד ואוי לאדונו.	\N	31	37	1
172	52	"אבד תאבדון את כל המקומות אשר עבדו שם הגויים אשר אתם יורשים אותם את אלוהיהם על ההרים הרמים ועל הגבעות ותחת כל עץ רענן.\nוניתצתם את מזבחותם ושיברתם את מצבותם. ואשריהם תשרפו באש ופסילי אלוהיהם תגדעון. ואיבדתם את שמם מן המקום ההוא.\nיהודו דאע"ש. ומעיזים להתלונן על אמנות אש"פ והחמאס ועל ההטפות במסגדים ועל סיפרי הלימוד הפלסטיניים. ועל ה bds ועל האוניברסיטאות האמריקאיות.	\N	31	37	2
173	53	הקבלה, השבתאות, החסידות, הקונסרבטיביות הרפורמה, הינן מינות. עבודת אלוהי ישראל בדרכים אחרות. בלתי מקובלות., שלא בהתאם לעיקרי האמונה המקובלים.\nההשכלה, החילונות, הציונות, הינן עבודה זרה. עבודת אלוהים אחרים.	\N	31	38	3
174	100	poiuytrewq\nlkjhgfdsa\nmnbvcxz	\N	31	37	2
179	104	מדינה שגייס חמישי חזק בה איננה בת קיום. במוקדם או במאוחר הגייס החמישי אשר בה מהרסה ומחריבה.\nבמשך אלפי שנות היסטוריה אלוהים ותנינים מחזקים את הגייס החמישי במדינות בהן הם פועלים ונחשים מחלישים את כוח המדינות להתמודד נגדו.\nרק שוטים ממשיכים ממשיכים שוב ושוב לאפשר פעילות אנ"ת במדינתם ומצפים שתוכל היא להתמודד עם הגייס החמישי אשר בה ולמנוע ממנו להרסה ולהחריבה.	\N	31	48	4
176	 101	בלי אלוהים, בלי נחשים, בלי תנינים =\nבלי תאולוגיה, בלי פילוסופיה, בלי דברים אחדים =\nבלי רוחניות, בלי מחקרים, בלי שפה אחת =\nבלי מוות. עם חיים.	\N	31	48	1
181	106	נאורות איננה ההיפך מאמונה, איננה ההיפך מבורות, איננה ההיפך מפרטיקולריות.\nנאורות איננה כפירה, איננה השכלה, איננה אוניברסליות.\nנאורות בגבולות עוצמת הגייס החמישי בלבד.\nהגייס החמישי חזק אין נאורות. הגייס החמישי חלש יש נאורות.\nבמדינה עם אנ"ת הגייס החמישי חזק. במדינה בלי אנ"ת הגייס החמישי חלש.	\N	31	48	6
180	105	קיצור תולדות האנושות בזמננו כהחברה הפתוחה ואויביה בשעתו. שניהם נחשבים לספרים מכוננים. ובכן:\nמרחק מצב האנושות ממצב תקין = מרחק היות החברה הפתוחה ואויביה מהיות ספר נכון = מרחק היות קיצור תולדות האנושות מהיות ספר הכרחי.\nהחברה הפתוחה ואוייביה הוא ספר שגוי. קיצור תולדות האנושות הוא ספר קונטינגנטי.	\N	31	48	5
178	103	ובני ישראל במצרים פרו וישרצו וירבו ויעצמו במאוד מאוד ותמלא מצרים אותם.\nויקום מלך מצרים ויאמר אל עמו: הנה עם בני ישראל רב ועצום ממנו, והיה כי תקראנה מלחמה ונוסף גם הוא על שונאינו ונלחם בנו ועלה מן הארץ.\nפתרון עם אנ"ת לבעיה קיומית זו מהו?\nהבה נמרר את חייו בעבודת פרך קשה בחומר ובלבנים ובשדה ונשים עליו שרי מיסים למען ענותו בסבלתיו ואת בניהם נמית ואת בנותיהם נחיה.\nפתרון בלי אנ"ת לבעיה קיומית זו מהו?\nהבה נתכמה לו פן ירבה.\nוהיה כי יענו אותו כן ירבה וכן יחזק. והיה כי יתחכמו לו כן ימעט וכן יחלש.\n	\N	31	48	3
177	102	שלוש אמירות, התייחסויות אליהן מכוננות דעת:                                                \n1.בראשית ברא אלוהים את השמים ואת הארץ. [אונתולוגיה)\n2.מעץ   הדעת   טוב   ורע   לא   תאכל   ממנו. (אפיסטימולוגיה)\n3.ויהי  כל  הארץ  שפה  אחת  ודברים  אחדים. (היסטוריה)\nאמירה אחת, התייחסות אליה מכוננת חיים ומוות:\nהיה כי תקראנה מלחמה יתווסף העם האחר אשר בקירבנו על  שונאינו וילחם בנו. (גייס חמישי)\nכל שאר האמירות וכל ההתייחסויות אליהן קונטינגנטיות.\nמההתיחסיות אשר בדעת התייחסות אל החיים והמוות לא תאכלו מהן.\nכי ביום אוכלכם זו מאלה מין בשאינו מינו מערבבים אתם ובני עמכם ובני עמים אחרים מות ממיתים אתם.\nבניקיון כפיכם לא יכולים אתם לרחוץ וידינו לא שפכו את הדמים האלה לא יכולים אתם לומר.        	\N	31	48	2
\.


--
-- Data for Name: Rating; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Rating" (id, "userId", "postId", "commentId", rating) FROM stdin;
1	14	\N	\N	3
2	15	\N	\N	5
5	18	\N	\N	4
6	18	\N	\N	3
4	18	\N	\N	\N
3	31	\N	\N	\N
7	15	\N	\N	3
12	93	\N	\N	3
8	15	\N	\N	3
11	31	\N	\N	4
9	15	\N	\N	4
10	15	\N	\N	5
13	18	\N	\N	4
14	31	\N	\N	3
\.


--
-- Data for Name: Settings; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."Settings" (id, key, value) FROM stdin;
1	posts_per_page	50
2	comments_cost_usd	10
3	comments_amount_per_purchase	3
55	registration_cost_usd	30
56	site_name	Sineism
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."User" (id, name, email, password, role, "isSubscribed") FROM stdin;
14	יואב קלוגר	yoavkluger@gmail.com	$2a$10$zE5nD8FDJdY.y7z29WB5oOput0VTN1mCSv9KFNjVt0P6PhfJHClYC	ADMIN	f
31	ירון קלוגר	yaron.kluger10@gmail.com	$2a$10$yQ..6DKBKdIyrz.iNvlAs.nC1IsGmG45k28vuaZBbK7TEEcc1Minm	ADMIN	t
57	testt	test@test.com	$2a$10$QKYGbFz1T7j/tSDt6DOfF.OpBGhRwNfMM0nu.5nmbWknS2Ygz5Wa2	USER	f
93	ענת	anatkluger@walla.co.il	$2a$10$iPl0SDoOAwIFJjArU5TeY.36BuGjSz7uNNT0sik0FYXj/phP4Q2yi	USER	t
95	יוסף	anatkluger@walla.com	$2a$10$3oPlb3kl1rSPDNqiTcRAsuzsNyxdNnMtesGUoBRJ9toCni59Rcdtm	USER	t
18	Neriya Rosner	neri.coder@gmail.com	$2a$10$Uc0JavMgsLHben7SdfKOQ.MCalzT1qavE.KHnMgm.a986VMiVOjee	ADMIN	t
98	ניתאי	nitaikluger@gmail.com	$2a$10$aAKfldkgBZGjUPmw/dr.M.sHH0cTryxVL/URvqlPSgpfHsCMe/G9a	USER	t
99	test tetst	test@gmail.com	$2a$10$jZ8fNBGzwLrrQ77vaPWL0OfmhevipgExnnBYHNAH6iku04Df7acli	USER	f
100	ניתאי קלוגר	nitai.kluger@gmail.com	$2a$10$2lVDPKUm3kI/Yj5qPFt1jOV2fTp4eeim/7AJyxn1GN9iVvwO8Kzy6	USER	f
101	גידי קלוגר	gidikluger@gmail.com	$2a$10$flVktkr961f8tSOhTxv6Nu.cRYuTq124./gkEEtuIfFFU5fsmXu2G	USER	f
15	יואב קלוגר - קורא	yoav.kluger@gmail.com	$2a$10$fhsfpteZiXDSWmEE5GYTmee6tl1KQKDSbkWzL9AG/7s0yW630u.ke	USER	t
\.


--
-- Data for Name: UserCommentQuota; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public."UserCommentQuota" (id, "userId", quota) FROM stdin;
7	14	2
1	18	9
3	31	9
2	15	5
\.


--
-- Name: Bookmark_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Bookmark_id_seq"', 22, true);


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Category_id_seq"', 50, true);


--
-- Name: Comment_commentNumber_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Comment_commentNumber_seq"', 27, true);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 27, true);


--
-- Name: Orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Orders_id_seq"', 8, true);


--
-- Name: Post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Post_id_seq"', 182, true);


--
-- Name: Post_postNumber_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Post_postNumber_seq"', 1, false);


--
-- Name: Rating_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Rating_id_seq"', 14, true);


--
-- Name: Settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."Settings_id_seq"', 99, true);


--
-- Name: UserCommentQuota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."UserCommentQuota_id_seq"', 28, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public."User_id_seq"', 106, true);


--
-- Name: Bookmark Bookmark_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Bookmark"
    ADD CONSTRAINT "Bookmark_pkey" PRIMARY KEY (id);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Orders Orders_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_pkey" PRIMARY KEY (id);


--
-- Name: Post Post_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_pkey" PRIMARY KEY (id);


--
-- Name: Rating Rating_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_pkey" PRIMARY KEY (id);


--
-- Name: Settings Settings_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Settings"
    ADD CONSTRAINT "Settings_pkey" PRIMARY KEY (id);


--
-- Name: UserCommentQuota UserCommentQuota_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."UserCommentQuota"
    ADD CONSTRAINT "UserCommentQuota_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: Bookmark_userId_referenceType_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "Bookmark_userId_referenceType_key" ON public."Bookmark" USING btree ("userId", "referenceType");


--
-- Name: Settings_key_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "Settings_key_key" ON public."Settings" USING btree (key);


--
-- Name: UserCommentQuota_userId_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "UserCommentQuota_userId_key" ON public."UserCommentQuota" USING btree ("userId");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: default
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Bookmark Bookmark_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Bookmark"
    ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Orders Orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Orders"
    ADD CONSTRAINT "Orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_authorId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Post Post_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Post"
    ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."Category"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Rating Rating_commentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES public."Comment"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Rating Rating_postId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_postId_fkey" FOREIGN KEY ("postId") REFERENCES public."Post"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Rating Rating_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserCommentQuota UserCommentQuota_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public."UserCommentQuota"
    ADD CONSTRAINT "UserCommentQuota_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: default
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO neon_superuser WITH GRANT OPTION;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES  TO neon_superuser WITH GRANT OPTION;


--
-- PostgreSQL database dump complete
--

