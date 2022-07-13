const mongoose = require("mongoose");

const AllInstitutesSchema = new mongoose.Schema({
    institute: { type: String, default: '' }, 
});

const AllInstitutes = mongoose.model('AllInstitutes', AllInstitutesSchema);

module.exports = AllInstitutes;