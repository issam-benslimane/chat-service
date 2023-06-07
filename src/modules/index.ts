import { Router } from "express";
import { authenticate } from "../common/middlewares/authenticate";
import { workspacesRouter } from "./workspaces";
import { usersRouter } from "./users";
import { messagesRouter } from "./messages";

export const AppRouter = Router();

AppRouter.use(authenticate);
AppRouter.use(workspacesRouter);
AppRouter.use(usersRouter);
AppRouter.use(messagesRouter);
