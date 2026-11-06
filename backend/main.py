from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import text
from typing import List, Optional
from pydantic import BaseModel
import uuid

import models
import schemas
from database import engine, get_db

# Automatically creates tables in MySQL
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Eventora Event Management System API",
    description="Backend API for Sialkot Events, Venues, Inquiries, and AI Recommendations",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Welcome to Eventora API with AI Module!"}


# ================= AI RECOMMENDATION SCHEMAS & ALGORITHM =================
class AIRecommendRequest(BaseModel):
    event_type: str
    budget: float
    guests: int
    city: Optional[str] = "Sialkot"

class AIRecommendResponse(BaseModel):
    match_score: int
    recommended_venue: str
    venue_location: str
    recommended_package: str
    estimated_catering: float
    estimated_decor: float
    estimated_sound_photo: float
    per_head_cost: float
    ai_advice: str

# Sialkot Venues Database for AI Matching
SIALKOT_AI_VENUES = [
  {"name": "Grand Continental Marquee", "loc": "Daska Road, Sialkot", "min_guests": 100, "max_guests": 500, "tier": "budget"},
  {"name": "Garrison Event Complex", "loc": "Tariq Road, Sialkot", "min_guests": 200, "max_guests": 650, "tier": "standard"},
  {"name": "Javaid Marquee & Banquet", "loc": "Sambrial Road, Sialkot", "min_guests": 300, "max_guests": 850, "tier": "premium"},
  {"name": "Royal Palm Event Hall", "loc": "Cantt, Sialkot", "min_guests": 450, "max_guests": 1300, "tier": "luxury"},
]

@app.post("/ai/recommend/", response_model=AIRecommendResponse)
def get_ai_event_recommendation(req: AIRecommendRequest):
    budget = req.budget
    guests = max(req.guests, 50)
    event_type = req.event_type
    
    # 1. Capacity & Budget Matching Algorithm
    per_head = round(budget / guests, 2)
    
    # Venue selection based on guest count capacity
    suitable_venues = [v for v in SIALKOT_AI_VENUES if v["max_guests"] >= guests]
    if not suitable_venues:
        selected_venue = SIALKOT_AI_VENUES[-1]
    else:
        # Pick the venue whose capacity best fits without huge wasted space
        selected_venue = min(suitable_venues, key=lambda v: v["max_guests"] - guests)

    # 2. Package & Smart Cost Allocation
    if event_type.lower() in ["wedding", "walima", "barat"]:
        package_name = "Imperial Gold Bridal Pavilion & Floral Setup"
        decor_share = 0.38
        catering_share = 0.48
        sound_share = 0.14
    elif event_type.lower() in ["birthday", "party"]:
        package_name = "Custom Neon & Pastel Balloon Lounge"
        decor_share = 0.45
        catering_share = 0.40
        sound_share = 0.15
    elif event_type.lower() in ["corporate", "conference", "convocation"]:
        package_name = "Executive P2.5 LED Screen & Podium Summit Setup"
        decor_share = 0.30
        catering_share = 0.45
        sound_share = 0.25
    else: # Mehndi / Musical
        package_name = "Traditional Marigold Canopy & Floor Baithak"
        decor_share = 0.40
        catering_share = 0.45
        sound_share = 0.15

    catering_budget = round(budget * catering_share, 2)
    decor_budget = round(budget * decor_share, 2)
    sound_budget = round(budget * sound_share, 2)

    # 3. Calculate Match Feasibility Score (0 - 100%)
    if per_head < 800:
        match_score = 65
        advice = f"Your budget of Rs. {budget:,.0f} allows Rs. {per_head:.0f}/head. Consider prioritizing buffet menu optimization at {selected_venue['name']}."
    elif 800 <= per_head <= 1600:
        match_score = 88
        advice = f"Great budget allocation! For {guests} guests, {selected_venue['name']} ({selected_venue['loc']}) provides optimum seating and decor symmetry."
    else:
        match_score = 96
        advice = f"Premium luxury tier! Your budget permits imported fresh flower arrangements, chandelier pathways, and executive buffet service at {selected_venue['name']}."

    return {
        "match_score": match_score,
        "recommended_venue": selected_venue["name"],
        "venue_location": selected_venue["loc"],
        "recommended_package": package_name,
        "estimated_catering": catering_budget,
        "estimated_decor": decor_budget,
        "estimated_sound_photo": sound_budget,
        "per_head_cost": per_head,
        "ai_advice": advice
    }


# ================= INQUIRIES & QUOTES (MYSQL CONNECTED) =================
@app.post("/inquiries/", response_model=schemas.InquiryResponse, status_code=status.HTTP_201_CREATED)
def submit_quote_request(inquiry: schemas.InquiryCreate, db: Session = Depends(get_db)):
    db_inquiry = models.Inquiry(**inquiry.model_dump())
    db.add(db_inquiry)
    db.commit()
    db.refresh(db_inquiry)
    return db_inquiry

@app.get("/inquiries/", response_model=List[schemas.InquiryResponse])
def get_all_quote_requests(db: Session = Depends(get_db)):
    return db.query(models.Inquiry).order_by(models.Inquiry.id.desc()).all()


# ================= VENUES =================
@app.post("/venues/", response_model=schemas.VenueResponse, status_code=status.HTTP_201_CREATED)
def create_venue(venue: schemas.VenueCreate, db: Session = Depends(get_db)):
    db_venue = models.Venue(**venue.model_dump())
    db.add(db_venue)
    db.commit()
    db.refresh(db_venue)
    return db_venue

@app.get("/venues/", response_model=List[schemas.VenueResponse])
def get_all_venues(db: Session = Depends(get_db)):
    return db.query(models.Venue).all()


# ================= EVENTS =================
@app.post("/events/", response_model=schemas.EventResponse, status_code=status.HTTP_201_CREATED)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    db_event = models.Event(**event.model_dump())
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event

@app.get("/events/", response_model=List[schemas.EventResponse])
def get_all_events(category: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Event)
    if category:
        query = query.filter(models.Event.category.ilike(f"%{category}%"))
    return query.all()