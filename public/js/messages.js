const messages = document.querySelectorAll(".message-container");

for (let message of messages) {
  let messageId = message.dataset.id;
  message.querySelector("button").addEventListener("click", (event) => {
    window.location.href = `/messages/${messageId}`;
  })
}
