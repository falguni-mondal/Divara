import express from "express";
import "dotenv/config";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectToDB from "../server/configs/db/mongoose-config.js";

// CUSTOM MIDDLEWARES
import globalLimiter from "../server/middlewares/global/global-limiter.js";
import setNoCache from "../server/middlewares/global/set-no-cache.js";

// PASSPORT
import passport from "../server/configs/passport.js";

// ROUTES
import authRouter from "../server/routes/auth-router.js";
import profileRouter from "../server/routes/profile-router.js";

const app = express();

// IMPORTANT FIX FOR SERVERLESS
let isConnected = false;
async function ensureDB() {
  if (!isConnected) {
    await connectToDB();
    isConnected = true;
  }
}

// EXPRESS CONFIG
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CONNECT DB FOR EVERY COLD START
app.use(async (req, res, next) => {
  await ensureDB();
  next();
});

// CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? true
        : process.env.FRONTEND_URL,
    credentials: true,
  })
);

// CUSTOM MIDDLEWARES
app.use(globalLimiter); // must be stateless
app.use(setNoCache);

// PASSPORT
app.use(passport.initialize());

// ROUTES
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// NETLIFY FUNCTION HANDLER
export const handler = serverless(app);