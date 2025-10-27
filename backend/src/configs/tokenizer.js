import jwt from "jsonwebtoken";
import sessionModel from "../models/session-model.js";
import { randomUUID } from "crypto";

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
const verifySecret = process.env.VERIFY_TOKEN_SECRET;

const tokenizer = {
  createAccessToken: (id) => {
    return jwt.sign({ sub: id }, accessSecret, { expiresIn: "15m" });
  },
  createRefreshToken: async (id, req) => {
    const expMs = 7 * 24 * 60 * 60 * 1000;
    const expiryAt = new Date(Date.now() + expMs);
    const device_id = req.cookies.device_id || randomUUID();
    try {
      const session = await sessionModel.create({
        user: id,
        expiry_at: expiryAt,
        device_id: device_id,
        ip_address: req.ip,
        user_agent: req.headers["user-agent"],
      });
      const token = jwt.sign({ sub: id, jti: session._id.toString() }, refreshSecret, {expiresIn: expMs / 1000});
      return {token, device_id};
    } catch (err) {
      throw err;
    }
  },
  createVerifyToken: (id) => {
    return jwt.sign({ sub: id }, verifySecret, { expiresIn: "15m" });
  },

  createEmailUpdateToken: (id, email) => {
    return jwt.sign({ sub: id, email }, verifySecret, { expiresIn: "15m" });
  }
};

export default tokenizer;
