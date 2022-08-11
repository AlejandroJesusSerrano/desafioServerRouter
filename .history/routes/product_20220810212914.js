const { Router } = require('express');
const Container = require('../class/container');
const p = new Container('../files/products.json');

const router = Router();

router.get('/', (req, res) => {
    res.send(p.getAll());
});

router.post('/', (req, res) => {
    const body = req.body;
        p.save(req.body)
            .then(() =>{
                res.send(p.getAll());
            }).catch(err => console.log(err));
});

router.put('/:id', (req,res) => {
    res.send('update')
});

module.exports = router;