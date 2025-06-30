const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    bankCardToken: String
})

module.exports = mongoose.model('user', userSchema);
