-- ==============================================================================
-- Migration & Seed: Courses Table Segmented Schema & 124 Master Courses
-- ==============================================================================

-- 1. Ensure segmented columns exist on courses table
ALTER TABLE courses ADD COLUMN IF NOT EXISTS short_description text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS jamb_subjects text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS waec_requirements text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS utme_cutoff text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS duration text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS deep_dive text;
ALTER TABLE courses ADD COLUMN IF NOT EXISTS offered_at_list text[];
ALTER TABLE courses ADD COLUMN IF NOT EXISTS last_verified_cycle text;

-- 2. Insert or Upsert all 124 courses
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'd5e476f8-4130-5053-807d-c0e6bf06bd5f', 'Archaeology', 'arts', 'Faculty of Arts', 'The study of human history and prehistory through the excavation of sites and the analysis of artifacts.', 'English, History/Government, and any other two Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, History/Government and three other Arts or Social Science subjects', '180', '4 years', 'Students explore archaeological field methods, cultural heritage management, and material analysis of past civilizations. The curriculum combines extensive fieldwork, laboratory dating techniques, and archival research. Graduates pursue careers as museum curators, heritage managers, cultural preservationists, and academic researchers.',
  'full-profile', ARRAY['UI', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '17b1cce3-84b8-5890-9813-42312cd36295', 'Arabic Studies', 'arts', 'Faculty of Arts', 'Comprehensive study of Arabic language, literature, grammar, and Islamic cultural history.', 'English, Arabic, and two other Arts subjects',
  '5 SSCE credit passes including English Language, Arabic and three other Arts subjects', '180', '4 years', 'The programme delves deeply into classical and modern standard Arabic syntax, morphology, literary criticism, and comparative Middle Eastern cultures. Undergraduates gain high linguistic fluency alongside analytical competencies in historical manuscripts. Career opportunities span translation, international diplomacy, foreign intelligence, publishing, and education.',
  'full-profile', ARRAY['UNILORIN', 'ABU', 'BUK', 'LASU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'aec7e2e2-03d4-5927-b2e9-043fdbdea073', 'Christian Religious Studies', 'arts', 'Faculty of Arts', 'Academic study of Christian theology, biblical texts, church history, and moral philosophy.', 'English, Christian Religious Studies, and two other Arts or Social Science subjects',
  '5 SSCE credit passes in English Language, CRK/CRS and three other Arts or Social Science subjects', '180', '4 years', 'Students investigate biblical exegesis, Old and New Testament hermeneutics, ethics, and contemporary religious dialogue. The academic focus develops critical thinking, pastoral counselling knowledge, and moral evaluation. Graduates work as educators, policy advisers, community development liaisons, and theological consultants.',
  'full-profile', ARRAY['UI', 'UNN', 'OAU', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a42d1aa7-0ae2-5e18-82b6-daef36e3b9f4', 'Classical Studies', 'arts', 'Faculty of Arts', 'Study of the languages, literature, history, and philosophy of ancient Greek and Roman civilizations.', 'English, Literature in English, and any two Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Literature in English and three other Arts or Social Science subjects', '180', '4 years', 'The degree explores Greco-Roman literary traditions, classical mythology, rhetoric, and philosophical foundations of modern political thought. Learners cultivate rigorous textual analysis and persuasive discourse. Career paths include diplomatic foreign service, journalism, legal consultancy, publishing, and cultural research.',
  'full-profile', ARRAY['UI']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '67c66f8a-a8bf-5e80-bac3-edf08594c667', 'Theatre Arts / Performing Arts', 'arts', 'Faculty of Arts', 'Theoretical and practical training in stagecraft, dramatic literature, acting, directing, and media arts.', 'English, Literature in English, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Literature in English and three other Arts subjects', '180', '4 years', 'Courses encompass playwriting, stage design, film production, dramaturgy, and dance choreography. Practical studio productions and festival showcases prepare students for the creative entertainment industry. Career prospects include film directing, scriptwriting, media presentation, theatre management, and broadcast arts.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '9ae5752f-a525-5d6b-953f-df9c4f00f351', 'English Language and Literature', 'arts', 'Faculty of Arts', 'Rigorous study of', 'English linguistics, phonetics, semantics, and global literary traditions. English, Literature in English, and two other Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Literature in English and three other Arts subjects', '180', '4 years', 'Students analyze grammatical theory, phonology, discourse analysis, African literature, and post-colonial studies. The curriculum hones sophisticated writing, editing, and critical rhetoric skills. Graduates thrive as corporate communications managers, editors, media broadcast journalists, and educators.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '22920bd6-06c6-5904-86a5-a49fb6f7aae5', 'History and International Studies', 'arts', 'Faculty of Arts', 'Examination of political, social, and economic world history alongside contemporary foreign affairs.', 'English, History/Government, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, History/Government and three other Arts or Social Science subjects', '180', '4 years', 'The programme balances world historical developments, Nigerian history, international treaties, and geopolitical strategy. Students develop strategic problem-solving and diplomatic negotiation skills. Alumni enter diplomatic services, intelligence agencies, international NGOs, policy think tanks, and public relations.',
  'full-profile', ARRAY['UNILAG', 'UI', 'AAUA', 'UNUYO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '50118585-5b07-5fdf-be7e-b12aa1d4d998', 'Islamic Studies', 'arts', 'Faculty of Arts', 'Academic analysis of Islamic theology, Sharia jurisprudence, Quranic sciences, and Islamic civilization.', 'English, Islamic Studies, and two other Arts subjects',
  '5 SSCE credit passes including English Language, Islamic Studies and three other Arts subjects', '180', '4 years', 'Focus areas encompass Hadith methodologies, Islamic commercial law, family jurisprudence, and Islamic history. The degree equips graduates with profound cultural competence and ethical advisory skills. Professional opportunities include legal advisory roles, academic research, diplomatic liaison, and community leadership.',
  'full-profile', ARRAY['UNILORIN', 'ABU', 'BUK', 'LASU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '37219a41-73e1-58c4-8a5f-fd3c36fc1074', 'Philosophy', 'arts', 'Faculty of Arts', 'Critical investigation into logic, epistemology, ethics, metaphysics, and political philosophy.', 'English, Government/History, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics and three other Arts or Social Science subjects', '180', '4 years', 'Students engage with formal deductive logic, moral dilemmas, socio-political ideologies, and African philosophical thought. The course instills exceptional problem formulation and argumentation abilities. Graduates frequently transition into law, policy analysis, strategic consulting, civil service, and publishing.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '7efd2cd6-5db8-5c32-9418-4bdc7cb850d8', 'Music', 'arts', 'Faculty of Arts', 'Theoretical study and practical mastery of musical composition, performance, ethnomusicology, and production.', 'English, Music, and two other Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Music and three other Arts or Social Science subjects', '180', '4 years', 'The syllabus covers music theory, orchestration, indigenous African music traditions, digital sound recording, and instrument performance. Students participate in ensemble performances and studio production sessions. Career destinations include sound engineering, music production, concert performance, film scoring, and arts management.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'UNN', 'UNIZIK']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'efef8dfd-06d8-52ad-a45c-fa6227ff28f6', 'Fine and Applied Arts', 'arts', 'Faculty of Arts', 'Visual arts training in painting, sculpture, ceramics, graphic design, textile art, and art history.', 'English, Fine Art, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Fine Art and three other Arts or Social Science subjects', '180', '4 years', 'Studies integrate studio practice in drawing, mixed-media sculpture, commercial printmaking, visual communication, and ceramics. Learners master aesthetic conceptualization and exhibition curation. Career opportunities span professional studio artistry, brand identity design, gallery management, and digital illustration.',
  'full-profile', ARRAY['UNN', 'OAU', 'ABU', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'fcd17b79-5800-5b9a-9af1-b64a08522691', 'Linguistics', 'arts', 'Faculty of Arts', 'Scientific study of language structure, acoustic phonetics, syntactic theory, and sociolinguistics.', 'English, two Arts subjects and one other subject',
  '5 SSCE credit passes to include English Language, Mathematics and three Arts subjects', '180', '4 years', 'Coursework covers morphosyntax, computational linguistics, language documentation of indigenous African tongues, and dialectology. Undergraduates gain technical skills in audio acoustic analysis and natural language data processing. Career pathways include natural language processing, speech therapy, lexicography, and localization.',
  'full-profile', ARRAY['UNILAG', 'UI', 'UNN', 'UNILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'f2c64bf0-16a7-5436-bfc0-c7c638c47d6d', 'Mass Communication', 'arts', 'Faculty of Arts', 'Professional instruction in journalism, digital media production, broadcasting, and strategic communications.', 'English, Literature in English, and two Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Mathematics, Literature in English and two other subjects', '200', '4 years', 'Students study investigative journalism, broadcast television/radio news scripting, public relations campaigns, and multimedia storytelling. Hands-on campus radio and television broadcasts furnish real-world newsroom experience. Graduates thrive as corporate communications directors, journalists, PR specialists, and digital content creators.',
  'full-profile', ARRAY['UNILAG', 'UNN', 'UNILORIN', 'COVENANT']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '6b3e0bb7-23b5-5f03-b1b4-e345763c1f26', 'Accountancy / Accounting', 'commercial', 'Faculty of Administration', 'Comprehensive training in financial reporting, corporate auditing, taxation, and management accounting.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two other Commercial subjects', '200', '4 years', 'The curriculum covers IFRS compliance, cost analysis, financial statement auditing, forensic accounting, and corporate tax management. Students obtain exemptions toward ICAN and ACCA professional certifications alongside industry internships. Career paths include external auditing, forensic accounting, tax consultancy, and chief financial officer roles.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'ABU', 'UNILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'ce4374e7-687b-5061-aee6-d945bdef0c09', 'Actuarial Science', 'commercial', 'Faculty of Administration', 'Mathematical and statistical modeling to quantify financial risk in insurance, pensions, and investments.', 'English, Mathematics, Economics, and one other Science/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '200', '4 years', 'Students master life contingencies, stochastic modeling, pension mathematics, risk valuation, and quantitative investment analytics. The rigorous program aligns with international professional actuarial exam tracks. Graduates become actuarial analysts, enterprise risk specialists, and pension fund managers.',
  'full-profile', ARRAY['UNILAG', 'ABU', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'ba110266-ef94-557b-af43-1ff2a3a1f6ae', 'Banking and Finance', 'commercial', 'Faculty of Administration', 'Study of monetary systems, financial markets, commercial lending, and corporate financial strategy.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two other subjects', '200', '4 years', 'Modules address credit risk analysis, treasury management, capital markets, investment banking, and fintech operations. Practical case studies and financial simulations prepare students for the global financial ecosystem. Alumni excel as credit risk analysts, investment bankers, portfolio managers, and commercial banking executives.',
  'full-profile', ARRAY['UNILAG', 'UNN', 'UNILORIN', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'e743b32c-2a78-5e7f-bd8a-fccc5dc18d0e', 'Business Administration / Management', 'commercial', 'Faculty of Administration', 'Principles of organizational leadership, strategic management, corporate governance, and operations.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other relevant subjects', '200', '4 years', 'The programme covers strategic formulation, supply chain operations, organizational behaviour, business ethics, and corporate negotiations. Students solve real-world corporate case studies and run business incubation projects. Career opportunities include management consulting, corporate strategy, operations direction, and general enterprise administration.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'ABU', 'UNILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'b5a50530-2ce5-5187-8747-4cc39ed5bcfe', 'Business Economics', 'commercial', 'Faculty of Administration', 'Application of economic theory and quantitative tools to corporate strategic decision-making.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two other subjects', '200', '4 years', 'Students explore microeconomic pricing strategies, managerial economics, macroeconomic forecasting, and econometric market modelling. The curriculum merges economic theory with actionable corporate finance analytics. Graduates pursue careers as business analysts, economic consultants, market research strategists, and policy researchers.',
  'full-profile', ARRAY['UNILAG', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '94597cdb-5fc4-5bbf-9c04-dfbd79316c19', 'Entrepreneurship', 'commercial', 'Faculty of Administration', 'Training in new venture creation, business innovation, venture capital, and SME growth strategies.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'Key themes include business prototyping, venture financing, intellectual property management, and commercial scaling. Students build live venture plans and pitch directly to incubation hubs and angel investors. Graduates work as startup founders, venture development officers, innovation leads, and business incubators.',
  'full-profile', ARRAY['UNILORIN', 'KWASU', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '1e0e1948-f052-50af-9908-ec4f415b173f', 'Marketing', 'commercial', 'Faculty of Administration', 'Study of consumer behaviour, brand strategy, digital marketing analytics, and channel distribution.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two other relevant subjects', '180', '4 years', 'The syllabus explores consumer psychology, omnichannel campaigns, digital analytics, SEO strategies, and pricing architectures. Students design comprehensive go-to-market strategies for consumer and enterprise goods. Career paths include brand management, digital performance marketing, growth hacking, and sales directorship.',
  'full-profile', ARRAY['UNILAG', 'UNN', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '7e241cec-b71f-56f6-909d-7b2cd3878624', 'Public Administration', 'commercial', 'Faculty of Administration', 'Study of governmental policy formulation, civil service management, and public sector governance.', 'English, Government, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes to include English Language, Mathematics, Government, Economics and one other subject', '180', '4 years', 'Modules examine administrative law, public budgeting, public policy evaluation, and governmental ethics. Students gain deep understanding of institutional machinery and public welfare delivery systems. Graduates establish careers as civil administrators, policy analysts, municipal officers, and public sector consultants.',
  'full-profile', ARRAY['OAU', 'ABU', 'UNN', 'ABUJA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'dc224891-2543-54b5-b9c0-c542df736409', 'Insurance', 'commercial', 'Faculty of Administration', 'Principles of risk underwriting, claims processing, reinsurance, and property-casualty contracts.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'Students study life assurance, non-life insurance underwriting, insurance regulation, liability law, and reinsurance protocols. The programme offers direct pathways to professional certification with CIIN. Career paths encompass underwriting management, insurance brokerage, claims adjudication, and risk assessment.',
  'full-profile', ARRAY['UNILAG', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '59e7b90d-0131-555e-98bc-f115c157bf9a', 'International Relations', 'commercial', 'Faculty of Administration', 'Analysis of global politics, diplomacy, international law, conflict resolution, and foreign relations.', 'English, Government, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics, Government and two other subjects', '200', '4 years', 'Coursework covers international security, foreign policy analysis, global political economy, and diplomatic protocol. Simulated Model United Nations and international case negotiations build advanced bilateral dialogue capabilities. Graduates become foreign service diplomats, geopolitical risk analysts, peace negotiators, and NGO officers.',
  'full-profile', ARRAY['OAU', 'COVENANT', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'e0bbb167-f79a-5234-b576-0e95220f2647', 'Industrial Relations and Personnel Management', 'commercial', 'Faculty of Administration', 'Study of employment relationships, human resource planning, labour law, and collective bargaining.', 'English, Mathematics, Economics, and one other Commercial/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'The programme covers talent acquisition, compensation frameworks, labour dispute mediation, and organizational change. Students learn to negotiate collective bargaining agreements while aligning HR practices with CIPM standards. Career options include human resource managers, labour relations specialists, talent partners, and mediators.',
  'full-profile', ARRAY['UNILAG', 'OOU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '1e4018e5-5ffa-5692-8dd0-78beeface049', 'Public Relations and Advertising', 'commercial', 'Faculty of Administration', 'Strategic brand communications, creative advertising campaigns, media relations, and reputation management.', 'English, Literature in English, and two Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics, Literature in English and two other subjects', '180', '4 years', 'Instruction addresses copy-writing, media buying, crisis public relations, corporate imaging, and brand endorsements. Students create pitch decks, visual commercials, and stakeholder sentiment strategies. Graduates work as advertising account planners, public relations consultants, media liaisons, and copywriters.',
  'full-profile', ARRAY['COVENANT', 'UNILAG']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'f9345f00-0661-5669-838a-a8a4ded3789e', 'Secretarial Administration', 'commercial', 'Faculty of Administration', 'Executive office systems management, corporate records administration, and high- level communications.', 'English, Economics, and two other Commercial or Arts subjects',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'The curriculum develops competencies in executive office administration, digital document archiving, business communication, and meeting governance. Practical workshops emphasize boardroom transcription, confidential records management, and executive support systems. Graduates serve as executive assistants, corporate administrative managers, and office registrars.',
  'full-profile', ARRAY['OOU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a7105b94-c83b-5c85-96f0-b13d95c74985', 'Transport and Tourism', 'commercial', 'Faculty of Administration', 'Management of logistics networks, passenger mobility systems, hospitality operations, and destination tourism.', 'English, Mathematics, Geography/Economics, and one other subject',
  '5 SSCE credit passes including English Language, Mathematics, Geography/Economics and two other subjects', '180', '4 years', 'Students examine multimodal transport logistics, fleet scheduling, airline ticketing, ecotourism planning, and hospitality management. The course incorporates site inspections of major international transit terminals and tourism resorts. Graduates secure roles as logistics coordinators, airport operations officers, tourism directors, and travel consultants.',
  'full-profile', ARRAY['NAUB', 'OOU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'af30949f-b191-51aa-8d2a-587daa01431c', 'Agricultural Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Engineering solutions for mechanized farming, soil and water conservation, and agro- processing systems.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes in English Language, Mathematics, Physics, Chemistry and any Science subject', '200', '5 years', 'Studies integrate farm power and machinery design, irrigation systems, soil mechanics, and post-harvest storage engineering. A mandatory six-month industrial attachment (SIWES) exposes students to agro-industrial machinery fabrications. Graduates practice as agricultural machinery designers, irrigation engineers, farm mechanization directors, and processing consultants.',
  'full-profile', ARRAY['FUTA', 'FUNAAB', 'ABU', 'OAU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a3e5596e-594b-5988-a6a9-a9ada683eff5', 'Biomedical Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Integration of engineering design and biological sciences for advanced medical equipment and diagnostics.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology', '200', '5 years', 'The programme covers bioinstrumentation, medical imaging technologies, biomaterials, prosthetic design, and physiological modelling. Extensive clinical hospital internships (SIWES) ground students in the maintenance and design of therapeutic equipment. Graduates work as clinical engineers, medical technology developers, hospital equipment specialists, and biometric researchers.',
  'full-profile', ARRAY['UNILAG', 'FUTO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '548b82c3-2689-5b62-8515-3acd7999cac8', 'Building Technology / Building', 'technical', 'Faculty of Engineering / Environmental / Technology', 'Technical management of building construction processes, structural materials, and construction site safety.', 'English, Mathematics, Physics, and Chemistry or Technical Drawing',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and one other Science/Technical subject', '180', '5 years', 'Core modules cover building construction techniques, materials testing, structural analysis, project site supervision, and building maintenance. Students gain practical experience through industrial site attachments (SIWES) and building prototypes. Career opportunities include building production managers, site engineers, facilities managers, and construction project coordinators.',
  'full-profile', ARRAY['UNILAG', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '0d44600b-e54b-5091-b8b2-dfe8a0425a34', 'Chemical Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Design, operation, and optimization of industrial chemical processes, thermodynamics, and mass transfer.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and any other Science subject', '200', '5 years', 'The curriculum centers on transport phenomena, reaction kinetics, chemical plant design, unit operations, and process safety. Rigorous laboratory work and a 6-month SIWES industrial internship prepare students for petrochemical plants and chemical refineries. Graduates excel as process design engineers, refinery operations engineers, plant managers, and biochemical engineers.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'ABU', 'FUTO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '9469d038-6e1e-56d0-9958-710037180246', 'Civil Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Planning, structural design, and construction of public infrastructure including bridges, dams, and highways.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'Core subjects encompass structural mechanics, geotechnical engineering, hydraulics, transportation planning, and reinforced concrete design. Practical survey camps and industrial attachments (SIWES) prepare engineers for massive infrastructural projects. Graduates practice as structural engineers, highway designers, geotechnical consultants, and construction directors.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'fef519a1-6bd2-5242-90f7-239130a47ed0', 'Computer Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Hardware-software integration, microprocessor design, embedded systems, and computer network architecture.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'The syllabus features microarchitecture, digital logic design, embedded firmware programming, IoT development, and network hardware engineering. Practical hardware labs and SIWES internships give students hands-on device fabrication experience. Graduates establish careers as embedded systems engineers, hardware designers, network infrastructure engineers, and robotics specialists.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'ABU', 'FUTO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '2d68dbc9-35d4-5b1b-a828-b8c649277030', 'Electrical/Electronics Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Power generation, transmission systems, electronics design, control systems, and telecommunications.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and any Science subject', '200', '5 years', 'Coursework spans power systems analysis, electromagnetic theory, analog/digital circuits, control engineering, and telecommunications networks. Intensive electrical lab exercises and mandatory industrial training (SIWES) develop technical mastery. Alumni work as power grid engineers, telecommunications engineers, instrumentation leads, and automation designers.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '0f7bae74-cf26-5237-bef8-571a463f386b', 'Mechanical Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Study of thermodynamics, fluid mechanics, machine design, kinematics, and manufacturing processes.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and any other Science subject', '200', '5 years', 'The programme teaches machine component design, heat transfer, aerodynamics, CAD/CAM manufacturing, and robotics. Students undertake heavy mechanical workshop fabrication and complete six-month industrial placements (SIWES). Graduates work as automotive engineers, plant maintenance engineers, HVAC specialists, and design engineers.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '5ef302af-dacd-5bfd-b15b-43adb454b342', 'Petroleum Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Exploration, drilling engineering, reservoir modeling, and production of oil and gas resources.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and any Science subject', '200', '5 years', 'Subjects cover reservoir characterization, drilling hydraulics, well logging, production engineering, and offshore facility design. Rigorous simulation modules and oilfield attachments (SIWES) provide frontline exploration competencies. Graduates become reservoir engineers, drilling operations leads, production specialists, and subsea consultants.',
  'full-profile', ARRAY['UI', 'UNIPORT', 'FUTO', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '1a73c574-0c10-5506-b5dc-99036e2faa32', 'Architecture', 'technical', 'Faculty of Engineering / Environmental / Technology', 'Architectural design, sustainable building technology, spatial planning, and structural aesthetics.', 'English, Mathematics, Physics, and one other from Technical Drawing/Fine Arts/Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics and any two of Fine Art, Chemistry, Technical Drawing, Geography', '200', '5 years', 'Students undertake intense studio design juries, CAD 3D BIM rendering, structural mechanics, and historical architecture analysis. Professional apprenticeships and architectural design critiques foster creative spatial solutions. Graduates qualify for professional ARCON registration and work as architectural designers, urban consultants, and interior architects.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'cf23c7df-a8e0-5fc1-beac-bbbb06b92f8a', 'Estate Management', 'technical', 'Faculty of Engineering / Environmental / Technology', 'Real estate appraisal, property development, land economics, and commercial facility management.', 'English, Mathematics, Economics, and one Science/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '180', '5 years', 'Topics include property valuation methodology, land tenure laws, real estate finance, facility maintenance, and feasibility appraisals. Field property inspections and professional agency attachments ensure practical market exposure. Alumni practice as estate surveyors, certified property valuers, asset managers, and property portfolio analysts.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '4223cd27-2bf7-56b6-b709-89b51a002415', 'Quantity Surveying', 'technical', 'Faculty of Engineering / Environmental / Technology', 'Construction cost estimation, procurement management, bill of quantities preparation, and contract auditing.', 'English, Mathematics, Physics, and one of Chemistry, Economics, Technical Drawing',
  '5 SSCE credit passes to include English Language, Mathematics, Physics and two other Science or Commercial subjects', '180', '5 years', 'Curriculum highlights building measurement, bill of quantities (BOQ) preparation, contract administration, and construction economics. Practical industrial placements (SIWES) and site measurements prepare students for commercial construction governance. Career tracks include quantity surveyors, construction cost consultants, procurement managers, and dispute arbitrators.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'aec7e904-6c7e-5f8c-9ecb-2ef130a06e64', 'Urban and Regional Planning', 'technical', 'Faculty of Engineering / Environmental / Technology', 'Master planning, land use management, municipal transportation design, and urban environmental sustainability.', 'English, Mathematics, Geography, and one other Science/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Geography and two other subjects', '180', '5 years', 'Students study urban renewal, GIS spatial analysis, zoning regulations, transit networks, and environmental impact assessments. Field planning studios and municipal planning agency attachments provide hands-on city design experience. Graduates work as town planners, GIS mapping analysts, urban development consultants, and zoning compliance directors.',
  'full-profile', ARRAY['UNILAG', 'OAU', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'ea581f9f-25d3-5d42-8d01-f14f6e36a166', 'Surveying and Geoinformatics', 'technical', 'Faculty of Engineering / Environmental / Technology', 'Geodetic measurements, digital cartography, satellite geodesy, and Geographic Information Systems (GIS).', 'English, Mathematics, Physics, and one other from Chemistry, Geography, Technical Drawing',
  '5 SSCE credit passes including English Language, Mathematics, Physics and two other Science subjects', '180', '5 years', 'The curriculum teaches geodetic surveying, remote sensing, satellite positioning (GPS), hydrographic charting, and spatial photogrammetry. Comprehensive field camp surveys and mandatory industrial training (SIWES) develop precise boundary and spatial measurement techniques. Graduates work as licensed land surveyors, GIS specialists, hydrographers, and geospatial analysts.',
  'full-profile', ARRAY['UNILAG', 'ABU', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '77e7898d-44be-57fd-a9f8-f1984bf723f9', 'Computer Science', 'science', 'Faculty of Engineering / Environmental / Technology', 'Computational theory, algorithms, software engineering, database management, and artificial intelligence.', 'English, Mathematics, Physics, and one of Chemistry, Biology, Economics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics and two other Science subjects', '200', '4 years', 'Students master algorithm design, object-oriented programming, cloud computing, operating systems, and distributed database architectures. Practical coding assignments and industry internships provide comprehensive software product development skills. Alumni excel as software engineers, cloud architects, machine learning engineers, and database administrators.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '872d020d-5380-5952-928f-0842d3a9243e', 'Food Science and Technology', 'science', 'Faculty of Engineering / Environmental / Technology', 'Food chemistry, industrial preservation, packaging engineering, food microbiology, and quality assurance.', 'English, Chemistry, Mathematics/Physics, and Biology/Agricultural Science',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Physics and Biology', '180', '5 years', 'The curriculum focuses on food processing engineering, shelf- life stabilization, sensory evaluation, and microbiological quality control. Extensive food plant pilot laboratory sessions and SIWES industrial placements train students in commercial processing lines. Graduates become food safety auditors, product formulation specialists, quality assurance directors, and plant managers.',
  'full-profile', ARRAY['UI', 'FUTA', 'FUTO', 'FUNAAB']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '4f7101ac-99a5-506c-b69c-68b928df79e6', 'Educational Administration and Planning', 'commercial', 'Faculty of Education', 'Institutional leadership, educational policy formulation, academic economics, and school plant management.', 'English, Economics, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'Instruction highlights education law, resource allocation, school facility planning, personnel supervision, and curriculum administration. Students complete compulsory teaching practice and educational institutional internships. Graduates pursue careers as school administrators, ministry education planners, academic quality inspectors, and education policy consultants.',
  'full-profile', ARRAY['UNILAG', 'UI', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a12eb869-d714-5976-9e64-9098776921a2', 'Adult Education', 'arts', 'Faculty of Education', 'Lifelong learning paradigms, community literacy programmes, continuing education, and workforce development.', 'English and any three Arts or Social Science subjects',
  '5 SSCE credit passes including English Language and four other Arts or Social Science subjects', '180', '4 years', 'The program covers community development strategies, adult learning psychology, non-formal vocational training, and social literacy initiatives. Field practical projects involve establishing adult literacy programs and grassroots empowerment hubs. Graduates work as adult literacy coordinators, community development directors, NGO training officers, and human resource development managers.',
  'full-profile', ARRAY['UI', 'UNN', 'UNILAG']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '93d99ed1-976d-5e64-9034-8338d5f12e2f', 'Guidance and Counselling', 'arts', 'Faculty of Education', 'Psychological assessment, career guidance, behavioural therapy, and mental health counselling in education.', 'English and any three Arts, Science, or Social Science subjects',
  '5 SSCE credit passes to include English Language and four other subjects from Arts, Social Sciences or Science', '180', '4 years', 'Students explore psychometrics, adolescent psychology, career decision theories, family counselling, and crisis intervention. Practicum placements in schools and clinical counseling centres provide vital therapeutic experience. Career avenues include school counsellors, student development directors, employee assistance specialists, and youth advisors.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '5bee7595-3f0c-53cd-ad78-4a9230d43ba7', 'Library and Information Science', 'arts', 'Faculty of Education', 'Information curation, metadata cataloguing, digital archives preservation, and knowledge retrieval systems.', 'English and any three Arts, Science or Social Science subjects',
  '5 SSCE credit passes including English Language, Mathematics and three other subjects', '180', '4 years', 'Studies integrate digital librarianship, database indexing, information ethics, web archiving, and knowledge management architectures. Undergraduates gain hands-on training in academic libraries and corporate documentation departments. Graduates serve as digital archivists, information brokers, academic librarians, and corporate records controllers.',
  'full-profile', ARRAY['UI', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '8205f329-5e5c-560e-8a3b-beb9b5f4b5ce', 'Education and Biology', 'science', 'Faculty of Education', 'Pedagogical methodology, curriculum design, and foundational biological sciences for secondary education.', 'English, Biology, Chemistry, and one other Science subject',
  '5 SSCE credit passes to include English Language, Mathematics, Biology, Chemistry and one Science subject', '180', '4 years', 'Coursework merges advanced biological sciences (genetics, ecology, cytology) with modern instructional pedagogy and laboratory demonstration techniques. Mandatory teaching practice sessions ground students in high school classroom teaching. Alumni practice as biology educators, curriculum resource developers, science education officers, and textbook authors.',
  'full-profile', ARRAY['UNILAG', 'UI', 'UNN', 'OAU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '5c1accbe-a861-52e4-a76a-603a0a721f5c', 'Education and Chemistry', 'science', 'Faculty of Education', 'Instructional strategies, chemical laboratory pedagogy, and core chemical concepts for secondary education.', 'English, Chemistry, Physics, and Mathematics or Biology',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Physics and one other subject', '180', '4 years', 'The syllabus balances organic, inorganic, and physical chemistry with science teaching methodologies, micro-teaching, and safety protocols. Undergraduates participate in high school teaching practice and laboratory design workshops. Graduates work as chemistry teachers, educational science specialists, examination officers, and curriculum supervisors.',
  'full-profile', ARRAY['UNILAG', 'UI', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'c9622d22-3be5-5a92-a4d1-8ec70837577b', 'Education and English Language', 'arts', 'Faculty of Education', '', 'English pedagogical theory, language acquisition, phonetics, and literature teaching methods. English, Literature in English, and two Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Literature in English and three other subjects', '180', '4 years', 'The curriculum covers English language pedagogy, syntax teaching, literary criticism, phonological training, and classroom assessment. Students undergo extensive teaching practice in accredited secondary schools. Career tracks include English teachers, language instructors, educational publishers, and curriculum development advisors.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '7e45ae21-c8a2-54d6-b217-11a5a82aabcb', 'Education and Mathematics', 'science', 'Faculty of Education', 'Mathematical teaching methodologies, cognitive development in mathematics, and mathematical concepts.', 'English, Mathematics, Physics, and one other Science/Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Physics and two other subjects', '180', '4 years', 'Topics encompass calculus, algebra, statistics, mathematical logic, and pedagogical approaches to quantitative reasoning. Students complete school-based teaching practice and develop mathematical instructional software tools. Graduates work as mathematics educators, quantitative curriculum planners, statistical officers, and assessment analysts.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '03a4b187-72aa-5fab-8d94-c4aaada00a96', 'Education and Physics', 'science', 'Faculty of Education', 'Physics education, experimental laboratory demonstration, and foundational classical and modern physics.', 'English, Physics, Mathematics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other subject', '180', '4 years', 'Students learn mechanics, electromagnetism, optics, and quantum physics coupled with physics teaching heuristics and experimental design. Compulsory classroom teaching practicum prepares students for secondary and technical school instruction. Graduates advance as physics teachers, laboratory instructors, educational technologists, and science education consultants.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '2c2e65b8-ffdc-57e9-b1ab-26f50124c8ba', 'Education and Economics', 'commercial', 'Faculty of Education', 'Economic concepts, financial literacy education, and pedagogical methodologies for secondary schools.', 'English, Economics, Mathematics, and one other subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'The degree blends microeconomics, macroeconomics, public finance, and pedagogical techniques for commercial subjects. Practical teaching internships provide hands-on experience in teaching secondary school economics and commerce. Graduates work as economics educators, educational policy researchers, commercial syllabus designers, and school bursars.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'dc590424-3d45-5774-ab67-3ec16d583a63', 'Education and Geography', 'science', 'Faculty of Education', 'Spatial geography instruction, cartography pedagogy, physical geography, and environmental education.', 'English, Geography, and two other Arts or Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics, Geography and two other subjects', '180', '4 years', 'Coursework includes geomorphology, climatology, cartographic map interpretation, GIS in education, and secondary school teaching methods. Field excursions and classroom teaching practice hone instructional and environmental demonstration capabilities. Graduates become geography educators, environmental education officers, curriculum designers, and mapping specialists.',
  'full-profile', ARRAY['UNILAG', 'UI', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '6add3697-6aa8-5d36-acb8-4783dc7ed1ab', 'Education and History', 'arts', 'Faculty of Education', 'Historical historiography, national history curriculum pedagogy, and African and global historical events.', 'English, History/Government, and two other Arts subjects',
  '5 SSCE credit passes including English Language, History/Government and three other Arts subjects', '180', '4 years', 'Studies focus on Nigerian political history, world civilizations, historical research methodology, and history education delivery. Students perform supervised classroom teaching practice across high school levels. Career paths include history educators, educational archive officers, cultural heritage educators, and historical research assistants.',
  'full-profile', ARRAY['UI', 'UNN', 'OAU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '40f4f4e2-35db-5a1d-a962-18e9ea40cb57', 'Education and Political Science', 'arts', 'Faculty of Education', 'Civic education instruction, comparative governance, political philosophy, and democratic education pedagogy.', 'English, Government/History, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics, Government/History and two other subjects', '180', '4 years', 'The programme examines civic responsibility, governmental structures, political ideologies, and political science teaching pedagogy. Teaching practice and civic education simulations empower graduates to teach government and civic studies effectively. Alumni work as civic education teachers, political education analysts, government instructors, and NGO democratic advocates.',
  'full-profile', ARRAY['UNILAG', 'UI', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'f9bb06b9-b16a-5052-a30d-6ed3fe832008', 'Education and Christian Religious Studies', 'arts', 'Faculty of Education', 'Christian theological principles, moral instruction pedagogy, and religious education curriculum.', 'English, Christian Religious Studies, and two other Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, CRK/CRS and three other Arts or Social Science subjects', '180', '4 years', 'Coursework covers Old and New Testament studies, moral ethics, curriculum development in religious education, and classroom methodology. High school teaching practice exposes undergraduates to pedagogical delivery of Christian religious values. Graduates work as religious education teachers, moral instruction advisors, school chaplains, and curriculum officers.',
  'full-profile', ARRAY['UI', 'UNN', 'OAU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '9b16f2c4-90bc-5694-92ca-71f493bcb8f4', 'Education and Islamic Studies', 'arts', 'Faculty of Education', 'Islamic theological education, Arabic pedagogy, Quranic sciences, and Islamic religious curriculum design.', 'English, Islamic Studies, and two other Arts subjects',
  '5 SSCE credit passes to include English Language, Islamic Studies and three other Arts subjects', '180', '4 years', 'The syllabus details Islamic jurisprudence, Hadith studies, pedagogical theories for religious instruction, and Arabic orthography teaching. Practical teaching sessions prepare students for Islamic religious knowledge classes in schools. Graduates pursue careers as Islamic religious studies educators, school counselors, curriculum developers, and academic researchers.',
  'full-profile', ARRAY['UNILORIN', 'ABU', 'BUK']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a71ee354-9e21-5569-942a-363ee29ea8f3', 'Physical and Health Education', 'science', 'Faculty of Education', 'Kinesiology, sports physiology, athletic coaching, physical fitness training, and school health pedagogy.', 'English, Biology, and two other Science or Social Science subjects',
  '5 SSCE credit passes including English Language, Biology and three other subjects', '180', '4 years', 'Students learn human anatomy, sports nutrition, athletic training, injury rehabilitation, and physical fitness pedagogy. Practical athletic training camps and teaching practice ensure complete mastery of physical education delivery. Career opportunities include physical education directors, athletic coaches, sports fitness trainers, and community health promoters.',
  'full-profile', ARRAY['UNILAG', 'UI', 'OAU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '959a0783-7caf-5746-945c-e4a7acd06936', 'Special Education', 'arts', 'Faculty of Education', 'Instructional adaptations, assistive technologies, braille and sign language, and neurodiversity pedagogy.', 'English and any three Arts, Science or Social Science subjects',
  '5 SSCE credit passes to include English Language and four other subjects from Arts, Social Sciences or Science', '180', '4 years', 'Instruction focuses on learning disabilities, visual/hearing impairments, assistive speech software, braille transcription, and inclusive education. Students complete practical clinical attachments in inclusive learning schools and rehab centers. Graduates serve as special education teachers, inclusion specialists, behavioral therapists, and accessibility consultants.',
  'full-profile', ARRAY['UI', 'UNICAL', 'BAYERO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a37ea3b7-4479-5a55-9c0c-c956ad38a84a', 'Early Childhood Education', 'arts', 'Faculty of Education', 'Child developmental psychology, play-based pedagogical models, early childhood literacy, and preschool care.', 'English and any three Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Mathematics and three other subjects', '180', '4 years', 'The curriculum centers on cognitive child development, creative expression, preschool curriculum design, and child safety. Field practicum in nursery and kindergarten institutions gives hands- on experience in early childhood instruction. Graduates work as preschool directors, early childhood educators, child development consultants, and educational toy designers.',
  'full-profile', ARRAY['UI', 'UNILAG', 'EKSU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '88b4503f-e244-5b2c-930e-22183c7bdacc', 'Primary Education Studies', 'arts', 'Faculty of Education', 'Foundational literacy, numeracy instruction, primary curriculum development, and elementary classroom management.', 'English and any three Arts, Science or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics and three other subjects', '180', '4 years', 'Modules address integrated elementary science, primary mathematics instruction, classroom psychology, and child welfare. Compulsory teaching practice in primary schools develops structured foundational pedagogy. Alumni thrive as primary school headteachers, elementary teachers, educational inspectors, and instructional material developers.',
  'full-profile', ARRAY['UNN', 'UNILAG', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '2e2ba397-1f42-5308-aded-0dae92c43c17', 'Technical Education / Vocational and Technical Education', 'technical', 'Faculty of Education', 'Vocational pedagogy, mechanical and electrical trade instruction, technical drawing, and craft education.', 'English, Mathematics, Physics, and Technical Drawing or Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics and two Technical/Science subjects', '180', '4 years', 'The degree covers woodworking, metal fabrication, electrical installation pedagogy, workshop safety, and vocational curriculum planning. Extensive industrial attachment (SIWES) and technical college teaching practice ensure practical trade mastery. Graduates practice as technical college instructors, vocational school principals, industrial trainers, and workshop managers.',
  'full-profile', ARRAY['UNN', 'ABU', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '8c94ad1c-aa0d-5fee-b815-124a22db99ea', 'Business Education', 'commercial', 'Faculty of Education', 'Instruction in commerce, accounting education, office management, and business pedagogical methods.', 'English, Mathematics, Economics, and one other Commercial subject',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two Commercial subjects', '180', '4 years', 'Coursework combines accounting principles, secretarial skills, marketing education, business law, and commercial subject teaching practice. Practical school teaching and office software workshops build versatile educational capabilities. Graduates serve as business educators, commercial curriculum specialists, office administrators, and corporate trainers.',
  'full-profile', ARRAY['UNILAG', 'UNN', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'be709c88-0613-50a8-81ce-68cba53a270c', 'Metallurgical and Materials Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Extraction of metals, alloy thermodynamics, polymer materials, corrosion engineering, and materials characterization.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'Instruction covers mineral processing, physical metallurgy, phase transformations, corrosion science, and nanomaterials synthesis. Students complete foundry workshop practices, materials testing labs, and a six-month SIWES industrial internship. Graduates pursue careers as materials engineers, metallurgical consultants, foundry quality engineers, and corrosion inspectors.',
  'full-profile', ARRAY['FUTA', 'UNILAG', 'OAU', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '168bd0c9-03bc-5cec-9b5b-0d5763bc703a', 'Mining Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Mineral resource extraction, rock mechanics, mine design, blasting technology, and mine safety engineering.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other Science subject', '180', '5 years', 'The syllabus teaches open-pit mining, underground shaft design, mine ventilation, drilling mechanics, and mineral economics. Mandatory mine site camps and 6-month industrial placements (SIWES) provide frontline excavation experience. Alumni work as mine planning engineers, quarry operations managers, blasting specialists, and mineral exploration engineers.',
  'full-profile', ARRAY['FUTA', 'UNIJOS']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'f6270d66-d2f7-595d-a061-a77b247008ae', 'Marine Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Ship propulsion systems, naval architecture, maritime power systems, and offshore engineering operations.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and any Science subject', '200', '5 years', 'Students study marine diesel engines, naval hull hydrodynamics, marine auxiliary machinery, offshore structures, and shipyard operations. Sea-time training and shipyard industrial placements (SIWES) provide intensive technical exposure. Graduates work as marine propulsion engineers, shipyard technical superintendents, offshore installation engineers, and maritime surveyors.',
  'full-profile', ARRAY['RSU', 'FUPRE', 'MARITIME']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'e467b1a9-cfe7-5b49-9aa5-a2f8fdff6ce2', 'Mechatronics Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Synergistic integration of mechanical systems, electronics, computer algorithms, and automated control systems.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'The curriculum features industrial robotics, PLC programming, microcontrollers, sensor integration, pneumatic/hydraulic controls, and automation design. Hands-on robotics laboratory projects and a 6-month SIWES internship prepare engineers for smart manufacturing. Graduates practice as automation engineers, robotics specialists, smart factory control engineers, and instrumentation leads.',
  'full-profile', ARRAY['FUTA', 'FUNAAB', 'ABU', 'BELLS']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a4d49412-cc03-5d20-a120-67665218b7ab', 'Aeronautical / Aerospace Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Aerodynamics, aircraft structures, propulsion systems, avionics, flight mechanics, and space technologies.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'Coursework encompasses compressible fluid dynamics, aircraft structural mechanics, jet propulsion, avionics systems, and flight stability control. Hangar flight maintenance internships (SIWES) and flight simulation labs give real aerospace engineering practice. Career paths include aerospace systems engineers, flight test engineers, aircraft maintenance superintendents, and avionics specialists.',
  'full-profile', ARRAY['KWASU', 'AFIT']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a815a2af-6c43-5ec3-ba57-31cc1ba9ae6d', 'Production Engineering / Industrial and Production Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Manufacturing processes, operations research, quality control, assembly optimization, and ergonomics.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'Key modules include lean manufacturing, computer-integrated manufacturing, supply chain optimization, industrial ergonomics, and reliability engineering. Intensive factory shopfloor attachments (SIWES) prepare students for large manufacturing assembly lines. Graduates work as production managers, industrial process engineers, quality control superintendents, and plant operations leads.',
  'full-profile', ARRAY['UI', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'c3d8b95d-0d72-5bce-8d52-0b14881d9323', 'Software Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Software architecture, lifecycle engineering, agile development methodologies, test-driven programming, and DevOps.', 'English, Mathematics, Physics, and one of Chemistry, Biology, Economics',
  '5 SSCE credit passes including English Language, Mathematics, Physics and two other Science subjects', '200', '4 years', 'The degree focuses on enterprise software design, full-stack web/mobile development, CI/CD pipelines, microservices, and software quality testing. Practical software team build projects and tech firm internships yield industry-ready developers. Alumni excel as software architects, full-stack developers, DevOps engineers, and technical product managers.',
  'full-profile', ARRAY['FUTA', 'BABCOCK', 'COVENANT']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '6bd556c4-78df-52a5-a119-48a8a34135b0', 'Cybersecurity', 'science', 'Faculty of Engineering / Environmental / Technology', 'Network defence, cryptography, ethical hacking, digital forensics, and security risk management.', 'English, Mathematics, Physics, and one of Chemistry, Biology, Economics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics and two other Science subjects', '200', '4 years', 'Studies cover penetration testing, network packet inspection, cryptographic protocols, cloud security architectures, and incident response. Cyber lab simulations and SOC enterprise internships prepare students to defend real digital infrastructures. Graduates practice as information security analysts, penetration testers, SOC engineers, and cyber forensics investigators.',
  'full-profile', ARRAY['FUTA', 'FUTMINNA', 'COVENANT']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a2ea6b27-8bfe-5f24-badd-cfe7d0effca5', 'Information Technology / Information Systems', 'science', 'Faculty of Engineering / Environmental / Technology', 'IT infrastructure, systems analysis, cloud services, enterprise databases, and digital transformation.', 'English, Mathematics, Physics, and one of Chemistry, Biology, Economics',
  '5 SSCE credit passes including English Language, Mathematics, Physics and two other Science subjects', '200', '4 years', 'The program covers enterprise system administration, database architecture, network administration, IT governance, and cloud virtualization. Practical IT support labs and tech internships provide real corporate infrastructure experience. Graduates become IT systems administrators, enterprise solutions architects, cloud operations engineers, and IT project leads.',
  'full-profile', ARRAY['FUTO', 'FUTMINNA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '7a4d40fb-482e-5cf2-a229-55fc38672a9c', 'Telecommunication Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Cellular networks, RF engineering, optical communication, satellite links, and digital signal processing.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'Instruction covers 4G/5G mobile standards, microwave link planning, antenna theory, fiber optic transmissions, and digital communications. Field transmitter site testing and telecoms carrier internships (SIWES) build strong network deployment skills. Alumni work as RF planning engineers, telecoms network engineers, optical transport specialists, and NOC engineers.',
  'full-profile', ARRAY['FUTO', 'FUTMINNA', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '3d562344-7cc5-5a81-9524-4f9abaab4cc6', 'Environmental Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Water treatment engineering, solid waste management, pollution abatement, and environmental impact assessments.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and any Science subject', '180', '5 years', 'Students study municipal water treatment plant design, air dispersion modeling, industrial effluent treatment, and hazardous waste remediation. Laboratory water testing and environmental consulting SIWES internships give students practical compliance skills. Career paths include environmental engineers, water treatment plant directors, remediation specialists, and EIA consultants.',
  'full-profile', ARRAY['UNIPORT', 'FUTO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'e80bf412-551c-5f9b-bcc2-8beeb7a357a0', 'Polymer and Textile Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Polymer synthesis, composite materials, fiber spinning technology, dye chemistry, and textile manufacturing.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other Science subject', '180', '5 years', 'Modules address polymer rheology, extrusion processing, synthetic fiber production, fabric finishing chemistry, and composite design. Hands-on testing in polymer extrusion laboratories and textile mill SIWES attachments prepare industry practitioners. Graduates work as polymer process engineers, materials development chemists, textile quality engineers, and plastics plant managers.',
  'full-profile', ARRAY['ABU', 'FUTO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '9698a765-19db-53d2-970a-f4c86a891bf0', 'Systems Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Complex system modeling, dynamic optimization, cybernetics, simulation systems, and systems integration.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and one other Science subject', '200', '5 years', 'The syllabus features mathematical modeling, control theory, optimization algorithms, systems reliability, and software- hardware systems integration. Engineering computing labs and industrial automation internships (SIWES) instill cross- disciplinary systems thinking. Alumni become systems integration engineers, operations research analysts, control systems designers, and enterprise architects.',
  'full-profile', ARRAY['UNILAG']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '1327e708-bae7-5f5b-8379-a348604ec02f', 'Water Resources and Environmental Engineering', 'science', 'Faculty of Engineering / Environmental / Technology', 'Hydrological modeling, dam design, groundwater hydraulics, irrigation infrastructure, and water resources management.', 'English, Mathematics, Physics, and Chemistry',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other Science subject', '180', '5 years', 'Curriculum highlights open channel hydraulics, watershed management, groundwater exploration, flood control engineering, and dam hydrology. Field stream gauging exercises and river basin authority internships (SIWES) ground students in hydrology practices. Graduates practice as water resources engineers, hydrologists, irrigation project managers, and drainage design engineers.',
  'full-profile', ARRAY['ABU', 'UNILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '66c355e5-be58-52dc-adf1-59edd251f705', 'Agricultural Extension and Rural Development', 'science', 'Faculty of Agriculture', 'Agro-technology transfer, rural sociology, community mobilization, farmer education, and agricultural communication.', 'English, Chemistry, Biology/Agriculture, and Mathematics or Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Chemistry, Biology/Agricultural Science and one other subject', '180', '5 years', 'The program covers farmer participatory extension techniques, rural social dynamics, communication media in agriculture, and farm enterprise development. Extensive rural community village stays and agricultural development project field attachments train practical outreach leaders. Graduates serve as agricultural extension officers, rural development specialists, NGO project coordinators, and farm communication managers.',
  'full-profile', ARRAY['UI', 'OAU', 'FUNAAB', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '8d3e5bcf-914a-5a51-b700-ec0e538cd8f9', 'Agronomy / Crop Production', 'science', 'Faculty of Agriculture', 'Crop breeding, soil fertility management, weed science, pest control, and sustainable crop production systems.', 'English, Chemistry, Biology/Agriculture, and Mathematics or Physics',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Biology/Agricultural Science and one other subject', '180', '5 years', 'Students explore plant genetics, agro-climatology, organic crop management, fertilizer formulation, and post-harvest grain handling. A full farm practical training year (SIWES / FPY) equips students with hands-on field crop cultivation skills. Alumni become agronomy consultants, commercial crop production managers, seed breeding specialists, and agricultural researchers.',
  'full-profile', ARRAY['UI', 'UNILORIN', 'FUNAAB']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '6361d242-c311-5edc-8d6b-4ea9ff421e8c', 'Animal Science / Animal Production', 'science', 'Faculty of Agriculture', 'Livestock genetics, animal nutrition, dairy technology, animal breeding, and meat science.', 'English, Chemistry, Biology/Agriculture, and Mathematics or Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Chemistry, Biology/Agricultural Science and one other subject', '180', '5 years', 'Studies cover animal physiology, livestock reproduction, feed compounding technology, pasture management, and dairy processing. A compulsory farm practical year (FPY) embeds students directly in commercial livestock, poultry, and feed production units. Graduates advance as commercial livestock managers, animal nutritionists, dairy plant supervisors, and animal genetics consultants.',
  'full-profile', ARRAY['UI', 'FUNAAB', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'c7daf2a6-461d-5dd1-93e3-f06d4b5d2dd1', 'Fisheries and Aquaculture', 'science', 'Faculty of Agriculture', 'Fish breeding, aquatic ecology, hatchery management, fish nutrition, and pond engineering.', 'English, Chemistry, Biology/Agriculture, and Mathematics or Physics',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Biology/Agricultural Science and one other subject', '180', '5 years', 'The degree examines commercial fish farming, recirculating aquaculture systems (RAS), aquatic disease management, and post-harvest fish preservation. Field training during the Farm Practical Year gives direct hands-on mastery in fish hatchery operations and commercial netting. Alumni work as aquaculture farm directors, fisheries biosecurity officers, marine conservationists, and feed formulation scientists.',
  'full-profile', ARRAY['UI', 'FUNAAB', 'FUTA', 'UNICAL']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'c72382c3-368b-5811-9eb0-9262c0d721a1', 'Forestry and Wildlife Management', 'science', 'Faculty of Agriculture', 'Forest conservation, silviculture, wildlife ecology, biodiversity protection, and timber economics.', 'English, Chemistry, Biology/Agriculture, and Mathematics or Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Chemistry, Biology/Agricultural Science and one other subject', '180', '5 years', 'Curriculum highlights forest resource inventory, game reserve management, agroforestry design, and wildlife habitat conservation. Students take part in intensive forest expedition camps and wildlife park conservation attachments. Career tracks include forest conservators, wildlife park rangers, ecotourism consultants, and environmental biodiversity officers.',
  'full-profile', ARRAY['UI', 'FUNAAB', 'FUTA', 'UNIBEN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'cd7468f7-897e-5b54-bc15-3afc21666a8a', 'Soil Science and Land Management', 'science', 'Faculty of Agriculture', 'Soil chemistry, pedology, land evaluation, soil physics, and sustainable soil fertility restoration.', 'English, Chemistry, Biology/Agriculture, and Mathematics or Physics',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Biology/Agricultural Science and one other subject', '180', '5 years', 'Students learn soil mineralogy, soil-water dynamics, GIS land capability classification, and soil erosion remediation. Extensive pedological fieldwork and laboratory soil testing train students in precision agronomy. Graduates practice as soil survey specialists, land reclamation advisors, fertilizer formulation chemists, and environmental soil scientists.',
  'full-profile', ARRAY['UI', 'FUNAAB', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '3ada051b-2275-5bab-b04f-70a23dfefabf', 'Agricultural Economics', 'science', 'Faculty of Agriculture', 'Agribusiness finance, farm management, agricultural commodity marketing, and agricultural policy analysis.', 'English, Chemistry, Biology/Agriculture, and Mathematics or Economics',
  '5 SSCE credit passes to include English Language, Mathematics, Chemistry, Biology/Agricultural Science and Economics', '180', '5 years', 'Instruction encompasses micro-econometric farm budgeting, agro-commodity futures, value chain optimization, and rural microfinance schemes. Students complete comprehensive field farm records projects and commercial agribusiness internships. Career opportunities include agricultural credit analysts, agribusiness executives, farm financial consultants, and commodity traders.',
  'full-profile', ARRAY['UI', 'UNN', 'ABU', 'FUNAAB']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'e8d9e070-9c54-58b1-a9f7-d3c8655c8ca1', 'Biochemistry', 'science', 'Faculty of Science', 'Molecular biology, enzymology, cellular metabolism, biochemical genetics, and nutritional biochemistry.', 'English, Biology, Chemistry, and Physics or Mathematics',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Biology and Physics', '200', '4 years', 'The course explores enzyme kinetics, metabolic pathways, DNA recombinant technology, toxicology, and clinical biochemical diagnostics. Laboratory experiments and pharmaceutical SIWES attachments develop rigorous diagnostic and analytical competencies. Graduates work as biochemical analysts, clinical researchers, pharmaceutical QA officers, and food safety biochemists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a7060227-ca0e-561d-aff7-a6363fc2ec50', 'Microbiology', 'science', 'Faculty of Science', 'Bacteriology, virology, immunology, industrial fermentation, and microbial genetics.', 'English, Biology, Chemistry, and Physics or Mathematics',
  '5 SSCE credit passes to include English Language, Mathematics, Chemistry, Biology and Physics', '200', '4 years', 'Modules explore pathogenic microorganisms, antimicrobial susceptibility, food microbiology, biotechnology fermentation, and immunological assays. Students undergo extensive laboratory culture techniques and hospital or brewery SIWES attachments. Alumni practice as medical microbiologists, quality control analysts, industrial fermentation scientists, and public health lab scientists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '0a67f019-17e9-5a7e-8baa-ba9dc6f51e95', 'Industrial Chemistry', 'science', 'Faculty of Science', 'Applied chemical processes, industrial catalysis, chemical manufacturing, and petroleum derivatives.', 'English, Chemistry, Mathematics, and Physics',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Physics and one other Science subject', '180', '4 years', 'The curriculum teaches chemical process engineering, paint technology, soaps and detergents formulation, and analytical instrumentation (GC, HPLC, AAS). Industrial attachments (SIWES) in chemical plants build direct manufacturing capabilities. Graduates become industrial quality control chemists, production supervisors, chemical plant chemists, and formulation specialists.',
  'full-profile', ARRAY['UNILORIN', 'FUTA', 'COVENANT', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '3a701c7f-602d-5d46-87a3-9ff790011585', 'Pure and Applied Chemistry / Chemistry', 'science', 'Faculty of Science', 'Fundamental principles of organic synthesis, inorganic coordination chemistry, and physical chemistry.', 'English, Chemistry, Mathematics, and Physics or Biology',
  '5 SSCE credit passes to include English Language, Mathematics, Chemistry, Physics and one other Science subject', '180', '4 years', 'Students delve into quantum chemistry, reaction mechanisms, molecular spectroscopy, electrochemistry, and coordination complexes. Rigorous wet chemistry and instrumental synthesis laboratory sessions foster strong investigative methods. Career paths include research chemists, chemical analysts, forensic scientists, and environmental monitors.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '8b2922c9-ef48-5a0a-aaf9-6ee6287dcb07', 'Pure and Applied Mathematics / Mathematics', 'science', 'Faculty of Science', 'Abstract algebra, real analysis, differential equations, numerical computation, and mathematical modeling.', 'English, Mathematics, Physics, and one of Chemistry, Economics, Biology',
  '5 SSCE credit passes including English Language, Mathematics, Physics and two other subjects', '180', '4 years', 'Coursework covers topological spaces, partial differential equations, complex analysis, mathematical programming, and dynamical systems. Undergraduates gain profound logical formulation and quantitative problem-solving capabilities. Graduates excel as quantitative analysts, mathematical modelers, risk algorithms specialists, and data scientists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'b9c2b927-5c47-5ff8-b9a5-480902ad817b', 'Statistics', 'science', 'Faculty of Science', 'Probability theory, biometric analysis, survey sampling design, econometric modeling, and time series.', 'English, Mathematics, and any two of Physics, Chemistry, Economics, Geography',
  '5 SSCE credit passes to include English Language, Mathematics and three other Science or Social Science subjects', '180', '4 years', 'Students learn parametric and non-parametric inference, stochastic processes, multivariate analysis, regression diagnostics, and statistical computing with R and Python. Industrial internships (SIWES) and census survey projects give hands-on data analytics experience. Alumni work as biostatisticians, actuarial assistants, data analysts, and market research scientists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'f25fe4f8-6ad5-5214-a87d-b0d3ccbbdc9a', 'Physics / Industrial Physics', 'science', 'Faculty of Science', 'Classical mechanics, electromagnetism, quantum mechanics, solid-state physics, and computational physics.', 'English, Physics, Mathematics, and Chemistry',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and one other Science subject', '180', '4 years', 'The programme investigates semiconductor device physics, laser optics, thermodynamics, condensed matter, and computational modeling. Hands-on physics laboratories and industrial instrumentation attachments (SIWES) provide deep technical insight. Graduates work as geophysicists, medical physics trainees, instrumentation specialists, and semiconductor technologists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '87336d0a-6aa0-5fb7-9eb8-09b1462b8d8e', 'Geology / Applied Geophysics', 'science', 'Faculty of Science', 'Earth dynamics, mineralogy, structural geology, stratigraphy, and petrology.', 'English, and any three of Physics, Chemistry, Biology, Mathematics, Geography',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology/Geography', '180', '4 years', 'Instruction involves sedimentary basin analysis, economic geology, hydrogeology, field geological mapping camps, and petrographic microscopy. Extensive fieldwork expeditions across complex rock terrains ground students in real exploration skills. Graduates pursue careers as petroleum geologists, hydrogeologists, mineral explorationists, and geotechnical investigators.',
  'full-profile', ARRAY['UI', 'OAU', 'UNILAG', 'FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '9f9ba92e-6677-5915-904d-b8f433bf6407', 'Geophysics', 'science', 'Faculty of Science', 'Subsurface geophysical prospecting using seismic, electrical resistivity, gravity, and magnetic methods.', 'English, Physics, Mathematics, and Chemistry or Biology',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and one other Science subject', '180', '4 years', 'The syllabus covers 2D/3D seismic reflection, borehole logging, electrical sounding, potential field theory, and geophysical data processing software. Field geophysical field camps and oilfield SIWES attachments give students industry exploration mastery. Alumni work as exploration geophysicists, borehole log analysts, seismic interpreters, and groundwater consultants.',
  'full-profile', ARRAY['FUTA', 'OAU', 'UNILAG', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '6675d932-d5fe-5c68-985c-1037fe4fe7c2', 'Plant Biology / Botany', 'science', 'Faculty of Science', 'Plant physiology, botanical taxonomy, phytopathology, ethnobotany, and plant tissue culture.', 'English, Biology, Chemistry, and Physics or Mathematics',
  '5 SSCE credit passes to include English Language, Mathematics, Biology, Chemistry and one other Science subject', '180', '4 years', 'Students study medicinal plant chemistry, floral anatomy, herbarium preservation, biosystematics, and plant genetics. Botanical garden field excursions and laboratory tissue propagation train students in plant resource management. Graduates serve as botanists, conservation officers, plant breeders, ethnobotanical researchers, and phytochemists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '5f101584-d39f-58ef-9798-002b4e790822', 'Zoology / Animal Biology', 'science', 'Faculty of Science', 'Comparative vertebrate anatomy, animal physiology, entomology, parasitology, and wildlife behavior.', 'English, Biology, Chemistry, and Physics or Mathematics',
  '5 SSCE credit passes including English Language, Mathematics, Biology, Chemistry and one other Science subject', '180', '4 years', 'Coursework addresses invertebrate zoology, vector biology, environmental toxicology, cellular physiology, and conservation ecology. Laboratory dissections, field faunal surveys, and pest control SIWES attachments build practical scientific acumen. Graduates become entomologists, environmental toxicologists, wildlife curators, and biomedical researchers.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'ABU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '744ed86a-7d8c-528c-ba0d-276e3e6b3e24', 'Marine Biology and Fisheries / Oceanography', 'science', 'Faculty of Science', 'Marine biodiversity, oceanographic currents, estuarine ecosystems, and coastal zone management.', 'English, Biology, Chemistry, and Physics or Mathematics',
  '5 SSCE credit passes to include English Language, Mathematics, Biology, Chemistry and one other Science subject', '180', '4 years', 'Studies focus on pelagic ecology, marine pollution monitoring, chemical oceanography, and commercial fish stock assessment. Ocean research vessel cruises and coastal research institute SIWES placements train students in marine fieldwork. Career paths include marine biologists, oceanographic researchers, coastal resource planners, and fisheries inspectors.',
  'full-profile', ARRAY['UNILAG', 'UNICAL', 'RSU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'd5d405e0-6b2c-53ef-8328-0c50927e8685', 'Biotechnology', 'science', 'Faculty of Science', 'Genetic engineering, molecular diagnostics, bioinformatics, bioprocessing, and synthetic biology.', 'English, Biology, Chemistry, and Physics or Mathematics',
  '5 SSCE credit passes including English Language, Mathematics, Chemistry, Biology and Physics', '200', '4 years', 'Students learn gene editing, recombinant protein expression, PCR diagnostics, microbial genomics, and cell culture techniques. Advanced molecular biology lab exercises and biotech institute internships prepare students for cutting-edge bioscience. Graduates excel as biotechnology researchers, molecular diagnostic scientists, genomics analysts, and bioprocess officers.',
  'full-profile', ARRAY['FUTA', 'FUTO', 'BABCOCK', 'BELLS']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'aae1e030-fa06-5aff-8210-6c1db3cd83aa', 'Meteorology and Climate Science', 'science', 'Faculty of Science', 'Atmospheric physics, weather forecasting, climate modeling, synoptic meteorology, and satellite climatology.', 'English, Mathematics, Physics, and Chemistry or Geography',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and one other subject', '180', '4 years', 'The curriculum teaches radar meteorology, atmospheric thermodynamics, climatological risk forecasting, and numerical weather prediction software. Practical meteorological observation stations and aviation weather service attachments build forecasting precision. Alumni work as operational meteorologists, aviation weather forecasters, climate risk analysts, and agro-meteorologists.',
  'full-profile', ARRAY['FUTA']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'd86d5ead-3aab-5cdf-a45d-215c70597500', 'Science Laboratory Technology (SLT)', 'science', 'Faculty of Science', 'Multi-disciplinary laboratory instrumentation, calibration, chemical analysis, and lab safety protocols.', 'English, and any three of Mathematics, Physics, Chemistry, Biology',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and Biology', '180', '4 years', 'Instruction encompasses spectroscopic calibration, microbiological culturing, histological techniques, laboratory quality control, and safety protocols. Extensive laboratory workbench sessions and multi-disciplinary SIWES attachments develop high technical precision. Graduates practice as certified laboratory technologists, instrumentation managers, QA lab specialists, and research technicians.',
  'full-profile', ARRAY['BENIN', 'UNIPORT', 'EKSU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '83233cab-6d0f-558d-a0c2-24edfba37762', 'Medicine and Surgery (MBBS)', 'science', 'Faculty of Medical and Health Sciences', 'Clinical medicine, human pathology, internal medicine, general surgery, pediatrics, and obstetrics.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology', '250', '6 years', 'Students undertake pre-clinical anatomy, biochemistry, and physiology, followed by extensive clinical ward rotations in surgery, medicine, and pediatrics. Clinical bedside teaching and teaching hospital clerkships develop advanced patient diagnosis and treatment skills. Graduates become licensed medical doctors, surgeons, clinical directors, and specialized medical consultants.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN', 'UNILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '83bb16c8-f5d0-5622-a05a-9d657e3497a1', 'Dentistry / Dental Surgery (BDS)', 'science', 'Faculty of Medical and Health Sciences', 'Oral maxillofacial surgery, restorative dentistry, periodontics, orthodontics, and oral pathology.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and Biology', '240', '6 years', 'Curriculum teaches oral anatomy, dental radiology, restorative dental surgery, dental prosthetics, and maxillofacial trauma management. Intensive clinical dental chairside rotations and patient treatment clinics prepare students for dental registration. Alumni practice as dental surgeons, orthodontists, oral and maxillofacial surgeons, and periodontists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'BENIN', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '3f8dec6b-e051-5256-99b2-b195960986f1', 'Pharmacy (PharmD / B.Pharm)', 'science', 'Faculty of Pharmacy / Health Sciences', 'Pharmacology, pharmaceutical chemistry, clinical pharmacy, pharmacognosy, and pharmaceutical microbiology.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology', '230', '5 years', 'The degree covers drug formulation, pharmacology kinetics, therapeutic drug monitoring, toxicology, and pharmaceutical manufacturing. Hospital clinical ward rounds and industrial pharmaceutical company attachments prepare licensed pharmacists. Graduates practice as clinical hospital pharmacists, pharmaceutical manufacturers, regulatory affairs specialists, and community pharmacy directors.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'bf901d59-8b07-5d50-b9a8-403261b01047', 'Nursing / Nursing Science (BNSc)', 'science', 'Faculty of Medical and Health Sciences', 'Clinical nursing care, community health nursing, maternal and child healthcare, and advanced patient advocacy.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and Biology', '220', '5 years', 'Key areas include medical-surgical nursing, maternal-infant care, psychiatric mental health nursing, and community epidemiological care. Continuous clinical hospital rotations and primary health center postings develop compassionate bedside nursing competence. Graduates earn professional licensing as registered nurses (RN, RM, RPHN) and work in hospital clinical units and international healthcare agencies.',
  'full-profile', ARRAY['UI', 'OAU', 'UNILAG', 'UNN', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '5922e289-90bd-52c5-8f54-151513554220', 'Medical Laboratory Science (BMLS)', 'science', 'Faculty of Medical and Health Sciences', 'Clinical pathology, haematology, chemical pathology, medical microbiology, and blood transfusion science.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology', '220', '5 years', 'Students learn clinical specimen diagnostics, blood group serology, automated biochemical analyzers, histopathology staining, and diagnostic virology. Clinical laboratory rotations across tertiary teaching hospitals prepare students for professional licensure with MLSCN. Alumni practice as medical laboratory scientists, clinical diagnostic directors, haematology specialists, and forensic diagnostic officers.',
  'full-profile', ARRAY['UNILAG', 'UNN', 'BENIN', 'UNICAL']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '44f2132a-4f10-59e8-a21f-8c5afd804eda', 'Physiotherapy / Medical Rehabilitation (B.Physio)', 'science', 'Faculty of Medical and Health Sciences', 'Physical rehabilitation, neuromuscular therapeutics, musculoskeletal therapy, electrotherapy, and exercise physiology.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and Biology', '220', '5 years', 'Studies encompass human biomechanics, neurological rehabilitation, pediatric physical therapy, cardiopulmonary therapy, and sports injury recovery. Clinical hospital internships involve treating patients with stroke, spinal cord injury, and athletic traumas. Graduates work as certified physiotherapists, sports physical rehabilitation directors, pediatric therapists, and ergonomic consultants.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'BAYERO']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '2fa832d0-fc3a-5365-a622-c73da9752c39', 'Radiography and Radiation Science', 'science', 'Faculty of Medical and Health Sciences', 'Medical diagnostic imaging, X-ray techniques, computed tomography (CT), MRI, ultrasound, and radiation protection.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology', '220', '5 years', 'Coursework covers radiographic positioning, cross-sectional anatomy, ultrasound physics, radiation physics, and digital imaging techniques. Supervised hospital radiology department postings develop precise clinical scan operation skills. Graduates obtain RRBN professional licensing to practice as diagnostic radiographers, sonographers, MRI technologists, and radiation safety officers.',
  'full-profile', ARRAY['UNILAG', 'UNN', 'UNICAL', 'NAU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'c2488215-e9d3-5564-8193-1fde34470c9b', 'Human Anatomy', 'science', 'Faculty of Basic Medical Sciences', 'Gross human anatomy, neuroanatomy, embryology, histology, and microscopic biological sciences.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and Biology', '200', '4 years', 'The syllabus explores cadaveric dissection, clinical organogenesis, cytogenetics, ultrastructural microscopy, and neuroanatomical pathways. Extensive anatomical laboratory dissection and histological tissue processing provide deep structural mastery. Career avenues include biomedical researchers, anatomical educators, forensic anthropologists, and medical device product specialists.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'ILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '6ab6b82a-e2b5-58fb-97b5-370fd20e4378', 'Human Physiology', 'science', 'Faculty of Basic Medical Sciences', 'Functional mechanisms of organ systems, neurophysiology, endocrine pathways, and human cardiovascular control.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology', '200', '4 years', 'Instruction covers cellular electrophysiology, endocrinology, renal excretion mechanisms, exercise stress testing, and physiological signal measurement. Intensive laboratory experiments using physiological transducers give students quantitative biological measurement skills. Alumni work as physiological researchers, cardiac technicians, sports science consultants, and clinical trial coordinators.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'ILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '2058157d-974f-5707-8641-57505bbca910', 'Public Health', 'science', 'Faculty of Medical and Health Sciences', 'Epidemiology, biostatistics, environmental health, disease outbreak prevention, and health policy planning.', 'English, Biology, Chemistry, and Physics or Mathematics',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and Biology', '200', '4 years', 'The programme covers community epidemiology, infectious disease surveillance, health program monitoring, water sanitation, and global health economics. Field public health community surveys and NGO health project attachments furnish real-world interventions experience. Graduates become epidemiologists, public health officers, health program evaluators, and disease control officers.',
  'full-profile', ARRAY['BABCOCK', 'UNICAL', 'ABUJA', 'BAUCHI']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '6278ffb2-013c-5aa4-9221-5db9a6e85f12', 'Human Nutrition and Dietetics', 'science', 'Faculty of Medical and Health Sciences', 'Clinical nutritional therapy, community dietetics, food metabolism, therapeutic diets, and maternal nutrition.', 'English, Chemistry, Biology, and Physics or Mathematics',
  '5 SSCE credit passes to include English Language, Mathematics, Chemistry, Biology and Physics', '200', '4 years', 'Students learn dietary assessment methodologies, therapeutic meal formulation, clinical malnutrition intervention, and public health nutrition. Clinical hospital dietetic internships and community nutrition programs train students in clinical nutritional care. Career paths include registered clinical dietitians, public nutrition planners, wellness consultants, and pediatric nutritionists.',
  'full-profile', ARRAY['UI', 'UNN', 'FUNAAB', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'cb487e4c-b470-56cd-8d67-eede0e7f55eb', 'Optometry (OD)', 'science', 'Faculty of Medical and Health Sciences', 'Vision care, ocular disease diagnosis, refractive corrections, contact lenses, and low vision rehabilitation.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes including English Language, Mathematics, Physics, Chemistry and Biology', '220', '6 years', 'The curriculum integrates ocular anatomy, visual optics, ocular pharmacology, contact lens fitting, and surgical co-management of eye pathologies. Extensive clinical eye clinic externships develop diagnostic and refractive prescription skills. Graduates practice as licensed Doctors of Optometry (OD), primary eye care specialists, contact lens experts, and vision researchers.',
  'full-profile', ARRAY['BENIN', 'ABSU', 'IMSU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'ad5fca65-b5aa-58e5-9cbc-94c8c1cec184', 'Veterinary Medicine (DVM)', 'science', 'Faculty of Veterinary Medicine', 'Animal surgery, veterinary pharmacology, livestock disease control, zoonoses prevention, and animal health pathology.', 'English, Biology, Chemistry, and Physics',
  '5 SSCE credit passes to include English Language, Mathematics, Physics, Chemistry and Biology', '220', '6 years', 'Core subjects cover veterinary pathology, clinical companion/large animal surgery, herd epidemiology, and livestock disease biosecurity. Clinical rotations in veterinary teaching hospitals and ambulatory livestock clinics provide comprehensive diagnostic experience. Graduates qualify as registered veterinary doctors (DVM), livestock herd health managers, and animal quarantine directors.',
  'full-profile', ARRAY['UI', 'ABU', 'UNN', 'FUNAAB', 'USMANU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'fe6477f6-5864-599e-8f49-6408ddf1faa3', 'Civil Law / Common Law', 'arts', 'Faculty of Law', 'Constitutional jurisprudence, law of contract, criminal law, torts, international human rights law, and civil litigation.', 'English, Literature in English, and two other Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Literature in English, Mathematics and two other subjects', '240', '5 years', 'Students study administrative law, commercial law, corporate legal practices, intellectual property, and international human rights jurisprudence. Moot court trials, legal aid clinics, and law firm internships develop persuasive advocacy and drafting skills. Graduates proceed to the Nigerian Law School to qualify as barristers and solicitors, corporate counsels, and judges.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN', 'UNILORIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'ed121bae-64e7-514f-a096-52e80fd89489', 'Islamic Law / Common and Islamic Law', 'arts', 'Faculty of Law', 'Islamic jurisprudence (Sharia), Islamic family law, criminal and civil codes, and comparative legal systems.', 'English, Islamic Studies/Arabic, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Islamic Studies/Arabic and three other subjects', '220', '5 years', 'Instruction covers Usul al-Fiqh, Islamic law of succession, commercial Islamic contracts, Nigerian statutory law, and comparative constitutional systems. Undergraduates participate in moot trials and judicial court observations in both Common Law and Sharia courts. Alumni practice as Sharia and common law legal practitioners, Islamic finance legal consultants, judges, and state counsels.',
  'full-profile', ARRAY['UNILORIN', 'ABU', 'BUK', 'LASU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '034dfb70-ac8a-578a-9159-5385e37a1397', 'Economics', 'commercial', 'Faculty of Social Sciences', 'Microeconomic and macroeconomic theory, econometrics, public finance, monetary policy, and developmental economics.', 'English, Mathematics, Economics, and one other Social Science or Commercial subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '200', '4 years', 'The course explores quantitative economic modelling, fiscal policy analysis, econometric forecasting, international trade, and development strategies. Students solve empirical data modeling problems using statistical software packages. Graduates excel as economic policy analysts, investment bankers, econometricians, corporate planners, and research fellows.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '745c761c-2106-578a-86f5-278196ee883e', 'Political Science', 'arts', 'Faculty of Social Sciences', 'Political philosophy, public policy analysis, comparative government, political economy, and international relations.', 'English, Government/History, and two other Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics, Government/History and two other subjects', '200', '4 years', 'The curriculum covers public policy evaluation, electoral systems, African political thought, international political economy, and political sociology. Practical legislative internships and policy research papers sharpen analytical thought. Graduates enter careers as public policy analysts, legislative aides, political strategists, diplomats, and civil service executives.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '9a07bd09-89a7-5bc5-aeb5-aa2f1f10d35e', 'Sociology', 'arts', 'Faculty of Social Sciences', 'Sociological theory, social stratification, community structures, urban sociology, and quantitative research methodology.', 'English, Government/History, and two other Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Mathematics and three other Arts or Social Science subjects', '180', '4 years', 'Students study sociological theories, social problems, social research techniques, industrial sociology, and family structures. Undergraduates design field survey studies and complete social intervention internships. Alumni become social researchers, community development directors, human relations officers, and sociological policy analysts.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'b99223c9-d8ea-5673-bf10-476afdb674ff', 'Psychology', 'arts', 'Faculty of Social Sciences', 'Cognitive psychology, biopsychology, clinical psychopathology, developmental psychology, and psychological assessment.', 'English, and three other subjects from Science, Social Science, or Arts',
  '5 SSCE credit passes to include English Language, Mathematics, Biology and two other subjects', '180', '4 years', 'The degree features psychological testing, mental health therapy, organizational behavior, experimental human psychology, and forensic analysis. Students perform supervised psychometric lab tests and clinical psychiatric hospital internships. Graduates work as clinical psychologists, human resources specialists, behavioral analysts, rehabilitation counselors, and UX researchers.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'UNN', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '9e99c914-f808-51cb-b5b9-bfbdb19efc88', 'Geography and Environmental Management', 'science', 'Faculty of Social Sciences', 'Spatial analysis, geomorphology, climate change assessment, environmental conservation, and remote sensing.', 'English, Geography, and two other Arts, Social Science or Science subjects',
  '5 SSCE credit passes including English Language, Mathematics, Geography and two other subjects', '180', '4 years', 'The curriculum covers cartographic GIS analysis, climate adaptation planning, resource management, environmental impact assessments, and hydrological hazards. Field environmental measurement expeditions and GIS labs equip students with practical spatial tools. Graduates become GIS spatial analysts, environmental management officers, climatology consultants, and resource planners.',
  'full-profile', ARRAY['UI', 'UNILAG', 'OAU', 'ABU', 'UNIPORT']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '2dbe8d12-3c33-5079-aa77-5f78938e41ff', 'Demography and Social Statistics', 'commercial', 'Faculty of Social Sciences', 'Population dynamics, census data analytics, actuarial demography, mortality-fertility modeling, and vital statistics.', 'English, Mathematics, Economics, and one other Social Science subject',
  '5 SSCE credit passes to include English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'Instruction focuses on census methodologies, life table construction, demographic projection modeling, reproductive health analytics, and migration studies. Population commission attachments and statistical surveys provide rich practical experience. Alumni advance as demographic data analysts, census officers, reproductive health analysts, and social statistics consultants.',
  'full-profile', ARRAY['OAU', 'COVENANT']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'a08e4fb9-6cee-50f6-8302-cf937d9e82c9', 'Social Work', 'arts', 'Faculty of Social Sciences', 'Community welfare services, family crisis intervention, correctional casework, and vulnerable populations advocacy.', 'English, and any three Arts or Social Science subjects',
  '5 SSCE credit passes including English Language, Mathematics and three other subjects', '180', '4 years', 'Topics encompass social welfare administration, rehabilitation casework, youth delinquency intervention, medical social work, and social legislation. Students complete mandatory field agency social work placements in orphanages, prisons, and hospitals. Graduates practice as medical social workers, family welfare caseworkers, rehabilitation officers, and NGO project directors.',
  'full-profile', ARRAY['UNN', 'UNILAG', 'BENIN']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  '13ca5506-f539-5127-b1e9-404d4e4db195', 'Criminology and Security Studies', 'arts', 'Faculty of Social Sciences', 'Crime theories, penology, forensic criminal investigation, national intelligence, and policing systems.', 'English, and any three Arts or Social Science subjects',
  '5 SSCE credit passes to include English Language, Mathematics and three other subjects', '180', '4 years', 'Studies examine criminal profiling, forensic evidence handling, surveillance technologies, corporate security intelligence, and correctional policies. Security agency attachments and criminal investigative workshops prepare students for security architecture. Career opportunities include security intelligence analysts, fraud investigators, law enforcement officers, and corporate loss prevention managers.',
  'full-profile', ARRAY['UNILORIN', 'NOUN', 'EKSU']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;
INSERT INTO courses (
  id, name, stream, faculty, short_description, jamb_subjects, 
  waec_requirements, utme_cutoff, duration, deep_dive, 
  profile_status, offered_at_list, last_verified_cycle
) VALUES (
  'd8522862-f5c0-56a6-b9f1-c99b511a3118', 'Tourism and Hospitality Management', 'commercial', 'Faculty of Social Sciences', 'Hotel operations, tourism economics, events coordination, ecotourism planning, and destination marketing.', 'English, Mathematics, Economics, and one other Commercial or Social Science subject',
  '5 SSCE credit passes including English Language, Mathematics, Economics and two other subjects', '180', '4 years', 'Coursework covers food and beverage management, hotel revenue optimization, convention planning, sustainable tourism, and customer experience. Professional internships in star-rated international hotels and tourism resorts provide direct operational training. Graduates work as hotel general managers, hospitality operations directors, tourism event planners, and travel resort developers.',
  'full-profile', ARRAY['FUNAAB', 'EKSU', 'REDEEMERS']::text[], NULL
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  stream = EXCLUDED.stream,
  faculty = EXCLUDED.faculty,
  short_description = EXCLUDED.short_description,
  jamb_subjects = EXCLUDED.jamb_subjects,
  waec_requirements = EXCLUDED.waec_requirements,
  utme_cutoff = EXCLUDED.utme_cutoff,
  duration = EXCLUDED.duration,
  deep_dive = EXCLUDED.deep_dive,
  profile_status = EXCLUDED.profile_status,
  offered_at_list = EXCLUDED.offered_at_list,
  last_verified_cycle = EXCLUDED.last_verified_cycle;