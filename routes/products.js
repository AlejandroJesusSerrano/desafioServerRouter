const { Router } = require("express");
const routerProducts = Router();
const Container = require("../public/class/container");
const products = "files/products.json";

const af = new Container(products);

// routerProducts.get("/", (req, res) => {
//     res.render("form");
// });

// routerProducts.post("/", (req, res) => {
//     af.save(req.body).then((product) => res.render("form"));
    
// });

module.exports = routerProducts;