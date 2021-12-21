const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

 app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

  io.on('connection', (socket) => {
        //     socket.on('message', (msg) => {
        //       console.log("Nouveau message : " + msg);
        //         socket.broadcast.emit("message", msg);
        //     });
        // console.log('Un nouveau utilisateur est arrivé');
        // socket.on('disconnect', () => {
        //   console.log('Un utilisateur est parti');
        // });
        
      });

server.listen(3000, () => {
  console.log('Le server est lancé sur le port 3000');
});

// https://socket.io/get-started/private-messaging-part-1/