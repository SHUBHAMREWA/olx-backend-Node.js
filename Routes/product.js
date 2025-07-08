

import express from "express"  ;
import { addProduct , getProduct } from "../Controller/product.js";
import multer from "multer"; 
import path from "path"


const route = express.Router() ;



// multer Configuration  for image Upload

const storage = multer.diskStorage({
  destination: "./public/uploads" ,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + path.extname(file.originalname) 
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


  const upload = multer({ storage : storage })  ; 


route.post("/product-details"  , upload.single("productImage") , addProduct ) ; 

route.get("/allProducts"  , getProduct )   


export default route ;
