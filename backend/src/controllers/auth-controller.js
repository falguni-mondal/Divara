import transporter from "../configs/nodemailer.js";
import { cookieOptions, randomDP } from "../configs/reusable.js";
import tokenizer from "../configs/tokenizer.js";
import userDataTrimmer from "../configs/user-trimmer.js";
import sessionModel from "../models/session-model.js";
import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!email || email.length === 0 || !emailRegex.test(email)) {
      return res.status(422).json({ message: "Invalid email format!" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(200).json(true);
    } else {
      res.status(200).json(false);
    }
  } catch (err) {
    console.error(err.message);
    res.status(400).json({ message: "Internal server error!" });
  }
};

const registerUser = async (req, res) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    const name =
      firstname.charAt(0).toUpperCase() +
      firstname.slice(1) +
      " " +
      (lastname.charAt(0).toUpperCase() + lastname.slice(1));

    const user = await userModel.create({
      email,
      password: await bcrypt.hash(password, 10),
      firstname,
      lastname,
      name,
      profileBackground: randomDP(),
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

    if (!user || !password) {
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
      message: "Invalid Credentials!",
    });
  }
};

const googleCallback = async (req, res) => {
  try {
    const user = req.user;

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
      .redirect(`${process.env.FRONTEND_URL}/profile`);
  } catch (err) {
    console.error(err.message);
    res.redirect(`${process.env.FRONTEND_URL}/account?error=google_failed`);
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
    const user = await userModel.findById(req.user);
    if (user.lastVerifyLink) {
      const lastSent = new Date(user.lastVerifyLink).getTime();
      const current = Date.now();
      const limit = 5 * 60 * 1000;
      if (current - lastSent < limit) {
        const remaining = Math.ceil((limit - (current - lastSent)) / 60000);
        return res.status(429).json({
          message: `Please wait ${remaining} more minute(s) to send a new link.`,
        });
      }
    }

    const nonce = randomUUID();
    const token = tokenizer.createEmailVerifyToken(user._id, user.email, nonce);

    user.pendingEmail = user.email;
    user.pendingEmailNonce = nonce;
    user.pendingEmailExpires = Date.now() + 15 * 60 * 1000;

    const verificationLink = `${process.env.FRONTEND_URL}/user/email/verify/token?token=${token}`;

    const mailOptions = {
      from: `"Divara" <${process.env.SENDER_MAIL}>`,
      to: user.email,
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

    if (result.response) {
      user.lastVerifyLink = new Date();
    }
    await user.save();

    res.status(200).json({ message: "Verification link sent!" });
  } catch (err) {
    console.log("Error while sending verification link: " + err.message);
    res.status(400).json({ message: "Failed sending verification link!" });
  }
};

const emailVerifier = async (req, res) => {
  try {
    const user = req.user;
    const email = req.email;

    user.email = email;
    user.isVerified = true;
    user.lastVerifyLink = undefined;
    user.pendingEmail = null;
    user.pendingEmailNonce = null;
    user.pendingEmailExpires = null;

    const mailOptions = {
      from: `"Divara" <${process.env.SENDER_MAIL}>`,
      to: email,
      subject: "Welcome to Divara",
      html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Divara</title>
            </head>
            <body style="margin:0;padding:0;background-color:#f8f8f8;font-family:'Segoe UI',Arial,sans-serif;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8f8f8;padding:40px 0;">
                <tr>
                  <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.08);">
                      
                      <!-- Header -->
                      <tr>
                        <td align="center" style="background-color:#000;padding:20px;">
                          <img src="${process.env.FRONTEND_URL}/logo.png" alt="Divara Logo" style="max-width:120px;display:block;">
                        </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                        <td style="padding:30px;text-align:left;">
                          <h1 style="color:#000;font-size:26px;margin:0 0 10px 0;letter-spacing:0.5px;">Welcome to Divara</h1>
                          <p style="color:#555;font-size:16px;line-height:1.6;margin:10px 0;">
                            Dear <strong>${user.name}</strong>,
                          </p>
                          <p style="color:#555;font-size:16px;line-height:1.6;margin:10px 0;">
                            Your account has been created successfully — we’re delighted to have you join the <strong>Divara</strong> family.
                          </p>
                          <p style="color:#555;font-size:16px;line-height:1.6;margin:10px 0;">
                            Discover timeless luxury, exceptional craftsmanship, and curated fashion designed for elegance.
                          </p>
                          <a href="${process.env.FRONTEND_URL}"
                            style="display:inline-block;margin-top:25px;padding:12px 28px;background-color:#d4af37;color:#000;text-decoration:none;border-radius:3px;font-size:15px;font-weight:600;letter-spacing:0.5px;">
                            Explore Now
                          </a>
                        </td>
                      </tr>
  
                      <!-- Footer -->
                      <tr>
                        <td align="center" style="background-color:#f2f2f2;padding:15px;">
                          <p style="margin:0;font-size:13px;color:#777;">© Divara. All rights reserved.</p>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
            </body>
          </html>
          `,
    };

    await transporter.sendMail(mailOptions);

    await user.save();

    return res.status(200).json({ message: "Email verification successfull!" });
  } catch (err) {
    console.error("Verification Error:", err.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

const codeSender = async (req, res) => {
  try {
    const email = req.body.email;
    const code = Math.floor(100000 + Math.random() * 900000);

    const user = req.user;
    user.passwordResetCode = code;

    const mailOptions = {
      from: `"Divara" <${process.env.SENDER_MAIL}>`,
      to: email,
      subject: "Reset Your Password",
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Reset Password</h2>
          <p>Use this code to reset your password:</p>
          <p style="font-size: "2rem"">${code}</p>
          <p>This code will be valid for next 15 minutes.</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    if (result.response) {
      user.passwordResetCodeExpires = new Date(Date.now() + 15 * 60 * 1000);
    }
    await user.save();

    res.status(200).json({ message: "Reset code sent!" });
  } catch (err) {
    console.error("error while sendng code for reseting password: ", err.message);
    res.status(400).json({ message: "Internal server error!" });
  }
};

const accountReseter = async (req, res) => {
  try {
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET;
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(400).json({ message: "No refresh token found!" });
    }
    const data = jwt.verify(refreshToken, refreshSecret);

    await sessionModel.deleteMany({ user: data.sub });
    await userModel.findOneAndDelete({ _id: req.user });

    return res
      .clearCookie("accessToken", {
        ...cookieOptions,
      })
      .clearCookie("refreshToken", {
        ...cookieOptions,
      })
      .status(200)
      .json({
        message: "Account reseting successfull!",
      });
  } catch (err) {
    console.error("Account Reseting Error: " + err.message);
    res.status(400).json({
      message: "Failed resetting account!",
    });
  }
};

export {
  authChecker,
  emailChecker,
  registerUser,
  loginUser,
  verificationLinkSender,
  emailVerifier,
  codeSender,
  logoutUser,
  accountReseter,
  googleCallback,
};
