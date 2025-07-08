
import express from "express" ;
import { likedController , getLikeProducts } from "../Controller/liked.js";

const route = express.Router() ;



route.post("/liked-products" ,  likedController) ; 
route.post("/get-liked-products" ,   getLikeProducts) ;

export default route  ;