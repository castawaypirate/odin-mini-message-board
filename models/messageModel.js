import * as db from "../db.js";

export async function getMessages() {
  return await db.getMessages();
}

export async function addMessage(user, message) {
  await db.addMessage(user, message);
}

export async function getMessageById(messageId) {
  return await db.getMessageById(messageId);
}
