import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import Framer Motion
import Headbar from "../component/Headbar";
import EditRecipe from "../component/Popup/Editrecipe";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import r_harn_thai from "../assets/dashboard/r_harn_thai.png";
import r_harn_asia from "../assets/dashboard/r_harn_asia.png";
import r_harn_tawantok from "../assets/dashboard/r_harn_tawantok.png";
import cake from "../assets/dashboard/cake.png";
import drinks from "../assets/dashboard/drinks.png";
import fruit from "../assets/dashboard/fruit.png";
import pak from "../assets/dashboard/pak.png";
import { PiMedal } from "react-icons/pi";
import Pic from "../assets/dashboard/dashboard.png"

const foodCategories = [
  { id: "thai", image: r_harn_thai, label: "อาหารไทย" },
  { id: "asian", image: r_harn_asia, label: "อาหารเอเชีย" },
  { id: "western", image: r_harn_tawantok, label: "อาหารตะวันตก" },
];

const snacksCategories = [
  { id: "dessert", image: cake, label: "ของหวาน" },
  { id: "drink", image: drinks, label: "น้ำหวาน" },
  { id: "fruit", image: fruit, label: "ผลไม้" },
  { id: "salad", image: pak, label: "สลัด" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleCategoryClick = (categoryId, label) => {
    toast.success(`เลือก ${label} - คุณได้เลือกหมวดหมู่ ${label}`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    navigate(`/menu?category=${categoryId}`);
  };
   
  return (
    <div className="h-screen bg-gray-100 relative">
      <Headbar />

      <div className="relative h-[55%] bg-[#FAE6B1] flex items-center justify-start">
        <div className="flex justify-between w-full p-2 translate-x-[-200px]">
          <div className="pl-4 px-10 translate-y-26">
            <img
              src={Pic}
              alt="dashboard"
              className="w-full rounded-full"
            />
          </div>
          <div className="flex justify-between w-full">
            <div>
              <div className="flex justify-end items-center mb-8">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center bg-white p-2 shadow-md rounded-md">
                      <PiMedal className="text-3xl" />
                      <a href="/menu" className="px-3">
                        สูตรอาหารทั้งหมด
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsEditOpen(true)}
                    className="bg-orange-500 text-white px-4 py-2 rounded-full ml-2"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex w-full gap-6">
                {foodCategories.map((category) => (
                  <div
                    key={category.id}
                    className="cursor-pointer"
                    onClick={() => handleCategoryClick(category.id, category.label)}
                  >
                    <img
                      src={category.image}
                      alt={category.label}
                      className="rounded-lg shadow-lg"
                    />
                    <p className="text-center font-semibold mt-2">{category.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="h-[50%] bg-[#B3DEE5] flex flex-col justify-center items-center p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {snacksCategories.map((category) => (
            <div
              key={category.id}
              className="cursor-pointer"
              onClick={() => handleCategoryClick(category.id, category.label)}
            >
              <img
                src={category.image}
                alt={category.label}
                className="rounded-lg shadow-lg"
              />
              <p className="text-center font-semibold mt-2">{category.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pop-up Animation */}
      <AnimatePresence>
        {isEditOpen && (
          <motion.div
            className="fixed inset-0  bg-opacity-40 backdrop-blur-xs flex justify-center items-center z-50"
            onClick={(e) => e.target === e.currentTarget && setIsEditOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-[700px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <EditRecipe onClose={() => setIsEditOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer />
    </div>
  );
}
