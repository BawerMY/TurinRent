const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
    productInstance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product_instance',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    status: {
        type: String,
        enum: ['wac_rent', 'on_rent', 'wac_renturn', 'returned'],
    },
    startDate: {
        type: Date,
        default: Date.now(),
    },
    endDate: {
        type: Date,
        default: null,
    },
})

module.exports = mongoose.model('rental', rentalSchema);