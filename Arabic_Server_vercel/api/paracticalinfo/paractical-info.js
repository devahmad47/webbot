const express = require('express');
const router = express.Router();
const apiKey = process.env.map_Key
const axios = require("axios")
const MadinaInfo = require("../../models/MadinaparacticalInfoModel")
const MakkhaInfo = require("../../models/MakhhaparacticalInfoModel")


/////////////////////////////// makkha paratical info ////////////////////////////////


// Add a new Makkha place
router.post("/add-makkha-place", async (req, res) => {
    try {
        const newMakkhaPlace = await MakkhaInfo.create(req.body);
        res.status(200).json({ message: "Makkha Place added successfully", place: newMakkhaPlace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to add Makkha Place", error: error.message });
    }
});

// Get a single Makkha place by ID
router.get("/get-makkha-place/:MakkhaId", async (req, res) => {
    try {
        const { MakkhaId } = req.params;
        const makkhaPlace = await MakkhaInfo.findOne({ _id: MakkhaId });
        if (!makkhaPlace) {
            return res.status(404).json({ message: "Makkha Place not found" });
        }
        res.status(200).json({ message: "Makkha Place retrieved successfully", place: makkhaPlace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to get Makkha Place", error: error.message });
    }
});

// get data from mognoo db
router.get("/get-makkha-places", async (req, res) => {
    try {
        const response = await MakkhaInfo.find().sort({ _id: -1 })
        if (!response && response.length == 0) {
            return res.status(404).json({ message: "no data found" })
        }
        // console.log(response)
        return res.status(200).json({ message: "Makkha Places details retrieved successfully", details: response });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to get  Makkha Plces details", error: error.message });
    }
});
// delete data from mognoo db
router.delete("/:MakkhaId/delete-makkha-places", async (req, res) => {
    try {
        const { MakkhaId } = req.params
        const currentMakkhaPlace = await MakkhaInfo.findOne({ _id: MakkhaId })
        if (!currentMakkhaPlace) {
            return res.status(404).json({ message: "no  place data found" })
        }
        await MakkhaInfo.deleteOne({ _id: MakkhaId })
        // console.log(response)
        return res.status(200).json({ message: "Makkha Places deleted successfully", currentMakkhaPlace });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to delete  Makkha Plces ", error: error.message });
    }
});
router.post('/delete_file_cloudinary-makkha', async (req, res) => {
try {
        const { name, fileUrl, makkhaIdId } = req.body
        const existingmakkha = await MakkhaInfo.findOne({ _id: makkhaIdId });
        if (!existingmakkha) {
            return res.status(404).json({ message: 'site not found' });
        }
        await deleteFile(fileUrl)
        existingmakkha[name] = ""
        await existingmakkha.save()

        res.status(200).json({ message: "Media Deleted Succesfully", existingmakkha })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Media", error: error.message })
    }
})

// Edit Makkha Place
router.put('/:MakkhaId/edit-Makkah-place', async (req, res) => {
    try {
        const { MakkhaId } = req.params;

        // Find and update the Makkha Place
        const updatedMakkhaPlace = await MakkhaInfo.findOneAndUpdate(
            { _id: MakkhaId }, // Filter for finding the Makkha Place
            req.body, // Updated values provided in req.body
            { new: true } // Return the updated document
        );

        // Check if the Makkha Place exists
        if (!updatedMakkhaPlace) {
            return res.status(404).json({ message: 'Makkha Place not found' });
        }

        // Respond with success message and updated Makkha Place
        res.status(200).json({ message: 'Makkha Place updated successfully', updatedPlace: updatedMakkhaPlace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update Makkha Place', error: error.message });
    }
});

router.post('/search-places-makkha', async (req, res) => {
    try {
        // Extract search term from the request query
        const { searchTerm } = req.body;

        // Define the regex pattern for case-insensitive global search
        const regexPattern = new RegExp(searchTerm.trim(), 'gi');

        // Query the database using Mongoose with regex for global search
        const places = await MakkhaInfo.find({
            $or: [
                { name: regexPattern },
                // Add more fields as needed for the search
            ],
        }).sort({ _id: -1 });

        // Check if hotels were found
        if (!places || places.length === 0) {
            return res.status(404).json({ message: 'No places found' });
        }

        // Return the search results
        res.status(200).json({ message: 'makkha places fetched successfully', places });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search makkah places', error: error.message });
    }
});

///////////////////////////////////////////////////

/////////////////////////////// madina paratical info ////////////////////////////////

// Add a new medina place
router.post("/add-medina-place", async (req, res) => {
    try {
        const newmedinaPlace = await MadinaInfo.create(req.body);
        res.status(200).json({ message: "medina Place added successfully", place: newmedinaPlace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to add medina Place", error: error.message });
    }
});


// get data from mognoo db
router.get("/get-medina-places", async (req, res) => {
    try {
        const response = await MadinaInfo.find().sort({ _id: -1 })
        if (!response && response.length == 0) {
            return res.status(404).json({ message: "no data found" })
        }
        // console.log(response)
        return res.status(200).json({ message: "MadinaInfo Places details retrieved successfully", details: response });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to get  MadinaInfo  details", error: error.message });
    }
});


// delete data from mognoo db
router.delete("/:MadinaId/delete-madina-places", async (req, res) => {
    try {
        const { MadinaId } = req.params

        const currentMadinaPlace = await MadinaInfo.findOne({ _id: MadinaId })
        if (!currentMadinaPlace) {
            return res.status(404).json({ message: "no  place data found" })
        }

        await MadinaInfo.deleteOne({ _id: MadinaId })
        // console.log(response)
        return res.status(200).json({ message: "madina Places deleted successfully", currentMadinaPlace });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to delete  madina Plces ", error: error.message });
    }
});



router.post('/delete_file_cloudinary-medinah', async (req, res) => {
    try {
        const { name, fileUrl, madinahId } = req.body
        const existingmadinah = await MadinaInfo.findOne({ _id: madinahId });
        if (!existingmadinah) {
            return res.status(404).json({ message: 'site not found' });
        }
        await deleteFile(fileUrl)
        existingmadinah[name] = ""
        await existingmadinah.save()

        res.status(200).json({ message: "Media Deleted Succesfully", existingmadinah })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Media", error: error.message })
    }
})

// Edit Makkha Place
router.put('/:madinahId/edit-medina-place', async (req, res) => {
    try {
        const { madinahId } = req.params;

        // Find and update the Makkha Place
        const updatedMadinahPlace = await MadinaInfo.findOneAndUpdate(
            { _id: madinahId }, // Filter for finding the Makkha Place
            req.body, // Updated values provided in req.body
            { new: true } // Return the updated document
        );

        // Check if the Makkha Place exists
        if (!updatedMadinahPlace) {
            return res.status(404).json({ message: 'Makkha Place not found' });
        }

        // Respond with success message and updated Makkha Place
        res.status(200).json({ message: 'madinah Place updated successfully', updatedPlace: updatedMadinahPlace });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update madinah Place', error: error.message });
    }
});

router.post('/search-places-madinah', async (req, res) => {
    try {
        // Extract search term from the request query
        const { searchTerm } = req.body;

        // Define the regex pattern for case-insensitive global search
        const regexPattern = new RegExp(searchTerm.trim(), 'gi');

        // Query the database using Mongoose with regex for global search
        const places = await MadinaInfo.find({
            $or: [
                { name: regexPattern },
                // Add more fields as needed for the search
            ],
        }).sort({ _id: -1 });

        // Check if hotels were found
        if (!places || places.length === 0) {
            return res.status(404).json({ message: 'No places found' });
        }

        // Return the search results
        res.status(200).json({ message: 'MadinaInfo places fetched successfully', places });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search MadinaInfo places', error: error.message });
    }
});


///////////////////////// get both places /////////////////////////////////////////////////////

// Combined route to get data from both Makkha and Medina places
router.get("/get-all-places", async (req, res) => {
    try {
        // Retrieve data from Makkha places
        const makkhaResponse = await MakkhaInfo.find();
        // Retrieve data from Medina places
        const medinaResponse = await MadinaInfo.find();

        // Combine both responses into one array using flatMap
        const allPlaces = [makkhaResponse, medinaResponse].flatMap(place => place);

        // Check if any data is found
        if (!allPlaces || allPlaces.length === 0) {
            return res.status(404).json({ message: "No data found" });
        }

        // Return combined data
        return res.status(200).json({ message: "All places details retrieved successfully", places: allPlaces });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Unable to get all places details", error: error.message });
    }
});



///////////////////////////// fetch makkha places from api ////////////////////////////////////////////////

// add data to mongoo db 40 items old google api
router.get("/refresh-add/get-makkha-places", async (req, res) => {
    try {
        // Replace YOUR_API_KEY with your actual API key
        const location = '21.422645025412407,39.82630859064853'; // specify the location in latitude,longitude 
        const radius = 30000; // 30 km radius

        // Specify the types of places you want to fetch
        const types = ['store', 'light_rail_station', 'bus_station', 'car_rental', 'car_repair', 'department_store', 'pharmacy', 'train_station', 'taxi_stand', 'shopping_mall', 'police', 'parking', 'mosque', 'hospital', 'cemetery'];

        // Make a request to the Google Places API
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types.join('|')}&key=${apiKey}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            let results = response.data.results;

            // Check if there's a next page token
            if (response.data.next_page_token) {
                // If there's a next page token, make a request to fetch the next page of results
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds (as per Google's API requirement)
                const NextapiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types.join('|')}&key=${apiKey}&pagetoken=${response.data.next_page_token}`;
                const nextPageResponse = await axios.get(NextapiUrl);
                results.push(...nextPageResponse.data.results);
            }
            for (const detail of results) {
                const existingPlace = await MakkhaInfo.findOne({ place_id: detail.place_id });
                if (!existingPlace) {
                    // If the place ID does not exist in the database, save the Makkha place
                    try {
                        const makkhaPlace = new MakkhaInfo(detail);
                        await makkhaPlace.save();
                        console.log('Makkha Place saved successfully:');
                    } catch (error) {
                        console.error('Error saving Makkha Place:', error);
                    }
                } else {
                    console.log("item exist")
                }
            }
            // results.forEach(async (detail) => {
            //     try {
            //         const makkhaPlace = new MakkhaInfo(detail);
            //         await makkhaPlace.save();
            //         console.log('Makkha Place saved successfully:', makkhaPlace);
            //     } catch (error) {
            //         console.error('Error saving Makkha Place:', error);
            //     }
            // });
            return res.status(200).json({ message: "Makkha Places details retrieved successfully", details: results });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to get  Makkha Plces details", error: error.message });
    }
});
// add data to mongoo db 20 items new google api
router.get("/v3/get-makkha-places-new", async (req, res) => {
    try {

        const requestBody = {
            includedTypes: [

                "store",
                "light_rail_station",
                "bus_station",
                "car_rental",
                "car_repair",
                "department_store",
                "pharmacy",
                "train_station",
                "taxi_stand",
                "shopping_mall",
                "police",
                "parking",
                "mosque",
                "hospital",
                "cemetery"
            ],
            // maxResultCount: 10,
            locationRestriction: {
                circle: {
                    center: {
                        latitude: 21.422645025412407,
                        longitude: 39.82630859064853
                    },
                    radius: 30000
                }
            }
        };
        const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': '*',
            }
        },)


        if (response.status === 200) {

            for (const detail of response.data.places) {
                const existingPlace = await MakkhaInfo.findOne({ place_id: detail.id });
                if (!existingPlace) {
                    // If the place ID does not exist in the database, save the Makkha place
                    try {
                        const makkhaPlace = new MakkhaInfo({
                            business_status: detail.business_status,
                            geometry: {
                                location: {
                                    lat: detail.location.latitude,
                                    lng: detail.location.longitude
                                }
                            },
                            place_id: detail.id,
                            icon: detail.iconMaskBaseUri,
                            googleMapsUri: detail.googleMapsUri,
                            name: detail.displayName.text,
                            rating: detail.rating,
                            user_ratings_total: detail.userRatingCount,
                            types: detail.types,
                        });
                        await makkhaPlace.save();
                        console.log('Makkha Place saved successfully:');
                    } catch (error) {
                        console.error('Error saving Makkha Place:', error);
                    }
                } else {
                    console.log("item exist")
                }
            }

            return res.status(200).json({ message: "Makkha  Places details retrieved successfully", details: response.data });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to get  makkha Plces details", error: error.message });
    }
});

//////////////////////////// fetch madinah places ///////////////////////////////////////////////////

// add data to mongoo db 40 items old google api
router.get("/refresh-add/get-medina-places", async (req, res) => {
    try {
        // Replace YOUR_API_KEY with your actual API key
        const location = '24.468154002696597, 39.61252779089257'; // specify the location in latitude,longitude format
        const radius = 30000; // 30 km radius

        // Specify the types of places you want to fetch
        const types = ['store', 'light_rail_station', 'bus_station', 'car_rental', 'car_repair', 'department_store', 'pharmacy', 'train_station', 'taxi_stand', 'shopping_mall', 'police', 'parking', 'mosque', 'hospital', 'cemetery'];

        // Make a request to the Google Places API
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types.join('|')}&key=${apiKey}`;
        const response = await axios.get(apiUrl);

        if (response.status === 200) {
            let results = response.data.results;

            // Check if there's a next page token
            if (response.data.next_page_token) {
                // If there's a next page token, make a request to fetch the next page of results
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds (as per Google's API requirement)
                const NextapiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&types=${types.join('|')}&key=${apiKey}&pagetoken=${response.data.next_page_token}`;
                const nextPageResponse = await axios.get(NextapiUrl);
                results.push(...nextPageResponse.data.results);
            }

            for (const detail of results) {
                const existingPlace = await MadinaInfo.findOne({ place_id: detail.place_id });
                if (!existingPlace) {
                    // If the place ID does not exist in the database, save the Makkha place
                    try {
                        const MadinaPlace = new MadinaInfo(detail);
                        await MadinaPlace.save();
                        console.log('MadinaPlace Place saved successfully:',);
                    } catch (error) {
                        console.error('Error saving MadinaPlace:', error);
                    }
                } else {
                    console.log("item exist")
                }
            }
            return res.status(200).json({ message: "Madina Places details retrieved successfully", details: results });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to get  Madina Plces details", error: error.message });
    }
});


// add data to mongoo db 20 items new google api
router.get("/v3/get-medina-places-new", async (req, res) => {
    try {

        const requestBody = {
            includedTypes: [
                "store",
                "light_rail_station",
                "bus_station",
                "car_rental",
                "car_repair",
                "department_store",
                "pharmacy",
                "train_station",
                "taxi_stand",
                "shopping_mall",
                "police",
                "parking",
                "mosque",
                "hospital",
                "cemetery"
            ],
            // maxResultCount: 20,
            locationRestriction: {
                circle: {
                    center: {

                        latitude: 24.468154002696597,
                        longitude: 39.61252779089257
                    },
                    radius: 30000
                }
            }
        };

        const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby', requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': '*',
            }
        },)


        if (response.status === 200) {
            for (const detail of response.data.places) {
                const existingPlace = await MadinaInfo.findOne({ place_id: detail.id });
                if (!existingPlace) {
                    // If the place ID does not exist in the database, save the Makkha place
                    try {
                        const makkhaPlace = new MadinaInfo({
                            business_status: detail.business_status,
                            geometry: {
                                location: {
                                    lat: detail.location.latitude,
                                    lng: detail.location.longitude
                                }
                            },
                            place_id: detail.id,
                            icon: detail.iconMaskBaseUri,
                            googleMapsUri: detail.googleMapsUri,
                            name: detail.displayName.text,
                            rating: detail.rating,
                            user_ratings_total: detail.userRatingCount,
                            types: detail.types,
                        });
                        await makkhaPlace.save();
                        console.log('madina Place saved successfully:');
                    } catch (error) {
                        console.error('Error saving madina Place:', error);
                    }
                } else {
                    console.log("item exist")
                }
            }
            // console.log(response.data)
            return res.status(200).json({ message: "Makkha  Places details retrieved successfully", details: response.data });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Unable to get  Madina Plces details", error: error.message });
    }
});

module.exports = router;
