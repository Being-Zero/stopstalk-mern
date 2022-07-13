const mongoose = require("mongoose");

const TestimonialSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, // Reference to auth_user
    content: { type: String, default: '' },
    stars: { type: String },
    verification: { type: String, default: 'pending' },
    created_at: { type: Date },
});

const Testimonial = mongoose.model('Testimonial', TestimonialSchema);

module.exports = Testimonial;