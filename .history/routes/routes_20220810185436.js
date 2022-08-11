const { Router } = require('express');

const Container = require('../class/container');
const p = new Container("../files/products.json");
const m = new Container("../files/chatHistory.json");

const router = Router();

router.get('/products', (req, res) => {
    res.render("form");
});


router.get('/chat', (req, res) => {
    res.render("chat")
});


router.put('/:id', (req, res) => {
    res.send('Hello Update Product!');
});

module.exports = router;