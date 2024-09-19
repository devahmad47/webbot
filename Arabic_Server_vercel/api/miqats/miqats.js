const express = require('express');
const router = express.Router();
const Miqat = require("../../models/miqatModel")
const { uploadFile, uploadVideo, deleteFile } = require("../../utils/cloudinary")


router.post('/delete_file_cloudinary', async (req, res) => {
    try {
        const { name, fileUrl, miqatId } = req.body
        const existingmiqat = await Miqat.findOne({ _id: miqatId });
        if (!existingmiqat) {
            return res.status(404).json({ message: 'miqat not found' });
        }
        await deleteFile(fileUrl)
        existingmiqat[name] = ""
        await existingmiqat.save()

        res.status(200).json({ message: "Media Deleted Succesfully", existingmiqat })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Media", error: error.message })
    }
})
router.post('/add-miqat', async (req, res) => {
    try {
        const { miqatName, miqatDescription, latitude, longitude, distanceFromMakkah, directionRelativeToMakkah, distanceFromMadinah, directionRelativeToMadinah, miqatImage1, miqatImage2, miqatImage3, miqatVideo, } = req.body;



        if (!miqatName || !latitude || !longitude || !miqatDescription || !distanceFromMakkah || !directionRelativeToMakkah || !distanceFromMadinah || !directionRelativeToMadinah || !miqatImage1) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newMiqat = new Miqat({
            miqatName,
            miqatDescription,
            latitude,
            longitude,
            distanceFromMakkah,
            directionRelativeToMakkah,
            distanceFromMadinah,
            directionRelativeToMadinah,
            miqatImage1,
            miqatImage2,
            miqatImage3,
            miqatVideo,
        });
        await newMiqat.save();
        res.status(200).json({ message: 'Successfully miqat added', newMiqat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add miqat', error: error.message });
    }
});

router.put('/:miqatId/edit-miqat', async (req, res) => {
    try {
        const { miqatId } = req.params;
        const { miqatName, miqatDescription, latitude, longitude, distanceFromMakkah, directionRelativeToMakkah, distanceFromMadinah, directionRelativeToMadinah, miqatImage1, miqatImage2, miqatImage3, miqatVideo } = req.body;

        if (!miqatName || !latitude || !longitude) {
            return res.status(400).json({ message: 'Missing required fields' });
        }


        const existingMiqat = await Miqat.findById(miqatId);
        if (!existingMiqat) {
            return res.status(404).json({ message: 'Miqat not found' });
        }

        existingMiqat.miqatName = miqatName;
        existingMiqat.miqatDescription = miqatDescription;
        existingMiqat.latitude = latitude;
        existingMiqat.longitude = longitude;
        existingMiqat.distanceFromMakkah = distanceFromMakkah;
        existingMiqat.directionRelativeToMakkah = directionRelativeToMakkah;
        existingMiqat.distanceFromMadinah = distanceFromMadinah;
        existingMiqat.directionRelativeToMadinah = directionRelativeToMadinah;

        if (miqatImage1) {
            await deleteFile(existingMiqat.miqatImage1)
            existingMiqat.miqatImage1 = miqatImage1;
        }
        if (miqatImage2) {
            await deleteFile(existingMiqat.miqatImage2)
            existingMiqat.miqatImage2 = miqatImage2;
        }
        if (miqatImage3) {
            await deleteFile(existingMiqat.miqatImage3)
            existingMiqat.miqatImage3 = miqatImage3;
        }
        if (miqatVideo) {
            await deleteFile(existingMiqat.miqatVideo)
            existingMiqat.miqatVideo = miqatVideo;
        }


        await existingMiqat.save();
        res.status(200).json({ message: 'Miqat updated successfully', updatedMiqat: existingMiqat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update miqat', error: error.message });
    }
});

router.get("/get-all-miqats", async (req, res) => {
    try {
        const miqats = await Miqat.find().sort({ _id: -1 });

        if (!miqats || miqats.length === 0) {
            return res.status(404).json({ message: "Miqats not found" });
        }

        res.status(200).json({ message: 'Miqats fetched successfully', miqats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch all miqats', error: error.message });
    }
});

router.delete('/:miqatId/delete-miqat', async (req, res) => {
    const { miqatId } = req.params;
    try {
        const miqat = await Miqat.findOne({ _id: miqatId });

        if (!miqat) {
            return res.status(404).json({ message: 'Miqat not found' });
        }
        if (miqat.miqatImage1) {
            await deleteFile(miqat.miqatImage1);
        }
        if (miqat.miqatImage2) {
            await deleteFile(miqat.miqatImage2);
        }
        if (miqat.miqatImage3) {
            await deleteFile(miqat.miqatImage3);
        }
        if (miqat.miqatVideo) {
            await deleteFile(miqat.miqatVideo);
        }
        await Miqat.deleteOne({ _id: miqatId });
        return res.status(200).json({ message: 'Miqat deleted successfully', miqat });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete miqat', error: error.message });
    }
});



module.exports = router;