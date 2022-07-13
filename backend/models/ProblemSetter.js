const mongoose = require("mongoose");

const ProblemSetterSchema = new mongoose.Schema({
  problem_id: { type: mongoose.Schema.ObjectId, ref: "Problem" }, // Reference to problem
  handle: { type: String },
});

const ProblemSetter = mongoose.model("ProblemSetter", ProblemSetterSchema);

module.exports = ProblemSetter;
