import express from "express";
import parser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import connectToDB from "./configs/db/mongoose-config.js";

// ROUTE IMPORTS.......................................................
import authRouter from "./routes/auth-routes.js"


const app = express();

app.set("trust proxy", true);
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
app.use("/api/auth", authRouter);


export default app;