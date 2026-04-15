if (!localStorage.getItem("login")) {
    window.location.href = "/login.html";
}
const API = "";

let data = [];

// Menu
function showMenu(menu) {
    document.getElementById("utama").style.display = "none";
    document.getElementById("kk").style.display = "none";
    document.getElementById("rahinan").style.display = "none";

    document.getElementById(menu).style.display = "block";
}

// Load data
function loadData() {
    fetch(API + "/warga")
        .then(res => res.json())
        .then(d => {
            data = d;
            tampilkan();
            statistik();
        });
}

// Tampilkan KK
function tampilkan() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    const grouped = {};

    data.forEach(w => {
        if (!grouped[w.no_kk]) grouped[w.no_kk] = [];
        grouped[w.no_kk].push(w);
    });

    for (let kk in grouped) {
        list.innerHTML += `<h5 class="mt-3">KK: ${kk}</h5>`;

        grouped[kk].forEach(w => {
            list.innerHTML += `
            <div class="card p-2 mb-2">
                ${w.nama} (${w.status})
                <button onclick='hapus("${w.id}")' class="btn btn-danger btn-sm float-end">Hapus</button>
            </div>`;
        });
    }
}

// Tambah
function tambah() {
    const dataBaru = {
        no_kk: document.getElementById("kk_no").value,
        nama: document.getElementById("nama").value,
        status: document.getElementById("status").value,
        jenis: document.getElementById("jenis").value,
        gender: document.getElementById("gender").value
    };

    fetch(API + "/tambah", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dataBaru)
    }).then(() => loadData());
}

// Hapus
function hapus(id) {
    fetch(API + "/hapus/" + id, { method: "DELETE" })
        .then(() => loadData());
}

// Statistik
function statistik() {
    document.getElementById("totalWarga").innerText = data.length;

    let kk = [...new Set(data.map(d => d.no_kk))];
    document.getElementById("totalKK").innerText = kk.length;

    // RESET
    let desa_l = 0, desa_p = 0;
    let tamiu_l = 0, tamiu_p = 0;
    let tamu_l = 0, tamu_p = 0;

    data.forEach(d => {
        if (d.jenis === "Krama Desa") {
            if (d.gender === "Lanang") desa_l++;
            else desa_p++;
        }

        if (d.jenis === "Krama Tamiu") {
            if (d.gender === "Lanang") tamiu_l++;
            else tamiu_p++;
        }

        if (d.jenis === "Tamiu") {
            if (d.gender === "Lanang") tamu_l++;
            else tamu_p++;
        }
    });

    document.getElementById("desa_l").innerText = desa_l;
    document.getElementById("desa_p").innerText = desa_p;

    document.getElementById("tamiu_l").innerText = tamiu_l;
    document.getElementById("tamiu_p").innerText = tamiu_p;

    document.getElementById("tamu_l").innerText = tamu_l;
    document.getElementById("tamu_p").innerText = tamu_p;
}

// Logout
function logout() {
    localStorage.removeItem("login");
    window.location.href = "/login.html";
}

// INIT
loadData();
loadRahinan();