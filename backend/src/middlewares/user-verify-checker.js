import userModel from "../models/user-model.js"

const isUserVerified = async (req, res, next) => {
    try{
        const user = await userModel.findById(req.user);
    if(!user){
        return res.status(401).json({message: "Invalid User!"})
    }
    if(user?.isVerified){
        next();
    }
    else{
        return res.status(401).json({message: "Please verify your email!"})
    }
    }catch(err){
        console.error("User verify Checker: ", err.message);
        res.status(500).json({message: "Internal server error!"})
    }
}

export default isUserVerified;