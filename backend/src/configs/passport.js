import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user-model.js";
import transporter from "./nodemailer.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await userModel.findOne({ email: profile.emails[0].value });

        if (!user) {
          user = await userModel.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            isVerified: true,
          });

          const mailOptions = {
            from: `"Divara" <${process.env.SENDER_MAIL}>`,
            to: user.email,
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
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
