import json
import random

from app.database.db import SessionLocal
from app.models.models import College, Course, Review

db = SessionLocal()

review_comments = [
    "Amazing placement opportunities.",
    "Faculty members are highly experienced.",
    "Campus life is vibrant and engaging.",
    "Infrastructure is modern and well maintained.",
    "Strong coding culture and hackathons."
]

with open("data/colleges.json", "r") as file:
    colleges_data = json.load(file)

for item in colleges_data:
    
    existing_college = db.query(College).filter(
    College.name.ilike(item["name"])
    ).first()

    if existing_college:
        continue

    college = College(
        name=item["name"],
        location=item["location"],
        fees=item["fees"],
        rating=item["rating"],
        placements_percentage=item["placements_percentage"],
        avg_package=item["avg_package"],
        description=item["description"],
        image_url=item["image_url"]
    )

    db.add(college)
    db.commit()
    db.refresh(college)

    for course_name in item["courses"]:
        course = Course(
            college_id=college.id,
            name=course_name,
            duration="4 Years",
            fees=random.randint(100000, 400000)
        )

        db.add(course)

    for _ in range(3):
        review = Review(
            college_id=college.id,
            author=f"Student {random.randint(1,500)}",
            rating=round(random.uniform(3.5, 5.0), 1),
            comment=random.choice(review_comments)
        )

        db.add(review)

db.commit()

print("Database seeded successfully!")