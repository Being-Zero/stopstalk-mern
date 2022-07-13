const mongoose = require("mongoose");


const InvalidHandleSchema = new mongoose.Schema({
    handle: { type: String, default: '' },
    site: { type: String, default: '' },
});

const InvalidHandle = mongoose.model('InvalidHandle', InvalidHandleSchema);

module.exports = { InvalidHandle };