import { useState } from "react";
import { FaTrash, FaPlus, FaSave, FaTimes, FaTag, FaUser, FaClock } from "react-icons/fa";

export default function EditRecipe({ onClose }) {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const [ingredients, setIngredients] = useState([""]);
    const [steps, setSteps] = useState([""]);

    const addIngredient = () => setIngredients([...ingredients, ""]);
    const addStep = () => setSteps([...steps, ""]);

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const removeStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleSave = async () => {
        const recipe = {
            title,
            ingredients,
            instructions: steps,
            category,
            image_url: imageUrl,
        };

        try {
            const res = await fetch("http://localhost:8000/recipes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(recipe),
            });

            const data = await res.json();
            console.log(data);
            alert("บันทึกสำเร็จ!");
            onClose();
        } catch (err) {
            console.error("เกิดข้อผิดพลาด:", err);
            alert("บันทึกล้มเหลว!");
        }
    };

    return (
        <div className="fixed inset-0  bg-opacity-10  flex items-center justify-center ">
            <div className="w-[700px] p-6 rounded-2xl bg-white shadow-lg relative">
                {/* เมนูและอัปโหลดรูปภาพ */}
                <div className="flex justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="ชื่อเมนู"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg p-2 w-2/3"
                    />
                    <div className="flex gap-2">
                        <div className="w-16 h-16 flex items-center justify-center rounded-lg">📷</div>
                        <button className="border px-3 py-2 rounded-lg bg-gray-100">อัปโหลดรูปภาพ</button>
                    </div>
                </div>

                {/* ข้อมูลทั่วไป */}
                <div className="border rounded-lg p-4 mb-4">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <FaTag />
                            <select className="border rounded-lg p-2" value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">เลือกหมวดหมู่</option>
                                <option value="อาหารไทย">อาหารไทย</option>
                                <option value="อาหารเอเชีย">อาหารเอเชีย</option>
                                <option value="อาหารตะวันตก">อาหารตะวันตก</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock />
                            <input type="number" className="border rounded-lg p-2 w-16" placeholder="นาที" />
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUser />
                            <input type="number" className="border rounded-lg p-2 w-20" placeholder="เสิร์ฟ" />
                        </div>
                    </div>
                </div>

                {/* ส่วนผสม */}
                <div className="border rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-2">ส่วนผสม</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {ingredients.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <input
                                    type="text"
                                    className="border rounded-lg p-2 w-full"
                                    placeholder="ใส่ส่วนผสม..."
                                    value={item}
                                    onChange={(e) => {
                                        const updated = [...ingredients];
                                        updated[index] = e.target.value;
                                        setIngredients(updated);
                                    }}
                                />
                                <button className="text-red-500" onClick={() => removeIngredient(index)}>
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                    </div>
                    <button className="text-blue-500 flex items-center gap-1 mt-2" onClick={addIngredient}>
                        <FaPlus /> เพิ่มส่วนผสม
                    </button>
                </div>

                {/* ขั้นตอนการทำ */}
                <div className="border rounded-lg p-4 mb-4">
                    <h3 className="font-semibold mb-2">ขั้นตอน</h3>
                    {steps.map((step, index) => (
                        <div key={index} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                className="border rounded-lg p-2 w-full"
                                placeholder="ใส่ขั้นตอน..."
                                value={step}
                                onChange={(e) => {
                                    const updated = [...steps];
                                    updated[index] = e.target.value;
                                    setSteps(updated);
                                }}
                            />
                            <button className="text-red-500" onClick={() => removeStep(index)}>
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                    <button className="text-blue-500 flex items-center gap-1 mt-2" onClick={addStep}>
                        <FaPlus /> เพิ่มขั้นตอน
                    </button>
                </div>

                {/* ปุ่ม Save, Cancel, Delete */}
                <div className="flex justify-between">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-1" onClick={handleSave}>
                        <FaSave /> Save
                    </button>
                    <button className="bg-gray-300 text-black px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-gray-400" onClick={onClose}>
                        <FaTimes /> Cancel
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
