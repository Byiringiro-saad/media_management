"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//controller function
const user_controller_1 = require("../controllers/user.controller");
const router = express_1.default.Router();
//routes
router.get("/:id", user_controller_1.getUser);
router.post("/login", user_controller_1.login);
router.put("/:id", user_controller_1.updateUser);
router.post("/signup", user_controller_1.signup);
router.delete("/:id", user_controller_1.deleteUser);
exports.default = router;
