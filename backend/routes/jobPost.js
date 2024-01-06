const express = require("express");
const { createNewComment } = require("../controllers/comment");
const {
  createPostJob,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
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
jobRouter.get("/:id", getJobById);
jobRouter.put("/update/:id", updateJob);
jobRouter.delete("/delete/:id", deleteJob);
jobRouter.post("/:id/comment", createNewComment);
module.exports = jobRouter;
