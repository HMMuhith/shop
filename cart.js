import express from "express";
import CartModel from "./Cart-model.js";

const router3=express.Router()

router3.post('/',(req,res)=>{
    const proid=req.body.product_id
    CartModel.findById(proid).then(product=>
        req.user.addToCart(product)
    )
})

router3.get('/',(req,res)=>{
    const proid=req.body.product_id
    CartModel.findById(proid)
    .then(user=>
        req.user=user
    )
})

router3.get('/user',(req,res)=>{
    req.user
    .populate('cart.items.product_id')
    .execPopulate()
    .then(user=>res.json(user))
})

router3.delete('/',(req,res)=>{
    const proId=req.body.product_id 
    req.user.removeCart(proId).then((result)=>res.json({message:`${result}`}))
})
export default router3