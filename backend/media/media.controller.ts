import { Request, Response, Router } from "express";

//files
import Controller from "../interfaces/controller.interface";

class MediaController implements Controller {
  public path = "/medias";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getMedia);
    this.router.get(`${this.path}/`, this.getAllMedias);
    this.router.post(`${this.path}/`, this.createMedia);
    this.router.put(`${this.path}/:id`, this.updateMedia);
    this.router.delete(`${this.path}/:id`, this.deleteMedia);
  }

  //new media
  private createMedia = async (req: Request, res: Response) => {};

  //get media
  private getMedia = async (req: Request, res: Response) => {};

  //get all media
  private getAllMedias = async (req: Request, res: Response) => {};

  //update media
  private updateMedia = async (req: Request, res: Response) => {};

  //delete media
  private deleteMedia = async (req: Request, res: Response) => {};
}

export default MediaController;
