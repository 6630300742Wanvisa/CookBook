from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGO_URI)
db = client["cookend"]
collection = db["recipes"]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class Recipe(BaseModel):
    title: str
    ingredients: List[str]
    instructions: List[str]
    category: Optional[str] = None
    image_url: Optional[str] = None


@app.get("/")
def read_root():
    return {"message": "MongoDB เชื่อมต่อแล้วจ้าาาาา!"}

@app.post("/recipes")
def add_recipe(recipe: Recipe):
    collection.insert_one(recipe.dict())
    return {"message": "บันทึกสูตรเรียบร้อย"}