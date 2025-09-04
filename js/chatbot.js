/*
    REMEMBER TO CHANGE TO ACTIVE FUNCTION AFTER EVERYTHING WORKS
    AND REMOVE VALUE FROM INPUT ON INDEX

    What is the capital of Louisiana?
*/

console.log("chatbot.js file says hi.")

document.getElementById("userInput").value = "";
changePlaceholder("Your sentence here...");


let botReply = "";
let userInput = "";
let validationType = "";

validationType = document.querySelector('input[name="validationType"]:checked').value;
radioChoice.textContent = validationType;


document.querySelectorAll('input[name="validationType"]').forEach(r => {
    r.addEventListener('change', (e) => {
        validationType = e.target.value;
        radioChoice.textContent = validationType;
        clearError();
        document.getElementById("userInput").value = "";
        setFocusOnField();

        console.log(validationType);
        if (validationType == "disable") {
            disableButton("sendButton", true);
            console.log("disa -- " + validationType);
        } else {
            disableButton("sendButton", false);
            console.log("else -- " + validationType);
        }
    });
});

// document.getElementById("userInput").value = "";

function setFocusOnField() {
  document.getElementById("userInput").focus();
}

// onEvent("sendButton", "click", function () {
document.getElementById("sendButton").addEventListener("click", () => {

    userInput = document.getElementById("userInput").value

    if (userInput) {
        document.getElementById("aiResponse").textContent = "Thinking . . .";
        // sendToModel();
    } else {

        handleValidation(validationType);

        // if (validationType == "modal") {
        //     console.log("validationType: is modal");
        //     errorDetected();
        //     nudgeEmptyInput();
        // } else if (validationType == "timeout") {
        //     console.log("validationType: is timeout");
        //     errorDetected();
        //     setTimeout(() => {
        //         alert("Please enter a question.");
        //     }, 50);
        //     setFocusOnField();
        // } else if (validationType == "disabled") {
        //     console.log("validationType: is disabled");
        // }
    }
});

// reset input when changed
document.getElementById("userInput").addEventListener("input", () => {
    clearError();
});

// change placeholder value
function changePlaceholder(string) {
    document.getElementById("userInput").placeholder = string;      // setHTMLProperty("userInput", "placeholder", string);
}

function errorDetected() {
    document.getElementById("userInput").classList.add("input-error");     // addClass("userInput", "error-placeholder");
    // changePlaceholder("Please enter a question.");
}

function clearError() {
    document.getElementById("userInput").classList.remove("input-error");
    document.getElementById("aiResponse").textContent = "Result will go here.";
    disableButton("sendButton", false);

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
function nudgeEmptyInput() {
    const input = document.getElementById("userInput");

    // Your visual cues
    input.classList.add("input-error");            // red border, red placeholder (your CSS)
    input.placeholder = "Please enter a question.";

    // Let the browser paint, then show modal (non-blocking anyway)
    requestAnimationFrame(() => {
        showModal({
            title: "Missing input",
            message: "Please enter a question."
        });
    });
}

// Focus helper
function setFocusOnField(id = "userInput") {
  const el = document.getElementById(id);
  if (!el) return;
  el.focus();
  // optional: place cursor at end
  const v = el.value; el.setSelectionRange(v.length, v.length);
}

// Promise-based modal
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

// Your controller
async function handleValidation(validationType) {
  errorDetected();

  if (validationType === "modal") {
    nudgeEmptyInput(); // your styling/placeholder updates
    await showModal({ title: "Missing input", message: "Please enter a question." });
    setFocusOnField(); // focus AFTER modal closes

  } else if (validationType === "timeout") {
    await alertAfterPaint("Please enter a question."); // alert, then continue
    setFocusOnField(); // focus AFTER alert is dismissed
  }
}

function hideModal() {
    const modalEl = document.getElementById("appModal");
    const modal = bootstrap.Modal.getInstance(modalEl);
    if (modal) modal.hide();
}
