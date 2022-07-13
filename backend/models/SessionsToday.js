const mongoose = require("mongoose");

const SessionsTodaySchema = new mongoose.Schema({
  message: { type: String, default: "" },
});

const SessionsToday = mongoose.model("SessionsToday", SessionsTodaySchema);

module.exports = SessionsToday;
