const menuItems = [
    { id: 1, name: "Wagyu Beef Basil w/ Fried Egg", price: 165, category: "Main Course", image: "https://api2.krua.co/wp-content/uploads/2023/12/RT1811_Gallery_-02.jpg" },
    { id: 2, name: "Seafood Pineapple Fried Rice", price: 155, category: "Main Course", image: "https://www.thaitastetherapy.com/wp-content/uploads/2021/09/ข้าวผัดสัปปะรด-cover2-4.jpg" },
    { id: 3, name: "Spicy BBQ Chicken Steak", price: 125, category: "Main Course", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400" },
    { id: 4, name: "Spicy Mixed Seafood Salad", price: 119, category: "Main Course", image: "https://longdan.co.uk/cdn/shop/articles/spicy-mixed-seafood-salad-with-thai-food-ingredients_1200x.jpg?v=1700554699" },
    { id: 5, name: "French Fries", price: 65, category: "Snacks", image: "https://image.posttoday.com/media/content/2018/11/28/809833FC1C0A47E58125BB86B868D0B7.png" },
    { id: 6, name: "Onion Sauce Fried Chicken", price: 110, category: "Snacks", image: "https://s.isanook.com/wo/0/ud/38/193077/3.jpg?ip/resize/w728/q80/jpg" },
    { id: 7, name: "Crispy Chicken Nuggets (6 pcs)", price: 89, category: "Snacks", image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400" },
    { id: 8, name: "Matcha Latte", price: 85, category: "Beverages", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400" },
    { id: 9, name: "Fresh Orange Americano", price: 75, category: "Beverages", image: "https://s359.kapook.com/pagebuilder/8a0b71fd-95dd-448d-9bd5-d1d61248012d.jpg" },
    { id: 10, name: "Taiwanese Bubble Milk Tea", price: 55, category: "Beverages", image: "https://www.leelawadee.holiday/AdminControl/images/6214185-taiwan-milk-tea-with-bubble_1339-73150.jpg" },
    { id: 11, name: "Strawberry Bingsu", price: 145, category: "Desserts", image: "https://img.wongnai.com/p/1920x0/2022/02/14/4711172d9e1a43ea9b869b4fb1fbc10d.jpg" },
    { id: 12, name: "Honey Toast w/ Ice Cream", price: 125, category: "Desserts", image: "https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/25/2016/05/Honey-toast-with-banana-and-vanilla-ice-cream.jpg?width=700&quality=95" }
];

let cart = [];
let currentItem = null;

function initApp() {
    const catList = document.getElementById('category-list');
    catList.innerHTML = '';
    ["All", "Main Course", "Snacks", "Beverages", "Desserts"].forEach((cat, i) => {
        const btn = document.createElement('button');
        btn.className = `category-btn ${i === 0 ? 'active' : ''}`;
        btn.innerText = cat;
        btn.onclick = () => {
            document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderMenu(cat);
        };
        catList.appendChild(btn);
    });
    renderMenu();
}

function renderMenu(filter = "All") {
    const container = document.getElementById('food-container');
    container.innerHTML = '';
    const filtered = filter === "All" ? menuItems : menuItems.filter(i => i.category === filter);
    
    filtered.forEach(item => {
        container.innerHTML += `
            <div class="food-card" onclick="openModal(${item.id})">
                <div class="basket-icon-overlay"><i class="fas fa-shopping-cart"></i></div>
                <div class="food-img-box" style="background-image: url('${item.image}')"></div>
                <div class="food-info">
                    <h4>${item.name}</h4>
                    <span class="price">${item.price} THB</span>
                </div>
            </div>`;
    });
}

function openModal(id) {
    currentItem = menuItems.find(p => p.id === id);
    const modal = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    
    let html = `
        <div class="modal-header-img" style="background-image: url('${currentItem.image}')"></div>
        <h2 style="margin:10px 0 5px">${currentItem.name}</h2>
        <div style="display:flex; justify-content:space-between; align-items:center">
            <p class="price" style="font-size:1.4rem; color: #e63946">${currentItem.price} THB</p>
            <p id="live-total" style="font-weight:700; color:#1d3557; background:#e6394615; padding:8px 15px; border-radius:12px; font-size:1.1rem">
                Total: ${currentItem.price} THB
            </p>
        </div>
        <hr style="margin:15px 0; opacity:0.1">
    `;

    if (currentItem.category === "Main Course") {
        html += `
            <div class="option-group">
                <label>Spiciness Level</label>
                <div class="option-item"><input type="radio" name="spicy" value="Non-Spicy" checked> Non-Spicy</div>
                <div class="option-item"><input type="radio" name="spicy" value="Mild"> Mild</div>
                <div class="option-item"><input type="radio" name="spicy" value="Medium"> Medium</div>
                <div class="option-item"><input type="radio" name="spicy" value="Hot"> Hot</div>
            </div>
            <div class="option-group">
                <label>Extra Toppings</label>
                <div class="option-item"><input type="checkbox" class="extra-opt" value="Chicken" data-price="20" onchange="calcLivePrice()"> Chicken (+20 THB)</div>
                <div class="option-item"><input type="checkbox" class="extra-opt" value="Shrimp" data-price="40" onchange="calcLivePrice()"> Shrimp (+40 THB)</div>
                <div class="option-item"><input type="checkbox" class="extra-opt" value="Beef" data-price="50" onchange="calcLivePrice()"> Beef (+50 THB)</div>
            </div>`;
    }

    if (currentItem.category === "Beverages") {
        html += `
            <div class="option-group">
                <label>Drink Type</label>
                <div class="option-item"><input type="radio" name="temp" value="Hot" data-price="0" checked onchange="calcLivePrice()"> Hot (+0 THB)</div>
                <div class="option-item"><input type="radio" name="temp" value="Iced" data-price="5" onchange="calcLivePrice()"> Iced (+5 THB)</div>
                <div class="option-item"><input type="radio" name="temp" value="Frappe" data-price="10" onchange="calcLivePrice()"> Frappe (+10 THB)</div>
            </div>`;
    }

    html += `
        <div class="option-group">
            <label>Special Instructions</label>
            <textarea id="custom-note" class="custom-note" placeholder="E.g. No vegetables, extra sauce..."></textarea>
        </div>`;

    body.innerHTML = html;
    modal.style.display = 'flex';
    document.getElementById('confirm-add-btn').onclick = addToCart;
}

function calcLivePrice() {
    let extra = 0;
    const extras = document.querySelectorAll('.extra-opt:checked');
    extras.forEach(ex => extra += parseInt(ex.getAttribute('data-price')));

    const temp = document.querySelector('input[name="temp"]:checked');
    if (temp) extra += parseInt(temp.getAttribute('data-price'));

    const total = currentItem.price + extra;
    document.getElementById('live-total').innerText = `Total: ${total} THB`;
}

function addToCart() {
    let details = [];
    let extraCost = 0;

    const spicy = document.querySelector('input[name="spicy"]:checked');
    if (spicy) details.push(`Spice: ${spicy.value}`);

    const temp = document.querySelector('input[name="temp"]:checked');
    if (temp) {
        details.push(`Type: ${temp.value}`);
        extraCost += parseInt(temp.getAttribute('data-price'));
    }

    const extras = document.querySelectorAll('.extra-opt:checked');
    extras.forEach(ex => {
        details.push(ex.value);
        extraCost += parseInt(ex.getAttribute('data-price'));
    });

    const note = document.getElementById('custom-note').value.trim();
    if (note) details.push(note);

    const finalPrice = currentItem.price + extraCost;
    const detailStr = details.join(", ") || "Standard";
    const cartId = currentItem.id + detailStr;

    const existing = cart.find(c => c.cartId === cartId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...currentItem, cartId, detailStr, finalPrice, quantity: 1 });
    }

    updateUI();
    closeModal();
}

function updateUI() {
    const display = document.getElementById('cart-display');
    const totalDisplay = document.getElementById('total-price');
    const countDisplay = document.getElementById('cart-count');
    
    display.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        display.innerHTML = '<div class="empty-state">Your cart is empty</div>';
    } else {
        cart.forEach(item => {
            const subtotal = item.finalPrice * item.quantity;
            total += subtotal;
            count += item.quantity;
            
            display.innerHTML += `
                <div class="cart-item" style="border-bottom: 1px solid #eee; padding: 12px 0;">
                    <div style="display:flex; justify-content:space-between; align-items: center; font-weight:700; color:#1d3557; margin-bottom: 4px;">
                        <span style="font-size: 1.05rem;">${item.name}</span>
                        <button onclick="removeItem('${item.cartId}')" style="background:none; border:none; color:#e63946; cursor:pointer; padding: 5px;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>

                    <div class="cart-item-detail" style="font-size: 0.85rem; color: #666; margin-bottom: 8px;">
                        ${item.detailStr}
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items: center;">
                        <div class="qty-control">
                            <button class="btn-qty" onclick="changeQty('${item.cartId}', -1)">−</button>
                            <span class="qty-num">${item.quantity}</span>
                            <button class="btn-qty" onclick="changeQty('${item.cartId}', 1)">+</button>
                        </div>
                        <div style="text-align: right;">
                            <span style="font-weight:700; color:#1d3557; font-size: 1.1rem;">
                                ${subtotal.toLocaleString()} THB
                            </span>
                        </div>
                    </div>
                </div>`;
        });
    }
    totalDisplay.innerText = total.toLocaleString() + " THB";
    countDisplay.innerText = count;
}

