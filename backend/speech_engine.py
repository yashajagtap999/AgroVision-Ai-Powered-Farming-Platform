import edge_tts
import asyncio
import os
import logging

logger = logging.getLogger(__name__)

# Voice mapping for regional languages
VOICES = {
    "English": "en-IN-PrabhatNeural",
    "Hindi": "hi-IN-MadhurNeural",
    "हिंदी": "hi-IN-MadhurNeural",
    "Marathi": "mr-IN-ManoharNeural",
    "मराठी": "mr-IN-ManoharNeural",
    "Telugu": "te-IN-MohanNeural",
    "తెలుగు": "te-IN-MohanNeural",
    "Malayalam": "ml-IN-MidhunNeural",
    "മലയാളം": "ml-IN-MidhunNeural",
    "Punjabi": "pa-IN-GurpreetNeural",
    "ਪੰਜਾਬੀ": "pa-IN-GurpreetNeural",
    "Gujarati": "gu-IN-NiranjanNeural",
    "ગુજરાતી": "gu-IN-NiranjanNeural",
    "Bengali": "bn-IN-BashkarNeural",
    "Tamil": "ta-IN-ValluvarNeural"
}

async def generate_speech_stream(text: str, language: str = "English"):
    """
    Generates high-quality neural speech and returns it as bytes.
    """
    voice = VOICES.get(language, VOICES["English"])
    communicate = edge_tts.Communicate(text, voice)
    
    # We'll save to a temp file then read bytes because edge-tts streaming 
    # to memory is a bit complex in some environments
    temp_file = "temp_speech.mp3"
    try:
        await communicate.save(temp_file)
        with open(temp_file, "rb") as f:
            audio_data = f.read()
        return audio_data
    except Exception as e:
        logger.error(f"Speech generation error: {e}")
        return None
    finally:
        if os.path.exists(temp_file):
            try:
                os.remove(temp_file)
            except:
                pass

def get_audio_sync(text: str, language: str = "English"):
    """Sync wrapper for the async speech generator"""
    return asyncio.run(generate_speech_stream(text, language))
