const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true,
    
    },
    email:{
        type: 'string',
        required: true,
        lowercase: true,
    },
    password:{
        type: 'string',
        required: true,
    }
})

const User =  mongoose.model('users',UserSchema)

module.exports = User