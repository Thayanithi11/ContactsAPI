const express=require('express')
const {handleRegisterUser,
    handleLoginUser,
    handleShowUserInfo,}=require('../controllers/userController')
const validateToken=require('../middlewares/validateTokenHandler')
const router=express.Router()

router.post('/register',handleRegisterUser)

router.post('/login',handleLoginUser)

router.get('/userinfo',validateToken,handleShowUserInfo)

module.exports=router;