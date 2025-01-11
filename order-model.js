import mongoose from "mongoose";

const Schema = mongoose.Schema
const OrderSchema = new Schema({
    Order:{
        type:Schema.Types.ObjectId
    },
    user: {
        type: Schema.Types.ObjectId,
        
        ref: 'users'
    },
    orderItems:
        [
            {
                product:{
                    type:Schema.Types.ObjectId,
                    ref:'products'
                },
                product_name: {
                    type: String,
                    
                },
                description:{
                    type:String,
                },
                image:{
                    type: String,
                    
                },
                quantity: {
                    type: Number,
                    
                },
                price:{
                    type: Number,
                     
                },
                stock:{
                    type:Number
                }
            }
        ],
    
    shipping: {
        address: {
            type: String,
            ref:'users'
            
        },
        country: {
            type: String,
            
        },
        postalcode:{
            type:Number,
            
        },
        city: {
            type: String,
            
        }
    },
    payment_method: {
        type: String,
       
    },
    payment_result: {
        id: { type: String },
        status: { type: String },
        update_time: { type: String },
        email_adress: { type: String },
    },
    items_price: {
        type: Number,
        
        default: 0.0
    },
    tax_price: {
        type: Number,
        
        default: 0.0
    },
    delivery_price: {
        type: Number,
        
        default: 0.0
    },
    total_price: {
        type: Number,
        
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        
        default: 0.0
    },
    
    paidAt: { type: Date },

    isDelivered: {
        type: Boolean,
        
        default: 0.0
    },
    deliveredAt:{
        type:Date,
    },
    date:{
        type:String,
        default:new Date().toLocaleString('en-NZ')
       }
}, {
    timestamps: true
})

const OrderList = mongoose.model('order', OrderSchema)
export default OrderList