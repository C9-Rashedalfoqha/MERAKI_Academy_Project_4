const express = require("express");
const {
  createPostJob,
  getAllJob,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobPost");
const authentication=require("../middleware/authentication")
const jobRouter = express.Router();
jobRouter.post("/", authentication, createPostJob);
jobRouter.get("/", getAllJob);
jobRouter.get("/:id", getJobById);
jobRouter.put("/update/:id", updateJob);
jobRouter.delete("/delete/:id", deleteJob);
module.exports = jobRouter;
