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
    this.app.listen(process.env.PORT || 8080, () => {
      console.log(`App listening on the port ${process.env.PORT || 8080}`);
    });
  }

  //initialise middlewares
  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
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
    mongoose
      .connect(
        `mongodb+srv://saad:tYYnUwSzaFp48omt@cluster0.0kcbhqe.mongodb.net/?retryWrites=true&w=majority`,
        {}
      )
      .then(() => {
        console.log("Connected to database");
      });
  }
}

export default App;
