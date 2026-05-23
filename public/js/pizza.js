// База даних піц
const pizzas = [
    {
        id: 1,
        name: 'Маргарита',
        img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&h=600&fit=crop',
        weight: 450, size: 30, price: 199,
        desc: 'Класична італійська піца на тонкому тісті з насиченим томатным соусом, свіжою моцарелою та ароматним базиліком.',
        ingredients: 'Томатний соус, моцарела, свіжий базилік, оливкова олія',
        allergens: 'злаки, лактоза'
    },
    {
        id: 2,
        name: 'Пепероні',
        img: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=800&h=600&fit=crop',
        weight: 500, size: 30, price: 249,
        desc: 'Пікантна піца з великою кількістю гострої ковбаси пепероні на томатному соусі з моцарелою.',
        ingredients: 'Томатний соус, моцарела, гостра ковбаса пепероні',
        allergens: 'злаки, лактоза, глютен'
    },
    {
        id: 3,
        name: 'Чотири сири',
        img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&h=600&fit=crop',
        weight: 520, size: 30, price: 279,
        desc: 'Вишукана піца з чотирма видами сиру — моцарела, пармезан, горгонзола та чеддер на вершковому соусі.',
        ingredients: 'Вершковий соус, моцарела, пармезан, горгонзола, чеддер',
        allergens: 'злаки, лактоза'
    },
    {
        id: 4,
        name: 'Гавайська',
        img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
        weight: 530, size: 30, price: 259,
        desc: 'Соковита піца з ніжним курячим філе та солодкими шматочками ананасу на томатному соусі.',
        ingredients: 'Томатний соус, моцарела, куряче філе, ананас, болгарський перець',
        allergens: 'злаки, лактоза'
    },
    {
        id: 5,
        name: 'Барбекю',
        img: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=800&h=600&fit=crop',
        weight: 550, size: 30, price: 269,
        desc: 'Ароматна піца з димним соусом барбекю, соковитим курячим філе та хрусткою червоною цибулею.',
        ingredients: 'Соус BBQ, моцарела, куряче філе, червона цибуля, корнішони',
        allergens: 'злаки, лактоза, цибуля'
    },
    {
        id: 6,
        name: 'Овочева',
        img: 'https://images.unsplash.com/photo-1540914124281-342587941389?w=800&h=600&fit=crop',
        weight: 480, size: 30, price: 229,
        desc: 'Легка та корисна піца з різноманіттям свіжих овочів. Ідеальний вибір для вегетаріанців.',
        ingredients: 'Томатний соус, моцарела, болгарський перець, гриби, оливки, руккола',
        allergens: 'злаки, лактоза'
    },
    {
        id: 7,
        name: 'М\'ясна',
        img: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=800&h=600&fit=crop',
        weight: 600, size: 30, price: 299,
        desc: 'Ситна піца для справжніх поціновувачів м\'яса. Щедра порція яловичини, бекону та шинки.',
        ingredients: 'Томатний соус, моцарела, яловичина, бекон, шинка, часник',
        allergens: 'злаки, лактоза, часник'
    },
    {
        id: 8,
        name: 'Грецька',
        img: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800&h=600&fit=crop',
        weight: 460, size: 30, price: 249,
        desc: 'Середземноморська піца з ніжною фетою, соковитими оливками та свіжою рукколою. Без м\'яса.',
        ingredients: 'Оливкова олія, моцарела, фета, оливки, томати черрі, руккола',
        allergens: 'злаки, лактоза'
    },
    {
        id: 9,
        name: 'Діабло',
        img: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&h=600&fit=crop',
        weight: 510, size: 30, price: 269,
        desc: 'Пекельно гостра піца для справжніх сміливців. Подвійна порція пепероні та халапеньйо.',
        ingredients: 'Гострий томатний соус, моцарела, пепероні, халапеньйо, часник',
        allergens: 'злаки, лактоза, часник'
    }
];

const sizes = [
    { label: 'Мала', cm: '25 см', extra: -30 },
    { label: 'Середня', cm: '30 см', extra: 0 },
    { label: 'Велика', cm: '35 см', extra: 50 }
];

let currentPizza = null;
let currentSizeIndex = 1;

// Відкрити модаль
function openModal(id) {
    const pizza = pizzas.find(p => p.id === id);
    if (!pizza) return;

    currentPizza = pizza;
    currentSizeIndex = 1;

    document.getElementById('modal-content').innerHTML = `
        <div class="modal-img">
            <img src="${pizza.img}" alt="${pizza.name}">
        </div>
        <div class="modal-info">
            <h2>${pizza.name}</h2>
            <div class="modal-meta">
                <span>${pizza.weight} г</span>
                <span>${pizza.size} см</span>
            </div>
            <p class="modal-desc">${pizza.desc}</p>
            <p class="modal-allergens"><strong>Склад:</strong> ${pizza.ingredients}</p>
            <p class="modal-allergens" style="margin-top:6px">
                <strong>Алергени:</strong> ${pizza.allergens}
            </p>

            <p class="modal-size-title" style="margin-top:20px">Оберіть розмір</p>
            <div class="modal-size-btns">
                ${sizes.map((s, i) => `
                    <button class="modal-size-btn ${i === 1 ? 'active' : ''}"
                        onclick="selectModalSize(${i})">
                        ${s.label}
                        <small>${s.cm}</small>
                    </button>
                `).join('')}
            </div>

            <div class="modal-buy">
                <div class="modal-price" id="modal-price">${pizza.price} ₴</div>
                <button class="modal-btn" onclick="addToCartFromModal()">
                    🛒 До кошика
                </button>
            </div>
        </div>
    `;

    document.getElementById('modal-overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Закрити модаль
function closeModal() {
    document.getElementById('modal-overlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Вибір розміру в модалі
function selectModalSize(index) {
    currentSizeIndex = index;
    let price = currentPizza.price + sizes[index].extra;

    document.querySelectorAll('.modal-size-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });

    document.getElementById('modal-price').textContent = price + ' ₴';
}

// Додати в кошик з модалі
function addToCartFromModal() {
    let price = currentPizza.price + sizes[currentSizeIndex].extra;
    let sizeName = sizes[currentSizeIndex].label;
    addToCart(`${currentPizza.name} (${sizeName})`, price);
    closeModal();
}

// Закрити по Escape
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});