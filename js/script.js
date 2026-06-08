// ==========================================
// 1. TỰ ĐỘNG NHẬN DIỆN ĐƯỜNG DẪN (FIX LỖI INDEX)
// ==========================================
const isInsideHtmlFolder = window.location.pathname.includes('/html/');
const imgPrefix = isInsideHtmlFolder ? '../' : '';         
const linkPrefix = isInsideHtmlFolder ? '' : 'html/';     

let cart = [];

// ==========================================
// 2. DỮ LIỆU SẢN PHẨM
// ==========================================
const productList = [
    { id: "1", name: "iPhone 15 Pro Max", price: 29990000, image: "assets/images/dt1.jpg", desc: "Flagship cao cấp nhất của Apple với khung viền Titan.", specs: { "CPU": "A17 Pro", "RAM": "8GB", "Camera": "48MP", "Pin": "4422mAh" } },
    { id: "2", name: "Samsung Galaxy S24 Ultra", price: 27990000, image: "assets/images/dt2.jpg", desc: "Đỉnh cao Android với bút S-Pen và AI thông minh.", specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "12GB", "Camera": "200MP", "Pin": "5000mAh" } },
    { id: "3", name: "Xiaomi 14 Ultra", price: 22990000, image: "assets/images/dt3.jpg", desc: "Camera Leica đỉnh cao cho nhiếp ảnh gia.", specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "16GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "4", name: "iPhone 13", price: 14990000, image: "assets/images/dt4.jpg", desc: "Lựa chọn quốc dân, ổn định và bền bỉ.", specs: { "CPU": "A15 Bionic", "RAM": "4GB", "Camera": "12MP", "Pin": "3227mAh" } },
    { id: "5", name: "Samsung Galaxy Z Fold5", price: 32990000, image: "assets/images/dt5.jpg", desc: "Điện thoại màn hình gập cao cấp, đa nhiệm tuyệt vời.", specs: { "CPU": "Snapdragon 8 Gen 2", "RAM": "12GB", "Camera": "50MP", "Pin": "4400mAh" } },
    { id: "6", name: "OPPO Reno11 5G", price: 9990000, image: "assets/images/dt7.jpg", desc: "Thiết kế thời thượng, chụp chân dung xuất sắc.", specs: { "CPU": "Dimensity 7050", "RAM": "8GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "7", name: "Vivo V30 5G", price: 8990000, image: "assets/images/dt9.jpg", desc: "Chuyên gia selfie với thiết kế mỏng nhẹ.", specs: { "CPU": "Snapdragon 7 Gen 3", "RAM": "8GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "8", name: "Realme 12 Pro+", price: 7990000, image: "assets/images/dt10.jpg", desc: "Camera tele tiềm vọng tầm trung đầu tiên.", specs: { "CPU": "Snapdragon 7s Gen 2", "RAM": "8GB", "Camera": "64MP", "Pin": "5000mAh" } }
];

// ==========================================
// 3. HÀM CẬP NHẬT GIAO DIỆN GIỎ HÀNG
// ==========================================
function updateCartUI() {
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = cart.length;
    }
}

