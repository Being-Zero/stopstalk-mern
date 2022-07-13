const mongoose = require("mongoose");

const FollowingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, // Reference to auth_user
  follower_id: { type: mongoose.Schema.ObjectId, ref: "User" }, // Reference to auth_user
});

const Following = mongoose.model("Following", FollowingSchema);

module.exports = Following;
