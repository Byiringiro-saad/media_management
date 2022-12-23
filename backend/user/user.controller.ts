import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Request, Response, Router } from "express";

//files
import Controller from "../interfaces/controller.interface";
import userModel from "./user.model";

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
  private login = async (req: Request, res: Response) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
      usedGoogle: req.body.usedGoogle,
    };

    try {
      //validate user inputs
      const { error } = this.validateLogin.validate(data);
      if (error) {
        throw new Error(error.details[0].message);
      }

      //check if user exists
      const user = await userModel.findOne({ email: data.email });
      if (!user) {
        throw new Error("User does not exist");
      }

      //check usedGoogle
      if (data.usedGoogle) {
        if (!user.usedGoogle) {
          throw new Error("You did not sign up using Google");
        } else {
          //create token
          const token = jwt.sign({ id: user._id }, "Secret", {
            expiresIn: "1h",
          });

          //send response
          return res.status(200).json({ token });
        }
      }

      //check if password is correct
      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password
      );
      if (!isPasswordCorrect) {
        throw new Error("Incorrect password");
      }

      //create token
      const token = jwt.sign({ id: user._id }, "Secret", {
        expiresIn: "1h",
      });

      //send response
      res.status(200).json({ token });
    } catch (error: Error | any) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  //signup
  private signup = async (req: Request, res: Response) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      usedGoogle: req.body.usedGoogle,
    };

    try {
      //validate user inputs
      const { error } = this.validateSignup.validate(data);
      if (error) {
        throw new Error(error.details[0].message);
      }

      //check if user already exists
      const user = await userModel.findOne({ email: data.email });
      if (user) {
        throw new Error("User already exists");
      }

      //check usedGoogle
      if (data.usedGoogle) {
        //create new user
        const newUser = new userModel({
          name: data.name,
          email: data.email,
          usedGoogle: data.usedGoogle,
        });

        await newUser.save();

        //create signin token
        const token = jwt.sign({ email: data?.email }, "secret", {
          expiresIn: "1h",
        });

        //send response
        return res.status(200).send({ token });
      }

      //create new user
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const newUser = new userModel({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        usedGoogle: data.usedGoogle,
      });
      await newUser.save();

      //create signin token
      const token = jwt.sign({ email: data?.email }, "secret", {
        expiresIn: "1h",
      });

      //send response
      return res.status(200).send({ token });
    } catch (error: Error | any) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  //get user
  private getUser = async (req: Request, res: Response) => {
    const data = {
      id: req.params.id,
    };

    try {
      //check if user exists
      const user = await userModel.findById(data.id);
      if (!user) {
        throw new Error("User does not exist");
      }

      //send response
      res.status(200).json({ user });
    } catch (error: Error | any) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  //update user
  private updateUser = async (req: Request, res: Response) => {
    const data = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    try {
      //check if user exists
      const user = await userModel.findById(data.id);
      if (!user) {
        throw new Error("User does not exist");
      }

      //check if email already exists
      const emailExists = await userModel.findOne({ email: data.email });
      if (emailExists) {
        throw new Error("Email already exists");
      }

      //update user
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const updatedUser = await userModel.findByIdAndUpdate(
        data.id,
        {
          name: data.name,
          email: data.email,
          password: hashedPassword,
        },
        { new: true }
      );

      //send response
      res.status(200).json({
        user: {
          name: updatedUser?.name,
          email: updatedUser?.email,
          password: data?.password,
        },
      });
    } catch (error: Error | any) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  };

  //delete user
  private deleteUser = async (req: Request, res: Response) => {};

  //verify signup inputs
  private validateSignup = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string(),
    usedGoogle: Joi.boolean().required(),
  });

  //verify login inputs
  private validateLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string(),
    usedGoogle: Joi.boolean().required(),
  });
}

export default UserController;
