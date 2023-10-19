import express from "express";
import { helloUserRoute, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = express.Router();

router.get("/", helloUserRoute);
router.post("/update/:id", verifyToken, updateUser);

export default router;
