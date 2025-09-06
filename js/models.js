
function sendToModelTest() {
    console.log("send to model TEST called");
    console.log("inside model test: " + selectedModel);

    userQuestion.innerHTML = "You asked: <b>" + userInput + "</b>";
    resetButton.classList.remove("d-none");


    console.log("sendTest: " + getModelAction(selectedModel));
}


// send ai request
function sendToModel() {
    console.log("send to model called");

    aiResponse.textContent.style.cssText = "font-style: normal;";
    userQuestion.innerHTML = "You asked: <b>" + userInput + "</b>";
    resetButton.classList.remove("d-none");

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
        model: getModelAction(selectedModel),
    }).then((response) => {
        botReply = response.choices[0].message.content;
        console.log(botReply);
        console.log("using model: " + selectedModel);
        document.getElementById("aiResponse").textContent = botReply;
    });
}

