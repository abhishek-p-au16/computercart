require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieparser = require("cookie-parser");
const fileupload = require("express-fileupload");
const userRouter = require("./routers/user");
const adminRouter = require("./routers/admin");
//const validater = require("express-validater");

const { DB_URL } = process.env;
mongoose.connect(
  DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  async (err) => {
    if (err) throw err;
    console.log("connected to database");
  }
);


app.use(cookieparser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileupload())
//app.use(validater());

app.use("/users", userRouter);
app.use("/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("home computerCart");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started");
});
