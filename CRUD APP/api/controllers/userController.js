import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    res.json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email});

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong Cradientials" });
    }

    const token = jwt.sign({ id: user.id }, "jkdjdiejnnjdn");
    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};
