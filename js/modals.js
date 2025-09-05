
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
