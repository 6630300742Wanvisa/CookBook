from fastapi import FastAPI
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGO_URI)
db = client["cookend"]
collection = db["recipes"]

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "MongoDB เชื่อมต่อแล้วจ้าาาาา!"}
