var trongThuMucHtml = window.location.pathname.includes('/html/');
var duongDanAnh = trongThuMucHtml ? '../' : '';
var duongDanLienKet = trongThuMucHtml ? '' : 'html/';
var danhSachSanPham = [
    { id: "1", name: "iPhone 15 Pro Max", price: 29990000, image: "assets/images/dt1.jpg", desc: "Flagship cao cấp nhất của Apple với khung viền Titan.", specs: { "CPU": "A17 Pro", "RAM": "8GB", "Camera": "48MP", "Pin": "4441mAh" } },
    { id: "2", name: "Samsung Galaxy S24 Ultra", price: 27990000, image: "assets/images/dt2.jpg", desc: "Đỉnh cao Android với bút S-Pen và AI thông minh.", specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "12GB", "Camera": "200MP", "Pin": "5000mAh" } },
    { id: "3", name: "Xiaomi 14 Ultra", price: 22990000, image: "assets/images/dt3.jpg", desc: "Camera Leica đỉnh cao cho nhiếp ảnh gia.", specs: { "CPU": "Snapdragon 8 Gen 3", "RAM": "16GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "4", name: "iPhone 13", price: 14990000, image: "assets/images/dt4.jpg", desc: "Lựa chọn quốc dân, ổn định và bền bỉ.", specs: { "CPU": "A15 Bionic", "RAM": "4GB", "Camera": "12MP", "Pin": "3227mAh" } },
    { id: "5", name: "Samsung Galaxy Z Fold5", price: 32990000, image: "assets/images/dt5.jpg", desc: "Điện thoại màn hình gập cao cấp, đa nhiệm tuyệt vời.", specs: { "CPU": "Snapdragon 8 Gen 2", "RAM": "12GB", "Camera": "50MP", "Pin": "4400mAh" } },
    { id: "6", name: "OPPO Reno11 5G", price: 9990000, image: "assets/images/dt7.jpg", desc: "Thiết kế thời thượng, chụp chân dung xuất sắc.", specs: { "CPU": "Dimensity 7050", "RAM": "8GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "7", name: "Vivo V30 5G", price: 8990000, image: "assets/images/dt9.jpg", desc: "Chuyên gia selfie với thiết kế mỏng nhẹ.", specs: { "CPU": "Snapdragon 7 Gen 3", "RAM": "8GB", "Camera": "50MP", "Pin": "5000mAh" } },
    { id: "8", name: "Realme 12 Pro+", price: 7990000, image: "assets/images/dt10.jpg", desc: "Camera tele tiềm vọng tầm trung đầu tiên.", specs: { "CPU": "Snapdragon 7s Gen 2", "RAM": "8GB", "Camera": "64MP", "Pin": "5000mAh" } }
];
function hienThiSanPham() {
    var phanDanhSach = document.getElementById('product-list');
    if (!phanDanhSach) return;
    var html = '';
    for (var i = 0; i < danhSachSanPham.length; i++) {
        var sanPham = danhSachSanPham[i];
        html += '\n        <div class="col-6 col-md-4 col-lg-3 mb-4">\n            <div class="card h-100 border p-2 shadow-sm bg-white rounded">\n                <div class="hinh-san-pham d-flex align-items-center justify-content-center">\n                    <img src="' + duongDanAnh + sanPham.image + '" class="card-img-top pt-2 anh-san-pham" alt="' + sanPham.name + '">\n                </div>\n                <div class="card-body d-flex flex-column p-2">\n                    <h5 class="fs-6 fw-bold text-dark text-truncate" title="' + sanPham.name + '">' + sanPham.name + '</h5>\n                    <p class="text-danger fw-bold mb-3 small">' + sanPham.price.toLocaleString('vi-VN') + 'đ</p>\n                    <a href="' + duongDanLienKet + 'chi-tiet.html?id=' + sanPham.id + '" class="btn btn-outline-primary btn-sm w-100 mt-auto">Chi tiết</a>\n                </div>\n            </div>\n        </div>';
    }
    phanDanhSach.innerHTML = html;
}
function hienThiChiTiet() {
    var phanChiTiet = document.getElementById('product-detail');
    if (!phanChiTiet) return;
    var urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    var sanPham = null;
    for (var i = 0; i < danhSachSanPham.length; i++) {
        if (danhSachSanPham[i].id === id) {
            sanPham = danhSachSanPham[i];
            break;
        }
    }
    if (!sanPham) return;
    var hangThongSo = '';
    var keys = Object.keys(sanPham.specs);
    for (var j = 0; j < keys.length; j++) {
        var key = keys[j];
        var value = sanPham.specs[key];
        hangThongSo += '\n            <tr>\n                <th class="bg-light khoa-thong-so">' + key + '</th>\n                <td>' + value + '</td>\n            </tr>';
    }
    phanChiTiet.innerHTML = '\n            <div class="col-md-6 mb-4 text-center">\n                <img src="' + duongDanAnh + sanPham.image + '" class="img-fluid rounded border p-3 bg-white shadow-sm anh-chi-tiet" alt="' + sanPham.name + '">\n            </div>\n            <div class="col-md-6">\n                <h1 class="fw-bold h2 text-dark">' + sanPham.name + '</h1>\n                <h3 class="text-danger my-3 fw-bold">' + sanPham.price.toLocaleString('vi-VN') + 'đ</h3>\n                <p class="text-muted mo-ta-san-pham">' + sanPham.desc + '</p>\n                <button class="btn btn-primary btn-lg px-4 mb-4 fw-bold" onclick="hienThongBao(\'' + sanPham.id + '\')">Đăng ký mua</button>\n                <h5 class="mt-2 fw-bold">Thông số kỹ thuật</h5>\n                <table class="table table-bordered mt-2">\n                    <tbody>' + hangThongSo + '</tbody>\n                </table>\n            </div>';
}
function hienThongBao(id) {
    var sanPham = null;
    for (var i = 0; i < danhSachSanPham.length; i++) {
        if (danhSachSanPham[i].id === id) {
            sanPham = danhSachSanPham[i];
            break;
        }
    }
    if (sanPham) {
        alert('Cảm ơn bạn đã quan tâm! Hệ thống đã ghi nhận yêu cầu mua sản phẩm: ' + sanPham.name + '. Chúng tôi sẽ liên hệ lại sau.');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    hienThiSanPham();
    hienThiChiTiet();
});