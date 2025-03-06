from flask import Flask, request, jsonify
app = Flask(__name__)
recipes = [
   {"id": 1, "name": "ต้มยำกุ้ง", "ingredients": ["กุ้ง", "ตะไคร้", "ใบมะกรูด"]},
   {"id": 2, "name": "ผัดกะเพรา", "ingredients": ["หมูสับ", "กะเพรา", "พริก"]},
]
@app.route('/search', methods=['GET'])
def search_recipe():
   query = request.args.get('q', '').lower()
   result = [r for r in recipes if query in r['name'].lower()]
   return jsonify(result)
if __name__ == '__main__':
   app.run(debug=True)