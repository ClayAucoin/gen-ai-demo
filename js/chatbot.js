console.log("chatbot.js file says hello.")

setValue("userInput", "");

let botReply = "";
let userInput = "";

onEvent("sendButton", "click", function () {

    userInput = getValue("userInput")

    if (userInput) {
        sendToModel();
    } else {
        alert("Please enter a question.");
    }
});

function sendToModel() {
    console.log("send to model called");

    setText("aiResponse", "Thinking...");

    async function query(data) {
        const response = await fetch(
            "https://router.huggingface.co/v1/chat/completions",
            {
                headers: {
                    Authorization: `Bearer ${HF_TOKEN}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    query({
        messages: [
            {
                role: "user",
                content: userInput,
            },
        ],
        model: "meta-llama/Llama-3.3-70B-Instruct:fireworks-ai",
    }).then((response) => {
        botReply = response.choices[0].message.content;
        console.log(botReply);
        setText("aiResponse", botReply);
    });

}
