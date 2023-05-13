import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const emailVerificationTokenSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verificationToken: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10m",
  },
  modelOptions,
});

const emailVerificationTokenModel = mongoose.model(
  "emailVerificationToken",
  emailVerificationTokenSchema
);

export default emailVerificationTokenModel;
