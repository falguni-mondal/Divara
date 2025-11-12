import userModel from "../../models/user-model";

const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user);

    if (!user.role === "admin" && !user.role === "super-admin") {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("isAdmin mid: ", err.message);
    return res.status(400).json({ message: "Internal Server Error!" });
  }
};

export default isAdmin;
