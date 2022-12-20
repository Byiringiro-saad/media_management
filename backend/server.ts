import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import express, { Express } from "express";

//routes
import userRoutes from "./routes/user.routes";
import mediaRoutes from "./routes/media.routes";

const app: Express = express();

//configs
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//endpoints
app.use("/api/user", userRoutes);
app.use("/api/media", mediaRoutes);

export default app;
