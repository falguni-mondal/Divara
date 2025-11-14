import userModel from "../../models/user-model.js";

const isValidRegisterCreds = async (req, res, next) => {
  try {
    const passwordRegex = /^(?=.*[0-9])(?=.*[!+,\-./:;<=>?@]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    const { email, password, firstname, lastname } = req.body;

    if (!email || !password || !firstname || !lastname) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    if(!emailRegex.test(email)){
        return res.status(422).json({message: "Invalid email format!"});
    }

    if(!passwordRegex.test(password)){
        return res.status(422).json({message: "Password must be at least of 8 characters, include a number & special character!"});
    }
    
    if(firstname.length < 3){
        return res.status(422).json({message: "Firstname must be at least 3 characters long!"});
    }

    if(lastname.length < 3){
        return res.status(422).json({message: "Lastname must be at least 3 characters long!"});
    }

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      return res.status(409).json({
        userExist: true,
        message: "User exists",
      });
    }

    next();
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({message: "Server error during regisration!"});
  }
};

export default isValidRegisterCreds;