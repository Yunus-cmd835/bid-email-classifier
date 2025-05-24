# backend/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def create_bid(db: Session, bid: schemas.BidCreate):
    db_bid = models.Bid(**bid.dict(exclude={"emails"}))
    db.add(db_bid)
    db.commit()
    db.refresh(db_bid)
    for email in bid.emails:
        db_email = models.Email(**email.dict(), bid_id=db_bid.id)
        db.add(db_email)
    db.commit()
    return db_bid

def get_bids(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Bid).offset(skip).limit(limit).all()
