import { Router } from "express";
import { getMessages, newMessage, submitMessage, messageDetails, deleteMessage } from "../controller/messageController.js";

const indexRouter = Router();

indexRouter.get("/", getMessages);

indexRouter.get("/new", newMessage);

indexRouter.delete("/messages/:messageId", deleteMessage);

indexRouter.post("/new", submitMessage);

indexRouter.get("/messages/:messageId", messageDetails);

export default indexRouter;
