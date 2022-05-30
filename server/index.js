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
  //handle rooms
  console.log(`Connected to server`, socket.id);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  // socket.on("disconnect", () => {
  //   console.log(`Disconnected from server`, socket.id);
  // });

  // handle notes
  socket.on("message", function (data) {
    const parsed = JSON.parse(data.payload);
    socket.to(data.room).emit("emit", parsed);
  });
  socket.on("slide", function (data) {
    socket.to(data.room).emit("updateSlide", data);
  });
  socket.on("home", function (data) {
    io.emit("goHome", data);
  });
  socket.on("mode", function (data) {
    io.emit("updateMode", data);
  });
});
