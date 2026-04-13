const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Database sementara (array)
let warga = [];
let idCounter = 1;

// Tambah data
app.post("/tambah", (req, res) => {
    const data = { id: idCounter++, ...req.body };
    warga.push(data);
    res.send("Data ditambahkan");
});

// Ambil data
app.get("/warga", (req, res) => {
    res.json(warga);
});

// Hapus data
app.delete("/hapus/:id", (req, res) => {
    warga = warga.filter(w => w.id != req.params.id);
    res.send("Data dihapus");
});

// Edit data
app.put("/edit/:id", (req, res) => {
    warga = warga.map(w =>
        w.id == req.params.id ? { ...w, ...req.body } : w
    );
    res.send("Data diupdate");
});

// Jalankan server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});