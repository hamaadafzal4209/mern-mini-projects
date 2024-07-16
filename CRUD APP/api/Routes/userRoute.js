import express from "express";
import {
  forgotPassword,
  login,
  register,
  resetPassword,
  verify,
} from "../controllers/userController.js";
import { verifyUser } from "../middlewares/auth.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);
router.get("/verify", verifyUser, verify);

export default router;
