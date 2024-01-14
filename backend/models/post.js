const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({
  description: { type: String },
  photo: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});
module.exports = mongoose.model("post", jobSchema);
