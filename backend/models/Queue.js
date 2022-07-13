const mongoose = require("mongoose");

const QueueSchema = new mongoose.Schema({
  status: { type: String, default: "" },
  email: { type: String, default: "" },
  subject: { type: String, default: "" },
  message: { type: String, default: "" },
});

const Queue = mongoose.model("Queue", QueueSchema);

module.exports = Queue;
