import express from "express";
import { forgotPassword, login, register, resetPassword } from "../controllers/userController.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

export default router;
