const express = require('express');
const router = express.Router();
const {User,Pallet} = require('../models');
const jwt = require("jsonwebtoken")
const colord = require("colord")
const harmonies = require("colord/plugins/harmonies")
colord.extend([harmonies])
//findall
router.get('/',(req,res)=>{
    Pallet.findAll({
        include:[User]
    }).then(pals=>{
        const withPallets = pals.map(pal=>pal.get({plain:true})).map(pal=>{
            const harmonies = colord.colord(pal.seedColor).harmonies("tetradic").map(col=>{
                return {
                    color:col.toHex(),
                    isDark:col.isDark()
                }
            })
            return {
                ...pal,
                harmonies
            }
        })
        // console.log(withPallets)
        res.json(withPallets)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"womp womp",err})
    })
})
//find one
router.get('/:id',(req,res)=>{
    Pallet.findByPk(req.params.id,{
        include:[User]
    }).then(pal=>{
        if(!pal){
            return res.status(404).json({msg:"no such pallet"})
        }
        const plainData = pal.get({plain:true});
        const harmonies = colord.colord(plainData.seedColor).harmonies("tetradic").map(col=>{
            return {
                color:col.toHex(),
                isDark:col.isDark()
            }
        })
        // console.log(withPallets)
        res.json({
            ...plainData,
            harmonies
        })
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

//edit
router.put("/:id", async (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        const pallet = await Pallet.findByPk(req.params.id);
        console.log('data: ',data)
        console.log('==============================')
        console.log('pallet: ',pallet)
        console.log('------------------------------')
        if(pallet.UserId!==data.userId){
            throw new Error("not your pallet!")
        } else {
            const updatedPal = await Pallet.update(req.body,{
                where:{
                    id:req.params.id
                }
            })
            res.json(updatedPal)
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token or not your pallet",err})
    }
})

//delete
router.delete("/:id",async (req,res)=>{
    const token = req.headers.authorization?.split(" ")[1];
    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        const pallet = await Pallet.findByPk(req.params.id);
        console.log('data: ',data)
        console.log('==============================')
        console.log('pallet: ',pallet)
        console.log('------------------------------')
        if(pallet.UserId!==data.userId){
            throw new Error("not your pallet!")
        } else {
            const delPal = await Pallet.destroy({
                where:{
                    id:req.params.id
                }
            })
            res.json(delPal);
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({msg:"bad token or not your pallet",err})
    }
})

module.exports = router;