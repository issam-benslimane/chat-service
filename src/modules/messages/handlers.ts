import { NextFunction, Request, Response } from "express";
import { messagesService } from "./service";

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const channels = await messagesService.getMessages(req.query);
    res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const channelId = req.query.channelId as string;
    const username = req.user.username;
    const data = { ...req.body, channelId, username };
    await messagesService.createMessage(data);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

export const messagesHandlers = { getMessages, createMessage };
