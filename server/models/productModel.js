const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    longDescription: String,
    category: String,
    specs: Object,
    price: Number,
    image: String,
    category: String
})

module.exports = mongoose.model('product', productSchema);