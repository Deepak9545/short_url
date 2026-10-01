
const express= require("express");
const{handleusersignup, handleuserLogin}= require("../controllers/user")
const router= express.Router();

router.post("/",handleusersignup);

router.post("/login", handleuserLogin);

module.exports=router;