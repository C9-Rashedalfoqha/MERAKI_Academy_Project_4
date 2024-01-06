const jobModel = require("../models/jobSchema");
const createPostJob = (req, res) => {
  const { filterTitle, title, jobAddress, description, salary, photo, userId } =
    req.body;
  const newJob = new jobModel({
    filterTitle,
    title,
    jobAddress,
    description,
    salary,
    photo,
    userId,
  });
  newJob
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `job Created Successfully`,
        job: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: err,
      });
    });
};
const getAllJob = (req, res) => {
  jobModel
    .find()
    .populate("userId", "Email")
    .then((result) => {
      res.status(200).json({
        message: "All the post",
        posts: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: Err,
      });
    });
};
const getJobById = (req, res) => {
  const { id } = req.params;
  jobModel
    .findById({ _id: id })
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the post for userId",
        job: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

module.exports = { createPostJob, getAllJob, getJobById, updateJob };
