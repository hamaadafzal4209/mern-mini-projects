import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existsUser = await userModel.findOne({ email });

    if (existsUser) {
      return res.json("user already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.json({ success: true, message: "User created successfully",user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
