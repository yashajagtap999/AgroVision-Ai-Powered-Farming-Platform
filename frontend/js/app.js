// Centralized Multilingual Translations Dictionary (7 Languages)
const TRANSLATIONS = {
    "English": {
        "home": "Home", "discovery": "Discovery", "dashboard": "Dashboard", "ai_advisor": "AI Advisor",
        "login": "Login", "register": "Register", "logout": "Logout", "return_home": "Return Home",
        "backend_online": "Backend Online",
        "sidebar_crop_advisor": "Crop Advisor", "sidebar_scheme_discovery": "Scheme Discovery",
        "sidebar_video_tutorials": "Video Tutorials", "sidebar_ai_matching": "AI Scheme Matching",
        "sidebar_credentials_resume": "Farmer Profile & Report", "sidebar_advisor_bot": "Advisor Bot",
        "sidebar_return_home": "Return Home",
        "hero_badge": "🌱 AI-Powered Farmer Navigator",
        "hero_tagline": "Smart Guidance. Better Harvests. Brighter Future.",
        "hero_desc": "An AI-powered platform helping Indian farmers discover government schemes, calculate benefits, learn modern farming techniques, and receive smart crop recommendations.",
        "start_journey": "Start Your Journey", "explore_features": "Explore Features",
        "active_farmers": "Active Farmers Guided", "subsidies_disbursed": "Subsidies Disbursed",
        "registered_farmers_label": "Active Registered Farmers", "subsidies_unlocked_label": "Subsidy Benefits Unlocked",
        "matching_accuracy_label": "Eligibility Matching Accuracy",
        "features_header": "Explore AgroVision Features", "features_sub": "Powerful AI tools designed to simplify farming and improve productivity.",
        "feature1_title": "Voice-First Assistant", "feature1_desc": "Talk to the AI naturally in Marathi, Hindi, English, and other regional languages. Ask farming questions using your voice and receive instant spoken responses.", "feature1_btn": "Start Talking →",
        "feature2_title": "AI Crop Recommendation", "feature2_desc": "Receive personalized crop recommendations using AI based on soil type, weather conditions, rainfall, pH level, and season.", "feature2_btn": "Recommend Crop →",
        "feature3_title": "Government Scheme Navigator", "feature3_desc": "Find personalized government schemes, subsidies, PM-Kisan benefits, crop insurance, and eligibility details in one place.", "feature3_btn": "Explore Schemes →",
        "feature4_title": "Smart Farming Video Tutorials", "feature4_desc": "Watch multilingual video tutorials on modern farming, disease prevention, irrigation, fertilizer usage, and best agricultural practices.", "feature4_btn": "Watch Videos →",
        "how_it_works_header": "How AgroVision Works", "how_it_works_sub": "Follow 4 simple steps to digitize your farm registry and verify subsidy matchings.",
        "step1_title": "Create Your Profile", "step1_desc": "Enter your phone number, land size, and active crop configurations to register your agricultural dashboard.",
        "step2_title": "Document Vault Scan", "step2_desc": "Upload land titles and state certificates. AI scans and automatically pre-fills parameters using Document OCR scanning.",
        "step3_title": "Match Government Schemes", "step3_desc": "The rules matching engine parses parameters to fetch active central and state-level subsidy offerings immediately.",
        "step4_title": "Credential Resume & Alerts", "step4_desc": "Download your verified Farmer Credentials Resume in PDF, and receive updates about payouts via automatic Twilio SMS.",
        "testimonials_header": "What Farmers Say", "testimonials_sub": "Discover how AgroVision is making agricultural benefits accessible across India.",
        "testimonial_quote": "\"Before using AgroVision, matching eligible credit facilities was a slow, complex guessing game. Now, my certificates are scanned instantly, my profile is verified, and I can download a PDF of my agricultural credentials resume.\"",
        "testimonial_author": "Vikas Patil", "testimonial_location": "Farmer, Maharashtra",
        "faq_header": "Frequently Asked Questions", "faq_sub": "Got questions about AgroVision? We have answers.",
        "faq1_q": "How does AgroVision map scheme eligibility?", "faq1_a": "AgroVision matches your profile metrics (land holding size, irrigation status, state location, and crops grown) directly against a digital rules index covering central initiatives (e.g. PM-KISAN, PM-KMY) and state-specific credit schemes.",
        "faq2_q": "Is my certificate upload vault secure?", "faq2_a": "Yes, all uploaded records, identity credentials, and land certificates are processed locally inside our Document AI system and stored in your private, secure credentials vault.",
        "faq3_q": "Which regional Indian languages are supported?", "faq3_a": "The platform currently offers translation settings for English, Hindi, Marathi, Telugu, Malayalam, Punjabi, and Gujarati. All video tutorials, buttons, and chatbot advisories support local voice input matching.",
        "bottom_cta_title": "Navigate Your Farm's Future Today", "bottom_cta_desc": "Sign up now to scan documents, check crop matching confidence, and print farmer credential resumes.", "bottom_cta_btn": "Create Free Profile",
        "footer_about": "Empowering Indian farmers with machine learning, document automation, and voice-assisted scheme navigation.",
        "footer_platform": "Platform", "footer_resources": "Resources", "footer_farmer_access": "Farmer Access", "footer_new_reg": "New Registration",
        "footer_rights": "© 2026 AgroVision. All rights reserved.", "footer_tagline": "Made for modern Indian agriculture.",
        "login_left_title": "AI-Guided Growth for Every Acre.", "login_left_desc": "Verify your details, upload certificates to pre-populate applications, and receive personalized agricultural insights instantly.",
        "login_feat1_sub": "Ask farming questions naturally in Marathi, Hindi, English.", "login_feat2_sub": "Receive recommendations based on soil parameters and weather.",
        "login_feat3_sub": "Find eligible central and state benefits in one dashboard.", "login_feat4_sub": "Watch multilingual tutorials with Text-to-Speech voices.",
        "login_left_footer": "© 2026 AgroVision. Empowering Indian agriculture with machine learning.",
        "toggle_no_account": "Don't have an account?", "toggle_reg_link": "Register Profile", "toggle_has_account": "Already registered?", "toggle_login_link": "Access Profile",
        "explore_header": "Explore Available Schemes", "explore_sub": "Search and filter all central and state-sponsored benefits.",
        "search_placeholder": "Search by scheme name or keyword...",
        "apply_now": "Apply Now", "eligibility": "Eligibility", "benefits": "Benefits", "more_details": "More Details",
        "target_region": "Target Region", "target_roles": "Target Roles", "required_docs": "Required Documents", "application_mode": "Application Mode",
        "crop_advisor_title": "🌱 AI Crop Advisor", "welcome_back": "Welcome back", "crop_advisor_sub": "Enter parameters to predict optimal crops.",
        "panel_title": "Crop Advisor Parameters", "panel_desc": "Enter soil parameters to predict optimal crops and identify linked government support schemes.",
        "soil_nutrients_header": "🧪 Soil Nutrients (N-P-K) & Environment",
        "nitrogen": "Nitrogen (N)", "phosphorus": "Phosphorus (P)", "potassium": "Potassium (K)",
        "temperature": "Temperature (°C)", "humidity": "Humidity (%)", "soil_ph": "Soil pH Level", "rainfall": "Rainfall (mm)",
        "soil_type": "Soil Type", "water_avail": "Water Availability", "season": "Season", "land_size": "Land Size (Acres)", "prev_crop": "Previous Crop",
        "detect_weather": "Auto-Detect Live GPS / IP Weather", "search_city": "Search City", "get_recommendation": "Get Recommendation",
        "top_ai_recs": "Top 3 AI Crop Recommendations", "linked_schemes": "Linked Schemes",
        "save_profile_match": "Save Profile Details & Match Schemes", "run_automation": "Run Automation Workflow", "download_pdf": "Download Your Report (PDF)",
        "expected_yield": "Expected Yield", "estimated_profit": "Estimated Profit", "suitable_soil": "Suitable Soil", "suitable_season": "Suitable Season",
        "water_req": "Water Requirement", "fertilizer": "Fertilizer Recommendation", "ai_insight": "AI Insight",
        "chatbot_title": "💬 AI Scheme Advisor Bot", "chatbot_sub": "Ask questions about government subsidies and credits in simple language.", "chat_placeholder": "Type your question here...", "bot_welcome_msg": "Hello! I am your Smart Agriculture Advisor. How can I help you with your agricultural query?",
        "videos_title": "🎥 Video Tutorials", "videos_sub": "Watch agricultural training guides to make scheme registration simple.",
        "profile_title": "🤖 AI Scheme Matching & Vault", "profile_sub": "Scan documents to auto-fill records and check scheme matches.", "upload_doc": "Upload Aadhaar, Land Record, or Bank Passbook",
        "resume_title": "📄 Farmer Credentials Resume & PDF Automation", "resume_sub": "Review credentials, compile profiles, and automate report distributions.",
        "login_welcome": "Welcome back", "login_sub": "Enter your registered mobile number to access your account.", "mobile_number": "Mobile Number", "access_platform": "Access My Platform",
        "dont_have_account": "Don't have an account?", "register_profile": "Register Profile", "create_profile": "Create farm profile", "reg_sub": "Check eligible government matching schemes in seconds.",
        "full_name": "Full Name", "state_location": "State / Union Territory", "land_acres": "Land Size (Acres)", "create_farm_btn": "Create Farm Profile"
    },
    "हिंदी": {
        "home": "मुख्य पृष्ठ", "discovery": "योजना खोज", "dashboard": "डैशबोर्ड", "ai_advisor": "एआई सलाहकार",
        "login": "लॉग इन", "register": "पंजीकरण", "logout": "लॉग आउट", "return_home": "मुख्य पृष्ठ",
        "backend_online": "सर्वर ऑनलाइन",
        "sidebar_crop_advisor": "फसल सलाहकार", "sidebar_scheme_discovery": "योजना खोज",
        "sidebar_video_tutorials": "वीडियो ट्यूटोरियल", "sidebar_ai_matching": "एआई योजना मिलान",
        "sidebar_credentials_resume": "किसान प्रोफाइल और रिपोर्ट", "sidebar_advisor_bot": "सलाहकार बोट",
        "sidebar_return_home": "मुख्य पृष्ठ",
        "hero_badge": "🌱 एआई-संचालित किसान नेविगेटर",
        "hero_tagline": "स्मार्ट मार्गदर्शन। बेहतर फसल। उज्जवल भविष्य।",
        "hero_desc": "एक एआई-आधारित प्लेटफॉर्म जो भारतीय किसानों को सरकारी योजनाओं को खोजने, लाभों की गणना करने, आधुनिक खेती की तकनीक सीखने और स्मार्ट फसल सिफारिशें प्राप्त करने में मदद करता है।",
        "explore_header": "उपलब्ध योजनाएं देखें", "explore_sub": "सभी केंद्रीय और राज्य-प्रायोजित लाभों की खोज करें।",
        "search_placeholder": "योजना के नाम या कीवर्ड से खोजें...",
        "apply_now": "अभी आवेदन करें", "eligibility": "पात्रता", "benefits": "लाभ", "more_details": "अधिक विवरण",
        "target_region": "लक्ष्य क्षेत्र", "target_roles": "लक्ष्य भूमिकाएं", "required_docs": "आवश्यक दस्तावेज", "application_mode": "आवेदन का माध्यम",
        "crop_advisor_title": "🌱 एआई फसल सलाहकार", "welcome_back": "स्वागत है", "crop_advisor_sub": "इष्टतम फसलों का अनुमान लगाने के लिए मिट्टी पैरामीटर दर्ज करें।",
        "panel_title": "फसल सलाहकार पैरामीटर", "panel_desc": "उपयुक्त फसलों और संबंधित सरकारी योजनाओं की पहचान के लिए मिट्टी के पैरामीटर दर्ज करें।",
        "soil_nutrients_header": "🧪 मिट्टी के पोषक तत्व (N-P-K) और वातावरण",
        "nitrogen": "नाइट्रोजन (N)", "phosphorus": "फास्फोरस (P)", "potassium": "पोटाशियम (K)",
        "temperature": "तापमान (°C)", "humidity": "आर्द्रता (%)", "soil_ph": "मिट्टी का पीएच स्तर", "rainfall": "वर्षा (मिमी)",
        "soil_type": "मिट्टी का प्रकार", "water_avail": "पानी की उपलब्धता", "season": "मौसम", "land_size": "भूमि का आकार (एकड़)", "prev_crop": "पिछली फसल",
        "detect_weather": "लाइव मौसम स्वतः पहचानें (GPS / IP)", "search_city": "शहर खोजें", "get_recommendation": "सिफारिश प्राप्त करें",
        "top_ai_recs": "शीर्ष 3 एआई फसल सिफारिशें", "linked_schemes": "संबंधित योजनाएं",
        "save_profile_match": "प्रोफ़ाइल सहेजें और योजनाएं मिलाएं", "run_automation": "स्वचालित रिपोर्ट तैयार करें", "download_pdf": "अपनी रिपोर्ट डाउनलोड करें (PDF)",
        "expected_yield": "अनुमानित उपज", "estimated_profit": "अनुमानित लाभ", "suitable_soil": "उपयुक्त मिट्टी", "suitable_season": "उपयुक्त मौसम",
        "water_req": "पानी की आवश्यकता", "fertilizer": "अनुशंसित उर्वरक", "ai_insight": "कृषि विशेषज्ञ सलाह",
        "chatbot_title": "💬 एआई योजना सलाहकार बोट", "chatbot_sub": "सरल भाषा में सरकारी सब्सिडी और क्रेडिट के बारे में प्रश्न पूछें।", "chat_placeholder": "सरकारी योजनाओं के बारे में प्रश्न पूछें...",
        "videos_title": "🎥 वीडियो ट्यूटोरियल", "videos_sub": "योजना पंजीकरण को आसान बनाने के लिए कृषि प्रशिक्षण वीडियो देखें।",
        "profile_title": "🤖 एआई योजना मिलान एवं तिजोरी", "profile_sub": "दस्तावेज़ स्कैन करें और योजना मिलान की जांच करें।", "upload_doc": "आधार, भूमि रिकॉर्ड या बैंक पासबुक अपलोड करें",
        "resume_title": "📄 किसान क्रेडेंशियल रिपोर्ट और पीडीएफ ऑटोमेशन", "resume_sub": "क्रेडेंशियल्स की समीक्षा करें और स्वचालित रिपोर्ट बनाएं।",
        "login_welcome": "फिर से स्वागत है", "login_sub": "अपने खाते तक पहुंचने के लिए अपना पंजीकृत मोबाइल नंबर दर्ज करें।", "mobile_number": "मोबाइल नंबर", "access_platform": "प्लेटफ़ॉर्म एक्सेस करें",
        "dont_have_account": "खाता नहीं है?", "register_profile": "प्रोफ़ाइल पंजीकृत करें", "create_profile": "फार्म प्रोफ़ाइल बनाएं", "reg_sub": "सेकंड में पात्र सरकारी योजनाओं की जांच करें।",
        "full_name": "पूरा नाम", "state_location": "राज्य / केंद्र शासित प्रदेश", "land_acres": "भूमि का आकार (एकड़)", "create_farm_btn": "फार्म प्रोफ़ाइल बनाएं"
    },
    "मराठी": {
        "home": "मुख्य पान", "discovery": "योजना शोध", "dashboard": "डॅशबोर्ड", "ai_advisor": "एआय सल्लागार",
        "login": "लॉगिन", "register": "नोंदणी", "logout": "लॉगआउट", "return_home": "मुख्य पानावर जा",
        "backend_online": "सर्व्हर ऑनलाइन",
        "sidebar_crop_advisor": "पीक सल्लागार", "sidebar_scheme_discovery": "योजना शोध",
        "sidebar_video_tutorials": "व्हिडिओ मार्गदर्शक", "sidebar_ai_matching": "एआय योजना जुळवणी",
        "sidebar_credentials_resume": "शेतकरी प्रोफाइल आणि अहवाल", "sidebar_advisor_bot": "सल्लागार बॉट",
        "sidebar_return_home": "मुख्य पानावर जा",
        "hero_badge": "🌱 एआय-चलित शेतकरी नेव्हिगेटर",
        "hero_tagline": "स्मार्ट मार्गदर्शन. उत्तम पीक. उज्ज्वल भविष्य.",
        "hero_desc": "भारतीय शेतकऱ्यांना सरकारी योजना शोधण्यात, फायद्यांची गणना करण्यात, आधुनिक शेती तंत्र शिकण्यास आणि स्मार्ट पीक शिफारसी प्राप्त करण्यास मदत करणारे एआय-आधारित प्लॅटफॉर्म.",
        "explore_header": "उपलब्ध योजना एक्सप्लोर करा", "explore_sub": "सर्व केंद्रीय आणि राज्यस्तरीय योजनांचे फायदे शोधा.",
        "search_placeholder": "योजनेचे नाव किंवा कीवर्डने शोधा...",
        "apply_now": "आता अर्ज करा", "eligibility": "पात्रता", "benefits": "फायदे", "more_details": "अधिक माहिती",
        "target_region": "लक्ष्य क्षेत्र", "target_roles": "लक्ष्य भूमिका", "required_docs": "आवश्यक कागदपत्रे", "application_mode": "अर्जाची पद्धत",
        "crop_advisor_title": "🌱 एआय पीक सल्लागार", "welcome_back": "स्वागत आहे", "crop_advisor_sub": "उत्तम पिकांची शिफारस मिळवण्यासाठी शेतीचे घटक प्रविष्ट करा.",
        "panel_title": "पीक सल्लागार घटक", "panel_desc": "योग्य पिके आणि संबंधित सरकारी योजना ओळखण्यासाठी मातीचे घटक प्रविष्ट करा.",
        "soil_nutrients_header": "🧪 मातीची पोषक तत्वे (N-P-K) व हवामान",
        "nitrogen": "नायट्रोजन (N)", "phosphorus": "फॉस्फरस (P)", "potassium": "पोटॅशियम (K)",
        "temperature": "हवामान तापमान (°C)", "humidity": "आर्द्रता (%)", "soil_ph": "मातीचा सामू (pH)", "rainfall": "पाऊस (मिमी)",
        "soil_type": "मातीचा प्रकार", "water_avail": "पाण्याची उपलब्धता", "season": "हंगाम", "land_size": "जमिनीचे क्षेत्रफळ (एकरात)", "prev_crop": "मागील पीक",
        "detect_weather": "थेट हवामान आपोआप ओळखा (GPS / IP)", "search_city": "शहर शोधा", "get_recommendation": "शिफारस मिळवा",
        "top_ai_recs": "शीर्ष 3 एआय पीक शिफारसी", "linked_schemes": "संबंधित योजना",
        "save_profile_match": "प्रोफाइल जतन करा व योजना जुळवा", "run_automation": "ऑटोमेशन अहवाल तयार करा", "download_pdf": "तुमचा अहवाल डाउनलोड करा (PDF)",
        "expected_yield": "अपेक्षित उत्पादन", "estimated_profit": "अपेक्षित नफा", "suitable_soil": "योग्य माती", "suitable_season": "योग्य हंगाम",
        "water_req": "पाण्याची गरज", "fertilizer": "शिफारस केलेले खत", "ai_insight": "कृषी तज्ज्ञ सल्ला",
        "chatbot_title": "💬 एआय योजना सल्लागार बॉट", "chatbot_sub": "सोप्या भाषेत सरकारी अनुदाने आणि कर्जांविषयी प्रश्न विचारा.", "chat_placeholder": "सरकारी योजनांबद्दल प्रश्न विचारा...",
        "videos_title": "🎥 व्हिडिओ मार्गदर्शक", "videos_sub": "योजना नोंदणी सोपी करण्यासाठी कृषी प्रशिक्षण व्हिडिओ पहा.",
        "profile_title": "🤖 एआय योजना जुळवणी व दस्तऐवज", "profile_sub": "कागदपत्रे स्कॅन करा आणि योजना जुळवणी तपासा.", "upload_doc": "आधार, 7/12 उतारा किंवा बँक पासबुक अपलोड करा",
        "resume_title": "📄 शेतकरी प्रोफाइल अहवाल व पीडीएफ ऑटोमेशन", "resume_sub": "माहिती तपासा आणि स्वयंचलित अहवाल तयार करा.",
        "login_welcome": "पुन्हा स्वागत आहे", "login_sub": "आपल्या खात्यात प्रवेश करण्यासाठी आपला नोंदणीकृत मोबाईल नंबर प्रविष्ट करा.", "mobile_number": "मोबाईल नंबर", "access_platform": "खात्यात प्रवेश करा",
        "dont_have_account": "खाते नाही?", "register_profile": "नवीन नोंदणी करा", "create_profile": "शेतकरी प्रोफाइल तयार करा", "reg_sub": "काही सेकंदात सरकारी योजनांची पात्रता तपासा.",
        "full_name": "पूर्ण नाव", "state_location": "राज्य / जिल्हा", "land_acres": "जमिनीचे क्षेत्रफळ (एकरात)", "create_farm_btn": "प्रोफाइल तयार करा"
    },
    "తెలుగు": {
        "home": "హోమ్", "discovery": "పథకాల శోధన", "dashboard": "డాష్‌బోర్డ్", "ai_advisor": "AI సలహాదారు",
        "login": "లాగిన్", "register": "రిజిస్టర్", "logout": "లాగౌట్", "return_home": "హోమ్‌కి వెళ్లండి",
        "backend_online": "సర్వర్ ఆన్‌లైన్",
        "sidebar_crop_advisor": "పంట సలహాదారు", "sidebar_scheme_discovery": "పథకాల శోధన",
        "sidebar_video_tutorials": "వీడియో ట్యుటోరియల్స్", "sidebar_ai_matching": "AI పథకాల మ్యాచింగ్",
        "sidebar_credentials_resume": "రైతు ప్రొఫైల్ & నివేదిక", "sidebar_advisor_bot": "సలహాదారు బాట్",
        "sidebar_return_home": "హోమ్‌కి వెళ్లండి",
        "hero_badge": "🌱 AI-ఆధారిత రైతు నావిగేటర్",
        "hero_tagline": "స్మార్ట్ మార్గదర్శకత్వం. మెరుగైన పంట. ఉజ్వల భవిష్యత్తు.",
        "hero_desc": "భారతీయ రైతులు ప్రభుత్వ పథకాలను కనుగొనడానికి సహాయపడే AI ప్లాట్‌ఫారమ్.",
        "explore_header": "అందుబాటులో ఉన్న పథకాలను అన్వేషించండి", "explore_sub": "కేంద్ర మరియు రాష్ట్ర ప్రభుత్వ పథకాలను శోధించండి.",
        "search_placeholder": "పథకం పేరు ద్వారా శోధించండి...",
        "apply_now": "ఇప్పుడే దరఖాస్తు చేయండి", "eligibility": "అర్హత", "benefits": "ప్రయోజనాలు", "more_details": "మరిన్ని వివరాలు",
        "target_region": "లక్ష్య ప్రాంతం", "target_roles": "లక్ష్య పాత్రలు", "required_docs": "కావలసిన పత్రాలు", "application_mode": "దరఖాస్తు విధానం",
        "crop_advisor_title": "🌱 AI పంట సలహాదారు", "welcome_back": "స్వాగతం", "crop_advisor_sub": "ఉత్తమ పంటలను అంచనా వేయడానికి వివరాలను నమోదు చేయండి.",
        "panel_title": "పంట సలహాదారు పారామితులు", "panel_desc": "అనుకూలమైన పంటలు మరియు ప్రభుత్వ పథకాలను తెలుసుకోవడానికి నేల పారామితులను ఇవ్వండి.",
        "soil_nutrients_header": "🧪 నేల పోషకాలు (N-P-K) మరియు వాతావరణం",
        "nitrogen": "నైట్రోజన్ (N)", "phosphorus": "ఫాస్ఫరస్ (P)", "potassium": "పొటాషియం (K)",
        "temperature": "ఉష్ణోగ్రత (°C)", "humidity": "తేమ (%)", "soil_ph": "నేల pH స్థాయి", "rainfall": "వర్షపాతం (మి.మీ)",
        "soil_type": "నేల రకం", "water_avail": "నీటి లభ్యత", "season": "కాలం", "land_size": "భూమి వైశాల్యం (ఎకరాలు)", "prev_crop": "మునుపటి పంట",
        "detect_weather": "లైవ్ వాతావరణాన్ని గుర్తించండి (GPS / IP)", "search_city": "నగరాన్ని శోధించండి", "get_recommendation": "సిఫార్సు పొందండి",
        "top_ai_recs": "టాప్ 3 AI పంట సిఫార్సులు", "linked_schemes": "అనుసంధానించబడిన పథకాలు",
        "save_profile_match": "ప్రొఫైల్‌ను సేవ్ చేయండి & పథకాలను జత చేయండి", "run_automation": "ఆటోమేషన్ నివేదికను రూపొందించండి", "download_pdf": "మీ నివేదికను డౌన్‌లోడ్ చేయండి (PDF)",
        "expected_yield": "అంచనా దిగుబడి", "estimated_profit": "అంచనా లాభం", "suitable_soil": "అనుకూలమైన నేల", "suitable_season": "అనుకూలమైన కాలం",
        "water_req": "నీటి అవసరం", "fertilizer": "సిఫార్సు చేసిన ఎరువులు", "ai_insight": "వ్యవసాయ నిపుణుల సలహా",
        "chatbot_title": "💬 AI పథకాల సలహాదారు బాట్", "chatbot_sub": "ప్రభుత్వ రాయితీలు గురించి సులభమైన భాషలో ప్రశ్నలు అడగండి.", "chat_placeholder": "ప్రభుత్వ పథకాల గురించి ప్రశ్న అడగండి...",
        "videos_title": "🎥 వీడియో ట్యుటోరియల్స్", "videos_sub": "శిక్షణ వీడియోలను చూడండి.",
        "profile_title": "🤖 AI పథకాల మ్యాచింగ్ & డాక్యుమెంట్లు", "profile_sub": "పత్రాలను స్కాన్ చేసి అర్హత ఉన్న పథకాలను తనిఖీ చేయండి.", "upload_doc": "ఆధార్ లేదా బ్యాంక్ పాస్‌బుక్ అప్‌లోడ్ చేయండి",
        "resume_title": "📄 రైతు ప్రొఫైల్ నివేదిక & PDF ఆటోమేషన్", "resume_sub": "వివరాలను సమీక్షించి నివేదికను రూపొందించండి.",
        "login_welcome": "స్వాగతం", "login_sub": "మీ మొబైల్ నంబర్‌ను నమోదు చేయండి.", "mobile_number": "మొబైల్ నంబర్", "access_platform": "లాగిన్ అవ్వండి",
        "dont_have_account": "ఖాతా లేదా?", "register_profile": "రిజిస్టర్ చేసుకోండి", "create_profile": "రైతు ప్రొఫైల్ సృష్టించండి", "reg_sub": "పథకాల అర్హతను తనిఖీ చేయండి.",
        "full_name": "పూర్తి పేరు", "state_location": "రాష్ట్రం", "land_acres": "భూమి వైశాల్యం (ఎకరాలు)", "create_farm_btn": "ప్రొఫైల్ సృష్టించండి"
    },
    "മലയാളം": {
        "home": "ഹോം", "discovery": "പദ്ധതി കണ്ടെത്തൽ", "dashboard": "ഡാഷ്‌ബോർഡ്", "ai_advisor": "AI ഉപദേഷ്ടാവ്",
        "login": "ലോഗിൻ", "register": "രജിസ്റ്റർ", "logout": "ലോഗ്ഔട്ട്", "return_home": "ഹോമിലേക്ക് മടങ്ങുക",
        "backend_online": "സെർവർ ഓൺലൈൻ",
        "sidebar_crop_advisor": "വിള ഉപദേഷ്ടാവ്", "sidebar_scheme_discovery": "പദ്ധതി കണ്ടെത്തൽ",
        "sidebar_video_tutorials": "വീഡിയോ ട്യൂട്ടോറിയലുകൾ", "sidebar_ai_matching": "AI പദ്ധതി മാച്ചിംഗ്",
        "sidebar_credentials_resume": "കർഷക പ്രൊഫൈലും റിപ്പോർട്ടും", "sidebar_advisor_bot": "ഉപദേശക ബോട്ട്",
        "sidebar_return_home": "ഹോമിലേക്ക് മടങ്ങുക",
        "hero_badge": "🌱 AI കരുത്തുള്ള കർഷക നാവിഗേറ്റർ",
        "hero_tagline": "സ്മാർട്ട് മാർഗ്ഗനിർദ്ദേശം. മികച്ച വിളവ്. മികച്ച ഭാവി.",
        "hero_desc": "ഇന്ത്യൻ കർഷകർക്ക് സർക്കാർ പദ്ധതികൾ കണ്ടെത്താൻ സഹായിക്കുന്ന AI പ്ലാറ്റ്ഫോം.",
        "explore_header": "ലഭ്യമായ പദ്ധതികൾ പരിശോധിക്കുക", "explore_sub": "സർക്കാർ ആനുകൂല്യങ്ങൾ തിരയുക.",
        "search_placeholder": "പദ്ധതിയുടെ പേര് ഉപയോഗിച്ച് തിരയുക...",
        "apply_now": "ഇപ്പോൾ അപേക്ഷിക്കുക", "eligibility": "യോഗ്യത", "benefits": "ആനുകൂല്യങ്ങൾ", "more_details": "കൂടുതൽ വിവരങ്ങൾ",
        "target_region": "ലക്ഷ്യ പ്രദേശം", "target_roles": "ലക്ഷ്യ പങ്കുകൾ", "required_docs": "ആവശ്യമായ രേഖകൾ", "application_mode": "അപേക്ഷാ രീതി",
        "crop_advisor_title": "🌱 AI വിള ഉപദേഷ്ടാവ്", "welcome_back": "സ്വാഗതം", "crop_advisor_sub": "വിവരങ്ങൾ നൽകുക.",
        "panel_title": "വിള ഉപദേശക അളവുകൾ", "panel_desc": "മണ്ണ് വിവരങ്ങൾ നൽകുക.",
        "soil_nutrients_header": "🧪 മണ്ണ് പോഷകങ്ങളും (N-P-K) കാലാവസ്ഥയും",
        "nitrogen": "നൈട്രജൻ (N)", "phosphorus": "ഫോസ്ഫറസ് (P)", "potassium": "പൊട്ടാസ്യം (K)",
        "temperature": "താപനില (°C)", "humidity": "ഈർപ്പം (%)", "soil_ph": "മണ്ണിന്റെ pH അളവ്", "rainfall": "മഴയുടെ അളവ് (mm)",
        "soil_type": "മണ്ണിന്റെ തരം", "water_avail": "ലഭ്യമായ വെള്ളം", "season": "സീസൺ", "land_size": "ഭൂമിയുടെ അളവ് (ഏക്കർ)", "prev_crop": "മുൻ വിള",
        "detect_weather": "തത്സമയ കാലാവസ്ഥ കണ്ടെത്തുക (GPS / IP)", "search_city": "നഗരം തിരയുക", "get_recommendation": "നിർദ്ദേശം നേടുക",
        "top_ai_recs": "മികച്ച 3 AI വിള നിർദ്ദേശങ്ങൾ", "linked_schemes": "ബന്ധപ്പെട്ട പദ്ധതികൾ",
        "save_profile_match": "പ്രൊഫൈൽ സേവ് ചെയ്യുക & മാച്ച് കണ്ടെത്തുക", "run_automation": "ഓട്ടോമേഷൻ റിപ്പോർട്ട് തയാറാക്കുക", "download_pdf": "റിപ്പോർട്ട് ഡൗൺലോഡ് ചെയ്യുക (PDF)",
        "expected_yield": "പ്രതീക്ഷിക്കുന്ന വിളവ്", "estimated_profit": "പ്രതീക്ഷിക്കുന്ന ലാഭം", "suitable_soil": "അനുയോജ്യമായ മണ്ണ്", "suitable_season": "അനുയോജ്യമായ സീസൺ",
        "water_req": "ആവശ്യമായ വെള്ളം", "fertilizer": "നിർദ്ദേശിക്കുന്ന വളം", "ai_insight": "കാർഷിക വിദഗ്ദ്ധ ഉപദേശം",
        "chatbot_title": "💬 AI പദ്ധതി ഉപദേശക ബോട്ട്", "chatbot_sub": "ചോദ്യങ്ങൾ ചോദിക്കുക.", "chat_placeholder": "ചോദ്യം ചോദിക്കുക...",
        "videos_title": "🎥 വീഡിയോ ട്യൂട്ടോറിയലുകൾ", "videos_sub": "വീഡിയോകൾ കാണുക.",
        "profile_title": "🤖 AI പദ്ധതി മാച്ചിംഗ്", "profile_sub": "രേഖകൾ പരിശോധിക്കുക.", "upload_doc": "രേഖകൾ അപ്‌ലോഡ് ചെയ്യുക",
        "resume_title": "📄 കർഷക പ്രൊഫൈൽ റിപ്പോർട്ട്", "resume_sub": "റിപ്പോർട്ട് തയാറാക്കുക.",
        "login_welcome": "സ്വാഗതം", "login_sub": "മൊബൈൽ നമ്പർ നൽകുക.", "mobile_number": "മൊബൈൽ നമ്പർ", "access_platform": "ലോഗിൻ",
        "dont_have_account": "അക്കൗണ്ട് ഇല്ലേ?", "register_profile": "രജിസ്റ്റർ ചെയ്യുക", "create_profile": "പ്രൊഫൈൽ ഉണ്ടാക്കുക", "reg_sub": "പദ്ധതി യോഗ്യത നോക്കുക.",
        "full_name": "പൂർണ്ണമായ പേര്", "state_location": "സംസ്ഥാനം", "land_acres": "ഭൂമിയുടെ അളവ് (ഏക്കർ)", "create_farm_btn": "പ്രൊഫൈൽ ഉണ്ടാക്കുക"
    },
    "ਪੰਜਾਬੀ": {
        "home": "ਮੁੱਖ ਪੰਨਾ", "discovery": "ਯੋਜਨਾ ਖੋਜ", "dashboard": "ਡੈਸ਼ਬੋਰਡ", "ai_advisor": "AI ਸਲਾਹਕਾਰ",
        "login": "ਲਾਗਇਨ", "register": "ਰਜਿਸਟਰ", "logout": "ਲਾਗਆਉਟ", "return_home": "ਮੁੱਖ ਪੰਨੇ 'ਤੇ ਜਾਓ",
        "backend_online": "ਸਰਵਰ ਆਨਲਾਈਨ",
        "sidebar_crop_advisor": "ਫਸਲ ਸਲਾਹਕਾਰ", "sidebar_scheme_discovery": "ਯੋਜਨਾ ਖੋਜ",
        "sidebar_video_tutorials": "ਵੀਡੀਓ ਟਿਊਟੋਰੀਅਲ", "sidebar_ai_matching": "AI ਯੋਜਨਾ ਮੈਚਿੰਗ",
        "sidebar_credentials_resume": "ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਅਤੇ ਰਿਪੋਰਟ", "sidebar_advisor_bot": "ਸਲਾਹਕਾਰ ਬੋਟ",
        "sidebar_return_home": "ਮੁੱਖ ਪੰਨੇ 'ਤੇ ਜਾਓ",
        "hero_badge": "🌱 AI-ਸੰਚਾਲਿਤ ਕਿਸਾਨ ਨੇਵੀਗੇਟਰ",
        "hero_tagline": "ਸਮਾਰਟ ਮਾਰਗਦਰਸ਼ਨ। ਬਿਹਤਰ ਫਸਲ। ਸੁਨਹਿਰਾ ਭਵਿੱਖ।",
        "hero_desc": "ਭਾਰਤੀ ਕਿਸਾਨਾਂ ਨੂੰ ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰਨ ਵਾਲਾ AI ਪਲੇਟਫਾਰਮ।",
        "explore_header": "ਉਪਲਬਧ ਯੋਜਨਾਵਾਂ ਵੇਖੋ", "explore_sub": "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ ਦੀ ਖੋਜ ਕਰੋ।",
        "search_placeholder": "ਯੋਜਨਾ ਦੇ ਨਾਮ ਨਾਲ ਖੋਜੋ...",
        "apply_now": "ਹੁਣੇ ਅਪਲਾਈ ਕਰੋ", "eligibility": "ਯੋਗਤਾ", "benefits": "ਲਾਭ", "more_details": "ਹੋਰ ਜਾਣਕਾਰੀ",
        "target_region": "ਟਾਰਗੇਟ ਖੇਤਰ", "target_roles": "ਟਾਰਗੇਟ ਭੂਮਿਕਾਵਾਂ", "required_docs": "ਲੋੜੀਂਦੇ ਦਸਤਾਵੇਜ਼", "application_mode": "ਅਰਜ਼ੀ ਦਾ ਤਰੀਕਾ",
        "crop_advisor_title": "🌱 AI ਫਸਲ ਸਲਾਹਕਾਰ", "welcome_back": "ਜੀ ਆਇਆਂ ਨੂੰ", "crop_advisor_sub": "ਮਿੱਟੀ ਦੇ ਅੰਕੜੇ ਦਰਜ ਕਰੋ।",
        "panel_title": "ਫਸਲ ਸਲਾਹਕਾਰ ਪੈਰਾਮੀਟਰ", "panel_desc": "ਮਿੱਟੀ ਦੇ ਵੇਰਵੇ ਦਰਜ ਕਰੋ।",
        "soil_nutrients_header": "🧪 ਮਿੱਟੀ ਦੇ ਪੋਸ਼ਕ ਤੱਤ (N-P-K) ਅਤੇ ਮੌਸਮ",
        "nitrogen": "ਨਾਇਟ੍ਰੋਜਨ (N)", "phosphorus": "ਫਾਸਫੋਰਸ (P)", "potassium": "ਪੋਟਾਸ਼ੀਅਮ (K)",
        "temperature": "ਤਾਪਮਾਨ (°C)", "humidity": "ਨਮੀ (%)", "soil_ph": "ਮਿੱਟੀ ਦਾ pH ਪੱਧਰ", "rainfall": "ਮੀਂਹ (mm)",
        "soil_type": "ਮਿੱਟੀ ਦੀ ਕਿਸਮ", "water_avail": "ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ", "season": "ਸੀਜ਼ਨ", "land_size": "ਜ਼ਮੀਨ ਦਾ ਖੇਤਰਫਲ (ਏਕੜ)", "prev_crop": "ਪਿਛਲੀ ਫਸਲ",
        "detect_weather": "ਲਾਈਵ ਮੌਸਮ ਦੀ ਪਛਾਣ ਕਰੋ (GPS / IP)", "search_city": "ਸ਼ਹਿਰ ਖੋਜੋ", "get_recommendation": "ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ",
        "top_ai_recs": "ਟੌਪ 3 AI ਫਸਲ ਸਿਫ਼ਾਰਸ਼ਾਂ", "linked_schemes": "ਸੰਬੰਧਿਤ ਯੋਜਨਾਵਾਂ",
        "save_profile_match": "ਪ੍ਰੋਫਾਈਲ ਸੇਵ ਕਰੋ ਅਤੇ ਯੋਜਨਾਵਾਂ ਮਿਲਾਓ", "run_automation": "ਆਟੋਮੇਸ਼ਨ ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ", "download_pdf": "ਆਪਣੀ ਰਿਪੋਰਟ ਡਾਊਨਲੋਡ ਕਰੋ (PDF)",
        "expected_yield": "ਸੰਭਾਵਿਤ ਝਾੜ", "estimated_profit": "ਸੰਭਾਵਿਤ ਮੁਨਾਫਾ", "suitable_soil": "ਢੁਕਵੀਂ ਮਿੱਟੀ", "suitable_season": "ਢੁਕਵਾਂ ਸੀਜ਼ਨ",
        "water_req": "ਪਾਣੀ ਦੀ ਲੋੜ", "fertilizer": "ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਖਾਦ", "ai_insight": "ਖੇਤੀਬਾੜੀ ਮਾਹਿਰਾਂ ਦੀ ਸਲਾਹ",
        "chatbot_title": "💬 AI ਯੋਜਨਾ ਸਲਾਹਕਾਰ ਬੋਟ", "chatbot_sub": "ਸਵਾਲ ਪੁੱਛੋ।", "chat_placeholder": "ਸਵਾਲ ਪੁੱਛੋ...",
        "videos_title": "🎥 ਵੀਡੀਓ ਟਿਊਟੋਰੀਅਲ", "videos_sub": "ਵੀਡੀਓ ਵੇਖੋ।",
        "profile_title": "🤖 AI ਯੋਜਨਾ ਮੈਚਿੰਗ", "profile_sub": "ਦਸਤਾਵੇਜ਼ਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।", "upload_doc": "ਦਸਤਾਵੇਜ਼ ਅੱਪਲੋਡ ਕਰੋ",
        "resume_title": "📄 ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ ਰਿਪੋਰਟ", "resume_sub": "ਰਿਪੋਰਟ ਤਿਆਰ ਕਰੋ।",
        "login_welcome": "ਜੀ ਆਇਆਂ ਨੂੰ", "login_sub": "ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ।", "mobile_number": "ਮੋਬਾਈਲ ਨੰਬਰ", "access_platform": "ਲਾਗਇਨ",
        "dont_have_account": "ਖਾਤਾ ਨਹੀਂ ਹੈ?", "register_profile": "ਰਜਿਸਟਰ ਕਰੋ", "create_profile": "ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ", "reg_sub": "ਯੋਜਨਾਵਾਂ ਦੀ ਜਾਂਚ ਕਰੋ।",
        "full_name": "ਪੂਰਾ ਨਾਮ", "state_location": "ਰਾਜ", "land_acres": "ਜ਼ਮੀਨ (ਏਕੜ)", "create_farm_btn": "ਪ੍ਰੋਫਾਈਲ ਬਣਾਓ"
    },
    "ગુજરાતી": {
        "home": "હોમ", "discovery": "યોજના શોધ", "dashboard": "ડેશબોર્ડ", "ai_advisor": "AI સલાહકાર",
        "login": "લોગિન", "register": "રજિસ્ટર", "logout": "લોગઆઉટ", "return_home": "મુખ્ય પેજ પર જાઓ",
        "backend_online": "સર્વર ઓનલાઇન",
        "sidebar_crop_advisor": "પાક સલાહકાર", "sidebar_scheme_discovery": "યોજના શોધ",
        "sidebar_video_tutorials": "વિડીયો ટ્યુટોરીયલ", "sidebar_ai_matching": "AI યોજના મેચિંગ",
        "sidebar_credentials_resume": "ખેડૂત પ્રોફાઇલ અને રિપોર્ટ", "sidebar_advisor_bot": "સલાહકાર બોટ",
        "sidebar_return_home": "મુખ્ય પેજ પર જાઓ",
        "hero_badge": "🌱 AI-સંચાલિત ખેડૂત નેવિગેટર",
        "hero_tagline": "સ્માર્ટ માર્ગદર્શન. ઉત્તમ પાક. ઉજ્જવળ ભવિષ્ય.",
        "hero_desc": "ખેડૂતોને સરકારી યોજનાઓ શોધવામાં મદદ કરતું AI પ્લેટફોર્મ.",
        "explore_header": "ઉપલબ્ધ સરકારી યોજનાઓ જુઓ", "explore_sub": "સરકારી યોજનાઓની માહિતી મેળવો.",
        "search_placeholder": "યોજનાનું નામ શોધો...",
        "apply_now": "અત્યારે અરજી કરો", "eligibility": "પાત્રતા", "benefits": "લાભો", "more_details": "વધુ વિગતો",
        "target_region": "લક્ષ્ય વિસ્તાર", "target_roles": "લક્ષ્ય ભૂમિકાઓ", "required_docs": "જરૂરી દસ્તાવેજો", "application_mode": "અરજીનું માધ્યમ",
        "crop_advisor_title": "🌱 AI પાક સલાહકાર", "welcome_back": "સ્વાગત છે", "crop_advisor_sub": "જમીનની વિગતો આપો.",
        "panel_title": "પાક સલાહકાર પેરામીટર્સ", "panel_desc": "જમીનની વિગતો આપો.",
        "soil_nutrients_header": "🧪 જમીનના પોષક તત્વો (N-P-K) અને વાતાવરણ",
        "nitrogen": "નાઇટ્રોજન (N)", "phosphorus": "ફોસ્ફરસ (P)", "potassium": "પોટાશ (K)",
        "temperature": "તાપમાન (°C)", "humidity": "ભેજ (%)", "soil_ph": "જમીનનું pH સ્તર", "rainfall": "વરસાદ (mm)",
        "soil_type": "જમીનનો પ્રકાર", "water_avail": "પાણીની પ્રાપ્યતા", "season": "ઋતુ", "land_size": "જમીનનું માપ (એકર)", "prev_crop": "અગાઉનો પાક",
        "detect_weather": "લાઈવ હવામાન ઓળખો (GPS / IP)", "search_city": "શહેર શોધો", "get_recommendation": "ભલામણ મેળવો",
        "top_ai_recs": "ટોચની 3 AI પાક ભલામણો", "linked_schemes": "સંબંધિત યોજનાઓ",
        "save_profile_match": "પ્રોફાઇલ સેવ કરો અને યોજનાઓ મેળવો", "run_automation": "ઓટોમેશન રિપોર્ટ તૈયાર કરો", "download_pdf": "તમારો રિપોર્ટ ડાઉનલોડ કરો (PDF)",
        "expected_yield": "અપેક્ષિત ઉત્પાદન", "estimated_profit": "અપેક્ષિત નફો", "suitable_soil": "અનુકૂળ જમીન", "suitable_season": "અનુકૂળ ઋતુ",
        "water_req": "પાણીની જરૂરિયાત", "fertilizer": "ભલામણ કરેલ ખાતર", "ai_insight": "કૃષિ નિષ્ણાત સલાહ",
        "chatbot_title": "💬 AI યોજના સલાહકાર બોટ", "chatbot_sub": "પ્રશ્નો પૂછો.", "chat_placeholder": "પ્રશ્નો પૂછો...",
        "videos_title": "🎥 વિડીયો ટ્યુટોરીયલ", "videos_sub": "વિડીયો જુઓ.",
        "profile_title": "🤖 AI યોજના મેચિંગ", "profile_sub": "દસ્તાવેજો ચકાસો.", "upload_doc": "દસ્તાવેજો અપલોડ કરો",
        "resume_title": "📄 ખેડૂત પ્રોફાઇલ રિપોર્ટ", "resume_sub": "રિપોર્ટ તૈયાર કરો.",
        "login_welcome": "સ્વાગત છે", "login_sub": "મોબાઈલ નંબર ઉમેરો.", "mobile_number": "મોબાઈલ નંબર", "access_platform": "લોગિન",
        "dont_have_account": "ખાતું નથી?", "register_profile": "રજિસ્ટર કરો", "create_profile": "પ્રોફાઇલ બનાવો", "reg_sub": "પાત્રતા ચકાસો.",
        "full_name": "પૂરું નામ", "state_location": "રાજ્ય", "land_acres": "જમીન (એકર)", "create_farm_btn": "પ્રોફાઇલ બનાવો"
    }
};

