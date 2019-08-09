const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    residential_address:{
        type:String,
        required:true
    },
    date_of_birth:{
        type:String,
        required:true
    },
    occupation:{
        type:String,
        required:true
    },
    phone_number:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    marital_status:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    cash_check:{
        type:String,
        required:true
    },
    income_monthly:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('User', userSchema)