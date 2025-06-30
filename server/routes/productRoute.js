const express = require('express');
const router = express.Router();

const Product = require('../models/productModel');
const ProductInstance = require('../models/productInstanceModel');
const User = require('../models/userModel');
const Rental = require('../models/rentalModel');
const jwsAuthorize = require('../utils/jwsAuthorize');

router.get('/products', async (req, res) => {
  let data = []
  let products = await Product.find();
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let available = (await ProductInstance.find({ product: product._id, available: true })).length > 0;
    data.push({
      name: product.name,
      shortDescription: product.shortDescription,
      longDescription: product.longDescription,
      category: product.category,
      specs: product.specs,
      price: product.price,
      image: product.image,
      category: product.category,
      available: available
    })
  }
  res.json(data);
})

router.post('/rent',(req, res) => jwsAuthorize(req, res, async (req, res, userId) => {
  const user = await User.findById(userId);
  const productId = req.body.productId
  const available = (await ProductInstance.find({ product: productId, available: true })).length > 0;
  console.log((await ProductInstance.find({product: productId})))
  if (!available) {
    return res.status(400).json({ error: 'Product not available for rent' });
  }
  const productInstance = await ProductInstance.findOne({ product: productId, available: true });
  const rental = new Rental({
    productInstance: productInstance._id,
    user: user._id,
    status: 'wac_rent'
  });
  await rental.save();
  productInstance.available = false;
  await productInstance.save();
  res.json({ message: 'Rental waiting for admin confermation', success: true, rental: rental });
}))

router.post('/return', (req, res) => jwsAuthorize(req, res, async (req, res, userId) => {
  const user = await User.findById(userId);
  const rental = await Rental.findById(req.body.rentalId);
  console.log(rental);
  if (!rental || rental.user.toString() !== userId) {
    return res.status(404).json({ error: 'Rental not found or not owned by user' });
  }
  if (rental.status !== 'on_rent') {
    return res.status(400).json({ error: 'Rental is not currently on rent' });
  }
  rental.status = 'wac_renturn';
  await rental.save();
  res.json({ message: 'Rental return requested', rental: rental });
}))


module.exports = router;