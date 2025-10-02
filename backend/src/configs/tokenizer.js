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
    const expMs = 7 * 24 * 60 * 60 * 1000;
    const expiryAt = new Date(Date.now() + expMs);
    const deviceId = req.cookies.deviceId || randomUUID();
    try {
      const session = await sessionModel.create({
        user: id,
        expiry_at: expiryAt,
        device_id: deviceId,
        ip_address: req.ip,
        user_agent: req.headers["user-agent"],
      });
      const token = jwt.sign({ sub: id, jti: session._id.toString() }, refreshSecret, {expiresIn: expMs / 1000});
      return {token, deviceId};
    } catch (err) {
      throw err;
    }
  },
};

export default tokenizer;
