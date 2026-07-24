import sqlite3
from sqlalchemy import create_engine, Column, Integer, String, Boolean, Float, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

SQLALCHEMY_DATABASE_URL = "sqlite:///./farmer_app.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False, "timeout": 30},
    pool_pre_ping=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    state = Column(String)
    land_size_acres = Column(Float)
    crop_types = Column(String) # Comma separated
    phone_number = Column(String, unique=True, index=True)

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    doc_type = Column(String) # e.g., Aadhaar, Land Record
    extracted_text = Column(Text)
    is_verified = Column(Boolean, default=False)
    file_path = Column(String)

    user = relationship("User")

class Application(Base):
    __tablename__ = "applications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    scheme_name = Column(String)
    status = Column(String, default="Pending") # Pending, Verified, Approved, Disbursed
    applied_date = Column(String)
    
    user = relationship("User")

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
