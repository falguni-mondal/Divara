import nodemailer from "nodemailer";
import { google } from "googleapis";

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

const accessToken = async () => await oAuth2Client.getAccessToken();
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

export default transporter;