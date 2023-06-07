import { NextFunction, Request, Response } from "express";
import { usersService } from "./service";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await usersService.getUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const usersHandlers = { getUsers };
