const Product = require('../../models/ProductModel');

exports.getAllProductsJson = (req, res, next) => {
    res.json({message: 'success', data: Product.fetchJsonAll()});
};
