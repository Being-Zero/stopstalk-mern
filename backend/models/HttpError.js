const mongoose = require("mongoose");

const HttpErrorSchema = new mongoose.Schema({
  status_code: { type: Number },
  content: { type: String },
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, // Reference to auth_user
});

const HttpError = mongoose.model("HttpError", HttpErrorSchema);

module.exports = HttpError;
