export type StreamKey = "science" | "arts" | "commercial" | "technical";

export type TabKey =
  | "foundation"
  | "societal-impact"
  | "evolution"
  | "job-roles"
  | "future-with-ai"
  | "redemptive-impact";

export const TAB_ORDER: TabKey[] = [
  "foundation",
  "societal-impact",
  "evolution",
  "job-roles",
  "future-with-ai",
  "redemptive-impact",
];

export const TAB_LABELS: Record<TabKey, string> = {
  foundation: "Foundation",
  "societal-impact": "Societal Impact",
  evolution: "Evolution",
  "job-roles": "Job Roles",
  "future-with-ai": "Future with AI",
  "redemptive-impact": "Redemptive Impact",
};

export type TabContent = {
  headline: string;
  paragraphs: string[];
  roles?: { title: string; description: string }[];
  format: string;
  isPlaceholder: boolean;
};

export const STREAM_LABELS: Record<StreamKey, string> = {
  science: "Science",
  arts: "Arts",
  commercial: "Commercial",
  technical: "Technical",
};

export const STREAM_CONTENT: Record<StreamKey, Record<TabKey, TabContent>> = {
  science: {
    foundation: {
      headline: "Science is the study of the natural world, and each of your four major subjects plays an important role.",
      paragraphs: [
        "Science is the systematic study of the natural world through observation, measurement, and experiments. In the Nigerian SSCE and JAMB system, the science stream focuses on Physics, Chemistry, Biology, and Mathematics. These subjects are important for many courses, including Medicine, Pharmacy, Engineering, Biochemistry, and several Agriculture-related courses.",
        "Physics is important for Engineering. You will study topics such as forces, motion, and energy. These are some of the basic ideas engineering students use when they get to university. The main difference is that university work goes deeper and involves more mathematics.",
        "Chemistry is important for courses such as Medicine and Pharmacy. The Chemistry you will learn gives you the knowledge you will build on later in areas such as Biochemistry and Pharmacology.",
        "Biology is also important for Medicine, Nursing, Agriculture, and other life-science courses. What you learn about cells, body systems, and living things gives you a foundation for subjects such as Anatomy and Physiology in university.",
        "Mathematics supports all three subjects. It helps you understand and work with scientific ideas using numbers, measurements, calculations, and formulas.",
        "Your JAMB subject combination helps determine which courses you can apply for. Passing the right subjects in WAEC or another SSCE is important, but your JAMB combination must also match the requirements of the course you want to study.",
        "So, do not think of Physics, Chemistry, Biology, Mathematics and the other subjects as completely separate subjects. Think about how they connect to the courses and careers you may want to pursue.",
        "For example, if you are strong in Biology and Chemistry but struggle with Physics, you may find life-science courses more closely connected to your strengths than Engineering. Knowing this will help you make better decisions about your subjects and future course of study.",
        "Sources: JAMB Brochure (annual), JAMB IBASS Portal; WAEC subject syllabuses.",
      ],
      format: "Tap-to-reveal cards",
      isPlaceholder: false,
    },
    "societal-impact": {
      headline: "Nigeria has fewer than 12 doctors for every 100,000 people, while the WHO minimum is 23.",
      paragraphs: [
        "Nigeria has fewer than 12 doctors for every 100,000 people. The World Health Organization (WHO) considers 23 doctors per 100,000 people a minimum level for providing adequate healthcare.",
        "This shortage affects real people. It can mean that a hospital has too few doctors to handle the number of patients who need care. It can also mean longer waiting times for appointments and more pressure on the doctors who are available. The need for skilled professionals is not limited to medicine.",
        "Engineers help design and build roads, buildings, power systems, water systems, and other infrastructure. As Nigerian cities grow, these professionals are needed to help develop and maintain the places where people live and work.",
        "Pharmacists also play an important role in healthcare. Many people in Nigeria visit pharmacies for advice and treatment because pharmacies may be easier to reach than hospitals. This means pharmacists need strong knowledge and skills to serve people safely.",
        "Medical Laboratory Scientists are important because doctors often depend on laboratory tests to understand what is wrong with a patient. If a test is not done correctly, it can affect the diagnosis and treatment that follows.",
        "These careers require hard work, strong skills, and proper training. The need for skilled professionals means that people who develop strong competence can have opportunities to contribute to important problems in society.",
        "Sources: World Health Organization health workforce data; Medical and Dental Council of Nigeria (MDCN) register.",
      ],
      format: "Data scroll with live stats",
      isPlaceholder: false,
    },
    evolution: {
      headline: "Science used to focus mainly on the laboratory and the notebook. Today, it also involves data and technology.",
      paragraphs: [
        "Science careers have changed over time and understanding this change can help you see what science-related work may look like in the future.",
        "In the past, science careers were often more clearly defined. Someone might become a doctor, pharmacist, agricultural officer, or work in a laboratory. Many of these professionals worked mainly within their own fields.",
        "For example, Chemistry often involved laboratory work such as mixing substances, taking measurements, and observing what happened. Biology often involved studying, classifying, and recording information about living things.",
        "However, technology has changed the way scientists work.",
        "As computers became more powerful and easier to use, scientists began using them to collect, store, analyse, and understand large amounts of information. This has created new areas of work that combine science with technology.",
        "For example, bioinformatics combines Biology, computer science, and data analysis to study biological information. In Medicine, technology is used for medical imaging and electronic health records. In Agriculture, satellite images and sensors can help farmers and researchers monitor crops, soil, and weather conditions.",
        "This means that new careers are appearing where science meets technology and data. These include areas such as health data analysis, agricultural technology, remote sensing, and computational chemistry.",
        "Some of these changes are already happening in Nigeria, especially in health technology and agricultural technology.",
        "So, if you are interested in science, do not think that your future has to involve only a laboratory or a textbook. Your science subject can also be a starting point for learning how to work with data, computers, and technology.",
        "You do not need to become an expert in these areas right now but being comfortable with technology and learning how to understand data can become a useful skill as you progress.",
        "Sources: General field history; NUC course accreditation lists for emerging disciplines such as bioinformatics.",
      ],
      format: "Scrubbable timeline",
      isPlaceholder: false,
    },
    "job-roles": {
      headline: "Five science careers in Nigeria, and what you might actually do at work",
      paragraphs: [
        "Science can lead to many different careers. Here are five examples of jobs you could explore and what people in these roles actually do.",
      ],
      roles: [
        {
          title: "Clinical Pharmacist",
          description:
            "A clinical pharmacist works in a hospital or other healthcare setting. They check prescriptions to make sure medicines are safe, look out for possible drug interactions, and advise patients on how to use their medicines correctly. They also work with doctors and other healthcare professionals as part of a patient's care team.",
        },
        {
          title: "Petroleum Geologist",
          description:
            "A petroleum geologist works with oil and gas companies to study rocks and information from underground. Their work helps companies understand where oil and gas may be found before they spend money drilling. Much of the work involves studying data, maps, and computer models rather than working on an oil rig. Physics and Mathematics are useful foundations for this career.",
        },
        {
          title: "Software Engineer",
          description:
            "A software engineer designs, builds, tests, and improves software. This can include the apps, websites, and computer systems that people and businesses use every day. People can enter software engineering through different educational backgrounds, including science and technology-related degrees. Mathematics and logical thinking can be especially useful.",
        },
        {
          title: "Agricultural Scientist",
          description:
            "An agricultural scientist works to improve farming and food production. They may study crops, soil, pests, or better ways to grow food. Depending on their role, they may spend time in the field, carry out laboratory tests, conduct research, or advise farmers and agricultural businesses. Biology and Chemistry are useful foundations.",
        },
        {
          title: "Public Health Officer",
          description:
            "A public health officer works to protect the health of groups and communities rather than treating one patient at a time. They may work with government health agencies, research organisations, or NGOs. During a disease outbreak, for example, public health professionals may help track how a disease is spreading and plan ways to reduce its spread.",
        },
      ],
      format: "Interactive day-in-the-life cards",
      isPlaceholder: false,
    },
    "future-with-ai": {
      headline: "AI can help analyse information, but humans still need to understand the results and make important decisions.",
      paragraphs: [
        "Artificial intelligence (AI) is already being used in some science and healthcare jobs. It is changing how some tasks are done, but it does not mean that scientists and other professionals are no longer needed.",
        "In Medicine, for example, AI tools can help identify unusual patterns in medical scans or laboratory results. A trained healthcare professional still needs to review the information, understand what it means for a particular patient, and decide what to do next.",
        "In Chemistry, AI can help scientists predict how certain molecules might behave before they carry out an experiment. The scientist still needs to design and carry out experiments to test those predictions.",
        "In Agriculture, AI can analyse satellite images and identify areas where crops may be struggling. A farmer or agricultural professional may then need to investigate the area to understand the cause. It could be a problem with pests, soil, water, or something else.",
        "These examples show that AI can be very useful for analysing large amounts of information and handling some repetitive tasks. However, professionals still need to ask the right questions, understand the situation, check the results, and make decisions.",
        "This means that future science professionals need more than knowledge of their science subject. Being able to work with data and technology has become an important skill.",
        "You do not need to become an AI expert to study science. But learning how technology and data can support your work can give you more ways to solve problems and contribute to your field.",
        "Sources: Nigeria- and Africa-focused AI-in-health reporting; general clinical AI literature.",
      ],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: false,
    },
    "redemptive-impact": {
      headline: "Think of one person or problem that someone with science skills could help.",
      paragraphs: [
        "Science is not only about subjects, exams, or getting a job. Science helps people solve real problems. Think about the people and situations you see around you.",
        "Maybe someone you know had to wait a long time to see a doctor or a farmer lost crops because of a problem with the soil, pests, or water and people in a community became sick because of unsafe water.",
        "These are problems that people with science knowledge and skills can work to understand and solve.",
        "Think of one situation you know where someone with science training could have helped improve what happened. Try to be specific. This is not a test, so there is no right or wrong answer. Your response will be saved in your Field Action Plan. It can remind you that choosing a science path is not only about being good at your subjects. It is also about the kind of problems you want to help solve.",
        "Reflection: Write one sentence: Name a situation you know where someone with science training could have helped change what happened.",
      ],
      format: "Prompt + text input",
      isPlaceholder: false,
    },
  },

  arts: {
    foundation: {
      headline: "Arts is the study of people — how they think, what they believe, how they organise power, and how they tell their story.",
      paragraphs: [
        "The Arts stream focuses on people and society. It helps you understand language, beliefs, history, government, culture, and the ways people communicate and influence one another.",
        "In the Nigerian SSCE and JAMB system, common Arts subjects include Literature-in-English, Government, History, and CRS or IRS. English Language and Mathematics are compulsory for all students, while subjects such as Economics, Geography, and Nigerian languages may also be included depending on the school and the course you want to study.",
        "Literature-in-English helps you learn how to read closely, understand what a writer is saying, and explain your interpretation with evidence. You will do the same thing in Law. Instead of a novel, you will be reading a case, but the skill is the same.",
        "Government teaches you how political systems actually work. It is the direct foundation for Political Science, International Relations and Public Administration.",
        "History teaches you how to understand events, compare different accounts, and think carefully about evidence. These skills can be useful in Law, Journalism, Policy Research, and other careers that involve investigating information.",
        "CRS and IRS can help you understand religious beliefs, values, ethics, and how people make decisions about right and wrong. These ideas can be useful in Law, Philosophy, Education, and other fields that involve people and decision-making.",
        "English Language is equally important because it is required for all courses. Strong English skills can help you understand questions, write clearly, explain your ideas, and communicate effectively.",
        "The practical point is, do not choose your subjects only because you are good at them. Think about the courses and careers they can lead to as well.",
        "Sources: JAMB Brochure (annual), JAMB IBASS Portal; WAEC subject syllabuses.",
      ],
      format: "Tap-to-reveal cards",
      isPlaceholder: false,
    },
    "societal-impact": {
      headline: "About 18.3 million Nigerian children were out of school in 2024 — roughly one in five out-of-school children in the world.",
      paragraphs: [
        "An estimated 18.3 million Nigerian children were out of school in 2024. This means millions of children are missing the opportunity to receive a regular education. Nigeria also has a shortage of teachers, especially in primary schools. When there are too few teachers for the number of pupils, one teacher may have to teach a very large class. This can make it harder for each child to get the attention and support they need.",
        "These problems show why people with skills in education, law, communication, research, government, and public policy are important.",
        "For example, lawyers can help people understand and protect their rights. Policy-makers can study social problems and provide evidence that can help organisations and governments make better decisions. Writers, journalists, and communication professionals can help people understand important issues and share information with wider audiences.",
        "The creative side of the Arts also has a major role in Nigeria's economy. The country's film, music, publishing, fashion, advertising, and other creative industries provide jobs and create opportunities for people with different skills. Nigeria's creative economy includes people who work as writers, actors, filmmakers, designers, photographers, musicians, producers, editors, and many others.",
        "So, Arts is not only about studying subjects in school. It connects to real problems in society and to a large range of careers.",
        "At the same time, Arts careers can be competitive, and practical skills, experience, communication ability, and strong values will also make a difference.",
        "Sources: UNESCO/UNICEF out-of-school estimates 2024; National Bureau of Statistics GDP report Q4 2024.",
      ],
      format: "Data scroll with live stats",
      isPlaceholder: false,
    },
    evolution: {
      headline: "Technology has made it easier for people to create and share their work.",
      paragraphs: [
        "If you were a writer in Nigeria in the 1900s, you would need a newspaper or publisher to reach a large audience. If you wanted to make music or films, you would depend on record companies, television stations, cinemas, or other organisations to distribute your work.",
        "This meant that a small number of organisations had a lot of control over who could reach an audience. However, innovations in technology have changed this.",
        "The home-video boom of the 1990s helped Nollywood grow through video cassettes and local distribution instead of depending mainly on cinemas. Later, mobile phones and the internet made it much easier for individuals to create and share their own work.",
        "Today, Nigerian filmmakers can reach audiences around the world through streaming platforms. Nigerian musicians can release their music online and reach listeners in other countries. Writers can also build an audience online without first getting a book or newspaper deal.",
        "This means Arts careers are changing. Storytelling is still important, but other skills are becoming useful too. These include understanding intellectual property and rights, contracts, digital platforms, branding, communication, and audiences.",
        "New opportunities can also be found in areas such as communications, public affairs, policy, entertainment, technology, advertising and other industries that need people who can communicate ideas clearly.",
        "So, if you are interested in Arts, do not think your future has to be limited to the traditional jobs you already know. Your ability to read, write, think, communicate, and understand people can be useful in many different fields.",
        "Learning how technology, rights, contracts, and audiences work can help you turn those abilities into practical opportunities.",
        "Sources: Nollywood industry history; National Bureau of Statistics creative sector GDP reports; IFPI streaming growth data for Sub-Saharan Africa.",
      ],
      format: "Scrubbable timeline",
      isPlaceholder: false,
    },
    "job-roles": {
      headline: "Five Arts careers in Nigeria, and what the work can look like day to day",
      paragraphs: [
        "Here are five examples of careers across the Arts & Humanities and what people in these roles actually do.",
      ],
      roles: [
        {
          title: "Commercial Lawyer (Solicitor)",
          description:
            "A commercial lawyer helps businesses understand and manage legal matters. Much of the work involves reading and writing, rather than speaking in court. They may write and review contracts, advise a company before it enters an agreement, or help two parties negotiate the terms of a deal. They can work in law firms or as part of the legal team of a bank, telecoms company, manufacturer, or other organisation. Literature can help develop the close-reading and writing skills needed in this career, while Government can help you understand how laws and institutions work.",
        },
        {
          title: "Communications or Public Relations Manager",
          description:
            "A communications or public relations manager helps an organisation decide what to say publicly and how to say it. They may write press statements, plan campaigns, manage social media communication, or help the organisation respond when a difficult situation attracts public attention. They can work in companies, banks, government agencies, and NGOs. Strong communication skills and an understanding of how people think and respond are important in this role.",
        },
        {
          title: "Teacher and Curriculum Developer",
          description:
            "Teachers help students learn, but there are also careers focused on designing what students learn. A curriculum developer helps decide what should be taught, the order in which it should be taught, and what learning materials students and teachers should use. They may also help check whether students are actually learning. They can work with schools, education boards, publishers, or education technology companies. Nigeria's shortage of teachers also shows the need for more people to work in education.",
        },
        {
          title: "Screenwriter or Production Executive",
          description:
            "A screenwriter creates the story, characters, and dialogue for a film or television series. A production executive reviews scripts and helps decide which stories a production company should develop. They may also work with writers to improve a story before it is produced. These professionals can work with film and television companies, streaming platforms, and advertising agencies.",
        },
        {
          title: "Policy Analyst",
          description:
            "A policy analyst studies problems that affect society and helps organisations decide what to do about them. For example, they might research school funding, road safety, healthcare, or youth employment. They collect information, study the evidence, and prepare reports that government agencies, NGOs, or development organisations can use when making decisions. History and Government can provide useful foundations for this kind of work.",
        },
      ],
      format: "Interactive day-in-the-life cards",
      isPlaceholder: false,
    },
    "future-with-ai": {
      headline: "AI can help review words and ideas, but professionals still need to make important decisions about how they are used.",
      paragraphs: [
        "Artificial intelligence (AI) can help professionals complete certain tasks much faster. For example, AI can edit a first draft of a press release, turn a recorded interview into text, summarise a long document, and translate text between languages. A lawyer may also use AI tools to find information in a large number of legal documents more quickly. But there are important things AI cannot simply take over.",
        "A lawyer still needs to decide which legal argument is appropriate for a particular case and is responsible for the advice they give. A journalist still needs to speak to people, check information, decide what is fair to publish, and understand the human side of a story. A communications professional also needs to understand the audience. A message that works well in one part of Nigeria may not have the same effect somewhere else.",
        "This is why skills such as good judgement, original thinking, communication, relationships, cultural understanding, and responsibility remain important.",
        "AI may handle some of the routine parts of a job, but people still need to decide what questions to ask, check the information, understand the situation, and decide what should happen next.",
        "So, if you are interested in Arts, learning how to use AI and other digital tools can be useful. At the same time, continue developing the skills that technology cannot easily replace, such as thinking clearly, understanding people, communicating well, and making responsible decisions.",
        "The future involves people working with AI, rather than competing against it.",
        "Sources: General AI-and-professions reporting; Africa-focused coverage of AI in media and legal practice.",
      ],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: false,
    },
    "redemptive-impact": {
      headline: "Think of one situation where someone needed help to understand, communicate, learn, or be heard.",
      paragraphs: [
        "Arts skills can affect people's lives in ways that are sometimes easy to overlook.",
        "Think about a business person who signed an agreement without fully understanding what it meant. Think about a student in a very large class who struggled to read but did not get the help they needed. Think about a community whose concerns were not properly communicated, so other people never understood what was happening there.",
        "In situations like these, skills in language, law, teaching, communication, research, and storytelling can make a difference.",
        "Think of one situation where someone could have had a better outcome if they had received the right explanation, information, teaching, or support. Try to be specific. There is no right or wrong answer. Your response will be saved in your Field Action Plan. It can help you remember that choosing Arts is not only about being good at Literature or Government. It is also about the kinds of problems you want to help solve and the people you want to help.",
        "Reflection: Write one sentence: Name a situation where someone needed better information, communication, teaching, legal help, or someone to speak up for them.",
      ],
      format: "Prompt + text input",
      isPlaceholder: false,
    },
  },

  commercial: {
    foundation: {
      headline: "Commercial is the study of how businesses and economies work, from money and prices to buying and selling.",
      paragraphs: [
        "The Commercial stream helps you understand how businesses and economies work. It covers how money is recorded, how prices are set, how goods and services are bought and sold, and how businesses know whether they are making or losing money.",
        "In the Nigerian SSCE and JAMB system, common Commercial subjects include Financial Accounting, Economics, and Commerce. English Language and Mathematics are compulsory for all students. Depending on your school and the course you want to study, you may also take subjects such as Government, Further Mathematics, Insurance or Office Practice.",
        "Each subject helps you understand a different part of the world of business.",
        "Financial Accounting teaches you how to record and understand the financial activities of a business. It is an important foundation for Accountancy and can also prepare you for professional accounting qualifications such as ICAN. The double-entry accounting you learn in secondary school is also used in university accounting courses, although university work goes much deeper.",
        "Economics helps you understand why people, businesses, and governments make certain economic decisions. You learn about things such as prices, supply and demand, markets, and how resources are used. Economics can lead to courses such as Economics, Banking and Finance, Insurance, and Actuarial Science.",
        "Commerce focuses on how businesses operate and how goods and services move from producers to consumers. It can provide a useful foundation for areas such as Business Administration, Marketing, Procurement, and Logistics.",
        "Mathematics is also very important. Some students underestimate how much Mathematics is used in Commercial courses, which can involve much more mathematics than you may expect from secondary-school.",
        "So, think about both your interests and your strengths. If you enjoy Accounting and Commerce but find Mathematics difficult, you may want to explore courses where advanced Mathematics is less central. If you enjoy Mathematics as well, you can also explore courses that make greater use of numbers, statistics, and financial analysis.",
        "Always check the specific JAMB requirements for the course you want to study before choosing your subjects.",
      ],
      format: "Tap-to-reveal cards",
      isPlaceholder: false,
    },
    "societal-impact": {
      headline: "Nigeria has around 39.6 million micro, small and medium businesses — they are 46% of GDP and nearly 88% of all employment.",
      paragraphs: [
        "Nigeria has millions of micro, small, and medium enterprises (MSMEs). They include businesses such as provision stores, tailoring businesses, POS businesses, building-material shops, food businesses, and many others.",
        "These businesses provide goods and services, create jobs, and support families and communities. This means that the skills you learn in the Commercial stream can be useful for both small and large businesses.",
        "A business can struggle when the owner does not keep proper records, sets prices without knowing the real cost, spends business money without tracking it, or cannot tell the difference between sales, cash, and profit.",
        "For example, a business owner may have ₦100,000 in the business account and think the business made ₦100,000. But that money may still be needed to buy more stock, pay workers, cover transport costs, or pay other expenses. Without proper records, it can be difficult to know how much the business actually made.",
        "This is one reason Commercial subjects matter. They can teach you how to understand the numbers behind a business and use that information to make better decisions.",
        "The reality is that Nigeria has many businesses and government agencies, so a person who can look at their records and provide advice is essential.",
        "Sources: SMEDAN / National Bureau of Statistics National MSME Survey; PwC MSME Survey 2024.",
      ],
      format: "Data scroll with live stats",
      isPlaceholder: false,
    },
    evolution: {
      headline: "Business has moved from paper records and bank queues to digital payments, fintech, and real-time data.",
      paragraphs: [
        "In the past, many businesses relied heavily on paper records, calculators, physical bank branches, and long queues. Getting some financial services could also be difficult, especially for people living far from bank branches.",
        "Technology has changed this. Nigeria's banking sector went through major changes after the 2005 bank consolidation. Later, new systems for identifying customers and making payments helped more people access financial services.",
        "Agent banking also changed how people use financial services. Instead of travelling to a bank branch, people can now carry out many basic transactions through agents and POS businesses in their communities.",
        "Then came the rapid growth of fintech, which uses technology to provide financial services. Companies such as Paystack, Flutterwave, Moniepoint, and OPay have helped businesses accept digital payments and access other financial services.",
        "Today, a small business can receive payments digitally and keep financial records using software. Some information that once had to be calculated or recorded by hand can now be produced automatically.",
        "Commercial professionals may increasingly work with spreadsheets, data, digital payments, financial technology, fraud prevention, compliance, and tax systems. They may work not only in banks and traditional businesses, but also in technology and fintech companies.",
        "So, if you choose the Commercial stream, learning how to use digital tools while also understanding how businesses and financial systems work can help you stay useful as the world of business continues to change.",
        "Sources: Central Bank of Nigeria payments and financial inclusion policy history; Nigerian fintech sector reporting.",
      ],
      format: "Scrubbable timeline",
      isPlaceholder: false,
    },
    "job-roles": {
      headline: "Five Commercial careers in Nigeria, and what the work can look like day to day",
      paragraphs: [
        "Here are five examples of Commercial careers and what people in these roles actually do day to day.",
      ],
      roles: [
        {
          title: "Chartered Accountant / Auditor",
          description:
            "An auditor checks a company's financial records to see whether they accurately show what is happening in the business. They may examine transactions, compare records, check samples of payments, and ask questions when something does not look right. They can work with audit firms, banks, manufacturers, government agencies, and other organisations. Professional qualifications such as ICAN or ACCA can be part of the career path. Financial Accounting in secondary school provides an early foundation for this field.",
        },
        {
          title: "Financial Analyst",
          description:
            "A financial analyst studies financial information to help a company or investor make decisions about money. They may compare business results, build spreadsheets and financial models, and estimate what could happen in the future. Their work can help answer questions such as, \"Should we invest in this business?\" or \"Is this project likely to make money?\" Financial analysts can work in banks, investment companies, businesses, and technology companies. Mathematics and Economics can provide useful foundations.",
        },
        {
          title: "Tax Consultant",
          description:
            "A tax consultant helps individuals and businesses understand how much tax they are required to pay and how to meet their tax obligations. They may prepare tax returns, explain tax rules, and advise businesses on how different decisions may affect their taxes. They can work in professional services firms or as part of a company's finance team. This career requires a good understanding of tax laws, accounting, and financial records.",
        },
        {
          title: "Supply Chain and Procurement Officer",
          description:
            "A supply chain or procurement officer helps an organisation get the goods and services it needs. They may find suppliers, compare prices, negotiate with suppliers, track stock, and follow up when a delivery is late. They can work in manufacturing, retail, oil and gas, telecommunications, NGOs, and many other organisations. Commerce provides a useful foundation because it helps you understand how goods and businesses move from one place to another.",
        },
        {
          title: "Business Development Manager",
          description:
            "A business development manager helps an organisation find new customers, clients, or business partners. They may research potential customers, build relationships, present the organisation's products or services, and negotiate agreements. They also track targets to see how much new business they are bringing in. This role is common in areas such as banking, technology, logistics, and manufacturing and combines communication, relationship-building, and business skills.",
        },
      ],
      format: "Interactive day-in-the-life cards",
      isPlaceholder: false,
    },
    "future-with-ai": {
      headline: "AI can handle many routine financial tasks, but professionals still need to check the results and make important decisions.",
      paragraphs: [
        "Commercial work is one area where AI and automation are already changing some tasks.",
        "For example, accounting software can now sort transactions, match payments with records, create invoices, and identify transactions that may need further checking. These tasks used to require more manual work.",
        "This means that jobs focused mainly on entering figures or performing simple repetitive tasks may change as more businesses use technology but technology does not remove the need for people.",
        "Imagine that a system flags a payment as unusual. Someone still needs to check it. Is it actually fraud, or is it a legitimate payment that simply looks different from the usual pattern?",
        "An auditor still needs to examine financial information and take professional responsibility for their work. A tax consultant may need to understand a tax rule and explain how it applies to a particular situation. A business adviser may also need to have a difficult conversation with a business owner and explain that a particular part of the business is losing money.",
        "These situations require more than processing numbers. They require analysis, judgement, communication, negotiation, trust, and responsibility.",
        "The future of Commercial work will involve more technology. Learning to work with that technology can help you prepare for the changes ahead.",
      ],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: false,
    },
    "redemptive-impact": {
      headline: "Think of one business or organisation where better financial or business skills could have made a difference.",
      paragraphs: [
        "Commercial skills can affect businesses in simple but important ways. Sometimes a business succeeds because someone understood the numbers early enough to make a good decision. Sometimes a business struggles because nobody knew what the numbers were saying.",
        "Think about a shop that was always busy but later closed because the owner was selling products for less than they cost or a government agency where money went missing because there were no proper records and a family business that struggled after the owner died because only one person knew how the business was managed.",
        "These are examples of problems that people with skills in Accounting, Finance, Business, Procurement, or Management can help prevent or solve.",
        "Can you remember a business, shop, group, or organisation that lost money, closed, or faced a problem because of poor financial or business decisions?",
        "There is no right or wrong answer, and this is not graded. Your response will be saved in your Field Action Plan. It can help you connect the Commercial stream to a real problem you have seen, rather than thinking about it only as \"I am good at Accounting.\"",
        "Reflection: Write one sentence: Name a business you know of that lost money, closed, or faced a business problem that better financial or business skills might have helped prevent.",
      ],
      format: "Prompt + text input",
      isPlaceholder: false,
    },
  },

  technical: {
    foundation: {
      headline: "Technical education is about understanding how built things work and learning how to make, install and maintain them.",
      paragraphs: [
        "Technical education focuses on the practical systems people use every day: buildings, vehicles, machines, electricity, and other equipment. In Nigeria, it is taught through technical colleges and programmes that can lead to NABTEB examinations, as well as through related technical subjects in secondary school.",
        "Common subjects include Technical Drawing, Basic Electricity, Auto Mechanics, Building Construction, Woodwork and Metalwork. Physics and Mathematics are also important because they help you understand how these systems work and how to work with them safely and accurately.",
        "Technical Drawing teaches you how to read and create drawings used in areas such as Architecture, Civil Engineering, Quantity Surveying and product design. These ideas are now also used with CAD software, which professionals use to create and modify technical drawings on computers.",
        "Basic Electricity can lead into areas such as electrical installation, electronics, power systems, solar energy and inverter systems.",
        "Physics and Mathematics are useful because you apply them to real problems. For example, you may use measurements and calculations to choose the right cable, calculate the size of a structure, or work out how much power a system needs.",
        "There are several routes after secondary school. You can continue through a technical or vocational programme, attend a polytechnic for an ND and HND, pursue further education, or develop a trade through certified training and practical experience. Some technical professionals can also pursue registration with COREN, depending on their qualification and professional category.",
        "Technical education is sometimes treated as less important than university education but technical skills are needed to build, install, repair and maintain many of the systems people depend on.",
        "If you enjoy working with your hands, drawings and real-world problems, a technical or technology-focused route may suit you. You do not have to decide everything now. Explore the different technical careers and the qualifications they require before choosing your next step.",
      ],
      format: "Tap-to-reveal cards",
      isPlaceholder: false,
    },
    "societal-impact": {
      headline: "About 86.8 million Nigerians had no access to electricity in 2023 — the largest number of any country in the world",
      paragraphs: [
        "The World Bank's Tracking SDG7 report for 2025 found that about 86.8 million Nigerians did not have access to electricity in 2023. Nigeria had the largest number of people without electricity access of any country in the world.",
        "This can mean a barber cannot work when there is no power or fuel for a generator. A business owner may lose goods when a freezer stops working. A student may struggle to study at night. A clinic may need a reliable power system to keep important equipment running.",
        "This is where technical skills become important. Nigeria uses many machines and systems that need to be installed, maintained and repaired. Solar systems, generators, inverters, boreholes, vehicles and industrial machines all need people who understand how they work.",
        "Technical work is not only about fixing things after they break. It also involves installing systems correctly, testing them, maintaining them and helping people choose the right equipment for their needs.",
        "This means that practical skill, proper training, safety knowledge and recognised certification can make a real difference. The country needs people who can work with physical systems and keep them running. If you develop strong technical skills and combine them with good training, communication and business skills, you can solve real problems and create opportunities for yourself and others.",
      ],
      format: "Data scroll with live stats",
      isPlaceholder: false,
    },
    evolution: {
      headline: "Today, it is not enough to feel the machine’s fault, you also need to know how to read it.*",
      paragraphs: [
        "Technical work has changed a lot as technology has become part of everyday equipment.",
        "Think about a modern car. Older cars depended more heavily on mechanical parts that a mechanic could inspect, adjust and repair directly. Many modern cars also contain computers, sensors and electronic systems. A technician now needs to connect diagnostic equipment, read fault codes and understand what the information means before deciding what to repair.",
        "Electricity has also become more complex. A home or business may use a combination of grid electricity, a generator, an inverter, batteries and solar panels. Installing one part correctly is not enough. The technician needs to understand how the whole system works together.",
        "This means today's technical professionals need more practical ability. You may also need to read manuals, understand technical drawings, use diagnostic software, record information and work with digital tools.",
        "New opportunities are also growing in areas such as solar and battery systems, industrial automation, equipment maintenance, building services and electric vehicles.",
        "The hands-on skill combined with technical knowledge and digital skills is highly valuable. These skills can help you work with the technology that is already changing the industry.",
        "Sources: World Bank Tracking SDG7 2025 on off-grid and mini-grid growth; NBTE curriculum revisions; Nigerian automotive and solar sector reporting.",
      ],
      format: "Scrubbable timeline",
      isPlaceholder: false,
    },
    "job-roles": {
      headline: "Five technical careers in Nigeria, and what the work might involves.",
      paragraphs: [
        "Here are five examples of technical careers in Nigeria and what the work actually involves.",
      ],
      roles: [
        {
          title: "Solar Installation Technician",
          description:
            "Assesses the power needs of a home, clinic or business and chooses the right combination of solar panels, inverter and batteries. The technician then installs the system safely and maintains it. Correct sizing is important because a system that is too small or poorly configured may not meet the user's needs. Technicians can work for renewable energy companies, take on contracts or work independently. Basic Electricity and Physics provide a useful foundation.",
        },
        {
          title: "Automotive Diagnostic Technician",
          description:
            "Uses diagnostic equipment to connect to a vehicle's computer and read fault codes. The technician then works out what is actually causing the problem before carrying out the repair. Modern vehicles contain many electronic systems, so understanding diagnostics is an important part of the job. These technicians can work in dealership workshops, transport and logistics companies, fleet operations or independent garages.",
        },
        {
          title: "Electrical Installation Technician",
          description:
            "Installs and maintains electrical systems in buildings. This can include distribution boards, cables, changeover systems and protection equipment. The technician must follow safety standards because poor electrical work can cause serious damage, injury or fire. They can work with construction companies, facility management companies, hotels, hospitals and manufacturers.",
        },
        {
          title: "Certified Fabricator",
          description:
            "Joins and shapes metal according to specific measurements, designs and safety standards. In industries such as oil and gas, construction and shipping, fabricating work must meet recognised standards and pass inspections. Proper training and certification can therefore open opportunities that may not be available to someone without them. Fabricators can work in fabrication yards, oil servicing companies and construction.",
        },
        {
          title: "CAD Technician / Draughtsman",
          description:
            "Turns designs from engineers or architects into accurate technical drawings that workers can use to build or manufacture something. They use software such as AutoCAD or Revit to create and update these drawings. Much of the work is done on a computer, although the drawings may be used on construction or production sites. This career builds directly on skills developed through Technical Drawing. CAD technicians and draughtsmen can work with architecture and engineering firms, construction companies and manufacturers.",
        },
      ],
      format: "Interactive day-in-the-life cards",
      isPlaceholder: false,
    },
    "future-with-ai": {
      headline: "AI can help identify a problem, but a professional still has to do the physical work and take responsibility for the result.",
      paragraphs: [
        "AI and digital tools are already changing technical work. Vehicle diagnostic software can read fault codes and help technicians narrow down possible problems. Solar design tools can help calculate the size of a system based on how much power a home or business needs. A technician working on an unfamiliar machine can also use digital tools to find manuals and repair instructions quickly.",
        "This means some knowledge that technicians once had to memorise can now be found more easily with technology.",
        "But technical work still has a physical side that software cannot do. A technician may notice something that a computer does not recognise, such as unusual heat, a strange sound or a problem that was not included in the available data.",
        "Safety also matters, deciding whether an electrical system is safe to use, whether a structure can carry a particular load or whether a repair has been done properly. These decisions can affect people's homes, businesses and lives.",
        "So the valuable skills are changing. Understanding how things work, solving problems, working safely, using digital tools and having proper training and certification become even more important.",
        "AI has become a useful assistant for technical professionals, not a replacement for the person doing the physical work. If you choose this stream, learn both the hands-on skills and the digital tools used in your field.",
        "Sources: General AI-and-trades analysis; Africa-focused renewable energy workforce reporting.",
      ],
      format: "Swipe: AI replaces / AI augments / AI creates",
      isPlaceholder: false,
    },
    "redemptive-impact": {
      headline: "Think of one thing you know that stopped working and stayed broken because nobody around could fix it.",
      paragraphs: [
        "Technical skills can change outcomes that people can see and experience directly. A machine can work or stop working. A building can be safe or unsafe. A power system can keep working or leave a home, business or clinic without electricity.",
        "Think about a clinic where a vaccine fridge stopped working because its power system was not properly maintained or a school where a solar system stopped working because it was poorly installed and nobody knew how to maintain it and a building where unsafe electrical work created a serious fire risk.",
        "These are technical problems, and trained people can help prevent or solve them.",
        "Instead of writing something general like \"technical skills are important for development,\" think about a specific problem you have actually seen. Maybe a borehole near you stopped working and has not been repaired or a generator has been sitting unused because nobody nearby knows how to fix it or a vehicle keeps breaking down because the real problem has never been properly diagnosed.",
        "Your task is to identify the problem and connect it to the kind of technical skill that could help solve it.",
        "There is no correct answer, and this is not graded. Your response will be saved to your Field Action Plan as a record of the problems you noticed and why this stream interests you.",
        "Reflection: Write one sentence: Name one thing near you, such as a machine, building, power system or vehicle, that broke and stayed broken because nobody around had the skill to fix it properly.",
      ],
      format: "Prompt + text input",
      isPlaceholder: false,
    },
  },
};