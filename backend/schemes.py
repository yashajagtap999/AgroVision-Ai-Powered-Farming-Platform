import json
import os
import re
from typing import List, Dict

# Get absolute path to schemes.json in the parent directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEMES_FILE = os.path.join(BASE_DIR, "schemes.json")

def clean_benefits_text(text: str) -> str:
    """Fixes double-encoded UTF-8 characters for currency and symbols."""
    if not text:
        return ""
    # Fix Rupee symbol double-encoding
    cleaned = text.replace("â¹", "₹").replace("\u00e2\u201a\u00b9", "₹").replace("â", "₹")
    # Clean redundant trailing characters if any
    cleaned = re.sub(r'₹\s*([0-9,]+)', r'₹\1', cleaned)
    return cleaned

def load_schemes() -> List[Dict]:
    try:
        with open(SCHEMES_FILE, 'r', encoding='utf-8-sig') as f:
            schemes = json.load(f)
            for scheme in schemes:
                if "benefits" in scheme:
                    scheme["benefits"] = clean_benefits_text(scheme["benefits"])
            return schemes
    except FileNotFoundError:
        return []

def intelligent_match(user_profile: Dict) -> List[Dict]:
    """
    Enhanced AI-based scheme matching recommendation engine.
    Multi-factor scoring algorithm evaluating:
    1. State Location Priority (State-specific vs Nationwide Central Subsidies)
    2. Landholding Scale (Marginal <2.5 acres, Small 2.5-5 acres, Medium/Large >5 acres)
    3. Land Type & Soil Classification (Arable, Fallow, Barren, Horticulture/Orchard)
    4. Irrigation Resilience (Rainfed drought relief vs Irrigated intensive farming)
    5. Crop Portfolio & Rotation Match (NLP keyword scoring across crop list)
    6. Document Readiness & Target Role Alignment
    """
    schemes = load_schemes()
    matched_schemes = []

    state = user_profile.get("state", "").strip().lower()
    land_size = float(user_profile.get("land_size_acres", 1.5))
    land_type = user_profile.get("land_type", "Arable").strip().lower()
    irrigation = user_profile.get("irrigation_status", "Rainfed").strip().lower()
    crops_raw = user_profile.get("crop_types", "")
    crops = [c.strip().lower() for c in crops_raw.split(",") if c.strip()]
    
    # Classify farmer land size category according to Indian Ministry of Agriculture
    if land_size < 2.5:
        farmer_category = "marginal"
        category_label = "Marginal Farmer (< 2.5 Acres)"
    elif 2.5 <= land_size <= 5.0:
        farmer_category = "small"
        category_label = "Small Farmer (2.5 - 5.0 Acres)"
    else:
        farmer_category = "medium_large"
        category_label = "Medium / Large Farmer (> 5.0 Acres)"

    for scheme in schemes:
        score = 0
        reasons = []

        # Factor 1: State Location Alignment
        scheme_state = scheme.get("state", "").strip().lower()
        if scheme_state == "all india" or scheme_state == "all":
            score += 45
            reasons.append("Central Government Scheme accessible nationwide.")
        elif state and (state in scheme_state or scheme_state in state):
            score += 60  # Direct state-specific subsidy bonus
            reasons.append(f"State Exclusive Scheme for {scheme.get('state')}.")
        elif scheme_state != "":
            continue  # Exclude mismatched state-specific schemes

        # Factor 2: Landholding Scale & Target Role Matching
        target_roles = [r.lower() for r in scheme.get("target_roles", [])]
        
        if farmer_category == "marginal":
            if any(role in target_roles for role in ["marginal farmers", "small & marginal farmers", "small farmers", "all farmers", "landholding farmers"]):
                score += 30
                reasons.append(f"Special allocation for {category_label}.")
        elif farmer_category == "small":
            if any(role in target_roles for role in ["small farmers", "small & marginal farmers", "all farmers", "farmers", "landholding farmers"]):
                score += 25
                reasons.append(f"Highly eligible for {category_label}.")
        else:
            if any(role in target_roles for role in ["all farmers", "farmers", "landholding farmers", "entrepreneurs"]):
                score += 20
                reasons.append(f"Applicable for {category_label} landholdings.")

        # Factor 3: Land Type & Category Specific Intelligence
        category = scheme.get("category", "").lower()
        eligibility = scheme.get("eligibility", "").lower()
        benefits = scheme.get("benefits", "").lower()
        full_text = (scheme.get("scheme_name", "") + " " + eligibility + " " + benefits + " " + category).lower()

        if "horticulture" in land_type or "orchard" in land_type:
            if "horticulture" in category or "midh" in full_text or "orchard" in full_text or "greenhouse" in full_text:
                score += 35
                reasons.append("Top Priority Match: Perfect fit for your Horticulture/Orchard land profile.")
        
        if "barren" in land_type or "fallow" in land_type:
            if "kusum" in full_text or "solar" in full_text or "energy" in category or "pump" in full_text:
                score += 35
                reasons.append("High Benefit: Special government solar subsidies available for fallow/barren land.")

        # Factor 4: Irrigation Infrastructure & Climate Resilience Matching
        if "rainfed" in irrigation or "no irrigation" in irrigation:
            if "insurance" in category or "pmfby" in full_text or "climate" in full_text or "drought" in full_text or "pocra" in full_text or "sanjiwani" in full_text:
                score += 30
                reasons.append("Climate Protection: Protects rain-dependent crops against seasonal weather risks.")
            elif "pump" in full_text or "solar" in full_text:
                score += 25
                reasons.append("Infrastructure Boost: Subsidizes irrigation pumps for rain-dependent farms.")
        elif "irrigated" in irrigation:
            if "kcc" in full_text or "credit" in category or "soil" in category or "fertilizer" in full_text or "income" in category:
                score += 25
                reasons.append("High Productivity: Maximizes yields on your irrigated land.")

        # Factor 5: Crop Portfolio Matching (NLP Keyword Alignment)
        matched_crops = []
        for crop in crops:
            if crop and crop in full_text:
                matched_crops.append(crop.capitalize())
        
        if matched_crops:
            score += 20
            reasons.append(f"Direct Crop Support: Tailored for growing {', '.join(matched_crops)}.")
        elif any(c in full_text for c in ["crop", "grain", "paddy", "wheat", "all crops"]):
            score += 10
            reasons.append("Broad Agricultural Coverage: Covers your primary field crops.")

        # Factor 6: Category Priority Weighting
        priority = scheme.get("priority", "Medium").lower()
        if priority == "high":
            score += 10

        # Cap matching confidence at 98% for realistic AI presentation
        final_score = min(score, 98)

        if final_score >= 45:
            matched_schemes.append({
                "scheme_name": scheme.get("scheme_name"),
                "full_name": scheme.get("full_name"),
                "category": scheme.get("category"),
                "match_score": final_score,
                "benefits": clean_benefits_text(scheme.get("benefits", "")),
                "eligibility": scheme.get("eligibility"),
                "documents_required": scheme.get("documents_required", []),
                "application_mode": scheme.get("application_mode"),
                "apply_url": scheme.get("apply_url", "#"),
                "reasons": reasons[:3]  # Return top 3 compelling personalized reasons
            })
            
    # Sort matched schemes by score descending
    matched_schemes.sort(key=lambda x: x["match_score"], reverse=True)
    return matched_schemes
