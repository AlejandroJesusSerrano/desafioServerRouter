const { Router } = require('express');

const Container = require('../class/container');
const product = new Container("../files/products.json");

const router = Router();

router.get('/', (req, res) => {
    res.send(product.getAll());
});

router.post('/', (req, res) => {
    product.save(req.body).then((newProduct) => res.json(newProduct))
});

router.put('/:id', (req, res) => {
    res.send('Hello Update Product!');
});

module.exports = router;