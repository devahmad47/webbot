const express = require('express');
const router = express.Router();
const ToiletMadina = require("../../models/toiletsModelMadina")
const { uploadFile, uploadVideo, deleteFile } = require("../../utils/cloudinary")

router.post('/delete_file_cloudinary', async (req, res) => {
    try {
        const { name, fileUrl, toiletId } = req.body
        const existingtoilet = await ToiletMadina.findOne({ _id: toiletId });
        if (!existingtoilet) {
            return res.status(404).json({ message: 'toilet not found' });
        }
        await deleteFile(fileUrl)
        existingtoilet[name] = ""
        await existingtoilet.save()

        res.status(200).json({ message: "Media Deleted Succesfully", existingtoilet })
    } catch (error) {
        res.status(500).json({ message: "Failed to delete Media", error: error.message })
    }
})
router.post('/add-toilet', async (req, res) => {
    try {
        const { toiletNameEng, toiletNameArb, toiletNumber, latitude, longitude, toiletImage1, toiletImage2,
            toiletImage3, toiletVideo, } = req.body;



        if (!toiletNameEng || !latitude || !longitude) {
            return res.status(400).json({ message: 'Missing required fields' });
        }


        const newtoilet = new ToiletMadina({
            toiletNameEng,
            toiletNameArb,
            toiletNumber,
            latitude,
            longitude,
            toiletImage1,
            toiletImage2,
            toiletImage3,
            toiletVideo,
        });
        await newtoilet.save();
        res.status(200).json({ message: 'Successfully toilet added', newtoilet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to add toilet', error: error.message });
    }
});

router.put('/:toiletId/edit-toilet', async (req, res) => {
    try {
        const { toiletId } = req.params;
        const { toiletNameEng, toiletNameArb, toiletNumber, latitude, longitude, toiletImage1, toiletImage2, toiletImage3, toiletVideo } = req.body;


        if (!toiletNameEng || !latitude || !longitude) {
            return res.status(400).json({ message: 'Missing required fields' });
        }


        const existingtoilet = await ToiletMadina.findById(toiletId);
        if (!existingtoilet) {
            return res.status(404).json({ message: 'toilet not found' });
        }

        existingtoilet.toiletNameEng = toiletNameEng;
        existingtoilet.toiletNameArb = toiletNameArb;
        existingtoilet.toiletNumber = toiletNumber;
        existingtoilet.latitude = latitude;
        existingtoilet.longitude = longitude;


        if (toiletImage1) {
            await deleteFile(toiletImage1);
            existingtoilet.toiletImage1 = toiletImage1;
        }
        if (toiletImage2) {
            await deleteFile(toiletImage2);
            existingtoilet.toiletImage2 = toiletImage2;
        }
        if (toiletImage3) {
            await deleteFile(toiletImage3);
            existingtoilet.toiletImage3 = toiletImage3;
        }
        if (toiletVideo) {
            await deleteFile(toiletVideo);
            existingtoilet.toiletVideo = toiletVideo;
        }
       

        await existingtoilet.save();
        res.status(200).json({ message: 'toilet updated successfully', updatedtoilet: existingtoilet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update toilet', error: error.message });
    }
});

router.get("/get-all-toilets", async (req, res) => {
    try {
        const toilets = await ToiletMadina.find().sort({ _id: -1 });

        if (!toilets || toilets.length === 0) {
            return res.status(404).json({ message: "toilets not found" });
        }

        res.status(200).json({ message: 'toilets fetched successfully', toilets });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch all toilets', error: error.message });
    }
});

router.delete('/:toiletId/delete-toilet', async (req, res) => {
    const { toiletId } = req.params;
    try {
        const currenttoilet = await ToiletMadina.findOne({ _id: toiletId });

        if (!currenttoilet) {
            return res.status(404).json({ message: 'toilet not found' });
        }
        if (currenttoilet.toiletImage1) {
            await deleteFile(currenttoilet.toiletImage1);
        }
        if (currenttoilet.toiletImage2) {
            await deleteFile(currenttoilet.toiletImage2);
        }
        if (currenttoilet.toiletImage3) {
            await deleteFile(currenttoilet.toiletImage3);
        }
        if (currenttoilet.toiletVideo) {
            await deleteFile(currenttoilet.toiletVideo);
        }
        await ToiletMadina.deleteOne({ _id: toiletId });
        return res.status(200).json({ message: 'toilet deleted successfully', currenttoilet });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete toilet', error: error.message });
    }
});



module.exports = router;