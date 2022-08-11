const { Router } = require('express');
const Container = require('../class/container');
const p = new Container('../files/products.json');

const router = Router();

router.get('/', (req, res) => {
    res.send(p.getAll());
});

router.post('/', (req, res) => {
    const body = req.body;
    if(body.title && body.price && body.description && body.details) {
        const product = {
            title: body.title, 
            price: body.price,
            thumbnail: body.thumbnail,
            description: body.description,
            universe: body.universe,
            details: body.details
        }
        p.save();
        res.send(product) 
    } else {
        res.status(400).send('Complete todos los campos')
    }
});

router.put('/:id', (req,res) => {
    res.send('update')
});

module.exports = router;