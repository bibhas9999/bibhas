import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes";
import blogRouter from "./model/blog-router";

const app = express();
app.use(express.json());
app.use("/api/user",router);
app.use("/api/blog",blogRouter);
mongoose
    .connect(
    "mongodb+srv://bibhasdhula1:Q3ZeB7c95sHeW4tZ@cluster0.vdo1dvk.mongodb.net/Blog?retryWrites=true&w=majority"
).then(()=>app.listen(5500))
.then(()=>console.log('connect To Database and Listening To Localhost 5500'))
.catch((err)=>console.log('err'));


//bibhasdhula1
//Q3ZeB7c95sHeW4tZ