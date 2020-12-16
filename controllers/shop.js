const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
    Product.find().then(products => {
        res.render('shop/product-list',{
            prods: products,
            pageTitle: 'All Products',
            path: '/products',
            isAuthenticated: req.session.isLoggedIn
         });
    }).catch(err=> console.log(err));
}

exports.getProduct = (req,res,next) => {
    const prodId = req.params.productId; 
    Product.findById(prodId)
        .then((product) => {
            res.render('shop/product-detail', {
                product: product,
                pageTitle: product.title,
                path: '/products',
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => { console.log(err)})
}

exports.getIndex = (req,res,next) => {
    Product.find().then(products => {
        res.render('shop/index',{
            prods: products,
            pageTitle: 'Shop',
            path: '/',
            isAuthenticated: req.session.isLoggedIn,
            csrfToken: req.csrfToken()
         });
    }).catch(err=> console.log(err));
};

exports.getCart = (req, res, next) => {
    console.log(req.user);
    req.user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items;
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
          isAuthenticated: req.session.isLoggedIn
        });
      })
      .catch(err => console.log(err));
  };

exports.postCart = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => { 
            console.log(result); 
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    req.user
        .removeFromCart(prodId)
        .then(result => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.postOrder = (req,res,next) => {
    req.session.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return {quantity: i.quantity, product: {...i.productId._doc} };
            });
            const order = new Order({
                user: {
                  name: req.session.user.name,
                  userId: req.session.user
                },
                products: products
        
          });
        return order.save(); 
        })
        .then( () => {
            return req.session.user.clearCart();
        })
        .then(result => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));  
};

exports.getOrders = (req,res,next) => {
    Order.find( {'user.userId': req.session.user._id})
        .then(orders => {
            res.render('shop/orders',{
                path: '/orders',
                pageTitle: 'Your order',
                orders: orders,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => console.log)
}

exports.getCheckout = (req,res,next) => {
    res.render('shop/checkout',{
        path: '/checkout',
        pageTitle: 'Checkout',
        isAuthenticated: req.session.isLoggedIn
    });
}
