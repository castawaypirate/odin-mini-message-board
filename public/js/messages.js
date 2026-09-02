const messages = document.querySelectorAll(".message-container");

for (let message of messages) {
  let messageId = message.dataset.id;
  message.querySelector(".details-button").addEventListener("click", (event) => {
    window.location.href = `/messages/${messageId}`;
  })

  message.querySelector(".delete-button").addEventListener("click", async () => {
    const response = await fetch(`/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    if (response.ok) {
      console.log("all good")
      window.location.href = `/`;
    }
  })
}

