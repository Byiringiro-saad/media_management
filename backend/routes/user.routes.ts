import express, { Router } from "express";

//controller function
import {
  login,
  signup,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/user.controller";

const router: Router = express.Router();

//routes
router.get("/:id", getUser);
router.post("/login", login);
router.put("/:id", updateUser);
router.post("/signup", signup);
router.delete("/:id", deleteUser);

export default router;
