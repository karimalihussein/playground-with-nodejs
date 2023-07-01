const express = require('express');
const router = express.Router();

// add products

router.get('/products/creats', (req, res) => {
    res.send(
        '<form action="/products" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
    );
});

router.post('/products', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});



module.exports = router;