const express = require("express");
const {
  createPostJob,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobPost");
const jobRouter = express.Router();
jobRouter.post("/", createPostJob);
jobRouter.get("/", getAllJob);
jobRouter.get("/:id", getJobById);
jobRouter.put("/update/:id", updateJob);
jobRouter.delete("/delete/:id", deleteJob);
module.exports = jobRouter;
