const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// =======================
// MONGODB (PASTE LANGSUNG)
// =======================
const MONGO_URL = "mongodb+srv://adexukhra_db_user:%40Bali2025@cluster0.cepyhwc.mongodb.net/desa_adat?retryWrites=true&w=majority";

// CONNECT
mongoose.connect(MONGO_URL)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => {
        console.log("❌ Mongo Error:", err.message);
    });

// =======================
// SCHEMA
// =======================
const Warga = mongoose.model("Warga", {
    no_kk: String,
    nama: String,
    status: String,
    jenis: String,
    gender: String
});

// =======================
// ROUTES
// =======================

// TEST
app.get("/test", (req, res) => {
    res.send("API OK");
});

// TAMBAH
app.post("/tambah", async (req, res) => {
    try {
        await new Warga(req.body).save();
        res.send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// AMBIL
app.get("/warga", async (req, res) => {
    try {
        const data = await Warga.find().sort({ _id: -1 });

        const hasil = data.map(d => ({
            id: d._id.toString(),
            no_kk: d.no_kk,
            nama: d.nama,
            status: d.status,
            jenis: d.jenis,
            gender: d.gender
        }));

        res.json(hasil);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// HAPUS
app.delete("/hapus/:id", async (req, res) => {
    try {
        await Warga.findByIdAndDelete(req.params.id);
        res.send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// EDIT
app.put("/edit/:id", async (req, res) => {
    try {
        await Warga.findByIdAndUpdate(req.params.id, req.body);
        res.send("OK");
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// =======================
// SERVER
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 Server jalan di port " + PORT);
});