console.log("chatbot.js file says hello.")

/*
    REMEMBER TO CHANGE TO ACTIVE FUNCTION AFTER EVERYTHING WORKS
    AND REMOVE VALUE FROM INPUT ON INDEX

    What is the capital of Louisiana?
*/

setValue("userInput", "");
changePlaceholder("Your sentence here...");

let botReply = "";
let userInput = "";


onEvent("sendButton", "click", function () {

    userInput = getValue("userInput")

    if (userInput) {
        removeClass("userInput", "error-placeholder");
        thinking();
        setText("aiResponse", "Thinking . . .");
        // sendToModel();
        console.log("userInput: " + userInput);
    } else {
        //setStyle("userInput", "border: 2px solid red;");
        addClass("userInput", "red-border")
        addClass("userInput", "error-placeholder")
        changePlaceholder("Please enter a question.");
        setTimeout(() => {
            alert("Please enter a question.");
        }, 50);
    }
});

    // remove input field styling when user starts typing
document.getElementById("userInput").addEventListener("input", () => {
    removeClass("userInput", "error-placeholder");
    removeClass("userInput", "red-border");
});


function sendToModel() {
    console.log("send to model called");

    setStyle("aiResponse", "font-style: normal;");

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



function changePlaceholder(string) {
    document.getElementById("userInput").placeholder = string;
}
