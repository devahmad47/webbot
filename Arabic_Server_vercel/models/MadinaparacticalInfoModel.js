const mongoose = require('mongoose');

const MadinaParactticalSchema = new mongoose.Schema({
    business_status: { type: String, trim: true },
    geometry: {
        location: {
            lat: Number,
            lng: Number
        },
        viewport: {
            northeast: {
                lat: Number,
                lng: Number
            },
            southwest: {
                lat: Number,
                lng: Number
            }
        }
    },
    icon: String,
    icon_background_color: { type: String, trim: true },
    icon_mask_base_uri: { type: String, trim: true },
    name: String,
    opening_hours: {
        open_now: Boolean
    },
    photos: [
        {
            height: Number,
            html_attributions: [String],
            photo_reference: { type: String, trim: true },
            width: Number
        }
    ],
    place_id: { type: String, trim: true },
    plus_code: {
        compound_code: { type: String, trim: true },
        global_code: { type: String, trim: true }
    },
    rating: Number,
    reference: { type: String, trim: true },
    scope: { type: String, trim: true },
    types: [String],
    user_ratings_total: Number,
    vicinity: { type: String, trim: true },
    MImage1: { type: String, trim: true, },
    MImage2: { type: String, trim: true, },
    MImage3: { type: String, trim: true, },
    MVideo: { type: String, trim: true, },
});

const MadinaInfo = mongoose.model('MadinaInfo', MadinaParactticalSchema);

module.exports = MadinaInfo;