// ==========================================
// 4. HIỂN THỊ DANH SÁCH SẢN PHẨM
// ==========================================
function renderProducts() {
    const listEl = document.getElementById('product-list');
    if (!listEl) return;
    
    listEl.innerHTML = productList.map(p => `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 border p-2 shadow-sm bg-white rounded">
                <img src="${imgPrefix}${p.image}" class="card-img-top pt-2" style="height: 160px; object-fit: contain;" alt="${p.name}">
                <div class="card-body d-flex flex-column p-2">
                    <h5 class="fs-6 fw-bold text-dark text-truncate" title="${p.name}">${p.name}</h5>
                    <p class="text-danger fw-bold mb-3 small">${p.price.toLocaleString('vi-VN')}đ</p>
                    <a href="${linkPrefix}chi-tiet.html?id=${p.id}" class="btn btn-outline-primary btn-sm w-100 mt-auto">Chi tiết</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ==========================================
// 5. HIỂN THỊ CHI TIẾT SẢN PHẨM (Ảnh to tỉ lệ 6:6 cân đối)
// ==========================================
window.renderDetail = function() {
    const detailEl = document.getElementById('product-detail');
    if (!detailEl) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const product = productList.find(p => p.id === urlParams.get('id'));

    if (product) {
        let specsRows = Object.entries(product.specs).map(([key, value]) => `
            <tr>
                <th class="bg-light" style="width: 40%;">${key}</th>
                <td>${value}</td>
            </tr>
        `).join('');

        detailEl.innerHTML = `
            <div class="col-md-6 mb-4 text-center">
                <img src="${imgPrefix}${product.image}" class="img-fluid rounded border p-3 bg-white shadow-sm" style="max-height: 450px; object-fit: contain; width: 100%;" alt="${product.name}">
            </div>
            <div class="col-md-6">
                <h1 class="fw-bold h2 text-dark">${product.name}</h1>
                <h3 class="text-danger my-3 fw-bold">${product.price.toLocaleString('vi-VN')}đ</h3>
                <p class="text-muted" style="line-height: 1.6;">${product.desc}</p>
                <button class="btn btn-primary btn-lg px-4 mb-4 fw-bold" onclick="addToCart('${product.id}')">Mua ngay</button>
                
                <h5 class="mt-2 fw-bold">Thông số kỹ thuật</h5>
                <table class="table table-bordered mt-2">
                    <tbody>
                        ${specsRows}
                    </tbody>
                </table>
            </div>
        `;
    }
};

// ==========================================
// 6. HIỂN THỊ GIỎ HÀNG
// ==========================================
window.renderCart = function() {
    const cartEl = document.getElementById('cart-content');
    if (!cartEl) return;
    
    if (cart.length === 0) {
        cartEl.innerHTML = `<h5 class="text-muted text-center my-4">Giỏ hàng của bạn đang trống</h5>`;
        return;
    }
    
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    cartEl.innerHTML = `
        <div class="table-responsive bg-white p-3 border rounded shadow-sm">
            <table class="table align-middle">
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Giá tiền</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart.map((item, index) => `
                        <tr>
                            <td class="fw-bold">${item.name}</td>
                            <td class="text-danger fw-bold">${item.price.toLocaleString('vi-VN')}đ</td>
                            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Xóa</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <div class="d-flex justify-content-between align-items-center flex-wrap mt-4">
                <h4 class="fw-bold mb-3 mb-sm-0">Tổng cộng: <span class="text-danger">${total.toLocaleString('vi-VN')}đ</span></h4>
                <button id="btn-checkout" class="btn btn-success px-4" onclick="showPaymentMethods()">Tiến hành thanh toán</button>
            </div>
            
            <div id="payment-methods" class="mt-4 border-top pt-4" style="display: none;">
                <h5 class="fw-bold mb-3">Chọn phương thức thanh toán:</h5>
                <div class="d-flex gap-2 flex-wrap">
                    <button class="btn btn-primary" onclick="confirmOrder('COD')">Giao hàng trực tiếp (COD)</button>
                    <button class="btn btn-warning text-dark fw-bold" onclick="confirmOrder('QR')">Quét mã QR</button>
                </div>
            </div>
        </div>
    `;
};

// ==========================================
// 7. CÁC HÀM XỬ LÝ SỰ KIỆN (Bấm mua nhảy thẳng sang giỏ hàng)
// ==========================================
window.addToCart = function(id) {
    const product = productList.find(p => p.id === id);
    if (product) {
        cart.push(product);
        updateCartUI();
        
        // Chuyển hướng thẳng dựa theo vị trí trang hiện tại
        if (isInsideHtmlFolder) {
            window.location.href = "gio-hang.html";
        } else {
            window.location.href = "html/gio-hang.html";
        }
    }
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    updateCartUI();
    renderCart();
};

window.showPaymentMethods = function() {
    document.getElementById('btn-checkout').style.display = 'none';
    document.getElementById('payment-methods').style.display = 'block';
};

window.confirmOrder = function(method) {
    if (method === 'QR') {
        const paymentContainer = document.getElementById('payment-methods');
        paymentContainer.innerHTML = `
            <div class="text-center mt-3 p-3 border rounded bg-light">
                <h5 class="fw-bold text-dark">Vui lòng quét mã QR để thanh toán:</h5>
                <img src="${imgPrefix}assets/images/qr.jpg" alt="Mã QR" class="my-3 img-fluid" style="max-width: 220px; border: 1px solid #ccc; border-radius: 8px;">
                <p class="mb-0 text-muted small">Số tiền cần thanh toán sẽ hiển thị trên ứng dụng ngân hàng của bạn.</p>
            </div>
        `;
    } else {
        alert("Đặt hàng thành công bằng COD! Chúng tôi sẽ liên hệ với bạn sớm nhất.");
        cart = [];
        updateCartUI();
        renderCart();
    }
};

// ==========================================
// 8. KHỞI CHẠY KHI TRANG LOAD XONG
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    updateCartUI();
    renderProducts();
    renderDetail();
    renderCart();
});