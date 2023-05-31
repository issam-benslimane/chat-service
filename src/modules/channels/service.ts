import { CreateChannelDto } from "./types";
import db from "../../db";

const getChannels = (workspaceId: string) => {
  return db.channel.findMany({ where: { workspaceId } });
};

const createChannel = async (data: CreateChannelDto) => {
  const channel = await db.channel.create({ data });
  return channel;
};

export const channelsService = { getChannels, createChannel };
