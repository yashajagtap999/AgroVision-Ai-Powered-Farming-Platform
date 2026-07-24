from flask import Flask, request, jsonify, Response, send_from_directory
from flask_cors import CORS
from typing import List, Dict
import random
import logging
import os
import threading
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

import sys
backend_dir = os.path.dirname(os.path.abspath(__file__))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)
parent_dir = os.path.dirname(backend_dir)
if parent_dir not in sys.path:
    sys.path.insert(0, parent_dir)

try:
    from backend import schemas, database, schemes, document_ai, ml_engine, speech_engine, pdf_generator, whatsapp_sender
except Exception:
    import schemas, database, schemes, document_ai, ml_engine, speech_engine, pdf_generator, whatsapp_sender

# Initialize database
database.Base.metadata.create_all(bind=database.engine)

frontend_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend")
if not os.path.exists(frontend_path):
    os.makedirs(frontend_path)

app = Flask(__name__, static_folder=frontend_path, static_url_path="")
CORS(app)

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy", "database": "connected"})

@app.route("/users/phone/<phone_number>", methods=["GET"])
def get_user_by_phone(phone_number):
    db = database.SessionLocal()
    try:
        db_user = db.query(database.User).filter(database.User.phone_number == phone_number).first()
        if not db_user:
            return jsonify({"detail": "User not found"}), 404
        return jsonify({
            "id": db_user.id,
            "name": db_user.name,
            "state": db_user.state,
            "land_size_acres": db_user.land_size_acres,
            "crop_types": db_user.crop_types,
            "phone_number": db_user.phone_number
        })
    finally:
        db.close()

@app.route("/schemes", methods=["GET"])
def get_all_schemes():
    return jsonify(schemes.load_schemes())

@app.route("/eligibility/match", methods=["POST"])
def match_schemes():
    try:
        profile_dict = request.get_json() or {}
        matched = schemes.intelligent_match(profile_dict)
        return jsonify(matched)
    except Exception as e:
        logger.error(f"Error in match_schemes: {str(e)}")
        return jsonify({"detail": f"Internal Server Error: {str(e)}"}), 500

@app.route("/documents/analyze", methods=["POST"])
def analyze_document():
    try:
        file = request.files.get("file")
        if not file or not file.filename:
            return jsonify({"detail": "No file uploaded"}), 400
        result = document_ai.process_document(file.filename)
        return jsonify(result)
    except Exception as e:
        logger.error(f"Error in analyze_document: {str(e)}")
        return jsonify({"detail": f"Internal Server Error: {str(e)}"}), 500

