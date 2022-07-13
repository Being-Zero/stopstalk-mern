const mongoose = require("mongoose");

const AccessTokenSchema = new mongoose.Schema({
  value: { type: String },
  time_stamp: { type: Date },
  type: { type: String },
});

const AccessToken = mongoose.model("AccessToken", AccessTokenSchema);

module.exports = AccessToken;
