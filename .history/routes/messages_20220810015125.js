const { Router } = require('express');

const Container = require('../class/container');
const chat = new Container("../files/chatHistory.json");

const router = Router();

router.get('/', (req, res) => {
    res.send(product.getAll());
});

router.post('/', (req, res) => {
    product.save(req.body).then(() => {
        res.send(product.getAll());
    }).catch(err => console.log(err));
});    

router.put('/:id', (req, res) => {
    res.send('Hello Update Product!');
});

module.exports = router;