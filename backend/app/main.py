from fastapi import FastAPI
from app.database.db import engine, Base
from app.models.models import *
from app.routes.college_routes import router as college_router

from fastapi.middleware.cors import CORSMiddleware

from app.routes.saved import router as saved_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(college_router)
app.include_router(saved_router)

@app.get("/")
def root():
    return {"message": "Collegely API running"}