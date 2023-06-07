import { CreateChannelDto } from "./types";
import db from "../../db";
import { BadRequestError, uniqueId } from "../../common/utils";

const getChannels = (workspaceId: string) => {
  return db.channel.findMany({ where: { workspaceId } });
};

const getChannel = async (channelId: string) => {
  const channel = await db.channel.findUnique({ where: { id: channelId } });
  const users = await getChannelUsers(channelId);
  return { ...channel, users };
};

const createChannel = async (data: CreateChannelDto) => {
  const { name, workspaceId, creatorUsername, ...props } = data;
  const channels = await getChannels(workspaceId);
  if (channels.find((channel) => channel.name === data.name))
    throw new BadRequestError(
      "That name is already taken by a channel, username, or user group in this workspace."
    );
  console.log(data);

  const channel = await db.channel.create({
    data: {
      name,
      id: uniqueId(),
      creator: { connect: { username: creatorUsername } },
      workspace: { connect: { id: workspaceId } },
      users: { create: { username: creatorUsername } },
      ...props,
    },
  });
  return channel;
};

const getChannelUsers = (channelId: string) => {
  return db.userChannel
    .findMany({
      where: { channelId },
      select: { user: true },
    })
    .then((result) => result.map(({ user }) => user));
};

export const channelsService = { getChannels, getChannel, createChannel };
