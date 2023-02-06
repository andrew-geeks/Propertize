const express = require('express');
const bcrypt = require('bcrypt');


const router = express();
const saltRounds = 11;
const {Account} = require("../model.js")


router.get("/getId",(req,res)=>{
    var mail = req.query.mail;
    Account.findOne({email:mail},(err,found)=>{
        if(found){
            res.end(JSON.stringify({id:found._id}))
        }
    })
})


router.get("/getActype",(req,res)=>{
    var id = req.query.id;
    Account.findOne({_id:id},(err,found)=>{
        if(found){
            res.end(JSON.stringify({actype:found.actype}))
        }
    })
})



router.post("/bsignup", (req,res)=>{
    
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
        const newAcc = new Account({
            name : req.body.name,
            email : req.body.email,
            password : hash,
            actype : "owner"
        });

        newAcc.save((err)=>{
            if(err){
                res.status(400).json({ err: 'That email is already in use!' });
            }
            else{
                res.status(200).json({message:"success!"})
            }
        })
    });
})




router.post("/signup", (req,res)=>{
    
    bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
        const newAcc = new Account({
            name : req.body.name,
            email : req.body.email,
            password : hash,
            actype : "tenant"
        });

        newAcc.save((err)=>{
            if(err){
                res.status(400).json({ err: 'That email is already in use!' });
            }
            else{
                res.status(200).json({message:"success!"})
                
            }
        })
    });
})

router.post("/login",(req,res)=>{
    Account.findOne({email:req.body.email},(err,found)=>{
        if(found){
            bcrypt.compare(req.body.password,found.password,(err,result)=>{
                if(result === true){
                    //correct pass
                    res.status(200).json({message:"success!"})
                }
                else{
                    res.status(400).json({ err: 'wrong email/password!' });
                }
            })
        }
        if(err){
            res.send(err)
        }
    })
})



module.exports = router;