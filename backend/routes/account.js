const express = require('express');
const bcrypt = require('bcrypt');
const mail = require('../Mail.js');
var crypto = require('crypto');

const dotenv = require('dotenv');
dotenv.config();

const router = express();
const saltRounds = 11;
const {Account,Property} = require("../model.js")


router.get("/getId",(req,res)=>{
    var mail = req.query.mail;
    Account.findOne({email:mail},(err,found)=>{
        if(found){
            res.end(JSON.stringify({id:found._id,actype:found.actype}))
        }
        else{
            res.status(400).json({ err: 'Invalid email' });
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
            actype : "owner",
            rtoken: "",
        });

        newAcc.save((err)=>{
            if(err){
                res.status(400).json({ err: 'That email is already in use!' });
                
            }
            else{
                try{
                    mail.WelcomeBusiness(req.body.email);
                }
                catch{
                    
                }
                
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
            actype : "tenant",
            rtoken: "",
        });

        newAcc.save((err)=>{
            if(err){
                res.status(400).json({ err: 'That email is already in use!' });
            }
            else{
                try{
                    mail.Welcome(req.body.email)
                }
                catch{

                }
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

router.post("/forgotpassword",(req,res)=>{
    Account.findOne({email:req.body.email},(err,found)=>{
        if(found){
            res.status(200).json("mail sent")
            //create token
            const token = crypto.randomBytes(20).toString('hex');
            mail.resetPassword(req.body.email,token) //sending mail with link-token
            //saving token in db
            Account.updateOne({email:req.body.email},{$set:{rtoken:token}},(err,res)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("success");
                }
            });
            
        }
        else{
            res.status(400).json({ err: 'invalid email!' });
        }
    })
})

router.get("/checktoken",async (req,res)=>{
    const data = await Account.find({rtoken:req.query.rtoken});
    res.end(JSON.stringify(data));
})

router.post("/setnewpassword",async(req,res)=>{
    bcrypt.hash(req.body.pswd, saltRounds, (err, hash)=> {
        Account.updateOne({rtoken:req.query.rtoken},{$set:{password:hash}},
        (err,resp)=>{
            if(err){
                console.log(err)
                res.status(400).json({ err: 'Could not update password!' });
            }
            else{
                res.status(200).json("password updated");
            }
        })
    });
}) 

router.post("/remToken",async (req,res)=>{
    Account.updateOne({rtoken:req.query.rtoken},{$set:{rtoken:""}},
        (err,resp)=>{
            if(err){
                console.log(err)
                res.status(400).json({ err: 'token removal failed!' });
            }
            else{
                res.status(200).json("token removed!");
            }
        })
    
})

module.exports = router;