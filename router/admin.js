const express = require('express')
const path = require('path');

const router = express.Router()
const rootDir = require('../util/path');

const products = [];
const productsController = require('../controllers/products');

//this normally gets /admin/add-product -> GET
router.get('/add-product', productsController.getAddProduct);

//this normally gets /admin/add-product -> POST
router.post('/add-product', productsController.postAddProduct)

module.exports = router;

