import express from "express";
import UserController from "../controllers/controllers.auth";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

export default router;
