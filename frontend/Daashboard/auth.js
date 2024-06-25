document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulate an authentication process
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('role', 'admin');
      window.location.href = 'dashboard.html';
    } else if (username === 'manager' && password === 'manager123') {
      localStorage.setItem('role', 'manager');
      window.location.href = 'dashboard.html';
    } else if (username === 'employee' && password === 'employee123') {
      localStorage.setItem('role', 'employee');
      window.location.href = 'dashboard.html';
    } else {
      alert('Invalid credentials');
    }
  });
