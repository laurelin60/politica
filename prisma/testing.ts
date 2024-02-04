import { db } from "@/db";
import fs from "fs";
import { $Enums } from ".prisma/client";
import chalk from "chalk";
const { Semaphore } = require('await-semaphore');

import { callGemini, callGeminiWithKey } from "@/app/api/gemini/gemini.mjs"

let keyIndex = 0;

let geminiKeys = [
    "aaaaa"
];

let validTags = ['lgbtq', 'judicial', 'children', 'civil rights', 'sustainability', 'gender equality', 'racial justice', 'refugee rights', 'disability rights', 'budget', 'education', 'health', 'transportation', 'housing', 'public safety', 'labor', 'energy', 'agriculture', 'technology'];

let summaries: any = { summaries: [] };

let idx = 0;
let allBillsLength = 0;


async function processBill(bill: any, semaphore: any) {
    const release = await semaphore.acquire();
    let attempts = 0;
    while (attempts < 5) {
        let rawAiResponse = "";
        try {
            let summaryPrompt = `### INSTRUCTIONS 

Summarize the content in one short sentence. Use a middle school reading level. Include relevant dates and info, but make sure it is one sentence. 

Below the summary, include a bracket-surrounded list of tags (comma-separated). Only include tags that apply. For example, [Tag1, Tag2]. 

The tags you can choose from are: [LGBTQ, Judicial, Children, Civil Rights, Sustainability, Gender Equality, Racial Justice, Refugee Rights, Disability Rights, Budget, Education, Health, Transportation, Housing, Public Safety, Labor, Energy, Agriculture, Technology]

You may ONLY use tags from this list. Make sure your list of tags is on a new line (not on the same line as the one sentence summary). If there are no tags, just put []

===== CONTENT START =====

${bill.fullText}

===== CONTENT END =====

The tags you can choose from are: [LGBTQ, Judicial, Children, Civil Rights, Sustainability, Gender Equality, Racial Justice, Refugee Rights, Disability Rights, Budget, Education, Health, Transportation, Housing, Public Safety, Labor, Energy, Agriculture, Technology]

Remember to provide tags! Only include tags that apply. For example, [Tag1, Tag2]. 

You may ONLY use tags from this list. Make sure your list of tags is on a new line (not on the same line as the one sentence summary). If there are no tags, just put []

### RESPONSE (ONE SENTENCE SUMMARY! TAG LIST ENCLOSED IN BRACKETS REQUIRED!)`;
            rawAiResponse = await callGeminiWithKey(summaryPrompt.substring(0, 85000), geminiKeys[keyIndex++ % geminiKeys.length]);
            let summary = rawAiResponse.split('[')[0].trim();
            let tags = rawAiResponse.split('[')[1].split(']')[0].split(',').map(tag => tag.trim().toLowerCase()).filter(tag => validTags.includes(tag));
            summaries.summaries.push({ billId: bill.billId, summary, tags });
            fs.writeFileSync('summaries.json', JSON.stringify(summaries));
            console.log(`Completed bill ${++idx} of ${allBillsLength}`);
            release();
            break;
        }
        catch (e) {
            console.log(chalk.red(`LLM had a stroke on bill ${bill.billId} (${++attempts}/5)`));
            if (attempts === 5) {
                release();
                console.log("Bad response:", rawAiResponse);
                //throw e;
                return; // LLM is filtering it, there's not much we can do 
            }
            await new Promise(resolve => setTimeout(resolve, 1500));
        }
    }
}

async function main() {
    console.log("Loading all bills from the database...");
    const allBills = await db.bill.findMany();
    console.log("Finished loading bills!");
    allBillsLength = allBills.length;
    const semaphore = new Semaphore(Math.floor(geminiKeys.length * 1.2)); // the parameter is max concurrency 
    await Promise.all(allBills.map(bill => processBill(bill, semaphore)));
    console.log("All bills processed!");
    fs.writeFileSync('summaries.json', JSON.stringify(summaries));
}

main();