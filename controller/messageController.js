import moment from "moment";
import * as messageModel from "../models/messageModel.js";
import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";

const formatMessagesDate = (messages) => {
  for (let message of messages) {
    message.added = moment(new Date(message.added)).format("DD MMM YYYY");
  }
  return messages;
}

export async function getMessages(req, res) {
  const messages = await messageModel.getMessages();

  if (!messages) {
    throw new CustomNotFoundError("No messages found.")
  }

  res.render("index", { title: "Mini Messageboard", messages: formatMessagesDate(messages) });
}

export async function newMessage(req, res) {
  res.render("form", { title: "New Message" });
}

export async function submitMessage(req, res) {
  await messageModel.addMessage(req.body.yapper, req.body.message);
  res.redirect("/");
}



export async function messageDetails(req, res) {
  const { messageId } = req.params;

  const message = await messageModel.getMessageById(messageId);

  if (!message) {
    throw new CustomNotFoundError("No message found.")
  }

  res.render("messageDetails", { title: "Details", message: message.text, user: message.user, added: message.added });
}
