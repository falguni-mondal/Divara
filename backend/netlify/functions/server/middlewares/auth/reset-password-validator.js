import bcrypt from "bcryptjs";

const passwordReseterValidator = async (req, res, next) => {
  try {
    const user = req.user;
    const password = req.body.password;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!+,\-./:;<=>?@]).{8,}$/;

    if (!user.forgotPassword.allowed) {
      return res.status(400).json({ message: "Not Verified!" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password required!" });
    }
    if (!passwordRegex.test(password)) {
      return res.status(400).json({ message: "Invalid password!" });
    }
    const isSamePassword = bcrypt.compare(password, user.password);
    if(isSamePassword){
      return res.status(400).json({ message: "Password should be different!" });
    }

    next();
  } catch (err) {
    console.error("password reset midware err: ", err.message);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export default passwordReseterValidator;
