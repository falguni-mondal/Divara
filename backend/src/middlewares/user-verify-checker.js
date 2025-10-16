import userModel from "../models/user-model.js"

const isUserVerified = async (req, res, next) => {
    const user = await userModel.findById(req.user);
    if(user?.isVerified){
        next();
    }
    else{
        return res.status(401).json({message: "Please verify your email!"})
    }
}

export default isUserVerified;