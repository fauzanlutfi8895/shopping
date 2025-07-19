const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItems'); // <-- Impor model CartItem

// --- Endpoint API Keranjang Belanja ---

// GET /cart: Mendapatkan isi keranjang belanja
router.get('/', async (req, res) => {
    try {
        const cartItems = await CartItem.find();
        res.json(cartItems);
    } catch (err) {
        res.status(500).json({ message: 'Gagal mendapatkan isi keranjang.', error: err.message });
    }
});

// POST /cart/add: Menambah item ke keranjang belanja
router.post('/add', async (req, res) => {
    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
        return res.status(400).json({ message: 'ID produk dan kuantitas valid harus disediakan.' });
    }

    try {
        // Cek apakah item sudah ada di keranjang
        let existingCartItem = await CartItem.findOne({ productId: productId });

        if (existingCartItem) {
            // Jika ada, perbarui kuantitasnya
            existingCartItem.quantity += quantity;
            const updatedItem = await existingCartItem.save();
            res.json({ message: 'Kuantitas item diperbarui di keranjang.', item: updatedItem });
        } else {
            // Jika tidak ada, tambahkan item baru
            const newItem = new CartItem({ productId, quantity });
            const savedItem = await newItem.save();
            res.status(201).json({ message: 'Item berhasil ditambahkan ke keranjang.', item: savedItem });
        }
    } catch (err) {
        res.status(500).json({ message: 'Gagal menambahkan item ke keranjang.', error: err.message });
    }
});

// DELETE /cart/remove/:productId: Menghapus item dari keranjang
router.delete('/remove/:productId', async (req, res) => {
    try {
        const deletedItem = await CartItem.findOneAndDelete({ productId: req.params.productId });

        if (deletedItem) {
            res.json({ message: 'Item berhasil dihapus dari keranjang.' });
        } else {
            res.status(404).json({ message: 'Item tidak ditemukan di keranjang.' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Gagal menghapus item dari keranjang.', error: err.message });
    }
});

// DELETE /cart/clear: Mengosongkan keranjang belanja
router.delete('/clear', async (req, res) => {
    try {
        await CartItem.deleteMany({}); // Hapus semua dokumen dari koleksi CartItem
        res.json({ message: 'Keranjang belanja berhasil dikosongkan.' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal mengosongkan keranjang.', error: err.message });
    }
});

module.exports = router;