import tokenizer from "../configs/tokenizer.js";
import userDataTrimmer from "../configs/user-trimmer.js";
import sessionModel from "../models/session-model.js";
import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailChecker = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    res.status(400).json(`Error while checking Email: ${err}`);
  }
};

const registerUser = async (req, res) => {
  const { email, password, name } = req.body;
  const userExist = await userModel.findOne({ email });

  if (userExist) {
    return res.status(409).json({
      userExist: true,
      message: "User exists",
    });
  }

  try {
    const user = await userModel.create({
      email,
      password: await bcrypt.hash(password, 10),
      name,
    });

    const accessToken = tokenizer.createAccessToken(user._id);
    const refreshToken = await tokenizer.createRefreshToken(user._id, req);

    res
      .status(201)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie("refreshToken", refreshToken?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .cookie("deviceId", refreshToken?.deviceId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
      })
      .json({
        user: userDataTrimmer(user),
        message: "User registered successfully!",
      });
  } catch (err) {
    res.status(400).json({
      message: "Failed registering user!",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Wrong Credential!",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Wrong Credential!",
      });
    }

    const accessToken = tokenizer.createAccessToken(user._id);
    const refreshToken = await tokenizer.createRefreshToken(user._id, req);

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie("refreshToken", refreshToken?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .cookie("deviceId", refreshToken?.deviceId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
      })
      .json({
        user: userDataTrimmer(user),
        message: "Login successfully!",
      });
  } catch (err) {
    res.status(400).json({
      message: "User login failed!",
      error: err.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    const { refreshToken } = req.cookies;

    try {
      const data = jwt.verify(refreshToken, refreshSecret);
      const session = await sessionModel.findById(`${data.jti}`);
      session.revoked = true;
      session.expiry_at = new Date(Date.now());
      await session.save();
    } catch (err) {
      return res.status(400).json({
        message: "Logout failed!",
        error: err.message,
      });
    }
    return res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json({
        message: "Logout successfully!",
      });
  } catch (err) {
    return res.status(400).json({
      message: "Logout failed!",
      error: err,
    });
  }
};

const verificationLinkSender = (req, res) => {
  res.status(200).json("link send!");
};

export {
  emailChecker,
  registerUser,
  loginUser,
  logoutUser,
  verificationLinkSender,
};
