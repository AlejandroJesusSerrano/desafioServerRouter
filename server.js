const express = require("express");
const { Router } = express;
const app = express();

const PORT = 8080;


const Container = require('./public/class/container');
const routerProducts = require("./routes/products");
const products = "./files/products.json";
const af = new Container(products)

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", routerProducts);

routerProducts.get("/", (req, res) => {
    af.getAll().then((product) => res.json(product))
});

routerProducts.get("/:id", (req, res) => {
    af.getById(req.params.id).then((product) => res.json(product))
});

routerProducts.post("/", (req, res) =>{
    af.save(req.body).then((product) => res.json(product))
});

routerProducts.put("/:id", (req, res) =>{
    af.update(req.params.id, req.body).then((product) => res.json(product))
});

routerProducts.delete("/:id", (req, res) =>{
    af.deleteById(req.params.id).then((product) => res.json(product))
});
    

const server = app.listen (PORT, () => {
    console.log (`server listen port ${PORT}`)
}); 

server.on ("error", error => console.log(`Error: ${error}`))




