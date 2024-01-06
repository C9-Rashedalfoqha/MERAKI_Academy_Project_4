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

module.exports = {
  register,
  login,
};
