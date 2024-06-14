const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    registrationDate:{
        type:Date,
        default:Date.now()
    },
    verified:{
         type: Boolean,
          default: false }
})

module.exports = mongoose.model('users',Schema)