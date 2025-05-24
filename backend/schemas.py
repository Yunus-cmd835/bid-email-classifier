# backend/schemas.py
from pydantic import BaseModel
from typing import List, Optional

class EmailBase(BaseModel):
    subject: str
    body: str

class EmailCreate(EmailBase):
    pass

class Email(EmailBase):
    id: int
    class Config:
        orm_mode = True


class BidBase(BaseModel):
    project_name: str
    contractor: str
    bid_type: str
    value_range: str
    status: str

class BidCreate(BidBase):
    emails: List[EmailCreate] = []

class Bid(BidBase):
    id: int
    emails: List[Email] = []
    class Config:
        orm_mode = True
