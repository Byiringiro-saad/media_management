import path from "path";
import multer from "multer";
import { v2 } from "cloudinary";
import { Request, Response, Router } from "express";

//files
import mediaModel from "./media.model";
import userModel from "../user/user.model";
import Controller from "../interfaces/controller.interface";

//middleware
import authMiddleware from "../middlewares/auth.middleware";

//interface
import UserRequest from "../interfaces/userRequest.interface";
import mediaRequest from "../interfaces/mediaRequest.interface";

class MediaController implements Controller {
  public path = "/medias";
  public router = Router();
  public upload: any;
  public cloudinary = v2;

  constructor() {
    this.initializeCloudinary();
    this.initializeMulter();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/:id`, this.getMedia);
    this.router.get(`${this.path}/`, this.getPublicMedias);
    this.router.post(
      `${this.path}/create`,
      authMiddleware,
      this.upload.single("file"),
      this.createMedia
    );
    this.router.get(
      `${this.path}/private`,
      authMiddleware,
      this.getPrivateMedias
    );
    this.router.put(`${this.path}/:id`, authMiddleware, this.updateMedia);
    this.router.delete(`${this.path}/:id`, this.deleteMedia);
    this.router.put(
      `${this.path}/upvote/:id`,
      authMiddleware,
      this.upvoteMedia
    );
  }

  //initialize cloudinary
  private initializeCloudinary() {
    v2.config({
      cloud_name: "f-studios",
      api_key: "171115551123521",
      api_secret: "456kdAZpyL7uvH2af_uQrX9I8rA",
    });

    this.cloudinary = v2;
  }

  //initialize multer
  private initializeMulter() {
    const storage = multer.diskStorage({});
    const fileFilter = (_req: any, file: any, cb: any) => {
      let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
        cb(new Error("Unsupported file type!"), false);
        return;
      }
      cb(null, true);
    };

    this.upload = multer({ storage: storage, fileFilter: fileFilter });
  }

  //new media
  private createMedia = async (req: mediaRequest, res: Response) => {
    const data = {
      title: req.body.title,
      status: req.body.status,
      type: req.body.type,
      user: req.user,
    };

    console.log(data);

    try {
      //check user
      const user = await userModel.findById(data.user);
      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      //upload to cloudinary
      const result = await this.cloudinary.uploader.upload(req.file.path, {
        folder: "Temp/SaadMedius",
      });

      //save to database
      const media = new mediaModel({
        ...data,
        url: result.secure_url,
        cloudinaryId: result.public_id,
      });
      const newMedia = await media.save();

      //update user
      await userModel.findByIdAndUpdate(data.user, {
        $push: { medias: media?._id },
      });

      // send response
      res.status(201).json({ message: "Media created!", media: newMedia });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  //get media
  private getMedia = async (req: Request, res: Response) => {
    const data = {
      id: req.params.id,
    };

    try {
      const media = await mediaModel.findById(data.id);
      if (!media) {
        res.status(404).json({ message: "Media not found!" });
        return;
      }

      res.status(200).json({ message: "Media found!", media: media });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  //get all media (public)
  private getPublicMedias = async (req: Request, res: Response) => {
    try {
      const medias = await mediaModel.find({ status: "public" });
      if (!medias) {
        res.status(404).json({ message: "Medias not found!" });
        return;
      }

      res.status(200).json({ message: "Medias found!", medias: medias });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  //get all media (private)
  private getPrivateMedias = async (req: UserRequest, res: Response) => {
    const data = {
      id: req.user,
    };

    //check user
    const user = await userModel.findById(data.id);
    if (!user) {
      res.status(400).json({ message: "User not found!" });
      return;
    }

    try {
      const medias = await mediaModel.find({
        status: "private",
        user: data.id,
      });
      if (!medias) {
        res.status(404).json({ message: "Medias not found!" });
        return;
      }

      res.status(200).json({ message: "Medias found!", medias: medias });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  //update media
  private updateMedia = async (req: UserRequest, res: Response) => {
    const data = {
      id: req.params.id,
      title: req.body.title,
      status: req.body.status,
      user: req.user,
    };

    console.log(data);

    try {
      const media = await mediaModel.findById(data.id);
      if (!media) {
        res.status(404).json({ message: "Media not found!" });
        return;
      }

      //if user is not owner
      if (media.user != data.user) {
        res.status(401).json({ message: "Unauthorized!" });
        return;
      }

      const updatedMedia = await mediaModel.findByIdAndUpdate(
        data.id,
        {
          title: data.title,
          status: data.status,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ message: "Media updated!", media: updatedMedia });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  //upvote media
  private upvoteMedia = async (req: UserRequest, res: Response) => {
    const data = {
      id: req.params.id,
      user: req.user,
    };

    try {
      const media = await mediaModel.findById(data.id);
      if (!media) {
        res.status(404).json({ message: "Media not found!" });
        return;
      }

      //check user
      const user = await userModel.findById(data.user);
      if (!user) {
        res.status(404).json({ message: "User not found!" });
        return;
      }

      //check if user already upvoted
      const upvoted = media.upvotes.find((upvote) => upvote == data.user);
      if (upvoted) {
        res.status(400).json({ message: "User already upvoted!" });
        return;
      }

      //update media
      await mediaModel.findByIdAndUpdate(data.id, {
        $push: { upvotes: data.user },
      });

      res.status(200).json({ message: "Media upvoted!" });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };

  //delete media
  private deleteMedia = async (req: Request, res: Response) => {
    const data = {
      id: req.params.id,
    };

    try {
      const media = await mediaModel.findById(data.id);
      if (!media) {
        res.status(404).json({ message: "Media not found!" });
        return;
      }
      //delete from cloudinary
      const result = await this.cloudinary.uploader.destroy(media.cloudinaryId);

      //delete from database
      await mediaModel.findByIdAndDelete(data.id);
      res.status(200).json({ message: "Media deleted!" });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong!",
        error: error,
      });
    }
  };
}

export default MediaController;
