import { db } from "@/db";
import fs from "fs";
import { $Enums } from ".prisma/client";
import chalk from "chalk";

import callGemini from "../src/app/api/gemini/gemini.mjs"

async function main() {
    const allBills = await db.bill.findMany();
    let summaries: any = { summaries: [] };
    let idx = 0;
    for (const bill of allBills) {
        let attempts = 0;
        while (attempts < 5) {
            try {
                let summaryPrompt: string = `### INSTRUCTIONS 

        Summarize the content in one short sentence. Use a middle school reading level. Include relevant dates and info, but make sure it is one sentence. 

        Below the summary, include a bracket-surrounded list of tags (comma-separated). Only include tags that apply. For example, [Tag1, Tag2]. 

        The tags you can choose from are: [LGBTQ, Judicial, Children, Civil Rights, Sustainability, Gender Equality, Racial Justice, Refugee Rights, Disability Rights, Budget, Education, Health, Transportation, Housing, Public Safety, Labor, Energy, Agriculture, Technology]

        You may ONLY use tags from this list. Make sure your list of tags is on a new line (not on the same line as the one sentence summary). 

        ===== CONTENT START =====

        ${bill.fullText}

        ===== CONTENT END =====

        ### RESPONSE (ONE SENTENCE SUMMARY, WITH TAGS ON A NEW LINE)`;
                let rawAiResponse: string = await callGemini(summaryPrompt);
                let summary = rawAiResponse.split('[')[0].trim();
                let tags = rawAiResponse.split('[')[1].split(']')[0].split(',').map((tag: string) => tag.trim());
                summaries.summaries.push({ billId: bill.id, summary, tags });
                fs.writeFileSync('summaries.json', JSON.stringify(summaries));
                console.log(`Completed bill ${++idx} of ${allBills.length}`);
            }
            catch (e) {
                console.log(chalk.red(`LLM had a stroke on bill ${bill.id} (${++attempts}/5)`));
            }
        }
    }
}

main();