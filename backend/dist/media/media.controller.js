"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const express_1 = require("express");
//files
const media_model_1 = __importDefault(require("./media.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
//middleware
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
class MediaController {
    constructor() {
        this.path = "/medias";
        this.router = (0, express_1.Router)();
        this.cloudinary = cloudinary_1.v2;
        //new media
        this.createMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                title: req.body.title,
                status: req.body.status,
                type: req.body.type,
                user: req.user,
            };
            console.log(data);
            try {
                //check user
                const user = yield user_model_1.default.findById(data.user);
                if (!user) {
                    res.status(404).json({ message: "User not found!" });
                    return;
                }
                //upload to cloudinary
                const result = yield this.cloudinary.uploader.upload(req.file.path, {
                    folder: "Temp/SaadMedius",
                });
                //save to database
                const media = new media_model_1.default(Object.assign(Object.assign({}, data), { url: result.secure_url, cloudinaryId: result.public_id }));
                const newMedia = yield media.save();
                //update user
                yield user_model_1.default.findByIdAndUpdate(data.user, {
                    $push: { medias: media === null || media === void 0 ? void 0 : media._id },
                });
                // send response
                res.status(201).json({ message: "Media created!", media: newMedia });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //get media
        this.getMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: req.params.id,
            };
            try {
                const media = yield media_model_1.default.findById(data.id);
                if (!media) {
                    res.status(404).json({ message: "Media not found!" });
                    return;
                }
                res.status(200).json({ message: "Media found!", media: media });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //get all media (public)
        this.getPublicMedias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const medias = yield media_model_1.default.find({ status: "public" });
                if (!medias) {
                    res.status(404).json({ message: "Medias not found!" });
                    return;
                }
                res.status(200).json({ message: "Medias found!", medias: medias });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //get all media (private)
        this.getPrivateMedias = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: req.user,
            };
            //check user
            const user = yield user_model_1.default.findById(data.id);
            if (!user) {
                res.status(400).json({ message: "User not found!" });
                return;
            }
            try {
                const medias = yield media_model_1.default.find({
                    status: "private",
                    user: data.id,
                });
                if (!medias) {
                    res.status(404).json({ message: "Medias not found!" });
                    return;
                }
                res.status(200).json({ message: "Medias found!", medias: medias });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //turn media to public
        this.turnIntoPublic = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: req.params.id,
            };
            try {
                const media = yield media_model_1.default.findById(data.id);
                if (!media) {
                    res.status(404).json({ message: "Media not found!" });
                    return;
                }
                //update media
                const updatedMedia = yield media_model_1.default.findByIdAndUpdate(data.id, {
                    status: "public",
                });
                res.status(200).json({ message: "Media updated!" });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //turn media to private
        this.turnIntoPrivate = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: req.params.id,
            };
            try {
                const media = yield media_model_1.default.findById(data.id);
                if (!media) {
                    res.status(404).json({ message: "Media not found!" });
                    return;
                }
                //update media
                const updatedMedia = yield media_model_1.default.findByIdAndUpdate(data.id, {
                    status: "private",
                }, {
                    new: true,
                });
                res.status(200).json({ message: "Media updated!" });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //update media
        this.updateMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: req.params.id,
                title: req.body.title,
                status: req.body.status,
                type: req.body.type,
            };
            try {
                const media = yield media_model_1.default.findById(data.id);
                if (!media) {
                    res.status(404).json({ message: "Media not found!" });
                    return;
                }
                const updatedMedia = yield media_model_1.default.findByIdAndUpdate(data.id, {
                    title: data.title,
                    status: data.status,
                }, {
                    new: true,
                });
                res.status(200).json({ message: "Media updated!", media: updatedMedia });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //upvote media
        this.upvoteMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: req.params.id,
                user: req.body.user,
            };
            try {
                const media = yield media_model_1.default.findById(data.id);
                if (!media) {
                    res.status(404).json({ message: "Media not found!" });
                    return;
                }
                //check user
                const user = yield user_model_1.default.findById(data.user);
                if (!user) {
                    res.status(404).json({ message: "User not found!" });
                    return;
                }
                //check if user already upvoted
                const upvoted = media.upvotes.find((upvote) => upvote == data.user);
                if (upvoted) {
                    res.status(400).json({ message: "User already upvoted!" });
                    return;
                }
                //update media
                yield media_model_1.default.findByIdAndUpdate(data.id, {
                    $push: { upvotes: data.user },
                });
                res.status(200).json({ message: "Media upvoted!" });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        //delete media
        this.deleteMedia = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                id: req.params.id,
            };
            try {
                const media = yield media_model_1.default.findById(data.id);
                if (!media) {
                    res.status(404).json({ message: "Media not found!" });
                    return;
                }
                //delete from cloudinary
                const result = yield this.cloudinary.uploader.destroy(media.cloudinaryId);
                //delete from database
                yield media_model_1.default.findByIdAndDelete(data.id);
                res.status(200).json({ message: "Media deleted!" });
            }
            catch (error) {
                res.status(500).json({
                    message: "Something went wrong!",
                    error: error,
                });
            }
        });
        this.initializeCloudinary();
        this.initializeMulter();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getMedia);
        this.router.get(`${this.path}/`, this.getPublicMedias);
        this.router.post(`${this.path}/create`, auth_middleware_1.default, this.upload.single("file"), this.createMedia);
        this.router.get(`${this.path}/private`, auth_middleware_1.default, this.getPrivateMedias);
        this.router.put(`${this.path}/:id`, this.updateMedia);
        this.router.delete(`${this.path}/:id`, this.deleteMedia);
        this.router.put(`${this.path}/upvote/:id`, this.upvoteMedia);
        this.router.put(`${this.path}/public/:id`, this.turnIntoPublic);
        this.router.put(`${this.path}/private/:id`, this.turnIntoPrivate);
    }
    //initialize cloudinary
    initializeCloudinary() {
        cloudinary_1.v2.config({
            cloud_name: "f-studios",
            api_key: "171115551123521",
            api_secret: "456kdAZpyL7uvH2af_uQrX9I8rA",
        });
        this.cloudinary = cloudinary_1.v2;
    }
    //initialize multer
    initializeMulter() {
        const storage = multer_1.default.diskStorage({});
        const fileFilter = (_req, file, cb) => {
            let ext = path_1.default.extname(file.originalname);
            if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
                cb(new Error("Unsupported file type!"), false);
                return;
            }
            cb(null, true);
        };
        this.upload = (0, multer_1.default)({ storage: storage, fileFilter: fileFilter });
    }
}
exports.default = MediaController;