@app.route("/chat", methods=["POST"])
def chat_with_advisor():
    query = request.get_json() or {}
    raw_text = query.get("text", "").strip()
    text = raw_text.lower()
    user_lang = query.get("language", "English")

    # Script/language detection
    is_marathi = any(ch in raw_text for ch in ["कोणता", "पीक", "माती", "पाणी", "खत", "लावू", "लावा", "कशी", "शेती", "काढू", "कसे", "हवामान", "अंदाजा", "पाऊस", "योजना", "सब्सिडी", "अहवाल"]) or user_lang in ["मराठी", "Marathi"]
    is_hindi = any(ch in raw_text for ch in ["कौन", "फसल", "उगाएं", "पानी", "खाद", "मिट्टी", "खेती", "कैसे", "कौनसा", "मौसम", "बारिश", "तापमान", "योजना", "रिपोर्ट"]) or user_lang in ["हिंदी", "Hindi"]
    is_telugu = any(ch in raw_text for ch in ["పంట", "నేల", "నీరు", "వాతావరణం", "పథకం", "రైతు"]) or user_lang in ["తెలుగు", "Telugu"]
    is_malayalam = any(ch in raw_text for ch in ["വിള", "മണ്ണ്", "കാലാവസ്ഥ", "പദ്ധതി"]) or user_lang in ["മലയാളം", "Malayalam"]
    is_punjabi = any(ch in raw_text for ch in ["ਫਸਲ", "ਮੌਸਮ", "ਮਿੱਟੀ", "ਸਕੀਮ"]) or user_lang in ["ਪੰਜਾਬੀ", "Punjabi"]
    is_gujarati = any(ch in raw_text for ch in ["પાક", "હવામાન", "જમીન", "યોજના"]) or user_lang in ["ગુજરાતી", "Gujarati"]

    # 1. Weather / Rain / Forecast Queries
    if any(k in text for k in ["weather", "rain", "forecast", "temp", "temperature", "climate", "हवामान", "पाऊस", "अंदाज", "मौसम", "बारिश", "तापमान", "వాతావరణం", "കാലാവസ്ഥ", "ਮੌਸਮ", "હવામાન"]):
        if is_marathi:
            resp = "🌤️ **हवामान व पावसाचा अंदाज:** AgroVision 'Crop Advisor' विभागात तुमचे शहर शोधून किंवा 'Auto-Detect Live GPS Weather' वर क्लिक करून पुढील ५ दिवसांचा अचूक हवामान अंदाज, तापमान, आर्द्रता व पावसाचे प्रमाण (mm) पाहू शकता."
        elif is_hindi:
            resp = "🌤️ **मौसम और बारिश का हाल:** आप AgroVision के 'Crop Advisor' सेक्शन में अपना शहर खोजकर या 'Auto-Detect Live GPS Weather' बटन दबाकर अगले 5 दिनों का लाइव मौसम, बारिश (mm) और तापमान देख सकते हैं।"
        elif is_telugu:
            resp = "🌤️ **వాతావరణ సమాచారం:** మీరు AgroVision 'Crop Advisor' విభాగంలో మీ నగరాన్ని శోధించడం ద్వారా తదుపరి 5 రోజుల వాతావరణం, ఉష్ణోగ్రత మరియు వర్షపాతం వివరాలను తెలుసుకోవచ్చు."
        elif is_malayalam:
            resp = "🌤️ **കാലാവസ്ഥ പ്രവചനം:** AgroVision 'Crop Advisor' വഴി അടുത്ത 5 ദിവസത്തെ തത്സമയ കാലാവസ്ഥ, താപനില, മഴയുടെ അളവ് എന്നിവ കണ്ടെത്താം."
        elif is_punjabi:
            resp = "🌤️ **ਮੌਸਮ ਦੀ ਜਾਣਕਾਰੀ:** AgroVision 'Crop Advisor' ਵਿੱਚ ਆਪਣੇ ਸ਼ਹਿਰ ਦੀ ਖੋਜ ਕਰਕੇ ਅਗਲੇ 5 ਦਿਨਾਂ ਦੇ ਮੌਸਮ, ਤਾਪਮਾਨ ਅਤੇ ਮੀਂਹ ਦਾ ਅਨੁਮਾਨ ਦੇਖੋ।"
        elif is_gujarati:
            resp = "🌤️ **હવામાનની માહિતી:** AgroVision ના 'Crop Advisor' વિભાગમાં તમારા શહેરનું આગામી 5 દિવસનું લાઈવ હવામાન, તાપમાન અને વરસાદ જુઓ."
        else:
            resp = "🌤️ **Weather & Rainfall Forecast:** You can view live GPS weather and a detailed 5-day forecast (temperature, humidity, rainfall in mm) in the 'Crop Advisor' section of AgroVision using auto-location or city search."

    # 2. Crop Advisor & Soil Selection Queries
    elif any(k in text for k in ["crop", "peek", "fasal", "soil", "npk", "nitrogen", "phosphorus", "potassium", "ph", "पीक", "फसल", "माती", "मिट्टी", "खत", "खाद", "कोणता", "कौन सा", "उगाएं", "लावा", "લાવા", "grow", "plant", "advisor"]):
        if is_marathi:
            resp = "🌱 **पीक शिफारस (Crop Advisor):** तुमच्या मातीतील NPK (नायट्रोजन, फॉस्फरस, पोटॅशियम), जमिनीचा pH, तापमान व पावसानुसार AI सर्वोत्तम ३ पिकांची शिफारस करते. 'Crop Advisor' टॅबवर जाऊन तुमचे घटक भरा व लगेच शिफारस मिळवा."
        elif is_hindi:
            resp = "🌱 **फसल सलाह (Crop Advisor):** आपकी मिट्टी के N-P-K पोषक तत्वों, pH मान, तापमान और मौसम के आधार पर AI टॉप 3 फसलों की सलाह देता है। 'Crop Advisor' विकल्प में जाकर तुरंत अपनी रिपोर्ट देखें।"
        elif is_telugu:
            resp = "🌱 **పంట సిఫార్సు:** మీ నేల పోషకాలు (N-P-K), pH స్థాయి మరియు వాతావరణం ఆధారంగా AI ఉత్తమ 3 పంటలను సిఫార్సు చేస్తుంది. 'Crop Advisor' ట్యాబ్‌ని ఉపయోగించండి."
        elif is_malayalam:
            resp = "🌱 **വിള നിർദ്ദേശം:** മണ്ണിന്റെ ഗുണം, NPK അളവ്, കാലാവസ്ഥ എന്നിവ കണക്കിലെടുത്ത് AI ഏറ്റവും അനുയോജ്യമായ വിളകൾ നിർദ്ദേശിക്കുന്നു."
        elif is_punjabi:
            resp = "🌱 **ਫਸਲ ਦੀ ਸਿਫ਼ਾਰਸ਼:** ਆਪਣੀ ਮਿੱਟੀ ਦੇ N-P-K ਅਤੇ ਮੌਸਮ ਦੇ ਹਿਸਾਬ ਨਾਲ AI ਦੁਆਰਾ ਸਭ ਤੋਂ ਵਧੀਆ 3 ਫਸਲਾਂ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਪ੍ਰਾਪਤ ਕਰੋ।"
        elif is_gujarati:
            resp = "🌱 **પાક ભલામણ:** તમારી જમીનના NPK તત્વો અને હવામાન અનુસાર AI ઉત્તમ 3 પાકની ભલામણ કરે છે."
        else:
            resp = "🌱 **Crop Recommendation Engine:** AgroVision's AI analyzes soil N-P-K nutrients, pH levels, temperature, rainfall, and season to recommend the top 3 high-yield crops. Test your soil parameters in the 'Crop Advisor' tab!"

    # 3. Document AI & Document Vault Queries
    elif any(k in text for k in ["document", "vault", "aadhaar", "7/12", "passbook", "ocr", "scan", "upload", "कागदपत्रे", "दस्तावेज़", "स्कैन", "712"]):
        if is_marathi:
            resp = "📄 **दस्तऐवज स्कॅनिंग (Document AI):** तुमच्या ७/१२ उतारा, आधार कार्ड किंवा बँक पासबुक अपलोड करा. आमचे Document AI आपोआप कागदपत्रे स्कॅन करून प्रोफाईल माहिती भरते व सुरक्षित Vault मध्ये जतन करते."
        elif is_hindi:
            resp = "📄 **दस्तावेज़ स्कैनिंग (Document AI):** अपना 7/12 खसरा, आधार कार्ड या बैंक पासबुक अपलोड करें। Document AI स्वचालित रूप से जानकारी निकालता है और आपके सुरक्षित डॉक्यूमेंट वॉल्ट में सहेजता है।"
        else:
            resp = "📄 **Document AI Vault:** Upload land records (7/12), Aadhaar, or bank passbooks. AgroVision's Document AI scans and auto-fills your farm details directly into your secure credentials vault."

    # 4. Resume & PDF Report Automation Queries
    elif any(k in text for k in ["resume", "report", "pdf", "download", "whatsapp", "credentials", "अहवाल", "रिपोर्ट", "डाउनलोड"]):
        if is_marathi:
            resp = "📋 **शेतकरी क्रेडेंशियल अहवाल (PDF):** 'Credentials Resume' विभागात जा. तेथे तुम्ही अधिकृत एआय शेतकरी अहवाल (PDF) डाउनलोड करू शकता आणि व्हॉट्सॲपवर त्वरित संदेश मिळवू शकता."
        elif is_hindi:
            resp = "📋 **किसान क्रेडेंशियल रिपोर्ट (PDF):** 'Credentials Resume' सेक्शन में जाएं। वहां से आप अपनी आधिकारिक एआई किसान रिपोर्ट (PDF) डाउनलोड कर सकते हैं और व्हाट्सएप पर विवरण प्राप्त कर सकते हैं।"
        else:
            resp = "📋 **Farmer Credentials Resume & PDF Automation:** Visit the 'Credentials Resume' tab to generate and download an official verified PDF report containing your farm details, matched subsidies, and AI crop advice, plus automated WhatsApp notifications."

    # 5. Video Tutorials Queries
    elif any(k in text for k in ["video", "tutorial", "youtube", "watch", "learn", "व्हिडिओ", "वीडियो"]):
        if is_marathi:
            resp = "🎥 **व्हिडिओ मार्गदर्शक (Video Tutorials):** PM-KISAN, PMFBY, पोक्रा (PoCRA), KCC, पीएम-कुसुम इत्यादी ९ सरकारी योजनांचे प्रादेशिक व्हिडिओ 'Video Tutorials' टॅबवर उपलब्ध आहेत. तेथे 'Listen' बटण दाबून तुमच्या भाषेत ऐकू शकता."
        elif is_hindi:
            resp = "🎥 **वीडियो ट्यूटोरियल:** PM-KISAN, PMFBY, KCC, PM-KUSUM आदि 9 सरकारी योजनाओं के वीडियो 'Video Tutorials' सेक्शन में देखें और अपनी भाषा में ऑडियो सुनें।"
        else:
            resp = "🎥 **Video Tutorials Hub:** Watch step-by-step YouTube training guides for 9 key schemes (PM-KISAN, PMFBY, KCC, PM-KUSUM, PoCRA, PKVY, Soil Health Card, eNAM) in the 'Video Tutorials' section with translated audio narration."

    # 6. Benefits Calculator & ROI Queries
    elif any(k in text for k in ["calculator", "benefit", "roi", "profit", "investment", "yield", "नफा", "उत्पादन", "लाभ", "हिसाब"]):
        if is_marathi:
            resp = "💰 **फायदे व नफा गणक (Benefits Calculator):** जमिनीचे क्षेत्रफळ व भांडवल टाका. आमचे टूल संभाव्य सरकारी अनुदान (Subsidy), अपेक्षित ROI % व एकूण उत्पन्नाचा अंदाज दाखवते."
        elif is_hindi:
            resp = "💰 **लाभ एवं मुनाफा कैलकुलेटर:** अपनी ज़मीन और निवेश की राशि दर्ज करें। यह टूल संभावित सरकारी सब्सिडी, अनुमानित ROI % और कुल उत्पादन आय का अनुमान दिखाता है।"
        else:
            resp = "💰 **Benefits & ROI Calculator:** Input your land holding size and investment amount to calculate estimated subsidy benefits, projected ROI %, timeline days, and net yield return."

    # 7. Schemes & Subsidy Queries
    elif any(k in text for k in ["scheme", "subsidy", "discovery", "yojana", "योजना", "सब्सिडी", "अनुदान", "pm-kisan", "pmfby", "kusum", "pocra", "kcc", "vima", "bima"]):
        if is_marathi:
            resp = "🏛️ **सरकारी योजना व अनुदाने:** PM-KISAN (रु. ६००० वार्षिक), PMFBY पीक विमा, PM-KUSUM (९०% सौर पंप अनुदान), KCC (४% व्याज कर्ज), आणि पोक्रा (PoCRA) योजना उपलब्ध आहेत. 'AI Scheme Matching' द्वारे पात्रता तपासा."
        elif is_hindi:
            resp = "🏛️ **सरकारी योजनाएं व सब्सिडी:** PM-KISAN (₹6000 वार्षिक आय), PMFBY फसल बीमा, PM-KUSUM सोलर पंप सब्सिडी, और किसान क्रेडिट कार्ड (KCC) योजनाएं उपलब्ध हैं। 'AI Scheme Matching' पर अपनी पात्रता जांचें।"
        else:
            resp = "🏛️ **Government Subsidies & Schemes:** Key central and state schemes include PM-KISAN (₹6,000 yearly benefit), PMFBY Crop Insurance, PM-KUSUM Solar Pumps (90% subsidy), KCC (4% interest loan), and PoCRA. Check 'Scheme Discovery' or 'AI Scheme Matching'!"

    # 8. General Greetings / Platform Overview
    else:
        if is_marathi:
            resp = "🌾 **नमस्कार! मी तुमचा स्मार्ट ॲग्रोव्हिजन कृषी सल्लागार आहे.**\nतुम्ही मला प्लॅटफॉर्मवरील सर्व सेवांविषयी विचारू शकता:\n• 🌤️ हवामान व पावसाचा अंदाज\n• 🌱 पिकांची शिफारस (Crop Advisor)\n• 🏛️ सरकारी योजना व सबसिडी\n• 📄 कागदपत्रे स्कॅन व PDF अहवाल\n• 🎥 व्हिडिओ मार्गदर्शक"
        elif is_hindi:
            resp = "🌾 **नमस्ते! मैं आपका स्मार्ट एग्रोविज़न कृषि सलाहकार हूं।**\nआप मुझसे प्लेटफ़ॉर्म की सभी सेवाओं के बारे में पूछ सकते हैं:\n• 🌤️ मौसम और बारिश का हाल\n• 🌱 फसल चयन और सलाह (Crop Advisor)\n• 🏛️ सरकारी योजनाएं और सब्सिडी\n• 📄 दस्तावेज़ स्कैन और PDF रिपोर्ट\n• 🎥 वीडियो ट्यूटोरियल"
        else:
            resp = "🌾 **Hello! I am your Smart AgroVision AI Advisor.**\nYou can ask me about any service available on our platform:\n• 🌤️ Weather & 5-Day Rainfall Forecast\n• 🌱 Crop Recommendations (Soil N-P-K & pH)\n• 🏛️ Government Schemes & Subsidy Matching\n• 📄 Document AI Vault & PDF Reports\n• 💰 Benefits & ROI Calculator\n• 🎥 Video Tutorials"

    return jsonify({"response": resp})

