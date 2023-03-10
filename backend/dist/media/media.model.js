"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mediaSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    cloudinaryId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["private", "public"],
    },
    type: {
        type: String,
        required: true,
    },
    upvotes: {
        type: [mongoose_1.default.Schema.Types.ObjectId],
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
});
exports.default = mongoose_1.default.model("Media", mediaSchema);
