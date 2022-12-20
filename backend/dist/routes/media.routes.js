"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller functions
const media_controller_1 = require("../controllers/media.controller");
const router = express_1.default.Router();
//routes
router.post("/", media_controller_1.newMedia);
router.get("/:id", media_controller_1.getMedia);
router.get("/", media_controller_1.getAllMedias);
router.put("/:id", media_controller_1.updateMedia);
router.delete("/:id", media_controller_1.deleteMedia);
exports.default = router;
