import tkinter as tk
from tkinter import ttk

class FoodApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Food Recipe App")
        self.geometry("800x600")

        # แถบค้นหา
        search_frame = tk.Frame(self)
        search_frame.pack(pady=10)

        self.search_entry = tk.Entry(search_frame, width=50)
        self.search_entry.pack(side=tk.LEFT, padx=5)
        search_button = tk.Button(search_frame, text="🔍", command=self.search)
        search_button.pack(side=tk.LEFT)

        # กริดหมวดหมู่อาหาร
        self.food_frame = tk.Frame(self)
        self.food_frame.pack(pady=20)

        food_categories = ["อาหารไทย", "อาหารเอเชีย", "อาหารตะวันตก"]

        for i, category in enumerate(food_categories):
            frame = tk.Frame(self.food_frame)
            frame.grid(row=0, column=i, padx=10)

            label = tk.Label(frame, text=f"[{category}]")
            label.pack()

            button = tk.Button(frame, text=category, command=lambda c=category: self.show_category(c))
            button.pack()

    def search(self):
        print(f"Searching: {self.search_entry.get()}")

    def show_category(self, category):
        print(f"Selected Category: {category}")

if __name__ == "__main__":
    app = FoodApp()
    app.mainloop()
