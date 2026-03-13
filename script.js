const menuItems = [
    { id: 1, name: "กะเพราเนื้อวากิวไข่ดาว", price: 165, category: "อาหารจานหลัก", image: "https://api2.krua.co/wp-content/uploads/2023/12/RT1811_Gallery_-02.jpg" },
    { id: 2, name: "ข้าวผัดสับปะรดทะเล", price: 155, category: "อาหารจานหลัก", image: "https://www.thaitastetherapy.com/wp-content/uploads/2021/09/ข้าวผัดสัปปะรด-cover2-4.jpg" },
    { id: 3, name: "สเต็กไก่สไปซี่ซอสบาร์บีคิว", price: 125, category: "อาหารจานหลัก", image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?q=80&w=400" },
    { id: 4, name: "ยำรวมมิตรทะเล", price: 119, category: "อาหารจานหลัก", image: "https://longdan.co.uk/cdn/shop/articles/spicy-mixed-seafood-salad-with-thai-food-ingredients_1200x.jpg?v=1700554699" },
    { id: 5, name: "เฟรนช์ฟรายส์", price: 65, category: "ของทานเล่น", image: "https://image.posttoday.com/media/content/2018/11/28/809833FC1C0A47E58125BB86B868D0B7.png" },
    { id: 6, name: "ไก่ทอดซอสหัวหอม", price: 110, category: "ของทานเล่น", image: "https://s.isanook.com/wo/0/ud/38/193077/3.jpg?ip/resize/w728/q80/jpg" },
    { id: 7, name: "นักเก็ตไก่กรอบ (6 ชิ้น)", price: 89, category: "ของทานเล่น", image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400" },
    { id: 8, name: "มัทฉะลาเต้", price: 85, category: "เครื่องดื่ม", image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=400" },
    { id: 9, name: "อเมริกาโน่น้ำส้มสด", price: 75, category: "เครื่องดื่ม", image: "https://s359.kapook.com/pagebuilder/8a0b71fd-95dd-448d-9bd5-d1d61248012d.jpg" },
    { id: 10, name: "ชานมไต้หวันไข่มุก", price: 55, category: "เครื่องดื่ม", image: "https://www.leelawadee.holiday/AdminControl/images/6214185-taiwan-milk-tea-with-bubble_1339-73150.jpg" },
    { id: 11, name: "บิงซูสตรอว์เบอร์รี", price: 145, category: "ของหวาน", image: "https://img.wongnai.com/p/1920x0/2022/02/14/4711172d9e1a43ea9b869b4fb1fbc10d.jpg" },
    { id: 12, name: "โทสต์เนยสดไอศกรีม", price: 125, category: "ของหวาน", image: "https://static.cdntap.com/tap-assets-prod/wp-content/uploads/sites/25/2016/05/Honey-toast-with-banana-and-vanilla-ice-cream.jpg?width=700&quality=95" }
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
                <div class="option-item"><input type="checkbox" class="extra-opt" value="กุ้ง" data-price="35" onchange="calcLivePrice()"> กุ้งสด (+40 THB)</div>
                <div class="option-item"><input type="checkbox" class="extra-opt" value="เนื้อวัว" data-price="50" onchange="calcLivePrice()"> เนื้อวัว (+50 THB)</div>
            </div>`;
    }

    if (currentItem.category === "เครื่องดื่ม") {
        html += `
            <div class="option-group">
                <label>เลือกประเภทเครื่องดื่ม</label>
                <div class="option-item"><input type="radio" name="temp" value="ร้อน" data-price="0" checked onchange="calcLivePrice()"> ร้อน (+0 THB)</div>
                <div class="option-item"><input type="radio" name="temp" value="เย็น" data-price="5" onchange="calcLivePrice()"> เย็น (+5 THB)</div>
                <div class="option-item"><input type="radio" name="temp" value="ปั่น" data-price="5" onchange="calcLivePrice()"> ปั่น (+5 THB)</div>
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
    if (spicy) details.push(`ระดับความเผ็ด: ${spicy.value}`);

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
    // ตรงนี้คือส่วนยอดรวมทั้งหมดท้ายตะกร้า 
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