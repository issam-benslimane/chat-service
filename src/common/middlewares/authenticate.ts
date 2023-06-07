import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  req.user = {
    username: "Carroll_Durgan-Davis68",
    email: "Tanner.Hettinger@gmail.com",
    avatarUrl: "https://avatars.githubusercontent.com/u/47117894",
  };
  next();
};
