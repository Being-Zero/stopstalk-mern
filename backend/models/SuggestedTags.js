const mongoose = require("mongoose");

const SuggestedTagSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, 
    problem_id: { type: mongoose.Schema.ObjectId, ref: "Problem" }, 
    tag_id: { type: mongoose.Schema.ObjectId, ref: "Tag" }, 
});

const SuggestedTag = mongoose.model('SuggestedTag', SuggestedTagSchema);

module.exports = SuggestedTag;