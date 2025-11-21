const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    region: { type: String, required: true },
    type: { type: String, enum: ['Bedsitter', '1 Bedroom', '2 Bedroom', '3 Bedroom', 'Penthouse'], required: true },
    tier: { type: String, enum: ['Premier', 'Tier 1', 'Tier 2'], default: 'Tier 1' },
    price: { type: Number, required: true },
    images: [String], // Array of URLs
    landlord: { type: String, default: 'Managed Host' },
    totalUnits: { type: Number, required: true },
    rentedUnits: { type: Number, default: 0 },
    description: String,
    amenities: [String], // e.g. 'WiFi', 'Borehole', 'CCTV'
    datePosted: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Property', PropertySchema);