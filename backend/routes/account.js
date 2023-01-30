const express = require('express');

const router = express();

router.get("/",(req,res)=>{
    res.send("<h1>Hello Account</h1>");
})

router.post("/signup",(req,res)=>{
    
})



module.exports = router;