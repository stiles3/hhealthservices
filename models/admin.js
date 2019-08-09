const config = require('config')
const jwt    = require('jsonwebtoken')
const Joi    = require('joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const saltRounds = 10

const AdminSchema = new Schema({
    name: {
        type:String,
        required:true,
        minlength:3,
        maxlength:50
    },

    email: {
        type: String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },

    password: {
        type: String,
        required:true,
        minlength:3,
        maxlength:255,
    },

    isAdmin: Boolean
})

AdminSchema.pre('save', function(next) {
    if(this.isNew || this.isModified('password')) {
        const document = this
        bcrypt.hash(document.password, saltRounds, 
            function(err, hashedPassword) {
                if(err) {
                    next(err)
                } else {
                    document.password = hashedPassword
                    next()
                }
            })
    } else{
        next()
    }
})

AdminSchema.methods.isCorrectPassword = function(password, callback){
    bcrypt.compare(password, this.password, function(err, same) {
        if(err) {
            callback(err)
        } else {
            callback(err, same)
        }
    })
}
module.exports = mongoose.model('Admin', AdminSchema)

/* AdminSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({
                            _id: this._id,
                            isAdmin: this.isAdmin
                         }, config.get('myprivatekey'))//get private key from config file
          return token   
}

const Admin = mongoose.model('Admin', AdminSchema)

function validateAdmin(admin) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(3).max(255).required(),
    }

    return Joi.validate(admin, schema)
}

exports.Admin = Admin
exports.validate = validateAdmin */