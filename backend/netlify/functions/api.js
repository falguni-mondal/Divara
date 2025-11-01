import express, {Router} from "express";
import serverless from "serverless-http";
import parser from "cookie-parser";
import "dotenv/config";
import cors from "cors";
import connectToDB from "../../src/configs/db/mongoose-config.js";

// CUSTOM MIDDLEWARES
import globalLimiter from "../../src/middlewares/global/global-limiter.js";
import setNoCache from "../../src/middlewares/global/set-no-cache.js";

import passport from "../../src/configs/passport.js";

// ROUTE IMPORTS.......................................................
import authRouter from "../../src/routes/auth-router.js";
import profileRouter from "../../src/routes/profile-router.js";


const app = express();
const router = Router();

router.set("trust proxy", true);
router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(parser());

// DB CONNECTING.............................................
connectToDB();


router.use(cors({
    origin: process.env.NODE_ENV === "development" ? true : ["https://divarastore.netlify.app"],
    credentials: true
}))



// CUSTOM MIDDLEWARES
router.use(globalLimiter);
router.use(setNoCache);

// PASSPORT INITIALIZING
router.use(passport.initialize());

// ROUTE INITIALIZATIONS.............................................
router.use("/auth", authRouter);
router.use("/profile", profileRouter);


app.use("/api/", router);
export const handler = serverless(app);