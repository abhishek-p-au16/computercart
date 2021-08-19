const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { secretkey } = process.env;

module.exports = {
  userSignup: async (req, res) => {
    user = req.body;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    console.log(user);

    const newUser = new UserModel(user);
    newUser.save((err, newUser) => {
      if (err) {
        return res.status(400).json({ message: err });
      }
      res.json({ newUser });
      console.log(newUser);
    });
  },

  userlogin: (req, res) => {
    UserModel.findOne({ email: req.body.email }, (err, data) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, error: "Error while login" });
      if (!data)
        return res
          .status(500)
          .send({ auth: false, error: "no user found, register first" });
      else {
        const passIsValid = bcrypt.compareSync(req.body.password,data.password);
        if (!passIsValid) {
          return res
            .status(500)
            .send({ auth: false, error: "Invalid Password" });
        }
        let token = jwt.sign({ id: data.id }, secretkey, { expiresIn: 86400 });
        return res
          .status(200)
          .send({
            id: data.id,
            name: data.username,
            email: data.email,
            role: data.role,
            token: token,
          });
      }
    });
  },

  userLogout: (req, res) => {
    res.clearcookie("t");
    res.json({ message: "logout success" });
  },
};
