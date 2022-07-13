const mongoose = require("mongoose");

const ContestLoggingSchema = new mongoose.Schema({
  click_type: { type: String },
  contest_details: { type: String },
  stopstalk_handle: { type: String },
  time_stamp: { type: Date },
});

const ContestLogging = mongoose.model("ContestLogging", ContestLoggingSchema);

module.exports = ContestLogging;
