const mongoose = require('mongoose');

// Skema Produk: Ini seperti 'cetak biru' untuk setiap barang di gudang kita.
// Kita tentukan properti apa saja yang dimiliki setiap produk dan tipenya.
const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // ID produk (wajib, harus unik)
    name: { type: String, required: true },          // Nama produk (wajib)
    price: { type: Number, required: true },         // Harga produk (wajib, angka)
    stock: { type: Number, required: true, default: 0 }, // Stok produk (wajib, angka, default 0)
    description: String                              // Deskripsi produk (string, opsional)
});

// Model Produk: Ini adalah 'manajer' untuk koleksi produk di MongoDB.
// Melalui model ini, kita bisa melakukan operasi CRUD (Create, Read, Update, Delete).
const Product = mongoose.model('Product', productSchema);

module.exports = Product; // Mengekspor model agar bisa digunakan di rute