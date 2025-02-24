import express from "express";
import ProductList from "./product-model.js";
import multer from "multer";
import mongoose from "mongoose";
import Auth,{Admin} from "./auth.js";


const router2=express.Router()

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
cb(null,'Shop/public/BackendImage')
    },
    filename:(req,file,cb)=>{
         cb(null,file.originalname)
    }

})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpg'){
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}
// const storage=multer.memoryStorage()
const upload = multer({ storage:fileStorage,fileFilter})

router2.post('/',upload.single('image'), async(req,res)=>{

    const product= new ProductList({
        product_name:req.body.product_name,
        description:req.body.description,
        image:req.file?.filename,
        price:req.body.price,
        stock:req.body.stock
    })
    console.log(req.file)
    console.log(req.body.product_name)
   const result= await product.save() 
   
   return res.send(result)

})


router2.delete('/:productID',async(req,res)=>{
    const proid=req.params.productID
    await ProductList.findByIdAndDelete(proid)
//     const product=await ProductList.findById(proid)
//     if(product){
//    await ProductList.deleteOne({_id:product._id})

   return res.status(200).json({error:'product deleted'})
    
})


router2.post('/:productID/reviews',Auth,async(req,res)=>{
    const {rating,comment}=req.body
    const proID=req.params.productID
    const product=await ProductList.findById(proID)
    if(product){
         const reviewed=product.reviews.find((review)=>
           review.user._id.toString()===req.user.id.toString()

         )
         if(reviewed){
            return res.status(400).json({error:`Already reviwed`})
         }
         const review={
            name:req.user.Name,
            rating:Number(rating),
            comment,
            user:req.user.id
         }
         product.reviews.push(review)
         product.NumberReviews=product.reviews.length
         product.rating=Math.trunc(product.reviews.reduce((prevR,currentR)=> prevR+currentR.rating,0)/product.reviews.length)
         const result=await product.save()
        return res.status(200).json(result)
    }
    res.status(404).json({error:`Resource not found`})
})

router2.get('/',async(req,res)=>{
    const itemsperpage=3
    const page=req.query.pagenumber || 1
    const keyword=req.query.keyword ? {product_name :{$regex:req.query.keyword , $options:"i"}}:{}
    const products= await ProductList.find({...keyword}).skip((page-1) * itemsperpage).limit(itemsperpage).populate('product_name').exec()
    const count=await ProductList.countDocuments({...keyword})
    const highestpage=Math.ceil(count/itemsperpage)
     return res.json({products,page,highestpage})
})

router2.get('/top',async(req,res)=>{
const TopProduct=await ProductList.find().sort({rating:-1}).limit(3)
res.status(200).json(TopProduct)
})


router2.get('/productsapproval', async(req,res)=>{
    const products=await ProductList.find({})
    if(products){
        
    return res.status(200).json(products)
    }
    return res.status(404).json({error:'No product found'})
    })


router2.get('/:productID',async(req,res)=>{
    const proID=req.params.productID
  const product=await ProductList.findById(proID)
   return res.status(200).json(product)

})
 

router2.put('/:productID',upload.single('image'),async(req,res)=>{
    const proid=req.params.productID
    try{
   const product=await ProductList.findById(proid)
   if(product){
        product.product_name=req.body.product_name,
        product.description=req.body.description,
        product.image=req.file?.filename,
        product.price=req.body.price,
        product.stock=req.body.stock
    } 
    const result= await product.save()
    res.json(result)
}
catch(err){
    res.json({Error:err})
}
})




// router2.delete('/delete',async(req,res)=>{
//     const ID=req.params._id
//     const deletedresult=await ProductList.findByIdAndDelete(ID)
//     return res.json(deletedresult)
// })

export default router2 
  
    