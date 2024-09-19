const express = require('express');
const router = express.Router();
const apiKey = process.env.map_Key
const axios = require("axios")
const HotelMadinah = require("../../models/hotelMadinahModel")
const HotelMakkah = require("../../models/hotelMakkhaModel")
const { deleteFile } = require("../../utils/cloudinary")


//////////////////// delete hotel media from cloudinary ////////////////////////

router.post('/delete_file_cloudinary', async (req, res) => {
    try {
        const { name, fileUrl, hotelId, originCity } = req.body
        let existinghotel;

        if (originCity === "Madinah") {
            existinghotel = await HotelMadinah.findOne({ _id: hotelId });
        } else {
            existinghotel = await HotelMakkah.findOne({ _id: hotelId });

        }

        if (!existinghotel) {
            return res.status(404).json({ message: 'hotel not found' });
        }
        await deleteFile(fileUrl)
        existinghotel[name] = ""
        await existinghotel.save()

        res.status(200).json({ message: "Media Deleted Succesfully", existinghotel })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Media", error: error.message })
    }
})

/////////////////////////// Makkha Hotels /////////////////////////////////////////////////////

router.get("/fetch-hotels-makkha", async (req, res) => {
    try {
        console.log("makkha fetch call 1")
        // Replace YOUR_API_KEY with your actual API key

        const location = '21.422645025412407,39.82630859064853'; // specify the location in latitude,longitude format
        const radius = 30000; // 30 km radius

        // Make a request to the Google Places API
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=lodging|restaurant&key=${apiKey}`;
        const response = await axios.get(apiUrl)

        if (response.status === 200) {
            let results = response.data.results;

            // Check if there's a next page token
            if (response.data.next_page_token) {
                // If there's a next page token, make a request to fetch the next page of results
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds (as per Google's API requirement)
                const NextapiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=lodging|restaurant&key=${apiKey}`;
                const nextPageResponse = await axios.get(NextapiUrl);
                results.push(...nextPageResponse.data.results);
            }
            console.log(results.length)
            // Create documents for each hotel in the results array
            for (const hotelData of results) {
                const existingPlace = await HotelMakkah.findOne({ place_id: hotelData.place_id });
                if (!existingPlace) {
                    // If the place ID does not exist in the database, save the Makkha place
                    try {
                        await HotelMakkah.create(hotelData);
                    } catch (error) {
                        console.error('Error saving Makkha Place:', error);
                    }
                } else {
                    console.log("item exist")
                }

            }
            // hotels: results 
            return res.status(200).json({ message: "makkah hotels added succesfully", });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to add  makkah hotels", error: error.message })
    }
})



