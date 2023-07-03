const path = require('path');

const express = require('express');

const ClientController = require('../controllers/Client/ProductsController');

const router = express.Router();

router.get('/', ClientController.getProducts);
router.get('cart', ClientController.getCart);
router.get('checkout', ClientController.getCheckout);

module.exports = router;