const express = require('express');
const router = express.Router();
const Product = require('../models/Products'); // <-- Impor model Product

// --- Endpoint API Produk ---

// GET /products: Mendapatkan semua produk
// Mengganti array sementara dengan Product.find() dari MongoDB
router.get('/', async (req, res) => {
    try {
        const products = await Product.find(); // Mencari semua dokumen produk di MongoDB
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mendapatkan produk.', error: err.message });
    }
});

// GET /products/:id: Mendapatkan detail produk berdasarkan ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.id }); // Mencari produk berdasarkan 'id' kustom
        // Alternatif jika ID MongoDB yang digunakan: const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Gagal mendapatkan detail produk.', error: err.message });
    }
});

// POST /products: Menambah produk baru
router.post('/', async (req, res) => {
    // Membuat instance Product baru dari body request
    const newProduct = new Product(req.body);

    try {
        // Menyimpan produk baru ke MongoDB
        const savedProduct = await newProduct.save();
        res.status(201).json({ message: 'Produk berhasil ditambahkan.', product: savedProduct });
    } catch (err) {
        // Menangani error validasi atau duplikasi (misalnya, ID sudah ada)
        res.status(400).json({ message: 'Gagal menambahkan produk.', error: err.message });
    }
});

// PUT /products/:id: Memperbarui produk
router.put('/:id', async (req, res) => {
    try {
        // Menggunakan findOneAndUpdate untuk mencari dan memperbarui dokumen
        // new: true mengembalikan dokumen yang sudah diperbarui
        // runValidators: true menjalankan validasi skema saat update
        const updatedProduct = await Product.findOneAndUpdate(
            { id: req.params.id }, // Kriteria pencarian
            req.body,             // Data yang akan diperbarui
            { new: true, runValidators: true }
        );

        if (updatedProduct) {
            res.json({ message: 'Produk berhasil diperbarui.', product: updatedProduct });
        } else {
            res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Gagal memperbarui produk.', error: err.message });
    }
});

// DELETE /products/:id: Menghapus produk
router.delete('/:id', async (req, res) => {
    try {
        // Menggunakan findOneAndDelete untuk mencari dan menghapus
        const deletedProduct = await Product.findOneAndDelete({ id: req.params.id });

        if (deletedProduct) {
            res.json({ message: 'Produk berhasil dihapus.' });
        } else {
            res.status(404).json({ message: 'Produk tidak ditemukan.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Gagal menghapus produk.', error: err.message });
    }
});

module.exports = router;