const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose
    .connect("mongodb://127.0.0.1:27017/loginsystem", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB", err));

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;

    try {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const user = await userModel.create({
                    name,
                    email,
                    password: hash
                });
                res.status(201).json(user);
            });
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Error creating user", error });
    }
});

app.post("/logout", (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: 'strict' });
    res.status(200).json({ message: "Logout successful" });
});


app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ message: "No record found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect Password" });
        }
        const token = jwt.sign({ id: user._id, email: user.email }, "jdhjshdjhsdjhsjkdhs", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        res.status(200).json({ message: "Success", user });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Error logging in user", error });
    }
});

app.listen(3000, () => {
    console.log("Server is running at PORT: 3000");
});
