const model = require("../model/user");
const User = model.User;
var jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "../private.key"),
  "utf-8"
);

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign(
    { email: req.body.email },
    process.env.SECRET
    //   {
    //   algorithm: "RS256",
    // }
  );
  const hash = bcrypt.hashSync(req.body.password, 10);
  user.token = token;
  user.password = hash;
  try {
    const savedUser = await user.save();
    console.log(savedUser); // Log the saved user if needed
    res.status(201).json({
      data: savedUser,
      message: "User added successfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, user.password);
    if (isAuth) {
      var token = jwt.sign({ email: req.body.email }, process.env.SECRET);
      user.token = token;
      user.save();
      res.json({
        data: { email: user.email, token: token },
        message: "login successful!",
      });
    } else {
      res.sendStatus(401).json({
        message: err,
      });
    }
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(401).json({
      message: err,
    });
  }
};
