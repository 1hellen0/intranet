const form = document.getElementById('loginForm');
const msgBox = document.getElementById('msgBox');
const grados = ['primero', 'segundo', 'tercero', 'cuarto', 'quinto', 'sexto'];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    msgBox.className = 'msg-box';
    msgBox.textContent = '';

    const user = document.getElementById('user');
    const pass = document.getElementById('pass');
    let valid = true;

    [user, pass].forEach(input => {
        input.closest('.field').classList.toggle('has-error', input.value.trim() === '');
        if (input.value.trim() === '') valid = false;
    });

    if (!valid) return;

    const usuario = user.value.trim().toLowerCase().replace(',', '.');
    const partesUsuario = usuario.split('.');

    if (partesUsuario.length !== 2 || !partesUsuario[0] || !partesUsuario[1]) {
        user.closest('.field').classList.add('has-error');
        user.closest('.field').querySelector('.error-msg').textContent = 'Usa el formato nombre.grado o nombre.departamento';
        return;
    }

    const tipoUsuario = grados.includes(partesUsuario[1]) ? 'docente' : 'administrador';
    sessionStorage.setItem('nombreUsuario', partesUsuario[0]);

    msgBox.className = 'msg-box success';
    msgBox.textContent = 'Acceso correcto. Redirigiendo...';

    setTimeout(() => {
        const destinations = {
            docente: 'docente.html',
            administrador: 'administracion.html'
        };
        window.location.href = destinations[tipoUsuario];
    }, 800);
});
