// ฟังก์ชันตรวจสอบการเข้าสู่ระบบ
function login() {
    // รับค่าจากช่องกรอกข้อมูล
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
    if (username === "" || password === "") {
        alert("กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน!");
    } else {
        alert("เข้าสู่ระบบสำเร็จ!");
        // สามารถเปลี่

    }
}
function goHome() {
    window.location.href = "home.html";
}
function goFavorites() {
    window.location.href = "favorites.html"; // เปลี่ยนเป็นหน้าที่ต้องการ
}
function goHistory() {
    window.location.href = "History.html"; // เปลี่ยนเป็นหน้าที่ต้องการ
}

