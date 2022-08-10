const express = require("express");
const handlebars = require("express-handlebars");
const app = express();
const PORT = 8080;
const Container = require('./public/class/container'); 
const products = "./files/products.json";
const af = new Container(products);
const { Router } = require("express");
const routerProducts = Router();


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerProducts);

const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'index.hbs', 
    layoutsDir: __dirname + '/views/layout',
    //partialsDir: __dirname + 'views/partials/'
});
    
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

routerProducts.get("/products", (req, res) => {
    af.getAll().then((product) => res.render("main", {
        allProducts: product, 
        listExists: true
        }));
});

routerProducts.get("/products", (req, res) => {
    res.render("form")
});

routerProducts.post("/products", (req, res) => {
    af.save(req.body).then(res.render("form", {
    }));
});

routerProducts.get("/products/modify", (req, res) => {
    af.getById(req.params.id).then(res.render("formSelectIdToUpdate", {}
    ));
});

routerProducts.post("/products/modify", (req, res) => {
    af.getById(req.params.id).then(res.render("formSelectIdToUpdate", {id}
    ));
});

routerProducts.get("/products/modify/:id", (req, res) => {
    af.getById(req.params.id).then((product) => res.render("formUp", 
    {
        product: product
    }
    ));
});

routerProducts.put("/products/modify/:id", (req, res) => {
    af.update(req.params.id, req.body).then(res.redirect("/productsList"));
});


routerProducts.delete("/products/:id", (req, res) =>{
    af.deleteById(req.params.id).then((product) => res.json(product))
});
    

const server = app.listen (PORT, () => {
    console.log (`server listen port ${PORT}`)
}); 

server.on ("error", error => console.log(`Error: ${error}`))
