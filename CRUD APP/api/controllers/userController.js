import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt, { decode } from "jsonwebtoken";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existsUser = await userModel.findOne({ email });

    if (existsUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong credentials" });
    }

    const token = jwt.sign({ id: user.id }, "jwtsecretkey");
    res.cookie("token", token);
    res.status(200).json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found!" });
    }

    const token = jwt.sign({ id: user._id }, "jwtsecretkey", {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hamaadafzal516@gmail.com",
        pass: "qstp ibed fizj ttaa",
      },
    });

    var mailOptions = {
      from: "hamaadafzal516@gmail.com",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5713/resetpassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ success: false, message: "Error Sending Email" });
      } else {
        return res.json({ success: true, message: "Email Sent" });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, "jwtsecretkey");
    const id = decoded.id;

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    await userModel.findByIdAndUpdate(
      { _id: id },
      { password: hashedPassword }
    );

    return res
      .status(200)
      .json({ success: true, message: "Password Updated Successfully!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const verify = async (req, res) => {
  return res.status(200).json({ success: true, message: "Authorized Success" });
};