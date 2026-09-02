import moment from "moment";
import { body, query, validationResult, matchedData } from "express-validator";
import * as messageModel from "../models/messageModel.js";
import { CustomNotFoundError } from "../errors/CustomNotFoundError.js";

const validateMessage = [
  body("message").trim().notEmpty().withMessage("Message cannot be empty"),
  body("yapper").trim().notEmpty().withMessage("Yapper cannot be empty")
]

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

export async function deleteMessage(req, res) {
  const { messageId } = req.params;
  const result = await messageModel.deleteMessage(messageId);

  if (!result) {
    return res.status(404).json({ error: "Message not found" })
  }
  return res.status(200).json({ message: "Message deleted successfully" });
}

// export async function submitMessage(req, res) {
//   await messageModel.addMessage(req.body.message, req.body.yapper);
//   res.redirect("/");
// }

export const submitMessage = [
  validateMessage, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", { title: "New Message", errors: errors.array() })
    }
    const { message, yapper } = matchedData(req);

    await messageModel.addMessage(message, yapper);
    res.redirect("/");
  }

]

export async function messageDetails(req, res) {
  const { messageId } = req.params;

  const message = await messageModel.getMessageById(messageId);

  if (!message) {
    throw new CustomNotFoundError("No message found.")
  }

  res.render("messageDetails", { title: "Details", message: message.text, username: message.username, added: moment(new Date(message.added)).format("DD MMM YYYY") });
}
