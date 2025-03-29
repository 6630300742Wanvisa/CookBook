from fastapi import FastAPI, HTTPException
from pymongo import MongoClient
from dotenv import load_dotenv
import os
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from bson import ObjectId

# โหลดตัวแปรจาก .env
load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI")

# เชื่อมต่อ MongoDB
client = MongoClient(MONGO_URI)
db = client["cookend"]
collection = db["recipes"]  # ใช้ชื่อ 'collection' ให้สอดคล้องกัน

app = FastAPI()

# ตั้งค่า CORS ให้รองรับการเชื่อมต่อจาก Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # สามารถกำหนด URL ของ frontend ได้ เช่น ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Model สำหรับสูตรอาหาร
class Recipe(BaseModel):
    title: str
    ingredients: List[str]
    instructions: List[str]
    category: Optional[str] = None
    image_url: Optional[str] = None
    favorite: bool = False  # ค่าเริ่มต้น
    likes: int = 0  # ค่าเริ่มต้น

#Model สำหรับอัปเดต Favorite
class LikeRequest(BaseModel):
    favorite: bool

#เชื่อมต่อสำเร็จ
@app.get("/")
def read_root():
    return {"message": "MongoDB เชื่อมต่อแล้ว!"}

# เพิ่มสูตรอาหารใหม่
@app.post("/recipes")
def add_recipe(recipe: Recipe):
    collection.insert_one(recipe.model_dump())  # ใช้ model_dump() แทน dict()
    return {"message": "บันทึกสูตรเรียบร้อย"}

# ดึงเมนูทั้งหมด
@app.get("/api/menu")
def get_menu():
    menu_items = list(collection.find({}, {"_id": 1, "title": 1, "category": 1, "favorite": 1, "likes": 1}))
    
    for item in menu_items:
        item["_id"] = str(item["_id"])  # แปลง ObjectId เป็น string
    
    return {"menu": menu_items}

# อัปเดต Favorite และ Like
@app.put("/api/menu/like/{item_id}")
def update_like(item_id: str, request: LikeRequest):
    item = collection.find_one({"_id": ObjectId(item_id)})
    
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")

    # ตรวจสอบว่ามี key likes ไหม ถ้าไม่มีให้ตั้งค่าเป็น 0
    current_likes = item.get("likes", 0)
    new_likes = current_likes + 1 if request.favorite else max(0, current_likes - 1)

    collection.update_one({"_id": ObjectId(item_id)}, {"$set": {"favorite": request.favorite, "likes": new_likes}})

    return {"likes": new_likes}

# ดึงจำนวน Like ทั้งหมด
@app.get("/api/menu/total-likes")
def get_total_likes():
    total_likes = sum(item.get("likes", 0) for item in collection.find({}))
    return {"totalLikes": total_likes}

# รันเซิร์ฟเวอร์ FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
