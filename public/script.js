function showMenu(menuId, el) {

    // pindah halaman (smooth)
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    setTimeout(() => {
        document.getElementById(menuId).classList.add("active");
    }, 100);

    // aktifkan menu sidebar
    document.querySelectorAll(".menu").forEach(m => {
        m.classList.remove("active");
    });

    el.classList.add("active");
}

// logout
function logout() {
    localStorage.removeItem("login");
    window.location.href = "/login.html";
}