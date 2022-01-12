const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 8080;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

app.use(router);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    console.log(message);
    io.emit("emit", `${message}`);
  });
});
