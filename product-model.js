import mongoose from "mongoose";

const Schema = mongoose.Schema

const reviewschema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    name: {
        type: String,

    },
    rating: {
        type: Number
    },
    comment: {
        type: String
    },
    date:{
        type:String,
        default:new Date().toLocaleString('en-NZ')
       }
})

const ProductModel = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    product_name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },

    stock: {
        type: Number
    },
    reviews: [reviewschema],
    rating:{
        type:Number,
        default:0
    },
    NumberReviews:{
        type:Number,
        default:0
    },
    date:{
        type:String,
        default:new Date().toLocaleString('en-NZ')
       }
}
)

const ProductList = mongoose.model('products', ProductModel)
export default ProductList