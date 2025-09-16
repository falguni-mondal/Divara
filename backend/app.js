import express from "express";
import parser from "cookie-parser";
import cors from "cors";
import connectToDB from "./configs/mongoose-config.js";
import dotenv from "dotenv";

// ROUTE IMPORTS.......................................................
import userRouter from "./routes/user-routes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(parser());

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

// DB CONNECTING.............................................
connectToDB();


// ROUTE INITIALIZATIONS.............................................
app.use("/api/user", userRouter);


export default app;