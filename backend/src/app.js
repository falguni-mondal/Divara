import express from "express";
import parser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import connectToDB from "./configs/db/mongoose-config.js";

// CUSTOM MIDDLEWARES
import globalLimiter from "./middlewares/global/global-limiter.js";

// ROUTE IMPORTS.......................................................
import authRouter from "./routes/auth-routes.js"


const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(parser());

app.use(cors({
    origin: process.env.NODE_ENV === "development" ? true : ["https://myfrontendLink.com"],
    credentials: true
}))

// CUSTOM MIDDLEWARES
app.use(globalLimiter);

// DB CONNECTING.............................................
connectToDB();


// ROUTE INITIALIZATIONS.............................................
app.use("/api/auth", authRouter);


export default app;