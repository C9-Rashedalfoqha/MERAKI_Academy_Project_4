const usersModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
    .findOne({ Email})
    .then((result) => {
      if (!result) {
        res.status(403).json({
          success: false,
          message:
            "The email doesn't exist or The password you’ve entered is incorrect`",
        });
      }
      bcrypt.compare(password, result.password).then((result) => {
        if (!result) {
          return res.status(403).json({
            success: false,
            message:
              "The email doesn't exist or The password you’ve entered is incorrect`",
          });
        }
        const payload = {
          userId: result._id,
          FirstName: result.FirstName,
          role: result.role,
        };
        const options = {
          expiresIn: "7d",
        };
        const token = jwt.sign(payload, process.env.SECRET, options);
        res.status(200).json({
          success: true,
          message: `Valid login credentials`,
          token: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err,
      });
    });
};
module.exports = {
  register,
  login,
};
