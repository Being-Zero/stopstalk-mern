const mongoose = require("mongoose")


const ProblemUVASchema = new mongoose.Schema({
  problem_id: {
    type: Number,
    required: [true, "problem id is necessary for uva"],
  },
  problem_num: {
    type: Number,
    required: [true, "problem id is necessary for uva"],
  },
  title: { type: String, default: "" },
  problem_status: { type: Number }, 
});

const ProblemUVA = mongoose.model("ProblemUVA", ProblemUVASchema);

module.exports = ProblemUVA;
