const { Router } = require('express');

const router = Router();

const Container = require('../class/container');
const product = new Container("../files/products.json");



router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/', (req, res) => {
    const body = req.body;
    if (body.title && body.price && body.description && body.universe && body.details && body.stock) {
        prod.save({
            title: body.title,
            price: body.price,
            description: body.description,
            universe: body.universe,
            details: body.details,
            stock: body.stock,
            thumbnail: body.thumbnail  
        });
    } else {
        res.status(400).send('solo se puede omitir el campo imagen');
    }
});

router.put('/:id', (req, res) => {
    res.send('Hello Update Product!');
});

module.exports = router;