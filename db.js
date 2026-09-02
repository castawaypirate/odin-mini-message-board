import pool from "./db_pool.js"

export async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

export async function addMessage(message, username) {
  await pool.query("INSERT INTO messages (text, username) VALUES ($1, $2)", [message, username]);
}

export async function deleteMessage(messageId) {
  return await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

export async function getMessageById(messageId) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [messageId])
  return rows[0];
}
