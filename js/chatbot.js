console.log("script.js file says hello.")

setValue("userInput", "");

let botReply = "";

onEvent("sendButton", "click", function () {

    setText("aiResponse", getValue("userInput"));

});

function sendToModel(){
    console.log("send to model called");

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
                content: "What is the capital of France?",
            },
        ],
        model: "meta-llama/Llama-3.3-70B-Instruct:fireworks-ai",
    }).then((response) => {
        console.log(JSON.stringify(response));
    });

}