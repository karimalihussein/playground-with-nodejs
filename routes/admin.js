const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');
const products = [];

router.get('/products/create', (req, res) => {
    // res.sendFile(path.join(rootDir, 'views/products', 'create.view.html'));
    res.render('products/create', {title: 'Create a new product', path: '/products/create'});
});
 
router.post('/products', (req, res) => {
    products.push({ title: req.body.title });
    res.redirect('/');
});
router.get('/', (req, res) => {
    res.render('products/index', { products, title: 'Shop', path: '/'});
});

router.use((req, res, next) => {
    res.status(404).render('products/404', {title: 'Page not found'});
});


exports.routes = router;
exports.products = products;