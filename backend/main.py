# backend/main.py
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from . import models, schemas, crud
from .database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # adjust later for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/bids/", response_model=schemas.Bid)
def create_new_bid(bid: schemas.BidCreate, db: Session = Depends(get_db)):
    return crud.create_bid(db, bid)

@app.get("/bids/", response_model=List[schemas.Bid])
def read_bids(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return crud.get_bids(db, skip=skip, limit=limit)
