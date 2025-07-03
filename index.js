require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const router = require('./Routes/routes')

mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("DB connected")).catch((error)=>console.log(error))


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}))

app.use('/api',router)


app.get('/',(req,res)=>{
    res.send("Welcome to Mern Authentication ")
})

app.listen(process.env.PORT,()=>{
    console.log("successfully running")
})