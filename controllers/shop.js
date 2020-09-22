const Product = require('../models/product');


exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list',{
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
         });
    
    }); 
    
}

exports.getIndex = (req,res,next) => {
    Product.fetchAll(products => {
        res.render('shop/index',{
            prods: products,
            pageTitle: 'Shop',
            path: '/'
         });
    
    });
};
