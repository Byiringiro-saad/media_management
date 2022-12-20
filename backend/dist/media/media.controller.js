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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class MediaController {
    constructor() {
        this.path = "/medias";
        this.router = (0, express_1.Router)();
        //new media
        this.createMedia = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        //get media
        this.getMedia = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        //get all media
        this.getAllMedias = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        //update media
        this.updateMedia = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        //delete media
        this.deleteMedia = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getMedia);
        this.router.get(`${this.path}/`, this.getAllMedias);
        this.router.post(`${this.path}/`, this.createMedia);
        this.router.put(`${this.path}/:id`, this.updateMedia);
        this.router.delete(`${this.path}/:id`, this.deleteMedia);
    }
}
exports.default = MediaController;
