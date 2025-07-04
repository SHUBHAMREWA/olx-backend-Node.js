
import { User } from "../Model/User.js"
import bcrypt from "bcryptjs";


export const signup = async(req , res)=>{

     const {username , password}  = req.body  ;

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

     res.send({
         message : "Login success" , 
         success : false 
     })

}