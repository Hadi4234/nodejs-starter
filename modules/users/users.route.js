import express from "express";
import { userControllers } from "./users.controller.js";

const router = express.Router();

router.post("/users", userControllers.createUser);
router.get("/users", userControllers.getAllUser);
router.get("/users/:id", userControllers.getUserById);

export const userRouter = router;
