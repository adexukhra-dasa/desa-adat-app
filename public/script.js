const API = "";
let semuaData = [];
let editId = null;

// Load data
function loadData() {
    fetch(API + "/warga")
        .then(res => res.json())
        .then(data => {
            semuaData = data;
            tampilkan(data);
        });
}
function tampilkan(data) {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(w => {
        let div = document.createElement("div");
        div.className = "col-md-4";

        div.innerHTML = `
        <div class="card mb-3 shadow-sm">
            <div class="card-body">
                <h5 class="card-title">${w.nama}</h5>
                <p class="card-text">
                    <b>NIK:</b> ${w.nik}<br>
                    <b>KK:</b> ${w.no_kk}<br>
                    <b>Banjar:</b> ${w.banjar}<br>
                    <b>Status:</b> ${w.status}<br>
                    <b>HP:</b> ${w.no_hp}
                </p>

                <button class="btn btn-warning btn-sm"
                    onclick="setEdit(${w.id}, '${w.nik}', '${w.no_kk}', '${w.nama}', '${w.alamat}', '${w.banjar}', '${w.status}', '${w.no_hp}')">
                    Edit
                </button>

                <button class="btn btn-danger btn-sm"
                    onclick="hapus(${w.id})">
                    Hapus
                </button>
            </div>
        </div>
        `;

        list.appendChild(div);
    });
}
function cari() {
    const keyword = document.getElementById("search").value.toLowerCase();

    const hasil = semuaData.filter(w =>
        w.nama.toLowerCase().includes(keyword) ||
        w.nik.toLowerCase().includes(keyword) ||
        w.no_kk.toLowerCase().includes(keyword)
    );

    tampilkan(hasil);
}
// Tambah / Edit
function tambah() {
    const data = {
        nik: document.getElementById("nik").value,
        no_kk: document.getElementById("kk").value,
        nama: document.getElementById("nama").value,
        alamat: document.getElementById("alamat").value,
        banjar: document.getElementById("banjar").value,
        status: document.getElementById("status").value,
        no_hp: document.getElementById("nohp").value
    };

    if (editId) {
        fetch(API + "/edit/" + editId, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(() => {
            editId = null;
            loadData();
        });
    } else {
        fetch(API + "/tambah", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        }).then(() => loadData());
    }
}

// Set mode edit
function setEdit(id, nik, kk, nama, alamat, banjar, status, no_hp) {
    editId = id;

    document.getElementById("nik").value = nik;
    document.getElementById("kk").value = kk;
    document.getElementById("nama").value = nama;
    document.getElementById("alamat").value = alamat;
    document.getElementById("banjar").value = banjar;
    document.getElementById("status").value = status;
    document.getElementById("nohp").value = no_hp;
}

// Hapus
function hapus(id) {
    fetch(API + "/hapus/" + id, { method: "DELETE" })
        .then(() => loadData());
}

loadData();
function logout() {
    localStorage.removeItem("login");
    window.location.href = "/login.html";
}