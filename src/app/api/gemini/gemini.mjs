import dotenv from "dotenv";
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

dotenv.config();

const safetySettings = [{
    category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE
}, {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE
}, {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE
}, {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE
}];

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });

function sectionString(str, maxLength) {
    const sections = [];
    let startIndex = 0;

    while (startIndex < str.length) {
        let endIndex = startIndex + maxLength;
        while (endIndex < str.length && !/\s/.test(str[endIndex])) {
            endIndex++;
        }
        sections.push(str.slice(startIndex, endIndex));
        startIndex = endIndex;
    }

    return sections;
}

export default async function callGemini(prompt, charLimit = 160) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const sections = sectionString(text, charLimit - 6);
    return sections.map((section, i) => `${section.trim()} (${i + 1}/${sections.length})`);
}

const res = await callGemini("tell me about gays");

for (const section of res) {
    console.log(section);
    console.log("-".repeat(20));
}