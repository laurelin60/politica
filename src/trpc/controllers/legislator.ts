import { callGemini } from "@/app/api/gemini/gemini.mjs";
import { db } from "@/db";
import { publicProcedure } from "@/trpc/trpc";
import { z } from "zod";

export const writeEmailToLegislator = publicProcedure
    .input(z.object({ legislatorName: z.string(), billId: z.string() }))
    .query(async (opts) => {
        const bill = await db.bill.findFirst({
            where: {
                id: opts.input.billId,
            },
            select: {
                measure: true,
                subject: true,
                status: true,
                summary: true,
            },
        });
        if (!bill)
            return {
                error: "Bill not found (skill issue, L bozo). Example bill id: 202320240AB52",
            };
        let attempts = 0;
        while (attempts++ < 3) {
            try {
                const response = await callGemini(`### SYSTEM INSTRUCTIONS
Write an email to ${opts.input.legislatorName} about the following bill:

Bill measure: ${bill.measure}
Bill subject: ${bill.subject}
Bill status: ${bill.status}
Bill summary: ${bill.summary}

You do not need to include the subject line.

### RESPONSE
`);
                return { message: response };
            } catch (e) {
                console.error(e);
                if (attempts == 3) break;
            }
        }
        return { error: "Something had a stroke and died" };
    });

export const getLegislatorSummary = publicProcedure
    .input(z.object({ legislatorName: z.string() }))
    .query(async (opts) => {
        const bills = await db.bill.findMany({
            where: {
                author: {
                    // Perform a join with the Legislator table and filter by author's name
                    name: {
                        contains: opts.input.legislatorName, // Use the contains filter
                    },
                },
            },
            select: {
                measure: true,
                subject: true,
                status: true,
                summary: true,
            },
        });
        if (!bills)
            return {
                summary: `This legislator is named ${opts.input.legislatorName}.`,
            };
        let attempts = 0;
        while (attempts++ < 3) {
            try {
                const response = await callGemini(`### SYSTEM INSTRUCTIONS
Write a one or two sentence summary of the legislator ${
                    opts.input.legislatorName
                } using the info of the following bills they authored. Include specific information (don't just include topics; include specific bills) and analyze without just listing.

Also, if you talk about a bill, put the bill measure in parenthesis when mentioning.

Bills:

${bills
    .map(
        (bill) => `===== START BILL =====
Bill measure: ${bill.measure}
Bill subject: ${bill.subject}
Bill status: ${bill.status}
Bill summary: ${bill.summary}
===== END BILL =====`,
    )
    .join("\n\n")}

### RESPONSE
`);
                return { message: response };
            } catch (e) {
                console.error(e);
                if (attempts == 3) break;
            }
        }
        return { error: "Something had a stroke and died" };
    });

export const getLegislatorsByZip = publicProcedure
    .input(
        z.object({
            zip: z.string().refine((data) => {
                return parseInt(data, 10);
            }),
        }),
    )
    .query(async (opts) => {
        const legislators = await db.legislator.findMany({
            where: {
                zipCodes: {
                    has: parseInt(opts.input.zip, 10),
                },
            },
            select: {
                name: true,
                type: true,
                party: true,
                district: true,
                pictureUrl: true,
            },
        });
        return legislators;
    });
