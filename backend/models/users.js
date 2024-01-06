const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  FirstName: { type: String },
  lastName: { type: String },
  Email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: Number },
  Experience: { type: String },
  Skills: { type: String },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
});
userSchema.pre("save", async function () {
  this.Email = this.Email.toLowerCase();
  this.password = await bcrypt.hash(this.password, 7);
});
module.exports = mongoose.model("User", userSchema);
