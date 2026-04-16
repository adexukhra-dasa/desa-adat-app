function showMenu(menuId, el) {

    // animasi keluar
    document.querySelectorAll(".page").forEach(p => {
        p.classList.remove("active");
    });

    setTimeout(() => {
        document.getElementById(menuId).classList.add("active");
    }, 150);

    // menu aktif
    document.querySelectorAll(".menu").forEach(m => {
        m.classList.remove("active");
    });

    el.classList.add("active");
}

// LOGOUT
function logout() {
    localStorage.removeItem("login");
    window.location.href = "/login.html";
}

// LOAD DATA DASHBOARD
function loadDashboard() {
    fetch("/warga")
        .then(res => res.json())
        .then(data => {

            document.getElementById("krama").innerText = data.length;

            const kk = new Set(data.map(d => d.no_kk));
            document.getElementById("kk").innerText = kk.size;

            document.getElementById("adat").innerText =
                data.filter(d => d.jenis === "Krama Desa Adat").length;

            document.getElementById("tamiu").innerText =
                data.filter(d => d.jenis === "Tamiu").length;
        });
}

loadDashboard();