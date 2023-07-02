const ProductModel = require('../models/ProductModel.js');

exports.getAddProduct = (req, res, next) => {
    res.render('products/create', { pageTitle: 'Add Product', path: '/products/create' });
};


exports.postAddProduct = (req, res, next) => {
    const product = new ProductModel(req.body.title);
    product.save();
    res.redirect('/products');
};

exports.getProducts = (req, res, next) => {
    res.render('products/index', { products: ProductModel.fetchAll(), title: 'Shop', path: '/' });
};

exports.getEditProduct = (req, res, next) => {
    const productId = req.params.productId;
    const product = ProductModel.findById(productId);
    res.render('products/edit', { product: product, pageTitle: 'Edit Product', path: '/products' });
};