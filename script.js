var themeBtn = document.getElementById('themeBtn');
var burger = document.getElementById('burger');
var nav = document.getElementById('nav');
var form = document.getElementById('feedbackForm');

var savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.innerHTML = '☀️';
}

if (themeBtn) {
    themeBtn.onclick = function() {
        var theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            themeBtn.innerHTML = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeBtn.innerHTML = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    };
}

if (burger) {
    burger.onclick = function() {
        nav.classList.toggle('show');
    };
}

if (form) {
    form.onsubmit = function(event) {
        event.preventDefault();
        var name = document.getElementById('name').value;
        var message = document.getElementById('message').value;
        
        if (name === '' || message === '') {
            alert('Пожалуйста, заполните имя и сообщение');
        } else {
            alert('Спасибо! Ваше сообщение отправлено.');
            document.getElementById('name').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('message').value = '';
        }
    };
}