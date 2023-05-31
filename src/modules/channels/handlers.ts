import { NextFunction, Request, Response } from "express";
import { channelsService } from "./service";

const getChannels = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workspaceId = req.params.workspaceId as string;
    const channels = await channelsService.getChannels(workspaceId);
    res.status(200).json(channels);
  } catch (error) {
    next(error);
  }
};

const createChannel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceId = req.params.workspaceId as string;
    const data = Object.assign(req.body, workspaceId);
    await channelsService.createChannel(data);
    res.status(201);
  } catch (error) {
    next(error);
  }
};

export const channelsHandlers = { getChannels, createChannel };
