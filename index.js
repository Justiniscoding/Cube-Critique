const express = require("express");
const socketio = require("socket.io");
const axios = require("axios");

const http = require("http");

require("dotenv").config();

const app = express();

app.use(express.static("public"));

const server = http.createServer(app);

server.listen(8080);

const io = socketio(server);

io.on("connection", socket => {
    socket.on("authenticate", authCode => {
        var redirect_uri = "http://localhost:8080";
        // redirect_uri = "https://evil-crab-58.telebit.io"

        axios.post(`https://www.worldcubeassociation.org/oauth/token`, {
            grant_type:"authorization_code",
            code: authCode,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: "http://localhost:8080",
        }).then(res => {
            socket.emit("authToken", res.data.access_token);
        }).catch(err => {
            console.log(err.toJSON());
        });
    });
});