import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import routes from "../Routes/index.mjs"
import dotenv from 'dotenv';
import { Server } from 'socket.io'
import http from 'http'

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

// ========================================================================Socket.io ==================================================================================
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // ضع هنا عنوان تطبيق الـ React  المصدر المسموح له بإجراء الطلبات
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true // السماح بإرسال بيانات الاعتماد مثل ملفات تعريف الارتباط
  }
});
let onlineUsers = [];
io.on("connection", (socket) => {
  console.log("connected with socket.io " + socket.id);
  console.log("==============================================");
  // تحديد المستخدمين الموجودين اونلاين من اخلال استلام بعض البيانات من الواجهة  الاماميه 
  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    // console.log("onlineUsers", onlineUsers);
    io.emit("getOnlineUsers", onlineUsers);
  });
  // send messages and receive
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      // io.to(user.socketId).emit("getNotification", {
      // senderId: message.senderId,
      // isRead:false,
      // date:new Date(),
      // });
    }
  });
  // قطع اتصال المستخدمين الذين لم يعودو متصلين 
  // عند فصل المستخدم
  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
    console.log("disconnected with socket.io");
    console.log("==============================================");
  });
});
// ========================================================================##Socket.io ==================================================================================

dotenv.config();
// const MongoAtlas =`mongodb+srv://${process.env.MongoDB_UserName}:${process.env.MongoDB_Password}@cluster0.o4y6kq7.mongodb.net/chatApp?retryWrites=true&w=majority&appName=Cluster0`;
const MongoAtlas = process.env.ATLAS_URI;
mongoose
  .connect(MongoAtlas)
  .then(() => {
    console.log("connected to database")
    console.log("==============================================");
  })
  .catch((err) => {
    console.log(`mongoDB connection failed ${err}`)
    console.log("==============================================");
  })


app.get("/", (request, response) => {
  response.send({ msg: "welcome to Chat app" })
})

app.get("/api", (request, response) => {
  response.json("Chat app api")


})


const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log("==============================================");
  console.log(`reunning on PORT ${PORT}`);
  console.log("==============================================");
})