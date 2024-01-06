const commentModel = require("..//models/comment");
const jobModel = require("../models/jobSchema");
const createNewComment = (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const commenter = req.token;
  const newComment = new commentModel({
    comment,
    commenter,
  });
  newComment
    .save()
    .then((result) => {
      jobModel
        .findByIdAndUpdate({ _id: id }, { $push: { comment: result._id } })
        .then((result) => {
          res.status(201).json({
            success: true,
            message: "comment created",
          });
        });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: err.message,
      });
    });
};
module.exports = {
  createNewComment,
};
