const mongoose = require("mongoose");


const StickerGivenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.ObjectId , ref: 'User' },
    sticker_count: { type: Number },
});

const StickerGiven = mongoose.model('StickerGiven', StickerGivenSchema);

module.exports = StickerGiven;