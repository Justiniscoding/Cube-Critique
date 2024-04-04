const express = require("express");
const socketio = require("socket.io");
const axios = require("axios");


const http = require("http");
const path = require("path");

require("dotenv").config();

const app = express();

app.use(express.static("public"));

app.get("*", (req, res) => {
    res.status(404).sendFile(path.join(__dirname,"./public/404.html"));
});

const server = http.createServer(app);

server.listen(8080);

const io = socketio(server);

function promisePost(url, args){
    return new Promise((resolve, reject) => {
        axios.post(url, args).then(res => {
            resolve(res);
        }).catch(err => {
            reject(err);
        });
    })
}

io.on("connection", socket => {
    socket.on("authenticate", async data => {
        const res = await promisePost(`https://www.worldcubeassociation.org/oauth/token`, {
            grant_type:"authorization_code",
            code: data.code,
            client_id: process.env.CLIENT_ID,
            client_secret: process.env.CLIENT_SECRET,
            redirect_uri: data.hostname,
        });

        socket.emit("authToken", res.data);
        registerUser(res.data.access_token);
    });
});

function registerUser(token){
    
}