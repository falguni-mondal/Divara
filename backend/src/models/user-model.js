import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
  },
  contact: {
    type: {
      country: {type: String},
      country_code: {type: String},
      dial_code: {type: String},
      number: {type: String}
    },
    require: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cart",
  },
  saved: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product"
    }
  ],
  orders: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }
  ]
}, {timestamps: true});

export default mongoose.model("user", userSchema);