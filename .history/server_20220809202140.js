const express = require("express");
// Sockets
const { Server: HTTPServer, Server } = require("http");
const { Server: SocketServer } = require("socket.io");
const events = require("./socketEvents");

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer);
// Express
const handlebars = require("express-handlebars");
const app = express();
const PORT = 8080;
// Routes & Class
const Container = require('./public/class/container'); 
const products = "./files/products.json";
const af = new Container(products);
const msgs = new Container("./files/messages.json");
const { Router } = require("express");
const routerProducts = Router();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routerProducts);

// Handlebars Config
const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'index.hbs', 
    layoutsDir: __dirname + '/views/layout',
});
    
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// Routes
routerProducts.get("/productsList", (req, res) => {
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

routerProducts.put("/products/modify/:id", (req, res) =>{
    af.update(req.params.id, req.body).then((product) => res.json(product))
});

routerProducts.delete("/products/:id", (req, res) =>{
    af.deleteById(req.params.id).then((product) => res.json(product))
});
    

const server = app.listen (PORT, () => {
    console.log (`server listen port ${PORT}`)
}); 

server.on ("error", error => console.log(`Error: ${error}`))
