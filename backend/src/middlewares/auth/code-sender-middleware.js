import userModel from "../../models/user-model.js";

const codeSenderValidator = async (req, res, next) => {
    const email = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if(!email || email === ""){
        return res.status(400).json({message: "Email field is required!"});
    }
    if(!emailRegex.test(email)){
        return res.status(400).json({message: "Invalid email address!"});
    }
    const user = await userModel.findOne({email});
    if(!user){
        return res.status(400).json({message: "No account found!"});
    }

    req.user = user;
    next();
}

export default codeSenderValidator;