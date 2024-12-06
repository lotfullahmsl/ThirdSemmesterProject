// Function to create random circles on the page
function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = Math.random() * (60 - 20) + 20;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;

    document.body.appendChild(circle);

    setTimeout(() => {
        circle.remove();
    }, 10000);
}

setInterval(createCircle, 1500);

// Add login form submission functionality
document.getElementById('login-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const result = await response.text();

        if (response.ok) {
            alert('Login Successful: ' + result);
            window.location.href = '/index.html';
            document.getElementById('login-form').reset();
        } else {
            alert('Login Failed: ' + result);
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    }
});
