const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');
const products = [];
const productsController = require('../controllers/ProductsController');

router.get('/products/create', productsController.getAddProduct);
router.post('/products', productsController.postAddProduct);
router.get('/products', productsController.getProducts);




exports.routes = router;
exports.products = products;