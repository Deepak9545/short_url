
const express= require("express")
const { handleGeneratenewshortURL, handeleanalytic}= require("../controllers/url")
const router= express.Router();

router.post("/",handleGeneratenewshortURL);
router.get("/analytics/:shortId",handeleanalytic)
module.exports= router;