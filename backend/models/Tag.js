const mongoose = require("mongoose");
const Problem = require("./Problem");

const TagSchema = new mongoose.Schema({
  problem_id: { type: mongoose.Schema.ObjectId, ref: "Problem" },
  value: { type: String, default: "Problem" },
});

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;
