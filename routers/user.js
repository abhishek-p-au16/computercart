const express = require('express');
const router = express.Router();
const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretkey = "asdfghjklzxcv"

router.get('/signup',(req, res)=>{
    res.send("signup page")
})

router.post('/signup',async(req, res)=>{
    try {
        //user = req.body
        
       
        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(req.body.password,salt)
        req.body.password = hashedPassword
        console.log(req.body)

        const newUser = new UserModel(req.body)
        const saveduser = await newUser.save()
        console.log(saveduser) 
        res.redirect('/')
    }catch (error) {
        console.log(error)
        res.send("error occured")

    }

})


router.get('/login',(req, res)=>{
    res.json({success:"loginpage"})
})

router.post('/login',(req, res)=>{
    console.log(req.body)
    UserModel.findOne({email: req.body.email},(err,user)=>{
        if(!user){
            return res.status(401).json({ error: 'User not found'})
        }

        validpass = bcrypt.compare(req.body.password,user.password)
        if(!validpass){ return res.status(500).json({ error: 'invalid password'})}
        console.log(user);
        //res.redirect('/')
        // usero={username:user.username,
        //     password:user.password}
        // const token  = generatejwt(usero)
        // console.log(token);
        // res.status(200).send({auth:true,token:token})
       
        let token = jwt.sign({id:user}, secretkey, {expiresIn: 500000})
            return res.status(200).send({auth : true, token: token})
    })

    

})

router.get('/cart',authenticateToken,(req, res)=>{
    res.send({products:"cart products"})
})
// const secretkey = "qwerdfghbnm"
// function generatejwt(payload) {
    
//     return jwt.sign(payload,secretkey,{expiresIn:'60s'})
// }
function authenticateToken(req,res,next){
   try{ 
const authToken = req.headers.authorization
console.log(authToken)
if(!authToken){ return res.json({error:true})}
const veryfied = jwt.verify(authToken,secretkey)
console.log(veryfied)
next()
}
    catch(err){
        res.json({error:true})
    }
 }


module.exports =router