const express = require("express");
const { createNewComment } = require("../controllers/comment");
const {
  createPostJob,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
  createPost,
  getAllPost,
  updatePost,
  deletePost,
} = require("../controllers/jobPost");
const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
const jobRouter = express.Router();
jobRouter.post(
  "/",
  authentication,
  authorization("CREATE_POST"),
  createPostJob
);
jobRouter.get("/", getAllJob);
jobRouter.get("/com", authentication, getJobById);
jobRouter.put("/update/:id", authentication, updateJob);
jobRouter.delete("/delete/:id", authentication, deleteJob);
jobRouter.post("/:id/comments/", authentication, createNewComment);
jobRouter.post("/post", authentication, createPost);
jobRouter.get(
  "/post/get",
  authentication,
  authorization("CREATE_POST"),
  getAllPost
);
jobRouter.put("/post/update/:id", updatePost);
jobRouter.delete("/post/delete/:id", deletePost);
module.exports = jobRouter;
