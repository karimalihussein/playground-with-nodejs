const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');
const path = require('path');
// add products

router.get('/products/create', (req, res) => {
    res.sendFile(path.join(rootDir, 'views/products', 'create.view.html'));
});

router.post('/products', (req, res) => {
    console.log(req.body);
    res.redirect('/');
});
router.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'views/products', 'index.view.html'));
});

router.use((req, res, next) => {
    res.status(404).sendFile(path.join(rootDir, 'views/products', '404.view.html'));
});


module.exports = router;