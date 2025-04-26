import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: { type: String },
  username: {
    type: String,
    required: true,
  },
  profilepic: {
    type: String,
    default: "https://www.gravatar.com/avatar/",
  },
  coverpic: {
    type: String,
    default: "https://www.gravatar.com/avatar/",
  },
  paypayid: { type: String },
  paypaysecret: { type: String },
  createdate: {
    type: Date,
    default: Date.now,
  },
  updatedate: {
    type: Date,
    default: Date.now,
  },
});

export default models.User || model("User", userSchema);
