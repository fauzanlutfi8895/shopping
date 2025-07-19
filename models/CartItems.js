const mongoose = require('mongoose');

// Skema Item Keranjang Belanja
// Setiap item di keranjang akan punya ID produk dan kuantitasnya.
const cartItemSchema = new mongoose.Schema({
    productId: { type: String, required: true }, // ID produk yang dibeli
    quantity: { type: Number, required: true, default: 1 } // Jumlah item
    // Dalam aplikasi sungguhan, ini akan dihubungkan ke user ID juga
});

// Model Item Keranjang Belanja
const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem; // Mengekspor model