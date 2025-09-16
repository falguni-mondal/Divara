import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  contact: {
    type: {
      prefix: {
        type: String,
        default: "+91"
      },
      number: {type: Number}
    },
    require: true,
  },
  dob: {
    type: {
      day: {type: Number},
      month: {type: Number},
      year: {type: Number}
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