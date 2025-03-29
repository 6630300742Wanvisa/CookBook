export default function Menu({ menuItems, toggleFavorite }) {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredMenu = selectedCategory === "all"
        ? menuItems
        : selectedCategory === "favorite"
            ? menuItems.filter(item => item.favorite)
            : menuItems.filter(item => item.category === selectedCategory);

    return (
        <div className="bg-[#D6EAF8] min-h-screen">
            <div className="grid grid-cols-3 gap-6 place-items-center">
                {filteredMenu.map(item => (
                    <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg w-60 h-60">
                        <img src={item.img} alt={item.name} className="w-48 h-32 object-cover rounded-lg" />
                        <p className="text-center mt-2 text-[#3A6D82] font-semibold">{item.name}</p>
                        <button
                            className={`mt-2 px-3 py-1 rounded-lg ${item.favorite ? "bg-red-400 text-white" : "bg-gray-200 text-black"}`}
                            onClick={() => toggleFavorite(item.id)}
                        >
                            {item.favorite ? "❤️" : "🤍"} Favorite
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