const CROP_I18N = {
    "Paddy": {
        "English": { name: "Paddy (Rice)", reasoning: "Paddy (Rice) is highly suitable due to high water availability, hot and humid weather, and clay/loamy soil structures.", fertilizer: "Urea (Nitrogen-rich), DAP, and MOP", yield: "3.5 - 4.5 tons/hectare" },
        "हिंदी": { name: "धान (चावल)", reasoning: "उच्च जल उपलब्धता, गर्म और आर्द्र मौसम तथा चिकनी/दोमट मिट्टी की संरचना के कारण धान (चावल) अत्यधिक उपयुक्त है।", fertilizer: "यूरिया (नाइट्रोजन समृद्ध), डीएपी और एमओपी", yield: "3.5 - 4.5 टन/हेक्टेयर" },
        "मराठी": { name: "तांदूळ (भात)", reasoning: "पाण्याची मुबलक उपलब्धता, उष्ण व दमट हवामान आणि चिकन/गाळाच्या मातीच्या संरचनेमुळे भात (तांदूळ) पीक अत्यंत योग्य आहे.", fertilizer: "युरिया (नायट्रोजन समृद्ध), डीएपी (DAP) आणि एमओपी (MOP)", yield: "३.५ - ४.५ टन/हेक्टर" },
        "తెలుగు": { name: "వరి", reasoning: "అధిక నీటి లభ్యత, వేడి మరియు తేమతో కూడిన వాతావరణం మరియు మట్టి/ఒండ్రు నేలల నిర్మాణాల వల్ల వరి పంట అత్యంత అనుకూలమైనది.", fertilizer: "యూరియా, డిఎపి మరియు ఎంఒపి", yield: "3.5 - 4.5 టన్నులు/హెక్టారు" },
        "മലയാളം": { name: "നെല്ല് (അരി)", reasoning: "കൂടിയ ജലലഭ്യത, ചൂടും ഈർപ്പവുമുള്ള കാലാവസ്ഥ, കളിമണ്ണ്/എക്കൽ മണ്ണ് എന്നിവ കാരണം നെൽകൃഷി വളരെ അനുയോജ്യമാണ്.", fertilizer: "യൂറിയ, ഡിഎപി, എംഒപി", yield: "3.5 - 4.5 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { name: "ਝੋਨਾ (ਚਾਵਲ)", reasoning: "ਵੱਧ ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ, ਗਰਮ ਅਤੇ ਨਮੀ ਵਾਲੇ ਮੌਸਮ ਅਤੇ ਚਿਕਣੀ/ਦੋਮਟ ਮਿੱਟੀ ਦੇ ਕਾਰਨ ਝੋਨੇ ਦੀ ਫਸਲ ਬਹੁਤ ਢੁਕਵੀਂ ਹੈ।", fertilizer: "ਯੂਰੀਆ, ਡੀਏਪੀ ਅਤੇ ਐਮਓਪੀ", yield: "3.5 - 4.5 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { name: "ડાંગર (ચોખા)", reasoning: "પાણીની વધુ પ્રાપ્યતા, ગરમ અને ભેજવાળા વાતાવરણ અને માટી/કાંપ વાળી જમીનને કારણે ડાંગર (ચોખા) નો પાક અત્યંત અનુકૂળ છે.", fertilizer: "યુરિયા, ડીએપી અને એમઓપી", yield: "3.5 - 4.5 ટન/હેક્ટર" }
    },
    "Wheat": {
        "English": { name: "Wheat", reasoning: "Wheat thrives in cooler winter seasons with moderate watering regimes and balanced loam soil structures.", fertilizer: "Balanced NPK (4:2:1 ratio) + Superphosphate", yield: "3.0 - 4.0 tons/hectare" },
        "हिंदी": { name: "गेहूं", reasoning: "गेहूं मध्यम सिंचाई और संतुलित दोमट मिट्टी की संरचना के साथ ठंडे सर्दियों के मौसम में पनपता है।", fertilizer: "संतुलित एनपीके (4:2:1) + सुपरफॉस्फेट", yield: "3.0 - 4.0 टन/हेक्टेयर" },
        "मराठी": { name: "गव्हाचे पीक", reasoning: "मध्यम पाणी आणि संतुलित गाळाच्या मातीत थंड हिवाळ्याच्या हंगामात गव्हाचे पीक उत्तम येते.", fertilizer: "संतुलित एनपीके (NPK 4:2:1) + सुपरफॉस्फेट", yield: "३.० - ४.० टन/हेक्टर" },
        "తెలుగు": { name: "గోధుమ", reasoning: "మితమైన నీటిపారుదల మరియు సమతుల్య ఒండ్రు నేలలో చల్లని శీతాకాలంలో గోధుమ పంట బాగా పెరుగుతుంది.", fertilizer: "సమతుల్య ఎన్‌పికె (4:2:1) + సూపర్ ఫాస్ఫేట్", yield: "3.0 - 4.0 టన్నులు/హెక్టారు" },
        "മലയാളം": { name: "ഗോതമ്പ്", reasoning: "മിതമായ ജലസേചനവും എക്കൽ മണ്ണുമുള്ള തണുപ്പുള്ള ശീതകാലത്ത് ഗോതമ്പ് നന്നായി വളരുന്നു.", fertilizer: "എൻപികെ (4:2:1) + സൂപ്പർ ഫോസ്ഫേറ്റ്", yield: "3.0 - 4.0 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { name: "ਕਣਕ", reasoning: "ਕਣਕ ਠੰਢੇ ਸਰਦੀਆਂ ਦੇ ਮੌਸਮ ਵਿੱਚ ਮੱਧਮ ਸਿੰਚਾਈ ਅਤੇ ਦੋਮਟ ਮਿੱਟੀ ਵਿੱਚ ਬਹੁਤ ਵਧੀਆ ਹੁੰਦੀ ਹੈ।", fertilizer: "ਸੰਤੁਲਿਤ ਐਨਪੀਕੇ + ਸੁਪਰਫਾਸਫੇਟ", yield: "3.0 - 4.0 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { name: "ઘઉં", reasoning: "ઘઉં મધ્યમ પિયત અને કાંપ વાળી જમીનમાં ઠંડી શિયાળાની ઋતુમાં ઉત્તમ થાય છે.", fertilizer: "સંતુલિત એનપીકે + સુપરફોસ્ફેટ", yield: "3.0 - 4.0 ટન/હેક્ટર" }
    },
    "Cotton": {
        "English": { name: "Cotton", reasoning: "Cotton is highly recommended for black clayey soil which holds moisture well during the warm season.", fertilizer: "Nitrogen and Potash NPK 120:60:60", yield: "1.5 - 2.5 tons/hectare" },
        "हिंदी": { name: "कपास", reasoning: "गर्म मौसम के दौरान नमी बनाए रखने वाली काली चिकनी मिट्टी के लिए कपास की अत्यधिक सिफारिश की जाती है।", fertilizer: "नाइट्रोजन और पोटाश NPK 120:60:60", yield: "1.5 - 2.5 टन/हेक्टेयर" },
        "मराठी": { name: "कापूस", reasoning: "उबदार हंगामात ओलावा टिकवून ठेवणाऱ्या काळ्या चिकणमातीसाठी कापूस पिकाची शिफारस केली जाते.", fertilizer: "नायट्रोजन आणि पोटॅश NPK 120:60:60", yield: "१.५ - २.५ टन/हेक्टर" },
        "తెలుగు": { name: "పత్తి", reasoning: "వెచ్చని కాలంలో తేమను నిలబెట్టుకునే నల్లరేగడి నేలలకు పత్తి పంట ఎంతో అనుకూలమైనది.", fertilizer: "నైట్రోజన్ మరియు పొటాష్ NPK 120:60:60", yield: "1.5 - 2.5 టన్నులు/హెక్టారు" },
        "മലയാളം": { name: "പരുത്തി", reasoning: "ചൂടുള്ള സമയത്ത് ഈർപ്പം നിലനിർത്തുന്ന കറുത്ത കളിമണ്ണിൽ പരുത്തി കൃഷി മികച്ചതാണ്.", fertilizer: "നൈട്രജൻ, പൊട്ടാഷ് NPK 120:60:60", yield: "1.5 - 2.5 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { name: "ਕਪਾਹ", reasoning: "ਗਰਮ ਮੌਸਮ ਦੌਰਾਨ ਨਮੀ ਬਣਾਈ ਰੱਖਣ ਵਾਲੀ ਕਾਲੀ ਮਿੱਟੀ ਲਈ ਕਪਾਹ ਦੀ ਫਸਲ ਬਹੁਤ ਵਧੀਆ ਹੈ।", fertilizer: "ਨਾਇਟ੍ਰੋਜਨ ਅਤੇ ਪੋਟਾਸ਼ NPK 120:60:60", yield: "1.5 - 2.5 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { name: "કપાસ", reasoning: "ગરમ ઋતુ દરમિયાન ભેજ જાળવી રાખતી કાળી માટીવાળી જમીન માટે કપાસની ભલામણ કરવામાં આવે છે.", fertilizer: "નાઇટ્રોજન અને પોટાશ NPK 120:60:60", yield: "1.5 - 2.5 ટન/હેક્ટર" }
    },
    "Sugarcane": {
        "English": { name: "Sugarcane", reasoning: "Deep alluvial soils combined with high rainfall or heavy irrigation support optimal sugarcane growth.", fertilizer: "High Nitrogen NPK 150:80:60", yield: "70 - 90 tons/hectare" },
        "हिंदी": { name: "गन्ना", reasoning: "भारी सिंचाई या अधिक वर्षा के साथ गहरी दोमट मिट्टी गन्ने की सर्वोत्तम वृद्धि में सहायक है।", fertilizer: "उच्च नाइट्रोजन युक्त NPK 150:80:60", yield: "70 - 90 टन/हेक्टेयर" },
        "मराठी": { name: "ऊस", reasoning: "ज्यादा पाऊस किंवा भरघोस सिंचनासह खोल गाळाची माती उसाच्या उत्तम वाढीस मदत करते.", fertilizer: "उच्च नायट्रोजन युक्त NPK 150:80:60", yield: "७० - ९० टन/हेक्टर" },
        "తెలుగు": { name: "చెరకు", reasoning: "అధిక వర్షపాతం లేదా భారీ నీటిపారుదలతో కూడిన లోతైన ఒండ్రు నేలలు చెరకు సరైన పెరుగుదలకు తోడ్పడతాయి.", fertilizer: "అధిక నైట్రోజన్ NPK 150:80:60", yield: "70 - 90 టన్నులు/హెక్టారు" },
        "മലയാളം": { name: "കരിമ്പ്", reasoning: "കൂടിയ മഴയോ നല്ല ജലസേചനമോ ഉള്ള എക്കൽ മണ്ണിൽ കരിമ്പ് മികച്ച രീതിയിൽ വളരുന്നു.", fertilizer: "ഉയർന്ന നൈട്രജൻ NPK 150:80:60", yield: "70 - 90 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { name: "ਕਮਾਦ", reasoning: "ਭਾਰੀ ਸਿੰਚਾਈ ਜਾਂ ਵੱਧ ਮੀਂਹ ਦੇ ਨਾਲ ਡੂੰਘੀ ਦੋਮਟ ਮਿੱਟੀ ਕਮਾਦ ਦੇ ਵਾਧੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਹੈ।", fertilizer: "ਉੱਚ ਨਾਇਟ੍ਰੋਜਨ NPK 150:80:60", yield: "70 - 90 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { name: "શેરડી", reasoning: "વધુ વરસાદ અથવા ભારે પિયત સાથે ઊંડી કાંપ વાળી જમીન શેરડીના ઉત્તમ વિકાસમાં મદદરૂપ છે.", fertilizer: "વધુ નાઇટ્રોજન NPK 150:80:60", yield: "70 - 90 ટન/હેક્ટર" }
    },
    "Maize": {
        "English": { name: "Maize", reasoning: "Warm sunny days, loamy or red well-drained soils make Maize a highly efficient and safe choice.", fertilizer: "Balanced NPK 120:60:40", yield: "4.5 - 5.5 tons/hectare" },
        "हिंदी": { name: "मक्का", reasoning: "धूप वाले गर्म दिन, दोमट या लाल जल निकासी वाली मिट्टी मक्के को एक अत्यंत कुशल और सुरक्षित विकल्प बनाती है।", fertilizer: "संतुलित NPK 120:60:40", yield: "4.5 - 5.5 टन/हेक्टेयर" },
        "मराठी": { name: "मका", reasoning: "उबदार सूर्यप्रकाश, गाळाची किंवा लाल पाण्याचा निचरा होणारी माती मका पिकासाठी अत्यंत कार्यक्षम व सुरक्षित पर्याय बनवते.", fertilizer: "संतुलित NPK 120:60:40", yield: "४.५ - ५.५ टन/हेक्टर" },
        "తెలుగు": { name: "మొక్కజొన్న", reasoning: "వెచ్చని ఎండ రోజులు, ఒండ్రు లేదా ఎర్రటి నీరు ఇంకే నేలలు మొక్కజొన్నను సురక్షితమైన ఎంపికగా చేస్తాయి.", fertilizer: "సమతుల్య NPK 120:60:40", yield: "4.5 - 5.5 టన్నులు/హెక్టారు" },
        "മലയാളം": { name: "ചോളം", reasoning: "നല്ല സൂര്യപ്രകാശവും എക്കൽ/ചുവന്ന മണ്ണുമുള്ള ഇടങ്ങളിൽ ചോളം വളരെ അനുയോജ്യമാണ്.", fertilizer: "സമീകൃത NPK 120:60:40", yield: "4.5 - 5.5 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { name: "ਮੱਕੀ", reasoning: "ਧੁੱਪ ਵਾਲੇ ਦਿਨ ਅਤੇ ਚੰਗੀ ਦੋਮਟ ਜਾਂ ਲਾਲ ਮਿੱਟੀ ਮੱਕੀ ਲਈ ਬਹੁਤ ਵਧੀਆ ਵਿਕਲਪ ਹਨ।", fertilizer: "ਸੰਤੁਲਿਤ NPK 120:60:40", yield: "4.5 - 5.5 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { name: "મકાઈ", reasoning: "તડકાવાળા દિવસો અને કાંપ અથવા લાલ જમીન મકાઈ માટે અત્યંત ઉત્તમ વિકલ્પ છે.", fertilizer: "સંતુલિત NPK 120:60:40", yield: "4.5 - 5.5 ટન/હેક્ટર" }
    },
    "Groundnut": {
        "English": { name: "Groundnut", reasoning: "Groundnut grows exceptionally well in sandy loam soils that let pegs penetrate the soil easily.", fertilizer: "NPK 20:40:40 and Gypsum", yield: "2.0 - 3.0 tons/hectare" },
        "हिंदी": { name: "मूंगफली", reasoning: "बलुई दोमट मिट्टी में मूंगफली बहुत अच्छी तरह से बढ़ती है जिससे सुइयां आसानी से मिट्टी में प्रवेश कर सकती हैं।", fertilizer: "NPK 20:40:40 और जिप्सम", yield: "2.0 - 3.0 टन/हेक्टेयर" },
        "मराठी": { name: "भुईमूग", reasoning: "रेताड गाळाच्या मातीत भुईमुगाचे पीक अत्यंत उत्तम येते कारण त्यामुळे सुया सहज मातीत घुसतात.", fertilizer: "NPK 20:40:40 आणि जिप्सम (Gypsum)", yield: "२.० - ३.० टन/हेक्टर" },
        "తెలుగు": { name: "వేరుశనగ", reasoning: "ఇసుక ఒండ్రు నేలల్లో వేరుశనగ చాలా బాగా పెరుగుతుంది.", fertilizer: "NPK 20:40:40 మరియు జిప్సమ్", yield: "2.0 - 3.0 టన్నులు/హెక్టారు" },
        "മലയാളം": { name: "നിലക്കടല", reasoning: "മണൽ കലർന്ന എക്കൽ മണ്ണിൽ നിലക്കടല വളരെ നന്നായി വളരുന്നു.", fertilizer: "NPK 20:40:40, ജിപ്സം", yield: "2.0 - 3.0 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { name: "ਮੂੰਗਫਲੀ", reasoning: "ਰੇਤਲੀ ਦੋਮਟ ਮਿੱਟੀ ਵਿੱਚ ਮੂੰਗਫਲੀ ਬਹੁਤ ਵਧੀਆ ਹੁੰਦੀ ਹੈ।", fertilizer: "NPK 20:40:40 ਅਤੇ ਜਿਪਸਮ", yield: "2.0 - 3.0 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { name: "મગફળી", reasoning: "રેતાળ કાંપ વાળી જમીનમાં મગફળી ખૂબ જ સારી રીતે થાય છે.", fertilizer: "NPK 20:40:40 અને જીપ્સમ", yield: "2.0 - 3.0 ટન/હેક્ટર" }
    },
    "Pulses": {
        "English": { name: "Pulses", reasoning: "Pulses have nitrogen-fixing properties, making them highly resilient on marginal sandy loam terrains.", fertilizer: "NPK 20:50:20 (Phosphorus rich)", yield: "1.0 - 1.8 tons/hectare" },
        "हिंदी": { name: "दालें", reasoning: "दालों में नाइट्रोजन फिक्सिंग गुण होते हैं, जो उन्हें रेतीली दोमट भूमि पर भी अत्यधिक सहनशील बनाते हैं।", fertilizer: "NPK 20:50:20 (फास्फोरस समृद्ध)", yield: "1.0 - 1.8 टन/हेक्टेयर" },
        "मराठी": { name: "डाळी / कडधान्ये", reasoning: "कडधान्यांमध्ये नायट्रोजन स्थिरावण्याचे गुणधर्म असतात, ज्यामुळे ती रेताड गाळाच्या जमिनीतही अत्यंत टिकाऊ ठरतात.", fertilizer: "NPK 20:50:20 (फॉस्फरस समृद्ध)", yield: "१.० - १.८ टन/हेक्टर" },
        "తెలుగు": { name: "పప్పుధాన్యాలు", reasoning: "పప్పుధాన్యాలకు నైట్రోజన్ స్థిరీకరించే గుణాలు ఉంటాయి.", fertilizer: "NPK 20:50:20 (ఫాస్ఫరస్ సమృద్ధి)", yield: "1.0 - 1.8 టన్నులు/హెక్టారు" },
        "മലയാളം": { name: "പയറുവർഗ്ഗങ്ങൾ", reasoning: "പയറുവർഗ്ഗങ്ങൾക്ക് നൈട്രജൻ സ്ഥിരീകരിക്കാനുള്ള ശേഷിയുണ്ട്.", fertilizer: "NPK 20:50:20 (ഫോസ്ഫറസ് സസ്യം)", yield: "1.0 - 1.8 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { name: "ਦਾਲਾਂ", reasoning: "ਦਾਲਾਂ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ ਫਿਕਸਿੰਗ ਗੁਣ ਹੁੰਦੇ ਹਨ।", fertilizer: "NPK 20:50:20 (ਫਾਸਫੋਰਸ ਅਮੀਰ)", yield: "1.0 - 1.8 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { name: "કઠોળ", reasoning: "કઠોળમાં નાઇਟ્રોજન સ્થિર કરવાના ગુણો હોય છે.", fertilizer: "NPK 20:50:20 (ફોસ્ફરસ સમૃદ્ધ)", yield: "1.0 - 1.8 ટન/હેક્ટર" }
    }
};

const SOIL_I18N = {
    "Alluvial": { "English": "Alluvial", "हिंदी": "जलोढ़ (दोमट)", "मराठी": "गाळाची माती", "తెలుగు": "ఒండ్రు నేల", "മലയാളം": "എക്കൽ മണ്ണ്", "ਪੰਜਾਬੀ": "ਦੋਮਟ ਮਿੱਟੀ", "ગુજરાતી": "કાંપ વાળી જમીન" },
    "Clay": { "English": "Clay", "हिंदी": "चिकनी मिट्टी", "मराठी": "चिकनमाती", "తెలుగు": "బంకమన్ను", "മലയാളം": "കളിമണ്ണ്", "ਪੰਜਾਬੀ": "ਚਿਕਣੀ ਮਿੱਟੀ", "ગુજરાતી": "માટીવાળી જમીન" },
    "Loamy": { "English": "Loamy", "हिंदी": "दोमट मिट्टी", "मराठी": "पोयटा माती", "తెలుగు": "ఒండ్రు నేల", "മലയാളം": "എക്കൽ മണ്ണ്", "ਪੰਜਾਬੀ": "ਦੋਮਟ ਮਿੱਟੀ", "ગુજરાતી": "બેસર જમીન" },
    "Black": { "English": "Black", "हिंदी": "काली मिट्टी", "मराठी": "काळी माती", "తెలుగు": "నల్లరేగడి నేల", "മലയാളം": "കറുത്ത മണ്ണ്", "ਪੰਜਾਬੀ": "ਕਾਲੀ ਮਿੱਟੀ", "ગુજરાતી": "કાળી જમીન" },
    "Red": { "English": "Red", "हिंदी": "लाल मिट्टी", "मराठी": "तांबडी माती", "తెలుగు": "ఎర్ర నేల", "മലയാളം": "ചുവന്ന മണ്ണ്", "ਪੰਜਾਬੀ": "ਲਾਲ ਮਿੱਟੀ", "ગુજરાતી": "લાલ જમીન" },
    "Sandy": { "English": "Sandy", "हिंदी": "बलुई मिट्टी", "मराठी": "रेताड माती", "తెలుగు": "ఇసుక నేల", "മലയാളം": "മണൽ മണ്ണ്", "ਪੰਜਾਬੀ": "ਰੇਤਲੀ ਮਿੱਟੀ", "ગુજરાતી": "રેતાળ જમીન" }
};

const SEASON_I18N = {
    "Kharif": { "English": "Kharif", "हिंदी": "खरीफ (मानसून)", "मराठी": "खरीप (पावसाळी)", "తెలుగు": "ఖరీఫ్ (వర్షాకాలం)", "മലയാളം": "ഖരീഫ്", "ਪੰਜਾਬੀ": "ਖਰੀਫ", "ગુજરાતી": "ચોમાસુ (ખરીફ)" },
    "Rabi": { "English": "Rabi", "हिंदी": "रबी (सर्दियों)", "मराठी": "रब्बी (हिवाळी)", "తెలుగు": "రబీ (చలికాలం)", "മലയാളം": "റബി", "ਪੰਜਾਬੀ": "ਰਬੀ", "ગુજરાતી": "શિયાળુ (રવિ)" },
    "Summer": { "English": "Summer", "हिंदी": "जायद (गर्मी)", "मराठी": "उन्हाळी", "తెలుగు": "వేసవి కాలం", "മലയാളം": "വേനൽക്കാലം", "ਪੰਜਾਬੀ": "ਗਰਮੀ", "ગુજરાતી": "ઉનાળુ" }
};

const WATER_I18N = {
    "High": { "English": "High", "हिंदी": "अधिक (उच्च)", "मराठी": "जास्त (भरपूर)", "తెలుగు": "ఎక్కువ", "മലയാളം": "കൂടുതൽ", "ਪੰਜਾਬੀ": "ਵੱਧ", "ગુજરાતી": "વધુ" },
    "Medium": { "English": "Medium", "हिंदी": "मध्यम", "मराठी": "मध्यम", "తెలుగు": "మితమైన", "മലയാളം": "മിതമായ", "ਪੰਜਾਬੀ": "ਮੱਧਮ", "ગુજરાતી": "મધ્યમ" },
    "Low": { "English": "Low", "हिंदी": "कम", "मराठी": "कमी", "తెలుగు": "తక్కువ", "മലയാളം": "കുറഞ്ഞ", "ਪੰਜਾਬੀ": "ਘੱਟ", "ગુજરાતી": "ઓછું" }
};

const UI_LABELS = {
    "rec_num": { "English": "Recommendation #", "हिंदी": "सिफारिश #", "मराठी": "शिफारस #", "తెలుగు": "సిఫార్సు #", "മലയാളം": "നിർദ്ദേശം #", "ਪੰਜਾਬੀ": "ਸਿਫ਼ਾਰਸ਼ #", "ગુજરાતી": "ભલામણ #" },
    "match": { "English": "Match", "हिंदी": "मेल", "मराठी": "जुळणी", "తెలుగు": "జత", "മലയാളം": "അനുയോജ്യം", "ਪੰਜਾਬੀ": "ਮੈਚ", "ગુજરાતી": "બંધબેસતું" },
    "total": { "English": "total", "हिंदी": "कुल", "मराठी": "एकूण", "తెలుగు": "మొత్తం", "മലയാളം": "ആകെ", "ਪੰਜਾਬੀ": "ਕੁੱਲ", "ગુજરાતી": "કુલ" }
};

window.formatTranslatedCropRecord = function(rec, lang) {
    const rawName = rec.raw_crop_key || rec.recommended_crop || "Paddy";
    let cropKey = "Paddy";
    if (rawName.includes("Paddy") || rawName.includes("धान") || rawName.includes("तांदूळ") || rawName.includes("వరి") || rawName.includes("നെല്ല്") || rawName.includes("ਝੋਨਾ") || rawName.includes("ડાંગર")) cropKey = "Paddy";
    else if (rawName.includes("Wheat") || rawName.includes("गेहूं") || rawName.includes("गव्हाचे") || rawName.includes("గోధుమ") || rawName.includes("ഗോതമ്പ്") || rawName.includes("ਕਣਕ") || rawName.includes("ઘઉં")) cropKey = "Wheat";
    else if (rawName.includes("Cotton") || rawName.includes("कपास") || rawName.includes("कापूस") || rawName.includes("పత్తి") || rawName.includes("പരുത്തി") || rawName.includes("ਕਪਾਹ") || rawName.includes("કપાસ")) cropKey = "Cotton";
    else if (rawName.includes("Sugarcane") || rawName.includes("गन्ना") || rawName.includes("ऊस") || rawName.includes("చెరకు") || rawName.includes("കരിമ്പ്") || rawName.includes("ਕਮਾਦ") || rawName.includes("શેરડી")) cropKey = "Sugarcane";
    else if (rawName.includes("Maize") || rawName.includes("मक्का") || rawName.includes("मका") || rawName.includes("మొక్కజొన్న") || rawName.includes("ചോളം") || rawName.includes("ਮੱਕੀ") || rawName.includes("મકાઈ")) cropKey = "Maize";
    else if (rawName.includes("Groundnut") || rawName.includes("मूंगफली") || rawName.includes("भुईमूग") || rawName.includes("వేరుశనగ") || rawName.includes("നിലക്കടല") || rawName.includes("ਮੂੰਗਫਲੀ") || rawName.includes("મગફળી")) cropKey = "Groundnut";
    else if (rawName.includes("Pulses") || rawName.includes("दालें") || rawName.includes("कडधान्ये") || rawName.includes("పప్పుధాన్యాలు") || rawName.includes("പയറുവർഗ്ഗങ്ങൾ") || rawName.includes("ਦਾਲਾਂ") || rawName.includes("કઠોળ")) cropKey = "Pulses";

    const cropData = CROP_I18N[cropKey] || CROP_I18N["Paddy"];
    const cropLangInfo = cropData[lang] || cropData["English"];

    // Soils
    const soilsRaw = rec.suitable_soil ? rec.suitable_soil.split(",") : ["Alluvial"];
    const soilsTr = soilsRaw.map(s => {
        const clean = s.trim();
        let soilKey = clean;
        Object.keys(SOIL_I18N).forEach(k => {
            if (clean.includes(k) || Object.values(SOIL_I18N[k]).includes(clean)) soilKey = k;
        });
        return (SOIL_I18N[soilKey] && SOIL_I18N[soilKey][lang]) ? SOIL_I18N[soilKey][lang] : clean;
    }).join(", ");

    // Seasons
    const seasonsRaw = rec.suitable_season ? rec.suitable_season.split(",") : ["Kharif"];
    const seasonsTr = seasonsRaw.map(s => {
        const clean = s.trim();
        let seasonKey = clean;
        Object.keys(SEASON_I18N).forEach(k => {
            if (clean.includes(k) || Object.values(SEASON_I18N[k]).includes(clean)) seasonKey = k;
        });
        return (SEASON_I18N[seasonKey] && SEASON_I18N[seasonKey][lang]) ? SEASON_I18N[seasonKey][lang] : clean;
    }).join(", ");

    // Water
    let waterKey = "High";
    const waterClean = rec.water_req ? rec.water_req.trim() : "High";
    Object.keys(WATER_I18N).forEach(k => {
        if (waterClean.includes(k) || Object.values(WATER_I18N[k]).includes(waterClean)) waterKey = k;
    });
    const waterTr = (WATER_I18N[waterKey] && WATER_I18N[waterKey][lang]) ? WATER_I18N[waterKey][lang] : waterClean;

    // Profit
    const profitRaw = rec.estimated_profit || "";
    const profitSuffix = (UI_LABELS["total"][lang]) || "total";
    const profitTr = profitRaw.replace(/total|कुल|एकूण|మొత్తం|ആകെ|ਕੁੱਲ/g, profitSuffix);

    return {
        ...rec,
        raw_crop_key: cropKey,
        recommended_crop: cropLangInfo.name,
        reasoning: cropLangInfo.reasoning,
        suitable_soil: soilsTr,
        suitable_season: seasonsTr,
        water_req: waterTr,
        fertilizer: cropLangInfo.fertilizer,
        expected_yield: cropLangInfo.yield,
        estimated_profit: profitTr
    };
};

let currentLanguage = localStorage.getItem('agro_language') || 'English';
let allSchemesList = [];

// Global Language Dispatcher
window.setGlobalLanguage = function(newLang) {
    if (!TRANSLATIONS[newLang]) return;
    currentLanguage = newLang;
    localStorage.setItem('agro_language', currentLanguage);
    
    // Sync all global dropdowns
    document.querySelectorAll('#global-lang-select').forEach(select => {
        select.value = currentLanguage;
    });

    // Fire custom event for cross-component listeners
    window.dispatchEvent(new CustomEvent('agro_lang_change', { detail: { language: currentLanguage } }));

    applyTranslations();
    if (typeof renderSchemes === 'function') renderSchemes();
};

document.addEventListener('DOMContentLoaded', async () => {
    currentLanguage = localStorage.getItem('agro_language') || 'English';

    // 1. Language selector setup & sync
    document.querySelectorAll('#global-lang-select').forEach(select => {
        select.value = currentLanguage;
        select.addEventListener('change', (e) => {
            window.setGlobalLanguage(e.target.value);
        });
    });

    // Listen for storage events across tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'agro_language' && e.newValue) {
            window.setGlobalLanguage(e.newValue);
        }
    });

    applyTranslations();

    // 2. Navbar scrolled animation
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar-custom');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // 3. User session navbar badge or button
    updateNavbarUserSection();

    // 4. Hero text typewriter effect
    initTypewriter();

    // 5. Hero mouse parallax effect
    initMouseParallax();

    // 6. Load & Render Schemes
    await loadInitialSchemes();

    // 7. Search & Category filter logic
    const searchInput = document.getElementById('scheme-search-input');
    const categorySelect = document.getElementById('category-filter-select');
    
    if (searchInput) {
        searchInput.addEventListener('input', () => renderSchemes());
    }
    if (categorySelect) {
        categorySelect.addEventListener('change', () => renderSchemes());
    }

    // 8. Voice Recognition mic button click handler
    initVoiceSearch();

    // 9. FAQ Accordion Toggle
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                item.classList.toggle('active');
            });
        }
    });
});

