const express = require('express');
const app = express();
const { Server : SocketServer } = require('socket.io');
const { Server : HTTPServer } = require('http');

const productRoutes = require('./routes/product');

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer); 

const Container = require("./class/container");
const p = new Container("./files/products.json");

app.use(express.static('public'));
app.use("/products", productRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

socketServer.on('connection', (socket) => {
    console.log("New client connected");
    socket.emit('products_agregated', p.getAll());
    console.log(p.getAll());

    socket.on('products_new', (prod) => {
        p.save(prod).then(socketServer.emit('products_agregated', p.getAll()
        )).catch(err => console.log(err));
    });
});


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get("/chat", (req, res) => {
    res.sendFile(__dirname + "/public/chat.html");
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}).on("error", (err) => {
    console.log(err);
});