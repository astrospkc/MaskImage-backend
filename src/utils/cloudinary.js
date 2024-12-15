import { v2 as cloudinary } from "cloudinary";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();
// configuration

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // Click 'View API Keys' above to copy your API secret
});

const uploadOnCLoudinary = async (localFilePath) => {
  console.log("localfile path: ", localFilePath);
  try {
    if (!localFilePath) return null;

    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("file uploaded on cloudinary ", uploadResult.url);
    fs.unlink(localFilePath, () =>
      console.log("file deleted from working directory")
    );
    return uploadResult;
  } catch (error) {
    fs.unlink(localFilePath, () => console.log("file got deleted")); // removing the locally saved file as the operation got failed
    return null;
  }
};

export default uploadOnCLoudinary;
