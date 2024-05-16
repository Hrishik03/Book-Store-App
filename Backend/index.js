import express, { request, response } from "express";
import {PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import {Book} from "./Models/bookModel.js";
import booksRoute from "./Routes/booksRoute.js";
import cors from "cors";
const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS policy
app.use(cors());//allows all origin with default of cors(*)

//middleware to allow custom origins
// app.use(
//   cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET','PUT','POST','DELETE'],
//     allowHeaders: ['Content-Type'],
//   })
// );

app.get("/",(request,response)=>{
    return response.status(234).send("Hello..!!");
})

app.use('/books', booksRoute);


mongoose
  .connect(mongoDBURL)
  .then(()=>{
    console.log("App connected to DB");
    app.listen(PORT, ()=>{
        console.log(`app started on port ${PORT}`);
    })
  })
  .catch((error)=>{
    console.log(error)
  });