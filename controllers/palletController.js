const express = require('express');
const router = express.Router();
const {User,Pallet} = require('../models');
const jwt = require("jsonwebtoken")

//findall
router.get('/',(req,res)=>{
    Pallet.findAll({
        include:[User]
    }).then(pals=>{
        res.json(pals)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"womp womp",err})
    })
})
//create
router.post("/",(req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        Pallet.create({
            seedColor:req.body.color,
            name:req.body.name,
            UserId:data.userId
        }).then(newPallet=>{
            res.json(newPallet)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({msg:"womp womp",err})
        })
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token",err})
    }
})

module.exports = router;