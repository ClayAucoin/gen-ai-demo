/*
    REMEMBER TO CHANGE TO ACTIVE FUNCTION AFTER EVERYTHING WORKS
    AND REMOVE VALUE FROM INPUT ON INDEX

    What is the capital of Louisiana?
*/

console.log("chatbot.js file says hi.");

let botReply = "";
let userInput = "";
let dialogTitle = "";
let dialogMessage = "";
let userInputField = document.getElementById("userInput");
let sendBtn = document.getElementById("sendButton");
let aiResponse = document.getElementById("aiResponse");

// set userInput field parameters
setFocusOnField();
resetUserInput();
changePlaceholder("Your sentence here...");


let validationType = document.querySelector('input[name="validationType"]:checked').value;      // get and set validation text
// radioChoice.textContent = validationType;

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
            aiResponse.innerHTML = "Thinking . . .<br>Not sending to model, just testing.";      // testing
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


// html modal 
const closeHTMLModalBtn = document.getElementById('closeHTMLModalBtn');
const hmtlModal = document.getElementById('htmlModal');

function openHTMLModal() {
    document.getElementById("htmlDialogLabel").textContent = dialogTitle;
    document.getElementById("htmlDialogBody").textContent = dialogMessage;

    hmtlModal.showModal();
}

closeHTMLModalBtn.addEventListener('click', () => {
    hmtlModal.close(); // Closes the modal dialog
    setFocusOnField();
});



userInputField.addEventListener("input", () => { clearError(); });            // reset input when changed

function setFocusOnField() { userInputField.focus(); }
function changePlaceholder(string) { userInputField.placeholder = string; }
function errorDetected() { userInputField.classList.add("input-error"); }
function resetUserInput() { userInputField.value = ""; }

function clearError() {
    userInputField.classList.remove("input-error");
    aiResponse.textContent = "Result will go here.";
    sendBtn.classList.remove("disabled-look");
}

// send ai request
function sendToModel() {
    console.log("send to model called");

    document.getElementById("aiResponse").style.cssText = "font-style: normal;";

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



// **** bootstrap modal ****
function nudgeEmptyInput(id = "userInput") {
    const input = document.getElementById(id);

    input.classList.add("input-error");            // red border, red placeholder (your CSS)
    input.placeholder = "Please enter a question.";

    requestAnimationFrame(() => {
        showModal({
            title: "Missing input (Bootstrap Modal)",
            message: "Please enter a question."
        });
    });
}

function showModal({ title = "Notice", message = "" }) {
    return new Promise((resolve) => {
        const modalEl = document.getElementById("appModal");
        document.getElementById("appModalTitle").textContent = title;
        document.getElementById("appModalBody").textContent = message;

        let modal = bootstrap.Modal.getInstance(modalEl);
        if (!modal) modal = new bootstrap.Modal(modalEl);

        const onHidden = () => {
            modalEl.removeEventListener("hidden.bs.modal", onHidden);
            resolve();
        };
        modalEl.addEventListener("hidden.bs.modal", onHidden);
        modal.show();
    });
}

// Promise-based alert that lets the browser paint first
function alertAfterPaint(message) {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            setTimeout(() => {
                alert("Please enter a question.");
            }, 50);   // blocks until dismissed
            resolve();        // resumes after user clicks OK
        });
    });
}

function hideModal() {
    const modalEl = document.getElementById("appModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
}

// Focus helper
function setFocusOnField() {
    const el = userInputField;
    if (!el) return;
    el.focus();
    // optional: place cursor at end
    const v = el.value; el.setSelectionRange(v.length, v.length);
}
