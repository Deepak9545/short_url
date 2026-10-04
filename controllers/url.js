const {nanoid}= require("nanoid");
const URL= require('../models/url');

async function handleGeneratenewshortURL(req,res){
const body = req.body;
if(!body.url) return res.status(400).json({error: "url is required"})
    const shortID= nanoid(8);
await URL.create({
    shortid:shortID,
    redirectURL:body.url,
    visithistory:[],
    createdBy: req.user._id,
});
return res.render("home",{
    id: shortID,
});
//return res.json({ id: shortID});   
}
async function handeleanalytic(req,res) {
    const shortId= req.params.shortId;
   const result= await URL.findOne({ shortid: shortId});
   return res.json({totalcliks: result.visithistory.length,
    analytics: result.visithistory,
   })
}
module.exports={
     handleGeneratenewshortURL,
     handeleanalytic,
}