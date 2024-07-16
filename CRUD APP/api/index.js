import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./Routes/userRoute.js";
import dotenv from 'dotenv';

const app = express();
dotenv.config();

mongoose
  .connect("mongodb://localhost:27017/crudApp")
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log("Error connecting to database", err));

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Working");
});

// Import routes
app.use("/api/user", userRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});