from sqlalchemy import Column, Integer, String, Text, Numeric, Boolean, DateTime, Date, Time, ForeignKey, Enum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from database import Base

# 1. User Model
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(Enum("admin", "organizer", "participant"), default="participant")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    events = relationship("Event", back_populates="organizer", cascade="all, delete")
    registrations = relationship("Registration", back_populates="user", cascade="all, delete")
    feedbacks = relationship("Feedback", back_populates="user", cascade="all, delete")


# 2. Venue Model
class Venue(Base):
    __tablename__ = "venues"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    venue_name = Column(String(150), nullable=False)
    address = Column(Text, nullable=False)
    capacity = Column(Integer, nullable=False)
    contact_info = Column(String(100), nullable=True)

    events = relationship("Event", back_populates="venue")


# 3. Event Model
class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    organizer_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    venue_id = Column(Integer, ForeignKey("venues.id", ondelete="SET NULL"), nullable=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    category = Column(String(50), nullable=False)
    event_date = Column(Date, nullable=False)
    start_time = Column(Time, nullable=False)
    end_time = Column(Time, nullable=False)
    ticket_price = Column(Numeric(10, 2), default=0.00)
    total_seats = Column(Integer, nullable=False)
    status = Column(Enum("upcoming", "completed", "cancelled"), default="upcoming")
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    organizer = relationship("User", back_populates="events")
    venue = relationship("Venue", back_populates="events")
    registrations = relationship("Registration", back_populates="event", cascade="all, delete")
    feedbacks = relationship("Feedback", back_populates="event", cascade="all, delete")


# 4. Registration Model
class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    ticket_code = Column(String(50), unique=True, nullable=False)
    payment_status = Column(Enum("pending", "paid", "free"), default="free")
    attendance_status = Column(Boolean, default=False)
    registered_at = Column(DateTime(timezone=True), server_default=func.now())

    event = relationship("Event", back_populates="registrations")
    user = relationship("User", back_populates="registrations")


# 5. Feedback Model
class Feedback(Base):
    __tablename__ = "feedback"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    event_id = Column(Integer, ForeignKey("events.id", ondelete="CASCADE"), nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    rating = Column(Integer, nullable=False)
    comment = Column(Text, nullable=True)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())

    event = relationship("Event", back_populates="feedbacks")
    user = relationship("User", back_populates="feedbacks")


# 6. Customer Quote Inquiry Model (Stores all Sialkot event inquiries)
class Inquiry(Base):
    __tablename__ = "inquiries"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    phone = Column(String(50), nullable=False)
    event_type = Column(String(50), nullable=False)
    event_date = Column(Date, nullable=False)
    guests = Column(Integer, nullable=False)
    city = Column(String(50), default="Sialkot")
    status = Column(String(20), default="pending")
    created_at = Column(DateTime(timezone=True), server_default=func.now())