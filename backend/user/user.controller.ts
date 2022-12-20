import { Request, Response, Router } from "express";

//files
import Controller from "../interfaces/controller.interface";

class UserController implements Controller {
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getUser);
    this.router.post(`${this.path}/login`, this.login);
    this.router.post(`${this.path}/signup`, this.signup);
    this.router.put(`${this.path}/:id`, this.updateUser);
    this.router.delete(`${this.path}/:id`, this.deleteUser);
  }

  //login
  private login = async (req: Request, res: Response) => {};

  //signup
  private signup = async (req: Request, res: Response) => {};

  //get user
  private getUser = async (req: Request, res: Response) => {};

  //update user
  private updateUser = async (req: Request, res: Response) => {};

  //delete user
  private deleteUser = async (req: Request, res: Response) => {};
}

export default UserController;
