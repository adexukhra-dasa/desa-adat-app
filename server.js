const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const db = new sqlite3.Database("./database.db");

// CREATE TABLE
db.run(`
CREATE TABLE IF NOT EXISTS warga (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    no_kk TEXT,
    nama TEXT,
    status TEXT,
    jenis TEXT,
    gender TEXT
)
`);

// TAMBAH
app.post("/tambah", (req, res) => {
    const { no_kk, nama, status, jenis, gender } = req.body;

    db.run(
        "INSERT INTO warga (no_kk, nama, status, jenis, gender) VALUES (?, ?, ?, ?, ?)",
        [no_kk, nama, status, jenis, gender],
        () => res.send("OK")
    );
});

// AMBIL
app.get("/warga", (req, res) => {
    db.all("SELECT * FROM warga", [], (err, rows) => {
        res.json(rows);
    });
});

// HAPUS
app.delete("/hapus/:id", (req, res) => {
    db.run("DELETE FROM warga WHERE id=?", [req.params.id], () => {
        res.send("OK");
    });
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});