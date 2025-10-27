import bcrypt from "bcryptjs";
import userModel from "../models/user-model.js";
import tokenizer from "../configs/tokenizer.js";
import transporter from "../configs/nodemailer.js";

const profileUpdater = async (req, res) => {
  try {
    const { firstname, lastname, email, newPassword, password } = req.body;

    const user = await userModel.findById(req.user);

    user.firstname = firstname.trim();
    user.lastname = lastname.trim();

    if (newPassword && newPassword.length > 0) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (req.emailChanged) {
      const token = tokenizer.createEmailUpdateToken(
        user._id,
        email
      );
      const verificationLink = `${process.env.FRONTEND_URL}/user/email/update/verify/token?token=${token}`;

      const mailOptions = {
        from: `"Divara" <${process.env.SENDER_MAIL}>`,
        to: email,
        subject: "Verify your email address",
        html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Email Verification</h2>
          <p>Please verify your email address to change the email address.</p>
          <p>Click the link below to verify your email:</p>
          <a href="${verificationLink}" style="background:#4f46e5;color:white;padding:10px 20px;border-radius:6px;text-decoration:none">Verify Email</a>
          <p>This link will be valid for next 15 minutes.</p>
        </div>
      `,
      };

      await transporter.sendMail(mailOptions);
    }

    await user.save();
    return res.status(200).json({
      message: "Profile updated successfully.",
    });
  } catch (err) {
    console.error("Error during updating profile: " + err.message);
    return res
      .status(500)
      .json({ message: "Server error during updating profile!" });
  }
};

export { profileUpdater };
