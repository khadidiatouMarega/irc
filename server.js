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
        socket.on('join', ({ name, room }, callback) => {
 
          const { error, user } = addUser(
              { id: socket.id, name, room });
   
          if (error) return callback(error);
   
          // Emit will send message to the user
          // who had joined
          socket.emit('message', { user: 'admin', text:
              `${user.name},
              welcome to room ${user.room}.` });
   
          // Broadcast will send message to everyone
          // in the room except the joined user
          socket.broadcast.to(user.room)
              .emit('message', { user: "admin",
              text: `${user.name}, has joined` });
   
          socket.join(user.room);
   
          io.to(user.room).emit('roomData', {
              room: user.room,
              users: getUsersInRoom(user.room)
          });
          callback();
      });

server.listen(3000, () => {
  console.log('Le server est lancé sur le port 3000');
});

// https://socket.io/get-started/private-messaging-part-1/