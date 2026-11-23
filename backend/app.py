
from flask import Flask, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)

# ==========================================
# CORS CONFIGURATION
# ==========================================

# For this beginner project, allow requests from all origins.
# Later, replace this with your exact Netlify website URL.
CORS(app)


# ==========================================
# RESTAURANT INFORMATION
# ==========================================

RESTAURANT_INFO = {
    "name": "Spice Garden Restaurant",

    "introduction": (
        "Spice Garden Restaurant brings you authentic Indian flavours. "
        "From aromatic curries to freshly prepared naan, every dish is "
        "made with carefully selected spices and traditional recipes."
    ),

    "history": (
        "Founded in 2015 by Chef Ramesh Patel, Spice Garden started "
        "as a small family kitchen serving neighbours and friends. "
        "It has grown into a neighbourhood restaurant known for warm "
        "hospitality and Indian home-style cooking."
    ),

    "services": [
        "Dine-in service",
        "Takeaway orders",
        "Online ordering coming soon",
        "Catering for small events",
        "Vegetarian and non-vegetarian options",
        "Special dietary accommodations on request"
    ],

    "opening_hours": (
        "Monday - Friday: 11:00 AM - 10:00 PM\n"
        "Saturday - Sunday: 10:00 AM - 11:00 PM"
    ),

    "address": (
        "42 Orchard Lane, Greenfield District, "
        "Pune, Maharashtra 411001, India"
    ),

    "phone": "+91 98765 43210",
    "email": "hello@spicegarden.example.com"
}


# ==========================================
# MENU DATA
# ==========================================

MENU = {
    "dishes": [
        {
            "id": 1,
            "name": "Butter Chicken",
            "description": (
                "Tender chicken cooked in a rich, creamy "
                "tomato and butter gravy with aromatic spices."
            ),
            "price": 320,
            "image": (
                "https://images.unsplash.com/photo-1603894584372-c69caa91efee?w=600"
            )
        },
        {
            "id": 2,
            "name": "Paneer Tikka Masala",
            "description": (
                "Grilled cottage cheese cubes simmered "
                "in a spiced onion-tomato gravy."
            ),
            "price": 280,
            "image": (
                "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600"
            )
        },
        {
            "id": 3,
            "name": "Chicken Biryani",
            "description": (
                "Fragrant basmati rice layered with spiced chicken, "
                "caramelised onions and saffron."
            ),
            "price": 350,
            "image": (
                "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600"
            )
        },
        {
            "id": 4,
            "name": "Dal Makhani",
            "description": (
                "Slow-cooked black lentils in a buttery, "
                "creamy sauce."
            ),
            "price": 220,
            "image": (
                "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600"
            )
        },
        {
            "id": 5,
            "name": "Garlic Naan",
            "description": (
                "Soft Indian bread brushed with garlic butter "
                "and fresh coriander."
            ),
            "price": 60,
            "image": (
                "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600"
            )
        },
        {
            "id": 6,
            "name": "Gulab Jamun",
            "description": (
                "Soft milk-solid dumplings soaked in warm "
                "cardamom-scented sugar syrup."
            ),
            "price": 120,
            "image": (
                "https://images.unsplash.com/photo-1589301760910-fd2d87c30cc3?w=600"
            )
        }
    ]
}


# ==========================================
# HEALTH CHECK / HOME ROUTE
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "status": "ok",
        "message": "Spice Garden Restaurant API is running",
        "endpoints": {
            "restaurant": "/api/restaurant",
            "menu": "/api/menu"
        }
    })


# ==========================================
# RESTAURANT API
# ==========================================

@app.route("/api/restaurant", methods=["GET"])
def get_restaurant():
    return jsonify(RESTAURANT_INFO)


# ==========================================
# MENU API
# ==========================================

@app.route("/api/menu", methods=["GET"])
def get_menu():
    return jsonify(MENU)


# ==========================================
# 404 ERROR
# ==========================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({
        "status": "error",
        "message": "Endpoint not found"
    }), 404


# ==========================================
# 500 ERROR
# ==========================================

@app.errorhandler(500)
def internal_error(error):
    return jsonify({
        "status": "error",
        "message": "Internal server error"
    }), 500


# ==========================================
# LOCAL DEVELOPMENT
# ==========================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=True
    )
