const mongoose = require("mongoose");


const AtCoderProblemsSchema = new mongoose.Schema({
    problem_identifier: { type: String },
    contest_id: { type: String },
    name: { type: String },
});

const AtCoderProblems = mongoose.model('AtCoderProblems', AtCoderProblemsSchema);

module.exports = AtCoderProblems;