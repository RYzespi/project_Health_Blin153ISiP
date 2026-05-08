// script.js - Интерактивность сайта ЗОЖ

// 1. Переключение светлой/тёмной темы
const themeToggle = document.getElementById('themeToggle');

// Проверяем сохранённую тему в localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    if (themeToggle) {
        if (theme === 'dark') {
            themeToggle.innerHTML = '☀️';
        } else {
            themeToggle.innerHTML = '🌙';
        }
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
    updateThemeIcon(newTheme);
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// 2. Бургер-меню для мобильных устройств
const burgerMenu = document.getElementById('burgerMenu');
const navMenu = document.getElementById('navMenu');

if (burgerMenu && navMenu) {
    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 3. Анимация появления карточек при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам
document.querySelectorAll('.basic-card, .habit-section, .about-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 4. Обработка формы обратной связи
function handleFeedback(event) {
    event.preventDefault();
    
    const name = document.getElementById('feedbackName')?.value || '';
    const phone = document.getElementById('feedbackPhone')?.value || '';
    const message = document.getElementById('feedbackMessage')?.value || '';
    
    if (name.trim() === '' || message.trim() === '') {
        showNotification('Пожалуйста, заполните имя и сообщение', 'error');
        return;
    }
    
    // Имитация отправки
    console.log('Отправлено:', { name, phone, message });
    showNotification('Спасибо! Ваше сообщение отправлено.', 'success');
    
    // Очистка формы
    if (document.getElementById('feedbackName')) document.getElementById('feedbackName').value = '';
    if (document.getElementById('feedbackPhone')) document.getElementById('feedbackPhone').value = '';
    if (document.getElementById('feedbackMessage')) document.getElementById('feedbackMessage').value = '';
}

// Функция уведомлений
function showNotification(text, type = 'success') {
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
    notification.style.animation = 'fadeInOut 3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Добавляем анимацию для уведомлений
const style = document.createElement('style');
style.textContent = `
@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px); }
    15% { opacity: 1; transform: translateY(0); }
    85% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
}`;
document.head.appendChild(style);

// Навешиваем обработчик формы
const feedbackForm = document.getElementById('feedbackFormElement');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', handleFeedback);
}

// 5. Плавная прокрутка для якорных ссылок
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

// 6. Установка года в footer (автоматическое обновление)
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}