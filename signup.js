const passwordInput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');

// Password Strength Checker
function checkPasswordStrength(password) {
    let strength = { percent: 0, color: 'red', text: 'Weak Password' };

    if (password.length >= 8) {
        strength.percent = 30;
    }
    if (/\d/.test(password)) {
        strength.percent += 20;
    }
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength.percent += 30;
    }
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        strength.percent += 20;
    }

    if (strength.percent >= 80) {
        strength.color = 'green';
        strength.text = 'Strong Password';
    } else if (strength.percent >= 50) {
        strength.color = 'yellow';
        strength.text = 'Moderate Password';
    } else {
        strength.color = 'red';
        strength.text = 'Weak Password';
    }

    return strength;
}

passwordInput.addEventListener('input', function () {
    const password = passwordInput.value;
    const strength = checkPasswordStrength(password);

    strengthBar.style.width = `${strength.percent}%`;
    strengthBar.style.backgroundColor = strength.color;
    strengthText.textContent = strength.text;
});


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

// Submission Form
document.querySelector('form').addEventListener('submit', function () {
    //rest the form
    document.getElementById('form').reset();
    window.location.href = '/index.html';
});
