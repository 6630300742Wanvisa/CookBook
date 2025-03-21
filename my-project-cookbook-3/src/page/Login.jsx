import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
    const navigate = useNavigate();
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [error, seterror] = useState("");

    const handleLogin = () => {
        if (username === "admin" && password === "1234") {
            navigate("/dashbord"); 
        } else {
            seterror("กรุณากรอกบัญชีและรหัสผ่านให้ถูกต้อง"); 
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-[#31515C]">
            <div className="bg-white p-8 rounded-lg shadow-lg w-xl text-center">
                <div className="flex justify-between items-center">
                    <div className="text-left">
                        <h1 className="text-lg font-bold">เข้าสู่ระบบ</h1>
                        <p className="text-gray-500">Login</p>
                    </div>

                    <img 
                        src={logo} 
                        className="w-16" 
                        alt="Logo" 
                    />
                </div>

                <div className="text-left mt-4">
                    <label className="block text-sm font-medium">ชื่อผู้ใช้งาน</label>
                    <input
                        id="username"
                        type="text"
                        className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#31515C] bg-[#D9D9D9]"
                        placeholder="กรอกชื่อผู้ใช้งาน"
                        value={username}
                        onChange={(e) => setusername(e.target.value)}
                    />
                </div>

                <div className="text-left mt-4">
                    <label className="block text-sm font-medium">รหัสผ่าน</label>
                    <input
                        id="password"
                        type="password"
                        className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#31515C] bg-[#D9D9D9]"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                    />
                </div>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                <button
                    className="mt-6 w-full p-2 bg-[#5AA897] text-black font-bold rounded-full hover:bg-[#4E8A7C]"
                    onClick={handleLogin}
                >
                    เข้าสู่ระบบ
                </button>

                <p className="mt-4 text-sm text-gray-600">
                    ถ้ายังไม่มีบัญชี{" "}
                    <a href="/register" className="text-[#5AA897] hover:underline">
                        สมัครสมาชิกเลย
                    </a>
                </p>
            </div>
        </div>
    );
}