@app.route("/users/", methods=["POST"])
@app.route("/users", methods=["POST"])
def create_user():
    user_dict = request.get_json() or {}
    db_user_data = {k: v for k, v in user_dict.items() if k in ["name", "state", "land_size_acres", "crop_types", "phone_number"]}
    
    db = database.SessionLocal()
    try:
        existing_user = db.query(database.User).filter(database.User.phone_number == db_user_data.get("phone_number")).first()
        if existing_user:
            for k, v in db_user_data.items():
                setattr(existing_user, k, v)
            db.commit()
            db.refresh(existing_user)
            return jsonify({
                "id": existing_user.id,
                "name": existing_user.name,
                "state": existing_user.state,
                "land_size_acres": existing_user.land_size_acres,
                "crop_types": existing_user.crop_types,
                "phone_number": existing_user.phone_number
            })
            
        db_user = database.User(**db_user_data)
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return jsonify({
            "id": db_user.id,
            "name": db_user.name,
            "state": db_user.state,
            "land_size_acres": db_user.land_size_acres,
            "crop_types": db_user.crop_types,
            "phone_number": db_user.phone_number
        })
    finally:
        db.close()

@app.route("/applications/", methods=["POST"])
@app.route("/applications", methods=["POST"])
def create_application():
    app_data = request.get_json() or {}
    db = database.SessionLocal()
    try:
        db_app = database.Application(
            user_id=app_data.get("user_id"),
            scheme_name=app_data.get("scheme_name"),
            status=app_data.get("status", "Pending"),
            applied_date=app_data.get("applied_date")
        )
        db.add(db_app)
        db.commit()
        db.refresh(db_app)
        return jsonify({
            "id": db_app.id,
            "user_id": db_app.user_id,
            "scheme_name": db_app.scheme_name,
            "status": db_app.status,
            "applied_date": db_app.applied_date
        })
    finally:
        db.close()

