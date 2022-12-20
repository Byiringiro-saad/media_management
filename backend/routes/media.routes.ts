import express, { Router } from "express";

//controller functions
import {
  getMedia,
  getAllMedias,
  newMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/media.controller";

const router: Router = express.Router();

//routes
router.post("/", newMedia);
router.get("/:id", getMedia);
router.get("/", getAllMedias);
router.put("/:id", updateMedia);
router.delete("/:id", deleteMedia);

export default router;
