import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
      userName: { type: String, required: true },
      
          productId: {
            type: String,
          },
          productName: { type: String, required: true },
          quantity: {
            type: Number,
            default: 1,
          },
       
      amount: { type: Number, required: true },
      address: { type: Object, required: true },
      status: { type: String, default: "pending" },
    },
    { timestamps: true }
  );
  
  export default mongoose.model("Order", OrderSchema)
  