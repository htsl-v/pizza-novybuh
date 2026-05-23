let paymentMethod = 'cash'; // готівка за замовчуванням

// Вибір способу оплати
function selectPayment(method, el) {
    paymentMethod = method;
    document.querySelectorAll('.payment-option')
        .forEach(o => o.classList.remove('active'));
    el.classList.add('active');

    const cardFields = document.getElementById('card-fields');
    if (method === 'card') {
        cardFields.classList.remove('hidden');
        // Форматування номера картки
        document.getElementById('card-number').addEventListener('input', function() {
            let val = this.value.replace(/\D/g, '').substring(0, 16);
            this.value = val.replace(/(.{4})/g, '$1 ').trim();
        });
        // Форматування терміну дії
        document.getElementById('card-expiry').addEventListener('input', function() {
            let val = this.value.replace(/\D/g, '').substring(0, 4);
            if (val.length >= 2) val = val.substring(0,2) + '/' + val.substring(2);
            this.value = val;
        });
    } else {
        cardFields.classList.add('hidden');
    }
}

// Завантаження кошика
function loadCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🍕</div>
                <h3>Кошик порожній</h3>
                <p>Додайте піцу з нашого меню</p>
                <a href="index.html" class="btn-order"
                   style="display:inline-block;text-decoration:none;margin-top:20px">
                    Перейти до меню
                </a>
            </div>
        `;
        cartTotal.textContent = '0 ₴';
        return;
    }

    let total = 0;
    let html = '';

    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <img src="${getCartImage(item.name)}" alt="${item.name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-weight">${getCartWeight(item.name)}</div>
                    <div class="cart-item-price">${item.price} ₴</div>
                </div>
                <button class="cart-item-remove" onclick="removeItem(${index})">✕</button>
            </div>
        `;
    });

    cartItems.innerHTML = html;
    cartTotal.textContent = total + ' ₴';
    updateCartCount();
}

// Видалення товару
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    showNotification('Товар видалено');
}

// Фото для кошика
function getCartImage(name) {
    const images = {
        'Маргарита': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop',
        'Пепероні': 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200&h=200&fit=crop',
        'Чотири сири': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
        'Гавайська': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop',
        'Барбекю': 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=200&h=200&fit=crop',
        'Овочева': 'https://images.unsplash.com/photo-1540914124281-342587941389?w=200&h=200&fit=crop',
        'М\'ясна': 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=200&h=200&fit=crop',
        'Грецька': 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=200&h=200&fit=crop',
        'Діабло': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop'
    };
    const key = Object.keys(images).find(k => name.includes(k));
    return images[key] || 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop';
}

// Вага для кошика
function getCartWeight(name) {
    const weights = {
        'Маргарита': '450 г', 'Пепероні': '500 г', 'Чотири сири': '520 г',
        'Гавайська': '530 г', 'Барбекю': '550 г', 'Овочева': '480 г',
        'М\'ясна': '600 г', 'Грецька': '460 г', 'Діабло': '510 г'
    };
    const key = Object.keys(weights).find(k => name.includes(k));
    return weights[key] || '';
}

// Оформлення замовлення
function submitOrder() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (cart.length === 0) { showNotification('Кошик порожній!'); return; }
    if (!name) { showNotification('Введіть ваше імʼя!'); return; }
    if (!phone) { showNotification('Введіть номер телефону!'); return; }
    if (!address) { showNotification('Введіть адресу доставки!'); return; }

    // Валідація картки
    if (paymentMethod === 'card') {
        const cardNum = document.getElementById('card-number').value.replace(/\s/g, '');
        const expiry = document.getElementById('card-expiry').value;
        const cvv = document.getElementById('card-cvv').value;
        const cardName = document.getElementById('card-name').value.trim();

        if (cardNum.length !== 16) { showNotification('Введіть правильний номер картки!'); return; }
        if (expiry.length !== 5) { showNotification('Введіть термін дії картки!'); return; }
        if (cvv.length !== 3) { showNotification('Введіть CVV код!'); return; }
        if (!cardName) { showNotification('Введіть імʼя на картці!'); return; }
    }

    const total = cart.reduce((sum, i) => sum + i.price, 0);
    const paymentText = paymentMethod === 'cash'
        ? 'Оплата готівкою при отриманні.'
        : 'Оплата карткою — очікуйте підтвердження.';

    document.getElementById('success-msg').textContent =
        `Дякуємо, ${name}! Замовлення на ${total} ₴ прийнято. ${paymentText} Очікуйте дзвінка на ${phone}.`;

    document.getElementById('success-overlay').classList.remove('hidden');

    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

window.onload = loadCart;