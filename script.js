// ===== DOM Elements =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const btnInstagram = document.getElementById('btnInstagram');
const btnTiktok = document.getElementById('btnTiktok');
const toggleSlider = document.getElementById('toggleSlider');
const instagramPackages = document.getElementById('instagramPackages');
const tiktokPackages = document.getElementById('tiktokPackages');
const orderModal = document.getElementById('orderModal');
const backToTop = document.getElementById('backToTop');
const liveFeed = document.getElementById('liveFeed');
const testimonialSlider = document.getElementById('testimonialSlider');
const testiDots = document.getElementById('testiDots');

// ===== Mobile Navigation =====
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// ===== Platform Toggle =====
btnInstagram.addEventListener('click', () => {
    btnInstagram.classList.add('active');
    btnTiktok.classList.remove('active');
    toggleSlider.classList.remove('tiktok');
    instagramPackages.classList.remove('hidden');
    tiktokPackages.classList.add('hidden');
});

btnTiktok.addEventListener('click', () => {
    btnTiktok.classList.add('active');
    btnInstagram.classList.remove('active');
    toggleSlider.classList.add('tiktok');
    tiktokPackages.classList.remove('hidden');
    instagramPackages.classList.add('hidden');
});

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);

            if (target >= 1000) {
                counter.textContent = current.toLocaleString('id-ID') + '+';
            } else if (target === 99) {
                counter.textContent = current + '%';
            } else if (target === 24) {
                counter.textContent = current + '/7';
            } else {
                counter.textContent = current.toLocaleString('id-ID');
            }

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }
        requestAnimationFrame(updateCounter);
    });
}

// Intersection Observer for counter animation
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) heroObserver.observe(heroStats);

// ===== Scroll Animations =====
const fadeElements = document.querySelectorAll(
    '.service-card, .package-card, .step-card, .why-card, .section-title'
);

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    fadeObserver.observe(el);
});

// ===== Order Modal =====
function orderPackage(packageName, price, followers) {
    document.getElementById('modalPackage').textContent = packageName;
    document.getElementById('modalFollowers').textContent = followers;
    document.getElementById('modalPrice').textContent = 'Rp ' + price;
    document.getElementById('usernameInput').value = '';
    orderModal.classList.add('active');

    // Update WhatsApp link dynamically
    const waLink = document.getElementById('modalWhatsApp');
    const usernameInput = document.getElementById('usernameInput');

    function updateWaLink() {
        const username = usernameInput.value.trim();
        const message = `Halo DawiMedia! 👋\n\nSaya mau order:\n📦 Paket: ${packageName}\n👥 ${followers}\n💰 Rp ${price}\n📱 Username: @${username || '...'}\n\nMohon diproses ya, terima kasih! 🙏`;
        waLink.href = `https://wa.me/6285695356734?text=${encodeURIComponent(message)}`;
    }

    usernameInput.addEventListener('input', updateWaLink);
    updateWaLink();
}

function closeModal() {
    orderModal.classList.remove('active');
}

orderModal.addEventListener('click', (e) => {
    if (e.target === orderModal) closeModal();
});

// ===== FAQ Toggle =====
function toggleFaq(item) {
    const isActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(faq => faq.classList.remove('active'));
    if (!isActive) item.classList.add('active');
}

// ===== Back to Top =====
window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    const colors = ['#E1306C', '#833AB4', '#405DE6', '#F77737', '#FCAF45'];

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 6 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = Math.random() * 15 + 10 + 's';
        particle.style.animationDelay = Math.random() * 10 + 's';
        container.appendChild(particle);
    }
}

createParticles();

// ===== Live Activity Feed =====
const liveActivities = [
    { name: 'Andi', action: 'membeli paket Popular IG', time: '2 menit lalu' },
    { name: 'Sinta', action: 'membeli paket Ultimate TT', time: '5 menit lalu' },
    { name: 'Reza', action: 'membeli paket Basic IG', time: '8 menit lalu' },
    { name: 'Dina', action: 'membeli paket Premium IG', time: '12 menit lalu' },
    { name: 'Farel', action: 'membeli paket Starter TT', time: '15 menit lalu' },
    { name: 'Luna', action: 'membeli paket Business IG', time: '18 menit lalu' },
    { name: 'Bayu', action: 'membeli paket Popular TT', time: '22 menit lalu' },
    { name: 'Citra', action: 'membeli paket Ultimate IG', time: '25 menit lalu' },
    { name: 'Hadi', action: 'membeli paket Basic TT', time: '30 menit lalu' },
    { name: 'Putri', action: 'membeli paket Premium TT', time: '33 menit lalu' },
];

function renderLiveActivity() {
    liveFeed.innerHTML = '';
    const shuffled = liveActivities.sort(() => 0.5 - Math.random()).slice(0, 4);
    shuffled.forEach((activity, index) => {
        const initials = activity.name.split(' ').map(n => n[0]).join('').toUpperCase();
        const item = document.createElement('div');
        item.classList.add('live-item');
        item.style.animationDelay = (index * 0.1) + 's';
        item.innerHTML = `
            <div class="live-avatar">${initials}</div>
            <div class="live-text"><strong>${activity.name}</strong> ${activity.action}</div>
            <span class="live-time">${activity.time}</span>
        `;
        liveFeed.appendChild(item);
    });
}

renderLiveActivity();
setInterval(renderLiveActivity, 8000);

// ===== Testimonial Dots =====
function initTestiDots() {
    const cards = document.querySelectorAll('.testimonial-card');
    testiDots.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('testi-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            const card = cards[index];
            testimonialSlider.scrollTo({
                left: card.offsetLeft - testimonialSlider.offsetLeft - 20,
                behavior: 'smooth'
            });
        });
        testiDots.appendChild(dot);
    });

    testimonialSlider.addEventListener('scroll', () => {
        const scrollPos = testimonialSlider.scrollLeft;
        const cardWidth = cards[0].offsetWidth + 12;
        const activeIndex = Math.round(scrollPos / cardWidth);
        document.querySelectorAll('.testi-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === activeIndex);
        });
    });
}

initTestiDots();

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link) {
            if (scrollY >= top && scrollY < top + height) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
});

// ===== Smooth Reveal on Load =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

// ===== Keyboard: Escape to close modal =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
