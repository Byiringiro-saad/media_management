"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const user_controller_1 = __importDefault(require("./user/user.controller"));
const media_controller_1 = __importDefault(require("./media/media.controller"));
const app = new app_1.default([new user_controller_1.default(), new media_controller_1.default()]);
app.listen();
