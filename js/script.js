// ==========================================
// 1. TỰ ĐỘNG NHẬN DIỆN ĐƯỜNG DẪN
// ==========================================
const isInsideHtmlFolder = window.location.pathname.includes('/html/');
const imgPrefix = isInsideHtmlFolder ? '../' : '';         
const linkPrefix = isInsideHtmlFolder ? '' : 'html/';     

// ==========================================
// 2. DANH SÁCH SẢN PHẨM PHÙ HỢP ẢNH ĐUÔI .jpg THƯỜNG
// ==========================================
const productList = [
    { id: "1", name: "iPhone 15 Pro Max", price: 29990000, image: "assets/images/dt1.jpg", desc: "Flagship cao cấp nhất của Apple với khung viền Titan.", specs: { "CPU": "A17 Pro", "RAM": "8GB", "Camera": "48MP", "Pin": "4441mAh" } },
    { id: "2", name: "Samsung Galaxy S24 Ultra", price: 27990000, image: "assets/images/dt2.jpg", desc: "Đỉnh cao Android với bút S-Pen và AI thông minh.", specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "12GB", "Camera": "200MP", "Pin": "5000mAh" } },
    { id: "3", name: "Xiaomi 14 Ultra", price: 22990000, image: "assets/images/dt3.jpg", desc: "Camera Leica đỉnh cao cho nhiếp ảnh gia.", specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "16GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "4", name: "iPhone 13", price: 14990000, image: "assets/images/dt4.jpg", desc: "Lựa chọn quốc dân, ổn định và bền bỉ.", specs: { "CPU": "A15 Bionic", "RAM": "4GB", "Camera": "12MP", "Pin": "3227mAh" } },
    { id: "5", name: "Samsung Galaxy Z Fold5", price: 32990000, image: "assets/images/dt5.jpg", desc: "Điện thoại màn hình gập cao cấp, đa nhiệm tuyệt vời.", specs: { "CPU": "Snapdragon 8 Gen 2", "RAM": "12GB", "Camera": "50MP", "Pin": "4400mAh" } },
    { id: "6", name: "OPPO Reno11 5G", price: 9990000, image: "assets/images/dt7.jpg", desc: "Thiết kế thời thượng, chụp chân dung xuất sắc.", specs: { "CPU": "Dimensity 7050", "RAM": "8GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "7", name: "Vivo V30 5G", price: 8990000, image: "assets/images/dt9.jpg", desc: "Chuyên gia selfie với thiết kế mỏng nhẹ.", specs: { "CPU": "Snapdragon 7 Gen 3", "RAM": "8GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "8", name: "Realme 12 Pro+", price: 7990000, image: "assets/images/dt10.jpg", desc: "Camera tele tiềm vọng tầm trung đầu tiên.", specs: { "CPU": "Snapdragon 7s Gen 2", "RAM": "8GB", "Camera": "64MP", "Pin": "5000mAh" } }
];

// ==========================================
// 3. HIỂN THỊ DANH SÁCH SẢN PHẨM Ở TRANG SẢN PHẨM
// ==========================================
function renderProducts() {
    const listEl = document.getElementById('product-list');
    if (!listEl) return; 
    
    listEl.innerHTML = productList.map(p => `
        <div class="col-6 col-md-4 col-lg-3 mb-4">
            <div class="card h-100 border p-2 shadow-sm bg-white rounded">
                <div class="d-flex align-items-center justify-content-center" style="height: 180px; overflow: hidden;">
                    <img src="${imgPrefix}${p.image}" class="card-img-top pt-2" style="max-height: 100%; max-width: 100%; object-fit: contain;" alt="${p.name}">
                </div>
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
// 4. HIỂN THỊ CHI TIẾT SẢN PHẨM
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
                <button class="btn btn-primary btn-lg px-4 mb-4 fw-bold" onclick="showPopupNotify('${product.id}')">Đăng ký mua</button>
                
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
// 5. HÀM POPUP THÔNG BÁO CHỈ HIỆN ALERT
// ==========================================
window.showPopupNotify = function(id) {
    const product = productList.find(p => p.id === id);
    if (product) {
        alert(`Cảm ơn bạn đã quan tâm! Hệ thống đã ghi nhận yêu cầu mua sản phẩm: ${product.name}. Chúng tôi sẽ liên hệ lại sau.`);
    }
};

// ==========================================
// 6. KHỞI CHẠY KHI TRANG LOAD XONG
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderDetail();
});