import { cookieOptions } from "../configs/reusable.js";
import tokenizer from "../configs/tokenizer.js";
import userDataTrimmer from "../configs/user-trimmer.js";
import sessionModel from "../models/session-model.js";
import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const authChecker = async (req, res) => {
  const id = req.user;
  const user = await userModel.findById(id);
  if (!user) {
    return res.status(400).json({
      message: "Invalid User!",
    });
  }
  return res.status(200).json(userDataTrimmer(user));
};

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
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie("refreshToken", refreshToken?.token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .cookie("device_id", refreshToken?.device_id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
      })
      .json(userDataTrimmer(user));
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      message: "Failed registering user!",
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

    await sessionModel.updateMany(
      { user: user._id },
      { revoked: true, expiry_at: new Date() }
    );
    const accessToken = tokenizer.createAccessToken(user._id);
    const refreshToken = await tokenizer.createRefreshToken(user._id, req);

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie("refreshToken", refreshToken?.token, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .cookie("device_id", refreshToken?.device_id, {
        ...cookieOptions,
        maxAge: 365 * 24 * 60 * 60 * 1000, // 365 days in milliseconds
      })
      .json(userDataTrimmer(user));
  } catch (err) {
    console.error(err.message);
    res.status(400).json({
      message: "User login failed!",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    const { refreshToken } = req.cookies;

    try {
      const data = jwt.verify(refreshToken, refreshSecret);
      await sessionModel.updateMany(
        { user: data.sub },
        { revoked: true, expiry_at: new Date() }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(400).json({
        message: "Logout failed!",
      });
    }
    return res
      .clearCookie("accessToken", {
        ...cookieOptions,
      })
      .clearCookie("refreshToken", {
        ...cookieOptions,
      })
      .status(200)
      .json({
        message: "Logout successfully!",
      });
  } catch (err) {
    console.error(err.message);
    return res.status(400).json({
      message: "Logout failed!",
    });
  }
};

const verificationLinkSender = async (req, res) => {
  try {
    const {userEmail, frontendBaseUrl} = req.body;
    const token = tokenizer.createAccessToken(req.user);
    const verificationLink = `${frontendBaseUrl}/account/verify/token=?${token}`
    const {
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REFRESH_TOKEN,
      GOOGLE_REDIRECT_URI,
      SENDER_MAIL,
    } = process.env;

    const oAuth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      GOOGLE_REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: SENDER_MAIL,
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        refreshToken: GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `"Divara" <${SENDER_MAIL}>`,
      to: userEmail,
      subject: "Verify your email address",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Email Verification</h2>
          <p>Click the link below to verify your email:</p>
          <a href="${verificationLink}" style="background:#4f46e5;color:white;padding:10px 20px;border-radius:6px;text-decoration:none">Verify Email</a>
          <p>This link will be valid for next 15 minutes.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(result.response);
    res.status(200).json({message: "Verification link sent!"});

  } catch (err) {
    console.log(err.message);
    res.status(400).json({message: "Failed sending verification link!"});
  }
};

export {
  authChecker,
  emailChecker,
  registerUser,
  loginUser,
  logoutUser,
  verificationLinkSender,
};
