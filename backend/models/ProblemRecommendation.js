const mongoose = require("mongoose");

const ProblemRecommendationSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, // Reference to auth_user
    problem_id: { type: mongoose.Schema.ObjectId, ref: "Problem" }, // Reference to problem
    state: { type: Number, default: 0 }, // 0 - Recommended, 1 - Viewed, 2 - Attempted, 3 - Solved
    is_active: { type: Boolean },
    generated_at: { type: Date }, // Time when the recommendation was generated
});

const ProblemRecommendation = mongoose.model('ProblemRecommendation', ProblemRecommendationSchema);

module.exports = ProblemRecommendation;