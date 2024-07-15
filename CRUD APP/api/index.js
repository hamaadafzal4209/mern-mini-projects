import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const app = express();

mongoose
  .connect("mongodb://localhost:27017/crudApp")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error connecting to database", err));

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Working")
})



app.post("/register", (req,res) => {
    
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});