// Update navbar based on login state
function updateNavbarUserSection() {
    const user = SessionManager.getCurrentUser();
    const actionContainer = document.getElementById('navbar-auth-actions');
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS["English"];

    if (actionContainer) {
        if (user) {
            actionContainer.innerHTML = `
                <a href="dashboard.html" class="btn-premium btn-primary-custom" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">
                    <i class="fas fa-columns"></i> ${t.dashboard || 'Dashboard'}
                </a>
            `;
        } else {
            actionContainer.innerHTML = `
                <a href="login.html" class="btn-premium btn-secondary-custom" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">${t.login || 'Login'}</a>
                <a href="login.html?signup=true" class="btn-premium btn-primary-custom" style="padding: 0.5rem 1.25rem; font-size: 0.85rem;">${t.register || 'Register'}</a>
            `;
        }
    }
}

// Typewriter animation
function initTypewriter() {
    const textTarget = document.getElementById('typewriter-text');
    if (!textTarget) return;

    const words = ["AgroVision", "Smart Matching", "AI Crop Advice", "Subsidy Tracking"];
    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIdx];
        if (isDeleting) {
            textTarget.textContent = currentWord.substring(0, charIdx - 1);
            charIdx--;
        } else {
            textTarget.textContent = currentWord.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 50 : 150;

        if (!isDeleting && charIdx === currentWord.length) {
            speed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx = (wordIdx + 1) % words.length;
            speed = 500;
        }

        setTimeout(type, speed);
    }

    type();
}

