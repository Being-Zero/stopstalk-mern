const mongoose =require("mongoose");
const validator =require("validator");

const UnSubscriberSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
      },
    feature_update: { type: Boolean, default: true },
    institute_user: { type: Boolean, default: true },
    friend_unfriend: { type: Boolean, default: true },
    time_stamp: { type: Date },
});

const UnSubscriber = mongoose.model('UnSubscriber', UnSubscriberSchema);

module.exports = UnSubscriber;