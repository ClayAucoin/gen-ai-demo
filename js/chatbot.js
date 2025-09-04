console.log("chatbot.js file says hello.")

/*
    REMEMBER TO CHANGE TO ACTIVE FUNCTION AFTER EVERYTHING WORKS
    AND REMOVE VALUE FROM INPUT ON INDEX

    What is the capital of Louisiana?
*/

document.getElementById("userInput").value = "";    // setValue("userInput", "");
changePlaceholder("Your sentence here...");

let botReply = "";
let userInput = "";


// onEvent("sendButton", "click", function () {
document.getElementById("sendButton").addEventListener("click", () => {

    userInput = document.getElementById("userInput").value      // getValue("userInput")

    if (userInput) {
        document.getElementById("aiResponse").textContent = "Thinking . . .";     // setText("aiResponse", "Thinking . . .");
        // sendToModel();
    } else {
        errorDetected();
        setTimeout(() => {
            alert("Please enter a question.");
        }, 50);
    }
});

// reset input when changed
// onEvent("userInput", "input", function () {
document.getElementById("userInput").addEventListener("input", () => {
    document.getElementById("userInput").classList.remove("error-placeholder");     // removeClass("userInput", "error-placeholder");
});

// change placeholder value
function changePlaceholder(string) {
    document.getElementById("userInput").placeholder = string;      // setHTMLProperty("userInput", "placeholder", string);
}

function errorDetected() {
    document.getElementById("userInput").classList.add("error-placeholder");     // addClass("userInput", "error-placeholder");
    changePlaceholder("Please enter a question.");
}


// send ai request
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



