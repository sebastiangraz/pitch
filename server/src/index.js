import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("emit", `${message}`);
  });
});

httpServer.listen(process.env.PORT || 8080, () => console.log("listen 8080"));
