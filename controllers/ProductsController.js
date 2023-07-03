const Product = require('../models/ProductModel');

exports.getAddProduct = (req, res, next) => {
    res.render('products/ejs/create', { title: 'Add Product', path: '/products/create' });
};


exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('products/ejs/index', {
        prods: products,
        title: 'Shop',
        path: '/products',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true
      });
    });
  };

// exports.getEditProduct = (req, res, next) => {
//     const productId = req.params.productId;
//     const product = ProductModel.findById(productId);
//     res.render('products/edit', { product: product, pageTitle: 'Edit Product', path: '/products' });
// };