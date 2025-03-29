import { useState, useEffect } from "react";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";
import Headbar from "./component/Headbar";

export default function App() {
    const [menuItems, setMenuItems] = useState([]);

    // โหลดข้อมูลจาก API
    useEffect(() => {
        fetch("http://localhost:8000/recipes")
            .then(response => response.json())
            .then(data => setMenuItems(data))
            .catch(error => console.error("Error fetching menu items:", error));
    }, []);

    // อัปเดต Favorite บนเซิร์ฟเวอร์
    const toggleFavorite = async (itemId) => {
        const updatedMenu = menuItems.map(item =>
            item.id === itemId ? { ...item, favorite: !item.favorite } : item
        );
        setMenuItems(updatedMenu);

        try {
            const response = await fetch(`http://localhost:8000/recipes/${itemId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorite: !menuItems.find(i => i.id === itemId).favorite })
            });

            if (!response.ok) throw new Error("Failed to update favorite");
        } catch (error) {
            console.error("Error updating favorite:", error);
        }
    };

    return (
        <div className="bg-[#D6EAF8] min-h-screen">
            <Headbar />
            <Profile likeCount={menuItems.filter(item => item.favorite).length} />
            <Menu menuItems={menuItems} toggleFavorite={toggleFavorite} />
        </div>
    );
}
