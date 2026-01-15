function renderCart() {
    const container = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    if (!container) return;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<div style="text-align:center; padding:50px;">
            <h3>Your cart is empty</h3>
            <a href="products.html" class="btn" style="display:inline-block; margin-top:20px; text-decoration:none;">Shop Now</a>
        </div>`;
        totalEl.innerText = "0";
        return;
    }

    container.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="card" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:15px; flex-wrap:wrap; text-align:left;">
                <img src="${item.image}" style="width:80px; height:80px; object-fit:contain;">
                <div style="flex:1; padding:0 20px;">
                    <h4>${item.name}</h4>
                    <p>₹${item.price} each</p>
                </div>
                <div style="display:flex; align-items:center; gap:10px;">
                    <button class="btn" onclick="updateQty(${item.id}, -1)" style="padding:5px 12px;">-</button>
                    <span>${item.quantity}</span>
                    <button class="btn" onclick="updateQty(${item.id}, 1)" style="padding:5px 12px;">+</button>
                </div>
                <p style="width:100px; text-align:right;"><strong>₹${item.price * item.quantity}</strong></p>
                <i class="fas fa-trash" onclick="removeItem(${item.id})" style="color:var(--accent); cursor:pointer; margin-left:20px;"></i>
            </div>
        `;
    }).join('');
    totalEl.innerText = total;
}

function updateQty(id, delta) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(p => p.id === id);
    item.quantity += delta;
    if (item.quantity < 1) return removeItem(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function removeItem(id) {
    let cart = JSON.parse(localStorage.getItem('cart')).filter(p => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

document.addEventListener('DOMContentLoaded', renderCart);