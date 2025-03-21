import logo from "../assets/logo.png";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineHome, AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function Headbar() {
    return (
        <div className="flex items-center justify-between p-3 shadow-md bg-white ">
            <div className="flex flex-glow ml-2">
                <img 
                    src={logo} 
                    alt="logo" 
                    className="w-20" 
                />
                <div className="flex items-center border px-4 py-2 rounded-full w-3xl h-12 translate-y-4 ml-10">
                    <IoIosSearch className="text-gray-500" />
                    <input 
                        type="text" 
                        placeholder="ค้นหา....."
                        className="ml-2 outline-none w-full"
                    />
                </div>
            </div>

            <div className="flex space-x-4 ml-auto">
                <div className="flex space-x-4">
                    <Link 
                        to="/dashbord" 
                        className="flex items-center space-x-2 border px-4 py-2 rounded-full"
                    >
                        <AiOutlineHome />
                        <span>หน้าหลัก</span>
                    </Link>
                    <Link 
                        to="/menu" 
                        className="flex items-center space-x-2 border px-4 py-2 rounded-full"
                    >
                        <AiOutlineHeart />
                        <span>รายการโปรด</span>
                    </Link>
                    <Link 
                        to="/profile" 
                        className="flex items-center space-x-2 border px-4 py-2 rounded-full"
                    >
                        <AiOutlineUser />
                        <span>ผู้ใช้</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
