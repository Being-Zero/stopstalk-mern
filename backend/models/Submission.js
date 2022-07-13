const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" }, // Reference to user_id
  className: { type: mongoose.Schema.ObjectId, ref: "CustomFriend" }, // Reference to custom_user_id
  submission_id: {type:String , required : true}, 
  stopstalk_handle: { type: String, default: "" },
  site_handle: { type: String, default: "" },
  site: { type: String, default: "" },
  time_stamp: { type: Date },
  problem_id: { type: mongoose.Schema.ObjectId, ref: "Problem" }, // Reference to problem
  problem_name: { type: String, default: "" },
  problem_link: { type: String, default: "" },
  lang: { type: String, default: "" },
  status: { type: String, default: "" },
  points: { type: String },
  view_link: { type: String, default: "" },
});


// SubmissionSchema.index({ submission_id : 1, site : 1 } , { unique: true })

const Submission = mongoose.model("Submission", SubmissionSchema);

module.exports = Submission;
