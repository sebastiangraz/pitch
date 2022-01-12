const http = require("http").createServer();
console.log("server");
const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("emit", `${message}`);
  });
});

http.listen(process.env.PORT || 8080, () => console.log("listen 8080"));
