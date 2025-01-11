import mongoose from "mongoose"
import uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema
const Cartschema = new Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                product_id: {
                    type: Schema.Types.ObjectId,
                    ref: 'products'
                },
                quantity: {
                    type: Number
                },
                date: {
                    type: Date,
                    default: Date.now()
                }

            }
        ]
    }
})


Cartschema.methods.addToCart = function (product) {
    const cartIndex = this.cart.items.findIndex(cp => {
        return cp.product_id.toString() === product._id.toString()
    })
    let newQuantity = 1
    const updatedCartItems = [...this.cart.items]
    if (cartIndex >= 0) {
        newQuantity = this.cart.items[cartIndex].quantity + 1
        updatedCartItems[cartIndex].quantity = newQuantity
    }
    else {
        updatedCartItems.push({
            product_id: product._id,
            quantity: newQuantity
        })
    }

    this.cart.items = updatedcart
    this.save()
}

Cartschema.methods.removeCart = function (product) {
    const updatedItems = this.cart.items.filter(item => {
        return item.product_id.toString() === product._id.toString()
    })
    this.cart.items = updatedItems
    return this.save()
}

Cartschema.methods.clearCart=function(){
    this.cart={items:[]}
    return this.save()
}

Cartschema.plugin(uniqueValidator)
const CartModel = mongoose.model('bookedcart', Cartschema)
export default CartModel