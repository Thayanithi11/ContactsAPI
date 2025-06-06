const asyncHandler=require("express-async-handler")
const jwt=require('jsonwebtoken')

const validateToken=asyncHandler(async(req,res,next)=>{
     let token;
     let authHeader=req.headers.Authorization || req.headers.authorization
     if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1]
        if(!token){
            res.status(401);
            throw new Error("Token is missing in the request")
        }
        jwt.verify(token,process.env.ACCESS_TOKEN,(err,decoded)=>{
            if(err){
                res.status(401)
                throw new Error('User not Authorized')
            }
            req.user=decoded.user;
            next();
        })
     }
}
)

module.exports=validateToken