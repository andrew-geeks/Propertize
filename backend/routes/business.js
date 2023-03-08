const express = require('express');
const mail = require('../Mail.js');

const router = express();
const {Property} = require("../model.js")



router.get("/getProp",async (req,res)=>{
    var id = req.query.id;
    const propData = await Property.find({owner_id:id});
    res.end(JSON.stringify(propData));
})

router.post("/add",(req,res)=>{
    const addProp = new Property({
        owner_id : req.body.ownerid,
        p_name : req.body.p_name,
        p_desc : req.body.p_desc,
        area_type : req.body.area_type,
        p_type : req.body.p_type,
        p_size : req.body.p_size,
        bhk : req.body.bhk,
        location : req.body.location,
        rent_amt : req.body.rent_amt,
        p_status : req.body.p_status
    })

    addProp.save((err)=>{
        if(err){
            res.status(400).json({ err: 'Error in insertion!' });
        }
        else{
            //mail.addProp() include mail
            res.status(200).json({message:"success!"})
        }
    })
})

module.exports = router;