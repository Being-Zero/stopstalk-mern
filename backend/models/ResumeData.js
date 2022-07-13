const mongoose = require("mongoose");

const ResumeDataSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
  resume_file_s3_path: { type: String, required: [true, "Resume is required"] },
  will_relocate: { type: Boolean },
  github_profile: { type: String },
  linkedin_profile: { type: String },
  join_from: { type: Date },
  graduation_year: {
    type: Number,
    required: [true, "Graduation year is required!"],
  },
  experience: { type: String, default: "" },
  fulltime_or_internship: { type: String, default: "" },
  contact_number: { type: String, default: "" },
  can_contact: { type: Boolean },
  expected_salary: { type: Number },
});

const ResumeData = mongoose.model("ResumeData", ResumeDataSchema);

module.exports = ResumeData;
