const loginForm = document.getElementById('loginForm'); // Existing login form reference
const registerForm = document.getElementById('registerForm');
const messageEl = document.getElementById('message'); // Reuse message element

// Register form submission handling
registerForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Replace with your backend URL for register endpoint
  const url = 'http://localhost:3000/register';

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
      messageEl.textContent = data.message; // Display success message
      // Optionally, redirect to login page after successful registration
    } else {
      messageEl.textContent = data.message; // Display error message
    }
  } catch (error) {
    console.error('Error sending register data:', error);
    messageEl.textContent = 'An error occurred. Please try again.';
  }
});

function goToLogin() {
    window.location.href = 'index.html';
  }