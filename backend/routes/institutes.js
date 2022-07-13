const data = [
  "ADA University",
  "AE high school",
  "AGH University of Science and Technology",
  "Aalto University",
  "Adobe Systems",
  "Affiliated High School of Fujian Normal University",
  "Ahsanullah University of Science and Technology",
  "Ain-shams university",
  "Ains shams universty",
  "Ajou University",
  "Al Akhawayn University",
  "Al-Baath University",
  "Al-Zaytoonah University of Jordan",
  "Aleppo University",
  "Alexandru Ioan Cuza University",
  "Allame Helli",
  "AlternativaPlatform",
  "American International University Bangladesh",
  "American University in Bulgaria",
  "American University of Armenia",
  "American University of Beirut",
  "Amirkabir University of Technology",
  "Amrita School of Engineering",
  "Amrita Vishwa Vidyapeetham",
  "Amur State University",
  "Arab Academy for Science and Technology",
  "Ashgabat, Bashkent TTHS",
  "Assiut University",
  "Astrakhan state university",
  "Ateneo de Naga University",
  "Atlantik Ahmet Ulusoy College",
  "Atlantik College",
  "Azhar University",
  "Babe\xc8\x99-Bolyai University",
  "Baku Turkish Private High School",
  "Bandung Institute of Technology",
  "Bangladesh University",
  "Barazandeh Moghadam",
  "Barnaul, Gymnasium 42",
  "Bauman MSTU",
  "Begum Rokeya University, Rangpur",
  "Beihang University",
  "Beijing Institute of Technology",
  "Beijing JiaoTong University",
  "Beijing Normal University, Zhuhai",
  "Beijing University of Posts and Telecommunications",
  "Beijing, BUAA",
  "Belarussian SUIR",
  "Belgrade, School of Electrical Engineering",
  "Benem\xc3\xa9rita Universidad Aut\xc3\xb3noma de Puebla",
  "Bilkent University",
  "Binus University",
  "Black Sabbath",
  "Black organization",
  "Bogazici University",
  "Brac University",
  "Brest, Gymnasium 1",
  "British University In Egypt",
  "Brown University",
  "Buryat State University",
  "Business Information System - Helwan University",
  "C.N. Liviu Rebreanu Bistrita",
  "CN Fratii Buzesti",
  "CN Unirea Tg Mures",
  "CNILC Ploiesti",
  "CNMV PLOIESTI",
  "CS Academy",
  "CTU in Prague",
  "Cairo University",
  "Can Tho University",
  "Carnegie Mellon University",
  "Caucasus University",
  "Central South Univercity",
  "Central South University",
  "ChangAn university",
  "Changchun University of Science and Technology",
  "Changchun, HSANNU",
  "Changjun High School",
  "Changsha University of Science and Technology",
  "Changzhou Senior High School of Jiangsu Province",
  "Changzhou University",
  "Charles University in Prague",
  "Chechens Association",
  "Chelyabinsk, FML 31",
  "Chelyabinsk, Lyceum\xe2\x84\x9631",
  "Chengdu No.7 High School",
  "Chengdu University of Information Technology",
  "Chennai Mathematical Institute",
  "Cherkasy National University",
  "Cherkasy Physics and Mathematics Lyceum",
  "Chicken University",
  "China Rome organization",
  "China University of Geosciences",
  "China University of Petroleum",
  "Chittagong University of Eng and Tech",
  "Chongqing Bashu Middle School",
  "Chongqing University",
  "Christ University,Bangalore",
  "Chu Van An High School",
  "Chulalongkorn University",
  "Chung Ling High School, Penang",
  "Chuyen Phan Boi Chau",
  "ChuyenYb",
  "Citrix Systems",
  "City University, Bangladesh",
  "Clements HS",
  "Colegiul National Mircea cel Batran",
  "Colegiul National Silvania",
  "College Of Engineering , Guindy",
  "College of Engineering, Guindy",
  "Comenius University",
  "Comilla University",
  "Cornell University",
  "Ctg Cantonment Public College",
  "DCRUST Murthal",
  "DIT University",
  "Da Nang University of Technology",
  "Daffodil International University",
  "Dalian Maritime University",
  "Damascus university",
  "Danang University of Technology",
  "Danderyds Gymnasium",
  "Danyang High School",
  "Daryn",
  "Dept Of Civil Engineering, BUET",
  "Dhaka City College",
  "Dhaka Residential Model College",
  "Dhaka University of Engineering and Technology",
  "Dnepropetrovsk, DOLIFMP",
  "Donetsk NU",
  "Donghua University",
  "Double Ten High School",
  "Duta Wacana CU",
  "Duy Tan University",
  "Dwarkadas J. Sanghvi College of Engineering",
  "East China Jiaotong University",
  "East China University of Science and Technology",
  "East West University",
  "Ecole Nationale Sup\xc3\xa9rieur d'Arts et M\xc3\xa9tiers",
  "Ekaterinburg, SESC UFU",
  "Escuela Superior de C\xc3\xb3mputo",
  "FACENS - Faculdade de Engenharia de Sorocaba",
  "FEE-Faculty of Electronic Engineering",
  "FMI, Universitatea Bucuresti",
  "FPT University",
  "Far Eastern FU",
  "Fatih Koleji Bilgisayar Olimpiyat Tak\xc4\xb1m\xc4\xb1",
  "Federal University of Bahia",
  "Federal University of Campina Grande",
  "Federal University of Minas Gerais (UFMG)",
  "Federal University of S\xc3\xa3o Carlos",
  "Federal University of Uberl\xc3\xa2ndia",
  "Ferdowsi University of Mashhad",
  "Foreign Language Specialised School - CNN",
  "France-IOI",
  "Free University of Tbilisi",
  "FuZhou university",
  "Fudan University",
  "Fujian Changle No.1 Middle School",
  "Fundaci\xc3\xb3n Universidad Del Norte",
  "Fuzhou No.3 High School",
  "Gadjah Mada University",
  "Gautam Buddha University",
  "Georgia Institute of Technology",
  "Georgia Tech",
  "German University in Cairo",
  "Guangdong University of Foreign Studies",
  "Guangdong University of Technology",
  "Guru Gobind Singh Indraprastha University",
  "Gyeonggi Science High School",
  "Gymnasium Svetozar Markovi\xc4\x87 Ni\xc5\xa1",
  "Gymn\xc3\xa1zium Brno, t\xc5\x99\xc3\xadda Kapit\xc3\xa1na Jaro\xc5\xa1e",
  "Gymn\xc3\xa1zium Jura Hronca",
  "HCMUS, High School for The Gifted",
  "HKL, Dushanbe",
  "HL High School For Gifted Student",
  "HNUE High School for Gifted Students",
  "HY Specialized High School",
  "Ha Noi Open University",
  "Hajee Mohammad Danesh Sci. and Tech. University",
  "Haldia Institute Of Technology",
  "HangZhou Foreign Language School",
  "Hangzhou No.2 High School",
  "Hangzhou Normal University",
  "Hangzhou Xuejun High School",
  "Hanoi University of Science and Technology",
  "Hanoi-Amsterdam High School",
  "Hanyang University",
  "Harbin Engineering University",
  "Harbin Institute of Technology",
  "HeFei University of Technology",
  "Hefei No1 High School , China",
  "Heilongjiang University",
  "Helwan University, Faculty of Computer Science",
  "Henan Experimental High School",
  "Heritage Institute Of Technology",
  "High School affiliated to Fudan University",
  "High School for Gifted students of Vinh University",
  "High school at Komaba, University of Tsukuba",
  "Higher Technological Institute 10th Of Ramadan",
  "Ho Chi Minh City University of Science",
  "Ho Chi Minh University of Science",
  "Hong Kong University of Science and Technology",
  "Huazhong University of Science and Technology",
  "Hunan University of Science and Technology",
  "Hunan university of arts and science",
  "Huojian CorpTmp",
  "I LO Legnica",
  "IPVCE Luis Urquiza Jorge",
  "IPVCE-Antonio Maceo",
  "IST Austria",
  "ITESM Campus Monterrey",
  "ITESM Queretaro",
  "IUBAT, Uttara, Dhaka",
  "Imperial College London",
  "Indira Gandhi DTUW, Delhi",
  "Industrial University of Ho Chi Minh city",
  "Inha University",
  "Innopolis University",
  "Institute of Science and Technology",
  "Instituto Politecnico Nacional",
  "Instituto Tecnol\xc3\xb3gico de Aeron\xc3\xa1utica",
  "Instituto T\xc3\xa9cnico Salesiano",
  "International High School of Sarajevo",
  "Irkutsk ISRU",
  "Isfahan University of Technology",
  "Islamic University,Bangladesh",
  "Issyk Kazakh-Turkish High School",
  "Istanbul Technical University",
  "JSS Academy of Technical Eduction, Noida",
  "Jabalpur Engineering College",
  "Jagiellonian University",
  "Jahangirnagar University",
  "Japan NEET University",
  "Jessore University Science and Technology",
  "Jiangxi University of Science and Technology",
  "Jilin University",
  "Johns Hopkins University",
  "Jose Faustino Sanchez Carrion National University",
  "K. J. Somaiya College of Engineering, Mumbai",
  "Kaisei High School",
  "Kaohsiung Senior High School",
  "Karlsruhe Institute of Technology",
  "Karp-Chant No.1 High School",
  "Kasetsart University",
  "Kaunas TU",
  "Keio University",
  "Khakas SU",
  "Khanty-Mansiysk, UPML",
  "Khulna University of Engineering and Technology",
  "Khust Gymnasium",
  "Kiev, UPML",
  "Kim Il Sung University",
  "Kobe-University",
  "Korea University",
  "Kremenchug, POLIT",
  "Krishna Institute Of Engineering And Technology",
  "Kyoto University",
  "La Martiniere for Boys",
  "Lancaster University",
  "LangPrism",
  "Lausanne, EPFL",
  "Le Hong Phong High school",
  "Le Quy Don gifted High School",
  "Leading University, Sylhet",
  "Lebanese American University",
  "Leshan NU",
  "Liceo Scientifico F. Lussana",
  "Liceul A\xc8\x98M",
  "Liceul Mihail Kogalniceanu Vaslui",
  "Liceul Stefan Procopiu Vaslui",
  "Licey 174",
  "Liuzhou Highschool",
  "Lodz University of Technology",
  "Looksery",
  "Losers Club",
  "Lovely Professional University",
  "Lviv Polytechnic National University",
  "MAN Insan Cendekia Serpong",
  "MG Baba Tonka Ruse",
  "MSU Tashkent",
  "MSU named by M.V.Lomonosov",
  "Magnitogorsk STU",
  "Magtymguly State University",
  "Mahidolwiittayanusorn school",
  "Malek D4nce Club",
  "Massachusetts Institute of Technology (MIT)",
  "Medell\xc3\xadn, EAFIT",
  "Meiji University",
  "MetaDesign Solutions",
  "Mianyang Nanshan High School",
  "Microsoft",
  "Military Institute of Science and Technology",
  "Minsk, Lyceum BSU",
  "Mita Senior High School",
  "Modern Academy For Engineering and technolngy",
  "Mofid High School",
  "Monash University",
  "Moscow Chemical Lyceum",
  "Moscow Institute of Physic and Technology",
  "Moscow State University",
  "Mytishchi Programming School",
  "NPU Middle School",
  "Nagoya University",
  "Nanchang University",
  "Nanjing University",
  "Nankai University",
  "Nanyang Technological University",
  "Nara Institute of Science and Technology",
  "Nasca Ltd",
  "National Central University",
  "National Chiao Tung University",
  "National Chung Cheng University",
  "National College of Computer Science Tudor Vianu",
  "National Taipei University",
  "National Taiwan University",
  "National Tsing Hua University",
  "National University of Colombia",
  "National University of Defense Technology",
  "National University of Singapore",
  "National university of Mongolia",
  "Nazarbayev University",
  "New Bulgarian University",
  "New York University",
  "New Zealand Olympiad in Informatics",
  "Newcastle University",
  "Newspaper",
  "Niigata University",
  "Nikan High School",
  "Ningbo University",
  "Nizhnekamsk ICT",
  "Nizhny Novgorod SU",
  "North South University",
  "North-Caucasus FU",
  "North-Eastern Federal University",
  "Northeast Forestry University",
  "Northeast Normal University",
  "North East University Sylhet, Bangladesh",
  "Norwegian University of Science and Technology",
  "Notre Dame College",
  "Novosibirsk SU",
  "Novosibirsk, Gymnasium \xe2\x84\x961",
  "Ocean University of China",
  "Odessa National Polytechnic University",
  "Ohio State University",
  "Okinawa National College of Technology",
  "Orenburg State University",
  "Osaka University",
  "PBBS Bandung",
  "PCOI, Hong Kong",
  "PEC University of Technology",
  "PES Institute of Technology",
  "PNT YURI KONDRATYUK UNIVERSITY",
  "Pabna University of Science and Technology",
  "Pacific Fish University",
  "Pasargad University",
  "Pavlodar, school-lyceum 8",
  "Payame Noor University of Mashhad",
  "Peking University",
  "Phillips Exeter Academy",
  "Phisical and Mathymayical lyceum",
  "Phystech-lyceum",
  "Pillai Institute of Information Technology",
  "Pontificia Universidad Cat\xc3\xb3lica Madre y Maestra",
  "Pontificia Universidad Cat\xc3\xb3lica del Per\xc3\xba",
  "Poornima College Of Engineering",
  "Princeton University",
  "Prva kragujevacka gimnazija",
  "Purdue University",
  "Qingdao No.2 Middle School",
  "Quang Trung High School",
  "Quang Trung Specialized and Gifted High School",
  "Quanzhou No.7 High School",
  "Queen's University",
  "Quoc Hoc High School",
  "RV college of engineering",
  "Radboud University Nijmegen",
  "Rajshahi University of Engineering and Technology",
  "Renmin University of China",
  "Royal Institute of Technology",
  "Russian-Armenian University",
  "Rutgers School of Engineering",
  "Rybinsk, Lyceum 2",
  "Ryukoku University",
  "SASTRA University",
  "SPb Electrotechnical University",
  "SSN College Of Engineering",
  "Sadjad University of Technology",
  "Saint Petersburg State University",
  "Salam IranZamin",
  "Samanyolu Bilgisayar Olimpiyat Toplulu\xc4\x9fu",
  "Saratov State University",
  "Semnan University",
  "Seoul National University",
  "Sevastopol State University",
  "Shahid Babaee school, Qazvin",
  "Shahid Bahonar University of Kerman",
  "Shahid Beheshti University",
  "Shahjalal University of Science and Technology",
  "Shahrood University of Technology",
  "Shandong University",
  "Shanghai University",
  "ShanghaiTech University",
  "Shanglin middle school",
  "Shantou Jinshan High School",
  "Shaoxing No.1 High School",
  "Sharif University of Technology",
  "Sheikhbahaee University",
  "Shenyang University of Technology",
  "Shenzhen University",
  "Shiraz University",
  "Shishi High School",
  "Shiv Nadar University",
  "Shizuoka University",
  "Shkola Shikovi",
  "Shoubra Faculty of Engineering",
  "Shri Mata Vaishno Devi University (SMVDU)",
  "Siberian state university TI",
  "Sichuan University",
  "Sir M. Visvesvaraya Institute of Technology",
  "Sofia University",
  "Sogang University",
  "Soochow University",
  "South China Algorithm University",
  "South Ural State University",
  "Southeast University",
  "Southern FU (Taganrog)",
  "Southwest University",
  "Southwest jiaotong university",
  "Sreenidhi Institute(JNTU)",
  "Stanford University",
  "Starokostyantinovska Gimnasia",
  "State University of Bangladesh",
  "Stony Brook University",
  "Suankularb Wittayalai School",
  "Sun Yat-Sen Memorial Middle School",
  "Swiss Olympiad in Informatics",
  "Sylhet Engineering College",
  "Syrian Virtual University",
  "Taizhou University",
  "Tajik Turkish Hoji Kamol High School",
  "Taldykorgan Kazakh-Turkish High School",
  "Tanta University",
  "Tashkent U of IT",
  "Technical University of Cluj-Napoca",
  "Technical University of Iasi",
  "Telkom University",
  "The Affiliated High School of Shanxi University",
  "The American University in Cairo",
  "The Enot's Team",
  "The F.M.S in Changsha",
  "The Hashemite University",
  "The Mongolian University of Science and Technology",
  "The Nhan - VN",
  "The University of Hong Kong",
  "The University of Tokyo",
  "Thebes Academy",
  "Tianjin Nankai High School",
  "Tianjin No.1 High School",
  "Tianjin Polytechnic University",
  "Tianjin University",
  "Timber Creek High School",
  "Tokyo Hot",
  "Tomsk SU of CSR",
  "Tongji University",
  "Tran Phu High School",
  "Triam Udom Suksa School",
  "TriamUdomSuksa School",
  "Tsinghua University",
  "Tulskii Gu",
  "Tunisia Polytechnic School",
  "Turgut Ozal Turkmen Turkish High School",
  "UFG - Universidade Feredal de Goias",
  "United International University",
  "University Visvesvaraya College of Engineering",
  "University at Buffalo, SUNY",
  "University of Aizu",
  "University of Alexandria, Faculty of Engineering",
  "University of Asia Pacific",
  "University of Bergen",
  "University of Bologna",
  "University of Brasilia",
  "University of Bristol",
  "University of Bucharest",
  "University of Calgary",
  "University of California, Berkeley",
  "University of California, San Diego",
  "University of Cambridge",
  "University of Cape Town",
  "University of Central Florida",
  "University of Chicago",
  "University of Chinese Academy of Sciences",
  "University of Chittagong",
  "University of Dhaka",
  "University of Edinburgh",
  "University of Engineering and Technology",
  "University of Florida",
  "University of Havana",
  "University of Helsinki",
  "University of Illinois at Urbana-Champaign",
  "University of Indonesia",
  "University of Isfahan",
  "University of Jinan",
  "University of Jordan",
  "University of Latvia",
  "University of Ljubljana",
  "University of Manchester",
  "University of Michigan",
  "University of Minnesota",
  "University of Moratuwa",
  "University of New South Wales",
  "University of Oxford",
  "University of Pennsylvania",
  "University of Science and Technology of China",
  "University of Southampton",
  "University of Southern California",
  "University of Surabaya",
  "University of Sydney",
  "University of S\xc3\xa3o Paulo",
  "University of Tabriz",
  "University of Tartu",
  "University of Tehran",
  "University of Texas at Austin",
  "University of Tokyo",
  "University of Toronto",
  "University of Tsukuba",
  "University of Virginia",
  "University of Warsaw",
  "University of Washington",
  "University of Waterloo",
  "University of Western Australia",
  "University of Wisconsin-Madison",
  "University of Wroc\xc5\x82aw",
  "University of Zagreb",
  "University of the Philippines",
  "Universit\xc3\xa4t des Saarlandes",
  "Urmia University",
  "Utrecht University",
  "Varna High School of Mathematics",
  "Veermata Jijabai Technological Institute",
  "Vellore Institute of Technology,Vellore",
  "Viet Nam National University",
  "Vilnius Gediminas Technical university",
  "Vilnius University",
  "Vinh Phuc gifted High School",
  "Vishwakarma Government Engineering College",
  "Visvesvaraya National Institute of Technology",
  "Warsaw School of Computer Science",
  "Warszawa, XIV LO Staszica",
  "Waseda University",
  "Washington University in St. Louis",
  "Wenling High School",
  "Wenzhou Middle School",
  "West University of Timisoara",
  "Wroclaw University of Technologies",
  "Wuhan University",
  "Wuhan University of Science and Technology",
  "Xiamen University",
  "Xiangtan University",
  "Xiaoshan High School",
  "Xidian University",
  "YMCA UST, Faridabad",
  "Yali Middle School",
  "Yamanlar Informatics Society",
  "Yarmouk Private University",
  "Yarmouk University",
  "Yazd University",
  "Yerevan Physmath school",
  "Yerevan State University",
  "Yerevan, Quantum college",
  "Yonsei University",
  "Young Scholars Club",
  "Yuyao High School",
  "Zaporizhia NTU",
  "Zhangping No.1 High School",
  "ZhaoQing University",
  "Zhejiang University of Technology",
  "Zheng Zhou University",
  "Zhengzhou University",
  "Zhenhai High School",
  "Zhongshan(Sun Yat-sen) U",
  "ABES IT Group of Institutions, Ghaziabad",
  "ABV - Indian Institute of Information Technology and Management Gwalior",
  "AWH Engineering College, Calicut",
  "Abes Engineering college, Ghaziabad",
  "Acropolis Institute of Technology & Research, Indore",
  "Ajay Kumar Garg Engineering College, Ghaziabad",
  "Al Akhawayn University,  Ifrane",
  "Ambala College of Engineering and Applied Research, Ambala",
  "Ambedkar Institute of Advanced Communication Technology & Research",
  "Amity School of Engineering and Technology",
  "Amity University, Noida",
  "Amrita School of Engineering, Coimbatore",
  "Anil Neerukonda Institute of Technology and Sciences",
  "Appa Institute Of Engineering and Technology",
  "Army Institute of Technology, Pune",
  "Atharva College of Engineering , Malad",
  "B K Birla Institute of Engineering & Technology, Pilani",
  "B.V. Bhoomaraddi College of Engineering and Technology, Hubli",
  "BMS Institute of Technology, Bangalore",
  "Babasaheb Naik College of Engineering, Pusad",
  "Babu Banarasi Das Educational Society's Group of Institutions",
  "Baddi University of Emerging Sciences and Technologies",
  "Banasthali University",
  "Beijing University of Aeronautics and Astronautics",
  "Bengal Institute of Technology, Kolkata",
  "Bhagwan Parshuram Institute of Technology",
  "Bharati Vidyapeeth College of Engineering, Delhi",
  "Birla Institute Of Technology, Mesra",
  "Birla Institute of Technology & Science Pilani, Goa Campus",
  "Birla Institute of Technology & Science Pilani, Hyderabad Campus",
  "Birla Institute of Technology & Science Pilani, Pilani Campus",
  "Birla Institute of Technology Jaipur",
  "Birla Institute of Technology Mesra",
  "Birsa Institute of Technology, Sindri",
  "Budge Budge Institute of Technology, Calcutta",
  "Chandannagar Banga Vidyalaya Tematha Cngr, Hooghly",
  "Chandigarh College of Engineering & Technology",
  "Chandigarh University",
  "Charotar University of Science and Technology",
  "Cochin University of Science and Technology",
  "College of Engineering, Trivandrum",
  "College of Technology, Pantnagar",
  "Cummins College of Engineering for Women%",
  "Dhirubhai Ambani Institute of Information and Communication Technology",
  "Delhi Public School, Dwarka",
  "Delhi Public School, Faridabad",
  "Delhi Technological University",
  "Dell International Services",
  "Dhaneswar Rath Institute of Engineering and Management Studies, Cuttack",
  "Dharmsinh Desai University, Nadiad",
  "Dwarka International School, Dwarka",
  "Echelon Institute of Technology, Faridabad",
  "Fr. Conceicao Rodrigues College of Engineering, Bandra",
  "G. Narayanamma Institute of Technology and Science, Hyderabad",
  "GD Goenka University, Gurgaon",
  "GD Goenka World Institute",
  "GLA University, Mathura",
  "Galgotias College of Engineering and Technology",
  "Galgotias University",
  "Gautam Buddha University, Greater Noida",
  "Gokaraju Rangaraju Institute of Engineering and Technology, Hyderabad",
  "Goldman Sachs",
  "Government Engineering College, Thrissur",
  "Govind Ballabh Pant Engineering College, New Delhi",
  "Graphic Era University",
  "Guru Tegh Bahadur Institute of Technology, New Delhi",
  "HKBK College of Engineering, Bengaluru",
  "Haldia Institute of Technology, West Bengal",
  "Harcourt Butler Technological Institute, Kanpur",
  "Heritage Institute of Technology, Kolkata",
  "IMS Engineering College, Ghaziabad, Delhi NCR",
  "ITM University, Gwalior",
  "ITMO University",
  "Indian Institute of Engineering Science and Technology, Shibpur",
  "Indian Institute of Information Technology, Allahabad",
  "Indian Institute of Information Technology, Kalyani",
  "Indian Institute of Information Technology, Kolkata",
  "Indian Institute of Space Science and Technology, Thiruvananthapuram",
  "Indian Institute of Technology Bhubaneswar",
  "Indian Institute of Technology Bombay",
  "Indian Institute of Technology Guwahati",
  "Indian Institute of Technology Indore",
  "Indian Institute of Technology Kharagpur",
  "Indian Institute of Technology Madras",
  "Indian Institute of Technology Mandi",
  "Indian Institute of Technology Patna",
  "Indian Institute of Technology Roorkee",
  "Indian School of Mines Dhanbad, Jharkhand",
  "Indira Gandhi Delhi Technical University for Women",
  "Indraprastha Institute of Information Technology, Delhi",
  "Institute of Engineering & Management, Kolkata",
  "Institute of Engineering and Technology, Devi Ahilya Vishwavidyalaya",
  "Institute of Technical Education & Research, Bhubaneswar",
  "Institute of Technology, Nirma University",
  "Integral University",
  "International Institute of Information Technology, Bangalore",
  "International Institute of Information Technology, Hyderabad",
  "International Institute of Professional Studies, Indore",
  "JRE Group of Institutions, Greater Noida",
  "JSS Academy of Technical Education, Noida",
  "Jadavpur University",
  "Jamia Millia Islamia",
  "Jawaharlal Nehru Technological University, Kakinada",
  "Jawaharlal Nehru Technological University, Vizianagaram",
  "Jaypee Institute of Information Technology",
  "Jaypee University of Engineering and Technology, Guna",
  "Jaypee University of Information Technology",
  "Jodhpur Institute of Engineering & Technology",
  "K. J. Somaiya College of Engineering Vidyanagar, Vidyavihar, Mumbai",
  "KLS Gogte Institute of Technology, Belgaum",
  "Kalinga Institute of Industrial Technology",
  "Kalyani Government Engineering College",
  "Kamla Nehru Institute of Technology, Sultanpur, India",
  "Karpagam College of Engineering, Coimbatore",
  "Karunya University, Coimbatore",
  "Krishna Institute of Engineering and Technology, Ghaziabad",
  "LDRP Institute of Technology & Research, Gandhinagar",
  "LNM Institute of Information Technology",
  "Lal Bahadur Shastri Institute of Management, Delhi",
  "Lalbhai Dalpatbhai College of Engineering, Ahmedabad",
  "M. J. P. Rohilkhand University, Bareilly",
  "M. S. Ramaiah Institute of Technology, Bengaluru",
  "M.H. Saboo Siddik College of Engineering, Mumbai",
  "MIT Academy of Engineering, Pune",
  "Maharaja Agrasen Institute of Technology, New Delhi",
  "Maharaja Surajmal Institute of Technology",
  "Mahatma Gandhi Institute of Technology",
  "Malaviya National Institute of Technology, Jaipur",
  "Manipal Institute of Technology, Manipal",
  "Mar Athanasius College of Engineering, Kothamangalam",
  "Maulana Azad National Institute of Technology, Bhopal",
  "Motilal Nehru National Institute of Technology Allahabad",
  "Mugniram Bangur Memorial Engineering College, Jodhpur",
  "National Institute of Science and Technology, Berhampur",
  "National Institute of Technology Agartala",
  "National Institute of Technology Karnataka",
  "National Institute of Technology Mizoram",
  "National Institute of Technology Patna",
  "National Institute of Technology Raipur",
  "National Institute of Technology Tiruchirappalli",
  "National Institute of Technology, Calicut",
  "National Institute of Technology, Durgapur",
  "National Institute of Technology, Hamirpur",
  "National Institute of Technology, Jalandhar",
  "National Institute of Technology, Jamshedpur",
  "National Institute of Technology, Kurukshetra",
  "National Institute of Technology, Nagaland",
  "National Institute of Technology, Puducherry",
  "National Institute of Technology, Silchar",
  "National Institute of Technology, Uttarakhand",
  "Netaji Subhas Institute of Technology, New Delhi",
  "New Digambar Public School Indore",
  "Noida Institute of Engineering and Technology",
  "Northern India Engineering College, New Delhi",
  "PES College of Engineering, Mandya",
  "PSG College of Technology, Coimbatore",
  "Padre Conceicao College of Engineering, Goa",
  "Pillai Institute of Information Technology, Engineering, Media Studies and Research, Panvel",
  "Pimpri Chinchwad College of Engineering, Pune",
  "Poornima College of Engineering, Jaipur",
  "Poornima Institute of Engineering and Technology, Sitapura",
  "Pranveer Singh Institute of Technology, Kanpur",
  "Prasad V Potluri Siddhartha Institute of Technology",
  "Pune Institute of Computer Technology",
  "Punjab Engineering College, Chandigarh",
  "RCC Institute of Information Technology, Kolkata",
  "RK University, Rajkot",
  "RMD Engineering College, Tamil Nadu",
  "RMK College of Engineering & Technology, Tiruvallur",
  "RMK Engineering College, Tamil Nadu",
  "Raghu Engineering College",
  "Rajdhani College, University of Delhi",
  "Rajiv Gandhi Proudyogiki Vishwavidyalaya",
  "Rajiv Gandhi University of Knowledge Technologies, RK Valley",
  "Ramanujan College, University of Delhi",
  "Rashtreeya Vidyalaya College of Engineering, Bangalore",
  "Rustamji Institute of Technology",
  "SAI International School",
  "SRM University",
  "Sant Longowal Institute of Engineering and Technology",
  "Sardar Patel Institute Of Technology, Mumbai",
  "Sardar Vallabhbhai National Institute of Technology, Surat",
  "Shiv Nadar University, Chithera",
  "Shivaji College, Delhi",
  "Shri Govindram Seksaria Institute of Technology and Science",
  "Shri Mata Vaishno Devi University",
  "Shri Ramswaroop Memorial College of Engineering and Management",
  "Sir M Visveswaraya Institute of Technology, Bangalore",
  "Sir Padampat Singhania University, Udaipur",
  "Sri Manakula Vinayagar Engineering College",
  "Sri Shakthi Institute of Engineering and Technology",
  "Stanley College of Engineering and Technology",
  "Swami Keshvanand Institute of Technology Management & Gramothan",
  "Techno India Salt Lake",
  "Thakur College of Engineering and Technology",
  "Thangal Kunju Musaliar College of Engineering, Kollam",
  "Thapar University",
  "The Scindia School",
  "University Institute of Engineering & Technology, Panjab University",
  "University Institute of Information Technology, Shimla",
  "University of Petroleum and Energy Studies, Dehradun",
  "University of Pune",
  "University of Waterloo, Canada",
  "University School of Information Technology",
  "University Visvesvaraya College of Engineering, Bangalore",
  "VVP Engineering College, Rajkot",
  "Varvakio Piramatiko Gimnasio, Greece",
  "Vasavi College of Engineering",
  "Veer Surendra Sai University of Technology, Orissa",
  "Vellore Institute of Technology, Chennai",
  "Vellore Institute of Technology, Vellore",
  "Veltech Multi Tech Dr.Rangarajan Dr.Sakunthala Engineering College, Chennai",
  "Vishwakarma Government Engineering College, Chandkheda",
  "West Bengal University of Technology",
  "Yeshwantrao Chavan College of Engineering College, Nagpur",
  "YMCA University of Science and Technology, Faridabad",
  "Zakir Hussain College of Engineering and Technology, Aligarh",
  "Manipal University Jaipur",
  "Indian Institute of Technology, Varanasi",
  "Dwarkadas Jivanlal Sanghvi College of Engineering, Mumbai",
  "Baba Saheb Ambedkar Institute of Technology & Management, Faridabad",
  "Ryan International School, Mumbai",
  "Indian Institute of Technology Jodhpur",
  "Beijing No.8 Middle School",
  "Indian Institute of Technology Delhi",
  "Army Public School, Dighi Pune",
  "Reykjavik University",
  "SMTL",
  "Kids Tutorial Ramna, Dhaka",
  "Global College of Technology, Jaipur",
  "Aktobe Kazakh -Turkish High School Aktobe Kazakhstan",
  "SOS Hermann Gmeiner School and College, Bangladesh",
  "Taraz Kazakh - Turkish High School Taraz, Kazakhstan",
  "Tomsk",
  "Higher School of Economics, Russia",
  "Universidad Tecnica de Oruro",
  "Instituto Tecnologico de Santo Domingo",
  "Bangladesh University of Engineering and Technology",
  "Guru Nanak Institute of Technology, Kolkata",
  "Astana Kazakh-Turkish high school for gifted boys",
  "Shymkent KTL Shymkent, Kazakhstan",
  "Faculty of Science of the University of Lisbon",
  "G.B. Pant Engineering College, Pauri",
  "Almaty Kazakh - Turkish High School Almaty Kazakhstan",
  "Matematicheska Gimnaziya Akademik Kiril Popov, Bulgaria",
  "BUBT-Bangladesh University of Business & Technology",
  "Universidade Federal de Itajub\xc3\xa1",
  "Vidyalankar Institute of Technology",
  "Indian Institute of Technology Kanpur",
  "MAOU LMI",
  "Pragmatic Academy, Rangia",
  "Universidad de las Ciencias Inform\xc3\xa1ticas, Havana",
  "Academy of Technology, West Bengal",
  "University of Mumbai",
  "Walchand College of Engineering, Sangli",
  "Info Edge India Ltd.",
  "Institute of Engineering and Technology, Lucknow",
  "Ural Federal University",
  "UNIFESO",
  "Pioneer School of Ariana Tunisia",
  "J.K Institute of Applied Physics and Technology, Allahabad",
  "Madhav Institute of Technology and Science, Gwalior",
  "Indian Institute of Information Technology, Design and Manufacturing, Jabalpur",
  "National Institute of Technology, Rourkela",
  "National Institute of Technology Goa",
  "Taurida National V.I. Vernadsky University",
  "Jaipur Engineering College And Research Centre",
  "Bangalore University",
  'University "Marta Abreu" of Las Villas, Cuba',
  "College of Engineering, Pune",
  "Islamic University of Technology (IUT)",
  "Instituto Tecnologico Superior del Sur de Guanajuato, Mexico",
  "KL University",
  "Metropolitan University, Sylhet",
  "University Institute of Engineering and Technology, Kanpur",
  "Jaypee University Anoopshahr",
  "Ateneo de Manila University",
];

module.exports = data;