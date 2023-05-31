import { Request, Response } from "express";
import { AppError } from "../utils";

export const handleError = (err: unknown, _req: Request, res: Response) => {
  console.log(err);

  if (err instanceof AppError) {
    return res.status(err.status).json({ error: err.message });
  }
  return res.sendStatus(500);
};
