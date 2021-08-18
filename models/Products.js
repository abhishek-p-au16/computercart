const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  productname: {
    type: "string",
    required: true,
  },
  price: {
    type: "string",
    required: true,
  },
  discription: {
    type: "string",
    required: true,
  },

  catagory: {
    type: "string",
    required: true,
  },
  img_url: { type: "string", required: true },
});

const User = mongoose.model("products", UserSchema);

module.exports = User;
