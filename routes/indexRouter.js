import { Router } from "express";
import { getMessages, newMessage, submitMessage, messageDetails } from "../controller/messageController.js";

const indexRouter = Router();

indexRouter.get("/", getMessages);

indexRouter.get("/new", newMessage);

indexRouter.post("/new", submitMessage);

indexRouter.get("/messages/:messageId", messageDetails);

export default indexRouter;
