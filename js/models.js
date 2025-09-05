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

// read select list
let selectedModel = "";

document.addEventListener('DOMContentLoaded', () => {
    const modelsSelect = document.getElementById('models');
    const display = document.getElementById('modelsChoice');

    selectedModel = modelsSelect.value; // initial value on page load
    display.textContent = selectedModel;    // show it right away

    // Listen for changes in the dropdown
    modelsSelect.addEventListener('change', () => {
        selectedModel = modelsSelect.value;  // update variable
        display.textContent = selectedModel; // update display
        console.log("Selected model is:", selectedModel);
        setFocusOnField();
    });
});


function sendToModelTest() {
    console.log("send to model TEST called");
    console.log("inside model test: " + selectedModel);

    const modelMap = {
        deepseek: "deepseek-ai/DeepSeek-R1:fireworks-ai",
        meta: "meta-llama/Llama-3.1-405B-Instruct:fireworks-ai",
        sentient: "SentientAGI/Dobby-Unhinged-Llama-3.3-70B:fireworks-ai",
        openai: "openai/gpt-oss-120b:fireworks-ai",
        qwen: "Qwen/Qwen3-Coder-480B-A35B-Instruct:fireworks-ai"
    };

    let modalAction = modelMap[selectedModel] ?? "unknown-model";

    console.log(modalAction);
}


// send ai request
function sendToModel() {
    console.log("send to model called");

    document.getElementById("aiResponse").style.cssText = "font-style: normal;";

    const modelMap = {
        deepseek: "deepseek-ai/DeepSeek-R1:fireworks-ai",
        meta: "meta-llama/Llama-3.1-405B-Instruct:fireworks-ai",
        sentient: "SentientAGI/Dobby-Unhinged-Llama-3.3-70B:fireworks-ai",
        openai: "openai/gpt-oss-120b:fireworks-ai",
        qwen: "Qwen/Qwen3-Coder-480B-A35B-Instruct:fireworks-ai"
    };

    let modalAction = modelMap[selectedModel] ?? "unknown-model";

    console.log(modalAction);
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
        document.getElementById("aiResponse").textContent = botReply;
    });

}

