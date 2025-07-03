const mongoose = require('mongoose')

const mongodb = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
    }
})

const file = mongoose.model("auth-db",mongodb)

module.exports = file;