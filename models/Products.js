const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    productname:{
        type: 'string',
        required: true,
    
    },
   price:{
        type: int,
        required: true,
       
    },
   discription:{
        type: 'string',
        required: true,
    },

    catagory:{
        type: 'string',
        required: true,
    },
    reviews:{type:'string', 
    required: true}
})

const User =  mongoose.model('products',UserSchema)

module.exports = User