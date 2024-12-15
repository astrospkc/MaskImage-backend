import express from "express";
import uploadOnCLoudinary from "../utils/cloudinary.js";
import RoughImage from "../models/RoughImage.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

const RoughImageUpload = async (req, res) => {
  const { rough_image_name } = req.body;
  let localFilePath;
  if (req.files && "rough_image_media_url" in req.files) {
    localFilePath = req.files.rough_image_media_url[0]?.path;
  }

  const file = await uploadOnCLoudinary(localFilePath);
  console.log("url, secure_url", file.url, file.secure_url);

  const roughImage = await RoughImage.create({
    rough_image_name,
    rough_image_media_url: file.url,
    rough_modified_url: file.secure_url,
  });
  res.status(200).json({ roughImage });
};

router
  .route("/uploadImage")
  .post(upload.fields([{ name: "rough_image_media_url" }]), RoughImageUpload);

export default router;
