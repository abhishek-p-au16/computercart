const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    user:{
        
        required: true,
    
    },
    shipping_address: [{address:{type:string, required:true},
                        pincode:{type:string, required:true},
                        mobile:{type:string, required:true},
                        email:{type:string, required:true}}],
    products:{type:object, required:true}

    

  
})

const User =  mongoose.model('orders',UserSchema)

module.exports = User