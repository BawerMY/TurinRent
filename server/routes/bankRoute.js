const express = require('express');
const router = express.Router();

const jwsAuthorize = require('../utils/jwsAuthorize')

const User = require('../models/userModel')

router.post('/bank/connect-account', (req, res) => jwsAuthorize(req, res, async (req, res, userId) => {
    const user = await User.findById(userId)
    user.bankCardToken = `${req.body.cardNumber}/${req.body.expirationDate}/${req.body.cvv}`
    await user.save()
    res.status(200).json({ message: 'Bank account connected', success: true });
}))

router.post('/bank/disconnect-account', (req, res) => jwsAuthorize(req, res, async (req, res, userId) => {
    const user = await User.findById(userId)
    user.bankCardToken = null;
    await user.save()
    res.status(200).json({ message: 'Bank account disconnected', success: true });
}))

module.exports = router;