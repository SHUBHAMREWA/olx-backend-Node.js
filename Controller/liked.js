
import jwt from "jsonwebtoken" ; 
import {User} from "../Model/User.js"




export  const likedController = async(req ,res)=>{  
         
    let token = req.body.token ; 
    let productId = req.body.productId  
  
    let decode = jwt.verify(token , process.env.LOGIN_TOKEN_KEY) ;
 
    let updateLike = await User.updateOne(
        { _id : decode.user}  , 
        { $addToSet :  { likedproducts : productId  }}
    )
    
    if(!updateLike) return res.send({
         message : "Product no added to wishlist" , 
         success : false
    })

    res.send({
         message :  " Product added to wishlist" , 
         success: true 
    })
           

}


export const getLikeProducts = async(req, res)=>{
      
    let token = req.body.token ; 
     
    let decode = jwt.verify(token , process.env.LOGIN_TOKEN_KEY) ;

    if(!decode) return res.send({
           message :  "User not verify", 
           sucess : false
    })

    let getproducts = await  User.findOne({_id : decode.user}).populate("likedproducts") ; 

     if(!getproducts) return res.send({
         message : "User not found" , 
         success : false
     })

     res.send({
       message : "product fetch success" ,
       lproducts : getproducts.likedproducts , 
       success : true
     })
  

}