// Add a single hotel
router.post("/add_makkah_hotel", async (req, res) => {
    try {
        const newHotel = await HotelMakkah.create(req.body);
        res.status(200).json({ message: 'Hotel added successfully', hotel: newHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add hotel', error: error.message });
    }
});
// Edit a hotel
router.put("/edit_makkah_hotel/:id", async (req, res) => {
    try {
        const hotelId = req.params.id;

        const updatedHotel = await HotelMakkah.findByIdAndUpdate(hotelId, req.body, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json({ message: 'Makkha Hotel updated successfully', hotel: updatedHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Makkha  hotel', error: error.message });
    }
});

// Delete a hotel
router.delete("/delete_Makkah_hotel/:id", async (req, res) => {
    try {
        const hotelId = req.params.id;
        const deletedHotel = await HotelMakkah.findByIdAndDelete(hotelId);

        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json({ message: 'Makkha Hotel deleted successfully', hotel: deletedHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete   Makkha  hotel', error: error.message });
    }
});

// get a single hotel
router.get("/get_single_hotel_makkha/:id", async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await HotelMakkah.findOne({ _id: id })

        if (!hotel) {
            return res.status(404).json({ message: "Makkah hotel not found" })
        }

        res.status(200).json({ message: 'Makkah hotel fetched successfully', hotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'failed to fetch all Makkah hotel', error: error.message });
    }
})
// get all hotels
router.get("/get-hotels-makkha", async (req, res) => {
    try {
        const hotels = await HotelMakkah.find().sort({ _id: -1 })

        if (!hotels && hotels.length === 0) {
            return res.status(404).json({ message: "Makkah hotels not found" })
        }

        res.status(200).json({ message: 'Makkah hotels fetched successfully', hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'failed to fetch all Makkah hotels', error: error.message });
    }
})


// Search hotels in Makkah
router.post('/search-hotels-makkah', async (req, res) => {
    try {
        // Extract search term from the request query
        const { searchTerm } = req.body;

        // Define the regex pattern for case-insensitive global search
        const regexPattern = new RegExp(searchTerm.trim(), 'gi');

        // Query the database using Mongoose with regex for global search
        const hotels = await HotelMakkah.find({
            $or: [
                { name: regexPattern },
                // Add more fields as needed for the search
            ],
        }).sort({ _id: -1 });

        // Check if hotels were found
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels found' });
        }

        // Return the search results
        res.status(200).json({ message: 'makkah Hotels fetched successfully', hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search makkah hotels', error: error.message });
    }
});


/////////////////////////// Madina Hotels /////////////////////////////////////////////////////
//  fetch madina hotels
router.get("/fetch-hotels-madina", async (req, res) => {
    try {
        // Replace YOUR_API_KEY with your actual API key

        const location = '24.468154002696597, 39.61252779089257'; // specify the location in latitude,longitude format
        const radius = 30000; // 10 km radius

        // Make a request to the Google Places API
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=lodging|restaurant&key=${apiKey}`;
        const response = await axios.get(apiUrl)

        if (response.status === 200) {
            let results = response.data.results;

            // Check if there's a next page token
            if (response.data.next_page_token) {
                // If there's a next page token, make a request to fetch the next page of results
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds (as per Google's API requirement)
                const NextapiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=lodging|restaurant&key=${apiKey}`;
                const nextPageResponse = await axios.get(NextapiUrl);
                results.push(...nextPageResponse.data.results);
            }
            console.log(results.length)
            for (const hotelData of results) {
                const existingPlace = await HotelMadinah.findOne({ place_id: hotelData.place_id });
                if (!existingPlace) {
                    // If the place ID does not exist in the database, save the Makkha place
                    try {
                        await HotelMadinah.create(hotelData);
                    } catch (error) {
                        console.error('Error saving madinah Place:', error);
                    }
                } else {
                    console.log("item exist")
                }

            }

            // hotels: results
            return res.status(200).json({ message: "madinah hotels added succesfully", });
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "unable to add madinah hotels", error: error.message })
    }
})

// Add a single hotel
router.post("/add_madina_hotel", async (req, res) => {
    try {
        const newHotel = await HotelMadinah.create(req.body);
        res.status(200).json({ message: 'madina Hotel added successfully', hotel: newHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add hotel madina', error: error.message });
    }
});

// Edit a hotel
router.put("/edit_madina_hotel/:id", async (req, res) => {
    try {
        const hotelId = req.params.id;

        const updatedHotel = await HotelMadinah.findByIdAndUpdate(hotelId, req.body, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.status(200).json({ message: 'madina Hotel updated successfully', hotel: updatedHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update madina hotel ', error: error.message });
    }
});

// Delete a hotel
router.delete("/delete_madina_hotel/:id", async (req, res) => {
    try {
        const hotelId = req.params.id;
        const deletedHotel = await HotelMadinah.findByIdAndDelete(hotelId);

        if (!deletedHotel) {
            return res.status(404).json({ message: "madina Hotel not found" });
        }

        res.status(200).json({ message: 'madina Hotel deleted successfully', hotel: deletedHotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete   Makkha  hotel', error: error.message });
    }
});

// get a single hotel
router.get("/get_single_hotel_madina/:id", async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await HotelMadinah.findOne({ _id: id })

        if (!hotel) {
            return res.status(404).json({ message: "madina hotel not found" })
        }

        res.status(200).json({ message: 'madina hotel fetched successfully', hotel });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'failed to fetch all madina hotel', error: error.message });
    }
})
// get all madina hotels
router.get("/get-hotels-madina", async (req, res) => {
    try {
        const hotels = await HotelMadinah.find().sort({ _id: -1 })

        if (!hotels && hotels.length === 0) {
            return res.status(404).json({ message: "Madinah hotels not found" })
        }

        res.status(200).json({ message: 'Madinah hotels fetched successfully', hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'failed to fetch all Madinah hotels', error: error.message });
    }
})

router.post('/search-hotels-madinah', async (req, res) => {
    try {
        // Extract search term from the request query
        const { searchTerm } = req.body;

        // Define the regex pattern for case-insensitive global search
        const regexPattern = new RegExp(searchTerm.trim(), 'gi');

        // Query the database using Mongoose with regex for global search
        const hotels = await HotelMadinah.find({
            $or: [
                { name: regexPattern },
                // Add more fields as needed for the search
            ],
        }).sort({ _id: -1 });

        // Check if hotels were found
        if (!hotels || hotels.length === 0) {
            return res.status(404).json({ message: 'No hotels found' });
        }

        // Return the search results
        res.status(200).json({ message: 'madinah Hotels fetched successfully', hotels });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search madinah hotels', error: error.message });
    }
});


/////////////////////////// get both hotels ///////////////////////////

// router.get("/get-hotels", async (req, res) => {
//     try {
//         // Define the locations and radii for both Makkah and Madina
//         const locations = [
//             { name: 'Makkah', location: '21.422645025412407,39.82630859064853', radius: 30000 },
//             { name: 'Madina', location: '24.468154002696597, 39.61252779089257', radius: 30000 }
//         ];

//         // Fetch data from both APIs concurrently
//         const requests = locations.map(location => {
//             const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.location}&radius=${location.radius}&type=lodging|restaurant&key=${apiKey}`;
//             return axios.get(apiUrl);
//         });

//         // Wait for all requests to complete
//         const responses = await Promise.all(requests);

//         const combinedData = responses.flatMap(res => res.data.results);


//         res.status(200).json({ message: "Hotels fetched successfully", data: combinedData });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Unable to get hotels", error: error.message });
//     }
// });


///////////////// working ///////////////////////////////////////


router.get("/get-hotels", async (req, res) => {
    try {
        let combinedData = [];

        const Makkahhotels = await HotelMakkah.find().sort({ _id: -1 });
        const Madinahhotels = await HotelMadinah.find().sort({ _id: -1 });
        console.log(Makkahhotels.length)
        console.log(Madinahhotels.length)
        combinedData.push(...Makkahhotels, ...Madinahhotels);
        console.log(combinedData.length)

        res.status(200).json({ message: "Hotels fetched successfully", data: combinedData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to get hotels", error: error.message });
    }
});



module.exports = router;
