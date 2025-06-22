import express from 'express'
import router1 from './SignUp.js'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router2 from './product.js'
import router3 from './cart.js'
import router4 from './order.js'
import path from 'path'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import session from 'express-session'
import ConnectMongoDBSession from 'connect-mongodb-session'

dotenv.config()


const mongoURL=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.k4lgw6j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURL)
.then(()=>{console.log(`MongoDB connected`)}) 
.catch(()=>{console.log(`connection problem`)})
const app = express()
const port =process.env.PORT || 8000

const __dirname=path.resolve()
const MongoDBStore=ConnectMongoDBSession(session)
const store=new MongoDBStore({
    uri:mongoURL,
    collection:'sessions'
})


app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(session(
    {
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false,
    store
}))

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','https://shop-lilac-ten.vercel.app')
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, X-HTTP-Method-Override,Origin,Authorization,Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Credentials',true)
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE,OPTIONS')
    next()
})



app.use('/shop/user',router1 )

app.use('/shop/product',router2)

app.use(cookieParser()) 

app.use('/shop/cart',router3)

app.use('/shop/order',router4)

app.get('/shop/payment/paypal', (req,res)=>{
    res.send({client_id:process.env.PAYPAL_CLIENT_ID})
})
app.use('/Shop/public/BackendImage',express.static(path.join(__dirname,'public','BackendImage')))


app.use(express.static(path.join(__dirname,'Shop','public')))

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'Shop','dist')))

    app.use('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'Shop','dist','index.html'))
        
    })
    
     
}

app.listen( port, () => {
    console.log(`Server running at ${port}`)
})


