const express = require("express");
const router = express.Router();
const userHelper = require("../helpers/userHelper");
const authenticate = require("../authentication/authentication");

router.get("/signup", (req, res) => {
  res.send("signup page");
});

router.post("/signup", async (req, res) => {
  try {
    userHelper.userSignup(req.body);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.send("error occured");
  }
});

router.get("/login", (req, res) => {
  res.json({ success: "login form" });
});


router.post("/login",userHelper.userlogin)

// router.post("/login", (req, res) => {
//   console.log(req.body);
//   userHelper.userLogin(
//     req.body
    // UserModel.findOne({email: req.body.email},(err,user)=>{
    //     if(!user){
    //         return res.status(401).json({ error: 'User not found'})
    //     }

    //     validpass = bcrypt.compare(req.body.password,user.password)
    //     if(!validpass){ return res.status(500).json({ error: 'invalid password'})}
    //     console.log(user);
//   );
//   // let token = jwt.sign({id:user}, secretkey, {expiresIn: 500000})
//   //     return res.status(200).send({auth : true, token: token})
//   // })
// });

router.get("/cart", authenticate, (req, res) => {
  res.send({ products: "cart products" });
});
// const secretkey = "qwerdfghbnm"
// function generatejwt(payload) {

//     return jwt.sign(payload,secretkey,{expiresIn:'60s'})
// }
// function authenticateToken(req,res,next){
//    try{
// const authToken = req.headers.authorization
// console.log(authToken)
// if(!authToken){ return res.json({error:true})}
// const veryfied = jwt.verify(authToken,secretkey)
// console.log(veryfied)
// next()
// }
//     catch(err){
//         res.json({error:true})
//     }
//  }

module.exports = router;
