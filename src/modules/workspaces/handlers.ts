import { NextFunction, Request, Response } from "express";
import { workspaceService } from "./service";

const getWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const workspaceId = req.params.workspaceId as string;
    const workspace = await workspaceService.getWorkspace(workspaceId);
    res.status(200).json(workspace);
  } catch (error) {
    next(error);
  }
};

export const workspaceHandlers = { getWorkspace };
