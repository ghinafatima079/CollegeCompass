from pydantic import BaseModel
from typing import List


class CourseResponse(BaseModel):
    id: int
    name: str
    duration: str
    fees: int

    class Config:
        from_attributes = True


class ReviewResponse(BaseModel):
    id: int
    author: str
    rating: float
    comment: str

    class Config:
        from_attributes = True

class CollegeCardResponse(BaseModel):
    id: int
    name: str
    location: str
    fees: int
    rating: float
    placements_percentage: float
    avg_package: float
    image_url: str

    class Config:
        from_attributes = True

class CollegeResponse(BaseModel):
    id: int
    name: str
    location: str
    fees: int
    rating: float
    placements_percentage: float
    avg_package: float
    description: str
    image_url: str

    courses: List[CourseResponse]
    reviews: List[ReviewResponse]

    class Config:
        from_attributes = True