const mongoose = require("mongoose");


const ProblemDifficultySchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    problem_id: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" }, 
    score: { type: Number, default: 0 },
});

const ProblemDifficulty = mongoose.model('ProblemDifficulty', ProblemDifficultySchema);

module.exports = ProblemDifficulty;