const express = require('express')
const path = require('path');

const router = express.Router()
const rootDir = require('../util/path');

const products = [];
const adminController = require('../controllers/admin');

//this normally gets /admin/add-product -> GET
router.get('/add-product', adminController.getAddProduct);

//this normally gets /admin/add-product -> POST
router.post('/add-product', adminController.postAddProduct)

router.get('/products', adminController.getProducts);

router.get('/edit-product/:productId',adminController.getEditProduct);

router.post('/edit-product',adminController.postEditProduct);

// router.post('/delete-product',adminController.postDelete);

module.exports = router;

