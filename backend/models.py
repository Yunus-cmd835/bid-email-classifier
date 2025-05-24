# backend/models.py
from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class Bid(Base):
    __tablename__ = "bids"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String, index=True)
    contractor = Column(String)
    bid_type = Column(String)
    value_range = Column(String)
    status = Column(String)

    emails = relationship("Email", back_populates="bid")


class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    subject = Column(String)
    body = Column(Text)
    bid_id = Column(Integer, ForeignKey("bids.id"))

    bid = relationship("Bid", back_populates="emails")
