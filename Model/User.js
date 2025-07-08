
import mongoose from "mongoose" ;



// this is user Signup schema & model  

const schema  = mongoose.Schema({
       username : {type : String , require : true }  , 
       password : {type : String , require : true} ,
       createdAt : { type : Date , default : Date.now} , 
       likedproducts : [{type: mongoose.Schema.Types.ObjectId , ref: "product" }]  
})



export  const User = mongoose.model("users" ,  schema) ;