@app.route("/users/<int:user_id>/applications", methods=["GET"])
def get_user_applications(user_id):
    db = database.SessionLocal()
    try:
        apps = db.query(database.Application).filter(database.Application.user_id == user_id).all()
        return jsonify([{
            "id": a.id,
            "user_id": a.user_id,
            "scheme_name": a.scheme_name,
            "status": a.status,
            "applied_date": a.applied_date
        } for a in apps])
    finally:
        db.close()

@app.route("/predict/benefits", methods=["POST"])
def predict_benefits():
    data = request.get_json() or {}
    land_size = data.get("land_size", 0)
    investment = data.get("investment", 0)
    crop = data.get("crop", "Paddy")
    subsidy = ml_engine.ml_manager.predict_subsidy(land_size, investment)
    expected_roi = random.randint(18, 35)
    timeline_days = random.choice([60, 90, 120, 150])
    yield_estimate = round(investment * (1 + expected_roi/100.0) + subsidy, 2)
    return jsonify({
        "estimated_subsidy": round(subsidy, 2),
        "expected_roi": expected_roi,
        "timeline_days": timeline_days,
        "yield_estimate": yield_estimate
    })

@app.route("/predict/crop", methods=["POST"])
def predict_crop():
    data = request.get_json() or {}
    n, p, k = data.get("nitrogen", 70), data.get("phosphorus", 50), data.get("potassium", 40)
    temp, hum, ph, rain = data.get("temperature", 25), data.get("humidity", 70), data.get("ph", 6.5), data.get("rainfall", 1000)
    soil, water, season = data.get("soil_type", "Alluvial"), data.get("water_availability", "Medium"), data.get("season", "Kharif")
    
    land_size = data.get("land_size", 1.5)
    previous_crop = data.get("previous_crop", "None")
    language = data.get("language", "English")
    
    recommendations = ml_engine.ml_manager.recommend_top_crops(
        n, p, k, temp, hum, ph, rain, soil, water, season, land_size, previous_crop, language
    )
    
    return jsonify({
        "recommendations": recommendations,
        "relevant_schemes": ["PM-KISAN", "Soil Health Card Scheme"]
    })

