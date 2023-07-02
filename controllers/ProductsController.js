const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('products/create', { pageTitle: 'Add Product', path: '/products/create' });
};


exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/products');
};

exports.getProducts = (req, res, next) => {
    res.render('products/index', { products, title: 'Shop', path: '/' });
};