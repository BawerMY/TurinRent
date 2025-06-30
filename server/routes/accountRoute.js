const express = require('express');
const router = express.Router();

const jws = require('jsonwebtoken');
const SECRET_KEY = "Datemi il diploma per favore :)"

const jwsAuthorize = require('../utils/jwsAuthorize');

const User = require('../models/userModel');

router.post('/sign-up', async (req, res) => {
    if (await User.findOne({ email: req.body.email }) !== null) {
        return res.status(400).json({ message: 'Email already exists' });
    } else if (await User.findOne({ phone: req.body.phone }) !== null) {
        return res.status(400).json({ message: 'Phone number already exists' });
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        bankCardToken: null
    })
    await user.save()
    const accessToken = jws.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(201).json({
        message: 'User created successfully',
        accessToken: accessToken,
        user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            bankConnected: user.bankCardToken !== null
        }
    })
})

router.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email, password: req.body.password });
    if (user === null) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }
    const accessToken = jws.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    return res.status(200).json({
        message: 'Login successful',
        accessToken: accessToken,
        user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
            bankConnected: user.bankCardToken !== null

        }

    })
})

router.get('/me', (req, res) => jwsAuthorize(req, res, async (req, res, userId) => {
    user = await User.findById(userId);
    if (user === null) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
        name: user.name,
        email: user.email,
        phone: user.phone,
        bankConnected: user.bankCardToken !== null
    })
}))

module.exports = router