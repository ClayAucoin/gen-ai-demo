// Derived lookup map (value -> action) if you like O(1) lookups
const MODEL_ACTION_MAP = Object.fromEntries(MODELS.map(m => [m.value, m.action]));

// populate a select options
function populateModelSelect(selectEl) {
    selectEl.innerHTML = ""; // clear
    for (const m of MODELS) {
        const opt = document.createElement("option");
        opt.value = m.value;
        opt.textContent = m.label;
        selectEl.appendChild(opt);
    }
}

// Helper: get action string by model value
function getModelAction(value) {
    return MODEL_ACTION_MAP[value] ?? null;
}

// Example wire-up
document.addEventListener("DOMContentLoaded", () => {
    const select = $("models");
    const display = $("modelsChoice");

    populateModelSelect(select);

    // show initial
    let currentValue = select.value;
    let modelAction = getModelAction(currentValue);
    display.textContent = currentValue ?? "unknown-model";

    selectedModel = currentValue;

    // on change
    select.addEventListener("change", () => {
        currentValue = select.value;
        modelAction = getModelAction(currentValue);
        display.textContent = currentValue ?? "unknown-model";
        console.log("Selected:", currentValue, "→", modelAction);
        selectedModel = currentValue;
        clearState();
        setFocusOnField();
    });
});
