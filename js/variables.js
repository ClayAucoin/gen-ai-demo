const $ = (id) => document.getElementById(id);

let botReply = "";
let userInput = "";
let dialogTitle = "";
let dialogMessage = "";
let selectedModel = "";
let modelAction = "";
let sendClick = false;
let userInputField = $("userInput");
let sendButton = $("sendButton");
let resetButton = $("resetButton");
// let aiResponse = $("aiResponse");
let userQuestion = $("userQuestion");


const MODELS = [
    { label: "OpenAI", value: "openai", action: "openai/gpt-oss-120b:fireworks-ai" },
    { label: "Meta Llama AI", value: "meta", action: "meta-llama/Llama-3.1-405B-Instruct:fireworks-ai" },
    { label: "Sentient AGI", value: "sentient", action: "SentientAGI/Dobby-Unhinged-Llama-3.3-70B:fireworks-ai" },
    { label: "Qwen AI", value: "qwen", action: "Qwen/Qwen3-Coder-480B-A35B-Instruct:fireworks-ai" },
    // { label: "DeepSeek AI", value: "deepseek", action: "deepseek-ai/DeepSeek-R1:fireworks-ai" },
];

