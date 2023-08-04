import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authControllers.js";

const router = express.Router();

router.get("/", (req, res) => res.status(200).json("user api called"));
router.post("/token", loginController);
router.post("/register", registerController);

export default router;
