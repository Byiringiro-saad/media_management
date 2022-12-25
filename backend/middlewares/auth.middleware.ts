import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";

//interface
import UserRequest from "../interfaces/userRequest.interface";

const authMiddleware = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  //verift token
  const token = req.header("Authorization");
  if (!token) {
    return res.status(400).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded: any = jwt.verify(token, "Secret");
    req.user = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;
