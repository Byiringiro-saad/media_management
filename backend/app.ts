import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//files
import Controller from "./interfaces/controller.interface";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    dotenv.config();

    //initializing
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  //listen to port
  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`App listening on the port ${process.env.PORT}`);
    });
  }

  //initialise middlewares
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
  }

  //initialise controllers
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  //connect to database
  private connectToDatabase() {
    mongoose.set("strictQuery", false);
    mongoose.connect(`mongodb://127.0.0.1:27017/SaadMedius`, {}).then(() => {
      console.log("Connected to database");
    });
  }
}

export default App;
