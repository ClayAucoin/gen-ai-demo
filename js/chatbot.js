/*
    REMEMBER TO CHANGE TO ACTIVE FUNCTION AFTER EVERYTHING WORKS
    AND REMOVE VALUE FROM INPUT ON INDEX

    What is the capital of Louisiana?
*/

console.log("chatbot.js file says hi.");


// set userInput field parameters
setFocusOnField();
resetUserInput();
changePlaceholder("Your sentence here...");


// radio buttons
let validationType = document.querySelector('input[name="validationType"]:checked').value;      // get and set validation text
radioChoice.textContent = validationType;

document.querySelectorAll('input[name="validationType"]').forEach(r => {
    r.addEventListener('change', (e) => {
        validationType = e.target.value;
        // radioChoice.textContent = validationType;

        resetUserInput();
        clearError();
        setFocusOnField();

        if (validationType == "disable") {
            sendBtn.classList.add("disabled-look");
        } else {
            sendBtn.classList.remove("disabled-look");
        }
    });
});


sendBtn.addEventListener("click", () => {

    var hasClass = sendBtn.classList.contains("disabled-look");

    if (hasClass) {
        console.log("button still disabled");
        errorDetected();
        dialogTitle = "Missing input (HTML Modal)";
        dialogMessage = "Button disabled. Enter valid question."
        openHTMLModal();
    } else {

        userInput = userInputField.value

        if (userInput) {
            // test
            aiResponse.innerHTML = "Thinking . . .<br>Not sending to model, just testing.";      // testing
            sendToModalTest();

            // production
            // aiResponse.textContent = "Thinking . . .";        // orig
            // sendToModel();
        } else {
            handleValidation(validationType);
        }
    }
});

async function handleValidation(validationType) {
    errorDetected();

    if (validationType === "modal") {
        nudgeEmptyInput();
        await showModal({ title: "Missing input", message: "Please enter a question." });
        setFocusOnField();
    } else if (validationType === "timeout") {
        await alertAfterPaint("Please enter a question.");
        setFocusOnField();
    } else if (validationType === "html") {
        dialogTitle = "Missing input (HTML Modal)";
        dialogMessage = "Please enter valid question."
        openHTMLModal();
    } else if (validationType === "diable") {
        console.log("disabled");
    }
}


