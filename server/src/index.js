const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
  path: "/notes/",
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("emit", `${message}`);
  });
});

http.listen(8080, () => console.log("listen 8080"));
