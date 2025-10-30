import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";

const emailUpdateTokenValidator = async (req, res, next) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Missing verification token." });
    }

    const data = jwt.verify(token, process.env.VERIFY_TOKEN_SECRET);
    const user = await userModel.findById(data.sub);

    if (!user) {
      return res.status(404).json({ message: "User not found or token invalid." });
    }

    if (!user.pendingEmail || !user.pendingEmailNonce) {
      return res.status(400).json({ message: "No pending email verification." });
    }

    const isNonceMatch = user.pendingEmailNonce === data.nonce;
    const isEmailMatch = user.pendingEmail === data.email;
    const notExpired = user.pendingEmailExpires > Date.now();

    if (!isNonceMatch || !isEmailMatch) {
      return res.status(400).json({ message: "Invalid verification token." });
    }

    if (!notExpired) {
      return res.status(410).json({ message: "Verification token expired." });
    }

    req.user = user;
    req.email = data.email;

    next();
  } catch (err) {
    console.error("Email verification error:", err.message);
    return res.status(400).json({
      message: "Invalid or expired verification token.",
    });
  }
};

export default emailUpdateTokenValidator;