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
        status: document.getElementById("status").value
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
}

// RAHINAN OTOMATIS (DASAR)
function loadRahinan() {
    const rahinan = [
        "Purnama",
        "Tilem",
        "Kajeng Kliwon",
        "Tumpek Landep",
        "Tumpek Uye",
        "Galungan",
        "Kuningan"
    ];

    const list = document.getElementById("rahinanList");

    rahinan.forEach(r => {
        list.innerHTML += `<li class="list-group-item">${r}</li>`;
    });
}

// Logout
function logout() {
    localStorage.removeItem("login");
    window.location.href = "/login.html";
}

// INIT
loadData();
loadRahinan();