const mongoose = require("mongoose");

const UsernameToIdSchema = new mongoose.Schema({
    username: { type: String, required: [true, "username is needed for uva model"] },
    uva_id: { type: String, required: [true, "uva_id is required"] },
});

const UsernameToId = mongoose.model('UsernameToId', UsernameToIdSchema);

module.exports = UsernameToId ;