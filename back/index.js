import  Express  from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import  Cors  from "cors";
const app =Express()
app.use(bodyParser.json({limit:'30mb',extended:true}))
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}))
app.use(Cors())
const CONNECTION_URL ='mongodb+srv://lotus:mmndracula@lotus.roaq4k8.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true ,useUnifiedTopology:true})
.then(()=>app.listen(PORT , console.log(`server runing on port :${PORT}`)))
.catch((e)=> console.log(e.message))
