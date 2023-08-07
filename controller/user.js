const model = require("../model/user");
const User = model.User;

exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  console.log(users);
  res.json(users);
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  try {
    res.status(200).json({
      data: user,
      message: "User fetched",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};

exports.replaceUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndReplace({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json({
      data: user,
      message: "user replaced sucessfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};
exports.updateUser = async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  try {
    res.json({
      data: user,
      message: "user updated sucessfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};
exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  const doc = await User.findOneAndDelete({ _id: id });
  try {
    res.json({
      data: doc,
      message: "user deleted sucessfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    res.status(400).json({
      message: err,
    });
  }
};
