const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');
const productsController = require('../controllers/Client/ProductsController');

router.get('/products', productsController.getAllProductsJson);


exports.routes = router;
