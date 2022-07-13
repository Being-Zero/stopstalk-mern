const mongoose = require("mongoose");

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: [true, "question can't be empty"] }, // not empty
  answer: { type: String, required: [true, "answer can't be empty"] }, // not empty
});

const Faq = mongoose.model("Faq", FaqSchema);

module.exports = Faq;
