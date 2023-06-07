import { Router } from "express";
import { channelsHandlers } from "./handlers";

export const channelsRouter = Router({ mergeParams: true });

channelsRouter
  .route("/channels")
  .get(channelsHandlers.getChannels)
  .post(channelsHandlers.createChannel);

channelsRouter
  .route("/channels/:channelId")
  .get(channelsHandlers.getChannel)
  .delete();
