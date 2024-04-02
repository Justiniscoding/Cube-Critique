const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);

server.listen(8080);

const io = socketio(server);

io.on("connection", socket => {
    console.log(socket);
});