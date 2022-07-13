const mongoose =require("mongoose");

const TodayRequestSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, 
    follower_id: { type: mongoose.Schema.ObjectId, ref: "User"}, 
    transaction_type: { type: String },
});

const TodayRequest = mongoose.model('TodayRequest', TodayRequestSchema);

module.exports = TodayRequest;