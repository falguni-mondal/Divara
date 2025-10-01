import jwt from "jsonwebtoken";
import sessionModel from "../models/session-model.js";
import { randomUUID } from "crypto";

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const tokenizer = {
  createAccessToken: (id) => {
    return jwt.sign({ sub: id }, accessSecret, { expiresIn: "15m" });
  },
  createRefreshToken: async (id, req) => {
    try {
      const refreshToken = await sessionModel.create({
        jti: randomUUID(),
        user: id,
        expiry_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        device_id: randomUUID(),
        ip_address: req.ip,
        user_agent: req.headers["user-agent"],
      });
      return jwt.sign({ sub: id, jti: refreshToken?.jti }, refreshSecret, {
        expiresIn: "7d",
      });
    } catch (err) {
      console.error("Error while making Refresh Token: " + err.message);
      throw err;
    }
  },
};

export default tokenizer;
