const { Router } = require('express');
const Container = require('../class/container');
const p = new Container('../files/products.json');

const router = Router();

router.get('/', (req, res) => {

});

router.post('/', (req, res) => {
    res.send('hello');
});

router.put('/:id', (req,res) => {
    res.send('update')
});

module.exports = router;