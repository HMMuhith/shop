import mongoose from "mongoose"
import mongooseUniqueValidator from "mongoose-unique-validator"

const Schema=mongoose.Schema
const userprofileschema=new Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true  
    },
    password:{
        type:String,
        required:true
    },
   isAdmin:{
    type:Boolean,
    default:false
   },
   date:{
    type:String,
    default:new Date().toLocaleString('en-NZ')
   },
}
)

userprofileschema.plugin(mongooseUniqueValidator)
const UserProfile=mongoose.model('users',userprofileschema)
export default UserProfile