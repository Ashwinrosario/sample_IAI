const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/IAI').then(()=>{
    console.log('DB connection succesfull')
}).catch((e)=>{
    console.log('error occured', e)
})