const mongoose = require("mongoose")

const ContactUsSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone_no: { type: String, default: '' },
    subject: { type: String, default: '' },
    text_message: { type: String, default: '' },
});

const ContactUs = mongoose.model('ContactUs', ContactUsSchema);

module.exports = ContactUs;