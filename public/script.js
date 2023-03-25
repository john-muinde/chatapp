const socket = io("http://localhost:3000");
const messageContainer = document.getElementById("message-container");
const roomContainer = document.getElementById("room-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");
const usernameForm = document.getElementById("getUserName");

if (messageForm != null) {
  messageForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit("send-chat-message", roomName, message);
    messageInput.value = "";
  });
}
console.log(usernameForm);
if (usernameForm) {
  const usernameForm = document.getElementById("getUserName");
  usernameForm.addEventListener("submit", (e) => {
    const message = document.querySelector('input[name="room"]').value;
    socket.emit("new-user", message);
  });
}

socket.on("room-created", (room) => {
  appendUserJoinMessage(room);
});

socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on("user-connected", (name) => {
  appendUserJoinMessage(`${name}`);
});

socket.on("user-disconnected", (name) => {
  alert("user disconnected");
  const elementToRemove = document.getElementById(name);
  elementToRemove.style.display = "none";
});

function appendMessage(message) {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}

function appendUserJoinMessage(name) {
  roomContainer.innerHTML += `<div id = "${name}" class="block active">
                                <div class="details">
                                    <div class="listHead">
                                      <h4>${name}</h4>
                                    </div>
                                </div>
                              </div>`;
}
