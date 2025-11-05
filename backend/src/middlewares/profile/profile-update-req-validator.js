import bcrypt from "bcryptjs";
import userModel from "../../models/user-model.js";

const isValidProfileUpdateReq = async (req, res, next) => {
  try {
    const { firstname, lastname, email, newPassword, password, address } = req.body;

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

    if (address !== undefined && address !== null) {
      if (typeof address !== 'string') {
        return res.status(422).json({
          message: "Address must be a valid text!",
        });
      }

      const trimmedAddress = address.trim();

      if (trimmedAddress.length > 0) {
        if (trimmedAddress.length < 5) {
          return res.status(422).json({
            message: "Address must be at least 5 characters long!",
          });
        }

        if (trimmedAddress.length > 200) {
          return res.status(422).json({
            message: "Address must not exceed 200 characters!",
          });
        }

        const addressRegex = /^[a-zA-Z0-9\s,.\-/#]+$/;
        if (!addressRegex.test(trimmedAddress)) {
          return res.status(422).json({
            message: "Address contains invalid characters!",
          });
        }
      }
    }

    if (newPassword && newPassword.length > 0) {
      if (!passwordRegex.test(newPassword)) {
        return res.status(422).json({
          message:
            "New password must be at least 8 characters, including a number and special character!",
        });
      }
      if (password === newPassword) {
        return res.status(422).json({
          message: "New password must be different from old one!",
        });
      }
    }

    const user = await userModel.findById(req.user);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

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

    const addressChanged = 
      (address !== undefined && address !== null) && 
      (address !== (user.address || ""));

    const noChanges =
      firstname.trim() === user.firstname &&
      lastname.trim() === user.lastname &&
      email.toLowerCase() === user.email.toLowerCase() &&
      (!newPassword || newPassword.length === 0) &&
      (!req.file || req.file === "") &&
      !addressChanged;

    if (noChanges) {
      return res.status(200).json({
        message: "No changes detected!",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Profile validation error:", err.message);
    return res.status(500).json({
      message: "Server error during validation!",
    });
  }
};

export default isValidProfileUpdateReq;