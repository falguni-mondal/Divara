import bcrypt from "bcryptjs";
import userModel from "../models/user-model.js";
import tokenizer from "../configs/tokenizer.js";
import transporter from "../configs/nodemailer.js";
import { randomUUID } from "crypto";

const profileUpdater = async (req, res) => {
  try {
    const { firstname, lastname, email, newPassword } = req.body;

    const user = await userModel.findById(req.user);

    user.firstname = firstname.trim();
    user.lastname = lastname.trim();

    if (newPassword && newPassword.length > 0) {
      user.password = await bcrypt.hash(newPassword, 10);
    }

    if (req.emailChanged) {
      const nonce = randomUUID();
      const token = tokenizer.createEmailUpdateToken(user._id, email, nonce);

      user.pendingEmail = email;
      user.pendingEmailNonce = nonce;
      user.pendingEmailExpires = Date.now() + 15 * 60 * 1000;

      const verificationLink = `${process.env.FRONTEND_URL}/user/email/update/token?token=${token}`;

      const mailOptions = {
        from: `"Divara" <${process.env.SENDER_MAIL}>`,
        to: email,
        subject: "Verify your email address",
        html: `
        <div style="font-family:Arial,sans-serif;line-height:1.5">
          <h2>Email Verification</h2>
          <p>Please verify your email to update the address.</p>
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

const emailUpdater = async (req, res) => {
  try {
    const user = req.user;
    const email = req.email;

    user.email = email;
    user.isVerified = true;
    user.pendingEmail = null;
    user.pendingEmailNonce = null;
    user.pendingEmailExpires = null;

    const mailOptions = {
      from: `"Divara" <${process.env.SENDER_MAIL}>`,
      to: email,
      subject: "Email Update Successfully",
      html: `
          <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="UTF-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1.0" />
              <title>Email Updated Successfully</title>
            </head>

            <body
              style="margin:0;padding:0;background-color:#f8f8f8;font-family:'Segoe UI',Arial,sans-serif;"
            >
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="background-color:#f8f8f8;padding:40px 0;"
              >
                <tr>
                  <td align="center">
                    <table
                      width="600"
                      cellpadding="0"
                      cellspacing="0"
                      border="0"
                      style="background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 10px rgba(0,0,0,0.08);"
                    >
                      <!-- Header -->
                      <tr>
                        <td
                          align="center"
                          style="background-color:#000;padding:20px;"
                        >
                          <img
                            src="${process.env.FRONTEND_URL}/logo.png"
                            alt="Divara Logo"
                            style="max-width:120px;display:block;"
                          />
                        </td>
                      </tr>

                      <!-- Content -->
                      <tr>
                        <td style="padding:30px;text-align:left;">
                          <h1
                            style="color:#000;font-size:26px;margin:0 0 10px;letter-spacing:0.5px;"
                          >
                            Email Updated Successfully
                          </h1>
                          <p
                            style="color:#555;font-size:16px;line-height:1.6;margin:10px 0;"
                          >
                            Dear <strong>${user.name}</strong>,
                          </p>
                          <p
                            style="color:#555;font-size:16px;line-height:1.6;margin:10px 0;"
                          >
                            This is to confirm that the primary email address associated
                            with your <strong>Divara</strong> account has been changed
                            successfully to:
                          </p>
                          <p
                            style="color:#000;font-size:16px;line-height:1.6;margin:15px 0;font-weight:600;"
                          >
                            ${email}
                          </p>
                          <p
                            style="color:#555;font-size:16px;line-height:1.6;margin:10px 0;"
                          >
                            If you did not request this change, please contact our support
                            team immediately to secure your account.
                          </p>
                          <a
                            href="${process.env.FRONTEND_URL}"
                            style="display:inline-block;margin-top:25px;padding:12px 28px;background-color:#d4af37;color:#000;text-decoration:none;border-radius:3px;font-size:15px;font-weight:600;letter-spacing:0.5px;"
                          >
                            Visit Divara
                          </a>
                        </td>
                      </tr>

                      <!-- Footer -->
                      <tr>
                        <td
                          align="center"
                          style="background-color:#f2f2f2;padding:15px;"
                        >
                          <p style="margin:0;font-size:13px;color:#777;">
                            © Divara. All rights reserved.
                          </p>
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

export { profileUpdater, emailUpdater };
