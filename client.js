const io = require('socket.io-client')
const socket = io.connect("ws://localhost:3000");
 io.on("msg", () =>{
    console.log("Vous avez un nouveau message");
 })