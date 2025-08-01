import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (filePath, folderName = 'uploads') => {
    try {
        console.log(filePath, folderName);
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName,
            resource_type: 'auto' // Automatically detect the resource type (image, video, etc.)
        });

        fs.unlink(filePath, (err) => {      
            if (err) console.error("Error deleting temp file:", err);
            console.log("Deleting image from temp folder");
        })

        console.log(result, "result");
        return result;
    } catch (error) {
        throw new Error("Cloudinary Upload Failed: " + error.message);
    }
};

export const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error("Cloudinary Deletion Failed: " + error.message);
    }
};

export default cloudinary;