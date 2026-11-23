# Spice Garden Restaurant Website

A simple two-page restaurant website with a Flask backend API.

## Project Structure

```
restaurant-website/
├── frontend/
│   ├── index.html      # Home page
│   ├── about.html      # About page
│   ├── style.css       # Styles
│   ├── script.js       # Frontend JavaScript (fetches from API)
│   └── assets/         # Optional images folder
├── backend/
│   ├── app.py          # Flask application
│   └── requirements.txt
└── README.md
```

## Local Development (Windows Command Prompt)

### 1. Install Required Software

- **Python**: Download from https://www.python.org/downloads/ (check "Add Python to PATH")
- **VS Code**: Download from https://code.visualstudio.com/
- **Git**: Download from https://git-scm.com/download/win

### 2. Create Virtual Environment and Install Dependencies

```cmd
cd path\to\restaurant-website\backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Run the Flask Backend

```cmd
python app.py
```

The API will be available at: http://localhost:5000

Test endpoints:
- http://localhost:5000/
- http://localhost:5000/api/restaurant
- http://localhost:5000/api/menu

### 4. Run the Frontend

Option A – Open files directly in browser (simplest for beginners):
- Open `frontend/index.html` in your browser (double-click or drag into browser).

Option B – Use a simple local server (recommended to avoid CORS issues with file://):
```cmd
cd path\to\restaurant-website\frontend
python -m http.server 5500
```
Then open: http://localhost:5500

### 5. Important: Update API URL

In `frontend/script.js`, the line:
```javascript
const API_BASE_URL = 'http://localhost:5000';
```
must match where your backend is running.

After you deploy the backend to Render, change this value to your Render URL (e.g. `https://your-app.onrender.com`).

## Next Steps

After local testing works, we will:
1. Push the code to GitHub
2. Deploy frontend to Netlify
3. Deploy backend to Render
4. Learn about DNS, SSL/TLS and Cloudflare concepts
