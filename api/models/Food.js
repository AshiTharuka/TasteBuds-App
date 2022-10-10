import mongoose from "mongoose";
const FoodSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: {
      type: [String],
    },
    desc: {
      type: String,
      required: true,
    },
    foodNumbers: [{ number: Number, unavailableDates: {type: [Date]}}],
  },
  { timestamps: true }
);

export default mongoose.model("Food", FoodSchema);
