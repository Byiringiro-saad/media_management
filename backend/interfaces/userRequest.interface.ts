import { Request } from "express";

interface UserRequest extends Request {
  user?: string;
  body: any;
}

export default UserRequest;
