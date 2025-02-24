import validator from 'validator'
import express from 'express';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UserProfile from './Profile-model.js';
import Auth,{ Admin } from './auth.js';

const router1 = express.Router()
const error = {}






router1.get('/profiles',Admin, async (req, res) => {
    const profile = await UserProfile.find({}, '-password')
    if (!profile) {

        return res.status(401).json({ message: `Not found Profile` })
    }

   return res.json({ Profiles: profile.length, users: profile })
     
})


router1.get('/profiles/:id', Admin, async (req, res) => {
    const ID = req.params.id
    try {
        const user = await UserProfile.findById(ID, '-password')
        res.json(user)
    }
    catch (error) {

    }
})

router1.put('/profiles',Auth, async (req, res) => {
   
    const id = req.user.id
    const profile = await UserProfile.findById(id)
    if (profile) {
       
            profile.Name = req.body.Name || profile.Name,
            profile.email = req.body.email || profile.email
     
        if(req.body.password){
        profile.password=req.body.password 
         }
        
        const updatedProfile=await profile.save()

       return res.status(200).json({
        _id:updatedProfile._id,
        Name:updatedProfile.Name,
        email:updatedProfile.email,
        isAdmin:updatedProfile.isAdmin
    })
    }
    return res.status(404).json({error:'user not found'})

}) 
 
router1.put('/admin/updateprofile/:id',Admin,async(req,res)=>{
const user=await UserProfile.findById(req.params.id)
const error={
    name:'',
    email:''
} 
if(user){
    if (!validator.isLength(req.body.Name, { min: 2, max: 30 })) {
        error.name = `value must be within 2 to 30 characters`
        return res.status(401).json({ error: error.name })
    }
    if (!validator.isEmail(req.body.email)) {
        error.email = `Email must include @ character`
        return res.status(401).json({ error: error.email })
    } 
user.Name=req.body.Name || user.Name
user.email=req.body.email  || user.email
// user.isAdmin=Boolean(req.body.isAdmin)
const updatebyAdmin=await user.save()
return res.status(200).json(updatebyAdmin)
}
return res.status(404).json({error:'user not found'})
})

router1.post('/signup', async (req, res) => {
    const { Name, email, password, confirm_password, isAdmin } = req.body
    if (validator.isEmpty(Name)) {
        error.name = `name field required`
        return res.status(401).json({ error: error.name })
    }
    if (!validator.isLength(Name, { min: 2, max: 30 })) {
        error.name = `value must be within 2 to 30 characters`
        return res.status(401).json({ error: error.Name })
    }
    if (validator.isEmpty(email)) {
        error.email = `Email field required`
        return res.status(401).json({ error: error.email })
    }   

    if (!validator.isEmail(email)) {
        error.email = `Email must include @ character`
        return res.status(401).json({ error: error.email })
    } 

    if (validator.isEmpty(password)) {
        error.password = `password field required`
        return res.status(401).json({ error: error.password })
    }

    if (!validator.isLength(password, { min: 4, max: 15 })) {
        error.password = `password must be between 4 to 15 characters`
        return res.status(401).json({ error: error.password })
    }
    if (validator.isEmpty(confirm_password)) {
        error.password = `confirm_password field required`
        return res.status(401).json({ error: error.password })
    }
    if (!validator.equals(password, confirm_password)) {
        error.confirm_password = `password must match`
        return res.status(401).json({ error: error.confirm_password })
    }
    const user = await UserProfile.findOne({ email })

    if (user) {
        return res.status(400).json({ error: `email already exists` })
    }
    const createdProfile = new UserProfile({
        Name,
        email,
        password,
        isAdmin
    })

    bcrypt.hash(createdProfile.password, 12, async (err, hash) => {
        if (err) throw err

        createdProfile.password = hash
        const profile = await createdProfile.save()
        return res.status(201).json({ user: profile })
    })



})

router1.post('/adminsign', async (req, res) => {
    const { Name, email, password, confirm_password, isAdmin = true } = req.body
    if (validator.isEmpty(Name)) {
        error.name = `name field required`
        return res.status(401).json({ error: error.name })
    }
    if (!validator.isLength(Name, { min: 2, max: 30 })) {
        error.name = `value must be within 2 to 30 characters`
        return res.status(401).json({ error: error.Name })
    }
    if (validator.isEmpty(email)) {
        error.email = `Email field required`
        return res.status(401).json({ error: error.email })
    }

    if (!validator.isEmail(email)) {
        error.email = `Email must include @ character`
        return res.status(401).json({ error: error.email })
    }

    if (validator.isEmpty(password)) {
        error.password = `password field required`
        return res.status(401).json({ error: error.password })
    }

    if (!validator.isLength(password, { min: 4, max: 15 })) {
        error.password = `password must be between 4 to 15 characters`
        return res.status(401).json({ error: error.password })
    }
    if (validator.isEmpty(confirm_password)) {
        error.password = `confirm_password field required`
        return res.status(401).json({ error: error.password })
    }
    if (!validator.equals(password, confirm_password)) {
        error.confirm_password = `password must match`
        return res.status(401).json({ error: error.confirm_password })
    }

    const user = await UserProfile.findOne({ email })

    if (user) {
        return res.status(400).json({ error: `email already exists` })
    }
    const createdProfile = new UserProfile({
        Name,
        email,
        password,
        isAdmin
    })

    bcrypt.hash(createdProfile.password, 12, async (err, hash) => {
        if (err) throw err

        createdProfile.password = hash
        const profile = await createdProfile.save()
        return res.status(201).json({ user: profile })
    })
 


})

router1.post('/login', async (req, res) => {
    const { email, password } = req.body

    const user = await UserProfile.findOne({ email })

    if (!user) {
        error.authentication = `User not found`
        return res.status(404).json({ error: error.authentication })
    }

    bcrypt.compare(password, user.password, (err, match) => {
        if (err) throw err
        if (match) {

            const payload = {
                id: user._id,
                Name: user.Name,
                email: user.email,
                password: user.password,
                isAdmin: user.isAdmin
            }
            return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: 5400 }, (err, token) => {
                if (err) {
                    return res.status(401).json({ error: err.message })
                }
                res.cookie('JWT',token,{
                    httpOnly:true,
                    secure:false,
                    sameSite:'Lax',
                    path:'/',
                    maxAge:30*24*60*60*1000
                })
                
                req.session.user_id=user._id
                // req.session.save(err=>{throw new err })
               
                res.status(200).json({ Success: true, Name: user.Name, email:user.email, id: user.id, isAdmin:user.isAdmin, token: `Bearer ${token}` })

            })

        }
        res.status(401).json({ err: `Password didnt match` })
    })


})

router1.post('/logout',(req,res)=>{
    res.cookie('JWT','',{
        httpOnly:true,
        expires:new Date(0)
    })
    req.session.user_id=null
    req.session.destroy()
    return res.status(200).json({Success:'Logged out successfully'})
})

router1.delete('/profiles/:id', Admin, async (req, res) => {
    const ID = req.params.id
    try {
        const user = await UserProfile.findByIdAndDelete(ID)
       
       return res.status(200).json(user)
    }
    catch (error) {
console.log(error)
    }
})
// router1.get('/check',(req,res)=>{
//     const token=req.headers.authorization
//     if(token){
//         const verification=jwt.verify(token,secretKey)
//         if(verification){
//             return res.status(200).json({Success:true,message:`Authentication verified`})
//         }
//      res.status(400).json({Error:`Invalid user`})
//     }
//      res.status(401).json({error:`Log in required`})
// })









export default router1  