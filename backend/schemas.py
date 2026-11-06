from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Union
from datetime import date, time, datetime

# ================= USER SCHEMAS =================
class UserBase(BaseModel):
    full_name: str
    email: str
    role: Optional[str] = "participant"

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


# ================= VENUE SCHEMAS =================
class VenueBase(BaseModel):
    venue_name: str
    address: str
    capacity: int
    contact_info: Optional[str] = None

class VenueCreate(VenueBase):
    pass

class VenueResponse(VenueBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ================= EVENT SCHEMAS =================
class EventBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: str
    event_date: Union[date, str]
    start_time: Union[time, str]
    end_time: Union[time, str]
    ticket_price: Optional[float] = 0.00
    total_seats: int
    status: Optional[str] = "upcoming"
    venue_id: Optional[int] = None

class EventCreate(EventBase):
    organizer_id: int

class EventResponse(EventBase):
    id: int
    organizer_id: int
    created_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


# ================= REGISTRATION SCHEMAS =================
class RegistrationCreate(BaseModel):
    event_id: int
    user_id: int

class RegistrationResponse(BaseModel):
    id: int
    event_id: int
    user_id: int
    ticket_code: str
    payment_status: str
    attendance_status: bool
    registered_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)


# ================= INQUIRY / QUOTE SCHEMAS =================
class InquiryCreate(BaseModel):
    full_name: str
    phone: str
    event_type: str
    event_date: Union[date, str]
    guests: int
    city: Optional[str] = "Sialkot"

class InquiryResponse(InquiryCreate):
    id: int
    status: str
    created_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)