const API = "";
let data = [];

// NAV
function showMenu(m) {
    document.getElementById("utama").style.display = "none";
    document.getElementById("data").style.display = "none";
    document.getElementById(m).style.display = "block";
}

// LOAD
function loadData() {
    fetch(API + "/warga")
        .then(r => r.json())
        .then(d => {
            data = d;
            tampilkan();
            statistik();
            grafik();
        });
}

// TAMPIL
function tampilkan() {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(w => {
        list.innerHTML += `
        <div class="card p-2 mb-2">
            ${w.nama} (${w.no_kk})
            <button onclick="hapus(${w.id})" class="btn btn-danger btn-sm float-end">Hapus</button>
        </div>`;
    });
}

// TAMBAH
function tambah() {
    const d = {
        no_kk: kk.value,
        nama: nama.value,
        status: status.value,
        jenis: jenis.value,
        gender: gender.value
    };

    fetch(API + "/tambah", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(d)
    }).then(() => loadData());
}

// HAPUS
function hapus(id) {
    fetch(API + "/hapus/" + id, { method:"DELETE" })
        .then(() => loadData());
}

// STAT
function statistik() {
    totalWarga.innerText = data.length;

    let kk = [...new Set(data.map(d => d.no_kk))];
    totalKK.innerText = kk.length;
}

// GRAFIK
function grafik() {
    new Chart(document.getElementById("chart"), {
        type: "bar",
        data: {
            labels: ["Krama Desa", "Krama Tamiu", "Tamiu"],
            datasets: [{
                data: [
                    data.filter(d => d.jenis==="Krama Desa").length,
                    data.filter(d => d.jenis==="Krama Tamiu").length,
                    data.filter(d => d.jenis==="Tamiu").length
                ]
            }]
        }
    });
}

// LOGIN CHECK
if (!localStorage.getItem("login")) {
    window.location.href = "/login.html";
}

loadData();