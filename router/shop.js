const express = require('express');
const path = require('path');

const router = express.Router();

const shopController = require('../controllers/shop');

router.get('/', shopController.getProducts);
router.get('/products');

router.get('/cart');

router.get('/checkout');

module.exports = router;