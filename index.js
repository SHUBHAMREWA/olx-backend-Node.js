
import express from "express";
import mongoose from "mongoose"  ;
import { User } from "./Model/User.js"  ;
import userRoutes from "./Routes/user.js" ; 
import {config} from "dotenv"  ;
import cors from "cors"  ;

const app = express() ;

 config({path : ".env"})
  
app.use(express.json())


mongoose.connect(process.env.MONGO_URL , {
         dbName : "OlxProject"
})
.then(()=>{
       console.log("MongoDB is connected")
})
.catch((error)=>{
       console.log(error)
})

 
app.use(cors())

app.use("/" , userRoutes)





const PORT = 3500 ;

app.listen(PORT , ()=>console.log(`server is running on port ${PORT}`))