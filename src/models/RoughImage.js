import mongoose from "mongoose";
import { Schema } from "mongoose";
const RoughImageSchema = new Schema(
  {
    rough_image_name: {
      type: String,
      required: true,
      unique: true,
    },
    rough_image_media_url: {
      type: String,
      required: true,
    },
    rough_modified_url: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const RoughImage = mongoose.model("roughImage", RoughImageSchema);
RoughImage.createIndexes();
export default RoughImage;
