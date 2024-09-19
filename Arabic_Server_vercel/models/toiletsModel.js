const mongoose = require('mongoose');

const toiletSchema = new mongoose.Schema({
    toiletNameEng: { type: String, trim: true, },
    toiletNameArb: { type: String, trim: true, },
    toiletNumber: { type: String, trim: true, },
  
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    toiletImage1: { type: String, trim: true, },
    toiletImage2: { type: String, trim: true, },
    toiletImage3: { type: String, trim: true, },
    toiletVideo: { type: String, trim: true, },


});

const toilet = mongoose.model('toilet', toiletSchema);

module.exports = toilet;
