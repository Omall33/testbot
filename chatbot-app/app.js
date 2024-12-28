const API_KEY = "YOUR_API_KEY"; // Ganti dengan API Key OpenAI Anda

const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const chatMessages = document.getElementById('chat-messages');

// Fungsi untuk mengirim pesan ke OpenAI API
async function sendMessageToChatGPT(message) {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${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}`,
        },
        body: JSON.stringify({
            model: "gpt-4o",  // Model yang digunakan (gpt-4 atau gpt-3.5)
            messages: [{ role: "user", content: message }],
        }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
}

// Fungsi untuk menampilkan pesan di layar
function displayMessage(content, sender) {
    const messageElement = document.createElement('p');
    messageElement.classList.add(sender);
    messageElement.textContent = content;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;  // Scroll ke bawah setelah pesan baru
}

// Menangani input pengguna dan mengirimkan ke OpenAI
sendButton.addEventListener('click', async () => {
    const userMessage = userInput.value.trim();
    if (userMessage) {
        displayMessage(userMessage, 'user');
        userInput.value = '';  // Clear input setelah kirim

        // Kirim pesan ke API OpenAI dan tampilkan respons AI
        const aiResponse = await sendMessageToChatGPT(userMessage);
        displayMessage(aiResponse, 'ai');
    }
});

// Menangani tekan Enter untuk kirim pesan
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
