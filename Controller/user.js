
import { User } from "../Model/User.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"  ;


export const signup = async(req , res)=>{

     const {username , password}  = req.body  ;

     if(username == "" || password == "") return res.send({  message : "please fill all Input" , success  : false  }) ;

     let userResponse  = await User.findOne({username :  username}) ;
 
     if(userResponse) return res.send({
         message : "user already Exist try to login OR create other user" ,
         success: false
     })  


     let hashPassword = await bcrypt.hash(password , 10)  ;
     

      userResponse = await User.create({ username : username , password : hashPassword})  ;   


     if(!userResponse)  res.send({ 
            message : "User not save" ,
            success : false
     })



     res.send({
           message :  "user Saved Successful"  , 
           userResponse ,
           success: true
     })    

}


export const loginController = async(req ,res)=>{
          
    const {username , password}  =  req.body ;
  
     if(username == ""  || password == "")  return res.send({  
           message : "please submit valid username  & password " ,
           success : false 
     })  


     let checkEmail  = await User.findOne({username : username})  ;

     if(!checkEmail)  return res.send({
          message : "user not found" , 
          success : false
     })
       
     let checkPassword  = await bcrypt.compare(password , checkEmail.password) ;

     if(!checkPassword) return res.status(401).send({ 
         message : "Wrong password" , 
         success : false
     })   

     let token = jwt.sign({user : checkEmail._id} , process.env.LOGIN_TOKEN_KEY ,  { expiresIn: "1d" })

     res.send({
         message : "Login success" , 
         token ,
         success : true
     })

}