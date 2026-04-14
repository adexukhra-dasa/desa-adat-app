const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🔥 GANTI DENGAN URL MONGODB KAMU
const MONGO_URL = "mongodb+srv://adexukhra_db_user:%40Bali2025@cluster0.cepyhwc.mongodb.net/?appName=Cluster0";

// CONNECT DATABASE
mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log("Mongo Error:", err));

// SCHEMA
const WargaSchema = new mongoose.Schema({
    nik: String,
    no_kk: String,
    nama: String,
    alamat: String,
    banjar: String,
    status: String,
    no_hp: String
});

const Warga = mongoose.model("Warga", WargaSchema);

// TAMBAH
app.post("/tambah", async (req, res) => {
    const data = new Warga(req.body);
    await data.save();
    res.send("Data ditambahkan");
});

// AMBIL
app.get("/warga", async (req, res) => {
    const data = await Warga.find();

    const hasil = data.map(d => ({
        id: d._id.toString(), // 🔥 FIX DI SINI
        nik: d.nik,
        no_kk: d.no_kk,
        nama: d.nama,
        alamat: d.alamat,
        banjar: d.banjar,
        status: d.status,
        no_hp: d.no_hp
    }));

    res.json(hasil);
});

// HAPUS
app.delete("/hapus/:id", async (req, res) => {
    try {
        console.log("Hapus ID:", req.params.id); // debug

        const result = await Warga.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).send("Data tidak ditemukan");
        }

        res.send("Data dihapus");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error hapus");
    }
});

// EDIT
app.put("/edit/:id", async (req, res) => {
    await Warga.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send("Data diupdate");
});

// SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server jalan di port " + PORT);
});