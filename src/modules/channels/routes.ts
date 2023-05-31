import { Router } from "express";
import { channelsHandlers } from "./handlers";

export const channelsRouter = Router({ mergeParams: true });

channelsRouter.route("/channels").get(channelsHandlers.getChannels).post();

channelsRouter.route("/channels/:channelId").get().delete();
