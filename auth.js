import jwt from 'jsonwebtoken'


const Auth=(req,res,next)=>{

   try{
    //  const Token=req.headers.authorization.split(' ')[1]
    let Token
     Token=req.cookies.JWT
    const decoded=jwt.verify(Token,process.env.SECRET_KEY)
    req.user={Name:decoded.Name,id:decoded.id,email:decoded.email,isAdmin:decoded.isAdmin}
    if(!req.user.isAdmin){
     return next()
    }
    return res.status(401).json({Error:`Not Authorized`})
}
catch(err){
res.status(401).json({error:err})
}

}

const Admin=(req,res,next)=>{
  try{
    // const Token=req.headers.authorization.split(' ')[1]
    let Token
     Token=req.cookies.JWT
   const decoded=jwt.verify(Token,process.env.SECRET_KEY)
   req.user={Name:decoded.Name,email:decoded.email,id:decoded.id,isAdmin:decoded.isAdmin}
   if(req.user.isAdmin){
   
    return next()
   }
   return res.status(401).json({error:'Not Admin authorized'})
}
catch(err){
res.status(401).json({error:'Admin authentication required'})
}
}

export default Auth
export {Admin}