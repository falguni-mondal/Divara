import jwt from "jsonwebtoken";
import tokenizer from "../configs/tokenizer.js";
const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const isValidUser = (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken) {
    if (!refreshToken) {
      return res.status(401).json({
        message: "Session Expired!",
      });
    }
    try {
      const user = jwt.verify(refreshToken, refreshSecret);
      const newAccessToken = tokenizer.createAccessToken(user.id);
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      });
      req.user = user;
      return next();
    } catch (refreshTokenErr) {
      return res.status(401).json({
        error: refreshTokenErr.message,
        message: "Unauthorized User!",
      });
    }
  } else {
    try {
      const user = jwt.verify(accessToken, accessSecret);
      req.user = user;
      return next();
    } catch (accessTokenErr) {
      if (!refreshToken) {
        return res.status(401).json({
          message: "Session Expired!",
        });
      }
      try {
        const user = jwt.verify(refreshToken, refreshSecret);
        const newAccessToken = tokenizer.createAccessToken(user.id);
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 15 * 60 * 1000,
        });
        req.user = user;
        return next();
      } catch (refreshTokenErr) {
        return res.status(401).json({
          error: refreshTokenErr.message,
          message: "Unauthorized User!",
        });
      }
    }
  }
};

export default isValidUser;
