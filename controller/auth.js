const model = require("../model/user");
const User = model.User;
var jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  var token = jwt.sign({ email: req.body.email }, "shhhhh");
  user.token = token;
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
