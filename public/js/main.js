// Кошик
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Додати в кошик
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('🍕 ' + name + ' додано до кошика!');
}

// Оновити лічильник
function updateCartCount() {
    let counters = document.querySelectorAll('#cart-count');
    counters.forEach(function(el) { el.textContent = cart.length; });
}

// Фільтрація піц
function filterPizza(category, btn) {
    let cards = document.querySelectorAll('.card');
    let buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    cards.forEach(function(card) {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Сповіщення
function showNotification(message) {
    // Видаляємо старе якщо є
    let old = document.querySelector('.notification');
    if (old) old.remove();

    let notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    document.body.appendChild(notif);

    setTimeout(function() { notif.classList.add('show'); }, 50);
    setTimeout(function() {
        notif.classList.remove('show');
        setTimeout(function() { notif.remove(); }, 400);
    }, 3000);
}

// Анімований фон
function startFoodAnimation() {
    const canvas = document.getElementById('food-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const sources = [
        'img/tomato.png',
        'img/cheese.png',
        'img/mushroom.png',
        'img/olive.png',
        'img/basil.png',
        'img/pepper.png'
    ];

    const images = [];
    let loaded = 0;

    sources.forEach(function(src) {
        const img = new Image();
        img.onload = function() {
            loaded++;
            if (loaded === sources.length) startAnimation();
        };
        img.onerror = function() {
            loaded++;
            if (loaded === sources.length) startAnimation();
        };
        img.src = src;
        images.push(img);
    });

    function startAnimation() {
        const particles = [];

        for (let i = 0; i < 40; i++) {
            const img = images[Math.floor(Math.random() * images.length)];
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 45 + 25,
                speed: Math.random() * 0.6 + 0.2,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 0.8,
                sway: Math.random() * 0.6 + 0.1,
                swayOffset: Math.random() * Math.PI * 2,
                img: img,
                opacity: Math.random() * 0.55 + 0.3
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(function(p) {
                ctx.save();
                ctx.globalAlpha = p.opacity;
                ctx.translate(p.x, p.y);
                ctx.rotate(p.rotation * Math.PI / 180);
                ctx.drawImage(p.img, -p.size/2, -p.size/2, p.size, p.size);
                ctx.restore();

                p.y += p.speed;
                p.rotation += p.rotationSpeed;
                p.x += Math.sin(p.y * 0.02 + p.swayOffset) * p.sway;

                if (p.y > canvas.height + 60) {
                    p.y = -60;
                    p.x = Math.random() * canvas.width;
                    p.opacity = Math.random() * 0.55 + 0.3;
                }
            });

            requestAnimationFrame(animate);
        }

        animate();
    }
}

updateCartCount();
startFoodAnimation();