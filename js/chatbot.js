/*
    REMEMBER TO CHANGE TO ACTIVE FUNCTION AFTER EVERYTHING WORKS
    AND REMOVE VALUE FROM INPUT ON INDEX

    What is the capital of Louisiana?
*/

console.log("chatbot.js file says hi.");

let botReply = "";
let userInput = "";
let validationType = "";
let userInputField = document.getElementById("userInput");
let sendBtn = document.getElementById("sendButton");
let aiResponse = document.getElementById("aiResponse");

// set userInput field parameters
setFocusOnField();
resetUserInput();
changePlaceholder("Your sentence here...");

// get and set validation text
validationType = document.querySelector('input[name="validationType"]:checked').value;
radioChoice.textContent = validationType;


document.querySelectorAll('input[name="validationType"]').forEach(r => {
    r.addEventListener('change', (e) => {
        validationType = e.target.value;
        radioChoice.textContent = validationType;
        
        resetUserInput();
        clearError();
        setFocusOnField();

        if (validationType == "disable") {
            disableButton("sendButton", true);
        } else {
            disableButton("sendButton", false);
        }
    });
});

sendBtn.addEventListener("click", () => {

    userInput = userInputField.value

    if (userInput) {
        // aiResponse.textContent = "Thinking . . .";        // orig
        aiResponse.innerHTML = "Thinking . . .<br>Not sending to model, just testing.";      // testing
        // sendToModel();
    } else {

        handleValidation(validationType);

    }
});


function setFocusOnField() {
  userInputField.focus();
}

// reset input when changed
userInputField.addEventListener("input", () => {
    clearError();
});

function changePlaceholder(string) {
    userInputField.placeholder = string;
}

function errorDetected() {
    userInputField.classList.add("input-error");
    // changePlaceholder("Please enter a question.");
}

function clearError() {
    userInputField.classList.remove("input-error");
    aiResponse.textContent = "Result will go here.";
    disableButton("sendButton", false);
}

function resetUserInput(){
    userInputField.value = "";
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



/**
 * Enable or disable element.
 * @param {string} id - The id of button.
 * @param {boolean} [status=false] - disable or enable.
 * 
 * @example
 * disableButton("ID", true);
 */
function disableButton(id, status) {
    const el = document.getElementById(id)
    if (status == true) {
        el.classList.add('disabled');
        console.log("button disabled")
    } else {
        el.classList.remove('disabled');
        console.log("button enabled")
    }
}



// **** bootstrap modal ****
function nudgeEmptyInput(id = "userInput") {
    const input = document.getElementById(id);

    input.classList.add("input-error");            // red border, red placeholder (your CSS)
    input.placeholder = "Please enter a question.";

    requestAnimationFrame(() => {
        showModal({
            title: "Missing input",
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
      alert(message);   // blocks until dismissed
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

async function handleValidation(validationType) {
  errorDetected();

  if (validationType === "modal") {
    nudgeEmptyInput();
    await showModal({ title: "Missing input", message: "Please enter a question." });
    setFocusOnField();

  } else if (validationType === "timeout") {
    await alertAfterPaint("Please enter a question.");
    setFocusOnField();
  }
}
