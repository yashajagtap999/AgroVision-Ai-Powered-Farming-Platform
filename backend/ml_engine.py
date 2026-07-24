import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeClassifier
import logging

logger = logging.getLogger(__name__)

CROP_TRANSLATIONS = {
    "Paddy": {
        "English": { "name": "Paddy (Rice)", "reasoning": "Paddy (Rice) is highly suitable due to high water availability, hot and humid weather, and clay/loamy soil structures.", "fertilizer": "Urea (Nitrogen-rich), DAP, and MOP", "yield": "3.5 - 4.5 tons/hectare" },
        "हिंदी": { "name": "धान (चावल)", "reasoning": "उच्च जल उपलब्धता, गर्म और आर्द्र मौसम तथा चिकनी/दोमट मिट्टी की संरचना के कारण धान (चावल) अत्यधिक उपयुक्त है।", "fertilizer": "यूरिया (नाइट्रोजन समृद्ध), डीएपी और एमओपी", "yield": "3.5 - 4.5 टन/हेक्टेयर" },
        "मराठी": { "name": "तांदूळ (भात)", "reasoning": "पाण्याची मुबलक उपलब्धता, उष्ण व दमट हवामान आणि चिकन/गाळाच्या मातीच्या संरचनेमुळे भात (तांदूळ) पीक अत्यंत योग्य आहे.", "fertilizer": "युरिया (नायट्रोजन समृद्ध), डीएपी (DAP) आणि एमओपी (MOP)", "yield": "३.५ - ४.५ टन/हेक्टर" },
        "తెలుగు": { "name": "వరి", "reasoning": "అధిక నీటి లభ్యత, వేడి మరియు తేమతో కూడిన వాతావరణం మరియు మట్టి/ఒండ్రు నేలల నిర్మాణాల వల్ల వరి పంట అత్యంత అనుకూలమైనది.", "fertilizer": "యూరియా, డిఎపి మరియు ఎంఒపి", "yield": "3.5 - 4.5 టన్నులు/హెక్టారు" },
        "മലയാളം": { "name": "നെല്ല് (അരി)", "reasoning": "കൂടിയ ജലലഭ്യത, ചൂടും ഈർപ്പവുമുള്ള കാലാവസ്ഥ, കളിമണ്ണ്/എക്കൽ മണ്ണ് എന്നിവ കാരണം നെൽകൃഷി വളരെ അനുയോജ്യമാണ്.", "fertilizer": "യൂറിയ, ഡിഎപി, എംഒപി", "yield": "3.5 - 4.5 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { "name": "ਝੋਨਾ (ਚਾਵਲ)", "reasoning": "ਵੱਧ ਪਾਣੀ ਦੀ ਉਪਲਬਧਤਾ, ਗਰਮ ਅਤੇ ਨਮੀ ਵਾਲੇ ਮੌਸਮ ਅਤੇ ਚਿਕਣੀ/ਦੋਮਟ ਮਿੱਟੀ ਦੇ ਕਾਰਨ ਝੋਨੇ ਦੀ ਫਸਲ ਬਹੁਤ ਢੁਕਵੀਂ ਹੈ।", "fertilizer": "ਯੂਰੀਆ, ਡੀਏਪੀ ਅਤੇ ਐਮਓਪੀ", "yield": "3.5 - 4.5 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { "name": "ડાંગર (ચોખા)", "reasoning": "પાણીની વધુ પ્રાપ્યતા, ગરમ અને ભેજવાળા વાતાવરણ અને માટી/કાંપ વાળી જમીનને કારણે ડાંગર (ચોખા) નો પાક અત્યંત અનુકૂળ છે.", "fertilizer": "યુરિયા, ડીએપી અને એમઓપી", "yield": "3.5 - 4.5 ટન/હેક્ટર" }
    },
    "Wheat": {
        "English": { "name": "Wheat", "reasoning": "Wheat thrives in cooler winter seasons with moderate watering regimes and balanced loam soil structures.", "fertilizer": "Balanced NPK (4:2:1 ratio) + Superphosphate", "yield": "3.0 - 4.0 tons/hectare" },
        "हिंदी": { "name": "गेहूं", "reasoning": "गेहूं मध्यम सिंचाई और संतुलित दोमट मिट्टी की संरचना के साथ ठंडे सर्दियों के मौसम में पनपता है।", "fertilizer": "संतुलित एनपीके (4:2:1) + सुपरफॉस्फेट", "yield": "3.0 - 4.0 टन/हेक्टेयर" },
        "मराठी": { "name": "गव्हाचे पीक", "reasoning": "मध्यम पाणी आणि संतुलित गाळाच्या मातीत थंड हिवाळ्याच्या हंगामात गव्हाचे पीक उत्तम येते.", "fertilizer": "संतुलित एनपीके (NPK 4:2:1) + सुपरफॉस्फेट", "yield": "३.० - ४.० टन/हेक्टर" },
        "తెలుగు": { "name": "గోధుమ", "reasoning": "మితమైన నీటిపారుదల మరియు సమతుల్య ఒండ్రు నేలలో చల్లని శీతాకాలంలో గోధుమ పంట బాగా పెరుగుతుంది.", "fertilizer": "సమతుల్య ఎన్‌పికె (4:2:1) + సూపర్ ఫాస్ఫేట్", "yield": "3.0 - 4.0 టన్నులు/హెక్టారు" },
        "മലയാളം": { "name": "ഗോതമ്പ്", "reasoning": "മിതമായ ജലസേചനവും എക്കൽ മണ്ണുമുള്ള തണുപ്പുള്ള ശീതകാലത്ത് ഗോതമ്പ് നന്നായി വളരുന്നു.", "fertilizer": "എൻപികെ (4:2:1) + സൂപ്പർ ഫോസ്ഫേറ്റ്", "yield": "3.0 - 4.0 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { "name": "ਕਣਕ", "reasoning": "ਕਣਕ ਠੰਢੇ ਸਰਦੀਆਂ ਦੇ ਮੌਸਮ ਵਿੱਚ ਮੱਧਮ ਸਿੰਚਾਈ ਅਤੇ ਦੋਮਟ ਮਿੱਟੀ ਵਿੱਚ ਬਹੁਤ ਵਧੀਆ ਹੁੰਦੀ ਹੈ।", "fertilizer": "ਸੰਤੁਲਿਤ ਐਨਪੀਕੇ + ਸੁਪਰਫਾਸਫੇਟ", "yield": "3.0 - 4.0 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { "name": "ઘઉં", "reasoning": "ઘઉં મધ્યમ પિયત અને કાંપ વાળી જમીનમાં ઠંડી શિયાળાની ઋતુમાં ઉત્તમ થાય છે.", "fertilizer": "સંતુલિત એનપીકે + સુપરફોસ્ફેટ", "yield": "3.0 - 4.0 ટન/હેક્ટર" }
    },
    "Cotton": {
        "English": { "name": "Cotton", "reasoning": "Cotton is highly recommended for black clayey soil which holds moisture well during the warm season.", "fertilizer": "Nitrogen and Potash NPK 120:60:60", "yield": "1.5 - 2.5 tons/hectare" },
        "हिंदी": { "name": "कपास", "reasoning": "गर्म मौसम के दौरान नमी बनाए रखने वाली काली चिकनी मिट्टी के लिए कपास की अत्यधिक सिफारिश की जाती है।", "fertilizer": "नाइट्रोजन और पोटाश NPK 120:60:60", "yield": "1.5 - 2.5 टन/हेक्टेयर" },
        "मराठी": { "name": "कापूस", "reasoning": "उबदार हंगामात ओलावा टिकवून ठेवणाऱ्या काळ्या चिकणमातीसाठी कापूस पिकाची शिफारस केली जाते.", "fertilizer": "नायट्रोजन आणि पोटॅश NPK 120:60:60", "yield": "१.५ - २.५ टन/हेक्टर" },
        "తెలుగు": { "name": "పత్తి", "reasoning": "వెచ్చని కాలంలో తేమను నిలబెట్టుకునే నల్లరేగడి నేలలకు పత్తి పంట ఎంతో అనుకూలమైనది.", "fertilizer": "నైట్రోజన్ మరియు పొటాష్ NPK 120:60:60", "yield": "1.5 - 2.5 టన్నులు/హెక్టారు" },
        "മലയാളം": { "name": "പരുത്തി", "reasoning": "ചൂടുള്ള സമയത്ത് ഈർപ്പം നിലനിർത്തുന്ന കറുത്ത കളിമണ്ണിൽ പരുത്തി കൃഷി മികച്ചതാണ്.", "fertilizer": "നൈട്രജൻ, പൊട്ടാഷ് NPK 120:60:60", "yield": "1.5 - 2.5 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { "name": "ਕਪਾਹ", "reasoning": "ਗਰਮ ਮੌਸਮ ਦੌਰਾਨ ਨਮੀ ਬਣਾਈ ਰੱਖਣ ਵਾਲੀ ਕਾਲੀ ਮਿੱਟੀ ਲਈ ਕਪਾਹ ਦੀ ਫਸਲ ਬਹੁਤ ਵਧੀਆ ਹੈ।", "fertilizer": "ਨਾਇਟ੍ਰੋਜਨ ਅਤੇ ਪੋਟਾਸ਼ NPK 120:60:60", "yield": "1.5 - 2.5 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { "name": "કપાસ", "reasoning": "ગરમ ઋતુ દરમિયાન ભેજ જાળવી રાખતી કાળી માટીવાળી જમીન માટે કપાસની ભલામણ કરવામાં આવે છે.", "fertilizer": "નાઇટ્રોજન અને પોટાશ NPK 120:60:60", "yield": "1.5 - 2.5 ટન/હેક્ટર" }
    },
    "Sugarcane": {
        "English": { "name": "Sugarcane", "reasoning": "Deep alluvial soils combined with high rainfall or heavy irrigation support optimal sugarcane growth.", "fertilizer": "High Nitrogen NPK 150:80:60", "yield": "70 - 90 tons/hectare" },
        "हिंदी": { "name": "गन्ना", "reasoning": "भारी सिंचाई या अधिक वर्षा के साथ गहरी दोमट मिट्टी गन्ने की सर्वोत्तम वृद्धि में सहायक है।", "fertilizer": "उच्च नाइट्रोजन युक्त NPK 150:80:60", "yield": "70 - 90 टन/हेक्टेयर" },
        "मराठी": { "name": "ऊस", "reasoning": "ज्यादा पाऊस किंवा भरघोस सिंचनासह खोल गाळाची माती उसाच्या उत्तम वाढीस मदत करते.", "fertilizer": "उच्च नायट्रोजन युक्त NPK 150:80:60", "yield": "७० - ९० टन/हेक्टर" },
        "తెలుగు": { "name": "చెరకు", "reasoning": "అధిక వర్షపాతం లేదా భారీ నీటిపారుదలతో కూడిన లోతైన ఒండ్రు నేలలు చెరకు సరైన పెరుగుదలకు తోడ్పడతాయి.", "fertilizer": "అధిక నైట్రోజన్ NPK 150:80:60", "yield": "70 - 90 టన్నులు/హెక్టారు" },
        "മലയാളം": { "name": "കരിമ്പ്", "reasoning": "കൂടിയ മഴയോ നല്ല ജലസേചനമോ ഉള്ള എക്കൽ മണ്ണിൽ കരിമ്പ് മികച്ച രീതിയിൽ വളരുന്നു.", "fertilizer": "ഉയർന്ന നൈട്രജൻ NPK 150:80:60", "yield": "70 - 90 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { "name": "ਕਮਾਦ", "reasoning": "ਭਾਰੀ ਸਿੰਚਾਈ ਜਾਂ ਵੱਧ ਮੀਂਹ ਦੇ ਨਾਲ ਡੂੰਘੀ ਦੋਮਟ ਮਿੱਟੀ ਕਮਾਦ ਦੇ ਵਾਧੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਹੈ।", "fertilizer": "ਉੱਚ ਨਾਇਟ੍ਰੋਜਨ NPK 150:80:60", "yield": "70 - 90 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { "name": "શેરડી", "reasoning": "વધુ વરસાદ અથવા ભારે પિયત સાથે ઊંડી કાંપ વાળી જમીન શેરડીના ઉત્તમ વિકાસમાં મદદરૂપ છે.", "fertilizer": "વધુ નાઇટ્રોજન NPK 150:80:60", "yield": "70 - 90 ટન/હેક્ટર" }
    },
    "Maize": {
        "English": { "name": "Maize", "reasoning": "Warm sunny days, loamy or red well-drained soils make Maize a highly efficient and safe choice.", "fertilizer": "Balanced NPK 120:60:40", "yield": "4.5 - 5.5 tons/hectare" },
        "हिंदी": { "name": "मक्का", "reasoning": "धूप वाले गर्म दिन, दोमट या लाल जल निकासी वाली मिट्टी मक्के को एक अत्यंत कुशल और सुरक्षित विकल्प बनाती है।", "fertilizer": "संतुलित NPK 120:60:40", "yield": "4.5 - 5.5 टन/हेक्टेयर" },
        "मराठी": { "name": "मका", "reasoning": "उबदार सूर्यप्रकाश, गाळाची किंवा लाल पाण्याचा निचरा होणारी माती मका पिकासाठी अत्यंत कार्यक्षम व सुरक्षित पर्याय बनवते.", "fertilizer": "संतुलित NPK 120:60:40", "yield": "४.५ - ५.५ टन/हेक्टर" },
        "తెలుగు": { "name": "మొక్కజొన్న", "reasoning": "వెచ్చని ఎండ రోజులు, ఒండ్రు లేదా ఎర్రటి నీరు ఇంకే నేలలు మొక్కజొన్నను సురక్షితమైన ఎంపికగా చేస్తాయి.", "fertilizer": "సమతుల్య NPK 120:60:40", "yield": "4.5 - 5.5 టన్నులు/హెక్టారు" },
        "മലയാളം": { "name": "ചോളം", "reasoning": "നല്ല സൂര്യപ്രകാശവും എക്കൽ/ചുവന്ന മണ്ണുമുള്ള ഇടങ്ങളിൽ ചോളം വളരെ അനുയോജ്യമാണ്.", "fertilizer": "സമീകൃത NPK 120:60:40", "yield": "4.5 - 5.5 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { "name": "ਮੱਕੀ", "reasoning": "ਧੁੱਪ ਵਾਲੇ ਦਿਨ ਅਤੇ ਚੰਗੀ ਦੋਮਟ ਜਾਂ ਲਾਲ ਮਿੱਟੀ ਮੱਕੀ ਲਈ ਬਹੁਤ ਵਧੀਆ ਵਿਕਲਪ ਹਨ।", "fertilizer": "ਸੰਤੁਲਿਤ NPK 120:60:40", "yield": "4.5 - 5.5 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { "name": "મકાઈ", "reasoning": "તડકાવાળા દિવસો અને કાંપ અથવા લાલ જમીન મકાઈ માટે અત્યંત ઉત્તમ વિકલ્પ છે.", "fertilizer": "સંતુલિત NPK 120:60:40", "yield": "4.5 - 5.5 ટન/હેક્ટર" }
    },
    "Groundnut": {
        "English": { "name": "Groundnut", "reasoning": "Groundnut grows exceptionally well in sandy loam soils that let pegs penetrate the soil easily.", "fertilizer": "NPK 20:40:40 and Gypsum", "yield": "2.0 - 3.0 tons/hectare" },
        "हिंदी": { "name": "मूंगफली", "reasoning": "बलुई दोमट मिट्टी में मूंगफली बहुत अच्छी तरह से बढ़ती है जिससे सुइयां आसानी से मिट्टी में प्रवेश कर सकती हैं।", "fertilizer": "NPK 20:40:40 और जिप्सम", "yield": "2.0 - 3.0 टन/हेक्टेयर" },
        "मराठी": { "name": "भुईमूग", "reasoning": "रेताड गाळाच्या मातीत भुईमुगाचे पीक अत्यंत उत्तम येते कारण त्यामुळे सुया सहज मातीत घुसतात.", "fertilizer": "NPK 20:40:40 आणि जिप्सम (Gypsum)", "yield": "२.० - ३.० टन/हेक्टर" },
        "తెలుగు": { "name": "వేరుశనగ", "reasoning": "ఇసుక ఒండ్రు నేలల్లో వేరుశనగ చాలా బాగా పెరుగుతుంది.", "fertilizer": "NPK 20:40:40 మరియు జిప్సమ్", "yield": "2.0 - 3.0 టన్నులు/హెక్టారు" },
        "മലയാളം": { "name": "നിലക്കടല", "reasoning": "മണൽ കലർന്ന എക്കൽ മണ്ണിൽ നിലക്കടല വളരെ നന്നായി വളരുന്നു.", "fertilizer": "NPK 20:40:40, ജിപ്സം", "yield": "2.0 - 3.0 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { "name": "ਮੂੰਗਫਲੀ", "reasoning": "ਰੇਤਲੀ ਦੋਮਟ ਮਿੱਟੀ ਵਿੱਚ ਮੂੰਗਫਲੀ ਬਹੁਤ ਵਧੀਆ ਹੁੰਦੀ ਹੈ।", "fertilizer": "NPK 20:40:40 ਅਤੇ ਜਿਪਸਮ", "yield": "2.0 - 3.0 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { "name": "મગફળી", "reasoning": "રેતાળ કાંપ વાળી જમીનમાં મગફળી ખૂબ જ સારી રીતે થાય છે.", "fertilizer": "NPK 20:40:40 અને જીપ્સમ", "yield": "2.0 - 3.0 ટન/હેક્ટર" }
    },
    "Pulses": {
        "English": { "name": "Pulses", "reasoning": "Pulses have nitrogen-fixing properties, making them highly resilient on marginal sandy loam terrains.", "fertilizer": "NPK 20:50:20 (Phosphorus rich)", "yield": "1.0 - 1.8 tons/hectare" },
        "हिंदी": { "name": "दालें", "reasoning": "दालों में नाइट्रोजन फिक्सिंग गुण होते हैं, जो उन्हें रेतीली दोमट भूमि पर भी अत्यधिक सहनशील बनाते हैं।", "fertilizer": "NPK 20:50:20 (फास्फोरस समृद्ध)", "yield": "1.0 - 1.8 टन/हेक्टेयर" },
        "मराठी": { "name": "डाळी / कडधान्ये", "reasoning": "कडधान्यांमध्ये नायट्रोजन स्थिरावण्याचे गुणधर्म असतात, ज्यामुळे ती रेताड गाळाच्या जमिनीतही अत्यंत टिकाऊ ठरतात.", "fertilizer": "NPK 20:50:20 (फॉस्फरस समृद्ध)", "yield": "१.० - १.८ टन/हेक्टर" },
        "తెలుగు": { "name": "పప్పుధాన్యాలు", "reasoning": "పప్పుధాన్యాలకు నైట్రోజన్ స్థిరీకరించే గుణాలు ఉంటాయి.", "fertilizer": "NPK 20:50:20 (ఫాస్ఫరస్ సమృద్ధి)", "yield": "1.0 - 1.8 టన్నులు/హెక్టారు" },
        "മലയാളം": { "name": "പയറുവർഗ്ഗങ്ങൾ", "reasoning": "പയറുവർഗ്ഗങ്ങൾക്ക് നൈട്രജൻ സ്ഥിരീകരിക്കാനുള്ള ശേഷിയുണ്ട്.", "fertilizer": "NPK 20:50:20 (ഫോസ്ഫറസ് സസ്യം)", "yield": "1.0 - 1.8 ടൺ/ഹെക്ടർ" },
        "ਪੰਜਾਬੀ": { "name": "ਦਾਲਾਂ", "reasoning": "ਦਾਲਾਂ ਵਿੱਚ ਨਾਈਟ੍ਰੋਜਨ ਫਿਕਸਿੰਗ ਗੁਣ ਹੁੰਦੇ ਹਨ।", "fertilizer": "NPK 20:50:20 (ਫਾਸਫੋਰਸ ਅਮੀਰ)", "yield": "1.0 - 1.8 ਟਨ/ਹੈਕਟੇਅਰ" },
        "ગુજરાતી": { "name": "કઠોળ", "reasoning": "કઠોળમાં નાઇટ્રોજન સ્થિર કરવાના ગુણો હોય છે.", "fertilizer": "NPK 20:50:20 (ફોસ્ફરસ સમૃદ્ધ)", "yield": "1.0 - 1.8 ટન/હેક્ટર" }
    }
}

SOIL_TRANSLATIONS = {
    "Alluvial": { "English": "Alluvial", "हिंदी": "जलोढ़ (दोमट)", "मराठी": "गाळाची माती", "తెలుగు": "ఒండ్రు నేల", "മലയാളം": "എക്കൽ മണ്ണ്", "ਪੰਜਾਬੀ": "ਦੋਮਟ ਮਿੱਟੀ", "ગુજરાતી": "કાંપ વાળી જમીન" },
    "Clay": { "English": "Clay", "हिंदी": "चिकनी मिट्टी", "मराठी": "चिकनमाती", "తెలుగు": "బంకమన్ను", "മലയാളം": "കളിമണ്ണ്", "ਪੰਜਾਬੀ": "ਚਿਕਣੀ ਮਿੱਟੀ", "ગુજરાતી": "માટીવાળી જમીન" },
    "Loamy": { "English": "Loamy", "हिंदी": "दोमट मिट्टी", "मराठी": "पोयटा माती", "తెలుగు": "ఒండ్రు నేల", "മലയാളം": "എക്കൽ മണ്ണ്", "ਪੰਜਾਬੀ": "ਦੋਮਟ ਮਿੱਟੀ", "ગુજરાતી": "બેસર જમીન" },
    "Black": { "English": "Black", "हिंदी": "काली मिट्टी", "मराठी": "काळी माती", "తెలుగు": "నల్లరేగడి నేల", "മലയാളം": "കറുത്ത മണ്ണ്", "ਪੰਜਾਬੀ": "ਕਾਲੀ ਮਿੱਟੀ", "ગુજરાતી": "કાળી જમીન" },
    "Red": { "English": "Red", "हिंदी": "लाल मिट्टी", "मराठी": "तांबडी माती", "తెలుగు": "ఎర్ర నేల", "മലയാളം": "ചുവന്ന മണ്ണ്", "ਪੰਜਾਬੀ": "ਲਾਲ ਮਿੱਟੀ", "ગુજરાતી": "લાલ જમીન" },
    "Sandy": { "English": "Sandy", "हिंदी": "बलुई मिट्टी", "मराठी": "रेताड माती", "తెలుగు": "ఇసుక నేల", "മലയാളം": "മണൽ മണ്ണ്", "ਪੰਜਾਬੀ": "ਰੇਤਲੀ ਮਿੱਟੀ", "ગુજરાતી": "રેતાળ જમીન" }
}

SEASON_TRANSLATIONS = {
    "Kharif": { "English": "Kharif", "हिंदी": "खरीफ (मानसून)", "मराठी": "खरीप (पावसाळी)", "తెలుగు": "ఖరీఫ్ (వర్షాకాలం)", "മലയാളം": "ഖരീഫ്", "ਪੰਜਾਬੀ": "ਖਰੀਫ", "ગુજરાતી": "ચોમાસુ (ખરીફ)" },
    "Rabi": { "English": "Rabi", "हिंदी": "रबी (सर्दियों)", "मराठी": "रब्बी (हिवाळी)", "తెలుగు": "రబీ (చలికాలం)", "മലയാളം": "റബി", "ਪੰਜਾਬੀ": "ਰਬੀ", "ગુજરાતી": "શિયાળુ (રવિ)" },
    "Summer": { "English": "Summer", "हिंदी": "जायद (गर्मी)", "मराठी": "उन्हाळी", "తెలుగు": "వేసవి కాలం", "മലയാളം": "വേനൽക്കാലം", "ਪੰਜਾਬੀ": "ਗਰਮੀ", "ગુજરાતી": "ઉનાળુ" }
}

WATER_TRANSLATIONS = {
    "High": { "English": "High", "हिंदी": "अधिक (उच्च)", "मराठी": "जास्त (भरपूर)", "తెలుగు": "ఎక్కువ", "മലയാളം": "കൂടുതൽ", "ਪੰਜਾਬੀ": "ਵੱਧ", "ગુજરાતી": "વધુ" },
    "Medium": { "English": "Medium", "हिंदी": "मध्यम", "मराठी": "मध्यम", "తెలుగు": "మితమైన", "മലയാളം": "മിതമായ", "ਪੰਜਾਬੀ": "ਮੱਧਮ", "ગુજરાતી": "મધ્યમ" },
    "Low": { "English": "Low", "हिंदी": "कम", "मराठी": "कमी", "తెలుగు": "తక్కువ", "മലയാളം": "കുറഞ്ഞ", "ਪੰਜਾਬੀ": "ਘੱਟ", "ગુજરાતી": "ઓછું" }
}

PROFIT_SUFFIX = {
    "English": "total", "हिंदी": "कुल", "मराठी": "एकूण", "తెలుగు": "మొత్తం", "മലയാളം": "ആകെ", "ਪੰਜਾਬੀ": "ਕੁੱਲ", "ગુજરાતી": "કુલ"
}

class MLManager:
    def __init__(self):
        self.subsidy_model = self._train_subsidy_model()
        self.crop_model = self._train_crop_model()
        self.crop_encoder = {0: "Paddy", 1: "Wheat", 2: "Cotton", 3: "Sugarcane", 4: "Pulses", 5: "Maize", 6: "Groundnut"}
        self.soil_encoder = {"Alluvial": 0, "Black": 1, "Red": 2, "Laterite": 3, "Desert": 4}
        self.water_encoder = {"Low": 0, "Medium": 1, "High": 2}
        self.season_encoder = {"Kharif": 0, "Rabi": 1, "Summer": 2}

    def _train_subsidy_model(self):
        data = {
            'land_size': [1, 2, 5, 10, 15, 20],
            'investment': [10000, 25000, 70000, 150000, 250000, 400000],
            'subsidy': [2000, 5000, 12000, 25000, 40000, 70000]
        }
        df = pd.DataFrame(data)
        model = LinearRegression()
        model.fit(df[['land_size', 'investment']], df['subsidy'])
        return model

    def _train_crop_model(self):
        data = {
            'N': [90, 80, 60, 70, 40, 20, 100, 50, 30, 85],
            'P': [40, 50, 45, 60, 30, 25, 50, 40, 35, 45],
            'K': [40, 40, 35, 45, 20, 30, 40, 20, 25, 40],
            'temp': [25, 28, 30, 32, 22, 20, 27, 35, 33, 26],
            'hum': [80, 75, 70, 65, 60, 55, 82, 40, 45, 78],
            'ph': [6.5, 6.8, 7.0, 6.2, 5.5, 6.0, 6.7, 7.5, 8.0, 6.6],
            'rain': [1200, 1000, 800, 600, 500, 400, 1500, 300, 350, 1100],
            'soil': [0, 1, 2, 3, 0, 4, 0, 1, 4, 1],
            'water': [2, 1, 1, 0, 1, 0, 2, 0, 0, 2],
            'season': [0, 1, 0, 1, 1, 2, 0, 2, 2, 0],
            'crop': [0, 1, 2, 3, 4, 5, 0, 6, 6, 1]
        }
        df = pd.DataFrame(data)
        model = DecisionTreeClassifier()
        features = ['N', 'P', 'K', 'temp', 'hum', 'ph', 'rain', 'soil', 'water', 'season']
        model.fit(df[features], df['crop'])
        return model

    def predict_subsidy(self, land_size: float, investment: float):
        try:
            pred = self.subsidy_model.predict([[land_size, investment]])[0]
            return max(0, round(pred, 2))
        except Exception as e:
            logger.error(f"Subsidy prediction error: {e}")
            return 0

    def recommend_crop(self, n: float, p: float, k: float, temp: float, hum: float, ph: float, rain: float, soil_type: str, water_avail: str, season: str):
        try:
            soil_idx = self.soil_encoder.get(soil_type, 0)
            water_idx = self.water_encoder.get(water_avail, 1)
            season_idx = self.season_encoder.get(season, 0)
            
            features = [[n, p, k, temp, hum, ph, rain, soil_idx, water_idx, season_idx]]
            crop_idx = self.crop_model.predict(features)[0]
            return self.crop_encoder.get(crop_idx, "General Crops")
        except Exception as e:
            logger.error(f"Crop recommendation error: {e}")
            return "General Crops"

    def recommend_top_crops(self, n: float, p: float, k: float, temp: float, hum: float, ph: float, rain: float, soil_type: str, water_avail: str, season: str, land_size: float = 1.5, previous_crop: str = "None", language: str = "English"):
        crops_db = [
            {
                "name": "Paddy",
                "icon": "🌾",
                "suitable_soils": ["Alluvial", "Clay", "Loamy"],
                "suitable_seasons": ["Kharif"],
                "temp_min": 20, "temp_max": 35,
                "hum_min": 70, "hum_max": 95,
                "ph_min": 5.5, "ph_max": 7.0,
                "rain_min": 1000, "rain_max": 2500,
                "water_req": "High",
                "profit_base": (42000, 50000)
            },
            {
                "name": "Wheat",
                "icon": "🌾",
                "suitable_soils": ["Clay", "Loamy", "Alluvial"],
                "suitable_seasons": ["Rabi"],
                "temp_min": 10, "temp_max": 25,
                "hum_min": 40, "hum_max": 70,
                "ph_min": 6.0, "ph_max": 7.5,
                "rain_min": 400, "rain_max": 1000,
                "water_req": "Medium",
                "profit_base": (28000, 38000)
            },
            {
                "name": "Cotton",
                "icon": "☁️",
                "suitable_soils": ["Black", "Alluvial", "Loamy"],
                "suitable_seasons": ["Kharif"],
                "temp_min": 22, "temp_max": 38,
                "hum_min": 50, "hum_max": 80,
                "ph_min": 6.0, "ph_max": 8.0,
                "rain_min": 500, "rain_max": 1200,
                "water_req": "Medium",
                "profit_base": (45000, 62000)
            },
            {
                "name": "Sugarcane",
                "icon": "🎋",
                "suitable_soils": ["Loamy", "Clay", "Alluvial"],
                "suitable_seasons": ["Kharif"],
                "temp_min": 20, "temp_max": 35,
                "hum_min": 60, "hum_max": 85,
                "ph_min": 6.0, "ph_max": 7.8,
                "rain_min": 1100, "rain_max": 2000,
                "water_req": "High",
                "profit_base": (65000, 95000)
            },
            {
                "name": "Maize",
                "icon": "🌽",
                "suitable_soils": ["Alluvial", "Red", "Loamy"],
                "suitable_seasons": ["Kharif", "Rabi"],
                "temp_min": 18, "temp_max": 32,
                "hum_min": 50, "hum_max": 80,
                "ph_min": 5.5, "ph_max": 7.5,
                "rain_min": 500, "rain_max": 1000,
                "water_req": "Medium",
                "profit_base": (22000, 36000)
            },
            {
                "name": "Groundnut",
                "icon": "🥜",
                "suitable_soils": ["Sandy", "Loamy", "Red"],
                "suitable_seasons": ["Kharif", "Summer"],
                "temp_min": 22, "temp_max": 32,
                "hum_min": 50, "hum_max": 75,
                "ph_min": 6.0, "ph_max": 7.0,
                "rain_min": 400, "rain_max": 800,
                "water_req": "Low",
                "profit_base": (32000, 47000)
            },
            {
                "name": "Pulses",
                "icon": "🌱",
                "suitable_soils": ["Loamy", "Sandy", "Red"],
                "suitable_seasons": ["Rabi", "Kharif"],
                "temp_min": 15, "temp_max": 30,
                "hum_min": 45, "hum_max": 70,
                "ph_min": 6.0, "ph_max": 7.5,
                "rain_min": 300, "rain_max": 600,
                "water_req": "Low",
                "profit_base": (19000, 32000)
            }
        ]

        scored_crops = []
        lang = language if language in CROP_TRANSLATIONS.get("Paddy", {}) else "English"

        for crop in crops_db:
            score = 0.0
            
            if soil_type in crop["suitable_soils"]:
                score += 25
            elif "Loamy" in crop["suitable_soils"] and soil_type == "Alluvial":
                score += 15
            
            if season in crop["suitable_seasons"]:
                score += 20
                
            if crop["temp_min"] <= temp <= crop["temp_max"]:
                score += 15
            else:
                diff = min(abs(temp - crop["temp_min"]), abs(temp - crop["temp_max"]))
                score += max(0, 15 - diff * 2)

            if crop["hum_min"] <= hum <= crop["hum_max"]:
                score += 15
            else:
                diff = min(abs(hum - crop["hum_min"]), abs(hum - crop["hum_max"]))
                score += max(0, 15 - diff * 0.5)

            if crop["rain_min"] <= rain <= crop["rain_max"]:
                score += 15
            else:
                diff = min(abs(rain - crop["rain_min"]), abs(rain - crop["rain_max"]))
                score += max(0, 15 - diff * 0.02)

            if crop["ph_min"] <= ph <= crop["ph_max"]:
                score += 10
            else:
                diff = min(abs(ph - crop["ph_min"]), abs(ph - crop["ph_max"]))
                score += max(0, 10 - diff * 5)
                
            confidence = min(0.98, score / 100.0)
            
            if previous_crop != "None" and crop["name"].lower() != previous_crop.lower():
                confidence = min(0.98, confidence + 0.03)

            crop_key = crop["name"]
            c_info = CROP_TRANSLATIONS[crop_key].get(lang, CROP_TRANSLATIONS[crop_key]["English"])
            
            soils_tr = [SOIL_TRANSLATIONS.get(s, {}).get(lang, s) for s in crop["suitable_soils"]]
            seasons_tr = [SEASON_TRANSLATIONS.get(s, {}).get(lang, s) for s in crop["suitable_seasons"]]
            water_tr = WATER_TRANSLATIONS.get(crop["water_req"], {}).get(lang, crop["water_req"])
            suffix = PROFIT_SUFFIX.get(lang, "total")

            min_prof = int(crop["profit_base"][0] * land_size)
            max_prof = int(crop["profit_base"][1] * land_size)

            scored_crops.append({
                "raw_crop_key": crop_key,
                "recommended_crop": c_info["name"],
                "icon": crop["icon"],
                "confidence": round(confidence, 2),
                "reasoning": c_info["reasoning"],
                "suitable_soil": ", ".join(soils_tr),
                "suitable_season": ", ".join(seasons_tr),
                "water_req": water_tr,
                "fertilizer": c_info["fertilizer"],
                "expected_yield": c_info["yield"],
                "estimated_profit": f"₹{min_prof:,} - ₹{max_prof:,} {suffix}"
            })

        scored_crops.sort(key=lambda x: x["confidence"], reverse=True)
        return scored_crops[:3]

ml_manager = MLManager()
