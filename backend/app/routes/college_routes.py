from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_

from app.database.db import get_db
from app.models.models import College
from app.schemas.college_schema import (CollegeCardResponse, CollegeResponse)

router = APIRouter()


@router.get("/colleges", response_model=list[CollegeCardResponse])
def get_colleges(
    search: str = "",
    location: str = "",
    min_rating: float = 0,
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db)
):

    query = db.query(College)

    if search:
        query = query.filter(
            College.name.ilike(f"%{search}%")
        )

    if location:
        query = query.filter(
            College.location.ilike(f"%{location}%")
        )

    if min_rating:
        query = query.filter(
            College.rating >= min_rating
        )

    offset = (page - 1) * limit

    colleges = query.offset(offset).limit(limit).all()

    return colleges

@router.get(
    "/colleges/{college_id}",
    response_model=CollegeResponse
)
def get_college_by_id(
    college_id: int,
    db: Session = Depends(get_db)
):

    college = db.query(College).filter(
        College.id == college_id
    ).first()

    return college