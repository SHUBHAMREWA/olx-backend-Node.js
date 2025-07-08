
import Product from "../Model/Product.js";  
import { v2 as cloudinary } from 'cloudinary' ;




export const addProduct = async(req ,  res) =>{  
      
       const file = req.file.path ;
       
       const { productName , productDescription , productPrice , productcategory }   =  req.body  ;

       if( productName == "" || productDescription == "" || productPrice == "" ||  productcategory == "") {
           return res.send({
             message : "file fill all input field" ,
               success : false 
           })
       }

      let cloudinaryRes = await cloudinary.uploader.upload(file , {folder : "OLX-product" }) ;
  
       if(!cloudinary)   return res.send({
             message : "image not uploaded" ,
               success : false 
           })
      
      let mongoRes =  await Product.create({ productName , productDescription ,
         productPrice , productcategory , productImage : cloudinaryRes.url}) ; 
         
         if(!mongoRes) return res.send({
              message : "Product not Uploaded" ,
              success: false
         })   

         res.send({
             message : "Product upload successfull" ,
            data :   mongoRes ,
             success : false
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