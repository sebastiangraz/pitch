const http = require("http").createServer();

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "https://brandpresentation.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("emit", `${message}`);
  });
});

http.listen(process.env.PORT || 8080, () => console.log("listen 8080"));
