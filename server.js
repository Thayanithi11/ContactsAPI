const express=require('express')
const dotenv=require("dotenv").config();
const router=require("./routes/contactRoutes")
const urouter=require("./routes/userRoutes")
const errorHandler=require('./middlewares/error')
const connectDB=require('./config/dbConnection');
const port=process.env.PORT || 5000

connectDB()
const app=express()
app.use(express.json())
app.use("/api/contacts",router)
app.use("/api/users",urouter)
app.use(errorHandler)

app.listen(port,()=>{
    console.log("Server running on port:",port)
})