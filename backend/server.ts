import App from "./app";
import UserController from "./user/user.controller";
import MediaController from "./media/media.controller";

const app = new App([new UserController(), new MediaController()]);

app.listen();
