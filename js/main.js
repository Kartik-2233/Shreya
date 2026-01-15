// Updated Product Database with Working Links
const products = [
    { 
        id: 1, 
        name: "Paracetamol 500mg", 
        price: 15, 
        category: "Tablets", 
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400" 
    },
    { 
        id: 2, 
        name: "Cough Relief Syrup", 
        price: 95, 
        category: "Syrups", 
        image: "https://media.istockphoto.com/id/176860216/photo/cough-syrup-being-poured-on-a-spoon.webp?a=1&b=1&s=612x612&w=0&k=20&c=adar1u0xv7GPAe4nfqz_ePS101NoGZEl20gr08DaeP8="
    },
    { 
        id: 3, 
        name: "Digital BP Monitor", 
        price: 1250, 
        category: "Medical Devices", 
        image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400" 
    },
    { 
        id: 4, 
        name: "Multivitamin Tablets", 
        price: 450, 
        category: "Personal Care", 
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=400" 
    },
    { 
        id: 5, 
        name: "Baby Gentle Wash", 
        price: 320, 
        category: "Baby Care", 
        image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" 
    },
    { 
        id: 6, 
        name: "Insulin Syringes (10pk)", 
        price: 180, 
        category: "Injections", 
        image: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?w=400" 
    }
];

// Loader Logic
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 800);
    }
});

// Display Products with Search & Filter
function displayProducts(filter = 'All', searchStr = '') {
    const grid = document.getElementById('product-grid');
    if (!grid) return;
    grid.innerHTML = '';
    
    let filtered = filter === 'All' ? products : products.filter(p => p.category === filter);
    
    if (searchStr) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(searchStr.toLowerCase()));
    }

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found.</p>';
        return;
    }

    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="card">
                <div onclick="openModal(${p.id})" style="cursor:pointer">
                    <img src="${p.image}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p style="color:var(--gray)">${p.category}</p>
                </div>
                <p><strong>₹${p.price}</strong></p>
                <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `;
    });
}

// Modal Logic
function openModal(id) {
    const p = products.find(prod => prod.id === id);
    const modal = document.getElementById('productModal');
    const modalBody = document.getElementById('modal-body');
    if (!modal) return;

    modalBody.innerHTML = `
        <img src="${p.image}" style="width:100%; max-height:200px; object-fit:contain;">
        <h2 style="margin:15px 0">${p.name}</h2>
        <p><strong>Category:</strong> ${p.category}</p>
        <p style="margin:10px 0">Authentic medicine sourced from verified distributors. Store in a cool, dry place.</p>
        <h3 style="color:var(--primary)">₹${p.price}</h3>
        <button class="btn" style="width:100%; margin-top:15px;" onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('productModal');
    if (modal) modal.style.display = 'none';
}

// Cart Core Functions
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if (badge) badge.innerText = count;
}

function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === id);
    const exists = cart.find(p => p.id === id);
    
    if (exists) {
        exists.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Theme Toggle
const themeBtn = document.getElementById('theme-toggle');
if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCartCount();
});