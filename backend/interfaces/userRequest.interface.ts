import { Request } from "express";

interface UserRequest extends Request {
  user: string;
}

export default UserRequest;