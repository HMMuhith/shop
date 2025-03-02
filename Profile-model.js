import mongoose from "mongoose"


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



const UserProfile=mongoose.model('users',userprofileschema)
export default UserProfile