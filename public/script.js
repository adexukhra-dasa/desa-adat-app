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

// Tampilkan data
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
                    onclick='setEdit("${w.id}", ${JSON.stringify(w.nik)}, ${JSON.stringify(w.no_kk)}, ${JSON.stringify(w.nama)}, ${JSON.stringify(w.alamat)}, ${JSON.stringify(w.banjar)}, ${JSON.stringify(w.status)}, ${JSON.stringify(w.no_hp)})'>
                    Edit
                </button>

                <button class="btn btn-danger btn-sm"
                    onclick='hapus("${w.id}")'>
                    Hapus
                </button>
            </div>
        </div>
        `;

        list.appendChild(div);
    });
}

// Pencarian
function cari() {
    const keyword = document.getElementById("search").value.toLowerCase();

    const hasil = semuaData.filter(w =>
        (w.nama || "").toLowerCase().includes(keyword) ||
        (w.nik || "").toLowerCase().includes(keyword) ||
        (w.no_kk || "").toLowerCase().includes(keyword)
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
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            editId = null;
            resetForm();
            loadData();
        });
    } else {
        fetch(API + "/tambah", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then(() => {
            resetForm();
            loadData();
        });
    }
}

// Set mode edit
function setEdit(id, nik, kk, nama, alamat, banjar, status, no_hp) {
    editId = id;

    document.getElementById("nik").value = nik || "";
    document.getElementById("kk").value = kk || "";
    document.getElementById("nama").value = nama || "";
    document.getElementById("alamat").value = alamat || "";
    document.getElementById("banjar").value = banjar || "";
    document.getElementById("status").value = status || "Tetap";
    document.getElementById("nohp").value = no_hp || "";
}

// Reset form
function resetForm() {
    document.getElementById("nik").value = "";
    document.getElementById("kk").value = "";
    document.getElementById("nama").value = "";
    document.getElementById("alamat").value = "";
    document.getElementById("banjar").value = "";
    document.getElementById("status").value = "Tetap";
    document.getElementById("nohp").value = "";
}

// Hapus
function hapus(id) {
    console.log("Hapus ID:", id);

    if (!confirm("Yakin mau hapus data ini?")) return;

    fetch(API + "/hapus/" + id, {
        method: "DELETE"
    })
    .then(res => res.text())
    .then(msg => {
        console.log(msg);
        loadData();
    })
    .catch(err => console.log("Error:", err));
}

// Logout
function logout() {
    localStorage.removeItem("login");
    window.location.href = "/login.html";
}

// Jalankan awal
loadData();