const menuItems = [
    { id: 1, name: "กะเพราเนื้อวากิวไข่ดอง", price: 165, category: "อาหารจานหลัก", image: "https://images.unsplash.com/photo-1562607378-274092b322a3?q=80&w=400" },
    { id: 2, name: "ข้าวผัดสับปะรดทะเล", price: 145, category: "อาหารจานหลัก", image: "https://images.unsplash.com/photo-1512058560366-cd242d45869e?q=80&w=400" },
    { id: 3, name: "สเต็กไก่สไปซี่ซอสบาร์บีคิว", price: 185, category: "อาหารจานหลัก", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400" },
    { id: 4, name: "พาสต้าคาร์โบนาร่า", price: 195, category: "อาหารจานหลัก", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=400" },
    { id: 5, name: "เฟรนช์ฟรายส์ทรูเฟิลชีส", price: 95, category: "ของทานเล่น", image: "https://images.unsplash.com/photo-1630384066242-17a17833f347?q=80&w=400" },
    { id: 6, name: "ปีกไก่ทอดเกลือซอสหัวหอม", price: 110, category: "ของทานเล่น", image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=400" },
    { id: 7, name: "นักเก็ตไก่กรอบ (10 ชิ้น)", price: 85, category: "ของทานเล่น", image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400" },
    { id: 8, name: "มัทฉะลาเต้เย็น", price: 75, category: "เครื่องดื่ม", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400" },
    { id: 9, name: "อเมริกาโน่น้ำส้มสด", price: 85, category: "เครื่องดื่ม", image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400" },
    { id: 10, name: "ชานมไต้หวันไข่มุก", price: 65, category: "เครื่องดื่ม", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400" },
    { id: 11, name: "บิงซูสตรอว์เบอร์รีชีสเค้ก", price: 145, category: "ของหวาน", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=400" },
    { id: 12, name: "โทสต์เนยสดไอศกรีม", price: 125, category: "ของหวาน", image: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?q=80&w=400" }
];

let cart = [];
let currentItem = null;

function initApp() {
    const catList = document.getElementById('category-list');
    catList.innerHTML = '';
    ["ทั้งหมด", "อาหารจานหลัก", "ของทานเล่น", "เครื่องดื่ม", "ของหวาน"].forEach((cat, i) => {
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

function renderMenu(filter = "ทั้งหมด") {
    const container = document.getElementById('food-container');
    container.innerHTML = '';
    const filtered = filter === "ทั้งหมด" ? menuItems : menuItems.filter(i => i.category === filter);
    
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
                ราคารวม: ${currentItem.price} THB
            </p>
        </div>
        <hr style="margin:15px 0; opacity:0.1">
    `;

    if (currentItem.category === "อาหารจานหลัก") {
        html += `
            <div class="option-group">
                <label>เลือกระดับความเผ็ด</label>
                <div class="option-item"><input type="radio" name="spicy" value="ไม่เผ็ด" checked> ไม่เผ็ด</div>
                <div class="option-item"><input type="radio" name="spicy" value="เผ็ดน้อย"> เว็ดน้อย</div>
                <div class="option-item"><input type="radio" name="spicy" value="เผ็ดปกติ"> เผ็ดปกติ</div>
                <div class="option-item"><input type="radio" name="spicy" value="เผ็ดมาก"> เผ็ดมาก</div>
            </div>
            <div class="option-group">
                <label>เลือกเนื้อสัตว์เพิ่มเติม</label>
                <div class="option-item"><input type="checkbox" class="extra-opt" value="เนื้อไก่" data-price="20" onchange="calcLivePrice()"> เนื้อไก่ (+20 THB)</div>
                <div class="option-item"><input type="checkbox" class="extra-opt" value="กุ้ง" data-price="40" onchange="calcLivePrice()"> กุ้งสด (+40 THB)</div>
                <div class="option-item"><input type="checkbox" class="extra-opt" value="เนื้อวัว" data-price="50" onchange="calcLivePrice()"> เนื้อวัว (+50 THB)</div>
            </div>`;
    }

    if (currentItem.category === "เครื่องดื่ม") {
        html += `
            <div class="option-group">
                <label>เลือกประเภทเครื่องดื่ม</label>
                <div class="option-item"><input type="radio" name="temp" value="ร้อน" data-price="0" checked onchange="calcLivePrice()"> ร้อน (+0 THB)</div>
                <div class="option-item"><input type="radio" name="temp" value="เย็น" data-price="5" onchange="calcLivePrice()"> เย็น (+5 THB)</div>
            </div>`;
    }

    html += `
        <div class="option-group">
            <label>รายละเอียดเพิ่มเติม</label>
            <textarea id="custom-note" class="custom-note" placeholder="ระบุรายละเอียดเพิ่มเติมได้ที่นี่..."></textarea>
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
    document.getElementById('live-total').innerText = `ราคารวม: ${total} THB`;
}

function addToCart() {
    let details = [];
    let extraCost = 0;

    const spicy = document.querySelector('input[name="spicy"]:checked');
    if (spicy) details.push(`เผ็ด: ${spicy.value}`);

    const temp = document.querySelector('input[name="temp"]:checked');
    if (temp) {
        details.push(`ประเภท: ${temp.value}`);
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
    const detailStr = details.join(", ") || "รสชาติปกติ";
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
        display.innerHTML = '<div class="empty-state">ตะกร้าว่างเปล่า</div>';
    } else {
        cart.forEach(item => {
            const subtotal = item.finalPrice * item.quantity;
            total += subtotal;
            count += item.quantity;
            display.innerHTML += `
                <div class="cart-item">
                    <div style="display:flex; justify-content:space-between; font-weight:700; color:#1d3557">
                        <span>${item.name}</span>
                        <span>${subtotal} THB</span>
                    </div>
                    <div class="cart-item-detail">${item.detailStr}</div>
                    <div class="qty-control">
                        <button class="btn-qty" onclick="changeQty('${item.cartId}', -1)">−</button>
                        <span class="qty-num">${item.quantity}</span>
                        <button class="btn-qty" onclick="changeQty('${item.cartId}', 1)">+</button>
                    </div>
                </div>`;
        });
    }
    // ตรงนี้คือส่วนยอดรวมทั้งหมดท้ายตะกร้า แก้เป็น THB แล้วครับ
    totalDisplay.innerText = total.toLocaleString() + " THB";
    countDisplay.innerText = count;
}

function closeModal() { document.getElementById('modal-overlay').style.display = 'none'; }
function changeQty(cartId, delta) {
    const item = cart.find(c => c.cartId === cartId);
    item.quantity += delta;
    if (item.quantity <= 0) cart = cart.filter(c => c.cartId !== cartId);
    updateUI();
}
function checkout() {
    if (cart.length === 0) return alert("เลือกอาหารก่อนสั่งซื้อนะคะ!!");
    alert("ยืนยันออเดอร์สำเร็จ!");
    cart = []; updateUI();
}

initApp();