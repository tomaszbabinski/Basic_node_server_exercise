const express = require('express')
const path = require('path');

const router = express.Router()
const rootDir = require('../util/path');

const products = [];

//this normally gets /admin/add-product -> GET
router.get('/add-product', (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('add-product',{
        pageTitle: 'Add product', 
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true});

});

//this normally gets /admin/add-product -> POST
router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title});
    res.redirect("/");
})

exports.routes = router;
exports.products = products;

