"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
//routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const media_routes_1 = __importDefault(require("./routes/media.routes"));
const app = (0, express_1.default)();
//configs
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//endpoints
app.use("/api/users", user_routes_1.default);
app.use("/api/medias", media_routes_1.default);
exports.default = app;
