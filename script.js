const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatMessages = document.getElementById("chatMessages");
const clearChatButton = document.getElementById("clearChatButton");

// 1. Find an answer to the customer's question
function getBotReply(message) {
  const question = message.toLowerCase();

  if (
    question.includes("price") ||
    question.includes("cost") ||
    question.includes("rate") ||
    question.includes("how much") ||
    question.includes("affordable") ||
    question.includes("expensive") ||
    question.includes("quotation") ||
    question.includes("quote")
  ) {
    return "The cost of a sliding wardrobe depends on its dimensions, materials, finish, and design requirements. Please share your room measurements and preferences with our team to request a quotation. The team can confirm the final price.";
  }

  if (question.includes("delivery")) {
    return "Delivery time may vary depending on your location and order details. Please share your delivery location and order information with our team so they can confirm the expected delivery date.";
  }

  if (
    question.includes("custom") ||
    question.includes("size") ||
    question.includes("design") ||
    question.includes("dimensions")
  ) {
    return "Wardrobe size and design requirements depend on your room and preferences. Please contact our team to confirm available sizes, customization options, and suitable designs.";
  }

  if (question.includes("install")) {
    return "Installation requirements may depend on your wardrobe and location. Please contact our team to confirm installation availability, service details, and any applicable charges.";
  }

  if (
    question.includes("clean") ||
    question.includes("care") ||
    question.includes("maintain")
  ) {
    return "Wipe your sliding wardrobe panels with a soft, clean cloth. Avoid abrasive cleaners and excessive moisture. Keep the sliding tracks free of dust and debris, and follow the manufacturer's care instructions for your specific materials.";
  }

  if (
    /^(hi|hello|hey|good morning|good afternoon|good evening)[!.,\s]*$/.test(
      question.trim(),
    )
  ) {
    return "Hello! Welcome to Sliding Wardrobe Support. How can I help you today?";
  }

  if (
    question.includes("contact") ||
    question.includes("human") ||
    question.includes("person") ||
    question.includes("team")
  ) {
    return "Our support team can help you with specific details. Please contact the company directly for assistance.";
  }

  return "Thank you for your question! I don't have that information available right now. I can help with pricing and quotations, delivery, installation, and wardrobe care. For other questions, please contact our support team for accurate information.";
}

// 2. Add a timestamp to a message
function addMessageTime(messageElement) {
  const timeElement = document.createElement("span");
  timeElement.classList.add("message-time");

  timeElement.textContent = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  messageElement.appendChild(timeElement);
}

// 3. Scroll to the newest message
function scrollToLatestMessage() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 4. Listen for customer messages
chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const message = userInput.value.trim();

  // Ignore empty messages
  if (message === "") {
    return;
  }

  // Limit message length
  if (message.length > 500) {
    alert("Please keep your message under 500 characters.");
    return;
  }

  // Display the customer's message
  const messageElement = document.createElement("div");
  messageElement.classList.add("message", "user-message");

  const messageText = document.createElement("span");
  messageText.textContent = message;
  messageElement.appendChild(messageText);

  addMessageTime(messageElement);
  chatMessages.appendChild(messageElement);

  // Get the chatbot's reply
  const reply = getBotReply(message);

  // Display a typing indicator
  const typingMessage = document.createElement("div");
  typingMessage.classList.add("message", "bot-message");
  typingMessage.textContent = "Typing...";
  chatMessages.appendChild(typingMessage);

  scrollToLatestMessage();

  // Replace the typing indicator with the reply
  setTimeout(function () {
    typingMessage.textContent = reply;
    addMessageTime(typingMessage);
    scrollToLatestMessage();
  }, 700);

  // Clear the input box
  userInput.value = "";
  userInput.focus();
});

// 5. Clear the conversation
clearChatButton.addEventListener("click", function () {
  chatMessages.innerHTML = `
        <div class="message bot-message">
            <span>
                Hello! 👋 Welcome to Sliding Wardrobe Support.
                <br><br>
                I'm here to help you with:
                <br>
                • Pricing and quotations
                <br>
                • Delivery information
                <br>
                • Installation enquiries
                <br>
                • Wardrobe care and maintenance
                <br><br>
                What would you like to know today?
            </span>
        </div>
    `;

  userInput.value = "";
  userInput.focus();
});

// 6. Handle quick-question buttons
const quickQuestionButtons = document.querySelectorAll(".quick-question");

quickQuestionButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    userInput.value = button.dataset.question;
    chatForm.requestSubmit();
  });
});
