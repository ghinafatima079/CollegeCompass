from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.db import get_db

from app.models.models import (
    SavedCollege
)

from app.models.models import (
    SavedCollege,
    College
)

router = APIRouter()


@router.post("/saved")
def save_college(
    user_id: str,
    college_id: int,
    db: Session = Depends(get_db)
):

    existing = db.query(
        SavedCollege
    ).filter(

        SavedCollege.user_id == user_id,
        SavedCollege.college_id == college_id

    ).first()

    if existing:
        return {
            "message": "Already saved"
        }

    saved = SavedCollege(
        user_id=user_id,
        college_id=college_id
    )

    db.add(saved)
    db.commit()

    return {
        "message": "College saved"
    }


@router.delete("/saved/{college_id}")
def remove_saved_college(
    college_id: int,
    user_id: str,
    db: Session = Depends(get_db)
):

    saved = db.query(
        SavedCollege
    ).filter(

        SavedCollege.user_id == user_id,
        SavedCollege.college_id == college_id

    ).first()

    if saved:

        db.delete(saved)
        db.commit()

    return {
        "message": "Removed"
    }


@router.get("/saved/{user_id}")
def get_saved_colleges(
    user_id: str,
    db: Session = Depends(get_db)
):

    saved = db.query(
        SavedCollege
    ).filter(

        SavedCollege.user_id == user_id

    ).all()

    college_ids = [
        item.college_id
        for item in saved
    ]

    colleges = db.query(
        College
    ).filter(

        College.id.in_(college_ids)

    ).all()

    return colleges