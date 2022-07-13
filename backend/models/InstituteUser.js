const mongoose = require("mongoose");


const InstituteUserSchema = new mongoose.Schema({
  send_to_id: { type: mongoose.Schema.ObjectId, ref: "User" }, 
  user_registered_id: { type: mongoose.Schema.ObjectId, ref: "Token" }, 
});

const InstituteUser = model("InstituteUser", InstituteUserSchema);

module.exports = InstituteUser;
