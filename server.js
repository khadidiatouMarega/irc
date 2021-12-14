const app = require('express')();
const server = require('http').createServer(app);

const io = require('socket.io')(server);

io.on("connexion", () => {
    console.log("un nouveau est arrivé")
});

server.listen("3000", () => console.log("en attente"));