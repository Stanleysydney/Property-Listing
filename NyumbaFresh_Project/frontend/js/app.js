const API_URL = 'http://localhost:5000/api';
let allData = [];

// 1. Authentication Check
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('nyumbaUser'));
    const authSection = document.getElementById('auth-section');
    
    if (user) {
        authSection.innerHTML = `
            <span style="margin-right:10px; font-weight:bold;">Hi, ${user.username}</span>
            <button onclick="logout()" style="background:red; color:white; border:none; padding:5px 15px; border-radius:20px; cursor:pointer;">Logout</button>
        `;
    }
}

window.logout = () => {
    localStorage.removeItem('nyumbaUser');
    window.location.reload();
};

// 2. Fetch Properties
async function fetchProperties() {
    const grid = document.getElementById('property-grid');
    try {
        const res = await fetch(`${API_URL}/properties`);
        allData = await res.json();
        render(allData);
    } catch (err) {
        grid.innerHTML = `<p style="text-align:center; color:red;">System Offline. Please ensure the backend is running.</p>`;
    }
}

// 3. Render Grid
function render(data) {
    const grid = document.getElementById('property-grid');
    if (data.length === 0) {
        grid.innerHTML = '<p style="text-align:center;">No properties match your filters.</p>';
        return;
    }

    grid.innerHTML = data.map(prop => {
        const remaining = prop.totalUnits - prop.bookedUnits;
        const isFull = remaining <= 0;
        const tierClass = prop.tier.replace(' ', '-');

        return `
            <div class="card">
                <span class="badge tier-${tierClass}">${prop.tier}</span>
                <img src="${prop.image}" alt="${prop.title}">
                <div class="card-content">
                    <h3>${prop.title}</h3>
                    
                    <div class="detail-row"><span>📍 Location</span> <span>${prop.region}</span></div>
                    <div class="detail-row"><span>🏠 Type</span> <span>${prop.type}</span></div>
                    <div class="detail-row"><span>🏢 Available Floors</span> <span>${prop.floorsAvailable}</span></div>
                    <div class="detail-row"><span>📧 Email</span> <span>${prop.landlordEmail}</span></div>

                    <p class="price">KES ${prop.price.toLocaleString()}/mo</p>

                    <div style="margin-top:10px; font-weight:bold; color:${isFull ? 'red' : 'green'};">
                        ${isFull ? '🚫 Fully Rented' : `✅ ${remaining} Units Remaining`}
                    </div>

                    <button class="btn-book" onclick="openBooking('${prop._id}', '${prop.title}')" ${isFull ? 'disabled' : ''}>
                        ${isFull ? 'Sold Out' : 'Book Viewing'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

// 4. Filters
window.applyFilters = () => {
    const region = document.getElementById('region-filter').value;
    const type = document.getElementById('type-filter').value;
    
    let filtered = allData;
    if(region) filtered = filtered.filter(p => p.region === region);
    if(type) filtered = filtered.filter(p => p.type === type);
    
    render(filtered);
};

// 5. Booking Modal
const modal = document.getElementById('booking-modal');
window.openBooking = (id, title) => {
    if(!localStorage.getItem('nyumbaUser')) {
        alert("Please Login to secure a booking.");
        window.location.href = 'login.html';
        return;
    }
    modal.style.display = 'flex';
    document.getElementById('modal-title').innerText = title;
    document.getElementById('prop-id').value = id;
};

window.closeModal = () => modal.style.display = 'none';

document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const propId = document.getElementById('prop-id').value;
    
    try {
        const res = await fetch(`${API_URL}/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ propertyId: propId })
        });
        const result = await res.json();
        
        if(result.success) {
            alert(result.message);
            closeModal();
            fetchProperties(); // Refresh the counts
        } else {
            alert(result.message);
        }
    } catch (err) { alert("Error Processing Booking"); }
});

// 6. Dark Mode
document.getElementById('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    html.setAttribute('data-theme', current === 'light' ? 'dark' : 'light');
});

// Init
checkAuth();
fetchProperties();