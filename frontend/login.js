const submit = document.querySelector('button[type="submit"]');

let canSubmit = false;
submit.addEventListener('click', (e) => {
  e.preventDefault();
  const username = document.querySelector('#usuario');
  const password = document.querySelector('#password');
  fetch(`http://localhost:8000/wayne/user/${username.value}`)
    .then((r) => {
      if (r.status === 404) canSubmit = false;
      return r.json();
    })
    .then((d) => {
      if (username.value !== d.username || password.value !== d.password) {
        canSubmit = false;
        return;
      }
      canSubmit = true;
      console.log(canSubmit);
      if (canSubmit) window.location.href = 'http://127.0.0.1:5500/frontend/Daashboard/dashboard.html';
      return d;
    });
});
