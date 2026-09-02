import * as db from "../db.js";

export async function getMessages() {
  return await db.getMessages();
}

export async function addMessage(message, username) {
  await db.addMessage(message, username);
}

export async function deleteMessage(messageId) {
  return await db.deleteMessage(messageId);
}

export async function getMessageById(messageId) {
  return await db.getMessageById(messageId);
}
