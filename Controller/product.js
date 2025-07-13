
import Product from "../Model/Product.js";  
import { v2 as cloudinary } from 'cloudinary' ;
import jwt from "jsonwebtoken" ;
import mongoose from "mongoose";


export const addProduct = async(req ,  res) =>{  
      
      //  const file = req.file.path ; 
        const token = req.headers.authorization ;

       const verifyToken  = jwt.verify(token ,  process.env.LOGIN_TOKEN_KEY ) ;

      //  console.log( "this is verify Token" , verifyToken)

      // return ;
       if(!verifyToken) return res.send({ message : "user not valid"  , success : false })
 
        // return ;
       const file  = req.files ;

      //  console.log(file)
       
        let photos  = [] ;



       const { productName , productDescription , productPrice , productcategory }   =  req.body  ;

       if( productName == "" || productDescription == "" || productPrice == "" ||  productcategory == "") {
           return res.send({
             message : "file fill all input field" ,
               success : false 
           })
       }


       if(file){

              for(let el of file){
                  
                 try{
                     
                   let cloudinaryres = await cloudinary.uploader.upload(el.path , {folder : "OLX-product"}) ;

                   photos.push(cloudinaryres.secure_url)

                 }
                 catch(error){
                       
                  //  console.log(error) ;
                   return res.send({
                          message: "Upload failed",
                          success: false
                        });

                 }
              }
       }

    //  console.log(photos)
      
      let mongoRes =  await Product.create({ productName , productDescription ,
         productPrice , productcategory , productImage : photos ,  addedBy : new mongoose.Types.ObjectId(verifyToken.user)  }
         ) ; 

        //  console.log( "MONGODB RESPONSE" , mongoRes) ;
         
         if(!mongoRes) return res.send({
              message : "Product not Uploaded" ,
              success: false
         })   
     

         res.send({
             message : "Product upload successfull" ,
            data :   mongoRes ,
             success : true 
         })
       
}



export const getProduct = async(req ,res)=>{
             
     let getAllProduct = await Product.find() ;
     
     if(!getAllProduct) return res.send({
         message : " product not found " ,
         success : false
     }) 
   
     res.send({
         message : "all Product fetch" , 
         products : getAllProduct ,
          sucesss : true 
     })
            
}



export const getSingleProduct = async(req ,res)=>{ 

    let id = req.params.id  ;


     let pDetails  = await Product.findOne({_id : id}).populate("addedBy") ;
 
     
     if(!pDetails)  res.send({
          message : "product details not found" ,
          success : false
     })

     res.send({
          message  : "product details founded" ,
          success : true  , 
          data : pDetails
     })
             
          
        
}



export const  getSearchProduct = async(req ,res)=>{

      let value = req.query.value ;
      if(!value) return res.send({
            message : "please enter Value" , 
            success : false
      })
      
    let products = await Product.find({
                $or : [
                       { productName  : {  $regex : value  , $options : "i"} } , 
                       {productDescription : { $regex : value , $options : "i"}} , 
                       { productcategory : {$regex : value , $options  : "i"}}
                ]
    })

    res.send({
      message : "Product found Successful" ,
      products : products ,
      success : true
    })
}



export const getSearchByCategory = async(req , res)=>{   

       let value = req.query.catename ; 
        
        let categoryProducts = await Product.find({productcategory : { $regex : value , $options : "i"}}) ;

       if(!categoryProducts) return res.send({
          message : "Product not found", 
          success : false
       }) 

        res.send({
            massage : "Product founded" ,
            success  : true , 
            categoryProducts : categoryProducts 
        })
    
}