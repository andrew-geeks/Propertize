const express = require('express');
const router = express();

const {Property,Maintenance} = require("../model.js");

router.post("/maintainprop",(req,res)=>{
    const addMaintain = new Maintenance({
        p_id: req.body.p_id,
        u_id: req.body.u_id,
        m_date: req.body.m_date,
        m_type: req.body.m_type,
        m_description: req.body.description,
        priority: req.body.priority,
        m_status: "Not Completed"
    });

    addMaintain.save((err)=>{
        if(err){
            console.log(err);
            res.status(400).json({ err: 'Error in insertion!' });
        }
        else{
            res.status(200).json({message:"success!"})
        }
    })
})

//get maintenance requests
router.get("/getRequests",async (req,res)=>{
    const reqData = await Maintenance.find({u_id:req.query.uid}).lean();
    var p_id;
    var i = 0;

    //inserting prop. name
    for(i=0;i<reqData.length;i++){
        p_id = reqData[i]["p_id"]
        var propData = await Property.findOne({_id:p_id});
        reqData[i].p_name = propData.p_name;
    }
    
    res.end(JSON.stringify(reqData));

})



module.exports = router;