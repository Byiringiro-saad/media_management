"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        dotenv_1.default.config();
        //initializing
        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeErrorHandling();
        this.initializeControllers(controllers);
    }
    //listen to port
    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`);
        });
    }
    //initialise middlewares
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
    }
    //initialise error handler
    initializeErrorHandling() {
        this.app.use(error_middleware_1.default);
    }
    //initialise controllers
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    //connect to database
    connectToDatabase() {
        mongoose_1.default.connect(`${process.env.MONGO_URI}`, {}).then(() => {
            console.log("Connected to database");
        });
    }
}
exports.default = App;