// Mouse parallax effect
function initMouseParallax() {
    const container = document.querySelector('.hero-image-container');
    const image = document.querySelector('.hero-image-wrapper');
    if (!container || !image) return;

    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left - (rect.width / 2);
        const y = e.clientY - rect.top - (rect.height / 2);
        image.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px) rotateY(${x * 0.02}deg) rotateX(${-y * 0.02}deg)`;
    });

    container.addEventListener('mouseleave', () => {
        image.style.transform = 'translate(0, 0) rotateY(0) rotateX(0)';
    });
}

// Load schemes from backend
async function loadInitialSchemes() {
    const listContainer = document.getElementById('schemes-loader-placeholder');
    if (listContainer) {
        listContainer.innerHTML = `<div style="text-align:center; padding: 2rem;"><i class="fas fa-spinner fa-spin" style="font-size:2rem; color:#2563eb;"></i><p style="margin-top:10px; color:#64748b;">Loading schemes...</p></div>`;
    }

    if (typeof ApiService !== 'undefined' && typeof ApiService.getAllSchemes === 'function') {
        allSchemesList = await ApiService.getAllSchemes();
        renderSchemes();
    }
}

// Master DOM Translation Engine
function applyTranslations() {
    const lang = localStorage.getItem('agro_language') || 'English';
    currentLanguage = lang;
    const t = TRANSLATIONS[lang] || TRANSLATIONS["English"];

    // 1. Sync dropdowns
    const langs = [
        { val: "English", label: "English" },
        { val: "हिंदी", label: "हिंदी" },
        { val: "मराठी", label: "मराठी" },
        { val: "తెలుగు", label: "తెలుగు" },
        { val: "മലയാളം", label: "മലയാളം" },
        { val: "ਪੰਜਾਬੀ", label: "ਪੰਜਾਬੀ" },
        { val: "ગુજરાતી", label: "ગુજરાતી" }
    ];
    
    document.querySelectorAll('#global-lang-select').forEach(select => {
        select.innerHTML = langs.map(l => `<option value="${l.val}">${l.label}</option>`).join('');
        select.value = currentLanguage;
    });

    // Universal data-i18n attribute translator
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t && t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key];
            } else {
                const icon = el.querySelector('i');
                if (icon) {
                    el.innerHTML = `${icon.outerHTML} ${t[key]}`;
                } else {
                    el.textContent = t[key];
                }
            }
        }
    });

    // 2. Hero Elements
    const tagline = document.getElementById('hero-tagline');
    if (tagline) tagline.textContent = t.hero_tagline;

    const desc = document.getElementById('hero-desc');
    if (desc) desc.textContent = t.hero_desc;

    // 3. Section & Page Titles
    const headerTitle = document.getElementById('discovery-header-title') || document.querySelector('.header-title-section h1');
    if (headerTitle) {
        const path = window.location.pathname;
        if (path.includes('dashboard') || document.getElementById('run-recommend-btn')) {
            headerTitle.textContent = t.crop_advisor_title;
        } else if (path.includes('discovery')) {
            headerTitle.textContent = t.explore_header;
        } else if (path.includes('chatbot')) {
            headerTitle.textContent = t.chatbot_title;
        } else if (path.includes('videos')) {
            headerTitle.textContent = t.videos_title;
        } else if (path.includes('profile')) {
            headerTitle.textContent = t.profile_title;
        } else if (path.includes('resume')) {
            headerTitle.textContent = t.resume_title;
        }
    }

    const headerSub = document.querySelector('.header-subtitle');
    if (headerSub) {
        const path = window.location.pathname;
        const user = (typeof SessionManager !== 'undefined') ? SessionManager.getCurrentUser() : null;
        const farmerName = user ? user.name : (document.getElementById('welcome-farmer-name') ? document.getElementById('welcome-farmer-name').textContent : 'Farmer');
        
        if (path.includes('dashboard') || document.getElementById('run-recommend-btn')) {
            headerSub.innerHTML = `${t.welcome_back}, <strong id="welcome-farmer-name" style="color:#2563eb;">${farmerName}</strong>! ${t.crop_advisor_sub}`;
        } else if (path.includes('discovery')) {
            headerSub.textContent = t.explore_sub;
        } else if (path.includes('chatbot')) {
            headerSub.textContent = t.chatbot_sub;
        } else if (path.includes('videos')) {
            headerSub.textContent = t.videos_sub;
        } else if (path.includes('profile')) {
            headerSub.textContent = t.profile_sub;
        } else if (path.includes('resume')) {
            headerSub.textContent = t.resume_sub;
        }
    }

    // 4. Panel Titles & Descriptions
    const panelTitle = document.querySelector('.panel-title');
    if (panelTitle && (window.location.pathname.includes('dashboard') || document.getElementById('run-recommend-btn'))) {
        panelTitle.innerHTML = `<i class="fas fa-seedling" style="color:#10b981;"></i> ${t.panel_title}`;
    }

    const panelDesc = document.querySelector('.panel-card > p');
    if (panelDesc && (window.location.pathname.includes('dashboard') || document.getElementById('run-recommend-btn'))) {
        panelDesc.textContent = t.panel_desc;
    }

    const nutrientsHeader = document.querySelector('.col-lg-6 h4');
    if (nutrientsHeader) {
        nutrientsHeader.textContent = t.soil_nutrients_header;
    }

    // 5. Form Labels on Crop Advisor / Dashboard / Login
    const labelMap = {
        'soil-n': t.nitrogen,
        'soil-p': t.phosphorus,
        'soil-k': t.potassium,
        'soil-temp': t.temperature,
        'soil-hum': t.humidity,
        'soil-ph': t.soil_ph,
        'soil-rain': t.rainfall,
        'soil-type-select': t.soil_type,
        'soil-water-select': t.water_avail,
        'soil-season-select': t.season,
        'soil-land': t.land_size,
        'soil-prev-crop': t.prev_crop,
        'login-phone': t.mobile_number,
        'reg-name': t.full_name,
        'reg-phone': t.mobile_number,
        'reg-state': t.state_location,
        'reg-land': t.land_acres
    };

    Object.keys(labelMap).forEach(id => {
        const label = document.querySelector(`label[for="${id}"]`);
        if (label && labelMap[id]) {
            const icon = label.querySelector('i');
            if (icon) {
                label.innerHTML = `${icon.outerHTML} ${labelMap[id]}`;
            } else {
                label.textContent = labelMap[id];
            }
        }
    });

    // Login page headings & buttons
    const loginCardH2 = document.querySelector('#login-card h2');
    if (loginCardH2) loginCardH2.textContent = t.login_welcome || 'Welcome back';

    const loginCardP = document.querySelector('#login-card p');
    if (loginCardP) loginCardP.textContent = t.login_sub || 'Enter your registered mobile number to access your account.';

    const loginSubmitBtn = document.getElementById('login-submit-btn');
    if (loginSubmitBtn) loginSubmitBtn.innerHTML = `<i class="fas fa-sign-in-alt"></i> ${t.access_platform || 'Access My Platform'}`;

    const regCardH2 = document.querySelector('#register-card h2');
    if (regCardH2) regCardH2.textContent = t.create_profile || 'Create farm profile';

    const regCardP = document.querySelector('#register-card p');
    if (regCardP) regCardP.textContent = t.reg_sub || 'Check eligible government matching schemes in seconds.';

    const regSubmitBtn = document.getElementById('register-submit-btn');
    if (regSubmitBtn) regSubmitBtn.innerHTML = `<i class="fas fa-user-plus"></i> ${t.create_farm_btn || 'Create Farm Profile'}`;

    // 6. Action Buttons
    const detectBtn = document.getElementById('detect-weather-btn');
    if (detectBtn) detectBtn.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${t.detect_weather}`;

    const searchCityBtn = document.getElementById('search-city-btn');
    if (searchCityBtn) searchCityBtn.innerHTML = `<i class="fas fa-search"></i> ${t.search_city}`;

    const recommendBtn = document.getElementById('run-recommend-btn');
    if (recommendBtn && !recommendBtn.disabled) recommendBtn.innerHTML = `<i class="fas fa-seedling"></i> ${t.get_recommendation}`;

    const profileFormBtn = document.querySelector('#profile-form button[type="submit"]');
    if (profileFormBtn) profileFormBtn.innerHTML = `<i class="fas fa-save"></i> ${t.save_profile_match}`;

    const workflowBtn = document.getElementById('run-workflow-btn');
    if (workflowBtn) workflowBtn.innerHTML = `<i class="fas fa-bolt"></i> ${t.run_automation}`;

    const dlBtn = document.getElementById('download-pdf-report-btn');
    if (dlBtn) dlBtn.innerHTML = `<i class="fas fa-download"></i> ${t.download_pdf}`;

    const searchInput = document.getElementById('scheme-search-input');
    if (searchInput) searchInput.placeholder = t.search_placeholder;

    const chatInput = document.getElementById('chat-text-input');
    if (chatInput) chatInput.placeholder = t.chat_placeholder;

    // 7. Top Navbar Links
    document.querySelectorAll('.nav-menu .nav-link-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href === 'index.html') link.textContent = t.home || 'Home';
        else if (href === 'discovery.html') link.textContent = t.sidebar_scheme_discovery || 'Discovery';
        else if (href === 'dashboard.html') link.textContent = t.sidebar_crop_advisor || 'Dashboard';
        else if (href === 'chatbot.html') link.textContent = t.sidebar_advisor_bot || 'AI Advisor';
    });

    // 8. Sidebar Links via href
    const linkMap = {
        'dashboard.html': t.sidebar_crop_advisor,
        'discovery.html': t.sidebar_scheme_discovery,
        'videos.html': t.sidebar_video_tutorials,
        'profile.html': t.sidebar_ai_matching,
        'resume.html': t.sidebar_credentials_resume,
        'chatbot.html': t.sidebar_advisor_bot,
        'index.html': t.sidebar_return_home
    };

    document.querySelectorAll('.sidebar-menu .sidebar-link').forEach(link => {
        const href = link.getAttribute('href');
        const span = link.querySelector('span');
        if (span && linkMap[href]) {
            span.textContent = linkMap[href];
        }
    });

    updateNavbarUserSection();
    if (typeof window.renderCropCards === 'function') {
        window.renderCropCards();
    }
}

