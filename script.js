import { getRandomAnimation } from './animations.js';
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
        github: 'GitHub',
        discord: 'Discord',
        telegram: 'Telegram',
        spotify: 'Spotify',
        steam: 'Steam',
    },
    ru: {
        bio: 'C# и Python разработчик | <a href="https://fiit-urfu.ru/" target="_blank" class="fiit-link">Студент-бакалавр ФИИТ</a>',
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

let scene, camera, renderer, animate;

function initThree() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(
        window.innerWidth / -2, window.innerWidth / 2,
        window.innerHeight / 2, window.innerHeight / -2,
        0.1, 1000
    );
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('particles-js').appendChild(renderer.domElement);

    const animation = getRandomAnimation();
    animate = animation(scene, camera);

    camera.position.z = 100;

    animationLoop();
}

function animationLoop() {
    requestAnimationFrame(animationLoop);
    animate();
    renderer.render(scene, camera);
}

function onWindowResize() {
    const aspect = window.innerWidth / window.innerHeight;
    const frustumSize = 1000;

    camera.left = frustumSize * aspect / -2;
    camera.right = frustumSize * aspect / 2;
    camera.top = frustumSize / 2;
    camera.bottom = frustumSize / -2;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            child.position.set(
                Math.random() * window.innerWidth - window.innerWidth / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2,
                0
            );
        }
    });
}

window.addEventListener('resize', onWindowResize, false);

window.addEventListener('load', () => {
    loadAvatar();
    createLinks();
    updateLanguage();
    initThree();
});
