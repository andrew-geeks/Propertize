const express = require('express');
const router = express();

const {Assign,Property} = require("../model.js");


router.get("/getProp",async (req,res)=>{
    var id = req.query.id;
    const propData = await Property.find({owner_id:id});
    res.end(JSON.stringify(propData));
})

router.get("/getSProp",async (req,res)=>{
    var pid = req.query.pid;
    const propData = await Property.find({_id:pid});
    res.end(JSON.stringify(propData));
})

//get assigned properties based on tenant_id
router.get("/getAProp",async (req,res)=>{
    const propData = await Property.find({tenant_id:req.query.tid});
    res.end(JSON.stringify(propData));
})

router.post("/assign",(req,res)=>{
    const newAssign = new Assign({
        p_id:req.body.p_id,
        u_id:req.body.u_id,
        o_id:req.body.o_id,
        tenure:req.body.tenure
    });

    newAssign.save((err)=>{
        if(err){
            res.status(400).json({ err: 'Could not assign!' });
        }
        else{
            res.status(200).json({message:"success!"})
        }
    })
})

router.post("/updateAssign",(req,res)=>{
    Property.updateOne({_id:req.query.pid},{$set:{
        p_status:"Assigned",
    }},(err,resp)=>{
        if(err){
            console.log(err)
            res.status(400).json({ err: 'Could not assign!' });
        }
        else{
            res.status(200).json("property_updated")
        }
    });
});

//updating tenant userid
router.post("/updateTID",(req,res)=>{
    Property.updateOne({_id:req.query.pid},{$set:{
        tenant_id:req.query.tid,
    }},(err,resp)=>{
        if(err){
            console.log(err)
            res.status(400).json({ err: 'TID updation error!' });
        }
        else{
            res.status(200).json("tid updated")
        }
    });
})

module.exports = router;