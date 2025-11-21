const API_URL = 'http://localhost:5000/api';

// Fetch Properties
async function fetchProperties() {
    const region = document.getElementById('region-filter').value;
    const type = document.getElementById('type-filter').value;
    
    try {
        const res = await fetch(`${API_URL}/properties?region=${region}&type=${type}`);
        const data = await res.json();
        const grid = document.getElementById('property-grid');
        
        if(data.length === 0) {
            grid.innerHTML = '<p>No properties found.</p>';
            return;
        }

        grid.innerHTML = data.map(prop => {
            const remaining = prop.totalUnits - prop.bookedUnits;
            const isFull = remaining <= 0;
            const tierClass = `bg-${prop.tier.replace(' ', '-')}`;

            return `
                <div class="card">
                    <span class="badge ${tierClass}">${prop.tier}</span>
                    <img src="${prop.image}" alt="${prop.title}">
                    <div class="card-info">
                        <h3>${prop.title}</h3>
                        <p>📍 ${prop.region} | 🏠 ${prop.type}</p>
                        <p class="price">KES ${prop.price.toLocaleString()}</p>
                        <p style="color:${isFull ? 'red' : 'green'}; font-weight:bold;">
                            ${isFull ? 'FULLY RENTED' : `${remaining} Units Remaining`}
                        </p>
                        <button class="btn-cta" style="width:100%; margin-top:10px; background:${isFull ? '#ccc' : ''}" 
                            onclick="openBooking('${prop._id}')" ${isFull ? 'disabled' : ''}>
                            ${isFull ? 'Closed' : 'Book Viewing'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    } catch (err) { console.error(err); }
}

// Modal Logic
const modal = document.getElementById('booking-modal');
window.openBooking = (id) => {
    modal.style.display = 'flex';
    document.getElementById('book-prop-id').value = id;
};
document.querySelector('.close-modal').onclick = () => modal.style.display = 'none';

// Handle Booking
document.getElementById('booking-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
        propertyId: document.getElementById('book-prop-id').value,
        tenantName: document.getElementById('book-name').value,
        tenantPhone: document.getElementById('book-phone').value,
        mpesaCode: document.getElementById('book-mpesa').value
    };

    try {
        const res = await fetch(`${API_URL}/book`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.message);
        modal.style.display = 'none';
        fetchProperties(); // Update UI
    } catch (err) { alert('Booking Failed'); }
});

// Theme Toggle
document.getElementById('theme-btn').onclick = () => {
    const html = document.documentElement;
    html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
};

fetchProperties();