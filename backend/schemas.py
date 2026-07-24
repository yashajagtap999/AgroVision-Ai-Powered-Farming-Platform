from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    state: str
    land_size_acres: float
    land_type: Optional[str] = "Arable"
    irrigation_status: Optional[str] = "Rainfed"
    crop_types: str
    phone_number: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int

    class Config:
        from_attributes = True

class DocumentBase(BaseModel):
    doc_type: str
    extracted_text: Optional[str] = None
    is_verified: bool = False

class DocumentCreate(DocumentBase):
    user_id: int

class Document(DocumentBase):
    id: int
    user_id: int
    file_path: str

    class Config:
        from_attributes = True

class ApplicationBase(BaseModel):
    scheme_name: str
    status: str = "Pending"
    applied_date: str

class ApplicationCreate(ApplicationBase):
    user_id: int

class Application(ApplicationBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

class SchemeProfileMatch(BaseModel):
    scheme_name: str
    full_name: str
    category: str
    match_score: int
    benefits: str
    eligibility: str
    documents_required: List[str]
    application_mode: str
    reasons: List[str]
