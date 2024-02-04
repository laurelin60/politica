import { db } from "@/db";
import { publicProcedure } from "@/trpc/trpc";
import { z } from "zod";
import callGemini from "@/app/api/gemini/gemini.mjs";


export const getBillByPrompt = publicProcedure
    .input(z.object({ prompt: z.string() }))
    .query(async (opts) => {
        for (let i = 0; i < 3; i++) {
            const response = await callGemini(
                `### Your job is to classify a user's prompt into a specific category that matches best. 
                The user's prompt is: ${opts.input.prompt}`
            );
        }
        return db.bill.findMany({});
    });

export const getBillById = publicProcedure
    .input(z.object({ billId: z.string() }))
    .query(async (opts) => {
        return db.bill.findFirst({
            where: {
                id: opts.input.billId
            }
        });
    });

export const getLegislatorBills = publicProcedure
    .input(
        z.object({
            authorNameContains: z.string() // Add this line to accept author name as a parameter
        })
    )
    .query(async (opts) => {
        return db.bill.findMany({
            where: {
                author: {
                    // Perform a join with the Legislator table and filter by author's name
                    name: {
                        contains: opts.input.authorNameContains // Use the contains filter
                    }
                }
            },
            select: {
                id: true,
                measure: true,
                subject: true,
                status: true,
                summary: true,
                // fullText: false, // You don't need to explicitly set this to false.
                author: {
                    select: {
                        name: true,
                        party: true,
                        district: true
                    }
                },
                votes: true
            }
        });
    });
