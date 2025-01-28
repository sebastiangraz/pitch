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
  const userRooms = new Set();

  socket.on("join_room", (data) => {
    if (data) {
      userRooms.add(data);
      socket.join(data);
      console.log(`User ${socket.id} joined room ${data}`);
    }
  });

  console.log(`Connected to server`, socket.id);
  console.log("Rooms: ", socket.rooms.size);

  // handle notes
  socket.on("message", function (data) {
    if (data.room && userRooms.has(data.room)) {
      const parsed = data.payload;
      socket.to(data.room).emit("emit", parsed);
    }
  });

  socket.on("slide", function (data) {
    if (data.room && userRooms.has(data.room)) {
      socket.to(data.room).emit("updateSlide", data);
    }
  });

  socket.on("home", function (data) {
    if (data.room && userRooms.has(data.room)) {
      socket.to(data.room).emit("goHome", data);
    }
  });

  socket.on("mode", function (data) {
    if (data.room && userRooms.has(data.room)) {
      console.log("mode", data);
      socket.to(data.room).emit("updateMode", data);
    }
  });

  socket.on("disconnect", () => {
    userRooms.clear();
  });
});
