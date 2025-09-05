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
