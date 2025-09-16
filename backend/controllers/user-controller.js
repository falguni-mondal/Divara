import userModel from "../models/user-model.js";

const emailChecker = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if(user){
        res.status(200).json(true);
    }
    else{
        res.status(200).json(false);
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

export {emailChecker}