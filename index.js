
import express from "express";
import mongoose from "mongoose"  ;
import userRoutes from "./Routes/user.js" ; 
import productRoute from "./Routes/product.js"
import {config} from "dotenv"  ;
import cors from "cors"  ;
import { v2 as cloudinary } from 'cloudinary' ;



const app = express() ;


 config({path : ".env"})
  
app.use(express.json())


 
    //Cloudinary  Configuration

    cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_URL.split("@")[1], 
    api_key: process.env.CLOUDINARY_URL.split("://")[1].split(":")[0],
    api_secret: process.env.CLOUDINARY_URL.split(":")[2].split("@")[0]
    });



mongoose.connect( process.env.MONGO_URL , {
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
app.use("/" , productRoute)





const PORT = 3500 ;

app.listen(PORT , ()=>console.log(`server is running on port ${PORT}`))