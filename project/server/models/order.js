import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    orderContents: {
      type: Array,
      required: true
    },
    dateOfOrder: {
      type: Date
    }
  },
  { timestamps: true }
);

const order = mongoose.model("orders", orderSchema);

export default order;
