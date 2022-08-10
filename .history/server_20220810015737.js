const express = require('express');
const app = express();
const { Server : SocketServer } = require('socket.io');
const { Server : HTTPServer } = require('http');

const productRoutes = require('./routes/product');
const messageRoutes = require('./routes/messages');

const events = require("./socketEvents");

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer); 
// ProductsContainer
const Container = require("./class/container");
const p = new Container("./files/products.json");
// ChatHistoryContainer
const Container2 = require("./class/container");
const m = new Container2("./files/chatHistory.json");

app.use(express.static('public'));
app.use("/products", productRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// productsSockets
socketServer.on('connection', (socket) => {
    console.log("New client connected");
    socket.emit('products_agregated', p.getAll());
    console.log(p.getAll());

    socket.on('products_new', (prod) => {
        p.save(prod).then(socketServer.emit('products_agregated', p.getAll()
        )).catch(err => console.log(err));
    });
});

// ChatSockets
socketServer.on("connection", (socket) => {
    console.log('New client connected');
    socketServer.emit(events.UPDATE_MESSAGES, "Welcome to WebSocket", messages);

    socket.on(events.POST_MESSAGE, (msg)=>{
        const _msg = {
            ...msg,
            id: socket.id,
            likes: 0,
            date: Date.now()
        };
        container.save(_msg);
        socketServer.sockets.emit(events.NEW_MESSAGE, _msg);
    });

    socket.on(events.LIKE_MESSAGE, (msgId) => {
        const msg = container.getById(msgId);
        msg.likes++;
        container.update(msgId, msg);
        socketServer.sockets.emit(
            events.UPDATE_MESSAGES,
            "Messages Updated",
            container.getAll()
        );
    });
}); 


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/chat.html");
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}).on("error", (err) => {
    console.log(err);
});