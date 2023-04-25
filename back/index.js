import  express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import  Cors  from "cors";
import dotenv from "dotenv";
import PostRoutes from './routes/Posts.js'

import userRoutes from './routes/Users.js'
const app =express()
dotenv.config()
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(Cors())
app.use('/posts' ,PostRoutes)
app.use('/user' , userRoutes)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true ,useUnifiedTopology:true})
.then(()=>app.listen(PORT , console.log(`server runing on port :${PORT}`)))
.catch((e)=> console.log(e.message))
