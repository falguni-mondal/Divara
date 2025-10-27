import bcrypt from "bcryptjs";
import userModel from "../../models/user-model.js";

const isValidProfileUpdateReq = async (req, res, next) => {
  try {
    const { firstname, lastname, email, newPassword, password } = req.body;

    const passwordRegex = /^(?=.*[0-9])(?=.*[!+,\-./:;<=>?@]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({
        message: "Email, password, firstname, and lastname are required!",
      });
    }

    if (!emailRegex.test(email)) {
      return res.status(422).json({ message: "Invalid email format!" });
    }

    if (firstname.trim().length < 3) {
      return res.status(422).json({
        message: "Firstname must be at least 3 characters long!",
      });
    }

    if (lastname.trim().length < 3) {
      return res.status(422).json({
        message: "Lastname must be at least 3 characters long!",
      });
    }

    if (newPassword && newPassword.length > 0) {
      if (!passwordRegex.test(newPassword)) {
        return res.status(422).json({
          message:
            "New password must be at least 8 characters, include a number and special character!",
        });
      }
    }

    const user = await userModel.findById(req.user);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Incorrect account password!",
      });
    }

    if (email.toLowerCase() !== user.email.toLowerCase()) {
      const emailExists = await userModel.findOne({
        email: email.toLowerCase(),
      });

      if (emailExists) {
        return res.status(409).json({
          message: "Email is already in use!",
        });
      }

      req.emailChanged = true;
    }

    const noChanges =
      firstname.trim() === user.firstname &&
      lastname.trim() === user.lastname &&
      email.toLowerCase() === user.email.toLowerCase() &&
      (!newPassword || newPassword.length === 0);

    if (noChanges) {
      return res.status(200).json({
        message: "No changes detected!",
      });
    }

    next();
  } catch (err) {
    console.error("Profile validation error:", err.message);
    return res.status(500).json({ 
      message: "Server error during validation!" 
    });
  }
};

export default isValidProfileUpdateReq;
