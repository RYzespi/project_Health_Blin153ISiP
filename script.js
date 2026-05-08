const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';
    if (currentTheme === 'dark') {
        newTheme = 'light';
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        newTheme = 'dark';
        document.documentElement.setAttribute('data-theme', 'dark');
    }
    localStorage.setItem('theme', newTheme);
    if (themeToggle) {
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

function handleFeedback(event) {
    event.preventDefault();
    const name = document.getElementById('feedbackName')?.value || '';
    const message = document.getElementById('feedbackMessage')?.value || '';
    
    if (name.trim() === '' || message.trim() === '') {
        showNotification('Пожалуйста, заполните имя и сообщение', 'error');
        return;
    }
    
    showNotification('Спасибо! Ваше сообщение отправлено.', 'success');
    
    if (document.getElementById('feedbackName')) document.getElementById('feedbackName').value = '';
    if (document.getElementById('feedbackPhone')) document.getElementById('feedbackPhone').value = '';
    if (document.getElementById('feedbackMessage')) document.getElementById('feedbackMessage').value = '';
}

function showNotification(text, type) {
    const notification = document.createElement('div');
    notification.textContent = text;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '12px 24px';
    notification.style.borderRadius = '12px';
    notification.style.backgroundColor = type === 'success' ? '#4caf50' : '#f44336';
    notification.style.color = 'white';
    notification.style.zIndex = '1000';
    notification.style.fontWeight = 'bold';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

const feedbackForm = document.getElementById('feedbackFormElement');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', handleFeedback);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}