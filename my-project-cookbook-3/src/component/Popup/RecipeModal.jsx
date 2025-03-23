import { useState } from "react";
import { FaClock, FaUser, FaHeart, FaShare, FaTimes, FaEdit } from "react-icons/fa";
import EditRecipe from "./Editrecipe"; // Import ไฟล์ Editrecipe.jsx

export default function RecipeModal({ recipe, onClose }) {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return <EditRecipe onClose={() => setIsEditing(false)} />;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg relative">
                {/* ปุ่มปิด */}
                <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <FaTimes size={20} />
                </button>

                {/* รูปภาพอาหาร */}
                <img src={recipe.img} alt={recipe.name} className="w-full h-40 object-cover rounded-lg mb-4" />

                {/* ชื่อเมนู & ข้อมูล */}
                <h2 className="text-2xl font-bold text-[#3A6D82]">{recipe.name}</h2>
                <div className="flex gap-4 text-gray-600 my-2">
                    <div className="flex items-center gap-1"><FaClock /> {recipe.time} นาที</div>
                    <div className="flex items-center gap-1"><FaUser /> {recipe.serves} คน</div>
                </div>

                {/* ส่วนผสม */}
                <div className="mb-4">
                    <h3 className="font-semibold text-[#3A6D82]">ส่วนผสม</h3>
                    <ul className="list-disc list-inside text-gray-700">
                        {recipe.ingredients.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                {/* ขั้นตอน */}
                <div className="mb-4">
                    <h3 className="font-semibold text-[#3A6D82]">วิธีทำ</h3>
                    <ol className="list-decimal list-inside text-gray-700">
                        {recipe.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>

                {/* ปุ่มต่างๆ */}
                <div className="flex justify-between">
                    <button className="flex items-center gap-1 px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => setIsEditing(true)}>
                        <FaEdit /> แก้ไข
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg">
                        <FaHeart /> Favorite
                    </button>
                    <button className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg">
                        <FaShare /> แชร์
                    </button>
                </div>
            </div>
        </div>
    );
}
