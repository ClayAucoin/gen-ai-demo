/*
    REMEMBER TO CHANGE TO ACTIVE FUNCTION AFTER EVERYTHING WORKS
    AND REMOVE VALUE FROM INPUT ON INDEX

    What is the capital of Louisiana?
*/

// console.log("chatbot.js file says hi.");


// set userInput field parameters
setFocusOnField();
resetUserInput();
changePlaceholder("Your sentence here...");
resetButton.classList.add("d-none");

userInputField.addEventListener("input", () => { clearError(); });            // reset input when changed

// send button listener
sendButton.addEventListener("click", () => {

    var hasClass = sendButton.classList.contains("disabled-look");

    if (hasClass) {
        console.log("button still disabled");
        errorDetected();
        dialogTitle = "Missing input (HTML Modal)";
        dialogMessage = "Button disabled. Enter valid question."
        openHTMLModal();
    } else {

        userInput = userInputField.value

        if (userInput) {
            sendClick = true
            getModelAction(selectedModel)
            console.log("click: " + getModelAction(selectedModel));

            // test
            // aiResponse.innerHTML = "Thinking . . .<br>Not sending to model, just testing.";      // testing
            // aiResponse.innerHTML = "Okay, so the user is asking, What is the capital of Hawaii? Let me think through this step by step.\n\nFirst, I need to recall if I know the capital cities of US states. Hawaii is a state that's an archipelago in the Pacific. I remember that the most populous city in Hawaii is Honolulu, which is located on the island of Oahu. Honolulu is a major hub for tourism, business, and government. Since capitals are often the most populous cities or centers of government, it's likely that Honolulu is the capital.\n\nWait, just to be sure, am I confusing it with any other cities in Hawaii? Other cities I can think of in Hawaii are Hilo, Kailua, Waikiki... Hilo is on the Big Island, but it's smaller than Honolulu. Waikiki is a neighborhood in Honolulu, right? So that's part of it. Kailua is another city on Oahu, but not as big.\n\nHawaii became a state in 1959. I believe even before statehood, Honolulu was the main city and administrative center. So I don't think the capital changed when it became a state. Yeah, that makes sense. I'm pretty confident that Honolulu is the capital. Let me double-check by considering official sources or maps. I've seen maps where the star or the capital marker is on Oahu, indicating Honolulu.\n\nThere's also the Iolani Palace, which is a historic building in Honolulu. It's the only royal palace in the United States. Since that's a significant governmental building from Hawaii's monarchical period, it being in Honolulu adds to the evidence that the city is the capital.\n\nNo other cities come to mind as being the capital. So yeah, I think the answer is Honolulu. But to be thorough, just in case my memory is off, maybe I should recall a list of state capitals. For example, Juneau is the capital of Alaska, Sacramento for California, Phoenix for Arizona... and Honolulu for Hawaii. Yeah, that's right.\n\nThe capital of Hawaii is **Honolulu**, located on the island of Oʻahu. It is the political, cultural, and economic center of the state, home to landmarks like ʻIolani Palace (the only royal palace in the U.S.) and the seat of Hawaii's government. 🌺"
            // sendToModelTest();

            // production
            aiResponse.textContent = "Thinking . . .";        // orig
            sendToModel();
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
    } else if (validationType === "alert") {
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

resetButton.addEventListener("click", () => {
    clearState();
});

function clearState() {
    aiResponse.textContent = "Result will go here...";
    userQuestion.textContent = "";
    clearError()
    resetUserInput();
    resetButton.classList.add("d-none");

}

function setFocusOnField() { userInputField.focus(); }
function changePlaceholder(string) { userInputField.placeholder = string; }
function errorDetected() { userInputField.classList.add("input-error"); }
function resetUserInput() { userInputField.value = ""; }

function clearError() {
    userInputField.classList.remove("input-error");
    aiResponse.textContent = "Result will go here.";
    sendButton.classList.remove("disabled-look");
}


/**
 * Show or hide element.
 * @param {string} id - The id of button.
 * @param {boolean} [status=false] - show or hide.
 * 
 * @example
 * visibleElement("ID", true);
 */
function visibleElement(id, status) {
    const el = document.getElementById(id)
    if (!el) {
        console.warn("visibleElement: Element with id '" + id + "' not found.");
        return;
    } else {
        if (status == true) {
            el.classList.remove("d-none");
            console.info("visibleElement: Element with id '" + id + "' has been shown.");
        } else {
            el.classList.add("d-none");
            console.info("visibleElement: Element with id '" + id + "' has been hidden.");
        }
    }
}
