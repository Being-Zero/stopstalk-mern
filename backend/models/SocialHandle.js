const mongoose = require("mongoose");

const SocialHandleSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
    siteName: { type: String, required: true },
    userHandle: { type: String},
    lastRetrieved: { type: Date, default: Date.now},
    createdDate: { type: Date, default: Date.now }, // with time
    updatedDate: { type: Date, default: Date.now }, // with time
});

const SocialHandle = mongoose.model("SocialHandle", SocialHandleSchema);

module.exports = SocialHandle;