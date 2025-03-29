import { useState } from "react";
import { FaClock, FaUser, FaHeart, FaShare, FaTimes, FaEdit } from "react-icons/fa";
import EditRecipe from "./Editrecipe"; // Import ไฟล์ Editrecipe.jsx

export default function RecipeModal({ recipe, onClose }) {
    const [isEditing, setIsEditing] = useState(false);

    if (isEditing) {
        return <EditRecipe onClose={() => setIsEditing(false)} />;
    }

    const handleShare = async () => {
        console.log("handleShare ถูกเรียกแล้ว!");
    
        if (!recipe._id) {
            alert("ไม่พบ Recipe ID");
            return;
        }
    
        try {
            const response = await fetch(`http://127.0.0.1:8000/share/${recipe._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({})
            });
    
            const data = await response.json();
            console.log("API Response:", data);
    
            if (response.ok) {
                alert(`ลิงก์แชร์: ${data.share_link}`);
            } else {
                alert("แชร์ไม่สำเร็จ: " + data.detail);
            }
        } catch (error) {
            console.error("เกิดข้อผิดพลาด:", error);
            alert("เกิดข้อผิดพลาดในการแชร์");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-[600px] p-6 rounded-lg shadow-lg relative">
                <button className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" onClick={onClose}>
                    <FaTimes size={20} />
                </button>
                <img src={recipe.img} alt={recipe.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                <h2 className="text-2xl font-bold text-[#3A6D82]">{recipe.name}</h2>

                <div className="flex justify-between">
                    <button className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg">
                        <FaHeart /> Favorite
                    </button>
                    <button 
                        className="flex items-center gap-1 px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleShare}  
                    >
                        <FaShare /> hi
                    </button>
                </div>
            </div>
        </div>
    );
}
