const express = require('express');
const router = express.Router();
const {User, Pallet} = require('../models');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

router.get("/",(req,res)=>{
    User.findAll().then(users=>{
        res.json(users)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"womp womp",
            err
        })
    })
})

//create account
router.post("/",(req,res)=>{
    User.create({
        username:req.body.username,
        password:req.body.password
    }).then(newser=>{
        const token = jwt.sign({
            username:newser.username,
            userId:newser.id
        },process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        res.json({
            token,
            user:newser
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"womp womp",
            err
        })
    })
})
// login
router.post("/login",(req,res)=>{
    console.log('req.body: ',req.body)
    User.findOne({
        where:{
        username:req.body.username
    }}).then(foundUser=>{
        console.log(foundUser)
        if(!foundUser){
            return res.status(401).json({msg:"invalid login"})
        }else if(!bcrypt.compareSync(req.body.password,foundUser.password)){
            return res.status(401).json({msg:"invalid login"})
        } else{
            const token = jwt.sign({
                username:foundUser.username,
                userId:foundUser.id
            },process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            res.json({
                token,
                user:foundUser
            })
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            msg:"womp womp",
            err
        })
    })
})

// get profile
router.get("/profile",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        User.findByPk(data.userId,{
            include:[Pallet]
        }).then(foundUser=>{
            res.json(foundUser)
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token",err})
    }
})

module.exports = router;