const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true
    },
    phonenumber:{
        type:String,
        required:true
    },
    flag:{
        type:String,
        required:true
    },
    flagname:{
        type:String,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const user = new mongoose.model('users', userSchema)
module.exports = user