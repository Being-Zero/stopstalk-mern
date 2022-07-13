const mongoose = require("mongoose");

const FailedRetrievalSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
  custom_user_id: { type: mongoose.Schema.ObjectId, ref: "CustomFriend" },
  site: { type: String },
});

const FailedRetrieval = mongoose.model(
  "FailedRetrieval",
  FailedRetrievalSchema
);

module.exports = FailedRetrieval;
