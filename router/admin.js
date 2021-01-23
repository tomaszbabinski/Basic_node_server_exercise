const express = require('express')
const path = require('path');

const rootDir = require('../util/path');
const { body } = require('express-validator');

const products = [];
const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router()
//this normally gets /admin/add-product -> GET
router.get('/add-product', isAuth, adminController.getAddProduct);

//this normally gets /admin/add-product -> POST
router.post('/add-product', [
   body('title').isString().isLength({min: 3}).trim(),
   body('price').isFloat(),
   body('description').isLength({min: 5, max: 400}).trim()
], isAuth, adminController.postAddProduct)

router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',[
    body('title').isString().isLength({min: 3}).trim(),
    body('price').isFloat(),
    body('description').isLength({min: 5, max: 400}).trim()
 ], isAuth, adminController.postEditProduct);

router.post('/delete-product', isAuth, adminController.postDelete);

module.exports = router;

