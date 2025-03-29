import { useState } from "react";
import Headbar from "../component/Headbar";
import RecipeModal from "../Popup/RecipeModal.jsx"; // Import Modal สำหรับ Recipe

export default function Menu() {
    const categories = [
        { id: "all", name: "ทั้งหมด" },
        { id: "favorite", name: "รายการโปรด" },
        { id: "thai", name: "อาหารไทย" },
        { id: "asian", name: "อาหารเอเชีย" },
        { id: "western", name: "อาหารตะวันตก" },
        { id: "dessert", name: "ของหวาน" },
        { id: "drink", name: "น้ำหวาน" },
        { id: "fruit", name: "ผลไม้" },
        { id: "salad", name: "สลัด" }
    ];

    const allMenuItems = [
        { 
            id: 1, 
            name: "ข้าวผัดไข่", 
            img: "/images/rice_egg.jpg", 
            category: "thai", 
            favorite: true,
            time: 10, // เวลาทำอาหาร (นาที)
            serves: 1, // จำนวนที่เสิร์ฟ
            ingredients: ["ข้าวสวย 1 ถ้วย", "ไข่ไก่ 1 ฟอง", "ซีอิ๊วขาว 1 ช้อนโต๊ะ", "น้ำมันพืช 1 ช้อนโต๊ะ"],
            steps: ["ตั้งกระทะใส่น้ำมัน", "ตอกไข่ลงไปผัด", "ใส่ข้าวและปรุงรส", "ผัดให้เข้ากันและเสิร์ฟ"]
        },
        { 
            id: 2, 
            name: "กะเพราไข่ดาว", 
            img: "/images/krapow.jpg", 
            category: "thai", 
            favorite: false,
            time: 15,
            serves: 1,
            ingredients: ["เนื้อหมู 100 กรัม", "ใบกะเพรา", "พริก", "ซีอิ๊วขาว", "น้ำมันหอย"],
            steps: ["ตั้งกระทะ", "ผัดพริกกับเนื้อหมู", "ปรุงรส", "ใส่ใบกะเพรา", "เสิร์ฟพร้อมไข่ดาว"]
        },
        { 
            id: 3, 
            name: "ขนมหวาน", 
            img: "/images/dessert.jpg", 
            category: "dessert", 
            favorite: true,
            time: 20,
            serves: 2,
            ingredients: ["แป้ง", "น้ำตาล", "ไข่", "นม"],
            steps: ["ผสมแป้งกับน้ำตาล", "ใส่ไข่และนม", "นำเข้าเตาอบ", "เสิร์ฟ"]
        },
    ];

    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedRecipe, setSelectedRecipe] = useState(null); // เก็บเมนูที่ถูกเลือก

    const filteredMenu =
        selectedCategory === "all"
            ? allMenuItems
            : selectedCategory === "favorite"
            ? allMenuItems.filter((item) => item.favorite) // กรองเฉพาะเมนูโปรด
            : allMenuItems.filter((item) => item.category === selectedCategory);

    return (
        <div className="bg-[#D6EAF8] min-h-screen">
            <Headbar />
            <div className="bg-[#EAF7FB] max-w-6xl mx-auto p-6 rounded-xl shadow-md mt-6 translate-y-10">
                <div className="flex flex-wrap gap-4 justify-center mb-6">
                    {categories.map((btn) => (
                        <button
                            key={btn.id}
                            className={`px-4 py-2 rounded-lg ${selectedCategory === btn.id ? "bg-[#C5E1E6] font-bold" : "bg-white"} text-[#3A6D82] hover:bg-[#B0D6E8]"`}
                            onClick={() => setSelectedCategory(btn.id)}
                        >
                            {btn.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-6 place-items-center">
                    {filteredMenu.map((item) => (
                        <div
                            key={item.id}
                            className="bg-[#F6FCFF] border border-[#C5E1E6] p-4 rounded-lg shadow-lg w-60 h-60 flex flex-col items-center cursor-pointer"
                            onClick={() => setSelectedRecipe(item)} // เมื่อกด จะเซ็ตค่าเมนูที่เลือก
                        >
                            <img src={item.img} alt={item.name} className="w-48 h-32 object-cover rounded-lg" />
                            <p className="text-center mt-2 text-[#3A6D82] font-semibold">{item.name}</p>
                        </div>
                    ))}

                    {filteredMenu.length % 3 !== 0 &&
                        [...Array(3 - (filteredMenu.length % 3))].map((_, index) => (
                            <div key={index} className="w-60 h-60 bg-gray-200 rounded-lg flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 16l5-5a2 2 0 0 1 2.828 0L21 21"></path>
                                </svg>
                            </div>
                        ))}
                </div>
            </div>

            {/* แสดง RecipeModal ถ้ามีเมนูถูกเลือก */}
            {selectedRecipe && (
                <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />
            )}
        </div>
    );
}
