
import mongoose from "mongoose" ;

const schema = mongoose.Schema({
         productName  : String ,
         productDescription : String ,
         productPrice : String ,
         productcategory : String , 
         productImage : String ,
         createdAt  : {type : Date , default: Date.now} 
})

const Product = mongoose.model("product" , schema) ;

export default Product ;