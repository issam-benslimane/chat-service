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

const getChannel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const channelId = req.params.channelId as string;
    const channel = await channelsService.getChannel(channelId);
    res.status(200).json(channel);
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
    const creatorUsername = req.user.username;
    const data = Object.assign(req.body, { workspaceId, creatorUsername });
    const createdChannel = await channelsService.createChannel(data);
    res.status(201).json(createdChannel);
  } catch (error) {
    next(error);
  }
};

export const channelsHandlers = { getChannels, getChannel, createChannel };
