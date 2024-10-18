const links = [
    { url: 'https://github.com/sw1ftin', text: 'GitHub', color: '#333' },
    { url: 'https://discord.com/users/sw1ftin', text: 'Discord', color: '#7289DA' },
    { url: 'https://t.me/sw1ftin', text: 'Telegram', color: '#0088cc' },
    { url: 'https://open.spotify.com/user/31tsmc56hj2nhmzi6flvfcu6727y', text: 'Spotify', color: '#1DB954' },
    { url: 'https://steamcommunity.com/id/jakobsw1ft/', text: 'Steam', color: '#171a21' },
];

function loadAvatar() {
    fetch('https://api.github.com/users/sw1ftin')
        .then(response => response.json())
        .then(data => {
            document.getElementById('avatar').src = data.avatar_url;
        })
        .catch(error => console.error('Error loading avatar:', error));
}

function createLinks() {
    const linksContainer = document.getElementById('links');
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = 'link-button';
        a.textContent = link.text;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.style.backgroundColor = link.color;
        a.style.color = ['#ffffff', '#1DA1F2'].includes(link.color) ? '#000000' : '#ffffff';
        linksContainer.appendChild(a);
    });
}

function updateVisitorCount() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    document.getElementById('count').textContent = count;
}

const themeToggle = document.getElementById('theme-toggle');
const languageToggle = document.getElementById('language-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-theme');
    const icon = themeToggle.querySelector('.material-icons');
    icon.textContent = body.classList.contains('light-theme') ? 'light_mode' : 'dark_mode';
});

const translations = {
    en: {
        bio: 'C# and Python Developer | <a href="https://fiit-urfu.ru/" target="_blank" class="fiit-link">FIIT Bachelor Student</a>',
        visitors: 'Visits:',
        github: 'GitHub',
        discord: 'Discord',
        telegram: 'Telegram',
        spotify: 'Spotify',
        steam: 'Steam',
    },
    ru: {
        bio: 'C# и Python разработчик | <a href="https://fiit-urfu.ru/" target="_blank" class="fiit-link">Студент-бакалавр ФИИТ</a>',
        visitors: 'Посещения:',
        github: 'GitHub',
        discord: 'Discord',
        telegram: 'Telegram',
        spotify: 'Spotify',
        steam: 'Steam',
    }
};

let currentLang = 'en';

function updateLanguage() {
    document.querySelector('.bio').innerHTML = translations[currentLang].bio;
    document.getElementById('visitor-count').firstChild.textContent = translations[currentLang].visitors + ' ';
    links.forEach((link, index) => {
        const linkElement = document.querySelectorAll('.link-button')[index];
        linkElement.textContent = translations[currentLang][link.text.toLowerCase()];
    });
}

languageToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'ru' : 'en';
    languageToggle.textContent = currentLang.toUpperCase();
    updateLanguage();
});

document.addEventListener('DOMContentLoaded', () => {
    loadAvatar();
    createLinks();
    updateVisitorCount();
    updateLanguage();
});

particlesJS('particles-js', {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#1793d1' },
        shape: { type: 'triangle', stroke: { width: 0, color: '#000000' } },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#1793d1', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 3, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});
