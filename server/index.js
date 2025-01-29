const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const PORT = process.env.PORT || 8080;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Track all active rooms and their states
const activeRooms = new Map(); // Map<roomName, { users: Set<socketId>, colorMode: string }>

server.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});

app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  //handle rooms
  const userRooms = new Set();

  // Send current rooms to newly connected client
  socket.emit("room_list", Array.from(activeRooms.keys()));

  socket.on("create_room", (data) => {
    if (data && !activeRooms.has(data)) {
      userRooms.add(data);
      socket.join(data);
      activeRooms.set(data, {
        users: new Set([socket.id]),
        colorMode: "light",
      });
      // Broadcast updated room list to all clients
      io.emit("room_list", Array.from(activeRooms.keys()));
      console.log(`User ${socket.id} created and joined room ${data}`);
    }
  });

  socket.on("join_room", (data) => {
    if (data && activeRooms.has(data)) {
      userRooms.add(data);
      socket.join(data);
      const roomData = activeRooms.get(data);
      roomData.users.add(socket.id);
      // Send current room state to the joining user
      socket.emit("updateMode", { mode: roomData.colorMode });
      console.log(`User ${socket.id} joined existing room ${data}`);
    }
  });

  socket.on("remove_room", (roomName) => {
    if (activeRooms.has(roomName)) {
      activeRooms.delete(roomName);
      io.emit("room_list", Array.from(activeRooms.keys()));
      // Notify all clients in the room that it's being removed
      io.to(roomName).emit("room_removed", roomName);
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
    if (data.room && userRooms.has(data.room) && activeRooms.has(data.room)) {
      const roomData = activeRooms.get(data.room);
      roomData.colorMode = data.mode;
      socket.to(data.room).emit("updateMode", data);
    }
  });

  socket.on("disconnect", () => {
    // Clean up user's rooms
    for (const room of userRooms) {
      if (activeRooms.has(room)) {
        const roomData = activeRooms.get(room);
        roomData.users.delete(socket.id);
        // If room is empty, remove it
        if (roomData.users.size === 0) {
          activeRooms.delete(room);
          io.emit("room_list", Array.from(activeRooms.keys()));
        }
      }
    }
    userRooms.clear();
  });
});
