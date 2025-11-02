import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connect", (socket) => {
  console.log("user connected");

  socket.on("newMessage", (message) => {
    console.log("message recieved is : ", message);
    io.emit("newMessage", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(5001, () => console.log("running on port 5001"));
