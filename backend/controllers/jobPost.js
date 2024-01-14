const jobModel = require("../models/jobSchema");
const postModel = require("../models/post");
const createPostJob = (req, res) => {
  const { filterTitle, title, jobAddress, description, salary, photo } =
    req.body;
  const { userId } = req.token;
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
    .populate("userId")
    .populate("comment")
    .exec()
    .then((result) => {
      if (result.length - 1 < 0) {
        res.status(404).json({
          success: false,
          message: "not found jobs ",
        });
      } else if (result.length >= 0) {
        res.status(200).json({
          message: "All the post",
          posts: result,
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    });
};
const getJobById = (req, res) => {
  const userId = req.token.userId;
  jobModel
    .find({ userId: userId })
    .then((result) => {
      console.log(result);
      if (!result.length) {
        res.status(404).json({
          success: false,
          message: "there is no posts",
        });
      } else if (result.length) {
        res.status(200).json({
          success: true,
          message: `All the post for userId`,
          job: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
const updateJob = (req, res) => {
  const userId = req.token.userId;
  const { id } = req.params;
  const { filterTitle, title, jobAddress, description, salary, photo } =
    req.body;
  const update = { filterTitle, title, jobAddress, description, salary, photo };
  jobModel
    .findOneAndUpdate({ _id: id }, update, { new: true })
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
        result: result,
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
const createPost = (req, res) => {
  const userId = req.token.userId;
  const { description, photo } = req.body;
  const newPost = new postModel({
    description,
    photo,
    userId,
  });
  newPost
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `post Created Successfully`,
        post: result,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: err,
      });
    });
};
const getAllPost = (req, res) => {
  postModel
    .find()
    .populate("userId")
    .populate("comment")
    .exec()
    .then((result) => {
      if (result.length - 1 < 0) {
        res.status(404).json({
          success: false,
          message: "not found post ",
        });
      } else if (result.length >= 0) {
        res.status(200).json({
          message: "All the post",
          posts: result,
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    });
};
const updatePost = (req, res) => {
  
};
module.exports = {
  createPostJob,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
  createPost,
};
