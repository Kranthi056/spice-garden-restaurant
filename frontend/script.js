
/* ==========================================
   API CONFIGURATION
========================================== */

const API_BASE_URL =
    "https://spice-garden-restaurant-ohy3.onrender.com";


/* ==========================================
   FETCH RESTAURANT INFORMATION
========================================== */

async function fetchRestaurantInfo() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Restaurant API error:", error);
        return null;
    }
}


/* ==========================================
   FETCH MENU
========================================== */

async function fetchMenu() {
    try {
        const response = await fetch(
            `${API_BASE_URL}/api/menu`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error("Menu API error:", error);
        return null;
    }
}


/* ==========================================
   DISPLAY HOME PAGE
========================================== */

function displayHomePage(info, menu) {

    const introEl = document.getElementById("restaurant-intro");
    const hoursEl = document.getElementById("opening-hours");
    const addressEl = document.getElementById("address");
    const contactEl = document.getElementById("contact");
    const menuContainer = document.getElementById("menu-container");

    if (introEl && info) {
        introEl.textContent =
            info.introduction || "Welcome to Spice Garden Restaurant.";
    }

    if (hoursEl && info) {
        hoursEl.textContent =
            info.opening_hours || "Opening hours unavailable.";
    }

    if (addressEl && info) {
        addressEl.textContent =
            info.address || "Address unavailable.";
    }

    if (contactEl && info) {
        contactEl.textContent =
            `Phone: ${info.phone || "N/A"} | Email: ${info.email || "N/A"}`;
    }

    if (!menuContainer) return;

    menuContainer.innerHTML = "";

    if (!menu || !menu.dishes || menu.dishes.length === 0) {
        menuContainer.innerHTML =
            '<p class="error menu-error">Our menu is temporarily unavailable. Please try again later.</p>';
        return;
    }

    menu.dishes.forEach(dish => {

        const item = document.createElement("div");
        item.className = "menu-item";

        const image = document.createElement("img");
        image.src = dish.image;
        image.alt = dish.name || "Restaurant dish";
        image.loading = "lazy";

        image.onerror = function () {
            this.onerror = null;
            this.src = "https://placehold.co/600x400?text=Dish";
        };

        const content = document.createElement("div");
        content.className = "menu-item-content";

        const title = document.createElement("h3");
        title.textContent = dish.name || "Menu item";

        const description = document.createElement("p");
        description.textContent = dish.description || "";

        const price = document.createElement("p");
        price.className = "price";
        price.textContent = `₹${dish.price ?? 0}`;

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(price);

        item.appendChild(image);
        item.appendChild(content);

        menuContainer.appendChild(item);
    });
}


/* ==========================================
   DISPLAY ABOUT PAGE
========================================== */

function displayAboutPage(info) {

    if (!info) return;

    const historyEl = document.getElementById("history");
    const servicesEl = document.getElementById("services-list");
    const contactEl = document.getElementById("about-contact");
    const locationEl = document.getElementById("location");

    if (historyEl) {
        historyEl.textContent =
            info.history || "Our story begins with a passion for food.";
    }

    if (servicesEl) {
        servicesEl.innerHTML = "";

        if (Array.isArray(info.services)) {
            info.services.forEach(service => {
                const li = document.createElement("li");
                li.textContent = service;
                servicesEl.appendChild(li);
            });
        }
    }

    if (contactEl) {
        contactEl.textContent =
            `Phone: ${info.phone || "N/A"} | Email: ${info.email || "N/A"}`;
    }

    if (locationEl) {
        locationEl.textContent =
            info.address || "Location unavailable.";
    }
}


/* ==========================================
   SHOW ERROR MESSAGE
========================================== */

function showErrorMessage() {

    const friendlyMessage =
        "Restaurant information is temporarily unavailable. Please try again later.";

    const introEl = document.getElementById("restaurant-intro");
    const menuContainer = document.getElementById("menu-container");
    const historyEl = document.getElementById("history");

    if (introEl) {
        introEl.textContent = friendlyMessage;
        introEl.classList.add("error");
    }

    if (menuContainer) {
        menuContainer.innerHTML =
            `<p class="error menu-error">${friendlyMessage}</p>`;
    }

    if (historyEl) {
        historyEl.textContent = friendlyMessage;
        historyEl.classList.add("error");
    }
}


/* ==========================================
   INITIALIZE WEBSITE
========================================== */

async function init() {

    const isAboutPage =
        window.location.pathname.toLowerCase().includes("about.html");

    console.log("Connecting to restaurant backend...");

    const info = await fetchRestaurantInfo();

    if (!info) {
        showErrorMessage();
        return;
    }

    if (isAboutPage) {
        displayAboutPage(info);
    } else {
        const menu = await fetchMenu();
        displayHomePage(info, menu);
    }

    console.log("Website initialized successfully.");
}


/* ==========================================
   RUN WHEN PAGE LOADS
========================================== */

document.addEventListener("DOMContentLoaded", init);
