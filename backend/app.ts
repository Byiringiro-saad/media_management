import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

//files
import Controller from "./interfaces/controller.interface";
import errorMiddleware from "./middlewares/error.middleware";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();

    dotenv.config();

    //initializing
    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
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
    this.app.use(bodyParser.json());
  }

  //initialise error handler
  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  //initialise controllers
  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  //connect to database
  private connectToDatabase() {
    mongoose.connect(`${process.env.MONGO_URI}`, {}).then(() => {
      console.log("Connected to database");
    });
  }
}

export default App;
