import { CreateMessageDto } from "./types";
import db from "../../db";
import { uniqueId } from "../../common/utils";

const getMessages = (query: { channelId?: string; username?: string }) => {
  return db.message.findMany({
    where: query,
    include: { user: true, channel: true },
  });
};

const createMessage = async (data: CreateMessageDto) => {
  const { body, username, channelId } = data;
  const message = await db.message.create({
    data: {
      body,
      id: uniqueId(),
      user: { connect: { username } },
      channel: { connect: { id: channelId } },
    },
  });
  return message;
};

export const messagesService = { getMessages, createMessage };
