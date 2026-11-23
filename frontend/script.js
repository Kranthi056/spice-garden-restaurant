// API Base URL
// For local development, use: http://localhost:5000
// After deploying backend to Render, replace with your Render URL
// Example: https://spice-garden-api.onrender.com

const API_BASE_URL = 'http://localhost:5000';

// Fetch restaurant information
async function fetchRestaurantInfo() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/restaurant`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching restaurant info:', error);
        return null;
    }
}

// Fetch menu information
async function fetchMenu() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/menu`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        return null;
    }
}

// Display restaurant info on Home page
function displayHomePage(info, menu) {
    // Intro
    const introEl = document.getElementById('restaurant-intro');
    if (introEl && info) {
        introEl.textContent = info.introduction || 'Welcome to Spice Garden Restaurant.';
    }

    // Opening hours
    const hoursEl = document.getElementById('opening-hours');
    if (hoursEl && info) {
        hoursEl.textContent = info.opening_hours || 'Not available';
    }

    // Address
    const addressEl = document.getElementById('address');
    if (addressEl && info) {
        addressEl.textContent = info.address || 'Not available';
    }

    // Contact
    const contactEl = document.getElementById('contact');
    if (contactEl && info) {
        contactEl.textContent = `Phone: ${info.phone || 'N/A'}\nEmail: ${info.email || 'N/A'}`;
    }

    // Menu
    const menuContainer = document.getElementById('menu-container');
    if (menuContainer && menu && menu.dishes) {
        menuContainer.innerHTML = '';
        menu.dishes.forEach(dish => {
            const item = document.createElement('div');
            item.className = 'menu-item';
            item.innerHTML = `
                <img src="${dish.image}" alt="${dish.name}" onerror="this.src='https://via.placeholder.com/300x180?text=${encodeURIComponent(dish.name)}'">
                <div class="menu-item-content">
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                    <p class="price">₹${dish.price}</p>
                </div>
            `;
            menuContainer.appendChild(item);
        });
    } else if (menuContainer) {
        menuContainer.innerHTML = '<p class="error">Unable to load menu. Please check if the backend is running.</p>';
    }
}

// Display About page content
function displayAboutPage(info) {
    if (!info) return;

    const historyEl = document.getElementById('history');
    if (historyEl) {
        historyEl.textContent = info.history || 'Our story begins with a passion for authentic Indian spices.';
    }

    const servicesEl = document.getElementById('services-list');
    if (servicesEl && info.services) {
        servicesEl.innerHTML = '';
        info.services.forEach(service => {
            const li = document.createElement('li');
            li.textContent = service;
            servicesEl.appendChild(li);
        });
    }

    const contactEl = document.getElementById('about-contact');
    if (contactEl) {
        contactEl.innerHTML = `
            <strong>Phone:</strong> ${info.phone || 'N/A'}<br>
            <strong>Email:</strong> ${info.email || 'N/A'}
        `;
    }

    const locationEl = document.getElementById('location');
    if (locationEl) {
        locationEl.textContent = info.address || 'Location not available';
    }
}

// Initialize page based on current page
async function init() {
    const path = window.location.pathname;
    const isAboutPage = path.includes('about.html');

    const info = await fetchRestaurantInfo();
    const menu = isAboutPage ? null : await fetchMenu();

    if (!info) {
        // Show error messages if API is unreachable
        const errorMsg = 'Unable to connect to the server. Please ensure the backend is running at ' + API_BASE_URL;
        
        if (document.getElementById('restaurant-intro')) {
            document.getElementById('restaurant-intro').innerHTML = `<span class="error">${errorMsg}</span>`;
        }
        if (document.getElementById('menu-container')) {
            document.getElementById('menu-container').innerHTML = `<p class="error">${errorMsg}</p>`;
        }
        if (document.getElementById('history')) {
            document.getElementById('history').innerHTML = `<span class="error">${errorMsg}</span>`;
        }
        return;
    }

    if (isAboutPage) {
        displayAboutPage(info);
    } else {
        displayHomePage(info, menu);
    }
}

// Run when page loads
document.addEventListener('DOMContentLoaded', init);
