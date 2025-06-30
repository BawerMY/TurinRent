const express = require('express');
const router = express.Router();

const Product = require('../models/productModel');
const ProductInstance = require('../models/productInstanceModel');
const User = require('../models/userModel');
const Rental = require('../models/rentalModel');

router.post('/admin/create-product', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        shortDescription: req.body.shortDescription,
        longDescription: req.body.longDescription,
        category: req.body.category,
        specs: req.body.specs,
        price: req.body.price,
        image: req.body.image,
        category: req.body.category
    })
    await product.save()
    res.status(201).json({ message: 'Product created successfully', product: product });
})

router.get('/admin/products', async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
})

router.post('/admin/delete-product', async (req, res) => {
    const product = await Product.findById(req.body.productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    await Product.deleteOne({ _id: req.body.productId });
    await ProductInstance.deleteMany({ product: req.body.productId });
    res.status(200).json({ message: 'Product deleted successfully' });
})

router.post('/admin/create-product-instance', async (req, res) => {
    const productInstance = new ProductInstance({
        product: req.body.product,
        notes: req.body.notes
    })
    await productInstance.save();
    res.status(201).json({ message: 'Product instance created successfully', productInstance: productInstance });
})

router.get('/admin/product-instances', async (req, res) => {
    const productInstances = await ProductInstance.find()
    res.status(200).json(productInstances);
})

router.post('/admin/delete-product-instance', async (req, res) => {
    const productInstance = await ProductInstance.findById(req.body.productInstanceId);
    if (!productInstance) {
        return res.status(404).json({ message: 'Product not found' });
    }
    await ProductInstance.deleteOne({ _id: req.body.productInstanceId });
    res.status(200).json({ message: 'Product Instance deleted successfully' });
})

router.get('/admin/users', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
})

router.get('/admin/wac_rents', async (req, res) => {
    const rentals = await Rental.find({ status: 'wac_rent' })
    res.status(200).json(rentals);
})

router.post('/admin/confirm-rental', async (req, res) => {
    const rentalId = req.body.rentalId;
    const rental = await Rental.findById(rentalId);
    if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
    }
    rental.status = 'on_rent';
    await rental.save();
    res.status(200).json({ message: 'Rental confirmed successfully', rental: rental });
})

router.post('/admin/confirm-return', async (req, res) => {
    const rental = await Rental.findById(req.body.rentalId);
    if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
    }
    if (rental.status !== 'wac_renturn') {
        return res.status(400).json({ message: 'Rental is not waiting for return confirmation' });
    }
    rental.status = 'returned';
    rental.endDate = Date.now();
    await rental.save();
    const productInstance = await ProductInstance.findById(rental.productInstance);
    productInstance.available = true;
    await productInstance.save();
    res.status(200).json({ message: 'Rental return confirmed successfully', rental: rental });
})

router.get('/admin/rentals', async (req, res) => {
    const rentals = await Rental.find();
    res.status(200).json(rentals);
})

module.exports = router