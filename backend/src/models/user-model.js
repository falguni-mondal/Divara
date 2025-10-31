import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    profileImage: {
      type: String,
      default: null
    },
    profileImageId: {
      type: String,
      default: null
    },
    name: {
      type: String,
      require: true,
    },
    firstname: {
      type: String,
    },
    lastname: {
      type: String,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    pendingEmail: {
      type: String,
      default: null,
      lowercase: true,
      trim: true,
    },
    pendingEmailNonce: {
      type: String,
      default: null,
    },
    pendingEmailExpires: {
      type: Date,
      default: null,
    },
    googleId: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastVerifyLink: {
      type: Date,
      default: null,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cart",
    },
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("user", userSchema);
