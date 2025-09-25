import mongoose from "mongoose";

const connectToDB = () => {
    mongoose
    .connect(`${process.env.MONGODB_URI}divara`)
    .then(() => {
        console.log("DB connected!");
    })
}

export default connectToDB;