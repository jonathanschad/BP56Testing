var io = require("socket.io")(3001);

io.on("connection", function(socket) {
  socket.on("new message", function(msg) {
    socket.broadcast.emit("new message", msg);
  });

  socket.on("disconnect", function() {
    console.log("someone disconnected");
  });
});
