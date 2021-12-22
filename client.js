var socket = require("socket.io-client")("http://localhost:3000");
const repl = require("repl");
const chalk = require("chalk");
var username = null;


socket.on("connect", () => {
  username = process.argv[2]
  console.log(chalk.red("=== start chatting ==="));
  socket.emit("user", username);
});
socket.on("disconnect", function () {
  socket.emit("disconnect");
});
socket.on("message", function(data) {
      console.log(chalk.green(data));
});

repl.start({
  prompt: "",
  eval: (cmd) => {
    socket.send(cmd);
  },
});
