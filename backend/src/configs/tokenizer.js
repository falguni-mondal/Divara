// import "dotenv/config";
import jwt from "jsonwebtoken";

const accessSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN_SECRET;

const tokenizer = {
  createAccessToken: (id) => {
    return jwt.sign({ id: id }, accessSecret, {expiresIn: "15m"});
  },
  createRefreshToken: (email) => {
    return jwt.sign({ email: email }, refreshSecret, {expiresIn: "7d"});
  },
};

export default tokenizer;
