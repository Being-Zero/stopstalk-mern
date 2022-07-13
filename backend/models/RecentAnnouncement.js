const mongoose = require("mongoose");

const RecentAnnouncementSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.ObjectId, ref: "User" },
  data: { type: String, default: "{}" },
});

const RecentAnnouncement = mongoose.model(
  "RecentAnnouncement",
  RecentAnnouncementSchema
);

module.exports = RecentAnnouncement;
