const express = require('express');
const router = express();

const {Assign,Property, Account} = require("../model.js");


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

//view property - tenant
router.get("/viewprop",async (req,res)=>{
    const propData = await Property.find({_id:req.query.propid}).lean();
    var o_id = propData[0].owner_id;
    var accData = await Account.find({_id:o_id});
    propData[0].o_name = accData[0].name;
    res.end(JSON.stringify(propData));

})

//view property - owner
router.get("/viewpropo",async (req,res)=>{
    const propData = await Property.find({_id:req.query.propid}).lean();
    var t_id = propData[0].tenant_id;
    var accData = await Account.find({_id:t_id});
    propData[0].t_name = accData[0].name;
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


//called when agreeement is terminated
router.post("/uTIDandAssign",(req,res)=>{
    //for updating tenant_id and updating assign
    Property.updateOne({_id:req.query.propid},{$set:{
        tenant_id: "",
        p_status: "Not Assigned",
    }},(err,resp)=>{
        if(err){
            console.log(err);
            res.status(400).json({ err: 'Termination backend error!' });
        }
        else{
            res.status(200).json("prop. updated!");
        }
    })
})


router.post("/delProp",(req,res)=>{
    Property.deleteOne({_id:req.query.propid},(err,resp)=>{
        if(err){
            res.status(400).json({ err: 'Could not delete' });
        }
        else{
            res.status(200).json("property deleted!");
        }
    });
    
})



//deleting from assign table

router.delete("/delAssign",(req,res)=>{
    Assign.deleteOne({p_id:req.query.propid},(err,resp)=>{
        if(err){
            res.status(400).json({ err: 'Could not terminate' });
        }
        else{
            res.status(200).json("property ag. deleted!");
        }
    });
    
});


module.exports = router;