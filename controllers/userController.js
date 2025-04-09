const asyncHandler=require('express-async-handler')
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const User=require('../models/userModel')
const bcrypt=require('bcrypt')

//@desc Register user
//@route POST /api/users/register
//@acess public
const handleRegisterUser=asyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username||!email||!password){
            res.status(400);
            throw new Error("All fields are mandatory")
        }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("Email already exsist")
    }
    //HashPassword
     const hashedPassword=await bcrypt.hash(password,10)
        const user=await User.create({
            username,email,
            password:hashedPassword
        })
        if(user){
            res.status(201).json({_id:user.id,email:user.email})
        }
        else{
            res.status(500)
            throw new Error(`Couldn't create the user ${user.username}`)
        }
})

//@desc Login user
//@route POST /api/users/login
//@acess public
const handleLoginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
            res.status(400);
            throw new Error("All fields are mandatory")
        }
    const user=await User.findOne({email})
    if(user &&(await bcrypt.compare(password,user.password))){
       const accessToken=jwt.sign({
          user:{
            username:user.username,
            email:user.email,
            id:user.id
          }
       },process.env.ACCESS_TOKEN,
         {expiresIn:"30m"})
        res.status(200).json({accessToken});
    }
    else{
    res.status(401)
    throw new Error("Email or password is not valid")
    }
})

//@desc Login user
//@route POST /api/users/userinfo
//@acess private
const handleShowUserInfo=asyncHandler(async (req,res)=>{
   res.json(req.user)
})

module.exports={handleRegisterUser,handleLoginUser,handleShowUserInfo}