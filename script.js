const form = document.getElementById('loginForm');
const msgBox = document.getElementById('msgBox');
let selectedRole = 'docente';

document.querySelectorAll('.roles button').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.roles button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedRole = btn.dataset.role;
    });
});

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

    const data = {
        role: selectedRole,
        user: user.value.trim(),
        pass: pass.value
    };
    console.log('Login:', data);

    msgBox.className = 'msg-box success';
    msgBox.textContent = 'Acceso correcto. Redirigiendo...';

    setTimeout(() => {
        window.location.href = 'dashboard.html?role=' + selectedRole;
    }, 800);
});
