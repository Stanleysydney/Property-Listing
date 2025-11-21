const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// --- 1. Database Connection ---
// Using your specific connection string
const MONGO_URI = "mongodb+srv://stanleyosoro5_db_user:kCAEsNAfuX3ZBtjP@houselisting.zpdfdab.mongodb.net/nyumbafresh_db?appName=HOUSELISTING".trim();

mongoose.connect(MONGO_URI)
.then(() => console.log("✅ Database Connected & Synced"))
.catch(err => console.error("❌ Connection Error:", err));

// --- 2. Data Models ---

// User Model
const UserSchema = new mongoose.Schema({
    username: String,
    password: String, // Simple string for demo; use bcrypt in production
    role: String // 'tenant' or 'landlord'
});
const User = mongoose.model('User', UserSchema);

// Property Model (Detailed Instructions)
const PropertySchema = new mongoose.Schema({
    title: String,
    region: String,
    type: String,   // Bedsitter, 1 Bedroom, etc.
    tier: String,   // Premier, Tier 1, Tier 2
    price: Number,
    image: String,
    landlordEmail: String,
    floorsAvailable: String, // e.g., "3rd & 4th Floor"
    totalUnits: Number,
    bookedUnits: { type: Number, default: 0 },
    isFinished: { type: Boolean, default: true }
});
const Property = mongoose.model('Property', PropertySchema);

// --- 3. API Routes ---

// Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: "Invalid Credentials" });
    }
});

// Get All Properties
app.get('/api/properties', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// Book Property (Syncs Backend)
app.post('/api/book', async (req, res) => {
    try {
        const { propertyId } = req.body;
        const property = await Property.findById(propertyId);
        
        if (property.bookedUnits >= property.totalUnits) {
            return res.status(400).json({ message: "Sorry, this property is Fully Rented." });
        }

        property.bookedUnits += 1;
        await property.save();
        
        res.json({ 
            success: true, 
            message: "Booking Confirmed! Landlord notified.",
            remaining: property.totalUnits - property.bookedUnits 
        });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// --- 4. SEED ROUTE (Generates the 10 Fictitious Properties) ---
app.get('/api/seed', async (req, res) => {
    await Property.deleteMany({});
    await User.deleteMany({});

    // Create Users
    await User.create({ username: "tenant", password: "123", role: "tenant" });
    await User.create({ username: "landlord", password: "123", role: "landlord" });

    // The 10 Listings
    const properties = [
        { title: "The Marquis Luxury", region: "Westlands", type: "3 Bedroom", tier: "Premier", price: 150000, landlordEmail: "info@marquis.co.ke", floorsAvailable: "12th, 13th", totalUnits: 10, bookedUnits: 2, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800" },
        { title: "Green Valley Courts", region: "Kilimani", type: "2 Bedroom", tier: "Tier 1", price: 65000, landlordEmail: "rentals@greenvalley.com", floorsAvailable: "1st, 2nd", totalUnits: 20, bookedUnits: 15, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800" },
        { title: "Pipeline Heights", region: "Pipeline", type: "Bedsitter", tier: "Tier 2", price: 8000, landlordEmail: "john.kamau@yahoo.com", floorsAvailable: "4th, 5th", totalUnits: 50, bookedUnits: 10, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800" },
        { title: "Karen Windy Ridge", region: "Karen", type: "4 Bedroom Villa", tier: "Premier", price: 250000, landlordEmail: "sales@karenwindy.co.ke", floorsAvailable: "Entire Unit", totalUnits: 5, bookedUnits: 0, image: "https://images.unsplash.com/photo-1600596542815-6ad4c72268c2?w=800" },
        { title: "Roysambu TRM View", region: "Roysambu", type: "1 Bedroom", tier: "Tier 2", price: 18000, landlordEmail: "wanjiku.props@gmail.com", floorsAvailable: "Ground, 1st", totalUnits: 30, bookedUnits: 28, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800" },
        { title: "Ruaka Skyline", region: "Ruaka", type: "2 Bedroom", tier: "Tier 1", price: 40000, landlordEmail: "info@skyline.co.ke", floorsAvailable: "3rd Floor", totalUnits: 15, bookedUnits: 5, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" },
        { title: "Lavington Curve", region: "Lavington", type: "3 Bedroom", tier: "Premier", price: 120000, landlordEmail: "concierge@lavington.com", floorsAvailable: "Penthouse", totalUnits: 8, bookedUnits: 7, image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800" },
        { title: "South B Golden Gate", region: "South B", type: "1 Bedroom", tier: "Tier 1", price: 25000, landlordEmail: "agent@goldengate.co.ke", floorsAvailable: "2nd Floor", totalUnits: 12, bookedUnits: 2, image: "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=800" },
        { title: "Utawala Breeze", region: "Utawala", type: "Bedsitter", tier: "Tier 2", price: 7000, landlordEmail: "breeze@utawala.co.ke", floorsAvailable: "All Floors", totalUnits: 100, bookedUnits: 12, image: "https://images.unsplash.com/photo-1591825729269-caeb344f6df2?w=800" },
        { title: "Kitengela Oasis", region: "Kitengela", type: "2 Bedroom", tier: "Tier 2", price: 22000, landlordEmail: "rent@oasis.co.ke", floorsAvailable: "Ground Floor", totalUnits: 25, bookedUnits: 10, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800" }
    ];

    await Property.insertMany(properties);
    res.json({ message: "System Seeded: 10 Properties & Users Created!" });
});

app.listen(PORT, () => console.log(`🚀 SaaS Server running on http://localhost:${PORT}`));