document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const data = {
        title: document.getElementById('p-title').value,
        region: document.getElementById('p-region').value,
        type: document.getElementById('p-type').value,
        tier: document.getElementById('p-tier').value,
        price: document.getElementById('p-price').value,
        totalUnits: document.getElementById('p-units').value,
        // Wrap single image in array to match schema
        images: [document.getElementById('p-img').value], 
        rentedUnits: 0
    };

    try {
        const res = await createProperty(data);
        if(res.property) {
            alert('Property Uploaded Successfully!');
            e.target.reset();
        } else {
            alert('Error uploading: ' + res.message);
        }
    } catch (err) {
        alert('Server Error');
    }
});