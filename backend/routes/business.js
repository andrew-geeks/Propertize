const express = require('express');
const mail = require('../Mail.js');

const router = express();
const {Property} = require("../model.js")

const officegen = require('officegen');
const fs = require('fs');
const docx = officegen('docx');

var datetime = new Date();




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
            console.log(err);
            res.status(400).json({ err: 'Error in insertion!' });
        }
        else{
            //mail.addProp() include mail
            res.status(200).json({message:"success!"})
        }
    })
})

router.post("/updateProp",(req,resp)=>{
    Property.updateOne({_id:req.body.pid},{$set:{
        p_name:req.body.p_name,
        p_desc:req.body.p_desc,
        p_size:req.body.p_size,
        bhk:req.body.bhk,
        location:req.body.location,
        rent_amt:req.body.rent_amt,
        edit_date:datetime.getMonth()+1
    }},(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            console.log("property updated");
            resp.status(200).json("property_updated")
        }
    })
})

router.get("/delProp",(req,resp)=>{
    Property.deleteOne({_id:req.query.pid},(err,res)=>{
        if(err){
            console.log(err)
        }
        else{
            resp.status(200).json("property_deleted")
        }
    })
})

router.post("/gendocs",(req,res)=>{
    var p = docx.createP(); 
    p.addText('Rent Agreement\n',{bold:true});
    p.addText('Mr/Mrs/Ms. '+req.body.name+' residing at '+req.body.address+' is giving their property located at '+req.body.rentaddress+' to Mr/Mrs/Ms. '+req.body.tname+'\n with effect of '+req.body.sdate+' to '+req.body.edate+'.\n')
    p.addText('A rent amount of Rs.'+req.body.ramount+' has to be paid to the owner in a monthly basis on or before 5th of every month.\n');
    p.addText('With Regards\n'+req.body.name)    
    const out = fs.createWriteStream('C:/Users/andre/Downloads/agreement.docx');
    docx.generate(out);
    res.status(200).json("Agreement generated")
})


module.exports = router;