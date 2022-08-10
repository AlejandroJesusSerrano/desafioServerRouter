const express = require("express");
const app = express();
const { Server : SocketServer } = require("socket.io");
const { Server : HTTPServer } = require("http");
const productRoutes = require("./routes/product");
const Container = require("./class/container");

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer); 

const product = new Container("./files/products.json");

app.use(express.static("public"));
app.use('/product', productRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

socketServer.on("connection", socket => {
    console.log("New client connected");
    socket.emit('products_agregated', product.getAll());

    socket.on('products_post', (prod) => {
        product.save(prod);
        socketServer.emit('products_agregated', product.getAll());
    });
});


app.get("/", (req, res) => {
    res.sendFile(__dirname + "public/index.html");
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}).on("error", (err) => {
    console.log(err);
});