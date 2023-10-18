import express from "express";
import { helloUserRoute } from "../controllers/user.controller.js";
const router = express.Router();

router.get("/", helloUserRoute);

export default router;
