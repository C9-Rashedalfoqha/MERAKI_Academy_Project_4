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
    role,
  } = req.body;
  const newUser = new usersModel({
    FirstName,
    lastName,
    Email,
    password,
    phoneNumber,
    Experience,
    Skills,
    role,
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
    .findOne({ Email })
    .populate("role")
    .exec()
    .then((result) => {
      if (!result) {
        res.status(403).json({
          success: false,
          message:
            "The email doesn't exist or The password you’ve entered is incorrect`",
        });
      } else {
        console.log(result);
        // console.log(result);
        bcrypt.compare(password, result.password).then((info) => {
          if (!info) {
            return res.status(403).json({
              success: false,
              message:
                "The email doesn't exist or The password you’ve entered is incorrect`",
            });
          } else {
            const payload = {
              userId: result._id,
              FirstName: result.FirstName,
              role: result.role,
            };
            console.log(payload);
            const options = {
              expiresIn: "7d",
            };
            const token = jwt.sign(payload, process.env.SECRET, options);
            res.status(200).json({
              success: true,
              message: `Valid login credentials`,
              token: token,
            });
          }
        });
      }
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
