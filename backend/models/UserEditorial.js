const mongoose=  require("mongoose");

const UserEditorialSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, 
    problem_id: { type: mongoose.Schema.ObjectId, ref: "Problem" },
    added_on: { type: Date },
    s3_key: { type: String }, // cloud
    votes: { type: String },
    verification: { type: String, default: 'pending' },
});

const UserEditorial = mongoose.model('UserEditorial', UserEditorialSchema);

module.exports = UserEditorial;