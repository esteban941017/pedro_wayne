// document.addEventListener('DOMContentLoaded', function () {
//   const loginForm = document.getElementById('loginForm');
//   const errorMessage = document.getElementById('errorMessage');
//   const successMessage = document.getElementById('successMessage');
//   const loader = document.getElementById('loader');
//   const togglePassword = document.getElementById('togglePassword');
//   const passwordInput = document.getElementById('password');

//   // Mostrar/Ocultar senha
//   togglePassword.addEventListener('click', function () {
//     if (passwordInput.type === 'password') {
//       passwordInput.type = 'text';
//       togglePassword.textContent = '🙈';
//     } else {
//       passwordInput.type = 'password';
//       togglePassword.textContent = '👁️';
//     }
//   });

//   loginForm.addEventListener('submit', function (event) {
//     event.preventDefault();

//     const usuario = document.getElementById('usuario').value;
//     const password = document.getElementById('password').value;
//     const rememberMe = document.getElementById('rememberMe').checked;

//     // Mostrar o loader
//     loader.style.display = 'block';
//     errorMessage.style.display = 'none';
//     successMessage.style.display = 'none';

//     // Simular autenticação (Substitua esta lógica pela chamada à API de autenticação real)
//     setTimeout(() => {
//       loader.style.display = 'none';

//       if (usuario === 'admin' && password === 'admin123') {
//         successMessage.textContent = 'Login bem-sucedido!';
//         successMessage.style.display = 'block';
//         errorMessage.style.display = 'none';
//         // Salvar credenciais no local storage se "Lembrar-me" estiver marcado
//         if (rememberMe) {
//           localStorage.setItem('usuario', usuario);
//           localStorage.setItem('password', password);
//         }
//         // Redirecionar para o dashboard após um pequeno atraso
//         setTimeout(() => {
//           window.location.href =
//             'http://127.0.0.1:5500/Daashboard/dashboard.html';
//         }, 1000);
//       } else {
//         errorMessage.textContent =
//           'Usuario ou senha incorretos. Tente novamente.';
//         errorMessage.style.display = 'block';
//         successMessage.style.display = 'none';
//       }
//     }, 2000);
//   });

//   // Preencher credenciais salvas se existirem
//   if (localStorage.getItem('usuario') && localStorage.getItem('password')) {
//     document.getElementById('usuario').value = localStorage.getItem('usuario');
//     document.getElementById('password').value =
//       localStorage.getItem('password');
//     document.getElementById('rememberMe').checked = true;
//   }
// });
