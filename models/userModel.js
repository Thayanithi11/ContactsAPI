const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'Please add the user name'],
        unique:[true,'Username already taken']
    },
    email:{
        type:String,
        required:[true,'Please add the user Email'],
        // unique:[true,'EMail address already taken']
    },
    password:{
        type:String,
        required:[true,"Please add user Password"]
    },
},{
    timestamps:true,
});

module.exports=mongoose.model("User",userSchema)
