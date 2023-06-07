import { Router } from "express";
import { messagesHandlers } from "./handlers";

export const messagesRouter = Router();

messagesRouter
  .route("/messages")
  .get(messagesHandlers.getMessages)
  .post(messagesHandlers.createMessage);

messagesRouter.route("/messages/:messageId").delete();