function removeItem(cartId) {
    if(confirm("Remove this item from cart?")) {
        cart = cart.filter(c => c.cartId !== cartId);
        updateUI();
    }
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }

function changeQty(cartId, delta) {
    const item = cart.find(c => c.cartId === cartId);
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(c => c.cartId !== cartId);
    updateUI();
}

function checkout() {
    if (cart.length === 0) return alert("Please select some items first!");

    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US');
    const timeStr = now.toLocaleTimeString('en-US');

    let receipt = `🧾 --- Mellow MEAOW Receipt ---\n`;
    receipt += `📅 Date: ${dateStr} | ${timeStr}\n`;
    receipt += `------------------------------------\n\n`;
    
    let total = 0;
    cart.forEach((item, index) => {
        const subtotal = item.finalPrice * item.quantity;
        receipt += `${index + 1}. ${item.name} x${item.quantity}\n`;
        receipt += `   Details: ${item.detailStr}\n`;
        receipt += `   Price: ${subtotal.toLocaleString()} THB\n\n`;
        total += subtotal;
    });

    receipt += `------------------------------------\n`;
    receipt += `💰 Total Amount: ${total.toLocaleString()} THB\n\n`;
    receipt += `🙏 Thank you for choosing Mellow MEAOW!`;

    alert(receipt);

    cart = []; 
    updateUI();
}

initApp();