// Mengimpor library Express.js dan Mongoose
const express = require('express');
const mongoose = require('mongoose'); // <-- Tambahkan ini
const app = express();
const PORT = process.env.PORT || 3000;

// --- Konfigurasi Database MongoDB ---
// Ganti dengan URI MongoDB Anda. Contoh:
// - Lokal: 'mongodb://localhost:27017/ecommerce_db'
// - MongoDB Atlas: 'mongodb+srv://<username>:<password>@<cluster-url>/<db-name>?retryWrites=true&w=majority'
const MONGODB_URI = 'mongodb+srv://fauzanlutfi8895:uiBlZv2fEllwVO18@cluster0.dz2hyjp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; 

// Koneksi ke MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => console.log('Terhubung ke MongoDB! Gudang data siap digunakan.'))
    .catch(err => console.error('Gagal terhubung ke MongoDB:', err));

// Mengimpor modul rute
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');

// Middleware untuk memparsing body dari request JSON
app.use(express.json());

// --- Rute Utama ---
app.get('/', (req, res) => {
    res.send('Selamat datang di API E-Commerce Sederhana dengan MongoDB!');
});

// --- Menggunakan Rute Modul ---
app.use('/products', productsRouter);
app.use('/cart', cartRouter);

// --- Menjalankan Server ---
app.listen(PORT, () => {
    console.log(`Server E-Commerce berjalan di http://localhost:${PORT}`);
    console.log('Tekan CTRL+C untuk menghentikan server.');
});