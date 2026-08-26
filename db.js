const messages = [
  {
    id: 1,
    text: "Hello there!",
    user: "Obi-Wan Kenobi",
    added: new Date()
  },
  {
    id: 2,
    text: "General Kenobi...",
    user: "General Grievous",
    added: new Date()
  }
]

export async function getMessages() {
  return messages;
}

export async function addMessage(message, user) {
  const messageId = messages.length + 1;
  messages.push({ id: messageId, text: message, user: user, added: new Date() });
}

export async function getMessageById(messageId) {
  return messages.find(message => message.id === parseInt(messageId));
}
