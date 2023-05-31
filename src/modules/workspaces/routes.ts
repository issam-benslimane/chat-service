import { Router } from "express";
import { channelsRouter } from "../channels";

export const workspacesRouter = Router();

workspacesRouter.use("/workspaces/:workspaceId/", channelsRouter);
