const express = require("express");
const app = express();
const { Server : SocketServer } = require("socket.io");
const { Server : HTTPServer, Server } = require("http");
const  productRoutes = require("./routes/product");

const httpServer = new HTTPServer(app);
const socketServer = new Server(httpServer); 

app.use (express.static("public"));
app.use ('/product', productRoutes);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "public/index.html");
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
}).on("error", (err) => {
    console.log(err);
});