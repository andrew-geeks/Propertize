const express = require('express');
const router = express();
var datetime = new Date();

const {Property,Maintenance} = require("../model.js");

router.post("/maintainprop",(req,res)=>{

    

    const addMaintain = new Maintenance({
        p_id: req.body.p_id,
        u_id: req.body.u_id,
        o_id: req.body.o_id, //owner id
        m_date: datetime.toISOString().slice(0,10),
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

//get maintenance requests --owner
router.get("/getAllRequests",async (req,res)=>{
    const reqData = await Maintenance.find({o_id:req.query.oid}).lean();
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


//get pending maintenance requests
router.get("/getPenRequests",async (req,res)=>{
    const reqData = await Maintenance.find({o_id:req.query.oid,m_status:"Not Completed"}).lean();
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

//setting complete!
router.post("/setcomplete",(req,res)=>{
    Maintenance.updateOne({_id:req.query.mid},{$set:{m_status:"Completed"}},
    (err,resp)=>{
        if(err){
            console.log(err)
            res.status(400).json({ err: 'Could not update status!' });
        }
        else{
            res.status(200).json("status updated");
        }
    });
    
});

//delete maintenance rec.
router.post("/delmaintenance",(req,res)=>{
    Maintenance.deleteOne({p_id:req.query.propid},(err,resp)=>{
        if(err){
            res.status(400).json({err: 'could not delete'});
        }
        else{
            res.status(200).json("maintenance rec. deleted");
        }
    })
})



module.exports = router;