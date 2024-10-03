import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import routes from "../Routes/index.mjs"


const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)

mongoose
  .connect("mongodb://localhost:27017/express-test")
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
app.listen(PORT, () => {
  console.log("==============================================");
  console.log(`reunning on PORT ${PORT}`);
  console.log("==============================================");
})