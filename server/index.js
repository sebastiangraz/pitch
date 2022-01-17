const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    const parsed = JSON.parse(message);
    io.emit("emit", parsed);
  });
  socket.on("slide", function (msg) {
    io.sockets.emit("updateSlide", msg);
  });
  socket.on("mode", function (msg) {
    io.sockets.emit("updateMode", msg);
  });
});
