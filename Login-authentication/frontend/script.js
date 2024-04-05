const form = document.getElementById('loginForm');
const messageEl = document.getElementById('message');

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent default form submission

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace with your backend URL
  const url = 'http://localhost:3000/login';

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {

      messageEl.textContent = data.message; // Display success message from backend
      // Handle successful login (e.g., redirect to another page)
    } else {
      messageEl.textContent = data.message; // Display error message from backend
    }
  } catch (error) {
    messageEl.textContent = 'An error occurred. Please try again.';
  }
});

function goToRegister() {
    window.location.href = 'register.html';
  }
