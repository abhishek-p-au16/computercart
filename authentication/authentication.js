const jwt = require('jsonwebtoken');
const secretkey = require('./secretkey.js')


const authenticate = (req,res,next)=>{
        try{ 
     const authToken = req.headers.authorization
     console.log(authToken)
     if(!authToken){ return res.json({error:true})}
     const veryfied = jwt.verify(authToken,secretkey)
     console.log(veryfied)
     next()
     }
         catch(err){
             console.log(err)
             res.json({error:true})
         }
      }
     
module.exports = authenticate