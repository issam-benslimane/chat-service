import { Router } from "express";
import { usersHandlers } from "./handlers";

export const usersRouter = Router();

usersRouter.get("/users", usersHandlers.getUsers);
