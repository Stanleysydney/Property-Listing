# 🏠 NyumbaFresh SaaS | Premier Housing Solutions Kenya

> **Connecting Nairobi tenants to newly constructed, unrented properties in real-time.**

![Project Status](https://img.shields.io/badge/Status-Live-brightgreen)
![Stack](https://img.shields.io/badge/Stack-MERN-blue)
![License](https://img.shields.io/badge/License-MIT-orange)

## 📖 Table of Contents
- [The Mission](#-the-mission-solving-nairobis-housing-crisis)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Contact](#-contact)

---

## 🇰🇪 The Mission: Solving Nairobi's Housing Crisis

Finding a house in Nairobi has historically been a painful process characterized by **information asymmetry**, **high agency fees**, and **time-consuming physical searches**.

**The Problems We Solve:**
1.  **The "Ghost House" Problem:** Tenants often pay to view houses that are already fully rented.
    *   *NyumbaFresh Solution:* Our backend syncs unit availability in real-time. If a unit is booked, the system instantly updates the remaining count. When a building is full, booking is disabled.
2.  **The Brokerage Gap:** Middlemen often charge exorbitant fees without guaranteeing results.
    *   *NyumbaFresh Solution:* We act as a direct Digital Link between the Landlord of a newly finished building and the Tenant, removing the chaos of unregulated brokers.
3.  **Information Overload:** Listings are often scattered across social media with poor details.
    *   *NyumbaFresh Solution:* A standardized Tier System (Premier, Tier 1, Tier 2) helps users filter properties based on budget and lifestyle immediately.

**NyumbaFresh is not just a listing site; it is a property inventory management system (SaaS) that ensures the data users see is accurate, safe, and actionable.**

---

## ✨ Key Features

### 👤 For Tenants (Consumers)
*   **Real-Time Unit Tracking:** See exactly how many units are remaining on specific floors (e.g., "3rd Floor, 2 units left").
*   **Smart Filtering:** Search by Region (Westlands, Kilimani, etc.), House Type (Bedsitter, 1B, 2B), and Price.
*   **Secure Booking:** Integrated M-Pesa simulation to secure a viewing slot for a refundable fee.
*   **Tiered Categories:**
    *   🟡 **Premier:** Luxury living, high-end amenities.
    *   🔵 **Tier 1:** Modern, middle-class apartments.
    *   🟠 **Tier 2:** Affordable, quality housing.
*   **Trust Badges:** Visual indicators of verified landlords and secure payments.

### 🏢 For Landlords & Admins
*   **Inventory Management:** Upload properties with details on total units. The system auto-decrements inventory upon booking.
*   **Data Analytics:** View real-time booking statistics.
*   **Direct Reach:** List properties immediately after construction is finished to fill vacancies faster.

---

## 🛠 Technology Stack

This project utilizes a modern **MVC Architecture** to ensure scalability for over 1 million users.

*   **Frontend:** HTML5, CSS3 (Custom Variables, Dark/Light Mode), Vanilla JavaScript (ES6+).
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB (Atlas Cloud) with Mongoose ORM.
*   **Authentication:** Custom JWT-style role-based authentication (Tenant/Landlord).
*   **Styling:** Mobile-first responsive design with CSS Grid and Flexbox.

---

## 🚀 Installation & Setup

Follow these instructions to run the website locally.

### Prerequisites
*   Node.js installed.
*   Internet connection (for MongoDB Atlas).

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/nyumbafresh.git
cd nyumbafresh
2. Backend Setup
Navigate to the backend folder and install dependencies.
code
Bash
cd backend
npm install
3. Configure Environment
Open backend/server.js. The MongoDB connection string is pre-configured for the SaaS demo, but you can replace MONGO_URI with your own credentials if needed.
4. Seed the Database (Crucial Step)
Before running the app, populate it with the 10 Fictitious Kenyan Properties and User Accounts.
Start the server:
code
Bash
node server.js
Open your browser and visit:
http://localhost:5000/api/seed
You will see a JSON confirmation: {"message": "System Seeded..."}.
5. Run the Frontend
Open frontend/index.html in your browser.
(Tip: Use VS Code "Live Server" for the best experience).
📡 API Documentation
The backend exposes the following RESTful endpoints:
Method	Endpoint	Description
GET	/api/properties	Fetch all listings with unit counts.
POST	/api/login	Authenticate User (Tenant/Landlord).
POST	/api/book	Book a unit (Decrements DB count).
GET	/api/seed	Reset DB to initial state (Demo Only).
📂 Project Structure
code
Text
NyumbaFresh_Final_System/
│
├── backend/             # Server Logic
│   ├── models/          # Database Schemas (User, Property)
│   ├── server.js        # Express App & Routes
│   └── package.json     # Dependencies
│
└── frontend/            # Client Interface
    ├── css/             # Styles & Dark Mode logic
    ├── js/              # App Logic (Auth, Booking, Filters)
    ├── index.html       # Main Landing Page
    └── login.html       # Authentication Page
🔐 Login Credentials (Demo)
To test the dashboard and booking features:
Tenant Role:
User: tenant
Pass: 123
Landlord Role:
User: landlord
Pass: 123
📞 Contact
NyumbaFresh Systems
📍 HQ: Kenya Cinema Plaza, 4th Floor, Nairobi CBD
📧 Email: support@nyumbafresh.co.ke
📞 Phone: +254 700 123 456