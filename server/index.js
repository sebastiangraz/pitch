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

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  console.log(`Connected to server`, socket.id);
  console.log("Rooms: ", socket.rooms.size);

  // handle notes
  socket.on("message", function (data) {
    const parsed = data.payload;
    socket.to(data.room).emit("emit", parsed);
  });
  socket.on("slide", function (data) {
    socket.to(data.room).emit("updateSlide", data);
  });
  socket.on("home", function (data) {
    socket.to(data.room).emit("goHome", data);
  });
  socket.on("mode", function (data) {
    console.log("mode", data);
    socket.to(data.room).emit("updateMode", data);
  });
});
