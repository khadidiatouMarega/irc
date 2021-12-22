const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  console.log("Un nouveau utilisateur est arrivé");

  socket.on("user", (username) => {
    socket.on("message", (data) => {
      socket.broadcast.emit("message", username + ' : ' + data);
    });
  });

  socket.on("disconnect", () => {
    console.log("Un utilisateur est parti");
  });
});

server.listen(3000, () => {
  console.log("Le server est lancé sur le port 3000");
});

// https://www.scaleway.com/en/docs/tutorials/socket-io/
// https://sodocumentation.net/socket-io/topic/9837/handling-users-with-socket-io
// https://socket.io/get-started/private-messaging-part-1/
