const { Router } = require('express');

const Container = require('../class/container');
const prod = new Container("../files/products.json");

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/', (req, res) => {
    res.send('Hello New Product!');
});

router.put('/:id', (req, res) => {
    res.send('Hello Update Product!');
});

module.exports = router;