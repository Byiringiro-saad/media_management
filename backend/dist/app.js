"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
class App {
    constructor(controllers) {
        this.app = (0, express_1.default)();
        dotenv_1.default.config();
        //initializing
        this.connectToDatabase();
        this.initializeMiddlewares();
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
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use(body_parser_1.default.json());
    }
    //initialise controllers
    initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use("/", controller.router);
        });
    }
    //connect to database
    connectToDatabase() {
        mongoose_1.default.set("strictQuery", false);
        mongoose_1.default.connect(`mongodb://127.0.0.1:27017/SaadMedius`, {}).then(() => {
            console.log("Connected to database");
        });
    }
}
exports.default = App;
