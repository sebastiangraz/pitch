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
let activeHomepageRoom = null; // Track which room is currently active on homepage

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
  // Send current active homepage room
  socket.emit("active_homepage_room", activeHomepageRoom);

  socket.on("create_room", (data) => {
    if (data && !activeRooms.has(data)) {
      userRooms.add(data);
      socket.join(data);
      activeRooms.set(data, {
        users: new Set([socket.id]),
        colorMode: "light",
      });
      // Set as active homepage room
      activeHomepageRoom = data;
      // Broadcast updated room list and active room to all clients
      io.emit("room_list", Array.from(activeRooms.keys()));
      io.emit("active_homepage_room", activeHomepageRoom);
      console.log(`Room created: ${data} (active homepage room)`);
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
      socket.emit("active_homepage_room", activeHomepageRoom);
      console.log(
        `Room joined: ${data} (active homepage: ${activeHomepageRoom})`
      );
    }
  });

  socket.on("remove_room", (roomName) => {
    if (activeRooms.has(roomName)) {
      activeRooms.delete(roomName);
      // If removed room was active homepage room, clear it
      if (activeHomepageRoom === roomName) {
        activeHomepageRoom = null;
        io.emit("active_homepage_room", null);
      }
      io.emit("room_list", Array.from(activeRooms.keys()));
      // Notify all clients in the room that it's being removed
      io.to(roomName).emit("room_removed", roomName);
      console.log(`Room removed: ${roomName}`);
    }
  });

  console.log(`Connected to server`, socket.id);
  console.log("Rooms: ", socket.rooms.size);

  // handle notes
  socket.on("message", function (data) {
    if (data.room && userRooms.has(data.room)) {
      const parsed = data.payload;
      // Broadcast to all clients in the room, including sender
      io.in(data.room).emit("emit", parsed);
    }
  });

  socket.on("slide", function (data) {
    console.log("Received slide event:", data);
    console.log("User rooms:", Array.from(userRooms));
    console.log("Socket rooms:", Array.from(socket.rooms));
    if (data.room && userRooms.has(data.room)) {
      console.log("Broadcasting slide update to room:", data.room);
      // Broadcast to all clients in the room, including sender
      io.in(data.room).emit("updateSlide", data);
    } else {
      console.log("Failed to broadcast - Room check failed:", {
        room: data.room,
        hasRoom: userRooms.has(data.room),
      });
    }
  });

  socket.on("home", function (data) {
    console.log("Received home event:", data);
    if (data.room && userRooms.has(data.room)) {
      console.log("Broadcasting home update to room:", data.room);
      // Broadcast to all clients in the room, including sender
      io.in(data.room).emit("goHome", data);
    }
  });

  socket.on("mode", function (data) {
    console.log("Received mode event:", data);
    if (data.room && userRooms.has(data.room) && activeRooms.has(data.room)) {
      console.log("Broadcasting mode update to room:", data.room);
      const roomData = activeRooms.get(data.room);
      roomData.colorMode = data.mode;
      // Broadcast to all clients in the room, including sender
      io.in(data.room).emit("updateMode", data);
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
          console.log(`Room deleted (empty): ${room}`);
        }
      }
    }
    userRooms.clear();
  });
});
