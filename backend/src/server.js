import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log("User connected with socket id ", socket.id);

  socket.on("sendMessage", (message) => {
    console.log("sended message is : ", message);
    socket.emit("sendMessage", message);
  });

  io.on("disconnect", () => {
    console.log("User disconnected is has socket id ", socket.id);
  });
});

server.listen(5001, () => console.log("running on port 5001"));
