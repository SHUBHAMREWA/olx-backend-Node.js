
import express from "express"  ;
const router  = express.Router() ;

import { signup , loginController} from "../Controller/user.js";


  

router.use("/signup" , signup )

router.use("/login" , loginController)





export default router  ; 