import express from "express";
import parser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import connectToDB from "./configs/db/mongoose-config.js";

// CUSTOM MIDDLEWARES
import globalLimiter from "./middlewares/global/global-limiter.js";
import setNoCache from "./middlewares/global/set-no-cache.js";

import passport from "./configs/passport.js";

// ROUTE IMPORTS.......................................................
import authRouter from "./routes/auth-router.js";
import profileRouter from "./routes/profile-router.js";
import adminRouter from "./routes/admin-router.js";


const app = express();

app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(parser());

// DB CONNECTING.............................................
connectToDB();


app.use(cors({
    origin: process.env.NODE_ENV === "development" ? true : ["https://myfrontendLink.com"],
    credentials: true
}))



// CUSTOM MIDDLEWARES
app.use(globalLimiter);
app.use(setNoCache);

// PASSPORT INITIALIZING
app.use(passport.initialize());

// ROUTE INITIALIZATIONS.............................................
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/admin", adminRouter);


export default app;