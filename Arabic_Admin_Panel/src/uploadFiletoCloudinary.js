import axios from "axios";

export const uploadtoCloudinary = async (file, folderName) => {
    try {
        const cloudName = 'dh61apvbf';
        const uploadPreset = 'wbznzo2g';
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", uploadPreset);
        formData.append('folder', folderName);
        const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData); // Changed the URL endpoint for image uploads
        console.log("upload" , response.data.secure_url)
        return response.data.secure_url
    } catch (error) {
        console.error('Error uploading image:', error);
        throw error; // Throw the error to propagate it to the calling code
    }
};


