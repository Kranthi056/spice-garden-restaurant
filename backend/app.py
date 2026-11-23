from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

# Allow all origins (for this learning project)
CORS(app)

# Restaurant data (in-memory, no database)
RESTAURANT_INFO = {
    "name": "Spice Garden Restaurant",
    "introduction": "Spice Garden Restaurant brings you the authentic flavours of India. From aromatic curries to freshly baked naan, every dish is prepared with carefully selected spices and traditional recipes passed down through generations.",
    "history": "Founded in 2015 by Chef Ramesh Patel, Spice Garden started as a small family kitchen serving neighbours and friends. Over the years, it has grown into a beloved neighbourhood restaurant known for its warm hospitality and genuine Indian home-style cooking. Our mission is to share the rich culinary heritage of India with everyone who walks through our doors.",
    "services": [
        "Dine-in service",
        "Takeaway orders",
        "Online ordering (coming soon)",
        "Catering for small events",
        "Vegetarian and non-vegetarian options",
        "Special dietary accommodations on request"
    ],
    "opening_hours": "Monday - Friday: 11:00 AM - 10:00 PM\nSaturday - Sunday: 10:00 AM - 11:00 PM",
    "address": "42 Orchard Lane, Greenfield District,\nPune, Maharashtra 411001, India",
    "phone": "+91 98765 43210",
    "email": "hello@spicegarden.example.com"
}

MENU = {
    "dishes": [
        {
            "id": 1,
            "name": "Butter Chicken",
            "description": "Tender chicken cooked in a rich, creamy tomato and butter gravy with aromatic spices.",
            "price": 320,
            "image": "https://images.unsplash.com/photo-1603894584372-c69caa91efee?w=400"
        },
        {
            "id": 2,
            "name": "Paneer Tikka Masala",
            "description": "Grilled cottage cheese cubes simmered in a spiced onion-tomato gravy.",
            "price": 280,
            "image": "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400"
        },
        {
            "id": 3,
            "name": "Chicken Biryani",
            "description": "Fragrant basmati rice layered with spiced chicken, caramelised onions and saffron.",
            "price": 350,
            "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400"
        },
        {
            "id": 4,
            "name": "Dal Makhani",
            "description": "Slow-cooked black lentils in a buttery, creamy sauce – a true comfort classic.",
            "price": 220,
            "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400"
        },
        {
            "id": 5,
            "name": "Garlic Naan",
            "description": "Soft, fluffy Indian bread brushed with garlic butter and fresh coriander.",
            "price": 60,
            "image": "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400"
        },
        {
            "id": 6,
            "name": "Gulab Jamun",
            "description": "Soft milk-solid dumplings soaked in warm cardamom-scented sugar syrup.",
            "price": 120,
            "image": "https://images.unsplash.com/photo-1589301760910-fd2d87c30cc3?w=400"
        }
    ]
}


@app.route('/')
def home():
    """Homepage / status route"""
    return jsonify({
        "status": "ok",
        "message": "Spice Garden Restaurant API is running",
        "endpoints": {
            "restaurant": "/api/restaurant",
            "menu": "/api/menu"
        }
    })


@app.route('/api/restaurant')
def get_restaurant():
    """Return restaurant information"""
    try:
        return jsonify(RESTAURANT_INFO)
    except Exception as e:
        return jsonify({"error": "Failed to retrieve restaurant information", "details": str(e)}), 500


@app.route('/api/menu')
def get_menu():
    """Return menu information in JSON format"""
    try:
        return jsonify(MENU)
    except Exception as e:
        return jsonify({"error": "Failed to retrieve menu information", "details": str(e)}), 500


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Endpoint not found"}), 404


@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == '__main__':
    # For local development only
    # In production, Gunicorn will run the app
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
