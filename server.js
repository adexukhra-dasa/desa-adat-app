// ==========================
// IMPORT
// ==========================
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ==========================
// INIT APP
// ==========================
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// ==========================
// MONGODB CONNECTION
// ==========================
const MONGO_URL = process.env.MONGO_URL;
MONGO_URL=mongodb+srv://adexukhra_db_user:%40Bali2025@cluster0.cepyhwc.mongodb.net/desa_adat?retryWrites=true&w=majority
// CEK ENV
if (!MONGO_URL) {
    console.error("❌ MONGO_URL belum diset di Railway!");
    process.exit(1);
}

// CONNECT DATABASE
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
});

// ==========================
// SCHEMA
// ==========================
const WargaSchema = new mongoose.Schema({
    no_kk: { type: String, required: true },
    nama: { type: String, required: true },
    status: { type: String },
    jenis: { type: String },
    gender: { type: String }
}, { timestamps: true });

const Warga = mongoose.model("Warga", WargaSchema);

// ==========================
// ROUTES
// ==========================

// TEST API
app.get("/test", (req, res) => {
    res.send("API OK");
});

// TAMBAH DATA
app.post("/tambah", async (req, res) => {
    try {
        const data = new Warga(req.body);
        await data.save();
        res.json({ success: true, message: "Data ditambahkan" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// AMBIL DATA
app.get("/warga", async (req, res) => {
    try {
        const data = await Warga.find().sort({ createdAt: -1 });

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
        res.status(500).json({ error: err.message });
    }
});

// HAPUS DATA
app.delete("/hapus/:id", async (req, res) => {
    try {
        const result = await Warga.findByIdAndDelete(req.params.id);

        if (!result) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json({ success: true, message: "Data dihapus" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// EDIT DATA
app.put("/edit/:id", async (req, res) => {
    try {
        const result = await Warga.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: "Data tidak ditemukan" });
        }

        res.json({ success: true, message: "Data diupdate" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================
// HANDLE ERROR GLOBAL
// ==========================
process.on("uncaughtException", err => {
    console.error("❌ Uncaught Exception:", err);
});

process.on("unhandledRejection", err => {
    console.error("❌ Unhandled Rejection:", err);
});

// ==========================
// SERVER START
// ==========================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 Server jalan di port " + PORT);
});