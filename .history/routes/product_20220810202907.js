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
        p.save({
            body
        });
        
    } else {
        res.status(400).send('Complete todos los campos')
    }
});

router.put('/:id', (req,res) => {
    res.send('update')
});

module.exports = router;