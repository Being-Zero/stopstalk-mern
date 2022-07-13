const mongoose = require("mongoose");
const validator = require("validator");

const tokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, "token is required"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  userid: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
