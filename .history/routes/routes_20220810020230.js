const { Router } = require('express');

const Container = require('../class/container');
const p = new Container("../files/products.json");
const m = new Container("../files/chatHistory.json");

const router = Router();

router.get('/', (req, res) => {
    res.send(p.getAll());
});

router.post('/', (req, res) => {
    p.save(req.body).then(() => {
        res.send(p.getAll());
    }).catch(err => console.log(err));
});

router.get('/chat', (req, res) => {
    res.send(m.getAll());
});

router.put('/:id', (req, res) => {
    res.send('Hello Update Product!');
});

module.exports = router;