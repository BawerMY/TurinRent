const mongoose = require('mongoose');

const productInstanceSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product'
    },
    available: {
        type: Boolean,
        default: true
    },
    notes: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('product_instance', productInstanceSchema);