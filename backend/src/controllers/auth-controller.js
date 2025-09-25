import tokenizer from "../configs/tokenizer.js";
import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";

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
  // const contactExist = await userModel.findOne({"contact.dial_code" : contact.dial_code, "contact.number" : contact.number});

  if (userExist) {
    return res.status(409).json({
      userExist: true,
      // contactExist: contactExist && true,
      message: "User exists",
    });
  }


  try {
    const user = await userModel.create({
      email,
      password: await bcrypt.hash(password, 10),
      name,
      // contact,
    });

    const accessToken = tokenizer.createAccessToken(user._id);
    const refreshToken = tokenizer.createRefreshToken(user.email);

    res
      .status(201)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .json({
        user,
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
    const refreshToken = tokenizer.createRefreshToken(user.email);

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes in milliseconds
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      })
      .json({
        user,
        message: "User login successfully!",
      });
  } catch (err) {
    res.status(401).json({
      message: "User login failed!",
      error: err,
    });
  }
};

const logoutUser = (req, res) => {
  try {
    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      })
      .status(200)
      .json({
        message: "Logout successfully!",
      });
  } catch (err) {
    res.status(400).json({
      message: "Logout failed!",
      error: err,
    });
  }
};

export { emailChecker, registerUser, loginUser, logoutUser };
