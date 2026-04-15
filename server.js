const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// 🔥 GANTI DENGAN URL MONGODB KAMU
const MONGO_URL=mongodb+srv://adexukhra_db_user:%40Bali2025@cluster0.cepyhwc.mongodb.net/desa_adat?retryWrites=true&w=majority
// CONNECT
mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// SCHEMA
const Warga = mongoose.model("Warga", {
    no_kk: String,
    nama: String,
    status: String,
    jenis: String,
    gender: String
});

// TAMBAH
app.post("/tambah", async (req, res) => {
    await new Warga(req.body).save();
    res.send("OK");
});

// AMBIL
app.get("/warga", async (req, res) => {
    const data = await Warga.find();

    const hasil = data.map(d => ({
        id: d._id.toString(),
        ...d._doc
    }));

    res.json(hasil);
});

// HAPUS
app.delete("/hapus/:id", async (req, res) => {
    await Warga.findByIdAndDelete(req.params.id);
    res.send("OK");
});

// SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server jalan"));