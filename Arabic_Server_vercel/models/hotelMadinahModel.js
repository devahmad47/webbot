const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    business_status: String,
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
    icon_background_color: String,
    icon_mask_base_uri: String,
    name: String,
    photos: [
        {
            height: Number,
            html_attributions: [String],
            photo_reference: String,
            width: Number
        }
    ],
    place_id: String,
    plus_code: {
        compound_code: String,
        global_code: String
    },
    rating: Number,
    reference: String,
    scope: String,
    types: [String],
    user_ratings_total: Number,
    vicinity: String,
    hotelImage1: { type: String, trim: true, },
    hotelImage2: { type: String, trim: true, },
    hotelImage3: { type: String, trim: true, },
    hotelVideo: { type: String, trim: true, },
});

const HotelMadinah = mongoose.model('HotelMadinah', hotelSchema);

module.exports = HotelMadinah;
