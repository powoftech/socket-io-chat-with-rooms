const socket = io("http://localhost:3000");

const messages = document.querySelector("#messages");

const messageForm = document.querySelector("#message-form");
const roomForm = document.querySelector("#room-form");

const messageInput = document.querySelector("#message");
const roomInput = document.querySelector("#room");

socket.on("connect", () => {
	displayMessage(`connected with id: ${socket.id}`);
});

socket.on("receive-message", (message) => {
	displayMessage(message);
});

messageForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const message = messageInput.value;
	const room = roomInput.value;

	displayMessage(message);

	socket.emit("send-message", message, room);

	messageInput.value = "";
});

roomForm.addEventListener("submit", (e) => {
	e.preventDefault();

	const room = roomInput.value;

	socket.emit("join-room", room);
});

const displayMessage = (message) => {
	const messageItem = document.createElement("li");
	messageItem.textContent = `${message}`;
	messages.appendChild(messageItem);
};
