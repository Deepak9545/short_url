
const express = require("express");

const path =require("path");

const cookieParser = require("cookie-parser");
const{connectTomongodb} = require("./connect");

const {restricttologgedinuseronly, checkauth}=require("./middleware/auth");

const URL = require("./models/url");

const urlRoute = require("./routes/url");
const staticRoute =require("./routes/staticrouter")
const userRoute= require("./routes/user");
const app= express();
const port= 8001;

connectTomongodb("mongodb://localhost:27017/short-url").then(() => console.log("mongodb connected")
);
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended:false}));
// app.get("/test",async(req,res)=>{
//     const allurls =await URL.find({});
//     return res.render("home",{
//         urls:allurls,
//     });
// })   test url pr jane se use hoga eska
app.use(cookieParser());
app.use("/url",restricttologgedinuseronly,urlRoute);
app.use("/user",userRoute);
app.use("/",checkauth,staticRoute);

app.get("/url/:shortId",async (req,res)=>{
const shortId= req.params.shortId;
 const entry=await URL.findOneAndUpdate({
    shortid: shortId
},{$push:{
    visithistory:{
        timestamp: Date.now(),
    },
    
},
}
);

res.redirect(entry.redirectURL);
})

app.listen(port,() =>console.log(`server started at ${port}`)
);