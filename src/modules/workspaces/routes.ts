import { Router } from "express";
import { channelsRouter } from "../channels";
import { workspaceHandlers } from "./handlers";

export const workspacesRouter = Router();

workspacesRouter.get(
  "/workspaces/:workspaceId/",
  workspaceHandlers.getWorkspace
);

workspacesRouter.use("/workspaces/:workspaceId/", channelsRouter);