@app.route("/weather/fetch", methods=["GET"])
def fetch_weather():
    api_key = os.environ.get("API_KEY")
    if not api_key:
        return jsonify({"detail": "Weather API Key not configured in server environment."}), 500
    
    lat = request.args.get("lat")
    lon = request.args.get("lon")
    city = request.args.get("city")
    
    import requests
    try:
        if city:
            current_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"
            forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?q={city}&appid={api_key}&units=metric"
        elif lat is not None and lon is not None:
            current_url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
            forecast_url = f"https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=metric"
        else:
            return jsonify({"detail": "Either city or both lat and lon must be provided."}), 400

        current_res = requests.get(current_url)
        current_data = current_res.json()
        
        forecast_res = requests.get(forecast_url)
        forecast_data = forecast_res.json()
        
        if current_res.status_code != 200 or forecast_res.status_code != 200:
            error_msg = current_data.get("message") or forecast_data.get("message") or "Failed to fetch weather from OpenWeatherMap"
            return jsonify({"detail": error_msg}), 400
            
        temp = current_data.get("main", {}).get("temp", 25)
        humidity = current_data.get("main", {}).get("humidity", 70)
        pressure = current_data.get("main", {}).get("pressure", 1013)
        wind_speed = current_data.get("wind", {}).get("speed", 0)
        weather_desc = current_data.get("weather", [{}])[0].get("description", "clear sky")
        
        rain = current_data.get("rain", {}).get("1h", 0) or current_data.get("rain", {}).get("3h", 0) or 0
        
        forecast_list = forecast_data.get("list", [])
        total_forecast_rain = 0
        forecast_summary = []
        
        # Group forecast by calendar day for 5-day weather forecast
        daily_map = {}
        for item in forecast_list:
            dt_txt = item.get("dt_txt", "")
            date_str = dt_txt.split(" ")[0] if dt_txt else ""
            if not date_str:
                continue
            
            item_rain = item.get("rain", {}).get("3h", 0) or 0
            item_temp = item.get("main", {}).get("temp", 25)
            item_hum = item.get("main", {}).get("humidity", 70)
            item_desc = item.get("weather", [{}])[0].get("description", "clear sky")
            item_icon = item.get("weather", [{}])[0].get("icon", "01d")
            
            if date_str not in daily_map:
                daily_map[date_str] = {
                    "date": date_str,
                    "temps": [],
                    "humidities": [],
                    "rain": 0.0,
                    "descriptions": [],
                    "icons": []
                }
            
            daily_map[date_str]["temps"].append(item_temp)
            daily_map[date_str]["humidities"].append(item_hum)
            daily_map[date_str]["rain"] += item_rain
            daily_map[date_str]["descriptions"].append(item_desc)
            daily_map[date_str]["icons"].append(item_icon)
        
        daily_forecast = []
        for date_str, day_data in list(daily_map.items())[:5]:
            min_temp = round(min(day_data["temps"]), 1) if day_data["temps"] else 20.0
            max_temp = round(max(day_data["temps"]), 1) if day_data["temps"] else 30.0
            avg_hum = round(sum(day_data["humidities"]) / len(day_data["humidities"])) if day_data["humidities"] else 70
            sum_rain = round(day_data["rain"], 1)
            most_common_desc = max(set(day_data["descriptions"]), key=day_data["descriptions"].count) if day_data["descriptions"] else "clear sky"
            icon = day_data["icons"][len(day_data["icons"])//2] if day_data["icons"] else "01d"
            
            try:
                dt_obj = datetime.strptime(date_str, "%Y-%m-%d")
                day_name = dt_obj.strftime("%a, %b %d")
            except:
                day_name = date_str

            daily_forecast.append({
                "date": date_str,
                "day": day_name,
                "temp_min": min_temp,
                "temp_max": max_temp,
                "humidity": avg_hum,
                "rain": sum_rain,
                "description": most_common_desc,
                "icon": icon
            })
            
        for item in forecast_list[:8]:
            item_rain = item.get("rain", {}).get("3h", 0) or 0
            total_forecast_rain += item_rain
            forecast_summary.append({
                "time": item.get("dt_txt"),
                "temp": item.get("main", {}).get("temp"),
                "humidity": item.get("main", {}).get("humidity"),
                "desc": item.get("weather", [{}])[0].get("description", "clear")
            })
            
        city_name = current_data.get("name", "Unknown City")
        country = current_data.get("sys", {}).get("country", "IN")
        
        return jsonify({
            "current": {
                "temp": temp,
                "humidity": humidity,
                "pressure": pressure,
                "wind_speed": wind_speed,
                "rain": rain,
                "description": weather_desc,
                "city": city_name,
                "country": country
            },
            "forecast": {
                "expected_rain_24h": total_forecast_rain,
                "summary": forecast_summary,
                "daily_forecast": daily_forecast
            }
        })
    except Exception as e:
        logger.error(f"Error fetching weather data: {str(e)}")
        return jsonify({"detail": f"Weather fetch failed: {str(e)}"}), 500

@app.route("/speech/narrate", methods=["GET"])
def narrate_text():
    text = request.args.get("text", "")
    language = request.args.get("language", "English")
    audio_data = speech_engine.get_audio_sync(text, language)
    if audio_data:
        return Response(audio_data, mimetype="audio/mpeg")
    return jsonify({"detail": "Speech failed"}), 500

@app.route("/alerts/seasonal", methods=["GET"])
def get_seasonal_alerts():
    return jsonify([
        {
            "title": "Kharif Insurance Deadline",
            "message": "Apply for PMFBY crop insurance to protect your Kharif crops against irregular monsoon.",
            "priority": "High",
            "deadline": "31st July 2026"
        },
        {
            "title": "Solar Pump Subsidy",
            "message": "PM-KUSUM component B application portal is open for solar water pump installations.",
            "priority": "Medium",
            "deadline": "15th August 2026"
        },
        {
            "title": "Soil Health Card Camp",
            "message": "Get free soil health testing at your nearest agricultural block center this week.",
            "priority": "Low",
            "deadline": "20th July 2026"
        }
    ])

@app.route("/automation/run-workflow", methods=["POST"])
def run_automation_workflow():
    try:
        data = request.get_json() or {}
        farmer_data = data.get("farmer_data")
        schemes_data = data.get("schemes")
        crop_recommendations = data.get("crop_recommendations")
        phone_number = farmer_data.get("phone_number") if farmer_data else None
        
        if not farmer_data or not schemes_data:
            return jsonify({"detail": "Missing required data."}), 400

        language = data.get("language") or farmer_data.get("language") or "English"
        report_path = pdf_generator.pdf_manager.generate_report(farmer_data, schemes_data, crop_recommendations, language=language)
        
        whatsapp_status = "Skipped"
        if phone_number:
            thread = threading.Thread(
                target=whatsapp_sender.whatsapp_manager.send_notification,
                args=(phone_number, farmer_data.get("name"), report_path)
            )
            thread.daemon = True
            thread.start()
            whatsapp_status = "Processing in background"

        return jsonify({
            "status": "success",
            "report_path": report_path,
            "whatsapp_status": whatsapp_status,
            "filename": os.path.basename(report_path)
        })
    except Exception as e:
        logger.error(f"Error: {str(e)}")
        return jsonify({"detail": str(e)}), 500

@app.route("/automation/download-report/<filename>", methods=["GET"])
def download_report(filename):
    reports_dir = os.path.join(os.path.dirname(__file__), "reports")
    file_path = os.path.join(reports_dir, filename)
    if os.path.exists(file_path):
        return send_from_directory(reports_dir, filename, as_attachment=True, mimetype='application/pdf')
    return jsonify({"detail": "Not Found"}), 404

@app.route("/", defaults={"path": "index.html"})
@app.route("/<path:path>")
def serve_frontend(path):
    target = os.path.join(app.static_folder, path)
    if os.path.exists(target) and os.path.isfile(target):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
