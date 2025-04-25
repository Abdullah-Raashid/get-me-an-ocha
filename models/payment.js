import mongoose from "mongoose";
const { Schema, model } = mongoose;

// generates database entries in the database

const paymentSchema = new Schema({
  name: {
    type: String,
    ref: "User",
    required: true,
  },
  email: {
    type: String,
    ref: "User",
    required: true,
  },
  to_user: {
    type: String,
    ref: "User",
  },
  oid: {
    type: String,
  },
  message: {
    type: String,
    default: "",
  },
  //   from_user: {
  //     type: String,
  //     ref: 'User',
  //   },
  amount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  done: { type: Boolean, default: false },
});
export default mongoose.models.Payment || model("Payment", paymentSchema);
