const express = require('express');
const handlebars = require("express-handlebars");
const app = express();
const { Server : SocketServer } = require('socket.io');
const { Server : HTTPServer } = require('http');

const routes = require('./routes/routes');

const events = require("./socketEvents");

const httpServer = new HTTPServer(app);
const socketServer = new SocketServer(httpServer); 
// ProductsContainer
const Container = require("./class/container");
const p = new Container("./files/products.json");
// ChatHistoryContainer
const Container2 = require("./class/container");
const m = new Container2("./files/chatHistory.json");

const messages = m.getAll();

const hbs = handlebars.create({
    extname: '.hbs',
    defaultLayout: 'index.hbs', 
    layoutsDir: __dirname + '/views/layout',
    //partialsDir: __dirname + 'views/partials/'
});
    
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use("/", routes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// productsSockets
socketServer.on('connection', (socket) => {
    console.log("New client connected");
    socket.emit(events.PRODUCTS_AGREGATE, p.getAll());
    console.log(p.getAll());

    socket.on(events.POST_PRODUCTS, (prod) => {
        p.save(prod).then(socketServer.emit(events.PRODUCTS_AGREGATE, p.getAll()
        )).catch(err => console.log(err));
    });
});

// ChatSockets
socketServer.on("connection", (socket) => {
    console.log("New client connected");
    socketServer.emit(events.UPDATE_MESSAGES, "WELCOME TO WEBSOCKET", messages);

    socket.on("POST_MSG", (msg) => {
        const newMsg = {
            ...msg,
            socket_id: socket.id,
            likes: 0,
            date: nowDayJs,
            deteCompare: Date.now()
        };
        m.save(newMsg);
        socketServer.sockets.emit(events.NEW_MESSAGE, newMsg);
    });

    socket.on(events.LIKE_MESSAGE, (msgiD) => {
        const msg = m.getById(msgiD);
        msg.likes++;
        m.update(msgiD, msg);
        socketServer.sockets.emit(
            events.UPDATE_MESSAGES,
            "Message liked",
            m.getAll()
            );
    });
});



app.get('/', (req, res) => {
    res.sendFile(__dirname + './index.html')
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}).on("error", (err) => {
    console.log(err);
});
