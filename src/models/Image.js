import mongoose from "mongoose";
import { Schema } from "mongoose";
const ImageSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    image_name: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    modified_url: {
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

const Image = mongoose.model("image", ImageSchema);
Image.createIndexes();
export default Image;
