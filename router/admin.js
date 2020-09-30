const express = require('express')
const path = require('path');

const router = express.Router()
const rootDir = require('../util/path');

const products = [];
const adminController = require('../controllers/admin');

//this normally gets /admin/add-product -> GET
router.get('/add-product', adminController.getAddProduct);

router.get('/products', adminController.getProducts);

//this normally gets /admin/add-product -> POST
router.post('/add-product', adminController.postAddProduct)

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

module.exports = router;

