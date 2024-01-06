const usersModel = require("../models/users");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const {
    FirstName,
    lastName,
    Email,
    password,
    phoneNumber,
    Experience,
    Skills,
  } = req.body;
  const newUser = new usersModel({
    FirstName,
    lastName,
    Email,
    password,
    phoneNumber,
    Experience,
    Skills,
  });
  newUser
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Account Created Successfully`,
        account: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: `The email already exists`,
      });
    });
};
const login = (req, res) => {
  const { Email, password } = req.body;
  usersModel
    .findOne({ Email, password })
    .then((result) => {
      res
        .status(201)
        .json({ success: true, message: "Valid login credentials" });
    })
    .catch((err) => {
      res
        .status(401)
        .json({ success: false, message: "Invalid login credentials" });
    });
};
module.exports = {
  register,
  login,
};
