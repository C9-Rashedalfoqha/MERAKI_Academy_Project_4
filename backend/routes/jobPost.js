const express = require("express");
const {
  createPostJob,
  getAllJob,
  getJobById,
  updateJob,
} = require("../controllers/jobPost");
const jobRouter = express.Router();
jobRouter.post("/", createPostJob);
jobRouter.get("/", getAllJob);
jobRouter.get("/:id", getJobById);
jobRouter.put("/update/:id", updateJob);
module.exports = jobRouter;
