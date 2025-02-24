import express from "express";
import OrderList from "./order-model.js";
import Auth, { Admin } from "./auth.js";
import fs from 'fs'
import path from "path";
import doc from "pdfkit";

const router4 = express.Router()
const paypalclient_id = `tdydytdyyd`
const __dirname=path.resolve()
router4.post('/',Auth,async (req, res) => {
    const {orderItems,shipping, payment_method, delivery_price, items_price, tax_price, total_price
    } = req.body
    
    if (orderItems && orderItems.length === 0) {
        res.status(400).json({ message: `No ordered yet` })
    }
    else {

        const order = new OrderList({
            user:req.user.id,
            orderItems:orderItems?.map((item)=>(
                {
                 ...item,
                 product:item._id,
                 _id:undefined
                }
            )),    
            shipping,
            payment_method,
            delivery_price,
            items_price,
            tax_price,
            total_price
        })
      const result = await order.save();


        return res.json(result)
    }
})

router4.patch('/', async (req, res) => {
    const Order = await OrderList.findById(req.params.productID)
    if (Order) {
        Order.isPaid = true
        Order.paidAt = Date.now()
        Order.payment_result = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_adress: req.body.email_adress
        }
        const updateOrder = await Order.save()
        res.status(200).json(updateOrder)
    }
    else {
        res.status().json({ Error: `No order found` })
    }
}
)

router4.get('/myorders',Auth, async (req, res) => {
    const result = await OrderList.find({ user: req.user.id }).populate('user','Name')
    res.status(200).json(result)
})


router4.get('/',Admin, async (req, res) => {
    const result = await OrderList.find({}).populate('user','Name')
    res.status(200).json(result) 
})



router4.put('/:orderID/deliver', async(req,res)=>{
    const order= await OrderList.findById(req.params.orderID)
    if(order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
        const updatedOrder=await order.save()
        return res.status(200).json(updatedOrder)
    }
    return res.status(404).json({error:'Order not found'})
})


router4.get('/:orderID', async (req, res) => {
    try {
        const response = await OrderList.findById(req.params.orderID).populate('user','id Name email')
        res.status(200).json(response)

        const invoicename=`invoice- ${req.params.orderID}+ .pdf`
        const invoicepath=path.join(__dirname,'Document',invoicename)
        // fs.readFile(invoicepath,(err,data)=>{
        //     if (err) throw err
        //     res.setHeader('Content-Type','application/pdf')
        //     res.setHeader('Content-Disposition','attachment;filename="'+invoicename+'" ')
        //     res.send(data)
        // })
        // const file=fs.createReadStream(invoicepath)
        res.setHeader('Content-Type','application/pdf')
            res.setHeader('Content-Disposition','attachment;filename="'+invoicename+'" ')
            file.pipe(res)
            doc.pipe(fs.createWriteStream(invoicepath))
            doc.pipe(res)
            doc.fontSize(26).text('Invoice',{
                underline:true
            })
            doc.text('--------------------')
            doc.end()
    }
    catch (err) {
        res.status(200).json(`message:${err}`)
    }
}) 


router4.get('/payment', (req, res) => res.json({ clientId: paypalclient_id }))

export default router4


