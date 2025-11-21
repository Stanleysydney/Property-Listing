const API_URL = 'http://localhost:5000/api';

const form = document.getElementById('login-form');
if(form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const u = document.getElementById('username').value;
        const p = document.getElementById('password').value;

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ username: u, password: p })
            });
            const data = await res.json();

            if(data.success) {
                localStorage.setItem('nyumbaUser', JSON.stringify(data.user));
                window.location.href = 'index.html';
            } else {
                alert("Invalid Credentials. Try 'tenant' and '123'");
            }
        } catch (err) {
            alert("Server Error");
        }
    });
}