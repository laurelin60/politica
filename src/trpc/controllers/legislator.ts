import { db } from "@/db";
import { publicProcedure } from "@/trpc/trpc";
import { z } from "zod";
import { callGemini } from "@/app/api/gemini/gemini.mjs";
import { $Enums } from "@prisma/client";
import { getLegislatorBills } from "@/trpc/controllers/bill";

export const writeEmailToLegislator = publicProcedure
    .input(z.object({ legislatorName: z.string(), billId: z.string() }))
    .query(async (opts) => {
        let bill = await db.bill.findFirst({
            where: {
                id: opts.input.billId
            },
            select: {
                measure: true,
                subject: true,
                status: true,
                summary: true
            }
        });
        if (!bill) return { error: "Bill not found (skill issue, L bozo). Example bill id: 202320240AB52" };
        let attempts = 0;
        while (attempts++ < 3) {
            try {
                const response = await callGemini(`### SYSTEM INSTRUCTIONS
Write an email to ${opts.input.legislatorName} about the following bill:

Bill measure: ${bill.measure}
Bill subject: ${bill.subject}
Bill status: ${bill.status}
Bill summary: ${bill.summary}

### RESPONSE
`);
                return {"message": response};
            }
            catch (e) {
                console.error(e);
                if (attempts == 3) break;
            }
        }
        return { error: "Something had a stroke and died" }; 
    });

export const getLegislatorSummary = publicProcedure
    .input(z.object({ legislatorName: z.string(), billId: z.string() }))
    .query(async (opts) => {
        return { "message": "hi im writing about a bill and im cool and like cookies :)" };
    });