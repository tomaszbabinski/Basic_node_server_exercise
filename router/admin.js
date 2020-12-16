const express = require('express')
const path = require('path');

const rootDir = require('../util/path');

const products = [];
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router()
//this normally gets /admin/add-product -> GET
router.get('/add-product', isAuth, adminController.getAddProduct);

//this normally gets /admin/add-product -> POST
router.post('/add-product', isAuth, adminController.postAddProduct)

router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDelete);

module.exports = router;

