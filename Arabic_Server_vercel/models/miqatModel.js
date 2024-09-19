const mongoose = require('mongoose');

const miqatSchema = new mongoose.Schema({
    miqatName: { type: String, trim: true, },
    miqatDescription: { type: String, trim: true, },
    distanceFromMakkah: { type: String, trim: true, },
    directionRelativeToMakkah: { type: String, trim: true, },

    distanceFromMadinah: { type: String, trim: true, },
    directionRelativeToMadinah: { type: String, trim: true, },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    miqatImage1: { type: String, trim: true, },
    miqatImage2: { type: String, trim: true, },
    miqatImage3: { type: String, trim: true, },
    miqatVideo: { type: String, trim: true, },


});

const Miqat = mongoose.model('Miqat', miqatSchema);

module.exports = Miqat;
