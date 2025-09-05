
// select options
const models = [
    { label: "DeepSeek AI", value: "deepseek" },
    { label: "Meta Llama AI", value: "meta" },
    { label: "Sentient AGI", value: "sentient" },
    { label: "OpenAI", value: "openai" },
    { label: "Qwen AI", value: "qwen" },
];

// load select list
const modelSelect = document.getElementById("models");
models.forEach(model => {
    const opt = document.createElement("option");
    opt.value = model.value;
    opt.textContent = model.label;
    modelSelect.appendChild(opt);
});

document.addEventListener('DOMContentLoaded', () => {
    const modelsSelect = document.getElementById('models');
    const display = document.getElementById('modelsChoice');

    selectedModel = modelsSelect.value; // initial value on page load
    display.textContent = selectedModel;    // show selection right away

    // Listen for changes in the dropdown
    modelsSelect.addEventListener('change', () => {
        selectedModel = modelsSelect.value;  // update variable
        display.textContent = selectedModel; // update display
        console.log("Selected model is:", selectedModel);
        setFocusOnField();
    });
});
