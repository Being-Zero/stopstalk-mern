const mongoose = require("mongoose");

const DownloadSubmissionLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
  url: { type: String },
});

const DownloadSubmissionLog = mongoose.model(
  "DownloadSubmissionLog",
  DownloadSubmissionLogSchema
);

module.exports = DownloadSubmissionLog;
