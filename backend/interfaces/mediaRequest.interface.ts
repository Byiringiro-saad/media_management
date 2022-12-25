import { Express } from "express";

interface mediaRequest extends Express {
  body: any;
  file: any;
  user: string;
}

export default mediaRequest;
