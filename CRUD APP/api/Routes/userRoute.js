import express from "express";
import { forgotPassword, login, register } from "../controllers/userController.js";
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/forgotpassword", forgotPassword);

export default router;
