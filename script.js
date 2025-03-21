async function sendMessage() {
    let inputField = document.getElementById("user-input");
    let message = inputField.value.trim();
    if (!message) return;

    let chatBox = document.getElementById("chat-box");
    chatBox.innerHTML += `<div><strong>You:</strong> ${message}</div>`;

    inputField.value = ""; // Clear input field

    // Send request to Flask server
    let response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message })
    });

    let data = await response.json();
    let llamaResponse = data.response;
    let llamaDiv = document.createElement("div");
    llamaDiv.innerHTML = "<strong>Llama:</strong> ";
    chatBox.appendChild(llamaDiv);
    
    // Typing effect
    let i = 0;
    function typeEffect() {
        if (i < llamaResponse.length) {
            llamaDiv.innerHTML += llamaResponse.charAt(i);
            i++;
            setTimeout(typeEffect, 30); // Adjust speed if needed
        }
    }
    typeEffect();

    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to latest message
}
