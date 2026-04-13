const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Database (aman untuk deploy)
const db = new sqlite3.Database(":memory:");

// Buat tabel
db.run(`
CREATE TABLE IF NOT EXISTS warga (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nik TEXT,
    no_kk TEXT,
    nama TEXT,
    alamat TEXT,
    banjar TEXT,
    status TEXT,
    no_hp TEXT
)
`);

// Tambah data
app.post("/tambah", (req, res) => {
    const { nik, no_kk, nama, alamat, banjar, status, no_hp } = req.body;

    db.run(
        "INSERT INTO warga (nik, no_kk, nama, alamat, banjar, status, no_hp) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [nik, no_kk, nama, alamat, banjar, status, no_hp],
        () => res.send("Data ditambahkan")
    );
});

// Ambil data
app.get("/warga", (req, res) => {
    db.all("SELECT * FROM warga", [], (err, rows) => {
        res.json(rows);
    });
});

// Hapus data
app.delete("/hapus/:id", (req, res) => {
    db.run("DELETE FROM warga WHERE id=?", [req.params.id], () => {
        res.send("Data dihapus");
    });
});

// Edit data
app.put("/edit/:id", (req, res) => {
    const { nik, no_kk, nama, alamat, banjar, status, no_hp } = req.body;

    db.run(
        "UPDATE warga SET nik=?, no_kk=?, nama=?, alamat=?, banjar=?, status=?, no_hp=? WHERE id=?",
        [nik, no_kk, nama, alamat, banjar, status, no_hp, req.params.id],
        () => res.send("Data diupdate")
    );
});

// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});