// Make globally accessible
window.applyTranslations = applyTranslations;

// Render dynamic scheme items list
function renderSchemes() {
    const listContainer = document.getElementById('schemes-list-container');
    const placeholder = document.getElementById('schemes-loader-placeholder');
    if (!listContainer) return;

    if (placeholder) placeholder.style.display = 'none';
    listContainer.innerHTML = '';

    const searchInput = document.getElementById('scheme-search-input');
    const categorySelect = document.getElementById('category-filter-select');

    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const selectedCategory = categorySelect ? categorySelect.value : 'All';
    const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS["English"];

    // Filter
    const filtered = allSchemesList.filter(scheme => {
        const matchesQuery = scheme.scheme_name.toLowerCase().includes(query) || 
                             scheme.full_name.toLowerCase().includes(query) ||
                             scheme.category.toLowerCase().includes(query);
        const matchesCategory = selectedCategory === 'All' || scheme.category.toLowerCase().includes(selectedCategory.toLowerCase());
        return matchesQuery && matchesCategory;
    });

    if (filtered.length === 0) {
        listContainer.innerHTML = `
            <div style="text-align: center; padding: 3rem; background:#ffffff; border-radius:18px; border: 1px solid var(--border-color);">
                <i class="fas fa-folder-open" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                <h4 style="font-weight:600;">No schemes found</h4>
                <p style="color:var(--text-secondary); margin-top:5px;">Try adjusting your keywords or category filters.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((scheme, index) => {
        const card = document.createElement('div');
        card.className = 'scheme-item-card glass-panel hover-glow fade-in-section is-visible';
        
        const typeClass = scheme.type.toLowerCase() === 'central' ? 'badge-central' : 'badge-state';
        const applyUrl = scheme.apply_url || '#';
        const applyBtnHtml = applyUrl !== '#' 
            ? `<a href="${applyUrl}" target="_blank" class="btn-premium btn-primary-custom" style="font-size: 0.85rem;"><i class="fas fa-external-link-alt"></i> ${t.apply_now}</a>`
            : `<button class="btn-premium btn-primary-custom" onclick="applyDirect('${scheme.scheme_name}')" style="font-size: 0.85rem;">${t.apply_now}</button>`;

        card.innerHTML = `
            <div class="scheme-details">
                <div class="scheme-header-inline">
                    <h3 style="font-size: 1.3rem;">🌾 ${scheme.scheme_name}</h3>
                    <span style="font-size:0.9rem; color:var(--text-secondary); font-weight:500;">- ${scheme.full_name}</span>
                </div>
                <div class="scheme-badges">
                    <span class="badge-custom ${typeClass}">${scheme.type}</span>
                    <span class="badge-custom badge-cat">${scheme.category}</span>
                </div>
                <p class="scheme-text-block"><strong>${t.eligibility}:</strong> ${scheme.eligibility}</p>
                <p class="scheme-text-block"><strong>${t.benefits}:</strong> ${scheme.benefits}</p>
                <button class="collapsible-trigger" onclick="toggleDetails(${index})">
                    <i class="fas fa-chevron-down" id="chevron-${index}"></i> ${t.more_details || 'More Details'}
                </button>
            </div>
            <div class="scheme-action-col">
                ${applyBtnHtml}
            </div>
            <div class="scheme-details-expand" id="expand-${index}">
                <div class="expand-detail-group">
                    <span class="expand-detail-label">📍 ${t.target_region || 'Target Region'}</span>
                    <span class="expand-detail-val">${scheme.state || (t.all_india || 'All India')}</span>
                </div>
                <div class="expand-detail-group">
                    <span class="expand-detail-label">👥 ${t.target_roles || 'Target Roles'}</span>
                    <span class="expand-detail-val">${(scheme.target_roles || []).join(', ')}</span>
                </div>
                <div class="expand-detail-group">
                    <span class="expand-detail-label">📄 ${t.required_docs || 'Required Documents'}</span>
                    <span class="expand-detail-val">${(scheme.documents_required || []).join(', ')}</span>
                </div>
                <div class="expand-detail-group">
                    <span class="expand-detail-label">⚙️ ${t.application_mode || 'Application Mode'}</span>
                    <span class="expand-detail-val">${scheme.application_mode}</span>
                </div>
            </div>
        `;
        listContainer.appendChild(card);
    });
}

// Collapsible expand toggle
function toggleDetails(index) {
    const element = document.getElementById(`expand-${index}`);
    const chevron = document.getElementById(`chevron-${index}`);
    if (element) {
        const isCollapsed = window.getComputedStyle(element).display === 'none';
        if (isCollapsed) {
            element.style.display = 'grid';
            chevron.className = 'fas fa-chevron-up';
        } else {
            element.style.display = 'none';
            chevron.className = 'fas fa-chevron-down';
        }
    }
}

// Direct Application click for mock
function applyDirect(schemeName) {
    const user = SessionManager.getCurrentUser();
    if (!user) {
        alert('Please login/register first to apply for schemes.');
        window.location.href = 'login.html';
        return;
    }
    window.location.href = 'dashboard.html?apply=' + encodeURIComponent(schemeName);
}

// Speech Recognition for search field
function initVoiceSearch() {
    const micBtn = document.getElementById('search-mic-btn');
    const searchInput = document.getElementById('scheme-search-input');
    if (!micBtn || !searchInput) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        micBtn.style.display = 'none';
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    const REC_LANG_CODES = {
        'English': 'en-IN',
        'Hindi': 'hi-IN', 'हिंदी': 'hi-IN',
        'Marathi': 'mr-IN', 'मराठी': 'mr-IN',
        'Telugu': 'te-IN', 'తెలుగు': 'te-IN',
        'Malayalam': 'ml-IN', 'മലയാളം': 'ml-IN',
        'Punjabi': 'pa-IN', 'ਪੰਜਾਬੀ': 'pa-IN',
        'Gujarati': 'gu-IN', 'ગુજરાતી': 'gu-IN'
    };

    let isListening = false;

    micBtn.addEventListener('click', () => {
        if (isListening) {
            try { recognition.stop(); } catch(e) {}
            return;
        }

        const activeLang = localStorage.getItem('agro_language') || 'English';
        recognition.lang = REC_LANG_CODES[activeLang] || 'en-IN';

        try {
            recognition.start();
        } catch (e) {
            console.error('Speech recognition failed to start:', e);
        }
    });

    recognition.onstart = () => {
        isListening = true;
        micBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
        micBtn.style.color = '#ef4444';
        micBtn.style.borderColor = '#ef4444';
        searchInput.placeholder = "Listening... Speak now";
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0] ? event.results[0][0].transcript.trim() : '';
        if (transcript) {
            searchInput.value = transcript;
            renderSchemes();
        }
    };

    recognition.onerror = (e) => {
        console.error('Speech Recognition Error:', e.error);
        searchInput.placeholder = "Speech error: " + e.error;
    };

    recognition.onend = () => {
        isListening = false;
        micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        micBtn.style.color = '';
        micBtn.style.borderColor = '';
        const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS["English"];
        searchInput.placeholder = t.search_placeholder;
    };
}

// Centralized Text-to-Speech Engine (High Quality Backend Neural Voice with Browser Fallback)
window.speakText = function(text, lang, onEndCallback) {
    if (!text || !text.trim()) {
        if (typeof onEndCallback === 'function') onEndCallback();
        return;
    }

    const selectedLang = lang || localStorage.getItem('agro_language') || 'Hindi';

    // Stop active audio/synthesis
    if (window.currentAudioObj) {
        try { window.currentAudioObj.pause(); window.currentAudioObj = null; } catch(e) {}
    }
    if ('speechSynthesis' in window) {
        try { window.speechSynthesis.cancel(); } catch(e) {}
    }

    // Attempt High Quality Backend Edge TTS
    if (typeof ApiService !== 'undefined' && typeof ApiService.getTTSAudioUrl === 'function') {
        ApiService.getTTSAudioUrl(text, selectedLang).then(audioUrl => {
            let audioObj = new Audio(audioUrl);
            window.currentAudioObj = audioObj;
            
            audioObj.onended = () => {
                window.currentAudioObj = null;
                if (typeof onEndCallback === 'function') onEndCallback();
            };
            audioObj.onerror = () => {
                window.currentAudioObj = null;
                fallbackBrowserTTS(text, selectedLang, onEndCallback);
            };

            audioObj.play().catch(err => {
                console.warn('Audio autoplay prevented, falling back:', err);
                fallbackBrowserTTS(text, selectedLang, onEndCallback);
            });
        }).catch(err => {
            console.warn('Backend TTS failed, trying browser SpeechSynthesis:', err);
            fallbackBrowserTTS(text, selectedLang, onEndCallback);
        });
    } else {
        fallbackBrowserTTS(text, selectedLang, onEndCallback);
    }
};

function fallbackBrowserTTS(text, selectedLang, onEndCallback) {
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis is not supported in this browser.');
        if (typeof onEndCallback === 'function') onEndCallback();
        return;
    }

    try {
        const langMap = {
            'English': 'en-IN',
            'Hindi': 'hi-IN', 'हिंदी': 'hi-IN',
            'Marathi': 'mr-IN', 'मराठी': 'mr-IN',
            'Telugu': 'te-IN', 'తెలుగు': 'te-IN',
            'Malayalam': 'ml-IN', 'മലയാളം': 'ml-IN',
            'Punjabi': 'pa-IN', 'ਪੰਜਾਬੀ': 'pa-IN',
            'Gujarati': 'gu-IN', 'ગુજરાતી': 'gu-IN'
        };

        const targetLang = langMap[selectedLang] || 'hi-IN';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = targetLang;
        utterance.rate = 0.92;
        utterance.pitch = 1.0;

        if (typeof onEndCallback === 'function') {
            utterance.onend = () => { onEndCallback(); };
            utterance.onerror = () => { onEndCallback(); };
        }

        window.speechSynthesis.speak(utterance);
    } catch (e) {
        console.error('Browser Speech Synthesis Error:', e);
        if (typeof onEndCallback === 'function') onEndCallback();
    }
}
