const mongoose = require("mongoose");

const InstituteSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Institute must have a name"] },
  country: { type: String, default: "" },
  stopstalk_handle: {
    type: String,
    required: [true, "Institute must have a name"],
    unique: true,
  },
  rating: { type: Number, default: 0 },
  previous_rating: { type: Number, default: 0 },
  stopstalk_rating: { type: Number, default: 0 },
  stopstalk_prev_rating: { type: Number, default: 0 },
  per_day: { type: Number, default: 0.0 },
  per_day_change: { type: Number, default: 0.0 },
  referrer: { type: String, default: "" },
  allowed_cu: { type: Number, default: 3 },
  blacklisted: { type: Boolean, default: false },
  authentic: { type: Boolean, default: false },
  graph_data_retrieved: { type: Boolean, default: false },
  refreshed_timestamp: { type: Date, default: Date.now },
});

const Institute = mongoose.model("Institute", InstituteSchema);

module.exports = Institute;
