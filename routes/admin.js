const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');
const products = [];
const AdminController = require('../controllers/ProductsController');

router.get('/products/create', AdminController.getAddProduct);
router.post('/products', AdminController.postAddProduct);
router.get('/products', AdminController.getProducts);




exports.routes = router;
exports.products = products;