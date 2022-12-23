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
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = require("express");
const user_model_1 = __importDefault(require("./user.model"));
class UserController {
    constructor() {
        this.path = "/users";
        this.router = (0, express_1.Router)();
        //login
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                email: req.body.email,
                password: req.body.password,
                usedGoogle: req.body.usedGoogle,
            };
            try {
                //validate user inputs
                const { error } = this.validateLogin.validate(data);
                if (error) {
                    throw new Error(error.details[0].message);
                }
                //check if user exists
                const user = yield user_model_1.default.findOne({ email: data.email });
                if (!user) {
                    throw new Error("User does not exist");
                }
                //check usedGoogle
                if (data.usedGoogle) {
                    if (!user.usedGoogle) {
                        throw new Error("You did not sign up using Google");
                    }
                    else {
                        //create token
                        const token = jsonwebtoken_1.default.sign({ id: user._id }, "Secret", {
                            expiresIn: "1h",
                        });
                        //send response
                        return res.status(200).json({ token });
                    }
                }
                //check if password is correct
                const isPasswordCorrect = yield bcryptjs_1.default.compare(data.password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password");
                }
                //create token
                const token = jsonwebtoken_1.default.sign({ id: user._id }, "Secret", {
                    expiresIn: "1h",
                });
                //send response
                res.status(200).json({ token });
            }
            catch (error) {
                res.status(400).json({
                    status: "error",
                    message: error.message,
                });
            }
        });
        //signup
        this.signup = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                usedGoogle: req.body.usedGoogle,
            };
            try {
                //validate user inputs
                const { error } = this.validateSignup.validate(data);
                if (error) {
                    throw new Error(error.details[0].message);
                }
                //check if user already exists
                const user = yield user_model_1.default.findOne({ email: data.email });
                if (user) {
                    throw new Error("User already exists");
                }
                //check usedGoogle
                if (data.usedGoogle) {
                    //create new user
                    const newUser = new user_model_1.default({
                        name: data.name,
                        email: data.email,
                        usedGoogle: data.usedGoogle,
                    });
                    yield newUser.save();
                    //create signin token
                    const token = jsonwebtoken_1.default.sign({ email: data === null || data === void 0 ? void 0 : data.email }, "secret", {
                        expiresIn: "1h",
                    });
                    //send response
                    return res.status(200).send({ token });
                }
                //create new user
                const hashedPassword = yield bcryptjs_1.default.hash(data.password, 10);
                const newUser = new user_model_1.default({
                    name: data.name,
                    email: data.email,
                    password: hashedPassword,
                    usedGoogle: data.usedGoogle,
                });
                yield newUser.save();
                //create signin token
                const token = jsonwebtoken_1.default.sign({ email: data === null || data === void 0 ? void 0 : data.email }, "secret", {
                    expiresIn: "1h",
                });
                //send response
                return res.status(200).send({ token });
            }
            catch (error) {
                return res.status(400).json({
                    status: "error",
                    message: error.message,
                });
            }
        });
        //get user
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        //update user
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        //delete user
        this.deleteUser = (req, res) => __awaiter(this, void 0, void 0, function* () { });
        //verify signup inputs
        this.validateSignup = joi_1.default.object({
            name: joi_1.default.string().min(3).max(255).required(),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string(),
            usedGoogle: joi_1.default.boolean().required(),
        });
        //verify login inputs
        this.validateLogin = joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string(),
            usedGoogle: joi_1.default.boolean().required(),
        });
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}/:id`, this.getUser);
        this.router.post(`${this.path}/login`, this.login);
        this.router.post(`${this.path}/signup`, this.signup);
        this.router.put(`${this.path}/:id`, this.updateUser);
        this.router.delete(`${this.path}/:id`, this.deleteUser);
    }
}
exports.default = UserController;
