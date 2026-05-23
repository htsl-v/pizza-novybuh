const basePrice = 199;

let selected = {
    size: { name: 'Маленька', price: -30 },
    dough: { name: 'Тонке', price: 0 },
    sauce: { name: 'Томатний', price: 0 },
    ingredients: []
};

function selectStep(type, name, price, el) {
    el.closest('.step-options').querySelectorAll('.step-option')
        .forEach(o => o.classList.remove('active'));
    el.classList.add('active');
    selected[type] = { name, price };
    updateSummary();
}

function toggleIngredient(name, price, checkbox) {
    if (checkbox.checked) {
        selected.ingredients.push({ name, price });
        checkbox.closest('.ingredient-card').classList.add('checked');
    } else {
        selected.ingredients = selected.ingredients.filter(i => i.name !== name);
        checkbox.closest('.ingredient-card').classList.remove('checked');
    }
    updateSummary();
}

function updateSummary() {
    let total = basePrice;
    total += selected.size.price;
    total += selected.dough.price;
    total += selected.ingredients.reduce((sum, i) => sum + i.price, 0);

    document.getElementById('sum-size').textContent = selected.size.name;
    document.getElementById('sum-dough').textContent = selected.dough.name;
    document.getElementById('sum-sauce').textContent = selected.sauce.name;

    let ings = selected.ingredients.map(i => i.name).join(', ');
    document.getElementById('sum-ingredients').textContent = ings || 'не обрано';
    document.getElementById('sum-price').textContent = total + ' ₴';
}

function addCustomToCart() {
    let total = basePrice + selected.size.price + selected.dough.price +
        selected.ingredients.reduce((sum, i) => sum + i.price, 0);
    let name = `Своя піца (${selected.size.name}, ${selected.dough.name}, ${selected.sauce.name})`;
    addToCart(name, total);
}