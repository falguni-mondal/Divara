import jwt from "jsonwebtoken";
import tokenizer from "../configs/tokenizer.js";
import sessionModel from "../models/session-model.js";
import { randomUUID } from "crypto";
import { cookieOptions } from "../configs/reusable.js";
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const refreshTokenSetup = async (req, res, next, refreshToken) => {
  if (!refreshToken) {
    return res.status(401).json({
      message: "Unauthorized User!",
    });
  }
  try {
    //finding REFRESH TOKEN in DB
    const refreshTokenData = jwt.verify(refreshToken, refreshSecret);
    const refreshSession = await sessionModel.findById(refreshTokenData.jti);

    // checking for Invalid SESSION in DB
    if (
      !refreshSession ||
      refreshSession?.revoked ||
      refreshSession?.expiry_at <= new Date()
    ) {
      return res.status(401).json({
        message: "Unauthorized User!",
      });
    }

    //matching DEVICE ID
    const reqDeviceId = req.cookies.device_id;

    if (!reqDeviceId || reqDeviceId !== refreshSession.device_id) {
      console.warn({
        event: "suspicious_token_use",
        expectedDevice: refreshSession.device_id,
        gotDevice: reqDeviceId,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
        userId: refreshSession.user,
        timestamp: new Date().toISOString(),
      });
      await sessionModel.updateMany(
        { user: refreshSession.user },
        { revoked: true, expiry_at: new Date() }
      );

      res
        .clearCookie("accessToken", {
          ...cookieOptions,
        })
        .clearCookie("refreshToken", {
          ...cookieOptions,
        })
        .clearCookie("device_id");

      return res.status(401).json({
        message: "Unauthorized User!",
      });
    }


    //matching DEVICE IP ADDRESS
    if (req.ip !== refreshSession.ip_address) {
      console.warn({
        event: "suspicious_token_use",
        device_id: reqDeviceId,
        expectedIp: refreshSession.ip_address,
        gotIp: req.ip,
        userAgent: req.headers["user-agent"],
        userId: refreshSession.user,
        timestamp: new Date().toISOString(),
      });
      await sessionModel.updateMany(
        { user: refreshSession.user },
        { revoked: true, expiry_at: new Date() }
      );

      res
        .clearCookie("accessToken", {
          ...cookieOptions,
        })
        .clearCookie("refreshToken", {
          ...cookieOptions,
        })
        .clearCookie("device_id");

      return res.status(401).json({
        message: "Unauthorized User!",
      });
    }

    //Setting REVOKED = TRUE in DB for the SESSION
    refreshSession.revoked = true;
    await refreshSession.save();

    //ROTATING New Refresh Session in DB
    const newSession = await sessionModel.create({
      user: refreshSession.user,
      expiry_at: refreshSession.expiry_at,
      device_id: req.cookies.device_id || randomUUID(),
      ip_address: req.ip,
      user_agent: req.headers["user-agent"],
    });

    const newRefreshToken = jwt.sign(
      { sub: newSession.user, jti: newSession._id.toString() },
      refreshSecret,
      {
        expiresIn: Math.floor(
          (refreshSession.expiry_at.getTime() - Date.now()) / 1000
        ),
      }
    );

    const newAccessToken = tokenizer.createAccessToken(newSession.user);

    // Setting up fresh Cookies
    res
      .cookie("accessToken", newAccessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie("refreshToken", newRefreshToken, {
        ...cookieOptions,
        maxAge: refreshSession.expiry_at.getTime() - Date.now(),
      })
      .cookie("device_id", newSession?.device_id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
      });

      // Setting up user for further usage
    req.user = newSession?.user.toString();
    return next();
  } catch (refreshTokenErr) {
    console.error(refreshTokenErr.message);
    return res.status(401).json({
      message: "Unauthorized User!",
    });
  }
};

const isValidUser = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return await refreshTokenSetup(req, res, next, refreshToken);
  } else {
    try {
      const accessTokenData = jwt.verify(accessToken, accessSecret);
      req.user = accessTokenData.sub;
      return next();
    } catch (accessTokenErr) {
      console.error(accessTokenErr.message);
      return await refreshTokenSetup(req, res, next, refreshToken);
    }
  }
};

export default isValidUser;
