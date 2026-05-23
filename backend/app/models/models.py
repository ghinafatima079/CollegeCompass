from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.database.db import Base


class College(Base):
    __tablename__ = "colleges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    fees = Column(Integer)
    rating = Column(Float)
    placements_percentage = Column(Float)
    avg_package = Column(Float)
    description = Column(Text)
    image_url = Column(String)

    courses = relationship("Course", back_populates="college")
    reviews = relationship("Review", back_populates="college")


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    college_id = Column(Integer, ForeignKey("colleges.id"))
    name = Column(String)
    duration = Column(String)
    fees = Column(Integer)

    college = relationship("College", back_populates="courses")


class Review(Base):
    __tablename__ = "reviews"

    id = Column(Integer, primary_key=True, index=True)
    college_id = Column(Integer, ForeignKey("colleges.id"))
    author = Column(String)
    rating = Column(Float)
    comment = Column(Text)

    college = relationship("College", back_populates="reviews")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    
class SavedCollege(Base):

    __tablename__ = "saved_colleges"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        String,
        nullable=False
    )

    college_id = Column(
        Integer,
        ForeignKey("colleges.id")
    )