import re

def process_document(filename: str) -> dict:
    """
    Simulates Document Intelligence (OCR + Layout Analysis).
    Extracts key details based on common patterns in the filename.
    """
    filename_lower = filename.lower()
    extracted_data = {
        "doc_type": "Unknown",
        "extracted_text": f"Simulated OCR text extracted from {filename}...",
        "is_verified": False,
        "fields": {}
    }

    if "aadhaar" in filename_lower:
        extracted_data["doc_type"] = "Aadhaar Card"
        # Simulate extracting a 12-digit Aadhaar number
        # In a real app, pytesseract would read the image and regex would find \d{4} \d{4} \d{4}
        extracted_data["fields"]["Aadhaar Number"] = "XXXX-XXXX-1234"
        extracted_data["fields"]["Name"] = "Farmer Name (OCR)"
        extracted_data["is_verified"] = True
        extracted_data["extracted_text"] += "\nFound valid Aadhaar layout."
        
    elif "land" in filename_lower or "7/12" in filename_lower or "satbara" in filename_lower:
        extracted_data["doc_type"] = "Land Record (7/12 Extract)"
        extracted_data["fields"]["Total Area"] = "2.5 Hectares"
        extracted_data["fields"]["Owner"] = "Verified Owner"
        extracted_data["is_verified"] = True
        extracted_data["extracted_text"] += "\nFound land ownership details."
        
    elif "bank" in filename_lower or "passbook" in filename_lower:
        extracted_data["doc_type"] = "Bank Passbook"
        extracted_data["fields"]["Account Number"] = "XXXXXXXXX5678"
        extracted_data["fields"]["IFSC"] = "SBIN0001234"
        extracted_data["is_verified"] = True
        extracted_data["extracted_text"] += "\nExtracted Account and IFSC."
        
    return extracted_data
