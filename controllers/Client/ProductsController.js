const Product = require('../../models/ProductModel');


exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('client/product-list', {
      prods: products,
      title: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};


exports.getCart = (req, res, next) => {
   Product.fetchAll(products => {
    res.render('client/cart', {
      prods: products,
      title: 'Your Cart',
      path: '/cart',
    });
   });
};


exports.getCheckout = (req, res, next) => {
    Product.fetchAll(products => {
      res.render('client/checkout', {
        prods: products,
        title: 'Checkout',
        path: '/checkout',
      });
    });
};

exports.getOrders = (req, res, next) => {
  Product.fetchAll(products => {
   res.render('client/orders', {
     prods: products,
     title: 'Your Orders',
     path: '/orders',
   });
  });
};