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
const updateJob = (req, res) => {
  const { id } = req.params;
  const { filterTitle, title, jobAddress, description, salary, photo } =
    req.body;
  jobModel
    .findByIdAndUpdate(
      { _id: id },
      filterTitle,
      title,
      jobAddress,
      description,
      salary,
      photo
    )
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: `job with id => ${id} not found`,
        });
      }
      res.status(202).json({
        success: true,
        message: "updated job",
        job: result,
      });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ success: false, message: `Server Error`, err: err.message });
    });
};
const deleteJob = (req, res) => {
  const { id } = req.params;
  jobModel
    .findByIdAndDelete({ _id: id })
    .then((result) => {
      if (!result) {
        res.status(404).json({
          success: false,
          message: `job with id => ${id} not found`,
        });
      }
      res.status(200).json({
        success: true,
        message: `job deleted`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: `Server Error`,
        err: err.message,
      });
    });
};
module.exports = { createPostJob, getAllJob, getJobById, updateJob, deleteJob };
