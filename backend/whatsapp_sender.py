import os
import requests
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()

class WhatsAppAutomation:
    def __init__(self):
        self.account_sid = os.getenv("TWILIO_ACCOUNT_SID")
        self.auth_token = os.getenv("TWILIO_AUTH_TOKEN")
        self.from_number = os.getenv("TWILIO_PHONE_NUMBER", "whatsapp:+14155238886")
        
        if self.account_sid and self.auth_token:
            self.client = Client(self.account_sid, self.auth_token)
        else:
            self.client = None

    def send_notification(self, to_number, farmer_name, report_path):
        """
        Sends a WhatsApp notification to the farmer.
        Uploads the PDF to file.io to get a public URL for Twilio to send as a media attachment.
        """
        if not self.client:
            return False, "Twilio credentials not configured."

        try:
            # Ensure the number is in WhatsApp format
            if not to_number.startswith("whatsapp:"):
                to_number = f"whatsapp:{to_number}"

            media_url = None
            if os.path.exists(report_path):
                with open(report_path, 'rb') as f:
                    response = requests.post(
                        'https://catbox.moe/user/api.php', 
                        data={'reqtype': 'fileupload'}, 
                        files={'fileToUpload': f}
                    )
                    if response.status_code == 200:
                        media_url = response.text.strip()

            message_body = (
                f"Hello {farmer_name}! 🌾\n\n"
                f"Your AgroVision AI Scheme Report has been generated successfully.\n\n"
                f"✅ You are eligible for multiple government schemes.\n"
                f"🚀 Check your personalized recommendations in the app.\n\n"
                f"Happy Farming! - AgroVision Team"
            )

            kwargs = {
                "body": message_body,
                "from_": self.from_number,
                "to": to_number
            }
            if media_url:
                kwargs["media_url"] = [media_url]

            message = self.client.messages.create(**kwargs)
            return True, message.sid
        except Exception as e:
            return False, str(e)

# Instantiate
whatsapp_manager = WhatsAppAutomation()
