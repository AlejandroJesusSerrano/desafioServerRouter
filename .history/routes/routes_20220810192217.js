const { Router } = require('express');

const Container = require('../class/container');
const p = new Container("../files/products.json");
const m = new Container("../files/chatHistory.json");

const router = Router();

router.get('/', (req, res) => {
    res.render("form");
});


router.put('/:id', (req, res) => {
    res.send('Hello Update Product!');
});

module.exports = router;