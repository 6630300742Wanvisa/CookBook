import tkinter as tk
from tkinter import Entry, Listbox

class RecipeSearchApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Recipe Search App")
        self.geometry("800x500")
        self.configure(bg="#2E7D68")  # สีพื้นหลังหลัก
        
        # กรอบหลัก
        container = tk.Frame(self, bg="white", bd=2, relief="ridge")
        container.place(relx=0.5, rely=0.5, anchor="center", width=600, height=300)
        
        # ช่องค้นหา
        search_frame = tk.Frame(container, bg="white")
        search_frame.pack(pady=10, padx=10, fill="x")

        # โลโก้ (ใช้เป็น Label แทนรูปภาพ)
        logo = tk.Label(search_frame, text="🟢🍴", font=("Arial", 14), bg="white")
        logo.pack(side="left", padx=5)

        # ช่องป้อนข้อความ
        self.search_entry = Entry(search_frame, font=("Arial", 14), width=50, bd=0)
        self.search_entry.pack(side="left", padx=5, pady=5)
        self.search_entry.bind("<KeyRelease>", self.filter_recipes)

        # รายการสูตรอาหาร
        self.recipe_list = Listbox(container, font=("Arial", 14), bd=0, selectbackground="#B2DFDB")
        self.recipe_list.pack(pady=10, padx=10, fill="both", expand=True)

        # รายการอาหาร
        self.recipes = ["ชาบูราเมง", "ทอดมันปลาอินทรีย์", "ต้มยำกุ้ง", "ข้าวผัดปู"]
        self.update_list()

    def update_list(self):
        """อัปเดตรายการอาหารทั้งหมด"""
        self.recipe_list.delete(0, tk.END)
        for recipe in self.recipes:
            self.recipe_list.insert(tk.END, recipe)

    def filter_recipes(self, event):
        """กรองสูตรอาหารตามข้อความที่ป้อน"""
        query = self.search_entry.get().lower()
        self.recipe_list.delete(0, tk.END)
        for recipe in self.recipes:
            if query in recipe.lower():
                self.recipe_list.insert(tk.END, recipe)

if __name__ == "__main__":
    app = RecipeSearchApp()
    app.mainloop()
