import { Request } from "express";

interface mediaRequest extends Request {
  body: any;
  file?: any;
  user?: string;
}

export default mediaRequest;
