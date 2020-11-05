const mongodb = require('mongodb');
const Product = require('../models/product');

const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'))
    res.render('admin/edit-product',{
        pageTitle: 'Add product', 
        path: '/admin/add-product',
        editing: false
    }); 
}


exports.postAddProduct = (req, res, next) => {
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const title = req.body.title;
    const product = new Product(title,price,description,imageUrl);
    product.save()
        .then(result => {
        res.redirect('/admin/products')
        })
        .catch(err => console.log(err))
}

exports.getEditProduct = (req, res, next) => {
   
    const editMode = req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
                if(!product){
                    return res.redirect('/');
            }
            res.render('admin/edit-product',{
                pageTitle: 'Edit product', 
                path: '/admin/edit-product',
                editing: editMode,
                product: product
            });
        })
        .catch(err => console.log(err))
}


exports.postEditProduct = (req,res,next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDescription = req.body.description;

    const product = new Product(updatedTitle,updatedPrice,updatedDescription,updatedImageUrl,new ObjectId(prodId));
        product.save()
        .then(result => {
            console.log('Updated product!!!')
            res.redirect('/products');
        })
        .catch(err => console.log(err))
}


exports.getProducts = (req,res,next) => {
    Product.fetchAll()
        .then(products => {
            res.render('admin/products',{
                prods: products,
                pageTitle: 'Admin products',
                path: '/admin/product'
            })
        })
        .catch(err => console.log(err))

}

// exports.postDelete = (req,res,next) => {
//     const prodId = req.body.productId;
//     Product.findByPk(prodId)
//         .then(product => {
//             return product.destroy();
//         })
//         .then(result => {
//             console.log('Product destroyed');
//             res.redirect('/admin/products');
//         })
//         .catch(err => console.log(err))
// };