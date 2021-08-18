const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretkey = require("../authentication/secretkey");

module.exports = {
  userSignup: async (user) => {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    console.log(user);

    const newUser = new UserModel(user);
    const saveduser = await newUser.save();
    console.log(saveduser);
  },

  userlogin:(req, res) => {
    UserModel.findOne({email : req.body.email},(err, data) => {
        if(err) return res.status(500).send({auth : false, error : "Error while login"})
        if(!data) return res.status(500).send({auth : false, error : "no user found, register first"})
        else{
            const passIsValid = bcrypt.compareSync(req.body.password, data.password)
            if(!passIsValid){
                return res.status(500).send({auth : false,error : "Invalid Password"})
            }
            let token = jwt.sign({id: data.id},secretkey, {expiresIn: 86400})
            return res.status(200).send({auth : true, token: token})
        }
    })
}
  // userLogin: (data) => {
  //   UserModel.findOne({ email: data.email }, (err, user) => {
  //     if (!user) {
  //       return res.status(401).json({ error: "User not found" });
  //     }

  //     validpass = bcrypt.compare(data.password, user.password);
  //     if (!validpass) {
  //       return res.status(500).json({ error: "invalid password" });
  //     }
  //     console.log(user);
  //     let token = jwt.sign({ id: user }, secretkey, { expiresIn: 500000 });
  //     return token;
  //     //return res.status(200).send({auth:true, token:token})

  //     //return res.status(200).send({auth : true, token: token})
  //   });
  // },
};
